import { getAdmin } from '$lib/firebaseAdmin';

export async function load() {
	try {
		const { db } = await getAdmin();
		const snapshot = await db.collection('officials').where('active', '==', true).get();

		const officials = snapshot.docs.map((d) => {
			const data = d.data();
			// Convert Firestore Timestamps to ISO strings for serialization
			if (data.date_added && typeof data.date_added.toDate === 'function') {
				data.date_added = data.date_added.toDate().toISOString();
			}
			return { id: d.id, ...data };
		});

		// Organize by role and barangay for display
		const mayor = officials.find((o) => o.role.toLowerCase().includes('mayor') && !o.barangay);
		const viceMayor = officials.find((o) => o.role.toLowerCase().includes('vice') && !o.barangay);
		const barangayOfficials = officials.filter((o) => o.barangay);
		const councilors = officials.filter(
			(o) => o.role.toLowerCase().includes('councilor') && !o.barangay
		);
		const appointedOfficials = officials.filter(
			(o) =>
				!o.role.toLowerCase().includes('mayor') &&
				!o.role.toLowerCase().includes('vice') &&
				!o.role.toLowerCase().includes('councilor') &&
				!o.barangay
		);

		return {
			mayor,
			viceMayor,
			councilors,
			barangayOfficials,
			appointedOfficials,
			allOfficials: officials
		};
	} catch (error) {
		console.error('Error loading officials:', error);
		return {
			mayor: null,
			viceMayor: null,
			councilors: [],
			barangayOfficials: [],
			appointedOfficials: [],
			allOfficials: [],
			error: error.message
		};
	}
}
