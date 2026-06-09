import { defineType, defineField } from 'sanity';
import { MdMenu } from 'react-icons/md';

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MdMenu,
  fields: [
    defineField({
      name: 'items',
      title: 'Navigation menu items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
            }),
            defineField({
              name: 'isExternal',
              title: 'External link',
              type: 'boolean',
            })
          ],
        }
      ],
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      item0: 'items.0.label',
      item1: 'items.1.label',
      item2: 'items.2.label',
      item3: 'items.3.label',
    },
    prepare({ item0, item1, item2, item3 }) {
      const labels = [item0, item1, item2, item3].filter(Boolean) as string[];
      if (labels.length === 0) {
        return { title: 'Navigation', subtitle: 'No items' };
      }
      const shown = labels.slice(0, 3).join(' · ');
      const more = labels.length > 3 ? '…' : '';
      return {
        title: `Navigation: ${shown}${more}`,
        subtitle: `${labels.length}${labels.length >= 4 ? '+' : ''} item${labels.length === 1 ? '' : 's'}`,
      };
    },
  },
});
