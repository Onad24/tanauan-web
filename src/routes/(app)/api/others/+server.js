import { json } from '@sveltejs/kit';
import { getAdmin } from '$lib/firebaseAdmin';

// GET /api/personnel?department=...&office=...
export async function GET({ url }) {
	try {
		const department = url.searchParams.get('department');
		const type = url.searchParams.get('type');

		const { db } = await getAdmin();
		let query = db.collection('others');

		if (department) query = query.where('department', '==', department);
		if (type) query = query.where('type', '==', type);

		const snapshot = await query.get();
		const posts = snapshot.docs.map((d) => {
			const data = d.data();
			if (data.date_added && typeof data.date_added.toDate === 'function') {
				data.date_added = data.date_added.toDate().toISOString();
			}
			return { id: d.id, ...data };
		});

		return json({ posts });
	} catch (err) {
		console.error('Error fetching personnel:', err);
		return json({ error: err.message || 'Server error' }, { status: 500 });
	}
}
