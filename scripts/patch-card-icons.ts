// Surgical patch: update card/step icon fields on existing documents WITHOUT
// touching anything else (titles, descriptions, hero images, body text, etc).
//
// Use this instead of REPLACE_IDS when you only want to change icon strings.
// Each patch uses Sanity's JSON Match path syntax to target a specific item by
// its _key, so unrelated fields (and other items in the same array) are safe.
//
// Run from the studio/ directory:
//   npx sanity exec scripts/patch-card-icons.ts --with-user-token
//
// Dry run (preview without writing):
//   npx sanity exec scripts/patch-card-icons.ts --with-user-token -- --dry

import { getCliClient } from 'sanity/cli';

const client = getCliClient();
const dryRun = process.argv.includes('--dry');

// Each entry: { docId, arrayField, keyToIcon }
// arrayField is the top-level array on the document; keyToIcon maps each
// item's _key to its new icon string. If a key isn't found, that item is
// skipped (logged). Unlisted items in the array are not touched.
const PATCHES: Array<{
  docId: string;
  arrayField: string;
  keyToIcon: Record<string, string>;
}> = [
  {
    docId: 'servicesPage',
    arrayField: 'services',
    keyToIcon: {
      'svc-1': 'Scale',
      'svc-2': 'Landmark',
      'svc-3': 'DoorOpen',
      'svc-4': 'Heart',
      'svc-5': 'Users',
      'svc-6': 'Network',
    },
  },
  {
    docId: 'servicesPage',
    arrayField: 'steps',
    keyToIcon: {
      'step-1': 'Phone',
      'step-2': 'Ear',
      'step-3': 'ClipboardList',
      'step-4': 'PersonStanding',
    },
  },
  {
    docId: 'partnersPage',
    arrayField: 'partnerServices',
    keyToIcon: {
      'svc-1': 'Scale',
      'svc-2': 'Landmark',
      'svc-3': 'DoorOpen',
      'svc-4': 'Heart',
      'svc-5': 'Phone',
      'svc-6': 'Share2',
    },
  },
  {
    docId: 'resourcesPage',
    arrayField: 'resources',
    keyToIcon: {
      'res-1': 'Scale',
      'res-2': 'Home',
      'res-3': 'HeartPulse',
      'res-4': 'DoorOpen',
      'res-5': 'Wallet',
      'res-6': 'Users',
    },
  },
];

// page-home is sections-array with featureGrid + processSteps nested inside.
// Each items[] / steps[] within those sections needs its own per-item icon
// update keyed by the item's _key. We handle it separately because the path
// is two levels deep.
type HomeNestedPatch = {
  sectionKey: string;       // the _key on the section in page-home.sections[]
  nestedArrayField: string; // 'items' or 'steps'
  keyToIcon: Record<string, string>;
};

const HOME_NESTED_PATCHES: HomeNestedPatch[] = [
  {
    sectionKey: 'featureGrid-2',
    nestedArrayField: 'items',
    keyToIcon: {
      'feat-1': 'Scale',
      'feat-2': 'Landmark',
      'feat-3': 'Network',
      'feat-4': 'Shield',
    },
  },
  {
    sectionKey: 'processSteps-3',
    nestedArrayField: 'steps',
    keyToIcon: {
      'step-1': 'Phone',
      'step-2': 'Ear',
      'step-3': 'ClipboardList',
      'step-4': 'PersonStanding',
    },
  },
];

async function run() {
  if (dryRun) console.log('DRY RUN — no writes will be performed.\n');

  // ── Top-level array patches (services, partners, resources) ───────────
  for (const { docId, arrayField, keyToIcon } of PATCHES) {
    const doc = await client.fetch<any>(`*[_id == $id][0]`, { id: docId });
    if (!doc) {
      console.log(`✗ ${docId} not found — skipping`);
      continue;
    }
    const items: any[] = Array.isArray(doc[arrayField]) ? doc[arrayField] : [];
    if (items.length === 0) {
      console.log(`✗ ${docId}.${arrayField} is empty — skipping`);
      continue;
    }

    let patch = client.patch(docId);
    let changed = 0;
    for (const item of items) {
      const desired = keyToIcon[item._key];
      if (!desired) continue;
      if (item.icon === desired) continue;
      patch = patch.set({ [`${arrayField}[_key=="${item._key}"].icon`]: desired });
      changed++;
      console.log(`  ✎ ${docId}.${arrayField}[${item._key}].icon: "${item.icon ?? ''}" → "${desired}"`);
    }
    if (changed === 0) {
      console.log(`✓ ${docId}.${arrayField} already up to date`);
      continue;
    }
    if (!dryRun) await patch.commit();
  }

  // ── Nested array patches inside page-home.sections[] ──────────────────
  const home = await client.fetch<any>(`*[_id == "page-home"][0]`);
  if (!home) {
    console.log('✗ page-home not found — skipping nested patches');
  } else {
    const sections: any[] = Array.isArray(home.sections) ? home.sections : [];
    for (const { sectionKey, nestedArrayField, keyToIcon } of HOME_NESTED_PATCHES) {
      const section = sections.find((s) => s._key === sectionKey);
      if (!section) {
        console.log(`✗ page-home.sections[${sectionKey}] not found — skipping`);
        continue;
      }
      const items: any[] = Array.isArray(section[nestedArrayField]) ? section[nestedArrayField] : [];
      if (items.length === 0) {
        console.log(`✗ page-home.sections[${sectionKey}].${nestedArrayField} is empty — skipping`);
        continue;
      }

      let patch = client.patch('page-home');
      let changed = 0;
      for (const item of items) {
        const desired = keyToIcon[item._key];
        if (!desired) continue;
        if (item.icon === desired) continue;
        patch = patch.set({
          [`sections[_key=="${sectionKey}"].${nestedArrayField}[_key=="${item._key}"].icon`]: desired,
        });
        changed++;
        console.log(`  ✎ page-home.sections[${sectionKey}].${nestedArrayField}[${item._key}].icon: "${item.icon ?? ''}" → "${desired}"`);
      }
      if (changed === 0) {
        console.log(`✓ page-home.sections[${sectionKey}].${nestedArrayField} already up to date`);
        continue;
      }
      if (!dryRun) await patch.commit();
    }
  }

  console.log(dryRun ? '\nDRY RUN complete. Re-run without --dry to apply.' : '\n✓ Patches applied.');
}

run().catch((err) => {
  console.error('Patch failed:', err.message);
  process.exit(1);
});
