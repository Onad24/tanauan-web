<script>
	import { fade, fly, slide } from 'svelte/transition';

	// =========================================================================
	// OFFICIAL MUNICIPAL CIVIL REGISTRAR SERVICES & STATUTORY DUTIES DATA
	// (Extracted verbatim from Official Office of the Municipal Civil Registrar PDF)
	// =========================================================================

	const servicesData = [
		{
			id: 'timely-registration',
			index: '01',
			code: 'TIME-REG',
			title: 'TIMELY REGISTRATION OF VITAL EVENTS (BIRTH, MARRIAGE, DEATH)',
			shortTitle: 'Timely Registration',
			category: 'Vital Events',
			badge: 'Standard Statutory Period',
			steps: [
				'Proceed to the MCR office, verbalize requests, provide needed information and documents.',
				'Review the prepared civil registry form and let signatories affix their signatures.',
				'Proceed to the treasurer’s office to pay the required fees.',
				'Claim owner’s copy of registered documents of vital events.'
			],
			notes: [],
			requirementsSections: [
				{
					title: 'STANDARD VITAL REGISTRATION DOCUMENTS',
					notice: null,
					mustSubmitTwoCopies: false,
					items: [
						'Certificate of Live Birth (COLB) duly signed by attending physician or midwife (for births)',
						'Certificate of Marriage (COM) signed by solemnizing officer and contracting parties (for marriages)',
						'Certificate of Death (COD) signed by attending physician or Municipal Health Officer (for deaths)',
						'Valid government-issued ID of informant / contracting parties'
					]
				}
			]
		},
		{
			id: 'late-registration',
			index: '02',
			code: 'LATE-REG',
			title: 'LATE REGISTRATION OF VITAL EVENTS (BIRTH, MARRIAGE, DEATH)',
			shortTitle: 'Late Registration',
			category: 'Delayed Registration',
			badge: 'Mandatory 10-Day Posting',
			steps: [
				'Proceed to the MCR office to verbalize the request.',
				'Secure and submit the needed requirements.',
				'Review the filled out civil registry forms and let signatories affix their signatures.',
				'Proceed to the treasurer’s office to pay the required fees.',
				'Claim the owner’s copy of late registered documents.'
			],
			notes: [
				'Note: the late-registered documents shall be released only after the required ten (10)-day posting period.'
			],
			mustSubmitTwoCopies: true,
			requirementsSections: [
				{
					id: 'late-birth',
					title: 'REQUIREMENTS FOR LATE REGISTRATION OF BIRTH',
					mustSubmitTwoCopies: true,
					items: [
						'PSA NEGATIVE RESULT (NO RECORD OF BIRTH)',
						'BAPTISMAL CERTIFICATION',
						'BAKUNA RECORD (for children ages 0-5 years old)',
						'SCHOOL RECORDS (certification/ form137/ tor/ diploma)',
						'MARRIAGE CERTIFICATE OF PARENTS',
						'AT LEAST 2 LIVEBIRTHS OF SIBLINGS',
						'VOTER’S CERTIFICATION',
						'PHILIPPINE NATIONAL ID / PHILSYS VERIFICATION SLIP',
						'2 pcs. 2x2 size picture with white background',
						'BRGY. CERTIFICATION',
						'JOINT AFFIDAVIT (with xerox copy of valid ID of witnesses)'
					],
					downloadableForms: [
						{
							name: 'Joint Affidavit of Two Disinterested Persons (Late Birth)',
							url: '/forms/civil-registrar/joint-affidavit-two-disinterested-persons-late-registration-birth.pdf'
						},
						{
							name: 'Barangay Certification Form',
							url: '/forms/civil-registrar/barangay-certification-late-registration.pdf'
						}
					]
				},
				{
					id: 'late-marriage',
					title: 'REQUIREMENTS FOR LATE REGISTRATION OF MARRIAGE',
					mustSubmitTwoCopies: true,
					items: [
						'PSA NEGATIVE RESULT (NO RECORD OF MARRIAGE)',
						'CENOMAR (for both contracting parties)',
						'AFFIDAVIT OF TWO DIS-INTERESTED PERSONS (with xerox copy of valid ID of witnesses)',
						'Birth certificates of any children born to the couple, showing the parents’ marriage details.',
						'Photocopy of valid government-issued IDs of the couple.'
					],
					downloadableForms: []
				},
				{
					id: 'late-death',
					title: 'REQUIREMENTS FOR LATE REGISTRATION OF DEATH',
					mustSubmitTwoCopies: true,
					items: [
						'PSA NEGATIVE RESULT (NO RECORD OF DEATH)',
						'BURIAL CERTIFICATE',
						'AFFIDAVIT OF TWO DIS-INTERESTED PERSONS (with xerox copy of valid ID of witnesses)',
						'Photocopy of valid government-issued IDs of the deceased and the informant.'
					],
					downloadableForms: [
						{
							name: 'Joint Affidavit of Two Disinterested Persons (Fact of Death)',
							url: '/forms/civil-registrar/joint-affidavit-two-disinterested-persons-fact-of-death.pdf'
						}
					]
				}
			]
		},
		{
			id: 'marriage-license',
			index: '03',
			code: 'MARR-LIC',
			title: 'APPLICATION FOR MARRIAGE LICENSE',
			shortTitle: 'Marriage License',
			category: 'Pre-Marital Licensing',
			badge: 'Mandatory 10-Day Posting',
			steps: [
				'Applicants proceed to the MCR office and verbally state their request.',
				'Secure and submit required documents',
				'If requirements are complete and applicants are qualified, proceed to the treasurer\'s office to pay the required fees.',
				'Present the required documents to the MSWD office for pre-marriage counseling.',
				'Submit the complete requirements, including the pre-marriage counseling certificate, to the MCR office for posting of the marriage application.',
				'Claim Marriage License at the MCR office after posting.'
			],
			notes: [
				'Note: Marriage License shall be released only after the required ten (10)-day posting period.'
			],
			mustSubmitTwoCopies: true,
			requirementsSections: [
				{
					id: 'marr-core',
					title: 'REQUIREMENTS FOR MARRIAGE LICENSE APPLICATION',
					mustSubmitTwoCopies: false,
					items: [
						'CENOMAR (CERTIFICATE OF NO MARRIAGE)',
						'PSA/LOCAL LIVE BIRTH',
						'BRGY. RESIDENCY',
						'Photocopy of valid government-issued IDs',
						'PARENTAL CONSENT FOR 18 UP TO BELOW 21 YEARS OF AGE',
						'PARENTAL ADVICE FOR 21 UP TO 25 YEARS OF AGE'
					]
				},
				{
					id: 'marr-foreigner',
					title: 'ADDITIONAL REQUIREMENTS IF ONE OF THE COUPLES IS A FOREIGNER',
					notice: 'Documents that are not in English must be translated. (Must submit 2 xerox copies of each document)',
					mustSubmitTwoCopies: true,
					items: [
						'CERTIFICATE OF LEGAL CAPACITY / NO LEGAL IMPEDIMENT TO CONTRACT MARRIAGE ISSUED BY THE FOREIGNER’S EMBASSY OR CONSULATE',
						'IF PREVIOUSLY MARRIED: DIVORCE DECREE, ANNULMENT OR COURT DECREE OR DEATH CERTIFICATE OF THE FORMER SPOUSE'
					]
				}
			]
		},
		{
			id: 'certified-copies',
			index: '04',
			code: 'CTC-ISSUANCE',
			title: 'REQUESTING OF CERTIFIED TRUE COPIES OF CERTIFICATE OF BIRTH, MARRIAGE, DEATH',
			shortTitle: 'Certified True Copies',
			category: 'Public Records',
			badge: 'Frontline Releasing',
			steps: [
				'Proceed to the MCR office and verbalize the request.',
				'If the requested document is available, present a valid government-issued id and other required supporting documents, if any.',
				'Proceed to the treasurer’s office to pay the required fees.',
				'Wait for the processing time and claim your copy from the MCR staff.'
			],
			notes: [],
			mustSubmitTwoCopies: false,
			requirementsSections: [
				{
					id: 'ctc-reqs',
					title: 'REQUIREMENTS IN ISSUING CERTIFIED TRUE COPIES OF CERTIFICATE OF BIRTH, MARRIAGE, AND DEATH',
					mustSubmitTwoCopies: false,
					items: [
						'Valid government-issued ID of the requesting person.'
					],
					subSections: [
						{
							title: 'Proof of relationship or authorization, when the requester is not the document owner or is requesting on behalf of another person, such as:',
							items: [
								'Authorization Letter',
								'Valid IDs of the document owner and authorized representative',
								'Special Power of Attorney (SPA), when applicable'
							]
						},
						{
							title: 'For representatives:',
							items: [
								'Valid government-issued ID of both the representative and the person whose record is being requested.'
							]
						}
					]
				}
			]
		},
		{
			id: 'clerical-petitions',
			index: '05',
			code: 'RA-PETITIONS',
			title: 'FILING OF PETITIONS FOR CLERICAL ERROR R.A. 9048 & R.A. 10172',
			shortTitle: 'Petitions RA 9048 & 10172',
			category: 'Administrative Corrections',
			badge: 'Quasi-Judicial Petitions',
			steps: [
				'Proceed to the MCR office and verbalize the request.',
				'Present the documents for initial interview and assessment.',
				'Go to the cashier at the treasurer\'s office to pay the required filling fee, get the official receipt and present it to the MCR staff.',
				'The MCR office will post a notice of the petition on their bulletin board for ten (10) consecutive days.',
				'After the ten (days) posting, the petitioner must return to the MCR office to sign the formal verified petition.',
				'The MCR office forwards the validated petition to the Office of the Civil Registrar General (OCRG) in Manila for final approval, which takes two to six months.',
				'Once approved and affirmed by the CRG, the MCR office will update the petitioner to get the Certificate of Finality from the office to request the updated/annotated document from the Philippine Statistics Authority (PSA).'
			],
			notes: [
				'Important Notice: The validated petition is forwarded to OCRG in Manila for final approval (takes 2 to 6 months). The Certificate of Finality is issued upon CRG affirmation.'
			],
			mustSubmitTwoCopies: true,
			requirementsSections: [
				{
					id: 'ra-9048-clerical',
					title: 'REQUIREMENTS FOR CORRECTION OF CLERICAL ERROR (RA 9048)',
					mustSubmitTwoCopies: true,
					items: [
						'PSA & LOCAL COLB OF CHILD',
						'BAPTISMAL CERTIFICATE',
						'MARRIAGE CERTIFICATE OF PARENTS (if applicable)',
						'MARRIAGE CERTIFICATE OF PETITIONER (if applicable)',
						'VOTER’S CERTIFICATION',
						'SCHOOL RECORDS',
						'CERTIFICATE OF EMPLOYMENT/ SERVICE RECORD',
						'VALID GOVERNMENT-ISSUED IDs',
						'ANY OTHER SUPPORTING DOCUMENTS',
						'CERTIFICATE OF INDIGENCY (if applicable)'
					]
				},
				{
					id: 'ra-9048-name',
					title: 'REQUIREMENTS FOR CHANGE OF FIRST NAME (RA 9048)',
					mustSubmitTwoCopies: true,
					items: [
						'PSA & LOCAL COLB OF CHILD',
						'BAPTISMAL CERTIFICATE',
						'MARRIAGE CERTIFICATE (if applicable)',
						'VOTER’S CERTIFICATION',
						'SCHOOL RECORDS',
						'POLICE & NBI CLEARANCE',
						'SERVICE RECORD / AFFIDAVIT OF NON-EMPLOMENT',
						'NEWSPAPER PUBLICATION',
						'VALID GOVERNMENT-ISSUED IDs'
					]
				},
				{
					id: 'ra-10172-gender',
					title: 'REQUIREMENTS FOR CHANGE OF GENDER (RA 10172)',
					mustSubmitTwoCopies: true,
					items: [
						'PSA & LOCAL COLB OF CHILD',
						'BAPTISMAL CERTIFICATE',
						'MARRIAGE CERTIFICATE (if applicable)',
						'VOTER’S CERTIFICATION',
						'SCHOOL RECORDS',
						'POLICE & NBI CLEARANCE',
						'SERVICE RECORD / AFFIDAVIT OF NON-EMPLOMENT',
						'MEDICAL CERTIFICATE FROM GOVERNMENT PHYSICIAN',
						'ULTRASOUND RESULT',
						'AFFIDAVIT OF NO MEDICAL RECORD OF BIRTH',
						'NEWSPAPER PUBLICATION',
						'VALID GOVERNMENT-ISSUED IDs',
						'ANY OTHER SUPPORTING DOCUMENTS',
						'CERTIFICATE OF INDIGENCY (IF APPLICABLE)'
					]
				},
				{
					id: 'ra-10172-dob',
					title: 'REQUIREMENTS FOR CHANGE OF DAY & MONTH OF BIRTH (RA 10172)',
					mustSubmitTwoCopies: true,
					items: [
						'PSA & LOCAL COLB OF CHILD',
						'BAPTISMAL CERTIFICATE',
						'MARRIAGE CERTIFICATE (if applicable)',
						'VOTER’S CERTIFICATION',
						'SCHOOL RECORDS',
						'POLICE & NBI CLEARANCE',
						'SERVICE RECORD / AFFIDAVIT OF NON-EMPLOMENT',
						'NEWSPAPER PUBLICATION',
						'VALID GOVERNMENT-ISSUED IDs',
						'ANY OTHER SUPPORTING DOCUMENTS',
						'CERTIFICATE OF INDIGENCY (IF APPLICABLE)'
					]
				}
			]
		}
	];

	// ==========================================
	// COMPONENT STATE (Information Navigation)
	// ==========================================
	let activeServiceId = $state(servicesData[0].id);
	let viewStyle = $state('tabbed'); // 'tabbed' | 'expanded'
	let activeSubTabIndex = $state({}); // serviceId -> sub-tab index

	const activeService = $derived(
		servicesData.find((s) => s.id === activeServiceId) || servicesData[0]
	);

	const activeSec = $derived(
		activeService.requirementsSections[activeSubTabIndex[activeService.id] ?? 0] ||
			activeService.requirementsSections[0]
	);

	function selectService(id) {
		activeServiceId = id;
		if (activeSubTabIndex[id] === undefined) {
			activeSubTabIndex = { ...activeSubTabIndex, [id]: 0 };
		}
	}

	function selectSubTab(serviceId, idx) {
		activeSubTabIndex = { ...activeSubTabIndex, [serviceId]: idx };
	}
