import { error } from '@sveltejs/kit';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({}: ServerLoadEvent) => {
	try {
		const post = await import(`../../lib/content/about.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		throw error(404, `Could not find about page`);
	}
};

export const prerender = true;
