<script>
	import PageHero from '$lib/Components/PageHero.svelte';
	import DataStatusNotice from '$lib/Components/DataStatusNotice.svelte';
	import { defaultNavDepartments } from '$lib/config';

	let { data } = $props();
	let searchQuery = $state('');
	let activeTab = $state('all'); // 'all' | 'local' | 'national'

	const groupsList = $derived(data?.navGroups ?? defaultNavDepartments);
	const localGroups = $derived(groupsList.filter((g) => g.category !== 'national'));
	const nationalGroups = $derived(groupsList.filter((g) => g.category === 'national'));

	let filteredLocal = $derived(
		localGroups
			.map((group) => {
				const offices = (group.offices || []).filter((off) => {
					if (!searchQuery.trim()) return true;
					const q = searchQuery.toLowerCase();
					return off.name.toLowerCase().includes(q) || group.group.toLowerCase().includes(q);
				});
				return { ...group, offices };
			})
			.filter((g) => g.offices.length > 0)
	);

	let filteredNational = $derived(
		nationalGroups
			.map((group) => {
				const offices = (group.offices || []).filter((off) => {
					if (!searchQuery.trim()) return true;
					const q = searchQuery.toLowerCase();
					return off.name.toLowerCase().includes(q) || group.group.toLowerCase().includes(q);
				});
				return { ...group, offices };
			})
			.filter((g) => g.offices.length > 0)
	);
</script>

<svelte:head>
	<title>Municipal Offices Directory | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Comprehensive directory of Local Government Offices and National Government Agencies operating in the Municipality of Tanauan, Leyte."
	/>
</svelte:head>

<PageHero
	title="Municipal Offices Directory"
	subtitle="Complete listing of Local Government Offices and National Government Agencies in Tanauan, Leyte"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z' /></svg>"
/>

<section class="bg-slate-50 py-12 md:py-16">
	<div class="container mx-auto max-w-7xl px-6 md:px-12">
		<!-- Search & Category Filter Controls -->
		<div class="mb-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
			<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div class="relative flex-1">
					<span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</span>
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search offices by name or keyword (e.g. Mayor, Treasurer, Health, Civil Registrar, Police)..."
						class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-4 pl-11 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-blue-600 focus:bg-white focus:outline-none"
					/>
				</div>

				<div class="flex items-center gap-2 shrink-0">
					<button
						onclick={() => (activeTab = 'all')}
						class="rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all {activeTab === 'all'
							? 'bg-blue-900 text-white shadow-sm'
							: 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
					>
						All Offices
					</button>
					<button
						onclick={() => (activeTab = 'local')}
						class="rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all {activeTab === 'local'
							? 'bg-blue-900 text-white shadow-sm'
							: 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
					>
						Local LGU ({localGroups.length})
					</button>
					<button
						onclick={() => (activeTab = 'national')}
						class="rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all {activeTab === 'national'
							? 'bg-blue-900 text-white shadow-sm'
							: 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
					>
						National NGAs ({nationalGroups.length})
					</button>
				</div>
			</div>
		</div>

		<!-- Data Update Notice Component -->
		<DataStatusNotice officeName="Municipal Public Offices" />

		<!-- ================= LOCAL GOVERNMENT OFFICES ================= -->
		{#if activeTab === 'all' || activeTab === 'local'}
			<div class="mb-16">
				<div class="mb-6 flex items-center justify-between border-b border-slate-200 pb-3">
					<div class="flex items-center gap-2">
						<span class="rounded bg-blue-100 px-2 py-0.5 text-xs font-black text-blue-900 uppercase">
							LGU
						</span>
						<h2 class="text-2xl font-black text-slate-900">Local Government Offices</h2>
					</div>
					<span class="text-xs font-semibold text-slate-500">Municipality of Tanauan, Leyte</span>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each filteredLocal as group}
						<div class="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md">
							<div class="mb-3 flex items-start justify-between gap-2">
								<h3 class="text-base font-bold text-slate-900 leading-snug">
									{group.group}
								</h3>
								<span class="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 shrink-0">
									{group.offices.length} {group.offices.length === 1 ? 'Office' : 'Units'}
								</span>
							</div>

							<div class="space-y-1.5 mt-2 flex-grow border-t border-slate-100 pt-3">
								{#each group.offices as office}
									<a
										href={office.href}
										class="group flex items-center justify-between rounded-lg p-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition"
									>
										<span>{office.name}</span>
										<svg class="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
										</svg>
									</a>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- ================= NATIONAL GOVERNMENT AGENCIES ================= -->
		{#if activeTab === 'all' || activeTab === 'national'}
			<div>
				<div class="mb-6 flex items-center justify-between border-b border-slate-200 pb-3">
					<div class="flex items-center gap-2">
						<span class="rounded bg-amber-100 px-2 py-0.5 text-xs font-black text-amber-900 uppercase">
							NGA
						</span>
						<h2 class="text-2xl font-black text-slate-900">National Government Agencies & Inter-Agency Desks</h2>
					</div>
					<span class="text-xs font-semibold text-slate-500">Operating in Tanauan, Leyte</span>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each filteredNational as group}
						<div class="flex flex-col rounded-2xl border border-amber-200/80 bg-white p-6 shadow-sm transition hover:border-amber-400 hover:shadow-md">
							<div class="mb-3 flex items-start justify-between gap-2">
								<h3 class="text-base font-bold text-slate-900 leading-snug">
									{group.group}
								</h3>
								<span class="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 shrink-0">
									{group.offices.length} Units
								</span>
							</div>

							<div class="space-y-1.5 mt-2 flex-grow border-t border-slate-100 pt-3">
								{#each group.offices as office}
									<a
										href={office.href}
										class="group flex items-center justify-between rounded-lg p-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition"
									>
										<span>{office.name}</span>
										<svg class="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-900 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
										</svg>
									</a>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>
