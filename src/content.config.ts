import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './config';

const categorySlugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(170),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(categorySlugs),
      author: z.string().default('Ophir'),
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
      draft: z.boolean().default(false),
      faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    }),
});

export const collections = { posts };
