import { getAdmin } from '$lib/firebaseAdmin';
import { requireAuth, isAuthError } from '$lib/serverGuard';
import { departments } from '$lib/config';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const auth = await requireAuth(event);
	if (isAuthError(auth)) throw redirect(303, '/admin/login');

	try {
		const { db } = await getAdmin();

		// Fetch all existing office_page_data docs
		const snap = await db.collection('office_page_data').get();
		const existing = {};
		for (const d of snap.docs) {
			const data = d.data();
			if (data.updatedAt?.toDate) data.updatedAt = data.updatedAt.toDate().toISOString();
			existing[data.department] = { id: d.id, ...data };
		}

		const deptList = departments
			.filter((d) => d.name !== 'System Administrator')
			.map((d) => d.name);

		return {
			deptList,
			existing,
			isSuperAdmin: auth.isSuperAdmin,
			authDepartment: auth.department
		};
	} catch (err) {
		console.error('office-page-data page.server error:', err);
		return {
			deptList: departments
				.filter((d) => d.name !== 'System Administrator')
				.map((d) => d.name),
			existing: {},
			isSuperAdmin: auth?.isSuperAdmin ?? false,
			authDepartment: auth?.department ?? ''
		};
	}
}
