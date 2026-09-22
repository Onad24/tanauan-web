import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET() {
	try {
		const key = env.OPENROUTER_API_KEY || env.GEMINI_API_KEY;
		if (!key) {
			return json({ error: 'API key not configured' }, { status: 500 });
		}

		return json({ key });
	} catch (error) {
		console.error('Error retrieving API key:', error);
		return json({ error: 'Failed to retrieve API key' }, { status: 500 });
	}
}
