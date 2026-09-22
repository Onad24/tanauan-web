import { getAdmin } from '$lib/firebaseAdmin';
import { defaultNavDepartments } from '$lib/config';

/**
 * SSR-loads the nav_departments collection so the navbar can render
 * department groups + offices dynamically without a client-side fetch.
 * Falls back to defaultNavDepartments if Firestore is unavailable.
 */
export async function load() {
	try {
		const { db, admin } = await getAdmin();
		const snapshot = await db.collection('nav_departments').orderBy('order').get();

		if (!snapshot.empty) {
			let docsToMigrate = [];
			let navGroups = [];

			const vmOffices = [
				{ name: 'Mission / Vision', href: '/Departments/Vice-Mayors-Office#mission-vision', visible: true },
				{ name: 'Staffing Pattern', href: '/Departments/Vice-Mayors-Office#staffing', visible: true },
				{ name: 'Services', href: '/Departments/Vice-Mayors-Office#services', visible: true },
				{ name: 'Announcements / Other Info', href: '/Departments/Vice-Mayors-Office#announcements', visible: true }
			];

			const sbOffices = [
				{ name: 'Mission / Vision', href: '/Departments/Sangguniang-Bayan#mission-vision', visible: true },
				{ name: 'Organizational Structure', href: '/Departments/Sangguniang-Bayan#org-chart', visible: true },
				{ name: "Citizen's Charter", href: '/citizens-charter', visible: true },
				{ name: 'Approved Resolutions', href: '/Departments/Sangguniang-Bayan#resolutions', visible: true },
				{ name: 'Ordinances', href: '/Departments/Sangguniang-Bayan#ordinances', visible: true },
				{ name: 'Services Offered', href: '/Departments/Sangguniang-Bayan#services', visible: true },
				{ name: 'Announcements / Other Info', href: '/Departments/Sangguniang-Bayan#announcements', visible: true }
			];

			for (const d of snapshot.docs) {
				const data = d.data();
				delete data.updatedAt;

				if (data.group === 'Special Bodies') {
					data.group = 'Tanauan Association of Municipal Employees (TAME)';
				}

				// Rename Other LGU Departments to Other LGU Offices
				if (data.group === 'Other LGU Departments') {
					data.group = 'Other LGU Offices';
					docsToMigrate.push(db.collection('nav_departments').doc(d.id).update({ group: 'Other LGU Offices' }));
				}

				// Ensure MLGOO is flagged as national agency
				if (data.group === 'MLGOO' || data.group?.includes('MLGOO')) {
					data.category = 'national';
					if (d.data().category !== 'national') {
						docsToMigrate.push(db.collection('nav_departments').doc(d.id).update({ category: 'national' }));
					}
				}

				// Office of the Vice Mayor -> 4 sub-items from diagram
				if (data.group === 'Office of the Vice Mayor' || data.group?.includes('Vice Mayor')) {
					data.offices = vmOffices;
					docsToMigrate.push(
						db.collection('nav_departments').doc(d.id).update({
							offices: vmOffices
						})
					);
				}

				// Office of the Sangguniang Bayan -> 7 sub-items from diagram
				if (data.group === 'Office of the Sangguniang Bayan' || data.group === 'Sangguniang Bayan') {
					data.offices = sbOffices;
					docsToMigrate.push(
						db.collection('nav_departments').doc(d.id).update({
							offices: sbOffices
						})
					);
				}

				navGroups.push({ id: d.id, ...data });
			}

			// Check if Sangguniang Bayan exists as its own doc in Firestore
			const hasSbDoc = navGroups.some(
				(g) => g.group === 'Office of the Sangguniang Bayan' || g.group === 'Sangguniang Bayan'
			);
			if (!hasSbDoc) {
				const sbGroup = {
					group: 'Office of the Sangguniang Bayan',
					category: 'local',
					order: 3,
					offices: sbOffices
				};
				navGroups.push({ id: 'doc-sangguniang-bayan', ...sbGroup });
				if (admin?.firestore?.Timestamp) {
					docsToMigrate.push(
						db.collection('nav_departments').add({
							...sbGroup,
							updatedAt: admin.firestore.Timestamp.now()
						})
					);
				}
			}

			// Run any background migrations without blocking page load
			if (docsToMigrate.length > 0) {
				Promise.allSettled(docsToMigrate).catch((e) => console.error('Nav migration error:', e));
			}

			navGroups.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
			return { navGroups };
		}

		// Firestore is empty — use defaults
		return { navGroups: defaultNavDepartments };
	} catch (err) {
		console.error('Layout nav-departments SSR error (non-fatal):', err.message);
		return { navGroups: defaultNavDepartments };
	}
}
