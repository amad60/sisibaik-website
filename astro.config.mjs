// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sisibaikproject.id',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap()],
  server: { host: true, port: 4387 },
  image: {
    responsiveStyles: false,
  },
  devToolbar: { enabled: false },
});
