<script>
	import { onMount } from 'svelte';
	import { officesByDepartment } from '$lib/config';

	export let department = '';

	let activities = [];
	let offices = [];
	let selectedOffice = '';
	let loading = true;
	let error = '';

	// Modal state for carousel
	let showModal = false;
	let selectedActivityIndex = -1;
	let currentImageIndex = 0;

	onMount(async () => {
		if (!department) {
			error = 'Department not specified';
			loading = false;
			return;
		}

		try {
			const response = await fetch(
				`/api/posts?department=${encodeURIComponent(department)}&type=${encodeURIComponent('activity')}`
			);
			if (!response.ok) throw new Error('Failed to fetch activities');
			const data = await response.json();
			activities = data.posts || [];
			console.log(activities);
			offices = officesByDepartment[department] || [];
		} catch (err) {
			error = err.message;
			console.error('Error loading activities:', err);
		} finally {
			loading = false;
		}
	});

	function openCarousel(index) {
		selectedActivityIndex = index;
		currentImageIndex = 0;
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		selectedActivityIndex = -1;
		currentImageIndex = 0;
	}

	function nextImage() {
		if (selectedActivityIndex >= 0 && activities[selectedActivityIndex].media) {
			currentImageIndex = (currentImageIndex + 1) % activities[selectedActivityIndex].media.length;
		}
	}

	function prevImage() {
		if (selectedActivityIndex >= 0 && activities[selectedActivityIndex].media) {
			currentImageIndex =
				(currentImageIndex - 1 + activities[selectedActivityIndex].media.length) %
				activities[selectedActivityIndex].media.length;
		}
	}

	function handleKeydown(e) {
		if (!showModal) return;
		if (e.key === 'ArrowRight') nextImage();
		if (e.key === 'ArrowLeft') prevImage();
		if (e.key === 'Escape') closeModal();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<section class="rounded-2xl border border-gray-100 bg-white p-6 shadow">
	<h2 class="mb-4 text-2xl font-semibold text-teal-700">Activities</h2>

	{#if loading}
		<div class="text-center text-gray-500">Loading activities...</div>
	{:else if error}
		<div class="rounded-lg border border-red-300 bg-red-50 p-4 text-center text-red-600">
			Error: {error}
		</div>
	{:else if activities.length === 0}
		<div class="rounded-lg border border-dashed p-6 text-center text-gray-500">
			No activities found.
		</div>
	{:else}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each activities as activity, index}
				<div
					class="flex flex-col items-center gap-3 rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
				>
					<button
						on:click={() => openCarousel(index)}
						class="group relative w-full cursor-pointer overflow-hidden rounded-lg"
						type="button"
						aria-label="Open {activity.header} gallery"
					>
						{#if activity.media && activity.media.length > 0}
							{#if activity.media[0].endsWith('.mp4') || activity.media[0].endsWith('.webm')}
								<video
									src={activity.media[0]}
									alt={activity.header}
									class="h-48 w-full object-cover transition-opacity group-hover:opacity-80"
								></video>
								<div
									class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100"
								>
									<svg class="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
							{:else if activity.media[0].endsWith('.pptx') || activity.media[0].endsWith('.ppt') || activity.media[0].endsWith('.pdf')}
								<div
									class="flex h-48 w-full items-center justify-center bg-gray-200 text-gray-500 transition-opacity group-hover:opacity-80"
								>
									<div class="text-center">
										<svg
											class="mx-auto h-12 w-12"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
											/>
										</svg>
										<p class="mt-2 text-sm">View Document</p>
									</div>
								</div>
							{:else}
								<img
									src={activity.media[0]}
									alt={activity.header}
									class="h-48 w-full object-cover transition-opacity group-hover:opacity-80"
								/>
								{#if activity.media.length > 1}
									<div
										class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
									>
										<div
											class="rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-800"
										>
											+{activity.media.length - 1} more
										</div>
									</div>
								{/if}
							{/if}
						{:else}
							<div class="flex h-48 w-full items-center justify-center bg-gray-300">
								<span class="text-gray-500">No image</span>
							</div>
						{/if}
					</button>

					<div class="w-full">
						<p class="text-center font-semibold text-gray-800">{activity.header}</p>
						{#if activity.description}
							<p class="mt-2 line-clamp-2 text-sm text-gray-600">{activity.description}</p>
						{/if}
						{#if activity.media && activity.media.length > 1}
							<p class="mt-2 text-center text-xs font-medium text-teal-600">
								{activity.media.length} images
							</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>

<!-- Carousel Modal -->
{#if showModal && selectedActivityIndex >= 0}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
		on:click={closeModal}
		role="dialog"
		aria-modal="true"
		aria-label="Image carousel"
	>
		<div
			class="relative w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-2xl"
			on:click={(e) => e.stopPropagation()}
		>
			<!-- Close button -->
			<button
				on:click={closeModal}
				class="absolute top-4 right-4 z-10 rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600"
				aria-label="Close carousel"
				type="button"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<!-- Main image display -->
			<div class="relative flex min-h-96 items-center justify-center bg-black">
				{#if activities[selectedActivityIndex].media[currentImageIndex].endsWith('.mp4') || activities[selectedActivityIndex].media[currentImageIndex].endsWith('.webm')}
					<video
						src={activities[selectedActivityIndex].media[currentImageIndex]}
						class="max-h-96 w-auto object-contain"
						controls
					></video>
				{:else if activities[selectedActivityIndex].media[currentImageIndex].endsWith('.pptx') || activities[selectedActivityIndex].media[currentImageIndex].endsWith('.ppt') || activities[selectedActivityIndex].media[currentImageIndex].endsWith('.pdf')}
					<a
						href={activities[selectedActivityIndex].media[currentImageIndex]}
						target="_blank"
						class="flex h-full w-full flex-col items-center justify-center gap-4 text-white"
					>
						<svg class="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
							/>
						</svg>
						<span>Click to open document</span>
					</a>
				{:else}
					<img
						src={activities[selectedActivityIndex].media[currentImageIndex]}
						alt="Activity media {currentImageIndex + 1}"
						class="max-h-96 w-auto object-contain"
					/>
				{/if}
			</div>

			<!-- Navigation -->
			{#if activities[selectedActivityIndex].media.length > 1}
				<div class="flex items-center justify-between bg-gray-100 p-4">
					<button
						on:click={prevImage}
						class="rounded-lg bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700"
						aria-label="Previous image"
						type="button"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>

					<div class="flex items-center gap-3">
						<span class="text-sm font-medium text-gray-700">
							{currentImageIndex + 1} / {activities[selectedActivityIndex].media.length}
						</span>

						<!-- Thumbnail strip -->
						<div class="flex max-w-xs gap-2 overflow-x-auto">
							{#each activities[selectedActivityIndex].media as media, idx}
								<button
									on:click={() => (currentImageIndex = idx)}
									class="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded border-2 transition-all {idx ===
									currentImageIndex
										? 'border-teal-600'
										: 'border-gray-300 hover:border-gray-400'}"
									aria-label="Go to image {idx + 1}"
									type="button"
								>
									{#if media.endsWith('.mp4') || media.endsWith('.webm')}
										<video src={media} class="h-full w-full object-cover"></video>
									{:else if media.endsWith('.pptx') || media.endsWith('.ppt') || media.endsWith('.pdf')}
										<div class="flex h-full w-full items-center justify-center bg-gray-300">
											<svg
												class="h-6 w-6 text-gray-500"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
												/>
											</svg>
										</div>
									{:else}
										<img src={media} alt="Thumbnail {idx + 1}" class="h-full w-full object-cover" />
									{/if}
								</button>
							{/each}
						</div>
					</div>

					<button
						on:click={nextImage}
						class="rounded-lg bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700"
						aria-label="Next image"
						type="button"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				</div>
			{/if}

			<!-- Activity details -->
			<div class="bg-white p-6">
				<h3 class="mb-2 text-2xl font-bold text-gray-900">
					{activities[selectedActivityIndex].header}
				</h3>
				{#if activities[selectedActivityIndex].description}
					<p class="leading-relaxed text-gray-700">
						{activities[selectedActivityIndex].description}
					</p>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	:global(body.modal-open) {
		overflow: hidden;
	}
</style>
