import { defineType, defineField } from 'sanity';
import { IoSettingsSharp } from 'react-icons/io5';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: IoSettingsSharp,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name displayed in header',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'logoLight',
      title: 'Logo — Light Mode',
      type: 'image',
      description:
        'Full color logo displayed on light backgrounds and in the header when light mode is active. Ideally a PNG with transparent background.',
      options: { hotspot: false },
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo — Dark Mode',
      type: 'image',
      description:
        'Reversed or white version of the logo for dark backgrounds and dark mode header. Ideally a PNG with transparent background. Upload a white or light-colored variant for dark mode.',
      options: { hotspot: false },
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA button label (e.g. "Book Now")',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA button destination URL',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'authEnabled',
      title: 'Show login / account button in header',
      type: 'boolean',
    }),
    defineField({
      name: 'description',
      title: 'Short brand description',
      type: 'text',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright text in footer',
      type: 'string',
    }),
    defineField({
      name: 'craftedBy',
      title: 'Attribution line shown beneath copyright (e.g. "Crafted by Phifer Web Solutions")',
      type: 'string',
    }),
    defineField({
      name: 'businessContact',
      title: 'Name, address, phone — rendered in footer for local SEO. All fields optional.',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
        })
      ],
    }),
  ],
});
