import { defineType, defineField } from 'sanity';
import { HiEnvelope } from 'react-icons/hi2';

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: HiEnvelope,
  groups: [
    { name: 'text', title: 'Block 1 — Intro Text', default: true },
    { name: 'contact', title: 'Block 2 — Contact (Form + Details)' },
    { name: 'map', title: 'Block 3 — Map + Address' },
  ],
  fields: [
    // ─── BlockText ────────────────────────────────────────────────────
    defineField({
      name: 'textHeading',
      title: 'Intro heading',
      type: 'string',
      group: 'text',
      initialValue: "We'd Love to Hear From You",
    }),
    defineField({
      name: 'bodyContent',
      title: 'Intro body',
      type: 'text',
      rows: 5,
      group: 'text',
      initialValue:
        "Whether you're looking for support navigating a difficult situation or you're a professional interested in working alongside us — this is the right place to start. Fill out the form below and we'll get back to you as soon as possible.",
    }),

    // ─── BlockContact ─────────────────────────────────────────────────
    defineField({
      name: 'contactHeading',
      title: 'Form heading',
      type: 'string',
      group: 'contact',
      initialValue: 'Send Us a Message',
    }),
    defineField({
      name: 'contactSubheading',
      title: 'Form subheading',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Address (shown beside form)',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Phone',
      type: 'string',
      group: 'contact',
      initialValue: '(970) 773-5907',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email',
      type: 'string',
      group: 'contact',
      initialValue: 'navigator@advocateofshalom.com',
    }),
    defineField({
      name: 'contactHoursLabel',
      title: 'Business hours',
      type: 'string',
      group: 'contact',
      description: "Shown in the right-hand column under the email address.",
      initialValue: 'Monday – Friday, 9:00 AM – 5:00 PM MST',
    }),
    defineField({
      name: 'contactWarmNote',
      title: 'Warm note (right column)',
      type: 'string',
      group: 'contact',
      description: "Small italicized note shown beneath the hours in the right column.",
      initialValue: 'We read every message personally and respond within 1–2 business days.',
    }),
    defineField({
      name: 'contactResponseNote',
      title: 'Response time note (under submit button)',
      type: 'string',
      group: 'contact',
      initialValue: 'We typically respond within 1–2 business days.',
    }),

    // ─── BlockMap ─────────────────────────────────────────────────────
    defineField({
      name: 'mapHeading',
      title: 'Map heading',
      type: 'string',
      group: 'map',
      initialValue: 'Find Us',
    }),
    defineField({
      name: 'mapAddress',
      title: 'Address (shown beside map)',
      type: 'text',
      rows: 3,
      group: 'map',
      initialValue: '536 31½ Rd #1\nGrand Junction, CO 81504',
    }),
    defineField({
      name: 'mapPhone',
      title: 'Phone',
      type: 'string',
      group: 'map',
      initialValue: '(970) 773-5907',
    }),
    defineField({
      name: 'mapEmail',
      title: 'Email',
      type: 'string',
      group: 'map',
      initialValue: 'navigator@advocateofshalom.com',
    }),
    defineField({
      name: 'mapAppointmentNote',
      title: 'Appointment-only note',
      type: 'string',
      group: 'map',
      initialValue:
        'Visits are by appointment only. Please reach out using the form above or by phone to schedule a time.',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps embed URL',
      type: 'url',
      group: 'map',
      description:
        'Paste the src URL from a Google Maps embed iframe. Leave empty to show the placeholder card instead.',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'], allowRelative: false }).optional(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' };
    },
  },
});
