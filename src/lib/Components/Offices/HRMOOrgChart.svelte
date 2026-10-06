<script>
	import { fade, scale } from 'svelte/transition';

	// View Modes: 'interactive' (Interactive Hierarchy) | 'document' (Official Document Slide)
	let activeTab = $state('interactive');
	let selectedMember = $state(null);
	let isFullscreenModalOpen = $state(false);

	// Official HRMO Roster & Organizational Structure (Municipality of Tanauan, Leyte)
	const executiveHierarchy = [
		{
			id: 'merilo',
			name: 'Hon. Ma. Gina E. Merilo',
			title: 'Municipal Mayor',
			roleBadge: 'Appointing Authority / Local Chief Executive',
			image: '/HRMO/personnel/merilo.png?v=3',
			fallbackImage: '/Elected Officials/1.webp',
			level: 'Mayor',
			tier: '01 // EXECUTIVE HEAD',
			borderColor: 'border-amber-400',
			badgeColor: 'bg-amber-400 text-blue-950',
			description:
				'Local Chief Executive and Appointing Authority for the Municipality of Tanauan, Leyte. Issues official appointments for regular and non-career personnel and exercises executive direction over municipal human resources.',
			authority: 'Local Government Code of 1991 (RA 7160)'
		},
		{
			id: 'abando',
			name: 'Atty. Ephrem S. Abando',
			title: 'Municipal Administrator',
			roleBadge: 'Executive Management & Municipal Oversight',
			image: '/HRMO/personnel/abando.png?v=3',
			level: 'Administrator',
			tier: '02 // EXECUTIVE OVERSIGHT',
			borderColor: 'border-blue-400',
			badgeColor: 'bg-blue-600 text-white',
			description:
				'Exercises executive administrative supervision assisting the Municipal Mayor in coordinating the operations of all statutory municipal departments and ensuring efficient personnel management throughout the LGU.',
			authority: 'Local Government Code of 1991 (RA 7160), Section 480'
		},
		{
			id: 'tizon',
			name: 'Atty. Federico C. Tizon',
			title: 'HRMO III',
			roleBadge: 'Department Head / Legal Specialist',
			image: '/HRMO/personnel/tizon.png?v=3',
			level: 'Department Head',
			tier: '03 // DEPARTMENT HEAD',
			borderColor: 'border-amber-400',
			badgeColor: 'bg-amber-500 text-blue-950 font-black',
			description:
				'Municipal Government Department Head (HRMO III). Directs, administers, and supervises the comprehensive human resource management program, Civil Service Commission compliance, and PRIME-HRM initiatives for the Municipality of Tanauan.',
			authority: 'Civil Service Law (PD 807) & CSC MC No. 19, s. 2012'
		},
		{
			id: 'perez',
			name: 'John Carlo A. Perez',
			title: 'HRMA',
			roleBadge: 'Human Resource Management Assistant',
			image: '/HRMO/personnel/perez.png?v=3',
			level: 'Assistant',
			tier: '04 // HRMA DESK',
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-800 text-amber-300',
			description:
				'Provides technical and administrative assistance in recruitment evaluation, personnel records management, appointment processing, and daily client assistance within the Human Resource Management Office.',
			authority: 'Civil Service Commission Merit System'
		}
	];

	const staffMembers = [
		{
			id: 'demegillo',
			name: 'Emerson C. Demegillo',
			title: 'Clerk I',
			roleBadge: 'Clerical & Processing Support',
			image: '/HRMO/personnel/demegillo.png?v=3',
			level: 'Staff',
			tier: 'STAFF 01',
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-900 text-amber-300',
			description:
				'Administers frontline document logging, leave card monitoring, employee file archival, and clerical processing of personnel actions.',
			authority: 'LGU Plantilla Staff'
		},
		{
			id: 'ending',
			name: 'Ronjo R. Ending',
			title: 'Clerk I',
			roleBadge: 'Clerical & Records Support',
			image: '/HRMO/personnel/ending.png?v=3',
			level: 'Staff',
			tier: 'STAFF 02',
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-900 text-amber-300',
			description:
				'Assists in official correspondence routing, 201 file records maintenance, service record verification, and administrative coordination.',
			authority: 'LGU Plantilla Staff'
		},
		{
			id: 'almarines',
			name: 'Melissa T. Almarines',
			title: 'Admin Aide I',
			roleBadge: 'Administrative Assistance',
			image: '/HRMO/personnel/almarines.png?v=3',
			level: 'Staff',
			tier: 'STAFF 03',
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-900 text-amber-300',
			description:
				'Provides general administrative support, office supplies and logistics management, attendance verification, and customer assistance.',
			authority: 'LGU Plantilla Staff'
		},
		{
			id: 'caonte',
			name: 'Diana D. Caonte',
			title: 'Clerical Aide',
			roleBadge: 'Clerical Support Desk',
			image: '/HRMO/personnel/caonte.png?v=3',
			level: 'Staff',
			tier: 'STAFF 04',
			borderColor: 'border-blue-300',
			badgeColor: 'bg-blue-900 text-amber-300',
			description:
				'Facilitates intake inquiries, customer queuing assistance, daily office document indexing, and secretarial support to HRMO officers.',
			authority: 'LGU Administrative Support'
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
			<span class="hidden text-xs font-medium text-slate-600 sm:inline">8 Appointed Personnel</span>
		</div>

		<!-- Right: View Mode Toggle & Fullscreen Button -->
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
				href="/HRMO/hrmo-organizational-structure.jpg"
				download="HRMO-Organizational-Structure-Tanauan.jpg"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 hover:text-blue-950"
				title="Download high-resolution document slide"
			>
				<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
					/>
				</svg>
				<span class="hidden sm:inline">Download</span>
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

	<!-- TAB 1: INTERACTIVE EXECUTIVE ORGANOGRAM (Mirroring Slide Design) -->
	{#if activeTab === 'interactive'}
		<div
			class="relative w-full overflow-hidden rounded-3xl border-2 border-slate-900 bg-gradient-to-b from-[#001730] via-[#001f3f] to-[#001224] p-6 shadow-2xl sm:p-10 lg:p-12 text-white"
		>
			<!-- Top Seal & Typography Header matching the Official Slide -->
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
							ORGANIZATIONAL STRUCTURE
						</h3>
						<span class="text-xs font-bold text-slate-300">
							Human Resource Management Office (HRMO)
						</span>
					</div>
				</div>

				<div class="hidden items-center gap-2 rounded-xl border border-blue-800/60 bg-blue-950/60 px-4 py-2 text-xs font-bold text-amber-300 md:flex">
					<span>Executive Line & Staff Chart</span>
				</div>
			</div>

			<!-- Main Dual-Column Organizational Matrix (Desktop & Tablet) -->
			<div class="relative z-10 mx-auto max-w-5xl">
				<!-- Grid layout: Left = Executive Spine, Middle/Right = Staff with Connectors -->
				<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-4">
					<!-- LEFT COLUMN: Executive Spine (Mayor -> Administrator -> HRMO III -> HRMA) -->
					<div class="relative space-y-6 md:col-span-6 lg:col-span-5">
						<!-- Vertical connecting spine line behind the 4 portraits -->
						<div
							class="pointer-events-none absolute top-12 bottom-12 left-auto right-auto hidden w-1 bg-white/70 shadow-sm md:block"
							style="left: calc(100% - 3.75rem);"
						></div>

						{#each executiveHierarchy as member, idx}
							<div
								class="group relative flex items-center justify-between gap-4 rounded-2xl border border-blue-800/60 bg-blue-950/40 p-4 backdrop-blur-xs transition-all duration-300 hover:border-amber-400 hover:bg-blue-900/40"
							>
								<!-- Name and Position Info (Left aligned in slide) -->
								<div class="min-w-0 flex-1 pr-2 text-right">
									<h4 class="text-sm sm:text-base font-black tracking-tight text-white transition-colors group-hover:text-amber-300">
										{member.name}
									</h4>
									<div class="text-xs font-extrabold text-blue-200">
										{member.title}
									</div>
									<button
										type="button"
										onclick={() => openMemberModal(member)}
										class="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-amber-400/80 hover:text-amber-300 hover:underline"
									>
										<span>View Profile Details →</span>
									</button>
								</div>

								<!-- Oval Portrait (Framed in pure white border just like the slide) -->
								<div class="relative shrink-0">
									<button
										type="button"
										onclick={() => openMemberModal(member)}
										class="relative block h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
										title="View {member.name}'s profile"
									>
										<img
											src={member.image}
											alt={member.name}
											class="h-full w-full object-cover object-center"
											onerror={(e) => {
												if (member.fallbackImage) e.currentTarget.src = member.fallbackImage;
											}}
										/>
									</button>
									<span
										class="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full {member.badgeColor} px-2 py-0.5 text-[9px] font-black tracking-wider uppercase shadow-md whitespace-nowrap"
									>
										{member.level}
									</span>
								</div>
							</div>
						{/each}
					</div>

					<!-- CENTER CONNECTORS (Stylized SVG Arrows Branching to the Right Column on Desktop) -->
					<div class="relative hidden h-full items-center justify-center md:col-span-2 md:flex">
						<svg
							class="h-[480px] w-full stroke-white/80"
							viewBox="0 0 120 480"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<!-- Central branch out from the executive spine (between Admin and HRMO III) -->
							<path
								d="M 10 240 L 50 240"
								stroke-width="3"
								stroke-linecap="round"
							/>
							<!-- Vertical distribution spine -->
							<path
								d="M 50 60 L 50 420"
								stroke-width="3"
								stroke-linecap="round"
							/>

							<!-- Arrow 1 to Staff 1 (Emerson) -->
							<path
								d="M 50 60 L 95 60"
								stroke-width="3"
								stroke-linecap="round"
							/>
							<path
								d="M 85 50 L 105 60 L 85 70"
								fill="white"
							/>

							<!-- Arrow 2 to Staff 2 (Ronjo) -->
							<path
								d="M 50 180 L 95 180"
								stroke-width="3"
								stroke-linecap="round"
							/>
							<path
								d="M 85 170 L 105 180 L 85 190"
								fill="white"
							/>

							<!-- Arrow 3 to Staff 3 (Melissa) -->
							<path
								d="M 50 300 L 95 300"
								stroke-width="3"
								stroke-linecap="round"
							/>
							<path
								d="M 85 290 L 105 300 L 85 310"
								fill="white"
							/>

							<!-- Arrow 4 to Staff 4 (Diana) -->
							<path
								d="M 50 420 L 95 420"
								stroke-width="3"
								stroke-linecap="round"
							/>
							<path
								d="M 85 410 L 105 420 L 85 430"
								fill="white"
							/>
						</svg>
					</div>

					<!-- RIGHT COLUMN: Staff & Frontline Operations (Clerk I, Admin Aide I, Clerical Aide) -->
					<div class="space-y-6 md:col-span-4 lg:col-span-5">
						{#each staffMembers as member, idx}
							<div
								class="group relative flex items-center gap-4 rounded-2xl border border-blue-800/60 bg-blue-950/40 p-4 backdrop-blur-xs transition-all duration-300 hover:border-amber-400 hover:bg-blue-900/40"
							>
								<!-- Circular Portrait -->
								<div class="relative shrink-0">
									<button
										type="button"
										onclick={() => openMemberModal(member)}
										class="relative block h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-slate-200 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
										title="View {member.name}'s profile"
									>
										<img
											src={member.image}
											alt={member.name}
											class="h-full w-full object-cover object-center"
										/>
									</button>
									<span
										class="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full {member.badgeColor} px-2 py-0.5 text-[9px] font-black tracking-wider uppercase shadow-md whitespace-nowrap"
									>
										{member.title}
									</span>
								</div>

								<!-- Name & Position (Right aligned in slide) -->
								<div class="min-w-0 flex-1">
									<h4 class="text-sm sm:text-base font-black tracking-tight text-white transition-colors group-hover:text-amber-300">
										{member.name}
									</h4>
									<div class="text-xs font-extrabold text-blue-200">
										{member.title}
									</div>
									<button
										type="button"
										onclick={() => openMemberModal(member)}
										class="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-amber-400/80 hover:text-amber-300 hover:underline"
									>
										<span>View Profile Details →</span>
									</button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Bottom Footer Bar matching the Slide Footer & Page Indicator -->
			<div class="relative z-10 mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-blue-900/50 pt-6 text-xs text-blue-300">
				<div class="flex items-center gap-2">
					<span class="inline-block h-2 w-2 rounded-full bg-amber-400"></span>
					<span>Civil Service Commission (CSC) &amp; LGU Tanauan Approved Plantilla Structure</span>
				</div>

				<div class="flex items-center gap-4 font-mono font-bold text-slate-300">
					<span>Page 2</span>
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
					src="/HRMO/hrmo-organizational-structure.jpg"
					alt="Official HRMO Organizational Structure Slide"
					class="max-h-[85vh] w-full rounded-2xl object-contain shadow-2xl transition-transform hover:scale-[1.01]"
				/>
			</div>

			<div class="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 bg-slate-950 px-6 py-4 text-xs text-slate-300">
				<div class="flex items-center gap-2">
					<span class="font-bold text-amber-400">Original Slide Document:</span>
					<span>HRMO Executive Line and Staff Organogram</span>
				</div>
				<div class="flex items-center gap-3">
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
							<div class="font-bold text-blue-950">HRMO Tanauan</div>
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
						HRMO Organizational Structure • Official Slide
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
					src="/HRMO/hrmo-organizational-structure.jpg"
					alt="Full-screen HRMO Organizational Structure"
					class="max-h-[85vh] w-full rounded-xl object-contain"
				/>
			</div>
		</div>
	{/if}
</div>
