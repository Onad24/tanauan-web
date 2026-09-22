<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { barangayData } from '$lib/config';
	import PageHero from '$lib/Components/PageHero.svelte';

	let visible = $state(false);
	let search = $state('');
	let selectedBarangayName = $state(null);

	// Svelte 5 derived state for filtered list
	let filteredNames = $derived(
		Object.keys(barangayData)
			.filter((name) => name.toLowerCase().includes(search.toLowerCase()))
			.sort()
	);

	let selectedBarangay = $derived(selectedBarangayName ? barangayData[selectedBarangayName] : null);

	// ---------- Modal helpers ----------
	function openModal(name) {
		selectedBarangayName = name;
	}

	function closeModal() {
		selectedBarangayName = null;
	}

	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 50);

		// Keyboard ESC handling
		const handleKeyDown = (e) => {
			if (e.key === 'Escape' && selectedBarangayName) {
				closeModal();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<svelte:head>
	<title>Barangay Directory | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Official directory of the 54 barangays in the Municipality of Tanauan, Leyte, Philippines. Access local history, leadership, and websites."
	/>
</svelte:head>

<PageHero
	title="Barangays"
	subtitle="Official registry of the 54 communities of the Municipality of Tanauan, Leyte"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18v3H3V3z' /></svg>"
/>

<section class="relative bg-slate-50 pt-8 pb-20">
	<div class="mx-auto max-w-6xl px-6 sm:px-10">
		<!-- Filter + Search controls -->
		<div
			class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center"
			class:opacity-0={!visible}
			class:opacity-100={visible}
			style="transition: opacity 300ms ease;"
		>
			<div>
				<h2 class="text-xl font-bold text-slate-900">Barangay Registry Directory</h2>
				<p class="text-xs font-medium text-slate-500">
					Search history, leadership profiles, and contact details
				</p>
			</div>

			<!-- Search Bar -->
			<div class="relative w-full max-w-md">
				<span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
					<svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/></svg
					>
				</span>
				<input
					type="text"
					bind:value={search}
					placeholder="Search by Barangay name..."
					class="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-4 pl-10 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
			</div>
		</div>

		<!-- Card Grid -->
		<div
			class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
			class:opacity-0={!visible}
			class:opacity-100={visible}
			style="transition: opacity 300ms ease;"
		>
			{#if filteredNames.length > 0}
				{#each filteredNames as name}
					{@const item = barangayData[name]}
					<button
						onclick={() => openModal(name)}
						class="brgy-card group hover:border-slate-350 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
					>
						<!-- Resilient Image container (no text overlay) -->
						<div
							class="relative h-40 w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-900 to-blue-950"
						>
							<!-- Fallback Icon inside the image container if image fails to load -->
							<div
								class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
							>
								<svg
									class="mb-1 h-10 w-10 text-white/20"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
									/></svg
								>
								<span class="text-[10px] font-bold tracking-widest text-blue-200/40 uppercase"
									>Tanauan, Leyte</span
								>
							</div>

							{#if item.bgImage}
								<img
									src={item.bgImage}
									alt={name}
									class="absolute inset-0 z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
									onerror={(e) => (e.target.style.display = 'none')}
									loading="lazy"
								/>
							{/if}
						</div>

						<!-- Core details (High contrast black text) -->
						<div class="mt-4">
							<h3
								class="text-lg font-extrabold text-slate-900 transition-colors group-hover:text-blue-900"
							>
								{name}
							</h3>

							<div
								class="mt-2.5 flex items-center justify-between border-b border-slate-100 pb-2 text-xs"
							>
								<span class="flex items-center gap-1 font-semibold text-slate-700">
									<svg
										class="h-3.5 w-3.5 text-slate-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/></svg
									>
									{item.captain || 'Punong Barangay'}
								</span>
								<span class="rounded bg-blue-50 px-2 py-0.5 font-extrabold text-blue-900">
									👥 {item.population || 'Registry'}
								</span>
							</div>

							<p class="mt-3 line-clamp-3 text-xs leading-relaxed text-slate-600">
								{item.history || 'Historical details not registered.'}
							</p>
						</div>
					</button>
				{/each}
			{:else}
				<div
					class="col-span-full rounded-2xl border border-dashed border-slate-200 py-20 text-center"
				>
					<svg
						class="mx-auto mb-3 h-12 w-12 text-slate-300"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<h3 class="text-sm font-semibold text-slate-800">No Barangays found</h3>
					<p class="mt-1 text-xs text-slate-500">Try refining your search keyword above.</p>
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- ===================================================================
     MODAL PROFILE WIDGET
=================================================================== -->
{#if selectedBarangayName}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm sm:p-6"
		onclick={closeModal}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
	>
		<!-- Modal Content Box -->
		<div
			transition:fly={{ y: 20, duration: 300, easing: cubicOut }}
			class="modal-box relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			tabindex="-1"
			role="dialog"
			aria-labelledby="modal-title"
			aria-modal="true"
		>
			<!-- Close Button -->
			<button
				class="hover:text-slate-650 absolute top-4 right-4 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-400 shadow-sm transition-all hover:bg-white"
				onclick={closeModal}
				aria-label="Close details"
			>
				<svg
					class="h-4 w-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					stroke-width="2.5"
					><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg
				>
			</button>

			<!-- Scrollable Content Area -->
			<div class="scrollbar-thin flex-1 overflow-y-auto">
				{#if selectedBarangay.bgImage}
					<div class="cover-container relative h-48 w-full shrink-0 overflow-hidden bg-slate-50">
						<img
							src={selectedBarangay.bgImage}
							alt={selectedBarangayName}
							class="h-full w-full object-cover"
							onerror={(e) => (e.currentTarget.closest('.cover-container').style.display = 'none')}
						/>
					</div>
				{/if}

				<div class="space-y-6 p-6 sm:p-8">
					<!-- Title -->
					<div class="text-left">
						<span
							class="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-blue-900 uppercase"
							>Barangay Registry</span
						>
						<h3 id="modal-title" class="mt-2.5 text-2xl font-bold text-slate-900 sm:text-3xl">
							{selectedBarangayName}
						</h3>
						<p class="mt-0.5 text-xs font-medium text-slate-400">
							Municipality of Tanauan, Province of Leyte
						</p>
					</div>

					<!-- Stats Row -->
					<div
						class="grid grid-cols-1 gap-4 border-y border-slate-100 py-5 text-left text-sm sm:grid-cols-3 sm:gap-6"
					>
						<div>
							<span
								class="mb-0.5 block text-[10px] font-semibold tracking-wider text-slate-400 uppercase"
								>Punong Barangay</span
							>
							<span class="font-semibold text-slate-800">{selectedBarangay.captain || '—'}</span>
						</div>
						<div>
							<span
								class="mb-0.5 block text-[10px] font-semibold tracking-wider text-slate-400 uppercase"
								>Estimated Population</span
							>
							<span class="font-semibold text-slate-800">{selectedBarangay.population || '—'}</span>
						</div>
						<div>
							<span
								class="mb-0.5 block text-[10px] font-semibold tracking-wider text-slate-400 uppercase"
								>Official Contact</span
							>
							<span
								class="block truncate font-semibold text-slate-800"
								title={selectedBarangay.contact}>{selectedBarangay.contact || '—'}</span
							>
						</div>
					</div>

					<!-- Content Grid -->
					<div class="grid grid-cols-1 gap-8 pt-1 md:grid-cols-12">
						<!-- Left Side: History -->
						<div class="space-y-3 text-left md:col-span-7">
							<h4 class="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
								Historical Background
							</h4>
							<p class="text-slate-650 text-justify text-sm leading-relaxed">
								{selectedBarangay.history ||
									'No official historical records available in the registry.'}
							</p>
						</div>

						<!-- Right Side: Gallery & Links -->
						<div class="space-y-6 text-left md:col-span-5">
							<!-- Gallery -->
							{#if selectedBarangay.images && selectedBarangay.images.length > 0}
								<div>
									<h4 class="mb-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
										Gallery
									</h4>
									<div class="grid grid-cols-2 gap-2.5">
										{#each selectedBarangay.images as img, index}
											<div
												class="gallery-item group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-100 bg-slate-50"
											>
												<img
													src={img}
													alt="Showcase {index + 1}"
													class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
													onerror={(e) =>
														(e.currentTarget.closest('.gallery-item').style.display = 'none')}
												/>
											</div>
										{/each}
									</div>
								</div>
							{/if}

							<!-- Links -->
							<div class="space-y-3">
								<h4 class="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
									Portals & Contact
								</h4>
								<div class="flex flex-col gap-2">
									{#if selectedBarangay.website}
										<a
											href={selectedBarangay.website}
											target="_blank"
											rel="noopener noreferrer"
											class="hover:border-slate-350 group flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-800"
										>
											<span>Web Portal</span>
											<svg
												class="h-3.5 w-3.5 transform text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												stroke-width="2"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M14 5l7 7m0 0l-7 7m7-7H3"
												/></svg
											>
										</a>
									{/if}
									{#if selectedBarangay.facebook}
										<a
											href={selectedBarangay.facebook}
											target="_blank"
											rel="noopener noreferrer"
											class="hover:border-slate-350 group flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:text-slate-800"
										>
											<span>Facebook Page</span>
											<svg
												class="h-3.5 w-3.5 transform text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												stroke-width="2"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M14 5l7 7m0 0l-7 7m7-7H3"
												/></svg
											>
										</a>
									{/if}
									{#if selectedBarangay.contact}
										<a
											href="mailto:{selectedBarangay.contact}"
											class="flex items-center justify-center rounded-xl bg-slate-900 px-3 py-2.5 text-center text-xs font-bold text-white shadow-sm transition-all hover:bg-slate-800"
										>
											Send Message
										</a>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* clean scrollbar utility */
	.scrollbar-thin::-webkit-scrollbar {
		width: 6px;
	}
	.scrollbar-thin::-webkit-scrollbar-track {
		background: #f1f5f9;
		border-radius: 4px;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 4px;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb:hover {
		background: #94a3b8;
	}
</style>
