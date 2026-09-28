<script>
	import { onMount } from 'svelte';
	import { officesByDepartment } from '$lib/config';

	export let department = '';
	export let cleanLayout = false;
	export let defaultImage = '';

	const defaultDepartmentCharts = {
		Market: '/Market-OrgChart.jpg',
		'Municipal Market Office': '/Market-OrgChart.jpg',
		Engineering: '/Engineering Office-OrgChart.webp',
		'Engineering Office': '/Engineering Office-OrgChart.webp',
		GSO: '/GSO-OrgChart-Part1.png',
		'General Services Office': '/GSO-OrgChart-Part1.png'
	};

	let awards = [];
	let offices = [];
	let selectedOffice = '';
	let loading = true;
	let error = '';
	let showModal = false;
	let activeTab = 'blueprint'; // 'blueprint' | 'tree'
	function getValidImage(post) {
		if (!post || !Array.isArray(post.media)) return null;
		const img = post.media.find(
			(url) => typeof url === 'string' && !url.toLowerCase().split('?')[0].endsWith('.pdf')
		);
		return img || null;
	}

	$: activeDefaultImage = defaultImage || defaultDepartmentCharts[department] || '';
	$: filtered = selectedOffice ? awards.filter((u) => u.office === selectedOffice) : awards;
	$: firestoreImage = filtered.length > 0 ? getValidImage(filtered[0]) : null;
	$: currentImage = activeDefaultImage || firestoreImage || '';
	$: isMarket = department === 'Market' || department === 'Municipal Market Office';

	onMount(async () => {
		if (!department) {
			error = 'Department not specified';
			loading = false;
			return;
		}

		try {
			const response = await fetch(
				`/api/others?department=${encodeURIComponent(department)}&type=${encodeURIComponent('Organizational Chart')}`
			);
			if (!response.ok) throw new Error('Failed to fetch organizational chart');
			const data = await response.json();
			awards = data.posts || [];
			offices = officesByDepartment[department] || [];
		} catch (err) {
			error = err.message;
			console.error('Error loading org chart:', err);
		} finally {
			loading = false;
		}
	});

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && closeModal()} />

