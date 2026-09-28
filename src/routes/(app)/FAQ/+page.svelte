<script>
	import PageHero from '$lib/Components/PageHero.svelte';

	let searchQuery = $state('');
	let selectedCategory = $state('All');
	let openFaq = $state(0); // open first FAQ by default

	const categories = [
		'All',
		'Civil Registry',
		'Business Permits',
		'Taxes & Payments',
		'Social Services',
		'Health & Emergencies',
		'General Governance'
	];

	const faqs = [
		{
			category: 'Civil Registry',
			q: 'How do I request a Certified True Copy of my Birth, Marriage, or Death Certificate?',
			a: 'Visit the Local Civil Registrar (LCR) Office at the Tanauan Municipal Hall (Ground Floor). Present one (1) valid government-issued ID, provide the full name, date, and place of the event, and pay the corresponding document processing fee at the Municipal Treasurer’s Office (MTO). Normal processing time is 1 to 2 working days.'
		},
		{
			category: 'Civil Registry',
			q: 'How can I apply for a Marriage License in Tanauan?',
			a: 'Both parties must apply personally at the Local Civil Registrar. Requirements include: PSA Birth Certificates of both applicants, Certificate of No Marriage Record (CENOMAR), Pre-Marriage Counseling (PMC) certificate, Community Tax Certificate (Cedula), and 2x2 ID pictures. If either applicant is aged 18–25, parental consent or advice is required.'
		},
		{
			category: 'Business Permits',
			q: 'What is the procedure and schedule for Business Permit Renewal (BOSS)?',
			a: 'The Business One-Stop Shop (BOSS) operates annually from January 2 to January 20 at the Tanauan Municipal Gymnasium/Hall. Bring: Barangay Business Clearance, previous year’s Mayor’s Permit & Official Receipt, Gross Sales Declaration (Audited Financial Statements or BIR ITR), Community Tax Certificate, and Fire Safety Inspection Certificate. Online pre-assessments are also supported through the BPLO Licensing office.'
		},
		{
			category: 'Business Permits',
			q: 'Where do I register a new sole proprietorship or local enterprise?',
			a: 'First, register your business name with the Department of Trade and Industry (DTI) or visit the Tanauan Negosyo Center / PESO Office. Next, secure a Barangay Business Clearance from the barangay where your business is located, followed by Zoning/Locational Clearance, Fire Safety Certificate, and final Mayor’s Permit at the Licensing Office.'
		},
		{
			category: 'Taxes & Payments',
			q: 'How do I pay my Real Property Tax (Amilyar) and avail of prompt-payment discounts?',
			a: 'Real Property Tax payments are processed at the Municipal Treasurer’s Office (MTO). Bring your latest Tax Declaration and previous Official Receipt. Property owners who pay their full annual tax before March 31 enjoy an early-payment discount of up to 20% on the basic tax and Special Education Fund (SEF).'
		},
		{
			category: 'Taxes & Payments',
			q: 'How can I get a Community Tax Certificate (Cedula)?',
			a: 'Cedula is issued at the Municipal Treasurer’s Office Window 1. For individuals, provide your name, address, civil status, date of birth, and declared annual income from profession or employment. Barangay treasurers are also authorized to issue cedula within their respective barangays.'
		},
		{
			category: 'Social Services',
			q: 'How do I apply for Senior Citizen benefits and an OSCA ID card?',
			a: 'Residents aged 60 and above can visit the Office of Senior Citizens Affairs (OSCA) inside the MSWDO building. Requirements: proof of age (PSA Birth Certificate or valid ID), Barangay Certification of Residency (minimum 6 months residence in Tanauan), and two (2) 1x1 recent photos. The OSCA ID grants a 20% discount on medicines, food, transport, and utilities.'
		},
		{
			category: 'Social Services',
			q: 'How can indigents avail of financial assistance (AICS) for medical or burial support?',
			a: 'The Municipal Social Welfare and Development Office (MSWDO) administers the Assistance to Individuals in Crisis Situation (AICS). Bring: Barangay Certificate of Indigency, valid ID, Medical Certificate / Prescription / Hospital Bill (for medical aid), or Death Certificate and Funeral Contract (for burial aid). A social worker will conduct an intake assessment.'
		},
		{
			category: 'Social Services',
			q: 'What are the requirements for a Persons with Disability (PDAO/PWD) ID?',
			a: 'Submit to the PWD Office: Medical Certificate stating specific disability type issued by a licensed physician, Barangay Certificate of Residency, two (2) recent 1x1 photos, and a valid ID. PWD ID holders are entitled to statutory 20% discounts and priority frontline lanes.'
		},
		{
			category: 'Health & Emergencies',
			q: 'What are the official 24/7 emergency hotline numbers for Tanauan, Leyte?',
			a: 'For immediate response: Tanauan Rescue / MDRRMO: 0912-936-6706 or 0916-197-7360; Philippine National Police (PNP Tanauan): 0951-163-3878; Bureau of Fire Protection (BFP Tanauan): 0916-197-4504; Municipal Hall Operator: (053) 123-4567.'
		},
		{
			category: 'Health & Emergencies',
			q: 'What health services are offered at the Municipal Health Office (MHO / RHU)?',
			a: 'The Tanauan Rural Health Unit offers free general outpatient consultations, prenatal and postnatal check-ups, Expanded Program on Immunization (EPI) for infants, dental tooth extractions, TB-DOTS treatment, family planning services, and basic laboratory exams.'
		},
		{
			category: 'General Governance',
			q: 'What are the official municipal office hours?',
			a: 'All frontline offices in the Tanauan Municipal Hall are open Monday through Friday from 8:00 AM to 5:00 PM (no noon break for frontline services under the ARTA No-Noon-Break Policy). Emergency units (Rescue, Police, Fire) operate 24 hours daily.'
		},
		{
			category: 'General Governance',
			q: 'How do I submit citizen feedback, suggestions, or official complaints?',
			a: 'You can submit through our online Citizen Satisfaction Survey page, use the physical Citizen Feedback Dropboxes at the lobby of the Municipal Hall, or speak directly to the Public Assistance and Complaints Desk (PACD) officer on duty.'
		}
	];

	let filteredFaqs = $derived(
		faqs.filter((item) => {
			const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
			const matchesSearch =
				item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
				item.a.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		})
	);
