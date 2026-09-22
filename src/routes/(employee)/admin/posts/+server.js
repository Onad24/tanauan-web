import { json } from '@sveltejs/kit';
import { getAdmin } from '$lib/firebaseAdmin';
import { deleteMultipleFiles } from '$lib/firebaseStorage';
import { requireAuth, isAuthError } from '$lib/serverGuard';

// POST: Add new post (Auto-approved for Super Admin & Dept Head; Pending for Page Designer)
// PUT: Update post
// PATCH: Approve/Reject or Toggle featured highlight
// DELETE: Delete post

export async function POST(event) {
	const auth = await requireAuth(event);
	if (isAuthError(auth)) return auth;

	try {
		const { db, admin } = await getAdmin();
		const body = await event.request.json();
		const { header, content, department, type, sectionSlug, sectionLabel, cardStyle, isFeatured, link, media } = body;

		if (!header) {
			return json({ error: 'Header is required' }, { status: 400 });
		}

		// Calculate approval status based on caller's role
		const targetDept = department || auth.department || '';
		const isAuthorizedToAutoApprove =
			auth.isSuperAdmin ||
			(auth.isDeptHead && auth.department?.toLowerCase() === targetDept.toLowerCase());

		const status = isAuthorizedToAutoApprove ? 'approved' : 'pending';

		// Filter out null/undefined/empty media URLs
		const filteredMedia = (media || []).filter(
			(url) => url && typeof url === 'string' && url.trim()
		);

		const batch = db.batch();

		// If this post is marked as featured, unset other featured posts in the same section
		if (isFeatured && sectionSlug) {
			const snap = await db
				.collection('posts')
				.where('sectionSlug', '==', sectionSlug)
				.get();
			snap.forEach((doc) => {
				if (doc.data().isFeatured) {
					batch.update(doc.ref, { isFeatured: false });
				}
			});
		}

		const docRef = db.collection('posts').doc();
		const newPost = {
			header,
			content: content || '',
			department: targetDept,
			type: type || '',
			sectionSlug: sectionSlug || '',
			sectionLabel: sectionLabel || '',
			cardStyle: cardStyle || 'default',
			isFeatured: Boolean(isFeatured),
			status,
			submittedBy: auth.name || auth.email,
			submittedByEmail: auth.email,
			approvedBy: isAuthorizedToAutoApprove ? (auth.name || 'System Admin') : null,
			link: link || '',
			media: filteredMedia,
			date_added: admin.firestore.Timestamp.now()
		};

		batch.set(docRef, newPost);
		await batch.commit();

		const responsePost = {
			id: docRef.id,
			...newPost,
			date_added: newPost.date_added.toDate().toISOString()
		};

		return json(responsePost, { status: 201 });
	} catch (error) {
		console.error('Error creating post:', error);
		return json({ error: error.message }, { status: 500 });
	}
}

export async function PUT(event) {
	const auth = await requireAuth(event);
	if (isAuthError(auth)) return auth;

	try {
		const { db } = await getAdmin();
		const body = await event.request.json();
		const { id, header, content, department, type, sectionSlug, sectionLabel, cardStyle, isFeatured, link, media } = body;

		if (!id) {
			return json({ error: 'Post ID is required' }, { status: 400 });
		}

		const postDoc = await db.collection('posts').doc(id).get();
		if (!postDoc.exists) {
			return json({ error: 'Post not found' }, { status: 404 });
		}

		const existingPost = postDoc.data();
		const targetDept = department || existingPost.department || auth.department || '';

		const isAuthorizedToAutoApprove =
			auth.isSuperAdmin ||
			(auth.isDeptHead && auth.department?.toLowerCase() === targetDept.toLowerCase());

		// If edited by a designer who is not dept head / super admin, mark as pending review
		const status = isAuthorizedToAutoApprove ? 'approved' : 'pending';

		// Filter out null/undefined/empty media URLs
		const filteredMedia = (media || []).filter(
			(url) => url && typeof url === 'string' && url.trim()
		);

		const batch = db.batch();

		// If marked as featured, unset others in the same section
		if (isFeatured && sectionSlug) {
			const snap = await db
				.collection('posts')
				.where('sectionSlug', '==', sectionSlug)
				.get();
			snap.forEach((doc) => {
				if (doc.id !== id && doc.data().isFeatured) {
					batch.update(doc.ref, { isFeatured: false });
				}
			});
		}

		const docRef = db.collection('posts').doc(id);
		batch.update(docRef, {
			header: header || '',
			content: content || '',
			department: targetDept,
			type: type || '',
			sectionSlug: sectionSlug || '',
			sectionLabel: sectionLabel || '',
			cardStyle: cardStyle || 'default',
			isFeatured: Boolean(isFeatured),
			status,
			lastEditedBy: auth.name || auth.email,
			link: link || '',
			media: filteredMedia
		});

		await batch.commit();

		return json({ success: true, status });
	} catch (error) {
		console.error('Error updating post:', error);
		return json({ error: error.message }, { status: 500 });
	}
}

