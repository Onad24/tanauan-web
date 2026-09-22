import { json } from '@sveltejs/kit';
import { getAdmin } from '$lib/firebaseAdmin';

// GET /api/department-sections?department=MSWDO
// Returns all sections for a department, safely sorted in memory by `order`
export async function GET({ url }) {
	const department = url.searchParams.get('department');
	if (!department) return json({ sections: [] });

	try {
		const { db } = await getAdmin();
		const snapshot = await db
			.collection('department_sections')
			.where('department', '==', department)
			.get();

		let sections = snapshot.docs.map((d) => {
			const data = d.data();
			if (data.createdAt?.toDate) data.createdAt = data.createdAt.toDate().toISOString();
			if (data.updatedAt?.toDate) data.updatedAt = data.updatedAt.toDate().toISOString();
			return { id: d.id, ...data };
		});

		// In-memory sort by order
		sections.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

		return json({ sections });
	} catch (err) {
		console.error('department-sections GET error:', err);
		return json({ sections: [], error: err.message }, { status: 500 });
	}
}
