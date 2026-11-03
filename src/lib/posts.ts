import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES } from '../config';

export type Post = CollectionEntry<'posts'>;

/** Published posts, newest first. Drafts are visible only in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => lastUpdated(b).valueOf() - lastUpdated(a).valueOf());
}

export const lastUpdated = (p: Post) => p.data.updatedDate ?? p.data.pubDate;

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/** Categories with at least one published post, in the order set in config. */
export async function getLiveCategories() {
  const posts = await getPosts();
  return CATEGORIES.filter((c) => posts.some((p) => p.data.category === c.slug));
}
