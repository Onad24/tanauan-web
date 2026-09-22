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
	let selectedAwardPhoto = null;

	$: filtered = selectedOffice ? awards.filter((u) => u.office === selectedOffice) : awards;

	onMount(async () => {
		if (!department) {
			error = 'Department not specified';
			loading = false;
			return;
		}

		try {
			const response = await fetch(`/api/awards?department=${encodeURIComponent(department)}`);
			if (!response.ok) throw new Error('Failed to fetch awards');
			const data = await response.json();
			awards = data.posts || [];
			offices = officesByDepartment[department] || [];
		} catch (err) {
			error = err.message;
			console.error('Error loading awards:', err);
		} finally {
			loading = false;
		}
	});

	$: displayed = (isExpanded || !collapsible || filtered.length <= limit) ? filtered : filtered.slice(0, limit);

	function openPhotoModal(award) {
		if (award.media && award.media.length > 0) {
			selectedAwardPhoto = award;
		}
	}

	function closePhotoModal() {
		selectedAwardPhoto = null;
	}
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && closePhotoModal()} />

<div class={cleanLayout ? '' : 'rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm'}>
	{#if !cleanLayout}
		<div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
			<h2 class="text-2xl font-black text-blue-950">Awards and Citations</h2>
			{#if filtered.length > 0}
				<span class="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-blue-950">
					{filtered.length} CITATIONS CONFERRED
				</span>
			{/if}
		</div>
	{/if}

	{#if loading}
		<div class="flex flex-col items-center justify-center py-16 text-slate-500">
			<div class="w-10 h-10 border-4 border-amber-400 border-t-blue-900 rounded-full animate-spin mb-4"></div>
			<p class="font-bold text-sm text-slate-700 tracking-wide uppercase">Loading Official Honors & Citations...</p>
		</div>
	{:else if error}
		<div class="rounded-xl border-2 border-red-300 bg-red-50 p-6 text-center text-red-800 font-bold">
			Notice: {error}
		</div>
	{:else if filtered.length === 0}
		<div class="rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center text-slate-600 bg-slate-50">
			<div class="font-black text-base text-blue-950 mb-1">No Awards on Record</div>
			<p class="text-xs text-slate-500">Department citations and provincial recognitions are being consolidated.</p>
		</div>
	{:else}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each displayed as award, idx}
				<article
					class="group relative flex flex-col justify-between rounded-2xl border-2 border-amber-200/90 bg-gradient-to-b from-amber-50/30 via-white to-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500 hover:shadow-xl overflow-hidden"
				>
					<!-- Prestige Corner Accent Ribbon -->
					<div class="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
						<div class="absolute transform rotate-45 bg-amber-400 text-blue-950 font-black text-[9px] py-0.5 right-[-35px] top-[14px] w-[120px] text-center shadow-xs border-b border-amber-500">
							HONOR
						</div>
					</div>

					<div>
						<!-- Year and Conferment Header -->
						<div class="flex items-center gap-2 mb-4 pb-3 border-b border-amber-100 pr-12">
							<span class="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-400 text-blue-950 font-black text-xs shadow-xs border border-amber-500">
								★ {award.year || '2024'}
							</span>
							{#if award.awarding_body}
								<span class="text-[11px] font-bold text-blue-900 tracking-wide truncate">
									{award.awarding_body}
								</span>
							{/if}
						</div>

						<!-- Photo Display Frame with Hover Sheen -->
						<div
							class="relative mb-4 rounded-xl overflow-hidden border-2 border-slate-200 bg-slate-100 cursor-pointer group-hover:border-amber-400 transition-colors"
							onclick={() => openPhotoModal(award)}
							onkeydown={(e) => e.key === 'Enter' && openPhotoModal(award)}
							role="button"
							tabindex="0"
							title="Click to view award plaque in full resolution"
						>
							{#if award.media && award.media.length > 0}
								<img
									src={award.media[0]}
									alt={award.awards}
									class="w-full h-52 object-cover object-top rounded-lg transition-transform duration-500 group-hover:scale-105"
								/>
								<div class="absolute inset-0 bg-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
									<span class="px-3.5 py-1.5 rounded-lg bg-white/95 text-blue-950 font-black text-xs uppercase shadow-md backdrop-blur-sm">
										Inspect Photo ↗
									</span>
								</div>
							{:else}
								<div class="h-52 flex items-center justify-center bg-slate-100 text-slate-400 text-xs font-bold uppercase">
									Official Citation
								</div>
							{/if}
						</div>

						<!-- Award Title -->
						<h3 class="text-lg font-black text-blue-950 tracking-tight leading-snug group-hover:text-blue-800 transition-colors">
							{award.awards}
						</h3>

						<!-- Citation Description -->
						{#if award.description}
							<p class="mt-2.5 text-sm text-slate-700 leading-relaxed font-normal">
								{award.description}
							</p>
						{/if}
					</div>

					<!-- Bottom Verification Bar -->
					<div class="mt-5 pt-4 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-slate-600">
						<span class="text-amber-800 font-extrabold uppercase text-[11px]">
							Official Municipal Citation
						</span>
						<button
							type="button"
							onclick={() => openPhotoModal(award)}
							class="text-blue-900 hover:text-blue-950 font-black text-xs uppercase hover:underline"
						>
							View Plaque →
						</button>
					</div>
				</article>
			{/each}
		</div>

		<!-- Show More / Show Less Collapsible Toggle -->
		{#if collapsible && filtered.length > limit}
			<div class="mt-8 pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div class="flex items-center gap-2">
					<span class="w-3 h-3 rounded-full bg-amber-500"></span>
					<span class="text-xs font-bold text-slate-700 uppercase tracking-wide">
						Displaying {displayed.length} of {filtered.length} official provincial and regional awards
					</span>
				</div>
				<button
					type="button"
					onclick={() => (isExpanded = !isExpanded)}
					class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-amber-300 hover:text-white font-black text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105 active:scale-95 border border-blue-900"
				>
					<span>{isExpanded ? '▲ View Less Awards' : `▼ View Complete Honors Roster (+${filtered.length - limit} more)`}</span>
				</button>
			</div>
		{/if}
	{/if}
</div>

<!-- High-Resolution Award Plaque Modal -->
{#if selectedAwardPhoto}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-blue-950/85 backdrop-blur-md transition-all duration-300"
		onclick={closePhotoModal}
		role="dialog"
		aria-modal="true"
	>
		<div
			class="relative max-w-4xl w-full bg-white rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
			onclick={(e) => e.stopPropagation()}
			role="document"
		>
			<div class="flex items-center justify-between px-6 py-4 bg-blue-950 text-white border-b-2 border-amber-400">
				<div>
					<div class="text-sm font-black tracking-wide uppercase">{selectedAwardPhoto.awards}</div>
					<div class="text-xs text-amber-300 font-bold">{selectedAwardPhoto.awarding_body} • {selectedAwardPhoto.year || '2024'}</div>
				</div>
				<button
					type="button"
					onclick={closePhotoModal}
					class="w-8 h-8 rounded-lg bg-blue-900 hover:bg-red-600 text-white font-black text-sm flex items-center justify-center transition-colors"
					aria-label="Close photo viewer"
				>
					✕
				</button>
			</div>

			<div class="p-6 overflow-auto bg-slate-100 flex items-center justify-center">
				<img
					src={selectedAwardPhoto.media[0]}
					alt={selectedAwardPhoto.awards}
					class="w-auto h-auto max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg border border-slate-300 bg-white"
				/>
			</div>

			{#if selectedAwardPhoto.description}
				<div class="px-6 py-4 bg-white border-t border-slate-200 text-sm font-medium text-slate-800">
					{selectedAwardPhoto.description}
				</div>
			{/if}
		</div>
	</div>
{/if}
