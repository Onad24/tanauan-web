import { json } from '@sveltejs/kit';
import { getAdmin } from '$lib/firebaseAdmin';
import { defaultNavDepartments } from '$lib/config';
import { requireSuperAdmin, isAuthError } from '$lib/serverGuard';

// GET — list all department groups
export async function GET() {
	try {
		const { db } = await getAdmin();
		const snapshot = await db.collection('nav_departments').orderBy('order').get();

		if (!snapshot.empty) {
			const groups = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
			return json({ groups });
		}

		return json({ groups: defaultNavDepartments, seeded: true });
	} catch (err) {
		console.error('departments GET error:', err);
		return json({ groups: defaultNavDepartments, fallback: true });
	}
}

// POST — create a new department group (super admin only)
export async function POST(event) {
	const authCheck = await requireSuperAdmin(event);
	if (isAuthError(authCheck)) return authCheck;

	try {
		const { db, admin } = await getAdmin();
		const body = await event.request.json();
		const { group, offices = [], order = 999, category = 'local' } = body;

		if (!group) return json({ error: 'group name is required' }, { status: 400 });

		const data = {
			group,
			category,
			offices: offices.map((o) => ({ name: o.name || '', href: o.href || '', visible: o.visible !== false })),
			order,
			updatedAt: admin.firestore.Timestamp.now()
		};

		const ref = await db.collection('nav_departments').add(data);
		return json({ id: ref.id, ...data, updatedAt: data.updatedAt.toDate().toISOString() }, { status: 201 });
	} catch (err) {
		console.error('departments POST error:', err);
		return json({ error: err.message }, { status: 500 });
	}
}

// PUT — update a department group (super admin only)
export async function PUT(event) {
	const authCheck = await requireSuperAdmin(event);
	if (isAuthError(authCheck)) return authCheck;

	try {
		const { db, admin } = await getAdmin();
		const body = await event.request.json();
		const { id, group, offices, order, category } = body;

		if (!id) return json({ error: 'id is required' }, { status: 400 });

		const update = { updatedAt: admin.firestore.Timestamp.now() };
		if (group !== undefined) update.group = group;
		if (category !== undefined) update.category = category;
		if (order !== undefined) update.order = order;
		if (offices !== undefined) {
			update.offices = offices.map((o) => ({
				name: o.name || '',
				href: o.href || '',
				visible: o.visible !== false
			}));
		}

		await db.collection('nav_departments').doc(id).update(update);
		return json({ success: true });
	} catch (err) {
		console.error('departments PUT error:', err);
		return json({ error: err.message }, { status: 500 });
	}
}

// DELETE — remove a department group (super admin only)
export async function DELETE(event) {
	const authCheck = await requireSuperAdmin(event);
	if (isAuthError(authCheck)) return authCheck;

	try {
		const { db } = await getAdmin();
		const { id } = await event.request.json();
		if (!id) return json({ error: 'id is required' }, { status: 400 });

		await db.collection('nav_departments').doc(id).delete();
		return json({ success: true });
	} catch (err) {
		console.error('departments DELETE error:', err);
		return json({ error: err.message }, { status: 500 });
	}
}

// PATCH — seed Firestore with default nav departments (super admin only)
export async function PATCH(event) {
	const authCheck = await requireSuperAdmin(event);
	if (isAuthError(authCheck)) return authCheck;

	try {
		const { db, admin } = await getAdmin();
		const snapshot = await db.collection('nav_departments').get();
		if (!snapshot.empty) return json({ message: 'Already seeded', count: snapshot.size });

		const batch = db.batch();
		defaultNavDepartments.forEach((dept) => {
			const ref = db.collection('nav_departments').doc();
			batch.set(ref, { ...dept, updatedAt: admin.firestore.Timestamp.now() });
		});
		await batch.commit();

		return json({ success: true, seeded: defaultNavDepartments.length });
	} catch (err) {
		console.error('departments PATCH (seed) error:', err);
		return json({ error: err.message }, { status: 500 });
	}
}
