<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const defaults = getDeptDefaults('Vice-Mayors-Office') ?? { department: 'Vice-Mayors-Office' };

	// Merge Firestore dynamic data over defaults
	const pageData = $derived(mergeOfficeData(defaults, data?.officePageData));

	// View mode for Org Chart: 'interactive' | 'document'
	let activeOrgView = $state('interactive');
	let showDocumentModal = $state(false);

	const viceMayor = {
		name: 'HON. ARCHIE LAWRENCE R. KAPUNAN',
		role: 'MUNICIPAL VICE MAYOR',
		subRole: 'Presiding Officer, Sangguniang Bayan',
		badge: 'Head of Office • Presiding Officer',
		image: '/images/org-charts/vice-mayor/kapunan.png'
	};

	const staffMembers = [
		{
			name: 'JERRY S. SEVA',
			role: 'Staff of the Vice Mayor',
			badge: 'Executive Support',
			image: '/images/org-charts/vice-mayor/seva.png'
		},
		{
			name: 'SHEILA C. OBEJAS',
			role: 'Staff of the Vice Mayor',
			badge: 'Executive Support',
			image: '/images/org-charts/vice-mayor/obejas.png'
		},
		{
			name: 'ELLEN N. MABANSAG',
			role: 'Staff of the Vice Mayor',
			badge: 'Executive Support',
			image: '/images/org-charts/vice-mayor/mabansag.png'
		},
		{
			name: 'JOEY R. MALATE',
			role: 'Staff of the Vice Mayor',
			badge: 'Executive Support',
			image: '/images/org-charts/vice-mayor/malate.png'
		},
		{
			name: 'JENNIFER B. CAYUBIT',
			role: 'Staff of the Vice Mayor',
			badge: 'Executive Support',
			image: '/images/org-charts/vice-mayor/cayubit.png'
		},
		{
			name: 'LITO L. SILVANO JR.',
			role: 'Staff of the Vice Mayor',
			badge: 'Executive Support',
			image: '/images/org-charts/vice-mayor/silvano.png'
		},
		{
			name: 'REY JEANE C. HABABAG',
			role: 'Staff of the Vice Mayor',
			badge: 'Executive Support',
			image: '/images/org-charts/vice-mayor/hababag.png'
		},
		{
			name: 'ROGELIO D. VILLEGAS JR.',
			role: 'Staff of the Vice Mayor',
			badge: 'Executive Support',
			image: '/images/org-charts/vice-mayor/villegas.png'
		},
		{
			name: 'EDMUND L. VARONA',
			role: 'Staff of the Vice Mayor',
			badge: 'Executive Support',
			image: '/images/org-charts/vice-mayor/varona.png'
		}
	];
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (showDocumentModal = false)} />

