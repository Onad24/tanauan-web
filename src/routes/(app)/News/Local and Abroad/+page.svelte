<script>
	import { departments } from '$lib/config.js';
	import Modal from '$lib/Modal.svelte';

	let selectedCategory = $state('All');
	let selectedDepartment = $state('All');
	let selectedMonth = $state('All');
	let searchQuery = $state('');

	let { data } = $props();

	const categories = ['All', 'local news', 'abroad news', 'announcement'];
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

	let sortedNews = $derived(
		[...data.posts].sort((a, b) => new Date(b.date_added) - new Date(a.date_added))
	);

	let filteredNews = $state([]);

	$effect(() => {
		filteredNews = sortedNews.filter(
			(item) =>
				(selectedCategory === 'All' ||
					(selectedCategory === 'local news' &&
						(item.type === 'local news' || item.type === 'news')) ||
					item.type === selectedCategory) &&
				(selectedDepartment === 'All' || item.department === selectedDepartment) &&
				(selectedMonth === 'All' ||
					new Date(item.date_added).toLocaleString('en-US', { month: 'long' }) === selectedMonth) &&
				(item.header.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.content.toLowerCase().includes(searchQuery.toLowerCase()))
		);
		// Reset page when filters change
		currentPage = 1;
	});

	// Featured Story is the first of filtered news (only on page 1)
	let featuredNewsItem = $derived(filteredNews.length > 0 ? filteredNews[0] : null);
	let remainingNews = $derived(filteredNews.slice(1));
	let totalPages = $derived(Math.ceil(remainingNews.length / perPage) || 1);

	// paginatedGridNews is the slice of remainingNews based on currentPage
	let paginatedGridNews = $derived(
		remainingNews.slice((currentPage - 1) * perPage, currentPage * perPage)
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
	let activeNews = $state(null);
	let currentImageIndex = $state(0);

	let activeNewsMediaUrls = $derived(getAllImageUrls(activeNews?.media));

	function openModal(news) {
		activeNews = news;
		modalOpen = true;
		currentImageIndex = 0;
	}
	function closeModal() {
		modalOpen = false;
		activeNews = null;
	}
	function nextImage() {
		if (!activeNewsMediaUrls.length) return;
		currentImageIndex = (currentImageIndex + 1) % activeNewsMediaUrls.length;
	}
	function prevImage() {
		if (!activeNewsMediaUrls.length) return;
		currentImageIndex =
			(currentImageIndex - 1 + activeNewsMediaUrls.length) % activeNewsMediaUrls.length;
	}

	function handleKeyDown(e, news) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openModal(news);
		}
	}
</script>

