<script>
	import { fly, fade } from 'svelte/transition';

	let activeStrategicTab = $state('both'); // 'both' | 'vision' | 'mission'
	let selectedService = $state('all'); // 'all' | service.id

	let charter = {
		title: "CITIZEN'S CHARTER — General Services Office (GSO)",
		office: 'General Services Office, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
		head_of_office: {
			name: 'Eugenio C. Ramos, Jr.',
			position: 'GSO Operation Manager',
			office: 'General Services Office, Ground Floor, Tanauan Municipal Hall, Leyte'
		},
		focal_person: {
			name: 'Honeyline Soyosa',
			position: 'Focal Person / GSO Staff',
			office: 'General Services Office, Tanauan Municipal Hall'
		},
		vision:
			'Effective, efficient and sustainable operation of programs, projects and activities, with competent manpower and responsive to the needs of the clients with the right quality of service to support the vision of the Municipality.',
		mission:
			'To establish a reliable office, empowered by efficient and committed employees driven by transparency, accountability and good governance in the pursuit of its goals and objectives as provided for by the law in line with the supply and property management, maintenance of bldg. and grounds, electrical, plumbing. IT and electronic equipment, light vehicles and heavy equipment and other services.',
		services: [
			{
				id: 'equipment-borrowing',
				number: 'Service Offered 1',
				title: 'Borrowing of Equipment (Tents, Chairs, Sound System)',
				shortTitle: 'Equipment Borrowing',
				service_description:
					'Official public assistance process for individuals, civic organizations, barangays, and offices requesting to borrow municipal government equipment, including tents, tables, chairs, and sound systems for sanctioned events and activities.',
				office_division: 'General Services Office (GSO)',
				classification: 'Simple',
				transaction_type: 'Government-to-Citizens (G2C), Government-to-Government (G2G)',
				who_may_avail: [
					'Tanauan Residents & Community Groups',
					'Barangay Officials & Councils',
					'Civic & Religious Organizations',
					'Public & Private Schools in Tanauan',
					'Municipal Offices & Partner Agencies'
				],
				total_processing_time: '15 – 25 minutes (subject to equipment availability)',
				total_fee: 'None (Free for public/community service)',
				equipment_covered: ['Tents', 'Tables & Chairs', 'Sound System Units'],
				downloadable_form: {
					title: "Official Borrower & Return Slip Form",
					url: 'https://drive.google.com/file/d/1fS19TSJvtyiP4jMTnBwMYi1GSD8glY8G/view?usp=drive_link',
					description: 'Download the official printable GSO form for equipment borrowing applications and return inspection clearance.'
				},
				checklist_of_requirements: [
					{
						item: '1',
						requirement: 'Letter of Request detailing specific equipment, date, time, and venue',
						condition: 'Mandatory',
						source: 'Client / Requesting Party'
					},
					{
						item: '2',
						requirement: 'Valid Government-issued ID of the authorized requester / borrower',
						condition: 'Mandatory',
						source: 'Client (Driver’s License, PhilID, Voter’s ID, etc.)'
					},
					{
						item: '3',
						requirement: 'Accomplished GSO Borrower’s Slip',
						condition: 'Mandatory (upon availability confirmation)',
						source: 'General Services Office (GSO)',
						downloadUrl: 'https://drive.google.com/file/d/1fS19TSJvtyiP4jMTnBwMYi1GSD8glY8G/view?usp=drive_link'
					},
					{
						item: '4',
						requirement: 'Accomplished GSO Return Slip',
						condition: 'Upon return of equipment',
						source: 'General Services Office (GSO)',
						downloadUrl: 'https://drive.google.com/file/d/1fS19TSJvtyiP4jMTnBwMYi1GSD8glY8G/view?usp=drive_link'
					}
				],
				process_steps: [
					{
						step: 1,
						client_action: 'Submits Letter of Request detailing equipment, date, time, and venue.',
						agency_action: 'Receive letter, log in the incoming request registry, and check calendar schedule.',
						fees: 'None',
						processing_time: '5 minutes',
						responsible_personnel: 'Honeyline Soyosa (Focal Person / GSO Staff)'
					},
					{
						step: 2,
						client_action: 'Bring the approved letter request to the GSO Office for verification of availability of Tents and equipment.',
						agency_action: 'Verify physical inventory and calendar availability of requested tents, chairs, or sound system.',
						fees: 'None',
						processing_time: '5 minutes',
						responsible_personnel: 'GSO Property Custodian / Operations Staff'
					},
					{
						step: 3,
						client_action: 'If the equipment is available, fill out the Borrower’s Slip with full borrower details.',
						agency_action: 'Provide Borrower’s Slip, review condition of equipment, and log issuance in the property dispatch ledger.',
						fees: 'None',
						processing_time: '5 minutes',
						responsible_personnel: 'Honeyline Soyosa / GSO Operations Personnel'
					},
					{
						step: 4,
						client_action: 'Upon returning the equipment, fill out the Return Slip and submit equipment for inspection.',
						agency_action: 'Inspect returned items for completeness and physical condition; sign and issue copy of Return Slip.',
						fees: 'None',
						processing_time: '10 minutes',
						responsible_personnel: 'GSO Property Custodian / Eugenio C. Ramos, Jr. (GSO Operation Manager)'
					}
				],
				note: 'In case of a lost or damaged Sound System, Tables and Chairs, the borrower/requesting party must replace or pay for the lost/damaged item/ s upon return.'
			},
			{
				id: 'venue-request',
				number: 'Service 2',
				title: 'Venue Request (Tanauan Amphitheater, Municipal and Presedencia Lobby, Tanauan Civic Center)',
				shortTitle: 'Venue Request & Reservation',
				service_description:
					'Official reservation and coordination process for utilizing major municipal public facilities and civic event venues in Tanauan, Leyte.',
				office_division: 'General Services Office (GSO) / Office of the Mayor',
				classification: 'Complex',
				transaction_type: 'Government-to-Citizens (G2C), Government-to-Business (G2B), G2G',
				who_may_avail: [
					'Tanauan Citizens & Community Organizations',
					'Non-Government Organizations (NGOs)',
					'Government Agencies & Local Offices',
					'Private Entities & Commercial Event Organizers'
				],
				total_processing_time: '1 to 2 working days (subject to Mayor approval & calendar slot)',
				total_fee: 'Free for official/public civic use; rental fees apply if required for private/commercial use pursuant to Municipal Tax Ordinance',
				venues_covered: [
					'Tanauan Amphitheater',
					'Municipal Lobby & Presedencia Lobby',
					'Tanauan Civic Center'
				],
				checklist_of_requirements: [
					{
						item: '1',
						requirement: 'Formal Letter of Request detailing activity purpose, date, time, expected attendees, and venue requested',
						condition: 'Mandatory',
						source: 'Client / Event Organizer'
					},
					{
						item: '2',
						requirement: 'Official Approval / Endorsement from the Office of the Municipal Mayor (Local Chief Executive)',
						condition: 'Mandatory',
						source: 'Office of the Mayor'
					},
					{
						item: '3',
						requirement: 'Official Receipt (OR) for rental/facility fee (if required for private/commercial use)',
						condition: 'If applicable',
						source: "Municipal Treasurer's Office (MTO)"
					},
					{
						item: '4',
						requirement: 'Venue Clearance & Electrical/Sound Request Slip',
						condition: 'Mandatory',
						source: 'General Services Office (GSO)'
					}
				],
				process_steps: [
					{
						step: 1,
						client_action: 'Submits Letter of Request detailing date, time, and venue.',
						agency_action: 'Provide initial calendar checking and guidance on Mayor endorsement.',
						fees: 'None',
						processing_time: '5 minutes',
						responsible_personnel: 'Honeyline Soyosa (Focal Person / GSO Staff)'
					},
					{
						step: 2,
						client_action: 'Personally furnish a copy to the Office of the Mayor for approval of LCE (Local Chief Executive).',
						agency_action: 'Office of the Mayor reviews request and issues executive approval/endorsement.',
						fees: 'None',
						processing_time: '1 to 2 working days',
						responsible_personnel: "Office of the Municipal Mayor / Executive Secretary"
					},
					{
						step: 3,
						client_action: 'Present approved request letter to GSO for facility/equipment scheduling.',
						agency_action: 'Officially book slot in the Tanauan Civic Venues master calendar and assign maintenance/sound staff.',
						fees: 'None',
						processing_time: '10 minutes',
						responsible_personnel: 'Eugenio C. Ramos, Jr. (GSO Operation Manager)'
					},
					{
						step: 4,
						client_action: 'Pay rental/facility fees (if required for private/commercial use) at the Treasury and present Official Receipt to GSO.',
						agency_action: 'Verify Official Receipt, confirm facility preparation, and issue Final Venue Clearance.',
						fees: 'Per Municipal Revenue Code (if commercial)',
						processing_time: '10 minutes',
						responsible_personnel: "Municipal Treasurer's Office / GSO Staff"
					}
				],
				note: 'Approval from the Local Chief Executive (Municipal Mayor) is required before a venue date can be locked into the official calendar.'
			}
		]
	};

	const displayedServices = $derived(
		selectedService === 'all'
			? charter.services
			: charter.services.filter((s) => s.id === selectedService)
	);

	function printCharter() {
		window.print();
	}
