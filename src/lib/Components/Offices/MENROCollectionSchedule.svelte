<script>
	import { fade } from 'svelte/transition';

	// Filters
	let selectedDay = $state('All');
	let searchQuery = $state('');
	let viewMode = $state('matrix'); // 'matrix' | 'cards'

	const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

	const scheduleData = [
		{
			id: 'foton-mini',
			vehicle: 'Foton Mini Dump Truck',
			driver: 'Bernardo Gerilla',
			driverType: 'Regular',
			routes: [
				{
					day: 'Monday',
					collectors: 'Florentino Tabalno',
					status: 'Job Order',
					area: 'Plaza, Baras, Cabalagnan, Maribi (Housing)'
				},
				{
					day: 'Tuesday',
					collectors: 'Reymark Cinco',
					status: 'Job Order',
					area: 'Plaza, Bachelor (Sto. Niño), Pawa (Sto. Niño), Magay (Sulod), Kalinginan (Sto. Niño)'
				},
				{
					day: 'Wednesday',
					collectors: 'Jodel Basco',
					status: 'Job Order',
					area: 'Plaza, Licod'
				},
				{
					day: 'Thursday',
					collectors: 'Lolito Lumanta',
					status: 'Job Order',
					area: 'Plaza, Amanluran, Linao, Arado, Catmon, Cogon, Cogon Boundary to Calsadahay Highway'
				},
				{
					day: 'Friday',
					collectors: 'Collection Team',
					status: 'Job Order',
					area: 'Plaza, Imperio St. (Canramos), Buri (Canramos), San Miguel (Sulod)'
				}
			]
		},
		{
			id: 'new-compactor',
			vehicle: 'New Compactor',
			driver: 'Bernie Songalia',
			driverType: 'JO',
			routes: [
				{
					day: 'Monday',
					collectors: 'Rudy Catindoy',
					status: 'Job Order',
					area: 'Real Highway, Kiling Highway, Salvador Highway'
				},
				{
					day: 'Tuesday',
					collectors: 'Rico Flores',
					status: 'Job Order',
					area: 'Real Highway, San Roque Highway, Sto. Niño Highway'
				},
				{
					day: 'Wednesday',
					collectors: 'Alejandro Maca',
					status: 'Casual',
					area: 'Real Highway, Cabuynan Highway, Bislig Highway, Magay Highway, Bulangan'
				},
				{
					day: 'Thursday',
					collectors: 'Ariel Obalan',
					status: 'Job Order',
					area: 'Real Highway, San Miguel Highway, Calogcog Highway, Mohon Highway, Solano Highway'
				},
				{
					day: 'Friday',
					collectors: 'Collection Team',
					status: 'Job Order',
					area: 'Real Highway, Pago Highway, Maribi Highway, Malaguicay'
				}
			]
		},
		{
			id: 'foton-l1d916',
			vehicle: 'New Foton Mini Dump Truck (L1D916)',
			driver: 'Glicerio Roa',
			driverType: 'Regular',
			routes: [
				{
					day: 'Monday',
					collectors: 'Carlito M. Olimberio, Jr.',
					status: 'Job Order',
					area: 'San Roque - Burgos St., San Roque - Brgy. Hall'
				},
				{
					day: 'Tuesday',
					collectors: 'Mark Abalos',
					status: 'Job Order',
					area: 'Bislig (Sulod), San Roque Zone 2, San Roque Zone 4'
				},
				{
					day: 'Wednesday',
					collectors: 'Johnrey Cinco',
					status: 'Job Order',
					area: 'Buntay, RHU Infirmary, E.Ramos (Canramos)'
				},
				{
					day: 'Thursday',
					collectors: 'Emannuel Cinco',
					status: 'Job Order',
					area: 'Lapay, Tugop, Pasil, Binolo, Talolora'
				},
				{
					day: 'Friday',
					collectors: 'Collection Team',
					status: 'Job Order',
					area: 'Canramos, Canramos Sta. Isabel'
				}
			]
		},
		{
			id: 'foton-l1d914',
			vehicle: 'New Foton Mini Dump Truck (L1D914)',
			driver: 'Sammy Roa',
			driverType: 'JO',
			routes: [
				{
					day: 'Monday',
					collectors: 'Peter Corales',
					status: 'Regular',
					area: 'Catigbian, Binongtoan, Hilagpad, Maghulod, Bantagan, Guinguan (Sulod)'
				},
				{
					day: 'Tuesday',
					collectors: 'Antonio De Paz',
					status: 'Job Order',
					area: 'Sta. Cruz, Limbuhan Daku, Don Guillermo St. (Canramos)'
				},
				{
					day: 'Wednesday',
					collectors: 'Joevinaldo Tuscano',
					status: 'Job Order',
					area: 'Sta. Elena, San Isidro, Malaguicay (Sulod)'
				},
				{
					day: 'Thursday',
					collectors: 'Jeffrey Salazar',
					status: 'Casual',
					area: 'Picas, Canbalisara, Ada, Cabungaan, Limbuhan Guti, San Victor (Sulod)'
				},
				{
					day: 'Friday',
					collectors: 'Collection Team',
					status: 'Job Order',
					area: 'Camire, Naliwatan - Atipolo, Mohon (Sulod)'
				}
			]
		},
		{
			id: 'compactor-u3z435',
			vehicle: 'Compactor U3Z435',
			driver: 'Paulo Songalia',
			driverType: 'JO',
			routes: [
				{
					day: 'Monday',
					collectors: 'Arnel Abas, Ephraim Moreto',
					status: 'Regular / JO',
					area: 'Market'
				},
				{
					day: 'Tuesday',
					collectors: 'Arnel Abas, Ephraim Moreto',
					status: 'Regular / JO',
					area: 'Market'
				},
				{
					day: 'Wednesday',
					collectors: 'Arnel Abas, Ephraim Moreto',
					status: 'Regular / JO',
					area: 'Market'
				},
				{
					day: 'Thursday',
					collectors: 'Arnel Abas, Ephraim Moreto',
					status: 'Regular / JO',
					area: 'Market'
				},
				{
					day: 'Friday',
					collectors: 'Arnel Abas, Ephraim Moreto',
					status: 'Regular / JO',
					area: 'Market'
				}
			]
		}
	];

	// Filtered Flat Routes
	const flatRoutes = $derived(
		scheduleData.flatMap((v) =>
			v.routes.map((r) => ({
				vehicle: v.vehicle,
				driver: `${v.driver} (${v.driverType})`,
				collectors: r.collectors,
				status: r.status,
				day: r.day,
				area: r.area
			}))
		)
	);

	const filteredRoutes = $derived(
		flatRoutes.filter((r) => {
			const matchesDay = selectedDay === 'All' || r.day === selectedDay;
			const query = searchQuery.trim().toLowerCase();
			if (!query) return matchesDay;
			const matchesSearch =
				r.area.toLowerCase().includes(query) ||
				r.vehicle.toLowerCase().includes(query) ||
				r.driver.toLowerCase().includes(query) ||
				r.collectors.toLowerCase().includes(query) ||
				r.day.toLowerCase().includes(query);
			return matchesDay && matchesSearch;
		})
	);
