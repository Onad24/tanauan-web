<script>
	import { onMount } from 'svelte';
	import PageHero from '$lib/Components/PageHero.svelte';

	let visible = $state(false);
	let selectedMap = $state('tsunami');

	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 100);
	});

	const maps = {
		tsunami: {
			name: 'Tsunami Hazard Map',
			desc: 'High-risk zones, inundation levels, and safe elevation areas',
			url: '/Tsunami/index.html',
			icon: '<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l4.061 3.385a.75.75 0 01.299.58v3.3M12.75 3.03a9 9 0 00-9 9M12.75 3.03v2.25C12.75 6.09 13.66 7 14.78 7h2.22m-14.25 5.25a9 9 0 0013.32 7.828M3.75 12.25h.008v.008H3.75v-.008zm6.002 5.25h.008v.008H9.752v-.008zm1.5-3h.008v.008h-.008v-.008zm3-3H14.26v.008h-.008v-.008zm-6-3h.008v.008H8.252v-.008zm3-3h.008v.008h-.008V6.25z" /></svg>'
		},
		evac: {
			name: 'Evacuation Centers',
			desc: 'Primary temporary shelters, safe zones, and routing paths',
			url: '/Evac Center/index.html',
			icon: '<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>'
		},
		population: {
			name: 'Population Density Map',
			desc: 'Barangay population matrix, heat zones, and demographic spread',
			url: '/Population/index.html',
			icon: '<svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.07 19h-.007a11.386 11.386 0 01-4.993-.109v-.111c0-1.111.283-2.158.783-3.069m0 0a4.125 4.125 0 00-7.533 2.493 9.337 9.337 0 004.121.952c1.078 0 2.107-.18 3.063-.512M15.002 12c.007-.08.012-.16.012-.24a4.5 4.5 0 10-9 0c0 .08.005.16.012.24M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.303 1.25a3 3 0 11-5.696 0 3 3 0 015.696 0zm-16.91 0a3 3 0 11-5.696 0 3 3 0 015.696 0z" /></svg>'
		}
	};

	// Go Bag Checklist state
	let checklist = $state([
		{ item: 'Drinking Water (at least 3 liters per person)', checked: false },
		{ item: 'Non-perishable Canned Food & Can Opener', checked: false },
		{ item: 'First Aid Kit & Maintenance Medicines', checked: false },
		{ item: 'Flashlight, Portable Radio & Extra Batteries', checked: false },
		{ item: 'Whistle (for signaling)', checked: false },
		{ item: 'Waterproof pouch for important documents (ID, land titles)', checked: false },
		{ item: 'Sanitary items (soap, alcohol, masks)', checked: false },
		{ item: 'Powerbank & Phone Chargers', checked: false }
	]);

	const hotlines = [
		{
			name: 'MDRRMO Rescue',
			phone: '+63 917 808 2232',
			icon: '<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>'
		},
		{
			name: 'Tanauan Police (PNP)',
			phone: '+63 998 598 6378',
			icon: '<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>'
		},
		{
			name: 'Tanauan Fire (BFP)',
			phone: '+63 917 110 5980',
			icon: '<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>'
		},
		{
			name: 'Leyte Provincial Disaster',
			phone: '(053) 321-4688',
			icon: '<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>'
		}
	];
</script>

<svelte:head>
	<title>Community Hazard & Interactive Maps | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Access live GIS mapping including Tsunami Inundation, Evacuation Center routes, and demographic heat maps of Tanauan, Leyte."
	/>
</svelte:head>

<PageHero
	title="Hazard & Preparedness Map"
	subtitle="Interactive GIS portals for disaster risk reduction and community evacuation mapping"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M9 6.75V15m6-6v8.25m.503 3.446l6.002-3.461c.621-.358.621-1.254 0-1.612l-6.002-3.461c-.62-.358-1.4-.358-2.02 0l-6.002 3.461c-.621.358-.621 1.254 0 1.612l6.002 3.461c.62.358 1.4.358 2.02 0zM3 16.5v-6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 10.5v6' /></svg>"
/>

