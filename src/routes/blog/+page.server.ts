import type { ServerLoadEvent } from '@sveltejs/kit';

export async function load({ url, fetch }: ServerLoadEvent) {
  const response = await fetch('/api/posts');
  const posts = await response.json();
  const category = url.searchParams.get('category') || '';
  return { posts, category };
}
