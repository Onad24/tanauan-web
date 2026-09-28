<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const defaults = getDeptDefaults('PESO') ?? { department: 'PESO' };

	// Merge Firestore dynamic data over defaults
	const pageData = $derived(mergeOfficeData(defaults, data?.officePageData));

	// Accomplishment photos and modal state
	let showModal = $state(false);
	let activeIndex = $state(0);

	const pesoAccomplishmentsList = [
		{
			id: 'final-deliberation',
			tag: 'DELIBERATION SESSION',
			badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
			title: 'Final Deliberation for the 2025 Search for Best PESO',
			date: 'July 6–7, 2026',
			location: 'DOLE Regional Evaluation Hall',
			image: '/images/accomplishments/peso-accomplishment-3.jpg',
			caption:
				'Municipality of Tanauan PESO delegation proudly presenting the official entry binder during the Final Deliberation for the 2025 Search for Best Public Employment Service Office (2nd Class Municipality Category), spearheaded by the Department of Labor and Employment (DOLE).',
			details: [
				'Official entry dossier for the 2025 Search for Best PESO',
				'Highlighting SPES, TUPAD, Job Fairs, and local labor market facilitation',
				'Delegation led by PESO Manager Joselita L. Retaga with technical staff'
			]
		},
		{
			id: 'technical-evaluation',
			tag: 'TECHNICAL EVALUATION',
			badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
			title: 'Tanauan 2nd Class Municipality Assessment Desk',
			date: 'July 6, 2026',
			location: 'Technical Assessment Desk',
			image: '/images/accomplishments/peso-accomplishment-2.jpg',
			caption:
				'PESO Manager Joselita L. Retaga and the Tanauan technical team undergoing in-depth evaluation and verification of employment statistics, referral metrics, and program implementation data before DOLE regional assessors.',
			details: [
				'Audited placement statistics across 54 barangays',
				'Comprehensive verification of referral and job-matching records',
				'Presentation of institutionalized employment assistance mechanisms'
			]
		},
		{
			id: 'regional-assembly',
			tag: 'REGIONAL ASSEMBLY',
			badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
			title: 'Search for Best PESO 2025 Regional Nominees Assembly',
			date: 'July 7, 2026',
			location: 'Regional Plenary Session',
			image: '/images/accomplishments/peso-accomplishment-1.jpg',
			caption:
				'Regional gathering of municipal, city, and provincial PESO managers alongside DOLE, DILG, and media representatives for the official submission, validation, and celebration of the 2025 Search for Best PESO contenders.',
			details: [
				'Multi-agency evaluation panel including DOLE, DILG, and media partners',
				'Representation of Tanauan among premier local government units in Eastern Visayas',
				'Ceremonial presentation of verified accomplishment folios'
			]
		}
	];

	function openLightbox(index) {
		activeIndex = index;
		showModal = true;
	}

	function closeLightbox() {
		showModal = false;
	}

	function nextImage() {
		activeIndex = (activeIndex + 1) % pesoAccomplishmentsList.length;
	}

	function prevImage() {
		activeIndex =
			(activeIndex - 1 + pesoAccomplishmentsList.length) % pesoAccomplishmentsList.length;
	}

	function handleKeydown(e) {
		if (!showModal) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowRight') nextImage();
		if (e.key === 'ArrowLeft') prevImage();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#snippet pesoAccomplishments()}
	<div class="space-y-8">
		<!-- Featured Official Scorecard Card -->
		<div class="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
			<!-- Header / Folio Tag -->
			<div
				class="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center"
			>
				<div>
					<div class="mb-2 flex flex-wrap items-center gap-2">
						<span class="h-3 w-3 animate-pulse rounded-full bg-amber-500"></span>
						<span class="font-mono text-xs font-black tracking-widest text-blue-950 uppercase">
							AUDITED REPORT // PESO-2025-BEST-PESO
						</span>
						<span
							class="rounded-md border border-emerald-300 bg-emerald-100 px-2.5 py-0.5 text-[11px] font-black text-emerald-800"
						>
							DOLE SEARCH FOR BEST PESO
						</span>
						<span
							class="rounded-md border border-blue-300 bg-blue-100 px-2.5 py-0.5 text-[11px] font-black text-blue-900"
						>
							2ND CLASS MUNICIPALITY
						</span>
					</div>
					<h3 class="text-2xl font-black tracking-tight text-blue-950 sm:text-3xl">
						Final Deliberation for the 2025 Search for Best PESO
					</h3>
					<p class="mt-1 text-sm font-semibold text-slate-600">
						Official performance defense, audited accomplishment binders, and multi-agency
						evaluation • July 6–7, 2026
					</p>
				</div>

				<button
					type="button"
					onclick={() => openLightbox(0)}
					class="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-blue-950 px-5 py-3 text-xs font-black tracking-wider text-amber-300 uppercase shadow-md transition-all hover:scale-102 hover:bg-blue-900 hover:text-white active:scale-98"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<span>View Photo Dossier ({pesoAccomplishmentsList.length})</span>
				</button>
			</div>

			<!-- KPI Cards -->
			<div class="my-8 grid grid-cols-1 gap-5 md:grid-cols-3">
				<div class="rounded-2xl border-2 border-blue-200 bg-blue-50/80 p-5">
					<div class="mb-1 text-[11px] font-black tracking-wider text-blue-900 uppercase">
						SEARCH CLASSIFICATION
					</div>
					<div class="flex items-baseline gap-2">
						<span class="text-2xl font-black text-blue-950 sm:text-3xl">2nd Class</span>
					</div>
					<p class="mt-2 text-xs font-bold text-blue-800">
						Municipality Category Entry • Eastern Visayas
					</p>
				</div>

				<div class="rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-5">
					<div class="mb-1 text-[11px] font-black tracking-wider text-amber-900 uppercase">
						MUNICIPAL SERVICE COVERAGE
					</div>
					<div class="flex items-baseline gap-2">
						<span class="text-3xl font-black text-amber-950 sm:text-4xl">54</span>
						<span class="text-xs font-bold text-slate-500">Barangays</span>
					</div>
					<p class="mt-2 text-xs font-bold text-amber-800">
						SPES, TUPAD, Livelihood & Placement Programs
					</p>
				</div>

				<div class="rounded-2xl border-2 border-emerald-200 bg-emerald-50/80 p-5">
					<div class="mb-1 text-[11px] font-black tracking-wider text-emerald-900 uppercase">
						MULTI-AGENCY EVALUATION
					</div>
					<div class="flex items-baseline gap-2">
						<span class="text-2xl font-black text-emerald-950 sm:text-3xl">DOLE & DILG</span>
					</div>
					<p class="mt-2 text-xs font-bold text-emerald-800">
						Regional Employment Focal & Technical Assessors
					</p>
				</div>
			</div>

			<!-- 3 Photo Showcase Grid -->
			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				{#each pesoAccomplishmentsList as item, index}
					<div
						class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl"
					>
						<!-- Card Top Line -->
						<div
							class="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-blue-900 via-amber-400 to-blue-900"
						></div>

						<div>
							<!-- Image Container with Click-to-Zoom -->
							<button
								type="button"
								onclick={() => openLightbox(index)}
								class="relative block aspect-[4/3] w-full overflow-hidden bg-slate-900 focus:outline-none"
							>
								<img
									src={item.image}
									alt={item.title}
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
									loading="lazy"
								/>
								<div
									class="absolute inset-0 flex items-center justify-center bg-blue-950/40 opacity-0 transition-opacity group-hover:opacity-100"
								>
									<span
										class="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black tracking-wider text-blue-950 uppercase shadow-lg"
									>
										🔍 Zoom Photo
									</span>
								</div>
								<div
									class="absolute top-3 left-3 rounded-md border px-2.5 py-0.5 text-[10px] font-black tracking-wider uppercase shadow-sm backdrop-blur-md {item.badgeColor}"
								>
									{item.tag}
								</div>
								<div
									class="absolute right-3 bottom-3 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-black text-amber-300 backdrop-blur-md"
								>
									Photo {index + 1} of {pesoAccomplishmentsList.length}
								</div>
							</button>

							<!-- Body -->
							<div class="p-5">
								<div
									class="mb-2 flex items-center justify-between text-xs font-bold text-slate-500"
								>
									<span class="font-mono text-blue-950">FOLIO // 0{index + 1}</span>
									<span>{item.date}</span>
								</div>
								<h4 class="text-base font-black text-blue-950 group-hover:text-blue-900">
									{item.title}
								</h4>
								<p class="mt-2 text-xs leading-relaxed text-slate-600">
									{item.caption}
								</p>
							</div>
						</div>

						<!-- Card Footer Action -->
						<div class="border-t border-slate-100 bg-slate-50/80 p-4">
							<button
								type="button"
								onclick={() => openLightbox(index)}
								class="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-950 py-2.5 text-xs font-black tracking-wider text-amber-300 uppercase transition-all hover:bg-blue-900 hover:text-white"
							>
								<span>Examine Verified Folio</span>
								<span>↗</span>
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/snippet}

<!-- Lightbox Modal -->
{#if showModal}
	{@const activeItem = pesoAccomplishmentsList[activeIndex]}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
	>
		<button
			type="button"
			class="absolute inset-0 h-full w-full cursor-default"
			onclick={closeLightbox}
			aria-label="Close modal overlay"
		></button>

		<div
			class="relative flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border-2 border-slate-700 bg-slate-900 shadow-2xl"
		>
			<!-- Top Modal Bar -->
			<div
				class="flex items-center justify-between border-b border-slate-800 bg-blue-950 px-6 py-4 text-white"
			>
				<div class="flex items-center gap-3">
					<span class="h-3 w-3 animate-pulse rounded-full bg-amber-400"></span>
					<div>
						<span class="font-mono text-xs font-black tracking-widest text-amber-400 uppercase">
							PESO ACCOMPLISHMENT DOSSIER // FOLIO 0{activeIndex + 1}
						</span>
						<h3 class="text-base font-black text-white sm:text-lg">
							{activeItem.title}
						</h3>
					</div>
				</div>

				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={closeLightbox}
						class="rounded-xl bg-white/10 p-2 text-white transition-all hover:bg-red-600"
						aria-label="Close lightbox"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Image Display with Prev/Next Controls -->
			<div
				class="relative flex max-h-[60vh] min-h-[320px] items-center justify-center overflow-hidden bg-black p-4 sm:max-h-[65vh]"
			>
				<img
					src={activeItem.image}
					alt={activeItem.title}
					class="max-h-full max-w-full rounded-xl object-contain shadow-2xl transition-all duration-300"
				/>

				<!-- Counter Badge -->
				<div
					class="absolute top-4 left-4 rounded-full border border-amber-400/40 bg-black/70 px-3.5 py-1.5 text-xs font-black tracking-wider text-amber-300 uppercase backdrop-blur-md"
				>
					Photo {activeIndex + 1} of {pesoAccomplishmentsList.length}
				</div>

				<!-- Navigation Buttons -->
				<button
					type="button"
					onclick={prevImage}
					aria-label="Previous photo"
					class="absolute top-1/2 left-4 -translate-y-1/2 rounded-2xl border border-white/20 bg-black/60 p-3 text-white shadow-lg transition-all hover:scale-110 hover:bg-amber-400 hover:text-blue-950 active:scale-95"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="3"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>

				<button
					type="button"
					onclick={nextImage}
					aria-label="Next photo"
					class="absolute top-1/2 right-4 -translate-y-1/2 rounded-2xl border border-white/20 bg-black/60 p-3 text-white shadow-lg transition-all hover:scale-110 hover:bg-amber-400 hover:text-blue-950 active:scale-95"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="3"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>

			<!-- Thumbnail Bar -->
			<div class="border-t border-slate-800 bg-slate-950 px-6 py-3">
				<div class="flex items-center gap-3 overflow-x-auto">
					{#each pesoAccomplishmentsList as thumb, tIdx}
						<button
							type="button"
							onclick={() => (activeIndex = tIdx)}
							class="relative shrink-0 overflow-hidden rounded-xl border-2 transition-all {activeIndex ===
							tIdx
								? 'scale-105 border-amber-400 shadow-md ring-2 ring-amber-400/50'
								: 'border-slate-700 opacity-60 hover:border-slate-500 hover:opacity-100'}"
						>
							<img src={thumb.image} alt="Thumbnail {tIdx + 1}" class="h-16 w-24 object-cover" />
						</button>
					{/each}
				</div>
			</div>

			<!-- Narrative Details -->
			<div class="bg-slate-900 p-6 text-slate-300">
				<div class="mb-2 flex items-center justify-between">
					<span class="text-xs font-black tracking-wider text-amber-400 uppercase">
						Verified Documentation & Scope
					</span>
					<span class="text-xs font-bold text-slate-400">{activeItem.date}</span>
				</div>
				<p class="text-sm leading-relaxed text-slate-200">
					{activeItem.caption}
				</p>
				<div class="mt-4 flex flex-wrap gap-2">
					{#each activeItem.details as d}
						<span
							class="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1 text-xs font-bold text-slate-300"
						>
							✓ {d}
						</span>
					{/each}
				</div>
			</div>

			<!-- Footer Action -->
			<div
				class="flex items-center justify-between border-t border-slate-800 bg-slate-950 px-6 py-3.5 text-xs"
			>
				<span class="font-bold text-slate-400">
					Public Employment Service Office • Municipality of Tanauan, Leyte
				</span>
				<div class="flex items-center gap-3">
					<a
						href={activeItem.image}
						target="_blank"
						download="PESO-Accomplishment-Folio-0{activeIndex + 1}.jpg"
						class="rounded-xl bg-blue-950 px-4 py-2 font-black tracking-wider text-amber-300 uppercase transition-all hover:bg-blue-900 hover:text-white"
					>
						Download Full Resolution ↗
					</a>
					<button
						type="button"
						onclick={closeLightbox}
						class="rounded-xl bg-slate-800 px-4 py-2 font-black tracking-wider text-slate-300 uppercase transition-all hover:bg-slate-700 hover:text-white"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<OfficeTemplate
	{...pageData}
	department="PESO"
	showAwards={true}
	customAccomplishments={pesoAccomplishments}
/>
