import { json } from '@sveltejs/kit';
import { getAdmin } from '$lib/firebaseAdmin';
import { defaultNavDepartments } from '$lib/config';

// GET /api/nav-departments
// Returns department groups + offices for the navbar.
// Falls back to defaultNavDepartments if Firestore is empty or errors.
export async function GET() {
	try {
		const { db } = await getAdmin();
		const snapshot = await db.collection('nav_departments').orderBy('order').get();

		if (!snapshot.empty) {
			let groups = [];
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
				if (data.group === 'Special Bodies') {
					data.group = 'Tanauan Association of Municipal Employees (TAME)';
				}
				if (data.group === 'Other LGU Departments') {
					data.group = 'Other LGU Offices';
				}
				if (data.group === 'MLGOO' || data.group?.includes('MLGOO')) {
					data.category = 'national';
				}
				if (data.group === 'Office of the Vice Mayor' || data.group?.includes('Vice Mayor')) {
					data.offices = vmOffices;
				}
				if (data.group === 'Office of the Sangguniang Bayan' || data.group === 'Sangguniang Bayan') {
					data.offices = sbOffices;
				}
				groups.push({ id: d.id, ...data });
			}
			const hasSbDoc = groups.some(
				(g) => g.group === 'Office of the Sangguniang Bayan' || g.group === 'Sangguniang Bayan'
			);
			if (!hasSbDoc) {
				groups.push({
					id: 'doc-sangguniang-bayan',
					group: 'Office of the Sangguniang Bayan',
					category: 'local',
					order: 3,
					offices: sbOffices
				});
			}
			groups.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
			return json({ groups });
		}

		// No data yet — return default (auto-seed on first admin save)
		return json({ groups: defaultNavDepartments, seeded: true });
	} catch (err) {
		console.error('nav-departments GET error:', err);
		// Always fall back to defaults so the navbar never breaks
		return json({ groups: defaultNavDepartments, fallback: true });
	}
}