</script>

<section id="collection-schedule" class="relative border-b-2 border-slate-200 bg-slate-50/70 py-20">
	<div class="container mx-auto max-w-7xl px-6">
		<!-- Section Header -->
		<div class="mb-10 max-w-3xl">
			<div
				class="mb-3 inline-flex items-center gap-2 rounded-md border border-amber-300 bg-amber-100 px-3.5 py-1 text-xs font-black tracking-wider text-amber-950 uppercase"
			>
				<span class="h-2 w-2 rounded-full bg-amber-600"></span>
				SCHEDULE // MUNICIPAL WASTE COLLECTION (WEEKDAYS)
			</div>
			<h2 class="text-3xl leading-tight font-black tracking-tight text-blue-950 sm:text-4xl lg:text-5xl">
				Waste Collection Schedule
			</h2>
			<p class="mt-4 text-base leading-relaxed font-normal text-slate-800 sm:text-lg">
				Official municipal garbage collection routes, designated compactor trucks, dump vehicles, drivers, and assigned collection crews serving Tanauan's 54 barangays from Monday to Friday pursuant to RA 9003 and Municipal Ordinance No. 2024-20.
			</p>
		</div>

		<!-- Quick Highlights Banner (Royal Blue & Amber Yellow) -->
		<div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-400">
				<div class="flex items-center justify-between">
					<span class="text-xs font-black uppercase tracking-wider text-blue-900">Fleet Deployment</span>
					<span class="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-950 text-amber-300 text-sm font-black">
						🚛
					</span>
				</div>
				<div class="mt-2 text-2xl font-black text-blue-950">5 Vehicles</div>
				<div class="mt-1 text-xs text-slate-600">Compact Trucks & Dumpers</div>
			</div>

			<div class="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-400">
				<div class="flex items-center justify-between">
					<span class="text-xs font-black uppercase tracking-wider text-amber-800">Operational Days</span>
					<span class="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400 text-blue-950 text-sm font-black">
						📅
					</span>
				</div>
				<div class="mt-2 text-2xl font-black text-blue-950">Monday – Friday</div>
				<div class="mt-1 text-xs text-slate-600">Regular weekday operations</div>
			</div>

			<div class="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-400">
				<div class="flex items-center justify-between">
					<span class="text-xs font-black uppercase tracking-wider text-blue-900">Public Market</span>
					<span class="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-950 text-amber-300 text-sm font-black">
						🏪
					</span>
				</div>
				<div class="mt-2 text-2xl font-black text-blue-950">Daily Collection</div>
				<div class="mt-1 text-xs text-slate-600">Compactor U3Z435 assigned</div>
			</div>

			<div class="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-400">
				<div class="flex items-center justify-between">
					<span class="text-xs font-black uppercase tracking-wider text-amber-800">Territory Coverage</span>
					<span class="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400 text-blue-950 text-sm font-black">
						📍
					</span>
				</div>
				<div class="mt-2 text-2xl font-black text-blue-950">54 Barangays</div>
				<div class="mt-1 text-xs text-slate-600">Poblacion, Highways & Sulod</div>
			</div>
		</div>

		<!-- Interactive Filter & Search Controls Bar -->
		<div class="mb-8 rounded-3xl border-2 border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
			<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
				<!-- Search Bar -->
				<div class="relative flex-1">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
						🔍
					</div>
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search your barangay, street, driver, or vehicle (e.g., Canramos, Burgos, Catigbian, Market)..."
						class="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium text-slate-900 transition focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/20"
					/>
					{#if searchQuery}
						<button
							type="button"
							onclick={() => (searchQuery = '')}
							class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold text-slate-400 hover:text-slate-700"
						>
							Clear ✕
						</button>
					{/if}
				</div>

				<!-- Day Filter Tabs -->
				<div class="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
					{#each days as day}
						<button
							type="button"
							onclick={() => (selectedDay = day)}
							class="rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200 {selectedDay === day ? 'bg-blue-950 text-amber-300 shadow-md scale-105' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
						>
							{day}
						</button>
					{/each}
				</div>

				<!-- View Mode Toggle -->
				<div class="flex items-center gap-1 self-end lg:self-center border border-slate-200 rounded-xl p-1 bg-slate-100">
					<button
						type="button"
						onclick={() => (viewMode = 'matrix')}
						class="rounded-lg px-3 py-1.5 text-xs font-black transition {viewMode === 'matrix' ? 'bg-blue-950 text-amber-300 shadow-sm' : 'text-slate-600 hover:text-slate-950'}"
					>
						📋 Table View
					</button>
					<button
						type="button"
						onclick={() => (viewMode = 'cards')}
						class="rounded-lg px-3 py-1.5 text-xs font-black transition {viewMode === 'cards' ? 'bg-blue-950 text-amber-300 shadow-sm' : 'text-slate-600 hover:text-slate-950'}"
					>
						🗂️ Cards View
					</button>
				</div>
			</div>

			<!-- Search Results Count Notice -->
			{#if searchQuery}
				<div class="mt-3 flex items-center justify-between text-xs font-bold text-slate-600 border-t border-slate-100 pt-3">
					<span>
						Found <strong class="text-blue-950">{filteredRoutes.length}</strong> matching collection route{filteredRoutes.length === 1 ? '' : 's'} for "<span class="text-amber-700">{searchQuery}</span>"
					</span>
					<button type="button" onclick={() => (searchQuery = '')} class="text-blue-900 underline hover:text-amber-600">
						Reset search
					</button>
				</div>
			{/if}
		</div>

		<!-- Content: Table View (Matching Exact Document Layout) -->
		{#if viewMode === 'matrix'}
			<div class="overflow-hidden rounded-3xl border-2 border-slate-300 bg-white shadow-md">
				<!-- Official Table Header Banner -->
				<div class="border-b-2 border-blue-950 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 px-6 py-4 text-white">
					<div class="flex flex-wrap items-center justify-between gap-2">
						<div class="flex items-center gap-2.5">
							<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-blue-950 font-black text-sm">
								📋
							</span>
							<div>
								<div class="text-[10px] font-mono font-black tracking-widest text-amber-400 uppercase">
									MUNICIPAL ENVIRONMENT & NATURAL RESOURCES OFFICE (MENRO)
								</div>
								<h3 class="text-base sm:text-lg font-black tracking-tight text-white uppercase">
									Schedule for Waste Collection (Weekdays)
								</h3>
							</div>
						</div>
						<span class="rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-blue-950 uppercase tracking-wide">
							Official SWM Roster
						</span>
					</div>
				</div>

				<div class="overflow-x-auto">
					<table class="w-full border-collapse text-left text-xs sm:text-sm">
						<thead>
							<tr class="border-b-2 border-blue-900 bg-blue-950 text-white text-[11px] font-black uppercase tracking-wider">
								<th class="border-r border-blue-900/60 p-3.5 sm:p-4 text-center">Vehicle</th>
								<th class="border-r border-blue-900/60 p-3.5 sm:p-4 text-center">Driver</th>
								<th class="border-r border-blue-900/60 p-3.5 sm:p-4">Collectors</th>
								<th class="border-r border-blue-900/60 p-3.5 sm:p-4 text-center">Status of Appointment</th>
								<th class="border-r border-blue-900/60 p-3.5 sm:p-4 text-center">Day</th>
								<th class="p-3.5 sm:p-4">Area Coverage</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-200 text-slate-800 font-medium">
							{#if filteredRoutes.length === 0}
								<tr>
									<td colspan="6" class="p-12 text-center text-slate-500">
										<div class="text-3xl mb-2">🔍</div>
										<p class="font-bold text-slate-700">No collection routes match your query.</p>
										<p class="text-xs text-slate-500 mt-1">Try searching for a different barangay name or select "All Days".</p>
									</td>
								</tr>
							{:else}
								{#each filteredRoutes as route, idx}
									<tr class="transition hover:bg-amber-50/50 {idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}">
										<td class="border-r border-slate-200 p-3 sm:p-4 font-black text-blue-950">
											<div class="flex items-center gap-2">
												<span class="h-2 w-2 rounded-full bg-amber-500"></span>
												<span>{route.vehicle}</span>
											</div>
										</td>
										<td class="border-r border-slate-200 p-3 sm:p-4 text-center font-bold text-slate-900 whitespace-nowrap">
											{route.driver}
										</td>
										<td class="border-r border-slate-200 p-3 sm:p-4 font-semibold text-slate-900">
											{route.collectors}
										</td>
										<td class="border-r border-slate-200 p-3 sm:p-4 text-center">
											<span class="inline-block rounded-md border border-slate-300 bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-800">
												{route.status}
											</span>
										</td>
										<td class="border-r border-slate-200 p-3 sm:p-4 text-center font-black">
											<span
												class="inline-block rounded-lg px-2.5 py-1 text-xs font-black uppercase {route.day === 'Monday' ? 'bg-blue-100 text-blue-950 border border-blue-200' : route.day === 'Tuesday' ? 'bg-amber-100 text-amber-950 border border-amber-200' : route.day === 'Wednesday' ? 'bg-blue-100 text-blue-950 border border-blue-200' : route.day === 'Thursday' ? 'bg-amber-100 text-amber-950 border border-amber-200' : 'bg-indigo-100 text-indigo-950 border border-indigo-200'}"
											>
												{route.day}
											</span>
										</td>
										<td class="p-3 sm:p-4 text-slate-800 font-semibold leading-relaxed">
											{route.area}
										</td>
									</tr>
								{/each}
							{/if}
						</tbody>
					</table>
				</div>

				<!-- Table Footer Notice -->
				<div class="flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-slate-200 bg-slate-100 px-6 py-4 text-xs">
					<div class="flex items-center gap-2 font-bold text-slate-600">
						<span class="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
						<span>Compliant with Municipal Ordinance No. 2024-20 & RA 9003 Ecological Solid Waste Management Act</span>
					</div>
					<div class="font-bold text-blue-950">
						Tanauan MENRO Operations • Weekly Schedule
					</div>
				</div>
			</div>
		{:else}
			<!-- Content: Cards View (Grouped by Vehicle) -->
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each scheduleData as v}
					<div class="flex flex-col rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-400 hover:shadow-lg">
						<!-- Vehicle Header -->
						<div class="mb-4 border-b border-slate-100 pb-4">
							<div class="flex items-center justify-between gap-2">
								<span class="rounded-lg bg-blue-100 border border-blue-200 px-2.5 py-1 text-[11px] font-mono font-black text-blue-900 uppercase">
									Vehicle Assignment
								</span>
								<span class="rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-black text-amber-950 uppercase">
									Driver: {v.driverType}
								</span>
							</div>
							<h4 class="mt-2 text-lg font-black text-blue-950 leading-snug">{v.vehicle}</h4>
							<div class="mt-1 text-xs font-bold text-slate-600 flex items-center gap-1.5">
								<span>Driver:</span>
								<span class="text-blue-900 font-black">{v.driver}</span>
							</div>
						</div>

						<!-- Routes by Day -->
						<div class="flex-1 space-y-3">
							{#each v.routes as r}
								{#if selectedDay === 'All' || selectedDay === r.day}
									<div class="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 transition hover:bg-amber-50/50">
										<div class="flex items-center justify-between gap-2 mb-1.5">
											<span class="rounded px-2 py-0.5 text-[10px] font-black uppercase {r.day === 'Monday' || r.day === 'Wednesday' ? 'bg-blue-950 text-amber-300' : 'bg-amber-400 text-blue-950'}">
												{r.day}
											</span>
											<span class="text-[10px] font-bold text-slate-500">
												Collector: <strong class="text-slate-800">{r.collectors}</strong> ({r.status})
											</span>
										</div>
										<p class="text-xs leading-relaxed text-slate-800 font-semibold mt-1">
											{r.area}
										</p>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Citizen Advisory & Guideline Cards -->
		<div class="mt-10 grid gap-6 md:grid-cols-2">
			<div class="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-5 sm:p-6 shadow-sm">
				<div class="flex items-center gap-3 mb-2">
					<span class="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-blue-950 font-black text-lg">
						⚠️
					</span>
					<h4 class="text-base font-black text-amber-950">Mandatory Waste Segregation Protocol</h4>
				</div>
				<p class="text-xs sm:text-sm text-amber-950/90 leading-relaxed font-medium">
					Pursuant to <strong>RA 9003</strong> and <strong>Municipal Ordinance No. 2024-20</strong>, all households, commercial establishments, and institutions must segregate waste at source into <em>Biodegradable</em>, <em>Recyclable</em>, and <em>Residual</em> fractions before collection. Unsegregated garbage will <strong>not</strong> be collected.
				</p>
			</div>

			<div class="rounded-2xl border-2 border-blue-200 bg-blue-50/80 p-5 sm:p-6 shadow-sm">
				<div class="flex items-center gap-3 mb-2">
					<span class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-950 text-amber-300 font-black text-lg">
						⏰
					</span>
					<h4 class="text-base font-black text-blue-950">Collection Hours & Bin Set-Out Time</h4>
				</div>
				<p class="text-xs sm:text-sm text-blue-950/90 leading-relaxed font-medium">
					Please set out your designated waste containers along the specified highway or collection points by <strong>6:00 AM</strong> on your scheduled collection day. For special collection requests or bulk waste disposal inquiries, visit the <strong>MENRO Office</strong> at the Tanauan Town Hall Ground Floor.
				</p>
			</div>
		</div>
	</div>
</section>
