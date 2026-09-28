<script>
	import { onMount } from 'svelte';
	import { officesByDepartment } from '$lib/config';

	export let department = '';
	export let limit = 3;
	export let collapsible = true;
	export let cleanLayout = false;

	let awards = [];
	let offices = [];
	let selectedOffice = '';
	let loading = true;
	let error = '';
	let isExpanded = false;
	let selectedPost = null;
	let activePhotoIndex = 0;

	const uploadedPhotosMap = {
		'Active Case Finding': [
			'/images/accomplishments/media_1789383481702.jpg',
			'/images/accomplishments/media_1789383481779.jpg',
			'/images/accomplishments/media_1789383481830.jpg',
			'/images/accomplishments/media_1789383481902.jpg',
			'/images/accomplishments/media_1789383481933.jpg'
		],
		'School Based Immunization': [
			'/images/accomplishments/media_1789384261594.jpg',
			'/images/accomplishments/media_1789384261621.jpg',
			'/images/accomplishments/media_1789384261723.jpg',
			'/images/accomplishments/media_1789384261755.jpg',
			'/images/accomplishments/media_1789384262054.jpg'
		],
		'Best PESO': [
			'/images/accomplishments/peso-accomplishment-3.jpg',
			'/images/accomplishments/peso-accomplishment-2.jpg',
			'/images/accomplishments/peso-accomplishment-1.jpg'
		]
	};

	function getMediaForPost(item) {
		const title = (item.header || '').toLowerCase();
		let extra = [];
		if (title.includes('active case finding') || title.includes('case finding')) {
			extra = uploadedPhotosMap['Active Case Finding'] || [];
		} else if (title.includes('school based') || title.includes('immunization')) {
			extra = uploadedPhotosMap['School Based Immunization'] || [];
		} else if (
			title.includes('peso') ||
			title.includes('best peso') ||
			title.includes('deliberation')
		) {
			extra = uploadedPhotosMap['Best PESO'] || [];
		}
		const originalMedia = item.media || [];
		const combined = [...extra];
		for (const m of originalMedia) {
			if (!combined.includes(m)) {
				combined.push(m);
			}
		}
		return combined;
	}

	function openPostModal(post) {
		const media = getMediaForPost(post);
		selectedPost = {
			...post,
			allMedia: media.length > 0 ? media : post.media || []
		};
		activePhotoIndex = 0;
	}

	function closePostModal() {
		selectedPost = null;
		activePhotoIndex = 0;
	}

	function nextPhoto() {
		if (!selectedPost || !selectedPost.allMedia || selectedPost.allMedia.length <= 1) return;
		activePhotoIndex = (activePhotoIndex + 1) % selectedPost.allMedia.length;
	}

	function prevPhoto() {
		if (!selectedPost || !selectedPost.allMedia || selectedPost.allMedia.length <= 1) return;
		activePhotoIndex =
			(activePhotoIndex - 1 + selectedPost.allMedia.length) % selectedPost.allMedia.length;
	}

	const pesoDefaultAwards = [
		{
			id: 'peso-deliberation-best-peso-2025',
			header:
				'Final Deliberation for the 2025 Search for Best Public Employment Service Office (PESO)',
			content:
				'Official participation and presentation of the Municipality of Tanauan PESO delegation in the Final Deliberation for the 2025 Search for Best PESO (2nd Class Municipality Category), spearheaded by the Department of Labor and Employment (DOLE) on July 6–7, 2026. The official entry dossier highlights comprehensive employment facilitation, Special Program for Employment of Students (SPES), TUPAD emergency employment assistance, job fairs, and labor market partnerships across all 54 barangays.',
			date_added: '2026-07-07T00:00:00.000Z',
			media: [
				'/images/accomplishments/peso-accomplishment-3.jpg',
				'/images/accomplishments/peso-accomplishment-2.jpg',
				'/images/accomplishments/peso-accomplishment-1.jpg'
			]
		},
		{
			id: 'peso-regional-evaluation-2nd-class',
			header: 'DOLE Regional Technical Evaluation: Tanauan 2nd Class Municipality Desk',
			content:
				'PESO Manager Joselita L. Retaga and technical staff undergoing rigorous technical evaluation and documentation audit by DOLE regional assessors. Presentation covered verified job placement rates, referral systems, youth employment initiatives, and institutionalized frontline employment services in Tanauan, Leyte.',
			date_added: '2026-07-06T00:00:00.000Z',
			media: ['/images/accomplishments/peso-accomplishment-2.jpg']
		},
		{
			id: 'peso-regional-assembly-2025',
			header: 'Search for Best PESO 2025 Regional Nominees & Multi-Agency Assembly',
			content:
				'Convening of municipal, city, and provincial PESO managers alongside DOLE, DILG, and regional focal representatives for the ceremonial submission and mutual recognition of 2025 Best PESO dossiers and accomplishment records.',
			date_added: '2026-07-07T00:00:00.000Z',
			media: ['/images/accomplishments/peso-accomplishment-1.jpg']
		}
	];

	const defaultDepartmentPosts = {
		Licensing: [
			{
				id: 'bplo-comparative-summary-2026',
				header: 'Comparative Summary of Registration and Assessment (As of August 2026)',
				content:
					'Official comparative revenue and business registration audit report from January – August 2025 versus January – August 2026. Total business registrations reached 3,637 units (+6% increase) yielding a total assessment of ₱25,801,882.26 (+17.7% increase), reflecting buoyant local economic enterprise in Tanauan.',
				date_added: '2026-08-31T00:00:00.000Z',
				media: ['/images/accomplishments/bplo-comparative-summary-2026.jpg']
			}
		],
		PESO: pesoDefaultAwards,
		Peso: pesoDefaultAwards
	};

	onMount(async () => {
		if (!department) {
			error = 'Department not specified';
			loading = false;
			return;
		}

		try {
			const response = await fetch(
				`/api/posts?department=${encodeURIComponent(department)}&type=${encodeURIComponent('accomplishment')}`
			);
			if (!response.ok) throw new Error('Failed to fetch accomplishments');
			const data = await response.json();
			const fetched = data.posts || [];
			if (fetched.length === 0 && defaultDepartmentPosts[department]) {
				awards = defaultDepartmentPosts[department];
			} else {
				awards = fetched;
			}
			offices = officesByDepartment[department] || [];
		} catch (err) {
			if (defaultDepartmentPosts[department]) {
				awards = defaultDepartmentPosts[department];
			} else {
				error = err.message;
			}
			console.error('Error loading accomplishments:', err);
		} finally {
			loading = false;
		}
	});

	$: displayed =
		isExpanded || !collapsible || awards.length <= limit ? awards : awards.slice(0, limit);

	function formatDate(dateStr) {
		if (!dateStr) return 'Current Term';
		try {
			const d = new Date(dateStr);
			return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
		} catch {
			return 'Recent';
		}
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') closePostModal();
		if (selectedPost) {
			if (e.key === 'ArrowRight') nextPhoto();
			if (e.key === 'ArrowLeft') prevPhoto();
		}
	}}