</script>

<svelte:head>
	<title>Citizen's Charter — General Services Office (GSO) | Tanauan, Leyte</title>
	<meta
		name="description"
		content="Official Citizen's Charter of the General Services Office (GSO) of Tanauan, Leyte. Requirements and step-by-step procedures for Borrowing of Equipment and Civic Venue Requests."
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
				<div
					class="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/15 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-amber-300"
				>
					<span class="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
					Republic of the Philippines • Province of Leyte
				</div>

				<h1 class="text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
					General Services Office (GSO)
				</h1>
				<p class="text-sm font-bold uppercase tracking-widest text-amber-300 sm:text-base">
					Citizen's Charter // Frontline Services Guide
				</p>
				<p class="text-xs text-blue-200 sm:text-sm leading-relaxed max-w-2xl font-medium">
					{charter.mission}
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-3">
				<a
					href="/Departments/GSO"
					class="inline-flex items-center gap-2 rounded-xl border border-blue-700 bg-blue-900/60 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:bg-blue-800"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					<span>GSO Department Page</span>
				</a>
				<button
					type="button"
					onclick={printCharter}
					class="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-blue-950 shadow-md transition-all hover:scale-105 hover:bg-amber-300 active:scale-95"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
						/>
					</svg>
					<span>Print Charter</span>
				</button>
			</div>
		</div>

		<!-- Quick Metric Badges -->
		<div class="mt-8 grid grid-cols-2 gap-3 border-t border-blue-900/70 pt-6 sm:grid-cols-4 sm:gap-4">
			<div class="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
				<span class="text-[10px] font-black uppercase tracking-wider text-blue-300 block"
					>Charter Scope</span
				>
				<span class="text-sm sm:text-base font-black text-white">2 Frontline Services</span>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
				<span class="text-[10px] font-black uppercase tracking-wider text-blue-300 block"
					>Classification</span
				>
				<span class="text-sm sm:text-base font-black text-amber-300">Simple & Complex</span>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
				<span class="text-[10px] font-black uppercase tracking-wider text-blue-300 block"
					>Equipment Loaning</span
				>
				<span class="text-xs sm:text-sm font-black text-emerald-400 leading-tight block mt-0.5">15 – 25 minutes</span>
			</div>
			<div class="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs">
				<span class="text-[10px] font-black uppercase tracking-wider text-blue-300 block"
					>Public Civic Use</span
				>
				<span class="text-xs sm:text-sm font-black text-amber-300 leading-tight block mt-0.5">Free / Standard</span>
			</div>
		</div>
	</div>

	<!-- Vision & Mission Filter Controls -->
	<div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
		<div class="flex items-center gap-2">
			<span class="text-xs font-black uppercase tracking-wider text-slate-500">View Statement:</span>
			<div class="inline-flex rounded-2xl border-2 border-slate-200 bg-slate-100 p-1 shadow-2xs">
				<button
					type="button"
					onclick={() => (activeStrategicTab = 'both')}
					class="rounded-xl px-3.5 py-1.5 text-xs font-black transition-all {activeStrategicTab === 'both'
						? 'bg-blue-950 text-white shadow-sm'
						: 'text-slate-600 hover:text-blue-950'}"
				>
					Show Both
				</button>
				<button
					type="button"
					onclick={() => (activeStrategicTab = 'vision')}
					class="rounded-xl px-3.5 py-1.5 text-xs font-black transition-all {activeStrategicTab === 'vision'
						? 'bg-amber-400 text-blue-950 shadow-sm'
						: 'text-slate-600 hover:text-blue-950'}"
				>
					👁 Vision Only
				</button>
				<button
					type="button"
					onclick={() => (activeStrategicTab = 'mission')}
					class="rounded-xl px-3.5 py-1.5 text-xs font-black transition-all {activeStrategicTab === 'mission'
						? 'bg-blue-900 text-white shadow-sm'
						: 'text-slate-600 hover:text-blue-950'}"
				>
					🎯 Mission Only
				</button>
			</div>
		</div>

		{#if activeStrategicTab !== 'both'}
			<button
				type="button"
				onclick={() => (activeStrategicTab = 'both')}
				class="text-xs font-bold text-blue-900 hover:underline"
			>
				← View Both Statements
			</button>
		{/if}
	</div>

	<!-- Vision & Mission Animated Cards -->
	<div class="{activeStrategicTab === 'both' ? 'grid gap-6 md:grid-cols-2' : 'max-w-4xl mx-auto w-full'}">
		<!-- Vision -->
		{#if activeStrategicTab === 'both' || activeStrategicTab === 'vision'}
			<div
				in:fly={{ y: 20, duration: 350 }}
				out:fade={{ duration: 150 }}
				class="rounded-3xl border-2 border-slate-200 border-t-4 border-t-amber-500 bg-white p-6 sm:p-7 shadow-sm transition-all"
			>
				<div class="mb-3 flex items-center justify-between">
					<button
						type="button"
						onclick={() => (activeStrategicTab = activeStrategicTab === 'vision' ? 'both' : 'vision')}
						class="text-xs font-black tracking-wider text-amber-700 uppercase hover:underline"
					>
						OUR VISION
					</button>
					<button
						type="button"
						onclick={() => (activeStrategicTab = activeStrategicTab === 'vision' ? 'both' : 'vision')}
						class="rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-900 border border-amber-200 hover:bg-amber-100"
					>
						{activeStrategicTab === 'vision' ? 'Active Focus ✓' : 'Click to Focus'}
					</button>
				</div>
				<p class="text-sm leading-relaxed font-semibold text-slate-800 sm:text-base">
					"{charter.vision}"
				</p>
			</div>
		{/if}

		<!-- Mission -->
		{#if activeStrategicTab === 'both' || activeStrategicTab === 'mission'}
			<div
				in:fly={{ y: 20, duration: 350 }}
				out:fade={{ duration: 150 }}
				class="rounded-3xl border-2 border-slate-200 border-t-4 border-t-blue-900 bg-white p-6 sm:p-7 shadow-sm transition-all"
			>
				<div class="mb-3 flex items-center justify-between">
					<button
						type="button"
						onclick={() => (activeStrategicTab = activeStrategicTab === 'mission' ? 'both' : 'mission')}
						class="text-xs font-black tracking-wider text-blue-900 uppercase hover:underline"
					>
						OUR MISSION
					</button>
					<button
						type="button"
						onclick={() => (activeStrategicTab = activeStrategicTab === 'mission' ? 'both' : 'mission')}
						class="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-950 border border-blue-200 hover:bg-blue-100"
					>
						{activeStrategicTab === 'mission' ? 'Active Focus ✓' : 'Click to Focus'}
					</button>
				</div>
				<p class="text-xs leading-relaxed font-medium text-slate-700 sm:text-sm">
					{charter.mission}
				</p>
			</div>
		{/if}
	</div>

	<!-- Service Navigation Filter -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4">
		<div>
			<h2 class="text-xl font-black text-blue-950 sm:text-2xl">
				Official Frontline Public Services
			</h2>
			<p class="text-xs text-slate-600">
				Select a service below to isolate its procedures, or view both together
			</p>
		</div>

		<div class="flex flex-wrap items-center gap-2">
			<button
				type="button"
				onclick={() => (selectedService = 'all')}
				class="rounded-xl px-3.5 py-2 text-xs font-black transition-all {selectedService === 'all'
					? 'bg-blue-950 text-white shadow-sm'
					: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}"
			>
				All Services ({charter.services.length})
			</button>
			{#each charter.services as s}
				<button
					type="button"
					onclick={() => (selectedService = selectedService === s.id ? 'all' : s.id)}
					class="rounded-xl px-3.5 py-2 text-xs font-black transition-all {selectedService === s.id
						? 'bg-amber-400 text-blue-950 shadow-sm'
						: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}"
				>
					{s.shortTitle}
				</button>
			{/each}
		</div>
	</div>

	<!-- Service Details Cards (Animated) -->
	<div class="{displayedServices.length === 1 ? 'max-w-4xl mx-auto w-full' : 'space-y-10'}">
		{#each displayedServices as service (service.id)}
			<div
				id={service.id}
				in:fly={{ y: 20, duration: 350 }}
				out:fade={{ duration: 150 }}
				class="scroll-mt-24 rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-slate-300"
			>
				<div class="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
					<div>
						<button
							type="button"
							onclick={() => (selectedService = selectedService === service.id ? 'all' : service.id)}
							class="mb-2 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black text-blue-950 uppercase hover:bg-blue-100 transition-colors"
							title="Click to focus on this service only"
						>
							<span class="h-2 w-2 rounded-full bg-amber-500"></span>
							{service.number}
						</button>
						<h3 class="text-xl font-black text-blue-950 sm:text-2xl">
							{service.title}
						</h3>
						<p class="mt-2 text-sm leading-relaxed text-slate-700 max-w-3xl">
							{service.service_description}
						</p>
					</div>

					<div class="flex items-center gap-2">
						<button
							type="button"
							onclick={() => (selectedService = selectedService === service.id ? 'all' : service.id)}
							class="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-blue-950 hover:bg-white transition-colors"
						>
							{selectedService === service.id ? 'Showing Only This ✓' : 'Click to View Only This'}
						</button>
					</div>

					<!-- Tags for equipment or venues -->
					<div>
						{#if service.equipment_covered}
							<div class="flex flex-wrap gap-1.5">
								{#each service.equipment_covered as eq}
									<span
										class="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-800"
									>
										✓ {eq}
									</span>
								{/each}
							</div>
						{:else if service.venues_covered}
							<div class="flex flex-wrap gap-1.5">
								{#each service.venues_covered as v}
									<span
										class="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-800"
									>
										🏛 {v}
									</span>
								{/each}
							</div>
						{/if}
					</div>
				</div>

				<!-- Service Summary Ribbon -->
				<div class="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
					<div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
						<span class="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Classification</span>
						<span class="text-sm font-black text-blue-950">{service.classification}</span>
					</div>
					<div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
						<span class="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Transaction Type</span>
						<span class="text-sm font-black text-slate-900">{service.transaction_type}</span>
					</div>
					<div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
						<span class="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Processing Time</span>
						<span class="text-xs sm:text-sm font-black text-emerald-700 leading-tight block mt-0.5">{service.total_processing_time}</span>
					</div>
					<div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
						<span class="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Government Fee</span>
						<span class="text-xs sm:text-sm font-black text-amber-800 leading-tight block mt-0.5">{service.total_fee}</span>
					</div>
				</div>

				<!-- Who May Avail -->
				<div class="mb-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
					<span class="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
						Who May Avail
					</span>
					<div class="flex flex-wrap gap-2">
						{#each service.who_may_avail as who}
							<span
								class="rounded-lg border border-blue-200 bg-white px-3 py-1 text-xs font-bold text-blue-950 shadow-2xs"
							>
								• {who}
							</span>
						{/each}
					</div>
				</div>

				<!-- Downloadable Form Banner (When available) -->
				{#if service.downloadable_form}
					<div
						class="mb-8 rounded-3xl border-2 border-emerald-300 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/60 p-6 shadow-sm"
					>
						<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
							<div class="flex items-start gap-4">
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
											class="inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-900 border border-emerald-200"
										>
											Official Downloadable Form
										</span>
										<span class="text-xs font-bold text-slate-500">Google Drive Document</span>
									</div>
									<h4 class="text-base sm:text-lg font-black text-slate-900">
										{service.downloadable_form.title}
									</h4>
									<p class="mt-0.5 text-xs sm:text-sm font-medium text-slate-600">
										{service.downloadable_form.description}
									</p>
								</div>
							</div>

							<a
								href={service.downloadable_form.url}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-black text-white shadow-md transition-all hover:bg-emerald-700 hover:scale-105 active:scale-95"
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

				<!-- Checklist of Requirements -->
				<div class="mb-8">
					<div class="mb-4 flex items-center justify-between">
						<h4 class="text-base font-black text-blue-950">
							Checklist of Requirements
						</h4>
						<span class="text-xs text-slate-500">All submissions subject to verification</span>
					</div>

					<div class="overflow-hidden rounded-2xl border-2 border-slate-200">
						<table class="w-full text-left text-xs sm:text-sm">
							<thead class="bg-blue-950 text-white text-[11px] uppercase tracking-wider">
								<tr>
									<th class="p-3.5 font-black sm:w-16">Item</th>
									<th class="p-3.5 font-black">Requirement</th>
									<th class="p-3.5 font-black">Condition</th>
									<th class="p-3.5 font-black">Where to Secure</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-slate-200 bg-white">
								{#each service.checklist_of_requirements as req}
									<tr class="hover:bg-slate-50 transition-colors">
										<td class="p-3.5 font-mono font-bold text-blue-900">{req.item}</td>
										<td class="p-3.5 font-bold text-slate-900">
											<div class="flex flex-wrap items-center gap-2">
												<span>{req.requirement}</span>
												{#if req.downloadUrl}
													<a
														href={req.downloadUrl}
														target="_blank"
														rel="noopener noreferrer"
														class="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-black text-emerald-900 border border-emerald-300 hover:bg-emerald-200 transition-colors"
													>
														<span>📥 Download Form</span>
														<span>↗</span>
													</a>
												{/if}
											</div>
										</td>
										<td class="p-3.5">
											<span
												class="rounded px-2 py-0.5 text-xs font-black {req.condition === 'Mandatory'
													? 'bg-amber-100 text-amber-950'
													: 'bg-slate-100 text-slate-700'}"
											>
												{req.condition}
											</span>
										</td>
										<td class="p-3.5 text-slate-600">{req.source}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>

				<!-- Step-by-Step Procedure Table -->
				<div class="mb-8">
					<div class="mb-4 flex items-center justify-between">
						<h4 class="text-base font-black text-blue-950">
							Step-by-Step Processing Flow
						</h4>
						<span class="text-xs font-bold text-emerald-700">Follow steps in sequence</span>
					</div>

					<div class="space-y-3">
						{#each service.process_steps as step}
							<div
								class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-blue-900 hover:bg-white hover:shadow-xs"
							>
								<div class="flex items-start gap-3.5 max-w-2xl">
									<span
										class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-950 text-xs font-black text-amber-300 shadow-xs"
									>
										{step.step}
									</span>
									<div>
										<div class="text-xs font-bold text-slate-500 uppercase tracking-wide">Client Action</div>
										<div class="text-sm font-black text-slate-900 leading-snug">
											{step.client_action}
										</div>
										<div class="mt-2 text-xs font-medium text-slate-600 border-l-2 border-amber-400 pl-2">
											<span class="font-bold text-blue-950">Agency Action:</span> {step.agency_action}
										</div>
									</div>
								</div>

								<div class="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 shrink-0 text-right text-xs border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
									<span class="rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-800 border border-emerald-200">
										⏱ {step.processing_time}
									</span>
									<span class="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-700 border border-slate-200">
										Fee: {step.fees}
									</span>
									<span class="text-[11px] font-bold text-blue-900">
										{step.responsible_personnel}
									</span>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Important Accountability Note -->
				{#if service.note}
					<div class="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-5 text-sm text-amber-950 shadow-2xs">
						<div class="mb-1.5 flex items-center gap-2 font-black uppercase text-amber-900">
							<svg class="h-5 w-5 shrink-0 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>Official Municipal Policy Note</span>
						</div>
						<p class="font-medium italic text-slate-800 leading-relaxed">
							{service.note}
						</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Signatories Card -->
	<div class="rounded-3xl border-2 border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm">
		<div class="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
			<div class="flex items-center gap-2">
				<span class="h-2.5 w-2.5 rounded-full bg-blue-900"></span>
				<span class="text-xs font-black tracking-wider text-blue-950 uppercase">
					Official Administrative Control & Signatories
				</span>
			</div>
			<span class="rounded bg-slate-200/80 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700 uppercase">
				GSO Document Control
			</span>
		</div>

		<div class="grid gap-6 sm:grid-cols-2">
			<!-- Prepared By -->
			<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
				<span class="mb-2 block text-[11px] font-black tracking-wider text-slate-500 uppercase">
					PREPARED BY:
				</span>
				<div class="text-lg font-black text-blue-950 underline decoration-amber-400 decoration-2 underline-offset-4">
					{charter.focal_person.name}
				</div>
				<div class="mt-1 text-xs font-extrabold text-slate-700">
					{charter.focal_person.position}
				</div>
				<span class="mt-2 inline-block rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-900">
					Focal Person / GSO Staff
				</span>
			</div>

			<!-- Reviewed By -->
			<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
				<span class="mb-2 block text-[11px] font-black tracking-wider text-slate-500 uppercase">
					REVIEWED BY:
				</span>
				<div class="text-lg font-black text-blue-950 underline decoration-amber-400 decoration-2 underline-offset-4">
					{charter.head_of_office.name}
				</div>
				<div class="mt-1 text-xs font-extrabold text-slate-700">
					{charter.head_of_office.position}
				</div>
				<span class="mt-2 inline-block rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-900">
					GSO Operation Manager
				</span>
			</div>
		</div>
	</div>
</div>
