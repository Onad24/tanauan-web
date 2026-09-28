import { getAdmin } from '$lib/firebaseAdmin';

export async function load() {
	try {
		const { db } = await getAdmin();
		const snapshot = await db.collection('officials').get();
		const users = snapshot.docs.map((d) => {
			const data = d.data();
			// Convert Firestore Timestamps to ISO strings for serialization
			if (data.date_added && typeof data.date_added.toDate === 'function') {
				data.date_added = data.date_added.toDate().toISOString();
			}
			return { id: d.id, ...data };
		});
		return { users };
	} catch (error) {
		console.error('Error loading users:', error);
		return { users: [], error: error.message };
	}
}
