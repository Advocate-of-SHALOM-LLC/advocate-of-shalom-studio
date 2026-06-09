import { defineType, defineField } from 'sanity';
import { createElement } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaXTwitter,
  FaGlobe,
} from 'react-icons/fa6';

const PLATFORMS = [
  { title: 'Facebook', value: 'facebook' },
  { title: 'Instagram', value: 'instagram' },
  { title: 'Twitter / X', value: 'twitter' },
  { title: 'LinkedIn', value: 'linkedin' },
  { title: 'YouTube', value: 'youtube' },
  { title: 'TikTok', value: 'tiktok' },
];

const PLATFORM_ICON_MAP: Record<string, React.ComponentType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaXTwitter,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  tiktok: FaTiktok,
};

export default defineType({
  name: 'socialLinks',
  title: 'Social Links',
  type: 'document',
  icon: FaGlobe,
  description:
    'One document per social profile. Add new platforms via the + button. Lower order numbers appear first in the footer.',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: PLATFORMS,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      description: 'Full URL to the public profile page.',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 1,
    }),
  ],
  preview: {
    select: { platform: 'platform', url: 'url', order: 'order' },
    prepare({ platform, url, order }: { platform?: string; url?: string; order?: number }) {
      const label = PLATFORMS.find((p) => p.value === platform)?.title || platform || 'New link';
      const Icon = PLATFORM_ICON_MAP[platform ?? ''] || FaGlobe;
      return {
        title: label,
        subtitle: `${order != null ? `#${order} · ` : ''}${url || 'No URL set'}`,
        media: () => createElement(Icon),
      };
    },
  },
});
