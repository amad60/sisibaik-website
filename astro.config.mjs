// @ts-check
import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Vercel reads vercel.json from the repo root for Git deploys, but a plain
 * upload of dist/ needs its own copy. Keep the root file as the only source.
 * @type {import('astro').AstroIntegration}
 */
const vercelConfig = {
  name: 'copy-vercel-json',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await copyFile(new URL('./vercel.json', import.meta.url), fileURLToPath(new URL('vercel.json', dir)));
    },
  },
};

export default defineConfig({
  site: 'https://sisibaikproject.id',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap(), vercelConfig],
  server: { host: true, port: 4387 },
  image: {
    responsiveStyles: false,
  },
  devToolbar: { enabled: false },
});
