// One-off: migrate siteSettings.logo → logoLight, and (if present) darkLogo → logoDark.
// Safe to re-run — does nothing once the migration is complete.
//
// From the studio/ directory:
//   npx sanity exec scripts/migrate-logo-fields.ts --with-user-token
//
// Dry-run first:
//   npx sanity exec scripts/migrate-logo-fields.ts --with-user-token -- --dry

import { getCliClient } from 'sanity/cli';

const client = getCliClient();
const dryRun = process.argv.includes('--dry');

async function run() {
  const doc = await client.fetch<any>(`*[_id == "siteSettings"][0]{ _id, _rev, logo, darkLogo, logoLight, logoDark }`);

  if (!doc) {
    console.log('No siteSettings document found — nothing to migrate.');
    return;
  }

  const patches: Record<string, any> = {};
  const unsets: string[] = [];

  // Migrate logo → logoLight only when logoLight is empty
  if (doc.logo?.asset?._ref && !doc.logoLight?.asset?._ref) {
    patches.logoLight = doc.logo;
    unsets.push('logo');
    console.log('  ✎ logo → logoLight');
  } else if (doc.logo?.asset?._ref && doc.logoLight?.asset?._ref) {
    console.log('  ⚠ logoLight already set — leaving legacy logo field alone for safety.');
    console.log('    Manually clear the old logo field in Studio if you want it gone.');
  }

  // Migrate darkLogo → logoDark only when logoDark is empty
  if (doc.darkLogo?.asset?._ref && !doc.logoDark?.asset?._ref) {
    patches.logoDark = doc.darkLogo;
    unsets.push('darkLogo');
    console.log('  ✎ darkLogo → logoDark');
  } else if (doc.darkLogo?.asset?._ref && doc.logoDark?.asset?._ref) {
    console.log('  ⚠ logoDark already set — leaving legacy darkLogo field alone for safety.');
  }

  if (Object.keys(patches).length === 0 && unsets.length === 0) {
    console.log('Nothing to migrate — both new fields already populated, or no legacy fields present.');
    return;
  }

  if (dryRun) {
    console.log('\nDRY RUN: would apply the patches above. Re-run without --dry to commit.');
    return;
  }

  await client
    .patch('siteSettings')
    .set(patches)
    .unset(unsets)
    .commit();

  console.log('\n✓ Migration complete.');
}

run().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
