// Inspect Sanity transaction history for page-home (and a few other docs).
// Prints every revision with timestamp + a fingerprint of the document body
// at that point, so we can see if the rich content from before today's seed
// is actually still in history.
//
// Run from studio/:
//   npx sanity exec scripts/inspect-history.ts --with-user-token

import { getCliClient } from 'sanity/cli';

const client = getCliClient();
const cfg = client.config();
const projectId = cfg.projectId;
const dataset = cfg.dataset;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const token = (cfg as any).token;

if (!token) {
  console.error('No auth token. Pass --with-user-token when running.');
  process.exit(1);
}

const TARGETS = ['page-home', 'servicesPage', 'partnersPage', 'resourcesPage'];

async function fetchText(path: string): Promise<{ status: number; text: string }> {
  const url = `https://${projectId}.api.sanity.io${path}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/x-ndjson' },
  });
  return { status: res.status, text: await res.text() };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function summarize(doc: any): string {
  if (!doc) return '(no doc)';
  const parts: string[] = [];
  if (doc._type) parts.push(`type=${doc._type}`);
  if (doc.title) parts.push(`title="${String(doc.title).slice(0, 40)}"`);
  if (doc.heroTitle) parts.push(`heroTitle="${String(doc.heroTitle).slice(0, 40)}"`);
  if (doc.heroImage?.asset) parts.push('heroImage=✓');
  if (Array.isArray(doc.sections)) {
    parts.push(`sections=${doc.sections.length}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hero = doc.sections.find((s: any) => s?._type === 'heroSection');
    if (hero) {
      const t = hero.title ? `"${String(hero.title).slice(0, 30)}…"` : '∅';
      const img = hero.image?.asset ? '✓' : '∅';
      parts.push(`hero(t=${t},img=${img})`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const text = doc.sections.find((s: any) => s?._type === 'textContent');
    if (text) {
      const blocks = Array.isArray(text.body) ? text.body.length : 0;
      parts.push(`text(blocks=${blocks})`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vid = doc.sections.find((s: any) => s?._type === 'videoSection');
    if (vid) parts.push(`video(${vid.videoUrl ? '✓' : '∅'})`);
  }
  return parts.join(' ');
}

async function inspectDoc(docId: string) {
  console.log(`\n═══ ${docId} ═══`);

  // Try a few API path variants for the transaction history endpoint
  const paths = [
    `/v2024-01-01/data/history/${dataset}/transactions/${docId}?excludeContent=false`,
    `/v1/data/history/${dataset}/transactions/${docId}?excludeContent=false`,
  ];

  let ndjson = '';
  let lastErr = '';
  for (const path of paths) {
    const { status, text } = await fetchText(path);
    if (status === 200 && text.trim()) {
      ndjson = text;
      break;
    }
    lastErr = `${status} from ${path}`;
  }

  if (!ndjson) {
    console.log(`  ⚠ Could not fetch transaction history (${lastErr})`);
    return;
  }

  const lines = ndjson.trim().split('\n').filter(Boolean);
  console.log(`  found ${lines.length} transactions:\n`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const txs: any[] = [];
  for (const line of lines) {
    try {
      txs.push(JSON.parse(line));
    } catch {
      // skip malformed
    }
  }

  // Sort oldest first
  txs.sort((a, b) => (a.timestamp || '').localeCompare(b.timestamp || ''));

  // For each transaction, fetch the doc state at that timestamp
  for (const tx of txs) {
    const ts = tx.timestamp;
    if (!ts) continue;

    const docPath = `/v2024-01-01/data/doc/${dataset}/${docId}?ts=${encodeURIComponent(ts)}`;
    const { status, text } = await fetchText(docPath);
    if (status !== 200) {
      console.log(`  ${ts}  (status ${status}, no doc at this time)`);
      continue;
    }
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      console.log(`  ${ts}  (could not parse response)`);
      continue;
    }
    const doc = parsed?.documents?.[0] || parsed;
    console.log(`  ${ts}  ${summarize(doc)}`);
  }
}

async function run() {
  console.log(`Project: ${projectId}, Dataset: ${dataset}`);
  for (const id of TARGETS) {
    await inspectDoc(id);
  }
  console.log('\nDone.');
}

run().catch((err) => {
  console.error('Script failed:', err.message);
  process.exit(1);
});
