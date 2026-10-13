<script>
	import { fade, scale } from 'svelte/transition';

	// View Modes: 'interactive' (Interactive Hierarchy) | 'document' (Official Document Slide)
	let activeTab = $state('interactive');
	let selectedMember = $state(null);
	let isFullscreenModalOpen = $state(false);

	// Official Executive Head
	const viceMayor = {
		id: 'kapunan',
		name: 'Hon. Archie Lawrence R. Kapunan',
		title: 'Municipal Vice Mayor',
		roleBadge: 'Presiding Officer, Sangguniang Bayan / Municipal Vice Mayor',
		image: '/Vice-Mayor/personnel/kapunan.jpg',
		fallbackImage: '/tanauan logo.svg',
		level: 'Vice Mayor',
		tier: '01 // EXECUTIVE & LEGISLATIVE HEAD',
		borderColor: 'border-amber-400',
		badgeColor: 'bg-amber-400 text-blue-950 font-black',
		description:
			'Presiding Officer of the Sangguniang Bayan of Tanauan, Leyte. Leads the local legislative body, presides over regular and special legislative sessions, signs legislative warrants, appoints staff of the local legislative body, and exercises executive succession functions as Acting Mayor in accordance with Section 445 of the Local Government Code of 1991 (RA 7160).',
		authority: 'Local Government Code of 1991 (RA 7160), Section 445'
	};

	// Official Staff of the Vice Mayor (arranged matching the official 3-column matrix)
	const staffMembers = [
		{
			id: 'seva',
			name: 'Jerry S. Seva',
			title: 'Staff of the Vice Mayor',
			roleBadge: 'Administrative & Legislative Support',
			image: '/Vice-Mayor/personnel/seva.jpg',
			level: 'Staff',
			tier: 'STAFF 01',
			col: 1,
			row: 1,
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-900 text-amber-300',
			description:
				'Provides executive administrative support, legislative agenda coordination, document routing, and constituent assistance for the Office of the Vice Mayor.',
			authority: 'LGU Plantilla Staff / Office of the Vice Mayor'
		},
		{
			id: 'obejas',
			name: 'Sheila C. Obejas',
			title: 'Staff of the Vice Mayor',
			roleBadge: 'Executive Secretariat & Client Support',
			image: '/Vice-Mayor/personnel/obejas.jpg',
			level: 'Staff',
			tier: 'STAFF 02',
			col: 2,
			row: 1,
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-900 text-amber-300',
			description:
				'Assists with executive correspondence, official calendar management, constituent appointments, and secretariat operations for official vice-mayoral engagements.',
			authority: 'LGU Plantilla Staff / Office of the Vice Mayor'
		},
		{
			id: 'mabansag',
			name: 'Ellen N. Mabansag',
			title: 'Staff of the Vice Mayor',
			roleBadge: 'Records & Frontline Assistance',
			image: '/Vice-Mayor/personnel/mabansag.jpg',
			level: 'Staff',
			tier: 'STAFF 03',
			col: 3,
			row: 1,
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-900 text-amber-300',
			description:
				'Administers incoming and outgoing official correspondence, document archival, public inquiries, and front-desk constituent reception.',
			authority: 'LGU Plantilla Staff / Office of the Vice Mayor'
		},
		{
			id: 'malate',
			name: 'Joey R. Malate',
			title: 'Staff of the Vice Mayor',
			roleBadge: 'Operations & Field Coordination',
			image: '/Vice-Mayor/personnel/malate.jpg',
			level: 'Staff',
			tier: 'STAFF 04',
			col: 1,
			row: 2,
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-900 text-amber-300',
			description:
				'Coordinates community engagement initiatives, barangay outreach activities, and field logistical arrangements for official vice-mayoral programs.',
			authority: 'LGU Plantilla Staff / Office of the Vice Mayor'
		},
		{
			id: 'cayubit',
			name: 'Jennifer B. Cayubit',
			title: 'Staff of the Vice Mayor',
			roleBadge: 'Administrative & Records Support',
			image: '/Vice-Mayor/personnel/cayubit.jpg',
			level: 'Staff',
			tier: 'STAFF 05',
			col: 2,
			row: 2,
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-900 text-amber-300',
			description:
				'Facilitates internal office documentation, records verification, meeting minutes preparation, and inter-office coordination with municipal departments.',
			authority: 'LGU Plantilla Staff / Office of the Vice Mayor'
		},
		{
			id: 'silvano',
			name: 'Lito L. Silvano Jr.',
			title: 'Staff of the Vice Mayor',
			roleBadge: 'Community Liaison & Public Relations',
			image: '/Vice-Mayor/personnel/silvano.jpg',
			level: 'Staff',
			tier: 'STAFF 06',
			col: 3,
			row: 2,
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-900 text-amber-300',
			description:
				'Assists with public relations, community liaison, grassroots constituent consultations, and public service delivery across Tanauan barangays.',
			authority: 'LGU Plantilla Staff / Office of the Vice Mayor'
		},
		{
			id: 'hababag',
			name: 'Rey Jeane C. Hababag',
			title: 'Staff of the Vice Mayor',
			roleBadge: 'Office Support & Customer Relations',
			image: '/Vice-Mayor/personnel/hababag.jpg',
			level: 'Staff',
			tier: 'STAFF 07',
			col: 1,
			row: 3,
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-900 text-amber-300',
			description:
				'Supports frontline client reception, citizen inquiry assistance, day-to-day clerical workflow, and customer relations management for the office.',
			authority: 'LGU Plantilla Staff / Office of the Vice Mayor'
		},
		{
			id: 'villegas',
			name: 'Rogelio D. Villegas Jr.',
			title: 'Staff of the Vice Mayor',
			roleBadge: 'Logistics, Transport & Operations',
			image: '/Vice-Mayor/personnel/villegas.jpg',
			level: 'Staff',
			tier: 'STAFF 08',
			col: 2,
			row: 3,
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-900 text-amber-300',
			description:
				'Manages logistics, transport services, official mobility arrangements, and operational support for the Vice Mayor and office personnel.',
			authority: 'LGU Plantilla Staff / Office of the Vice Mayor'
		},
		{
			id: 'varona',
			name: 'Edmund L. Varona',
			title: 'Staff of the Vice Mayor',
			roleBadge: 'General Services & Facility Support',
			image: '/Vice-Mayor/personnel/varona.jpg',
			level: 'Staff',
			tier: 'STAFF 09',
			col: 3,
			row: 3,
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-900 text-amber-300',
			description:
				'Ensures office maintenance, equipment inventory tracking, general facility assistance, and operational event support for the Office of the Vice Mayor.',
			authority: 'LGU Plantilla Staff / Office of the Vice Mayor'
		}
	];

	function openMemberModal(member) {
		selectedMember = member;
	}

	function closeMemberModal() {
		selectedMember = null;
	}

	function openFullscreen() {
		isFullscreenModalOpen = true;
	}

	function closeFullscreen() {
		isFullscreenModalOpen = false;
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') {
			closeMemberModal();
			closeFullscreen();
		}
	}}
