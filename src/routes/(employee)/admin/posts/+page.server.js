import { getAdmin } from '$lib/firebaseAdmin';

export async function load({ parent }) {
	const { user } = await parent();

	try {
		const { db } = await getAdmin();

		// Load posts
		const postsSnap = await db.collection('posts').orderBy('date_added', 'desc').get();
		const posts = postsSnap.docs.map((d) => {
			const data = d.data();
			if (data.date_added?.toDate) data.date_added = data.date_added.toDate().toISOString();
			if (data.approvedAt?.toDate) data.approvedAt = data.approvedAt.toDate().toISOString();
			if (data.rejectedAt?.toDate) data.rejectedAt = data.rejectedAt.toDate().toISOString();
			return { id: d.id, ...data };
		});

		// Load all department sections
		const sectionsSnap = await db.collection('department_sections').orderBy('order').get();
		const sections = sectionsSnap.docs.map((d) => {
			const data = d.data();
			if (data.createdAt?.toDate) data.createdAt = data.createdAt.toDate().toISOString();
			if (data.updatedAt?.toDate) data.updatedAt = data.updatedAt.toDate().toISOString();
			return { id: d.id, ...data };
		});

		return { posts, sections, currentUser: user };
	} catch (error) {
		console.error('Error loading posts:', error);
		return { posts: [], sections: [], currentUser: user, error: error.message };
	}
}
