<script>
	import { onMount } from 'svelte';

	let charter = {
		title: "CITIZEN'S CHARTER — Municipal Market Office",
		office: "Municipal Market Office, Tanauan, Leyte",
		head_of_office: {
			name: 'Engr. Lue M. Maderazo',
			position: 'Market Supervisor / Department Head',
			office: 'Municipal Market Office, Public Market Building, Tanauan, Leyte'
		},
		vision:
			'To provide a modern, sanitized, transparent, and vibrant trading hub that fosters economic prosperity for local vendors, farmers, and consumers in the Municipality of Tanauan.',
		mission:
			'Proper administration, supervision, regulation, and maintenance of the public market facilities while ensuring fair, efficient, and citizen-first municipal services in compliance with national and local ordinances.',
		pledge:
			'We commit to serving all market stallholders, vendors, and the buying public with integrity, swift document processing, zero bureaucratic red tape, and an unwavering standard of public market hygiene and orderliness.',
		service: {
			id: 'stall-space-verification',
			title: 'Stall / Space Verification (For Business Permit Issuance)',
			service_description:
				'Official verification process for market stallholders, vendors, and space lessees certifying compliance with tenancy, rental accounts, utility payments, and physical stall occupancy for business permit processing and renewal.',
			office_division: 'Municipal Market Office',
			classification: 'Simple',
			transaction_type: 'Government-to-Business (G2B)',
			who_may_avail: [
				'Market Stallholders',
				'Market Vendors',
				'Lessees',
				'Authorized Occupants of Municipal Market Stalls / Spaces'
			],
			total_processing_time: '31 minutes',
			total_fee: 'None',
			checklist_of_requirements: [
				{
					item: '1',
					requirement: 'Latest Business Permit (Original)',
					condition: 'If applicable',
					source: 'Client / Business Permit and Licensing Office (BPLO)'
				},
				{
					item: '2',
					requirement: 'DTI Registration',
					condition: 'If applicable',
					source: 'Department of Trade and Industry (DTI)'
				},
				{
					item: '3',
					requirement: 'Official Receipt (OR) of Last Monthly Rental Paid',
					condition: 'Mandatory',
					source: "Municipal Treasurer's Office (MTO)"
				},
				{
					item: '4',
					requirement: 'Official Receipt (OR) of Last Electric / Water Bill Paid',
					condition: 'If applicable',
					source: 'Electric Utility / Water District / Market Admin'
				},
				{
					item: '5',
					requirement: 'Existing Lease Contract',
					condition: 'If applicable',
					source: 'Municipal Market Office / Tenant Copy'
				},
				{
					item: '6',
					requirement: 'New Lease Contract',
					condition: 'If applicable',
					source: 'Municipal Market Office / Municipal Mayor'
				},
				{
					item: '7',
					requirement: 'Stall / Space Inspection Clearance',
					condition: 'When required',
					source: 'Municipal Market Office / Market Inspector'
				},
				{
					item: '8',
					requirement: 'Other supporting documents',
					condition: 'When applicable',
					source: 'Meat Inspection, Sanitary Permit, or Client Documents'
				}
			],
			process_steps: [
				{
					step: 1,
					client_action: 'Proceed to the Municipal Market Office and request Stall/Space Verification.',
					agency_action: 'Receive the request and identify the stall/space to be verified.',
					fees: 'None',
					processing_time: '2 minutes',
					responsible_personnel: 'Market Office Personnel'
				},
				{
					step: 2,
					client_action: 'Submit the required documents.',
					agency_action: 'Check the completeness and validity of the submitted documents.',
					fees: 'None',
					processing_time: '5 minutes',
					responsible_personnel: 'Market Office Personnel'
				},
				{
					step: 3,
					client_action: 'Provide the Stall No., Section, and Serial No., if available.',
					agency_action: 'Verify the stall/space information against the official market records.',
					fees: 'None',
					processing_time: '5 minutes',
					responsible_personnel: 'Market Office Personnel'
				},
				{
					step: 4,
					client_action: 'Allow inspection of the stall/space, when necessary.',
					agency_action: 'Conduct actual inspection of the stall/space.',
					fees: 'None',
					processing_time: '10 minutes',
					responsible_personnel: 'Market Supervisor / Authorized Market Inspector'
				},
				{
					step: 5,
					client_action: 'Wait for the verification result.',
					agency_action: 'Evaluate the documents, market records, and inspection results.',
					fees: 'None',
					processing_time: '5 minutes',
					responsible_personnel: 'Market Supervisor'
				},
				{
					step: 6,
					client_action: 'Receive the accomplished Stall/Space Verification Form.',
					agency_action: 'Accomplish, sign, and release the Stall/Space Verification Form.',
					fees: 'None',
					processing_time: '3 minutes',
					responsible_personnel: 'Market Supervisor'
				},
				{
					step: 7,
					client_action: 'Proceed to the BPLO for the succeeding Business Permit processing.',
					agency_action: 'Refer the client to the BPLO.',
					fees: 'None',
					processing_time: '1 minute',
					responsible_personnel: 'Market Office Personnel'
				}
			],
			process_flow: [
				'Proceed to Market Office',
				'Request Stall/Space Verification',
				'Submit Required Documents',
				'Document Verification',
				'Verification of Stall/Space Records',
				'Physical Inspection (if necessary)',
				'Evaluation by Market Supervisor',
				'Stall/Space Verification Form Released',
				'Proceed to BPLO'
			]
		},
		feedback:
			'Clients may submit feedback, inquiries, or complaints directly at the Municipal Market Office Helpdesk, or drop written comments in the LGU Suggestion Box at the Town Hall entrance.',
		note:
			'The stated processing time assumes that all required documents are complete and no discrepancy is found in the market records. Actual processing may vary when physical inspection, record verification, or additional documentation is necessary.'
	};

	function printCharter() {
		window.print();
	}