<section class="relative bg-slate-50 pt-8 pb-20">
	<div class="mx-auto max-w-6xl px-6 sm:px-10">
		<!-- Interactive Map Viewer Layout -->
		<div
			class="mb-10 grid gap-8 lg:grid-cols-12"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease;"
		>
			<!-- Side Control Dashboard -->
			<div class="space-y-6 lg:col-span-4">
				<!-- Map Selector Cards -->
				<div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<h3 class="mb-4 text-xs font-bold tracking-wider text-slate-500 uppercase">
						Select Map Overlay
					</h3>

					<div class="space-y-3">
						{#each Object.keys(maps) as key}
							{@const item = maps[key]}
							<button
								onclick={() => (selectedMap = key)}
								class="flex w-full gap-3 rounded-xl border-2 p-3.5 text-left transition-all duration-200 {selectedMap ===
								key
									? 'border-blue-900 bg-blue-50/20 text-slate-900 shadow-sm'
									: 'border-slate-100 text-slate-600 hover:border-slate-200'}"
							>
								<div
									class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg {selectedMap ===
									key
										? 'bg-blue-900 text-white'
										: 'bg-slate-50 text-slate-600'}"
								>
									{@html item.icon}
								</div>
								<div>
									<h4
										class="text-sm font-bold {selectedMap === key
											? 'text-blue-900'
											: 'text-slate-800'}"
									>
										{item.name}
									</h4>
									<p class="mt-0.5 text-[11px] leading-snug text-slate-500">{item.desc}</p>
								</div>
							</button>
						{/each}
					</div>
				</div>

				<!-- Official Disclaimer Widget -->
				<div
					class="rounded-2xl border border-l-4 border-slate-200 border-l-amber-500 bg-amber-50/40 p-5 shadow-sm"
				>
					<h4
						class="flex items-center gap-1.5 text-xs font-bold tracking-wider text-amber-800 uppercase"
					>
						<svg
							class="h-4 w-4 text-amber-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/></svg
						>
						Official Disclaimer
					</h4>
					<p class="mt-2 text-xs leading-relaxed text-slate-600">
						All geospatial assets, hazard indicators, and routing charts presented are configured by
						the Tanauan Local Planning and Development Coordinator. For critical live emergencies,
						please reference instructions broadcasted directly by the MDRRMO.
					</p>
				</div>
			</div>

			<!-- Main Map View iframe wrapper -->
			<div class="lg:col-span-8">
				<div
					class="relative flex h-[650px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
				>
					<!-- Header strip -->
					<div class="mb-2 flex items-center justify-between border-b border-slate-100 px-3 py-2">
						<span
							class="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-700 uppercase"
						>
							<span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
							Active Map: {maps[selectedMap].name}
						</span>
						<a
							href={maps[selectedMap].url}
							target="_blank"
							class="flex items-center gap-1 text-[10px] font-bold text-blue-900 uppercase hover:underline"
						>
							Open in Fullscreen
							<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/></svg
							>
						</a>
					</div>

					<!-- Iframe -->
					<div
						class="relative w-full flex-grow overflow-hidden rounded-xl border border-slate-100 bg-slate-50"
					>
						<!-- Frame loading overlay if needed -->
						<iframe
							src={maps[selectedMap].url}
							class="h-full w-full border-none"
							allow="fullscreen"
							title={maps[selectedMap].name}
						></iframe>
					</div>
				</div>
			</div>
		</div>

		<!-- Extra Functionality Section: Preparedness Tools -->
		<div
			class="grid gap-8 md:grid-cols-2"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 150ms;"
		>
			<!-- Go Bag Interactive Checklist -->
			<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
				<div class="mb-5 flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900"
					>
						<svg
							class="h-5 w-5"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/></svg
						>
					</div>
					<div>
						<h3 class="text-base font-extrabold text-slate-900">Interactive Go-Bag Checklist</h3>
						<p class="text-xs font-medium text-slate-500">
							Verify your family preparedness kit today
						</p>
					</div>
				</div>

				<div class="space-y-2">
					{#each checklist as check}
						<label
							class="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-50 p-2.5 transition-colors select-none hover:bg-slate-50/50"
						>
							<input
								type="checkbox"
								bind:checked={check.checked}
								class="mt-1 h-4 w-4 rounded border-slate-300 text-blue-900 transition-all focus:border-transparent focus:ring-blue-500"
							/>
							<span
								class="text-xs leading-normal font-semibold text-slate-700 {check.checked
									? 'text-slate-400 line-through'
									: ''}"
							>
								{check.item}
							</span>
						</label>
					{/each}
				</div>
			</div>

			<!-- Emergency hotline lists -->
			<div
				class="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
			>
				<div>
					<div class="mb-5 flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-600"
						>
							<svg
								class="h-5 w-5"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.194-4.174-7-7l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
								/></svg
							>
						</div>
						<div>
							<h3 class="text-base font-extrabold text-slate-900">Tanauan Emergency Hotlines</h3>
							<p class="text-xs font-medium text-slate-500">
								Click numbers below to call immediately
							</p>
						</div>
					</div>

					<div class="space-y-3.5">
						{#each hotlines as hotline}
							<div
								class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3 transition-colors hover:bg-slate-50"
							>
								<div class="flex items-center gap-2.5">
									<div
										class="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-100 bg-white text-slate-600"
									>
										{@html hotline.icon}
									</div>
									<span class="text-xs font-bold text-slate-800">{hotline.name}</span>
								</div>
								<a
									href="tel:{hotline.phone.replace(/\s+/g, '')}"
									class="hover:border-slate-350 flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-blue-900 shadow-sm transition-all"
								>
									<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
										/></svg
									>
									{hotline.phone}
								</a>
							</div>
						{/each}
					</div>
				</div>

				<div class="mt-6 border-t border-slate-100 pt-3 text-[10px] text-slate-400">
					* Keeping these contact lines stored on your local devices can save critical lives. Stay
					alert.
				</div>
			</div>
		</div>
	</div>
</section>
