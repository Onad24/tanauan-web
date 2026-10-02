<script>
	import { fade, scale } from 'svelte/transition';

	// Two distinct accomplishment folders / dossiers for MDRRMO
	const folders = [
		{
			id: 'nsed-drill',
			folderCode: 'DOSSIER // MDRRMO-NSED-DRILL',
			title: 'Disaster Preparedness & Evacuation Drill',
			shortTitle: 'NSED Evacuation Drill',
			badge: 'Field Simulation',
			accentColor: 'from-amber-500 via-orange-600 to-red-600',
			tabBg: 'bg-amber-400 text-slate-950 border-amber-300',
			icon: '🚨',
			date: '3rd Quarter NSED',
			coverage: 'Municipal Hall & Plaza',
			description:
				'Official municipal staging of the Nationwide Simultaneous Earthquake Drill (NSED) across all municipal departments, inter-agency emergency units, and frontline offices in compliance with NDRRMC and OCD directives.',
			highlights: [
				'Standard Drop • Cover • Hold Protocol',
				'Municipal Building Rapid Egress',
				'Zero-Incident Mass Assembly at Plaza',
				'Headcount & Accountability Verification'
			],
			photos: [
				{
					id: 'orientation',
					code: 'DRILL-01',
					tag: 'Multimedia Orientation',
					src: '/images/accomplishments/mdrrmo/earthquake-drill/drill-1.png',
					title: 'Earthquake Orientation & Safety Protocol Briefing',
					shortDesc:
						'Official MDRRMO multimedia briefing session presenting standard "Drop, Cover, and Hold" directives and emergency evacuation rules.',
					description:
						'Official MDRRMO multimedia briefing session projecting the "Drop • Cover • Hold" standard emergency response protocols, evacuation rules, and safety guidelines for the 3rd Quarter Nationwide Simultaneous Earthquake Drill (NSED) at the Tanauan Municipal Hall. The orientation emphasizes calmness, situational awareness, and orderly evacuation toward designated safe zones.',
					badgeColor: 'bg-blue-600 text-white border-blue-500'
				},
				{
					id: 'evacuation-march',
					code: 'DRILL-02',
					tag: 'Evacuation Execution',
					src: '/images/accomplishments/mdrrmo/earthquake-drill/drill-2.jpg',
					title: 'Simulated Evacuation Walk: Drop, Cover, and Hold Stance',
					shortDesc:
						'Municipal leadership and personnel demonstrating the protective head-cover stance while swiftly exiting to open ground.',
					description:
						'Municipal executives, department heads, and municipal personnel demonstrating the protective head-cover stance while swiftly and methodically evacuating the municipal building toward safe open grounds. Participants simulate real-world earthquake response by protecting vulnerable head and neck areas during structural egress.',
					badgeColor: 'bg-amber-500 text-slate-950 border-amber-400'
				},
				{
					id: 'joint-force',
					code: 'DRILL-03',
					tag: 'Inter-Agency Task Force',
					src: '/images/accomplishments/mdrrmo/earthquake-drill/drill-3.jpg',
					title: 'Inter-Agency Joint Emergency & Rescue Task Force',
					shortDesc:
						'Tanauan MDRRMO Rescue Team, PNP, BFP, and Municipal Officials unified at the Municipal Hall lobby.',
					description:
						'Joint operational assembly at the Tanauan Municipal Hall lobby featuring the Tanauan MDRRMO Rescue Team in high-visibility orange-and-yellow uniforms, Philippine National Police (PNP) personnel, Bureau of Fire Protection (BFP) officers, and municipal leadership. The joint team underscores multi-agency coordination during disaster preparedness operations.',
					badgeColor: 'bg-red-600 text-white border-red-500'
				},
				{
					id: 'plaza-assembly',
					code: 'DRILL-04',
					tag: 'Open Grounds Assembly',
					src: '/images/accomplishments/mdrrmo/earthquake-drill/drill-4.jpg',
					title: 'Mass Assembly & Defensive Grid Formation at Municipal Plaza',
					shortDesc:
						'Municipal staff gathered in organized duck-and-cover clusters across the Tanauan Municipal Plaza.',
					description:
						'Wide aerial-view capture of municipal employees gathered in organized defensive crouch formations across the designated earthquake evacuation area at the Tanauan Municipal Plaza. The operation is closely monitored by MDRRMO safety marshals, rescue personnel, and emergency responders ensuring 100% headcount accountability.',
					badgeColor: 'bg-emerald-600 text-white border-emerald-500'
				},
				{
					id: 'frontline-units',
					code: 'DRILL-05',
					tag: 'Frontline Healthcare',
					src: '/images/accomplishments/mdrrmo/earthquake-drill/drill-5.jpg',
					title: 'Municipal Health & Frontline Units Evacuation Execution',
					shortDesc:
						'Municipal Health Office (MHO) personnel and frontline teams demonstrating disciplined evacuation protocols.',
					description:
						'Healthcare personnel from the Municipal Health Office (MHO) and public service departments executing the standardized hands-over-head safety evacuation technique during the simulated seismic tremor exercise. Frontline responders practice simultaneous self-preservation and rapid readiness to administer emergency first aid.',
					badgeColor: 'bg-purple-600 text-white border-purple-500'
				}
			]
		},
		{
			id: 'coordination-meeting',
			folderCode: 'DOSSIER // MDRRMO-NSED-MEETING',
			title: 'Coordination Meeting for the 3rd Quarter National Simultaneous Earthquake Drill',
			shortTitle: 'Coordination Meeting',
			badge: 'Command Planning',
			accentColor: 'from-blue-600 via-indigo-700 to-slate-900',
			tabBg: 'bg-blue-600 text-white border-blue-400',
			icon: '📋',
			date: 'Pre-Drill Strategic Briefing',
			coverage: 'MDRRMO Operations Center',
			description:
				'Multi-agency command and planning session held at the Tanauan MDRRMO Operations Center with the Philippine National Police (PNP Tanauan) and Bureau of Fire Protection (BFP Tanauan) to synchronize evacuation staging, communication frequencies, personnel deployment, and emergency medical triage protocols.',
			highlights: [
				'MDRRMO Operations Center Briefing',
				'PNP & BFP Command Synchronization',
				'Evacuation Route & Sector Assignment',
				'EOC Emergency Communications Plan'
			],
			photos: [
				{
					id: 'meeting-tabletop',
					code: 'MEET-01',
					tag: 'EOC Operations Center',
					src: '/images/accomplishments/mdrrmo/coordination-meeting/meeting-1.jpg',
					title: 'Multi-Agency Tabletop Planning & Operational Alignment',
					shortDesc:
						'MDRRMO officers, PNP personnel, and BFP representatives convened around the conference table aligning operational checklists.',
					description:
						'MDRRMO officers, PNP personnel, and BFP representatives convened around the conference table at the Tanauan MDRRMO Operations Center, aligning operational checklists, safety guidelines, and dispatch responsibilities in front of the official NSED command monitor. Key topics included evacuation sequencing and security perimeter controls.',
					badgeColor: 'bg-blue-600 text-white border-blue-500'
				},
				{
					id: 'meeting-review',
					code: 'MEET-02',
					tag: 'Command Protocol Review',
					src: '/images/accomplishments/mdrrmo/coordination-meeting/meeting-2.jpg',
					title: 'Strategic Command Review & Safety Protocol Briefing',
					shortDesc:
						'Comprehensive inter-agency coordination meeting evaluating evacuation routes, assembly logistics, and medical triage.',
					description:
						'Comprehensive inter-agency coordination meeting evaluating evacuation routes from the Tanauan Municipal Hall, assembly point logistics at the plaza, and medical triage station assignments prior to the execution of the 3rd Quarter Nationwide Simultaneous Earthquake Drill.',
					badgeColor: 'bg-indigo-600 text-white border-indigo-500'
				}
			]
		}
	];

	// Active folder on page
	let selectedFolderId = $state('nsed-drill');
	const currentFolder = $derived(
		folders.find((f) => f.id === selectedFolderId) ?? folders[0]
	);

	// Lightbox / Modal State
	let isModalOpen = $state(false);
	let modalFolderId = $state('nsed-drill');
	let activePhotoIndex = $state(0);
	let isFullscreen = $state(false);

	const modalFolder = $derived(
		folders.find((f) => f.id === modalFolderId) ?? folders[0]
	);
	const activePhoto = $derived(
		modalFolder.photos[activePhotoIndex] ?? modalFolder.photos[0]
	);

	function openModal(folderId, photoIndex = 0) {
		modalFolderId = folderId;
		activePhotoIndex = photoIndex;
		isModalOpen = true;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeModal() {
		isModalOpen = false;
		isFullscreen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function switchModalFolder(folderId) {
		modalFolderId = folderId;
		activePhotoIndex = 0;
	}

	function nextPhoto() {
		activePhotoIndex = (activePhotoIndex + 1) % modalFolder.photos.length;
	}

	function prevPhoto() {
		activePhotoIndex =
			(activePhotoIndex - 1 + modalFolder.photos.length) % modalFolder.photos.length;
	}

	function toggleFullscreen() {
		isFullscreen = !isFullscreen;
	}

	function handleKeydown(e) {
		if (!isModalOpen) return;
		if (e.key === 'Escape') {
			if (isFullscreen) {
				isFullscreen = false;
			} else {
				closeModal();
			}
		} else if (e.key === 'ArrowRight') {
			nextPhoto();
		} else if (e.key === 'ArrowLeft') {
			prevPhoto();
		}
	}
	let copiedNumber = $state('');

	async function copyToClipboard(text, label) {
		try {
			await navigator.clipboard.writeText(text);
			copiedNumber = label;
			setTimeout(() => {
				if (copiedNumber === label) copiedNumber = '';
			}, 2500);
		} catch (err) {
			console.error('Failed to copy', err);
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="space-y-10">
	<!-- Official MDRRMO Emergency Communications & Hotlines Placard (Matching Official Tanauan Rescue Poster) -->
	<div class="relative overflow-hidden rounded-3xl border-2 border-amber-400 bg-white shadow-xl">
		<!-- Top Navy & Gold Header -->
		<div
			class="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 px-6 py-4 text-white flex flex-wrap items-center justify-between gap-3 border-b-2 border-amber-400"
		>
			<div class="flex items-center gap-3.5">
				<div
					class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 text-xl font-black shadow-md"
				>
					🚨
				</div>
				<div>
					<span class="text-[10px] font-mono font-black tracking-widest text-amber-400 uppercase">
						MUNICIPALITY OF TANAUAN, LEYTE • RESCUE TANAUAN EOC
					</span>
					<h3 class="text-lg sm:text-2xl font-black text-white tracking-tight">
						MDRRMO TANAUAN EMERGENCY HOTLINES
					</h3>
					<span class="text-xs text-slate-300 font-medium">
						Municipal Disaster Risk Reduction and Management Office • Tanauan, Leyte
					</span>
				</div>
			</div>
			<div class="flex items-center gap-2">
				<span
					class="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-3.5 py-1 text-xs font-bold text-emerald-300 uppercase tracking-wider"
				>
					<span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
					24/7 Operations Center
				</span>
			</div>
		</div>

		<!-- 4 Channels Grid (Globe, Smart, Facebook, Base Radio) -->
		<div class="p-6 sm:p-8 bg-slate-50/70">
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<!-- GLOBE HOTLINE -->
				<div
					class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-blue-900 bg-blue-950 p-5 text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
				>
					<div>
						<div class="flex items-center justify-between">
							<span
								class="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white"
							>
								📞 GLOBE HOTLINE
							</span>
							<button
								type="button"
								onclick={() => copyToClipboard('0916-197-7360', 'globe')}
								class="text-[11px] font-bold text-blue-200 hover:text-amber-300 transition"
							>
								{copiedNumber === 'globe' ? '✓ Copied' : 'Copy'}
							</button>
						</div>
						<div class="mt-4">
							<a
								href="tel:09161977360"
								class="font-mono text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors block"
							>
								0916-197-7360
							</a>
							<span class="mt-1 block text-xs text-blue-200">24/7 Emergency Dispatch</span>
						</div>
					</div>
					<div class="mt-4 pt-3 border-t border-blue-900 flex items-center justify-between">
						<a
							href="tel:09161977360"
							class="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 hover:underline"
						>
							<span>Direct Call</span>
							<span>↗</span>
						</a>
						<span class="text-[10px] font-mono text-blue-300 uppercase">Emergency Line 1</span>
					</div>
				</div>

				<!-- SMART HOTLINE -->
				<div
					class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-emerald-900 bg-emerald-950 p-5 text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
				>
					<div>
						<div class="flex items-center justify-between">
							<span
								class="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white"
							>
								📱 SMART HOTLINE
							</span>
							<button
								type="button"
								onclick={() => copyToClipboard('0931-739-3333', 'smart')}
								class="text-[11px] font-bold text-emerald-200 hover:text-amber-300 transition"
							>
								{copiedNumber === 'smart' ? '✓ Copied' : 'Copy'}
							</button>
						</div>
						<div class="mt-4">
							<a
								href="tel:09317393333"
								class="font-mono text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-300 transition-colors block"
							>
								0931-739-3333
							</a>
							<span class="mt-1 block text-xs text-emerald-200">24/7 Emergency Dispatch</span>
						</div>
					</div>
					<div class="mt-4 pt-3 border-t border-emerald-900 flex items-center justify-between">
						<a
							href="tel:09317393333"
							class="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 hover:underline"
						>
							<span>Direct Call</span>
							<span>↗</span>
						</a>
						<span class="text-[10px] font-mono text-emerald-300 uppercase">Emergency Line 2</span>
					</div>
				</div>

				<!-- FACEBOOK PAGE -->
				<div
					class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-blue-700 bg-blue-900 p-5 text-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
				>
					<div>
						<div class="flex items-center justify-between">
							<span
								class="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-blue-950"
							>
								🌐 FACEBOOK PAGE
							</span>
							<span class="text-[11px] font-bold text-blue-200">Official</span>
						</div>
						<div class="mt-4">
							<a
								href="https://www.facebook.com/search/top?q=MDRRMO-TANAUAN%20LEYTE"
								target="_blank"
								rel="noopener noreferrer"
								class="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-amber-300 transition-colors block truncate"
								title="MDRRMO-TANAUAN LEYTE"
							>
								MDRRMO-TANAUAN LEYTE
							</a>
							<span class="mt-1 block text-xs text-blue-200">Official Advisories & Bulletins</span>
						</div>
					</div>
					<div class="mt-4 pt-3 border-t border-blue-800 flex items-center justify-between">
						<a
							href="https://www.facebook.com/search/top?q=MDRRMO-TANAUAN%20LEYTE"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1.5 text-xs font-black text-amber-300 hover:underline"
						>
							<span>Open Facebook</span>
							<span>↗</span>
						</a>
						<span class="text-[10px] font-mono text-blue-300 uppercase">Social Desk</span>
					</div>
				</div>

				<!-- BASE RADIO FREQUENCY -->
				<div
					class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-amber-500 bg-amber-400 p-5 text-slate-950 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
				>
					<div>
						<div class="flex items-center justify-between">
							<span
								class="inline-flex items-center gap-1.5 rounded-md bg-slate-950 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-amber-300"
							>
								📻 BASE RADIO
							</span>
							<span class="text-[11px] font-black uppercase tracking-wider text-slate-900">VHF Band</span>
						</div>
						<div class="mt-4">
							<div class="font-mono text-xl sm:text-2xl font-black tracking-tight text-slate-950">
								167.600 MHz
							</div>
							<span class="mt-1 block text-xs font-bold text-slate-800">Tanauan EOC Frequency</span>
						</div>
					</div>
					<div class="mt-4 pt-3 border-t border-amber-500/60 flex items-center justify-between">
						<span class="text-xs font-black text-slate-950">Broadcast Channel</span>
						<span class="text-[10px] font-mono font-bold text-slate-800 uppercase">Emergency Net</span>
					</div>
				</div>
			</div>

			<!-- Ribbon Footer Matching Official Poster -->
			<div
				class="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-amber-300/80 bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 px-5 py-3 text-slate-900 shadow-2xs"
			>
				<div class="flex items-center gap-2.5">
					<span class="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500 text-slate-950 text-sm font-black">
						🛡️
					</span>
					<span class="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-950">
						“DISASTER-READY TANAUAN, SAFER COMMUNITIES”
					</span>
				</div>
				<div class="flex items-center gap-3 text-[11px] font-bold text-slate-600">
					<span>Tanauan Emergency Response Team (Rescue Tanauan)</span>
					<span>•</span>
					<span class="text-amber-800 font-black">Think Safe • Save Lives</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Folder Selection Dossiers (Top Folders Shelf) -->
	<div class="space-y-4">
		<div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
			<div>
				<span class="text-[11px] font-mono font-black tracking-wider text-blue-900 uppercase">
					MDRRMO // OFFICIAL ACCOMPLISHMENT ARCHIVES
				</span>
				<h3 class="text-xl sm:text-2xl font-black tracking-tight text-blue-950">
					Disaster Preparedness Dossiers & Records
				</h3>
			</div>
			<span class="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
				2 Archived Operation Folders
			</span>
		</div>

		<!-- 2 Folders Cards Grid -->
		<div class="grid gap-6 md:grid-cols-2">
			{#each folders as folder}
				{@const isSelected = selectedFolderId === folder.id}
				<div
					class="group relative flex flex-col justify-between rounded-3xl border-2 transition-all duration-300 {isSelected ? 'border-amber-400 bg-amber-50/20 shadow-xl -translate-y-1' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'}"
				>
					<!-- Top Manila-style Tab -->
					<div class="absolute -top-3.5 left-8 flex items-center">
						<div
							class="flex items-center gap-2 rounded-t-xl border-t-2 border-x-2 px-4 py-1 text-[11px] font-black tracking-wider uppercase shadow-xs transition-transform duration-200 group-hover:-translate-y-0.5 {folder.tabBg}"
						>
							<span class="inline-block h-2 w-2 rounded-full {folder.id === 'nsed-drill' ? 'bg-slate-950' : 'bg-white'}"></span>
							<span>{folder.folderCode}</span>
						</div>
					</div>

					<div class="p-6 sm:p-8 pt-7 flex flex-col justify-between h-full">
						<div>
							<!-- Header Meta -->
							<div class="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
								<span class="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-0.5 text-xs font-black text-blue-900 uppercase">
									{folder.badge}
								</span>
								<span class="font-mono text-xs font-bold text-slate-400">
									{folder.photos.length} Photo{folder.photos.length > 1 ? 's' : ''}
								</span>
							</div>

							<!-- Folder Title & Description -->
							<h4 class="text-lg sm:text-xl font-black text-blue-950 group-hover:text-blue-900 transition-colors">
								{folder.title}
							</h4>
							<p class="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
								{folder.description}
							</p>

							<!-- Highlights Tags -->
							<div class="mt-4 flex flex-wrap gap-1.5">
								{#each folder.highlights as h}
									<span class="rounded-lg bg-slate-100 border border-slate-200/80 px-2.5 py-1 text-[11px] font-medium text-slate-700">
										• {h}
									</span>
								{/each}
							</div>
						</div>

						<!-- Photo Stack Preview & Actions -->
						<div class="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-100 pt-5">
							<!-- Stacked Photos Preview -->
							<div class="flex items-center -space-x-3 overflow-hidden py-1">
								{#each folder.photos.slice(0, 4) as p}
									<div class="h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 border-white shadow-md bg-slate-900">
										<img src={p.src} alt="" class="h-full w-full object-cover" />
									</div>
								{/each}
								{#if folder.photos.length > 4}
									<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-white bg-slate-800 text-[11px] font-bold text-white shadow-md">
										+{folder.photos.length - 4}
									</div>
								{/if}
							</div>

							<!-- Buttons -->
							<div class="flex items-center gap-2 w-full sm:w-auto">
								<button
									type="button"
									onclick={() => (selectedFolderId = folder.id)}
									class="flex-1 sm:flex-initial rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider transition {isSelected ? 'bg-amber-400 text-slate-950 shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
								>
									{isSelected ? '✓ Browsing Folder' : 'Browse Folder'}
								</button>
								<button
									type="button"
									onclick={() => openModal(folder.id, 0)}
									class="flex items-center justify-center rounded-xl bg-blue-950 px-3.5 py-2.5 text-xs font-bold text-amber-300 hover:bg-blue-900 transition"
									title="Inspect Folder Dossier"
									aria-label={`Open modal for ${folder.title}`}
								>
									🔍
								</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Active Folder Display Section (Immediate In-Page Photos View) -->
	<div class="rounded-3xl border-2 border-slate-200 bg-slate-50/60 p-6 sm:p-8 shadow-xs">
		<!-- Folder Status Bar -->
		<div class="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
			<div class="flex items-center gap-3">
				<span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-950 text-amber-300 text-lg font-black shadow-inner">
					📁
				</span>
				<div>
					<div class="flex items-center gap-2">
						<span class="text-[10px] font-mono font-black tracking-wider text-amber-700 uppercase">
							CURRENTLY BROWSING // {currentFolder.folderCode}
						</span>
					</div>
					<h4 class="text-xl sm:text-2xl font-black text-blue-950">
						{currentFolder.title}
					</h4>
				</div>
			</div>

			<!-- Quick Folder Switcher Pills -->
			<div class="inline-flex rounded-xl bg-slate-200/80 p-1 border border-slate-300">
				{#each folders as f}
					<button
						type="button"
						onclick={() => (selectedFolderId = f.id)}
						class="rounded-lg px-3 py-1.5 text-xs font-bold transition {selectedFolderId === f.id ? 'bg-white text-blue-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'}"
					>
						{f.shortTitle} ({f.photos.length})
					</button>
				{/each}
			</div>
		</div>

		<!-- In-Page Photos Grid -->
		<div class="grid gap-6 {currentFolder.photos.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}">
			{#each currentFolder.photos as photo, index}
				<div
					class="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-xl {currentFolder.photos.length === 5 && index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}"
				>
					<button
						type="button"
						onclick={() => openModal(currentFolder.id, index)}
						class="flex h-full w-full flex-col text-left focus:outline-none focus:ring-4 focus:ring-amber-400/50"
						aria-label={`Open photo ${photo.title}`}
					>
						<!-- Image Container -->
						<div class="relative overflow-hidden bg-slate-900 {currentFolder.photos.length === 5 && index === 0 ? 'h-64 sm:h-80' : 'h-56 sm:h-64'} w-full">
							<img
								src={photo.src}
								alt={photo.title}
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								loading="lazy"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

							<!-- Top Tags -->
							<div class="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
								<span
									class="rounded-lg border px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-wider shadow-sm {photo.badgeColor}"
								>
									{photo.code} // {photo.tag}
								</span>
								<span
									class="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900/80 text-white backdrop-blur-xs transition group-hover:bg-amber-400 group-hover:text-slate-950"
								>
									🔍
								</span>
							</div>

							<!-- Bottom Title Overlay -->
							<div class="absolute bottom-3 left-4 right-4">
								<h4 class="text-base sm:text-lg font-black text-white drop-shadow-md">
									{photo.title}
								</h4>
							</div>
						</div>

						<!-- Card Body Text -->
						<div class="flex flex-1 flex-col justify-between p-5 sm:p-6 bg-white">
							<p class="text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
								{photo.description}
							</p>

							<!-- Card Footer Action -->
							<div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-black text-blue-900">
								<span class="inline-flex items-center gap-1 group-hover:text-amber-600 transition-colors">
									Inspect Record & Operational Protocols →
								</span>
								<span class="font-mono text-[11px] text-slate-400">0{index + 1}/0{currentFolder.photos.length}</span>
							</div>
						</div>
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- FULLSCREEN / INSPECTION LIGHTBOX MODAL -->
{#if isModalOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
		transition:fade={{ duration: 200 }}
		onclick={closeModal}
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-drill-title"
		tabindex="-1"
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative my-auto w-full {isFullscreen ? 'max-w-7xl' : 'max-w-5xl'} rounded-3xl border-2 border-amber-400/80 bg-white shadow-2xl overflow-hidden transition-all duration-300"
			transition:scale={{ duration: 250, start: 0.95 }}
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Top Modal Bar -->
			<div class="relative border-b-2 border-slate-200 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 px-6 py-4 text-white">
				<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
					<div class="flex items-center gap-3">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-black text-lg shadow-sm">
							📁
						</div>
						<div>
							<div class="flex items-center gap-2">
								<span class="text-[10px] font-mono font-black tracking-widest text-amber-400 uppercase">
									{modalFolder.folderCode}
								</span>
								<span class="rounded bg-blue-800/80 px-2 py-0.5 text-[9px] font-black text-blue-200 uppercase">
									Photo 0{activePhotoIndex + 1} of 0{modalFolder.photos.length}
								</span>
							</div>
							<h3 id="modal-drill-title" class="text-base sm:text-xl font-black text-white">
								{activePhoto.title}
							</h3>
						</div>
					</div>

					<!-- Window Action Controls -->
					<div class="flex items-center gap-2 self-end sm:self-auto">
						<!-- Folder Switcher in Modal -->
						<div class="inline-flex rounded-lg bg-white/10 p-0.5 border border-white/20">
							{#each folders as f}
								<button
									type="button"
									onclick={() => switchModalFolder(f.id)}
									class="rounded-md px-2.5 py-1 text-[11px] font-bold transition {modalFolderId === f.id ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:text-white'}"
								>
									{f.shortTitle}
								</button>
							{/each}
						</div>

						<button
							type="button"
							onclick={toggleFullscreen}
							class="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
							title={isFullscreen ? 'Exit Fullscreen' : 'Expand View'}
							aria-label="Toggle Fullscreen"
						>
							{#if isFullscreen}
								⤓
							{:else}
								⤢
							{/if}
						</button>
						<button
							type="button"
							onclick={closeModal}
							class="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-red-600 hover:border-red-500 active:scale-95"
							title="Close Modal"
							aria-label="Close modal"
						>
							✕
						</button>
					</div>
				</div>
			</div>

			<!-- Main Modal Viewer -->
			<div class="max-h-[82vh] overflow-y-auto bg-slate-50/70 p-4 sm:p-6 space-y-6">
				<!-- High-Res Photo Stage -->
				<div class="relative overflow-hidden rounded-2xl bg-slate-950 border-2 border-slate-300 shadow-inner flex items-center justify-center">
					<img
						src={activePhoto.src}
						alt={activePhoto.title}
						class="w-full {isFullscreen ? 'max-h-[68vh]' : 'max-h-[50vh] sm:max-h-[58vh]'} object-contain bg-slate-950"
					/>

					<!-- Previous Button -->
					<button
						type="button"
						onclick={prevPhoto}
						class="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/80 text-white border border-white/20 backdrop-blur-md shadow-lg transition hover:bg-amber-400 hover:text-slate-950 hover:scale-110 active:scale-95"
						aria-label="Previous photo"
					>
						←
					</button>

					<!-- Next Button -->
					<button
						type="button"
						onclick={nextPhoto}
						class="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/80 text-white border border-white/20 backdrop-blur-md shadow-lg transition hover:bg-amber-400 hover:text-slate-950 hover:scale-110 active:scale-95"
						aria-label="Next photo"
					>
						→
					</button>

					<!-- Badge Indicator on Photo -->
					<div class="absolute bottom-3 left-3 flex items-center gap-2">
						<span
							class="rounded-lg border px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-sm {activePhoto.badgeColor}"
						>
							{activePhoto.code}
						</span>
						<span class="rounded-lg bg-slate-900/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
							{activePhoto.tag}
						</span>
					</div>
				</div>

				<!-- Photo Narrative & Operational Takeaway -->
				<div class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
					<div class="mb-2 flex items-center justify-between border-b border-slate-100 pb-3">
						<h4 class="text-base font-black text-blue-950">
							Operational Description & Command Protocols
						</h4>
						<span class="font-mono text-xs font-bold text-slate-500">
							{modalFolder.coverage}
						</span>
					</div>
					<p class="text-sm leading-relaxed text-slate-700">
						{activePhoto.description}
					</p>
				</div>

				<!-- Thumbnail Selector Carousel -->
				<div class="border-t border-slate-200 pt-4">
					<div class="mb-2 flex items-center justify-between">
						<span class="text-xs font-mono font-bold uppercase text-slate-500">
							Folder Photographs (0{activePhotoIndex + 1} / 0{modalFolder.photos.length})
						</span>
						<span class="text-xs font-medium text-slate-400">
							Keyboard: ← / → Arrow Keys
						</span>
					</div>
					<div class="grid grid-cols-{modalFolder.photos.length} gap-2 sm:gap-3" style="grid-template-columns: repeat({modalFolder.photos.length}, minmax(0, 1fr));">
						{#each modalFolder.photos as p, i}
							<button
								type="button"
								onclick={() => (activePhotoIndex = i)}
								class="group relative h-16 sm:h-20 overflow-hidden rounded-xl border-2 transition-all {activePhotoIndex === i ? 'border-amber-500 ring-2 ring-amber-400/50 scale-102 shadow-md' : 'border-slate-200 opacity-70 hover:opacity-100'}"
								aria-label={`Select photo ${p.title}`}
							>
								<img src={p.src} alt="" class="h-full w-full object-cover" />
								<div class="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent"></div>
								<div class="absolute bottom-1 left-1 rounded bg-slate-950/80 px-1 py-0.2 font-mono text-[9px] font-bold text-amber-300">
									0{i + 1}
								</div>
							</button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Bottom Footer Bar -->
			<div class="flex items-center justify-between border-t border-slate-200 bg-slate-100 px-6 py-3 text-xs text-slate-600 font-medium">
				<div class="flex items-center gap-2">
					<span class="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
					<span>Municipality of Tanauan, Leyte • MDRRMO Disaster Preparedness Archive</span>
				</div>
				<button
					type="button"
					onclick={closeModal}
					class="rounded-lg bg-slate-200 px-3 py-1 font-bold text-slate-700 hover:bg-slate-300 active:scale-95"
				>
					Close Viewer
				</button>
			</div>
		</div>
	</div>
{/if}
