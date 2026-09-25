<script>
	import { onMount } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';
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
		orgChartImage = '',
		dutiesAndResponsibilities = null,
		vision = '',
		mission = '',
		servicesOffered = [],
		preparedBy = null,
		reviewedBy = null
	} = $props();

	let scrollY = $state(0);
	let activeSection = $state('overview');
	let showFullDuties = $state(false);

	// Floating Modal Window State: null | 'vision' | 'mission' | service object
	let activeFloatingModal = $state(null);

	function openModal(item) {
		activeFloatingModal = item;
	}

	function closeModal() {
		activeFloatingModal = null;
	}

	function handleKeydown(e) {
		if (e.key === 'Escape' && activeFloatingModal) {
			closeModal();
		}
	}

	$effect(() => {
		if (typeof document !== 'undefined') {
			if (activeFloatingModal) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		}
		return () => {
			if (typeof document !== 'undefined') {
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

	const baseNav = $derived([
		{ id: 'overview', label: 'Overview' },
		...(vision || mission ? [{ id: 'vision-mission', label: 'Vision & Mission' }] : []),
		...(servicesOffered && servicesOffered.length > 0 ? [{ id: 'services', label: 'Services' }] : []),
		{ id: 'mandates', label: 'Mandates' },
		{ id: 'leadership', label: 'Leadership' },
		{ id: 'structure', label: 'Structure' },
		{ id: 'accomplishments', label: 'Reports' },
		{ id: 'awards', label: 'Recognition' },
		{ id: 'personnel', label: 'Personnel' }
	]);

	const navSections = $derived(
		baseNav.map((s, idx) => ({
			...s,
			code: String(idx + 1).padStart(2, '0')
		}))
	);

	function scrollTo(id) {
		const target = document.getElementById(id);
		if (target) {
			const offset = 80;
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
							Official institutional mandate and long-term vision. Click on either statement to inspect in an expanded floating window.
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
								class="group flex flex-col justify-between rounded-3xl border-2 border-slate-200 border-t-4 border-t-amber-500 bg-white p-7 sm:p-9 shadow-sm transition-all duration-300 hover:border-amber-400 hover:shadow-xl hover:-translate-y-1 cursor-pointer text-left"
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
												<h3 class="text-2xl font-black tracking-tight text-blue-950 group-hover:text-blue-900 transition-colors">
													OUR VISION
												</h3>
											</div>
										</div>

										<span
											class="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-black text-amber-900 transition-all group-hover:bg-amber-400 group-hover:text-blue-950 shadow-2xs"
										>
											<span>🗗 Floating Window</span>
											<span>↗</span>
										</span>
									</div>

									<div class="rounded-2xl border-l-4 border-amber-500 bg-amber-50/50 p-5 shadow-2xs group-hover:bg-amber-50/80 transition-colors">
										<p class="text-base font-semibold leading-relaxed text-slate-900 sm:text-lg">
											"{vision}"
										</p>
									</div>
								</div>

								<div class="mt-8 border-t border-slate-100 pt-6 flex items-center justify-between">
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
										onclick={(e) => { e.stopPropagation(); openModal('vision'); }}
										class="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-blue-950 font-black text-xs px-3.5 py-2 shadow-xs transition-all hover:scale-105 active:scale-95"
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
								class="group flex flex-col justify-between rounded-3xl border-2 border-slate-200 border-t-4 border-t-blue-900 bg-white p-7 sm:p-9 shadow-sm transition-all duration-300 hover:border-blue-900 hover:shadow-xl hover:-translate-y-1 cursor-pointer text-left"
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
												<h3 class="text-2xl font-black tracking-tight text-blue-950 group-hover:text-blue-900 transition-colors">
													OUR MISSION
												</h3>
											</div>
										</div>

										<span
											class="inline-flex items-center gap-1.5 rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-black text-blue-950 transition-all group-hover:bg-blue-900 group-hover:text-white shadow-2xs"
										>
											<span>🗗 Floating Window</span>
											<span>↗</span>
										</span>
									</div>

									<div class="rounded-2xl border-l-4 border-blue-900 bg-slate-50 p-5 shadow-2xs group-hover:bg-blue-50/40 transition-colors">
										<p class="text-sm font-medium leading-relaxed text-slate-800 sm:text-base line-clamp-4">
											{mission}
										</p>
									</div>
								</div>

								<div class="mt-8 border-t border-slate-100 pt-6 flex items-center justify-between">
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
										onclick={(e) => { e.stopPropagation(); openModal('mission'); }}
										class="inline-flex items-center gap-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-black text-xs px-3.5 py-2 shadow-xs transition-all hover:scale-105 active:scale-95"
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

		<!-- Section: Services Offered & Procedures (When Provided) -->
		{#if servicesOffered && servicesOffered.length > 0}
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
							Direct citizen public services. Click on any service card below to view its full step-by-step procedures and guidelines in a dedicated floating window.
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
								class="group flex flex-col justify-between rounded-3xl border-2 border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-blue-900 hover:shadow-xl hover:-translate-y-1 cursor-pointer text-left"
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
											class="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-black text-blue-950 shadow-2xs group-hover:bg-amber-400 group-hover:border-amber-400 transition-colors"
										>
											<span>🗗 Floating Window</span>
											<span>↗</span>
										</span>
									</div>

									<h3 class="mb-3 text-xl font-black text-blue-950 sm:text-2xl group-hover:text-blue-900 transition-colors">
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
											<span class="mr-1 text-xs font-bold text-slate-500 uppercase">Available Items:</span>
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
											<span class="mr-1 text-xs font-bold text-slate-500 uppercase">Covered Venues:</span>
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
									<div class="mb-4 flex items-center justify-between border-t border-slate-200 pt-5">
										<span class="text-xs font-black tracking-wider text-blue-950 uppercase">Step / s (Summary):</span>
										<span class="text-xs font-bold text-blue-900 group-hover:underline">Click to Expand Full Flow →</span>
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
												<div class="pt-0.5 text-sm font-semibold leading-snug text-slate-800">
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
												<svg class="h-4 w-4 shrink-0 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
													<path
														fill-rule="evenodd"
														d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
														clip-rule="evenodd"
													/>
												</svg>
												<span>Accountability & Damage Policy</span>
											</div>
											<p class="font-medium italic text-slate-800">
												{svc.note}
											</p>
										</div>
									{/if}
								</div>

								<div class="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
									<span class="text-slate-500 font-semibold">Step-by-step procedures & guidelines</span>
									<button
										type="button"
										onclick={(e) => { e.stopPropagation(); openModal(svc); }}
										class="inline-flex items-center gap-1.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-amber-300 font-black px-4 py-2 shadow-xs transition-all hover:scale-105 active:scale-95"
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
						<div class="mt-12 rounded-3xl border-2 border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm">
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
										<span class="mb-2 block text-[11px] font-black tracking-wider text-slate-500 uppercase">
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
										<span class="mb-2 block text-[11px] font-black tracking-wider text-slate-500 uppercase">
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

		<!-- Section 2: Core Mandates & Functions -->
		<section id="mandates" class="bg-slate-50 py-20">
			<div class="container mx-auto max-w-7xl px-6">
				<!-- Section Header -->
				<div class="mb-14 max-w-3xl">
					<div
						class="mb-3 inline-block rounded-md border border-blue-300 bg-blue-100 px-3.5 py-1 text-xs font-black tracking-wider text-blue-950 uppercase"
					>
						SECTION // STATUTORY MANDATES
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

				<!-- Mandates Grid (Matching exact civic card design with orange top border, badges, and dash items) -->
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each mandates as mandate}
						<div
							class="flex flex-col justify-between rounded-2xl border border-slate-200/80 border-t-4 border-t-amber-500 bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<div>
								<!-- Header: Index Number & Code Badge -->
								<div class="mb-6 flex items-center justify-between">
									<span class="text-3xl font-black text-amber-500 tracking-tight">
										{mandate.index}
									</span>
									<span
										class="rounded border border-blue-200 bg-blue-50/70 px-2 py-0.5 text-[10px] font-bold text-blue-900 tracking-wider uppercase font-mono"
									>
										{mandate.code}
									</span>
								</div>

								<!-- Category Tag -->
								<span
									class="mb-2 block text-xs font-black tracking-wider text-blue-900 uppercase"
								>
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
									<div class="flex items-start text-xs sm:text-sm font-medium text-slate-800 leading-snug">
										<span class="text-amber-500 font-bold select-none mr-2.5">—</span>
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
							class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-black uppercase tracking-wider text-blue-950 shadow-2xs hover:bg-slate-50 hover:border-blue-900 transition-all"
						>
							<svg class="h-4 w-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<span>{showFullDuties ? 'Hide' : 'View'} Full 17 Statutory Duties & Responsibilities</span>
							<span class="text-xs text-slate-400">{showFullDuties ? '▲' : '▼'}</span>
						</button>

						{#if showFullDuties}
							<div class="mt-6 w-full rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-8 shadow-sm transition-all">
								<div class="border-b-2 border-slate-100 pb-5 mb-6">
									<div class="inline-flex items-center gap-2 rounded-md border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-black tracking-wider text-blue-950 uppercase">
										<span class="h-2 w-2 rounded-full bg-blue-900"></span>
										STATUTORY ENUMERATION // {officeName}
									</div>
									<h3 class="mt-2 text-2xl font-black text-blue-950">
										Complete 17 Duties and Responsibilities
									</h3>
									<p class="mt-2 text-sm text-slate-700 font-medium leading-relaxed max-w-4xl border-l-4 border-amber-500 pl-4 py-1 bg-amber-50/50 rounded-r-xl">
										{dutiesAndResponsibilities.preamble}
									</p>
								</div>

								<div class="grid gap-3 sm:grid-cols-2">
									{#each dutiesAndResponsibilities.list as duty, idx}
										<div class="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5 hover:border-blue-900 hover:bg-white hover:shadow-xs transition-all">
											<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-950 text-xs font-black text-amber-300 shadow-2xs">
												{idx + 1}
											</span>
											<p class="text-xs font-medium text-slate-800 leading-snug">
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
					<div class="mt-8 rounded-3xl border-2 border-amber-400 bg-gradient-to-r from-blue-950 via-blue-900 to-slate-950 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
						<div class="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-amber-400/10 blur-2xl"></div>

						<div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
							<div class="space-y-2.5 max-w-2xl">
								<div class="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/15 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-300">
									<span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
									Official Citizen's Charter Service
								</div>
								<h3 class="text-xl sm:text-2xl font-black text-white">
									Stall / Space Verification (For Business Permit Issuance)
								</h3>
								<p class="text-xs sm:text-sm text-blue-200 leading-relaxed">
									Official G2B municipal service for market stallholders and commercial lessees verifying stall occupancy, rental receipts, and space compliance.
								</p>
								<div class="flex flex-wrap items-center gap-3 pt-1 text-xs">
									<span class="rounded-lg bg-white/10 px-2.5 py-1 text-white border border-white/15">
										Classification: <strong class="text-amber-300">Simple</strong>
									</span>
									<span class="rounded-lg bg-white/10 px-2.5 py-1 text-white border border-white/15">
										Processing: <strong class="text-emerald-400">31 minutes</strong>
									</span>
									<span class="rounded-lg bg-white/10 px-2.5 py-1 text-white border border-white/15">
										Fee: <strong class="text-amber-300">None (Free)</strong>
									</span>
								</div>
							</div>

							<div class="flex flex-col sm:flex-row gap-3 shrink-0">
								<a
									href="/citizens-charter/market"
									class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-xs font-black uppercase tracking-wider text-blue-950 shadow-md hover:bg-amber-300 hover:scale-102 transition-all active:scale-98"
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
						class="mt-8 rounded-3xl border-2 border-amber-400 bg-gradient-to-r from-blue-950 via-blue-900 to-slate-950 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden"
					>
						<div
							class="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-amber-400/10 blur-2xl"
						></div>

						<div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
							<div class="space-y-2.5 max-w-2xl">
								<div
									class="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/15 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-300"
								>
									<span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
									Official Citizen's Charter Frontline Services
								</div>
								<h3 class="text-xl sm:text-2xl font-black text-white">
									Borrowing of Equipment & Venue Scheduling Requests
								</h3>
								<p class="text-xs sm:text-sm text-blue-200 leading-relaxed">
									Official citizen frontline guidelines for borrowing tents, chairs, sound systems, and scheduling municipal venues (Tanauan Amphitheater, Municipal Lobby, Tanauan Civic Center).
								</p>
								<div class="flex flex-wrap items-center gap-3 pt-1 text-xs">
									<span class="rounded-lg bg-white/10 px-2.5 py-1 text-white border border-white/15">
										Service 1: <strong class="text-amber-300">Borrowing Equipment</strong>
									</span>
									<span class="rounded-lg bg-white/10 px-2.5 py-1 text-white border border-white/15">
										Service 2: <strong class="text-emerald-400">Venue Reservation</strong>
									</span>
									<span class="rounded-lg bg-white/10 px-2.5 py-1 text-white border border-white/15">
										Availability: <strong class="text-amber-300">Mon - Fri (8AM - 5PM)</strong>
									</span>
								</div>
							</div>

							<div class="flex flex-col sm:flex-row gap-3 shrink-0">
								<a
									href="/citizens-charter/gso"
									class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-xs font-black uppercase tracking-wider text-blue-950 shadow-md hover:bg-amber-300 hover:scale-102 transition-all active:scale-98"
								>
									<span>View Citizen's Charter ↗</span>
								</a>
							</div>
						</div>
					</div>
				{/if}
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
						<div class="mb-1 text-xs font-black tracking-wide text-emerald-700 uppercase">
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
					<AccomplishmentSection {department} limit={3} collapsible={true} cleanLayout={true} />
				</div>
			</div>
		</section>

		<!-- Section 6: Awards & Citations (Provincial & Regional Honors) -->
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
						Provincial and regional citations recognizing outstanding business permitting,
						year-on-year local revenue growth, and sound fiscal administration.
					</p>
				</div>

				<div class="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
					<AwardsSection {department} limit={3} collapsible={true} cleanLayout={true} />
				</div>
			</div>
		</section>

		<!-- Section 7: Department Personnel (Official Staff Registry) -->
		<section id="personnel" class="bg-white py-20">
			<div class="container mx-auto max-w-7xl px-6">
				<div class="mb-10 max-w-3xl border-b-2 border-slate-200 pb-6">
					<div
						class="mb-3 inline-flex items-center gap-2 rounded-md border border-blue-300 bg-blue-100 px-3.5 py-1 text-xs font-black tracking-wider text-blue-950 uppercase"
					>
						<span class="h-2 w-2 rounded-full bg-blue-900"></span>
						SECTION 07 // PUBLIC SERVANTS REGISTRY
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
					<span class="h-2 w-2 rounded-full bg-emerald-400"></span>
					<span>ARTA Republic Act No. 11032 Compliant</span>
				</div>
			</div>
		</div>
	</footer>

	<!-- ========================================================================= -->
	<!-- FLOATING WINDOW MODAL (Vision, Mission, Service Offered & Procedures)     -->
	<!-- ========================================================================= -->
	{#if activeFloatingModal}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md"
			transition:fade={{ duration: 200 }}
			role="dialog"
			aria-modal="true"
			aria-labelledby="floating-window-title"
			onclick={(e) => {
				if (e.target === e.currentTarget) closeModal();
			}}
		>
			<div
				class="relative flex flex-col w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden ring-1 ring-black/10"
				in:scale={{ start: 0.93, duration: 250 }}
				out:scale={{ start: 0.95, duration: 160 }}
			>
				<!-- Window Title Bar / Chrome -->
				<div
					class="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-900 text-white border-b border-slate-800 shrink-0 select-none"
				>
					<div class="flex items-center gap-3">
						<!-- Window action dots (macOS style) -->
						<div class="flex items-center gap-1.5">
							<button
								type="button"
								onclick={closeModal}
								class="h-3 w-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors focus:outline-none"
								title="Close Window"
								aria-label="Close Window"
							></button>
							<span class="h-3 w-3 rounded-full bg-amber-500 opacity-80"></span>
							<span class="h-3 w-3 rounded-full bg-emerald-500 opacity-80"></span>
						</div>
						<div class="h-4 w-px bg-slate-700"></div>
						<div class="flex items-center gap-2">
							<span class="text-xs font-black text-amber-400 uppercase tracking-wider">
								{officeCode || 'LGU'}
							</span>
							<span class="text-xs text-slate-300 font-medium truncate max-w-[200px] sm:max-w-xs">
								{officeName}
							</span>
						</div>
					</div>

					<div class="flex items-center gap-2">
						<span
							class="hidden sm:inline-block text-[11px] font-semibold text-slate-400 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700"
						>
							ESC to close
						</span>
						<button
							type="button"
							onclick={closeModal}
							class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-rose-600 hover:text-white transition-colors focus:outline-none"
							aria-label="Close floating window"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				<!-- Window Scrollable Body -->
				<div class="p-6 sm:p-8 overflow-y-auto space-y-6">
					{#if activeFloatingModal === 'vision'}
						<!-- ONLY VISION CONTENT -->
						<div class="space-y-6">
							<div class="flex flex-wrap items-center justify-between gap-2">
								<span
									class="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-black tracking-wide text-amber-900 uppercase"
								>
									<span class="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
									Long-Term Institutional Aspiration
								</span>
								<span class="text-xs font-bold text-slate-500">{municipality}</span>
							</div>

							<div>
								<span class="text-xs font-black tracking-wider text-amber-700 uppercase">
									Official Mandate
								</span>
								<h2 id="floating-window-title" class="text-3xl font-black text-blue-950 tracking-tight sm:text-4xl">
									OUR VISION
								</h2>
							</div>

							<!-- Highlighted Vision Statement -->
							<div
								class="relative overflow-hidden rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50/90 via-white to-amber-50/50 p-6 sm:p-8 shadow-sm"
							>
								<div
									class="absolute -right-3 -bottom-5 text-8xl font-serif text-amber-200/50 select-none pointer-events-none"
								>
									”
								</div>
								<p class="relative z-10 text-lg sm:text-xl font-bold leading-relaxed text-slate-900">
									"{vision}"
								</p>
							</div>

							<!-- Pillars / Core Focus of Vision -->
							<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5">
								<div class="mb-3 text-xs font-black tracking-wider text-slate-600 uppercase">
									Core Operational Focus
								</div>
								<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
									<div class="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
										<div class="mb-1 text-xs font-black text-amber-600 uppercase">01 • Efficiency</div>
										<p class="text-xs font-semibold text-slate-700">
											Effective, efficient & sustainable program delivery
										</p>
									</div>
									<div class="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
										<div class="mb-1 text-xs font-black text-blue-900 uppercase">02 • Responsiveness</div>
										<p class="text-xs font-semibold text-slate-700">
											Competent manpower responsive to public needs
										</p>
									</div>
									<div class="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
										<div class="mb-1 text-xs font-black text-emerald-600 uppercase">03 • Alignment</div>
										<p class="text-xs font-semibold text-slate-700">
											Fully aligned with Tanauan Municipal vision
										</p>
									</div>
								</div>
							</div>

							{#if mission}
								<div class="flex items-center justify-between pt-2 border-t border-slate-100">
									<span class="text-xs font-medium text-slate-500">Need to check our mission statement?</span>
									<button
										type="button"
										onclick={() => openModal('mission')}
										class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 underline"
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
									<span class="h-2 w-2 rounded-full bg-blue-700 animate-pulse"></span>
									Official Commitment & Scope
								</span>
								<span class="text-xs font-bold text-slate-500">{municipality}</span>
							</div>

							<div>
								<span class="text-xs font-black tracking-wider text-blue-900 uppercase">
									Public Service Mandate
								</span>
								<h2 id="floating-window-title" class="text-3xl font-black text-blue-950 tracking-tight sm:text-4xl">
									OUR MISSION
								</h2>
							</div>

							<!-- Highlighted Mission Statement -->
							<div
								class="relative overflow-hidden rounded-3xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/90 via-white to-blue-50/50 p-6 sm:p-8 shadow-sm"
							>
								<div
									class="absolute -right-3 -bottom-5 text-8xl font-serif text-blue-200/50 select-none pointer-events-none"
								>
									”
								</div>
								<p class="relative z-10 text-base sm:text-lg font-semibold leading-relaxed text-slate-900">
									"{mission}"
								</p>
							</div>

							<!-- Operational Scope Pillars -->
							<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5">
								<div class="mb-3 text-xs font-black tracking-wider text-slate-600 uppercase">
									Key Departmental Responsibilities
								</div>
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
									<div class="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-800">
										<span class="h-2 w-2 rounded-full bg-blue-600 shrink-0"></span>
										<span>Supply and Property Management</span>
									</div>
									<div class="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-800">
										<span class="h-2 w-2 rounded-full bg-blue-600 shrink-0"></span>
										<span>Maintenance of Buildings & Grounds</span>
									</div>
									<div class="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-800">
										<span class="h-2 w-2 rounded-full bg-blue-600 shrink-0"></span>
										<span>Electrical, Plumbing & IT Electronics</span>
									</div>
									<div class="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-xs font-bold text-slate-800">
										<span class="h-2 w-2 rounded-full bg-blue-600 shrink-0"></span>
										<span>Light Vehicles & Heavy Equipment Support</span>
									</div>
								</div>
							</div>

							{#if vision}
								<div class="flex items-center justify-between pt-2 border-t border-slate-100">
									<span class="text-xs font-medium text-slate-500">Need to check our vision statement?</span>
									<button
										type="button"
										onclick={() => openModal('vision')}
										class="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-900 underline"
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
									{activeFloatingModal.badge || `Service Offered ${activeFloatingModal.serviceNumber}`}
								</span>
								<span class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
									✓ Frontline Public Service
								</span>
							</div>

							<!-- Title & Description -->
							<div>
								<span class="text-xs font-black tracking-wider text-blue-900 uppercase">
									Public Citizen Service
								</span>
								<h2 id="floating-window-title" class="text-2xl font-black text-blue-950 tracking-tight sm:text-3xl">
									{activeFloatingModal.title}
								</h2>
								{#if activeFloatingModal.description}
									<p class="mt-2 text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
										{activeFloatingModal.description}
									</p>
								{/if}
							</div>

							<!-- Available Equipment or Venues -->
							{#if activeFloatingModal.equipmentList}
								<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
									<div class="mb-2 text-xs font-black uppercase tracking-wider text-slate-600">
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
									<div class="mb-2 text-xs font-black uppercase tracking-wider text-slate-600">
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

							<!-- Procedure Steps -->
							{#if activeFloatingModal.steps && activeFloatingModal.steps.length > 0}
								<div class="space-y-3">
									<div class="flex items-center justify-between">
										<h3 class="text-xs font-black uppercase tracking-wider text-blue-950">
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
												<div class="pt-1 text-sm font-semibold text-slate-900 leading-snug">
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
									class="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-4 text-xs font-bold text-amber-950 flex items-start gap-3"
								>
									<span class="text-xl shrink-0">⚠️</span>
									<div>
										<div class="font-black uppercase tracking-wider text-amber-900 mb-0.5">
											Borrower Liability & Damage Policy
										</div>
										<p class="leading-relaxed">{activeFloatingModal.note}</p>
									</div>
								</div>
							{/if}

							<!-- Signatories & Reviewers Info -->
							{#if preparedBy || reviewedBy}
								<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
									<div class="mb-3 text-[11px] font-black uppercase tracking-wider text-slate-500">
										Responsible Office Personnel & Focal Staff
									</div>
									<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
										{#if preparedBy}
											<div class="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
												<div class="text-[10px] font-bold text-slate-400 uppercase">Prepared by:</div>
												<div class="text-sm font-black text-blue-950">{preparedBy.name}</div>
												<div class="text-xs font-semibold text-amber-600">{preparedBy.title}</div>
											</div>
										{/if}
										{#if reviewedBy}
											<div class="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
												<div class="text-[10px] font-bold text-slate-400 uppercase">Reviewed by:</div>
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
					class="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200 shrink-0"
				>
					<div class="flex items-center gap-2 text-xs font-bold text-slate-600">
						<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
						<span>ARTA Republic Act No. 11032 Compliant</span>
					</div>

					<div class="flex items-center gap-2.5 w-full sm:w-auto justify-end">
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
							class="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-950 px-5 py-2 text-xs font-black text-white transition-all hover:bg-blue-900 active:scale-95 shadow-sm"
						>
							<span>Close Window ✕</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
