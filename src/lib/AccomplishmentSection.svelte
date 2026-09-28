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
			awards = data.posts || [];
			offices = officesByDepartment[department] || [];
		} catch (err) {
			error = err.message;
			console.error('Error loading accomplishments:', err);
		} finally {
			loading = false;
		}
	});

	$: displayed = (isExpanded || !collapsible || awards.length <= limit) ? awards : awards.slice(0, limit);

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

<div class={cleanLayout ? '' : 'rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm'}>
	{#if !cleanLayout}
		<div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
			<h2 class="text-2xl font-black text-blue-950">Accomplishment Reports</h2>
			{#if awards.length > 0}
				<span class="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-blue-950">
					{awards.length} PUBLISHED {awards.length > 1 ? 'REPORTS' : 'REPORT'}
				</span>
			{/if}
		</div>
	{/if}

	{#if loading}
		<div class="flex flex-col items-center justify-center py-16 text-slate-500">
			<div class="w-10 h-10 border-4 border-amber-400 border-t-blue-900 rounded-full animate-spin mb-4"></div>
			<p class="font-bold text-sm text-slate-700 tracking-wide uppercase">Loading Audited Reports...</p>
		</div>
	{:else if error}
		<div class="rounded-xl border-2 border-red-300 bg-red-50 p-6 text-center text-red-800 font-bold">
			Notice: {error}
		</div>
	{:else if awards.length === 0}
		<div class="rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center text-slate-600 bg-slate-50">
			<div class="font-black text-base text-blue-950 mb-1">No Accomplishment Reports on Record</div>
			<p class="text-xs text-slate-500">Audited fiscal disclosures and departmental scorecards are scheduled for release.</p>
		</div>
	{:else}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each displayed as item, idx}
				<article
					class="group relative flex flex-col justify-between rounded-2xl border-2 border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-xl overflow-hidden"
				>
					<!-- Top Accent Border Line -->
					<div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-900 via-amber-400 to-blue-900 opacity-80 group-hover:opacity-100 transition-opacity"></div>

					<div>
						<!-- Document Metadata Header -->
						<div class="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
							<div class="flex items-center gap-2">
								<span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
								<span class="text-[11px] font-mono font-black tracking-wider text-blue-950 uppercase">
									FOLIO // 0{idx + 1}
								</span>
							</div>
							<span class="text-xs font-extrabold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
								{formatDate(item.date_added)}
							</span>
						</div>

						<!-- Media / Document Presentation Preview -->
						<div class="mb-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
							{#if item.media && item.media.length > 0}
								{#if item.media[0].endsWith('.mp4') || item.media[0].endsWith('.webm')}
									<video
										src={item.media[0]}
										class="w-full h-44 object-cover rounded-lg"
										controls
									>
										<track kind="captions" />
									</video>
								{:else if item.media[0].endsWith('.pptx') || item.media[0].endsWith('.ppt')}
									<div class="p-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-50/80 to-white min-h-[160px]">
										<div class="w-14 h-14 rounded-2xl bg-amber-400 border-2 border-amber-500 flex items-center justify-center font-black text-blue-950 text-sm shadow-sm mb-3">
											PPTX
										</div>
										<span class="text-xs font-black text-blue-950 uppercase tracking-wide mb-1">
											Executive Presentation Deck
										</span>
										<span class="text-[11px] font-semibold text-slate-500">
											Official Department Briefing
										</span>
									</div>
								{:else if item.media[0].endsWith('.pdf')}
									<div class="p-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-blue-50/80 to-white min-h-[160px]">
										<div class="w-14 h-14 rounded-2xl bg-blue-900 border-2 border-blue-950 flex items-center justify-center font-black text-amber-400 text-sm shadow-sm mb-3">
											PDF
										</div>
										<span class="text-xs font-black text-blue-950 uppercase tracking-wide mb-1">
											Official Signed Document
										</span>
										<span class="text-[11px] font-semibold text-slate-500">
											Public Transparency Record
										</span>
									</div>
								{:else}
									<img
										src={item.media[0]}
										alt={item.header}
										class="w-full h-44 object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
									/>
								{/if}
							{:else}
								<div class="h-40 flex items-center justify-center bg-slate-100 text-slate-400 text-xs font-bold uppercase">
									Official Administrative Record
								</div>
							{/if}
						</div>

						<!-- Report Title & Description -->
						<h3 class="text-lg font-black text-blue-950 tracking-tight leading-snug group-hover:text-blue-800 transition-colors">
							{item.header}
						</h3>
						{#if item.content && item.content !== item.header}
							<p class="mt-2 text-sm text-slate-700 leading-relaxed line-clamp-2">
								{item.content}
							</p>
						{/if}
					</div>

					<!-- Direct Access Action Button -->
					<div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
						<span class="text-[11px] font-extrabold tracking-wider text-emerald-800 uppercase flex items-center gap-1.5">
							<span class="w-2 h-2 rounded-full bg-emerald-600"></span>
							COA Audited & Filed
						</span>

						{#if item.media && item.media.length > 0}
							<a
								href={item.media[0]}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-amber-300 hover:text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-105"
							>
								<span>Access Record ↗</span>
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>

		<!-- Polished Show More / Show Less Collapsible Toggle -->
		{#if collapsible && awards.length > limit}
			<div class="mt-8 pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div class="flex items-center gap-2">
					<span class="w-3 h-3 rounded-full bg-amber-500"></span>
					<span class="text-xs font-bold text-slate-700 uppercase tracking-wide">
						Displaying {displayed.length} of {awards.length} verified accomplishment reports
					</span>
				</div>
				<button
					type="button"
					onclick={() => (isExpanded = !isExpanded)}
					class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-amber-300 hover:text-white font-black text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105 active:scale-95 border border-blue-900"
				>
					<span>{isExpanded ? '▲ View Less Reports' : `▼ Load Additional Reports (+${awards.length - limit} more)`}</span>
				</button>
			</div>
		{/if}
	{/if}
</div>
