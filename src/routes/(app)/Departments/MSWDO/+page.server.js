import { getAdmin } from '$lib/firebaseAdmin';

const DEPT = 'MSWDO';

export async function load() {
	try {
		const { db } = await getAdmin();

		// Load MSWDO sections without composite index requirement
		const sectionsSnap = await db
			.collection('department_sections')
			.where('department', '==', DEPT)
			.get();

		let sections = sectionsSnap.docs.map((d) => {
			const data = d.data();
			if (data.createdAt?.toDate) data.createdAt = data.createdAt.toDate().toISOString();
			if (data.updatedAt?.toDate) data.updatedAt = data.updatedAt.toDate().toISOString();
			return { id: d.id, ...data };
		});

		// Sort in memory by order ASC
		sections.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

		// Load all posts for MSWDO without composite index requirement
		const postsSnap = await db
			.collection('posts')
			.where('department', '==', DEPT)
			.get();

		let posts = postsSnap.docs.map((d) => {
			const data = d.data();
			let dateMs = 0;
			if (data.date_added?.toDate) {
				dateMs = data.date_added.toDate().getTime();
				data.date_added = data.date_added.toDate().toISOString();
			} else if (data.date_added) {
				dateMs = new Date(data.date_added).getTime();
			}
			return { id: d.id, ...data, _dateMs: dateMs };
		});

		// Filter to only approved posts (or legacy posts without status field) for the public site
		posts = posts.filter((p) => p.status === 'approved' || !p.status);

		// Sort in memory by date_added DESC
		posts.sort((a, b) => b._dateMs - a._dateMs);

		return { sections, posts };
	} catch (err) {
		console.error('MSWDO page.server error:', err);
		return { sections: [], posts: [], error: err.message };
	}
}