{#snippet viceMayorOrgChart()}
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
							d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
						/>
					</svg>
				</div>
				<div>
					<div class="flex items-center gap-2">
						<h3 class="text-base font-black tracking-tight text-blue-950 uppercase sm:text-lg">
							Office of the Vice Mayor
						</h3>
						<span
							class="rounded-full border border-emerald-300 bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 uppercase"
						>
							Active Matrix
						</span>
					</div>
					<p class="text-xs font-semibold text-slate-500">
						Official Supervisory Matrix &amp; Staff Hierarchy
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
					<span>Inspect Full Chart</span>
				</button>
			</div>
		</div>

		{#if activeOrgView === 'interactive'}
			<!-- Interactive Organization Hierarchy Tree -->
			<div
				class="relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 p-6 sm:p-10 shadow-sm"
			>
				<!-- Civic Header Banner with Official Seals -->
				<div
					class="relative mb-10 flex flex-col items-center justify-between gap-4 border-b-2 border-slate-200 pb-8 text-center sm:flex-row sm:text-left"
				>
					<div class="flex items-center gap-4">
						<img
							src="/images/org-charts/vice-mayor/tanauan-seal.png"
							alt="Official Seal of Tanauan, Leyte"
							class="h-16 w-16 shrink-0 object-contain drop-shadow-md sm:h-20 sm:w-20"
						/>
						<div>
							<span class="block text-xs font-black tracking-widest text-amber-700 uppercase">
								Republic of the Philippines • Province of Leyte
							</span>
							<h4 class="text-xl font-black tracking-tight text-blue-950 sm:text-2xl">
								ORGANIZATIONAL CHARTS OF THE OFFICE OF THE VICE MAYOR
							</h4>
							<span class="text-xs font-bold text-slate-600">
								Municipality of Tanauan, Leyte • Official Public Transparency Record
							</span>
						</div>
					</div>

					<div class="shrink-0">
						<img
							src="/images/org-charts/vice-mayor/bagong-pilipinas.png"
							alt="Bagong Pilipinas"
							class="h-14 w-auto object-contain drop-shadow-sm sm:h-16"
						/>
					</div>
				</div>

				<!-- TOP TIER: Municipal Vice Mayor Card -->
				<div class="relative flex flex-col items-center justify-center">
					<div
						class="group relative w-full max-w-md overflow-hidden rounded-3xl border-4 border-amber-400 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
					>
						<!-- Decorative Header Accent -->
						<div
							class="absolute top-0 right-0 left-0 h-3 bg-gradient-to-r from-blue-950 via-blue-900 to-amber-500"
						></div>

						<div class="flex flex-col items-center text-center">
							<!-- Vice Mayor Portrait -->
							<div class="relative mb-4 mt-2">
								<div
									class="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-amber-400 via-blue-900 to-amber-300 opacity-75 blur-[2px] transition duration-300 group-hover:opacity-100"
								></div>
								<img
									src={viceMayor.image}
									alt={viceMayor.name}
									class="relative h-32 w-32 rounded-2xl border-4 border-white object-cover shadow-lg sm:h-36 sm:w-36"
								/>
								<span
									class="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber-300 bg-amber-400 px-3 py-0.5 text-[10px] font-black tracking-wider text-blue-950 uppercase shadow-sm"
								>
									ELECTED OFFICIAL
								</span>
							</div>

							<!-- Name and Role -->
							<h4 class="mt-2 text-xl font-black tracking-tight text-blue-950 sm:text-2xl">
								{viceMayor.name}
							</h4>
							<div class="mt-1 font-mono text-sm font-black tracking-wider text-amber-600 uppercase">
								{viceMayor.role}
							</div>
							<p class="mt-1 text-xs font-semibold text-slate-600">
								{viceMayor.subRole}
							</p>

							<div
								class="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-slate-100 pt-3 text-[11px] font-bold text-slate-700"
							>
								<span class="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-blue-950 border border-blue-200">
									<span class="h-1.5 w-1.5 rounded-full bg-blue-900"></span>
									Presiding Officer
								</span>
								<span class="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-amber-950 border border-amber-200">
									<span class="h-1.5 w-1.5 rounded-full bg-amber-600"></span>
									Head of Office
								</span>
							</div>
						</div>
					</div>

					<!-- Connecting Stem / Line -->
					<div class="my-2 flex flex-col items-center">
						<div class="h-8 w-1 bg-amber-400"></div>
						<div
							class="rounded-full border-2 border-blue-900 bg-blue-950 px-6 py-2 text-xs font-black tracking-widest text-amber-300 uppercase shadow-md"
						>
							STAFF OF THE VICE MAYOR
						</div>
						<div class="h-8 w-1 bg-amber-400"></div>
					</div>
				</div>

				<!-- STAFF GRID (3 Columns × 3 Rows) -->
				<div class="mt-2">
					<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{#each staffMembers as member, index}
							<div
								class="group flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-900 hover:shadow-lg"
							>
								<!-- Staff Member Photo -->
								<div class="relative shrink-0">
									<div
										class="absolute -inset-1 rounded-2xl bg-amber-400/40 opacity-0 blur-[1px] transition duration-200 group-hover:opacity-100"
									></div>
									<img
										src={member.image}
										alt={member.name}
										class="relative h-20 w-20 rounded-xl border-2 border-slate-200 object-cover shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:border-amber-400"
									/>
									<span
										class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-950 text-[10px] font-black text-white"
									>
										{index + 1}
									</span>
								</div>

								<!-- Staff Member Info -->
								<div class="min-w-0 flex-1">
									<div class="mb-1 inline-block rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-950 uppercase">
										{member.badge}
									</div>
									<h5 class="truncate text-sm font-black tracking-tight text-blue-950 sm:text-base">
										{member.name}
									</h5>
									<p class="text-xs font-semibold text-slate-600">
										{member.role}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Bottom Hierarchy Footnote -->
				<div
					class="mt-10 flex flex-col items-center justify-between gap-3 border-t-2 border-slate-200 pt-6 text-xs font-semibold text-slate-600 sm:flex-row"
				>
					<div class="flex items-center gap-2">
						<span class="h-2 w-2 rounded-full bg-blue-900"></span>
						<span>Executive Line of Responsibility: Municipal Vice Mayor → Staff of the Vice Mayor</span>
					</div>
					<div class="font-mono text-slate-500">
						Tanauan LGU • Human Resource &amp; Public Records Compliance
					</div>
				</div>
			</div>
		{:else}
			<!-- Scanned Official Document View -->
			<div
				class="group relative w-full overflow-hidden rounded-3xl border-2 border-slate-300 bg-gradient-to-b from-slate-50 via-white to-slate-50 p-4 sm:p-8 shadow-sm"
			>
				<div
					class="relative flex cursor-zoom-in items-center justify-center rounded-2xl border border-slate-200 bg-slate-900/5 p-4 sm:p-6"
					onclick={() => (showDocumentModal = true)}
					onkeydown={(e) => e.key === 'Enter' && (showDocumentModal = true)}
					role="button"
					tabindex="0"
					title="Click to view full screen"
				>
					<img
						src="/images/org-charts/vice-mayor-org-chart.png"
						alt="Official Organizational Chart of the Office of the Vice Mayor"
						class="h-auto max-h-[640px] w-full rounded-xl object-contain shadow-md transition-transform duration-300 group-hover:scale-[1.01]"
					/>

					<div
						class="pointer-events-none absolute bottom-8 left-8 flex items-center gap-2 rounded-xl border border-slate-300 bg-white/95 px-4 py-2 opacity-90 shadow-md backdrop-blur-md transition-opacity group-hover:opacity-100"
					>
						<span class="h-2.5 w-2.5 rounded-full bg-blue-900"></span>
						<span class="text-xs font-bold text-slate-800">
							Click image to inspect in high-resolution full screen
						</span>
					</div>
				</div>

				<div
					class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-600"
				>
					<span>Document Reference: OVM-ORG-CHART-2026</span>
					<a
						href="/images/org-charts/vice-mayor-org-chart.png"
						download="Office-of-the-Vice-Mayor-Org-Chart.png"
						class="inline-flex items-center gap-1.5 rounded-lg bg-blue-950 px-3.5 py-1.5 font-bold text-amber-300 transition-colors hover:bg-blue-900 hover:text-white"
					>
						<span>Download High-Res Original ↗</span>
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
			class="animate-in fade-in zoom-in-95 relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border-4 border-amber-400 bg-white shadow-2xl duration-200"
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
							Organizational Chart — Office of the Vice Mayor
						</h4>
						<span class="text-xs font-medium text-blue-200">
							Municipality of Tanauan, Province of Leyte
						</span>
					</div>
				</div>

				<div class="flex items-center gap-3">
					<a
						href="/images/org-charts/vice-mayor-org-chart.png"
						download="Office-of-the-Vice-Mayor-Org-Chart.png"
						class="rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-black tracking-wider text-blue-950 uppercase transition-all hover:bg-amber-300"
					>
						Download File ↗
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

			<!-- Modal Image Viewport -->
			<div class="flex min-h-[400px] items-center justify-center overflow-auto bg-slate-900 p-6">
				<img
					src="/images/org-charts/vice-mayor-org-chart.png"
					alt="Full Organizational Structure of the Office of the Vice Mayor"
					class="h-auto max-h-[75vh] w-auto max-w-full rounded-xl border border-slate-700 bg-white object-contain shadow-2xl"
				/>
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
	department="Vice-Mayors-Office"
	customOrgChart={viceMayorOrgChart}
/>
