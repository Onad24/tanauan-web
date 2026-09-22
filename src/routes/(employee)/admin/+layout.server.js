import { redirect } from '@sveltejs/kit';
import initFirebaseAdmin, { getAdmin } from '$lib/firebaseAdmin';

/** Routes accessible to any authenticated user (any role) */
const PUBLIC_ADMIN_ROUTES = ['/admin/login'];

export async function load({ cookies, url }) {
	// Allow login page to bypass session check
	if (PUBLIC_ADMIN_ROUTES.includes(url.pathname)) {
		return {};
	}

	const session = cookies.get('session');
	if (!session) throw redirect(303, '/admin/login');

	try {
		const admin = initFirebaseAdmin();
		const decoded = await admin.auth().verifySessionCookie(session, true);

		// Look up the user record in Firestore to get their role & portal permissions
		const { db } = await getAdmin();
		let firestoreRole = '';
		let firestorePortalRole = '';
		let firestoreName = '';
		let firestoreDepartment = '';

		try {
			const usersSnap = await db
				.collection('users')
				.where('email', '==', decoded.email)
				.limit(1)
				.get();

			if (!usersSnap.empty) {
				const userData = usersSnap.docs[0].data();
				firestoreRole = (userData.role || '').toLowerCase().trim();
				firestorePortalRole = (userData.portalRole || '').toLowerCase().trim();
				firestoreName = userData.name || '';
				firestoreDepartment = userData.department || '';
			}
		} catch (dbErr) {
			console.warn('Could not load user role from Firestore:', dbErr.message);
		}

		// Calculate permission roles
		const isSuperAdmin = firestoreRole === 'super admin' || firestorePortalRole === 'super admin';
		const isDeptHead = isSuperAdmin || firestorePortalRole === 'department head';
		const isDesigner = isDeptHead || firestorePortalRole === 'page designer';

		const resolvedPortalRole = isSuperAdmin
			? 'super admin'
			: firestorePortalRole || (isDeptHead ? 'department head' : 'staff');

		// Guard super-admin-only departments page
		if (url.pathname.startsWith('/admin/departments') && !isSuperAdmin) {
			throw redirect(303, '/admin/posts');
		}

		// Guard users/employees page: allowed for Super Admin and Department Heads
		if (url.pathname.startsWith('/admin/users') && !isSuperAdmin && !isDeptHead) {
			throw redirect(303, '/admin/posts');
		}

		return {
			user: {
				uid: decoded.uid,
				email: decoded.email,
				name: firestoreName,
				role: firestoreRole,
				portalRole: resolvedPortalRole,
				department: firestoreDepartment,
				isSuperAdmin,
				isDeptHead,
				isDesigner
			}
		};
	} catch (e) {
		if (e?.status === 303) throw e; // let redirects pass through
		console.error('Session verification error:', e?.message || e);
		throw redirect(303, '/admin/login');
	}
}
