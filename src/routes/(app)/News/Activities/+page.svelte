<script>
	import { departments } from '$lib/config.js';
	import Modal from '$lib/Modal.svelte';

	let selectedDepartment = $state('All');
	let selectedMonth = $state('All');
	let searchQuery = $state('');

	let { data } = $props();

	const months = [
		'All',
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	let currentPage = $state(1);
	const perPage = 6;

	let sortedActivities = $derived(
		[...data.posts].sort((a, b) => new Date(b.date_added) - new Date(a.date_added))
	);

	let filteredActivities = $state([]);

	$effect(() => {
		filteredActivities = sortedActivities.filter(
			(item) =>
				(selectedDepartment === 'All' || item.department === selectedDepartment) &&
				(selectedMonth === 'All' ||
					new Date(item.date_added).toLocaleString('en-US', { month: 'long' }) === selectedMonth) &&
				(item.header.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.content.toLowerCase().includes(searchQuery.toLowerCase()))
		);
		// Reset page when filters change
		currentPage = 1;
	});

	let totalPages = $derived(Math.ceil(filteredActivities.length / perPage));
	let paginatedActivities = $derived(
		filteredActivities.slice((currentPage - 1) * perPage, currentPage * perPage)
	);

	function goToPage(page) {
		if (page < 1 || page > totalPages) return;
		currentPage = page;
	}

	// Image Helper
	function parseMedia(media) {
		if (!media) return [];
		if (Array.isArray(media)) return media;
		if (typeof media === 'string') {
			try {
				if (media.startsWith('[')) {
					return JSON.parse(media);
				}
			} catch (e) {}
			return media.split(',');
		}
		return [media.toString()];
	}

	function extractUrlString(item) {
		if (!item) return null;
		if (typeof item === 'object') {
			return item.url || item.downloadURL || item.src || item.path || null;
		}
		return item.toString();
	}

	function getImageUrl(media) {
		const urls = parseMedia(media);
		let urlStr = extractUrlString(urls[0]);
		if (!urlStr) return null;

		let url = urlStr.trim();
		if (url && !url.startsWith('http') && !url.startsWith('/')) {
			url = '/' + url;
		}
		return url;
	}

	function getAllImageUrls(media) {
		const urls = parseMedia(media);
		return urls
			.map((u) => {
				let urlStr = extractUrlString(u);
				if (!urlStr) return null;
				let url = urlStr.trim();
				if (url && !url.startsWith('http') && !url.startsWith('/')) url = '/' + url;
				return url;
			})
			.filter((u) => u);
	}

	// Modal State
	let modalOpen = $state(false);
	let activeActivity = $state(null);
	let currentImageIndex = $state(0);

	let activeActivityMediaUrls = $derived(getAllImageUrls(activeActivity?.media));

	function openModal(activity) {
		activeActivity = activity;
		modalOpen = true;
		currentImageIndex = 0;
	}
	function closeModal() {
		modalOpen = false;
		activeActivity = null;
	}
	function nextImage() {
		if (!activeActivityMediaUrls.length) return;
		currentImageIndex = (currentImageIndex + 1) % activeActivityMediaUrls.length;
	}
	function prevImage() {
		if (!activeActivityMediaUrls.length) return;
		currentImageIndex =
			(currentImageIndex - 1 + activeActivityMediaUrls.length) % activeActivityMediaUrls.length;
	}

	function handleKeyDown(e, activity) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openModal(activity);
		}
	}
</script>

<svelte:head>
	<title>Municipal Activities & Programs | Official Website</title>
</svelte:head>

