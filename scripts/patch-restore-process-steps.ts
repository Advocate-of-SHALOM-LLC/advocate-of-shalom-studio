// Surgical restore of the "How We Work" process steps section on the home page.
// Only sets fields on sections[_key=="processSteps-3"] — leaves every other
// section (hero, text, feature grid, video, CTA) untouched.
//
// Run from studio/:
//   Dry-run:
//     npx sanity exec scripts/patch-restore-process-steps.ts --with-user-token -- --dry
//   Apply:
//     npx sanity exec scripts/patch-restore-process-steps.ts --with-user-token

import { getCliClient } from 'sanity/cli';

const client = getCliClient();
const dryRun = process.argv.includes('--dry');

const HEADING = 'How We Work';
const SUBHEADING = 'A simple, clear process — because you have enough to think about.';

const STEPS = [
  {
    _key: 'step-1',
    _type: 'processStep',
    title: 'Reach Out',
    icon: 'Phone',
    description:
      "Contact us to share your situation. There's no wrong way to start the conversation.",
  },
  {
    _key: 'step-2',
    _type: 'processStep',
    title: 'We Listen',
    icon: 'Ear',
    description:
      "We take time to understand what you're facing before we recommend anything.",
  },
  {
    _key: 'step-3',
    _type: 'processStep',
    title: 'We Build a Plan',
    icon: 'ClipboardList',
    description:
      'Together we map out the steps, the agencies involved, and what advocacy looks like for your specific situation.',
  },
  {
    _key: 'step-4',
    _type: 'processStep',
    title: 'We Walk With You',
    icon: 'PersonStanding',
    description:
      'We stay involved through the process — attending appointments, following up with agencies, and making sure nothing falls through the cracks.',
  },
];

async function run() {
  if (dryRun) console.log('DRY RUN — no writes will be performed.\n');

  const home = await client.fetch<any>(`*[_id == "page-home"][0]`);
  if (!home) {
    console.error('page-home not found.');
    process.exit(1);
  }

  const sections: any[] = Array.isArray(home.sections) ? home.sections : [];
  const target = sections.find((s) => s?._key === 'processSteps-3');
  if (!target) {
    console.error(
      '⚠ sections[_key=="processSteps-3"] not found on page-home. Cannot patch — the section type may have a different _key. Open the home page in Studio and let me know the actual section key.'
    );
    process.exit(1);
  }

  const patch = client.patch('page-home').set({
    'sections[_key=="processSteps-3"].heading': HEADING,
    'sections[_key=="processSteps-3"].subheading': SUBHEADING,
    'sections[_key=="processSteps-3"].steps': STEPS,
  });

  console.log('Planned changes on sections[_key=="processSteps-3"]:');
  console.log(`  ✎ heading       = "${HEADING}"`);
  console.log(`  ✎ subheading    = "${SUBHEADING}"`);
  console.log(`  ✎ steps         = ${STEPS.length} items (with Phone, Ear, ClipboardList, PersonStanding icons)`);

  if (dryRun) {
    console.log('\nDRY RUN: re-run without --dry to apply.');
    return;
  }

  await patch.commit();
  console.log('\n✓ Patches applied.');
}

run().catch((err) => {
  console.error('Patch failed:', err.message);
  process.exit(1);
});
