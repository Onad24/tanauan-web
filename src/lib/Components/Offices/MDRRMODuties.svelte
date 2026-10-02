<script>
	import { fade, slide } from 'svelte/transition';

	// =========================================================================
	// OFFICIAL MDRRMO FRONTLINE PUBLIC SERVICES & STEP-BY-STEP GUIDES
	// (Extracted verbatim from Official Tanauan MDRRMO Service Guides)
	// =========================================================================

	const servicesData = [
		{
			id: 'emergency-response',
			index: '01',
			code: 'EMERG-RESP',
			title: 'EMERGENCY RESPONSE SERVICES',
			shortTitle: 'Emergency Response',
			category: '24/7 Critical Emergency',
			badge: 'Immediate Dispatch',
			slogan: 'WE RESPOND. WE SAVE LIVES. THINK SAFE • SAVE LIVES.',
			accentColor: 'from-red-600 to-rose-700',
			badgeBg: 'bg-red-600 text-white border-red-500',
			icon: '🚨',
			pdfUrl: '/docs/mdrrmo/emergency-response-and-medical-transport.pdf',
			previewImg: '/docs/mdrrmo/emergency-response-preview.png',
			fileSize: '821 KB',
			overview:
				'24/7 on-scene emergency rescue, basic life support, patient trauma triage, and rapid ambulance transport to the nearest hospital facility by the Tanauan Emergency Response Team (TERT).',
			contacts: {
				hotline: '0916-197-7360 / 0931-739-3333',
				radio: '167.600 MHz',
				location: 'MDRRMO Office, Tanauan Municipal Hall, 888 Real St., Tanauan, Leyte',
				facebook: 'MDRRMO-TANAUAN LEYTE'
			},
			steps: [
				{
					num: '01',
					title: 'CONTACT OFFICIAL CHANNELS',
					subtitle: 'Hotline, Radio or In-Person',
					desc: 'Immediately report the emergency through any of the following official channels: Hotline Numbers (0916-197-7360 / 0931-739-3333), Base Radio Frequency (167.600 MHz), or in-person at the MDRRMO Office.',
					tag: 'Step 1'
				},
				{
					num: '02',
					title: 'PROVIDE INCIDENT DETAILS',
					subtitle: 'Exact Location & Conditions',
					desc: 'State the type of assistance required and clearly report the critical details: exact location and nature of the incident, number of individuals involved and scene conditions, and your name and contact information.',
					tag: 'Step 2'
				},
				{
					num: '03',
					title: 'ON-SCENE RESCUE & MEDICAL ASSESSMENT',
					subtitle: 'First-Aid & Extraction',
					desc: 'Upon arrival, responders provide emergency first-aid or basic life support (BLS) to victims and extract individuals from hazardous situations.',
					tag: 'Step 3'
				},
				{
					num: '04',
					title: 'PATIENT TRANSPORT & TURNOVER',
					subtitle: 'Ambulance Transit to Hospital',
					desc: 'If further medical care is required, the Tanauan Emergency Response Team (TERT) transports victims safely in an Emergency Response Vehicle to the nearest hospital or health facility and turns them over to medical staff.',
					tag: 'Step 4'
				},
				{
					num: '05',
					title: 'INCIDENT LOGGING & REPORT COMPLETION',
					subtitle: 'Documentation & Case Closing',
					desc: 'Once response operations conclude, the responding team logs the incident details and actions taken for official record-keeping, case tracking, and municipal data monitoring.',
					tag: 'Step 5'
				}
			],
			notes: [
				'Always stay calm when reporting an emergency and provide landmarks for faster ambulance navigation.',
				'Emergency response vehicles are equipped with Basic Life Support (BLS) medical kits and automated external defibrillators (AED).'
			]
		},
		{
			id: 'medical-transport',
			index: '02',
			code: 'MED-TRANSPORT',
			title: 'NON-EMERGENCY MEDICAL TRANSPORT SUPPORT SERVICES',
			shortTitle: 'Non-Emergency Medical Transport',
			category: 'Medical Support',
			badge: 'Scheduled Service',
			slogan: 'YOUR HEALTH. OUR MISSION. SAFE TRANSPORT, COMPASSIONATE CARE.',
			accentColor: 'from-blue-600 to-indigo-700',
			badgeBg: 'bg-blue-600 text-white border-blue-500',
			icon: '🚑',
			pdfUrl: '/docs/mdrrmo/emergency-response-and-medical-transport.pdf',
			previewImg: '/docs/mdrrmo/medical-transport-preview.jpg',
			fileSize: '821 KB',
			overview:
				'Scheduled compassionate patient transport for medical referrals, hospital check-ups, chemotherapy, dialysis, post-treatment discharges, and specialized healthcare mobility for Tanauan residents.',
			contacts: {
				hotline: '0916-197-7360 / 0931-739-3333',
				radio: '167.600 MHz',
				location: 'MDRRMO Office, Tanauan, Leyte',
				facebook: 'MDRRMO-TANAUAN LEYTE'
			},
			steps: [
				{
					num: '01',
					title: 'IN-PERSON SUBMISSION OF APPROVED REQUEST',
					subtitle: 'Mayor Approval & Early Filing',
					desc: 'Write a request letter addressed to the Local Chief Executive (Hon. Ma. Gina E. Merilo) thru: Ricardo Alejo N. Mazo - MDRRMO and secure official approval. Personally submit the approved request letter, including the applicant’s contact number/s, to the MDRRMO Office. (Note: Please submit at least 24–48 hours before the needed date to ensure vehicle availability).',
					tag: 'Step 1'
				},
				{
					num: '02',
					title: 'VERIFICATION & SCHEDULING',
					subtitle: 'Crew Assignment & Confirmation',
					desc: 'MDRRMO personnel verify the approved letter. Staff check vehicle and crew availability, assign a unit, and confirm the schedule. The assigned transport vehicle and crew arrive at your location at the scheduled time.',
					tag: 'Step 2'
				},
				{
					num: '03',
					title: 'TRANSPORT & PATIENT TURNOVER',
					subtitle: 'Safe Journey & Healthcare Handover',
					desc: 'The crew safely assists the patient into the vehicle and monitors them throughout the journey. Upon arrival at the receiving health facility or residence, responders complete the safe turnover to family members or medical staff.',
					tag: 'Step 3'
				},
				{
					num: '04',
					title: 'SIGN-OFF & LOG COMPLETION',
					subtitle: 'Transport Logbook Recording',
					desc: 'Responders record the complete details of the journey, mileage, and patient status in the official transport logbook.',
					tag: 'Step 4'
				}
			],
			notes: [
				'Submit requests at least 24 to 48 hours before the scheduled medical appointment to secure vehicle allocation.',
				'One or two immediate family members or caregivers may accompany the patient during the transport.'
			]
		},
		{
			id: 'community-services',
			index: '03',
			code: 'COMM-SERVICES',
			title: 'COMMUNITY SERVICES SUPPORT',
			shortTitle: 'Community Services Support',
			category: 'Logistics & Community Support',
			badge: 'Civic Mobility',
			slogan: 'TOGETHER WE SERVE: SAFER COMMUNITIES, STRONGER COMMUNITIES, RESILIENT TANAUAN.',
			accentColor: 'from-amber-600 to-orange-600',
			badgeBg: 'bg-amber-600 text-white border-amber-500',
			icon: '🚐',
			pdfUrl: '/docs/mdrrmo/community-services-support.pdf',
			previewImg: '/docs/mdrrmo/community-services-preview.jpg',
			fileSize: '445 KB',
			overview:
				'Municipal vehicle deployment and logistical transport support for burial assistance, community outreach, school activity logistics, and special municipal public services.',
			contacts: {
				hotline: '0916-197-7360 / 0931-739-3333',
				location: 'MDRRMO Office, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
				facebook: 'MDRRMO-TANAUAN LEYTE'
			},
			steps: [
				{
					num: '01',
					title: 'IN-PERSON SUBMISSION OF APPROVED REQUEST',
					subtitle: 'Mayor Endorsement & Details',
					desc: 'Write a request letter addressed to the Local Chief Executive (Hon. Ma. Gina E. Merilo) thru: Ricardo Alejo N. Mazo - MDRRMO specifying the exact service needed (e.g., burial vehicle transport, school activity logistics). Secure official approval from the Mayor’s Office. Personally submit the approved request letter, including contact numbers, to the MDRRMO Office. (Note: Please submit at least 24–48 hours before the needed date to ensure vehicle availability).',
					tag: 'Step 1'
				},
				{
					num: '02',
					title: 'REVIEW & SCHEDULE COORDINATION',
					subtitle: 'Driver & Fleet Assignment',
					desc: 'MDRRMO personnel verify the approved letter and supporting documents. Staff check vehicle and driver availability, assign the unit, and confirm the scheduled date and pick-up time directly with you.',
					tag: 'Step 2'
				},
				{
					num: '03',
					title: 'SERVICE DEPLOYMENT & TRANSPORT',
					subtitle: 'On-Time Pick-Up & Safety',
					desc: 'The assigned vehicle and personnel arrive at the designated pick-up location at the scheduled time. Responders ensure safe boarding/loading and maintain safety protocols throughout the travel or activity.',
					tag: 'Step 3'
				},
				{
					num: '04',
					title: 'COMPLETION & SIGN-OFF',
					subtitle: 'Trip Logbook Recording',
					desc: 'Upon safely returning or completing the activity, the driver and crew record the details in the official trip logbook.',
					tag: 'Step 4'
				}
			],
			notes: [
				'Ensure request letters specify the exact departure time, pick-up point, destination, and estimated number of passengers.',
				'Submit at least 24–48 hours in advance to guarantee vehicle inspection and fuel readiness.'
			]
		},
		{
			id: 'evacuation-support',
			index: '04',
			code: 'EVAC-SUPPORT',
			title: 'EVACUATION SUPPORT SERVICES',
			shortTitle: 'Evacuation Support',
			category: 'Disaster Evacuation',
			badge: 'Calamity Transport',
			slogan: 'DISASTER-READY TANAUAN. PROMPT EVACUATION, SAFE SHELTER.',
			accentColor: 'from-emerald-600 to-teal-700',
			badgeBg: 'bg-emerald-600 text-white border-emerald-500',
			icon: '🛡️',
			pdfUrl: '/docs/mdrrmo/evacuation-support-services.pdf',
			previewImg: '/docs/mdrrmo/evacuation-support-preview.jpg',
			fileSize: '306 KB',
			overview:
				'Coordinated emergency and pre-emptive evacuation transport during typhoons, floods, and natural hazards in close partnership with the Municipal Social Welfare and Development Office (MSWDO) and Barangay Officials.',
			contacts: {
				generalInfo: 'Ms. Arleen B. Cinco (MSWDO Staff) at 0995-005-8959 / 093-797-3330',
				hotline: '0916-197-7360 / 0931-739-3333',
				radio: '167.600 MHz',
				location: 'MDRRMO Office & MSWDO Desk'
			},
			steps: [
				{
					num: '01',
					title: 'REQUEST EVACUATION SUPPORT',
					subtitle: 'MSWDO & MDRRMO Intake',
					desc: 'Coordinate with Ms. Arleen B. Cinco, MSWDO Staff, at 0995-005-8959, to request evacuation support transportation. Provide the location of affected persons, number of persons requiring evacuation, and any special needs (elderly, infants, PWDs). MSWDO coordinates with MDRRMO through hotlines (0916-197-7360 / 0931-739-3333), Base Radio (167.600 MHz), or in-person.',
					tag: 'Step 1'
				},
				{
					num: '02',
					title: 'ASSESSMENT OF THE SITUATION',
					subtitle: 'MDRRMO Validation & Fleet Sizing',
					desc: 'The MDRRMO assesses and validates the reported situation, evaluates hazard risks (flood depth, storm surge advisory), and determines the appropriate evacuation vehicles and rescue personnel to dispatch.',
					tag: 'Step 2'
				},
				{
					num: '03',
					title: 'COORDINATION AND NOTIFICATION',
					subtitle: 'Barangay Pick-Up Point Staging',
					desc: 'The MDRRMO coordinates with concerned Barangay Officials. The Barangay Officials identify and assign appropriate safe pick-up and drop-off points and provide clear instructions to the affected residents.',
					tag: 'Step 3'
				},
				{
					num: '04',
					title: 'EVACUATION ASSISTANCE & SHELTER TURNOVER',
					subtitle: 'Safe Evacuation Center Transit',
					desc: 'Affected residents are assisted and safely transported from the designated pick-up point to the designated municipal or barangay evacuation center equipped with relief provisions and medical teams.',
					tag: 'Step 4'
				}
			],
			notes: [
				'Priority evacuation is given to vulnerable sectors: pregnant women, children, elderly, and persons with disabilities.',
				'For imminent calamity emergencies, immediately contact both your Barangay Captain/BDRRMC and the MDRRMO hotlines.'
			]
		},
		{
			id: 'incident-certification',
			index: '05',
			code: 'INCIDENT-CERT',
			title: 'ISSUANCE OF DISASTER INCIDENT CERTIFICATION',
			shortTitle: 'Disaster Incident Certification',
			category: 'Administrative Certification',
			badge: 'Legal & Calamity Record',
			slogan: 'OFFICIAL DOCUMENTATION FOR DISASTER RELIEF, CLAIMS & LEGAL PROCESSES.',
			accentColor: 'from-purple-600 to-indigo-700',
			badgeBg: 'bg-purple-600 text-white border-purple-500',
			icon: '📜',
			pdfUrl: '/docs/mdrrmo/disaster-incident-certification.pdf',
			previewImg: '/docs/mdrrmo/disaster-certification-preview.jpg',
			fileSize: '336 KB',
			overview:
				'Official issuance of Disaster Incident Certifications attesting to damage or displacement caused by natural or man-made calamities, required for government financial aid, insurance claims, and legal documentation.',
			contacts: {
				phone: '(037) 92-2590',
				email: 'info@tanau.com / mdrrmo@tanauanleyte.gov.ph',
				facebook: 'MDRRMO'
			},
			steps: [
				{
					num: '01',
					title: 'OBTAIN SUPPORTING INCIDENT REPORT',
					subtitle: 'Agency Spot Report / Blotter',
					desc: 'Request and secure an official report from the concerned agency, such as the Philippine National Police (PNP), Bureau of Fire Protection (BFP), Barangay, or other appropriate agency, as applicable.',
					tag: 'Step 1'
				},
				{
					num: '02',
					title: 'SUBMIT THE REQUEST',
					subtitle: 'Filing at MDRRMO Office',
					desc: 'Submit a formal request for a Disaster Incident Certification to the MDRRMO, together with supporting documents like blotter reports, incident reports, spot reports, and valid government ID.',
					tag: 'Step 2'
				},
				{
					num: '03',
					title: 'PROVIDE NECESSARY INFORMATION',
					subtitle: 'Full Details of Affected Property/Person',
					desc: 'Provide complete and accurate information: affected person/family name, complete address, date of incident, exact location, and specific type of disaster/incident (e.g. flash flood, structure fire, typhoon damage).',
					tag: 'Step 3'
				},
				{
					num: '04',
					title: 'VERIFICATION AND PREPARATION',
					subtitle: 'MDRRMO Records Validation',
					desc: 'Wait for the MDRRMO to verify the submitted information and supporting documents against official municipal disaster incident logs, and prepare the formal Disaster Incident Certification.',
					tag: 'Step 4'
				},
				{
					num: '05',
					title: 'RECEIVE THE CERTIFICATION',
					subtitle: 'Official Release with Municipal Seal',
					desc: 'Receive the signed Disaster Incident Certification from the MDRRMO once it has been approved and validated for release.',
					tag: 'Step 5'
				}
			],
			notes: [
				'Bring original and photocopy of the Barangay Blotter or Police/BFP Spot Report.',
				'Certifications are normally processed on the same day upon verification of incident records.'
			]
		}
	];

	// Component State
	let selectedServiceId = $state('emergency-response');
	const currentService = $derived(
		servicesData.find((s) => s.id === selectedServiceId) ?? servicesData[0]
	);

	let activeStepModal = $state(null);

	function openStepModal(service) {
		activeStepModal = service;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeStepModal() {
		activeStepModal = null;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}
</script>

<div class="space-y-8">
	<!-- Official Motto & Core Values Banner (Matching Official Tanauan Presidencia Banner) -->
	<div
		class="relative overflow-hidden rounded-3xl border-2 border-slate-900 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-6 sm:p-8 text-white shadow-xl"
	>
		<!-- Ambient Background Accents -->
		<div
			class="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-red-600/15 blur-3xl"
		></div>
		<div
			class="pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-amber-500/15 blur-3xl"
		></div>

		<div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
			<div class="space-y-2 text-center lg:text-left">
				<div class="flex flex-wrap items-center justify-center lg:justify-start gap-2">
					<span
						class="rounded-md bg-red-600 px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-white"
					>
						OFFICIAL CORE VALUES
					</span>
					<span class="text-xs font-bold text-amber-400">
						MDRRMO Tanauan • Municipality of Tanauan, Leyte
					</span>
				</div>
				<h3 class="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
					“WE ARE ALWAYS READY FOR A SAFER TANAUAN”
				</h3>
				<p class="text-xs sm:text-sm text-slate-300 max-w-2xl font-medium">
					Providing round-the-clock emergency response, non-emergency medical patient transport, community service logistics, evacuation support, and disaster certifications for all 54 barangays.
				</p>
			</div>

			<!-- Three Core Pillars -->
			<div class="flex flex-wrap items-center justify-center gap-3">
				<div
					class="flex items-center gap-2 rounded-2xl border border-red-500/40 bg-red-950/80 px-4 py-2.5 shadow-md"
				>
					<span class="text-lg">🚨</span>
					<div>
						<span class="block text-[9px] font-black text-red-300 uppercase">PILLAR 1</span>
						<span class="text-xs sm:text-sm font-black text-white">WE RESPOND.</span>
					</div>
				</div>
				<div
					class="flex items-center gap-2 rounded-2xl border border-blue-500/40 bg-blue-950/80 px-4 py-2.5 shadow-md"
				>
					<span class="text-lg">👥</span>
					<div>
						<span class="block text-[9px] font-black text-blue-300 uppercase">PILLAR 2</span>
						<span class="text-xs sm:text-sm font-black text-white">WE SERVE.</span>
					</div>
				</div>
				<div
					class="flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-950/80 px-4 py-2.5 shadow-md"
				>
					<span class="text-lg">🤝</span>
					<div>
						<span class="block text-[9px] font-black text-emerald-300 uppercase">PILLAR 3</span>
						<span class="text-xs sm:text-sm font-black text-white">WE CARE.</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 5 Services Overview Tabs -->
	<div>
		<div class="mb-4 flex flex-wrap items-center justify-between gap-3">
			<div>
				<span class="text-[11px] font-mono font-black tracking-wider text-blue-900 uppercase">
					OFFICIAL SERVICE DIRECTORY // STEP-BY-STEP OPERATIONAL GUIDES
				</span>
				<h3 class="text-2xl font-black text-blue-950">
					MDRRMO Frontline Services & Citizen Procedures
				</h3>
			</div>
			<span class="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
				5 Official Statutory Services
			</span>
		</div>

		<!-- Horizontal Scrollable Tabs / Cards for 5 Services -->
		<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
			{#each servicesData as svc}
				{@const isSelected = selectedServiceId === svc.id}
				<button
					type="button"
					onclick={() => (selectedServiceId = svc.id)}
					class="group relative flex flex-col justify-between rounded-2xl border-2 p-4 text-left transition-all duration-200 {isSelected ? 'border-amber-500 bg-white shadow-lg -translate-y-1' : 'border-slate-200 bg-white/80 hover:border-slate-300 hover:bg-white'}"
				>
					<div>
						<div class="flex items-center justify-between mb-2">
							<span
								class="font-mono text-xs font-black {isSelected ? 'text-amber-600' : 'text-slate-400'}"
							>
								{svc.index} // {svc.code}
							</span>
							<span class="text-base">{svc.icon}</span>
						</div>
						<h4
							class="text-xs sm:text-sm font-black leading-snug {isSelected ? 'text-blue-950' : 'text-slate-700 group-hover:text-blue-950'}"
						>
							{svc.shortTitle}
						</h4>
					</div>

					<div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
						<span class="font-bold text-slate-500">{svc.steps.length} Steps</span>
						<span
							class="font-bold {isSelected ? 'text-amber-600 underline' : 'text-slate-400 group-hover:text-blue-600'}"
						>
							{isSelected ? 'Viewing' : 'Select'} →
						</span>
					</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Active Service Detail & Step-by-Step Interactive Workflow -->
	<div
		class="relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-10 shadow-sm"
	>
		<!-- Header of Selected Service -->
		<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-6">
			<div class="space-y-2">
				<div class="flex flex-wrap items-center gap-2">
					<span
						class="rounded-lg border px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider shadow-2xs {currentService.badgeBg}"
					>
						SERVICE {currentService.index} // {currentService.code}
					</span>
					<span
						class="rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-700"
					>
						{currentService.badge}
					</span>
				</div>
				<h3 class="text-2xl sm:text-3xl font-black text-blue-950">
					{currentService.title}
				</h3>
				<p class="text-sm sm:text-base leading-relaxed text-slate-600 max-w-3xl">
					{currentService.overview}
				</p>
			</div>

			<!-- PDF Download & Modal Buttons -->
			<div class="flex flex-wrap items-center gap-2.5 shrink-0">
				<button
					type="button"
					onclick={() => openStepModal(currentService)}
					class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-800 shadow-2xs transition active:scale-95"
				>
					<span>👁️ View File</span>
				</button>
				<a
					href={currentService.pdfUrl}
					download
					class="inline-flex items-center gap-2 rounded-xl bg-blue-950 hover:bg-blue-900 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-amber-300 shadow-sm transition active:scale-95"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
						/>
					</svg>
					<span>Download Official Guide</span>
				</a>
			</div>
		</div>

		<!-- Step-by-Step Process Flow (Rendered cleanly with numbers and arrows) -->
		<div class="mt-8 space-y-6">
			<div class="flex items-center justify-between">
				<h4 class="text-base font-black text-blue-950 flex items-center gap-2">
					<span class="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-400 text-slate-950 text-xs font-black">
						✓
					</span>
					Official Step-by-Step Procedure ({currentService.steps.length} Steps)
				</h4>
				<span class="text-xs text-slate-400 font-semibold">
					Follow in sequential order
				</span>
			</div>

			<!-- Process Cards Flow -->
			<div class="grid gap-4 {currentService.steps.length === 5 ? 'sm:grid-cols-2 lg:grid-cols-5' : 'sm:grid-cols-2 lg:grid-cols-4'}">
				{#each currentService.steps as step, idx}
					<div
						class="relative flex flex-col justify-between rounded-2xl border-2 border-slate-200 bg-slate-50/70 p-5 transition-all hover:border-amber-400 hover:bg-white hover:shadow-md"
					>
						<div>
							<!-- Step Header -->
							<div class="mb-3 flex items-center justify-between">
								<span
									class="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-950 text-xs font-black text-amber-300 shadow-xs"
								>
									{step.num}
								</span>
								<span
									class="rounded bg-slate-200/80 px-2 py-0.5 font-mono text-[10px] font-black uppercase text-slate-700"
								>
									{step.tag}
								</span>
							</div>

							<!-- Title & Subtitle -->
							<h5 class="text-xs sm:text-sm font-black text-blue-950 uppercase leading-snug">
								{step.title}
							</h5>
							<span class="block text-[11px] font-bold text-amber-600 mt-0.5">
								{step.subtitle}
							</span>

							<!-- Detailed Description -->
							<p class="mt-2.5 text-xs leading-relaxed text-slate-600">
								{step.desc}
							</p>
						</div>

						<div class="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
							<span>Stage 0{idx + 1}</span>
							{#if idx < currentService.steps.length - 1}
								<span class="text-amber-500 font-bold">Next →</span>
							{:else}
								<span class="text-emerald-600 font-bold">Complete ✓</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<!-- Service Guidelines & Notes Box -->
			{#if currentService.notes && currentService.notes.length > 0}
				<div class="rounded-2xl border border-amber-300/80 bg-amber-50/60 p-5">
					<h5 class="text-xs font-black text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-2">
						<span>ℹ️</span> Operational Guidelines & Advisory Notes
					</h5>
					<ul class="space-y-1.5">
						{#each currentService.notes as note}
							<li class="flex items-start gap-2 text-xs text-slate-700">
								<span class="text-amber-500 font-bold">•</span>
								<span>{note}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<!-- Contact Reference Bar -->
			<div class="rounded-2xl border border-slate-200 bg-slate-100 p-4 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-3">
				<div class="flex items-center gap-2">
					<span class="font-bold text-blue-950 uppercase">Service In-Charge:</span>
					<span>Office of the Municipal Disaster Risk Reduction & Management Officer</span>
				</div>
				<div class="flex items-center gap-3">
					<a href="tel:09161977360" class="font-bold text-blue-800 hover:underline">
						Globe: 0916-197-7360
					</a>
					<span>•</span>
					<a href="tel:09317393333" class="font-bold text-emerald-800 hover:underline">
						Smart: 0931-739-3333
					</a>
					<span>•</span>
					<span class="font-mono font-bold text-slate-700">VHF: 167.600 MHz</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal Preview for Document Inspection -->
	{#if activeStepModal}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			onkeydown={(e) => e.key === 'Escape' && closeStepModal()}
		>
			<!-- Dim Backdrop -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="absolute inset-0 bg-blue-950/80 backdrop-blur-md"
				onclick={closeStepModal}
				transition:fade={{ duration: 200 }}
			></div>

			<div
				class="relative z-10 flex flex-col w-full max-w-4xl lg:max-w-5xl max-h-[92vh] overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-2xl"
			>
				<div class="h-2 w-full bg-gradient-to-r from-blue-900 via-amber-500 to-blue-700 shrink-0"></div>

				<!-- Modal Header -->
				<div class="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 shrink-0">
					<div class="flex items-center gap-3 min-w-0">
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 text-2xl shadow-xs"
						>
							{activeStepModal.icon}
						</div>
						<div class="min-w-0">
							<div class="flex flex-wrap items-center gap-2">
								<span class="text-[10px] font-black uppercase tracking-wider text-blue-700">Official MDRRMO Service Guide</span>
								<span class="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700">
									{activeStepModal.fileSize}
								</span>
								<span class="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-900 uppercase">
									{activeStepModal.badge}
								</span>
							</div>
							<h3 class="truncate text-lg sm:text-xl font-black text-blue-950">{activeStepModal.title}</h3>
						</div>
					</div>
					<div class="flex items-center gap-2 shrink-0">
						<a
							href={activeStepModal.pdfUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-900 hover:bg-blue-100 transition"
						>
							<span>Full Window ↗</span>
						</a>
						<button
							type="button"
							onclick={closeStepModal}
							class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-base font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-blue-950"
							aria-label="Close">✕</button
						>
					</div>
				</div>

				<!-- Modal Body -->
				<div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/60">
					<!-- Inspection Mode Banner -->
					<div class="flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50/70 p-3.5 text-xs">
						<div class="flex items-center gap-2.5 text-blue-950 font-semibold">
							<span class="text-base">📄</span>
							<span><strong>Document Inspection Mode:</strong> Review the official service document and step instructions below to decide whether to download.</span>
						</div>
						<a
							href={activeStepModal.pdfUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="shrink-0 text-blue-800 font-bold underline hover:text-blue-950 ml-2"
						>
							Open Full PDF ↗
						</a>
					</div>

					<!-- Document High-Res Preview -->
					<div class="rounded-2xl border-2 border-slate-300 bg-white p-3 sm:p-5 shadow-sm">
						<div class="mb-3 flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
							<span class="font-bold text-slate-700 flex items-center gap-1.5">
								<span>🔍</span> High-Resolution Document Inspection
							</span>
							<span class="font-mono text-[11px] text-slate-500">Official Government Copy</span>
						</div>
						<div class="max-h-[540px] overflow-y-auto rounded-xl border border-slate-200 bg-slate-100/50 p-2 text-center">
							<img
								src={activeStepModal.previewImg}
								alt={activeStepModal.title}
								class="mx-auto h-auto max-h-[750px] w-auto max-w-full rounded-lg shadow-sm border border-slate-200 bg-white object-contain"
							/>
						</div>
					</div>

					<!-- Details & Steps Summary -->
					<div class="grid gap-4 md:grid-cols-2">
						<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
							<div class="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Service Overview</div>
							<p class="text-xs sm:text-sm leading-relaxed text-slate-700">
								{activeStepModal.overview}
							</p>
						</div>
						<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
							<div class="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Process Stages</div>
							<ul class="space-y-1.5 text-xs text-slate-700">
								{#each activeStepModal.steps as stp}
									<li class="flex items-start gap-2">
										<span class="font-bold text-amber-600">{stp.num}.</span>
										<span><strong>{stp.title}</strong> — {stp.subtitle}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>

				<!-- Modal Footer (Decision Bar) -->
				<div class="flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-slate-200 bg-white px-6 py-4 shrink-0 shadow-sm">
					<div class="flex items-center gap-2 text-xs text-slate-600">
						<span class="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">✓</span>
						<span>Review complete. Decide whether to download or exit:</span>
					</div>
					<div class="flex items-center gap-3 w-full sm:w-auto justify-end">
						<button
							type="button"
							onclick={closeStepModal}
							class="w-full sm:w-auto rounded-xl border border-slate-300 bg-white hover:bg-slate-100 px-5 py-2.5 text-xs font-black text-slate-700 transition"
						>
							Close / Do Not Download
						</button>
						<a
							href={activeStepModal.pdfUrl}
							target="_blank"
							download
							rel="noopener noreferrer"
							class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-900 hover:bg-blue-800 px-6 py-2.5 text-xs font-black text-white shadow-md transition hover:scale-105 active:scale-95"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2.5"
									d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
								/>
							</svg>
							<span>Download Guide ({activeStepModal.fileSize})</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