<div class={cleanLayout ? '' : 'rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm'}>
	{#if !cleanLayout}
		<h2 class="mb-4 text-2xl font-black text-blue-950">Organizational Chart</h2>
	{/if}

	{#if loading && !currentImage}
		<div class="flex flex-col items-center justify-center py-16 text-slate-500">
			<div class="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-amber-400 border-t-blue-900"></div>
			<p class="text-sm font-bold tracking-wide text-slate-700 uppercase">
				Loading Official Hierarchy...
			</p>
		</div>
	{:else if !currentImage && filtered.length === 0}
		<div class="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-600">
			<div class="mb-1 text-base font-black text-blue-950">No Organizational Chart on Record</div>
			<p class="text-xs text-slate-500">
				Official supervisory matrix for this office is being updated.
			</p>
		</div>
	{:else}
		<div class="flex w-full flex-col items-center space-y-4">
			<!-- Header & View Mode Switcher -->
			{#if isMarket}
				<div class="flex flex-wrap items-center justify-between gap-3 w-full max-w-5xl px-1">
					<div class="flex items-center gap-2">
						<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-950 border border-blue-200">
							<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
							LGU Tanauan Official Structure
						</span>
					</div>

					<div class="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-2xs">
						<button
							type="button"
							onclick={() => (activeTab = 'blueprint')}
							class={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
								activeTab === 'blueprint'
									? 'bg-blue-950 text-amber-300 shadow-xs'
									: 'text-slate-600 hover:text-blue-950 hover:bg-white/60'
							}`}
						>
							<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<span>Ratified Chart Document</span>
						</button>
						<button
							type="button"
							onclick={() => (activeTab = 'tree')}
							class={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
								activeTab === 'tree'
									? 'bg-blue-950 text-amber-300 shadow-xs'
									: 'text-slate-600 hover:text-blue-950 hover:bg-white/60'
							}`}
						>
							<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
							</svg>
							<span>Interactive Organogram</span>
						</button>
					</div>
				</div>
			{/if}

			{#if activeTab === 'blueprint'}
				<!-- Blueprint Frame Container with Micro-Controls -->
				<div class="group relative w-full max-w-5xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 shadow-sm transition-all duration-300 hover:border-blue-900/40 hover:shadow-xl">
					<!-- Technical Blueprint Header Bar -->
					<div class="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-200 bg-slate-100/90 px-5 py-3 backdrop-blur-sm">
						<div class="flex items-center gap-3">
							<span class="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
							<span class="font-mono text-xs font-black tracking-wider text-blue-950 uppercase">
								CSC-RATIFIED DIRECTORY // {department}
							</span>
							<span class="hidden rounded border border-amber-500 bg-amber-400 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-blue-950 sm:inline-block">
								ACTIVE
							</span>
						</div>

						<!-- Direct Interactive Action Buttons -->
						<div class="flex items-center gap-2">
							<a
								href={currentImage}
								download="Tanauan-Public-Market-Organizational-Structure.jpg"
								class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-950 transition-colors shadow-2xs"
								title="Download official chart image"
							>
								<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
								</svg>
								<span>Download</span>
							</a>
							<button
								type="button"
								onclick={openModal}
								class="inline-flex items-center gap-1.5 rounded-lg bg-blue-950 px-3.5 py-1.5 text-xs font-black tracking-wider text-white uppercase shadow-sm transition-all hover:scale-105 hover:bg-blue-900 active:scale-95"
								title="Open high-resolution inspect viewer"
							>
								<span>[⛶ Full Screen]</span>
							</button>
						</div>
					</div>

					<!-- Visual Blueprint Display Area -->
					<button
						type="button"
						class="relative flex w-full cursor-zoom-in items-center justify-center bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] p-4 sm:p-6 text-left"
						onclick={openModal}
						title="Click to inspect full size"
					>
						<!-- Subtle Municipal Seal Watermark -->
						<img
							src="/tanauan logo.svg"
							alt=""
							class="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 opacity-5 select-none"
						/>

						<img
							src={currentImage || '/Market-OrgChart.jpg'}
							alt="Official Organizational Chart of {department}"
							class="h-auto max-h-[560px] w-full rounded-xl object-contain shadow-sm transition-transform duration-500 group-hover:scale-[1.01]"
							onerror={() => {
								if (currentImage !== '/Market-OrgChart.jpg') currentImage = '/Market-OrgChart.jpg';
							}}
						/>

						<!-- Click to Zoom Hint Overlay -->
						<div class="pointer-events-none absolute bottom-6 left-6 flex items-center gap-2 rounded-lg border border-slate-300 bg-white/95 px-3.5 py-1.5 opacity-85 shadow-sm backdrop-blur-md transition-opacity group-hover:opacity-100">
							<span class="h-2 w-2 rounded-full bg-blue-900"></span>
							<span class="text-[11px] font-bold text-slate-800">
								Click blueprint to inspect in full zoom
							</span>
						</div>
					</button>

					<!-- Blueprint Footer Metadata -->
					<div class="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-100/70 px-5 py-2.5 text-[11px] font-semibold text-slate-600">
						<span>Executive Line of Authority: Municipal Mayor → Sangguniang Bayan → Department Head</span>
						<span class="font-mono text-slate-500">FORMAT: OFFICIAL PUBLIC RECORD</span>
					</div>
				</div>
			{:else if activeTab === 'tree' && isMarket}
				<!-- Interactive Organogram Visual Tree -->
				<div class="w-full max-w-5xl rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-8 shadow-sm">
					<!-- Organogram Header Banner -->
					<div class="rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 p-6 text-white text-center shadow-md relative overflow-hidden mb-10">
						<div class="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
						<div class="flex items-center justify-center gap-4 mb-2">
							<img src="/tanauan logo.svg" alt="Tanauan Seal" class="h-12 w-12 rounded-full bg-white p-1 border-2 border-amber-400 shadow" />
							<div>
								<h3 class="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
									Tanauan Public Market
								</h3>
								<p class="text-xs font-bold text-amber-300 tracking-widest uppercase">
									Organizational Structure
								</p>
							</div>
						</div>
					</div>

					<!-- Visual Node Hierarchy -->
					<div class="flex flex-col items-center space-y-6">
						<!-- LEVEL 1: MUNICIPAL MAYOR -->
						<div class="relative flex flex-col items-center">
							<div class="w-72 sm:w-80 rounded-2xl border-2 border-blue-600 bg-white shadow-md overflow-hidden text-center transition-all hover:scale-102 hover:shadow-lg">
								<div class="bg-blue-600 text-white py-1.5 px-4 text-xs font-black uppercase tracking-wider">
									Municipal Mayor
								</div>
								<div class="py-3 px-4">
									<h4 class="text-base sm:text-lg font-black text-blue-950">
										Hon. Ma. Gina E. Merilo
									</h4>
									<span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
										Municipal Chief Executive
									</span>
								</div>
							</div>

							<!-- Connecting vertical line -->
							<div class="w-0.5 h-8 bg-blue-700"></div>
						</div>

						<!-- LEVEL 2: MARKET SUPERVISOR & MARKET COLLECTORS -->
						<div class="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 w-full max-w-3xl">
							<!-- Center Node: Market Supervisor -->
							<div class="relative flex flex-col items-center">
								<div class="w-72 sm:w-80 rounded-2xl border-2 border-emerald-600 bg-white shadow-md overflow-hidden text-center transition-all hover:scale-102 hover:shadow-lg">
									<div class="bg-emerald-600 text-white py-1.5 px-4 text-xs font-black uppercase tracking-wider">
										Market Supervisor
									</div>
									<div class="py-3 px-4">
										<h4 class="text-base sm:text-lg font-black text-blue-950">
											Engr. Lue M. Maderazo
										</h4>
										<span class="text-[11px] font-bold text-emerald-700 tracking-wider block mt-0.5">
											(Department Head / Supervisor)
										</span>
									</div>
								</div>

								<!-- Connector going down to Operations -->
								<div class="w-0.5 h-8 bg-blue-700"></div>
							</div>

							<!-- Side Branch: Market Collectors -->
							<div class="relative lg:-mt-8">
								<!-- Connector Line from Supervisor on desktop -->
								<div class="hidden lg:block absolute -left-12 top-1/2 w-12 h-0.5 bg-blue-600"></div>

								<div class="w-72 sm:w-80 rounded-2xl border-2 border-sky-600 bg-sky-50/50 shadow-md overflow-hidden transition-all hover:scale-102 hover:shadow-lg">
									<div class="bg-sky-600 text-white py-1.5 px-4 text-xs font-black uppercase tracking-wider text-center">
										Market Collectors
									</div>
									<div class="p-3.5 space-y-2">
										<div class="flex items-center gap-2.5 bg-white border border-sky-200 rounded-xl px-3 py-2 shadow-2xs">
											<span class="h-2 w-2 rounded-full bg-sky-500"></span>
											<span class="text-xs font-black text-blue-950 uppercase">Lorna Tangpuz</span>
										</div>
										<div class="flex items-center gap-2.5 bg-white border border-sky-200 rounded-xl px-3 py-2 shadow-2xs">
											<span class="h-2 w-2 rounded-full bg-sky-500"></span>
											<span class="text-xs font-black text-blue-950 uppercase">Ericson Aguipo</span>
										</div>
										<div class="flex items-center gap-2.5 bg-white border border-sky-200 rounded-xl px-3 py-2 shadow-2xs">
											<span class="h-2 w-2 rounded-full bg-sky-500"></span>
											<span class="text-xs font-black text-blue-950 uppercase">Stephen Lopez</span>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- Horizontal Distribution Line to Operations -->
						<div class="hidden md:block w-full max-w-2xl h-0.5 bg-blue-700 relative">
							<!-- T-junction drops -->
							<div class="absolute left-1/6 -top-0.5 w-0.5 h-4 bg-blue-700"></div>
							<div class="absolute left-1/2 -top-0.5 w-0.5 h-4 bg-blue-700 -translate-x-1/2"></div>
							<div class="absolute right-1/6 -top-0.5 w-0.5 h-4 bg-blue-700"></div>
						</div>

						<!-- LEVEL 3: OPERATIONS & ADMINISTRATIVE STAFF -->
						<div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl">
							<!-- Manuel Mercado -->
							<div class="rounded-2xl border-2 border-blue-600 bg-white shadow-sm overflow-hidden text-center transition-all hover:shadow-md hover:border-blue-800">
								<div class="bg-blue-600 text-white py-1.5 px-3 text-[11px] font-black uppercase tracking-wider">
									Incharge - Market Operation
								</div>
								<div class="p-3.5">
									<h5 class="text-sm font-black text-blue-950 uppercase">
										Manuel Mercado
									</h5>
									<span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
										Market Operations
									</span>
								</div>
							</div>

							<!-- Louwhe Jane R. Bengero -->
							<div class="rounded-2xl border-2 border-purple-600 bg-white shadow-sm overflow-hidden text-center transition-all hover:shadow-md hover:border-purple-800">
								<div class="bg-purple-600 text-white py-1.5 px-3 text-[11px] font-black uppercase tracking-wider">
									Administrative Clerk
								</div>
								<div class="p-3.5">
									<h5 class="text-sm font-black text-blue-950 uppercase">
										Louwhe Jane R. Bengero
									</h5>
									<span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
										Administrative Support
									</span>
								</div>
							</div>

							<!-- Felmer Pica -->
							<div class="rounded-2xl border-2 border-blue-600 bg-white shadow-sm overflow-hidden text-center transition-all hover:shadow-md hover:border-blue-800">
								<div class="bg-blue-600 text-white py-1.5 px-3 text-[11px] font-black uppercase tracking-wider">
									Incharge - Market Operation
								</div>
								<div class="p-3.5">
									<h5 class="text-sm font-black text-blue-950 uppercase">
										Felmer Pica
									</h5>
									<span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
										Market Operations
									</span>
								</div>
							</div>
						</div>

						<!-- Connector line to Sweepers -->
						<div class="w-0.5 h-6 bg-emerald-600"></div>

						<!-- LEVEL 4: SWEEPERS (Sanitation Unit) -->
						<div class="w-full max-w-4xl rounded-2xl border-2 border-emerald-600 bg-emerald-50/30 overflow-hidden shadow-sm">
							<div class="bg-emerald-600 text-white py-2 px-4 text-center text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
								</svg>
								<span>Sweepers • Sanitation & Cleanliness Team</span>
							</div>

							<div class="p-4 sm:p-5">
								<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
									{#each [
										'Rhojelito Mendiola',
										'Joseph Mendiola',
										'Lolito Cúna',
										'Ponciano Lugasan',
										'Virginia A. Montilla',
										'Neil Salarda',
										'Junel Guiron',
										'Carmelo Villero',
										'Bonifacio Lopez'
									] as sweeper, idx}
										<div class="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-white px-3 py-2 shadow-2xs hover:border-emerald-500 hover:bg-emerald-50/50 transition-colors">
											<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-[10px] font-black text-emerald-900">
												{idx + 1}
											</span>
											<span class="text-xs font-black text-blue-950 uppercase truncate">
												{sweeper}
											</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<!-- High-Resolution Lightbox Modal -->
{#if showModal && currentImage}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/85 p-4 backdrop-blur-md transition-all duration-300 sm:p-6"
		role="presentation"
	>
		<!-- Backdrop button to close -->
		<button
			type="button"
			class="fixed inset-0 h-full w-full cursor-default bg-transparent border-0"
			onclick={closeModal}
			aria-label="Close modal background"
		></button>

		<div
			class="relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border-4 border-amber-400 bg-white shadow-2xl duration-200"
			role="dialog"
			aria-modal="true"
			aria-label="{department} Organizational Hierarchy"
		>
			<!-- Modal Header -->
			<div class="flex items-center justify-between border-b-2 border-amber-400 bg-blue-950 px-6 py-4 text-white">
				<div class="flex items-center gap-3">
					<span class="h-3 w-3 rounded-full bg-amber-400"></span>
					<div>
						<div class="text-sm font-black tracking-wide uppercase">
							{department} Organizational Hierarchy
						</div>
						<div class="text-xs font-medium text-blue-200">
							Municipality of Tanauan, Province of Leyte
						</div>
					</div>
				</div>

				<div class="flex items-center gap-3">
					<a
						href={currentImage}
						download="Tanauan-{department}-Organizational-Chart.jpg"
						class="rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-black tracking-wider text-blue-950 uppercase transition-all hover:bg-amber-300 shadow-sm"
					>
						Download File ↗
					</a>
					<button
						type="button"
						onclick={closeModal}
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900 text-sm font-black text-white transition-colors hover:bg-red-600"
						aria-label="Close modal"
					>
						✕
					</button>
				</div>
			</div>

			<!-- Modal Image Viewport -->
			<div class="flex min-h-[400px] items-center justify-center overflow-auto bg-slate-100 p-6">
				<img
					src={currentImage || '/Market-OrgChart.jpg'}
					alt="Full Organizational Structure of {department}"
					class="h-auto max-h-[72vh] w-auto max-w-full rounded-xl border border-slate-300 bg-white object-contain shadow-lg"
					onerror={() => {
						if (currentImage !== '/Market-OrgChart.jpg') currentImage = '/Market-OrgChart.jpg';
					}}
				/>
			</div>

			<!-- Modal Footer -->
			<div class="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-600">
				<span>Press ESC or click outside to close viewer.</span>
				<span class="text-blue-900">Official Municipal Government Transparency Document</span>
			</div>
		</div>
	</div>
{/if}

