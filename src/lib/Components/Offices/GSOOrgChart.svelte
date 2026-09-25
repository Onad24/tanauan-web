<script>
	import { fade, fly, scale } from 'svelte/transition';

	// The official ratified documents
	const documentSheets = [
		{
			id: 'part1',
			title: 'Section 1: GSO Head & Office Staff (10)',
			subtitle: 'Eugenio C. Ramos, Jr. & 10 Office Administrative Personnel',
			image: '/GSO-OrgChart-Part1.png'
		},
		{
			id: 'part2',
			title: 'Section 2: Field Workers — Batch 1 (Items 1 – 21)',
			subtitle: 'Maintenance, Electricians, Carpenters & Utility Specialists',
			image: '/GSO-OrgChart-Part2.png'
		},
		{
			id: 'part3',
			title: 'Section 2: Field Workers — Batch 2 (Items 22 – 49)',
			subtitle: 'Logistics Drivers, Welders, Gardeners & Field Support Staff',
			image: '/GSO-OrgChart-Part3.png'
		}
	];

	// Full Roster of General Services Section
	const headPersonnel = {
		id: 'head-1',
		name: 'EUGENIO C. RAMOS, JR.',
		position: 'GSO Head / Operation Manager',
		status: 'Head',
		section: 'Executive Leadership',
		badge: 'Department Head'
	};

	const officeStaff = [
		{ id: 'os-1', name: 'SOYOSA, HONEYLINE B.', position: 'Clerical / Utility Worker', status: 'Permanent', section: 'Office Staff' },
		{ id: 'os-2', name: 'NARAJA, PAMELA', position: 'Book Binder', status: 'Permanent', section: 'Office Staff' },
		{ id: 'os-3', name: 'GLORY, ROGER', position: 'Logistics', status: 'Permanent', section: 'Office Staff' },
		{ id: 'os-4', name: 'CANDILA, AHRJEAN A.', position: 'Clerical Aide', status: 'Casual', section: 'Office Staff' },
		{ id: 'os-5', name: 'DUMA, PEDRO C.', position: 'Clerical Aide', status: 'Casual', section: 'Office Staff' },
		{ id: 'os-6', name: 'AVILA, AIZA', position: 'Clerical Aide', status: 'Job Order', section: 'Office Staff' },
		{ id: 'os-7', name: 'BAÑARES, REMILYN', position: 'Clerical Aide', status: 'Job Order', section: 'Office Staff' },
		{ id: 'os-8', name: 'GOBENCIONG, GINNA', position: 'Clerical Aide', status: 'Job Order', section: 'Office Staff' },
		{ id: 'os-9', name: 'LUMBRE, ASUNCION', position: 'Clerical Aide', status: 'Job Order', section: 'Office Staff' },
		{ id: 'os-10', name: 'TIZON, LORETO', position: 'Clerical Aide', status: 'Job Order', section: 'Office Staff' }
	];

	const fieldWorkers = [
		{ id: 'fw-1', name: 'ARCENA, ROSIE C.', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers' },
		{ id: 'fw-2', name: 'BADRINA, DARYL', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers' },
		{ id: 'fw-3', name: 'CADION, RAYLE M.', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers' },
		{ id: 'fw-4', name: 'DANDAN, GERALDINE', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers' },
		{ id: 'fw-5', name: 'ECHAQUE, CHRISTAL', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers' },
		{ id: 'fw-6', name: 'GAUSIN, LORDELIZA A.', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers' },
		{ id: 'fw-7', name: 'MARCHADESCH, JESUSITO', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers' },
		{ id: 'fw-8', name: 'MARIANO, MAY D.', position: 'Utility Worker', status: 'Permanent', section: 'Field Workers' },
		{ id: 'fw-9', name: 'ODULLADA, ADAMSON', position: 'Park Attendant', status: 'Permanent', section: 'Field Workers' },
		{ id: 'fw-10', name: 'REPASA, RANEL', position: 'Carpenter', status: 'Permanent', section: 'Field Workers' },
		{ id: 'fw-11', name: 'SONGALIA, ROLANDO', position: 'Electrician', status: 'Permanent', section: 'Field Workers' },
		{ id: 'fw-12', name: 'REDOÑA, PAUL', position: 'Assistant Electrician', status: 'Casual', section: 'Field Workers' },
		{ id: 'fw-13', name: 'DULAY, ELEUTERIO P.', position: 'Utility Worker', status: 'Casual', section: 'Field Workers' },
		{ id: 'fw-14', name: 'ABAÑO, RAYMOND', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-15', name: 'ABARIENTOS, ALLAN', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-16', name: 'ALICANDO, JAYRIC', position: 'Assistant Electrician', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-17', name: 'ALICER, JUNJIE', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-18', name: 'BADEO, DOMINIC', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-19', name: 'BADEO, ROMMEL', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-20', name: 'BETE, JEFFREY', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-21', name: 'CATUDIO, MARJOY', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-22', name: 'CORALES, JOEY', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-23', name: 'CUMPIO, ROGELIO', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-24', name: 'CUMPIO, ZOSIMA', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-25', name: 'DALAGAN, DENNIS', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-26', name: 'DAYA-ON, DENNIS', position: 'Driver', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-27', name: 'DAYA-ON, MELODY', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-28', name: 'DE VEYRA, SIONY', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-29', name: 'DURANA, LARRY', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-30', name: 'ELONA, JANETH', position: 'Clerical Aide', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-31', name: 'GARCIA, JERRY', position: 'Gardener', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-32', name: 'HABABAG, JOEL', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-33', name: 'HUBAHIB, ANTHONY', position: 'Welder', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-34', name: 'MERCADO, ALEX', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-35', name: 'NARAJA, REGGIE BOY', position: 'Assistant Electrician', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-36', name: 'NERJA, ALFONSO', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-37', name: 'OLIMBERIO, CARLOS MIGUEL', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-38', name: 'PALO, FELIX', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-39', name: 'PARUNGAO, MEL IVAN', position: 'Driver', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-40', name: 'PARUNGAO, MELJOHN', position: 'Clerical Aide', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-41', name: 'RAZ, ROSELL', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-42', name: 'REBANO, ROQUE', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-43', name: 'REDOÑA, RECHARD', position: 'Driver', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-44', name: 'ROYERAS, ALJHON', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-45', name: 'SANTOS, SALES', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-46', name: 'SOLEDAD, RYAN', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-47', name: 'SOYOSA, MANNIX', position: 'Assistant Electrician', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-48', name: 'TOLIBAS, BYRON', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' },
		{ id: 'fw-49', name: 'VILLAMOR, CONCORDIO', position: 'Utility Worker', status: 'Job Order', section: 'Field Workers' }
	];

	const allPersonnel = [headPersonnel, ...officeStaff, ...fieldWorkers];

	// Component State
	let mainViewMode = $state('organogram'); // 'organogram' | 'documents'
	let activeSheetIndex = $state(0);
	let selectedSectionFilter = $state('all'); // 'all' | 'Office Staff' | 'Field Workers'
	let selectedStatusFilter = $state('all'); // 'all' | 'Permanent' | 'Casual' | 'Job Order'
	let searchQuery = $state('');
	let zoomedImageModal = $state(null);
	let selectedPersonnelModal = $state(null);

	// Filtering logic
	const filteredPersonnel = $derived(
		allPersonnel.filter((person) => {
			if (selectedSectionFilter !== 'all' && person.section !== selectedSectionFilter && person.status !== 'Head') {
				return false;
			}
			if (selectedStatusFilter !== 'all' && person.status !== selectedStatusFilter && person.status !== 'Head') {
				return false;
			}
			if (searchQuery.trim() !== '') {
				const q = searchQuery.toLowerCase().trim();
				const matchName = person.name.toLowerCase().includes(q);
				const matchPos = person.position.toLowerCase().includes(q);
				const matchStat = person.status.toLowerCase().includes(q);
				return matchName || matchPos || matchStat;
			}
			return true;
		})
	);

	function openZoomModal(imgSrc) {
		zoomedImageModal = imgSrc;
	}

	function closeZoomModal() {
		zoomedImageModal = null;
	}

	function openPersonnelModal(p) {
		selectedPersonnelModal = p;
	}

	function closePersonnelModal() {
		selectedPersonnelModal = null;
	}

	function getStatusBadgeClass(status) {
		if (status === 'Head') {
			return 'bg-amber-400 text-blue-950 border-amber-500 font-black';
		}
		if (status === 'Permanent') {
			return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
		}
		if (status === 'Casual') {
			return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
		}
		return 'bg-sky-100 text-sky-900 border-sky-300 font-bold';
	}
</script>

<svelte:window onkeydown={(e) => {
	if (e.key === 'Escape') {
		if (zoomedImageModal) closeZoomModal();
		if (selectedPersonnelModal) closePersonnelModal();
	}
}} />

<div class="w-full space-y-8">
	<!-- Top Interactive Header Banner -->
	<div
		class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 p-6 sm:p-8 text-white shadow-xl border-2 border-blue-900"
	>
		<!-- Background decorative glowing aura -->
		<div class="pointer-events-none absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-amber-400/10 blur-3xl"></div>
		<div class="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>

		<div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
			<div class="flex items-center gap-4">
				<div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 p-2 border border-white/20 backdrop-blur-md shadow-md">
					<img src="/tanauan logo.svg" alt="Tanauan Seal" class="h-full w-full object-contain" />
				</div>
				<div>
					<div class="flex items-center gap-2 mb-1">
						<span class="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-0.5 text-[10px] font-black tracking-wider text-blue-950 uppercase shadow-2xs">
							<span class="h-1.5 w-1.5 rounded-full bg-blue-950 animate-pulse"></span>
							CSC-RATIFIED HIERARCHY
						</span>
						<span class="text-xs font-semibold text-slate-300">LGU Tanauan, Leyte</span>
					</div>
					<h2 class="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
						General Services Section
					</h2>
					<p class="text-xs sm:text-sm font-semibold text-amber-300 tracking-wider uppercase mt-0.5">
						Official Organizational Chart & Personnel Directory
					</p>
				</div>
			</div>

			<!-- Quick Metric Badges -->
			<div class="flex flex-wrap items-center gap-2.5">
				<div class="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-sm text-center">
					<div class="text-[10px] font-extrabold uppercase tracking-wider text-slate-300">Office Staff</div>
					<div class="text-lg font-black text-amber-300">10</div>
				</div>
				<div class="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-sm text-center">
					<div class="text-[10px] font-extrabold uppercase tracking-wider text-slate-300">Field Personnel</div>
					<div class="text-lg font-black text-emerald-400">49</div>
				</div>
				<div class="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-sm text-center">
					<div class="text-[10px] font-extrabold uppercase tracking-wider text-slate-300">Total Workforce</div>
					<div class="text-lg font-black text-white">60</div>
				</div>
			</div>
		</div>

		<!-- View Switcher Tabs -->
		<div class="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
			<div class="inline-flex rounded-2xl bg-white/10 p-1 border border-white/20 backdrop-blur-md">
				<button
					type="button"
					onclick={() => (mainViewMode = 'organogram')}
					class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all {mainViewMode === 'organogram'
						? 'bg-amber-400 text-blue-950 shadow-md scale-102'
						: 'text-white/80 hover:text-white hover:bg-white/10'}"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
					</svg>
					<span>Interactive Organogram Tree</span>
				</button>
				<button
					type="button"
					onclick={() => (mainViewMode = 'documents')}
					class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all {mainViewMode === 'documents'
						? 'bg-amber-400 text-blue-950 shadow-md scale-102'
						: 'text-white/80 hover:text-white hover:bg-white/10'}"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<span>Official Ratified Documents (3 Parts)</span>
				</button>
			</div>

			<span class="text-xs font-semibold text-slate-300">
				{mainViewMode === 'organogram' ? 'Showing visual tree & searchable roster' : 'Showing scanned civil service approved charts'}
			</span>
		</div>
	</div>

	<!-- ========================================================================= -->
	<!-- MODE 1: INTERACTIVE ORGANOGRAM TREE & SEARCHABLE ROSTER                  -->
	<!-- ========================================================================= -->
	{#if mainViewMode === 'organogram'}
		<div class="space-y-10" transition:fade={{ duration: 180 }}>
			<!-- Tree Visual Level: Top Leader Node -->
			<div class="flex flex-col items-center">
				<div class="text-center mb-4">
					<span class="text-[11px] font-black uppercase tracking-widest text-amber-700 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
						DEPARTMENT HEAD
					</span>
				</div>

				<!-- Head Leader Card -->
				<div
					role="button"
					tabindex="0"
					onclick={() => openPersonnelModal(headPersonnel)}
					onkeydown={(e) => e.key === 'Enter' && openPersonnelModal(headPersonnel)}
					class="group relative w-full max-w-md cursor-pointer rounded-3xl border-3 border-amber-400 bg-gradient-to-br from-white via-amber-50/40 to-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-900 text-center"
				>
					<div class="flex flex-col items-center">
						<!-- Leader Avatar -->
						<div class="relative mb-3">
							<div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-950 text-white font-black text-2xl shadow-md border-2 border-amber-400">
								ECR
							</div>
							<span class="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white" title="Active Head of Office"></span>
						</div>

						<h3 class="text-xl font-black text-blue-950 group-hover:text-blue-900 transition-colors">
							EUGENIO C. RAMOS, JR.
						</h3>
						<div class="mt-1 text-xs font-extrabold text-amber-700 tracking-wide uppercase">
							GSO Head / Operation Manager
						</div>
						<div class="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-0.5 text-[10px] font-black text-blue-950 uppercase shadow-2xs">
							<span>Official Department Head</span>
						</div>
					</div>

					<div class="mt-4 pt-3 border-t border-amber-200/80 text-[11px] font-bold text-slate-500 group-hover:text-blue-900">
						Click to inspect supervisory role ↗
					</div>
				</div>

				<!-- Connecting Central Stem Line -->
				<div class="w-1 h-10 bg-blue-900"></div>

				<!-- Two-Way Distribution Line -->
				<div class="hidden sm:block w-full max-w-3xl h-1 bg-blue-900 relative">
					<!-- Left drop to Office Staff -->
					<div class="absolute left-1/4 -top-0 w-1 h-8 bg-blue-900"></div>
					<!-- Right drop to Field Workers -->
					<div class="absolute right-1/4 -top-0 w-1 h-8 bg-blue-900"></div>
				</div>

				<!-- Two Main Branches Banner -->
				<div class="mt-4 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
					<!-- Section 1 Branch Card -->
					<div
						class="rounded-2xl border-2 {selectedSectionFilter === 'Office Staff' ? 'border-amber-500 bg-amber-50/70 shadow-md' : 'border-blue-900/30 bg-blue-50/40'} p-5 text-center transition-all hover:border-amber-500 cursor-pointer"
						role="button"
						tabindex="0"
						onclick={() => (selectedSectionFilter = selectedSectionFilter === 'Office Staff' ? 'all' : 'Office Staff')}
						onkeydown={(e) => e.key === 'Enter' && (selectedSectionFilter = selectedSectionFilter === 'Office Staff' ? 'all' : 'Office Staff')}
					>
						<span class="text-[10px] font-black uppercase tracking-wider text-blue-900 block mb-1">
							SECTION 01
						</span>
						<h4 class="text-lg font-black text-blue-950">OFFICE STAFF</h4>
						<p class="text-xs font-bold text-slate-600 mt-1">10 Dedicated Administrative Specialists</p>
						<span class="inline-block mt-3 rounded-full bg-blue-950 text-amber-300 px-3 py-0.5 text-xs font-black">
							{selectedSectionFilter === 'Office Staff' ? '✓ Filter Active' : 'Click to Filter'}
						</span>
					</div>

					<!-- Section 2 Branch Card -->
					<div
						class="rounded-2xl border-2 {selectedSectionFilter === 'Field Workers' ? 'border-emerald-500 bg-emerald-50/70 shadow-md' : 'border-blue-900/30 bg-emerald-50/30'} p-5 text-center transition-all hover:border-emerald-500 cursor-pointer"
						role="button"
						tabindex="0"
						onclick={() => (selectedSectionFilter = selectedSectionFilter === 'Field Workers' ? 'all' : 'Field Workers')}
						onkeydown={(e) => e.key === 'Enter' && (selectedSectionFilter = selectedSectionFilter === 'Field Workers' ? 'all' : 'Field Workers')}
					>
						<span class="text-[10px] font-black uppercase tracking-wider text-emerald-900 block mb-1">
							SECTION 02
						</span>
						<h4 class="text-lg font-black text-blue-950">FIELD WORKERS</h4>
						<p class="text-xs font-bold text-slate-600 mt-1">49 Utility, Technical & Logistics Staff</p>
						<span class="inline-block mt-3 rounded-full bg-blue-950 text-emerald-300 px-3 py-0.5 text-xs font-black">
							{selectedSectionFilter === 'Field Workers' ? '✓ Filter Active' : 'Click to Filter'}
						</span>
					</div>
				</div>
			</div>

			<!-- Filter Bar & Real-Time Search -->
			<div class="rounded-3xl border-2 border-slate-200 bg-slate-50 p-6 shadow-sm space-y-4">
				<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<!-- Search Input -->
					<div class="relative w-full md:max-w-md">
						<svg class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<input
							type="text"
							bind:value={searchQuery}
							placeholder="Search personnel by name or position (e.g. Electrician, Driver, Honeyline)..."
							class="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-900 placeholder-slate-400 shadow-2xs focus:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900"
						/>
						{#if searchQuery}
							<button
								type="button"
								onclick={() => (searchQuery = '')}
								class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-black"
							>
								✕
							</button>
						{/if}
					</div>

					<!-- Counter -->
					<div class="text-xs font-bold text-slate-600">
						Showing <span class="font-black text-blue-950">{filteredPersonnel.length}</span> of {allPersonnel.length} personnel
					</div>
				</div>

				<!-- Filter Chips -->
				<div class="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
					<span class="text-xs font-bold text-slate-500 uppercase mr-1">Section:</span>
					<button
						type="button"
						onclick={() => (selectedSectionFilter = 'all')}
						class="rounded-lg px-3 py-1 text-xs font-black transition-all {selectedSectionFilter === 'all'
							? 'bg-blue-950 text-white'
							: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}"
					>
						All Sections (60)
					</button>
					<button
						type="button"
						onclick={() => (selectedSectionFilter = 'Office Staff')}
						class="rounded-lg px-3 py-1 text-xs font-black transition-all {selectedSectionFilter === 'Office Staff'
							? 'bg-blue-950 text-white'
							: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}"
					>
						Office Staff (10)
					</button>
					<button
						type="button"
						onclick={() => (selectedSectionFilter = 'Field Workers')}
						class="rounded-lg px-3 py-1 text-xs font-black transition-all {selectedSectionFilter === 'Field Workers'
							? 'bg-blue-950 text-white'
							: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}"
					>
						Field Workers (49)
					</button>

					<div class="h-4 w-px bg-slate-300 mx-2 hidden sm:block"></div>

					<span class="text-xs font-bold text-slate-500 uppercase mr-1">Status:</span>
					<button
						type="button"
						onclick={() => (selectedStatusFilter = 'all')}
						class="rounded-lg px-3 py-1 text-xs font-black transition-all {selectedStatusFilter === 'all'
							? 'bg-blue-950 text-white'
							: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'}"
					>
						All Statuses
					</button>
					<button
						type="button"
						onclick={() => (selectedStatusFilter = 'Permanent')}
						class="rounded-lg px-3 py-1 text-xs font-black transition-all {selectedStatusFilter === 'Permanent'
							? 'bg-emerald-600 text-white'
							: 'bg-emerald-50 border border-emerald-300 text-emerald-900 hover:bg-emerald-100'}"
					>
						Permanent (14)
					</button>
					<button
						type="button"
						onclick={() => (selectedStatusFilter = 'Casual')}
						class="rounded-lg px-3 py-1 text-xs font-black transition-all {selectedStatusFilter === 'Casual'
							? 'bg-amber-500 text-blue-950'
							: 'bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100'}"
					>
						Casual (4)
					</button>
					<button
						type="button"
						onclick={() => (selectedStatusFilter = 'Job Order')}
						class="rounded-lg px-3 py-1 text-xs font-black transition-all {selectedStatusFilter === 'Job Order'
							? 'bg-sky-600 text-white'
							: 'bg-sky-50 border border-sky-300 text-sky-900 hover:bg-sky-100'}"
					>
						Job Order (42)
					</button>
				</div>
			</div>

			<!-- Personnel Cards Grid with Micro-Animations -->
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each filteredPersonnel as person, idx (person.id)}
					<div
						role="button"
						tabindex="0"
						onclick={() => openPersonnelModal(person)}
						onkeydown={(e) => e.key === 'Enter' && openPersonnelModal(person)}
						class="group flex flex-col justify-between rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-2xs transition-all duration-300 hover:border-blue-900 hover:shadow-lg hover:-translate-y-1 cursor-pointer text-left"
						in:scale={{ start: 0.95, duration: 150 }}
					>
						<div>
							<div class="flex items-center justify-between gap-2 mb-3">
								<span class="text-[10px] font-black uppercase tracking-wider text-slate-500">
									{person.section}
								</span>
								<span class="inline-block rounded-full border px-2.5 py-0.5 text-[10px] {getStatusBadgeClass(person.status)}">
									{person.status}
								</span>
							</div>

							<!-- Personnel Name & Role -->
							<h4 class="text-sm font-black text-blue-950 group-hover:text-blue-900 transition-colors leading-tight">
								{person.name}
							</h4>
							<p class="text-xs font-semibold text-slate-600 mt-1">
								{person.position}
							</p>
						</div>

						<div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-blue-900 font-bold">
							<span>Tanauan GSO</span>
							<span class="group-hover:translate-x-0.5 transition-transform text-amber-600">Details ↗</span>
						</div>
					</div>
				{/each}
			</div>
		</div>

	<!-- ========================================================================= -->
	<!-- MODE 2: RATIFIED DOCUMENTS (HIGH-RESOLUTION SCANNED SHEETS)              -->
	<!-- ========================================================================= -->
	{:else}
		<div class="space-y-6" transition:fade={{ duration: 180 }}>
			<!-- Sheet Selector Bar -->
			<div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
				<div class="flex flex-wrap gap-2">
					{#each documentSheets as sheet, sIdx}
						<button
							type="button"
							onclick={() => (activeSheetIndex = sIdx)}
							class="rounded-xl px-4 py-2 text-xs font-black transition-all {activeSheetIndex === sIdx
								? 'bg-blue-950 text-amber-300 shadow-md'
								: 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
						>
							Part {sIdx + 1}: {sheet.title.split(':')[1] || sheet.title}
						</button>
					{/each}
				</div>

				<div class="flex items-center gap-2">
					<a
						href={documentSheets[activeSheetIndex].image}
						download="GSO-OrgChart-{documentSheets[activeSheetIndex].id}.png"
						class="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
					>
						<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
						</svg>
						<span>Download Sheet</span>
					</a>
					<button
						type="button"
						onclick={() => openZoomModal(documentSheets[activeSheetIndex].image)}
						class="inline-flex items-center gap-1.5 rounded-xl bg-blue-950 px-4 py-1.5 text-xs font-black text-white hover:bg-blue-900 shadow-xs transition-all active:scale-95"
					>
						<span>[⛶ Fullscreen Zoom]</span>
					</button>
				</div>
			</div>

			<!-- Document Frame Container -->
			<div class="group relative overflow-hidden rounded-3xl border-2 border-slate-300 bg-slate-50 p-4 sm:p-6 shadow-md text-center">
				<div class="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left px-2">
					<div>
						<h3 class="text-lg font-black text-blue-950">{documentSheets[activeSheetIndex].title}</h3>
						<p class="text-xs font-semibold text-slate-500">{documentSheets[activeSheetIndex].subtitle}</p>
					</div>
					<span class="text-xs font-bold text-amber-700 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full self-start sm:self-auto">
						Official Document Scan
					</span>
				</div>

				<button
					type="button"
					onclick={() => openZoomModal(documentSheets[activeSheetIndex].image)}
					class="relative w-full cursor-zoom-in overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-inner p-2 sm:p-4 text-center"
					title="Click to view full size"
				>
					<img
						src={documentSheets[activeSheetIndex].image}
						alt={documentSheets[activeSheetIndex].title}
						class="h-auto max-h-[640px] w-full object-contain mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
					/>

					<!-- Click to Zoom Hint Overlay -->
					<div class="pointer-events-none absolute bottom-6 left-6 flex items-center gap-2 rounded-xl border border-slate-300 bg-white/95 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
						<span class="h-2 w-2 rounded-full bg-blue-900 animate-pulse"></span>
						<span class="text-xs font-black text-slate-800">
							Click image to open high-resolution zoom viewer
						</span>
					</div>
				</button>
			</div>
		</div>
	{/if}

	<!-- ========================================================================= -->
	<!-- MODAL 1: HIGH-RES DOCUMENT ZOOM VIEWER                                   -->
	<!-- ========================================================================= -->
	{#if zoomedImageModal}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md"
			transition:fade={{ duration: 180 }}
			role="dialog"
			aria-modal="true"
			onclick={(e) => {
				if (e.target === e.currentTarget) closeZoomModal();
			}}
		>
			<div
				class="relative flex flex-col w-full max-w-6xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-slate-200"
				in:scale={{ start: 0.94, duration: 200 }}
			>
				<div class="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shrink-0">
					<div class="flex items-center gap-3">
						<span class="h-3 w-3 rounded-full bg-amber-400"></span>
						<span class="text-xs font-black uppercase tracking-wider text-amber-400">
							Ratified Chart Viewer • GSO Tanauan
						</span>
					</div>
					<div class="flex items-center gap-3">
						<span class="text-[11px] font-semibold text-slate-400">ESC to close</span>
						<button
							type="button"
							onclick={closeZoomModal}
							class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-rose-600 hover:text-white transition-colors"
						>
							✕
						</button>
					</div>
				</div>

				<div class="overflow-auto p-4 sm:p-6 bg-slate-100 flex items-center justify-center">
					<img
						src={zoomedImageModal}
						alt="High-resolution organizational chart sheet"
						class="max-w-none w-full h-auto object-contain shadow-md rounded-xl"
					/>
				</div>

				<div class="flex items-center justify-between px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs font-semibold text-slate-600 shrink-0">
					<span>Use scroll wheel or pinch to zoom further</span>
					<button
						type="button"
						onclick={closeZoomModal}
						class="rounded-xl bg-blue-950 px-4 py-1.5 text-xs font-black text-white hover:bg-blue-900 transition-colors"
					>
						Close Viewer
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- ========================================================================= -->
	<!-- MODAL 2: PERSONNEL DETAILS MODAL                                         -->
	<!-- ========================================================================= -->
	{#if selectedPersonnelModal}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md"
			transition:fade={{ duration: 180 }}
			role="dialog"
			aria-modal="true"
			onclick={(e) => {
				if (e.target === e.currentTarget) closePersonnelModal();
			}}
		>
			<div
				class="relative flex flex-col w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden"
				in:scale={{ start: 0.94, duration: 200 }}
			>
				<div class="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shrink-0">
					<div class="flex items-center gap-2">
						<span class="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
						<span class="text-xs font-black uppercase tracking-wider text-amber-400">
							Personnel Record
						</span>
					</div>
					<button
						type="button"
						onclick={closePersonnelModal}
						class="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-rose-600 hover:text-white transition-colors"
					>
						✕
					</button>
				</div>

				<div class="p-6 sm:p-8 space-y-6">
					<div class="flex items-start gap-4">
						<div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-950 text-white font-black text-xl shadow-md border-2 border-amber-400">
							{selectedPersonnelModal.name.split(',')[0].slice(0, 2)}
						</div>
						<div>
							<span class="inline-block rounded-full border px-2.5 py-0.5 text-[10px] mb-1.5 {getStatusBadgeClass(selectedPersonnelModal.status)}">
								{selectedPersonnelModal.status}
							</span>
							<h3 class="text-xl font-black text-blue-950 leading-snug">
								{selectedPersonnelModal.name}
							</h3>
							<p class="text-xs font-bold text-amber-700 uppercase mt-0.5">
								{selectedPersonnelModal.position}
							</p>
						</div>
					</div>

					<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2.5 text-xs">
						<div class="flex items-center justify-between py-1 border-b border-slate-200">
							<span class="font-bold text-slate-500 uppercase">Division / Section:</span>
							<span class="font-black text-blue-950">{selectedPersonnelModal.section}</span>
						</div>
						<div class="flex items-center justify-between py-1 border-b border-slate-200">
							<span class="font-bold text-slate-500 uppercase">Employment Status:</span>
							<span class="font-black text-slate-900">{selectedPersonnelModal.status}</span>
						</div>
						<div class="flex items-center justify-between py-1">
							<span class="font-bold text-slate-500 uppercase">Department:</span>
							<span class="font-black text-blue-950">General Services Office (GSO)</span>
						</div>
					</div>
				</div>

				<div class="flex items-center justify-end px-6 py-4 bg-slate-50 border-t border-slate-200 shrink-0">
					<button
						type="button"
						onclick={closePersonnelModal}
						class="rounded-xl bg-blue-950 px-5 py-2 text-xs font-black text-white hover:bg-blue-900 transition-colors"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
