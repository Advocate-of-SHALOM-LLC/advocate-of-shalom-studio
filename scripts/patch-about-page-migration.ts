// One-off: migrate the aboutPage doc from the Full/Alludes twin-fields shape
// to the simplified single-version shape. Copies each *Alludes field value
// into the new clean-named field (only if the clean name doesn't already
// have a value), then unsets every legacy field including storyVersion.
//
// Run from studio/:
//   Dry run:
//     npx sanity exec scripts/patch-about-page-migration.ts --with-user-token -- --dry
//   Apply:
//     npx sanity exec scripts/patch-about-page-migration.ts --with-user-token

import { getCliClient } from 'sanity/cli';

const client = getCliClient();
const dryRun = process.argv.includes('--dry');

// old field name → new clean field name
const RENAMES: Array<[string, string]> = [
  ['heroHeadlineAlludes', 'heroHeadline'],
  ['heroSubheadlineAlludes', 'heroSubheadline'],
  ['originStoryAlludes', 'originStory'],
  ['teamBioAlludes', 'teamBio'],
];

// Legacy fields to drop entirely — no data to preserve
const UNSET_FIELDS = [
  'storyVersion',
  'heroHeadlineFull',
  'heroSubheadlineFull',
  'originStoryFull',
  'teamBioFull',
  // The Alludes fields are unset after their values are copied to clean names
  'heroHeadlineAlludes',
  'heroSubheadlineAlludes',
  'originStoryAlludes',
  'teamBioAlludes',
];

async function run() {
  if (dryRun) console.log('DRY RUN — no writes will be performed.\n');

  const doc = await client.fetch<any>(`*[_id == "aboutPage"][0]`);
  if (!doc) {
    console.error('aboutPage doc not found.');
    process.exit(1);
  }

  // Compute the value moves. Only copy if the source has content AND the
  // destination is empty (so we don't clobber any hand-edits to the new fields).
  const setPatch: Record<string, any> = {};
  const copyLog: string[] = [];

  for (const [from, to] of RENAMES) {
    const sourceVal = doc[from];
    const destVal = doc[to];
    if (sourceVal !== undefined && sourceVal !== null && sourceVal !== '' && !destVal) {
      setPatch[to] = sourceVal;
      copyLog.push(`  ✎ copy ${from} → ${to}`);
    } else if (destVal) {
      copyLog.push(`  · skip ${to} (already has value)`);
    } else {
      copyLog.push(`  · skip ${to} (no source value in ${from})`);
    }
  }

  // Which legacy fields actually exist on this doc (avoid patch noise on already-clean docs)
  const toUnset = UNSET_FIELDS.filter((f) => doc[f] !== undefined);

  console.log('Planned changes:');
  for (const l of copyLog) console.log(l);
  if (toUnset.length) {
    console.log(`  ✂ unset: ${toUnset.join(', ')}`);
  } else {
    console.log('  · nothing to unset (all legacy fields already gone)');
  }

  if (Object.keys(setPatch).length === 0 && toUnset.length === 0) {
    console.log('\n✓ aboutPage already migrated. Nothing to do.');
    return;
  }

  if (dryRun) {
    console.log('\nDRY RUN: re-run without --dry to apply.');
    return;
  }

  let patch = client.patch('aboutPage');
  if (Object.keys(setPatch).length) patch = patch.set(setPatch);
  if (toUnset.length) patch = patch.unset(toUnset);

  await patch.commit();
  console.log('\n✓ aboutPage migrated.');
}

run().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
