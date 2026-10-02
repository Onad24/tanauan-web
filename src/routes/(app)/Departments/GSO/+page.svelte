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
			schedule: 'Monday – Friday: 8:00 AM – 5:00 PM'
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
		}
	};

	const defaults = getDeptDefaults('GSO') ?? gsoDefaults;

	// Merge Firestore dynamic data over defaults
	const pageData = $derived(mergeOfficeData(defaults, data?.officePageData));
</script>

<svelte:head>
	<title>General Services Section (GSO) | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Official Organizational Structure, Personnel Directory, Logistics, and Public Facilities Maintenance of the General Services Section (GSO), Municipality of Tanauan, Leyte."
	/>
</svelte:head>

<OfficeTemplate {...pageData} />
