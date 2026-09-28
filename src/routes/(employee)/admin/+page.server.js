import { getAdmin } from '$lib/firebaseAdmin';
import { defaultNavDepartments } from '$lib/config';

export async function load({ parent }) {
	const { user } = await parent();

	try {
		const { db } = await getAdmin();

		const [postsSnap, usersSnap, deptSnap, pendingSnap] = await Promise.all([
			db
				.collection('posts')
				.orderBy('date_added', 'desc')
				.limit(20)
				.get()
				.catch(() => ({ docs: [], size: 0 })),
			db
				.collection('users')
				.count()
				.get()
				.catch(() => null),
			db
				.collection('nav_departments')
				.get()
				.catch(() => ({ empty: true, docs: [] })),
			db
				.collection('posts')
				.where('status', '==', 'pending')
				.count()
				.get()
				.catch(() => null)
		]);

		const recentPosts = postsSnap.docs.map((d) => {
			const data = d.data();
			if (data.date_added?.toDate) data.date_added = data.date_added.toDate().toISOString();
			return { id: d.id, ...data };
		});

		const groups = deptSnap.empty ? defaultNavDepartments : deptSnap.docs.map((d) => d.data());
		const officeCount = groups.reduce((sum, g) => sum + (g.offices?.length || 0), 0);
		const groupCount = groups.length;

		const totalPosts = postsSnap.size || 0;
		const totalUsers = typeof usersSnap?.data === 'function' ? usersSnap.data().count : 0;
		// Exact count across the whole collection — not just the 20 most recent posts
		const pendingCount =
			typeof pendingSnap?.data === 'function'
				? pendingSnap.data().count
				: recentPosts.filter((p) => p.status === 'pending').length;

		return {
			recentPosts,
			totalPosts,
			totalUsers,
			pendingCount,
			officeCount,
			groupCount,
			currentUser: user
		};
	} catch (err) {
		console.error('Admin dashboard overview load error:', err);
		return {
			recentPosts: [],
			totalPosts: 0,
			totalUsers: 0,
			pendingCount: 0,
			officeCount: 0,
			groupCount: 0,
			currentUser: user
		};
	}
}
