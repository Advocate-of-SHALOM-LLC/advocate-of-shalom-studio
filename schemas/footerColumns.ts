import { defineType, defineField } from 'sanity';
import { HiBars3BottomLeft } from 'react-icons/hi2';

export default defineType({
  name: 'footerColumns',
  title: 'Footer Columns',
  type: 'document',
  icon: HiBars3BottomLeft,
  fields: [
    defineField({
      name: 'title',
      title: 'Column Title',
      type: 'string',
      description: 'Heading displayed above the link group (e.g. "Explore", "Legal").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 1,
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Link Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'Internal path (e.g. /about) or external URL (e.g. https://example.com).',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', order: 'order', links: 'links' },
    prepare({ title, order, links }: { title?: string; order?: number; links?: any[] }) {
      const count = Array.isArray(links) ? links.length : 0;
      return {
        title: title || 'Untitled Column',
        subtitle: `${order != null ? `#${order} · ` : ''}${count} link${count === 1 ? '' : 's'}`,
      };
    },
  },
});
