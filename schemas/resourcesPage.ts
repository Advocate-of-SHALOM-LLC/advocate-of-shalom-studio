import { defineType, defineField } from 'sanity';
import { HiBookOpen } from 'react-icons/hi2';

export default defineType({
  name: 'resourcesPage',
  title: 'Resources Page',
  type: 'document',
  icon: HiBookOpen,
  groups: [
    { name: 'hero', title: 'Block 1 — Hero', default: true },
    { name: 'text', title: 'Block 2 — Intro Text' },
    { name: 'resources', title: 'Block 3 — Resource Categories' },
    { name: 'split', title: 'Block 4 — Callout / Reach Out' },
    { name: 'cta', title: 'Block 5 — Closing CTA' },
  ],
  fields: [
    // ─── Block 1: Hero ───────────────────────────────────────────────
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
      initialValue: 'Resources for People Navigating Difficult Systems',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'Practical information, helpful links, and guides for individuals and professionals working through the criminal justice system and government agencies.',
    }),
    defineField({
      name: 'heroCta',
      title: 'Hero CTA button',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'label', title: 'Button label', type: 'string' }),
        defineField({ name: 'url', title: 'Button URL', type: 'string' }),
      ],
      initialValue: { label: 'Need More Help?', url: '/contact' },
    }),
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

    // ─── Block 2: Intro Text ─────────────────────────────────────────
    defineField({
      name: 'resourcesIntroHeading',
      title: 'Intro heading',
      type: 'string',
      group: 'text',
      initialValue: 'Finding the Right Help',
    }),
    defineField({
      name: 'resourcesIntroBody',
      title: 'Intro body',
      type: 'text',
      rows: 6,
      group: 'text',
      initialValue:
        "Navigating the criminal justice system, reentry, or government agencies is hard enough without having to find the right resources on your own. We've put together information across the most common areas our clients face. This page grows over time — if you don't see what you need, reach out directly and we'll point you in the right direction.",
    }),

    // ─── Block 3: Resource Categories ────────────────────────────────
    defineField({
      name: 'resourcesHeading',
      title: 'Categories heading',
      type: 'string',
      group: 'resources',
      validation: (Rule) => Rule.required(),
      initialValue: 'Resource Categories',
    }),
    defineField({
      name: 'resourcesSubheading',
      title: 'Categories subheading',
      type: 'string',
      group: 'resources',
      initialValue: 'Information organized by the areas where people need it most.',
    }),
    defineField({
      name: 'resources',
      title: 'Resource categories',
      type: 'array',
      group: 'resources',
      description:
        'Each card represents a category of resources. Add a URL to link the card to an external organization or page when one is ready.',
      of: [
        {
          type: 'object',
          name: 'resourceItem',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({
              name: 'icon',
              title: 'Icon (Lucide name)',
              type: 'string',
              description:
                "Lucide icon name (case-sensitive). Examples: Scale, Home, HeartPulse, DoorOpen, Wallet, Users. Falls back to a help icon if unrecognized.",
            }),
            defineField({
              name: 'url',
              title: 'Link URL (optional)',
              type: 'string',
              description:
                "External URL or internal path (e.g. https://example.org or /contact). Leave empty if the category isn't linked anywhere yet.",
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'icon' } },
        },
      ],
      initialValue: [
        { _key: 'res-1', _type: 'resourceItem', title: 'Legal Aid & Rights', icon: 'Scale', description: 'Organizations and resources to help you understand your legal rights, find representation, and navigate the court system in Colorado.' },
        { _key: 'res-2', _type: 'resourceItem', title: 'Housing & Shelter', icon: 'Home', description: 'Emergency shelter, transitional housing, and longer-term housing resources for individuals and families in the Grand Valley and across Colorado.' },
        { _key: 'res-3', _type: 'resourceItem', title: 'Healthcare & Benefits', icon: 'HeartPulse', description: 'Information on accessing Medicaid, mental health services, substance use treatment, and other health benefits you may be entitled to.' },
        { _key: 'res-4', _type: 'resourceItem', title: 'Reentry Support', icon: 'DoorOpen', description: 'Resources specifically for individuals transitioning out of incarceration — ID acquisition, employment, housing, and community reintegration.' },
        { _key: 'res-5', _type: 'resourceItem', title: 'Financial Assistance', icon: 'Wallet', description: 'Emergency financial assistance, benefits access, and resources for stabilizing finances during a difficult transition.' },
        { _key: 'res-6', _type: 'resourceItem', title: 'Community & Faith', icon: 'Users', description: 'Community organizations, faith-based support networks, and peer support resources in the Grand Valley region.' },
      ],
    }),

    // ─── Block 4: Split / Callout ────────────────────────────────────
    defineField({
      name: 'resourcesSplitHeading',
      title: 'Callout heading',
      type: 'string',
      group: 'split',
      validation: (Rule) => Rule.required(),
      initialValue: "Don't See What You Need?",
    }),
    defineField({
      name: 'resourcesSplitBody',
      title: 'Callout body',
      type: 'text',
      rows: 4,
      group: 'split',
      initialValue:
        "This page grows as we add more. If you're looking for something specific and can't find it here, reach out directly. We'd rather help you find the right resource than have you go without.",
    }),
    defineField({
      name: 'resourcesSplitFeatures',
      title: 'Callout bullets',
      type: 'array',
      group: 'split',
      of: [{ type: 'string' }],
      initialValue: [
        'We respond within 1–2 business days',
        'No commitment required to ask a question',
        "We'll point you toward the right resource even if it isn't us",
      ],
    }),
    defineField({
      name: 'resourcesSplitCtaLabel',
      title: 'Callout button label',
      type: 'string',
      group: 'split',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'resourcesSplitCtaUrl',
      title: 'Callout button URL',
      type: 'string',
      group: 'split',
      initialValue: '/contact',
    }),

    // ─── Block 5: Closing CTA ────────────────────────────────────────
    defineField({
      name: 'resourcesCtaHeadline',
      title: 'CTA headline',
      type: 'string',
      group: 'cta',
      validation: (Rule) => Rule.required(),
      initialValue: 'Need Someone in Your Corner?',
    }),
    defineField({
      name: 'resourcesCtaText',
      title: 'CTA text',
      type: 'text',
      rows: 3,
      group: 'cta',
      initialValue:
        "Resources are a starting point. If you need someone to walk with you through the process — that's what we're here for.",
    }),
    defineField({
      name: 'resourcesCtaButtonLabel',
      title: 'CTA button label',
      type: 'string',
      group: 'cta',
      validation: (Rule) => Rule.required(),
      initialValue: 'Reach Out',
    }),
    defineField({
      name: 'resourcesCtaButtonUrl',
      title: 'CTA button URL',
      type: 'string',
      group: 'cta',
      validation: (Rule) => Rule.required(),
      initialValue: '/contact',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Resources Page' };
    },
  },
});
