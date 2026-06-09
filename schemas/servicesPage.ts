import { defineType, defineField } from 'sanity';
import { HiSparkles } from 'react-icons/hi2';

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  icon: HiSparkles,
  groups: [
    { name: 'hero', title: 'Block 1 — Hero', default: true },
    { name: 'text', title: 'Block 2 — Intro Text' },
    { name: 'services', title: 'Block 3 — Services' },
    { name: 'process', title: 'Block 4 — How We Work' },
    { name: 'faq', title: 'Block 5 — FAQ' },
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
      initialValue: "We Help People Navigate Systems That Weren't Built for Them",
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero subtitle',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue:
        "Whether you're facing a criminal charge, transitioning out of incarceration, or trying to access services you're entitled to — we know how to get you what you need.",
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
      initialValue: { label: 'Reach Out', url: '/contact' },
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
      name: 'servicesIntroHeading',
      title: 'Intro heading',
      type: 'string',
      group: 'text',
      initialValue: 'What We Do',
    }),
    defineField({
      name: 'servicesIntroBody',
      title: 'Intro body',
      type: 'text',
      rows: 6,
      group: 'text',
      initialValue:
        "The systems meant to support people are often the hardest to navigate alone. Court requirements, DHS offices, housing applications, agency paperwork — for most people going through a difficult time, it's overwhelming. Advocate Of SHALOM provides holistic, hands-on advocacy that addresses the whole person — not just the immediate case.",
    }),

    // ─── Block 3: Services ───────────────────────────────────────────
    defineField({
      name: 'servicesHeading',
      title: 'Services heading',
      type: 'string',
      group: 'services',
      validation: (Rule) => Rule.required(),
      initialValue: 'Our Services',
    }),
    defineField({
      name: 'servicesSubheading',
      title: 'Services subheading',
      type: 'string',
      group: 'services',
      initialValue: 'We meet you where you are and walk with you through what comes next.',
    }),
    defineField({
      name: 'services',
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
                "Lucide icon name (case-sensitive). Examples: Scale, Landmark, DoorOpen, Heart, Users, Network, Phone, MessageSquare, Shield. Falls back to a help icon if unrecognized.",
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'icon' } },
        },
      ],
      initialValue: [
        { _key: 'svc-1', _type: 'serviceItem', title: 'Criminal Justice Navigation', icon: 'Scale', description: "We help individuals understand their rights, their options, and what to expect at every stage of the legal process. You don't have to walk into that courtroom alone." },
        { _key: 'svc-2', _type: 'serviceItem', title: 'DHS & Agency Advocacy', icon: 'Landmark', description: 'From food stamps to Medicaid to housing benefits — we know the language these agencies speak and we use it on your behalf. You go in with us, you come out with what you came for.' },
        { _key: 'svc-3', _type: 'serviceItem', title: 'Reentry Support', icon: 'DoorOpen', description: 'The transition out of incarceration is one of the hardest things a person can face. We help with ID acquisition, housing, healthcare access, and the practical reality of starting over.' },
        { _key: 'svc-4', _type: 'serviceItem', title: 'Holistic Life Advocacy', icon: 'Heart', description: 'Spiritual wellbeing, finances, fitness, social skills — we address the whole pie. Lasting stability requires more than solving the immediate problem.' },
        { _key: 'svc-5', _type: 'serviceItem', title: 'Appointment Accompaniment', icon: 'Users', description: 'We show up with you — to DHS, to the doctor, to the courthouse. Having someone who knows the system standing beside you changes everything.' },
        { _key: 'svc-6', _type: 'serviceItem', title: 'Coordinated Support Network', icon: 'Network', description: 'We partner with attorneys, social workers, and community providers to build a support network around you. No one falls through the cracks.' },
      ],
    }),

    // ─── Block 4: Process ────────────────────────────────────────────
    defineField({
      name: 'processHeading',
      title: 'Process heading',
      type: 'string',
      group: 'process',
      initialValue: 'How We Work',
    }),
    defineField({
      name: 'processSubheading',
      title: 'Process subheading',
      type: 'string',
      group: 'process',
      initialValue: 'A simple, clear process — because you have enough to think about.',
    }),
    defineField({
      name: 'steps',
      title: 'Process steps',
      type: 'array',
      group: 'process',
      of: [
        {
          type: 'object',
          name: 'processStep',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({
              name: 'icon',
              title: 'Icon (Lucide name)',
              type: 'string',
              description:
                "Lucide icon name (case-sensitive). Examples: Phone, Ear, ClipboardList, PersonStanding. Falls back to a help icon if unrecognized.",
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'icon' } },
        },
      ],
      initialValue: [
        { _key: 'step-1', _type: 'processStep', title: 'Reach Out', icon: 'Phone', description: "Contact us to share your situation. There's no wrong way to start the conversation." },
        { _key: 'step-2', _type: 'processStep', title: 'We Listen', icon: 'Ear', description: "We take time to understand what you're facing before we recommend anything. No rushing, no judgment." },
        { _key: 'step-3', _type: 'processStep', title: 'We Build a Plan', icon: 'ClipboardList', description: 'Together we map out the steps, the agencies involved, and what advocacy looks like for your specific situation.' },
        { _key: 'step-4', _type: 'processStep', title: 'We Walk With You', icon: 'PersonStanding', description: 'We stay involved through the process — attending appointments, following up with agencies, and making sure nothing falls through the cracks.' },
      ],
    }),

    // ─── Block 5: FAQ ────────────────────────────────────────────────
    defineField({
      name: 'faqHeading',
      title: 'FAQ heading',
      type: 'string',
      group: 'faq',
      initialValue: 'Common Questions',
    }),
    defineField({
      name: 'faqSubheading',
      title: 'FAQ subheading',
      type: 'string',
      group: 'faq',
      initialValue: "If you don't see your question here, just reach out.",
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ items',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (R) => R.required() }),
          ],
          preview: { select: { title: 'question' } },
        },
      ],
      initialValue: [
        { _key: 'faq-1', _type: 'faqItem', question: 'Who do you work with?', answer: 'We primarily work with individuals navigating the criminal justice system or transitioning out of incarceration. We also work with people struggling to access government services and benefits through agencies like DHS.' },
        { _key: 'faq-2', _type: 'faqItem', question: 'Is there a cost for your services?', answer: 'Please reach out directly to discuss services and fees. We work to make advocacy accessible to the people who need it most.' },
        { _key: 'faq-3', _type: 'faqItem', question: 'What does the process look like after I contact you?', answer: "We'll start with a conversation to understand your situation. From there we'll discuss what advocacy looks like for your specific needs and agree on next steps together. There's no commitment required just to talk." },
        { _key: 'faq-4', _type: 'faqItem', question: 'Do you work across Colorado?', answer: 'We are based in Grand Junction, CO and primarily serve the Grand Valley region. Reach out to discuss your situation and we can talk through what support is possible.' },
        { _key: 'faq-5', _type: 'faqItem', question: 'Can you help someone who is currently incarcerated?', answer: 'Yes. We work with individuals at every stage — including those currently incarcerated and planning for reentry, as well as those who have recently been released.' },
        { _key: 'faq-6', _type: 'faqItem', question: "What if I'm not sure whether you can help me?", answer: "Reach out anyway. The worst that can happen is we point you toward someone who can. We'd rather hear from you and not be able to help than have you go without support because you weren't sure." },
      ],
    }),

    // ─── Block 6: Closing CTA ────────────────────────────────────────
    defineField({
      name: 'servicesCtaHeadline',
      title: 'CTA headline',
      type: 'string',
      group: 'cta',
      validation: (Rule) => Rule.required(),
      initialValue: 'Not Sure Where to Start?',
    }),
    defineField({
      name: 'servicesCtaText',
      title: 'CTA text',
      type: 'text',
      rows: 3,
      group: 'cta',
      initialValue:
        "You don't have to have it all figured out before you reach out. That's what we're here for.",
    }),
    defineField({
      name: 'servicesCtaButtonLabel',
      title: 'CTA button label',
      type: 'string',
      group: 'cta',
      validation: (Rule) => Rule.required(),
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'servicesCtaButtonUrl',
      title: 'CTA button URL',
      type: 'string',
      group: 'cta',
      validation: (Rule) => Rule.required(),
      initialValue: '/contact',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Services Page' };
    },
  },
});
