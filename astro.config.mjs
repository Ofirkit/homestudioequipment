// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Categories that have at least one published post. Empty category pages are
// noindexed (see category/[category].astro), so keep them out of the sitemap too.
const postsDir = new URL('./src/content/posts/', import.meta.url);
const liveCategories = new Set(
  readdirSync(postsDir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => readFileSync(new URL(f, postsDir), 'utf8'))
    .filter((src) => !/^draft:\s*true/m.test(src))
    .map((src) => src.match(/^category:\s*["']?([\w-]+)/m)?.[1])
    .filter(Boolean),
);
/** @param {string} page */
const isEmptyCategory = (page) => {
  const m = page.match(/\/category\/([\w-]+)\/$/);
  return m ? !liveCategories.has(m[1]) : false;
};

export default defineConfig({
  site: 'https://homestudioequipment.com',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.endsWith('/404/') && !isEmptyCategory(page) }),
  ],
  build: { inlineStylesheets: 'auto' },
});
