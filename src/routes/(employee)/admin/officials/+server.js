import { json } from '@sveltejs/kit';
import { getAdmin } from '$lib/firebaseAdmin';

// POST: Add new user
// PUT: Update user
// DELETE: Delete user

export async function POST({ request }) {
	try {
		const { db, admin } = await getAdmin();
		const body = await request.json();
		const { name, role, barangay, active, portrait, achievements } = body;

		if (!name) {
			return json({ error: 'Name is required' }, { status: 400 });
		}

		const newUser = {
			name,
			role: role || '',
			barangay: barangay || '',
			portrait: portrait || '',
			achievements: Array.isArray(achievements) ? achievements : [],
			active: active !== false,
			date_added: admin.firestore.Timestamp.now()
		};

		const userRef = await db.collection('officials').add(newUser);

		// Convert timestamp to ISO string for response
		const responseUser = {
			id: userRef.id,
			name: newUser.name,
			role: newUser.role,
			barangay: newUser.barangay,
			portrait: newUser.portrait,
			achievements: newUser.achievements,
			active: newUser.active,
			date_added: newUser.date_added.toDate().toISOString()
		};

		return json(responseUser, { status: 201 });
	} catch (error) {
		console.error('Error creating user:', error);
		return json({ error: error.message }, { status: 500 });
	}
}
export async function PUT({ request }) {
	try {
		const { db } = await getAdmin();
		const body = await request.json();
		const { id, name, role, barangay, active, portrait, achievements } = body;

		if (!id) {
			return json({ error: 'User ID is required' }, { status: 400 });
		}

		await db
			.collection('officials')
			.doc(id)
			.update({
				name: name || '',
				role: role || '',
				barangay: barangay || '',
				portrait: portrait || '',
				achievements: Array.isArray(achievements) ? achievements : [],
				active: active !== false
			});

		return json({ success: true });
	} catch (error) {
		console.error('Error updating user:', error);
		return json({ error: error.message }, { status: 500 });
	}
}
export async function DELETE({ request }) {
	try {
		const { db } = await getAdmin();
		const body = await request.json();
		const { id } = body;

		if (!id) {
			return json({ error: 'User ID is required' }, { status: 400 });
		}

		await db.collection('officials').doc(id).delete();
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting user:', error);
		return json({ error: error.message }, { status: 500 });
	}
}
