// Surgical rebuild of page-home content based on the pre-seed screenshot.
// Only sets specific fields by _key path — leaves everything else (icons,
// existing items, etc) untouched.
//
// Run from studio/:
//   Dry-run first (recommended):
//     npx sanity exec scripts/patch-restore-home.ts --with-user-token -- --dry
//   Apply:
//     npx sanity exec scripts/patch-restore-home.ts --with-user-token
//
// Notes:
// - Hero IMAGE cannot be restored by script (Sanity image asset refs were
//   lost in the wipe). Re-upload via Studio after this script runs.
// - VIDEO_URL is left blank below — paste the YouTube URL into the constant
//   below before running if you want it patched in one shot. Otherwise you
//   can set it later via Studio.
// - Any text you'd like to tweak: edit the constants at the top, re-run.

import { getCliClient } from 'sanity/cli';

const client = getCliClient();
const dryRun = process.argv.includes('--dry');

// ── Reconstructed copy ────────────────────────────────────────────────
// Adjust any of these before running if the screenshot reading is off.
const HERO_TITLE = "We Stand Up for Those Who Can't Stand Alone";
const HERO_SUBTITLE =
  "Advocate Of SHALOM helps individuals navigate the criminal justice system and complex government agencies — with experienced advocates who know what it takes and aren't afraid to take a stand.";
const HERO_CTA_LABEL = 'Reach Out';
const HERO_CTA_URL = '/contact';

const TEXT_BODY_PARAGRAPH =
  "The systems meant to help people are often the hardest to navigate alone. Court dates, DHS appointments, agency requirements, legal processes — for most people, it's overwhelming. Advocate Of SHALOM stands ready to change that. We walk alongside individuals and families, making sure they have the guidance, support, and representation they deserve.";

// ⚠ Paste the YouTube/Vimeo URL here to restore the video embed.
// Leave empty to skip the video URL patch (you can set it in Studio later).
const VIDEO_URL = '';

const CLOSING_CTA_HEADING = "You don't have to navigate this alone.";
const CLOSING_CTA_BODY_PARAGRAPH =
  "Whether you're facing a difficult situation or want to support someone who is — we'd love to hear from you.";
const CLOSING_CTA_LABEL = 'Reach Out';
const CLOSING_CTA_URL = '/contact';

// ── Portable Text helper ──────────────────────────────────────────────
let _ptKey = 0;
function ptBlock(text: string, style: string = 'normal') {
  _ptKey += 1;
  const key = `pt-${_ptKey}`;
  return {
    _type: 'block',
    _key: key,
    style,
    children: [{ _type: 'span', _key: `${key}-s`, text, marks: [] }],
    markDefs: [],
  };
}

// ── Patch ─────────────────────────────────────────────────────────────
async function run() {
  if (dryRun) console.log('DRY RUN — no writes will be performed.\n');

  const home = await client.fetch<any>(`*[_id == "page-home"][0]`);
  if (!home) {
    console.error('page-home not found.');
    process.exit(1);
  }
  const sections: any[] = Array.isArray(home.sections) ? home.sections : [];
  const has = (key: string) => sections.some((s) => s?._key === key);

  let patch = client.patch('page-home');
  const changes: string[] = [];

  // ── Hero ─────
  if (has('heroSection-0')) {
    patch = patch.set({
      'sections[_key=="heroSection-0"].title': HERO_TITLE,
      'sections[_key=="heroSection-0"].subtitle': HERO_SUBTITLE,
      'sections[_key=="heroSection-0"].cta.label': HERO_CTA_LABEL,
      'sections[_key=="heroSection-0"].cta.url': HERO_CTA_URL,
    });
    changes.push('heroSection-0: title, subtitle, cta.label, cta.url');
  } else {
    console.log('⚠ heroSection-0 not found in page-home.sections — skipping hero patch');
  }

  // ── Text content ─────
  if (has('textContent-1')) {
    patch = patch.set({
      'sections[_key=="textContent-1"].body': [ptBlock(TEXT_BODY_PARAGRAPH)],
    });
    changes.push('textContent-1: body (1 paragraph)');
  } else {
    console.log('⚠ textContent-1 not found in page-home.sections — skipping text patch');
  }

  // ── Video URL (optional) ─────
  if (VIDEO_URL.trim()) {
    if (has('videoSection-3a')) {
      patch = patch.set({
        'sections[_key=="videoSection-3a"].videoUrl': VIDEO_URL.trim(),
      });
      changes.push(`videoSection-3a: videoUrl = ${VIDEO_URL}`);
    } else {
      console.log('⚠ videoSection-3a not found in page-home.sections — skipping video patch');
    }
  } else {
    console.log('ℹ VIDEO_URL constant is blank — skipping video URL patch (set it in Studio later).');
  }

  // ── Closing CTA ─────
  if (has('pricingCtaSection-5')) {
    patch = patch.set({
      'sections[_key=="pricingCtaSection-5"].heading': CLOSING_CTA_HEADING,
      'sections[_key=="pricingCtaSection-5"].body': [ptBlock(CLOSING_CTA_BODY_PARAGRAPH)],
      'sections[_key=="pricingCtaSection-5"].ctaLabel': CLOSING_CTA_LABEL,
      'sections[_key=="pricingCtaSection-5"].ctaUrl': CLOSING_CTA_URL,
    });
    changes.push('pricingCtaSection-5: heading, body, ctaLabel, ctaUrl');
  } else {
    console.log('⚠ pricingCtaSection-5 not found in page-home.sections — skipping CTA patch');
  }

  if (changes.length === 0) {
    console.log('\nNothing to patch.');
    return;
  }

  console.log('\nPlanned changes:');
  for (const c of changes) console.log(`  ✎ ${c}`);

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
