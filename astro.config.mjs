// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { satteri } from '@astrojs/markdown-satteri';
import { externalLinks } from './src/lib/external-links.mjs';

// Categories that have at least one published post. Empty category pages are
// noindexed (see category/[category].astro), so keep them out of the sitemap too.
const postsDir = new URL('./src/content/posts/', import.meta.url);
const livePosts = readdirSync(postsDir)
  .filter((f) => /\.mdx?$/.test(f))
  .map((f) => ({ slug: f.replace(/\.mdx?$/, ''), src: readFileSync(new URL(f, postsDir), 'utf8') }))
  .filter(({ src }) => !/^draft:\s*true/m.test(src));
const liveCategories = new Set(
  livePosts.map(({ src }) => src.match(/^category:\s*["']?([\w-]+)/m)?.[1]).filter(Boolean),
);
// Last-modified date per post URL, from updatedDate (or pubDate), for the sitemap's <lastmod>.
/** @type {Map<string, string>} */
const postLastmod = new Map();
for (const { slug, src } of livePosts) {
  const d = (src.match(/^updatedDate:\s*["']?([\d-]+)/m) ?? src.match(/^pubDate:\s*["']?([\d-]+)/m))?.[1];
  if (d) postLastmod.set(`https://homestudioequipment.com/${slug}/`, new Date(d).toISOString());
}
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
    sitemap({
      filter: (page) => !page.endsWith('/404/') && !isEmptyCategory(page),
      serialize: (item) => {
        const lastmod = postLastmod.get(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  markdown: { processor: satteri({ hastPlugins: [externalLinks] }) },
  build: { inlineStylesheets: 'auto' },
});
