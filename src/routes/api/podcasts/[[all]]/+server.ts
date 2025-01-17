import type { RequestHandler } from '../$types';

export const GET = (async ({ url }) => {
	const { pathname } = new URL(url.pathname.replace('/api/podcasts/', ''));
  console.log("MY AWESOME PATHNAME", pathname);
	const file = await url.env.PODCASTS.get(pathname);
  return new Response(null, { status: 404 });
	// if (!file) {
	// }
	// return new Response(file.body, {
		// headers: { 'Content-Type': file.httpMetadata.contentType }
	// });
}) satisfies RequestHandler;