</script>

<svelte:head>
	<title>Citizen's Charter — Municipal Market Office | Tanauan, Leyte</title>
	<meta
		name="description"
		content="Official Citizen's Charter of the Municipal Market Office of Tanauan, Leyte. Requirements, step-by-step procedures, and process flow for Stall / Space Verification for Business Permit Issuance."
	/>
</svelte:head>

<div class="space-y-10 pb-16">
	<!-- Hero / Header Card -->
	<div
		class="relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-950 p-6 text-white shadow-xl sm:p-10"
	>
		<div
			class="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl"
		></div>

		<div class="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
			<div class="space-y-3 max-w-3xl">
				<div class="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/15 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-300">
					<span class="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
					Republic of the Philippines • Province of Leyte
				</div>

				<h1 class="text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
					Municipal Market Office
				</h1>
				<p class="text-sm font-bold uppercase tracking-widest text-amber-300 sm:text-base">
					Citizen's Charter // Stall / Space Verification Service
				</p>
				<p class="text-xs text-blue-200 sm:text-sm leading-relaxed max-w-2xl font-medium">
					{charter.mission}
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-3">
				<a
					href="/Departments/Market"
					class="inline-flex items-center gap-2 rounded-xl border border-blue-700 bg-blue-900/60 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-blue-800"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					<span>Market Department Page</span>
				</a>
				<button
					type="button"
					onclick={printCharter}
					class="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-blue-950 shadow-md transition-all hover:scale-105 hover:bg-amber-300 active:scale-95"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
					</svg>
					<span>Print Charter</span>
				</button>
			</div>
		</div>

		<!-- Quick Metric Badges -->
		<div class="mt-8 grid grid-cols-2 gap-3 border-t border-blue-900/70 pt-6 sm:grid-cols-4 sm:gap-4">
			<div class="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
				<span class="text-[10px] font-black uppercase tracking-wider text-blue-300 block">Service Classification</span>
				<span class="text-sm sm:text-base font-black text-white">{charter.service.classification}</span>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
				<span class="text-[10px] font-black uppercase tracking-wider text-blue-300 block">Transaction Type</span>
				<span class="text-sm sm:text-base font-black text-amber-300">{charter.service.transaction_type}</span>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
				<span class="text-[10px] font-black uppercase tracking-wider text-blue-300 block">Processing Time</span>
				<span class="text-sm sm:text-base font-black text-emerald-400">{charter.service.total_processing_time}</span>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
				<span class="text-[10px] font-black uppercase tracking-wider text-blue-300 block">Total Fees</span>
				<span class="text-sm sm:text-base font-black text-amber-300">{charter.service.total_fee}</span>
			</div>
		</div>
	</div>

	<!-- Who May Avail Banner -->
	<div class="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm sm:p-6">
		<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
					</svg>
				</div>
				<div>
					<h3 class="text-xs font-black uppercase tracking-wider text-slate-500">Who May Avail</h3>
					<p class="text-base font-black text-blue-950">Eligible Market Clients & Commercial Occupants</p>
				</div>
			</div>
			<div class="flex flex-wrap gap-2">
				{#each charter.service.who_may_avail as who}
					<span class="inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-950">
						• {who}
					</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- Checklist of Requirements -->
	<div class="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
		<div class="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
			<div>
				<div class="inline-block rounded-md border border-amber-300 bg-amber-100 px-3 py-0.5 text-xs font-black tracking-wider text-amber-950 uppercase">
					Section 01 // Verification Standards
				</div>
				<h2 class="mt-2 text-2xl font-black text-blue-950 sm:text-3xl">
					Checklist of Requirements
				</h2>
			</div>
			<span class="rounded-full bg-slate-100 px-3.5 py-1 font-mono text-xs font-extrabold text-slate-700">
				Total Requirements: {charter.service.checklist_of_requirements.length} Items
			</span>
		</div>

		<div class="grid gap-3.5 sm:grid-cols-2">
			{#each charter.service.checklist_of_requirements as req}
				<div
					class="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-all hover:border-blue-900/40 hover:bg-white hover:shadow-md"
				>
					<span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-xs font-black text-amber-300 shadow-2xs">
						{req.item}
					</span>
					<div class="space-y-1">
						<h4 class="text-sm font-black text-blue-950 leading-snug">
							{req.requirement}
						</h4>
						<div class="flex flex-wrap items-center gap-2 pt-0.5">
							<span
								class={`rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
									req.condition === 'Mandatory'
										? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
										: 'bg-slate-200 text-slate-800'
								}`}
							>
								{req.condition}
							</span>
							<span class="text-xs text-slate-600 font-medium">Source: {req.source}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Step-by-Step Procedure Table -->
	<div class="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
		<div class="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
			<div>
				<div class="inline-block rounded-md border border-blue-300 bg-blue-100 px-3 py-0.5 text-xs font-black tracking-wider text-blue-950 uppercase">
					Section 02 // Service Workflow
				</div>
				<h2 class="mt-2 text-2xl font-black text-blue-950 sm:text-3xl">
					Client Steps & Agency Actions
				</h2>
			</div>
			<div class="flex items-center gap-2 text-xs font-black text-slate-600">
				<span class="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
				<span>Total Cumulative Time: 31 Minutes</span>
			</div>
		</div>

		<!-- Desktop Procedure Table -->
		<div class="hidden lg:block overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
			<table class="w-full text-left border-collapse">
				<thead>
					<tr class="border-b-2 border-slate-200 bg-slate-100 text-xs font-black uppercase tracking-wider text-blue-950">
						<th class="py-3.5 px-4 w-16 text-center">Step</th>
						<th class="py-3.5 px-5 w-1/3">Client's Action</th>
						<th class="py-3.5 px-5 w-1/3">Agency's Action</th>
						<th class="py-3.5 px-4 text-center">Fees</th>
						<th class="py-3.5 px-4 text-center">Processing Time</th>
						<th class="py-3.5 px-5">Person Responsible</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-200 text-xs">
					{#each charter.service.process_steps as step}
						<tr class="hover:bg-blue-50/40 transition-colors">
							<td class="py-4 px-4 text-center">
								<span class="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-blue-950 text-xs font-black text-amber-300 shadow-2xs">
									{step.step}
								</span>
							</td>
							<td class="py-4 px-5 font-bold text-slate-900 leading-relaxed">
								{step.client_action}
							</td>
							<td class="py-4 px-5 font-medium text-slate-700 leading-relaxed">
								{step.agency_action}
							</td>
							<td class="py-4 px-4 text-center font-black text-slate-700">
								<span class="rounded bg-slate-100 px-2.5 py-1 text-slate-600">
									{step.fees}
								</span>
							</td>
							<td class="py-4 px-4 text-center font-black text-emerald-800">
								<span class="rounded bg-emerald-50 border border-emerald-200 px-2 py-1">
									{step.processing_time}
								</span>
							</td>
							<td class="py-4 px-5 font-extrabold text-blue-950">
								{step.responsible_personnel}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Mobile / Tablet Responsive Cards -->
		<div class="grid gap-4 lg:hidden">
			{#each charter.service.process_steps as step}
				<div class="rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-5 space-y-3">
					<div class="flex items-center justify-between border-b border-slate-200 pb-2.5">
						<span class="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-blue-950 text-xs font-black text-amber-300">
							{step.step}
						</span>
						<span class="rounded-lg bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-xs font-black text-emerald-950">
							⏱ {step.processing_time}
						</span>
					</div>

					<div>
						<span class="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-0.5">
							Client Action
						</span>
						<p class="text-sm font-black text-blue-950 leading-snug">
							{step.client_action}
						</p>
					</div>

					<div>
						<span class="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-0.5">
							Agency Action
						</span>
						<p class="text-xs font-medium text-slate-700 leading-relaxed">
							{step.agency_action}
						</p>
					</div>

					<div class="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-2.5 text-xs">
						<span class="text-slate-600">Fees: <strong class="text-slate-900">{step.fees}</strong></span>
						<span class="text-blue-900 font-bold">{step.responsible_personnel}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Visual Process Flowchart -->
	<div class="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
		<div class="mb-6 border-b border-slate-200 pb-5">
			<div class="inline-block rounded-md border border-emerald-300 bg-emerald-100 px-3 py-0.5 text-xs font-black tracking-wider text-emerald-950 uppercase">
				Section 03 // Visual Process Flow
			</div>
			<h2 class="mt-2 text-2xl font-black text-blue-950 sm:text-3xl">
				End-to-End Verification Pipeline
			</h2>
			<p class="mt-1 text-xs text-slate-600">
				Follow this step-by-step route from Municipal Market Office intake to final BPLO endorsement.
			</p>
		</div>

		<div class="relative">
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
				{#each charter.service.process_flow as stage, idx}
					<div
						class="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-gradient-to-r from-slate-50 to-white p-4 shadow-2xs hover:border-blue-900 hover:shadow-md transition-all"
					>
						<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-xs font-black text-amber-300">
							{idx + 1}
						</span>
						<div class="flex-1">
							<span class="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
								Stage {idx + 1}
							</span>
							<h4 class="text-xs sm:text-sm font-black text-blue-950 leading-tight">
								{stage}
							</h4>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Official Note Alert Box -->
		<div class="mt-6 rounded-2xl border-l-4 border-amber-500 bg-amber-50/80 p-4 sm:p-5">
			<div class="flex items-start gap-3">
				<span class="text-amber-600 text-lg font-black select-none">ℹ</span>
				<div class="space-y-1">
					<h5 class="text-xs font-black uppercase tracking-wider text-amber-950">
						Official Transparency Advisory
					</h5>
					<p class="text-xs text-amber-900 font-medium leading-relaxed">
						{charter.note}
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Executive Helpdesk & Contact -->
	<div class="rounded-3xl border-2 border-blue-900 bg-blue-950 p-6 text-white sm:p-8">
		<div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
			<div class="space-y-2 max-w-2xl">
				<span class="text-xs font-black uppercase tracking-widest text-amber-300">
					Head of Office // Municipal Market Administration
				</span>
				<h3 class="text-xl sm:text-2xl font-black text-white">
					{charter.head_of_office.name}
				</h3>
				<p class="text-xs text-blue-200">
					{charter.head_of_office.position} • {charter.head_of_office.office}
				</p>
				<p class="text-xs text-slate-300 pt-2 leading-relaxed">
					{charter.feedback}
				</p>
			</div>

			<div class="flex flex-col sm:flex-row gap-3">
				<a
					href="/citizens-charter/business-permit"
					class="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-black uppercase tracking-wider text-blue-950 shadow-md hover:bg-slate-100 transition-colors"
				>
					<span>BPLO Citizen's Charter ↗</span>
				</a>
				<a
					href="/Departments/Market"
					class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-xs font-black uppercase tracking-wider text-blue-950 shadow-md hover:bg-amber-300 transition-colors"
				>
					<span>Market Department Page</span>
				</a>
			</div>
		</div>
	</div>
</div>