export async function PATCH(event) {
	const auth = await requireAuth(event);
	if (isAuthError(auth)) return auth;

	try {
		const { db, admin } = await getAdmin();
		const body = await event.request.json();
		const { id, sectionSlug, department, isFeatured, action } = body;

		if (!id) {
			return json({ error: 'Post ID is required' }, { status: 400 });
		}

		const postDoc = await db.collection('posts').doc(id).get();
		if (!postDoc.exists) {
			return json({ error: 'Post not found' }, { status: 404 });
		}
		const existingPost = postDoc.data();
		const targetDept = department || existingPost.department || '';

		const isAuthorizedToApprove =
			auth.isSuperAdmin ||
			(auth.isDeptHead && auth.department?.toLowerCase() === targetDept.toLowerCase());

		const batch = db.batch();
		const targetRef = db.collection('posts').doc(id);

		// 1. Approval / Rejection Action
		if (action === 'approve') {
			if (!isAuthorizedToApprove) {
				return json({ error: 'Forbidden: Only Department Head or Super Admin can approve posts' }, { status: 403 });
			}
			batch.update(targetRef, {
				status: 'approved',
				approvedBy: auth.name || auth.email,
				approvedAt: admin.firestore.Timestamp.now()
			});
		} else if (action === 'reject') {
			if (!isAuthorizedToApprove) {
				return json({ error: 'Forbidden: Only Department Head or Super Admin can reject posts' }, { status: 403 });
			}
			batch.update(targetRef, {
				status: 'rejected',
				rejectedBy: auth.name || auth.email,
				rejectedAt: admin.firestore.Timestamp.now()
			});
		}

		// 2. Featured Highlight Toggle
		if (isFeatured !== undefined) {
			if (isFeatured) {
				let q = db.collection('posts');
				if (sectionSlug) {
					q = q.where('sectionSlug', '==', sectionSlug);
				} else if (department) {
					q = q.where('department', '==', department);
				}
				const snap = await q.get();
				snap.forEach((doc) => {
					if (doc.id !== id && doc.data().isFeatured) {
						batch.update(doc.ref, { isFeatured: false });
					}
				});
			}
			batch.update(targetRef, { isFeatured: Boolean(isFeatured) });
		}

		await batch.commit();

		return json({
			success: true,
			id,
			status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : undefined,
			isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : undefined
		});
	} catch (error) {
		console.error('Error in post PATCH handler:', error);
		return json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE(event) {
	const auth = await requireAuth(event);
	if (isAuthError(auth)) return auth;

	try {
		const { db } = await getAdmin();
		const body = await event.request.json();
		const { id, media } = body;

		if (!id) {
			return json({ error: 'Post ID is required' }, { status: 400 });
		}

		const postDoc = await db.collection('posts').doc(id).get();
		if (!postDoc.exists) {
			return json({ error: 'Post not found' }, { status: 404 });
		}
		const existingPost = postDoc.data();

		// Check permission: super admin or department head of that department
		const isAuthorized =
			auth.isSuperAdmin ||
			(auth.isDeptHead && auth.department?.toLowerCase() === existingPost.department?.toLowerCase());

		if (!isAuthorized) {
			return json({ error: 'Forbidden: You do not have permission to delete this post' }, { status: 403 });
		}

		// Delete media files from Storage if any
		if (media && media.length > 0) {
			try {
				const validMedia = media.filter(
					(url) => url && typeof url === 'string' && url.includes('firebasestorage')
				);
				if (validMedia.length > 0) {
					await deleteMultipleFiles(validMedia);
				}
			} catch (storageErr) {
				console.warn('Storage deletion failed, continuing with Firestore delete:', storageErr);
			}
		}

		await db.collection('posts').doc(id).delete();
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting post:', error);
		return json({ error: error.message }, { status: 500 });
	}
}
