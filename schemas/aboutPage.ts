import { defineType, defineField } from 'sanity';
import { HiUser } from 'react-icons/hi2';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: HiUser,
  groups: [
    { name: 'toggle', title: 'Version Toggle', default: true },
    { name: 'heroFull', title: 'Hero — Full Story (A)' },
    { name: 'heroAlludes', title: 'Hero — Professional (B)' },
    { name: 'story', title: 'Origin Story' },
    { name: 'team', title: 'Team Bio' },
    { name: 'shared', title: 'Shared (Split + CTA)' },
  ],
  fields: [
    defineField({
      name: 'storyVersion',
      title: "Story version on About page",
      type: 'string',
      group: 'toggle',
      description:
        "Controls which version of Elyse's story appears on the About page. Version A includes personal history. Version B uses professional framing only. ⚠ Changes require publishing to go live.",
      options: {
        list: [
          { title: 'Version A — Full Story', value: 'full' },
          { title: 'Version B — Professional Framing', value: 'alludes' },
        ],
        layout: 'radio',
      },
      initialValue: 'alludes',
      validation: (Rule) => Rule.required(),
    }),

    // Shared hero image — applies to both versions
    defineField({
      name: 'heroImage',
      title: 'Hero background image',
      type: 'image',
      group: 'toggle',
      description:
        'Shared across both Full and Professional versions. Sits behind the hero headline with a gradient overlay. Leave empty to use the default gradient.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero image alt text',
      type: 'string',
      group: 'toggle',
      description: 'Describe the image for screen readers. Leave empty if the image is purely decorative.',
    }),

    // ─── Hero — Full Story ────────────────────────────────────────────
    defineField({
      name: 'heroHeadlineFull',
      title: 'Hero headline — Full Story (A)',
      type: 'string',
      group: 'heroFull',
      initialValue: 'We Know This System From the Inside Out',
    }),
    defineField({
      name: 'heroSubheadlineFull',
      title: 'Hero subheadline — Full Story (A)',
      type: 'text',
      rows: 3,
      group: 'heroFull',
      initialValue:
        "Advocate Of SHALOM was built by someone who lived it — and came back to make sure others don't have to face it alone.",
    }),

    // ─── Hero — Professional Framing ──────────────────────────────────
    defineField({
      name: 'heroHeadlineAlludes',
      title: 'Hero headline — Professional (B)',
      type: 'string',
      group: 'heroAlludes',
      initialValue: 'We Show Up for People the System Has Forgotten',
    }),
    defineField({
      name: 'heroSubheadlineAlludes',
      title: 'Hero subheadline — Professional (B)',
      type: 'text',
      rows: 3,
      group: 'heroAlludes',
      initialValue:
        'Advocate Of SHALOM exists because someone saw what happens when people have to navigate these systems alone — and decided to do something about it.',
    }),

    // ─── Origin Story ─────────────────────────────────────────────────
    defineField({
      name: 'originStoryFull',
      title: 'Origin story — Full Story (A)',
      type: 'text',
      rows: 12,
      group: 'story',
      initialValue:
        "Elyse Parker spent 13 years in prison for a crime she didn't physically commit. She came out with nothing — no housing, no support, no roadmap. What followed was homelessness, relapse, and the very real possibility of losing everything that mattered. But she refused to let that be the end of the story. She rebuilt her life from the ground up. From shelter resident to case manager. From case manager to criminal defense advocate. Today she works alongside legal teams across Colorado, walking people through the same system she survived — this time as the one who knows the language, knows the agencies, and knows how to make it work for the people who need it most. Advocate Of SHALOM is the organization she wished had existed when she needed it.",
    }),
    defineField({
      name: 'originStoryAlludes',
      title: 'Origin story — Professional (B)',
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
        'Shared across both versions. Renders on the left of the bio on desktop, above the bio on mobile. Use the hotspot to keep the face centered when cropped.',
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
      name: 'teamBioFull',
      title: 'Team bio — Full Story (A)',
      type: 'text',
      rows: 8,
      group: 'team',
      initialValue:
        "Elyse brings something most advocates can't: she's been inside the system as a client, survived what it does to people, and rebuilt her life on the other side. After 13 years of incarceration and the hard road that followed, she moved from shelter resident to case manager to criminal defense advocate — working alongside legal teams across Colorado. She holds two active state contracts and is currently building Advocate Of SHALOM to extend that work to the people who need it most but don't yet have access to it.",
    }),
    defineField({
      name: 'teamBioAlludes',
      title: 'Team bio — Professional (B)',
      type: 'text',
      rows: 8,
      group: 'team',
      initialValue:
        "Elyse has spent years working within Colorado's criminal justice and social services systems — first as a client, then as a case manager, and now as a criminal defense advocate working alongside legal teams statewide. She holds two active state contracts and brings a level of firsthand knowledge to this work that can't be taught in a classroom. She started Advocate Of SHALOM to make that knowledge available to the people who need it and can't afford to go without it.",
    }),

    // ─── Split / Two Column block (same in both versions) ─────────────
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

    // ─── Closing CTA block (same in both versions) ────────────────────
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
    select: { version: 'storyVersion' },
    prepare({ version }: { version?: string }) {
      const label: Record<string, string> = {
        full: 'Showing: Version A — Full Story',
        alludes: 'Showing: Version B — Professional Framing',
      };
      return {
        title: 'About Page',
        subtitle: label[version || 'alludes'],
      };
    },
  },
});
