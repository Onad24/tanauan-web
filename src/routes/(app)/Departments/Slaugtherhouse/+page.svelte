<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const defaults = getDeptDefaults('Slaugtherhouse') ?? { department: 'Slaugtherhouse' };

	// Merge Firestore dynamic data over defaults
	const pageData = $derived(mergeOfficeData(defaults, data?.officePageData));

	// View mode: 'interactive' | 'document'
	let activeOrgView = $state('interactive');
	let showDocumentModal = $state(false);

	const leaders = [
		{
			name: 'HON. MA. GINA E. MERILO',
			role: 'Municipal Mayor',
			badge: 'Chief Executive',
			color: 'border-red-500 text-red-950 bg-red-50/50 hover:bg-red-50'
		},
		{
			name: 'RET. JUDGE EPHREM S. ABANDO',
			role: 'Municipal Administrator',
			badge: 'Administrative Oversight',
			color: 'border-red-500 text-red-950 bg-red-50/50 hover:bg-red-50'
		},
		{
			name: 'ROBERT T. PRISNO',
			role: 'Acting Municipal Treasurer',
			badge: 'Treasury & Operations Head',
			color: 'border-blue-500 text-blue-950 bg-blue-50/50 hover:bg-blue-50'
		}
	];

	const meatInspectors = [
		{
			name: 'RALPH REO R. TIU',
			role: 'Meat Inspector',
			badge: 'Food Safety & Inspection',
			image: '/images/org-charts/slaughterhouse/tiu.png'
		},
		{
			name: 'PACIFICO M. MOROT',
			role: 'Meat Inspector',
			badge: 'Food Safety & Inspection',
			image: '/images/org-charts/slaughterhouse/morot.png'
		},
		{
			name: 'ALBERT C. TOLIBAS',
			role: 'Meat Inspector',
			badge: 'Food Safety & Inspection',
			image: '/images/org-charts/slaughterhouse/tolibas.png'
		}
	];

	const adminAides = [
		{
			name: 'HENDRIX P. CATUDIO',
			role: 'Administrative Aide',
			badge: 'Operations Support',
			image: '/images/org-charts/slaughterhouse/catudio.png'
		},
		{
			name: 'GILBERT M. NOLASCO',
			role: 'Administrative Aide',
			badge: 'Operations Support',
			image: '/images/org-charts/slaughterhouse/nolasco.png'
		}
	];
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (showDocumentModal = false)} />

