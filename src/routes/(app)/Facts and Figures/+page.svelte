<script>
	import { onMount } from 'svelte';
	import PageHero from '$lib/Components/PageHero.svelte';

	let visible = $state(false);
	let activeTab = $state('general');

	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 100);
	});

	const tabs = [
		{
			id: 'general',
			name: 'General Overview',
			icon: '<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>'
		},
		{
			id: 'economy',
			name: 'Economic Profile',
			icon: '<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
		},
		{
			id: 'social',
			name: 'Social & Infrastructure',
			icon: '<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>'
		}
	];

	const generalFacts = [
		{
			title: 'Land Area',
			value: '78.15 km²',
			desc: 'Spans coastal zones, plains, and rolling hills',
			icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
		},
		{
			title: 'Barangays',
			value: '54 Barangays',
			desc: 'Comprising urban, rural, and coastal communities',
			icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
		},
		{
			title: 'Projected Population',
			value: '57,300+',
			desc: 'Calculated based on average growth metrics',
			icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
		},
		{
			title: 'Linguistic Core',
			value: 'Waray-Waray',
			desc: 'Mother tongue spoken by 98% of families',
			icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
		},
		{
			title: 'Geography & Elevation',
			value: '4.5 meters',
			desc: 'Average height above sea level',
			icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
		},
		{
			title: 'Annual Tourists',
			value: '15,000+',
			desc: 'Drawn to historic sites & skimboarding parks',
			icon: 'M20.893 20.893a3 3 0 00-4.243 0l-2.83 2.83a3 3 0 000 4.243l2.83 2.83a3 3 0 004.243 0l2.83-2.83a3 3 0 000-4.243l-2.83-2.83z'
		}
	];

	const economicFacts = [
		{
			title: 'Municipal Class',
			value: '2nd Class',
			desc: 'Classification based on income brackets',
			icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
		},
		{
			title: 'Annual Revenue',
			value: '₱745 Million',
			desc: 'Combined local revenue & NTA shares (2023)',
			icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		{
			title: 'Primary Industry',
			value: 'Agriculture & Fishery',
			desc: 'Supported by extensive coastal zones & flatlands',
			icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
		},
		{
			title: 'Registered Businesses',
			value: '1,200+',
			desc: 'From commercial retail to light manufacturing',
			icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
		}
	];

	const socialFacts = [
		{
			title: 'Educational Institutions',
			value: '52 Schools',
			desc: 'Including public schools & colleges',
			icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
		},
		{
			title: 'Electrification Rate',
			value: '100% Electrified',
			desc: 'All 54 barangays fully energized',
			icon: 'M13 10V3L4 14h7v7l9-11h-7z'
		},
		{
			title: 'Road Infrastructures',
			value: '185.4 km',
			desc: 'Concreted provincial and municipal roads',
			icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
		},
		{
			title: 'Health Centers',
			value: '18 Stations',
			desc: 'Barangay Health Stations & Maternity Clinics',
			icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
		}
	];
</script>

<svelte:head>
	<title>Facts & Figures | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Municipal statistics, land area, economic data, demographics, and infrastructure facts of the Municipality of Tanauan, Leyte, Philippines."
	/>
</svelte:head>

<PageHero
	title="Facts & Figures"
	subtitle="Key municipal indicators, resources, and institutional progress charts"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z' /><path stroke-linecap='round' stroke-linejoin='round' d='M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z' /></svg>"
/>

<section class="relative bg-slate-50 pt-8 pb-20">
	<div class="mx-auto max-w-6xl px-6 sm:px-10">
		<!-- Navigation Tabs -->
		<div
			class="mb-8 flex justify-center border-b border-slate-200"
			class:opacity-0={!visible}
			class:opacity-100={visible}
			style="transition: all 400ms ease;"
		>
			<div class="flex space-x-1 sm:space-x-4">
				{#each tabs as tab}
					<button
						onclick={() => (activeTab = tab.id)}
						class="flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all duration-200 {activeTab ===
						tab.id
							? 'border-blue-900 text-blue-900'
							: 'border-transparent text-slate-500 hover:text-slate-800'}"
					>
						{@html tab.icon}
						{tab.name}
					</button>
				{/each}
			</div>
		</div>

		<!-- Tab Content Containers -->
		<div class="relative overflow-hidden">
			<!-- General Tab -->
			{#if activeTab === 'general'}
				<div
					class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
					class:opacity-0={!visible}
					class:translate-y-4={!visible}
					class:opacity-100={visible}
					class:translate-y-0={visible}
					style="transition: all 500ms ease;"
				>
					{#each generalFacts as item}
						<div
							class="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md sm:p-8"
						>
							<div>
								<div
									class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900 transition-colors duration-300 group-hover:bg-blue-900 group-hover:text-white"
								>
									<svg
										class="h-5 w-5"
										fill="none"
										stroke="currentColor"
										stroke-width="1.5"
										viewBox="0 0 24 24"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
									</svg>
								</div>
								<h3 class="text-sm font-semibold tracking-wider text-slate-500 uppercase">
									{item.title}
								</h3>
								<p class="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
							</div>
							<p class="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-600">{item.desc}</p>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Economy Tab -->
			{#if activeTab === 'economy'}
				<div
					class="grid gap-6 sm:grid-cols-2"
					class:opacity-0={!visible}
					class:translate-y-4={!visible}
					class:opacity-100={visible}
					class:translate-y-0={visible}
					style="transition: all 500ms ease;"
				>
					{#each economicFacts as item}
						<div
							class="group flex items-start gap-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md sm:p-8"
						>
							<div
								class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 transition-colors duration-300 group-hover:bg-yellow-500 group-hover:text-white"
							>
								<svg
									class="h-6 w-6"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									viewBox="0 0 24 24"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
								</svg>
							</div>
							<div>
								<h3 class="text-xs font-semibold tracking-wider text-slate-500 uppercase">
									{item.title}
								</h3>
								<p class="mt-0.5 text-xl font-bold text-slate-900">{item.value}</p>
								<p class="mt-2 text-sm text-slate-600">{item.desc}</p>
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- Social Tab -->
			{#if activeTab === 'social'}
				<div
					class="grid gap-6 sm:grid-cols-2"
					class:opacity-0={!visible}
					class:translate-y-4={!visible}
					class:opacity-100={visible}
					class:translate-y-0={visible}
					style="transition: all 500ms ease;"
				>
					{#each socialFacts as item}
						<div
							class="group flex items-start gap-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md sm:p-8"
						>
							<div
								class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white"
							>
								<svg
									class="h-6 w-6"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									viewBox="0 0 24 24"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
								</svg>
							</div>
							<div>
								<h3 class="text-xs font-semibold tracking-wider text-slate-500 uppercase">
									{item.title}
								</h3>
								<p class="mt-0.5 text-xl font-bold text-slate-900">{item.value}</p>
								<p class="mt-2 text-sm text-slate-600">{item.desc}</p>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Regional Context Map/Stat Footer -->
		<div
			class="mt-12 flex flex-col justify-between gap-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 md:flex-row md:items-center"
			class:opacity-0={!visible}
			class:opacity-100={visible}
			style="transition: all 500ms ease; transition-delay: 200ms;"
		>
			<div class="flex items-center gap-4">
				<div
					class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900"
				>
					<svg
						class="h-6 w-6"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253m0 0L12 10.5l8.716-2.247"
						/></svg
					>
				</div>
				<div>
					<h3 class="font-bold text-slate-900">Official Municipal Data Portal</h3>
					<p class="text-sm text-slate-600">
						Updated periodically in collaboration with the Local Planning and Development
						Coordinator (MPDC).
					</p>
				</div>
			</div>
			<div class="flex flex-wrap gap-3">
				<a
					href="/Geography"
					class="rounded-lg border border-blue-200 px-4 py-2 text-xs font-bold text-blue-900 transition-colors hover:bg-slate-50"
				>
					View Geography
				</a>
				<a
					href="/Demographics"
					class="rounded-lg border border-blue-200 px-4 py-2 text-xs font-bold text-blue-900 transition-colors hover:bg-slate-50"
				>
					View Demographics
				</a>
			</div>
		</div>
	</div>
</section>
