<script>
	import { onMount } from 'svelte';
	import OfficeHeroCanvas from '$lib/Components/Offices/OfficeHeroCanvas.svelte';
	import TypewriterText from '$lib/Components/Offices/TypewriterText.svelte';
	import AwardsSection from '$lib/AwardsSection.svelte';
	import PersonnelSection from '$lib/PersonnelSection.svelte';
	import AccomplishmentSection from '$lib/AccomplishmentSection.svelte';
	import OrgChartSection from '$lib/OrgChartSection.svelte';

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
		heroTitlePrefix = '',
		heroTitleHighlight = '',
		heroTitleSuffix = '',
		headRoleSubtitle = '',
		serviceWindowsTitle = 'FRONTLINE CITIZEN SERVICES:',
		frontlineServices = null,
		guidelinesTitle = 'Citizen Service Guidelines',
		guidelinesText = 'In accordance with Republic Act 11032 (Ease of Doing Business and Efficient Government Service Delivery Act), frontline service windows remain open without noon breaks.',
		guidelinesServiceLabel = 'SERVICE WINDOWS',
		guidelinesFooterNote = 'Priority lanes at Window 1 for Seniors & PWDs.',
		structureDivisions = null,
		footerServices = null,
		personnelSummary = '',
		customOrgChart = null,
		onDivisionClick = null,
		downloadableForms = null,
		downloadableFormsTitle = 'Downloadable Public Service Forms',
		downloadableFormsSubtitle = 'Official printable application forms, checklist requirements, and regulatory documents provided for expedited onsite processing.',
		customSection7 = null,
		customAccomplishments = null,
		showAwards = true
	} = $props();

	let scrollY = $state(0);
	let activeSection = $state('overview');

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

	const navSections = $derived.by(() => {
		const items = [
			{ id: 'overview', label: 'Overview', code: '01' },
			{ id: 'mandates', label: 'Mandates', code: '02' },
			{ id: 'leadership', label: 'Leadership', code: '03' },
			{ id: 'structure', label: 'Structure', code: '04' },
			{ id: 'accomplishments', label: 'Reports', code: '05' }
		];
		if (showAwards) {
			items.push({ id: 'awards', label: 'Recognition', code: `0${items.length + 1}` });
		}
		items.push({
			id: 'personnel',
			label: (downloadableForms || customSection7) ? 'Downloads' : 'Personnel',
			code: `0${items.length + 1}`
		});
		return items;
	});

	function scrollTo(id) {
		const target = document.getElementById(id);
		if (target) {
			const offset = 80;
			const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({ top: targetPosition, behavior: 'smooth' });
			activeSection = id;
		}
	}

	onMount(() => {
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

<svelte:window bind:scrollY />

<svelte:head>
	<title>{officeName} | {municipality}</title>
	<meta name="description" content="{officeName} - {tagline}" />
</svelte:head>

<!-- 100% LIGHT, HIGH-CONTRAST, SENIOR-FRIENDLY CIVIC DESIGN (Blue & Yellow Palette) -->
<div
	class="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-amber-300 selection:text-blue-950"
>
	<!-- Fixed Floating Clean Pill Navigation -->
	<header
		class="fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 {scrollY > 260
			? 'translate-y-0 opacity-100'
			: 'pointer-events-none -translate-y-4 opacity-0'}"
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
		class="relative overflow-hidden border-b-4 border-amber-400 bg-gradient-to-b from-blue-50/80 via-slate-50 to-white pt-16 pb-16 lg:pt-24 lg:pb-20"
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
					<span class="h-2.5 w-2.5 rounded-full bg-emerald-600"></span>
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
						<h1 class="text-4xl leading-tight font-black tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
							{#if heroTitlePrefix || heroTitleHighlight || heroTitleSuffix}
								{heroTitlePrefix} <span class="text-amber-600">{heroTitleHighlight}</span> {heroTitleSuffix}
							{:else}
								{officeName}
							{/if}
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
							<span class="text-sm font-black text-emerald-700">Open & Accessible</span>
							{#if schedule.helpline}<span
									class="mt-0.5 block text-[11px] font-medium text-slate-600"
									>{schedule.helpline}</span
								>{/if}
						</div>
					</div>
				</div>

				<!-- Right Column: Official Municipal Identity Plaque with Purposeful 3D Perspective Hover Tilt -->
				<div class="flex items-center justify-center lg:col-span-5">
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
										{head.name ? head.name : officeName}
									</h3>
									<span class="text-xs font-semibold text-slate-600">
										{head.title || headRoleSubtitle || category}
									</span>
								</div>
							</div>

							<!-- Frontline Citizen Services Quick Links -->
							<div class="mb-6 space-y-2.5">
								<span
									class="block text-[11px] font-extrabold tracking-wider text-slate-500 uppercase"
								>
									{serviceWindowsTitle}
								</span>

								{#if frontlineServices && frontlineServices.length > 0}
									{#each frontlineServices as service}
										<a
											href={service.url || citizensCharterUrl}
											class="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 transition-all hover:border-amber-400 hover:bg-amber-50/70"
										>
											<div>
												<div class="text-xs font-black text-blue-950 group-hover:text-blue-900">{service.title}</div>
												<div class="text-[11px] text-slate-600">{service.desc}</div>
											</div>
											<span class="font-mono text-xs font-bold text-amber-700">{service.window || service.room || "VIEW"}</span>
										</a>
									{/each}
								{:else}
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
								{/if}
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
		<!-- Section 2: Core Mandates & Functions -->
		<section id="mandates" class="bg-slate-50 py-20">
			<div class="container mx-auto max-w-7xl px-6">
				<!-- Section Header -->
				<div class="mb-14 max-w-3xl">
					<div
						class="mb-3 inline-block rounded-md border border-blue-300 bg-blue-100 px-3.5 py-1 text-xs font-black tracking-wider text-blue-950 uppercase"
					>
						SECTION 02 // STATUTORY MANDATES
					</div>
					<h2
						class="text-3xl leading-tight font-black tracking-tight text-blue-950 sm:text-4xl lg:text-5xl"
					>
						Official Duties & Public Functions
					</h2>
					<p class="mt-4 text-base leading-relaxed font-normal text-slate-800 sm:text-lg">
						Administered pursuant to Republic Act No. 7160 (Local Government Code of 1991) and
						municipal ordinances. {tagline}
					</p>
				</div>

				<!-- Mandates Grid (Clean White Cards, Gold Top Borders, Large Clear Text, Zero AI Icons) -->
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each mandates as mandate}
						<div
							class="flex flex-col justify-between rounded-2xl border-x border-t-4 border-b border-slate-200 border-t-amber-500 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
						>
							<div>
								<!-- Header: Clean Civic Numbering (No AI Icons) -->
								<div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
									<span class="font-mono text-3xl font-black text-amber-600">
										{mandate.index}
									</span>
									<span
										class="rounded border border-blue-200 bg-blue-50 px-2.5 py-1 font-mono text-xs font-bold text-blue-950"
									>
										{mandate.code}
									</span>
								</div>

								<span
									class="mb-1 inline-block text-xs font-black tracking-wider text-blue-900 uppercase"
								>
									{mandate.tag}
								</span>
								<h3 class="mb-3 text-xl leading-snug font-black text-slate-950">
									{mandate.title}
								</h3>
								<p class="mb-6 text-base leading-relaxed font-normal text-slate-800">
									{mandate.description}
								</p>
							</div>

							<!-- Bullet Points with Bold Dash -->
							<div class="space-y-2 border-t border-slate-100 pt-4">
								{#each mandate.details as detail}
									<div class="flex items-start gap-2.5 text-sm font-medium text-slate-900">
										<span class="leading-none font-bold text-amber-600 select-none">—</span>
										<span class="leading-tight">{detail}</span>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Section 3: Leadership & Executive Profile -->
		<section id="leadership" class="bg-white py-20">
			<div class="container mx-auto max-w-7xl px-6">
				<div class="mb-12 max-w-3xl">
					<div
						class="mb-3 inline-block rounded-md border border-amber-300 bg-amber-100 px-3.5 py-1 text-xs font-black tracking-wider text-amber-950 uppercase"
					>
						SECTION 03 // EXECUTIVE LEADERSHIP
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
								<div class="text-right text-xs">
									<div class="font-bold text-slate-500 uppercase">CIVIL SERVICE STATUS</div>
									<div class="text-sm font-black text-emerald-700">Regular Appointed Official</div>
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
								<span class="text-xs font-black text-emerald-300">OPEN TO PUBLIC</span>
							</div>

							<h4 class="mb-3 text-2xl leading-snug font-black text-white">
								{guidelinesTitle || 'Citizen Service Guidelines'}
							</h4>
							<p class="mb-6 text-base leading-relaxed font-normal text-blue-100">
								{guidelinesText || 'In accordance with Republic Act 11032 (Ease of Doing Business and Efficient Government Service Delivery Act), all frontline services remain open and accessible to the public.'}
							</p>

							<div class="space-y-3.5 text-sm">
								<div class="rounded-xl border border-blue-700 bg-blue-900 p-4">
									<div class="mb-0.5 text-xs font-bold text-amber-400 uppercase">SERVICE HOURS</div>
									<div class="text-base font-bold text-white">{schedule.hours}</div>
								</div>
								{#if schedule.helpline}
									<div class="rounded-xl border border-blue-700 bg-blue-900 p-4">
										<div class="mb-0.5 text-xs font-bold text-amber-400 uppercase">
											{guidelinesServiceLabel || 'SERVICE WINDOWS'}
										</div>
										<div class="text-base font-bold text-white">{schedule.helpline}</div>
										{#if schedule.location}<div class="mt-1 text-xs text-blue-200">{schedule.location}</div>{/if}
									</div>
								{/if}
								{#if schedule.contactNumber || schedule.email}
									<div class="rounded-xl border border-blue-700 bg-blue-900 p-4">
										<div class="mb-0.5 text-xs font-bold text-amber-400 uppercase">
											CONTACT & INQUIRIES
										</div>
										{#if schedule.contactNumber}<div
												class="font-mono text-base font-bold text-white"
											>
												{schedule.contactNumber}
											</div>{/if}
										{#if schedule.email}<div class="mt-0.5 font-mono text-xs text-blue-200">
												{schedule.email}
											</div>{/if}
									</div>
								{/if}
							</div>
						</div>

						<div
							class="mt-6 flex items-center justify-between border-t border-blue-800 pt-4 text-xs font-semibold text-blue-200"
						>
							<span>{guidelinesFooterNote || 'Priority lanes at Window 1 for Seniors & PWDs.'}</span>
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
			class="relative overflow-hidden border-b-2 border-slate-200 bg-slate-50 py-20"
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
							SECTION 04 // EXECUTIVE GOVERNANCE & HIERARCHY
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
				{#if structureDivisions && structureDivisions.length > 0}
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
						{#each structureDivisions as division, idx}
							<button
								type="button"
								onclick={() => {
									if (division.onClick) division.onClick();
									else if (onDivisionClick) onDivisionClick(division, idx);
								}}
								class="p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-sm hover:border-blue-900 transition-all text-left group {(division.onClick || onDivisionClick) ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : ''}"
							>
								<div class="flex items-center justify-between">
									<div class="text-xs font-black {idx === 0 ? 'text-amber-600' : idx === 3 ? 'text-emerald-700' : 'text-blue-900'} uppercase tracking-wide mb-1">
										{division.code}
									</div>
									{#if division.onClick || onDivisionClick}
										<span class="text-[10px] font-bold text-amber-600 group-hover:text-blue-900 transition-colors uppercase">View Roster ↗</span>
									{/if}
								</div>
								<div class="font-black text-base text-blue-950 group-hover:text-blue-900 transition-colors">
									{idx === 0 && division.title === "Executive Leadership" && head.name ? head.name : division.title}
								</div>
								<div class="text-xs text-slate-600 font-semibold mt-0.5">
									{idx === 0 && division.title === "Executive Leadership" && head.title ? head.title : division.subtitle}
								</div>
							</button>
						{/each}
					</div>
				{:else}
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
						{#if mandates && mandates[1]}
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
						{#if mandates && mandates[2]}
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
							<div class="mb-1 text-xs font-black tracking-wide text-emerald-700 uppercase">
								04 // STATUTORY BASIS
							</div>
							<div class="text-base font-black text-blue-950">COA & CSC Compliant</div>
							<div class="mt-0.5 text-xs font-semibold text-slate-600">
								Local Government Code of 1991
							</div>
						</div>
					</div>
				{/if}

				<!-- Interactive Blueprint Canvas Frame -->
				<div class="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm sm:p-8">
					{#if customOrgChart}
						{@render customOrgChart()}
					{:else}
						<OrgChartSection {department} cleanLayout={true} />
					{/if}
				</div>
			</div>
		</section>

		<!-- Section 5: Accomplishment Reports (Audited Fiscal Performance) -->
		<section id="accomplishments" class="relative border-b-2 border-slate-200 bg-white py-20">
			<div class="container mx-auto max-w-7xl px-6">
				<div class="mb-10 max-w-3xl border-b-2 border-slate-200 pb-6">
					<div
						class="mb-3 inline-flex items-center gap-2 rounded-md border border-amber-300 bg-amber-100 px-3.5 py-1 text-xs font-black tracking-wider text-amber-950 uppercase"
					>
						<span class="h-2 w-2 rounded-full bg-amber-600"></span>
						SECTION 05 // FISCAL PERFORMANCE & SCORECARDS
					</div>
					<h2 class="text-3xl leading-tight font-black tracking-tight text-blue-950 sm:text-4xl">
						Accomplishment Reports
					</h2>
					<p class="mt-2.5 text-base leading-relaxed font-normal text-slate-800">
						Official performance scorecards, program accomplishments, and transparency disclosures
						of the {officeName} submitted to the Sangguniang Bayan of Tanauan.
					</p>
				</div>

				<div class="rounded-3xl border-2 border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
					{#if customAccomplishments}
						{@render customAccomplishments()}
					{:else}
						<AccomplishmentSection {department} limit={3} collapsible={true} cleanLayout={true} />
					{/if}
				</div>
			</div>
		</section>

		<!-- Section 6: Awards & Citations (Provincial & Regional Honors) -->
		{#if showAwards}
			<section id="awards" class="relative border-b-2 border-slate-200 bg-slate-50 py-20">
				<div class="container mx-auto max-w-7xl px-6">
					<div class="mb-10 max-w-3xl border-b-2 border-slate-200 pb-6">
						<div
							class="mb-3 inline-flex items-center gap-2 rounded-md border border-amber-300 bg-amber-100 px-3.5 py-1 text-xs font-black tracking-wider text-amber-950 uppercase"
						>
							<span class="h-2 w-2 rounded-full bg-amber-600"></span>
							SECTION 06 // HONORS, CITATIONS & AWARDS
						</div>
						<h2 class="text-3xl leading-tight font-black tracking-tight text-blue-950 sm:text-4xl">
							Awards & Achievements
						</h2>
						<p class="mt-2.5 text-base leading-relaxed font-normal text-slate-800">
							Provincial and regional citations recognizing outstanding public service, governance, and institutional honors.
						</p>
					</div>

					<div class="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
						<AwardsSection {department} limit={3} collapsible={true} cleanLayout={true} />
					</div>
				</div>
			</section>
		{/if}

		<!-- Section 7: Department Personnel OR Downloadable Forms -->
		<section id="personnel" class="py-20 bg-white">
			<div class="container mx-auto px-6 max-w-7xl">
				{#if customSection7}
					{@render customSection7()}
				{:else if downloadableForms}
					<div class="max-w-3xl mb-10 pb-6 border-b-2 border-slate-200">
						<div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-amber-100 text-amber-950 font-black text-xs uppercase tracking-wider mb-3 border border-amber-300">
							<span class="w-2 h-2 rounded-full bg-amber-600"></span>
							SECTION {showAwards ? '07' : '06'} // OFFICIAL FORMS & DOWNLOADABLE CITIZEN DOCUMENTS
						</div>
						<h2 class="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight leading-tight">
							{downloadableFormsTitle}
						</h2>
						<p class="mt-2.5 text-base text-slate-800 leading-relaxed font-normal">
							{downloadableFormsSubtitle}
						</p>
					</div>

					<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each downloadableForms as form, fIdx}
							<div class="group relative flex flex-col justify-between rounded-3xl border-2 border-slate-200 bg-slate-50 p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-2xl hover:bg-white overflow-hidden">
								<!-- Top Accent Line -->
								<div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-900 via-amber-400 to-blue-900 opacity-80 group-hover:opacity-100 transition-opacity"></div>

								<div>
									<!-- Header Meta -->
									<div class="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
										<div class="flex items-center gap-2">
											<span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
											<span class="text-[11px] font-mono font-black tracking-wider text-blue-950 uppercase">
												FORM // 0{fIdx + 1}
											</span>
										</div>
										<span class="text-xs font-black text-blue-950 bg-amber-300/80 px-2.5 py-0.5 rounded-md border border-amber-400 font-mono">
											{form.badge || 'PDF'}
										</span>
									</div>

									<!-- Document Preview Tile -->
									<div class="mb-5 rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 p-6 text-white text-center flex flex-col items-center justify-center relative overflow-hidden shadow-inner group-hover:from-blue-900 group-hover:to-blue-950 transition-colors">
										<div class="w-16 h-16 rounded-2xl bg-white/10 border-2 border-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-blue-950 transition-all text-amber-300 font-black">
											<svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
												<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
											</svg>
										</div>
										<span class="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest block">
											Official Government Record
										</span>
										<span class="text-[11px] text-blue-200 mt-0.5">
											{form.fileSize || 'Standard PDF Document'}
										</span>
									</div>

									<!-- Document Title & Details -->
									<h3 class="text-lg font-black text-blue-950 tracking-tight leading-snug group-hover:text-blue-800 transition-colors">
										{form.title}
									</h3>
									<p class="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
										{form.description}
									</p>

									{#if form.requirements && form.requirements.length > 0}
										<div class="mt-4 pt-3 border-t border-slate-200">
											<span class="text-[11px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">
												Applicable Clinic Service:
											</span>
											<span class="inline-block text-xs font-bold text-blue-950 bg-white border border-slate-300 rounded-lg px-2.5 py-1 shadow-2xs">
												{form.service || 'General Healthcare'}
											</span>
										</div>
									{/if}
								</div>

								<!-- Action Button Group -->
								<div class="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch gap-2.5">
									<a
										href={form.fileUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-blue-950 border-2 border-slate-300 hover:border-blue-950 font-black text-xs uppercase tracking-wider transition-all shadow-2xs"
									>
										<span>Preview ↗</span>
									</a>
									<a
										href={form.fileUrl}
										download
										class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-amber-300 hover:text-white font-black text-xs uppercase tracking-wider transition-all shadow-md hover:scale-102 active:scale-98"
									>
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
										</svg>
										<span>Download</span>
									</a>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="max-w-3xl mb-10 pb-6 border-b-2 border-slate-200">
						<div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-blue-100 text-blue-950 font-black text-xs uppercase tracking-wider mb-3 border border-blue-300">
							<span class="w-2 h-2 rounded-full bg-blue-900"></span>
							SECTION 07 // PUBLIC SERVANTS REGISTRY
						</div>
						<h2 class="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight leading-tight">
							Department Personnel
						</h2>
						<p class="mt-2.5 text-base text-slate-800 leading-relaxed font-normal">
							{personnelSummary || "Meet the certified public servants, officers, and administrative staff dedicated to serving the municipality of Tanauan."}
						</p>
					</div>

					<div class="rounded-3xl bg-slate-50 border-2 border-slate-200 p-6 sm:p-8 shadow-sm">
						<PersonnelSection {department} limit={3} collapsible={true} cleanLayout={true} />
					</div>
				{/if}
			</div>
		</section>
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
						{footerServices && footerServices.length > 0 ? 'FRONTLINE SERVICE WINDOWS' : 'KEY MANDATES'}
					</div>
					<ul class="space-y-2 text-xs font-medium text-slate-300">
						{#if footerServices && footerServices.length > 0}
							{#each footerServices as item}
								<li class="flex items-center gap-2">
									<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"></span>
									<span>{item}</span>
								</li>
							{/each}
						{:else if mandates && mandates.length > 0}
							{#each mandates.slice(0, 3) as mandate}
								<li class="flex items-center gap-2">
									<span class="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400"></span>
									<span>{mandate.title}</span>
								</li>
							{/each}
						{/if}
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
					<span class="h-2 w-2 rounded-full bg-emerald-400"></span>
					<span>ARTA Republic Act No. 11032 Compliant</span>
				</div>
			</div>
		</div>
	</footer>
</div>
