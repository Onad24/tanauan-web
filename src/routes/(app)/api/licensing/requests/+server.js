import fs from 'fs/promises';
import path from 'path';
import { json } from '@sveltejs/kit';

/**
 * Accept a licensing schedule request. Stores requests into data/licensing-requests.json
 * This replaces the lightweight stub with basic persistence for local development.
 */
export async function POST({ request }) {
	try {
		const body = await request.json();
		// support multiple possible field names from the client
		const name = body.name || body.fullName || body.clientName;
		const contact = body.contact || body.email || '';
		const purpose = body.purpose || body.applicationType || '';
		const preferredDate = body.preferredDate || body.desiredDate || null;

		if (!name || !purpose) {
			return json({ error: 'missing required fields: name and purpose' }, { status: 400 });
		}

		const entry = {
			id: `req_${Date.now()}`,
			name,
			contact,
			purpose,
			preferredDate,
			createdAt: new Date().toISOString()
		};

		const dataDir = path.join(process.cwd(), 'data');
		const file = path.join(dataDir, 'licensing-requests.json');
		await fs.mkdir(dataDir, { recursive: true });

		let existing = [];
		try {
			const txt = await fs.readFile(file, 'utf8');
			existing = JSON.parse(txt || '[]');
		} catch (e) {
			existing = [];
		}

		existing.push(entry);
		await fs.writeFile(file, JSON.stringify(existing, null, 2), 'utf8');

		return json({ success: true, entry }, { status: 201 });
	} catch (err) {
		console.error('licensing request error', err);
		return json({ error: 'server error' }, { status: 500 });
	}
}
