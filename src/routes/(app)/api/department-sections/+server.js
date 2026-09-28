import { json } from '@sveltejs/kit';
import { getAdmin } from '$lib/firebaseAdmin';

function slugify(str) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

// Same typo-route alias used by Departments/+layout.server.js ("/Departments/Slaugtherhouse")
function normalizeSlug(str) {
	const s = slugify(str || '');
	return s === 'slaugtherhouse' ? 'slaughterhouse' : s;
}

// GET /api/department-sections?department=MSWDO
// Returns only publicly live sections (approved, or legacy docs with no status) for a
// department. Department names are matched by slug so route segments such as
// "Vice-Mayors-Office" line up with stored names such as "Vice Mayor's Office".
export async function GET({ url }) {
	const department = url.searchParams.get('department');
	if (!department) return json({ sections: [] });

	try {
		const { db } = await getAdmin();
		// The collection is tiny (one doc per designed section), so fetch everything and
		// filter in memory — slug comparison cannot be expressed as a Firestore query.
		const snapshot = await db.collection('department_sections').get();

		const targetSlug = normalizeSlug(department);

		let sections = snapshot.docs
			.map((d) => {
				const data = d.data();
				if (data.createdAt?.toDate) data.createdAt = data.createdAt.toDate().toISOString();
				if (data.updatedAt?.toDate) data.updatedAt = data.updatedAt.toDate().toISOString();
				return { id: d.id, ...data };
			})
			// Pending designs must never go live; a missing status means a legacy doc → keep it
			.filter(
				(s) => (!s.status || s.status === 'approved') && normalizeSlug(s.department) === targetSlug
			);

		// In-memory sort by order, then label
		sections.sort(
			(a, b) =>
				(a.order ?? 0) - (b.order ?? 0) ||
				String(a.label || '').localeCompare(String(b.label || ''))
		);

		return json({ sections });
	} catch (err) {
		console.error('department-sections GET error:', err);
		return json({ sections: [], error: err.message }, { status: 500 });
	}
}
