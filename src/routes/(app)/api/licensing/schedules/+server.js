import { json } from '@sveltejs/kit';

/**
 * Temporary stub endpoint to return how many schedules exist for a given date.
 * Replace implementation with Google Sheets lookup when ready.
 */
export function GET({ url }) {
	const date = url.searchParams.get('date');
	if (!date) return json({ error: 'missing date' }, { status: 400 });

	// Mock deterministic count based on date string so different dates yield different counts
	const count = Array.from(date).reduce((s, c) => s + c.charCodeAt(0), 0) % 6;

	return json({ date, count });
}
