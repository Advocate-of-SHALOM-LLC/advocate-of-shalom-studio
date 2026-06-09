import { defineType, defineField } from 'sanity';
import { HiScale } from 'react-icons/hi2';

export default defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  icon: HiScale,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      description: 'Shown subtly beneath the page title.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Page Content',
      type: 'array',
      of: [{ type: 'block' }],
      description:
        "Full legal page content as rich text. Supports headings, paragraphs, and bullet lists. TODO: email/domain references currently use eparker@advocateofshalom.com and advocateofshalom.com — update to elyse@advocateofshalom.com / advocateofshalom.com after Google Workspace migration.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', lastUpdated: 'lastUpdated' },
    prepare({ title, lastUpdated }: { title?: string; lastUpdated?: string }) {
      return {
        title: title || 'Untitled',
        subtitle: lastUpdated ? `Last updated: ${lastUpdated}` : 'No date set',
      };
    },
  },
});
