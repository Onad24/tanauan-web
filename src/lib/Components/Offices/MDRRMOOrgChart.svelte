<script>
	import { fade, scale, fly } from 'svelte/transition';

	// ==========================================
	// OFFICIAL MDRRMO TANAUAN HIERARCHY
	// (Extracted directly from Official Tanauan PDF Structure)
	// ==========================================
	let orgData = $state({
		id: 'mayor',
		name: 'Hon. Gina E. Merilo',
		position: 'Municipal Mayor',
		roleCategory: 'Executive Governance',
		badge: 'MDRRM Chairman',
		level: 1,
		color: '#f59e0b', // gold/amber
		glow: 'rgba(245, 158, 11, 0.35)',
		image: '/MCR/mayor-merilo.png',
		window: 'Executive Suite',
		office: 'Office of the Municipal Mayor, 2nd Floor, Tanauan Municipal Hall',
		hours: 'Monday – Friday | 8:00 AM – 5:00 PM (24/7 Crisis Command)',
		contact: 'mayor@tanauanleyte.gov.ph',
		overview:
			'Chairperson of the Municipal Disaster Risk Reduction and Management Council (MDRRMC). Directs comprehensive disaster risk reduction policies, institutional emergency declarations, and executive command during calamities pursuant to RA 10121.',
		duties: [
			'Exercises executive command and control over the Municipal Disaster Risk Reduction and Management Council',
			'Declares localized state of calamity or emergency response mobilizations upon Council recommendation',
			'Approves the annual Local Disaster Risk Reduction and Management Plan (LDRRMP) and Fund (LDRRMF) allocation',
			'Spearheads municipal multi-agency coordination with the NDRRMC, OCD, PDRRMO, and national security forces'
		],
		services: [
			'Executive Crisis Command Directives',
			'LDRRMC Council Leadership & Policy Approvals',
			'Municipal Calamity Assistance Declarations'
		],
		expanded: true,
		advisor: {
			id: 'sb-drrm',
			name: 'Hon. Mark Christian L. Gimenez',
			position: 'Sangguniang Bayan Member',
			roleCategory: 'Legislative Policy',
			badge: 'SB DRRM Committee',
			level: 1.5,
			color: '#3b82f6', // blue
			glow: 'rgba(59, 130, 246, 0.3)',
			image: '/officials/gimenez.jpg',
			window: 'Legislative Suite',
			office: 'Sangguniang Bayan Session Hall, Tanauan Municipal Hall',
			hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
			contact: 'sb@tanauanleyte.gov.ph',
			overview:
				'Chairman of the Committee on Disaster Risk Reduction and Management in the Sangguniang Bayan of Tanauan. Sponsors local disaster legislation, emergency fund appropriations, and legislative oversight.',
			duties: [
				'Drafts and sponsors municipal ordinances on disaster resilience, hazard mitigation, and environmental safety',
				'Conducts legislative reviews of the Local Disaster Risk Reduction and Management Fund (LDRRMF)',
				'Oversees municipal compliance with the Philippine Disaster Risk Reduction and Management Act (RA 10121)'
			],
			services: [
				'Legislative DRRM Policy Formulation',
				'Local DRRM Fund Review & Appropriation',
				'Committee Hearings & Public Safety Ordinances'
			]
		},
		children: [
			{
				id: 'mdrrm-officer',
				name: 'Ricardo Alejo N. Mazo',
				position: 'MDRRM Officer',
				roleCategory: 'Department Head & EOC Director',
				badge: 'Department Head',
				level: 2,
				color: '#ea580c', // safety orange
				glow: 'rgba(234, 88, 12, 0.4)',
				image: '/images/org-charts/mdrrmo/mazo.jpg',
				window: 'MDRRMO Command Desk',
				office: 'MDRRMO Operations Center, Tanauan Municipal Hall Complex',
				hours: '24/7 Incident Command • Office: Mon – Fri | 8:00 AM – 5:00 PM',
				contact: 'mdrrmo@tanauanleyte.gov.ph',
				overview:
					'Directs and superintends the Tanauan Municipal Disaster Risk Reduction and Management Office (MDRRMO). Leads the 24/7 Emergency Operations Center (EOC), Incident Command System (ICS), and Tanauan Emergency Response Team.',
				duties: [
					'Directs 24/7 disaster preparedness, mitigation, response, and rehabilitation programs across 54 barangays',
					'Activates and commands the Tanauan Emergency Operations Center (EOC) during weather disturbances and emergencies',
					'Formulates and implements the comprehensive Local Disaster Risk Reduction and Management Plan (LDRRMP)',
					'Supervises search, rescue, medical evacuation, relief logistics, and emergency dispatch operations'
				],
				services: [
					'Incident Command System (ICS) Activation',
					'24/7 Emergency Operations Center Directives',
					'Disaster Preparedness & Evacuation Staging'
				],
				expanded: true,
				children: [
					{
						id: 'admin-training',
						name: 'Marco Jemsboy Arcena',
						position: 'Admin and Training Officer',
						roleCategory: 'Administration & Capacity Building',
						badge: 'Admin & Training',
						level: 3,
						color: '#8b5cf6', // purple
						glow: 'rgba(139, 92, 246, 0.35)',
						image: '',
						window: 'Admin & Training Desk',
						office: 'MDRRMO Operations Center, Tanauan Municipal Hall Complex',
						hours: 'Monday – Friday | 8:00 AM – 5:00 PM (On-Call Emergencies)',
						contact: 'mdrrmo@tanauanleyte.gov.ph',
						overview:
							'Oversees administrative services, personnel records, community DRRM training programs, school and barangay disaster preparedness modules, and evacuation drill coordination.',
						duties: [
							'Plans and conducts community-based disaster risk reduction and management (CBDRRM) seminars',
							'Coordinates quarterly Nationwide Simultaneous Earthquake Drills (NSED) and fire safety exercises',
							'Manages official personnel rosters, administrative correspondence, and equipment inventory',
							'Organizes Basic Life Support (BLS), first aid, and emergency response capacity building workshops'
						],
						services: [
							'Community & Barangay DRRM Trainings',
							'School & Office Evacuation Drill Staging',
							'First Aid & Basic Life Support Certifications'
						],
						expanded: true,
						children: []
					},
					{
						id: 'ops-warning',
						name: 'Dominico Tobilla',
						position: 'Operations & Warning Officer',
						roleCategory: 'Operations & Early Warning',
						badge: 'Operations & Warning',
						level: 3,
						color: '#ef4444', // red
						glow: 'rgba(239, 68, 68, 0.4)',
						image: '',
						window: 'Early Warning Console',
						office: 'MDRRMO Operations Center, Tanauan Municipal Hall Complex',
						hours: '24/7 Operations Duty • Shift Rotation',
						contact: 'mdrrmo@tanauanleyte.gov.ph',
						overview:
							'Supervises the 24/7 Early Warning System, hydrometeorological telemetry, radio networks, emergency sirens, and direct tactical command over the Tanauan Emergency Response Team.',
						duties: [
							'Continuously monitors DOST-PAGASA weather bulletins, river levels, and PHIVOLCS seismic advisories',
							'Directs the 167.600 MHz VHF Base Radio Network and disseminates timely public warning advisories',
							'Supervises the deployment of Responders, Emergency Vehicle Operators, and Communications Officers',
							'Maintains immediate readiness of emergency rescue equipment, watercraft, and medical gear'
						],
						services: [
							'24/7 Early Warning & Hydromet Monitoring',
							'Tactical Emergency Search & Rescue Command',
							'VHF Base Radio Telecommunications (167.600 MHz)'
						],
						expanded: true,
						teamBanner: 'TANAUAN EMERGENCY RESPONSE TEAM',
						children: [
							{
								id: 'unit-responders',
								name: 'Responders Squad',
								position: 'Emergency Rescue & First Responders',
								roleCategory: 'Tactical Search & Rescue',
								badge: '12 Responders',
								level: 4,
								color: '#f97316', // orange
								glow: 'rgba(249, 115, 22, 0.35)',
								image: '',
								window: 'Rescue Ready-Room',
								office: 'MDRRMO Operations Center, Tanauan Municipal Hall Complex',
								hours: '24/7 Rapid Emergency Response',
								contact: 'Globe: 0916-197-7360 | Smart: 0931-739-3333',
								overview:
									'High-readiness frontline search, rescue, and medical emergency response squad trained in Basic Life Support (BLS), vehicle extrication, water search and rescue (WASAR), and disaster field triage.',
								duties: [
									'Conducts search, rescue, and evacuation operations during typhoons, floods, and earthquakes',
									'Administers emergency pre-hospital first aid, CPR, and trauma care to casualty victims',
									'Operates rescue boats, life-saving extrication gear, and safety ropes in hazardous environments',
									'Maintains continuous standby status for immediate vehicular accident and medical dispatch'
								],
								services: [
									'Pre-Hospital Trauma Care & First Aid',
									'Search, Rescue & Flood Evacuation',
									'Vehicular Accident Extrication & Medical Transport'
								],
								roster: [
									'Ivan Po',
									'Salvador Paco',
									'Jade Desoyo',
									'Prince Mhar Demegillo',
									'Regine Magayones',
									'William Corregidor',
									'Geoffrey Demegillo',
									'Michael Jay Demegillo',
									'Pedro Tingal Jr.',
									'Romulo Abunales',
									'Erica Sibayan',
									'Diana C. Miralles'
								],
								expanded: false,
								children: []
							},
							{
								id: 'unit-drivers',
								name: 'Emergency Vehicle Operators',
								position: 'Ambulance & Heavy Fleet Operators',
								roleCategory: 'Logistics & Ambulance Fleet',
								badge: '14 Fleet Drivers',
								level: 4,
								color: '#10b981', // emerald
								glow: 'rgba(16, 185, 129, 0.35)',
								image: '',
								window: 'Fleet Motorpool & Dispatch',
								office: 'MDRRMO Operations Center, Tanauan Municipal Hall Complex',
								hours: '24/7 Mobile Dispatch',
								contact: 'Globe: 0916-197-7360 | Smart: 0931-739-3333',
								overview:
									'Specialized emergency vehicle operators piloting municipal ambulances, rescue trucks, mobile water tankers, and disaster relief transport fleet under high-speed emergency response standards.',
								duties: [
									'Pilots frontline municipal emergency ambulances for patient transport and hospital transfers',
									'Navigates rescue trucks and relief delivery vehicles to affected barangays during calamities',
									'Ensures 100% operational maintenance, fuel readiness, and safety inspections of all response vehicles',
									'Maintains two-way vehicular radio contact with the base radio dispatcher during field runs'
								],
								services: [
									'24/7 Emergency Ambulance Transport',
									'Disaster Relief Good Hauling & Distribution',
									'Emergency Logistics & Mobile Fleet Dispatch'
								],
								roster: [
									'Reynan Cadayengan',
									'Jeffrey Operio',
									'Mark Joseph Arcena',
									'Alijandro Creer',
									'Nelson Mueva',
									'Edison Odtuhan',
									'Henry Joseco',
									'Michael Batis',
									'Nario Palaña',
									'Mcdouglas Latina',
									'Vicente Costales Jr.',
									'Glenn Montero',
									'Ricky Roble',
									'Jeffrey Bonsay'
								],
								expanded: false,
								children: []
							},
							{
								id: 'unit-radio',
								name: 'Hotline / Base Radio Operator',
								position: 'Communications & Telecommunications Console',
								roleCategory: 'Emergency Dispatch & Net Control',
								badge: '4 Radio Operators',
								level: 4,
								color: '#0284c7', // sky / ocean
								glow: 'rgba(2, 132, 199, 0.35)',
								image: '',
								window: 'Base Radio Room (167.600 MHz)',
								office: 'MDRRMO Operations Center, Tanauan Municipal Hall Complex',
								hours: '24/7 Net Control Duty (Shift Rotation)',
								contact: 'Radio: 167.600 MHz | Tel: 0916-197-7360',
								overview:
									'Communications officers manning the 167.600 MHz VHF Base Radio Network, 24/7 telephone hotlines, SMS broadcast consoles, and emergency logging systems linking all 54 Tanauan barangays.',
								duties: [
									'Mans the base radio frequency (167.600 MHz) for routine roll calls and emergency radio traffic',
									'Receives emergency distress calls via Globe (0916-197-7360) and Smart (0931-739-3333) hotlines',
									'Logs all incoming emergency incidents, dispatches ambulances and rescue squads immediately',
									'Transmits severe weather warnings, storm signal updates, and municipal advisories to barangay captains'
								],
								services: [
									'24/7 Emergency Hotline Intake (Globe & Smart)',
									'167.600 MHz VHF Base Radio Communications',
									'Incident Call Logging & Squad Dispatch'
								],
								roster: [
									'Melchor Floro Creer',
									'Raymund Cañeda',
									'Carlo Redondo',
									'Pantaleon Costiniano'
								],
								expanded: false,
								children: []
							}
						]
					},
					{
						id: 'research-planning',
						name: 'Chen Anthony C. Salva',
						position: 'Research and Planning Officer',
						roleCategory: 'Research, Mapping & Planning',
						badge: 'Research & Planning',
						level: 3,
						color: '#06b6d4', // cyan
						glow: 'rgba(6, 182, 212, 0.35)',
						image: '',
						window: 'GIS & Planning Station',
						office: 'MDRRMO Operations Center, Tanauan Municipal Hall Complex',
						hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
						contact: 'mdrrmo@tanauanleyte.gov.ph',
						overview:
							'Leads hazard vulnerability risk assessments, GIS mapping, Climate and Disaster Risk Assessment (CDRA), post-disaster needs assessments, and annual DRRM investment programming.',
						duties: [
							'Develops comprehensive GIS hazard maps for storm surge, flood, tsunami, and earthquake fault lines',
							'Formulates the annual Local Disaster Risk Reduction and Management Fund Investment Plan (LDRRMFIP)',
							'Conducts post-disaster damage and needs assessments (RDANA / PDNA) following calamities',
							'Integrates climate change adaptation (CCA) measures into municipal land use and development plans'
						],
						services: [
							'GIS Hazard & Vulnerability Mapping',
							'Disaster Risk Investment Programming (LDRRMF)',
							'Rapid Damage Assessment & Needs Analysis (RDANA)'
						],
						expanded: true,
						children: []
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

	// Flatten all personnel / squads for search & grid view
	function flatten(node, list = []) {
		list.push(node);
		if (node.advisor) {
			list.push(node.advisor);
		}
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
			(person.roster && person.roster.some((m) => m.toLowerCase().includes(q))) ||
			(person.services && person.services.some((s) => s.toLowerCase().includes(q))) ||
			(person.duties && person.duties.some((d) => d.toLowerCase().includes(q)))
		);
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

<!-- MAIN ORGANIZATIONAL CHART WRAPPER (MATCHING CIVIL REGISTRAR AESTHETICS) -->
<div
	class="relative w-full overflow-hidden rounded-3xl border-2 border-slate-800 bg-gradient-to-b from-[#09182f] via-[#061226] to-[#030914] p-4 sm:p-8 md:p-10 text-white shadow-2xl"
>
	<!-- Anti-Gravity Atmospheric Glow Lights -->
	<div
		class="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl animate-pulse"
		style="animation-duration: 8s;"
	></div>
	<div
		class="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl animate-pulse"
		style="animation-duration: 10s;"
	></div>
	<div
		class="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-red-500/10 blur-3xl animate-pulse"
		style="animation-duration: 7s;"
	></div>

	<!-- ============================================== -->
	<!-- HEADER: OFFICIAL SEALS & TITLE -->
	<!-- ============================================== -->
	<div
		class="relative z-10 mb-8 flex flex-col items-center justify-between gap-6 border-b border-white/10 pb-6 lg:flex-row"
	>
		<!-- Left: Municipal & MDRRMO Seals -->
		<div class="flex items-center gap-4 sm:gap-5">
			<div class="relative flex items-center gap-2">
				<img
					src="/HRMO/official-seal.png"
					alt="Municipality of Tanauan Official Seal"
					class="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-amber-400/80 bg-white/10 object-contain p-1 shadow-lg shadow-amber-500/20"
				/>
				<div
					class="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-2 border-orange-400/80 bg-orange-950/80 p-1 text-2xl sm:text-3xl shadow-lg shadow-orange-500/20"
					title="Tanauan Rescue / MDRRMO Badge"
				>
					🛡️
				</div>
			</div>
			<div>
				<span class="text-[11px] font-black uppercase tracking-widest text-amber-400 sm:text-xs">
					Municipality of Tanauan, Leyte
				</span>
				<h2 class="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
					MDRRMO Tanauan Organizational Structure
				</h2>
				<p class="text-xs sm:text-sm font-semibold text-sky-200/80">
					Municipal Disaster Risk Reduction and Management Office & Incident Command Hierarchy
				</p>
			</div>
		</div>

		<!-- Right: Quick Stat Badges -->
		<div class="flex flex-wrap items-center gap-2.5 sm:gap-3">
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Total Force</span>
				<span class="text-sm font-black text-amber-300">36 DRRM Personnel</span>
			</div>
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Statutory Law</span>
				<span class="text-sm font-black text-emerald-400">Republic Act 10121</span>
			</div>
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Emergency Dispatch</span>
				<span class="text-sm font-black text-red-400">24/7 EOC Standby</span>
			</div>
		</div>
	</div>

	<!-- ============================================== -->
	<!-- INTERACTIVE TOOLBAR: SEARCH, VIEW TOGGLE, ZOOM -->
	<!-- ============================================== -->
	<div
		class="relative z-10 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 p-3.5 backdrop-blur-md shadow-lg"
	>
		<!-- Search Input with Live Filter -->
		<div class="relative flex-1 max-w-md">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search by name, role, squad (e.g. Mazo, Responders, Arcena, Radio)..."
				class="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 shadow-inner outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
			/>
			{#if searchQuery}
				<button
					type="button"
					onclick={() => (searchQuery = '')}
					class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white"
				>
					Clear
				</button>
			{/if}
		</div>

		<!-- View Modes & Canvas Controls -->
		<div class="flex flex-wrap items-center gap-2">
			<!-- View Mode Toggle: Role Roster first, Tree Hierarchy second -->
			<div class="flex rounded-xl border border-white/20 bg-slate-900/80 p-1">
				<button
					type="button"
					onclick={() => (viewMode = 'grid')}
					class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all {viewMode === 'grid' ? 'bg-orange-600 text-white shadow' : 'text-slate-300 hover:text-white'}"
				>
					Role Roster
				</button>
				<button
					type="button"
					onclick={() => (viewMode = 'tree')}
					class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all {viewMode === 'tree' ? 'bg-orange-600 text-white shadow' : 'text-slate-300 hover:text-white'}"
				>
					Tree Hierarchy
				</button>
			</div>

			<!-- Tree Canvas Controls (available when in tree mode) -->
			{#if viewMode === 'tree'}
				<div class="flex items-center rounded-xl border border-white/20 bg-slate-900/80 p-1">
					<button
						type="button"
						onclick={zoomOut}
						class="h-8 w-8 rounded-lg text-sm font-black text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center"
						title="Zoom Out"
					>
						-
					</button>
					<span class="px-2 text-xs font-mono font-bold text-amber-300">
						{Math.round(zoomScale * 100)}%
					</span>
					<button
						type="button"
						onclick={zoomIn}
						class="h-8 w-8 rounded-lg text-sm font-black text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center"
						title="Zoom In"
					>
						+
					</button>
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
							<!-- Circular Portrait or Stylized Initials -->
							<div
								class="relative h-18 w-18 shrink-0 overflow-hidden rounded-2xl border-2 border-white/80 bg-slate-900 shadow-md"
							>
								{#if person.image && !failedImages.has(person.id)}
									<img
										src={person.image}
										alt={person.name}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
										onerror={() => onImgError(person.id)}
									/>
								{:else}
									<div
										class="flex h-full w-full items-center justify-center font-black text-xl text-white"
										style="background: {person.color};"
									>
										{person.name
											.split(' ')
											.map((n) => n[0])
											.filter((c) => c && c.match(/[A-Za-z]/))
											.slice(0, 2)
											.join('')}
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
								<h3
									class="mt-1 text-base font-black text-white group-hover:text-amber-300 transition-colors"
								>
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

						<!-- Squad Member Count Indicator (if squad) -->
						{#if person.roster}
							<div class="mt-3 rounded-xl border border-white/10 bg-black/30 p-2.5">
								<span class="text-[10px] font-mono font-bold text-amber-300 uppercase block mb-1">
									Squad Personnel ({person.roster.length}):
								</span>
								<div class="text-[11px] text-slate-300 line-clamp-2">
									{person.roster.join(', ')}
								</div>
							</div>
						{/if}

						<div
							class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-slate-300"
						>
							<span class="text-slate-400">{person.roleCategory}</span>
							<span class="text-amber-400 group-hover:underline transition-all">View Details →</span>
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
			class="relative min-h-[760px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-8 cursor-grab active:cursor-grabbing select-none"
			onmousedown={startPan}
			onmousemove={doPan}
			onmouseup={endPan}
			onmouseleave={endPan}
		>
			<!-- Draggable / Zoomable Transform Container -->
			<div
				class="flex flex-col items-center justify-start transition-transform duration-100 ease-out py-6"
				style="transform: translate({panOffset.x}px, {panOffset.y}px) scale({zoomScale}); transform-origin: top center;"
			>
				<!-- ============================================== -->
				<!-- LEVEL 1: MDRRM CHAIRMAN & SB DRRM COMMITTEE -->
				<!-- ============================================== -->
				<div class="relative flex flex-col items-center">
					<!-- Top Command Bar: Chairman in Center + SB DRRM Committee Branch -->
					<div class="relative flex items-center justify-center gap-10">
						<!-- Mayor / MDRRM Chairman -->
						{@render nodeCard(orgData)}

						<!-- Legislative Oversight Branch (Hon. Mark Christian L. Gimenez) -->
						{#if orgData.advisor}
							<div class="relative flex items-center">
								<!-- Connector bar between Chairman and SB Committee -->
								<div class="absolute -left-10 w-10 h-0.5 border-t-2 border-dashed border-sky-400"></div>
								{@render nodeCard(orgData.advisor)}
							</div>
						{/if}
					</div>

					<!-- Branch Connector downward to MDRRM Officer -->
					{#if orgData.children && orgData.children.length > 0}
						<div class="relative flex flex-col items-center w-full">
							<!-- Vertical connection line -->
							<div class="h-10 w-1 bg-gradient-to-b from-amber-400 to-orange-500 shadow-sm shadow-orange-500/50"></div>

							<!-- ============================================== -->
							<!-- LEVEL 2: MDRRM OFFICER (RICARDO ALEJO N. MAZO) -->
							<!-- ============================================== -->
							{#each orgData.children as head (head.id)}
								<div class="relative flex flex-col items-center w-full">
									{@render nodeCard(head)}

									<!-- Connector to Level 3 Division Officers -->
									{#if head.children && head.children.length > 0}
										<div class="relative flex flex-col items-center w-full pt-10">
											<!-- Top vertical stem -->
											<div class="absolute top-0 h-10 w-1 bg-gradient-to-b from-orange-500 to-red-500"></div>

											<!-- Horizontal Connecting Bar across 3 Officers -->
											<div class="relative flex items-start justify-center gap-8 sm:gap-12 pt-4">
												<!-- Crossbar spanning the 3 officers -->
												<div
													class="pointer-events-none absolute top-0 left-24 right-24 h-1 bg-gradient-to-r from-purple-400 via-red-500 to-cyan-400 shadow-sm"
												></div>

												<!-- ============================================== -->
												<!-- LEVEL 3: 3 DIVISION OFFICERS                   -->
												<!-- ============================================== -->
												{#each head.children as officer (officer.id)}
													<div class="relative flex flex-col items-center">
														<!-- Drop line from crossbar -->
														<div class="h-6 w-1" style="background-color: {officer.color};"></div>
														{@render nodeCard(officer)}

														<!-- Central Operations Expansion (Under Operations & Warning Officer) -->
														{#if officer.teamBanner && officer.children && officer.children.length > 0}
															<div class="relative flex flex-col items-center w-full pt-8">
																<!-- Stem line down to Response Team Banner -->
																<div class="h-8 w-1 bg-red-500"></div>

																<!-- TANAUAN EMERGENCY RESPONSE TEAM BANNER -->
																<div
																	class="relative rounded-2xl border-2 border-red-500 bg-gradient-to-r from-red-950 via-slate-900 to-red-950 px-6 py-2.5 text-center shadow-xl mb-4"
																>
																	<span class="block text-[10px] font-mono font-black tracking-widest text-amber-400 uppercase">
																		TACTICAL DISPATCH HUB
																	</span>
																	<h4 class="text-sm sm:text-base font-black text-white uppercase tracking-wider">
																		{officer.teamBanner}
																	</h4>
																</div>

																<!-- Connector from Banner to 3 Units -->
																<div class="relative flex flex-col items-center w-full pt-8">
																	<div class="absolute top-0 h-8 w-1 bg-red-400"></div>

																	<!-- Horizontal crossbar spanning the 3 units -->
																	<div class="relative flex items-start justify-center gap-6 sm:gap-8 pt-4">
																		<div
																			class="pointer-events-none absolute top-0 left-16 right-16 h-1 bg-gradient-to-r from-orange-400 via-emerald-400 to-sky-400"
																		></div>

																		<!-- LEVEL 4: RESPONDERS, VEHICLE OPERATORS, RADIO OPERATORS -->
																		{#each officer.children as squad (squad.id)}
																			<div class="relative flex flex-col items-center">
																				<div
																					class="h-6 w-1"
																					style="background-color: {squad.color};"
																				></div>
																				{@render nodeCard(squad)}
																			</div>
																		{/each}
																	</div>
																</div>
															</div>
														{/if}
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
			</div>
		</div>
	{/if}

	<!-- ============================================== -->
	<!-- FOOTER LEGEND & INSTRUCTIONS -->
	<!-- ============================================== -->
	<div
		class="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400"
	>
		<div class="flex flex-wrap items-center gap-4">
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#f59e0b] shadow-sm shadow-amber-400/50"></span>
				<span class="font-bold text-slate-200">MDRRM Chairman (Mayor)</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#3b82f6] shadow-sm shadow-blue-400/50"></span>
				<span class="font-bold text-slate-200">SB DRRM Committee</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#ea580c] shadow-sm shadow-orange-400/50"></span>
				<span class="font-bold text-slate-200">MDRRM Officer (Head)</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#ef4444] shadow-sm shadow-red-400/50"></span>
				<span class="font-bold text-slate-200">Division Officers & Squads</span>
			</span>
		</div>
		<div class="flex items-center gap-2 text-slate-400 font-semibold">
			<span class="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
			<span>Click any officer or squad card to view duties, roster & emergency services</span>
		</div>
	</div>
</div>

<!-- ============================================== -->
<!-- REUSABLE SNIPPET: NODE CARD COMPONENT -->
<!-- ============================================== -->
{#snippet nodeCard(person)}
	{@const isMatch = matchesSearch(person, searchQuery)}
	{@const hasQuery = searchQuery.trim().length > 0}

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
			class="group relative flex w-60 sm:w-68 flex-col items-center rounded-3xl border-2 border-white/20 bg-gradient-to-b from-[#112444]/90 via-[#0c1a33]/90 to-[#071021]/95 p-4 sm:p-5 backdrop-blur-md shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-2xl cursor-pointer text-center"
			style="box-shadow: 0 12px 30px -5px {person.glow};"
		>
			<!-- Ambient Card Corner Highlight -->
			<div
				class="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-30 blur-xl"
				style="background-color: {person.color};"
			></div>

			<!-- Official Portrait Avatar Frame -->
			<div class="relative mb-3">
				<div
					class="relative h-16 w-16 sm:h-18 sm:w-18 overflow-hidden rounded-2xl border-2 border-white/80 bg-slate-900 shadow-md transition-transform duration-300 group-hover:scale-105"
				>
					{#if person.image && !failedImages.has(person.id)}
						<img
							src={person.image}
							alt={person.name}
							class="h-full w-full object-cover"
							onerror={() => onImgError(person.id)}
						/>
					{:else}
						<div
							class="flex h-full w-full items-center justify-center font-black text-xl text-white"
							style="background: {person.color};"
						>
							{person.name
								.split(' ')
								.map((n) => n[0])
								.filter((c) => c && c.match(/[A-Za-z]/))
								.slice(0, 2)
								.join('')}
						</div>
					{/if}
				</div>

				<!-- Online / Active Status Pulse -->
				<span
					class="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-slate-950 bg-emerald-500"
					title="Active Municipal DRRM Post"
				>
					<span class="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
				</span>
			</div>

			<!-- Role Badge -->
			<span
				class="mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-xs"
				style="background-color: {person.color}25; color: {person.color}; border: 1px solid {person.color}66;"
			>
				{person.badge}
			</span>

			<!-- Full Name -->
			<h3
				class="text-sm sm:text-base font-black tracking-tight text-white group-hover:text-amber-300 transition-colors"
			>
				{person.name}
			</h3>

			<!-- Official Title / Position -->
			<p class="mt-0.5 text-[11px] sm:text-xs font-bold text-sky-200">
				{person.position}
			</p>

			<!-- Office Desk Tag -->
			<div class="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-400">
				<span class="h-1.5 w-1.5 rounded-full" style="background-color: {person.color};"></span>
				<span>{person.window}</span>
			</div>

			<!-- Personnel count preview for squads -->
			{#if person.roster}
				<div class="mt-2.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-amber-300 font-mono font-bold">
					{person.roster.length} Members Listed
				</div>
			{/if}

			<!-- Hover Hint -->
			<div class="mt-3 pt-2 border-t border-white/10 w-full text-[10px] font-black text-amber-400 group-hover:underline">
				Inspect Duties & Services →
			</div>
		</div>
	</div>
{/snippet}

<!-- ============================================== -->
<!-- DETAIL MODAL WINDOW (CIVIC BLUEPRINT THEME)   -->
<!-- ============================================== -->
{#if selectedPerson}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
		transition:fade={{ duration: 200 }}
		onclick={closeDetail}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-person-title"
	>
		<div
			class="relative my-auto w-full max-w-2xl rounded-3xl border-2 border-white/20 bg-gradient-to-b from-[#0c1a33] via-[#09152b] to-[#040b17] shadow-2xl overflow-hidden text-white"
			transition:scale={{ duration: 250, start: 0.95 }}
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Top Accent Glow Line -->
			<div class="h-2 w-full" style="background: linear-gradient(to right, {selectedPerson.color}, #f59e0b);"></div>

			<!-- Modal Header -->
			<div class="p-6 sm:p-8 pb-4">
				<div class="flex items-start justify-between gap-4">
					<div class="flex items-center gap-4">
						<div
							class="h-18 w-18 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-white/80 bg-slate-900 shadow-lg"
						>
							{#if selectedPerson.image && !failedImages.has(selectedPerson.id)}
								<img
									src={selectedPerson.image}
									alt={selectedPerson.name}
									class="h-full w-full object-cover"
								/>
							{:else}
								<div
									class="flex h-full w-full items-center justify-center font-black text-2xl text-white"
									style="background: {selectedPerson.color};"
								>
									{selectedPerson.name
										.split(' ')
										.map((n) => n[0])
										.filter((c) => c && c.match(/[A-Za-z]/))
										.slice(0, 2)
										.join('')}
								</div>
							{/if}
						</div>
						<div>
							<span
								class="inline-block rounded-full px-3 py-0.5 text-xs font-black uppercase tracking-wider mb-1"
								style="background-color: {selectedPerson.color}25; color: {selectedPerson.color}; border: 1px solid {selectedPerson.color}66;"
							>
								{selectedPerson.badge}
							</span>
							<h3 id="modal-person-title" class="text-xl sm:text-2xl font-black text-white">
								{selectedPerson.name}
							</h3>
							<p class="text-sm font-bold text-sky-300">
								{selectedPerson.position}
							</p>
							<p class="text-xs text-slate-400 mt-0.5">
								{selectedPerson.roleCategory}
							</p>
						</div>
					</div>

					<button
						type="button"
						onclick={closeDetail}
						class="flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white hover:bg-red-600 hover:border-red-500 transition-colors"
						aria-label="Close modal"
					>
						✕
					</button>
				</div>
			</div>

			<!-- Modal Body Content -->
			<div class="max-h-[68vh] overflow-y-auto p-6 sm:p-8 pt-0 space-y-6 text-sm">
				<!-- Quick Info Cards -->
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
					<div class="rounded-xl border border-white/10 bg-white/5 p-3">
						<span class="text-[10px] font-mono font-bold text-slate-400 uppercase block">Duty Hours & Status</span>
						<span class="text-xs font-bold text-slate-200 mt-0.5 block">{selectedPerson.hours}</span>
					</div>
					<div class="rounded-xl border border-white/10 bg-white/5 p-3">
						<span class="text-[10px] font-mono font-bold text-slate-400 uppercase block">Station & Room</span>
						<span class="text-xs font-bold text-slate-200 mt-0.5 block">{selectedPerson.office}</span>
					</div>
				</div>

				<!-- Overview Narrative -->
				<div class="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
					<h4 class="text-xs font-black text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
						<span>📋</span> Role & Operational Mandate
					</h4>
					<p class="text-xs sm:text-sm leading-relaxed text-slate-300 font-medium">
						{selectedPerson.overview}
					</p>
				</div>

				<!-- Squad Members Roster (if squad) -->
				{#if selectedPerson.roster}
					<div class="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 sm:p-5">
						<h4 class="text-xs font-black text-amber-300 uppercase tracking-wider mb-3 flex items-center justify-between">
							<span class="flex items-center gap-2">
								<span>👥</span> Official Squad Personnel Roster
							</span>
							<span class="rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-black text-slate-950">
								{selectedPerson.roster.length} Regular Personnel
							</span>
						</h4>
						<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
							{#each selectedPerson.roster as member, idx}
								<div class="flex items-center gap-2 rounded-lg bg-black/40 border border-white/10 p-2 text-xs font-bold text-white">
									<span class="font-mono text-[10px] text-amber-400">0{idx + 1}</span>
									<span class="truncate">{member}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Statutory Duties -->
				{#if selectedPerson.duties && selectedPerson.duties.length > 0}
					<div class="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
						<h4 class="text-xs font-black text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
							<span>🛡️</span> Key Operational Duties & Responsibilities
						</h4>
						<ul class="space-y-2">
							{#each selectedPerson.duties as duty}
								<li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
									<span class="font-bold text-amber-400">•</span>
									<span>{duty}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!-- Frontline Services -->
				{#if selectedPerson.services && selectedPerson.services.length > 0}
					<div class="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
						<h4 class="text-xs font-black text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
							<span>⚡</span> Frontline Emergency Services
						</h4>
						<div class="flex flex-wrap gap-2">
							{#each selectedPerson.services as service}
								<span
									class="rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-300"
								>
									✓ {service}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Modal Footer -->
			<div class="flex items-center justify-between border-t border-white/10 bg-black/40 p-4 px-6 text-xs text-slate-400">
				<span>Official Document: MDRRMO Tanauan Organizational Structure</span>
				<button
					type="button"
					onclick={closeDetail}
					class="rounded-xl bg-white/10 px-4 py-2 font-bold text-white hover:bg-white/20 transition-colors"
				>
					Close
				</button>
			</div>
		</div>
	</div>
{/if}
