// One-off: replace legacy phone / email values in every live Sanity doc.
// Deep-walks each document and rewrites any string field that contains
// a legacy value — including inside portable text spans (legal page bodies).
// Nothing else touched.
//
// Run from studio/:
//   Dry run (recommended):
//     npx sanity exec scripts/patch-contact-info.ts --with-user-token -- --dry
//   Apply:
//     npx sanity exec scripts/patch-contact-info.ts --with-user-token

import { getCliClient } from 'sanity/cli';

const client = getCliClient();
const dryRun = process.argv.includes('--dry');

// Order matters: replace longer/more specific first. Each entry is a literal
// case-sensitive substring replacement, applied in order to every string value.
const REPLACEMENTS: Array<[string, string]> = [
  // Phone — old formats → canonical parens format used across the site
  ['(970) 314-7095', '(970) 773-5907'],
  ['970-314-7095',   '(970) 773-5907'],
  ['970.314.7095',   '(970) 773-5907'],
  ['9703147095',     '9707735907'],       // JSON-LD digits-only form (unlikely in Sanity but safe)
  // Email — all legacy addresses → navigator@
  ['eparker@advocateofshalom.com', 'navigator@advocateofshalom.com'],
  ['eparker@advocateofshalom.net', 'navigator@advocateofshalom.com'],
  ['elyse@advocateofshalom.com',   'navigator@advocateofshalom.com'],
];

// Every doc type in the project. Add new ones here if the project grows.
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
  for (const [from, to] of REPLACEMENTS) {
    if (out.includes(from)) out = out.split(from).join(to);
  }
  return out;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  console.log(`Scanning: ${TYPES_TO_SCAN.join(', ')}`);
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
    console.log('\n✓ Nothing to update — live data is already clean.');
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
