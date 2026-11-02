// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://homestudioequipment.com',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.endsWith('/404/') }),
  ],
  build: { inlineStylesheets: 'auto' },
});
