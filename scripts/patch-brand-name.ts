// One-off: rewrite the organization name to "Advocate Of SHALOM" everywhere it appears
// in the live Sanity dataset. Surgical — only touches string values that match a known
// stale variant; every other field (including images, refs, and Studio-only edits) is
// preserved as-is.
//
// Run from the studio/ directory:
//   npx sanity exec scripts/patch-brand-name.ts --with-user-token
//
// Dry-run first (recommended) — pass --dry to print what would change without writing:
//   npx sanity exec scripts/patch-brand-name.ts --with-user-token -- --dry

import { getCliClient } from 'sanity/cli';

const client = getCliClient();
const dryRun = process.argv.includes('--dry');

const CORRECT = 'Advocate Of SHALOM';

// Order matters: longer/more-specific variants first so substrings don't get rewritten
// before the longer form is matched. Each item is replaced literally (case-sensitive).
const INCORRECT_VARIANTS = [
  'Advocacy Of Shalom',
  'Advocacy of Shalom',
  'Advocacy of SHALOM',
  'Advocate Of Shalom',
  'Advocate of Shalom',
  'Advocate of SHALOM',
  'ADVOCATE OF SHALOM',
  'advocate of shalom',
];

// Document types that may contain the brand name. Add to this list if you add new
// page types in the future. Domain/email strings (advocateofshalom.com etc.) are
// not affected — they don't match any variant above.
const TYPES_TO_SCAN = [
  'siteSettings',
  'aboutPage',
  'contactPage',
  'partnersPage',
  'servicesPage',
  'resourcesPage',
  'legalPage',
  'page',
  'navigation',
  'socialLinks',
  'footerColumns',
];

function fixString(s: string): string {
  let out = s;
  for (const wrong of INCORRECT_VARIANTS) {
    if (out.includes(wrong)) out = out.split(wrong).join(CORRECT);
  }
  return out;
}

// Deep-walk any value, returning the rewritten copy + a flag for whether anything changed.
function rewrite(value: any): { value: any; changed: boolean } {
  if (typeof value === 'string') {
    const next = fixString(value);
    return { value: next, changed: next !== value };
  }
  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((v) => {
      const r = rewrite(v);
      if (r.changed) changed = true;
      return r.value;
    });
    return { value: next, changed };
  }
  if (value && typeof value === 'object') {
    let changed = false;
    const next: Record<string, any> = {};
    for (const key of Object.keys(value)) {
      const r = rewrite(value[key]);
      next[key] = r.value;
      if (r.changed) changed = true;
    }
    return { value: next, changed };
  }
  return { value, changed: false };
}

async function run() {
  console.log(`Scanning document types: ${TYPES_TO_SCAN.join(', ')}`);
  if (dryRun) console.log('DRY RUN — no writes will be performed.\n');

  const docs = await client.fetch<any[]>(`*[_type in $types]`, { types: TYPES_TO_SCAN });
  console.log(`Fetched ${docs.length} document(s).`);

  const tx = client.transaction();
  let touched = 0;

  for (const doc of docs) {
    const r = rewrite(doc);
    if (!r.changed) continue;

    touched++;
    console.log(`  ✎ ${doc._type} / ${doc._id}`);

    // Strip server-managed audit fields; preserve _id and _type.
    const { _rev, _createdAt, _updatedAt, ...rest } = r.value;
    tx.createOrReplace(rest as any);
  }

  if (touched === 0) {
    console.log('\n✓ Nothing to update — brand name is already consistent.');
    return;
  }

  if (dryRun) {
    console.log(`\nDRY RUN: would update ${touched} document(s). Re-run without --dry to apply.`);
    return;
  }

  await tx.commit();
  console.log(`\n✓ Updated ${touched} document(s).`);
}

run().catch((err) => {
  console.error('Patch failed:', err.message);
  process.exit(1);
});
