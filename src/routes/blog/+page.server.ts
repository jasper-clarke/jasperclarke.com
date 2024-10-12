import type { ServerLoadEvent } from '@sveltejs/kit';

export async function load({ url, fetch }: ServerLoadEvent) {
  const response = await fetch('/api/posts');
  const posts: Post[] = await response.json();
  const category: string = url.searchParams.get('category') || '';
  return { posts, category };
}
