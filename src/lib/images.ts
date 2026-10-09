import type { ImageMetadata } from 'astro';
import storyImages from '../data/story-images.json';

type Glob = Record<string, { default: ImageMetadata }>;

const photos = import.meta.glob('../assets/photos/*.jpg', { eager: true }) as Glob;
const brand = import.meta.glob('../assets/brand/*.{jpg,png}', { eager: true }) as Glob;
const team = import.meta.glob('../assets/team/*.png', { eager: true }) as Glob;

function pick(glob: Glob, name: string, kind: string): ImageMetadata {
  const hit = Object.entries(glob).find(([path]) => path.replace(/^.*\//, '').replace(/\.\w+$/, '') === name);
  if (!hit) throw new Error(`Unknown ${kind} image: ${name}`);
  return hit[1].default;
}

export const photo = (name: string) => pick(photos, name, 'photo');
export const brandImg = (name: string) => pick(brand, name, 'brand');
export const teamImg = (name: string) => pick(team, name, 'team');

export type StoryImage = { base: string; width: number; height: number };

export function storyImage(slug: string, file: string): StoryImage | undefined {
  return (storyImages as Record<string, StoryImage>)[`${slug}/${file}`];
}

export function storySrcset(img: StoryImage) {
  const large = img.width > 720;
  return {
    src: `${img.base}-${large ? 1400 : 720}.webp`,
    srcset: large ? `${img.base}-720.webp 720w, ${img.base}-1400.webp ${Math.min(1400, img.width)}w` : undefined,
  };
}
