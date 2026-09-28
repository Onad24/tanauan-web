<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const defaults = getDeptDefaults('Sangguniang_Bayan') ?? { department: 'Sangguniang-Bayan' };

	// Merge Firestore dynamic data over defaults
	const pageData = $derived(mergeOfficeData(defaults, data?.officePageData));

	// View mode: 'interactive' | 'document'
	let activeOrgView = $state('interactive');
	let showDocumentModal = $state(false);

	const presidingOfficer = {
		name: 'HON. ARCHIE LAWRENCE R. KAPUNAN',
		role: 'MUN. VICE-MAYOR / PRESIDING OFFICER',
		badge: 'Presiding Officer • Chief of Legislative Body',
		image: '/images/org-charts/vice-mayor/kapunan.png',
		attachedStaff: 'STAFF TO THE OFFICE OF THE VICE-MAYOR'
	};

	const councilors = [
		{
			num: 1,
			name: 'HON. ENGR. JAN ELMER V. MAGDALAGA',
			role: 'SB Member',
			staff: 'Gladys V. Ocena'
		},
		{
			num: 2,
			name: 'HON. MARK CHRISTIAN FERDINAND L. GIMENEZ',
			role: 'SB Member',
			staff: 'Jessel Ann Permejo'
		},
		{
			num: 3,
			name: 'HON. ENGR. MAE JANE ANGELIE M. MORABE-BORAIS',
			role: 'SB Member',
			staff: 'Chezzel Ripalda'
		},
		{
			num: 4,
			name: 'HON. CHERRY ANNE T. FIEL',
			role: 'SB Member',
			staff: 'Elizabeth Fiel'
		},
		{
			num: 5,
			name: 'HON. MARK EFREN E. MERILO',
			role: 'SB Member',
			staff: 'Sheena Jansen Doguiles'
		},
		{
			num: 6,
			name: 'HON. JOSIE M. CREER',
			role: 'SB Member',
			staff: 'Jandale Rupert Quiero'
		},
		{
			num: 7,
			name: 'HON. QUINTIN T. OCTA, JR., DMD',
			role: 'SB Member',
			staff: 'Ma. Corazon Mendiola'
		},
		{
			num: 8,
			name: 'HON. LAURO A. VILLERO',
			role: 'SB Member',
			staff: 'Antonio Gomez'
		},
		{
			num: 9,
			name: 'HON. KYLE C. MESIAS',
			role: 'SK Fed. President',
			staff: 'Nygelou Sabalza'
		},
		{
			num: 10,
			name: 'HON. EFREN E. MERILO',
			role: 'ABC Vice-Pres.',
			staff: 'Cesario Halayahay, Jr.'
		}
	];

	const secretariatOfficers = [
		{
			name: 'ELEUTERIO T. LERIOS',
			title: 'SB SECRETARY',
			designation: '(BOARD SECRETARY V)',
			badge: 'Head of Secretariat',
			color: 'border-blue-900 bg-blue-50/70'
		},
		{
			name: 'ATTY. MIAMOR D. NATIVIDAD',
			title: 'LOCAL LEGISLATIVE OFFICER IV',
			designation: '(BOARD SECRETARY IV)',
			badge: 'Legal & Legislative Counsel',
			color: 'border-blue-800 bg-white'
		},
		{
			name: 'DANTE B. CUMPIO',
			title: 'LOCAL LEGISLATIVE OFFICER I',
			designation: '(BOARD SECRETARY I)',
			badge: 'Legislative Records & Orders',
			color: 'border-blue-800 bg-white'
		},
		{
			name: 'GEDSON B. REDOÑA',
			title: 'STENOGRAPHER I',
			designation: 'Session Transcripts & Minutes',
			badge: 'Legislative Transcription',
			color: 'border-blue-700 bg-white'
		}
	];

	const legislativeStaffII = [
		'RHODETTA A. TONDO',
		'JEMMALYN C. BARCALA',
		'JUAN ERMILO T. ROSAL',
		'JERY SEVA'
	];

	const legislativeStaffI = ['SHEILA C. OBEJAS'];

	const adminAides = ['POLICARPIO VERGARA', 'RYAN PANGATUNGAN'];
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (showDocumentModal = false)} />

