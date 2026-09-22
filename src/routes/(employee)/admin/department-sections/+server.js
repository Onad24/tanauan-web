import { json } from '@sveltejs/kit';
import { getAdmin } from '$lib/firebaseAdmin';
import { requireAuth, isAuthError } from '$lib/serverGuard';

function slugify(str) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

// POST — create a new section for a department
export async function POST(event) {
	const auth = await requireAuth(event);
	if (isAuthError(auth)) return auth;

	try {
		const { db, admin } = await getAdmin();
		const body = await event.request.json();
		const {
			department,
			label,
			description = '',
			bgColor = '#ffffff',
			hasBorder = false,
			borderColor = '#e2e8f0',
			sectionLayout = 'grid',
			cardStyle = 'default',
			order = 0
		} = body;

		const targetDept = department || auth.department || '';

		if (!targetDept || !label) {
			return json({ error: 'department and label are required' }, { status: 400 });
		}

		// Authorization check
		if (!auth.isSuperAdmin && auth.department?.toLowerCase() !== targetDept.toLowerCase()) {
			return json({ error: 'Forbidden: You can only create sections for your assigned department' }, { status: 403 });
		}

		const isAutoApproved = auth.isSuperAdmin || auth.isDeptHead;
		const status = isAutoApproved ? 'approved' : 'pending';

		const sectionSlug = slugify(label);
		const docId = `${slugify(targetDept)}_${sectionSlug}`;

		const data = {
			department: targetDept,
			sectionSlug,
			label,
			description: description || '',
			bgColor: bgColor || '#ffffff',
			hasBorder: Boolean(hasBorder),
			borderColor: borderColor || '#e2e8f0',
			sectionLayout,
			cardStyle,
			order,
			status,
			createdBy: auth.name || auth.email,
			createdAt: admin.firestore.Timestamp.now(),
			updatedAt: admin.firestore.Timestamp.now()
		};

		await db.collection('department_sections').doc(docId).set(data, { merge: true });

		return json({
			id: docId,
			...data,
			createdAt: data.createdAt.toDate().toISOString(),
			updatedAt: data.updatedAt.toDate().toISOString()
		}, { status: 201 });
	} catch (err) {
		console.error('department-sections POST error:', err);
		return json({ error: err.message }, { status: 500 });
	}
}

// PUT — update section layout / card style / label / description / bgColor / hasBorder / borderColor
export async function PUT(event) {
	const auth = await requireAuth(event);
	if (isAuthError(auth)) return auth;

	try {
		const { db, admin } = await getAdmin();
		const body = await event.request.json();
		const { id, label, description, bgColor, hasBorder, borderColor, sectionLayout, cardStyle, order } = body;

		if (!id) return json({ error: 'id is required' }, { status: 400 });

		const secDoc = await db.collection('department_sections').doc(id).get();
		if (!secDoc.exists) return json({ error: 'Section not found' }, { status: 404 });

		const secData = secDoc.data();
		if (!auth.isSuperAdmin && auth.department?.toLowerCase() !== secData.department?.toLowerCase()) {
			return json({ error: 'Forbidden: You can only edit sections for your assigned department' }, { status: 403 });
		}

		const isAutoApproved = auth.isSuperAdmin || auth.isDeptHead;
		const status = isAutoApproved ? 'approved' : 'pending';

		const update = {
			updatedAt: admin.firestore.Timestamp.now(),
			lastEditedBy: auth.name || auth.email,
			status
		};

		if (label !== undefined) update.label = label;
		if (description !== undefined) update.description = description;
		if (bgColor !== undefined) update.bgColor = bgColor;
		if (hasBorder !== undefined) update.hasBorder = Boolean(hasBorder);
		if (borderColor !== undefined) update.borderColor = borderColor;
		if (sectionLayout !== undefined) update.sectionLayout = sectionLayout;
		if (cardStyle !== undefined) update.cardStyle = cardStyle;
		if (order !== undefined) update.order = order;

		await db.collection('department_sections').doc(id).update(update);
		return json({ success: true, status });
	} catch (err) {
		console.error('department-sections PUT error:', err);
		return json({ error: err.message }, { status: 500 });
	}
}

// DELETE — remove a section
export async function DELETE(event) {
	const auth = await requireAuth(event);
	if (isAuthError(auth)) return auth;

	try {
		const { db } = await getAdmin();
		const { id } = await event.request.json();
		if (!id) return json({ error: 'id is required' }, { status: 400 });

		const secDoc = await db.collection('department_sections').doc(id).get();
		if (secDoc.exists) {
			const secData = secDoc.data();
			if (!auth.isSuperAdmin && auth.department?.toLowerCase() !== secData.department?.toLowerCase()) {
				return json({ error: 'Forbidden' }, { status: 403 });
			}
		}

		await db.collection('department_sections').doc(id).delete();
		return json({ success: true });
	} catch (err) {
		console.error('department-sections DELETE error:', err);
		return json({ error: err.message }, { status: 500 });
	}
}
