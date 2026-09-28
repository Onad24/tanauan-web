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
		const { awards, awarding_body, department, description, media, year } = body;

		if (!awards) {
			return json({ error: 'Header is required' }, { status: 400 });
		}

		// Filter out null/undefined/empty media URLs
		const filteredMedia = (media || []).filter(
			(url) => url && typeof url === 'string' && url.trim()
		);

		const newPost = {
			awards: awards || '',
			awarding_body: awarding_body || '',
			department: department || '',
			description: description || '',
			media: filteredMedia,
			year: year || '',
			date_added: admin.firestore.Timestamp.now()
		};

		const docRef = await db.collection('awards').add(newPost);

		// Convert timestamp to ISO string for response
		const responsePost = {
			id: docRef.id,
			awards: newPost.awards,
			awarding_body: newPost.awarding_body,
			department: newPost.department,
			description: newPost.description,
			media: newPost.media,
			year: newPost.year,
			date_added: newPost.date_added.toDate().toISOString()
		};

		return json(responsePost, { status: 201 });
	} catch (error) {
		console.error('Error creating award:', error);
		return json({ error: error.message }, { status: 500 });
	}
}

export async function PUT({ request }) {
	try {
		const { db } = await getAdmin();
		const body = await request.json();
		const { id, awards, awarding_body, department, description, media, year } = body;

		if (!id) {
			return json({ error: 'Award ID is required' }, { status: 400 });
		}

		// Filter out null/undefined/empty media URLs
		const filteredMedia = (media || []).filter(
			(url) => url && typeof url === 'string' && url.trim()
		);

		await db
			.collection('awards')
			.doc(id)
			.update({
				awards: awards || '',
				awarding_body: awarding_body || '',
				department: department || '',
				description: description || '',
				media: filteredMedia,
				year: year || ''
			});

		return json({ success: true });
	} catch (error) {
		console.error('Error updating award:', error);
		return json({ error: error.message }, { status: 500 });
	}
}

export async function DELETE({ request }) {
	try {
		const { db } = await getAdmin();
		const body = await request.json();
		const { id, media } = body;

		if (!id) {
			return json({ error: 'Awaard ID is required' }, { status: 400 });
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

		await db.collection('awards').doc(id).delete();
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting post:', error);
		return json({ error: error.message }, { status: 500 });
	}
}
