// Builds favicon and app icons from the brand logo into public/.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const logo = 'src/assets/brand/logo-sisi-baik.png';
await mkdir('public', { recursive: true });

const square = async (size, out, pad = 0) => {
  const inner = Math.round(size * (1 - pad * 2));
  const img = await sharp(logo).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: pad ? '#f7f0e3' : { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: img, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(out);
};

await square(64, 'public/favicon.png');
await square(180, 'public/apple-touch-icon.png', 0.1);
await square(512, 'public/icon-512.png', 0.1);
console.log('icons written');
