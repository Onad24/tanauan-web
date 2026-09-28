<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';

	let { data } = $props();

	const defaults = {
		officeName: "Municipal Treasurer's Office",
		officeCode: 'MTO',
		category: 'Fiscal & Financial Administration',
		municipality: 'Municipality of Tanauan, Leyte',
		citizensCharterUrl: '/citizens-charter/treasurer',
		tagline:
			'Ensuring fiscal responsibility, revenue optimization, and transparent asset management to sustain public services and drive local development.',
		typewriterWords: [
			'Guarding Fiscal Integrity & Public Trust',
			'Maximizing Revenue for Sustainable Growth',
			'Transparent & Accountable Fund Stewardship',
			'Empowering 54 Barangays through Prudent Governance'
		],
		head: {
			name: 'Mrs. Restituta C. Cavite',
			title: 'Municipal Treasurer',
			term: 'Department Head',
			quote:
				'True public service in treasury management is rooted in unwavering accountability, disciplined record-keeping, and the prudent allocation of every public peso.',
			credentials: [
				'Local Treasury Operations Officer',
				'Licensed Fiscal Manager',
				'Public Administration Specialist'
			],
			room: 'Ground Floor, East Wing, Municipal Hall',
			schedule: 'Monday – Friday: 8:00 AM – 5:00 PM'
		},
		stats: [
			{
				value: '100',
				suffix: '%',
				label: 'Fund Accountability',
				description: 'Audit-certified compliance with COA and BLGF regulations'
			},
			{
				value: '54',
				suffix: '',
				label: 'Barangays Served',
				description: 'Complete municipal-wide revenue & assessment coverage'
			},
			{
				value: '98.4',
				suffix: '%',
				label: 'Collection Efficiency',
				description: 'Consistently exceeding local and provincial revenue targets'
			},
			{
				value: '100',
				suffix: '%',
				label: 'Disbursement Integrity',
				description: 'Strictly executed against authorized municipal vouchers'
			}
		],
		mandates: [
			{
				index: '01',
				code: 'REV-COLL',
				title: 'Revenue Collection & Licensing',
				description:
					'Administers and collects all real property taxes, municipal business permits, local regulatory fees, and service charges due to the local government unit.',
				tag: 'Core Function',
				details: [
					'Real Property Tax (RPT) Assessment & Billing',
					'Annual Business Permit & License Processing',
					'Official Receipts & Financial Clearance Issuance'
				]
			},
			{
				index: '02',
				code: 'CUST-MGMT',
				title: 'Fund Custody & Stewardship',
				description:
					'Exercises diligent custody over all municipal accounts, ensuring secure fund depository storage, daily balancing, and reconciliations.',
				tag: 'Internal Control',
				details: [
					'Depository Bank Relations & Reconciliations',
					'Daily Cash Inflow & Outflow Balancing',
					'Cash Flow Liquidity Projections'
				]
			},
			{
				index: '03',
				code: 'DISB-PAY',
				title: 'Disbursement & Authorized Payments',
				description:
					'Executes verified payments and disbursements pursuant to valid vouchers, approved resolutions, and strict government accounting regulations.',
				tag: 'Statutory Execution',
				details: [
					'Check Preparation & Electronic Fund Transfers',
					'Municipal Payroll & Compensation Processing',
					'Supplier & Contractor Voucher Settlements'
				]
			},
			{
				index: '04',
				code: 'FISC-ADV',
				title: 'Fiscal Advisory & Revenue Strategy',
				description:
					'Provides analytical counsel to the Municipal Mayor, the Sangguniang Bayan, and executive leaders regarding local taxation trends and fiscal resilience.',
				tag: 'Executive Advisory',
				details: [
					'Medium-Term Revenue Performance Forecasting',
					'Tax Ordinance Policy Review & Recommendations',
					'Economic Viability & Revenue Base Analysis'
				]
			},
			{
				index: '05',
				code: 'TAX-COMP',
				title: 'Compliance & Establishment Inspection',
				description:
					'Conducts regular field inspections of commercial and industrial enterprises to ensure adherence to local tax ordinances and prevent revenue leakage.',
				tag: 'Field Enforcement',
				details: [
					'Business Ground Verification & Inspection',
					'Delinquency Tracking & Notice Issuance',
					'Accurate Fair Market Tax Valuation'
				]
			},
			{
				index: '06',
				code: 'DATA-SYS',
				title: 'Tax Information & Digital Systems',
				description:
					'Modernizes and preserves digital municipal financial archives, eSRE records, and taxpayer databases for fast, dependable public access.',
				tag: 'Digital Governance',
				details: [
					'Electronic Statement of Receipts & Expenditures (eSRE)',
					'Automated Real Property Tax Database Sync',
					'Fast Citizen Record Retrieval'
				]
			}
		],
		schedule: {
			hours: 'Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)',
			location: 'Ground Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
			contactNumber: '(053) 321-2045 / +63 917 842 6110',
			email: 'treasurer@tanauanleyte.gov.ph',
			helpline: 'Citizens Helpdesk: Windows 1 to 4, Treasury Hall'
		},
		department: 'Treasurer'
	};

	// Merge Firestore dynamic data over defaults
	const pageData = $derived({ ...defaults, ...(data?.officePageData ?? {}) });
</script>

<OfficeTemplate {...pageData} />
