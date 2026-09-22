import { json } from '@sveltejs/kit';
import { getAdmin } from '$lib/firebaseAdmin';
import { requireAuth, isAuthError } from '$lib/serverGuard';

function slugify(str) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

// GET — fetch office page data for a given department
export async function GET(event) {
	const auth = await requireAuth(event);
	if (isAuthError(auth)) return auth;

	try {
		const { db } = await getAdmin();
		const dept = event.url.searchParams.get('department') || '';
		if (!dept) return json({ error: 'department query param is required' }, { status: 400 });

		const docId = slugify(dept);
		const doc = await db.collection('office_page_data').doc(docId).get();

		if (!doc.exists) return json({ data: null });
		const data = doc.data();
		if (data.updatedAt?.toDate) data.updatedAt = data.updatedAt.toDate().toISOString();
		return json({ data: { id: doc.id, ...data } });
	} catch (err) {
		console.error('office-page-data GET error:', err);
		return json({ error: err.message }, { status: 500 });
	}
}

// PUT — create or fully update office page data for a department
export async function PUT(event) {
	const auth = await requireAuth(event);
	if (isAuthError(auth)) return auth;

	try {
		const { db, admin } = await getAdmin();
		const body = await event.request.json();
		const { department, ...fields } = body;

		const targetDept = department || auth.department || '';
		if (!targetDept) {
			return json({ error: 'department is required' }, { status: 400 });
		}

		// Authorization: only super admin can edit any dept; others can only edit their own
		if (!auth.isSuperAdmin && auth.department?.toLowerCase() !== targetDept.toLowerCase()) {
			return json(
				{ error: 'Forbidden: You can only edit your assigned department' },
				{ status: 403 }
			);
		}

		const docId = slugify(targetDept);
		const payload = {
			department: targetDept,
			...fields,
			updatedAt: admin.firestore.Timestamp.now(),
			updatedBy: auth.name || auth.email
		};

		await db.collection('office_page_data').doc(docId).set(payload, { merge: true });
		return json({ success: true, id: docId });
	} catch (err) {
		console.error('office-page-data PUT error:', err);
		return json({ error: err.message }, { status: 500 });
	}
}

// DELETE — remove office page data for a department (super admin only)
export async function DELETE(event) {
	const auth = await requireAuth(event);
	if (isAuthError(auth)) return auth;

	if (!auth.isSuperAdmin) {
		return json({ error: 'Forbidden: Super admin only' }, { status: 403 });
	}

	try {
		const { db } = await getAdmin();
		const { department } = await event.request.json();
		if (!department) return json({ error: 'department is required' }, { status: 400 });

		const docId = slugify(department);
		await db.collection('office_page_data').doc(docId).delete();
		return json({ success: true });
	} catch (err) {
		console.error('office-page-data DELETE error:', err);
		return json({ error: err.message }, { status: 500 });
	}
}
