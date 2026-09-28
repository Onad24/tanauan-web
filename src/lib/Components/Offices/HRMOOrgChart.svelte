<script>
	import { onMount } from 'svelte';
	import { fade, scale, fly } from 'svelte/transition';

	// Leadership chain (Left column in the slide)
	const leadershipChain = [
		{
			id: 'mayor',
			name: 'Hon. Ma. Gina E. Merilo',
			position: 'Municipal Mayor',
			category: 'Appointing Authority',
			badge: 'Municipal Chief Executive',
			color: '#eab308', // amber/gold
			bgGlow: 'rgba(234, 179, 8, 0.25)',
			image: '/HRMO/mayor-merilo.png',
			bio: 'Chief Executive of the Municipality of Tanauan, Leyte, exercising executive governance, supervisory administration, and appointing authority over municipal personnel.',
			responsibilities: [
				'Exercises general supervision and control over all programs, projects, and activities of the municipal government',
				'Appoints municipal officials and employees in accordance with Civil Service laws and regulations',
				'Enforces all laws and ordinances relative to the governance of the municipality',
				'Ensures delivery of basic services and provision of adequate public facilities'
			],
			office: "Office of the Municipal Mayor, 2nd Floor, Tanauan Municipal Hall",
			schedule: 'Monday – Friday | 8:00 AM – 5:00 PM'
		},
		{
			id: 'admin',
			name: 'Atty. Ephrem S. Abando',
			position: 'Municipal Administrator',
			category: 'Executive Administration',
			badge: 'Office Administrator',
			color: '#38bdf8', // sky blue
			bgGlow: 'rgba(56, 189, 248, 0.25)',
			image: '/HRMO/admin-abando.png',
			bio: 'Oversees municipal administration, policy implementation, and departmental coordination across all local government offices.',
			responsibilities: [
				'Assists the Municipal Mayor in the general administration and management of the municipality',
				'Directs, controls, and oversees the work of all municipal department heads',
				'Coordinates internal municipal administrative processes and public delivery systems',
				'Formulates administrative policies and procedural guidelines for municipal employees'
			],
			office: "Office of the Municipal Administrator, Municipal Hall",
			schedule: 'Monday – Friday | 8:00 AM – 5:00 PM'
		},
		{
			id: 'hrmo-head',
			name: 'Atty. Federico C. Tizon',
			position: 'HRMO III',
			category: 'Department Head',
			badge: 'HRMO Head',
			color: '#60a5fa', // royal blue
			bgGlow: 'rgba(96, 165, 250, 0.25)',
			image: '/HRMO/hrmo-head-tizon.png',
			bio: 'Heads the Human Resource Management Office, managing talent acquisition, personnel welfare, and Civil Service Commission compliance.',
			responsibilities: [
				'Directs and oversees all personnel and human resource management programs and policies',
				'Ensures full compliance with Civil Service Commission (CSC) rules and regulations',
				'Administers employee welfare, merit promotion, disciplinary actions, and capacity building',
				'Spearheads HR modernization, records digitization, and performance management systems'
			],
			office: 'HRMO Office, 2nd Floor, Tanauan Municipal Hall',
			schedule: 'Monday – Friday | 8:00 AM – 5:00 PM'
		},
		{
			id: 'hrma',
			name: 'John Carlo A. Perez',
			position: 'HRMA',
			category: 'HR Management Assistant',
			badge: 'Technical Assistant',
			color: '#818cf8', // indigo
			bgGlow: 'rgba(129, 140, 248, 0.25)',
			image: '/HRMO/hrma-perez.png',
			bio: 'Assists in daily HR operations, appointments processing, leave administration, and employee database updates.',
			responsibilities: [
				'Assists in preparing appointments, service records, and plantillan reports',
				'Maintains and updates municipal employee 201 files and electronic HR databases',
				'Coordinates Civil Service submissions, clearances, and mandatory reportorial compliance',
				'Supports performance management evaluations and capacity development programs'
			],
			office: 'HRMO Office, 2nd Floor, Tanauan Municipal Hall',
			schedule: 'Monday – Friday | 8:00 AM – 5:00 PM'
		}
	];

	// Staff members (Right column connected via horizontal arrows)
	const staffMembers = [
		{
			id: 'demegillo',
			name: 'Emerson C. Demegillo',
			position: 'Clerk I',
			category: 'Administrative Staff',
			badge: 'Clerical Division',
			color: '#a78bfa', // purple
			bgGlow: 'rgba(167, 139, 250, 0.2)',
			image: '/HRMO/staff-demegillo.png',
			bio: 'Handles incoming and outgoing official correspondence, document filing, and administrative support within the HRMO.',
			responsibilities: [
				'Records and logs all incoming and outgoing documents, memoranda, and endorsements',
				'Processes travel orders, locator slips, and daily administrative requests',
				'Assists employees with standard document requests and personnel inquiries',
				'Maintains systematic clerical archiving and document retrieval systems'
			],
			office: 'HRMO Office, 2nd Floor, Tanauan Municipal Hall',
			schedule: 'Monday – Friday | 8:00 AM – 5:00 PM'
		},
		{
			id: 'ending',
			name: 'Ronjo R. Ending',
			position: 'Clerk I',
			category: 'Administrative Staff',
			badge: 'Clerical Division',
			color: '#34d399', // emerald
			bgGlow: 'rgba(52, 211, 153, 0.2)',
			image: '/HRMO/staff-ending.png',
			bio: 'Manages employee daily time records, leave card postings, and administrative personnel documentation.',
			responsibilities: [
				'Monitors and audits employee Daily Time Records (DTR) and biometric logs',
				'Updates and maintains leave ledger cards for municipal personnel',
				'Processes leave applications (Form 6) and coordinates salary deductions/credits',
				'Prepares certifications of leave credits and employment service records'
			],
			office: 'HRMO Office, 2nd Floor, Tanauan Municipal Hall',
			schedule: 'Monday – Friday | 8:00 AM – 5:00 PM'
		},
		{
			id: 'almarines',
			name: 'Melissa T. Almarines',
			position: 'Admin Aide I',
			category: 'Administrative Staff',
			badge: 'Support Services',
			color: '#fb923c', // orange
			bgGlow: 'rgba(251, 146, 60, 0.2)',
			image: '/HRMO/staff-almarines.png',
			bio: 'Provides essential administrative assistance, customer reception, and records maintenance for the department.',
			responsibilities: [
				'Assists municipal employees and general public visitors with frontline HR queries',
				'Maintains physical and digital archives of employee 201 records',
				'Assists in preparing logistics for employee orientations and seminars',
				'Maintains office supplies inventory and clerical records'
			],
			office: 'HRMO Office, 2nd Floor, Tanauan Municipal Hall',
			schedule: 'Monday – Friday | 8:00 AM – 5:00 PM'
		},
		{
			id: 'caonte',
			name: 'Diana D. Caonte',
			position: 'Clerical Aide',
			category: 'Administrative Staff',
			badge: 'Support Services',
			color: '#f472b6', // pink
			bgGlow: 'rgba(244, 114, 182, 0.2)',
			image: '/HRMO/staff-caonte.png',
			bio: 'Supports front-desk clerical transactions, document routing, and customer service assistance in the HRMO.',
			responsibilities: [
				'Receives and routes official HR papers, endorsements, and personnel clearances',
				'Assists in reproducing, organizing, and transmitting official HR circulars',
				'Provides support during municipal job recruitment and applicant screenings',
				'Facilitates inter-office communications between HRMO and municipal departments'
			],
			office: 'HRMO Office, 2nd Floor, Tanauan Municipal Hall',
			schedule: 'Monday – Friday | 8:00 AM – 5:00 PM'
		}
	];

	// Reactive state for selected modal person
	let selectedPerson = $state(null);
	let failedImages = $state(new Set());

	function openModal(person) {
		selectedPerson = person;
	}

	function closeModal() {
		selectedPerson = null;
	}

	function handleKeydown(e) {
		if (e.key === 'Escape' && selectedPerson) {
			closeModal();
		}
	}

	function markImageFailed(id) {
		failedImages.add(id);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- ORGANIZATIONAL CHART SECTION -->
<div class="relative w-full overflow-hidden rounded-3xl bg-gradient-to-b from-[#08162b] via-[#050f20] to-[#020712] p-4 text-white shadow-2xl sm:p-8 md:p-12 border border-slate-800">
	<!-- Subtle ambient glow effects -->
	<div class="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
	<div class="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"></div>

	<!-- Top Header matching the official presentation slide -->
	<div class="relative z-10 mb-8 flex flex-col items-center justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
		<!-- Left: Municipal Seal + Subtitle -->
		<div class="flex items-center gap-4">
			<img
				src="/HRMO/official-seal.png"
				alt="Municipality of Tanauan, Leyte Official Seal"
				class="h-16 w-16 rounded-full border-2 border-amber-400/80 bg-white/10 object-contain p-0.5 shadow-lg shadow-amber-400/20 sm:h-20 sm:w-20"
			/>
			<div>
				<div class="text-[11px] font-black tracking-widest text-amber-400 uppercase sm:text-xs">
					Municipality of Tanauan, Leyte
				</div>
				<div class="text-xs font-semibold text-slate-400 sm:text-sm">
					Human Resource Management Office (HRMO)
				</div>
			</div>
		</div>

		<!-- Center / Right Title: ORGANIZATIONAL STRUCTURE -->
		<div class="text-center sm:text-right">
			<h2 class="text-2xl font-black tracking-wider text-[#e6b764] sm:text-3xl lg:text-4xl" style="font-family: system-ui, -apple-system, sans-serif;">
				ORGANIZATIONAL STRUCTURE
			</h2>
			<div class="mt-1 flex items-center justify-center gap-2 sm:justify-end">
				<span class="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
				<span class="text-xs font-semibold text-slate-300">Click any person to view profile details</span>
			</div>
		</div>
	</div>

	<!-- MAIN CHART CONTAINER -->
	<div class="relative z-10 mx-auto max-w-6xl py-4">
		<!-- DESKTOP / TABLET VIEW (matching the slide hierarchy) -->
		<div class="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
			<!-- ============================================== -->
			<!-- LEFT COLUMN: LEADERSHIP CHAIN (Vertical Spine) -->
			<!-- ============================================== -->
			<div class="relative flex flex-col items-center space-y-10 lg:items-end lg:pr-10">
				<!-- Continuous vertical spine line (desktop only) -->
				<div class="pointer-events-none absolute top-12 bottom-12 right-[4.5rem] hidden w-1 bg-white/90 shadow-sm lg:block"></div>

				{#each leadershipChain as person, index (person.id)}
					<div class="relative flex w-full max-w-md items-center justify-between gap-4">
						<!-- Person text labels (to the left of avatar) -->
						<div class="flex-1 text-right">
							<h3 class="text-base font-bold text-white transition-colors duration-200 hover:text-amber-300 sm:text-lg">
								{person.name}
							</h3>
							<p class="text-xs font-medium text-slate-300 sm:text-sm">
								{person.position}
							</p>
							<span class="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-white/10">
								{person.badge}
							</span>
						</div>

						<!-- Interactive Circular Portrait Avatar -->
						<button
							type="button"
							onclick={() => openModal(person)}
							class="group relative z-10 flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white bg-slate-900 shadow-xl transition-all duration-300 hover:scale-110 hover:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/50 cursor-pointer sm:h-28 sm:w-28"
							style="box-shadow: 0 0 20px {person.bgGlow};"
							title="Click to view details for {person.name}"
						>
							{#if !failedImages.has(person.id)}
								<img
									src={person.image}
									alt={person.name}
									class="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
									onerror={() => markImageFailed(person.id)}
								/>
							{:else}
								<div class="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-indigo-900 font-black text-white text-xl">
									{person.name.split(' ').map(n => n[0]).filter(c => c && c.match(/[A-Z]/)).slice(0, 2).join('')}
								</div>
							{/if}

							<!-- Hover badge tooltip overlay -->
							<div class="pointer-events-none absolute -bottom-2 rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-black tracking-wider text-slate-950 uppercase opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100">
								VIEW
							</div>
						</button>
					</div>
				{/each}
			</div>

			<!-- ============================================== -->
			<!-- RIGHT COLUMN: ADMINISTRATIVE STAFF (Horizontal Arrows) -->
			<!-- ============================================== -->
			<div class="relative flex flex-col justify-around space-y-10 lg:pl-10">
				<!-- Horizontal branching connector line from left spine -->
				<div class="pointer-events-none absolute -left-10 top-[26%] bottom-[20%] hidden w-1 bg-white/90 lg:block"></div>

				{#each staffMembers as person (person.id)}
					<div class="relative flex w-full max-w-md items-center gap-4">
						<!-- Desktop Arrow pointing to avatar -->
						<div class="hidden items-center lg:flex -ml-10 w-10 shrink-0">
							<div class="h-1 w-6 bg-white/90"></div>
							<div class="h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white"></div>
						</div>

						<!-- Interactive Circular Portrait Avatar -->
						<button
							type="button"
							onclick={() => openModal(person)}
							class="group relative z-10 flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white bg-slate-900 shadow-xl transition-all duration-300 hover:scale-110 hover:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-400/50 cursor-pointer sm:h-28 sm:w-28"
							style="box-shadow: 0 0 20px {person.bgGlow};"
							title="Click to view details for {person.name}"
						>
							{#if !failedImages.has(person.id)}
								<img
									src={person.image}
									alt={person.name}
									class="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
									onerror={() => markImageFailed(person.id)}
								/>
							{:else}
								<div class="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 font-black text-white text-xl">
									{person.name.split(' ').map(n => n[0]).filter(c => c && c.match(/[A-Z]/)).slice(0, 2).join('')}
								</div>
							{/if}

							<!-- Hover badge tooltip overlay -->
							<div class="pointer-events-none absolute -bottom-2 rounded-full bg-sky-400 px-2 py-0.5 text-[9px] font-black tracking-wider text-slate-950 uppercase opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100">
								VIEW
							</div>
						</button>

						<!-- Person text labels (to the right of avatar) -->
						<div class="flex-1 text-left">
							<h3 class="text-base font-bold text-white transition-colors duration-200 hover:text-sky-300 sm:text-lg">
								{person.name}
							</h3>
							<p class="text-xs font-medium text-slate-300 sm:text-sm">
								{person.position}
							</p>
							<span class="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-white/10">
								{person.badge}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Footer Legend & Instructions -->
		<div class="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400">
			<div class="flex items-center gap-4">
				<span class="flex items-center gap-1.5">
					<span class="h-3 w-3 rounded-full bg-[#eab308]"></span>
					<span class="font-medium text-slate-300">Appointing Authority</span>
				</span>
				<span class="flex items-center gap-1.5">
					<span class="h-3 w-3 rounded-full bg-[#38bdf8]"></span>
					<span class="font-medium text-slate-300">Executive & HRMO Leadership</span>
				</span>
				<span class="flex items-center gap-1.5">
					<span class="h-3 w-3 rounded-full bg-[#a78bfa]"></span>
					<span class="font-medium text-slate-300">Administrative & Support Staff</span>
				</span>
			</div>
			<div class="font-semibold text-slate-400">
				Page 2 of Tanauan HRMO Structure
			</div>
		</div>
	</div>
</div>

<!-- ============================================== -->
<!-- INTERACTIVE PERSON PROFILE MODAL POPUP -->
<!-- ============================================== -->
{#if selectedPerson}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
		role="dialog"
		aria-modal="true"
		aria-labelledby="person-modal-title"
	>
		<!-- Dim / Blurred Backdrop -->
		<div
			class="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
			onclick={closeModal}
			transition:fade={{ duration: 200 }}
		></div>

		<!-- Modal Container -->
		<div
			class="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-[#0b1b36] via-[#09152b] to-[#050b17] text-white shadow-2xl"
			transition:scale={{ duration: 250, start: 0.92 }}
		>
			<!-- Top accent gradient line -->
			<div class="h-2 w-full" style="background: linear-gradient(90deg, {selectedPerson.color}, #38bdf8, #818cf8);"></div>

			<!-- Modal Header with Avatar -->
			<div class="relative flex items-start justify-between gap-4 p-6 sm:p-8 pb-4">
				<div class="flex items-center gap-4 sm:gap-6">
					<!-- Large avatar -->
					<div
						class="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white/90 bg-slate-900 shadow-xl sm:h-24 sm:w-24 overflow-hidden"
						style="box-shadow: 0 0 25px {selectedPerson.bgGlow};"
					>
						{#if !failedImages.has(selectedPerson.id)}
							<img
								src={selectedPerson.image}
								alt={selectedPerson.name}
								class="h-full w-full object-cover"
								onerror={() => markImageFailed(selectedPerson.id)}
							/>
						{:else}
							<div class="flex h-full w-full items-center justify-center bg-slate-800 text-2xl font-black text-white">
								{selectedPerson.name[0]}
							</div>
						{/if}
					</div>

					<!-- Titles & Name -->
					<div>
						<span
							class="inline-block rounded-full px-3 py-1 text-[10px] font-black tracking-wider uppercase"
							style="background-color: {selectedPerson.color}22; color: {selectedPerson.color}; border: 1px solid {selectedPerson.color}66;"
						>
							{selectedPerson.category}
						</span>
						<h2 id="person-modal-title" class="mt-1 text-xl font-black text-white sm:text-2xl">
							{selectedPerson.name}
						</h2>
						<p class="text-sm font-semibold text-slate-300">
							{selectedPerson.position}
						</p>
					</div>
				</div>

				<!-- Close Button -->
				<button
					type="button"
					onclick={closeModal}
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-slate-300 transition-colors hover:bg-white/20 hover:text-white focus:outline-none"
					aria-label="Close dialog"
				>
					<span class="text-xl font-bold">✕</span>
				</button>
			</div>

			<!-- Modal Body -->
			<div class="space-y-5 px-6 sm:px-8 py-4">
				<!-- Bio Statement -->
				<div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
					<div class="text-[10px] font-black uppercase tracking-wider text-slate-400">Profile Overview</div>
					<p class="mt-1 text-sm leading-relaxed text-slate-200">
						{selectedPerson.bio}
					</p>
				</div>

				<!-- Responsibilities List -->
				<div>
					<div class="mb-2 text-[11px] font-black uppercase tracking-wider text-amber-400">
						Key Duties & Official Responsibilities
					</div>
					<ul class="space-y-2">
						{#each selectedPerson.responsibilities as duty}
							<li class="flex items-start gap-2.5 text-xs text-slate-300 sm:text-sm">
								<span class="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-[10px] text-blue-400">✓</span>
								<span>{duty}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Office Info & Schedule Grid -->
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
					<div class="rounded-xl border border-white/10 bg-white/5 p-3">
						<div class="text-[10px] font-black uppercase tracking-wider text-slate-400">Official Office</div>
						<div class="mt-0.5 text-xs font-semibold text-slate-200">{selectedPerson.office}</div>
					</div>
					<div class="rounded-xl border border-white/10 bg-white/5 p-3">
						<div class="text-[10px] font-black uppercase tracking-wider text-slate-400">Public Service Hours</div>
						<div class="mt-0.5 text-xs font-semibold text-slate-200">{selectedPerson.schedule}</div>
					</div>
				</div>
			</div>

			<!-- Modal Footer -->
			<div class="flex items-center justify-between border-t border-white/10 bg-black/30 px-6 sm:px-8 py-4">
				<span class="text-xs font-medium text-slate-400">
					Tanauan Municipal Government • Official Roster
				</span>
				<button
					type="button"
					onclick={closeModal}
					class="rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-xs font-black text-white transition-colors hover:bg-white/20"
				>
					Close
				</button>
			</div>
		</div>
	</div>
{/if}