</script>

<div class="relative w-full">
	<!-- Official Header Banner (Information Showcase) -->
	<div class="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
		<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div>
				<div class="flex items-center gap-2">
					<span class="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
					<span class="font-mono text-xs font-bold tracking-wider text-slate-500 uppercase">
						Republic of the Philippines • Province of Leyte • Municipality of Tanauan
					</span>
				</div>
				<h3 class="mt-1 text-2xl font-black tracking-tight text-blue-950 sm:text-3xl">
					OFFICE OF THE MUNICIPAL CIVIL REGISTRAR
				</h3>
				<p class="mt-1 text-sm font-semibold tracking-wide text-amber-700 uppercase">
					SERVICES OFFERED & STATUTORY PROCEDURES
				</p>
			</div>

			<!-- View Layout Toggle -->
			<div class="flex items-center gap-2 self-start md:self-auto">
				<span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Display:</span>
				<div class="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
					<button
						type="button"
						onclick={() => (viewStyle = 'tabbed')}
						class={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
							viewStyle === 'tabbed'
								? 'bg-blue-950 text-white shadow-xs'
								: 'text-slate-600 hover:text-blue-950'
						}`}
					>
						Tabbed Dossier
					</button>
					<button
						type="button"
						onclick={() => (viewStyle = 'expanded')}
						class={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
							viewStyle === 'expanded'
								? 'bg-blue-950 text-white shadow-xs'
								: 'text-slate-600 hover:text-blue-950'
						}`}
					>
						Full List (All 5)
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- ========================================================================= -->
	<!-- MODE A: TABBED DOSSIER (Clean, Focused, Pure Information) -->
	<!-- ========================================================================= -->
	{#if viewStyle === 'tabbed'}
		<!-- Navigation Tabs (5 Official Services) -->
		<div class="mb-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
			{#each servicesData as svc}
				<button
					type="button"
					onclick={() => selectService(svc.id)}
					class={`group relative flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-300 cursor-pointer ${
						activeServiceId === svc.id
							? 'border-t-4 border-slate-300 border-t-amber-500 bg-white shadow-md ring-1 ring-blue-900/10'
							: 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
					}`}
				>
					<div class="flex items-center justify-between">
						<span
							class={`font-mono text-xl font-black ${
								activeServiceId === svc.id ? 'text-amber-500' : 'text-slate-400 group-hover:text-amber-500'
							}`}
						>
							{svc.index}
						</span>
						<span
							class={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
								activeServiceId === svc.id
									? 'bg-blue-100 text-blue-950 font-black'
									: 'bg-slate-100 text-slate-600'
							}`}
						>
							{svc.code}
						</span>
					</div>

					<div class="mt-2.5">
						<span class="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">
							{svc.category}
						</span>
						<h4
							class={`mt-0.5 text-xs font-black leading-snug line-clamp-2 ${
								activeServiceId === svc.id ? 'text-blue-950' : 'text-slate-700 group-hover:text-blue-950'
							}`}
						>
							{svc.shortTitle}
						</h4>
					</div>
				</button>
			{/each}
		</div>

		<!-- Active Service Informational Card -->
		<div
			class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
			transition:fade={{ duration: 200 }}
		>
			<!-- Card Header -->
			<div class="border-b border-slate-200 bg-slate-50/70 p-6 sm:p-8">
				<div class="flex flex-wrap items-center gap-2">
					<span class="rounded-md border border-amber-300 bg-amber-100 px-2.5 py-1 font-mono text-xs font-bold text-amber-900 uppercase">
						FUNCTION {activeService.index} // {activeService.code}
					</span>
					<span class="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700">
						{activeService.category}
					</span>
					{#if activeService.mustSubmitTwoCopies}
						<span class="rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700">
							Must submit 2 xerox copies of each document
						</span>
					{/if}
				</div>

				<h3 class="mt-3 text-xl font-black tracking-tight text-blue-950 sm:text-2xl">
					✔ {activeService.title}
				</h3>

				<!-- Statutory Notes & Alerts -->
				{#if activeService.notes && activeService.notes.length > 0}
					<div class="mt-4 space-y-2">
						{#each activeService.notes as note}
							<div
								class="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-xs font-bold leading-relaxed text-amber-950"
							>
								<span class="text-amber-600 select-none">⚠️</span>
								<span>{note}</span>
							</div>
						{/each}
					</div>
				{/if}
			</div>

			<!-- Card Content: Two Column Informational Layout -->
			<div class="grid grid-cols-1 divide-y divide-slate-200 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
				<!-- Left Column: Procedural Steps -->
				<div class="p-6 sm:p-8 lg:col-span-5 bg-white">
					<div class="mb-5 flex items-center justify-between border-b border-slate-100 pb-3">
						<h4 class="text-sm font-black text-blue-950 uppercase tracking-wide">
							Procedural Steps
						</h4>
						<span class="font-mono text-xs font-bold text-slate-500">
							{activeService.steps.length} Steps
						</span>
					</div>

					<ol class="space-y-4">
						{#each activeService.steps as step, stepIdx}
							<li class="flex items-start gap-3.5">
								<span
									class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-950 font-mono text-xs font-black text-amber-300 shadow-2xs"
								>
									{stepIdx + 1}
								</span>
								<p class="text-xs sm:text-sm font-medium leading-relaxed text-slate-800 pt-0.5">
									{step}
								</p>
							</li>
						{/each}
					</ol>

					<!-- Frontline Office Note -->
					<div class="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
						<div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
							Frontline Service Location
						</div>
						<div class="mt-1 text-xs font-bold text-blue-950">
							Office of the Municipal Civil Registrar
						</div>
						<div class="text-xs text-slate-600">
							Ground Floor, Tanauan Town Hall, Real St., Tanauan, Leyte
						</div>
					</div>
				</div>

				<!-- Right Column: Documentary Requirements -->
				<div class="p-6 sm:p-8 lg:col-span-7 bg-slate-50/30">
					<!-- Sub-Tabs if multiple requirements groups exist (e.g. Late Birth, Marriage, Death or RA 9048/10172 types) -->
					{#if activeService.requirementsSections.length > 1}
						<div class="mb-6">
							<div class="mb-2 text-[11px] font-black tracking-wider text-slate-500 uppercase">
								Select Specific Event / Petition Category:
							</div>
							<div class="flex flex-wrap gap-2">
								{#each activeService.requirementsSections as section, sIdx}
									{@const isSubActive = (activeSubTabIndex[activeService.id] ?? 0) === sIdx}
									<button
										type="button"
										onclick={() => selectSubTab(activeService.id, sIdx)}
										class={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
											isSubActive
												? 'bg-blue-950 text-amber-300 shadow-xs ring-1 ring-blue-900'
												: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
										}`}
									>
										{section.title.replace('REQUIREMENTS FOR ', '')}
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Active Requirements Section Content -->
					<div class="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs">
						<div class="mb-4 border-b border-slate-100 pb-3">
							<div class="flex flex-wrap items-center justify-between gap-2">
								<h5 class="text-sm font-black text-blue-950">
									{activeSec.title}
								</h5>
								{#if activeSec.mustSubmitTwoCopies}
									<span class="text-[11px] font-bold text-rose-600 italic">
										(Must submit 2 xerox copies of each document)
									</span>
								{/if}
							</div>
							{#if activeSec.notice}
								<p class="mt-1 text-xs text-amber-800 font-semibold italic">
									{activeSec.notice}
								</p>
							{/if}
						</div>

						<!-- Requirements List with ❖ Bullet -->
						<ul class="space-y-2.5">
							{#each activeSec.items as item}
								<li class="flex items-start text-xs sm:text-sm leading-relaxed text-slate-800">
									<span class="mr-2.5 font-bold text-amber-600 select-none">❖</span>
									<span>{item}</span>
								</li>
							{/each}
						</ul>

						<!-- Sub-sections (for CTC proof of authorization/representatives) -->
						{#if activeSec.subSections}
							<div class="mt-5 space-y-4 border-t border-slate-100 pt-4">
								{#each activeSec.subSections as sub}
									<div>
										<p class="text-xs font-black text-slate-800">
											❖ {sub.title}
										</p>
										<ul class="mt-2 ml-5 space-y-1.5">
											{#each sub.items as subItem}
												<li class="flex items-start text-xs text-slate-700">
													<span class="mr-2 text-slate-400 select-none">•</span>
													<span>{subItem}</span>
												</li>
											{/each}
										</ul>
									</div>
								{/each}
							</div>
						{/if}

						<!-- Downloadable Template Links (if applicable) -->
						{#if activeSec.downloadableForms && activeSec.downloadableForms.length > 0}
							<div class="mt-6 border-t border-slate-100 pt-4">
								<div class="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-2">
									Official Downloadable Templates:
								</div>
								<div class="flex flex-wrap gap-2">
									{#each activeSec.downloadableForms as form}
										<a
											href={form.url}
											download
											class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-blue-900 transition-colors hover:bg-blue-50 hover:border-blue-300"
										>
											<svg class="h-3.5 w-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
											</svg>
											<span>{form.name}</span>
										</a>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

	<!-- ========================================================================= -->
	<!-- MODE B: FULL LIST VIEW (All 5 Services Displayed Continuously) -->
	<!-- ========================================================================= -->
	{:else}
		<div class="space-y-8" transition:fade>
			{#each servicesData as svc}
				<div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
					<!-- Service Header -->
					<div class="border-b border-slate-200 bg-slate-50/70 p-6 sm:p-7">
						<div class="flex flex-wrap items-center justify-between gap-3">
							<div class="flex items-center gap-2.5">
								<span class="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 font-mono text-xs font-black text-white">
									{svc.index}
								</span>
								<span class="rounded bg-blue-100 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-950 uppercase">
									{svc.code}
								</span>
								<span class="text-xs font-bold text-slate-500 uppercase tracking-wide">
									{svc.category}
								</span>
							</div>

							{#if svc.mustSubmitTwoCopies}
								<span class="rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700">
									Must submit 2 xerox copies of each document
								</span>
							{/if}
						</div>

						<h3 class="mt-3 text-lg sm:text-xl font-black text-blue-950">
							✔ {svc.title}
						</h3>

						{#if svc.notes && svc.notes.length > 0}
							<div class="mt-3 space-y-1.5">
								{#each svc.notes as note}
									<div class="rounded-lg border border-amber-200 bg-amber-50/80 p-2.5 text-xs font-bold text-amber-950">
										⚠️ {note}
									</div>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Content Grid: Steps + All Requirements Sections -->
					<div class="grid grid-cols-1 divide-y divide-slate-200 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
						<!-- Procedural Steps -->
						<div class="p-6 lg:col-span-5 bg-white">
							<div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-2">
								<h4 class="text-xs font-black text-blue-950 uppercase tracking-wide">
									Procedures
								</h4>
								<span class="font-mono text-xs text-slate-500">{svc.steps.length} Steps</span>
							</div>

							<ol class="space-y-3">
								{#each svc.steps as step, idx}
									<li class="flex items-start gap-3">
										<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-950 font-mono text-xs font-bold text-amber-300">
											{idx + 1}
										</span>
										<p class="text-xs font-medium leading-relaxed text-slate-800 pt-0.5">
											{step}
										</p>
									</li>
								{/each}
							</ol>
						</div>

						<!-- Requirements -->
						<div class="p-6 lg:col-span-7 bg-slate-50/20 space-y-6">
							{#each svc.requirementsSections as reqSec}
								<div class="rounded-xl border border-slate-200 bg-white p-5">
									<div class="mb-3 flex flex-wrap items-center justify-between gap-1 border-b border-slate-100 pb-2">
										<h5 class="text-xs font-black text-blue-950 uppercase">
											{reqSec.title}
										</h5>
										{#if reqSec.mustSubmitTwoCopies}
											<span class="text-[10px] font-bold text-rose-600 italic">
												(Must submit 2 xerox copies of each document)
											</span>
										{/if}
									</div>

									{#if reqSec.notice}
										<p class="mb-2 text-xs text-amber-800 font-semibold italic">
											{reqSec.notice}
										</p>
									{/if}

									<ul class="space-y-2">
										{#each reqSec.items as item}
											<li class="flex items-start text-xs leading-relaxed text-slate-800">
												<span class="mr-2 font-bold text-amber-600 select-none">❖</span>
												<span>{item}</span>
											</li>
										{/each}
									</ul>

									{#if reqSec.subSections}
										<div class="mt-4 space-y-3 border-t border-slate-100 pt-3">
											{#each reqSec.subSections as sub}
												<div>
													<p class="text-xs font-black text-slate-800">
														❖ {sub.title}
													</p>
													<ul class="mt-1.5 ml-4 space-y-1">
														{#each sub.items as subItem}
															<li class="flex items-start text-xs text-slate-700">
																<span class="mr-2 text-slate-400">•</span>
																<span>{subItem}</span>
															</li>
														{/each}
													</ul>
												</div>
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
