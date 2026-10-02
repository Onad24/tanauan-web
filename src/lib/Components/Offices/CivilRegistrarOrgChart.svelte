<script>
	import { onMount } from 'svelte';
	import { fade, scale, fly } from 'svelte/transition';

	// ==========================================
	// OFFICIAL MUNICIPAL CIVIL REGISTRAR HIERARCHY
	// (Extracted directly from Official Tanauan PDF Structure)
	// ==========================================
	let orgData = $state({
		id: 'mayor',
		name: 'Hon. Ma. Gina E. Merilo',
		position: 'Local Chief Executive',
		roleCategory: 'Executive Governance',
		badge: 'Municipal Mayor',
		level: 1,
		color: '#f59e0b', // gold/amber
		glow: 'rgba(245, 158, 11, 0.3)',
		image: '/MCR/mayor-merilo.png',
		window: 'Executive Suite',
		office: "Office of the Municipal Mayor, 2nd Floor, Tanauan Municipal Hall",
		hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
		contact: 'mayor@tanauanleyte.gov.ph',
		overview:
			'Chief Executive of the Municipality of Tanauan, Leyte. Exercises executive authority, overall administrative supervision, and governance over municipal civil registration policies.',
		duties: [
			'Exercises general supervision and control over all municipal civil registry programs and projects',
			'Appoints municipal civil registrar staff in accordance with Civil Service and local laws',
			'Enforces all national laws, Civil Registry Law (Act No. 3753), and local ordinances',
			'Ensures accessible, modern, and transparent civil registration services for all Tanauananons'
		],
		services: [
			'Executive Civil Registry Approvals',
			'Municipal Solemnization of Marriages',
			'Inter-Agency Civil Policy Directives'
		],
		expanded: true,
		children: [
			{
				id: 'mcr-head',
				name: 'Vincent Francis A. Salvaña',
				position: 'Municipal Civil Registrar',
				roleCategory: 'Head of Office',
				badge: 'Department Head',
				level: 2,
				color: '#38bdf8', // sky blue
				glow: 'rgba(56, 189, 248, 0.3)',
				image: '/MCR/head-salvana.png',
				window: 'Head Executive Office',
				office: 'Office of the Municipal Civil Registrar, Ground Floor, Tanauan Town Hall',
				hours: 'Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)',
				contact: 'civilregistrar@tanauanleyte.gov.ph',
				overview:
					'Directs and manages the Office of the Municipal Civil Registrar pursuant to the Civil Registry Law (Act No. 3753), coordinating closely with the Philippine Statistics Authority (PSA).',
				duties: [
					'Administers the registration of vital events (births, marriages, deaths, legal instruments)',
					'Acts as quasi-judicial officer for petitions under Republic Act Nos. 9048 and 10172 (Clerical Errors & Gender/DOB Correction)',
					'Supervises the preservation, archiving, and periodic transmission of civil registry documents to PSA',
					'Signs and authenticates official civil registry documents, certifications, and transcripts'
				],
				services: [
					'RA 9048 & RA 10172 Petitions',
					'Court Decree Confirmations & Annotations',
					'Civil Certificate Verifications & PSA Transmittals'
				],
				expanded: true,
				children: [
					{
						id: 'clerk-parmo',
						name: 'Virginia T. Parmo',
						position: 'Clerk II',
						roleCategory: 'Senior Administrative Supervisor',
						badge: 'Lead Staff / Clerk II',
						level: 3,
						color: '#a855f7', // purple
						glow: 'rgba(168, 85, 247, 0.3)',
						image: '/MCR/clerk-parmo.png',
						window: 'Window 1 — Senior Review Desk',
						office: 'Office of the Municipal Civil Registrar, Ground Floor, Tanauan Town Hall',
						hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
						contact: 'civilregistrar@tanauanleyte.gov.ph',
						overview:
							'Senior Civil Registry Clerk supervising document compliance, queue triage, PSA transmittals, and overall operational workflow among registration frontline clerks.',
						duties: [
							'Conducts initial and senior review of incoming registration documents for accuracy and completeness',
							'Coordinates monthly transmittals of certified vital registries to the Philippine Statistics Authority',
							'Assists the Municipal Civil Registrar in managing caseloads for administrative corrections',
							'Supervises records retrieval, physical file indexing, and certified true copy issuance'
						],
						services: [
							'Senior Document Verification & Auditing',
							'PSA Transmittal Compilation & Tracking',
							'Certified True Copy (CTC) Issuance Supervision'
						],
						expanded: true,
						children: [
							{
								id: 'clerk-bibar',
								name: 'Ma. Cyril C. Bibar',
								position: 'Clerk',
								roleCategory: 'Birth Registration & Legitimation',
								badge: 'Frontline Clerk',
								level: 4,
								color: '#10b981', // emerald
								glow: 'rgba(16, 185, 129, 0.3)',
								image: '/MCR/clerk-bibar.png',
								window: 'Window 2 — Birth Records Unit',
								office: 'Office of the Municipal Civil Registrar, Ground Floor, Tanauan Town Hall',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'civilregistrar@tanauanleyte.gov.ph',
								overview:
									'Responsible for processing Certificates of Live Birth (COLB), delayed birth registrations, acknowledgments, legitimations, and father surname affidavits (AUSF).',
								duties: [
									'Receives and verifies Certificates of Live Birth from hospitals, clinics, and traditional birth attendants',
									'Processes delayed birth registration applications and evaluates supporting documentary proofs',
									'Assists parents with Affidavits to Use the Surname of the Father (AUSF) and Legitimation paperwork',
									'Encodes vital birth records into the municipal electronic civil database'
								],
								services: [
									'Timely & Delayed Birth Registration',
									'Legitimation & AUSF Processing',
									'Birth Certificate Certified Transcripts'
								],
								expanded: false,
								children: []
							},
							{
								id: 'clerk-cordero',
								name: 'Philip P. Cordero',
								position: 'Clerk',
								roleCategory: 'Marriage Records & Legal Instruments',
								badge: 'Frontline Clerk',
								level: 4,
								color: '#06b6d4', // cyan / teal
								glow: 'rgba(6, 182, 212, 0.3)',
								image: '/MCR/clerk-cordero.png',
								window: 'Window 3 — Marriage & Legal Desk',
								office: 'Office of the Municipal Civil Registrar, Ground Floor, Tanauan Town Hall',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'civilregistrar@tanauanleyte.gov.ph',
								overview:
									'Facilitates marriage license applications, 10-day notice postings, registration of solemnized Certificates of Marriage, and foreign/legal court decree annotations.',
								duties: [
									'Receives sworn applications for Marriage License and reviews supporting documents (PSA Birth, CENOMAR, PMC)',
									'Facilitates the mandatory 10-day continuous public posting period for marriage license notices',
									'Registers certificates of marriage solemnized by the Mayor, judges, and authorized religious solemnizers',
									'Registers legal instruments, supplemental reports, and court orders affecting civil status'
								],
								services: [
									'Application for Marriage License (AML)',
									'Certificate of Marriage Registration',
									'Legal Instruments & Supplemental Entries'
								],
								expanded: false,
								children: []
							},
							{
								id: 'clerk-buendia',
								name: 'Jovey Ann B. Buendia',
								position: 'Clerk',
								roleCategory: 'Death Records & Archive Management',
								badge: 'Frontline Clerk',
								level: 4,
								color: '#f97316', // orange / amber
								glow: 'rgba(249, 115, 22, 0.3)',
								image: '/MCR/clerk-buendia.png',
								window: 'Window 4 — Death Registry & Archive',
								office: 'Office of the Municipal Civil Registrar, Ground Floor, Tanauan Town Hall',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'civilregistrar@tanauanleyte.gov.ph',
								overview:
									'Handles registration of death events, transit and transfer permits, cemetery verification coordination, and physical/digital civil registry archiving.',
								duties: [
									'Receives and processes Certificates of Death (COD), verifying physician and sanitary inspector signatures',
									'Issues burial, cremation, and transfer permits for human remains',
									'Maintains physical book registers and digitizes historical civil records into electronic archives',
									'Assists public search requests for historical and ancestral civil registry books'
								],
								services: [
									'Registration of Death & Fetal Death',
									'Burial & Transfer Permit Issuance',
									'Historical Civil Archive Search & Certification'
								],
								expanded: false,
								children: []
							}
						]
					}
				]
			}
		]
	});

	// ==========================================
	// COMPONENT STATE & CONTROLS
	// ==========================================
	let searchQuery = $state('');
	let selectedPerson = $state(null);
	let viewMode = $state('grid'); // 'grid' (Role Roster) | 'tree' (Tree Hierarchy)
	let zoomScale = $state(1);
	let panOffset = $state({ x: 0, y: 0 });
	let isPanning = $state(false);
	let panStart = $state({ x: 0, y: 0 });
	let failedImages = $state(new Set());

	// Flatten all personnel for search & grid view
	function flatten(node, list = []) {
		list.push(node);
		if (node.children) {
			node.children.forEach((c) => flatten(c, list));
		}
		return list;
	}

	const allPersonnel = $derived(flatten(orgData));

	// Search filter match
	function matchesSearch(person, query) {
		if (!query.trim()) return true;
		const q = query.toLowerCase().trim();
		return (
			person.name.toLowerCase().includes(q) ||
			person.position.toLowerCase().includes(q) ||
			person.roleCategory.toLowerCase().includes(q) ||
			person.badge.toLowerCase().includes(q) ||
			(person.services && person.services.some((s) => s.toLowerCase().includes(q))) ||
			(person.duties && person.duties.some((d) => d.toLowerCase().includes(q)))
		);
	}

	// Toggle node expansion
	function toggleExpand(node) {
		node.expanded = !node.expanded;
	}

	// Expand / Collapse All
	function setAllExpanded(node, state) {
		node.expanded = state;
		if (node.children) {
			node.children.forEach((c) => setAllExpanded(c, state));
		}
	}

	function expandAll() {
		setAllExpanded(orgData, true);
	}

	function collapseAll() {
		setAllExpanded(orgData, false);
		orgData.expanded = true; // keep root visible
	}

	// Zoom Controls
	function zoomIn() {
		zoomScale = Math.min(zoomScale + 0.15, 1.8);
	}

	function zoomOut() {
		zoomScale = Math.max(zoomScale - 0.15, 0.6);
	}

	function resetZoom() {
		zoomScale = 1;
		panOffset = { x: 0, y: 0 };
	}

	// Drag & Pan handlers
	function startPan(e) {
		if (e.target.closest('button') || e.target.closest('input')) return;
		isPanning = true;
		panStart = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
	}

	function doPan(e) {
		if (!isPanning) return;
		panOffset = { x: e.clientX - panStart.x, y: e.clientY - panStart.y };
	}

	function endPan() {
		isPanning = false;
	}

	// Modal handlers
	function openDetail(person) {
		selectedPerson = person;
	}

	function closeDetail() {
		selectedPerson = null;
	}

	function handleKeydown(e) {
		if (e.key === 'Escape' && selectedPerson) {
			closeDetail();
		}
	}

	function onImgError(id) {
		failedImages.add(id);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- MAIN ORGANIZATIONAL CHART WRAPPER -->
<div class="relative w-full overflow-hidden rounded-3xl border-2 border-slate-800 bg-gradient-to-b from-[#09182f] via-[#061226] to-[#030914] p-4 sm:p-8 md:p-10 text-white shadow-2xl">
	<!-- Anti-Gravity Atmospheric Glow Lights -->
	<div class="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl animate-pulse" style="animation-duration: 8s;"></div>
	<div class="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl animate-pulse" style="animation-duration: 10s;"></div>
	<div class="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl animate-pulse" style="animation-duration: 7s;"></div>

	<!-- ============================================== -->
	<!-- HEADER: OFFICIAL SEALS & TITLE -->
	<!-- ============================================== -->
	<div class="relative z-10 mb-8 flex flex-col items-center justify-between gap-6 border-b border-white/10 pb-6 lg:flex-row">
		<!-- Left: Municipal & MCR Seals -->
		<div class="flex items-center gap-4 sm:gap-5">
			<div class="relative flex items-center gap-2">
				<img
					src="/HRMO/official-seal.png"
					alt="Municipality of Tanauan Official Seal"
					class="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-amber-400/80 bg-white/10 object-contain p-1 shadow-lg shadow-amber-500/20"
				/>
				<img
					src="/MCR/mcr-seal.png"
					alt="Municipal Civil Registrar's Office Seal"
					class="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-sky-400/80 bg-white/10 object-contain p-1 shadow-lg shadow-sky-500/20"
				/>
			</div>
			<div>
				<span class="text-[11px] font-black uppercase tracking-widest text-amber-400 sm:text-xs">
					Municipality of Tanauan, Leyte
				</span>
				<h2 class="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
					Municipal Civil Registrar’s Office
				</h2>
				<p class="text-xs sm:text-sm font-semibold text-sky-200/80">
					Official Organizational Structure & Vital Registry Hierarchy
				</p>
			</div>
		</div>

		<!-- Right: Quick Stat Badges -->
		<div class="flex flex-wrap items-center gap-2.5 sm:gap-3">
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Total Personnel</span>
				<span class="text-sm font-black text-amber-300">6 Active Officials</span>
			</div>
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Civil Registry Law</span>
				<span class="text-sm font-black text-emerald-400">Act No. 3753</span>
			</div>
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Civil Service</span>
				<span class="text-sm font-black text-sky-400">100% Regular Roster</span>
			</div>
		</div>
	</div>

	<!-- ============================================== -->
	<!-- ============================================== -->
	<!-- INTERACTIVE TOOLBAR: SEARCH, VIEW TOGGLE, ZOOM -->
	<!-- ============================================== -->
	<div class="relative z-10 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 p-3.5 backdrop-blur-md shadow-lg">
		<!-- Search Input with Live Filter -->
		<div class="relative flex-1 max-w-md">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search by name, role, division, service (e.g. Birth, Marriage, Death, Salvaña)..."
				class="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 shadow-inner outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
			/>
			{#if searchQuery}
				<button
					type="button"
					onclick={() => (searchQuery = '')}
					class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white"
				>Clear</button>
			{/if}
		</div>

		<!-- View Modes & Canvas Controls -->
		<div class="flex flex-wrap items-center gap-2">
			<!-- View Mode Toggle: Role Roster first, Tree Hierarchy second -->
			<div class="flex rounded-xl border border-white/20 bg-slate-900/80 p-1">
				<button
					type="button"
					onclick={() => (viewMode = 'grid')}
					class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all {viewMode === 'grid' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'}"
				>
					Role Roster
				</button>
				<button
					type="button"
					onclick={() => (viewMode = 'tree')}
					class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all {viewMode === 'tree' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'}"
				>
					Tree Hierarchy
				</button>
			</div>

			<!-- Tree Canvas Controls (available when in tree mode) -->
			{#if viewMode === 'tree'}
				<!-- Expand / Collapse All -->
				<button
					type="button"
					onclick={expandAll}
					class="rounded-xl border border-white/15 bg-white/5 px-2.5 py-2 text-xs font-bold text-slate-300 hover:bg-white/15 hover:text-white transition-colors"
					title="Expand all nodes"
				>
					Expand
				</button>
				<button
					type="button"
					onclick={collapseAll}
					class="rounded-xl border border-white/15 bg-white/5 px-2.5 py-2 text-xs font-bold text-slate-300 hover:bg-white/15 hover:text-white transition-colors"
					title="Collapse branches"
				>
					Collapse
				</button>

				<!-- Zoom Controls -->
				<div class="flex items-center rounded-xl border border-white/20 bg-slate-900/80 p-1">
					<button
						type="button"
						onclick={zoomOut}
						class="h-8 w-8 rounded-lg text-sm font-black text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center"
						title="Zoom Out"
					>-</button>
					<span class="px-2 text-xs font-mono font-bold text-amber-300">
						{Math.round(zoomScale * 100)}%
					</span>
					<button
						type="button"
						onclick={zoomIn}
						class="h-8 w-8 rounded-lg text-sm font-black text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center"
						title="Zoom In"
					>+</button>
					<button
						type="button"
						onclick={resetZoom}
						class="ml-1 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
						title="Reset Zoom to 100%"
					>
						Reset
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- ============================================== -->
	<!-- GRID VIEW: ROLE ROSTER (ALWAYS SHOWN FIRST)   -->
	<!-- ============================================== -->
	{#if viewMode === 'grid'}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
			{#each allPersonnel as person (person.id)}
				{#if matchesSearch(person, searchQuery)}
					<div
						role="button"
						tabindex="0"
						onclick={() => openDetail(person)}
						onkeydown={(e) => e.key === 'Enter' && openDetail(person)}
						class="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-102 hover:border-amber-400 cursor-pointer"
						style="box-shadow: 0 10px 30px {person.glow};"
					>
						<div class="flex items-start gap-4">
							<!-- Circular Portrait -->
							<div class="relative h-18 w-18 shrink-0 overflow-hidden rounded-2xl border-2 border-white/80 bg-slate-900 shadow-md">
								{#if !failedImages.has(person.id)}
									<img
										src={person.image}
										alt={person.name}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
										onerror={() => onImgError(person.id)}
									/>
								{:else}
									<div class="flex h-full w-full items-center justify-center font-black text-xl text-white" style="background: {person.color};">
										{person.name.split(' ').map((n) => n[0]).filter((c) => c && c.match(/[A-Z]/)).slice(0, 2).join('')}
									</div>
								{/if}
							</div>

							<div>
								<span
									class="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider"
									style="background-color: {person.color}25; color: {person.color}; border: 1px solid {person.color}66;"
								>
									{person.badge}
								</span>
								<h3 class="mt-1 text-base font-black text-white group-hover:text-amber-300 transition-colors">
									{person.name}
								</h3>
								<p class="text-xs font-bold text-sky-200">
									{person.position}
								</p>
								<p class="mt-1 text-[11px] font-medium text-slate-400">
									{person.window}
								</p>
							</div>
						</div>

						<div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-slate-300">
							<span class="text-slate-400">{person.roleCategory}</span>
							<span class="text-amber-400 group-hover:underline transition-all">View Profile</span>
						</div>
					</div>
				{/if}
			{/each}
		</div>

	<!-- ============================================== -->
	<!-- MAIN CANVAS VIEWPORT (TREE HIERARCHY)         -->
	<!-- ============================================== -->
	{:else}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative min-h-[640px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-8 cursor-grab active:cursor-grabbing select-none"
			onmousedown={startPan}
			onmousemove={doPan}
			onmouseup={endPan}
			onmouseleave={endPan}
		>
			<!-- Draggable / Zoomable Transform Container with Anti-Gravity Float -->
			<div
				class="flex flex-col items-center justify-start transition-transform duration-100 ease-out py-6"
				style="transform: translate({panOffset.x}px, {panOffset.y}px) scale({zoomScale}); transform-origin: top center;"
			>
				<!-- ============================================== -->
				<!-- LEVEL 1: LOCAL CHIEF EXECUTIVE (ROOT) -->
				<!-- ============================================== -->
				<div class="relative flex flex-col items-center">
					<!-- Node Card: Mayor Merilo -->
					{@render nodeCard(orgData)}

					<!-- Branch Connector downward if expanded -->
					{#if orgData.expanded && orgData.children && orgData.children.length > 0}
						<div class="relative flex flex-col items-center">
							<!-- Vertical connection line with gold pulse -->
							<div class="h-10 w-1 bg-gradient-to-b from-amber-400 to-sky-400 shadow-sm shadow-amber-400/50"></div>

							<!-- ============================================== -->
							<!-- LEVEL 2: MUNICIPAL CIVIL REGISTRAR -->
							<!-- ============================================== -->
							{#each orgData.children as mcr (mcr.id)}
								<div class="relative flex flex-col items-center">
									{@render nodeCard(mcr)}

									<!-- Connector to Level 3 if expanded -->
									{#if mcr.expanded && mcr.children && mcr.children.length > 0}
										<div class="relative flex flex-col items-center">
											<div class="h-10 w-1 bg-gradient-to-b from-sky-400 to-purple-400 shadow-sm shadow-sky-400/50"></div>

											<!-- ============================================== -->
											<!-- LEVEL 3: CLERK II (SUPERVISOR) -->
											<!-- ============================================== -->
											{#each mcr.children as clerk2 (clerk2.id)}
												<div class="relative flex flex-col items-center">
													{@render nodeCard(clerk2)}

													<!-- Horizontal Branching to Level 4 if expanded -->
													{#if clerk2.expanded && clerk2.children && clerk2.children.length > 0}
														<div class="relative flex flex-col items-center w-full pt-10">
															<!-- Top stem line -->
															<div class="absolute top-0 h-8 w-1 bg-purple-400 shadow-sm shadow-purple-400/50"></div>

															<!-- Horizontal connecting bar across frontline clerks -->
															<div class="relative flex items-start justify-center gap-6 sm:gap-10 pt-4">
																<!-- Horizontal crossbar spanning the 3 clerks -->
																<div class="pointer-events-none absolute top-0 left-12 right-12 h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 shadow-sm"></div>

																<!-- ============================================== -->
																<!-- LEVEL 4: FRONTLINE CLERKS (BIRTH, MARRIAGE, DEATH) -->
																<!-- ============================================== -->
																{#each clerk2.children as clerk (clerk.id)}
																	<div class="relative flex flex-col items-center">
																		<!-- Vertical drop line from horizontal bar to card -->
																		<div class="h-6 w-1" style="background-color: {clerk.color};"></div>
																		{@render nodeCard(clerk)}
																	</div>
																{/each}
															</div>
														</div>
													{/if}
												</div>
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	<!-- ============================================== -->
	<!-- FOOTER LEGEND & INSTRUCTIONS -->
	<!-- ============================================== -->
	<div class="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400">
		<div class="flex flex-wrap items-center gap-4">
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#f59e0b] shadow-sm shadow-amber-400/50"></span>
				<span class="font-bold text-slate-200">Executive Authority</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#38bdf8] shadow-sm shadow-sky-400/50"></span>
				<span class="font-bold text-slate-200">Municipal Civil Registrar</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#a855f7] shadow-sm shadow-purple-400/50"></span>
				<span class="font-bold text-slate-200">Supervisory Staff (Clerk II)</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#10b981] shadow-sm shadow-emerald-400/50"></span>
				<span class="font-bold text-slate-200">Frontline Registry Clerks</span>
			</span>
		</div>
		<div class="flex items-center gap-2 text-slate-400 font-semibold">
			<span class="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
			<span>Click any node to view official duties, contact & services</span>
		</div>
	</div>
</div>

<!-- ============================================== -->
<!-- REUSABLE SNIPPET: NODE CARD COMPONENT -->
<!-- ============================================== -->
{#snippet nodeCard(person)}
	{@const isMatch = matchesSearch(person, searchQuery)}
	{@const hasQuery = searchQuery.trim().length > 0}
	{@const hasChildren = person.children && person.children.length > 0}

	<div
		class="relative flex flex-col items-center transition-all duration-300"
		style="opacity: {hasQuery && !isMatch ? 0.35 : 1}; transform: {hasQuery && isMatch ? 'scale(1.05)' : 'scale(1)'};"
	>
		<!-- Anti-Gravity Floating Card Container -->
		<div
			role="button"
			tabindex="0"
			onclick={() => openDetail(person)}
			onkeydown={(e) => e.key === 'Enter' && openDetail(person)}
			class="group relative flex w-64 sm:w-72 flex-col items-center rounded-3xl border-2 border-white/20 bg-gradient-to-b from-[#112444]/90 via-[#0c1a33]/90 to-[#071021]/95 p-4 sm:p-5 backdrop-blur-md shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-2xl cursor-pointer"
			style="box-shadow: 0 12px 30px -5px {person.glow};"
		>
			<!-- Ambient Card Corner Highlight -->
			<div class="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-30 blur-xl" style="background-color: {person.color};"></div>

			<!-- Official Portrait Avatar Frame -->
			<div
				class="relative mb-3 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center overflow-hidden rounded-2xl border-3 border-white/90 bg-slate-900 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-amber-400"
				style="box-shadow: 0 0 20px {person.glow};"
			>
				{#if !failedImages.has(person.id)}
					<img
						src={person.image}
						alt={person.name}
						class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						onerror={() => onImgError(person.id)}
					/>
				{:else}
					<div class="flex h-full w-full items-center justify-center font-black text-2xl text-white" style="background: {person.color};">
						{person.name.split(' ').map((n) => n[0]).filter((c) => c && c.match(/[A-Z]/)).slice(0, 2).join('')}
					</div>
				{/if}

				<!-- Tooltip Pill -->
				<span class="pointer-events-none absolute -bottom-1 rounded-full bg-amber-400 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-950 opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100">
					PROFILE
				</span>
			</div>

			<!-- Person Role Badge -->
			<span
				class="mb-1.5 inline-block rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-xs"
				style="background-color: {person.color}25; color: {person.color}; border: 1px solid {person.color}80;"
			>
				{person.badge}
			</span>

			<!-- Full Name -->
			<h3 class="text-center text-sm sm:text-base font-black text-white leading-tight transition-colors group-hover:text-amber-300">
				{person.name}
			</h3>

			<!-- Official Position -->
			<p class="mt-0.5 text-center text-xs font-bold text-sky-200">
				{person.position}
			</p>

			<!-- Assignment / Window Badge -->
			<div class="mt-2.5 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-slate-300">
				<span class="truncate max-w-[190px]">{person.window}</span>
			</div>

			<!-- Expand / Collapse Branch Toggle Button -->
			{#if hasChildren}
				<button
					type="button"
					onclick={(e) => {
						e.stopPropagation();
						toggleExpand(person);
					}}
					class="absolute -bottom-3 flex h-6 items-center gap-1 rounded-full border-2 border-white/80 bg-slate-900 px-2.5 text-[10px] font-black shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
					style="color: {person.color};"
					title={person.expanded ? 'Collapse Sub-branch' : 'Expand Sub-branch'}
				>
					<span>{person.expanded ? '−' : '+'}</span>
					<span>{person.children.length} {person.children.length === 1 ? 'branch' : 'branches'}</span>
				</button>
			{/if}
		</div>
	</div>
{/snippet}

<!-- ============================================== -->
<!-- INTERACTIVE PERSON PROFILE DETAIL MODAL -->
<!-- ============================================== -->
{#if selectedPerson}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
		role="dialog"
		aria-modal="true"
		aria-labelledby="person-detail-title"
		tabindex="-1"
		onkeydown={(e) => e.key === 'Escape' && closeDetail()}
	>
		<!-- Dim / Blurred Backdrop -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute inset-0 bg-blue-950/80 backdrop-blur-md transition-opacity"
			onclick={closeDetail}
			transition:fade={{ duration: 200 }}
		></div>

		<!-- Modal Container -->
		<div
			class="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border-2 border-white/20 bg-gradient-to-b from-[#0b1c38] via-[#08152c] to-[#040b17] text-white shadow-2xl"
			transition:scale={{ duration: 250, start: 0.92 }}
		>
			<!-- Top accent gradient line -->
			<div class="h-2 w-full" style="background: linear-gradient(90deg, {selectedPerson.color}, #38bdf8, #a855f7);"></div>

			<!-- Modal Header with Portrait & Titles -->
			<div class="relative flex items-start justify-between gap-4 p-6 sm:p-8 pb-4">
				<div class="flex items-center gap-4 sm:gap-6">
					<!-- Large avatar frame -->
					<div
						class="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white/90 bg-slate-900 shadow-xl sm:h-24 sm:w-24"
						style="box-shadow: 0 0 25px {selectedPerson.glow};"
					>
						{#if !failedImages.has(selectedPerson.id)}
							<img
								src={selectedPerson.image}
								alt={selectedPerson.name}
								class="h-full w-full object-cover"
								onerror={() => onImgError(selectedPerson.id)}
							/>
						{:else}
							<div class="flex h-full w-full items-center justify-center text-2xl font-black text-white" style="background: {selectedPerson.color};">
								{selectedPerson.name[0]}
							</div>
						{/if}
					</div>

					<!-- Titles & Name -->
					<div>
						<span
							class="inline-block rounded-full px-3 py-1 text-[10px] font-black tracking-wider uppercase"
							style="background-color: {selectedPerson.color}25; color: {selectedPerson.color}; border: 1px solid {selectedPerson.color}66;"
						>
							{selectedPerson.roleCategory}
						</span>
						<h2 id="person-detail-title" class="mt-1 text-xl font-black text-white sm:text-2xl leading-tight">
							{selectedPerson.name}
						</h2>
						<p class="text-sm font-bold text-sky-200">
							{selectedPerson.position} • {selectedPerson.badge}
						</p>
					</div>
				</div>

				<!-- Close Button -->
				<button
					type="button"
					onclick={closeDetail}
					class="flex h-9 px-3.5 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xs font-bold text-slate-300 transition-colors hover:bg-white/20 hover:text-white focus:outline-none cursor-pointer"
					aria-label="Close dialog"
				>
					Close
				</button>
			</div>

			<!-- Modal Body Content -->
			<div class="space-y-4 px-6 sm:px-8 py-4 max-h-[60vh] overflow-y-auto">
				<!-- Bio / Role Overview -->
				<div class="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
					<div class="text-[10px] font-black uppercase tracking-wider text-amber-400">Official Profile Overview</div>
					<p class="mt-1 text-xs sm:text-sm leading-relaxed text-slate-200 font-medium">
						{selectedPerson.overview}
					</p>
				</div>

				<!-- Key Duties & Responsibilities -->
				<div>
					<div class="mb-2 text-[11px] font-black uppercase tracking-wider text-sky-300">
						Key Duties & Official Responsibilities
					</div>
					<ul class="space-y-2">
						{#each selectedPerson.duties as duty}
							<li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
								<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400"></span>
								<span>{duty}</span>
							</li>
						{/each}
					</ul>
				</div>

				<!-- Civil Registry Services Handled -->
				{#if selectedPerson.services && selectedPerson.services.length > 0}
					<div>
						<div class="mb-2 text-[11px] font-black uppercase tracking-wider text-emerald-400">
							Civil Registry Frontline Services Handled
						</div>
						<div class="flex flex-wrap gap-2">
							{#each selectedPerson.services as svc}
								<span class="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-200">
									{svc}
								</span>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Location & Service Hours Grid -->
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
					<div class="rounded-xl border border-white/10 bg-white/5 p-3">
						<div class="text-[10px] font-black uppercase tracking-wider text-slate-400">Service Desk / Office</div>
						<div class="mt-0.5 text-xs font-bold text-slate-200">{selectedPerson.window}</div>
						<div class="mt-0.5 text-[11px] text-slate-400 truncate">{selectedPerson.office}</div>
					</div>
					<div class="rounded-xl border border-white/10 bg-white/5 p-3">
						<div class="text-[10px] font-black uppercase tracking-wider text-slate-400">Public Consultation Hours</div>
						<div class="mt-0.5 text-xs font-bold text-slate-200">{selectedPerson.hours}</div>
						<div class="mt-0.5 text-[11px] text-amber-300 font-mono">{selectedPerson.contact}</div>
					</div>
				</div>
			</div>

			<!-- Modal Footer -->
			<div class="flex items-center justify-between border-t border-white/10 bg-black/40 px-6 sm:px-8 py-4">
				<span class="text-xs font-bold text-slate-400">
					Tanauan Municipal Government • Municipal Civil Registrar
				</span>
				<div class="flex items-center gap-2">
					<a
						href="/citizens-charter/civil-registrar"
						class="rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-xs font-black text-amber-300 hover:bg-amber-400/20 transition-colors"
					>
						Citizen's Charter
					</a>
					<button
						type="button"
						onclick={closeDetail}
						class="rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-xs font-black text-white hover:bg-white/20 transition-colors cursor-pointer"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