/>

<div class={cleanLayout ? '' : 'rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm'}>
	{#if !cleanLayout}
		<div class="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
			<h2 class="text-2xl font-black text-blue-950">Accomplishment Reports</h2>
			{#if awards.length > 0}
				<span class="rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-blue-950">
					{awards.length} PUBLISHED {awards.length > 1 ? 'REPORTS' : 'REPORT'}
				</span>
			{/if}
		</div>
	{/if}

	{#if loading}
		<div class="flex flex-col items-center justify-center py-16 text-slate-500">
			<div
				class="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-amber-400 border-t-blue-900"
			></div>
			<p class="text-sm font-bold tracking-wide text-slate-700 uppercase">
				Loading Audited Reports...
			</p>
		</div>
	{:else if error}
		<div
			class="rounded-xl border-2 border-red-300 bg-red-50 p-6 text-center font-bold text-red-800"
		>
			Notice: {error}
		</div>
	{:else if awards.length === 0}
		<div
			class="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-600"
		>
			<div class="mb-1 text-base font-black text-blue-950">No Accomplishment Reports on Record</div>
			<p class="text-xs text-slate-500">
				Audited fiscal disclosures and departmental scorecards are scheduled for release.
			</p>
		</div>
	{:else}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each displayed as item, idx}
				{@const postMedia = getMediaForPost(item)}
				{@const thumbUrl = postMedia.length > 0 ? postMedia[0] : item.media && item.media[0]}
				<article
					role="button"
					tabindex="0"
					onclick={() => openPostModal(item)}
					onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && openPostModal(item)}
					class="group relative flex cursor-pointer flex-col justify-between rounded-2xl border-2 border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-2xl focus:ring-4 focus:ring-amber-400/40 focus:outline-none sm:p-6"
				>
					<!-- Top Accent Border Line -->
					<div
						class="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-blue-900 via-amber-400 to-blue-900 opacity-80 transition-opacity group-hover:opacity-100"
					></div>

					<div>
						<!-- Document Metadata Header -->
						<div
							class="mb-4 flex items-center justify-between gap-2 border-b border-slate-100 pb-3"
						>
							<div class="flex items-center gap-2">
								<span class="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
								<span
									class="font-mono text-[11px] font-black tracking-wider text-blue-950 uppercase"
								>
									FOLIO // 0{idx + 1}
								</span>
							</div>
							<div class="flex items-center gap-1.5">
								{#if postMedia.length > 1}
									<span
										class="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-[11px] font-extrabold text-blue-900"
									>
										📷 {postMedia.length} Photos
									</span>
								{/if}
								<span
									class="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-extrabold text-slate-600"
								>
									{formatDate(item.date_added)}
								</span>
							</div>
						</div>

						<!-- Media / Document Presentation Preview -->
						<div
							class="relative mb-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 transition-all group-hover:shadow-md"
						>
							{#if thumbUrl}
								{#if thumbUrl.endsWith('.mp4') || thumbUrl.endsWith('.webm')}
									<video src={thumbUrl} class="h-48 w-full rounded-lg object-cover" muted>
										<track kind="captions" />
									</video>
								{:else if thumbUrl.endsWith('.pptx') || thumbUrl.endsWith('.ppt')}
									<div
										class="flex min-h-[180px] flex-col items-center justify-center bg-gradient-to-b from-blue-50/80 to-white p-6 text-center"
									>
										<div
											class="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-amber-500 bg-amber-400 text-sm font-black text-blue-950 shadow-sm"
										>
											PPTX
										</div>
										<span class="mb-1 text-xs font-black tracking-wide text-blue-950 uppercase">
											Executive Presentation Deck
										</span>
									</div>
								{:else if thumbUrl.endsWith('.pdf')}
									<div
										class="flex min-h-[180px] flex-col items-center justify-center bg-gradient-to-b from-blue-50/80 to-white p-6 text-center"
									>
										<div
											class="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-blue-950 bg-blue-900 text-sm font-black text-amber-400 shadow-sm"
										>
											PDF
										</div>
										<span class="mb-1 text-xs font-black tracking-wide text-blue-950 uppercase">
											Official Signed Document
										</span>
									</div>
								{:else}
									<img
										src={thumbUrl}
										alt={item.header}
										class="h-48 w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
										loading="lazy"
									/>
								{/if}

								<!-- Hover Badge Overlay -->
								<div
									class="absolute inset-0 flex items-center justify-center bg-blue-950/40 opacity-0 transition-opacity group-hover:opacity-100"
								>
									<span
										class="flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 text-xs font-black tracking-wider text-blue-950 uppercase shadow-lg"
									>
										🔍 View Photo Gallery ({postMedia.length})
									</span>
								</div>
							{:else}
								<div
									class="flex h-48 items-center justify-center bg-slate-100 text-xs font-bold text-slate-400 uppercase"
								>
									Official Administrative Record
								</div>
							{/if}
						</div>

						<!-- Report Title & Description -->
						<h3
							class="text-lg leading-snug font-black tracking-tight text-blue-950 transition-colors group-hover:text-amber-600"
						>
							{item.header}
						</h3>
						{#if item.content && item.content !== item.header}
							<p class="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-700">
								{item.content}
							</p>
						{/if}
					</div>

					<!-- Direct Access Action Button -->
					<div class="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
						<span
							class="flex items-center gap-1.5 text-[11px] font-extrabold tracking-wider text-emerald-800 uppercase"
						>
							<span class="h-2 w-2 rounded-full bg-emerald-600"></span>
							COA Audited & Filed
						</span>

						<button
							type="button"
							onclick={(e) => {
								e.stopPropagation();
								openPostModal(item);
							}}
							class="inline-flex items-center gap-1.5 rounded-xl bg-blue-950 px-4 py-2 text-xs font-black tracking-wider text-amber-300 uppercase shadow-sm transition-all hover:scale-105 hover:bg-blue-900 hover:text-white"
						>
							<span>View Photos ↗</span>
						</button>
					</div>
				</article>
			{/each}
		</div>

		<!-- Polished Show More / Show Less Collapsible Toggle -->
		{#if collapsible && awards.length > limit}
			<div
				class="mt-8 flex flex-col items-center justify-between gap-4 border-t-2 border-slate-200 pt-6 sm:flex-row"
			>
				<div class="flex items-center gap-2">
					<span class="h-3 w-3 rounded-full bg-amber-500"></span>
					<span class="text-xs font-bold tracking-wide text-slate-700 uppercase">
						Displaying {displayed.length} of {awards.length} verified accomplishment reports
					</span>
				</div>
				<button
					type="button"
					onclick={() => (isExpanded = !isExpanded)}
					class="inline-flex items-center gap-2 rounded-xl border border-blue-900 bg-blue-950 px-6 py-2.5 text-xs font-black tracking-wider text-amber-300 uppercase shadow-md transition-all hover:scale-105 hover:bg-blue-900 hover:text-white active:scale-95"
				>
					<span
						>{isExpanded
							? '▲ View Less Reports'
							: `▼ Load Additional Reports (+${awards.length - limit} more)`}</span
					>
				</button>
			</div>
		{/if}
	{/if}
</div>

<!-- Interactive Modal Dialog with Photo Viewer & Thumbnail Strip -->
{#if selectedPost}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/85 p-3 backdrop-blur-md sm:p-6"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<!-- Backdrop click to close -->
		<button
			type="button"
			class="fixed inset-0 -z-10 h-full w-full cursor-default focus:outline-none"
			aria-label="Close modal backdrop"
			onclick={closePostModal}
		></button>

		<div
			class="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border-2 border-amber-400 bg-white shadow-2xl"
		>
			<!-- Header Bar -->
			<div
				class="flex shrink-0 items-center justify-between border-b-2 border-amber-400 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 px-6 py-4 text-white"
			>
				<div class="flex items-center gap-3 pr-4">
					<span class="h-3 w-3 animate-pulse rounded-full bg-amber-400"></span>
					<div>
						<span class="block font-mono text-[11px] tracking-widest text-amber-300 uppercase">
							Accomplishment Activity Documentation
						</span>
						<h2
							id="modal-title"
							class="line-clamp-1 text-lg font-black tracking-tight text-white sm:text-xl"
						>
							{selectedPost.header}
						</h2>
					</div>
				</div>

				<button
					type="button"
					onclick={closePostModal}
					aria-label="Close modal"
					class="flex shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 p-2 text-white transition-all hover:scale-110 hover:bg-red-600"
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

			<!-- Modal Main Content Area -->
			<div class="flex flex-1 flex-col gap-5 overflow-y-auto bg-slate-50 p-4 sm:p-6">
				{#if selectedPost.allMedia && selectedPost.allMedia.length > 0}
					<!-- Main Active Photo Display Frame -->
					<div
						class="group relative flex max-h-[550px] min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-inner sm:min-h-[440px]"
					>
						{#if selectedPost.allMedia[activePhotoIndex].endsWith('.mp4') || selectedPost.allMedia[activePhotoIndex].endsWith('.webm')}
							<video
								src={selectedPost.allMedia[activePhotoIndex]}
								class="mx-auto max-h-[500px] w-auto max-w-full"
								controls
								autoplay
							>
								<track kind="captions" />
							</video>
						{:else}
							<img
								src={selectedPost.allMedia[activePhotoIndex]}
								alt="{selectedPost.header} photo {activePhotoIndex + 1}"
								class="mx-auto max-h-[520px] w-auto max-w-full object-contain transition-all duration-300"
							/>
						{/if}

						<!-- Photo counter pill -->
						<div
							class="absolute top-4 left-4 rounded-full border border-amber-400/40 bg-black/70 px-3.5 py-1.5 text-xs font-black tracking-wider text-amber-300 uppercase backdrop-blur-md"
						>
							Photo {activePhotoIndex + 1} of {selectedPost.allMedia.length}
						</div>

						<!-- Prev / Next Navigation Arrows -->
						{#if selectedPost.allMedia.length > 1}
							<button
								type="button"
								onclick={prevPhoto}
								aria-label="Previous photo"
								class="absolute top-1/2 left-3 -translate-y-1/2 rounded-2xl border border-white/20 bg-black/60 p-3 text-white shadow-lg transition-all hover:scale-110 hover:bg-amber-400 hover:text-blue-950 active:scale-95"
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
								onclick={nextPhoto}
								aria-label="Next photo"
								class="absolute top-1/2 right-3 -translate-y-1/2 rounded-2xl border border-white/20 bg-black/60 p-3 text-white shadow-lg transition-all hover:scale-110 hover:bg-amber-400 hover:text-blue-950 active:scale-95"
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
						{/if}
					</div>

					<!-- Thumbnail Strip for Quick Navigation -->
					{#if selectedPost.allMedia.length > 1}
						<div class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
							<div
								class="mb-2 flex items-center justify-between text-[11px] font-black tracking-wider text-slate-500 uppercase"
							>
								<span>Click any photo to preview:</span>
								<span class="font-bold text-blue-950"
									>{selectedPost.allMedia.length} Images in Folio</span
								>
							</div>
							<div class="flex items-center gap-2.5 overflow-x-auto pb-1.5">
								{#each selectedPost.allMedia as mediaItem, pIdx}
									<button
										type="button"
										onclick={() => (activePhotoIndex = pIdx)}
										class="relative shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 {activePhotoIndex ===
										pIdx
											? 'scale-105 border-amber-400 shadow-md ring-2 ring-amber-400/50'
											: 'border-slate-200 opacity-60 hover:border-slate-400 hover:opacity-100'}"
									>
										<img
											src={mediaItem}
											alt="Thumbnail {pIdx + 1}"
											class="h-16 w-16 object-cover sm:h-20 sm:w-20"
											loading="lazy"
										/>
										{#if activePhotoIndex === pIdx}
											<div class="pointer-events-none absolute inset-0 bg-amber-400/20"></div>
										{/if}
									</button>
								{/each}
							</div>
						</div>
					{/if}
				{/if}

				<!-- Description / Narrative Body -->
				<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div class="mb-2 flex items-center justify-between">
						<span class="text-xs font-black tracking-wide text-blue-950 uppercase"
							>Activity Narrative & Scope</span
						>
						<span class="text-xs font-bold text-slate-500"
							>{formatDate(selectedPost.date_added)}</span
						>
					</div>
					<p class="text-sm leading-relaxed whitespace-pre-line text-slate-700">
						{selectedPost.content || selectedPost.header}
					</p>
				</div>
			</div>

			<!-- Footer Modal Bar -->
			<div
				class="flex shrink-0 items-center justify-between border-t border-slate-200 bg-slate-100 px-6 py-3.5"
			>
				<div class="flex items-center gap-2">
					<span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
					<span class="text-xs font-extrabold tracking-wide text-slate-600 uppercase">
						Official Department Document Record
					</span>
				</div>
				<button
					type="button"
					onclick={closePostModal}
					class="rounded-xl bg-blue-950 px-5 py-2 text-xs font-black tracking-wider text-amber-300 uppercase shadow-sm transition-all hover:bg-blue-900 hover:text-white"
				>
					Close Viewer
				</button>
			</div>
		</div>
	</div>
{/if}