</script>

<svelte:head>
	<title>Frequently Asked Questions (FAQ) | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Find answers to common questions about civil registry, business permits, taxes, social welfare, health services, and government transactions in Tanauan, Leyte."
	/>
</svelte:head>

<PageHero
	title="Frequently Asked Questions"
	subtitle="Clear, verified answers to common citizen inquiries and public service requirements"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z' /></svg>"
/>

<section class="bg-slate-50 py-12 md:py-16">
	<div class="container mx-auto max-w-5xl px-6 md:px-8">
		<!-- Search & Category Bar -->
		<div class="mb-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
			<div class="relative mb-6">
				<span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</span>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search questions or keywords (e.g. Birth certificate, Business permit, Taxes, OSCA, Hotlines)..."
					class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pr-4 pl-12 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:outline-none"
				/>
			</div>

			<!-- Filter Tabs -->
			<div class="flex flex-wrap gap-2">
				{#each categories as cat}
					<button
						onclick={() => (selectedCategory = cat)}
						class="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 {selectedCategory === cat
							? 'bg-blue-900 text-white shadow-sm'
							: 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
					>
						{cat}
					</button>
				{/each}
			</div>
		</div>

		<!-- FAQs Accordion List -->
		{#if filteredFaqs.length > 0}
			<div class="space-y-4">
				{#each filteredFaqs as faq, index}
					{@const isOpen = openFaq === index}
					<div
						class="overflow-hidden rounded-2xl border transition-all duration-200 {isOpen
							? 'border-blue-200 bg-white shadow-md ring-1 ring-blue-500/10'
							: 'border-slate-200/80 bg-white hover:border-slate-300'}"
					>
						<button
							onclick={() => (openFaq = isOpen ? -1 : index)}
							class="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors"
						>
							<div class="flex items-start gap-3">
								<span class="mt-0.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-800 uppercase shrink-0">
									{faq.category}
								</span>
								<h3 class="text-base font-bold text-slate-900 leading-snug">
									{faq.q}
								</h3>
							</div>

							<div
								class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 {isOpen
									? 'rotate-180 border-blue-900 bg-blue-900 text-white'
									: 'border-slate-200 bg-slate-50 text-slate-500'}"
							>
								<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
								</svg>
							</div>
						</button>

						{#if isOpen}
							<div class="border-t border-slate-100 bg-slate-50/50 px-6 pt-2 pb-6">
								<p class="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
									{faq.a}
								</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<div class="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
				<svg class="mx-auto mb-3 h-10 w-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
				</svg>
				<h4 class="font-bold text-slate-800">No matching questions found</h4>
				<p class="mt-1 text-sm text-slate-500">Try searching for other keywords or select another category.</p>
			</div>
		{/if}

		<!-- Still Have Questions Card -->
		<div class="mt-12 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-900 to-indigo-950 p-8 text-white shadow-xl">
			<div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
				<div>
					<span class="rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-yellow-300">
						Citizen Help Desk
					</span>
					<h3 class="mt-2 text-2xl font-black">Still have questions or need personalized help?</h3>
					<p class="mt-1 text-sm text-blue-100 max-w-xl">
						Our Public Assistance and Complaints Desk (PACD) and department personnel are ready to guide you through your transaction.
					</p>
				</div>
				<div class="flex flex-wrap gap-3 shrink-0">
					<a
						href="/Contact"
						class="rounded-xl bg-yellow-400 px-5 py-3 text-xs font-bold uppercase tracking-wider text-blue-950 shadow-md transition-all hover:bg-yellow-300 hover:shadow-lg"
					>
						Contact Officials & Directory
					</a>
					<a
						href="/Survey"
						class="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-white/20"
					>
						Citizen Survey
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
