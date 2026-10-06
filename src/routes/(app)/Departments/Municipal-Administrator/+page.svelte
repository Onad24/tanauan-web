<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	// Dedicated individual defaults for Office of the Municipal Administrator
	const adminDefaults = {
		department: 'Municipal-Administrator',
		officeName: 'Office of the Municipal Administrator',
		officeCode: 'OMA',
		category: 'Executive Management & Municipal Administration',
		municipality: 'Municipality of Tanauan, Leyte',
		citizensCharterUrl: '/citizens-charter',
		tagline:
			'Coordinating, supervising, and directing administrative operations across all municipal departments to advance good local governance, operational efficiency, and prompt public service delivery for every Tanauananon.',
		typewriterWords: [
			'Administrative Excellence & Inter-Departmental Leadership',
			'Supervising Operational Readiness Across All 38 Municipal Offices',
			'Executing Mayoral Directives & Good Local Governance',
			'Dedicated Executive Administration Serving 54 Barangays'
		],
		head: {
			name: '',
			title: 'Municipal Administrator',
			term: 'Department Head',
			quote:
				'Good administration means every department operates seamlessly as one cohesive team, all dedicated to transparent governance and dignified public service for the people of Tanauan.',
			credentials: [
				'Public Administration Professional',
				'Local Government Operations Lead',
				'Civil Service Commission Eligible',
				'Executive Policy & Governance Specialist'
			],
			room: '2nd Floor, Executive Wing, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
			schedule: 'Monday to Friday | 8:00 AM – 5:00 PM (No Noon Break)'
		},
		stats: [
			{
				value: '38',
				suffix: '+',
				label: 'Departments Supervised',
				description: 'Comprehensive administrative oversight across all municipal departments'
			},
			{
				value: '54',
				suffix: '',
				label: 'Barangays Covered',
				description: 'Administrative support, coordination, and community reach municipality-wide'
			},
			{
				value: '100',
				suffix: '%',
				label: 'Policy Compliance',
				description: 'Rigorous enforcement of executive orders, administrative circulars, and ordinances'
			},
			{
				value: '12',
				suffix: '+',
				label: 'Monthly Reports',
				description: 'Continuous administrative performance reviews, monitoring, and KPI assessments'
			}
		],
		mandates: [
			{
				index: '01',
				code: 'COORD-EXEC',
				title: 'Inter-Departmental Coordination & Supervision',
				description:
					'Directs and synchronizes the daily administrative operations of all municipal offices to ensure harmonious alignment with executive development goals and local priorities.',
				tag: 'Core Administrative Function',
				details: [
					'Regular Department Head Coordination Meetings',
					'Cross-Departmental Workflow & Conflict Resolution',
					'Annual Work & Financial Plan Synchronization'
				]
			},
			{
				index: '02',
				code: 'POLICY-ENF',
				title: 'Policy Execution & Executive Directives',
				description:
					'Oversees the timely and compliant execution of Mayoral executive orders, administrative circulars, memorandum orders, and municipal ordinances.',
				tag: 'Executive Governance',
				details: [
					'Mayoral Directive & Executive Order Enforcement',
					'Administrative Circular Compliance Auditing',
					'Local Governance Policy Guidance'
				]
			},
			{
				index: '03',
				code: 'PERF-EVAL',
				title: 'Departmental Monitoring & SGLG Evaluation',
				description:
					'Monitors departmental key performance indicators (KPIs), service delivery benchmarks, and adherence to the Seal of Good Local Governance (SGLG) criteria.',
				tag: 'Performance Management',
				details: [
					'Departmental Performance Review & KPI Auditing',
					'SGLG Governance Validation & Preparedness',
					'Civil Service & ARTA Standards Implementation'
				]
			},
			{
				index: '04',
				code: 'CIT-ASSIST',
				title: 'Public Assistance & Special Concerns Liaison',
				description:
					'Acts on special citizen inquiries, administrative complaints, inter-agency endorsements, and public feedback requiring executive escalation.',
				tag: 'Public Liaison',
				details: [
					'Executive Public Assistance & Escalation',
					'Inter-Agency Liaison (National Government & NGOs)',
					'Citizen Feedback & Grievance Resolution Coordination'
				]
			},
			{
				index: '05',
				code: 'CRISIS-OPS',
				title: 'Administrative Continuity & Crisis Management',
				description:
					'Ensures municipal operational continuity during emergency declarations, seasonal typhoons, disaster relief logistics, and incident command activations.',
				tag: 'Operational Continuity',
				details: [
					'Incident Command System (ICS) Administrative Support',
					'Municipal Hall Emergency Continuity Protocols',
					'Disaster Response Logistics & Workforce Mobilization'
				]
			}
		],
		schedule: {
			hours: 'Monday to Friday | 8:00 AM – 5:00 PM (No Noon Break)',
			location: '2nd Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
			contactNumber: '(053) 888-3456 / (053) 321-2045',
			email: 'administrator@tanauanleyte.gov.ph',
			helpline: "Municipal Administrator's Office, 2nd Floor Executive Wing"
		},
		plaqueHeader: 'OFFICE DETAILS:',
		plaqueItems: [
			{
				title: 'Office Location',
				subtitle: '2nd Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
				badge: '2ND FLOOR'
			},
			{
				title: 'Service Hours',
				subtitle: 'Monday to Friday | 8:00 AM – 5:00 PM (No Noon Break)',
				badge: 'MON – FRI'
			}
		],
		showHeroServiceBadges: false
	};

	const defaults = getDeptDefaults('Municipal-Administrator') ?? adminDefaults;

	// Merge Firestore dynamic data over defaults
	const pageData = $derived(mergeOfficeData(defaults, data?.officePageData));
</script>

<svelte:head>
	<title>Office of the Municipal Administrator | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Official administrative functions, executive coordination, leadership directory, and public service information of the Office of the Municipal Administrator, Municipality of Tanauan, Leyte."
	/>
</svelte:head>

<OfficeTemplate {...pageData} />
