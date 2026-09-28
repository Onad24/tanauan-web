import { getAdmin } from '$lib/firebaseAdmin';

export async function load() {
	try {
		const { db } = await getAdmin();
		const snapshot = await db.collection('others').get();
		const posts = snapshot.docs.map((d) => {
			const data = d.data();
			// Convert Firestore Timestamps to ISO strings for serialization
			if (data.date_added && typeof data.date_added.toDate === 'function') {
				data.date_added = data.date_added.toDate().toISOString();
			}
			return { id: d.id, ...data };
		});
		return { posts };
	} catch (error) {
		console.error('Error loading others:', error);
		return { posts: [], error: error.message };
	}
}
