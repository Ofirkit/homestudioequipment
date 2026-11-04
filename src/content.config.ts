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
      /** Short line under the title. */
      subtitle: z.string().optional(),
      /** Label shown in the badge next to the byline. */
      kind: z.enum(['Review', 'Comparison', 'Buying Guide', 'Guide']).default('Review'),
      /** Star rating out of 5, in half-star steps. Only set it if you've judged the product yourself. */
      rating: z.number().min(0).max(5).multipleOf(0.5).optional(),
      description: z.string().max(170),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(categorySlugs),
      author: z.string().default('Ophir'),
      /** Local image (gets optimized) or a remote URL (e.g. an Amazon product image, which must stay hotlinked). */
      heroImage: z.union([image(), z.url()]).optional(),
      heroAlt: z.string().optional(),
      /** Credit line under the hero image, e.g. "Amazon". */
      heroCredit: z.string().optional(),
      /** Zoom for the hero and card image, for photos with lots of empty space around the product (e.g. 1.5). */
      imageZoom: z.number().min(1).max(3).optional(),
      draft: z.boolean().default(false),
      /** Main product ASIN, for single-product reviews. */
      asin: z.string().optional(),
      faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    }),
});

export const collections = { posts };
