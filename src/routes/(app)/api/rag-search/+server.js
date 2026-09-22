import { json } from '@sveltejs/kit';
import { searchDocuments, getRelevantContext } from '$lib/ragSearch';

export async function POST({ request }) {
	try {
		const { query } = await request.json();

		if (!query || typeof query !== 'string') {
			return json({ error: 'Query is required and must be a string' }, { status: 400 });
		}

		const results = searchDocuments(query, 3);
		const context = getRelevantContext(query, 3);

		return json({
			context,
			results,
			success: true
		});
	} catch (error) {
		console.error('RAG search error:', error);
		return json({ error: 'Failed to search knowledge base' }, { status: 500 });
	}
}
