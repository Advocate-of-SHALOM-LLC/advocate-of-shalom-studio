import { defineType, defineField } from 'sanity';
import { HiUserGroup } from 'react-icons/hi2';

export default defineType({
  name: 'partnersPage',
  title: 'Partners Page',
  type: 'document',
  icon: HiUserGroup,
  groups: [
    { name: 'hero', title: 'Block 1 — Hero', default: true },
    { name: 'text', title: 'Block 2 — Intro Text' },
    { name: 'services', title: 'Block 3 — Where We Fit In' },
    { name: 'split', title: 'Block 4 — Who We Work With + Partnership Fit' },
    { name: 'testimonials', title: 'Block 5 — Testimonials' },
    { name: 'cta', title: 'Block 6 — Closing CTA' },
  ],
  fields: [
    // ─── Block 1: Hero ───────────────────────────────────────────────
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
      initialValue: 'We Work Alongside Professionals Who Share Our Commitment',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        'If you work with individuals navigating the criminal justice system or complex agencies, Advocate Of SHALOM can be the dedicated support presence your clients need.',
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
      initialValue: { label: 'Get In Touch', url: '/contact' },
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
      name: 'partnersIntroHeading',
      title: 'Intro heading',
      type: 'string',
      group: 'text',
      initialValue: 'How Partnership Works',
    }),
    defineField({
      name: 'partnersIntroBody',
      title: 'Intro body',
      type: 'text',
      rows: 6,
      group: 'text',
      initialValue:
        "Advocate Of SHALOM works alongside attorneys, social workers, case managers, and community agencies to build a coordinated support network around shared clients. We don't duplicate what you do — we fill the gaps. When your client needs someone to show up to a DHS appointment, navigate a housing application, or work through the practical barriers of reentry, that's where we come in.",
    }),

    // ─── Block 3: Services ───────────────────────────────────────────
    defineField({
      name: 'partnersServicesHeading',
      title: 'Services heading',
      type: 'string',
      group: 'services',
      validation: (Rule) => Rule.required(),
      initialValue: 'Where We Fit In',
    }),
    defineField({
      name: 'partnersServicesSubheading',
      title: 'Services subheading',
      type: 'string',
      group: 'services',
      initialValue: 'How Advocate Of SHALOM complements your work',
    }),
    defineField({
      name: 'partnerServices',
      title: 'Services list',
      type: 'array',
      group: 'services',
      of: [
        {
          type: 'object',
          name: 'serviceItem',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({
              name: 'icon',
              title: 'Icon (Lucide name)',
              type: 'string',
              description:
                "Lucide icon name (case-sensitive). Examples: Scale, Landmark, DoorOpen, Heart, Phone, Share2, Network, Users, Shield. Falls back to a help icon if unrecognized.",
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'icon' },
          },
        },
      ],
      initialValue: [
        { _key: 'svc-1', _type: 'serviceItem', title: 'Criminal Justice Navigation', icon: 'Scale', description: 'We help shared clients understand their rights, obligations, and next steps at every stage of the legal process — so you can focus on the legal work.' },
        { _key: 'svc-2', _type: 'serviceItem', title: 'Agency Navigation', icon: 'Landmark', description: 'We accompany clients to DHS, housing offices, and community service agencies — ensuring they leave with what they came for.' },
        { _key: 'svc-3', _type: 'serviceItem', title: 'Reentry Support', icon: 'DoorOpen', description: 'From ID acquisition to healthcare access to practical life skills, we address the full scope of what reentry actually requires.' },
        { _key: 'svc-4', _type: 'serviceItem', title: 'Holistic Advocacy', icon: 'Heart', description: 'We address spiritual, financial, physical, and social needs alongside the legal and administrative — because lasting stability requires all of it.' },
        { _key: 'svc-5', _type: 'serviceItem', title: 'Ongoing Availability', icon: 'Phone', description: "We stay involved. We follow through. When something falls through the cracks we catch it — so you don't have to." },
        { _key: 'svc-6', _type: 'serviceItem', title: 'Coordinated Communication', icon: 'Share2', description: 'We keep relevant parties informed and maintain clear communication across the support network around each client.' },
      ],
    }),

    // ─── Block 4: Split (two text columns) ───────────────────────────
    defineField({
      name: 'whoWeWorkWithHeading',
      title: 'Left column — heading',
      type: 'string',
      group: 'split',
      initialValue: 'Who We Work With',
    }),
    defineField({
      name: 'whoWeWorkWithBody',
      title: 'Left column — body',
      type: 'text',
      rows: 4,
      group: 'split',
      initialValue:
        'We partner with professionals and organizations already serving individuals in or transitioning out of the criminal justice system.',
    }),
    defineField({
      name: 'whoWeWorkWithFeatures',
      title: 'Left column — bullet list',
      type: 'array',
      group: 'split',
      of: [{ type: 'string' }],
      initialValue: [
        'Criminal defense attorneys',
        'Public defenders',
        'Social workers and case managers',
        'Parole and probation officers',
        'Community service agencies',
        'Faith-based organizations',
        'Homeless service providers',
      ],
    }),
    defineField({
      name: 'whatWeNeedHeading',
      title: 'Right column — heading',
      type: 'string',
      group: 'split',
      initialValue: 'What Makes a Good Partnership',
    }),
    defineField({
      name: 'whatWeNeedBody',
      title: 'Right column — body',
      type: 'text',
      rows: 4,
      group: 'split',
      initialValue:
        'The best partnerships are built on a shared commitment to the whole person — not just the immediate case. We work best alongside professionals who believe in long-term stability over quick resolutions.',
    }),
    defineField({
      name: 'whatWeNeedFeatures',
      title: 'Right column — bullet list',
      type: 'array',
      group: 'split',
      of: [{ type: 'string' }],
      initialValue: [
        'Shared clients with complex, overlapping needs',
        'Willingness to coordinate across disciplines',
        'Commitment to client dignity and self-determination',
        'Open communication and clear referral processes',
      ],
    }),

    // ─── Block 5: Testimonials (conditional) ─────────────────────────
    defineField({
      name: 'partnersTestimonialsHeading',
      title: 'Testimonials heading',
      type: 'string',
      group: 'testimonials',
      description: 'Block is hidden on the live site until at least one testimonial is added below.',
    }),
    defineField({
      name: 'partnerTestimonials',
      title: 'Testimonials',
      type: 'array',
      group: 'testimonials',
      description: 'Leave empty to hide the entire Testimonials block on the live site.',
      of: [
        {
          type: 'object',
          name: 'testimonialItem',
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (R) => R.required() }),
            defineField({ name: 'authorName', title: 'Author name', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'authorRole', title: 'Author role', type: 'string' }),
            defineField({ name: 'authorCompany', title: 'Author company', type: 'string' }),
          ],
          preview: {
            select: { title: 'authorName', subtitle: 'authorRole' },
          },
        },
      ],
    }),

    // ─── Block 6: Closing CTA ────────────────────────────────────────
    defineField({
      name: 'partnersCtaHeadline',
      title: 'CTA headline',
      type: 'string',
      group: 'cta',
      validation: (Rule) => Rule.required(),
      initialValue: 'Interested in Working Together?',
    }),
    defineField({
      name: 'partnersCtaText',
      title: 'CTA text',
      type: 'text',
      rows: 3,
      group: 'cta',
      initialValue:
        "Partnership inquiries receive a direct response. Reach out and let's talk about how we can support your clients.",
    }),
    defineField({
      name: 'partnersCtaButtonLabel',
      title: 'CTA button label',
      type: 'string',
      group: 'cta',
      validation: (Rule) => Rule.required(),
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'partnersCtaButtonUrl',
      title: 'CTA button URL',
      type: 'string',
      group: 'cta',
      validation: (Rule) => Rule.required(),
      initialValue: '/contact',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Partners Page' };
    },
  },
});
