/**
 * Shared server-side role guard for API endpoints.
 */
import { json } from '@sveltejs/kit';
import initFirebaseAdmin, { getAdmin } from '$lib/firebaseAdmin';

/**
 * Verifies the session cookie and returns caller's user record and permissions.
 */
export async function requireAuth(event) {
	const session = event.cookies.get('session');
	if (!session) {
		return json({ error: 'Unauthorized: Please log in' }, { status: 401 });
	}

	try {
		const admin = initFirebaseAdmin();
		const decoded = await admin.auth().verifySessionCookie(session, true);

		const { db } = await getAdmin();
		const snap = await db
			.collection('users')
			.where('email', '==', decoded.email)
			.limit(1)
			.get();

		let role = '';
		let portalRole = '';
		let name = '';
		let department = '';

		if (!snap.empty) {
			const data = snap.docs[0].data();
			role = (data.role || '').toLowerCase().trim();
			portalRole = (data.portalRole || '').toLowerCase().trim();
			name = data.name || '';
			department = data.department || '';
		}

		const isSuperAdmin = role === 'super admin' || portalRole === 'super admin';
		const isDeptHead = isSuperAdmin || portalRole === 'department head';
		const isDesigner = isDeptHead || portalRole === 'page designer';

		const resolvedPortalRole = isSuperAdmin
			? 'super admin'
			: portalRole || (isDeptHead ? 'department head' : 'staff');

		return {
			uid: decoded.uid,
			email: decoded.email,
			name,
			role,
			portalRole: resolvedPortalRole,
			department,
			isSuperAdmin,
			isDeptHead,
			isDesigner
		};
	} catch (e) {
		return json({ error: 'Unauthorized session' }, { status: 401 });
	}
}

/**
 * Requires caller to be a super admin.
 */
export async function requireSuperAdmin(event) {
	const auth = await requireAuth(event);
	if (isAuthError(auth)) return auth;

	if (!auth.isSuperAdmin) {
		return json({ error: 'Forbidden: Super Admin only' }, { status: 403 });
	}
	return auth;
}

/**
 * Requires caller to be a Department Head or Super Admin.
 */
export async function requireDeptHeadOrSuper(event) {
	const auth = await requireAuth(event);
	if (isAuthError(auth)) return auth;

	if (!auth.isDeptHead && !auth.isSuperAdmin) {
		return json({ error: 'Forbidden: Department Head or Super Admin only' }, { status: 403 });
	}
	return auth;
}

/**
 * Returns true if the result is an error Response.
 */
export function isAuthError(result) {
	return result instanceof Response;
}
