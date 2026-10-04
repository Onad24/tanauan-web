<script>
	import { onMount } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import OfficeHeroCanvas from '$lib/Components/Offices/OfficeHeroCanvas.svelte';
	import TypewriterText from '$lib/Components/Offices/TypewriterText.svelte';
	import AwardsSection from '$lib/AwardsSection.svelte';
	import PersonnelSection from '$lib/PersonnelSection.svelte';
	import AccomplishmentSection from '$lib/AccomplishmentSection.svelte';
	import OrgChartSection from '$lib/OrgChartSection.svelte';
	import DepartmentSectionsFeed from '$lib/DepartmentSectionsFeed.svelte';
	import MAOServicesPortal from '$lib/Components/Offices/MAOServicesPortal.svelte';
	import MENROCollectionSchedule from '$lib/Components/Offices/MENROCollectionSchedule.svelte';

	let {
		officeName = "Municipal Treasurer's Office",
		officeCode = 'MTO',
		category = 'Fiscal & Financial Administration',
		municipality = 'Municipality of Tanauan, Leyte',
		citizensCharterUrl = '/citizens-charter/treasurer',
		tagline = 'Ensuring transparent fiscal governance, efficient local revenue collection, and prudent custodianship of municipal assets for the progress and welfare of every Tanauananon.',
		typewriterWords = [
			'Guarding Fiscal Integrity & Public Accountability',
			'Maximizing Local Revenues for Sustainable Growth',
			'Transparent, Prudent & Accountable Fund Custody',
			'Serving 54 Barangays with Dignified Public Service'
		],
		head = {
			name: 'Mrs. Restituta C. Cavite',
			title: 'Municipal Treasurer',
			term: 'Department Head',
			quote:
				'True public service in local treasury is grounded in unwavering accountability, disciplined record-keeping, and the prudent allocation of every public peso entrusted to us by our citizens.',
			credentials: [
				'Local Treasury Operations Officer',
				'Licensed Fiscal Administrator',
				'Certified Public Financial Manager'
			],
			room: 'Ground Floor, East Wing, Municipal Hall',
			schedule: 'Monday to Friday | 8:00 AM – 5:00 PM (No Noon Break)'
		},
		stats = [
			{
				value: '100',
				suffix: '%',
				label: 'Fund Accountability',
				description: 'Full compliance with COA & Bureau of Local Government Finance audits'
			},
			{
				value: '54',
				suffix: '',
				label: 'Barangays Covered',
				description: 'Comprehensive tax mapping and municipal revenue reach'
			},
			{
				value: '98.4',
				suffix: '%',
				label: 'Collection Efficiency',
				description: 'Consistently exceeding local and provincial revenue goals'
			},
			{
				value: '100',
				suffix: '%',
				label: 'Disbursement Integrity',
				description: 'Strictly executed against authorized appropriations & vouchers'
			}
		],
		mandates = [
			{
				index: '01',
				code: 'REV-COLL',
				title: 'Revenue Collection & Licensing',
				description:
					'Assesses, receives, and accounts for all real property taxes, municipal business permits, local fees, and statutory regulatory charges due to the local government.',
				tag: 'Primary Function',
				details: [
					'Real Property Tax (RPT) Billing & Collection',
					'Business Permit Taxes & Regulatory Licensing',
					'Official Receipt Verification & Reconciliations'
				]
			},
			{
				index: '02',
				code: 'CUST-MGMT',
				title: 'Fund Custody & Stewardship',
				description:
					'Maintains strict custodianship and banking management over all municipal accounts, ensuring daily cash balancing and authorized depository reconciliations.',
				tag: 'Internal Control',
				details: [
					'Depository Bank Relations',
					'Daily Cash Inflow & Outflow Balancing',
					'Cash Flow & Liquidity Management'
				]
			},
			{
				index: '03',
				code: 'DISB-PAY',
				title: 'Disbursement & Authorized Payments',
				description:
					'Executes verified payments and disbursements pursuant to valid vouchers, approved resolutions, and strict government accounting and auditing standards.',
				tag: 'Statutory Execution',
				details: [
					'Check Issuance & Electronic Fund Transfers',
					'Municipal Payroll Processing',
					'Supplier & Contractor Settlement'
				]
			},
			{
				index: '04',
				code: 'FISC-ADV',
				title: 'Fiscal Advisory & Revenue Planning',
				description:
					'Provides strategic financial counsel to the Municipal Mayor, the Sangguniang Bayan, and executive leaders regarding revenue trends and fiscal resilience.',
				tag: 'Policy & Advisory',
				details: [
					'Revenue Performance Analysis',
					'Tax Ordinance Revision Input',
					'Economic Viability & Assessment Studies'
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
					'Commercial Establishment Verifications',
					'Delinquency Tracking & Notice Issuance',
					'Fair Market Assessment Support'
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
					'Automated Assessment Database Sync',
					'Expedited Citizen Record Retrieval'
				]
			}
		],
		schedule = {
			hours: 'Monday to Friday | 8:00 AM – 5:00 PM (No Noon Break)',
			location: 'Ground Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
			contactNumber: '(053) 321-2045 / +63 917 842 6110',
			email: 'treasurer@tanauanleyte.gov.ph',
			helpline: 'Citizens Helpdesk: Windows 1 to 4, Treasury Hall'
		},
		department = 'Treasurer',
		showAccomplishments = true,
		showPersonnel = true,
		formsAtEnd = false,
		orgChartImage = '',
		dutiesAndResponsibilities = null,
		vision = '',
		mission = '',
		servicesOffered = [],
		downloadableForms = [],
		preparedBy = null,
		reviewedBy = null
	} = $props();

	let scrollY = $state(0);
	let lastScrollY = $state(0);
	let isPillNavVisible = $state(true);
	let activeSection = $state('overview');
	let showFullDuties = $state(false);

	// Floating Modal Window State: null | 'vision' | 'mission' | service object
	let activeFloatingModal = $state(null);

	// Auto-hide pill nav when scrolling down; reveal when scrolling up
	$effect(() => {
		const current = scrollY;
		if (current > 300) {
			if (current > lastScrollY + 8) {
				// User is scrolling down through content -> hide pill
				isPillNavVisible = false;
			} else if (current < lastScrollY - 6) {
				// User is scrolling up -> show pill for quick navigation
				isPillNavVisible = true;
			}
		} else {
			isPillNavVisible = true;
		}
		lastScrollY = current;
	});

	function openModal(item) {
		activeFloatingModal = item;
	}

	function closeModal() {
		activeFloatingModal = null;
	}

	function handleKeydown(e) {
		if (e.key === 'Escape') {
			if (activeFormModal) closeFormModal();
			else if (activeFloatingModal) closeModal();
		}
	}

	$effect(() => {
		if (typeof document !== 'undefined') {
			if (activeFloatingModal || activeFormModal) {
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

	// 3D Perspective Card Tilt handler for the Official Plaque
	let plaqueRotateX = $state(0);
	let plaqueRotateY = $state(0);
	let plaqueGlowX = $state(50);
	let plaqueGlowY = $state(50);

	function handlePlaqueMouseMove(e) {
		const card = e.currentTarget;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		plaqueRotateY = ((x - centerX) / centerX) * 8;
		plaqueRotateX = -((y - centerY) / centerY) * 8;
		plaqueGlowX = (x / rect.width) * 100;
		plaqueGlowY = (y / rect.height) * 100;
	}

	function handlePlaqueMouseLeave() {
		plaqueRotateX = 0;
		plaqueRotateY = 0;
		plaqueGlowX = 50;
		plaqueGlowY = 50;
	}

	const isMAO = $derived(
		officeCode === 'MAO' ||
		department === 'Agriculture' ||
		department === 'MAO' ||
		(officeName && officeName.toLowerCase().includes('agriculture'))
	);

	const isCivilRegistrar = $derived(
		department === 'Civil Registrar' ||
		officeCode === 'MCRO' ||
		officeCode === 'MCR' ||
		department === 'Municipal Civil Registrar'
	);

	const isMDRRMO = $derived(
		officeCode === 'MDRRMO' ||
		department === 'MDRRMO' ||
		(officeName && officeName.toLowerCase().includes('disaster risk'))
	);

	const isMENRO = $derived(
		officeCode === 'MENRO' ||
		department === 'MENRO' ||
		(officeName && officeName.toLowerCase().includes('environment'))
	);

	const isEngineering = $derived(
		department === 'Engineering' ||
		officeCode === 'MEO' ||
		department === 'Municipal Engineering Office' ||
		(officeName && officeName.toLowerCase().includes('engineering'))
	);

	const isHealthOffice = $derived(
		department === 'Health Office' ||
		officeCode === 'MHO' ||
		(officeName && officeName.toLowerCase().includes('health'))
	);

	const isLicensing = $derived(
		department === 'Licensing' ||
		officeCode === 'BPLO' ||
		department === 'Business Permit & Licensing Office' ||
		(officeName && officeName.toLowerCase().includes('licensing'))
	);

	const shouldShowPersonnel = $derived(showPersonnel && !isCivilRegistrar && !isMDRRMO && !isMENRO && !isEngineering && !isHealthOffice && !isLicensing);
	const shouldPutFormsAtEnd = $derived(formsAtEnd || isCivilRegistrar || isMDRRMO || isMENRO || isEngineering || isHealthOffice || isLicensing);
	const shouldShowAwards = $derived(!isMDRRMO && !isMENRO && !isEngineering);

	const baseNav = $derived([
		{ id: 'overview', label: 'Overview' },
		...(vision || mission ? [{ id: 'vision-mission', label: 'Vision & Mission' }] : []),
		...(isMAO || isMENRO || (servicesOffered && servicesOffered.length > 0)
			? [{ id: isMENRO ? 'collection-schedule' : 'services', label: isMENRO ? 'Waste Schedule' : 'Services' }]
			: []),
		...(!isMAO && !shouldPutFormsAtEnd && downloadableForms && downloadableForms.length > 0 ? [{ id: 'forms', label: 'Forms' }] : []),
		...(!isMAO && mandates && mandates.length > 0 ? [{ id: 'mandates', label: 'Mandates' }] : []),
		{ id: 'leadership', label: 'Leadership' },
		{ id: 'structure', label: 'Structure' },
		...(showAccomplishments ? [{ id: 'accomplishments', label: isCivilRegistrar || isMDRRMO || isMENRO || isHealthOffice ? 'Accomplishments' : 'Reports' }] : []),
		...(shouldShowAwards ? [{ id: 'awards', label: 'Recognition' }] : []),
		...(shouldShowPersonnel ? [{ id: 'personnel', label: 'Personnel' }] : []),
		...(!isMAO && shouldPutFormsAtEnd && downloadableForms && downloadableForms.length > 0 ? [{ id: 'forms', label: isMENRO ? 'Downloadables' : 'Forms' }] : [])
	]);

	// Downloadable Forms State & Folder Management
	let activeFormModal = $state(null);
	let selectedFolder = $state(null); // null = show folder overview; string = currently open folder
	let isFormsSectionOpen = $state(!isLicensing);

	function toggleFormsSection() {
		isFormsSectionOpen = !isFormsSectionOpen;
		if (isFormsSectionOpen && typeof window !== 'undefined') {
			setTimeout(() => {
				const el = document.getElementById('forms');
				if (el) {
					const offset = 140;
					const top = el.getBoundingClientRect().top + window.scrollY - offset;
					window.scrollTo({ top, behavior: 'smooth' });
				}
			}, 50);
		}
	}

	function openFormModal(form) {
		activeFormModal = form;
	}

	function closeFormModal() {
		activeFormModal = null;
	}

	function openFolderView(folderName) {
		selectedFolder = folderName;
		if (typeof window !== 'undefined') {
			setTimeout(() => {
				const el = document.getElementById('open-folder-stage');
				if (el) {
					const offset = 140;
					const top = el.getBoundingClientRect().top + window.scrollY - offset;
					window.scrollTo({ top, behavior: 'smooth' });
				}
			}, 50);
		}
	}

	function closeFolderView() {
		selectedFolder = null;
		if (typeof window !== 'undefined') {
			setTimeout(() => {
				const el = document.getElementById('forms');
				if (el) {
					const offset = 140;
					const top = el.getBoundingClientRect().top + window.scrollY - offset;
					window.scrollTo({ top, behavior: 'smooth' });
				}
			}, 50);
		}
	}

	const formCategories = $derived.by(() => {
		if (!downloadableForms || downloadableForms.length === 0) return [];
		const cats = [];
		for (const f of downloadableForms) {
			if (f.category && !cats.includes(f.category)) {
				cats.push(f.category);
			}
		}
		return cats;
	});

	const folderDetails = {
		'Building Permit': {
			id: 'building-permit',
			code: 'PD 1096 NBCP',
			icon: '🏗️',
			title: 'Building Permit Document Folder',
			badge: 'Official NBCP Dossier',
			stat: '7 Official Forms',
			tagline: 'Presidential Decree No. 1096 • National Building Code of the Philippines',
			description: 'Official unified filing dossier containing the prerequisite checklist, architectural, electrical, mechanical, electronics, sanitary/plumbing, demolition, and structural permit applications for all building constructions and renovations.',
			keyDocs: [
				'Checklist of Appended Documents',
				'Architectural Permit (NBC Form No. A-01)',
				'Electrical Permit Form',
				'Electronics Permit Form (A-07)',
				'Demolition Permit Form',
				'Sanitary / Plumbing Permit (A-04)',
				'Structural Permit Form (A-02)'
			]
		},
		'Fencing Permit': {
			id: 'fencing-permit',
			code: 'DPWH LINE & GRADE',
			icon: '🚧',
			title: 'Fencing Permit Document Folder',
			badge: 'Official Boundary Dossier',
			stat: '2 Official Forms',
			tagline: 'Perimeter Wall & Fence Construction • Line & Grade Clearances',
			description: 'Official municipal filing dossier containing the appended requirements checklist, line and grade survey verification requirements, and the official DPWH fencing permit application form for all perimeter walls and barriers.',
			keyDocs: [
				'Checklist of Fencing Appended Documents',
				'Fencing Permit Application Form'
			]
		},
		'Occupancy Permit': {
			id: 'occupancy-permit',
			code: 'SEC 309 NBCP',
			icon: '🏠',
			title: 'Occupancy Permit Document Folder',
			badge: 'Official Occupancy Dossier',
			stat: '3 Official Forms',
			tagline: 'Certificate of Occupancy • Final Inspection & Clearances',
			description: 'Official municipal dossier containing the Unified Application Form for Occupancy, notarized Certificate of Completion, and the official Certificate of Occupancy under Section 309 of the National Building Code (PD 1096).',
			keyDocs: [
				'Unified Application Form for Occupancy',
				'Certificate of Completion Form',
				'Official Certificate of Occupancy Form'
			]
		},
		'Downloadable Checklist': {
			id: 'downloadable-checklist',
			code: 'MEO CHECKLISTS',
			icon: '📋',
			title: 'Downloadable Checklist Folder',
			badge: 'Official Prerequisite Dossier',
			stat: '3 Official Checklists',
			tagline: 'Utility Connections & Occupancy Prerequisite Checklists',
			description: 'Official municipal repository containing the prescribed documentary checklists for DORELCO electrical connections, Primewater water service connections, and Certificate of Occupancy clearances.',
			keyDocs: [
				'Checklist for Electrical Connection',
				'Checklist for Water Connection',
				'Checklist for Occupancy Permit'
			]
		},
		'Burial Permit': {
			id: 'burial-permit',
			code: 'CEMETERY & BURIAL',
			icon: '🪦',
			title: 'Burial Permit Document Folder',
			badge: 'Official Cemetery Dossier',
			stat: '1 Official Form',
			tagline: 'Tanauan New Cemetery Extension • Lot Assignment & Permitting',
			description: 'Official municipal filing dossier containing the burial permit application and cemetery lot assignment schedule for the Tanauan New Cemetery Extension, covering individual grave lots, perimeter niches, and family lots.',
			keyDocs: [
				'Tanauan New Cemetery Extension Burial Permit Form'
			]
		},
		'Project Implementation Form': {
			id: 'project-implementation-form',
			code: 'PROJECT IMPL',
			icon: '🚧',
			title: 'Project Implementation Form Folder',
			badge: 'Official Project Dossier',
			stat: '3 Official Forms',
			tagline: 'Program of Work • Concrete Pouring • Final Project Inspection',
			description: 'Official municipal engineering forms for infrastructure project implementation, including Request for Program of Work (POW) / Detailed Estimate, Concrete Pouring Permit & Pre-Pouring Checklist, and Request for Final Inspection of Completed Projects.',
			keyDocs: [
				'Request for Program of Work / Detailed Estimate',
				'Concrete Pouring Permit & Request for Pouring Inspection',
				'Request for Final Inspection of Completed Project'
			]
		},
		'Dental Health Services': {
			id: 'dental-health-services',
			code: 'MHO DENTAL FORM 1',
			icon: '🦷',
			title: 'Oral Health & Dental Treatment Dossier',
			badge: 'Official Oral Health Dossier',
			stat: '1 Official Form',
			tagline: 'Rural Health Unit Dental Clinic • Oral Health Program',
			description: 'Official Municipal Health Office oral examination and dental monitoring record for tracking oral health status, DMFT / dft caries indices, gingival condition, dental prophylaxis, temporary/permanent restorations, and tooth extractions across 5 annual clinical monitoring cycles.',
			keyDocs: [
				'Individual Treatment Record (Form 1)',
				'Oral Health Status & DMF Indices Chart',
				'Annual Dentition Condition Map (Years 1–5)',
				'Services Monitoring & Clinical Treatment Log'
			]
		},
		'Clinical Consultation & Primary Care': {
			id: 'clinical-consultation-primary-care',
			code: 'RHU KONSULTA P08038120',
			icon: '🩺',
			title: 'Patient Clinical Evaluation Dossier',
			badge: 'PhilHealth Konsulta Clinical Dossier',
			stat: '1 Official Form',
			tagline: 'Primary Care Consultations • Physical Exam • NCD Assessment',
			description: 'Comprehensive patient encounter record utilized by RHU physicians and clinical staff for primary healthcare consultations, PhilHealth Konsulta first patient encounters, pediatric growth measurements, comprehensive physical examinations, and non-communicable disease (NCD) cardiovascular/diabetes risk assessments.',
			keyDocs: [
				'Patient Demographic & PhilHealth Profile',
				'Past Medical, Surgical & Family History',
				'Pediatric Growth & Developmental Metrics',
				'Systematic Physical Examination Findings',
				'NCD High-Risk Assessment & Angina Screening'
			]
		},
		'PhilHealth & Universal Health Care': {
			id: 'philhealth-universal-health-care',
			code: 'RA 11223 UHC PMRF',
			icon: '💳',
			title: 'PhilHealth Registration & Enrollment Dossier',
			badge: 'Universal Health Care Statutory Dossier',
			stat: '1 Official Form',
			tagline: 'Universal Health Care Act (RA 11223) • Member Registration',
			description: 'Official statutory registration and data updating document for PhilHealth Universal Health Care coverage, declaration of qualified dependents, member classification (Direct vs. Indirect Contributors), and designation of preferred accredited RHU Konsulta primary care providers.',
			keyDocs: [
				'PhilHealth Member Registration Form (PMRF)',
				'Declaration of Qualified Dependents',
				'Direct & Indirect Contributor Classification',
				'Member Data Amendment & Updating Record'
			]
		},
		'Business Permits': {
			id: 'business-permits',
			code: 'RA 11032 ARTA',
			icon: '',
			title: 'Business Permit Document Folder',
			badge: 'Official BPLO Dossier',
			stat: '1 Official Form',
			tagline: 'Ease of Doing Business • ARTA & DILG Unified Permitting',
			description: 'Official municipal licensing dossier containing the prescribed 2-page Unified Application Form (UAF) for new business registration, annual renewals, and gross sales assessments.',
			keyDocs: [
				'Unified Application Form (UAF) for Business Permit (Annex 1)'
			]
		},
		'Public Transport': {
			id: 'public-transport',
			code: 'BPLO MTOP',
			icon: '',
			title: 'Public Transport Service Folder',
			badge: 'Official Transport Dossier',
			stat: '1 Official Form',
			tagline: 'Motorized Tricycle & Public Utility Vehicle Franchising',
			description: 'Official municipal regulatory application form for public utility transport service operators and drivers in Tanauan, covering MCH, e-Trikes, Pedicabs, and Motopots.',
			keyDocs: [
				'Application Form for Public Transport Service'
			]
		},
		'Checklists': {
			id: 'bplo-checklists',
			code: 'BPLO CHECKLISTS',
			icon: '',
			title: 'Official Requirements Checklist Folder',
			badge: 'Official Prerequisite Dossier',
			stat: '3 Official Checklists',
			tagline: 'Mandatory Documentary Requirements • Business & Public Transport Clearances',
			description: 'Official municipal checklist guides detailing all documentary prerequisites for commercial business permit applications (new & renewal), e-Trike/pedicab compliance, and MCH/motopot franchise applications.',
			keyDocs: [
				'Checklist of Documentary Requirements for Business Application',
				'Checklist Requirements for e-Trike and Pedicab',
				'Checklist Requirements for MCH, Motopot & Single Motorcycle'
			]
		}
	};

	const activeFolderItems = $derived.by(() => {
		if (!selectedFolder || !downloadableForms) return [];
		return downloadableForms.filter((f) => f.category === selectedFolder);
	});

	const navSections = $derived(
		baseNav.map((s, idx) => ({
			...s,
			code: String(idx + 1).padStart(2, '0')
		}))
	);

	const mandatesNavCode = $derived(navSections.find((s) => s.id === 'mandates')?.code);
	const leadershipNavCode = $derived(navSections.find((s) => s.id === 'leadership')?.code || '03');
	const structureNavCode = $derived(navSections.find((s) => s.id === 'structure')?.code || '04');
	const accomplishmentsNavCode = $derived(navSections.find((s) => s.id === 'accomplishments')?.code || '05');
	const awardsNavCode = $derived(navSections.find((s) => s.id === 'awards')?.code || '06');
	const formsNavCode = $derived(navSections.find((s) => s.id === 'forms')?.code);

	function scrollTo(id) {
		if (id === 'forms') {
			isFormsSectionOpen = true;
		}
		const target = document.getElementById(id);
		if (target) {
			const offset = 180;
			const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({ top: targetPosition, behavior: 'smooth' });
			activeSection = id;
		}
	}

	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				}
			},
			{
				rootMargin: '-30% 0px -50% 0px',
				threshold: 0
			}
		);

		navSections.forEach((s) => {
			const el = document.getElementById(s.id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	});
</script>

<svelte:window bind:scrollY onkeydown={handleKeydown} />

<svelte:head>
	<title>{officeName} | {municipality}</title>
	<meta name="description" content="{officeName} - {tagline}" />
</svelte:head>

<!-- 100% LIGHT, HIGH-CONTRAST, SENIOR-FRIENDLY CIVIC DESIGN (Blue & Yellow Palette) -->
<div
	class="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-amber-300 selection:text-blue-950"
>
	<!-- Fixed Floating Clean Pill Navigation (Desktop only, positioned safely below site header) -->
	<header
		class="fixed top-20 left-1/2 z-30 -translate-x-1/2 transition-all duration-300 hidden md:block {scrollY > 260 && isPillNavVisible && !activeFloatingModal && !activeFormModal
			? 'translate-y-0 opacity-100 pointer-events-auto'
			: '-translate-y-8 opacity-0 pointer-events-none'}"
	>
		<div
			class="flex items-center gap-1.5 rounded-full border-2 border-slate-300 bg-white/95 px-4 py-2 shadow-xl shadow-slate-900/10 backdrop-blur-md"
		>
			<div class="flex items-center gap-2 border-r-2 border-slate-200 pr-3 pl-1">
				<span class="h-3 w-3 rounded-full bg-amber-500"></span>
				<span class="text-xs font-extrabold tracking-wider text-blue-950">{officeCode}</span>
			</div>

			<nav class="flex items-center gap-1">
				{#each navSections as section}
					<button
						onclick={() => scrollTo(section.id)}
						class="rounded-full px-3.5 py-1.5 text-xs font-bold tracking-normal transition-all duration-200 {activeSection ===
						section.id
							? 'bg-blue-900 text-white shadow-sm'
							: 'text-slate-700 hover:bg-slate-100 hover:text-blue-950'}"
					>
						<span class="mr-1 font-mono text-[10px] opacity-75">{section.code}</span>
						{section.label}
					</button>
				{/each}
			</nav>
		</div>
	</header>

	<!-- Executive Hero Section with 3D Ambient Flowing Wave in the Background -->
	<section
		id="overview"
		class="scroll-mt-44 sm:scroll-mt-52 relative overflow-hidden border-b-4 border-amber-400 bg-gradient-to-b from-blue-50/80 via-slate-50 to-white pt-16 pb-16 lg:pt-24 lg:pb-20"
	>
		<!-- 3D Three.js Background Canvas (Coastal Waves & Flow of Public Funds) -->
		<OfficeHeroCanvas />

		<!-- Subtle Civic Grid Pattern for High Definition Depth -->
		<div
			class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"
		></div>

		<div class="relative z-10 container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
			<!-- Official Breadcrumb / Header Metadata Bar -->
			<div
				class="mb-8 flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-200 pb-4"
			>
				<div class="flex flex-wrap items-center gap-3">
					<span
						class="inline-block rounded border border-amber-500 bg-amber-400 px-3 py-1 font-mono text-xs font-black tracking-wider text-blue-950"
					>
						OFFICE CODE: {officeCode}
					</span>
					<span class="text-xs font-extrabold tracking-wider text-blue-900 uppercase">
						{category}
					</span>
					<span class="font-bold text-slate-400">•</span>
					<span class="text-xs font-bold text-slate-700">
						{municipality}
					</span>
				</div>

				<div class="flex items-center gap-2 text-xs font-bold text-blue-950">
					<span class="h-2.5 w-2.5 rounded-full {isMENRO ? 'bg-amber-400' : 'bg-emerald-600'}"></span>
					<span>Official Municipal Public Service Portal</span>
				</div>
			</div>

			<!-- Main Hero Grid: High-Contrast Heading Left, Official Seal Plaque with 3D Tilt Right -->
			<div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
				<!-- Left Column: High Contrast Senior-Friendly Information -->
				<div class="space-y-6 lg:col-span-7">
					<!-- Official Typewriter Mandate Statement -->
					<div
						class="inline-flex items-center gap-3 rounded-xl border-2 border-amber-400 bg-white px-4 py-2.5 shadow-sm"
					>
						<span
							class="text-xs font-extrabold tracking-wider whitespace-nowrap text-amber-800 uppercase"
						>
							KEY DIRECTIVE:
						</span>
						<TypewriterText
							words={typewriterWords}
							textColor="text-blue-950"
							cursorColor="bg-amber-500"
							class="text-sm font-bold sm:text-base"
						/>
					</div>

					<!-- Hero Headline: Dignified, Authoritative -->
					<div>
						<span
							class="mb-1 block text-base font-bold tracking-wide text-slate-600 uppercase sm:text-lg"
						>
							Republic of the Philippines • Municipality of Tanauan
						</span>
						<h1
							class="text-4xl leading-tight font-black tracking-tight text-blue-950 sm:text-5xl lg:text-6xl"
						>
							{officeName}
						</h1>
					</div>

					<!-- Description / Tagline (Clear Dark Slate Text) -->
					<p class="max-w-2xl text-lg leading-relaxed font-medium text-slate-800 sm:text-xl">
						{tagline}
					</p>

					<!-- Action Buttons (Includes prominent Citizen's Charter button) -->
					<div class="flex flex-wrap items-center gap-3.5 pt-2">
						<!-- Dedicated Citizen's Charter Button (Redirects to relevant office charter) -->
						<a
							href={citizensCharterUrl}
							class="inline-flex items-center gap-2.5 rounded-xl border-2 border-amber-400 bg-blue-950 px-6 py-3.5 text-base font-black text-amber-300 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-900 hover:text-white hover:shadow-lg"
						>
							<span>Citizen's Charter</span>
							<span class="font-mono text-sm text-amber-300">↗</span>
						</a>

						<button
							onclick={() => scrollTo('mandates')}
							class="inline-flex items-center gap-2.5 rounded-xl border border-amber-600/30 bg-amber-500 px-6 py-3.5 text-base font-black tracking-wide text-blue-950 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-lg"
						>
							<span>View Public Mandates</span>
							<span class="font-bold">→</span>
						</button>

						<button
							onclick={() => scrollTo('leadership')}
							class="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-5 py-3.5 text-base font-bold text-blue-950 shadow-sm transition-all duration-200 hover:bg-slate-100"
						>
							<span>Leadership</span>
						</button>
					</div>

					{#if isMDRRMO}
						<!-- 24/7 Emergency Dispatch Quick-Access Banner -->
						<div
							class="mt-6 rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 p-4 sm:p-5 text-white shadow-xl"
						>
							<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
								<div class="flex items-center gap-3.5">
									<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-950 text-xl font-black shadow-md">
										🚨
									</div>
									<div>
										<div class="flex items-center gap-2">
											<span class="text-[10px] font-mono font-black tracking-widest text-amber-400 uppercase">
												24/7 EMERGENCY DISPATCH HOTLINES // RESCUE TANAUAN
											</span>
											<span class="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
										</div>
										<div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-1">
											<a
												href="tel:09161977360"
												class="group inline-flex items-center gap-2 font-mono text-sm sm:text-base font-black text-white hover:text-amber-300 transition"
											>
												<span class="rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-black text-white">GLOBE</span>
												<span>0916-197-7360</span>
											</a>
											<span class="text-slate-600 hidden sm:inline">•</span>
											<a
												href="tel:09317393333"
												class="group inline-flex items-center gap-2 font-mono text-sm sm:text-base font-black text-white hover:text-emerald-300 transition"
											>
												<span class="rounded bg-emerald-600 px-1.5 py-0.5 text-[10px] font-black text-white">SMART</span>
												<span>0931-739-3333</span>
											</a>
											<span class="text-slate-600 hidden sm:inline">•</span>
											<span class="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-amber-300">
												<span class="rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-black text-slate-950">VHF RADIO</span>
												<span>167.600 MHz</span>
											</span>
										</div>
									</div>
								</div>

								<div class="flex items-center gap-2 self-start md:self-auto shrink-0">
									<a
										href="tel:09161977360"
										class="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-red-500 hover:scale-105 active:scale-95"
									>
										<span>Call Globe</span>
										<span>📞</span>
									</a>
									<a
										href="tel:09317393333"
										class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-emerald-500 hover:scale-105 active:scale-95"
									>
										<span>Call Smart</span>
										<span>📱</span>
									</a>
								</div>
							</div>
						</div>
					{/if}

					<!-- Citizen Public Service Badges -->
					<div
						class="grid max-w-2xl grid-cols-1 gap-3 border-t-2 border-slate-200 pt-4 text-xs sm:grid-cols-3"
					>
						<div class="rounded-xl border-2 border-slate-200 bg-white p-3.5 shadow-sm">
							<span class="block text-[11px] font-bold text-slate-500 uppercase">SERVICE HOURS</span
							>
							<span class="text-sm font-black text-blue-950">{schedule.hours}</span>
						</div>
						<div class="rounded-xl border-2 border-slate-200 bg-white p-3.5 shadow-sm">
							<span class="block text-[11px] font-bold text-slate-500 uppercase"
								>OFFICE LOCATION</span
							>
							<span class="text-sm font-black text-blue-950">{schedule.location}</span>
						</div>
						<div class="rounded-xl border-2 border-slate-200 bg-white p-3.5 shadow-sm">
							<span class="block text-[11px] font-bold text-slate-500 uppercase"
								>CITIZEN ASSISTANCE</span
							>
							<span class="text-sm font-black {isMENRO ? 'text-amber-600' : 'text-emerald-700'}">Open & Accessible</span>
							{#if schedule.helpline}<span
									class="mt-0.5 block text-[11px] font-medium text-slate-600"
									>{schedule.helpline}</span
								>{/if}
						</div>
					</div>
				</div>

				<!-- Right Column: Official Municipal Identity Plaque with Purposeful 3D Perspective Hover Tilt -->
				<div class="flex items-center justify-center lg:col-span-5">
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						class="w-full max-w-md transition-transform duration-200 ease-out"
						onmousemove={handlePlaqueMouseMove}
						onmouseleave={handlePlaqueMouseLeave}
						style="perspective: 1000px;"
					>
						<!-- Executive Plaque Card with Real Government Content & Tactile 3D Tilt -->
						<div
							class="relative overflow-hidden rounded-3xl border-2 border-amber-400 bg-white p-8 shadow-2xl shadow-slate-300/70 transition-all duration-300 ease-out"
							style="transform: rotateX({plaqueRotateX}deg) rotateY({plaqueRotateY}deg);"
						>
							<!-- Dynamic lighting sheen following pointer -->
							<div
								class="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300"
								style="background: radial-gradient(circle at {plaqueGlowX}% {plaqueGlowY}%, rgba(254, 240, 138, 0.4) 0%, transparent 65%);"
							></div>

							<!-- Official Seal & Header Row -->
							<div class="mb-6 flex items-center gap-4 border-b-2 border-slate-100 pb-6">
								<img
									src="/tanauan logo.svg"
									alt="Official Seal of Tanauan, Leyte"
									class="h-20 w-20 shrink-0 object-contain drop-shadow-md"
								/>
								<div>
									<span
										class="block text-[11px] font-black tracking-wider text-amber-700 uppercase"
									>
										Municipality of Tanauan
									</span>
									<h3 class="text-xl leading-tight font-black text-blue-950">
										{officeName}
									</h3>
									<span class="text-xs font-semibold text-slate-600">
										{category}
									</span>
								</div>
							</div>

							<!-- Frontline Citizen Services Quick Links -->
							<div class="mb-6 space-y-2.5">
								<span
									class="block text-[11px] font-extrabold tracking-wider text-slate-500 uppercase"
								>
									FRONTLINE SERVICES:
								</span>

								<a
									href={citizensCharterUrl}
									class="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 transition-all hover:border-amber-400 hover:bg-amber-50/70"
								>
									<div>
										<div class="text-xs font-black text-blue-950 group-hover:text-blue-900">
											Public Inquiries & Requests
										</div>
										<div class="text-[11px] text-slate-600">General services & transactions</div>
									</div>
									<span class="font-mono text-xs font-bold text-amber-700">WINDOW 1</span>
								</a>

								<a
									href={citizensCharterUrl}
									class="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 transition-all hover:border-amber-400 hover:bg-amber-50/70"
								>
									<div>
										<div class="text-xs font-black text-blue-950 group-hover:text-blue-900">
											Document Processing
										</div>
										<div class="text-[11px] text-slate-600">
											Certifications, clearances & records
										</div>
									</div>
									<span class="font-mono text-xs font-bold text-amber-700">WINDOW 2</span>
								</a>
							</div>

							<!-- Bottom Citizen Charter Direct Action Button -->
							<a
								href={citizensCharterUrl}
								class="group block rounded-xl border border-amber-400/70 bg-blue-950 p-3.5 text-center text-white shadow-sm transition-all hover:bg-blue-900"
							>
								<div
									class="flex items-center justify-center gap-2 text-xs font-bold tracking-wide text-amber-300 uppercase"
								>
									<span>VIEW CITIZEN'S CHARTER GUIDE</span>
									<span class="transition-transform group-hover:translate-x-1">→</span>
								</div>
								<div class="mt-0.5 text-[11px] text-blue-100">
									Service times, fees, & official requirements
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Key Metrics & Performance Ribbon (Crisp White Cards, High Legibility for Seniors) -->
	<section class="relative border-b border-slate-200 bg-white py-12 shadow-sm">
		<div class="container mx-auto max-w-7xl px-6">
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each stats as stat, index}
					<div
						class="group rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-900 hover:shadow-md"
					>
						<div class="mb-2 flex items-center justify-between">
							<span class="text-xs font-extrabold tracking-wider text-blue-900 uppercase">
								RECORD 0{index + 1}
							</span>
							<span class="h-3 w-3 rounded-full bg-amber-500"></span>
						</div>

						<div class="mb-1 text-4xl font-black tracking-tight text-blue-950 lg:text-5xl">
							{stat.value}<span class="font-black text-amber-600">{stat.suffix}</span>
						</div>

						<div class="mb-1 text-base font-extrabold text-slate-900">
							{stat.label}
						</div>
						<div class="text-sm leading-normal font-medium text-slate-700">
							{stat.description}
						</div>

						<!-- Gold Underline -->
						<div
							class="mt-4 h-1.5 w-12 rounded-full bg-amber-400 transition-all duration-300 group-hover:w-full"
						></div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Main Content Sections (Crisp, High-Contrast Editorial Design) -->
	<main class="divide-y divide-slate-200">
		<!-- Section: Vision & Mission (When Provided) -->
		{#if vision || mission}
			<section id="vision-mission" class="bg-gradient-to-b from-white via-slate-50 to-white py-20">
				<div class="container mx-auto max-w-7xl px-6">
					<!-- Section Header -->
					<div class="mb-10 max-w-3xl">
						<div
							class="mb-3 inline-block rounded-md border border-amber-300 bg-amber-100 px-3.5 py-1 text-xs font-black tracking-wider text-amber-950 uppercase"
						>
							STRATEGIC PURPOSE // INSTITUTIONAL DIRECTION
						</div>
						<h2
							class="text-3xl leading-tight font-black tracking-tight text-blue-950 sm:text-4xl lg:text-5xl"
						>
							Vision & Mission Statement
						</h2>
						<p class="mt-4 text-base leading-relaxed font-normal text-slate-800 sm:text-lg">
							Official institutional mandate and long-term vision. Click on either statement to
							inspect in an expanded floating window.
						</p>
					</div>

					<!-- Two High-Contrast Interactive Cards that open Floating Window -->
					<div class="grid gap-8 lg:grid-cols-2">
						{#if vision}
							<!-- VISION CARD -->
							<div
								role="button"
								tabindex="0"
								onclick={() => openModal('vision')}
								onkeydown={(e) => e.key === 'Enter' && openModal('vision')}
								class="group flex cursor-pointer flex-col justify-between rounded-3xl border-2 border-t-4 border-slate-200 border-t-amber-500 bg-white p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl sm:p-9"
								title="Click to view Vision in a floating window"
							>
								<div>
									<div class="mb-6 flex items-center justify-between">
										<div class="flex items-center gap-3.5">
											<div
												class="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-blue-950 shadow-sm transition-transform duration-300 group-hover:scale-110"
											>
												<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
													/>
												</svg>
											</div>
											<div>
												<span class="text-[11px] font-black tracking-wider text-amber-700 uppercase"
													>LONG-TERM ASPIRATION</span
												>
												<h3
													class="text-2xl font-black tracking-tight text-blue-950 transition-colors group-hover:text-blue-900"
												>
													OUR VISION
												</h3>
											</div>
										</div>

										<span
											class="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-black text-amber-900 shadow-2xs transition-all group-hover:bg-amber-400 group-hover:text-blue-950"
										>
											<span>🗗 Floating Window</span>
											<span>↗</span>
										</span>
									</div>

									<div
										class="rounded-2xl border-l-4 border-amber-500 bg-amber-50/50 p-5 shadow-2xs transition-colors group-hover:bg-amber-50/80"
									>
										<p class="text-base leading-relaxed font-semibold text-slate-900 sm:text-lg">
											"{vision}"
										</p>
									</div>
								</div>

								<div class="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
									<div class="flex flex-wrap gap-2">
										<span
											class="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-800"
										>
											✦ Sustainable Operations
										</span>
										<span
											class="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-800"
										>
											✦ Competent Manpower
										</span>
									</div>
									<button
										type="button"
										onclick={(e) => {
											e.stopPropagation();
											openModal('vision');
										}}
										class="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-black text-blue-950 shadow-xs transition-all hover:scale-105 hover:bg-amber-400 active:scale-95"
									>
										<span>Open Floating Window</span>
										<span>↗</span>
									</button>
								</div>
							</div>
						{/if}

						{#if mission}
							<!-- MISSION CARD -->
							<div
								role="button"
								tabindex="0"
								onclick={() => openModal('mission')}
								onkeydown={(e) => e.key === 'Enter' && openModal('mission')}
								class="group flex cursor-pointer flex-col justify-between rounded-3xl border-2 border-t-4 border-slate-200 border-t-blue-900 bg-white p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-900 hover:shadow-xl sm:p-9"
								title="Click to view Mission in a floating window"
							>
								<div>
									<div class="mb-6 flex items-center justify-between">
										<div class="flex items-center gap-3.5">
											<div
												class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-900 text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
											>
												<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
													/>
												</svg>
											</div>
											<div>
												<span class="text-[11px] font-black tracking-wider text-blue-900 uppercase"
													>OFFICIAL COMMITMENT</span
												>
												<h3
													class="text-2xl font-black tracking-tight text-blue-950 transition-colors group-hover:text-blue-900"
												>
													OUR MISSION
												</h3>
											</div>
										</div>

										<span
											class="inline-flex items-center gap-1.5 rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-black text-blue-950 shadow-2xs transition-all group-hover:bg-blue-900 group-hover:text-white"
										>
											<span>🗗 Floating Window</span>
											<span>↗</span>
										</span>
									</div>

									<div
										class="rounded-2xl border-l-4 border-blue-900 bg-slate-50 p-5 shadow-2xs transition-colors group-hover:bg-blue-50/40"
									>
										<p
											class="line-clamp-4 text-sm leading-relaxed font-medium text-slate-800 sm:text-base"
										>
											{mission}
										</p>
									</div>
								</div>

								<div class="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
									<div class="flex flex-wrap gap-2">
										<span
											class="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-950"
										>
											Supply & Property
										</span>
										<span
											class="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-950"
										>
											Buildings & Grounds
										</span>
									</div>
									<button
										type="button"
										onclick={(e) => {
											e.stopPropagation();
											openModal('mission');
										}}
										class="inline-flex items-center gap-1.5 rounded-xl bg-blue-900 px-3.5 py-2 text-xs font-black text-white shadow-xs transition-all hover:scale-105 hover:bg-blue-800 active:scale-95"
									>
										<span>Open Floating Window</span>
										<span>↗</span>
									</button>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</section>
		{/if}

		<!-- Section: Services Offered & Procedures (When Provided or MAO) -->
		{#if isMAO}
			<MAOServicesPortal
				officeLocation={schedule?.location}
				officeHours={schedule?.hours}
				contactNumber={schedule?.contactNumber}
				email={schedule?.email}
				charterUrl={citizensCharterUrl}
			/>
		{:else if isMENRO}
			<MENROCollectionSchedule />
		{:else if servicesOffered && servicesOffered.length > 0}
			<section id="services" class="bg-white py-20">
				<div class="container mx-auto max-w-7xl px-6">
					<!-- Section Header -->
					<div class="mb-10 max-w-3xl">
						<div
							class="mb-3 inline-block rounded-md border border-blue-300 bg-blue-100 px-3.5 py-1 text-xs font-black tracking-wider text-blue-950 uppercase"
						>
							PUBLIC ASSISTANCE // FRONTLINE SERVICES
						</div>
						<h2
							class="text-3xl leading-tight font-black tracking-tight text-blue-950 sm:text-4xl lg:text-5xl"
						>
							Services Offered & Procedures
						</h2>
						<p class="mt-4 text-base leading-relaxed font-normal text-slate-800 sm:text-lg">
							Direct citizen public services. Click on any service card below to view its full
							step-by-step procedures and guidelines in a dedicated floating window.
						</p>
					</div>

					<!-- Services Cards Grid -->
					<div class="grid gap-8 lg:grid-cols-2">
						{#each servicesOffered as svc}
							<div
								role="button"
								tabindex="0"
								onclick={() => openModal(svc)}
								onkeydown={(e) => e.key === 'Enter' && openModal(svc)}
								class="group flex cursor-pointer flex-col justify-between rounded-3xl border-2 border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-900 hover:shadow-xl sm:p-8"
								title="Click to view {svc.title} in a floating window"
							>
								<div>
									<!-- Header Badge & Counter -->
									<div class="mb-4 flex items-center justify-between">
										<span
											class="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-100/70 px-3 py-1 text-xs font-extrabold tracking-wide text-blue-950 uppercase"
										>
											<span class="h-2 w-2 rounded-full bg-amber-500"></span>
											{svc.badge || `Service Offered ${svc.serviceNumber}`}
										</span>

										<span
											class="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-black text-blue-950 shadow-2xs transition-colors group-hover:border-amber-400 group-hover:bg-amber-400"
										>
											<span>🗗 Floating Window</span>
											<span>↗</span>
										</span>
									</div>

									<h3
										class="mb-3 text-xl font-black text-blue-950 transition-colors group-hover:text-blue-900 sm:text-2xl"
									>
										{svc.title}
									</h3>

									{#if svc.description}
										<p class="mb-5 text-sm leading-relaxed text-slate-700">
											{svc.description}
										</p>
									{/if}

									<!-- Available items or venues tags -->
									{#if svc.equipmentList}
										<div class="mb-6 flex flex-wrap items-center gap-2">
											<span class="mr-1 text-xs font-bold text-slate-500 uppercase"
												>Available Items:</span
											>
											{#each svc.equipmentList as item}
												<span
													class="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-black text-blue-950 shadow-2xs"
												>
													✓ {item}
												</span>
											{/each}
										</div>
									{:else if svc.venueList}
										<div class="mb-6 flex flex-wrap items-center gap-2">
											<span class="mr-1 text-xs font-bold text-slate-500 uppercase"
												>Covered Venues:</span
											>
											{#each svc.venueList as venue}
												<span
													class="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-black text-blue-950 shadow-2xs"
												>
													🏛 {venue}
												</span>
											{/each}
										</div>
									{/if}

									<!-- Steps Header -->
									<div
										class="mb-4 flex items-center justify-between border-t border-slate-200 pt-5"
									>
										<span class="text-xs font-black tracking-wider text-blue-950 uppercase"
											>Step / s (Summary):</span
										>
										<span class="text-xs font-bold text-blue-900 group-hover:underline"
											>Click to Expand Full Flow →</span
										>
									</div>

									<!-- Step Sequence Preview -->
									<ol class="mb-6 space-y-3">
										{#each svc.steps as step, sIdx}
											<li
												class="flex items-start gap-3.5 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xs"
											>
												<span
													class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-950 text-xs font-black text-amber-300 shadow-xs"
												>
													{sIdx + 1}
												</span>
												<div class="pt-0.5 text-sm leading-snug font-semibold text-slate-800">
													{step}
												</div>
											</li>
										{/each}
									</ol>

									<!-- Note Callout Box -->
									{#if svc.note}
										<div
											class="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-4 text-xs leading-relaxed text-amber-950 shadow-2xs"
										>
											<div class="mb-1 flex items-center gap-2 font-black text-amber-900 uppercase">
												<svg
													class="h-4 w-4 shrink-0 text-amber-700"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fill-rule="evenodd"
														d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
														clip-rule="evenodd"
													/>
												</svg>
												<span>Accountability & Damage Policy</span>
											</div>
											<p class="font-medium text-slate-800 italic">
												{svc.note}
											</p>
										</div>
									{/if}

									<!-- Downloadable Form Banner on Card -->
									{#if svc.downloadableFormUrl}
										<div
											class="mt-4 flex flex-col justify-between gap-3 rounded-2xl border border-emerald-300 bg-emerald-50/80 p-3.5 shadow-2xs sm:flex-row sm:items-center"
										>
											<div class="flex items-center gap-2.5">
												<div
													class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white"
												>
													<svg
														class="h-4 w-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
														/>
													</svg>
												</div>
												<div>
													<div
														class="text-[10px] font-black tracking-wider text-emerald-800 uppercase"
													>
														Downloadable Form Available
													</div>
													<div class="text-xs font-black text-slate-900">
														{svc.downloadableFormTitle || 'Borrower & Return Form'}
													</div>
												</div>
											</div>
											<a
												href={svc.downloadableFormUrl}
												target="_blank"
												rel="noopener noreferrer"
												onclick={(e) => e.stopPropagation()}
												class="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-black text-white shadow-2xs transition-all hover:bg-emerald-700 active:scale-95"
											>
												<svg
													class="h-3.5 w-3.5"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
													/>
												</svg>
												<span>Download Form ↗</span>
											</a>
										</div>
									{/if}
								</div>

								<div
									class="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs"
								>
									<span class="font-semibold text-slate-500"
										>Step-by-step procedures & guidelines</span
									>
									<button
										type="button"
										onclick={(e) => {
											e.stopPropagation();
											openModal(svc);
										}}
										class="inline-flex items-center gap-1.5 rounded-xl bg-blue-950 px-4 py-2 font-black text-amber-300 shadow-xs transition-all hover:scale-105 hover:bg-blue-900 active:scale-95"
									>
										<span>Open Floating Window</span>
										<span>↗</span>
									</button>
								</div>
							</div>
						{/each}
					</div>

					<!-- Official Signatories Section -->
					{#if preparedBy || reviewedBy}
						<div
							class="mt-12 rounded-3xl border-2 border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8"
						>
							<div class="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
								<div class="flex items-center gap-2">
									<span class="h-2.5 w-2.5 rounded-full bg-blue-900"></span>
									<span class="text-xs font-black tracking-wider text-blue-950 uppercase">
										Administrative Control & Document Signatories
									</span>
								</div>
								<span
									class="rounded bg-slate-200/80 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700 uppercase"
								>
									Official Documentation
								</span>
							</div>

							<div class="grid gap-6 sm:grid-cols-2">
								{#if preparedBy}
									<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
										<span
											class="mb-2 block text-[11px] font-black tracking-wider text-slate-500 uppercase"
										>
											PREPARED BY:
										</span>
										<div
											class="text-lg font-black text-blue-950 underline decoration-amber-400 decoration-2 underline-offset-4"
										>
											{preparedBy.name}
										</div>
										<div class="mt-1 text-xs font-extrabold text-slate-700">
											{preparedBy.title || preparedBy.role}
										</div>
										<span
											class="mt-2 inline-block rounded border border-blue-200/70 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-900"
										>
											Frontline Service Focal Person
										</span>
									</div>
								{/if}

								{#if reviewedBy}
									<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
										<span
											class="mb-2 block text-[11px] font-black tracking-wider text-slate-500 uppercase"
										>
											REVIEWED BY:
										</span>
										<div
											class="text-lg font-black text-blue-950 underline decoration-amber-400 decoration-2 underline-offset-4"
										>
											{reviewedBy.name}
										</div>
										<div class="mt-1 text-xs font-extrabold text-slate-700">
											{reviewedBy.title || reviewedBy.role}
										</div>
										<span
											class="mt-2 inline-block rounded border border-amber-200/70 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-900"
										>
											GSO Operation Manager / Department Head
										</span>
									</div>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			</section>
		{/if}

	{#snippet formsSection()}
		<!-- Section: Downloadable Forms (Royal Blue & Amber Yellow Folder System) -->
		<section id="forms" class="scroll-mt-44 sm:scroll-mt-52 relative bg-gradient-to-b from-blue-50/60 via-white to-blue-50/40 pt-16 pb-32 sm:pt-20 sm:pb-40 overflow-hidden border-t-2 border-amber-400/50">
			<!-- Decorative background elements in Royal Blue & Amber Yellow -->
			<div class="pointer-events-none absolute inset-0">
				<div class="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-900/5 blur-3xl"></div>
				<div class="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl"></div>
			</div>

			<div class="relative container mx-auto max-w-7xl px-6">
				{#if !isFormsSectionOpen}
					<!-- COLLAPSED BANNER STATE (Click to expand downloadable section) -->
					<div
						role="button"
						tabindex="0"
						onclick={toggleFormsSection}
						onkeydown={(e) => e.key === 'Enter' && toggleFormsSection()}
						class="group cursor-pointer rounded-3xl border-2 border-amber-400 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 p-6 sm:p-8 text-white shadow-xl transition-all duration-300 hover:scale-[1.01] hover:border-amber-300 hover:shadow-2xl text-left"
						title="Click to open Downloadable Forms Section"
					>
						<div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
							<div class="space-y-2">
								<div class="flex flex-wrap items-center gap-2">
									<span class="rounded-md border border-amber-400 bg-amber-400/20 px-3 py-1 text-[11px] font-black tracking-wider text-amber-300 uppercase">
										{#if formsNavCode}
											SECTION {formsNavCode} // {isLicensing ? 'OFFICIAL LICENSING & REGULATORY FORMS' : 'DOWNLOADABLE FORMS'}
										{:else}
											OFFICIAL DOWNLOADABLES
										{/if}
									</span>
									<span class="rounded-full border border-amber-400 bg-amber-400 px-2.5 py-0.5 font-mono text-[10px] font-black text-blue-950 uppercase">
										{downloadableForms.length} Documents Available
									</span>
								</div>
								<h2 class="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-300 transition-colors">
									{isMENRO ? 'Downloadables & Citizen Guides' : isHealthOffice ? 'Downloadable Health Forms' : isLicensing ? 'Downloadable Office Forms' : 'Downloadable Office Forms'}
								</h2>
								<p class="text-xs sm:text-sm text-blue-100 max-w-2xl font-normal leading-relaxed">
									{isLicensing
										? 'Click to expand official business permit applications, unified ARTA forms, public transport franchising documents, and regulatory checklists.'
										: 'Click to expand and access official printable and downloadable municipal forms.'}
								</p>
							</div>

							<div class="flex shrink-0 items-center">
								<div
									class="inline-flex items-center gap-2 rounded-2xl border-2 border-amber-400 bg-amber-400 px-6 py-3.5 text-xs font-black text-blue-950 uppercase tracking-wider shadow-md transition-all group-hover:bg-amber-300 group-hover:scale-105 active:scale-95"
								>
									<span>Open Downloadable Section</span>
									<span class="text-sm font-black transition-transform group-hover:translate-y-0.5">▼</span>
								</div>
							</div>
						</div>
					</div>
				{:else}
					<!-- EXPANDED STATE -->
					<div class="mb-12 flex flex-col justify-between gap-6 border-b-2 border-blue-900/15 pb-8 md:flex-row md:items-end">
						<div class="max-w-3xl">
							<div
								class="mb-3 inline-flex items-center gap-2 rounded-md border-2 border-amber-400 bg-blue-950 px-3.5 py-1 text-xs font-black tracking-wider text-amber-400 uppercase shadow-xs"
							>
								<span class="h-2 w-2 animate-pulse rounded-full bg-amber-400"></span>
								{#if formsNavCode}
									SECTION {formsNavCode} // {isMENRO ? 'OFFICIAL DOWNLOADABLES & CITIZEN GUIDES' : isHealthOffice ? 'OFFICIAL HEALTHCARE RECORDS & CLINICAL FORMS' : isLicensing ? 'OFFICIAL LICENSING & REGULATORY FORMS' : 'OFFICIAL PERMIT FOLDERS & FORMS'}
								{:else}
									{isMENRO ? 'OFFICIAL DOWNLOADABLES & CITIZEN GUIDES' : isHealthOffice ? 'OFFICIAL HEALTHCARE RECORDS & CLINICAL FORMS' : isLicensing ? 'OFFICIAL LICENSING & REGULATORY FORMS' : 'OFFICIAL PERMIT FOLDERS & FORMS'}
								{/if}
							</div>
							<h2
								class="text-3xl leading-tight font-black tracking-tight text-blue-950 sm:text-4xl lg:text-5xl"
							>
								{isMENRO ? 'Downloadables & Citizen Guides' : isHealthOffice ? 'Downloadable Health Forms' : isLicensing ? 'Downloadable Office Forms' : 'Downloadable Office Forms'}
							</h2>
							<p class="mt-4 text-base leading-relaxed font-normal text-blue-950/80 sm:text-lg">
								{isMENRO
									? 'Official MENRO permit checklists, Citizen’s Charters, and environmental regulatory guides available for direct download and document inspection.'
									: isHealthOffice
									? 'All official municipal health records, dental treatment dossiers, and PhilHealth enrollment forms are organized into dedicated official folders. Click a folder below to open and access its full collection of downloadable and printable forms.'
									: isLicensing
									? 'Official business permit applications, unified ARTA forms, and public transport service franchise documents available for direct inspection, PDF review, and official download.'
									: 'All engineering permit documents are organized into dedicated official folders. Click a folder below to open and access its full collection of downloadable and printable forms.'}
							</p>
						</div>

						<!-- Action Controls: Total Repository Pill & Collapse Button -->
						<div class="flex shrink-0 flex-wrap items-center gap-3">
							<div class="rounded-2xl border-2 border-amber-400 bg-blue-950 px-6 py-3.5 text-left shadow-md">
								<div class="text-[10px] font-black tracking-wider text-amber-400 uppercase">OFFICIAL REPOSITORY</div>
								<div class="flex items-center gap-2">
									<span class="text-2xl font-black text-amber-300">{downloadableForms.length}</span>
									<span class="text-xs font-bold text-blue-100">Documents in {formCategories.length || 1} Folders</span>
								</div>
							</div>

							<button
								type="button"
								onclick={toggleFormsSection}
								class="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-950 bg-white hover:bg-blue-950 hover:text-amber-300 px-5 py-3.5 text-xs font-black text-blue-950 transition-all shadow-sm hover:scale-105 active:scale-95"
								title="Collapse Downloadable Forms Section"
							>
								<span>Collapse Section</span>
								<span class="text-xs font-black">▲</span>
							</button>
						</div>
					</div>

					{#if formCategories.length > 0}
						<!-- FOLDER OVERVIEW RACK (ROYAL BLUE & AMBER YELLOW) -->
						<div class="mb-12">
							<div class="mb-5 flex items-center justify-between">
								<div class="flex flex-wrap items-center gap-2.5">
									<span class="text-xs font-black tracking-wider text-blue-950 uppercase">{isHealthOffice ? 'OFFICIAL HEALTHCARE DOSSIERS:' : 'OFFICIAL PERMIT DOSSIERS:'}</span>
									<span class="text-xs font-bold text-amber-700">Click a folder to view its contained forms</span>
								</div>
								{#if selectedFolder}
									<button
										type="button"
										onclick={closeFolderView}
										class="inline-flex items-center gap-1.5 rounded-xl border-2 border-amber-400 bg-white hover:bg-amber-400 hover:text-blue-950 px-3.5 py-1.5 text-xs font-black text-blue-950 transition-all shadow-xs"
									>
										<span>View All Folders</span>
									</button>
								{/if}
							</div>

							<!-- Folder Cards (Business Permits, Public Transport, Checklists, etc.) -->
							<div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
								{#each formCategories as cat}
									{@const details = folderDetails[cat] || {
										code: cat.toUpperCase(),
										title: `${cat} Document Folder`,
										badge: 'Official Dossier',
										tagline: 'Prescribed Municipal Technical Forms',
										description: `Official folder containing all forms and checklists related to ${cat}.`,
										keyDocs: []
									}}
									{@const items = downloadableForms.filter((f) => f.category === cat)}
									{@const isOpen = selectedFolder === cat}

									<div
										role="button"
										tabindex="0"
										onclick={() => openFolderView(cat)}
										onkeydown={(e) => e.key === 'Enter' && openFolderView(cat)}
										class="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border-2 {isOpen
											? 'border-amber-400 ring-4 ring-amber-400/40 shadow-2xl'
											: 'border-amber-400/80 hover:border-amber-400'} bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white shadow-xl transition-all duration-300 hover:-translate-y-2 text-left"
										title="Click to open {cat} folder"
									>
										<!-- Realistic Folder Tab on top left (No emoji icons) -->
										<div class="flex items-center justify-between px-4 pt-4 pb-2 sm:px-6 sm:pt-5">
											<div class="inline-flex items-center gap-2 rounded-xl border-2 border-amber-400/60 bg-blue-900/90 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-[11px] font-black tracking-wider text-amber-300 uppercase shadow-inner">
												<span>DOSSIER // {details.code}</span>
											</div>
											<span class="rounded-full border-2 border-amber-400 bg-amber-400 px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[11px] sm:text-xs font-black text-blue-950 shadow-sm uppercase tracking-wide">
												{items.length} {items.length === 1 ? 'Form' : 'Forms'}
											</span>
										</div>

										<!-- Folder Body -->
										<div class="flex flex-1 flex-col p-5 sm:p-8">
											<div class="mb-4">
												<div class="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-widest truncate">
													{details.tagline}
												</div>
												<h3 class="mt-1 text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors leading-tight">
													{details.title}
												</h3>
											</div>

											<p class="mb-5 sm:mb-6 text-xs sm:text-sm leading-relaxed text-blue-100 font-normal">
												{details.description}
											</p>

											<!-- Folder File Previews / Key Documents -->
											<div class="mb-5 sm:mb-6 rounded-2xl border border-amber-400/30 bg-blue-950/80 p-3.5 sm:p-4">
												<div class="mb-2 text-[10px] font-black text-amber-400 uppercase tracking-wider">
													Documents in this Folder:
												</div>
												<div class="flex flex-wrap gap-1.5">
													{#each items as item}
														<span class="inline-flex items-center gap-1 rounded-lg border border-blue-700/60 bg-blue-900/80 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-blue-100 max-w-full">
															<span class="text-amber-400 font-bold">•</span>
															<span class="truncate max-w-[280px] sm:max-w-[340px]">{item.title}</span>
														</span>
													{/each}
												</div>
											</div>

											<!-- Folder Open Action Button -->
											<div class="mt-auto pt-2">
												<div
													class="flex w-full items-center justify-between rounded-2xl border-2 border-amber-400 {isOpen
														? 'bg-amber-300 text-blue-950 shadow-inner'
														: 'bg-amber-400 hover:bg-amber-300 text-blue-950'} px-4 py-3 sm:px-6 sm:py-3.5 font-black text-xs sm:text-sm shadow-md transition-all group-hover:shadow-amber-400/30"
												>
													<span class="flex items-center gap-2 truncate font-black">
														<span class="truncate">{isOpen ? `${cat} Folder Open Below` : `Open ${cat} Folder`}</span>
													</span>
													<span class="text-base font-black transition-transform group-hover:translate-x-1 shrink-0">→</span>
												</div>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>

						<!-- OPEN FOLDER STAGE (When a folder is selected) -->
						{#if selectedFolder}
							<div id="open-folder-stage" class="scroll-mt-44 sm:scroll-mt-52 space-y-6 sm:space-y-8 rounded-3xl border-2 border-amber-400 bg-white p-4 sm:p-8 lg:p-10 shadow-2xl">
								<!-- Folder Top Bar & Switcher in Royal Blue & Amber Yellow -->
								<div class="flex flex-col justify-between gap-4 border-b-2 border-amber-400/40 pb-6 md:flex-row md:items-center">
									<div class="flex flex-wrap items-center gap-3">
										<button
											type="button"
											onclick={closeFolderView}
											class="inline-flex items-center gap-1.5 rounded-xl border-2 border-blue-950 bg-blue-950 hover:bg-blue-900 px-4 py-2 text-xs font-black text-amber-300 transition-all shadow-sm hover:scale-105 active:scale-95"
										>
											<span>← Close Folder</span>
										</button>
										<div class="flex items-center gap-2 text-xs font-black text-blue-950 uppercase tracking-wide">
											<span class="text-slate-400">ARCHIVE</span>
											<span class="text-amber-500">/</span>
											<span class="rounded-lg border-2 border-amber-400 bg-amber-100 px-3 py-1 text-blue-950 font-black">
												{selectedFolder} Folder
											</span>
										</div>
									</div>

									<!-- Quick Switcher Tabs -->
									<div class="flex flex-wrap items-center gap-2">
										<span class="text-xs font-black text-blue-950 uppercase mr-1">Switch Folder:</span>
										{#each formCategories as cat}
											{@const count = downloadableForms.filter((f) => f.category === cat).length}
											<button
												type="button"
												onclick={() => openFolderView(cat)}
												class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all {selectedFolder === cat
													? 'border-2 border-amber-400 bg-amber-400 text-blue-950 shadow-md scale-105'
													: 'border-2 border-blue-950 bg-white text-blue-950 hover:bg-blue-50'}"
											>
												<span>{cat}</span>
												<span
													class="rounded-full px-2 py-0.5 text-[10px] font-black {selectedFolder === cat
														? 'bg-blue-950 text-amber-300'
														: 'bg-blue-100 text-blue-950'}"
												>
													{count}
												</span>
											</button>
										{/each}
									</div>
								</div>

								<!-- Folder Open Interior Banner (Royal Blue & Amber Yellow) -->
								<div class="relative overflow-hidden rounded-3xl border-2 border-amber-400 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 p-6 sm:p-8 text-white shadow-md">
									<div class="h-1.5 w-full bg-amber-400 absolute top-0 left-0"></div>
									<div class="flex flex-col justify-between gap-6 md:flex-row md:items-center">
										<div class="flex items-start gap-4">
											<div>
												<div class="flex flex-wrap items-center gap-2">
													<span class="rounded-md border border-amber-400 bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-300">
														{folderDetails[selectedFolder]?.code || folderDetails[selectedFolder]?.badge || 'Municipal Permitting Dossier'}
													</span>
													<span class="text-xs font-bold text-amber-300">• {activeFolderItems.length} Forms in this Folder</span>
												</div>
												<h3 class="mt-1 text-2xl sm:text-3xl font-black text-white">
													{selectedFolder} Official Forms &amp; Applications
												</h3>
												<p class="mt-2 text-xs sm:text-sm text-blue-100 font-normal max-w-3xl leading-relaxed">
													{folderDetails[selectedFolder]?.description || `Complete set of official documents, forms, and checklists required for ${selectedFolder}. Click any form to inspect details, print the digital form, or download the official PDF.`}
												</p>
											</div>
										</div>

										<div class="flex shrink-0 items-center gap-2 text-right">
											<div class="rounded-2xl border border-amber-400/50 bg-blue-900/60 px-5 py-3 text-center">
												<div class="text-[10px] font-black text-amber-400 uppercase">ACTIVE FOLDER</div>
												<div class="font-mono text-xl font-black text-white">{activeFolderItems.length} FORMS</div>
											</div>
										</div>
									</div>
								</div>

								<!-- Cards Grid for the Active Folder (No emoji icons) -->
								<div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
									{#each activeFolderItems as form, fIdx}
										<div
											role="button"
											tabindex="0"
											onclick={() => openFormModal(form)}
											onkeydown={(e) => e.key === 'Enter' && openFormModal(form)}
											id="form-card-{selectedFolder}-{fIdx}"
											class="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border-2 border-blue-900/20 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-2xl"
											title="Click to view {form.title}"
										>
											<!-- Top accent bar in Royal Blue & Amber Yellow -->
											<div class="h-2 w-full bg-gradient-to-r from-blue-950 via-blue-800 to-amber-400 transition-all duration-300 group-hover:h-2.5"></div>

											<!-- Shine overlay on hover -->
											<div
												class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
												style="background: linear-gradient(135deg, rgba(251,191,36,0.1) 0%, transparent 60%);"
											></div>

											<div class="flex flex-1 flex-col p-5 sm:p-7">
												<!-- Category Badge & Number Row (No emoji icons) -->
												<div class="mb-3 flex items-center justify-between">
													<span class="font-mono text-xs font-black text-blue-950 uppercase tracking-wider">
														FORM {form.index || String(fIdx + 1).padStart(2, '0')}
													</span>
													<span class="rounded-md border border-amber-400 bg-amber-100 px-2.5 py-0.5 text-[9px] font-black text-amber-950 uppercase tracking-wider">
														{form.category}
													</span>
												</div>

												<!-- Form type badge -->
												{#if form.type}
													<span class="mb-2 inline-block rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-black tracking-wider text-blue-950 uppercase">
														{form.type}
													</span>
												{/if}

												<!-- Title -->
												<h3 class="mb-2 text-base sm:text-lg leading-snug font-black text-blue-950 transition-colors group-hover:text-blue-800">
													{form.title}
												</h3>

												<!-- Description -->
												{#if form.description}
													<p class="mb-4 line-clamp-2 text-xs sm:text-sm leading-relaxed font-medium text-slate-700">
														{form.description}
													</p>
												{/if}

												<!-- Checklist highlight box -->
												{#if form.requirements && form.requirements.length > 0}
													<div class="mb-4 rounded-xl border border-blue-200 bg-blue-50/70 p-2.5 text-[11px] text-blue-950">
														<div class="font-bold text-blue-950 mb-1 flex items-center justify-between">
															<span>Key Prerequisites:</span>
															<span class="text-[10px] font-mono text-amber-700 font-bold">{form.requirements.length} Items</span>
														</div>
														<div class="truncate text-slate-700">
															• {form.requirements[0]}
														</div>
													</div>
												{/if}

												<!-- CTA Row in Royal Blue & Amber Yellow (No emoji icons) -->
												<div class="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-100 text-xs">
													<button
														type="button"
														onclick={(e) => {
															e.stopPropagation();
															openFormModal(form);
														}}
														class="inline-flex items-center gap-1 rounded-xl border-2 border-blue-950 bg-white hover:bg-blue-950 hover:text-amber-300 px-3.5 py-2 font-black text-blue-950 transition-all hover:scale-105 active:scale-95 shadow-2xs"
													>
														Review Document
													</button>

													<div class="flex items-center gap-1.5 ml-auto">
														{#if form.htmlUrl}
															<a
																href={form.htmlUrl}
																target="_blank"
																onclick={(e) => e.stopPropagation()}
																class="inline-flex items-center gap-1 rounded-xl border-2 border-amber-500 bg-amber-400 hover:bg-amber-300 text-blue-950 px-2.5 py-2 font-black transition-all hover:scale-105 active:scale-95 shadow-2xs"
																title="Open printable fillable HTML form in browser"
															>
																Print HTML
															</a>
														{/if}

														<a
															href={form.url || form.downloadUrl}
															download
															onclick={(e) => e.stopPropagation()}
															class="inline-flex items-center gap-1 rounded-xl border-2 border-blue-950 bg-blue-950 hover:bg-blue-900 text-amber-300 px-3.5 py-2 font-black shadow-sm transition-all hover:scale-105 active:scale-95"
														>
															Download
														</a>
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>

								<!-- Close Folder Action at Bottom -->
								<div class="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
									<button
										type="button"
										onclick={closeFolderView}
										class="inline-flex items-center gap-2 rounded-2xl border-2 border-amber-400 bg-blue-950 hover:bg-blue-900 px-6 py-3 text-xs font-black text-amber-300 transition-all shadow-md hover:scale-105 active:scale-95"
									>
										<span>← Close {selectedFolder} Folder &amp; Return to All Folders</span>
									</button>

									<div class="text-xs font-bold text-blue-950">
										Viewing {activeFolderItems.length} of {downloadableForms.length} Total Municipal Forms
									</div>
								</div>
							</div>
						{/if}
					{:else}
						<!-- Fallback for offices without categorized folders (No emoji icons) -->
						<div class="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
							{#each downloadableForms as form, fIdx}
								<div
									role="button"
									tabindex="0"
									onclick={() => openFormModal(form)}
									onkeydown={(e) => e.key === 'Enter' && openFormModal(form)}
									id="form-card-{fIdx}"
									class="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border-2 border-blue-900/20 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-2xl"
									title="Click to view {form.title}"
								>
									<div class="h-2 w-full bg-gradient-to-r from-blue-950 via-blue-800 to-amber-400"></div>
									<div class="flex flex-1 flex-col p-6 sm:p-7">
										<div class="mb-4 flex items-center justify-between">
											<span class="rounded-md border border-amber-400 bg-amber-100 px-2.5 py-0.5 font-mono text-[10px] font-black text-blue-950 uppercase">
												{isMENRO ? 'DOC' : 'FORM'} {String(fIdx + 1).padStart(2, '0')}
											</span>
											{#if form.category}
												<span class="rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[9px] font-black text-blue-950 uppercase">
													{form.category}
												</span>
											{/if}
										</div>
										<h3 class="mb-2 text-lg font-black text-blue-950">{form.title}</h3>
										{#if form.description}
											<p class="mb-4 text-xs font-medium text-slate-700">{form.description}</p>
										{/if}
										<div class="mt-auto flex items-center justify-between gap-2 pt-4 border-t border-slate-100">
											<button
												type="button"
												onclick={(e) => {
													e.stopPropagation();
													openFormModal(form);
												}}
												class="inline-flex items-center gap-1 rounded-xl border-2 border-blue-950 bg-white px-3.5 py-2 text-xs font-black text-blue-950 hover:bg-blue-950 hover:text-amber-300 transition-all shadow-2xs"
											>
												Review Document
											</button>
											<a
												href={form.url || form.downloadUrl}
												download
												onclick={(e) => e.stopPropagation()}
												class="inline-flex items-center gap-1 rounded-xl border-2 border-blue-950 bg-blue-950 px-3.5 py-2 text-xs font-black text-amber-300 hover:bg-blue-900 transition-all shadow-2xs"
											>
												Download
											</a>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{/if}

					<!-- Disclaimer note in Royal Blue & Amber Yellow -->
					<div class="mt-12 flex items-start gap-3 rounded-2xl border-2 border-amber-400 bg-amber-50 p-5 shadow-xs">
						<div class="text-xs text-blue-950 leading-relaxed">
							<span class="font-black text-blue-950">Official {isEngineering ? 'Engineering' : isLicensing ? 'Business Permit & Licensing' : officeName} Document Advisory:</span> All downloadable permit forms, schedules, and checklists are official documents of the Local Government Unit of Tanauan, Leyte under the {officeName}. Both PDF downloads and printable browser forms are accepted for official review, evaluation, and processing at the Tanauan Town Hall.
						</div>
					</div>

					<!-- Bottom Collapse Bar -->
					<div class="mt-8 flex justify-center border-t border-slate-200 pt-6">
						<button
							type="button"
							onclick={toggleFormsSection}
							class="inline-flex items-center gap-2 rounded-2xl border-2 border-blue-950 bg-white hover:bg-blue-950 hover:text-amber-300 px-6 py-3 text-xs font-black text-blue-950 transition-all shadow-sm hover:scale-105 active:scale-95"
						>
							<span>Collapse Downloadable Forms Section</span>
							<span class="text-xs font-black">▲</span>
						</button>
					</div>
				{/if}
			</div>
		</section>
	{/snippet}

	{#if !isMAO && !shouldPutFormsAtEnd && downloadableForms && downloadableForms.length > 0}
		{@render formsSection()}
	{/if}

		<!-- Section 2: Core Mandates & Functions -->
		{#if !isMAO && mandates && mandates.length > 0}
			<section id="mandates" class="scroll-mt-44 sm:scroll-mt-52 bg-slate-50 py-20">
			<div class="container mx-auto max-w-7xl px-6">
				<!-- Section Header -->
				<div class="mb-14 max-w-3xl">
					<div
						class="mb-3 inline-block rounded-md border border-blue-300 bg-blue-100 px-3.5 py-1 text-xs font-black tracking-wider text-blue-950 uppercase"
					>
						SECTION {mandatesNavCode || '02'} // {isMENRO ? 'WASTE CLASSIFICATION & SEGREGATION MANDATES' : 'STATUTORY MANDATES'}
					</div>
					<h2
						class="text-3xl leading-tight font-black tracking-tight text-blue-950 sm:text-4xl lg:text-5xl"
					>
						{isMENRO ? 'Waste Segregation & Classification Guidelines' : 'Official Duties & Public Functions'}
					</h2>
					<p class="mt-4 text-base leading-relaxed font-normal text-slate-800 sm:text-lg">
						{#if isMENRO}
							Official waste classification and mandatory at-source sorting guidelines under Republic Act No. 9003 (Ecological Solid Waste Management Act of 2000) and Tanauan Municipal Ordinance No. 2024-20.
						{:else}
							Administered pursuant to Republic Act No. 7160 (Local Government Code of 1991) and
							municipal ordinances. {tagline}
						{/if}
					</p>
				</div>

				<!-- Mandates Grid (Matching exact civic card design with orange top border, badges, and dash items) -->
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each mandates as mandate}
						<div
							class="flex flex-col justify-between rounded-2xl border border-t-4 border-slate-200/80 border-t-amber-500 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
						>
							<div>
								<!-- Header: Index Number & Code Badge -->
								<div class="mb-6 flex items-center justify-between">
									<span class="text-3xl font-black tracking-tight text-amber-500">
										{mandate.index}
									</span>
									<span
										class="rounded border border-blue-200 bg-blue-50/70 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-blue-900 uppercase"
									>
										{mandate.code}
									</span>
								</div>

								<!-- Category Tag -->
								<span class="mb-2 block text-xs font-black tracking-wider text-blue-900 uppercase">
									{mandate.tag}
								</span>

								<!-- Main Function Title -->
								<h3 class="mb-3 text-xl leading-snug font-black text-slate-900">
									{mandate.title}
								</h3>

								<!-- Description -->
								<p class="mb-8 text-sm leading-relaxed font-normal text-slate-600">
									{mandate.description}
								</p>
							</div>

							<!-- Bullet Points with Orange Dash -->
							<div class="space-y-3.5 border-t border-slate-100 pt-6">
								{#each mandate.details as detail}
									<div
										class="flex items-start text-xs leading-snug font-medium text-slate-800 sm:text-sm"
									>
										<span class="mr-2.5 font-bold text-amber-500 select-none">—</span>
										<span>{detail}</span>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>

				<!-- Optional Expandable Full 17 Statutory Duties (Verbatim COA/CSC Enumeration) -->
				{#if dutiesAndResponsibilities}
					<div class="mt-8 flex flex-col items-center">
						<button
							type="button"
							onclick={() => (showFullDuties = !showFullDuties)}
							class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-black tracking-wider text-blue-950 uppercase shadow-2xs transition-all hover:border-blue-900 hover:bg-slate-50"
						>
							<svg
								class="h-4 w-4 text-amber-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							<span
								>{showFullDuties ? 'Hide' : 'View'} Full 17 Statutory Duties & Responsibilities</span
							>
							<span class="text-xs text-slate-400">{showFullDuties ? '▲' : '▼'}</span>
						</button>

						{#if showFullDuties}
							<div
								class="mt-6 w-full rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm transition-all sm:p-8"
							>
								<div class="mb-6 border-b-2 border-slate-100 pb-5">
									<div
										class="inline-flex items-center gap-2 rounded-md border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-black tracking-wider text-blue-950 uppercase"
									>
										<span class="h-2 w-2 rounded-full bg-blue-900"></span>
										STATUTORY ENUMERATION // {officeName}
									</div>
									<h3 class="mt-2 text-2xl font-black text-blue-950">
										Complete 17 Duties and Responsibilities
									</h3>
									<p
										class="mt-2 max-w-4xl rounded-r-xl border-l-4 border-amber-500 bg-amber-50/50 py-1 pl-4 text-sm leading-relaxed font-medium text-slate-700"
									>
										{dutiesAndResponsibilities.preamble}
									</p>
								</div>

								<div class="grid gap-3 sm:grid-cols-2">
									{#each dutiesAndResponsibilities.list as duty, idx}
										<div
											class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5 transition-all hover:border-blue-900 hover:bg-white hover:shadow-xs"
										>
											<span
												class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-950 text-xs font-black text-amber-300 shadow-2xs"
											>
												{idx + 1}
											</span>
											<p class="text-xs leading-snug font-medium text-slate-800">
												{duty}
											</p>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/if}

				<!-- Citizen's Charter Spotlight Callout (Direct Service Access) -->
				{#if department === 'Market' || department === 'Municipal Market Office'}
					<div
						class="relative mt-8 overflow-hidden rounded-3xl border-2 border-amber-400 bg-gradient-to-r from-blue-950 via-blue-900 to-slate-950 p-6 text-white shadow-xl sm:p-8"
					>
						<div
							class="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-amber-400/10 blur-2xl"
						></div>

						<div
							class="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
						>
							<div class="max-w-2xl space-y-2.5">
								<div
									class="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/15 px-3.5 py-1 text-xs font-black tracking-wider text-amber-300 uppercase"
								>
									<span class="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
									Official Citizen's Charter Service
								</div>
								<h3 class="text-xl font-black text-white sm:text-2xl">
									Stall / Space Verification (For Business Permit Issuance)
								</h3>
								<p class="text-xs leading-relaxed text-blue-200 sm:text-sm">
									Official G2B municipal service for market stallholders and commercial lessees
									verifying stall occupancy, rental receipts, and space compliance.
								</p>
								<div class="flex flex-wrap items-center gap-3 pt-1 text-xs">
									<span
										class="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-white"
									>
										Classification: <strong class="text-amber-300">Simple</strong>
									</span>
									<span
										class="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-white"
									>
										Processing: <strong class="text-emerald-400">31 minutes</strong>
									</span>
									<span
										class="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-white"
									>
										Fee: <strong class="text-amber-300">None (Free)</strong>
									</span>
								</div>
							</div>

							<div class="flex shrink-0 flex-col gap-3 sm:flex-row">
								<a
									href="/citizens-charter/market"
									class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-xs font-black tracking-wider text-blue-950 uppercase shadow-md transition-all hover:scale-102 hover:bg-amber-300 active:scale-98"
								>
									<span>View Citizen's Charter ↗</span>
								</a>
							</div>
						</div>
					</div>
				{/if}

				<!-- Citizen's Charter Spotlight Callout (GSO) -->
				{#if department === 'GSO' || department === 'General Services Office'}
					<div
						class="relative mt-8 overflow-hidden rounded-3xl border-2 border-amber-400 bg-gradient-to-r from-blue-950 via-blue-900 to-slate-950 p-6 text-white shadow-xl sm:p-8"
					>
						<div
							class="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-amber-400/10 blur-2xl"
						></div>

						<div
							class="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
						>
							<div class="max-w-2xl space-y-2.5">
								<div
									class="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/15 px-3.5 py-1 text-xs font-black tracking-wider text-amber-300 uppercase"
								>
									<span class="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
									Official Citizen's Charter Frontline Services
								</div>
								<h3 class="text-xl font-black text-white sm:text-2xl">
									Borrowing of Equipment & Venue Scheduling Requests
								</h3>
								<p class="text-xs leading-relaxed text-blue-200 sm:text-sm">
									Official citizen frontline guidelines for borrowing tents, chairs, sound systems,
									and scheduling municipal venues (Tanauan Amphitheater, Municipal Lobby, Tanauan
									Civic Center).
								</p>
								<div class="flex flex-wrap items-center gap-3 pt-1 text-xs">
									<span
										class="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-white"
									>
										Service 1: <strong class="text-amber-300">Borrowing Equipment</strong>
									</span>
									<span
										class="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-white"
									>
										Service 2: <strong class="text-emerald-400">Venue Reservation</strong>
									</span>
									<span
										class="rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-white"
									>
										Availability: <strong class="text-amber-300">Mon - Fri (8AM - 5PM)</strong>
									</span>
								</div>
							</div>

							<div class="flex shrink-0 flex-col gap-3 sm:flex-row">
								<a
									href="/citizens-charter/gso"
									class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-xs font-black tracking-wider text-blue-950 uppercase shadow-md transition-all hover:scale-102 hover:bg-amber-300 active:scale-98"
								>
									<span>View Citizen's Charter ↗</span>
								</a>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</section>
		{/if}

		<!-- Section 3: Leadership & Executive Profile -->
		<section id="leadership" class="scroll-mt-44 sm:scroll-mt-52 bg-white py-20">
			<div class="container mx-auto max-w-7xl px-6">
				<div class="mb-12 max-w-3xl">
					<div
						class="mb-3 inline-block rounded-md border border-amber-300 bg-amber-100 px-3.5 py-1 text-xs font-black tracking-wider text-amber-950 uppercase"
					>
						SECTION {leadershipNavCode} // EXECUTIVE LEADERSHIP
					</div>
					<h2
						class="text-3xl leading-tight font-black tracking-tight text-blue-950 sm:text-4xl lg:text-5xl"
					>
						Department Head Profile & Citizen Desk
					</h2>
				</div>

				<div class="grid items-stretch gap-8 lg:grid-cols-12">
					<!-- Official Leadership Profile Card -->
					<div
						class="flex flex-col justify-between rounded-3xl border-2 border-slate-200 bg-slate-50 p-8 shadow-md sm:p-10 lg:col-span-7"
					>
						<div>
							<div
								class="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6"
							>
								<div class="flex items-center gap-4 sm:gap-5">
									{#if head.image}
										<img
											src={head.image}
											alt={head.name}
											class="h-20 w-20 shrink-0 rounded-2xl border-2 border-amber-400 bg-slate-900 object-cover shadow-md sm:h-24 sm:w-24"
										/>
									{/if}
									<div>
										<span
											class="mb-2 inline-block rounded border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-black tracking-wide text-blue-950 uppercase"
										>
											{head.term}
										</span>
										<h3 class="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
											{head.name}
										</h3>
										<p class="mt-0.5 text-lg font-black text-blue-900">
											{head.title}
										</p>
									</div>
								</div>
								<div class="text-right text-xs">
									<div class="font-bold text-slate-500 uppercase">CIVIL SERVICE STATUS</div>
									<div class="text-sm font-black {isMENRO ? 'text-amber-600' : 'text-emerald-700'}">Regular Appointed Official</div>
								</div>
							</div>

							<!-- Executive Quote in Gold Border Box -->
							<div
								class="mb-6 rounded-2xl border border-l-4 border-amber-500 border-slate-200 bg-white p-6 shadow-sm"
							>
								<p class="font-serif text-base leading-relaxed text-slate-900 italic sm:text-lg">
									"{head.quote}"
								</p>
								<div class="mt-3 font-sans text-sm font-bold text-blue-950">
									— {head.name}, <span class="font-normal text-slate-700">{head.title}</span>
								</div>
							</div>

							<!-- Professional Competencies -->
							<div class="space-y-2">
								<span class="block text-xs font-black tracking-wider text-slate-800 uppercase">
									OFFICIAL COMPETENCIES & CERTIFICATIONS:
								</span>
								<div class="flex flex-wrap gap-2">
									{#each head.credentials as cred}
										<span
											class="rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-950"
										>
											{cred}
										</span>
									{/each}
								</div>
							</div>
						</div>

						<!-- Location & Schedule in Clear Details -->
						<div class="mt-8 grid gap-4 border-t border-slate-200 pt-6 text-sm sm:grid-cols-2">
							<div>
								<span class="block text-xs font-bold text-slate-500 uppercase">OFFICE LOCATION</span
								>
								<span class="font-bold text-slate-950">{head.room}</span>
							</div>
							<div>
								<span class="block text-xs font-bold text-slate-500 uppercase"
									>SCHEDULE FOR PUBLIC CONSULTATION</span
								>
								<span class="font-bold text-blue-950">{head.schedule}</span>
							</div>
						</div>
					</div>

					<!-- Operating Protocol & Citizen Desk Guide (Anti-Red Tape Authority Standard) -->
					<div
						class="flex flex-col justify-between rounded-3xl border-2 border-amber-400 bg-blue-950 p-8 text-white shadow-xl lg:col-span-5"
					>
						<div>
							<div class="mb-6 flex items-center justify-between border-b border-blue-800 pb-4">
								<span class="text-xs font-black tracking-wider text-amber-400 uppercase">
									PUBLIC SERVICE ASSISTANCE
								</span>
								<span class="text-xs font-black {isMENRO ? 'text-amber-400' : 'text-emerald-300'}">OPEN TO PUBLIC</span>
							</div>

							<h4 class="mb-3 text-2xl leading-snug font-black text-white">
								Citizen Service Guidelines
							</h4>
							<p class="mb-6 text-base leading-relaxed font-normal text-blue-100">
								In accordance with Republic Act 11032 (Ease of Doing Business and Efficient
								Government Service Delivery Act), all frontline services remain open and accessible
								to the public.
							</p>

							<div class="space-y-3.5 text-sm">
								<div class="rounded-xl border border-blue-700 bg-blue-900 p-4">
									<div class="mb-0.5 text-xs font-bold text-amber-400 uppercase">SERVICE HOURS</div>
									<div class="text-base font-bold text-white">{schedule.hours}</div>
								</div>
								{#if schedule.helpline}
									<div class="rounded-xl border border-blue-700 bg-blue-900 p-4">
										<div class="mb-0.5 text-xs font-bold text-amber-400 uppercase">
											SERVICE WINDOWS
										</div>
										<div class="text-base font-bold text-white">{schedule.helpline}</div>
										<div class="mt-1 text-xs text-blue-200">{schedule.location}</div>
									</div>
								{/if}
								{#if schedule.contactNumber || schedule.email || isMDRRMO}
									<div class="rounded-xl border border-blue-700 bg-blue-900 p-4">
										<div class="mb-1 text-xs font-bold text-amber-400 uppercase">
											{isMDRRMO ? '24/7 EMERGENCY DISPATCH HOTLINES' : 'CONTACT & INQUIRIES'}
										</div>
										{#if isMDRRMO}
											<div class="mt-2.5 space-y-2">
												<!-- Globe -->
												<a
													href="tel:09161977360"
													class="flex items-center justify-between rounded-lg bg-blue-950/80 p-2.5 border border-blue-800 hover:border-amber-400 transition"
												>
													<div class="flex items-center gap-2">
														<span class="rounded bg-blue-600 px-2 py-0.5 text-[10px] font-black text-white">GLOBE</span>
														<span class="font-mono text-sm sm:text-base font-bold text-white">0916-197-7360</span>
													</div>
													<span class="text-xs font-bold text-amber-300">Call Now 📞</span>
												</a>
												<!-- Smart -->
												<a
													href="tel:09317393333"
													class="flex items-center justify-between rounded-lg bg-blue-950/80 p-2.5 border border-blue-800 hover:border-emerald-400 transition"
												>
													<div class="flex items-center gap-2">
														<span class="rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-black text-white">SMART</span>
														<span class="font-mono text-sm sm:text-base font-bold text-white">0931-739-3333</span>
													</div>
													<span class="text-xs font-bold text-emerald-300">Call Now 📱</span>
												</a>
												<!-- VHF Base Radio -->
												<div class="flex items-center justify-between rounded-lg bg-amber-500/10 p-2.5 border border-amber-400/40">
													<div class="flex items-center gap-2">
														<span class="rounded bg-amber-500 px-2 py-0.5 text-[10px] font-black text-slate-950">BASE RADIO</span>
														<span class="font-mono text-sm sm:text-base font-black text-amber-300">167.600 MHz</span>
													</div>
													<span class="text-xs font-bold text-amber-200">📡 VHF EOC</span>
												</div>
												<!-- Facebook Page -->
												<a
													href="https://www.facebook.com/search/top?q=MDRRMO-TANAUAN%20LEYTE"
													target="_blank"
													rel="noopener noreferrer"
													class="flex items-center justify-between rounded-lg bg-blue-800/40 p-2.5 border border-blue-600/40 hover:bg-blue-800/70 transition"
												>
													<div class="flex items-center gap-2">
														<span class="rounded bg-blue-500 px-2 py-0.5 text-[10px] font-black text-white">FACEBOOK</span>
														<span class="text-xs sm:text-sm font-bold text-blue-100">MDRRMO-TANAUAN LEYTE</span>
													</div>
													<span class="text-xs font-bold text-blue-300">Open Page ↗</span>
												</a>
												{#if schedule.email}
													<div class="pt-1 text-center font-mono text-xs text-blue-200">
														Email: {schedule.email}
													</div>
												{/if}
											</div>
										{:else}
											{#if schedule.contactNumber}<div
													class="font-mono text-base font-bold text-white"
												>
													{schedule.contactNumber}
												</div>{/if}
											{#if schedule.email}<div class="mt-0.5 font-mono text-xs text-blue-200">
													{schedule.email}
												</div>{/if}
										{/if}
									</div>
								{/if}
							</div>
						</div>

						<div
							class="mt-6 flex items-center justify-between border-t border-blue-800 pt-4 text-xs font-semibold text-blue-200"
						>
							<span>Priority lanes at Window 1 for Seniors & PWDs.</span>
							<a
								href={citizensCharterUrl}
								class="font-bold text-amber-300 underline hover:text-white"
							>
								Charter Details →
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Section 4: Organizational Structure (Executive Governance Matrix & Blueprint Viewer) -->
		<section
			id="structure"
			class="scroll-mt-44 sm:scroll-mt-52 relative overflow-hidden border-b-2 border-slate-200 bg-slate-50 py-20"
		>
			<!-- Subtle Civic Grid Background -->
			<div
				class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25"
			></div>

			<div class="relative z-10 container mx-auto max-w-7xl px-6">
				<!-- Section Header -->
				<div
					class="mb-10 flex flex-col justify-between gap-6 border-b-2 border-slate-200 pb-6 md:flex-row md:items-end"
				>
					<div class="max-w-3xl">
						<div
							class="mb-3 inline-flex items-center gap-2 rounded-md border border-blue-300 bg-blue-100 px-3.5 py-1 text-xs font-black tracking-wider text-blue-950 uppercase"
						>
							<span class="h-2 w-2 rounded-full bg-blue-900"></span>
							SECTION {structureNavCode} // EXECUTIVE GOVERNANCE & HIERARCHY
						</div>
						<h2 class="text-3xl leading-tight font-black tracking-tight text-blue-950 sm:text-4xl">
							Organizational Structure
						</h2>
						<p class="mt-2.5 text-base leading-relaxed font-normal text-slate-800">
							Official supervisory line of authority, statutory division assignments, and Civil
							Service Commission-ratified organizational hierarchy for the {officeName}.
						</p>
					</div>

					<!-- Executive Quick Facts Pill -->
					<div class="flex shrink-0 flex-wrap items-center gap-3">
						<div
							class="rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-left shadow-sm"
						>
							<div class="text-[10px] font-black tracking-wider text-slate-500 uppercase">
								APPOINTING AUTHORITY
							</div>
							<div class="text-xs font-black text-blue-950">Municipal Mayor / CSC</div>
						</div>
						<div
							class="rounded-xl border border-amber-500 bg-amber-400 px-4 py-2 text-left shadow-sm"
						>
							<div class="text-[10px] font-black tracking-wider text-blue-950/75 uppercase">
								CIVIC STATUS
							</div>
							<div class="text-xs font-black text-blue-950">Active Roster 2025</div>
						</div>
					</div>
				</div>

				<!-- Executive Governance Overview Deck -->
				<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<div
						class="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-900"
					>
						<div class="mb-1 text-xs font-black tracking-wide text-amber-600 uppercase">
							01 // EXECUTIVE HEAD
						</div>
						<div class="text-base font-black text-blue-950">{head.name}</div>
						<div class="mt-0.5 text-xs font-semibold text-slate-600">{head.title}</div>
					</div>
					{#if mandates[1]}
						<div
							class="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-900"
						>
							<div class="mb-1 text-xs font-black tracking-wide text-blue-900 uppercase">
								02 // {mandates[1].code || 'FUNCTION'}
							</div>
							<div class="text-base font-black text-blue-950">{mandates[1].title}</div>
							<div class="mt-0.5 text-xs font-semibold text-slate-600">{mandates[1].tag}</div>
						</div>
					{/if}
					{#if mandates[2]}
						<div
							class="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-900"
						>
							<div class="mb-1 text-xs font-black tracking-wide text-blue-900 uppercase">
								03 // {mandates[2].code || 'FUNCTION'}
							</div>
							<div class="text-base font-black text-blue-950">{mandates[2].title}</div>
							<div class="mt-0.5 text-xs font-semibold text-slate-600">{mandates[2].tag}</div>
						</div>
					{/if}
					<div
						class="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-900"
					>
						<div class="mb-1 text-xs font-black tracking-wide {isMENRO ? 'text-amber-600' : 'text-emerald-700'} uppercase">
							04 // STATUTORY BASIS
						</div>
						<div class="text-base font-black text-blue-950">COA & CSC Compliant</div>
						<div class="mt-0.5 text-xs font-semibold text-slate-600">
							Local Government Code of 1991
						</div>
					</div>
				</div>

				<!-- Interactive Blueprint Canvas Frame -->
				<div class="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm sm:p-8">
					<OrgChartSection {department} defaultImage={orgChartImage} cleanLayout={true} />
				</div>
			</div>
		</section>

		<!-- Section 5: Accomplishment Reports (Audited Fiscal Performance) -->
		{#if showAccomplishments}
			<section id="accomplishments" class="scroll-mt-44 sm:scroll-mt-52 relative border-b-2 border-slate-200 bg-white py-20">
				<div class="container mx-auto max-w-7xl px-6">
					<div class="mb-10 max-w-3xl border-b-2 border-slate-200 pb-6">
						<div
							class="mb-3 inline-flex items-center gap-2 rounded-md border border-amber-300 bg-amber-100 px-3.5 py-1 text-xs font-black tracking-wider text-amber-950 uppercase"
						>
							<span class="h-2 w-2 rounded-full bg-amber-600"></span>
							SECTION {accomplishmentsNavCode} // {isCivilRegistrar ? 'CIVIL REGISTRY MILESTONES & SPECIAL PROJECTS' : isMDRRMO ? 'DISASTER PREPAREDNESS & DRILL OPERATIONS' : isMENRO ? 'SOLID WASTE MANAGEMENT & DIVERSION SCORECARD' : isHealthOffice ? 'PUBLIC HEALTH OUTREACH & CLINICAL CARAVAN' : 'FISCAL PERFORMANCE & SCORECARDS'}
						</div>
						<h2 class="text-3xl leading-tight font-black tracking-tight text-blue-950 sm:text-4xl">
							{isMDRRMO ? 'Field Operations & Accomplishments' : isMENRO ? 'Solid Waste Management & Accomplishments' : isCivilRegistrar ? 'Department Accomplishments' : isHealthOffice ? 'Public Health Accomplishments & Outreach' : 'Accomplishment Reports'}
						</h2>
						<p class="mt-2.5 text-base leading-relaxed font-normal text-slate-800">
							{#if isCivilRegistrar}
								Official public service milestones, community outreach records, and flagship civil registration projects of the Municipal Civil Registrar of Tanauan.
							{:else if isMDRRMO}
								Official disaster preparedness operations, community resilience milestones, and simultaneous earthquake drills led by the Municipal Disaster Risk Reduction & Management Office.
							{:else if isMENRO}
								Official ecological solid waste management updates, waste diversion performance benchmarks, and statutory accomplishments under RA 9003 and Municipal Ordinance No. 2024-20.
							{:else if isHealthOffice}
								Official public health outreach missions, community TB Active Case Finding (ACF), mobile chest X-ray caravans, and primary healthcare achievements of the Municipal Health Office of Tanauan.
							{:else}
								Official performance scorecards, program accomplishments, and transparency disclosures
								of the {officeName} submitted to the Sangguniang Bayan of Tanauan.
							{/if}
						</p>
					</div>

					<div class="rounded-3xl border-2 border-slate-50 p-6 shadow-sm sm:p-8">
						<AccomplishmentSection {department} limit={3} collapsible={true} cleanLayout={true} />
					</div>
				</div>
			</section>
		{/if}

		<!-- Designed Section Updates: renders <section id="updates"> only when the
		     admin-designed sections exist AND have approved posts (renders nothing otherwise) -->
		<DepartmentSectionsFeed {department} />

		<!-- Section: Awards & Citations (Provincial & Regional Honors) -->
		{#if shouldShowAwards}
			<section id="awards" class="relative border-b-2 border-slate-200 bg-slate-50 py-20">
				<div class="container mx-auto max-w-7xl px-6">
					<div class="mb-10 max-w-3xl border-b-2 border-slate-200 pb-6">
						<div
							class="mb-3 inline-flex items-center gap-2 rounded-md border border-amber-300 bg-amber-100 px-3.5 py-1 text-xs font-black tracking-wider text-amber-950 uppercase"
						>
							<span class="h-2 w-2 rounded-full bg-amber-600"></span>
							SECTION {awardsNavCode} // HONORS, CITATIONS & AWARDS
						</div>
						<h2 class="text-3xl leading-tight font-black tracking-tight text-blue-950 sm:text-4xl">
							Awards & Achievements
						</h2>
						<p class="mt-2.5 text-base leading-relaxed font-normal text-slate-800">
							{#if isCivilRegistrar}
								Official Philippine Statistics Authority (PSA) provincial citations recognizing outstanding performance, civil registration excellence, and the Birth Registration Assistance Project (BRAP).
							{:else}
								Provincial and regional citations recognizing outstanding business permitting,
								year-on-year local revenue growth, and sound fiscal administration.
							{/if}
						</p>
					</div>

					<div class="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
						<AwardsSection {department} limit={3} collapsible={true} cleanLayout={true} />
					</div>
				</div>
			</section>
		{/if}

		<!-- Section: Department Personnel (Official Staff Registry) -->
		{#if shouldShowPersonnel}
			<section id="personnel" class="bg-white py-20">
				<div class="container mx-auto max-w-7xl px-6">
					<div class="mb-10 max-w-3xl border-b-2 border-slate-200 pb-6">
						<div
							class="mb-3 inline-flex items-center gap-2 rounded-md border border-blue-300 bg-blue-100 px-3.5 py-1 text-xs font-black tracking-wider text-blue-950 uppercase"
						>
							<span class="h-2 w-2 rounded-full bg-blue-900"></span>
							SECTION // PUBLIC SERVANTS REGISTRY
						</div>
						<h2 class="text-3xl leading-tight font-black tracking-tight text-blue-950 sm:text-4xl">
							Department Personnel
						</h2>
						<p class="mt-2.5 text-base leading-relaxed font-normal text-slate-800">
							Meet the dedicated public servants of the {officeName} committed to delivering quality services
							to the people of Tanauan.
						</p>
					</div>

					<div class="rounded-3xl border-2 border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
						<PersonnelSection {department} limit={3} collapsible={true} cleanLayout={true} />
					</div>
				</div>
			</section>
		{/if}

		{#if !isMAO && shouldPutFormsAtEnd && downloadableForms && downloadableForms.length > 0}
			{@render formsSection()}
		{/if}
	</main>

	<!-- Executive Civic Footer -->
	<footer
		class="border-t-4 border-amber-400 bg-gradient-to-b from-blue-950 to-slate-950 pt-16 pb-12 text-white"
	>
		<div class="container mx-auto max-w-7xl px-6">
			<div class="grid grid-cols-1 gap-10 border-b border-blue-900/60 pb-12 md:grid-cols-12">
				<!-- Municipal Seal and Office Identity -->
				<div class="space-y-4 md:col-span-5">
					<div class="flex items-center gap-4">
						<img
							src="/tanauan logo.svg"
							alt="Seal of Tanauan, Leyte"
							class="h-14 w-14 rounded-full border-2 border-amber-400 bg-white p-1 shadow-md"
						/>
						<div>
							<div class="text-lg leading-tight font-black tracking-tight text-white">
								{officeName}
							</div>
							<div class="text-xs font-bold tracking-wider text-amber-400 uppercase">
								{municipality}
							</div>
						</div>
					</div>
					<p class="max-w-md text-xs leading-relaxed text-slate-300">
						{tagline}
					</p>
					<div class="flex items-center gap-2 pt-2">
						<span
							class="inline-block rounded bg-blue-900 px-2.5 py-1 font-mono text-xs font-black text-amber-300"
						>
							LGU CODE: 083747
						</span>
						<span
							class="inline-block rounded bg-blue-900/80 px-2.5 py-1 font-mono text-xs font-black text-white"
						>
							OFFICE CODE: {officeCode}
						</span>
					</div>
				</div>

				<!-- Frontline Civic Services Directory -->
				<div class="space-y-3 md:col-span-4">
					<div class="mb-2 text-xs font-black tracking-wider text-amber-400 uppercase">
						KEY MANDATES
					</div>
					<ul class="space-y-2 text-xs font-medium text-slate-300">
						{#each mandates.slice(0, 3) as mandate}
							<li class="flex items-center gap-2">
								<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"></span>
								<span>{mandate.title}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Quick Transparency Links -->
				<div class="space-y-3 md:col-span-3">
					<div class="mb-2 text-xs font-black tracking-wider text-amber-400 uppercase">
						CITIZEN COMPLIANCE
					</div>
					<ul class="space-y-2 text-xs font-semibold">
						<li>
							<a
								href={citizensCharterUrl}
								class="flex items-center gap-1.5 text-white transition-colors hover:text-amber-300"
							>
								<span>Citizen's Charter Handbook →</span>
							</a>
						</li>
						<li>
							<a
								href="/Tax and Fees"
								class="flex items-center gap-1.5 text-slate-300 transition-colors hover:text-amber-300"
							>
								<span>Schedule of Taxes & Fees →</span>
							</a>
						</li>
						<li>
							<a
								href="/Contact"
								class="flex items-center gap-1.5 text-slate-300 transition-colors hover:text-amber-300"
							>
								<span>Municipal Directory & Helpdesk →</span>
							</a>
						</li>
					</ul>
				</div>
			</div>

			<!-- Bottom Copyright & Anti-Red Tape Authority Notice -->
			<div
				class="flex flex-col items-center justify-between gap-4 pt-8 text-xs font-semibold text-slate-400 sm:flex-row"
			>
				<div>© 2025 Local Government Unit of Tanauan, Leyte. All rights reserved.</div>
				<div class="flex items-center gap-2 font-bold text-amber-300">
					<span class="h-2 w-2 rounded-full {isMENRO ? 'bg-amber-400' : 'bg-emerald-400'}"></span>
					<span>ARTA Republic Act No. 11032 Compliant</span>
				</div>
			</div>
		</div>
	</footer>

	<!-- ========================================================================= -->
	<!-- DOWNLOADABLE FORM DETAIL & PREVIEW MODAL                                  -->
	<!-- ========================================================================= -->
	{#if activeFormModal}
		{@const fileUrl = activeFormModal.url || activeFormModal.downloadUrl}
		{@const previewImg = activeFormModal.preview || activeFormModal.image || (fileUrl && fileUrl.match(/\.(png|jpg|jpeg|webp)$/i) ? fileUrl : null)}
		{@const isPdf = Boolean(fileUrl && fileUrl.match(/\.pdf$/i))}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6"
			role="dialog"
			aria-modal="true"
			aria-labelledby="form-modal-title"
			tabindex="-1"
			onkeydown={(e) => e.key === 'Escape' && closeFormModal()}
		>
			<!-- Backdrop -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="absolute inset-0 bg-blue-950/80 backdrop-blur-md"
				onclick={closeFormModal}
				transition:fade={{ duration: 200 }}
			></div>

			<!-- Modal Panel -->
			<div
				class="relative z-10 flex flex-col w-full max-w-4xl lg:max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-2xl"
				transition:scale={{ duration: 250, start: 0.94 }}
			>
				<!-- Coloured top bar -->
				<div class="h-2 w-full bg-gradient-to-r from-blue-900 via-amber-500 to-blue-700 shrink-0"></div>

				<!-- Modal Header -->
				<div class="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 shrink-0">
					<div class="flex items-center gap-3 min-w-0">
						<div class="min-w-0">
							<div class="flex flex-wrap items-center gap-2">
								<span class="text-[10px] font-black uppercase tracking-wider text-blue-700">Official {officeCode || 'Government'} Document</span>
								{#if activeFormModal.category}
									<span
										class="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider {activeFormModal.category === 'Building Permit'
											? 'border border-blue-900 bg-blue-100 text-blue-950'
											: activeFormModal.category === 'Fencing Permit'
												? 'border border-amber-400 bg-amber-100 text-amber-950'
												: activeFormModal.category === 'Occupancy Permit'
													? 'border-2 border-amber-400 bg-blue-950 text-amber-300'
													: activeFormModal.category === 'Downloadable Checklist'
														? 'border-2 border-amber-400 bg-amber-400 text-blue-950'
														: activeFormModal.category === 'Burial Permit'
															? 'border-2 border-amber-400 bg-blue-950 text-amber-300'
															: activeFormModal.category === 'Project Implementation Form'
																? 'border-2 border-amber-400 bg-blue-950 text-amber-300'
																: activeFormModal.category === 'Business Permits'
																	? 'border-2 border-amber-400 bg-blue-950 text-amber-300'
																	: activeFormModal.category === 'Public Transport'
																		? 'border-2 border-blue-900 bg-amber-400 text-blue-950'
																		: activeFormModal.category === 'Checklists'
																			? 'border-2 border-amber-400 bg-amber-400 text-blue-950'
																			: 'border border-blue-200 bg-blue-50 text-blue-900'}"
									>
										{activeFormModal.category}
									</span>
								{/if}
								{#if activeFormModal.fileSize}
									<span class="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700">
										{activeFormModal.fileSize}
									</span>
								{/if}
								{#if activeFormModal.type}
									<span class="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-900 uppercase">
										{activeFormModal.type}
									</span>
								{/if}
							</div>
							<h2 id="form-modal-title" class="truncate text-lg sm:text-xl font-black text-blue-950">{activeFormModal.title}</h2>
						</div>
					</div>
					<div class="flex items-center gap-2 shrink-0">
						{#if fileUrl}
							<a
								href={fileUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-900 hover:bg-blue-100 transition"
								title="Open in new window"
							>
								<span>Full Window ↗</span>
							</a>
						{/if}
						<button
							type="button"
							onclick={closeFormModal}
							class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-base font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-950"
							aria-label="Close">✕</button
						>
					</div>
				</div>

				<!-- Modal Body (Scrollable document inspection view) -->
				<div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/60">
					<!-- Inspection Mode Banner (Royal Blue & Amber Yellow) -->
					<div class="flex items-center justify-between rounded-2xl border-2 border-amber-400 bg-amber-50 p-3.5 text-xs">
						<div class="flex items-center gap-2.5 text-blue-950 font-bold">
							<span><strong>Document Inspection Mode:</strong> You can review the complete file preview and instructions below to decide whether to download.</span>
						</div>
						{#if fileUrl}
							<a
								href={fileUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="shrink-0 text-blue-950 font-black underline hover:text-amber-700 ml-2"
							>
								Open Full Document ↗
							</a>
						{/if}
					</div>

					<!-- Document Preview Stage (Large & Clear) -->
					{#if previewImg}
						<div class="rounded-2xl border-2 border-amber-400/40 bg-white p-3 sm:p-5 shadow-sm">
							<div class="mb-3 flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
								<span class="font-bold text-blue-950">
									Document High-Resolution Preview
								</span>
								{#if isPdf}
									<span class="font-mono text-[11px] text-amber-700 font-bold">PDF Guide • Ready for Download</span>
								{/if}
							</div>
							<div class="max-h-[540px] overflow-y-auto rounded-xl border border-slate-200 bg-slate-100/50 p-2 text-center">
								<img
									src={previewImg}
									alt={activeFormModal.title}
									class="mx-auto h-auto max-h-[750px] w-auto max-w-full rounded-lg shadow-sm border border-slate-200 bg-white object-contain"
								/>
							</div>
						</div>
					{:else if isPdf}
						<div class="rounded-2xl border-2 border-amber-400/40 bg-white p-3 sm:p-5 shadow-sm">
							<div class="mb-3 flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
								<span class="font-black text-blue-950">Official PDF Document Preview</span>
								<a href={fileUrl} target="_blank" rel="noopener noreferrer" class="font-black text-blue-950 hover:text-amber-700 underline">
									Open in New Tab ↗
								</a>
							</div>
							<div class="h-[520px] rounded-xl border border-blue-900/20 overflow-hidden bg-slate-100">
								<iframe
									src="{fileUrl}#toolbar=1"
									title="{activeFormModal.title} Preview"
									class="w-full h-full bg-white"
								></iframe>
							</div>
						</div>
					{/if}

					<!-- Description & Requirements Drawer -->
					<div class="grid gap-4 md:grid-cols-2">
						<!-- Description -->
						{#if activeFormModal.description}
							<div class="rounded-2xl border-2 border-blue-900/15 bg-white p-5 shadow-2xs">
								<div class="text-[10px] font-black uppercase tracking-wider text-amber-700 mb-2">Form Description &amp; Purpose</div>
								<p class="text-xs sm:text-sm leading-relaxed font-normal text-slate-800">
									{activeFormModal.description}
								</p>
							</div>
						{/if}

						<!-- Requirements or Official Guidelines -->
						<div class="rounded-2xl border-2 border-blue-900/15 bg-white p-5 shadow-2xs">
							<div class="text-[10px] font-black uppercase tracking-wider text-amber-700 mb-2">
								{activeFormModal.requirements?.length ? 'Prerequisites & Checklist' : 'Official Guidelines'}
							</div>
							{#if activeFormModal.requirements && activeFormModal.requirements.length > 0}
								<ul class="space-y-2 text-xs text-blue-950 font-medium">
									{#each activeFormModal.requirements as req}
										<li class="flex items-start gap-2">
											<span class="text-amber-500 font-bold">•</span>
											<span>{req}</span>
										</li>
									{/each}
								</ul>
							{:else}
								<p class="text-xs text-slate-600 leading-relaxed">
									Verify all entries before submitting. Ensure accurate applicant details and complete required agency attachments.
								</p>
							{/if}
						</div>
					</div>

					<!-- Office & Format Details in Royal Blue & Amber Yellow -->
					<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
						<div class="rounded-xl border border-blue-900/20 bg-white p-3">
							<div class="text-[10px] font-black uppercase tracking-wider text-amber-700">Department</div>
							<div class="font-black text-blue-950 truncate">{officeCode || department}</div>
						</div>
						<div class="rounded-xl border border-blue-900/20 bg-white p-3">
							<div class="text-[10px] font-black uppercase tracking-wider text-amber-700">Format</div>
							<div class="font-bold text-blue-950 truncate">{activeFormModal.format || 'Official PDF'}</div>
						</div>
						<div class="rounded-xl border border-blue-900/20 bg-white p-3">
							<div class="text-[10px] font-black uppercase tracking-wider text-amber-700">File Size</div>
							<div class="font-bold text-blue-950 truncate">{activeFormModal.fileSize || 'Standard PDF'}</div>
						</div>
						<div class="rounded-xl border border-blue-900/20 bg-white p-3">
							<div class="text-[10px] font-black uppercase tracking-wider text-amber-700">Availability</div>
							<div class="font-black text-amber-600 truncate">Immediate Access</div>
						</div>
					</div>
				</div>

				<!-- Modal Footer (Decision Bar: Download vs Close) -->
				<div class="flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-amber-400/40 bg-white px-6 py-4 shrink-0 shadow-sm">
					<div class="flex items-center gap-2 text-xs text-blue-950">
						<span class="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-900 border border-amber-400 text-xs font-bold">•</span>
						<span>Review complete. Decide whether to download or exit:</span>
					</div>
					<div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
						<button
							type="button"
							onclick={closeFormModal}
							class="w-full sm:w-auto rounded-xl border-2 border-blue-950 bg-white hover:bg-blue-50 px-4 py-2.5 text-xs font-black text-blue-950 transition"
						>
							Close / Exit
						</button>
						{#if activeFormModal.htmlUrl}
							<a
								href={activeFormModal.htmlUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-amber-500 bg-amber-400 hover:bg-amber-300 text-blue-950 px-4 py-2.5 text-xs font-black shadow-xs transition hover:scale-105 active:scale-95"
							>
								<span>Fill &amp; Print HTML ↗</span>
							</a>
						{:else if fileUrl}
							<a
								href={fileUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-amber-400 bg-amber-400 hover:bg-amber-300 text-blue-950 px-4 py-2.5 text-xs font-black shadow-xs transition hover:scale-105 active:scale-95"
							>
								<span>Print / Open Full Document ↗</span>
							</a>
						{/if}
						{#if fileUrl}
							<a
								href={fileUrl}
								target="_blank"
								download
								rel="noopener noreferrer"
								class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-blue-950 bg-blue-950 hover:bg-blue-900 text-amber-300 px-5 py-2.5 text-xs font-black shadow-md transition hover:scale-105 active:scale-95"
							>
								<span>Download PDF {activeFormModal.fileSize ? `(${activeFormModal.fileSize})` : ''}</span>
							</a>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- ========================================================================= -->
	<!-- FLOATING WINDOW MODAL (Vision, Mission, Service Offered & Procedures)     -->
	<!-- ========================================================================= -->
	{#if activeFloatingModal}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-md sm:p-6"
			transition:fade={{ duration: 200 }}
			role="dialog"
			aria-modal="true"
			aria-labelledby="floating-window-title"
			tabindex="-1"
			onclick={(e) => {
				if (e.target === e.currentTarget) closeModal();
			}}
			onkeydown={(e) => e.key === 'Escape' && closeModal()}
		>
			<div
				class="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-2xl ring-1 ring-black/10"
				in:scale={{ start: 0.93, duration: 250 }}
				out:scale={{ start: 0.95, duration: 160 }}
			>
				<!-- Window Title Bar / Chrome -->
				<div
					class="flex shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900 px-5 py-4 text-white select-none sm:px-6"
				>
					<div class="flex items-center gap-3">
						<!-- Window action dots (macOS style) -->
						<div class="flex items-center gap-1.5">
							<button
								type="button"
								onclick={closeModal}
								class="h-3 w-3 rounded-full bg-rose-500 transition-colors hover:bg-rose-600 focus:outline-none"
								title="Close Window"
								aria-label="Close Window"
							></button>
							<span class="h-3 w-3 rounded-full bg-amber-500 opacity-80"></span>
							<span class="h-3 w-3 rounded-full bg-emerald-500 opacity-80"></span>
						</div>
						<div class="h-4 w-px bg-slate-700"></div>
						<div class="flex items-center gap-2">
							<span class="text-xs font-black tracking-wider text-amber-400 uppercase">
								{officeCode || 'LGU'}
							</span>
							<span class="max-w-[200px] truncate text-xs font-medium text-slate-300 sm:max-w-xs">
								{officeName}
							</span>
						</div>
					</div>

					<div class="flex items-center gap-2">
						<span
							class="hidden rounded border border-slate-700 bg-slate-800/90 px-2 py-0.5 text-[11px] font-semibold text-slate-400 sm:inline-block"
						>
							ESC to close
						</span>
						<button
							type="button"
							onclick={closeModal}
							class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-rose-600 hover:text-white focus:outline-none"
							aria-label="Close floating window"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2.5"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>

				<!-- Window Scrollable Body -->
				<div class="space-y-6 overflow-y-auto p-6 sm:p-8">
					{#if activeFloatingModal === 'vision'}
						<!-- ONLY VISION CONTENT -->
						<div class="space-y-6">
							<div class="flex flex-wrap items-center justify-between gap-2">
								<span
									class="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-black tracking-wide text-amber-900 uppercase"
								>
									<span class="h-2 w-2 animate-pulse rounded-full bg-amber-500"></span>
									Long-Term Institutional Aspiration
								</span>
								<span class="text-xs font-bold text-slate-500">{municipality}</span>
							</div>

							<div>
								<span class="text-xs font-black tracking-wider text-amber-700 uppercase">
									Official Mandate
								</span>
								<h2
									id="floating-window-title"
									class="text-3xl font-black tracking-tight text-blue-950 sm:text-4xl"
								>
									OUR VISION
								</h2>
							</div>

							<!-- Highlighted Vision Statement -->
							<div
								class="relative overflow-hidden rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/90 via-white to-amber-50/50 p-6 shadow-sm sm:p-8"
							>
								<div
									class="pointer-events-none absolute -right-3 -bottom-5 font-serif text-8xl text-amber-200/50 select-none"
								>
									”
								</div>
								<p
									class="relative z-10 text-lg leading-relaxed font-bold text-slate-900 sm:text-xl"
								>
									"{vision}"
								</p>
							</div>

							<!-- Pillars / Core Focus of Vision -->
							<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5">
								<div class="mb-3 text-xs font-black tracking-wider text-slate-600 uppercase">
									Core Operational Focus
								</div>
								<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
									<div class="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
										<div class="mb-1 text-xs font-black text-amber-600 uppercase">
											01 • Efficiency
										</div>
										<p class="text-xs font-semibold text-slate-700">
											Effective, efficient & sustainable program delivery
										</p>
									</div>
									<div class="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
										<div class="mb-1 text-xs font-black text-blue-900 uppercase">
											02 • Responsiveness
										</div>
										<p class="text-xs font-semibold text-slate-700">
											Competent manpower responsive to public needs
										</p>
									</div>
									<div class="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
										<div class="mb-1 text-xs font-black text-emerald-600 uppercase">
											03 • Alignment
										</div>
										<p class="text-xs font-semibold text-slate-700">
											Fully aligned with Tanauan Municipal vision
										</p>
									</div>
								</div>
							</div>

							{#if mission}
								<div class="flex items-center justify-between border-t border-slate-100 pt-2">
									<span class="text-xs font-medium text-slate-500"
										>Need to check our mission statement?</span
									>
									<button
										type="button"
										onclick={() => openModal('mission')}
										class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 underline hover:text-blue-700"
									>
										<span>Switch to Mission Window →</span>
									</button>
								</div>
							{/if}
						</div>
					{:else if activeFloatingModal === 'mission'}
						<!-- ONLY MISSION CONTENT -->
						<div class="space-y-6">
							<div class="flex flex-wrap items-center justify-between gap-2">
								<span
									class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-black tracking-wide text-blue-900 uppercase"
								>
									<span class="h-2 w-2 animate-pulse rounded-full bg-blue-700"></span>
									Official Commitment & Scope
								</span>
								<span class="text-xs font-bold text-slate-500">{municipality}</span>
							</div>

							<div>
								<span class="text-xs font-black tracking-wider text-blue-900 uppercase">
									Public Service Mandate
								</span>
								<h2
									id="floating-window-title"
									class="text-3xl font-black tracking-tight text-blue-950 sm:text-4xl"
								>
									OUR MISSION
								</h2>
							</div>

							<!-- Highlighted Mission Statement -->
							<div
								class="relative overflow-hidden rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/90 via-white to-blue-50/50 p-6 shadow-sm sm:p-8"
							>
								<div
									class="pointer-events-none absolute -right-3 -bottom-5 font-serif text-8xl text-blue-200/50 select-none"
								>
									”
								</div>
								<p
									class="relative z-10 text-base leading-relaxed font-semibold text-slate-900 sm:text-lg"
								>
									"{mission}"
								</p>
							</div>

							<!-- Operational Scope Pillars -->
							<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5">
								<div class="mb-3 text-xs font-black tracking-wider text-slate-600 uppercase">
									Key Departmental Responsibilities
								</div>
								<div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
									<div
										class="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-800"
									>
										<span class="h-2 w-2 shrink-0 rounded-full bg-blue-600"></span>
										<span>Supply and Property Management</span>
									</div>
									<div
										class="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-800"
									>
										<span class="h-2 w-2 shrink-0 rounded-full bg-blue-600"></span>
										<span>Maintenance of Buildings & Grounds</span>
									</div>
									<div
										class="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-800"
									>
										<span class="h-2 w-2 shrink-0 rounded-full bg-blue-600"></span>
										<span>Electrical, Plumbing & IT Electronics</span>
									</div>
									<div
										class="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-800"
									>
										<span class="h-2 w-2 shrink-0 rounded-full bg-blue-600"></span>
										<span>Light Vehicles & Heavy Equipment Support</span>
									</div>
								</div>
							</div>

							{#if vision}
								<div class="flex items-center justify-between border-t border-slate-100 pt-2">
									<span class="text-xs font-medium text-slate-500"
										>Need to check our vision statement?</span
									>
									<button
										type="button"
										onclick={() => openModal('vision')}
										class="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 underline hover:text-amber-900"
									>
										<span>Switch to Vision Window →</span>
									</button>
								</div>
							{/if}
						</div>
					{:else if typeof activeFloatingModal === 'object' && activeFloatingModal !== null}
						<!-- ONLY CLICKED SERVICE OFFERED & PROCEDURE -->
						<div class="space-y-6">
							<!-- Header Badge -->
							<div class="flex flex-wrap items-center justify-between gap-2">
								<span
									class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100/80 px-3.5 py-1 text-xs font-black tracking-wide text-blue-950 uppercase"
								>
									<span class="h-2 w-2 rounded-full bg-amber-500"></span>
									{activeFloatingModal.badge ||
										`Service Offered ${activeFloatingModal.serviceNumber}`}
								</span>
								<span
									class="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"
								>
									✓ Frontline Public Service
								</span>
							</div>

							<!-- Title & Description -->
							<div>
								<span class="text-xs font-black tracking-wider text-blue-900 uppercase">
									Public Citizen Service
								</span>
								<h2
									id="floating-window-title"
									class="text-2xl font-black tracking-tight text-blue-950 sm:text-3xl"
								>
									{activeFloatingModal.title}
								</h2>
								{#if activeFloatingModal.description}
									<p class="mt-2 text-sm leading-relaxed font-medium text-slate-700 sm:text-base">
										{activeFloatingModal.description}
									</p>
								{/if}
							</div>

							<!-- Available Equipment or Venues -->
							{#if activeFloatingModal.equipmentList}
								<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
									<div class="mb-2 text-xs font-black tracking-wider text-slate-600 uppercase">
										Available Items for Borrowing:
									</div>
									<div class="flex flex-wrap gap-2">
										{#each activeFloatingModal.equipmentList as item}
											<span
												class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-blue-950 shadow-2xs"
											>
												<span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
												{item}
											</span>
										{/each}
									</div>
								</div>
							{:else if activeFloatingModal.venueList}
								<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
									<div class="mb-2 text-xs font-black tracking-wider text-slate-600 uppercase">
										Covered Municipal Venues:
									</div>
									<div class="flex flex-wrap gap-2">
										{#each activeFloatingModal.venueList as venue}
											<span
												class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-blue-950 shadow-2xs"
											>
												<span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
												🏛 {venue}
											</span>
										{/each}
									</div>
								</div>
							{/if}

							<!-- Downloadable Form Banner in Modal -->
							{#if activeFloatingModal.downloadableFormUrl}
								<div
									class="rounded-3xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/70 p-5 shadow-sm"
								>
									<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
										<div class="flex items-start gap-3.5">
											<div
												class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm"
											>
												<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
													/>
												</svg>
											</div>
											<div>
												<div class="mb-1 flex items-center gap-2">
													<span
														class="inline-block rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black tracking-wider text-emerald-900 uppercase"
													>
														Official Downloadable Form
													</span>
													<span class="text-xs font-bold text-slate-500">Google Drive Document</span
													>
												</div>
												<h4 class="text-base font-black text-slate-900">
													{activeFloatingModal.downloadableFormTitle || 'Borrower & Return Form'}
												</h4>
												<p class="mt-0.5 text-xs font-medium text-slate-600">
													{activeFloatingModal.downloadableFormDescription ||
														'Official printable slip for equipment borrowing and return clearance.'}
												</p>
											</div>
										</div>

										<a
											href={activeFloatingModal.downloadableFormUrl}
											target="_blank"
											rel="noopener noreferrer"
											class="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-black text-white shadow-md transition-all hover:scale-105 hover:bg-emerald-700 active:scale-95"
										>
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
												/>
											</svg>
											<span>Download Form ↗</span>
										</a>
									</div>
								</div>
							{/if}

							<!-- Procedure Steps -->
							{#if activeFloatingModal.steps && activeFloatingModal.steps.length > 0}
								<div class="space-y-3">
									<div class="flex items-center justify-between">
										<h3 class="text-xs font-black tracking-wider text-blue-950 uppercase">
											Step-by-Step Procedure:
										</h3>
										<span class="text-xs font-bold text-slate-500">
											{activeFloatingModal.steps.length} Steps to Complete
										</span>
									</div>

									<ol class="space-y-2.5">
										{#each activeFloatingModal.steps as step, idx}
											<li
												class="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs transition-colors hover:border-blue-900"
											>
												<span
													class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-xs font-black text-amber-300"
												>
													{idx + 1}
												</span>
												<div class="pt-1 text-sm leading-snug font-semibold text-slate-900">
													{step}
												</div>
											</li>
										{/each}
									</ol>
								</div>
							{/if}

							<!-- Damage Liability Note -->
							{#if activeFloatingModal.note}
								<div
									class="flex items-start gap-3 rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-4 text-xs font-bold text-amber-950"
								>
									<div>
										<div class="mb-0.5 font-black tracking-wider text-amber-900 uppercase">
											Borrower Liability & Damage Policy
										</div>
										<p class="leading-relaxed">{activeFloatingModal.note}</p>
									</div>
								</div>
							{/if}

							<!-- Signatories & Reviewers Info -->
							{#if preparedBy || reviewedBy}
								<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
									<div class="mb-3 text-[11px] font-black tracking-wider text-slate-500 uppercase">
										Responsible Office Personnel & Focal Staff
									</div>
									<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
										{#if preparedBy}
											<div class="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
												<div class="text-[10px] font-bold text-slate-400 uppercase">
													Prepared by:
												</div>
												<div class="text-sm font-black text-blue-950">{preparedBy.name}</div>
												<div class="text-xs font-semibold text-amber-600">{preparedBy.title}</div>
											</div>
										{/if}
										{#if reviewedBy}
											<div class="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
												<div class="text-[10px] font-bold text-slate-400 uppercase">
													Reviewed by:
												</div>
												<div class="text-sm font-black text-blue-950">{reviewedBy.name}</div>
												<div class="text-xs font-semibold text-amber-600">{reviewedBy.title}</div>
											</div>
										{/if}
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>

				<!-- Window Bottom Footer -->
				<div
					class="flex shrink-0 flex-col items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row"
				>
					<div class="flex items-center gap-2 text-xs font-bold text-slate-600">
						<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
						<span>ARTA Republic Act No. 11032 Compliant</span>
					</div>

					<div class="flex w-full items-center justify-end gap-2.5 sm:w-auto">
						{#if typeof activeFloatingModal === 'object' && activeFloatingModal !== null && activeFloatingModal.downloadableFormUrl}
							<a
								href={activeFloatingModal.downloadableFormUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-600 bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-900 transition-colors hover:bg-emerald-100"
							>
								<span>Download Form ↗</span>
							</a>
						{/if}
						{#if typeof activeFloatingModal === 'object' && activeFloatingModal !== null && citizensCharterUrl}
							<a
								href={citizensCharterUrl}
								class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-blue-950 bg-white px-4 py-2 text-xs font-black text-blue-950 transition-colors hover:bg-blue-50"
							>
								<span>Full Charter →</span>
							</a>
						{/if}
						<button
							type="button"
							onclick={closeModal}
							class="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-950 px-5 py-2 text-xs font-black text-white shadow-sm transition-all hover:bg-blue-900 active:scale-95"
						>
							<span>Close Window ✕</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	:global(body.modal-open) header.fixed,
	:global(body:has([aria-modal='true'])) header.fixed,
	:global(body:has([role='dialog'])) header.fixed {
		display: none !important;
		opacity: 0 !important;
		pointer-events: none !important;
		visibility: hidden !important;
	}
</style>
