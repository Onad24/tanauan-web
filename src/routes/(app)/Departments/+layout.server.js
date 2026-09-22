import { getAdmin } from '$lib/firebaseAdmin';

function slugify(str) {
	return str
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');
}

/**
 * Shared layout loader for all /Departments/* pages.
 * Derives the department name from the URL segment and fetches
 * the corresponding office_page_data document from Firestore.
 * If no data exists, returns null so pages can use fallback defaults.
 */
export async function load({ url, depends }) {
	depends('app:office_page_data');

	try {
		// Extract department slug from URL: /Departments/Treasurer → "Treasurer"
		const parts = url.pathname.split('/').filter(Boolean);
		const deptSegment = decodeURIComponent(parts[1] ?? ''); // index 0 = "Departments", index 1 = dept name

		if (!deptSegment) return { officePageData: null };

		let docId = slugify(deptSegment);
		if (docId === 'slaugtherhouse') docId = 'slaughterhouse';

		const { db } = await getAdmin();
		let doc = await db.collection('office_page_data').doc(docId).get();

		// Fallback: if not found, check if saved under exact raw segment
		if (!doc.exists && deptSegment !== docId) {
			doc = await db.collection('office_page_data').doc(deptSegment).get();
		}

		if (!doc.exists) return { officePageData: null };

		const data = doc.data();
		// Serialize Firestore Timestamps
		if (data.updatedAt?.toDate) data.updatedAt = data.updatedAt.toDate().toISOString();

		return { officePageData: { id: doc.id, ...data } };
	} catch (err) {
		console.error('Departments layout.server error (non-fatal):', err.message);
		return { officePageData: null };
	}
}

