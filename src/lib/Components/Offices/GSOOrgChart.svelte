<script>
	import { fade, fly, scale, slide } from 'svelte/transition';

	// =========================================================================
	// OFFICIAL RATIFIED CSC ORGANIZATIONAL STRUCTURE — GSO TANAUAN
	// Extracted with 100% fidelity from Official LGU Tanauan PDF Document
	// Palette: Strictly Royal Blue (#051026, #0b2154, #1d4ed8, #2563eb)
	//          and Amber Yellow (#f59e0b, #fbbf24, #d97706, #fef3c7) ONLY.
	// =========================================================================

	// Official Ratified Document Scans
	const documentSheets = [
		{
			id: 'part1',
			title: 'Section 1: GSO Head & Office Staff (10)',
			subtitle: 'Eugenio C. Ramos, Jr. & 10 Office Administrative Personnel',
			image: '/GSO-OrgChart-Part1.png'
		},
		{
			id: 'part2',
			title: 'Section 2: Field Workers — Batch 1 (Items 1 – 21)',
			subtitle: 'Maintenance, Electricians, Carpenters & Utility Specialists',
			image: '/GSO-OrgChart-Part2.png'
		},
		{
			id: 'part3',
			title: 'Section 2: Field Workers — Batch 2 (Items 22 – 49)',
			subtitle: 'Logistics Drivers, Welders, Gardeners & Field Support Staff',
			image: '/GSO-OrgChart-Part3.png'
		}
	];

	// Role-specific descriptions generator
	function getRoleDetails(position, name, section) {
		const posLower = position.toLowerCase();
		if (posLower.includes('head') || posLower.includes('operation manager')) {
			return {
				category: 'Executive Leadership & Operations Management',
				overview: 'Overall operational head managing municipal facilities, logistics deployment, asset maintenance, and general support services across all offices and 54 barangays.',
				duties: [
					'Formulates and executes comprehensive maintenance and utility operations plans for all LGU facilities',
					'Directs motor pool operations, municipal vehicle fleet dispatch, and logistics mobilization',
					'Coordinates equipment and venue preparation for civic ceremonies, council sessions, and municipal festivals',
					'Leads rapid logistics response and facility clearance during disasters, typhoons, and local emergencies'
				],
				hub: 'GSO Executive Suite, Tanauan Municipal Hall Complex',
				hours: 'Monday – Friday | 8:00 AM – 5:00 PM (On-Call for Calamities)'
			};
		}
		if (posLower.includes('book binder')) {
			return {
				category: 'Document Archival & Records Preservation',
				overview: 'Specialist in preserving, binding, and restoring municipal records, legislative resolutions, ordinances, and vital civil registration volumes.',
				duties: [
					'Restores and binds permanent municipal council resolutions, ordinances, and executive orders',
					'Applies specialized archival binding techniques to protect historical volumes from tropical humidity and wear',
					'Performs preventative preservation of vital registry books and municipal tax records',
					'Maintains physical book registers and orderly document indexing for fast retrieval'
				],
				hub: 'GSO Records & Archival Binding Desk, Municipal Hall',
				hours: 'Monday – Friday | 8:00 AM – 5:00 PM'
			};
		}
		if (posLower.includes('logistics')) {
			return {
				category: 'Supply Custodianship & Event Staging',
				overview: 'Coordinates municipal equipment allocation, inventory dispatch, and staging requirements for municipal programs and barangay civic gatherings.',
				duties: [
					'Manages municipal sound systems, ceremonial tents, folding stages, and official seating',
					'Coordinates equipment dispatch and transport logistics for town hall assemblies and cultural festivities',
					'Tracks physical inventory of tools, supplies, and maintenance equipment',
					'Assists in warehousing and distribution of emergency relief supplies during municipal calamities'
				],
				hub: 'GSO Logistics Hub & Equipment Depot, Municipal Hall Grounds',
				hours: 'Monday – Friday | 8:00 AM – 5:00 PM'
			};
		}
		if (posLower.includes('electrician')) {
			return {
				category: 'Electrical Systems & Public Lighting Maintenance',
				overview: 'Technical specialist ensuring safe, continuous electrical power across all municipal facilities, public plazas, and municipal streetlight circuits.',
				duties: [
					'Maintains, inspects, and repairs electrical circuits and breaker panels in municipal government buildings',
					'Services public streetlights, municipal park illuminations, and commemorative lighting',
					'Inspects and tests emergency standby power generators for uninterrupted public operations',
					'Installs temporary electrical drops and safe power cabling for civic events and town festivals'
				],
				hub: 'GSO Electrical & Mechanical Workshop, Tanauan Municipal Complex',
				hours: 'Monday – Friday | 8:00 AM – 5:00 PM (Emergency Dispatch Ready)'
			};
		}
		if (posLower.includes('carpenter')) {
			return {
				category: 'Carpentry & Structural Woodworks Maintenance',
				overview: 'Craft specialist responsible for fabricating, repairing, and maintaining wooden structures, office partitions, and ceremonial platforms.',
				duties: [
					'Constructs and repairs office partitions, wooden cabinetry, doors, window casings, and desks',
					'Erects and reinforces temporary wooden stages, podiums, and safety barricades for municipal events',
					'Performs preventative building repairs on roofing trusses, ceilings, and exterior wood fittings',
					'Installs typhoon window shutters and storm barriers on public buildings before typhoons'
				],
				hub: 'GSO Carpentry & Structural Workshop, Municipal Depot',
				hours: 'Monday – Friday | 8:00 AM – 5:00 PM'
			};
		}
		if (posLower.includes('welder')) {
			return {
				category: 'Metal Fabrication & Heavy Utility Welding',
				overview: 'Skilled welder handling metal fabrication, structural repairs, utility truck reinforcement, and metal infrastructure maintenance.',
				duties: [
					'Performs arc and MIG welding on municipal gates, fence panels, drainage grates, and trash cages',
					'Fabricates and repairs steel frames, stage trusses, and vehicle mounting brackets',
					'Conducts structural maintenance on municipal dump trucks and heavy machinery bodies',
					'Reinforces civic center steel columns and municipal playground equipment'
				],
				hub: 'GSO Metalworks & Welding Facility, Municipal Depot',
				hours: 'Monday – Friday | 8:00 AM – 5:00 PM'
			};
		}
		if (posLower.includes('driver')) {
			return {
				category: 'Fleet Operations & Logistical Transport',
				overview: 'Professional motor pool driver responsible for the safe transit of municipal personnel, logistical supplies, and emergency cargo.',
				duties: [
					'Operates municipal service vans, utility haulers, and dump trucks for official municipal tasks',
					'Conducts daily vehicle pre-trip inspections (Battery, Lights, Oil, Water, Brakes, Air, Gas)',
					'Transports municipal medical teams, engineers, social workers, and relief goods to all 54 barangays',
					'Maintains official driver travel logs, fuel consumption records, and preventive maintenance reports'
				],
				hub: 'GSO Motor Pool & Fleet Dispatch, Municipal Hall Grounds',
				hours: 'Monday – Friday | 8:00 AM – 5:00 PM (Rotating Weekend & Emergency Dispatch)'
			};
		}
		if (posLower.includes('park attendant') || posLower.includes('gardener')) {
			return {
				category: 'Public Parks & Landscape Maintenance',
				overview: 'Dedicated grounds specialist keeping municipal plazas, memorial gardens, playgrounds, and public spaces green, vibrant, and clean.',
				duties: [
					'Prunes, waters, and cares for ornamental plants and trees in Tanauan Public Plaza and town parks',
					'Maintains cleanliness of commemorative monuments, fountain areas, and visitor seating',
					'Assists municipal clean-up initiatives and public greening projects across urban thoroughfares',
					'Cleans fallen branches and restores park landscaping following monsoon weather'
				],
				hub: 'Tanauan Public Plaza & Municipal Grounds Care Station',
				hours: 'Monday – Friday | 8:00 AM – 5:00 PM'
			};
		}
		if (posLower.includes('clerical')) {
			return {
				category: 'Administrative Support & Dispatch Coordination',
				overview: 'Provides essential front-desk clerical support, maintaining work orders, supply requisitions, and operational records for the section.',
				duties: [
					'Processes job orders, maintenance service requests, and utility dispatch slips',
					'Maintains personnel daily time logs, monthly accomplishment reports, and supply rosters',
					'Receives and routes official communications from barangay councils and municipal departments',
					'Assists citizens and barangay representatives inquiring about municipal utility and facility bookings'
				],
				hub: 'GSO Administrative Frontline Desk, Tanauan Town Hall',
				hours: 'Monday – Friday | 8:00 AM – 5:00 PM'
			};
		}
		// Default: Utility Worker
		return {
			category: 'Municipal Facilities Upkeep & Utility Support',
			overview: 'Frontline maintenance specialist ensuring cleanliness, functional readiness, and sanitation across all municipal buildings, grounds, and public venues.',
			duties: [
				'Executes daily sanitation, sweeping, and custodial cleaning of municipal offices, hallways, and public restrooms',
				'Sets up tables, chairs, staging equipment, and sound systems for government assemblies and civic ceremonies',
				'Participates in town-wide canal clearing, coastal clean-ups, and public market deep cleaning',
				'Assists in post-typhoon debris clearing, road clearance, and relief goods hauling during emergencies'
			],
			hub: 'GSO Field Operations Hub, Tanauan Municipal Complex',
			hours: 'Monday – Friday | 8:00 AM – 5:00 PM (Emergency Standby Ready)'
		};
	}

	// 1. Executive Leadership
	const headPersonnel = {
		id: 'head-1',
		name: 'EUGENIO C. RAMOS, JR.',
		position: 'GSO Head / Operation Manager',
		status: 'Head',
		section: 'Executive Leadership',
		badge: 'Department Head',
		batch: 'Leadership',
		subCategory: 'Executive',
		...getRoleDetails('GSO Head / Operation Manager', 'EUGENIO C. RAMOS, JR.', 'Executive Leadership')
	};

	// 2. Section 1: Office Staff (10)
	const rawOfficeStaff = [
		{ id: 'os-1', name: 'SOYOSA, HONEYLINE B.', position: 'Clerical / Utility Worker', status: 'Permanent', section: 'Office Staff', subCategory: 'Clerical & Admin' },
		{ id: 'os-2', name: 'NARAJA, PAMELA', position: 'Book Binder', status: 'Permanent', section: 'Office Staff', subCategory: 'Archival & Binding' },
		{ id: 'os-3', name: 'GLORY, ROGER', position: 'Logistics', status: 'Permanent', section: 'Office Staff', subCategory: 'Logistics & Supply' },
		{ id: 'os-4', name: 'CANDILA, AHRJEAN A.', position: 'Clerical Aide', status: 'Casual', section: 'Office Staff', subCategory: 'Clerical & Admin' },
		{ id: 'os-5', name: 'DUMA, PEDRO C.', position: 'Clerical Aide', status: 'Casual', section: 'Office Staff', subCategory: 'Clerical & Admin' },
		{ id: 'os-6', name: 'AVILA, AIZA', position: 'Clerical Aide', status: 'Job Order', section: 'Office Staff', subCategory: 'Clerical & Admin' },
		{ id: 'os-7', name: 'BAÑARES, REMILYN', position: 'Clerical Aide', status: 'Job Order', section: 'Office Staff', subCategory: 'Clerical & Admin' },
		{ id: 'os-8', name: 'GOBENCIONG, GINNA', position: 'Clerical Aide', status: 'Job Order', section: 'Office Staff', subCategory: 'Clerical & Admin' },
		{ id: 'os-9', name: 'LUMBRE, ASUNCION', position: 'Clerical Aide', status: 'Job Order', section: 'Office Staff', subCategory: 'Clerical & Admin' },
		{ id: 'os-10', name: 'TIZON, LORETO', position: 'Clerical Aide', status: 'Job Order', section: 'Office Staff', subCategory: 'Clerical & Admin' }
	];

	const officeStaff = rawOfficeStaff.map((p) => ({
		...p,
		batch: 'Office Staff',
		...getRoleDetails(p.position, p.name, p.section)
	}));

	// 3. Section 2: Field Workers (49)
	const rawFieldWorkers = [
		// Batch 1 (Items 1 – 21)
		{ id: 'fw-1', name: 'ARCENA, ROSIE C.', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-2', name: 'BADRINA, DARYL', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-3', name: 'CADION, RAYLE M.', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-4', name: 'DANDAN, GERALDINE', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-5', name: 'ECHAQUE, CHRISTAL', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-6', name: 'GAUSIN, LORDELIZA A.', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-7', name: 'MARCHADESCH, JESUSITO', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-8', name: 'MARIANO, MAY D.', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-9', name: 'ODULLADA, ADAMSON', position: 'Park Attendant', status: 'Permanent', section: 'Field Workers', batchNum: 1, subCategory: 'Parks & Grounds' },
		{ id: 'fw-10', name: 'REPASA, RANEL', position: 'Carpenter', status: 'Permanent', section: 'Field Workers', batchNum: 1, subCategory: 'Technical Crafts' },
		{ id: 'fw-11', name: 'SONGALIA, ROLANDO', position: 'Electrician', status: 'Permanent', section: 'Field Workers', batchNum: 1, subCategory: 'Technical Crafts' },
		{ id: 'fw-12', name: 'REDOÑA, PAUL', position: 'Assistant Electrician', status: 'Casual', section: 'Field Workers', batchNum: 1, subCategory: 'Technical Crafts' },
		{ id: 'fw-13', name: 'DULAY, ELEUTERIO P.', position: 'Utility Worker', status: 'Casual', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-14', name: 'ABAÑO, RAYMOND', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-15', name: 'ABARIENTOS, ALLAN', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-16', name: 'ALICANDO, JAYRIC', position: 'Assistant Electrician', status: 'Job Order', section: 'Field Workers', batchNum: 1, subCategory: 'Technical Crafts' },
		{ id: 'fw-17', name: 'ALICER, JUNJIE', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-18', name: 'BADEO, DOMINIC', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-19', name: 'BADEO, ROMMEL', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-20', name: 'BETE, JEFFREY', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-21', name: 'CATUDIO, MARJOY', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 1, subCategory: 'Utilities & Maintenance' },

		// Batch 2 (Items 22 – 49)
		{ id: 'fw-22', name: 'CORALES, JOEY', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-23', name: 'CUMPIO, ROGELIO', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-24', name: 'CUMPIO, ZOSIMA', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-25', name: 'DALAGAN, DENNIS', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-26', name: 'DAYA-ON, DENNIS', position: 'Driver', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Logistics & Fleet' },
		{ id: 'fw-27', name: 'DAYA-ON, MELODY', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-28', name: 'DE VEYRA, SIONY', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-29', name: 'DURANA, LARRY', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-30', name: 'ELONA, JANETH', position: 'Clerical Aide', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Parks & Grounds' },
		{ id: 'fw-31', name: 'GARCIA, JERRY', position: 'Gardener', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Parks & Grounds' },
		{ id: 'fw-32', name: 'HABABAG, JOEL', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-33', name: 'HUBAHIB, ANTHONY', position: 'Welder', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Technical Crafts' },
		{ id: 'fw-34', name: 'MERCADO, ALEX', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-35', name: 'NARAJA, REGGIE BOY', position: 'Assistant Electrician', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Technical Crafts' },
		{ id: 'fw-36', name: 'NERJA, ALFONSO', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-37', name: 'OLIMBERIO, CARLOS MIGUEL', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-38', name: 'PALO, FELIX', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-39', name: 'PARUNGAO, MEL IVAN', position: 'Driver', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Logistics & Fleet' },
		{ id: 'fw-40', name: 'PARUNGAO, MELJOHN', position: 'Clerical Aide', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Parks & Grounds' },
		{ id: 'fw-41', name: 'RAZ, ROSELL', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-42', name: 'REBANO, ROQUE', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-43', name: 'REDOÑA, RECHARD', position: 'Driver', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Logistics & Fleet' },
		{ id: 'fw-44', name: 'ROYERAS, ALJHON', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-45', name: 'SANTOS, SALES', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-46', name: 'SOLEDAD, RYAN', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-47', name: 'SOYOSA, MANNIX', position: 'Assistant Electrician', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Technical Crafts' },
		{ id: 'fw-48', name: 'TOLIBAS, BYRON', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' },
		{ id: 'fw-49', name: 'VILLAMOR, CONCORDIO', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers', batchNum: 2, subCategory: 'Utilities & Maintenance' }
	];

	const fieldWorkers = rawFieldWorkers.map((p) => ({
		...p,
		batch: `Field Workers Batch ${p.batchNum}`,
		...getRoleDetails(p.position, p.name, p.section)
	}));

	const allPersonnel = [headPersonnel, ...officeStaff, ...fieldWorkers];

	// =========================================================================
	// COMPONENT STATE (COLLAPSIBLE SECTIONS & VIEWS)
	// =========================================================================
	let mainViewMode = $state('organogram'); // 'organogram' | 'documents'
	let activeSheetIndex = $state(0);

	// Collapsible Section States
	let isHeadSubordinatesExpanded = $state(true);
	let isOfficeStaffExpanded = $state(true);
	let isFieldWorkersExpanded = $state(true);

	// Sub-group toggles inside Field Workers
	let activeFieldSubGroup = $state('all'); // 'all' | 'Technical Crafts' | 'Logistics & Fleet' | 'Parks & Grounds' | 'Utilities & Maintenance'

	// Filters
	let selectedStatusFilter = $state('all'); // 'all' | 'Permanent' | 'Casual' | 'Job Order'
	let searchQuery = $state('');

	// Modals
	let selectedPersonnelModal = $state(null);
	let zoomedImageModal = $state(null);

	// Global Expand / Collapse All
	function expandAll() {
		isHeadSubordinatesExpanded = true;
		isOfficeStaffExpanded = true;
		isFieldWorkersExpanded = true;
	}

	function collapseAll() {
		isHeadSubordinatesExpanded = true;
		isOfficeStaffExpanded = false;
		isFieldWorkersExpanded = false;
	}

	// Filtered Office Staff
	const filteredOfficeStaff = $derived(
		officeStaff.filter((person) => {
			if (selectedStatusFilter !== 'all' && person.status !== selectedStatusFilter) return false;
			if (searchQuery.trim() !== '') {
				const q = searchQuery.toLowerCase().trim();
				return (
					person.name.toLowerCase().includes(q) ||
					person.position.toLowerCase().includes(q) ||
					person.status.toLowerCase().includes(q) ||
					person.subCategory.toLowerCase().includes(q)
				);
			}
			return true;
		})
	);

	// Filtered Field Workers
	let showAllFieldWorkers = $state(false);

	const filteredFieldWorkers = $derived(
		fieldWorkers.filter((person) => {
			if (activeFieldSubGroup !== 'all' && person.subCategory !== activeFieldSubGroup) return false;
			if (selectedStatusFilter !== 'all' && person.status !== selectedStatusFilter) return false;
			if (searchQuery.trim() !== '') {
				const q = searchQuery.toLowerCase().trim();
				return (
					person.name.toLowerCase().includes(q) ||
					person.position.toLowerCase().includes(q) ||
					person.status.toLowerCase().includes(q) ||
					person.subCategory.toLowerCase().includes(q)
				);
			}
			return true;
		})
	);

	const displayedFieldWorkers = $derived(
		showAllFieldWorkers ? filteredFieldWorkers : filteredFieldWorkers.slice(0, 8)
	);

	// Total filtered count
	const totalFilteredCount = $derived(
		(matchesHead(headPersonnel, searchQuery, selectedStatusFilter) ? 1 : 0) +
			filteredOfficeStaff.length +
			filteredFieldWorkers.length
	);

	function matchesHead(head, q, stat) {
		if (stat !== 'all' && stat !== 'Permanent' && stat !== 'Head') return false;
		if (!q.trim()) return true;
		const query = q.toLowerCase().trim();
		return head.name.toLowerCase().includes(query) || head.position.toLowerCase().includes(query);
	}

	function openPersonnelModal(p) {
		selectedPersonnelModal = p;
	}

	function closePersonnelModal() {
		selectedPersonnelModal = null;
	}

	function openZoomModal(imgSrc) {
		zoomedImageModal = imgSrc;
	}

	function closeZoomModal() {
		zoomedImageModal = null;
	}

	$effect(() => {
		if (typeof document !== 'undefined') {
			if (selectedPersonnelModal || zoomedImageModal) {
				document.body.classList.add('modal-open');
				document.body.style.overflow = 'hidden';
			} else {
				document.body.classList.remove('modal-open');
				document.body.style.overflow = '';
			}
		}
		return () => {
			if (typeof document !== 'undefined') {
				document.body.classList.remove('modal-open');
				document.body.style.overflow = '';
			}
		};
	});

	// Status badge styles: STRICTLY ROYAL BLUE & AMBER YELLOW
	function getStatusBadgeStyles(status) {
		if (status === 'Head') {
			return 'bg-gradient-to-r from-amber-400 to-amber-500 text-blue-950 font-black border border-amber-300 shadow-sm';
		}
		if (status === 'Permanent') {
			return 'bg-blue-950 text-amber-300 font-extrabold border border-amber-400/80 shadow-2xs';
		}
		if (status === 'Casual') {
			return 'bg-blue-900 text-amber-200 font-bold border border-amber-500/50 shadow-2xs';
		}
		// Job Order
		return 'bg-blue-950/80 text-amber-300/90 font-semibold border border-blue-700/60';
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') {
			if (selectedPersonnelModal) closePersonnelModal();
			if (zoomedImageModal) closeZoomModal();
		}
	}}
/>

<div class="w-full space-y-8 font-['Poppins',sans-serif]">
	<!-- ========================================================================= -->
	<!-- 1. TOP HERO BANNER: ROYAL BLUE & AMBER YELLOW GRADIENT                   -->
	<!-- ========================================================================= -->
	<div
		class="relative overflow-hidden rounded-3xl border-2 border-amber-500/40 bg-gradient-to-br from-[#051026] via-[#0b2154] to-[#1e40af] p-6 text-white shadow-2xl sm:p-8"
	>
		<!-- Background ambient amber glowing circles -->
		<div
			class="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl"
		></div>
		<div
			class="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-blue-600/25 blur-3xl"
		></div>

		<div class="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
			<div class="flex items-center gap-4">
				<div
					class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-amber-400/60 bg-gradient-to-br from-blue-950 to-blue-900 p-2.5 shadow-lg backdrop-blur-md"
				>
					<img src="/tanauan logo.svg" alt="Tanauan Seal" class="h-full w-full object-contain" />
				</div>
				<div>
					<div class="mb-1 flex flex-wrap items-center gap-2">
						<span
							class="inline-flex items-center gap-1.5 rounded-full border border-amber-400 bg-amber-400 px-3 py-0.5 text-[10px] font-black tracking-widest text-blue-950 uppercase shadow-xs"
						>
							<span class="h-1.5 w-1.5 rounded-full bg-blue-950 animate-pulse"></span>
							OFFICIAL CSC RATIFIED
						</span>
						<span class="text-xs font-semibold text-amber-200">Municipality of Tanauan, Leyte</span>
					</div>
					<h2 class="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl">
						General Services Section
					</h2>
					<p class="mt-0.5 text-xs font-bold tracking-wider text-amber-300 uppercase sm:text-sm">
						Organizational Structure & Personnel Directory
					</p>
				</div>
			</div>

			<!-- Quick Metric Badges (Royal Blue & Amber Yellow Only) -->
			<div class="flex flex-wrap items-center gap-2.5">
				<div
					class="rounded-2xl border border-amber-400/30 bg-blue-950/70 px-4 py-2.5 text-center backdrop-blur-md"
				>
					<div class="text-[10px] font-extrabold tracking-wider text-amber-200 uppercase">Office Staff</div>
					<div class="text-xl font-black text-amber-400">10</div>
				</div>
				<div
					class="rounded-2xl border border-amber-400/30 bg-blue-950/70 px-4 py-2.5 text-center backdrop-blur-md"
				>
					<div class="text-[10px] font-extrabold tracking-wider text-amber-200 uppercase">Field Workers</div>
					<div class="text-xl font-black text-amber-400">49</div>
				</div>
				<div
					class="rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-400 to-amber-500 px-4 py-2.5 text-center text-blue-950 shadow-md"
				>
					<div class="text-[10px] font-black tracking-wider uppercase">Total Workforce</div>
					<div class="text-xl font-black">60</div>
				</div>
			</div>
		</div>

		<!-- View Switcher Tabs & Quick Expand/Collapse -->
		<div
			class="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-amber-400/20 pt-6"
		>
			<div class="inline-flex rounded-2xl border border-amber-400/30 bg-blue-950/80 p-1 backdrop-blur-md">
				<button
					type="button"
					onclick={() => (mainViewMode = 'organogram')}
					class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all {mainViewMode ===
					'organogram'
						? 'bg-amber-400 text-blue-950 shadow-md'
						: 'text-amber-100 hover:bg-blue-900/60 hover:text-amber-300'}"
				>
					<span>⚡ Collapsible Organogram</span>
				</button>
				<button
					type="button"
					onclick={() => (mainViewMode = 'documents')}
					class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all {mainViewMode ===
					'documents'
						? 'bg-amber-400 text-blue-950 shadow-md'
						: 'text-amber-100 hover:bg-blue-900/60 hover:text-amber-300'}"
				>
					<span>📄 Official Document Scans (3 Parts)</span>
				</button>
			</div>

			<!-- Expand / Collapse All Buttons -->
			{#if mainViewMode === 'organogram'}
				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={expandAll}
						class="rounded-xl border border-amber-400/40 bg-blue-950 px-3 py-1.5 text-xs font-black text-amber-300 transition-all hover:bg-amber-400 hover:text-blue-950"
					>
						[+] Expand All Sections
					</button>
					<button
						type="button"
						onclick={collapseAll}
						class="rounded-xl border border-amber-400/40 bg-blue-950 px-3 py-1.5 text-xs font-black text-amber-300 transition-all hover:bg-amber-400 hover:text-blue-950"
					>
						[−] Collapse All
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- ========================================================================= -->
	<!-- 2. MODE 1: INTERACTIVE & COLLAPSIBLE ORGANOGRAM                           -->
	<!-- ========================================================================= -->
	{#if mainViewMode === 'organogram'}
		<div class="space-y-8" transition:fade={{ duration: 180 }}>
			<!-- Search & Status Filter Console -->
			<div
				class="space-y-4 rounded-3xl border-2 border-amber-500/30 bg-gradient-to-r from-blue-950 via-[#0d2259] to-blue-950 p-5 text-white shadow-md sm:p-6"
			>
				<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
					<!-- Search Box -->
					<div class="relative w-full md:max-w-md">
						<input
							type="text"
							bind:value={searchQuery}
							placeholder="Search by name, position (e.g. Electrician, Driver, Honeyline)..."
							class="w-full rounded-2xl border-2 border-amber-400/40 bg-blue-900/40 py-2.5 pr-10 pl-4 text-xs font-semibold text-white placeholder-amber-200/60 transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
						/>
						{#if searchQuery}
							<button
								type="button"
								onclick={() => (searchQuery = '')}
								class="absolute top-1/2 right-3 -translate-y-1/2 text-xs font-black text-amber-300 hover:text-amber-100"
								aria-label="Clear search"
							>
								✕
							</button>
						{/if}
					</div>

					<div class="text-xs font-bold text-amber-200">
						Showing <span class="font-black text-amber-400">{totalFilteredCount}</span> of 60 official personnel
					</div>
				</div>

				<!-- Appointment Filter Chips (Royal Blue & Amber Yellow Only) -->
				<div class="flex flex-wrap items-center gap-2 border-t border-amber-400/20 pt-3">
					<span class="mr-1 text-xs font-extrabold text-amber-300 uppercase">Status:</span>
					<button
						type="button"
						onclick={() => (selectedStatusFilter = 'all')}
						class="rounded-xl px-3 py-1 text-xs font-black transition-all {selectedStatusFilter ===
						'all'
							? 'bg-amber-400 text-blue-950 shadow-sm'
							: 'border border-amber-400/30 bg-blue-950 text-amber-200 hover:bg-blue-900'}"
					>
						All Statuses (60)
					</button>
					<button
						type="button"
						onclick={() => (selectedStatusFilter = 'Permanent')}
						class="rounded-xl px-3 py-1 text-xs font-black transition-all {selectedStatusFilter ===
						'Permanent'
							? 'bg-amber-400 text-blue-950 shadow-sm'
							: 'border border-amber-400/30 bg-blue-950 text-amber-200 hover:bg-blue-900'}"
					>
						Permanent (14)
					</button>
					<button
						type="button"
						onclick={() => (selectedStatusFilter = 'Casual')}
						class="rounded-xl px-3 py-1 text-xs font-black transition-all {selectedStatusFilter ===
						'Casual'
							? 'bg-amber-400 text-blue-950 shadow-sm'
							: 'border border-amber-400/30 bg-blue-950 text-amber-200 hover:bg-blue-900'}"
					>
						Casual (4)
					</button>
					<button
						type="button"
						onclick={() => (selectedStatusFilter = 'Job Order')}
						class="rounded-xl px-3 py-1 text-xs font-black transition-all {selectedStatusFilter ===
						'Job Order'
							? 'bg-amber-400 text-blue-950 shadow-sm'
							: 'border border-amber-400/30 bg-blue-950 text-amber-200 hover:bg-blue-900'}"
					>
						Job Order (42)
					</button>
				</div>
			</div>

			<!-- ===================================================================== -->
			<!-- ROOT NODE: EUGENIO C. RAMOS, JR. (GSO HEAD / OPERATION MANAGER)      -->
			<!-- ===================================================================== -->
			{#if matchesHead(headPersonnel, searchQuery, selectedStatusFilter)}
				<div class="flex flex-col items-center">
					<div class="mb-3 text-center">
						<span
							class="inline-block rounded-full border border-amber-400 bg-amber-400/20 px-3 py-1 text-[11px] font-black tracking-widest text-amber-300 uppercase"
						>
							EXECUTIVE LEADERSHIP
						</span>
					</div>

					<!-- Head Card -->
					<div
						class="group relative w-full max-w-lg rounded-3xl border-3 border-amber-400 bg-gradient-to-br from-[#071738] via-[#0b245e] to-[#071738] p-6 text-center text-white shadow-xl transition-all duration-300 hover:scale-103 hover:border-amber-300 hover:shadow-2xl"
					>
						<div class="flex flex-col items-center">
							<div class="relative mb-3">
								<div
									class="flex h-22 w-22 items-center justify-center rounded-2xl border-3 border-amber-400 bg-blue-950 text-3xl font-black text-amber-400 shadow-md"
								>
									ECR
								</div>
								<span
									class="absolute -right-1 -bottom-1 h-5 w-5 rounded-full border-2 border-blue-950 bg-amber-400"
									title="GSO Department Head"
								></span>
							</div>

							<h3 class="text-xl font-black tracking-tight text-white group-hover:text-amber-300">
								{headPersonnel.name}
							</h3>
							<div class="mt-1 text-xs font-extrabold tracking-wide text-amber-300 uppercase">
								{headPersonnel.position}
							</div>
							<div
								class="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-amber-400 bg-amber-400 px-3.5 py-0.5 text-[11px] font-black text-blue-950 uppercase shadow-xs"
							>
								<span>Official Head of Section</span>
							</div>
						</div>

						<p class="mt-4 text-xs leading-relaxed text-slate-300">
							Directs municipal logistics operations, building infrastructure maintenance, and 54
							barangay facility support.
						</p>

						<!-- Actions: Open Profile Modal & Toggle Subordinates -->
						<div
							class="mt-5 flex items-center justify-center gap-2 border-t border-amber-400/30 pt-4"
						>
							<button
								type="button"
								onclick={() => openPersonnelModal(headPersonnel)}
								class="rounded-xl border border-amber-400 bg-amber-400 px-4 py-1.5 text-xs font-black text-blue-950 transition-all hover:bg-amber-300 hover:scale-102"
							>
								Inspect Duties ↗
							</button>
							<button
								type="button"
								onclick={() => (isHeadSubordinatesExpanded = !isHeadSubordinatesExpanded)}
								class="rounded-xl border border-amber-400/60 bg-blue-950/80 px-3.5 py-1.5 text-xs font-bold text-amber-300 transition-all hover:bg-blue-900"
							>
								{isHeadSubordinatesExpanded ? '▲ Hide Staff Branches' : '▼ View Staff Branches'}
							</button>
						</div>
					</div>

					<!-- Visual Hierarchy Connecting Lines -->
					{#if isHeadSubordinatesExpanded}
						<div class="h-10 w-1 bg-amber-400" transition:slide={{ duration: 180 }}></div>
						<div
							class="relative hidden h-1 w-full max-w-4xl bg-amber-400 sm:block"
							transition:slide={{ duration: 180 }}
						>
							<!-- Left Drop to Section 1: Office Staff -->
							<div class="absolute top-0 left-1/4 h-8 w-1 bg-amber-400"></div>
							<!-- Right Drop to Section 2: Field Workers -->
							<div class="absolute top-0 right-1/4 h-8 w-1 bg-amber-400"></div>
						</div>
					{/if}
				</div>
			{/if}

			<!-- ===================================================================== -->
			<!-- SUBORDINATE SECTIONS (COLLAPSIBLE)                                    -->
			<!-- ===================================================================== -->
			{#if isHeadSubordinatesExpanded}
				<div class="space-y-10 pt-2" transition:slide={{ duration: 250 }}>
					<!-- ================================================================= -->
					<!-- SECTION 1: OFFICE STAFF (10 PERSONNEL) - COLLAPSIBLE             -->
					<!-- ================================================================= -->
					<div
						class="overflow-hidden rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-[#091b42] to-[#06122d] shadow-xl"
					>
						<!-- Section Header Toggle Bar -->
						<div
							class="flex flex-col justify-between gap-4 border-b border-amber-400/30 bg-blue-950/90 p-5 sm:flex-row sm:items-center sm:p-6"
						>
							<div class="flex items-center gap-3">
								<div
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400 bg-amber-400 text-sm font-black text-blue-950 shadow-xs"
								>
									01
								</div>
								<div>
									<div class="flex items-center gap-2">
										<h3 class="text-lg font-black tracking-tight text-white uppercase sm:text-xl">
											SECTION 1: OFFICE STAFF
										</h3>
										<span
											class="rounded-full border border-amber-400/60 bg-blue-950 px-2.5 py-0.5 text-xs font-black text-amber-300"
										>
											{filteredOfficeStaff.length} of 10 Staff
										</span>
									</div>
									<p class="text-xs font-semibold text-amber-200">
										Administrative, Logistics, Book Binding & Clerical Specialists
									</p>
								</div>
							</div>

							<div class="flex items-center gap-2">
								<button
									type="button"
									onclick={() => (isOfficeStaffExpanded = !isOfficeStaffExpanded)}
									class="rounded-xl border border-amber-400 bg-amber-400 px-4 py-2 text-xs font-black text-blue-950 transition-all hover:bg-amber-300"
									aria-expanded={isOfficeStaffExpanded}
								>
									{isOfficeStaffExpanded ? '− Collapse Section' : '+ Expand Section (10)'}
								</button>
							</div>
						</div>

						<!-- Collapsible Section Content -->
						{#if isOfficeStaffExpanded}
							<div class="p-5 sm:p-6" transition:slide={{ duration: 200 }}>
								{#if filteredOfficeStaff.length === 0}
									<div class="py-10 text-center text-xs font-bold text-amber-200">
										No office staff match your search/filter criteria.
									</div>
								{:else}
									<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
										{#each filteredOfficeStaff as person (person.id)}
											<button
												type="button"
												onclick={() => openPersonnelModal(person)}
												class="group flex flex-col justify-between rounded-2xl border-2 border-amber-400/30 bg-[#0a1e4a] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:bg-[#0f2d70] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
												in:scale={{ start: 0.95, duration: 150 }}
											>
												<div>
													<div class="mb-3 flex items-center justify-between gap-1">
														<span
															class="rounded-md border border-amber-400/20 bg-blue-950/80 px-2 py-0.5 text-[9px] font-black tracking-wider text-amber-300 uppercase"
														>
															{person.subCategory}
														</span>
														<span
															class="rounded-full px-2 py-0.5 text-[10px] {getStatusBadgeStyles(
																person.status
															)}"
														>
															{person.status}
														</span>
													</div>

													<div class="mb-3 flex items-center gap-2.5">
														<div
															class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-400/60 bg-blue-950 text-sm font-black text-amber-400 shadow-xs"
														>
															{person.name.split(',')[0].slice(0, 2)}
														</div>
														<div class="min-w-0 flex-1">
															<h4
																class="truncate text-xs font-black tracking-tight text-white group-hover:text-amber-300"
																title={person.name}
															>
																{person.name}
															</h4>
															<p
																class="truncate text-[11px] font-bold text-amber-200"
																title={person.position}
															>
																{person.position}
															</p>
														</div>
													</div>
												</div>

												<div
													class="mt-3 flex items-center justify-between border-t border-amber-400/20 pt-2 text-[10px] font-bold text-amber-300/80 group-hover:text-amber-300"
												>
													<span>Tanauan GSO</span>
													<span class="transition-transform group-hover:translate-x-0.5"
														>Click Details ↗</span
													>
												</div>
											</button>
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					</div>

					<!-- ================================================================= -->
					<!-- SECTION 2: FIELD WORKERS (49 PERSONNEL) - COLLAPSIBLE            -->
					<!-- ================================================================= -->
					<div
						class="overflow-hidden rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-[#091b42] to-[#06122d] shadow-xl"
					>
						<!-- Section Header Toggle Bar -->
						<div
							class="flex flex-col justify-between gap-4 border-b border-amber-400/30 bg-blue-950/90 p-5 sm:flex-row sm:items-center sm:p-6"
						>
							<div class="flex items-center gap-3">
								<div
									class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400 bg-amber-400 text-sm font-black text-blue-950 shadow-xs"
								>
									02
								</div>
								<div>
									<div class="flex items-center gap-2">
										<h3 class="text-lg font-black tracking-tight text-white uppercase sm:text-xl">
											SECTION 2: FIELD WORKERS
										</h3>
										<span
											class="rounded-full border border-amber-400/60 bg-blue-950 px-2.5 py-0.5 text-xs font-black text-amber-300"
										>
											{showAllFieldWorkers ? filteredFieldWorkers.length : Math.min(8, filteredFieldWorkers.length)} of {filteredFieldWorkers.length} Workers Shown
										</span>
									</div>
									<p class="text-xs font-semibold text-amber-200">
										Maintenance, Electricians, Carpenters, Drivers, Welders & Utility Crew
									</p>
								</div>
							</div>

							<div class="flex items-center gap-2">
								<button
									type="button"
									onclick={() => (isFieldWorkersExpanded = !isFieldWorkersExpanded)}
									class="rounded-xl border border-amber-400 bg-amber-400 px-4 py-2 text-xs font-black text-blue-950 transition-all hover:bg-amber-300"
									aria-expanded={isFieldWorkersExpanded}
								>
									{isFieldWorkersExpanded ? '− Collapse Section' : '+ Expand Section (49)'}
								</button>
							</div>
						</div>

						<!-- Collapsible Section Content -->
						{#if isFieldWorkersExpanded}
							<div class="p-5 sm:p-6" transition:slide={{ duration: 200 }}>
								<!-- Sub-Category Filter Tabs (Inside Field Workers) -->
								<div class="mb-5 flex flex-wrap items-center gap-2 border-b border-amber-400/20 pb-4">
									<span class="mr-1 text-xs font-black text-amber-300 uppercase">Unit:</span>
									<button
										type="button"
										onclick={() => (activeFieldSubGroup = 'all')}
										class="rounded-xl px-3 py-1 text-xs font-black transition-all {activeFieldSubGroup ===
										'all'
											? 'bg-amber-400 text-blue-950 shadow-xs'
											: 'border border-amber-400/30 bg-blue-950 text-amber-200 hover:bg-blue-900'}"
									>
										All Field Workers (49)
									</button>
									<button
										type="button"
										onclick={() => (activeFieldSubGroup = 'Technical Crafts')}
										class="rounded-xl px-3 py-1 text-xs font-black transition-all {activeFieldSubGroup ===
										'Technical Crafts'
											? 'bg-amber-400 text-blue-950 shadow-xs'
											: 'border border-amber-400/30 bg-blue-950 text-amber-200 hover:bg-blue-900'}"
									>
										⚡ Electricians, Carpenters & Welder (7)
									</button>
									<button
										type="button"
										onclick={() => (activeFieldSubGroup = 'Logistics & Fleet')}
										class="rounded-xl px-3 py-1 text-xs font-black transition-all {activeFieldSubGroup ===
										'Logistics & Fleet'
											? 'bg-amber-400 text-blue-950 shadow-xs'
											: 'border border-amber-400/30 bg-blue-950 text-amber-200 hover:bg-blue-900'}"
									>
										🚚 Drivers & Fleet (3)
									</button>
									<button
										type="button"
										onclick={() => (activeFieldSubGroup = 'Parks & Grounds')}
										class="rounded-xl px-3 py-1 text-xs font-black transition-all {activeFieldSubGroup ===
										'Parks & Grounds'
											? 'bg-amber-400 text-blue-950 shadow-xs'
											: 'border border-amber-400/30 bg-blue-950 text-amber-200 hover:bg-blue-900'}"
									>
										🌿 Parks, Gardeners & Aides (4)
									</button>
									<button
										type="button"
										onclick={() => (activeFieldSubGroup = 'Utilities & Maintenance')}
										class="rounded-xl px-3 py-1 text-xs font-black transition-all {activeFieldSubGroup ===
										'Utilities & Maintenance'
											? 'bg-amber-400 text-blue-950 shadow-xs'
											: 'border border-amber-400/30 bg-blue-950 text-amber-200 hover:bg-blue-900'}"
									>
										🧹 Utility Workers (35)
									</button>
								</div>

								{#if filteredFieldWorkers.length === 0}
									<div class="py-10 text-center text-xs font-bold text-amber-200">
										No field workers match your filter or search query.
									</div>
								{:else}
									<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
										{#each displayedFieldWorkers as person (person.id)}
											<button
												type="button"
												onclick={() => openPersonnelModal(person)}
												class="group flex flex-col justify-between rounded-2xl border-2 border-amber-400/30 bg-[#0a1e4a] p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:bg-[#0f2d70] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
												in:scale={{ start: 0.95, duration: 150 }}
											>
												<div>
													<div class="mb-3 flex items-center justify-between gap-1">
														<span
															class="rounded-md border border-amber-400/20 bg-blue-950/80 px-2 py-0.5 text-[9px] font-black tracking-wider text-amber-300 uppercase"
														>
															{person.subCategory}
														</span>
														<span
															class="rounded-full px-2 py-0.5 text-[10px] {getStatusBadgeStyles(
																person.status
															)}"
														>
															{person.status}
														</span>
													</div>

													<div class="mb-3 flex items-center gap-2.5">
														<div
															class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-400/60 bg-blue-950 text-sm font-black text-amber-400 shadow-xs"
														>
															{person.name.split(',')[0].slice(0, 2)}
														</div>
														<div class="min-w-0 flex-1">
															<h4
																class="truncate text-xs font-black tracking-tight text-white group-hover:text-amber-300"
																title={person.name}
															>
																{person.name}
															</h4>
															<p
																class="truncate text-[11px] font-bold text-amber-200"
																title={person.position}
															>
																{person.position}
															</p>
														</div>
													</div>
												</div>

												<div
													class="mt-3 flex items-center justify-between border-t border-amber-400/20 pt-2 text-[10px] font-bold text-amber-300/80 group-hover:text-amber-300"
												>
													<span>Tanauan GSO</span>
													<span class="transition-transform group-hover:translate-x-0.5"
														>Click Details ↗</span
													>
												</div>
											</button>
										{/each}
									</div>

									{#if filteredFieldWorkers.length > 8}
										<div class="mt-6 flex flex-col items-center justify-center gap-2 border-t border-amber-400/20 pt-5">
											<button
												type="button"
												onclick={() => (showAllFieldWorkers = !showAllFieldWorkers)}
												class="inline-flex items-center gap-2 rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-2.5 text-xs font-black tracking-wide text-blue-950 shadow-md transition-all hover:scale-102 hover:from-amber-300 hover:to-amber-400 active:scale-98"
											>
												{#if showAllFieldWorkers}
													<span>▲ Show Less (Collapse to 8 Workers)</span>
												{:else}
													<span>▼ Show All {filteredFieldWorkers.length} Field Workers ({filteredFieldWorkers.length - 8} More)</span>
												{/if}
											</button>
											<span class="text-[11px] font-semibold text-amber-200/80">
												{showAllFieldWorkers
													? `Showing all ${filteredFieldWorkers.length} field personnel`
													: `Showing 8 of ${filteredFieldWorkers.length} field workers to keep the section compact`}
											</span>
										</div>
									{/if}
								{/if}
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>

	<!-- ========================================================================= -->
	<!-- 3. MODE 2: RATIFIED SCANNED DOCUMENTS (3 PARTS)                          -->
	<!-- ========================================================================= -->
	{:else}
		<div class="space-y-6" transition:fade={{ duration: 180 }}>
			<!-- Sheet Selector Bar -->
			<div
				class="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-amber-400/30 bg-blue-950/80 p-4 text-white"
			>
				<div class="flex flex-wrap gap-2">
					{#each documentSheets as sheet, sIdx}
						<button
							type="button"
							onclick={() => (activeSheetIndex = sIdx)}
							class="rounded-xl px-4 py-2 text-xs font-black transition-all {activeSheetIndex ===
							sIdx
								? 'bg-amber-400 text-blue-950 shadow-md'
								: 'border border-amber-400/30 bg-blue-900/60 text-amber-200 hover:bg-blue-800'}"
						>
							Part {sIdx + 1}: {sheet.title.split(':')[1] || sheet.title}
						</button>
					{/each}
				</div>

				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={() => openZoomModal(documentSheets[activeSheetIndex].image)}
						class="inline-flex items-center gap-1.5 rounded-xl border border-amber-400 bg-amber-400 px-4 py-2 text-xs font-black text-blue-950 shadow-md transition-all hover:bg-amber-300 active:scale-95"
					>
						<span>[⛶ Fullscreen Zoom View]</span>
					</button>
				</div>
			</div>

			<!-- Document Frame Container (Royal Blue & Amber Yellow) -->
			<div
				class="group relative overflow-hidden rounded-3xl border-2 border-amber-400/40 bg-gradient-to-b from-[#091b42] to-[#06122d] p-4 text-center shadow-xl sm:p-6"
			>
				<div
					class="mb-4 flex flex-col justify-between gap-2 px-2 text-left sm:flex-row sm:items-center"
				>
					<div>
						<h3 class="text-lg font-black text-white">{documentSheets[activeSheetIndex].title}</h3>
						<p class="text-xs font-semibold text-amber-300">
							{documentSheets[activeSheetIndex].subtitle}
						</p>
					</div>
					<span
						class="self-start rounded-full border border-amber-400 bg-amber-400/20 px-3 py-1 text-xs font-black text-amber-300 sm:self-auto"
					>
						Official Document Scan
					</span>
				</div>

				<button
					type="button"
					onclick={() => openZoomModal(documentSheets[activeSheetIndex].image)}
					class="relative w-full cursor-zoom-in overflow-hidden rounded-2xl border border-amber-400/30 bg-white p-2 text-center shadow-inner sm:p-4"
					title="Click to view full size"
				>
					<img
						src={documentSheets[activeSheetIndex].image}
						alt={documentSheets[activeSheetIndex].title}
						class="mx-auto h-auto max-h-[640px] w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
					/>

					<!-- Click to Zoom Hint Overlay -->
					<div
						class="pointer-events-none absolute bottom-6 left-6 flex items-center gap-2 rounded-xl border border-amber-400 bg-blue-950/90 px-3.5 py-1.5 shadow-md backdrop-blur-md"
					>
						<span class="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
						<span class="text-xs font-black text-amber-300">
							Click image to open high-resolution zoom viewer
						</span>
					</div>
				</button>
			</div>
		</div>
	{/if}

	<!-- ========================================================================= -->
	<!-- 4. MODAL POP-UP WINDOW: DETAILED INFORMATION (ROYAL BLUE & AMBER YELLOW)  -->
	<!-- ========================================================================= -->
	{#if selectedPersonnelModal}
		<div
			class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
			transition:fade={{ duration: 180 }}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-personnel-name"
		>
			<!-- Accessible Backdrop Button -->
			<button
				type="button"
				class="absolute inset-0 h-full w-full border-none bg-blue-950/85 p-0 backdrop-blur-md cursor-pointer"
				onclick={closePersonnelModal}
				aria-label="Close details dialog"
			></button>

			<!-- Modal Window Card -->
			<div
				class="relative z-10 flex max-h-[90vh] w-full max-w-xl flex-col overflow-y-auto rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-[#071638] via-[#0b235b] to-[#06122d] text-white shadow-2xl"
				in:scale={{ start: 0.93, duration: 200 }}
			>
				<!-- Top Amber Accent Line -->
				<div
					class="h-2 w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500"
				></div>

				<!-- Modal Header -->
				<div
					class="flex items-center justify-between border-b border-amber-400/20 bg-blue-950/80 px-6 py-4"
				>
					<div class="flex items-center gap-2.5">
						<span class="h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping"></span>
						<span class="text-xs font-black tracking-widest text-amber-300 uppercase">
							Tanauan GSO Personnel Profile
						</span>
					</div>
					<button
						type="button"
						onclick={closePersonnelModal}
						class="flex h-8 w-8 items-center justify-center rounded-full border border-amber-400/40 bg-blue-900/60 text-sm font-black text-amber-300 transition-colors hover:bg-amber-400 hover:text-blue-950"
						aria-label="Close modal"
					>
						✕
					</button>
				</div>

				<!-- Modal Content Body -->
				<div class="space-y-6 p-6 sm:p-8">
					<!-- Personnel Hero Card Header -->
					<div class="flex items-start gap-4">
						<div
							class="flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl border-2 border-amber-400 bg-blue-950 text-2xl font-black text-amber-400 shadow-md"
						>
							{selectedPersonnelModal.name.split(',')[0].slice(0, 2)}
						</div>
						<div class="min-w-0 flex-1">
							<span
								class="inline-block rounded-full px-3 py-0.5 text-[11px] mb-1.5 {getStatusBadgeStyles(
									selectedPersonnelModal.status
								)}"
							>
								{selectedPersonnelModal.status} Appointment
							</span>
							<h3
								id="modal-personnel-name"
								class="text-xl font-black tracking-tight text-white sm:text-2xl"
							>
								{selectedPersonnelModal.name}
							</h3>
							<p class="mt-0.5 text-xs font-black text-amber-300 uppercase">
								{selectedPersonnelModal.position}
							</p>
						</div>
					</div>

					<!-- Role Category & Overview -->
					<div
						class="rounded-2xl border border-amber-400/30 bg-blue-950/70 p-4 backdrop-blur-xs space-y-2"
					>
						<div class="text-[10px] font-black tracking-widest text-amber-400 uppercase">
							Functional Role Assignment
						</div>
						<div class="text-sm font-black text-white">
							{selectedPersonnelModal.category}
						</div>
						<p class="text-xs leading-relaxed text-amber-100/90">
							{selectedPersonnelModal.overview}
						</p>
					</div>

					<!-- Key Duties & Responsibilities List -->
					<div class="space-y-3">
						<div class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-amber-400"></span>
							<h4 class="text-xs font-black tracking-wider text-amber-300 uppercase">
								Official Duties & Public Service Scope
							</h4>
						</div>
						<ul class="space-y-2 text-xs">
							{#each selectedPersonnelModal.duties as duty}
								<li
									class="flex items-start gap-2.5 rounded-xl border border-amber-400/20 bg-blue-950/40 p-2.5 text-slate-200"
								>
									<span class="mt-0.5 text-amber-400 font-black">✓</span>
									<span class="leading-relaxed">{duty}</span>
								</li>
							{/each}
						</ul>
					</div>

					<!-- Administrative Metadata -->
					<div class="grid grid-cols-1 gap-2.5 rounded-2xl border border-amber-400/25 bg-blue-950/50 p-4 text-xs sm:grid-cols-2">
						<div class="space-y-1">
							<span class="text-[10px] font-black tracking-wider text-amber-300 uppercase block">Operating Station</span>
							<span class="font-bold text-white leading-tight block">{selectedPersonnelModal.hub}</span>
						</div>
						<div class="space-y-1">
							<span class="text-[10px] font-black tracking-wider text-amber-300 uppercase block">Official Duty Hours</span>
							<span class="font-bold text-white leading-tight block">{selectedPersonnelModal.hours}</span>
						</div>
						<div class="space-y-1">
							<span class="text-[10px] font-black tracking-wider text-amber-300 uppercase block">Division</span>
							<span class="font-bold text-white leading-tight block">{selectedPersonnelModal.section}</span>
						</div>
						<div class="space-y-1">
							<span class="text-[10px] font-black tracking-wider text-amber-300 uppercase block">Department</span>
							<span class="font-bold text-white leading-tight block">General Services Office (GSO)</span>
						</div>
					</div>
				</div>

				<!-- Modal Footer -->
				<div
					class="flex items-center justify-end border-t border-amber-400/20 bg-blue-950/80 px-6 py-4"
				>
					<button
						type="button"
						onclick={closePersonnelModal}
						class="rounded-xl border border-amber-400 bg-amber-400 px-6 py-2 text-xs font-black text-blue-950 transition-all hover:bg-amber-300 hover:scale-102"
					>
						Close Profile
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- ========================================================================= -->
	<!-- 5. MODAL ZOOM VIEWER (SCANNED DOCUMENT FULLSCREEN)                       -->
	<!-- ========================================================================= -->
	{#if zoomedImageModal}
		<div
			class="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6"
			transition:fade={{ duration: 180 }}
			role="dialog"
			aria-modal="true"
		>
			<button
				type="button"
				class="absolute inset-0 h-full w-full border-none bg-blue-950/90 p-0 backdrop-blur-md cursor-pointer"
				onclick={closeZoomModal}
				aria-label="Close fullscreen document view"
			></button>

			<div
				class="relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border-2 border-amber-400 bg-blue-950 text-white shadow-2xl"
				in:scale={{ start: 0.94, duration: 200 }}
			>
				<div class="flex items-center justify-between border-b border-amber-400/30 bg-blue-950 px-6 py-4">
					<div class="flex items-center gap-3">
						<span class="h-3 w-3 rounded-full bg-amber-400"></span>
						<span class="text-xs font-black tracking-widest text-amber-400 uppercase">
							Official Document Scans • GSO Tanauan
						</span>
					</div>
					<button
						type="button"
						onclick={closeZoomModal}
						class="flex h-8 w-8 items-center justify-center rounded-full border border-amber-400/40 bg-blue-900/60 text-sm font-black text-amber-300 transition-colors hover:bg-amber-400 hover:text-blue-950"
					>
						✕
					</button>
				</div>

				<div class="flex items-center justify-center overflow-auto bg-slate-900 p-4 sm:p-6">
					<img
						src={zoomedImageModal}
						alt="High-resolution organizational chart sheet"
						class="h-auto max-w-none w-full rounded-xl object-contain shadow-md"
					/>
				</div>

				<div class="flex items-center justify-between border-t border-amber-400/20 bg-blue-950 px-6 py-3 text-xs font-semibold text-amber-200">
					<span>Use scroll wheel or pinch to zoom</span>
					<button
						type="button"
						onclick={closeZoomModal}
						class="rounded-xl border border-amber-400 bg-amber-400 px-4 py-1.5 text-xs font-black text-blue-950 transition-colors hover:bg-amber-300"
					>
						Close Viewer
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