<section class="min-h-screen bg-slate-50/50 pb-24 font-sans">
	<!-- Hero Header -->
	<header
		class="relative overflow-hidden bg-slate-950 pt-20 pb-32 text-white shadow-sm md:pt-24 md:pb-40"
	>
		<img
			src="/AERIAL DRONE SHOTS/Transpo-hub.webp"
			alt="Activities Banner"
			class="absolute inset-0 h-full w-full scale-105 object-cover opacity-35"
		/>
		<!-- Modern radial gradient for depth -->
		<div
			class="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/70 to-slate-50/50"
		></div>
		<div class="bg-radial-gradient absolute inset-0 from-transparent to-slate-950/90"></div>

		<div class="relative z-10 mx-auto mt-8 max-w-6xl px-6 text-center">
			<span
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-1.5 text-[10px] font-bold tracking-widest text-yellow-400 uppercase backdrop-blur-md"
			>
				<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-400"></span>
				LGU Activities Dashboard
			</span>
			<h1 class="mb-6 text-4xl font-black tracking-tight text-white md:text-6xl">
				Municipal <span
					class="bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent"
					>Activities & Programs</span
				>
			</h1>
			<p
				class="mx-auto max-w-2xl text-base leading-relaxed font-medium text-slate-200 drop-shadow-sm md:text-lg"
			>
				Explore active municipal operations, community development drives, and department
				accomplishments in Tanauan, Leyte.
			</p>
		</div>
	</header>

	<!-- Filters & Search Section -->
	<div class="relative z-20 mx-auto -mt-20 max-w-6xl px-6 md:-mt-16">
		<div
			class="rounded-3xl border border-slate-200/60 bg-white/80 p-3 shadow-xl shadow-slate-200/50 backdrop-blur-md lg:p-4"
		>
			<div class="grid grid-cols-1 gap-3 md:grid-cols-3">
				<!-- Department Dropdown -->
				<div
					class="relative flex cursor-pointer flex-col rounded-2xl border border-slate-200/50 bg-slate-50 px-4 py-2.5 transition-colors hover:bg-slate-100/55"
				>
					<label
						class="mb-1 block cursor-pointer text-[9px] font-bold tracking-widest text-slate-400 uppercase"
						>Department</label
					>
					<div class="flex items-center justify-between">
						<select
							bind:value={selectedDepartment}
							class="w-full cursor-pointer appearance-none bg-transparent bg-none pr-6 text-xs font-bold text-slate-800 focus:outline-none md:text-sm"
						>
							<option value={'All'}>ALL DEPARTMENTS</option>
							{#each departments as d}
								<option value={d.name}>{d.name.toUpperCase()}</option>
							{/each}
						</select>
						<svg
							class="pointer-events-none absolute right-4 h-4 w-4 text-slate-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M19 9l-7 7-7-7"
							/></svg
						>
					</div>
				</div>

				<!-- Month Dropdown -->
				<div
					class="relative flex cursor-pointer flex-col rounded-2xl border border-slate-200/50 bg-slate-50 px-4 py-2.5 transition-colors hover:bg-slate-100/55"
				>
					<label
						class="mb-1 block cursor-pointer text-[9px] font-bold tracking-widest text-slate-400 uppercase"
						>Month</label
					>
					<div class="flex items-center justify-between">
						<select
							bind:value={selectedMonth}
							class="w-full cursor-pointer appearance-none bg-transparent bg-none pr-6 text-xs font-bold text-slate-800 focus:outline-none md:text-sm"
						>
							{#each months as m}
								<option value={m}>{m.toUpperCase()}</option>
							{/each}
						</select>
						<svg
							class="pointer-events-none absolute right-4 h-4 w-4 text-slate-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M19 9l-7 7-7-7"
							/></svg
						>
					</div>
				</div>

				<!-- Search Input -->
				<div
					class="relative flex items-center gap-3 rounded-2xl border border-slate-200/50 bg-slate-50 px-4 py-2.5"
				>
					<div class="flex-grow">
						<label class="mb-1 block text-[9px] font-bold tracking-widest text-slate-400 uppercase"
							>Search Keywords</label
						>
						<input
							type="text"
							placeholder="Type here..."
							bind:value={searchQuery}
							class="w-full bg-transparent text-xs font-bold text-slate-800 placeholder:font-normal placeholder:text-slate-300 focus:outline-none md:text-sm"
						/>
					</div>
					<div
						class="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-900 text-white shadow-md"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/></svg
						>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Results Counter -->
	<div class="mx-auto mt-14 mb-8 flex max-w-6xl items-end justify-between px-6">
		<div>
			<h2 class="text-2xl font-extrabold tracking-tight text-slate-900">Active Programs</h2>
			<div class="mt-2 h-1 w-12 rounded-full bg-blue-900"></div>
		</div>
		<p class="text-xs font-extrabold tracking-widest text-slate-400 uppercase">
			{filteredActivities.length}
			{filteredActivities.length === 1 ? 'Activity' : 'Activities'} found
		</p>
	</div>

	<!-- Activities Grid -->
	<div class="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each paginatedActivities as item (item.id)}
			<article
				role="button"
				tabindex="0"
				onclick={() => openModal(item)}
				onkeydown={(e) => handleKeyDown(e, item)}
				class="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-200/80 hover:shadow-xl hover:shadow-slate-200/30"
			>
				<!-- Image Section -->
				<div class="relative h-52 w-full overflow-hidden bg-slate-100">
					{#if getImageUrl(item.media)}
						<img
							src={getImageUrl(item.media)}
							alt={item.header}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
						/>
					{:else}
						<div class="flex h-full w-full items-center justify-center text-slate-300">
							<svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/></svg
							>
						</div>
					{/if}

					<!-- Category Badge -->
					<div
						class="absolute top-4 left-4 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[9px] font-extrabold tracking-wider text-blue-700 uppercase shadow-sm backdrop-blur-sm"
					>
						ACTIVITY
					</div>
				</div>

				<!-- Content Details -->
				<div class="flex flex-grow flex-col p-6">
					<div class="mb-3.5 flex items-center justify-between">
						<span
							class="rounded border border-slate-100 bg-slate-50 px-2 py-0.5 text-[9px] font-extrabold tracking-widest text-slate-400 uppercase"
						>
							{item.department || 'LGU'}
						</span>
						<span class="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
							<svg
								class="h-3.5 w-3.5 text-slate-300"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/></svg
							>
							{new Date(item.date_added).toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric',
								year: 'numeric'
							})}
						</span>
					</div>

					<h3
						class="mb-3 line-clamp-2 text-base leading-tight font-bold text-slate-900 transition-colors group-hover:text-blue-900"
					>
						{item.header}
					</h3>
					<p class="mb-4 line-clamp-3 flex-grow text-xs leading-relaxed text-slate-500">
						{item.content}
					</p>

					<div class="mt-auto flex justify-end border-t border-slate-100 pt-4">
						<span
							class="flex items-center gap-1 text-xs font-bold text-blue-900 group-hover:text-blue-700"
						>
							View details
							<svg
								class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								viewBox="0 0 24 24"
								><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg
							>
						</span>
					</div>
				</div>
			</article>
		{:else}
			<div
				class="col-span-full text-center py-20 text-slate-400 bg-white border border-slate-200/60 rounded-3xl p-6"
			>
				<svg
					class="w-16 h-16 mx-auto mb-4 text-slate-200"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
					/></svg
				>
				<p class="font-extrabold text-slate-800 text-lg">No Activities Found</p>
				<p class="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
					Try refining your department, month, or search queries above.
				</p>
			</div>
		{/each}
	</div>

	<!-- Pagination -->
	{#if totalPages > 1}
		<div class="mt-16 flex justify-center gap-2.5">
			<button
				onclick={() => goToPage(currentPage - 1)}
				class="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={currentPage === 1}
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/></svg
				>
			</button>

			{#each Array(totalPages) as _, i}
				<button
					onclick={() => goToPage(i + 1)}
					class={`flex h-11 w-11 items-center justify-center rounded-xl font-bold transition-all ${
						currentPage === i + 1
							? 'bg-blue-900 text-white shadow-md shadow-blue-900/10'
							: 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
					}`}
				>
					{i + 1}
				</button>
			{/each}

			<button
				onclick={() => goToPage(currentPage + 1)}
				class="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={currentPage === totalPages}
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 5l7 7-7 7"
					/></svg
				>
			</button>
		</div>
	{/if}

	<!-- Modal -->
	<Modal open={modalOpen} title={activeActivity?.header || 'Activity Details'} size="max-w-3xl">
		{#if activeActivity}
			<div class="space-y-6">
				<!-- Image carousel -->
				{#if activeActivityMediaUrls.length > 0}
					<div
						class="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 shadow-inner sm:h-96"
					>
						<img
							src={activeActivityMediaUrls[currentImageIndex]}
							alt={activeActivity.header}
							class="h-full w-full object-cover transition-transform duration-500"
						/>
						{#if activeActivityMediaUrls.length > 1}
							<button
								onclick={prevImage}
								class="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md backdrop-blur-sm transition hover:scale-105 hover:bg-white"
							>
								<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.5"
										d="M15 19l-7-7 7-7"
									/></svg
								>
							</button>
							<button
								onclick={nextImage}
								class="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md backdrop-blur-sm transition hover:scale-105 hover:bg-white"
							>
								<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.5"
										d="M9 5l7 7-7 7"
									/></svg
								>
							</button>

							<!-- Image Indicator -->
							<div
								class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md"
							>
								{currentImageIndex + 1} / {activeActivityMediaUrls.length}
							</div>
						{/if}
					</div>
				{/if}

				<div>
					<div class="mb-3 flex items-center gap-3">
						<span
							class="rounded border border-slate-100 bg-slate-50 px-2 py-1 text-[10px] font-bold tracking-widest text-slate-600"
						>
							{activeActivity.department || 'LGU'}
						</span>
						<span class="text-xs font-semibold text-slate-400">
							{new Date(activeActivity.date_added).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</span>
					</div>
					<h2 class="mb-4 text-2xl font-bold text-slate-900">{activeActivity.header}</h2>
					<div class="prose max-w-none prose-slate">
						<p class="leading-relaxed whitespace-pre-wrap text-slate-700">
							{activeActivity.content}
						</p>
					</div>
					{#if activeActivity.link}
						<div
							class="mt-6 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 p-3"
						>
							<div class="flex items-center gap-2 text-blue-900">
								<svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
									/></svg
								>
								<span class="text-sm font-semibold">Attached Link:</span>
							</div>
							<a
								href={activeActivity.link}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline"
							>
								Visit External Page
								<svg
									class="h-4 w-4"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/></svg
								>
							</a>
						</div>
					{/if}
				</div>

				<div class="flex justify-end gap-3 border-t border-slate-100 pt-6">
					<button
						onclick={closeModal}
						class="rounded-xl bg-slate-100 px-5 py-2.5 font-bold text-slate-700 transition-colors hover:bg-slate-200"
					>
						Close
					</button>
				</div>
			</div>
		{/if}
	</Modal>
</section>
