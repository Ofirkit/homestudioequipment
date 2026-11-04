import type { APIRoute } from 'astro';
import { SITE, CATEGORIES } from '../config';
import { getPosts } from '../lib/posts';

/** llms.txt: a plain-text map of the site for AI assistants and answer engines (https://llmstxt.org). */
export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const url = (path: string) => new URL(path, SITE.url).toString();

  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.description}`,
    '',
    `Written by ${SITE.author}, a music producer and designer. Reviews are based on manufacturer specs and an AI-assisted analysis of Amazon owner reviews; posts say clearly when a product hasn't been tested hands-on. The site earns from Amazon affiliate links.`,
    '',
    '## Reviews and guides',
    '',
    ...posts.map((p) => `- [${p.data.title}](${url(`/${p.id}/`)}): ${p.data.description}`),
    '',
    '## Categories',
    '',
    ...CATEGORIES.filter((c) => posts.some((p) => p.data.category === c.slug)).map(
      (c) => `- [${c.name}](${url(`/category/${c.slug}/`)}): ${c.blurb}`,
    ),
    '',
    '## About this site',
    '',
    `- [How We Review](${url('/how-we-review/')}): Where our information comes from and what we don't do.`,
    `- [About](${url('/about/')}): Who writes the reviews.`,
    `- [Affiliate Disclosure](${url('/affiliate-disclosure/')}): How the site makes money.`,
    `- [RSS feed](${url('/rss.xml')}): New and updated reviews.`,
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