/>

<div class="relative w-full space-y-6">
	<!-- Control Bar: Mode Toggle + Quick Actions -->
	<div class="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-200 pb-4">
		<!-- Left: Civic Status Badge -->
		<div class="flex items-center gap-2">
			<span
				class="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black tracking-wider text-blue-950 uppercase"
			>
				<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
				LGU Tanauan Official Roster
			</span>
			<span class="hidden text-xs font-bold text-slate-500 sm:inline">•</span>
			<span class="hidden text-xs font-medium text-slate-600 sm:inline">10 Personnel on Record</span>
		</div>

		<!-- Right: View Mode Toggle & Actions -->
		<div class="flex flex-wrap items-center gap-2">
			<div class="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 shadow-2xs">
				<button
					type="button"
					onclick={() => (activeTab = 'interactive')}
					class="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-black transition-all {activeTab ===
					'interactive'
						? 'bg-blue-950 text-amber-300 shadow-sm'
						: 'text-slate-600 hover:text-blue-950'}"
				>
					<span>⚡ Interactive Chart</span>
				</button>
				<button
					type="button"
					onclick={() => (activeTab = 'document')}
					class="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-black transition-all {activeTab ===
					'document'
						? 'bg-blue-950 text-amber-300 shadow-sm'
						: 'text-slate-600 hover:text-blue-950'}"
				>
					<span>📄 Official Document Slide</span>
				</button>
			</div>

			<a
				href="/Vice-Mayor/vice-mayors-office-org-chart.pdf"
				download="Vice-Mayors-Office-Org-Chart-Tanauan.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 hover:text-blue-950"
				title="Download high-resolution official PDF document"
			>
				<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
					/>
				</svg>
				<span class="hidden sm:inline">Download PDF</span>
			</a>

			<button
				type="button"
				onclick={openFullscreen}
				class="inline-flex items-center gap-1.5 rounded-lg bg-blue-950 px-3 py-1.5 text-xs font-black tracking-wider text-amber-300 uppercase shadow-sm transition-all hover:bg-blue-900 active:scale-95"
				title="Fullscreen document view"
			>
				<span>[⛶ Fullscreen]</span>
			</button>
		</div>
	</div>

	<!-- TAB 1: INTERACTIVE EXECUTIVE ORGANOGRAM (Matching HRMO Office High-End Design) -->
	{#if activeTab === 'interactive'}
		<div
			class="relative w-full overflow-hidden rounded-3xl border-2 border-slate-900 bg-gradient-to-b from-[#001730] via-[#001f3f] to-[#001224] p-6 shadow-2xl sm:p-10 lg:p-12 text-white"
		>
			<!-- Top Seal & Typography Header matching the Official Document Slide -->
			<div class="relative z-10 mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/50 pb-6">
				<div class="flex items-center gap-4">
					<img
						src="/tanauan logo.svg"
						alt="Official Seal of Tanauan, Leyte"
						class="h-16 w-16 shrink-0 object-contain drop-shadow-md sm:h-20 sm:w-20"
					/>
					<div>
						<span class="block text-[11px] font-black tracking-widest text-blue-300 uppercase">
							MUNICIPALITY OF TANAUAN, LEYTE
						</span>
						<h3 class="text-xl sm:text-2xl lg:text-3xl font-black tracking-wider text-amber-400 uppercase">
							ORGANIZATIONAL CHARTS
						</h3>
						<span class="text-xs font-bold text-slate-300">
							Office of the Municipal Vice Mayor
						</span>
					</div>
				</div>

				<div class="flex items-center gap-3">
					<img
						src="/Vice-Mayor/bagong-pilipinas.png"
						alt="Bagong Pilipinas"
						class="h-12 w-auto object-contain drop-shadow-sm sm:h-14"
					/>
					<div class="hidden items-center gap-2 rounded-xl border border-blue-800/60 bg-blue-950/60 px-4 py-2 text-xs font-bold text-amber-300 md:flex">
						<span>Executive &amp; Legislative Leadership</span>
					</div>
				</div>
			</div>

			<!-- Main Organogram: Executive Top -> Branching Spine -> 3x3 Staff Matrix -->
			<div class="relative z-10 mx-auto max-w-5xl space-y-10">
				<!-- EXECUTIVE HEAD: VICE MAYOR -->
				<div class="flex flex-col items-center">
					<div
						class="group relative flex w-full max-w-md items-center justify-between gap-4 rounded-3xl border-2 border-amber-400/80 bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-5 shadow-2xl backdrop-blur-xs transition-all duration-300 hover:border-amber-300 hover:scale-[1.02]"
					>
						<!-- Left: Info -->
						<div class="min-w-0 flex-1 pr-2 text-right">
							<span class="inline-block rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-black tracking-wider text-amber-300 uppercase border border-amber-400/40 mb-1">
								{viceMayor.tier}
							</span>
							<h4 class="text-base sm:text-lg font-black tracking-tight text-white transition-colors group-hover:text-amber-300">
								{viceMayor.name}
							</h4>
							<div class="text-xs font-extrabold text-amber-300">
								{viceMayor.title}
							</div>
							<div class="mt-0.5 text-[11px] font-medium text-blue-200">
								{viceMayor.roleBadge}
							</div>
							<button
								type="button"
								onclick={() => openMemberModal(viceMayor)}
								class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 hover:underline"
							>
								<span>View Profile Details →</span>
							</button>
						</div>

						<!-- Right: Portrait -->
						<div class="relative shrink-0">
							<button
								type="button"
								onclick={() => openMemberModal(viceMayor)}
								class="relative block h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-4 border-amber-400 bg-slate-200 shadow-2xl transition-transform duration-300 group-hover:scale-105 group-hover:border-white focus:outline-none focus:ring-2 focus:ring-amber-400"
								title="View {viceMayor.name}'s profile"
							>
								<img
									src={viceMayor.image}
									alt={viceMayor.name}
									class="h-full w-full object-cover object-center"
									onerror={(e) => {
										if (viceMayor.fallbackImage) e.currentTarget.src = viceMayor.fallbackImage;
									}}
								/>
							</button>
							<span
								class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 text-blue-950 px-2.5 py-0.5 text-[9px] font-black tracking-wider uppercase shadow-md whitespace-nowrap"
							>
								{viceMayor.level}
							</span>
						</div>
					</div>

					<!-- Central Connecting Branching Spine -->
					<div class="flex flex-col items-center">
						<div class="h-8 w-0.5 bg-gradient-to-b from-amber-400 to-white/70"></div>
						<div class="inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-blue-950 px-4 py-1.5 text-xs font-black tracking-wider text-amber-300 uppercase shadow-md">
							<span class="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
							STAFF OF THE VICE MAYOR
						</div>
						<div class="h-6 w-0.5 bg-white/70"></div>
					</div>
				</div>

				<!-- 3-COLUMN STAFF ORGANIZATIONAL MATRIX (Mirroring the Official Attached Chart) -->
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
					{#each staffMembers as member}
						<div
							class="group relative flex items-center gap-4 rounded-2xl border border-blue-800/60 bg-blue-950/40 p-4 backdrop-blur-xs transition-all duration-300 hover:border-amber-400 hover:bg-blue-900/40 hover:shadow-xl hover:-translate-y-0.5"
						>
							<!-- Circular Framed Portrait -->
							<div class="relative shrink-0">
								<button
									type="button"
									onclick={() => openMemberModal(member)}
									class="relative block h-20 w-20 sm:h-22 sm:w-22 overflow-hidden rounded-full border-3 border-white bg-slate-200 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
									title="View {member.name}'s profile"
								>
									<img
										src={member.image}
										alt={member.name}
										class="h-full w-full object-cover object-center"
									/>
								</button>
								<span
									class="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-blue-900 text-amber-300 px-2 py-0.5 text-[8.5px] font-black tracking-wider uppercase shadow-md whitespace-nowrap border border-blue-700"
								>
									{member.tier}
								</span>
							</div>

							<!-- Member Name & Role Details -->
							<div class="min-w-0 flex-1">
								<h4 class="text-sm font-black tracking-tight text-white transition-colors group-hover:text-amber-300">
									{member.name}
								</h4>
								<div class="text-xs font-extrabold text-blue-200">
									{member.title}
								</div>
								<div class="mt-0.5 text-[10.5px] font-medium text-slate-300 line-clamp-1">
									{member.roleBadge}
								</div>
								<button
									type="button"
									onclick={() => openMemberModal(member)}
									class="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-amber-400/80 hover:text-amber-300 hover:underline"
								>
									<span>View Profile Details →</span>
								</button>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Bottom Footer Bar matching Civic Standard -->
			<div class="relative z-10 mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-blue-900/50 pt-6 text-xs text-blue-300">
				<div class="flex items-center gap-2">
					<span class="inline-block h-2 w-2 rounded-full bg-amber-400"></span>
					<span>Local Government Code of 1991 (RA 7160) &amp; LGU Tanauan Approved Plantilla Structure</span>
				</div>

				<div class="flex items-center gap-4 font-mono font-bold text-slate-300">
					<span>Office of the Vice Mayor</span>
					<div class="grid grid-cols-6 gap-1 opacity-60">
						{#each Array(12) as _}
							<span class="h-1 w-1 rounded-full bg-white"></span>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<!-- TAB 2: OFFICIAL HIGH-RES DOCUMENT SLIDE VIEWER -->
		<div class="relative w-full overflow-hidden rounded-3xl border-2 border-slate-300 bg-slate-900 shadow-md">
			<div class="relative flex items-center justify-center p-4 sm:p-8">
				<img
					src="/Vice-Mayor/vice-mayor-organizational-structure.jpg"
					alt="Official Vice Mayor's Office Organizational Chart Slide"
					class="max-h-[85vh] w-full rounded-2xl object-contain shadow-2xl transition-transform hover:scale-[1.01]"
				/>
			</div>

			<div class="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 bg-slate-950 px-6 py-4 text-xs text-slate-300">
				<div class="flex items-center gap-2">
					<span class="font-bold text-amber-400">Official Document:</span>
					<span>Organizational Charts of the Office of the Vice Mayor</span>
				</div>
				<div class="flex items-center gap-3">
					<a
						href="/Vice-Mayor/vice-mayors-office-org-chart.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class="font-bold text-blue-300 hover:text-white hover:underline"
					>
						Open PDF Document ↗
					</a>
					<button
						type="button"
						onclick={openFullscreen}
						class="font-bold text-amber-400 hover:text-amber-300 hover:underline"
					>
						Open Fullscreen Lightbox ↗
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- MODAL: PERSONNEL PROFILE DETAILS -->
	{#if selectedMember}
		<div
			class="fixed inset-0 z-60 flex items-center justify-center p-4"
			role="dialog"
			aria-modal="true"
			aria-label="{selectedMember.name} Profile"
			tabindex="-1"
			onkeydown={(e) => e.key === 'Escape' && closeMemberModal()}
		>
			<!-- Backdrop -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="absolute inset-0 bg-blue-950/80 backdrop-blur-sm"
				onclick={closeMemberModal}
				transition:fade={{ duration: 150 }}
			></div>

			<!-- Card Content -->
			<div
				class="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border-2 border-amber-400 bg-white shadow-2xl"
				transition:scale={{ duration: 200, start: 0.95 }}
			>
				<!-- Top Banner -->
				<div class="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-6 text-white">
					<div class="flex items-center justify-between">
						<span class="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-black tracking-wider text-blue-950 uppercase">
							{selectedMember.tier || 'OFFICIAL PERSONNEL'}
						</span>
						<button
							type="button"
							onclick={closeMemberModal}
							class="rounded-full border border-white/20 p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
							aria-label="Close modal"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<div class="mt-4 flex items-center gap-4">
						<div class="h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-amber-400 bg-slate-200 shadow-md">
							<img
								src={selectedMember.image}
								alt={selectedMember.name}
								class="h-full w-full object-cover object-center"
							/>
						</div>
						<div>
							<h3 class="text-xl font-black text-white">{selectedMember.name}</h3>
							<div class="text-sm font-bold text-amber-300">{selectedMember.title}</div>
							<div class="mt-1 text-xs font-semibold text-blue-200">
								{selectedMember.roleBadge}
							</div>
						</div>
					</div>
				</div>

				<!-- Body Details -->
				<div class="space-y-4 p-6">
					<div>
						<div class="text-[11px] font-black tracking-wider text-slate-500 uppercase">
							Duties &amp; Civil Service Responsibilities
						</div>
						<p class="mt-1 text-xs sm:text-sm leading-relaxed text-slate-800">
							{selectedMember.description}
						</p>
					</div>

					<div class="grid grid-cols-2 gap-3 text-xs">
						<div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
							<div class="text-[10px] font-black text-slate-500 uppercase">Department</div>
							<div class="font-bold text-blue-950">Office of the Vice Mayor</div>
						</div>
						<div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
							<div class="text-[10px] font-black text-slate-500 uppercase">Statutory Basis</div>
							<div class="font-bold text-blue-950 truncate">{selectedMember.authority}</div>
						</div>
					</div>
				</div>

				<!-- Footer -->
				<div class="flex items-center justify-end border-t border-slate-200 bg-slate-50 px-6 py-3">
					<button
						type="button"
						onclick={closeMemberModal}
						class="rounded-xl bg-blue-950 px-5 py-2 text-xs font-black text-amber-300 transition-colors hover:bg-blue-900"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- MODAL: FULLSCREEN LIGHTBOX FOR THE ORIGINAL SLIDE -->
	{#if isFullscreenModalOpen}
		<div
			class="fixed inset-0 z-70 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
			role="dialog"
			aria-modal="true"
			aria-label="Full-screen Organizational Structure Document"
			tabindex="-1"
			onkeydown={(e) => e.key === 'Escape' && closeFullscreen()}
		>
			<!-- Backdrop click -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="absolute inset-0" onclick={closeFullscreen}></div>

			<div class="relative z-10 max-h-[95vh] max-w-6xl overflow-hidden rounded-2xl bg-slate-900 p-2 shadow-2xl">
				<div class="mb-2 flex items-center justify-between px-3 text-white">
					<span class="text-xs font-bold text-amber-400">
						Office of the Vice Mayor • Organizational Charts
					</span>
					<button
						type="button"
						onclick={closeFullscreen}
						class="rounded-lg bg-white/10 px-3 py-1 text-xs font-bold text-white hover:bg-white/20"
					>
						✕ Close
					</button>
				</div>
				<img
					src="/Vice-Mayor/vice-mayor-organizational-structure.jpg"
					alt="Full-screen Vice Mayor Organizational Structure"
					class="max-h-[85vh] w-full rounded-xl object-contain"
				/>
			</div>
		</div>
	{/if}
</div>
