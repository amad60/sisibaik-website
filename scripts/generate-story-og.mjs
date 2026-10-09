// Crops each story cover to a 1200x630 JPEG for link previews (public/og/stories/<slug>.jpg).
import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';

const stories = JSON.parse(await readFile('src/data/stories.json', 'utf8'));
const images = JSON.parse(await readFile('src/data/story-images.json', 'utf8'));
await mkdir('public/og/stories', { recursive: true });

for (const s of stories) {
  const img = images[`${s.slug}/${s.cover}`];
  if (!img) continue;
  const src = `public${img.base}-${img.width > 720 ? 1400 : 720}.webp`;
  await sharp(src)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(`public/og/stories/${s.slug}.jpg`);
}
console.log(`story og images: ${stories.length}`);
