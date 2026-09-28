import { json } from '@sveltejs/kit';
import { getAdmin } from '$lib/firebaseAdmin';
import { requireDeptHeadOrSuper, isAuthError } from '$lib/serverGuard';

// POST: Add new user (Super admin or Department Head)
// PUT: Update user (Super admin or Department Head)
// DELETE: Delete user (Super admin only)

export async function POST(event) {
	const auth = await requireDeptHeadOrSuper(event);
	if (isAuthError(auth)) return auth;

	try {
		const { db, admin } = await getAdmin();
		const body = await event.request.json();
		const { name, email, role, portalRole, department, office, sb_member, active } = body;

		if (!name) {
			return json({ error: 'Name is required' }, { status: 400 });
		}

		// Department heads can only add users to their own department
		const targetDept = auth.isSuperAdmin ? (department || '') : auth.department;

		// Department heads cannot assign super admin role
		let resolvedPortalRole = portalRole || 'staff';
		if (!auth.isSuperAdmin && resolvedPortalRole === 'super admin') {
			resolvedPortalRole = 'staff';
		}

		const newUser = {
			name,
			email: email || '',
			role: role || '',
			portalRole: resolvedPortalRole,
			department: targetDept,
			office: office || '',
			sb_member: sb_member || '',
			active: active !== false,
			date_added: admin.firestore.Timestamp.now()
		};

		const userRef = await db.collection('users').add(newUser);

		const responseUser = {
			id: userRef.id,
			...newUser,
			date_added: newUser.date_added.toDate().toISOString()
		};

		return json(responseUser, { status: 201 });
	} catch (error) {
		console.error('Error creating user:', error);
		return json({ error: error.message }, { status: 500 });
	}
}

export async function PUT(event) {
	const auth = await requireDeptHeadOrSuper(event);
	if (isAuthError(auth)) return auth;

	try {
		const { db } = await getAdmin();
		const body = await event.request.json();
		const { id, name, email, role, portalRole, department, office, sb_member, active } = body;

		if (!id) {
			return json({ error: 'User ID is required' }, { status: 400 });
		}

		const targetDoc = await db.collection('users').doc(id).get();
		if (!targetDoc.exists) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		const existingData = targetDoc.data();

		// Department heads can only edit users in their department
		if (!auth.isSuperAdmin && existingData.department !== auth.department) {
			return json({ error: 'Forbidden: You can only edit personnel in your department' }, { status: 403 });
		}

		const updateData = {};
		if (name !== undefined) updateData.name = name;
		if (email !== undefined) updateData.email = email;
		if (role !== undefined) updateData.role = role;
		if (office !== undefined) updateData.office = office;
		if (sb_member !== undefined) updateData.sb_member = sb_member;
		if (active !== undefined) updateData.active = active;

		if (auth.isSuperAdmin) {
			if (department !== undefined) updateData.department = department;
			if (portalRole !== undefined) updateData.portalRole = portalRole;
		} else {
			// Department Head can assign 'page designer' or 'staff' or 'department head' within their department
			if (portalRole !== undefined && portalRole !== 'super admin') {
				updateData.portalRole = portalRole;
			}
		}

		await db.collection('users').doc(id).update(updateData);
		return json({ success: true });
	} catch (error) {
		console.error('Error updating user:', error);
		return json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE(event) {
	const auth = await requireDeptHeadOrSuper(event);
	if (isAuthError(auth)) return auth;

	try {
		const { db } = await getAdmin();
		const body = await event.request.json();
		const { id } = body;

		if (!id) {
			return json({ error: 'User ID is required' }, { status: 400 });
		}

		if (!auth.isSuperAdmin) {
			const targetDoc = await db.collection('users').doc(id).get();
			if (!targetDoc.exists || targetDoc.data().department !== auth.department) {
				return json({ error: 'Forbidden: You can only remove personnel from your department' }, { status: 403 });
			}
		}

		await db.collection('users').doc(id).delete();
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting user:', error);
		return json({ error: error.message }, { status: 500 });
	}
}