<svelte:head>
	<title>Tanauan News & Updates | Official Website</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section class="min-h-screen bg-slate-50/40 pb-24 font-sans text-slate-800">
	<!-- Editorial Top Info Strip -->
	<div
		class="border-b border-slate-200/50 bg-white py-3 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase"
	>
		<div
			class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 sm:flex-row"
		>
			<div class="flex items-center gap-2">
				<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-600"></span>
				<span>Public Information Desk</span>
			</div>
			<div class="flex items-center gap-3">
				<span>Tanauan, Leyte</span>
				<span class="text-slate-300">|</span>
				<span
					>{new Date().toLocaleDateString('en-US', {
						weekday: 'long',
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}</span
				>
			</div>
		</div>
	</div>

	<!-- Editorial Header -->
	<header class="border-b border-slate-200/50 bg-white py-12 md:py-16">
		<div class="mx-auto max-w-6xl px-6 text-left">
			<span
				class="mb-2 inline-block rounded bg-indigo-50 px-2.5 py-0.5 text-[10px] font-extrabold tracking-widest text-indigo-600 uppercase"
			>
				LGU Official Press
			</span>
			<h1
				class="font-serif text-4xl leading-none font-black tracking-tight text-slate-900 md:text-6xl"
			>
				Tanauan News & Updates
			</h1>
			<p class="mt-4 max-w-2xl text-sm leading-relaxed font-medium text-slate-500 md:text-base">
				Stay informed with the latest official press releases, municipal briefings, and
				announcements from the Local Government Unit of Tanauan, Leyte.
			</p>
		</div>
	</header>

	<!-- Filters & Search Section -->
	<div class="relative z-20 mx-auto -mt-8 mb-12 max-w-6xl px-6">
		<div
			class="space-y-4 rounded-2xl border border-slate-200/60 bg-white p-5 shadow-xl shadow-slate-200/40"
		>
			<!-- Category Tabs Row -->
			<div class="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
				{#each categories as cat}
					<button
						onclick={() => (selectedCategory = cat)}
						class={`rounded-xl px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
							selectedCategory === cat
								? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
								: 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
						}`}
					>
						{cat === 'All'
							? 'All Updates'
							: cat === 'local news'
								? 'Local News'
								: cat === 'abroad news'
									? 'Abroad News'
									: 'Announcements'}
					</button>
				{/each}
			</div>

			<!-- Filters Grid Row -->
			<div class="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2 md:grid-cols-3">
				<!-- Department Filter -->
				<div
					class="relative flex flex-col rounded-xl border border-slate-200/50 bg-slate-50 px-4 py-2 transition-colors hover:bg-slate-100/70"
				>
					<span class="text-[8px] font-extrabold tracking-widest text-slate-400 uppercase"
						>Department</span
					>
					<div class="relative mt-1 flex items-center">
						<select
							bind:value={selectedDepartment}
							class="m-0 w-full cursor-pointer appearance-none border-0 bg-transparent bg-none p-0 pr-6 text-xs font-bold text-slate-700 focus:border-0 focus:ring-0 focus:outline-none"
						>
							<option value="All">ALL DEPARTMENTS</option>
							{#each departments as d}
								<option value={d.name}>{d.name.toUpperCase()}</option>
							{/each}
						</select>
						<svg
							class="pointer-events-none absolute right-0 h-3.5 w-3.5 text-slate-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</div>
				</div>

				<!-- Month Filter -->
				<div
					class="relative flex flex-col rounded-xl border border-slate-200/50 bg-slate-50 px-4 py-2 transition-colors hover:bg-slate-100/70"
				>
					<span class="text-[8px] font-extrabold tracking-widest text-slate-400 uppercase"
						>Month</span
					>
					<div class="relative mt-1 flex items-center">
						<select
							bind:value={selectedMonth}
							class="m-0 w-full cursor-pointer appearance-none border-0 bg-transparent bg-none p-0 pr-6 text-xs font-bold text-slate-700 focus:border-0 focus:ring-0 focus:outline-none"
						>
							{#each months as m}
								<option value={m}>{m === 'All' ? 'ALL MONTHS' : m.toUpperCase()}</option>
							{/each}
						</select>
						<svg
							class="pointer-events-none absolute right-0 h-3.5 w-3.5 text-slate-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</div>
				</div>

				<!-- Keywords Search -->
				<div
					class="relative flex items-center gap-2 rounded-xl border border-slate-200/50 bg-slate-50 px-4 py-2 sm:col-span-2 md:col-span-1"
				>
					<div class="flex-grow">
						<span class="block text-[8px] font-extrabold tracking-widest text-slate-400 uppercase"
							>Keywords</span
						>
						<input
							type="text"
							placeholder="Search article..."
							bind:value={searchQuery}
							class="m-0 mt-1 w-full border-0 bg-transparent p-0 text-xs font-bold text-slate-700 placeholder:font-normal placeholder:text-slate-300 focus:border-0 focus:ring-0 focus:outline-none"
						/>
					</div>
					<svg
						class="h-4 w-4 shrink-0 text-slate-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</div>
			</div>
		</div>
	</div>

	<!-- Featured Post Section -->
	{#if featuredNewsItem && currentPage === 1}
		<div class="mx-auto mb-16 max-w-6xl px-6">
			<article
				role="button"
				tabindex="0"
				onclick={() => openModal(featuredNewsItem)}
				onkeydown={(e) => handleKeyDown(e, featuredNewsItem)}
				class="group flex cursor-pointer flex-col gap-8 overflow-hidden rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm transition-all duration-500 hover:border-indigo-100/80 hover:shadow-2xl hover:shadow-slate-200/30 lg:flex-row lg:p-8"
			>
				<!-- Image Section -->
				<div
					class="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 lg:w-[58%]"
				>
					{#if getImageUrl(featuredNewsItem.media)}
						<img
							src={getImageUrl(featuredNewsItem.media)}
							alt={featuredNewsItem.header}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-102"
						/>
					{:else}
						<div class="flex h-full w-full items-center justify-center text-slate-300">
							<svg class="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1"
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/></svg
							>
						</div>
					{/if}
					<!-- Category Badge -->
					<div
						class="absolute top-4 left-4 flex items-center gap-2 rounded-full border bg-white/95 px-3.5 py-1.5 text-[10px] font-extrabold tracking-widest text-slate-800 uppercase shadow-md"
					>
						<span
							class={`h-2 w-2 rounded-full ${featuredNewsItem.type === 'news' || featuredNewsItem.type === 'local news' ? 'animate-pulse bg-indigo-600' : featuredNewsItem.type === 'abroad news' ? 'bg-teal-500' : 'bg-rose-500'}`}
						></span>
						{featuredNewsItem.type === 'news' || featuredNewsItem.type === 'local news'
							? 'Local News'
							: featuredNewsItem.type === 'abroad news'
								? 'Abroad News'
								: featuredNewsItem.type === 'announcement'
									? 'Announcement'
									: featuredNewsItem.type || 'News'}
					</div>
				</div>

				<!-- Content Details -->
				<div class="flex flex-grow flex-col justify-between py-2">
					<div>
						<div class="mb-4 flex items-center gap-3">
							<span
								class="rounded border border-slate-200/60 bg-slate-50 px-2.5 py-1 text-[9px] font-extrabold tracking-widest text-slate-400 uppercase"
							>
								{featuredNewsItem.department || 'LGU'}
							</span>
							<span class="flex items-center gap-1.5 text-xs font-bold text-slate-400">
								<svg
									class="h-4 w-4 text-slate-300"
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
								{new Date(featuredNewsItem.date_added).toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric'
								})}
							</span>
						</div>

						<h3
							class="lg:text-3.5xl mb-4 font-serif text-2xl leading-tight font-bold text-slate-900 transition-colors group-hover:text-indigo-900"
						>
							{featuredNewsItem.header}
						</h3>
						<p class="mb-6 line-clamp-4 text-sm leading-relaxed text-slate-500">
							{featuredNewsItem.content}
						</p>
					</div>

					<div class="flex justify-end lg:justify-start">
						<span
							class="flex items-center gap-1.5 text-sm font-extrabold text-indigo-600 transition-colors group-hover:text-indigo-800"
						>
							Read Featured Story
							<svg
								class="h-4 w-4 transition-transform group-hover:translate-x-1.5"
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
		</div>
	{/if}

	<!-- Results Counter -->
	<div class="mx-auto mb-8 flex max-w-6xl items-end justify-between px-6">
		<div>
			<h2 class="text-xl font-extrabold tracking-tight text-slate-900 uppercase">
				{selectedCategory === 'All'
					? 'Latest Information'
					: selectedCategory === 'local news'
						? 'Local News'
						: selectedCategory === 'abroad news'
							? 'Abroad News'
							: 'Announcements'}
			</h2>
			<div class="mt-2 h-1 w-10 rounded-full bg-indigo-600"></div>
		</div>
		<p class="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
			{filteredNews.length}
			{filteredNews.length === 1 ? 'Result' : 'Results'} found
		</p>
	</div>

	<!-- News Grid -->
	<div class="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each paginatedGridNews as item (item.id)}
			<article
				role="button"
				tabindex="0"
				onclick={() => openModal(item)}
				onkeydown={(e) => handleKeyDown(e, item)}
				class="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl hover:shadow-slate-200/20"
			>
				<!-- Image Section -->
				<div class="relative h-48 w-full shrink-0 overflow-hidden bg-slate-100">
					{#if getImageUrl(item.media)}
						<img
							src={getImageUrl(item.media)}
							alt={item.header}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
						/>
					{:else}
						<div class="flex h-full w-full items-center justify-center text-slate-300">
							<svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1"
									d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
								/></svg
							>
						</div>
					{/if}

					<!-- Category Badge -->
					<div
						class="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border bg-white/95 px-2.5 py-1 text-[9px] font-extrabold tracking-wider text-slate-800 uppercase shadow-sm"
					>
						<span
							class={`h-1.5 w-1.5 rounded-full ${item.type === 'news' || item.type === 'local news' ? 'animate-pulse bg-indigo-600' : item.type === 'abroad news' ? 'bg-teal-500' : 'bg-rose-500'}`}
						></span>
						{item.type === 'news' || item.type === 'local news'
							? 'Local News'
							: item.type === 'abroad news'
								? 'Abroad News'
								: item.type === 'announcement'
									? 'Announcement'
									: item.type || 'News'}
					</div>
				</div>

				<!-- Content Details -->
				<div class="flex flex-grow flex-col p-5">
					<div class="mb-3 flex items-center justify-between">
						<span
							class="rounded border border-slate-200/60 bg-slate-50 px-2 py-0.5 text-[9px] font-extrabold tracking-widest text-slate-400 uppercase"
						>
							{item.department || 'LGU'}
						</span>
						<span class="flex items-center gap-1 text-[11px] font-bold text-slate-400">
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
						class="mb-2.5 line-clamp-2 text-base leading-tight font-bold text-slate-900 transition-colors group-hover:text-indigo-950"
					>
						{item.header}
					</h3>
					<p class="mb-4 line-clamp-3 flex-grow text-xs leading-relaxed font-medium text-slate-500">
						{item.content}
					</p>

					<div class="mt-auto flex justify-end border-t border-slate-100 pt-4">
						<span
							class="flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:text-indigo-800"
						>
							Read full article
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
			{#if !featuredNewsItem}
				<div
					class="col-span-full text-center py-20 text-slate-400 bg-white border border-slate-200/50 rounded-3xl p-6"
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
					<p class="font-extrabold text-slate-800 text-lg">No Articles Found</p>
					<p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
						Try refining your department, category, or keyword queries above.
					</p>
				</div>
			{/if}
		{/each}
	</div>

	<!-- Pagination -->
	{#if totalPages > 1}
		<div class="mt-16 flex justify-center gap-2">
			<button
				onclick={() => goToPage(currentPage - 1)}
				class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={currentPage === 1}
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
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
					class={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold transition-all ${
						currentPage === i + 1
							? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
							: 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
					}`}
				>
					{i + 1}
				</button>
			{/each}

			<button
				onclick={() => goToPage(currentPage + 1)}
				class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
				disabled={currentPage === totalPages}
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
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
	<Modal open={modalOpen} title={activeNews?.header || 'News'} size="max-w-3xl">
		{#if activeNews}
			<div class="space-y-6 font-sans">
				<!-- Image carousel -->
				{#if activeNewsMediaUrls.length > 0}
					<div
						class="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 shadow-inner sm:h-96"
					>
						<img
							src={activeNewsMediaUrls[currentImageIndex]}
							alt={activeNews.header}
							class="h-full w-full object-cover transition-transform duration-500"
						/>
						{#if activeNewsMediaUrls.length > 1}
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
								{currentImageIndex + 1} / {activeNewsMediaUrls.length}
							</div>
						{/if}
					</div>
				{/if}

				<div>
					<div class="mb-4 flex flex-wrap items-center gap-2">
						<span
							class="rounded border border-slate-200/60 bg-slate-50 px-2.5 py-1 text-[9px] font-extrabold tracking-widest text-slate-500 uppercase"
						>
							{activeNews.department || 'LGU'}
						</span>
						<span class="text-xs font-bold text-slate-400">
							{new Date(activeNews.date_added).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</span>
						<span
							class="flex items-center gap-1.5 rounded-full border bg-slate-50 px-2.5 py-0.5 text-[9px] font-extrabold tracking-wider text-slate-800 uppercase"
						>
							<span
								class={`h-1.5 w-1.5 rounded-full ${activeNews.type === 'news' || activeNews.type === 'local news' ? 'animate-pulse bg-indigo-600' : activeNews.type === 'abroad news' ? 'bg-teal-500' : 'bg-rose-500'}`}
							></span>
							{activeNews.type === 'news' || activeNews.type === 'local news'
								? 'Local News'
								: activeNews.type === 'abroad news'
									? 'Abroad News'
									: activeNews.type === 'announcement'
										? 'Announcement'
										: activeNews.type || 'News'}
						</span>
					</div>
					<h2 class="md:text-3.5xl mb-4 font-serif text-2xl leading-tight font-bold text-slate-900">
						{activeNews.header}
					</h2>
					<div class="prose max-w-none prose-slate">
						<p
							class="text-sm leading-relaxed font-medium whitespace-pre-wrap text-slate-600 md:text-base"
						>
							{activeNews.content}
						</p>
					</div>
					{#if activeNews.link}
						<div
							class="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-indigo-100/50 bg-indigo-50/50 p-4"
						>
							<div class="flex items-center gap-2 text-indigo-900">
								<svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
									/></svg
								>
								<span class="text-xs font-bold md:text-sm">Attached Link:</span>
							</div>
							<a
								href={activeNews.link}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-900 hover:underline md:text-sm"
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
						class="rounded-xl bg-slate-100 px-5 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200 md:text-sm"
					>
						Close
					</button>
				</div>
			</div>
		{/if}
	</Modal>
</section>

<style>
	:global(body) {
		font-family:
			'Plus Jakarta Sans',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Helvetica,
			Arial,
			sans-serif;
	}
	.font-serif {
		font-family: 'Playfair Display', Georgia, Cambria, 'Times New Roman', Times, serif;
	}
</style>
