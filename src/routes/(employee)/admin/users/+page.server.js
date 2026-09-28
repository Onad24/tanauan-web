import { redirect } from '@sveltejs/kit';
import { getAdmin } from '$lib/firebaseAdmin';

export async function load({ parent }) {
	const { user } = await parent();
	if (!user?.isSuperAdmin && !user?.isDeptHead) {
		throw redirect(303, '/admin/posts');
	}

	try {
		const { db } = await getAdmin();
		let q = db.collection('users');

		// Department heads only see users within their department
		if (!user.isSuperAdmin && user.department) {
			q = q.where('department', '==', user.department);
		}

		const snapshot = await q.get();
		const users = snapshot.docs.map((d) => {
			const data = d.data();
			if (data.date_added && typeof data.date_added.toDate === 'function') {
				data.date_added = data.date_added.toDate().toISOString();
			}
			return { id: d.id, ...data };
		});

		return { users, currentUser: user };
	} catch (error) {
		console.error('Error loading users:', error);
		return { users: [], currentUser: user, error: error.message };
	}
}
