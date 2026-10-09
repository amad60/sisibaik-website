import raw from '../data/stories.json';
import { storyImage, storySrcset, type StoryImage } from './images';

export type Story = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  cover: string;
  legacyPath: string;
  body: string;
};

export const stories = (raw as Story[]).slice().sort((a, b) => b.date.localeCompare(a.date));

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const categories = Array.from(new Set(stories.map((s) => s.category))).map((label) => ({
  label,
  slug: slugify(label),
  count: stories.filter((s) => s.category === label).length,
}));

const dateFmt = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
export const formatDate = (iso: string) => dateFmt.format(new Date(iso));

export function coverOf(story: Story): (StoryImage & { src: string; srcset?: string }) | undefined {
  const img = storyImage(story.slug, story.cover);
  return img ? { ...img, ...storySrcset(img) } : undefined;
}

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);
