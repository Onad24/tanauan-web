import { getAdmin } from '$lib/firebaseAdmin';

export async function load({ parent }) {
	const { user } = await parent();

	try {
		const { db } = await getAdmin();

		const [postsSnap, usersSnap] = await Promise.all([
			db.collection('posts').orderBy('date_added', 'desc').limit(20).get().catch(() => ({ docs: [], size: 0 })),
			db.collection('users').get().catch(() => ({ size: 0 }))
		]);

		const recentPosts = postsSnap.docs.map((d) => {
			const data = d.data();
			if (data.date_added?.toDate) data.date_added = data.date_added.toDate().toISOString();
			return { id: d.id, ...data };
		});

		const totalPosts = postsSnap.size || 0;
		const totalUsers = usersSnap.size || 0;
		const pendingCount = recentPosts.filter((p) => p.status === 'pending').length;

		return {
			recentPosts,
			totalPosts,
			totalUsers,
			pendingCount,
			currentUser: user
		};
	} catch (err) {
		console.error('Admin dashboard overview load error:', err);
		return {
			recentPosts: [],
			totalPosts: 0,
			totalUsers: 0,
			pendingCount: 0,
			currentUser: user
		};
	}
}
