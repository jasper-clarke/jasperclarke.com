export async function GET() {
	const STREAM_URL = 'https://stream.jasperclarke.com/status-json.xsl';

	try {
		const response = await fetch(STREAM_URL, {
			method: 'GET',
			headers: {}
		});

		// If response is not 404 and the returned content is valid json with a value for "icestats.source.listeners", return true
		if (
			response.status !== 404 &&
			response.headers.get('content-type') === 'application/json; charset=UTF-8'
		) {
			const data = await response.json();
			if (data.icestats.source) {
				return new Response(
					JSON.stringify({ isLive: true, streamTitle: data.icestats.source.server_name }),
					{
						headers: { 'Content-Type': 'application/json' }
					}
				);
			}
		}

		return new Response(JSON.stringify({ isLive: false }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Error checking stream status:', error);
		return new Response(JSON.stringify({ isLive: false, error: error.message }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
