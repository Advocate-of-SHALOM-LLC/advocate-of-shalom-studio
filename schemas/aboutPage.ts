import { defineType, defineField } from 'sanity';
import { HiUser } from 'react-icons/hi2';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: HiUser,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'story', title: 'Origin Story' },
    { name: 'team', title: 'Team Bio' },
    { name: 'shared', title: 'Split + CTA' },
  ],
  fields: [
    // ─── Hero ─────────────────────────────────────────────────────────
    defineField({
      name: 'heroImage',
      title: 'Hero background image',
      type: 'image',
      group: 'hero',
      description:
        'Sits behind the hero headline with a gradient overlay. Leave empty to use the default gradient.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero image alt text',
      type: 'string',
      group: 'hero',
      description: 'Describe the image for screen readers. Leave empty if the image is purely decorative.',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero headline',
      type: 'string',
      group: 'hero',
      initialValue: 'We Show Up for People the System Has Forgotten',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero subheadline',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'Advocate Of SHALOM exists because someone saw what happens when people have to navigate these systems alone — and decided to do something about it.',
    }),

    // ─── Origin Story ─────────────────────────────────────────────────
    defineField({
      name: 'originStory',
      title: 'Origin story',
      type: 'text',
      rows: 12,
      group: 'story',
      initialValue:
        "Elyse Parker has spent years working on both sides of the criminal justice system — first navigating it herself, then learning to advocate within it professionally. That experience isn't academic. It's the reason she knows what it actually takes to help someone get their Medicaid approved, find stable housing, or walk into a DHS office and come out with what they came for. She started Advocate Of SHALOM because she'd seen what happens when people face these systems without support. And she decided that for the people she could reach, that wouldn't be the story anymore.",
    }),

    // ─── Team Bio ─────────────────────────────────────────────────────
    defineField({
      name: 'teamBioImage',
      title: 'Team bio image (Elyse portrait)',
      type: 'image',
      group: 'team',
      description:
        'Renders on the left of the bio on desktop, above the bio on mobile. Use the hotspot to keep the face centered when cropped.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'teamBioImageAlt',
      title: 'Team bio image alt text',
      type: 'string',
      group: 'team',
      description: 'Describe the portrait for screen readers (e.g. "Portrait of Elyse Parker").',
    }),
    defineField({
      name: 'teamBio',
      title: 'Team bio',
      type: 'text',
      rows: 8,
      group: 'team',
      initialValue:
        "Elyse has spent years working within Colorado's criminal justice and social services systems — first as a client, then as a case manager, and now as a criminal defense advocate working alongside legal teams statewide. She holds two active state contracts and brings a level of firsthand knowledge to this work that can't be taught in a classroom. She started Advocate Of SHALOM to make that knowledge available to the people who need it and can't afford to go without it.",
    }),

    // ─── Split / Two Column block ─────────────────────────────────────
    defineField({
      name: 'approachHeading',
      title: 'Split — left column heading',
      type: 'string',
      group: 'shared',
      initialValue: 'Our Approach',
    }),
    defineField({
      name: 'approachBody',
      title: 'Split — left column body',
      type: 'text',
      rows: 6,
      group: 'shared',
      initialValue:
        "Holistic advocacy means we don't stop at the legal case. We address what it actually takes to rebuild a life — housing, healthcare, finances, social reintegration, spiritual wellbeing. Whatever the barrier is, we work on it. One client at a time if that's what it takes.",
    }),
    defineField({
      name: 'whoWeServeHeading',
      title: 'Split — right column heading',
      type: 'string',
      group: 'shared',
      initialValue: 'Who We Serve',
    }),
    defineField({
      name: 'whoWeServeBody',
      title: 'Split — right column body',
      type: 'text',
      rows: 6,
      group: 'shared',
      initialValue:
        "We work primarily with individuals transitioning out of incarceration — people navigating parole, reentry, DHS systems, and the practical reality of starting over in a world that moved on without them. We also partner with attorneys, social workers, and community agencies who need a dedicated advocate in their client's corner.",
    }),

    // ─── Closing CTA block ────────────────────────────────────────────
    defineField({
      name: 'ctaHeading',
      title: 'CTA — heading',
      type: 'string',
      group: 'shared',
      initialValue: 'Want to learn more about what we do?',
    }),
    defineField({
      name: 'ctaSubline',
      title: 'CTA — subline',
      type: 'string',
      group: 'shared',
      initialValue:
        "Whether you're looking for support or want to explore working alongside us — we'd love to hear from you.",
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA — button label',
      type: 'string',
      group: 'shared',
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'ctaButtonUrl',
      title: 'CTA — button URL',
      type: 'string',
      group: 'shared',
      initialValue: '/contact',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' };
    },
  },
});
