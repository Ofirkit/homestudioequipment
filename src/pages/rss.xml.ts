import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE, getCategory } from '../config';
import { getPosts, lastUpdated } from '../lib/posts';

/** RSS feed of published reviews and guides, newest first. */
export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    trailingSlash: true,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      link: `/${p.id}/`,
      pubDate: lastUpdated(p),
      categories: [getCategory(p.data.category)?.name ?? p.data.category],
    })),
    customData: '<language>en-us</language>',
  });
}
