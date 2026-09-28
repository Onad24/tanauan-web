import { json } from '@sveltejs/kit';
import { getAdmin } from '$lib/firebaseAdmin';
import { deleteMultipleFiles } from '$lib/firebaseStorage';

// POST: Add new post
// PUT: Update post
// DELETE: Delete post

export async function POST({ request }) {
	try {
		const { db, admin } = await getAdmin();
		const body = await request.json();
		const { department, type, media } = body;

		// Filter out null/undefined/empty media URLs
		const filteredMedia = (media || []).filter(
			(url) => url && typeof url === 'string' && url.trim()
		);

		const newPost = {
			department: department || '',
			type: type || '',
			media: filteredMedia,
			date_added: admin.firestore.Timestamp.now()
		};

		const docRef = await db.collection('others').add(newPost);

		// Convert timestamp to ISO string for response
		const responsePost = {
			id: docRef.id,
			department: newPost.department,
			type: newPost.type,
			media: newPost.media,
			date_added: newPost.date_added.toDate().toISOString()
		};

		return json(responsePost, { status: 201 });
	} catch (error) {
		console.error('Error creating other:', error);
		return json({ error: error.message }, { status: 500 });
	}
}

export async function PUT({ request }) {
	try {
		const { db } = await getAdmin();
		const body = await request.json();
		const { id, department, type, media } = body;

		if (!id) {
			return json({ error: 'Others ID is required' }, { status: 400 });
		}

		// Filter out null/undefined/empty media URLs
		const filteredMedia = (media || []).filter(
			(url) => url && typeof url === 'string' && url.trim()
		);

		await db
			.collection('others')
			.doc(id)
			.update({
				department: department || '',
				type: type || '',
				media: filteredMedia
			});

		return json({ success: true });
	} catch (error) {
		console.error('Error updating post:', error);
		return json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE({ request }) {
	try {
		const { db } = await getAdmin();
		const body = await request.json();
		const { id, media } = body;

		if (!id) {
			return json({ error: 'Others ID is required' }, { status: 400 });
		}

		// Delete media files from Storage if any
		if (media && media.length > 0) {
			try {
				// Filter valid URLs before deletion
				const validMedia = media.filter((url) => url && typeof url === 'string');
				if (validMedia.length > 0) {
					await deleteMultipleFiles(validMedia);
				}
			} catch (error) {
				console.error('Error deleting media files:', error);
				// Continue with post deletion even if media deletion fails
			}
		}

		await db.collection('others').doc(id).delete();
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting post:', error);
		return json({ error: error.message }, { status: 500 });
	}
}
