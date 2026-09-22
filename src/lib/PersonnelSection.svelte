<script>
	import { onMount } from 'svelte';
	import { officesByDepartment } from '$lib/config';

	export let department = '';
	export let limit = 3;
	export let collapsible = true;
	export let cleanLayout = false;

	let users = [];
	let offices = [];
	let selectedCategory = 'all';
	let searchQuery = '';
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
			const response = await fetch(`/api/personnel?department=${encodeURIComponent(department)}`);
			if (!response.ok) throw new Error('Failed to fetch personnel');
			const data = await response.json();
			users = data.users || [];
			offices = officesByDepartment[department] || [];
		} catch (err) {
			error = err.message;
			console.error('Error loading personnel:', err);
		} finally {
			loading = false;
		}
	});

	function getCategory(role) {
		const r = (role || '').toLowerCase();
		if (r.includes('treasurer') || r.includes('head') || r.includes('officer') || r.includes('cashier') || r.includes('liquidat') || r.includes('disburs')) {
			return 'executive';
		}
		if (r.includes('rcc') || r.includes('revenue') || r.includes('collection') || r.includes('clerk') || r.includes('petty')) {
			return 'revenue';
		}
		return 'support';
	}

	$: filteredUsers = users.filter((u) => {
		const matchesCategory =
			selectedCategory === 'all' || getCategory(u.role || u.designation) === selectedCategory;
		const matchesSearch =
			!searchQuery.trim() ||
			(u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
			(u.role || u.designation || '').toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	// If searching or filtering, reveal matching results; otherwise observe 3-item limit with collapsible
	$: isFilteredView = selectedCategory !== 'all' || searchQuery.trim().length > 0;
	$: displayed =
		isFilteredView || isExpanded || !collapsible || filteredUsers.length <= limit
			? filteredUsers
			: filteredUsers.slice(0, limit);

	function getInitials(name) {
		if (!name) return 'PS';
		const parts = name.trim().split(' ').filter(Boolean);
		if (parts.length >= 2) {
			return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
		}
		return parts[0].slice(0, 2).toUpperCase();
	}
</script>

<div class={cleanLayout ? '' : 'rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm'}>
	{#if !cleanLayout}
		<div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
			<h2 class="text-2xl font-black text-blue-950">Department Personnel</h2>
			{#if users.length > 0}
				<span class="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-blue-950">
					{users.length} PUBLIC SERVANTS
				</span>
			{/if}
		</div>
	{/if}

	{#if loading}
		<div class="flex flex-col items-center justify-center py-16 text-slate-500">
			<div class="w-10 h-10 border-4 border-amber-400 border-t-blue-900 rounded-full animate-spin mb-4"></div>
			<p class="font-bold text-sm text-slate-700 tracking-wide uppercase">Loading Official Personnel Registry...</p>
		</div>
	{:else if error}
		<div class="rounded-xl border-2 border-red-300 bg-red-50 p-6 text-center text-red-800 font-bold">
			Notice: {error}
		</div>
	{:else if users.length === 0}
		<div class="rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center text-slate-600 bg-slate-50">
			<div class="font-black text-base text-blue-950 mb-1">No Personnel Records Found</div>
			<p class="text-xs text-slate-500">Official staff appointments for this office are currently being updated.</p>
		</div>
	{:else}
		<!-- Actionable Civic Filter & Search Bar -->
		<div class="mb-8 p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
			<!-- Division Pills -->
			<div class="flex flex-wrap items-center gap-1.5">
				<button
					type="button"
					onclick={() => { selectedCategory = 'all'; isExpanded = false; }}
					class="px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all {selectedCategory === 'all'
						? 'bg-blue-950 text-white shadow-sm'
						: 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
				>
					All Staff ({users.length})
				</button>
				<button
					type="button"
					onclick={() => { selectedCategory = 'executive'; isExpanded = false; }}
					class="px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all {selectedCategory === 'executive'
						? 'bg-blue-950 text-white shadow-sm'
						: 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
				>
					Supervisory & Cash
				</button>
				<button
					type="button"
					onclick={() => { selectedCategory = 'revenue'; isExpanded = false; }}
					class="px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all {selectedCategory === 'revenue'
						? 'bg-blue-950 text-white shadow-sm'
						: 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
				>
					Revenue & Collection
				</button>
				<button
					type="button"
					onclick={() => { selectedCategory = 'support'; isExpanded = false; }}
					class="px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all {selectedCategory === 'support'
						? 'bg-blue-950 text-white shadow-sm'
						: 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
				>
					Administrative Support
				</button>
			</div>

			<!-- Search by Name or Position -->
			<div class="relative min-w-[260px]">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search personnel or role..."
					class="w-full pl-9 pr-4 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 text-slate-900 placeholder:text-slate-400"
				/>
				<span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-mono">⌕</span>
				{#if searchQuery}
					<button
						type="button"
						onclick={() => (searchQuery = '')}
						class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
					>
						✕
					</button>
				{/if}
			</div>
		</div>

		<!-- Personnel Cards Grid -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each displayed as person, idx}
				<article
					class="group relative flex flex-col justify-between rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-900 hover:shadow-xl overflow-hidden"
				>
					<!-- Top Civic Accent Bar -->
					<div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-amber-400 to-blue-900 opacity-70 group-hover:opacity-100 transition-opacity"></div>

					<div>
						<!-- Portrait and Status Row -->
						<div class="flex items-start justify-between gap-4 mb-4">
							<div class="relative">
								{#if person.portrait}
									<img
										src={person.portrait}
										alt={person.name}
										class="w-20 h-20 rounded-2xl object-cover shadow-sm border-2 border-blue-900 ring-4 ring-amber-400/30"
									/>
								{:else}
									<div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-950 to-blue-900 border-2 border-blue-950 ring-4 ring-amber-400/30 flex items-center justify-center font-black text-amber-300 text-xl shadow-sm tracking-wider">
										{getInitials(person.name)}
									</div>
								{/if}
								<span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" title="Active Civil Servant"></span>
							</div>

							<span class="px-2.5 py-1 rounded-md text-[10px] font-black font-mono tracking-wider bg-slate-100 text-slate-700 border border-slate-200 uppercase">
								DESK // 0{idx + 1}
							</span>
						</div>

						<!-- Official Name -->
						<h3 class="text-lg font-black text-blue-950 tracking-tight leading-snug group-hover:text-blue-900 transition-colors">
							{person.name}
						</h3>

						<!-- Position Badge -->
						<div class="mt-2.5 inline-block px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-950 font-black text-xs uppercase tracking-wide">
							{person.role || person.designation || 'Public Officer'}
						</div>
					</div>

					<!-- Bottom Civil Service Verification -->
					<div class="mt-6 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
						<span class="text-blue-950 font-extrabold uppercase">
							{department} Office
						</span>
						<span class="text-emerald-700 font-extrabold">
							CSC Appointed
						</span>
					</div>
				</article>
			{/each}
		</div>

		<!-- Show More / Show Less Collapsible Toggle (when not filtered/searching) -->
		{#if !isFilteredView && collapsible && filteredUsers.length > limit}
			<div class="mt-8 pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div class="flex items-center gap-2">
					<span class="w-3 h-3 rounded-full bg-amber-500"></span>
					<span class="text-xs font-bold text-slate-700 uppercase tracking-wide">
						Displaying {displayed.length} of {filteredUsers.length} appointed public servants
					</span>
				</div>
				<button
					type="button"
					onclick={() => (isExpanded = !isExpanded)}
					class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-amber-300 hover:text-white font-black text-xs uppercase tracking-wider shadow-md transition-all hover:scale-105 active:scale-95 border border-blue-900"
				>
					<span>{isExpanded ? '▲ View Less Personnel' : `▼ View Entire Department Roster (+${filteredUsers.length - limit} more)`}</span>
				</button>
			</div>
		{/if}
	{/if}
</div>