{#snippet sangguniangBayanOrgChart()}
	<div class="flex flex-col gap-6">
		<!-- Top Controls & Action Bar -->
		<div
			class="flex flex-col items-start justify-between gap-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:p-5"
		>
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950 text-white shadow-sm">
					<svg class="h-5 w-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
						/>
					</svg>
				</div>
				<div>
					<div class="flex items-center gap-2">
						<h3 class="text-base font-black tracking-tight text-blue-950 uppercase sm:text-lg">
							Office of the Sangguniang Bayan
						</h3>
						<span
							class="rounded-full border border-amber-300 bg-amber-100 px-2.5 py-0.5 text-[10px] font-black text-amber-900 uppercase"
						>
							Legislative Matrix
						</span>
					</div>
					<p class="text-xs font-semibold text-slate-500">
						Official Structure of Council Members, Respective Staff &amp; Secretariat Operations
					</p>
				</div>
			</div>

			<!-- Tab switchers & Modal opener -->
			<div class="flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
				<div class="inline-flex rounded-xl border border-slate-300 bg-white p-1 shadow-sm">
					<button
						type="button"
						onclick={() => (activeOrgView = 'interactive')}
						class={`rounded-lg px-3.5 py-1.5 text-xs font-black uppercase transition-all ${
							activeOrgView === 'interactive'
								? 'bg-blue-950 text-white shadow-sm'
								: 'text-slate-600 hover:text-blue-950'
						}`}
					>
						Interactive View
					</button>
					<button
						type="button"
						onclick={() => (activeOrgView = 'document')}
						class={`rounded-lg px-3.5 py-1.5 text-xs font-black uppercase transition-all ${
							activeOrgView === 'document'
								? 'bg-blue-950 text-white shadow-sm'
								: 'text-slate-600 hover:text-blue-950'
						}`}
					>
						Official Document
					</button>
				</div>

				<button
					type="button"
					onclick={() => (showDocumentModal = true)}
					class="inline-flex items-center gap-1.5 rounded-xl border border-amber-500 bg-amber-400 px-3.5 py-2 text-xs font-black text-blue-950 uppercase shadow-sm transition-all hover:bg-amber-300 active:scale-95"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
						/>
					</svg>
					<span>Inspect Document</span>
				</button>
			</div>
		</div>

		{#if activeOrgView === 'interactive'}
			<!-- Interactive Organization Hierarchy Tree -->
			<div
				class="relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6 sm:p-10 shadow-sm"
			>
				<!-- Civic Header Banner -->
				<div class="relative mb-10 flex flex-col items-center justify-center border-b-2 border-slate-200 pb-8 text-center">
					<img
						src="/tanauan logo.svg"
						alt="Official Seal of Tanauan, Leyte"
						class="mb-3 h-16 w-16 object-contain drop-shadow-md sm:h-20 sm:w-20"
					/>
					<span class="block text-xs font-bold tracking-widest text-slate-600 uppercase">
						Republic of the Philippines • Province of Leyte
					</span>
					<div class="text-xs font-black tracking-wider text-slate-800 uppercase sm:text-sm">
						MUNICIPALITY OF TANAUAN
					</div>
					<div class="mt-0.5 font-serif text-2xl font-bold tracking-tight text-red-800 italic sm:text-3xl">
						Office of the Sangguniang Bayan
					</div>
					<h4 class="mt-2 text-lg font-black tracking-wide text-blue-950 uppercase sm:text-xl">
						ORGANIZATIONAL STRUCTURE OF THE OFFICE OF THE SANGGUNIANG BAYAN
					</h4>
					<span class="mt-1 text-xs font-semibold text-slate-500">
						888 Real Street, Brgy. Buntay, Tanauan, Leyte 6502
					</span>
				</div>

				<!-- TOP TIER: Vice Mayor / Presiding Officer & Staff Node -->
				<div class="mx-auto mb-10 max-w-3xl">
					<div class="grid grid-cols-1 items-center gap-4 sm:grid-cols-12">
						<!-- Main Presiding Officer Card -->
						<div
							class="group relative overflow-hidden rounded-3xl border-4 border-amber-400 bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl sm:col-span-8"
						>
							<div class="absolute top-0 right-0 left-0 h-2.5 bg-gradient-to-r from-blue-950 via-blue-900 to-amber-400"></div>
							<div class="flex items-center gap-5">
								<div class="relative shrink-0">
									<img
										src={presidingOfficer.image}
										alt={presidingOfficer.name}
										class="h-24 w-24 rounded-2xl border-2 border-amber-400 object-cover shadow-md"
									/>
									<span class="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-950 px-2.5 py-0.5 text-[9px] font-black tracking-wider text-amber-300 uppercase">
										PRESIDING
									</span>
								</div>
								<div>
									<span class="inline-block rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-black text-blue-950 uppercase">
										{presidingOfficer.badge}
									</span>
									<h4 class="mt-1 text-lg font-black tracking-tight text-blue-950 sm:text-xl">
										{presidingOfficer.name}
									</h4>
									<div class="font-mono text-xs font-black tracking-wider text-amber-600 uppercase">
										{presidingOfficer.role}
									</div>
								</div>
							</div>
						</div>

						<!-- Attached Staff Box -->
						<div
							class="flex h-full flex-col justify-center rounded-3xl border-2 border-slate-300 bg-blue-950 p-5 text-center text-white shadow-md sm:col-span-4"
						>
							<span class="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
								EXECUTIVE LIAISON
							</span>
							<div class="mt-1 text-sm font-black tracking-wider uppercase text-slate-100">
								{presidingOfficer.attachedStaff}
							</div>
							<div class="mt-2 text-[11px] text-blue-200">
								Confidential, Technical &amp; Administrative Support
							</div>
						</div>
					</div>

					<!-- Central Split Connector -->
					<div class="mt-4 flex flex-col items-center">
						<div class="h-6 w-0.5 bg-amber-400"></div>
						<div class="h-0.5 w-full max-w-xl bg-slate-300"></div>
					</div>
				</div>

				<!-- TWO MAIN OPERATIONAL WINGS -->
				<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
					<!-- WING 1: SANGGUNIANG BAYAN MEMBERS & RESPECTIVE STAFF (Left Wing - 7 cols) -->
					<div class="flex flex-col gap-6 lg:col-span-7">
						<!-- Section Banner -->
						<div class="rounded-2xl border-2 border-amber-400 bg-amber-50/80 p-4 text-center">
							<span class="block text-[11px] font-black tracking-widest text-amber-900 uppercase">
								LEGISLATIVE BODY // MUNICIPAL COUNCIL
							</span>
							<h5 class="text-base font-black text-blue-950 uppercase sm:text-lg">
								Sangguniang Bayan Members &amp; Personal Staff
							</h5>
						</div>

						<!-- Councilors and Staff List -->
						<div class="space-y-3">
							{#each councilors as member}
								<div
									class="group flex flex-col justify-between gap-3 rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-900 hover:shadow-md sm:flex-row sm:items-center"
								>
									<!-- Councilor Info -->
									<div class="flex items-start gap-3">
										<span
											class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-950 text-xs font-black text-amber-400 shadow-sm"
										>
											{member.num}
										</span>
										<div>
											<div class="text-sm font-black text-blue-950">
												{member.name}
											</div>
											<div class="font-mono text-xs font-bold text-amber-700 uppercase">
												{member.role}
											</div>
										</div>
									</div>

									<!-- Respective Staff -->
									<div
										class="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-right"
									>
										<div>
											<div class="text-[10px] font-bold text-slate-500 uppercase">Designated Staff</div>
											<div class="font-black text-slate-800">{member.staff}</div>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- WING 2: OFFICE OF THE SB SECRETARY & SECRETARIAT (Right Wing - 5 cols) -->
					<div class="flex flex-col gap-6 lg:col-span-5">
						<!-- Section Banner -->
						<div class="rounded-2xl border-2 border-blue-900 bg-blue-950 p-4 text-center text-white">
							<span class="block text-[11px] font-black tracking-widest text-amber-400 uppercase">
								LEGISLATIVE SECRETARIAT &amp; OPERATIONS
							</span>
							<h5 class="text-base font-black text-white uppercase sm:text-lg">
								Office of the SB Secretary
							</h5>
						</div>

						<!-- Core Officers -->
						<div class="space-y-3">
							{#each secretariatOfficers as officer}
								<div
									class={`rounded-2xl border-2 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${officer.color}`}
								>
									<div class="mb-1 inline-block rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-black text-blue-950 uppercase">
										{officer.badge}
									</div>
									<div class="text-sm font-black text-blue-950 sm:text-base">
										{officer.name}
									</div>
									<div class="text-xs font-bold text-amber-700 uppercase">
										{officer.title}
									</div>
									<div class="font-mono text-[11px] text-slate-600">
										{officer.designation}
									</div>
								</div>
							{/each}
						</div>

						<!-- Local Legislative Staff II Card -->
						<div class="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm">
							<div class="mb-2 flex items-center justify-between border-b border-slate-100 pb-2">
								<span class="text-xs font-black text-blue-950 uppercase">
									LOCAL LEGISLATIVE STAFF II
								</span>
								<span class="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
									4 Appointed Staff
								</span>
							</div>
							<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
								{#each legislativeStaffII as staff, i}
									<div class="flex items-center gap-2 text-xs font-bold text-slate-800">
										<span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-black text-slate-700">
											{i + 1}
										</span>
										<span>{staff}</span>
									</div>
								{/each}
							</div>
						</div>

						<!-- Local Legislative Staff I Card -->
						<div class="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm">
							<div class="mb-2 flex items-center justify-between border-b border-slate-100 pb-2">
								<span class="text-xs font-black text-blue-950 uppercase">
									LOCAL LEGISLATIVE STAFF I
								</span>
								<span class="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
									1 Appointed Staff
								</span>
							</div>
							{#each legislativeStaffI as staff, i}
								<div class="flex items-center gap-2 text-xs font-bold text-slate-800">
									<span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-black text-slate-700">
										{i + 1}
									</span>
									<span>{staff}</span>
								</div>
							{/each}
						</div>

						<!-- Administrative Aides Card -->
						<div class="rounded-2xl border-2 border-slate-300 bg-white p-5 shadow-sm">
							<div class="mb-2 flex items-center justify-between border-b border-slate-100 pb-2">
								<span class="text-xs font-black text-blue-950 uppercase">
									ADMINISTRATIVE AIDES
								</span>
								<span class="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
									2 Support Aides
								</span>
							</div>
							<div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
								{#each adminAides as aide, i}
									<div class="flex items-center gap-2 text-xs font-bold text-slate-800">
										<span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-black text-slate-700">
											{i + 1}
										</span>
										<span>{aide}</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<!-- Bottom Hierarchy Footnote -->
				<div
					class="mt-10 flex flex-col items-center justify-between gap-3 border-t-2 border-slate-200 pt-6 text-xs font-semibold text-slate-600 sm:flex-row"
				>
					<div class="flex items-center gap-2">
						<span class="h-2 w-2 rounded-full bg-blue-900"></span>
						<span>Statutory Basis: Republic Act No. 7160 (Local Government Code of 1991)</span>
					</div>
					<div class="font-mono text-slate-500">
						Official Transparency Record • Municipality of Tanauan, Leyte
					</div>
				</div>
			</div>
		{:else}
			<!-- Official PDF Document Viewer View -->
			<div
				class="group relative w-full overflow-hidden rounded-3xl border-2 border-slate-300 bg-gradient-to-b from-slate-50 via-white to-slate-50 p-4 sm:p-8 shadow-sm"
			>
				<div class="rounded-2xl border-2 border-slate-200 bg-white overflow-hidden shadow-md">
					<iframe
						src="/docs/sangguniang-bayan-org-chart.pdf"
						title="Official Organizational Structure of the Office of the Sangguniang Bayan"
						class="w-full h-[750px] border-0"
					></iframe>
				</div>

				<div
					class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-600"
				>
					<span>Document Reference: SB-ORG-CHART-2026</span>
					<a
						href="/docs/sangguniang-bayan-org-chart.pdf"
						download="Sangguniang-Bayan-Organizational-Structure.pdf"
						class="inline-flex items-center gap-1.5 rounded-lg bg-blue-950 px-3.5 py-1.5 font-bold text-amber-300 transition-colors hover:bg-blue-900 hover:text-white"
					>
						<span>Download Official PDF ↗</span>
					</a>
				</div>
			</div>
		{/if}
	</div>
{/snippet}

<!-- Full-Resolution Document Lightbox Modal -->
{#if showDocumentModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/85 p-4 backdrop-blur-md transition-all sm:p-6"
		onclick={() => (showDocumentModal = false)}
		role="dialog"
		aria-modal="true"
	>
		<div
			class="animate-in fade-in zoom-in-95 relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border-4 border-amber-400 bg-white shadow-2xl duration-200"
			onclick={(e) => e.stopPropagation()}
			role="document"
		>
			<!-- Modal Header -->
			<div
				class="flex items-center justify-between border-b-2 border-amber-400 bg-blue-950 px-6 py-4 text-white"
			>
				<div class="flex items-center gap-3">
					<span class="h-3 w-3 rounded-full bg-amber-400"></span>
					<div>
						<h4 class="text-base font-black tracking-wide uppercase">
							Organizational Structure — Office of the Sangguniang Bayan
						</h4>
						<span class="text-xs font-medium text-blue-200">
							Municipality of Tanauan, Province of Leyte
						</span>
					</div>
				</div>

				<div class="flex items-center gap-3">
					<a
						href="/docs/sangguniang-bayan-org-chart.pdf"
						download="Sangguniang-Bayan-Organizational-Structure.pdf"
						class="rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-black tracking-wider text-blue-950 uppercase transition-all hover:bg-amber-300"
					>
						Download PDF ↗
					</a>
					<button
						type="button"
						onclick={() => (showDocumentModal = false)}
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900 text-sm font-black text-white transition-colors hover:bg-red-600"
						aria-label="Close modal"
					>
						✕
					</button>
				</div>
			</div>

			<!-- Modal PDF Viewport -->
			<div class="flex-1 w-full bg-slate-900">
				<iframe
					src="/docs/sangguniang-bayan-org-chart.pdf"
					title="Full Organizational Structure of the Office of the Sangguniang Bayan"
					class="w-full h-full border-0"
				></iframe>
			</div>

			<!-- Modal Footer -->
			<div
				class="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-600"
			>
				<span>Press ESC or click outside to close viewer.</span>
				<span class="text-blue-950">Official Municipal Government Transparency Document</span>
			</div>
		</div>
	</div>
{/if}

<OfficeTemplate
	{...pageData}
	department="Sangguniang_Bayan"
	customOrgChart={sangguniangBayanOrgChart}
/>
