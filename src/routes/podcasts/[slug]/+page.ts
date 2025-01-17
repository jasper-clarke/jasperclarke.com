import { error } from '@sveltejs/kit';
import type { ServerLoadEvent } from '@sveltejs/kit';

export const load = async ({ params }: ServerLoadEvent) => {
	try {
		return {
			podcast: params.slug.split('.')[0]
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
};
