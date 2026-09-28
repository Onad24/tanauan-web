import { redirect } from '@sveltejs/kit';
import { getAdmin } from '$lib/firebaseAdmin';
import { defaultNavDepartments } from '$lib/config';

export async function load({ parent }) {
	const { user } = await parent();
	if (!user?.isSuperAdmin) throw redirect(303, '/admin/posts');

	try {
		const { db } = await getAdmin();
		const snapshot = await db.collection('nav_departments').orderBy('order').get();

		let groups;
		let isSeeded = false;

		if (!snapshot.empty) {
			groups = snapshot.docs.map((d) => {
				const data = d.data();
				if (data.updatedAt?.toDate) data.updatedAt = data.updatedAt.toDate().toISOString();
				return { id: d.id, ...data };
			});
		} else {
			// Return defaults but flag as not yet seeded
			groups = defaultNavDepartments.map((g, i) => ({ ...g, id: `default-${i}`, _isDefault: true }));
			isSeeded = false;
		}

		return { groups, isSeeded };
	} catch (err) {
		console.error('departments page.server error:', err);
		return {
			groups: defaultNavDepartments.map((g, i) => ({ ...g, id: `default-${i}`, _isDefault: true })),
			isSeeded: false,
			error: err.message
		};
	}
}
