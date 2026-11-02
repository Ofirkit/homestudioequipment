import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** Published posts, newest first. Drafts are visible only in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => lastUpdated(b).valueOf() - lastUpdated(a).valueOf());
}

export const lastUpdated = (p: Post) => p.data.updatedDate ?? p.data.pubDate;

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