{#snippet slaughterhouseOrgChart()}
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
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
				</div>
				<div>
					<div class="flex items-center gap-2">
						<h3 class="text-base font-black tracking-tight text-blue-950 uppercase sm:text-lg">
							Tanauan Slaughterhouse
						</h3>
						<span
							class="rounded-full border border-emerald-300 bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 uppercase"
						>
							Office of Municipal Treasurer
						</span>
					</div>
					<p class="text-xs font-semibold text-slate-500">
						Official Organizational Structure &amp; Meat Inspection Service Matrix
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
				<!-- Civic Header Banner -->
				<div
					class="relative mb-10 flex flex-col items-center justify-center border-b-2 border-slate-200 pb-8 text-center"
				>
					<img
						src="/tanauan logo.svg"
						alt="Seal of Tanauan, Leyte"
						class="mb-3 h-16 w-16 object-contain drop-shadow-md sm:h-20 sm:w-20"
					/>
					<span class="block text-xs font-black tracking-widest text-slate-600 uppercase">
						MUNICIPALITY OF TANAUAN
					</span>
					<div class="my-1 font-serif text-xs text-slate-400 font-semibold">-o0o-</div>
					<div class="text-xs font-black tracking-wider text-slate-800 uppercase sm:text-sm">
						OFFICE OF THE MUNICIPAL TREASURER
					</div>
					<h4 class="mt-1 text-2xl font-black tracking-tight text-blue-700 sm:text-3xl">
						TANAUAN SLAUGHTERHOUSE
					</h4>
					<div class="mt-1 font-serif text-lg font-black tracking-widest text-slate-900 uppercase sm:text-xl">
						ORGANIZATIONAL STRUCTURE
					</div>
				</div>

				<!-- HIERARCHY TREE CONTAINER -->
				<div class="mx-auto flex max-w-2xl flex-col items-center">
					<!-- 1. Executive Tier (Mayor, Admin, Treasurer in Oval Cards) -->
					{#each leaders as leader, idx}
						<div
							class={`group relative w-full max-w-md rounded-full border-2 p-3.5 text-center shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-4 ${leader.color}`}
						>
							<div class="text-xs font-bold tracking-wider text-slate-500 uppercase">
								{leader.badge}
							</div>
							<div class="text-base font-black tracking-tight sm:text-lg">
								{leader.name}
							</div>
							<div class="text-xs font-semibold text-slate-600">
								{leader.role}
							</div>
						</div>

						<!-- Down Arrow Connector -->
						<div class="my-1 flex flex-col items-center text-slate-400">
							<div class="h-4 w-0.5 bg-slate-400"></div>
							<svg class="h-3 w-3 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					{/each}

					<!-- 2. Meat Inspectors (Ralph Reo R. Tiu, Pacifico M. Morot, Albert C. Tolibas) -->
					{#each meatInspectors as inspector, idx}
						<div
							class="group flex flex-col items-center rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-900 hover:shadow-md"
						>
							<div class="relative mb-2.5">
								<img
									src={inspector.image}
									alt={inspector.name}
									class="h-20 w-20 rounded-xl border-2 border-slate-900 object-cover shadow-sm transition-transform duration-200 group-hover:scale-105"
								/>
							</div>
							<div class="text-center">
								<div class="text-sm font-black tracking-tight text-blue-950 sm:text-base">
									{inspector.name}
								</div>
								<div class="text-xs font-bold text-amber-700 uppercase">
									{inspector.role}
								</div>
								<span class="mt-1 inline-block rounded border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-950">
									{inspector.badge}
								</span>
							</div>
						</div>

						<!-- Down Arrow Connector between inspectors (or to the branch for the last one) -->
						{#if idx < meatInspectors.length - 1}
							<div class="my-1 flex flex-col items-center text-slate-400">
								<div class="h-4 w-0.5 bg-slate-400"></div>
								<svg class="h-3 w-3 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
						{/if}
					{/each}

					<!-- 3. Branching Connectors to Administrative Aides -->
					<div class="relative mt-6 w-full pt-4">
						<!-- Bracket lines connecting Albert C. Tolibas to Hendrix Catudio & Gilbert Nolasco -->
						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
							<!-- Left Aide: Hendrix P. Catudio -->
							<div
								class="group relative flex flex-col items-center rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-900 hover:shadow-md"
							>
								<!-- Connecting Bracket Indicator -->
								<div class="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-amber-400 px-2 py-0.5 text-[9px] font-black text-blue-950 uppercase">
									Support Staff
								</div>
								<div class="relative mb-2.5 mt-1">
									<img
										src={adminAides[0].image}
										alt={adminAides[0].name}
										class="h-20 w-20 rounded-xl border-2 border-slate-900 object-cover shadow-sm transition-transform duration-200 group-hover:scale-105"
									/>
								</div>
								<div class="text-center">
									<div class="text-sm font-black tracking-tight text-blue-950 sm:text-base">
										{adminAides[0].name}
									</div>
									<div class="text-xs font-bold text-slate-600 uppercase">
										{adminAides[0].role}
									</div>
									<span class="mt-1 inline-block rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
										{adminAides[0].badge}
									</span>
								</div>
							</div>

							<!-- Right Aide: Gilbert M. Nolasco -->
							<div
								class="group relative flex flex-col items-center rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-900 hover:shadow-md"
							>
								<!-- Connecting Bracket Indicator -->
								<div class="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-amber-400 px-2 py-0.5 text-[9px] font-black text-blue-950 uppercase">
									Support Staff
								</div>
								<div class="relative mb-2.5 mt-1">
									<img
										src={adminAides[1].image}
										alt={adminAides[1].name}
										class="h-20 w-20 rounded-xl border-2 border-slate-900 object-cover shadow-sm transition-transform duration-200 group-hover:scale-105"
									/>
								</div>
								<div class="text-center">
									<div class="text-sm font-black tracking-tight text-blue-950 sm:text-base">
										{adminAides[1].name}
									</div>
									<div class="text-xs font-bold text-slate-600 uppercase">
										{adminAides[1].role}
									</div>
									<span class="mt-1 inline-block rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
										{adminAides[1].badge}
									</span>
								</div>
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
						<span
							>Chain of Command: Mayor → Administrator → Municipal Treasurer → Meat Inspection Section</span
						>
					</div>
					<div class="font-mono text-slate-500">
						Official Transparency Record • Municipality of Tanauan
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
						src="/images/org-charts/slaughterhouse-org-chart.png"
						alt="Official Organizational Structure of the Tanauan Slaughterhouse"
						class="h-auto max-h-[640px] w-full max-w-lg rounded-xl object-contain shadow-md transition-transform duration-300 group-hover:scale-[1.01]"
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
					<span>Document Reference: MSH-ORG-CHART-2026</span>
					<a
						href="/images/org-charts/slaughterhouse-org-chart.png"
						download="Tanauan-Slaughterhouse-Organizational-Structure.png"
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
			class="animate-in fade-in zoom-in-95 relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border-4 border-amber-400 bg-white shadow-2xl duration-200"
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
							Organizational Structure — Tanauan Slaughterhouse
						</h4>
						<span class="text-xs font-medium text-blue-200">
							Office of the Municipal Treasurer • Municipality of Tanauan
						</span>
					</div>
				</div>

				<div class="flex items-center gap-3">
					<a
						href="/images/org-charts/slaughterhouse-org-chart.png"
						download="Tanauan-Slaughterhouse-Organizational-Structure.png"
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
					src="/images/org-charts/slaughterhouse-org-chart.png"
					alt="Full Organizational Structure of Tanauan Slaughterhouse"
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
	department="Slaugtherhouse"
	customOrgChart={slaughterhouseOrgChart}
/>
