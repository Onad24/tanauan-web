<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const gsoDefaults = {
		department: 'GSO',
		officeName: 'General Services Section',
		officeCode: 'GSO',
		category: 'Public Facilities, Logistics & General Services',
		municipality: 'Municipality of Tanauan, Leyte',
		citizensCharterUrl: '/citizens-charter',
		tagline:
			'Maintaining municipal facilities, managing logistical operations, and ensuring reliable public infrastructure support for the Municipality of Tanauan.',
		typewriterWords: [
			'Reliable General Services & Logistics',
			'Dedicated Municipal Maintenance & Utility Support',
			'Ensuring Public Facility Integrity Across 54 Barangays',
			'Serving Tanauan with Efficiency & Professionalism'
		],
		vision:
			'Effective, efficient and sustainable operation of programs, projects and activities, with competent manpower and responsive to the needs of the clients with the right quality of service to support the vision of the Municipality.',
		mission:
			'To establish a reliable office, empowered by efficient and committed employees driven by transparency, accountability and good governance in the pursuit of its goals and objectives as provided for by the law in line with the supply and property management, maintenance of bldg. and grounds, electrical, plumbing. IT and electronic equipment, light vehicles and heavy equipment and other services.',
		preparedBy: {
			name: 'Honeyline Soyosa',
			title: 'Focal Person / GSO Staff',
			role: 'Focal Person / GSO Staff'
		},
		reviewedBy: {
			name: 'Eugenio C. Ramos, Jr.',
			title: 'GSO Head / Operation Manager',
			role: 'GSO Operation Manager / Department Head'
		},
		head: {
			name: 'Eugenio C. Ramos, Jr.',
			title: 'GSO Head / Operation Manager',
			term: 'Department Head',
			quote:
				'Our commitment is to ensure all municipal facilities, vehicles, and operational assets are maintained to the highest standard of readiness in service to the people of Tanauan.',
			credentials: [
				'GSO Head / Operation Manager',
				'Civil Service Commission Eligible',
				'Municipal Facilities & Logistics Lead'
			],
			room: 'GSO Operations Hub, Tanauan Municipal Hall Complex',
			schedule: 'Monday – Friday: 8:00 AM – 5:00 PM',
			image: '/images/gso-personnel/ramos-eugenio.jpg'
		},
		stats: [
			{
				value: '60',
				suffix: '',
				label: 'Total Personnel',
				description: 'Head, 10 Office Staff, and 49 Field Workers'
			},
			{
				value: '54',
				suffix: '',
				label: 'Barangays Served',
				description: 'Logistics and maintenance support municipality-wide'
			},
			{
				value: '100',
				suffix: '%',
				label: 'Facility Readiness',
				description: 'Continuous maintenance of municipal halls and venues'
			},
			{
				value: '24/7',
				suffix: '',
				label: 'Disaster Support',
				description: 'Emergency logistical response during natural calamities'
			}
		],
		mandates: [
			{
				index: '01',
				code: 'FAC-MAINT',
				title: 'Municipal Facilities Maintenance',
				description:
					'Maintains all municipal government buildings, civic centers, public parks, and facilities in pristine operational condition.',
				tag: 'Core Function',
				details: [
					'Electrical, carpentry, plumbing, and structural maintenance',
					'Daily custodial sanitation and groundskeeping',
					'Public park and plaza upkeep'
				]
			},
			{
				index: '02',
				code: 'LOG-FLEET',
				title: 'Logistics & Motor Pool Management',
				description:
					'Manages municipal vehicle dispatch, transport operations, equipment logistics, and official event setups.',
				tag: 'Logistics',
				details: [
					'Official vehicle dispatch and fleet maintenance',
					'Event logistics, stage, sound, and seating arrangements',
					'Heavy equipment and generator maintenance'
				]
			},
			{
				index: '03',
				code: 'REC-PROP',
				title: 'Asset Care & Office Administration',
				description:
					'Oversees office records binding, property custodial logistics, and inter-departmental support.',
				tag: 'Administrative',
				details: [
					'Official book binding and archival document protection',
					'Clerical assistance and administrative document dispatch',
					'Inter-office utility and logistical coordination'
				]
			}
		],
		schedule: {
			hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
			location: 'GSO Operations Hub, Tanauan Municipal Hall Complex, Real St., Tanauan, Leyte',
			contactNumber: '(053) Tanauan LGU',
			email: 'gso@tanauanleyte.gov.ph',
			helpline: 'General Services Office, Ground Floor, Municipal Hall'
		},
		servicesOffered: [
			{
				id: 'borrowing-equipment',
				serviceNumber: 1,
				title: 'Borrowing of Equipment (Tents, Chairs, Sound System)',
				badge: 'Service Offered 1',
				description:
					'Standard procedure for requesting and borrowing municipal tents, tables, chairs, and sound system units for civic, community, and official events.',
				equipmentList: ['Tents', 'Chairs & Tables', 'Sound System'],
				downloadableFormUrl: '/forms/gso/Borrower_and_Return_Slips.pdf',
				downloadableFormTitle: "Borrower's & Return Form",
				downloadableFormDescription:
					'Official downloadable form for equipment borrowing and return inspection clearance.',
				steps: [
					'Submits Letter of Request detailing equipment, date, time and venue.',
					'Bring the approved letter request to the GSO Office for verification of availability of Tents.',
					'If the equipment is available, fill out the Borrower’s Slip.',
					'Upon returning the equipment, fill out the Return Slip.'
				],
				note: 'In case of a lost or damaged Sound System, Tables and Chairs, the borrower/requesting party must replace or pay for the lost/damaged items upon return.'
			},
			{
				id: 'venue-request',
				serviceNumber: 2,
				title:
					'Venue Request (Tanauan Amphitheater, Municipal and Presidencia Lobby, Tanauan Civic Center)',
				badge: 'Service 2',
				description:
					'Official procedure for venue scheduling and booking of major municipal event venues and facilities.',
				venueList: ['Tanauan Amphitheater', 'Municipal and Presidencia Lobby', 'Tanauan Civic Center'],
				steps: [
					'Submits Letter of Request detailing date, time and venue.',
					'Personally furnish a copy to the Office of the Mayor for approval of LCE.',
					'Present approved request letter to GSO for facility/equipment scheduling.',
					'Pay rental/facility fees (if required for private/commercial use).'
				]
			}
		],
		downloadableForms: [
			{
				index: '01',
				category: 'Equipment & Logistics',
				title: "Borrower's & Return Slip Form (Tents, Chairs, Sound System)",
				type: 'Official Equipment Slip • GSO Form 01',
				icon: '',
				description:
					'Official municipal form for requesting, releasing, and inspecting borrowed municipal event equipment including tents, plastic chairs, folding tables, sound systems, and general logistics items.',
				format: 'Official PDF Document',
				fileSize: '52 KB',
				url: '/forms/gso/Borrower_and_Return_Slips.pdf',
				downloadUrl: '/forms/gso/Borrower_and_Return_Slips.pdf',
				htmlUrl: '/forms/gso/borrower-and-return-slips.html',
				requirements: [
					'Approved Letter of Request specifying borrowing date, duration, venue, and exact inventory requested',
					'Accomplished Part I: Borrower Slip with contact details, item description, and quantity',
					'Physical inspection and joint condition assessment prior to property release',
					'Signed Agreement to repair or replace any items damaged or lost during the borrowing period',
					'Accomplished Part II: Return Slip upon returning items for custodial clearance and sign-off'
				]
			}
		]
	};

	const baseDefaults = {
		...gsoDefaults,
		...(getDeptDefaults('GSO') ?? {}),
		vision: gsoDefaults.vision,
		mission: gsoDefaults.mission,
		formsAtEnd: true,
		showPersonnel: false,
		downloadableForms: gsoDefaults.downloadableForms
	};

	// Merge Firestore dynamic data over defaults
	const pageData = $derived({
		...mergeOfficeData(baseDefaults, data?.officePageData),
		department: 'GSO',
		vision: gsoDefaults.vision,
		mission: gsoDefaults.mission,
		showPersonnel: false,
		formsAtEnd: true,
		downloadableForms: gsoDefaults.downloadableForms
	});
</script>

<svelte:head>
	<title>General Services Section (GSO) | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Official Organizational Structure, Personnel Directory, Logistics, and Public Facilities Maintenance of the General Services Section (GSO), Municipality of Tanauan, Leyte."
	/>
</svelte:head>

<OfficeTemplate {...pageData} showAccomplishments={true} showPersonnel={false} formsAtEnd={true} />
