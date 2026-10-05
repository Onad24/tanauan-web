<script>
	import { fade, slide, scale } from 'svelte/transition';

	// View Modes: 'organogram' (Tree Hierarchy), 'directory' (Searchable Cards), 'document' (Official Scanned Chart)
	let activeTab = $state('organogram');
	let searchQuery = $state('');
	let selectedSection = $state('all');
	let selectedMember = $state(null);

	// Complete 36 Personnel Roster from Official Municipal Agriculture Office Chart
	const personnel = [
		// 1. EXECUTIVE LEADERSHIP
		{
			id: 'merilo-gina',
			name: 'Hon. Ma. Gina E. Merilo',
			title: 'Municipal Mayor',
			section: 'Executive',
			sectionLabel: 'Executive Governance',
			tier: 'mayor',
			level: 1,
			color: 'border-amber-400 bg-gradient-to-b from-blue-950 to-blue-900 text-white',
			badge: 'Local Chief Executive',
			duties: 'Chief executive officer of the Municipality of Tanauan, Leyte providing general supervision, policy direction, and executive leadership over all agricultural and municipal programs.'
		},
		{
			id: 'miranda-susana',
			name: 'Susana O. Miranda',
			title: 'Municipal Agriculturist',
			section: 'Executive',
			sectionLabel: 'Office of the Municipal Agriculturist',
			tier: 'head',
			level: 2,
			color: 'border-amber-400 bg-gradient-to-b from-blue-900 to-blue-950 text-white',
			badge: 'Department Head',
			duties: 'Heads the Municipal Agriculture Office; directs the delivery of extension services, implementation of crop and fisheries programs, farm mechanization, and agricultural policy in Tanauan.'
		},

		// 2. LIVESTOCK SECTION & SUPPORT PERSONNEL
		{
			id: 'tebrero-jimmy',
			name: 'Jimmy Lou Tebrero',
			title: 'Agricultural Technologist II',
			section: 'Livestock',
			sectionLabel: 'Livestock Section',
			tier: 'technologist',
			level: 3,
			badge: 'Section Lead',
			duties: 'Leads the Livestock Section; oversees animal health management, livestock dispersal programs, veterinary assistance, and disease surveillance across 54 barangays.'
		},
		{
			id: 'cordero-exuperio',
			name: 'Exuperio Cordero',
			title: 'Monitoring and Evaluation Point Person',
			section: 'Livestock',
			sectionLabel: 'Livestock Section • M&E',
			tier: 'support',
			level: 4,
			badge: 'M&E Staff',
			duties: 'Monitors and evaluates livestock and municipal agricultural project implementation and field beneficiary performance.'
		},
		{
			id: 'san-miguel-rommel',
			name: 'Rommel De San Miguel',
			title: 'Monitoring and Evaluation Point Person',
			section: 'Livestock',
			sectionLabel: 'Livestock Section • M&E',
			tier: 'support',
			level: 4,
			badge: 'M&E Staff',
			duties: 'Monitors and evaluates agricultural program execution, project status verification, and farmer assistance compliance.'
		},
		{
			id: 'cesar-hospicio',
			name: 'Hospicio Cesar',
			title: 'PCA Personnel',
			section: 'Special Support',
			sectionLabel: 'Philippine Coconut Authority Liaison',
			tier: 'support',
			level: 4,
			badge: 'PCA Liaison',
			duties: 'Coordinates Philippine Coconut Authority (PCA) programs, coconut planting initiatives, pest management, and coconut farmer benefits.'
		},
		{
			id: 'moralina-willy',
			name: 'Willy Moralina',
			title: 'PCIC Focal Person',
			section: 'Special Support',
			sectionLabel: 'Crop & Livestock Insurance',
			tier: 'support',
			level: 5,
			badge: 'PCIC Focal',
			duties: 'Facilitates Philippine Crop Insurance Corporation (PCIC) enrollments, indemnification claims for damaged crops and livestock due to typhoons or disease.'
		},
		{
			id: 'soyosa-lenneth',
			name: 'Lenneth Soyosa',
			title: 'PCIC Focal Person',
			section: 'Special Support',
			sectionLabel: 'Crop & Livestock Insurance',
			tier: 'support',
			level: 5,
			badge: 'PCIC Focal',
			duties: 'Processes farmer insurance applications, indemnity claims verifications, and maintains agricultural insurance ledgers.'
		},
		{
			id: 'ripalda-colin',
			name: 'Colin D. Ripalda',
			title: 'Geotag / IT Section In-Charge',
			section: 'Special Support',
			sectionLabel: 'IT & Geotagging Support',
			tier: 'support',
			level: 5,
			badge: 'IT & Geotagging',
			duties: 'Handles digital mapping, farm lot geotagging, RSBSA database administration, and IT technical support for MAO field operations.'
		},
		{
			id: 'villamor-jneen',
			name: 'Jneen Y. Villamor',
			title: 'Seeds Distribution Staff',
			section: 'Special Support',
			sectionLabel: 'Agricultural Logistics & Seed Depot',
			tier: 'support',
			level: 5,
			badge: 'Logistics',
			duties: 'Manages certified seed stocks inventory, buffer stock records, and orderly distribution to accredited farmer organizations.'
		},

		// 3. CROP SECTION
		{
			id: 'abas-claridyl',
			name: 'Claridyl T. Abas',
			title: 'Agricultural Technologist',
			section: 'Crops',
			sectionLabel: 'Crop Section',
			tier: 'technologist',
			level: 3,
			badge: 'Section Lead',
			duties: 'Leads the Crop Production Section; manages crop cultivation programs, soil health improvement, pest and disease diagnostics, and farmer field school sessions.'
		},
		{
			id: 'ripalda-mary-cris',
			name: 'Mary Cris G. Ripalda',
			title: 'Corn and Cassava',
			section: 'Crops',
			sectionLabel: 'Crop Section • Corn & Cassava',
			tier: 'support',
			level: 4,
			badge: 'Program Lead',
			duties: 'Coordinates corn and cassava production programs, seed distribution, post-harvest assistance, and root crop market linkage.'
		},

		// 4. RICE & HVCDP SECTION
		{
			id: 'cornejo-mariel',
			name: 'Mariel C. Cornejo',
			title: 'Agricultural Technologist',
			section: 'Rice/HVCDP',
			sectionLabel: 'Rice / HVCDP Section',
			tier: 'technologist',
			level: 3,
			badge: 'Section Lead',
			duties: 'Heads the Rice and High Value Crops Development Program (HVCDP); implements certified seed subsidies, fertilizer assistance, and commercial vegetable production.'
		},
		{
			id: 'almacin-ma-theresa',
			name: 'Ma. Theresa Almacin',
			title: 'Extension Services Personnel',
			section: 'Rice/HVCDP',
			sectionLabel: 'Rice / HVCDP • Extension',
			tier: 'support',
			level: 4,
			badge: 'Extension Staff',
			duties: 'Provides direct frontline extension services to rice and high value crop growers, field monitoring, and distribution support.'
		},
		{
			id: 'games-loueza',
			name: 'Loueza Mae N. Games',
			title: 'Agricultural Extension Worker',
			section: 'Rice/HVCDP',
			sectionLabel: 'Rice / HVCDP • Extension',
			tier: 'support',
			level: 4,
			badge: 'Extension Worker',
			duties: 'Conducts on-site farm assessments, technology transfer demonstrations, and assists farmer cooperatives with inputs and crop monitoring.'
		},

		// 5. EXTENSION SERVICES & FARM MACHINERY OPERATIONS
		{
			id: 'salvana-micheal',
			name: 'Micheal Salvaña',
			title: 'Extension Services Personnel',
			section: 'Extension',
			sectionLabel: 'Extension Services & Mechanization',
			tier: 'technologist',
			level: 3,
			badge: 'Extension Lead',
			duties: 'Coordinates municipal agricultural extension activities, farm mechanization schedules, and logistical dispatch.'
		},
		{
			id: 'avila-kenn-gene',
			name: 'Kenn Gene C. Avila',
			title: 'Tractor Operator',
			section: 'Machinery',
			sectionLabel: 'Farm Machinery Operations',
			tier: 'operator',
			level: 4,
			badge: 'Machinery Operator',
			duties: 'Operates municipal agricultural tractors and mechanical implements for land preparation, plowing, and harrowing services for local farmers.'
		},
		{
			id: 'de-paz-jovito',
			name: 'Jovito De Paz',
			title: 'Tractor Operator',
			section: 'Machinery',
			sectionLabel: 'Farm Machinery Operations',
			tier: 'operator',
			level: 4,
			badge: 'Machinery Operator',
			duties: 'Operates municipal agricultural tractors, performs preventive machinery upkeep, and assists in barangay land preparation schedules.'
		},
		{
			id: 'estabillo-sofronio',
			name: 'Sofronio Estabillo',
			title: 'Farm Machinery Support',
			section: 'Machinery',
			sectionLabel: 'Farm Machinery Operations',
			tier: 'support',
			level: 5,
			badge: 'Field Support',
			duties: 'Supports tractor operations, equipment maintenance, and field mobilization during municipal plowing seasons.'
		},
		{
			id: 'duaban-anthony',
			name: 'Anthony Duaban',
			title: 'Farm Machinery Support',
			section: 'Machinery',
			sectionLabel: 'Farm Machinery Operations',
			tier: 'support',
			level: 5,
			badge: 'Field Support',
			duties: 'Maintains agricultural machinery tools, assists equipment operators, and conducts field logistics.'
		},
		{
			id: 'abasola-joel',
			name: 'Joel Abasola',
			title: 'Farm Machinery Support',
			section: 'Machinery',
			sectionLabel: 'Farm Machinery Operations',
			tier: 'support',
			level: 5,
			badge: 'Field Support',
			duties: 'Assists in tractor implement rigging, field operations, and equipment transit between farm clusters.'
		},
		{
			id: 'cijas-jason',
			name: 'Jason Cijas',
			title: 'Farm Machinery Support',
			section: 'Machinery',
			sectionLabel: 'Farm Machinery Operations',
			tier: 'support',
			level: 5,
			badge: 'Field Support',
			duties: 'Provides field support for tractor operations, equipment servicing, and land preparation dispatch.'
		},

		// 6. FISHERIES SECTION & COMMUNITY ORGANIZING
		{
			id: 'casilan-roselyn',
			name: 'Roselyn M. Casilan',
			title: 'Agricultural Technologist',
			section: 'Fisheries',
			sectionLabel: 'Fisheries Section',
			tier: 'technologist',
			level: 3,
			badge: 'Section Lead',
			duties: 'Heads the Fisheries Section; oversees municipal waters management, fisherfolk registration (FishR), fishing vessel licensing (BoatR), and coastal resource conservation.'
		},
		{
			id: 'gil-glen',
			name: 'Glen C. Gil',
			title: 'Agricultural Technologist II',
			section: 'Fisheries',
			sectionLabel: 'Fisheries Section',
			tier: 'technologist',
			level: 3,
			badge: 'Technical Officer',
			duties: 'Provides technical assistance on aquaculture, marine sanctuary protection, coastal ecosystem rehabilitation, and fisherfolk assistance programs.'
		},
		{
			id: 'arcena-ma-teresa',
			name: 'Ma. Teresa Arcena',
			title: 'Community Organizer',
			section: 'Fisheries',
			sectionLabel: 'Fisheries Section • Community Organizing',
			tier: 'support',
			level: 4,
			badge: 'Community Organizer',
			duties: 'Organizes and strengthens Barangay Fisheries and Aquatic Resources Management Councils (BFARMC) and local fisherfolk associations.'
		},

		// 7. FISHERY LAW ENFORCEMENT TEAM (BANTAY DAGAT / FLET)
		{
			id: 'tabuyan-alex',
			name: 'Alex L. Tabuyan',
			title: 'Fishery Law Enforcement Team Leader',
			section: 'Law Enforcement',
			sectionLabel: 'Fishery Law Enforcement Team',
			tier: 'flet-lead',
			level: 4,
			badge: 'Team Leader',
			duties: 'Commands the municipal Fishery Law Enforcement Team (FLET / Bantay Dagat); coordinates sea patrols, apprehension of illegal fishing, and protection of marine sanctuaries.'
		},
		{
			id: 'estalane-eje',
			name: 'Eje Estalane',
			title: 'Fishery Law Enforcement Officer',
			section: 'Law Enforcement',
			sectionLabel: 'Fishery Law Enforcement Team',
			tier: 'flet',
			level: 5,
			badge: 'Enforcement Officer',
			duties: 'Conducts regular sea patrols, coastal surveillance, and enforcement of municipal fishery ordinances.'
		},
		{
			id: 'dela-cruz-mark',
			name: 'Mark C. Dela Cruz',
			title: 'Fishery Law Enforcement Officer',
			section: 'Law Enforcement',
			sectionLabel: 'Fishery Law Enforcement Team',
			tier: 'flet',
			level: 5,
			badge: 'Enforcement Officer',
			duties: 'Participates in coastal water patrolling, vessel inspections, and monitoring of marine protected zones.'
		},
		{
			id: 'alicer-randy',
			name: 'Randy Alicer',
			title: 'Fishery Law Enforcement Officer',
			section: 'Law Enforcement',
			sectionLabel: 'Fishery Law Enforcement Team',
			tier: 'flet',
			level: 5,
			badge: 'Enforcement Officer',
			duties: 'Executes coastal surveillance, apprehends violators of fishing regulations, and assists in marine rescue.'
		},
		{
			id: 'pahayahay-romeo',
			name: 'Romeo Pahayahay',
			title: 'Fishery Law Enforcement Officer',
			section: 'Law Enforcement',
			sectionLabel: 'Fishery Law Enforcement Team',
			tier: 'flet',
			level: 5,
			badge: 'Enforcement Officer',
			duties: 'Enforces municipal fisheries regulations, conducts sea-borne inspections, and safeguards sanctuary boundaries.'
		},
		{
			id: 'maglinte-romarico',
			name: 'Romarico Maglinte',
			title: 'Fishery Law Enforcement Officer',
			section: 'Law Enforcement',
			sectionLabel: 'Fishery Law Enforcement Team',
			tier: 'flet',
			level: 5,
			badge: 'Enforcement Officer',
			duties: 'Guards marine protected areas, prevents intrusion of commercial fishing vessels in municipal waters, and logs sea patrols.'
		},
		{
			id: 'cadion-pelagio',
			name: 'Pelagio Cadion',
			title: 'Fishery Law Enforcement Officer',
			section: 'Law Enforcement',
			sectionLabel: 'Fishery Law Enforcement Team',
			tier: 'flet',
			level: 5,
			badge: 'Enforcement Officer',
			duties: 'Assists in day and night sea patrols, apprehends illegal gear users, and protects municipal fish sanctuaries.'
		},
		{
			id: 'lobres-diosdado',
			name: 'Diosdado Lobres',
			title: 'Fishery Law Enforcement Officer',
			section: 'Law Enforcement',
			sectionLabel: 'Fishery Law Enforcement Team',
			tier: 'flet',
			level: 5,
			badge: 'Enforcement Officer',
			duties: 'Conducts marine enforcement patrols and assists barangay fisherfolk in reporting coastal violations.'
		},
		{
			id: 'nogueras-roger',
			name: 'Roger Nogueras',
			title: 'Fishery Law Enforcement Officer',
			section: 'Law Enforcement',
			sectionLabel: 'Fishery Law Enforcement Team',
			tier: 'flet',
			level: 5,
			badge: 'Enforcement Officer',
			duties: 'Maintains patrol boat readiness, executes coastal enforcement rounds, and monitors coastline compliance.'
		},
		{
			id: 'catan-christopher',
			name: 'Christopher Catan',
			title: 'Fishery Law Enforcement Officer',
			section: 'Law Enforcement',
			sectionLabel: 'Fishery Law Enforcement Team',
			tier: 'flet',
			level: 5,
			badge: 'Enforcement Officer',
			duties: 'Patrols municipal marine waters, supports evidence documentation for fishery violations, and guards fish corridors.'
		},
		{
			id: 'operio-marbel',
			name: 'Marbel Operio',
			title: 'Fishery Law Enforcement Officer',
			section: 'Law Enforcement',
			sectionLabel: 'Fishery Law Enforcement Team',
			tier: 'flet',
			level: 5,
			badge: 'Enforcement Officer',
			duties: 'Conducts coastal boundary surveillance, enforces municipal ordinances, and safeguards coastal marine sanctuaries.'
		}
	];

	// Extract primary key figures
	const mayor = personnel.find((p) => p.id === 'merilo-gina');
	const agriculturist = personnel.find((p) => p.id === 'miranda-susana');

	// Groupings
	const livestockTeam = personnel.filter((p) => p.section === 'Livestock' || p.section === 'Special Support');
	const cropsTeam = personnel.filter((p) => p.section === 'Crops');
	const riceTeam = personnel.filter((p) => p.section === 'Rice/HVCDP');
	const extensionTeam = personnel.filter((p) => p.section === 'Extension' || p.section === 'Machinery');
	const fisheriesTeam = personnel.filter((p) => p.section === 'Fisheries');
	const fletTeam = personnel.filter((p) => p.section === 'Law Enforcement');

	// Filtered Personnel for Directory
	const filteredPersonnel = $derived(
		personnel.filter((p) => {
			const matchesSearch =
				searchQuery.trim() === '' ||
				p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.sectionLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.duties.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesSection = selectedSection === 'all' || p.section === selectedSection;

			return matchesSearch && matchesSection;
		})
	);

	function inspectMember(member) {
		selectedMember = member;
	}

	function closeInspect() {
		selectedMember = null;
	}
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && closeInspect()} />

<div class="w-full space-y-6">
	<!-- TOP CONTROL HEADER & TABS -->
	<div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b-2 border-slate-200">
		<div>
			<div class="flex items-center gap-2">
				<span class="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-950 uppercase tracking-wide">
					<span class="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
					Official Supervisory Structure
				</span>
				<span class="text-xs font-bold text-slate-500 hidden sm:inline-block">
					36 Total Personnel // 5 Functional Units
				</span>
			</div>
			<h3 class="text-xl sm:text-2xl font-black text-blue-950 tracking-tight mt-1">
				Municipal Agriculture Office (MAO) Hierarchy
			</h3>
		</div>

		<div class="flex flex-wrap items-center gap-2">
			<!-- Mode Switcher -->
			<div class="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-2xs">
				<button
					type="button"
					onclick={() => (activeTab = 'organogram')}
					class={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
						activeTab === 'organogram'
							? 'bg-blue-950 text-amber-300 shadow-xs'
							: 'text-slate-600 hover:text-blue-950 hover:bg-white/60'
					}`}
				>
					<span>Organogram</span>
				</button>

				<button
					type="button"
					onclick={() => (activeTab = 'directory')}
					class={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
						activeTab === 'directory'
							? 'bg-blue-950 text-amber-300 shadow-xs'
							: 'text-slate-600 hover:text-blue-950 hover:bg-white/60'
					}`}
				>
					<span>Directory ({personnel.length})</span>
				</button>

				<button
					type="button"
					onclick={() => (activeTab = 'document')}
					class={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
						activeTab === 'document'
							? 'bg-blue-950 text-amber-300 shadow-xs'
							: 'text-slate-600 hover:text-blue-950 hover:bg-white/60'
					}`}
				>
					<span>Official Chart (PDF)</span>
				</button>
			</div>

			<!-- PDF Download -->
			<a
				href="/Municipal_Agriculture_Office_Org_Chart.pdf"
				download="Municipal_Agriculture_Office_Org_Chart.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-950 transition-colors shadow-2xs"
				title="Download official PDF chart"
			>
				<span>Download PDF</span>
			</a>
		</div>
	</div>

	<!-- TAB 1: INTERACTIVE ORGANOGRAM TREE -->
	{#if activeTab === 'organogram'}
		<div class="w-full rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-8 shadow-sm flex flex-col items-center relative overflow-hidden">
			<!-- Subtle Seal Watermark -->
			<img
				src="/tanauan logo.svg"
				alt=""
				class="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none"
			/>

			<!-- LEVEL 1: MUNICIPAL MAYOR -->
			{#if mayor}
				<div class="relative flex flex-col items-center mb-6 z-10">
					<button
						type="button"
						onclick={() => inspectMember(mayor)}
						class="group relative flex flex-col items-center rounded-2xl bg-gradient-to-b from-blue-950 to-blue-900 text-white p-5 border-2 border-amber-400 shadow-md hover:shadow-xl transition-all hover:scale-105 text-center w-72 sm:w-80 cursor-pointer"
					>
						<div class="px-3 py-0.5 rounded-full bg-amber-400 text-blue-950 text-[10px] font-black uppercase tracking-wider mb-2">
							Executive Leadership
						</div>
						<h4 class="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-amber-300">
							{mayor.name}
						</h4>
						<p class="text-xs font-bold text-amber-300 uppercase tracking-wider mt-0.5">
							{mayor.title}
						</p>
						<span class="mt-2 text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-full font-semibold">
							Click to view profile
						</span>
					</button>

					<!-- Connector to Municipal Agriculturist -->
					<div class="w-0.5 h-6 bg-blue-950 mt-1"></div>
				</div>
			{/if}

			<!-- LEVEL 2: MUNICIPAL AGRICULTURIST -->
			{#if agriculturist}
				<div class="relative flex flex-col items-center mb-8 z-10">
					<button
						type="button"
						onclick={() => inspectMember(agriculturist)}
						class="group relative flex flex-col items-center rounded-2xl bg-gradient-to-b from-blue-900 to-blue-950 text-white p-5 border-2 border-amber-400 shadow-md hover:shadow-xl transition-all hover:scale-105 text-center w-72 sm:w-84 cursor-pointer"
					>
						<div class="px-3 py-0.5 rounded-full bg-amber-400 text-blue-950 text-[10px] font-black uppercase tracking-wider mb-2">
							Office Department Head
						</div>
						<h4 class="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-amber-300">
							{agriculturist.name}
						</h4>
						<p class="text-xs font-bold text-amber-300 uppercase tracking-wider mt-0.5">
							{agriculturist.title}
						</p>
						<span class="mt-2 text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-full font-semibold">
							Click to view responsibilities
						</span>
					</button>

					<!-- Connector Line to Horizontal Bus -->
					<div class="w-0.5 h-8 bg-blue-950 mt-1"></div>
				</div>
			{/if}

			<!-- HORIZONTAL DISTRIBUTION BUS (Spans all operational sections) -->
			<div class="w-full relative hidden xl:block mb-8">
				<div class="w-[90%] mx-auto h-0.5 bg-blue-950 relative">
					<!-- Vertical drop lines to each of the 5 main sections -->
					<div class="absolute left-0 -top-0.5 w-0.5 h-6 bg-blue-950"></div>
					<div class="absolute left-[24%] -top-0.5 w-0.5 h-6 bg-blue-950"></div>
					<div class="absolute left-[48%] -top-0.5 w-0.5 h-6 bg-blue-950"></div>
					<div class="absolute left-[72%] -top-0.5 w-0.5 h-6 bg-blue-950"></div>
					<div class="absolute right-0 -top-0.5 w-0.5 h-6 bg-blue-950"></div>
				</div>
			</div>

			<!-- 5 OPERATIONAL DIVISIONS GRID -->
			<div class="w-full space-y-8">
				<!-- SECTION 1: LIVESTOCK & SPECIAL SUPPORT HUB -->
				<div class="rounded-2xl border-2 border-blue-900/30 bg-blue-50/40 p-5 shadow-xs">
					<div class="flex flex-wrap items-center justify-between border-b border-blue-200 pb-3 mb-4 gap-2">
						<div class="flex items-center gap-2">
							<span class="h-3 w-3 rounded-full bg-blue-800"></span>
							<h4 class="text-sm font-black text-blue-950 uppercase tracking-wide">
								Livestock Section, Monitoring &amp; Special Support ({livestockTeam.length})
							</h4>
						</div>
						<span class="text-[11px] font-bold text-slate-500">
							Animal Health • M&amp;E • PCA • PCIC • Seeds &amp; IT
						</span>
					</div>

					<!-- Section Lead & M&E -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
						{#each livestockTeam.slice(0, 3) as member}
							<button
								type="button"
								onclick={() => inspectMember(member)}
								class="flex flex-col bg-white rounded-xl p-3.5 border-2 border-blue-900/20 hover:border-blue-900 shadow-2xs hover:shadow-md transition-all text-left cursor-pointer group"
							>
								<div class="flex items-center justify-between gap-1 mb-1.5">
									<span class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
										{member.badge}
									</span>
								</div>
								<h5 class="text-xs font-black text-blue-950 group-hover:text-blue-700 leading-snug">
									{member.name}
								</h5>
								<p class="text-[11px] font-bold text-amber-700 mt-0.5">
									{member.title}
								</p>
								<p class="text-[10px] text-slate-500 mt-1 line-clamp-2">
									{member.duties}
								</p>
							</button>
						{/each}
					</div>

					<!-- Sub-tier: Special Agency, Insurance & Seeds Distribution -->
					<div class="border-t border-blue-100 pt-3">
						<span class="text-[10px] font-black uppercase text-blue-900 tracking-wider block mb-2">
							Institutional Support &amp; Field Coordination
						</span>
						<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
							{#each livestockTeam.slice(3) as member}
								<button
									type="button"
									onclick={() => inspectMember(member)}
									class="flex flex-col bg-white rounded-lg p-2.5 border border-slate-200 hover:border-blue-700 hover:shadow-xs transition-all text-left cursor-pointer group"
								>
									<span class="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 self-start mb-1">
										{member.badge}
									</span>
									<h6 class="text-[11px] font-black text-blue-950 group-hover:text-blue-700 leading-tight">
										{member.name}
									</h6>
									<p class="text-[10px] font-semibold text-slate-500 mt-0.5 truncate">
										{member.title}
									</p>
								</button>
							{/each}
						</div>
					</div>
				</div>

				<!-- SECTION 2 & 3: CROP SECTION + RICE & HVCDP -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<!-- Crops -->
					<div class="rounded-2xl border-2 border-emerald-900/30 bg-emerald-50/40 p-5 shadow-xs">
						<div class="flex items-center justify-between border-b border-emerald-200 pb-3 mb-4">
							<div class="flex items-center gap-2">
								<span class="h-3 w-3 rounded-full bg-emerald-700"></span>
								<h4 class="text-sm font-black text-blue-950 uppercase tracking-wide">
									Crop Production Section ({cropsTeam.length})
								</h4>
							</div>
							<span class="text-[11px] font-bold text-slate-500">Corn &amp; Cassava</span>
						</div>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
							{#each cropsTeam as member}
								<button
									type="button"
									onclick={() => inspectMember(member)}
									class="flex flex-col bg-white rounded-xl p-3.5 border-2 border-emerald-900/20 hover:border-emerald-800 shadow-2xs hover:shadow-md transition-all text-left cursor-pointer group"
								>
									<span class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 self-start mb-1.5">
										{member.badge}
									</span>
									<h5 class="text-xs font-black text-blue-950 group-hover:text-emerald-800 leading-snug">
										{member.name}
									</h5>
									<p class="text-[11px] font-bold text-amber-700 mt-0.5">
										{member.title}
									</p>
									<p class="text-[10px] text-slate-500 mt-1 line-clamp-2">
										{member.duties}
									</p>
								</button>
							{/each}
						</div>
					</div>

					<!-- Rice & HVCDP -->
					<div class="rounded-2xl border-2 border-amber-900/30 bg-amber-50/40 p-5 shadow-xs">
						<div class="flex items-center justify-between border-b border-amber-200 pb-3 mb-4">
							<div class="flex items-center gap-2">
								<span class="h-3 w-3 rounded-full bg-amber-600"></span>
								<h4 class="text-sm font-black text-blue-950 uppercase tracking-wide">
									Rice &amp; High Value Crops (HVCDP) ({riceTeam.length})
								</h4>
							</div>
							<span class="text-[11px] font-bold text-slate-500">Rice &amp; Vegetables</span>
						</div>

						<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
							{#each riceTeam as member}
								<button
									type="button"
									onclick={() => inspectMember(member)}
									class="flex flex-col bg-white rounded-xl p-3.5 border-2 border-amber-900/20 hover:border-amber-700 shadow-2xs hover:shadow-md transition-all text-left cursor-pointer group"
								>
									<span class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 self-start mb-1.5">
										{member.badge}
									</span>
									<h5 class="text-xs font-black text-blue-950 group-hover:text-amber-800 leading-snug">
										{member.name}
									</h5>
									<p class="text-[11px] font-bold text-amber-700 mt-0.5">
										{member.title}
									</p>
									<p class="text-[10px] text-slate-500 mt-1 line-clamp-2">
										{member.duties}
									</p>
								</button>
							{/each}
						</div>
					</div>
				</div>

				<!-- SECTION 4: EXTENSION & FARM MACHINERY -->
				<div class="rounded-2xl border-2 border-slate-300 bg-slate-50/50 p-5 shadow-xs">
					<div class="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 mb-4 gap-2">
						<div class="flex items-center gap-2">
							<span class="h-3 w-3 rounded-full bg-slate-700"></span>
							<h4 class="text-sm font-black text-blue-950 uppercase tracking-wide">
								Extension Services &amp; Farm Machinery Operations ({extensionTeam.length})
							</h4>
						</div>
						<span class="text-[11px] font-bold text-slate-500">
							Extension Personnel • Tractor Operators • Machinery Crew
						</span>
					</div>

					<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
						{#each extensionTeam as member}
							<button
								type="button"
								onclick={() => inspectMember(member)}
								class="flex flex-col bg-white rounded-xl p-3 border border-slate-200 hover:border-blue-900 shadow-2xs hover:shadow-md transition-all text-left cursor-pointer group"
							>
								<span
									class={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full self-start mb-1 ${
										member.tier === 'technologist'
											? 'bg-blue-100 text-blue-900'
											: member.tier === 'operator'
											? 'bg-amber-100 text-amber-900'
											: 'bg-slate-100 text-slate-700'
									}`}
								>
									{member.badge}
								</span>
								<h6 class="text-xs font-black text-blue-950 group-hover:text-blue-700 leading-tight">
									{member.name}
								</h6>
								<p class="text-[10px] font-bold text-slate-500 mt-0.5 truncate">
									{member.title}
								</p>
							</button>
						{/each}
					</div>
				</div>

				<!-- SECTION 5: FISHERIES SECTION & LAW ENFORCEMENT TEAM -->
				<div class="rounded-2xl border-2 border-sky-900/30 bg-sky-50/40 p-5 shadow-xs">
					<div class="flex flex-wrap items-center justify-between border-b border-sky-200 pb-3 mb-4 gap-2">
						<div class="flex items-center gap-2">
							<span class="h-3 w-3 rounded-full bg-sky-700"></span>
							<h4 class="text-sm font-black text-blue-950 uppercase tracking-wide">
								Fisheries Section &amp; Coastal Marine Resources ({fisheriesTeam.length + fletTeam.length})
							</h4>
						</div>
						<span class="text-[11px] font-bold text-slate-500">
							Fisheries Technologists • Community Organizer • Fishery Law Enforcement
						</span>
					</div>

					<!-- Fisheries Technologists & Community Organizer -->
					<div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
						{#each fisheriesTeam as member}
							<button
								type="button"
								onclick={() => inspectMember(member)}
								class="flex flex-col bg-white rounded-xl p-3.5 border-2 border-sky-900/20 hover:border-sky-800 shadow-2xs hover:shadow-md transition-all text-left cursor-pointer group"
							>
								<span class="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-900 self-start mb-1.5">
									{member.badge}
								</span>
								<h5 class="text-xs font-black text-blue-950 group-hover:text-sky-800 leading-snug">
									{member.name}
								</h5>
								<p class="text-[11px] font-bold text-amber-700 mt-0.5">
									{member.title}
								</p>
								<p class="text-[10px] text-slate-500 mt-1 line-clamp-2">
									{member.duties}
								</p>
							</button>
						{/each}
					</div>

					<!-- Fishery Law Enforcement Team (FLET / Bantay Dagat) -->
					<div class="rounded-2xl border-2 border-blue-950 bg-white p-4 shadow-sm">
						<div class="flex flex-wrap items-center justify-between border-b border-slate-200 pb-2.5 mb-3 gap-2">
							<div class="flex items-center gap-2">
								<span class="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-950 text-amber-300">
									Special Operational Unit
								</span>
								<h5 class="text-xs font-black text-blue-950 uppercase tracking-wider">
									Fishery Law Enforcement Team (FLET / Bantay Dagat)
								</h5>
							</div>
							<span class="text-[10px] font-bold text-slate-500">11 Enforcement Officers</span>
						</div>

						<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
							{#each fletTeam as member}
								<button
									type="button"
									onclick={() => inspectMember(member)}
									class={`flex flex-col rounded-xl p-2.5 border text-left cursor-pointer group transition-all ${
										member.tier === 'flet-lead'
											? 'border-amber-400 bg-blue-50/80 shadow-xs'
											: 'border-slate-200 bg-slate-50/50 hover:border-blue-900 hover:bg-white'
									}`}
								>
									<span
										class={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full self-start mb-1 ${
											member.tier === 'flet-lead'
												? 'bg-blue-950 text-amber-300'
												: 'bg-slate-200 text-slate-800'
										}`}
									>
										{member.badge}
									</span>
									<h6 class="text-[11px] font-black text-blue-950 group-hover:text-blue-700 leading-tight">
										{member.name}
									</h6>
									<p class="text-[9px] font-semibold text-slate-500 mt-0.5 truncate">
										{member.title}
									</p>
								</button>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- TAB 2: SEARCHABLE DIRECTORY -->
	{#if activeTab === 'directory'}
		<div class="w-full space-y-6">
			<!-- Search & Filter Toolbar -->
			<div class="bg-white rounded-2xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
				<div class="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
					<!-- Search Input -->
					<div class="relative flex-1">
						<input
							type="text"
							bind:value={searchQuery}
							placeholder="Search personnel by name, role, section, or program..."
							class="w-full rounded-xl border border-slate-300 pl-4 pr-16 py-2.5 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20"
						/>
						{#if searchQuery}
							<button
								type="button"
								onclick={() => (searchQuery = '')}
								class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 hover:text-slate-600 uppercase"
							>
								Clear
							</button>
						{/if}
					</div>

					<!-- Section Filter -->
					<div class="flex items-center gap-2">
						<select
							bind:value={selectedSection}
							class="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 focus:border-blue-900 focus:outline-none"
						>
							<option value="all">All Sections (36)</option>
							<option value="Executive">Executive Leadership (2)</option>
							<option value="Livestock">Livestock &amp; M&amp;E (3)</option>
							<option value="Special Support">Special Support (PCA, PCIC, IT, Seeds) (5)</option>
							<option value="Crops">Crop Production (2)</option>
							<option value="Rice/HVCDP">Rice &amp; HVCDP (3)</option>
							<option value="Extension">Extension Services (1)</option>
							<option value="Machinery">Farm Machinery &amp; Tractor (6)</option>
							<option value="Fisheries">Fisheries Section (3)</option>
							<option value="Law Enforcement">Fishery Law Enforcement (11)</option>
						</select>
					</div>
				</div>

				<!-- Quick Filter Chips -->
				<div class="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
					<span class="text-[11px] font-black uppercase text-slate-400 mr-1">Showing:</span>
					<span class="font-bold text-blue-950">{filteredPersonnel.length} personnel matching criteria</span>
					{#if searchQuery || selectedSection !== 'all'}
						<button
							type="button"
							onclick={() => {
								searchQuery = '';
								selectedSection = 'all';
							}}
							class="ml-auto text-[11px] font-black text-amber-600 hover:text-amber-800 underline"
						>
							Reset filters
						</button>
					{/if}
				</div>
			</div>

			<!-- Personnel Cards Grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each filteredPersonnel as member}
					<button
						type="button"
						onclick={() => inspectMember(member)}
						class="group flex flex-col justify-between bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-blue-900 hover:shadow-md transition-all text-left cursor-pointer"
					>
						<div>
							<div class="flex items-center justify-between gap-1 mb-2">
								<span class="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
									{member.badge}
								</span>
								<span class="text-[8px] font-bold text-slate-400 uppercase">
									{member.section}
								</span>
							</div>
							<h5 class="text-sm font-black text-blue-950 group-hover:text-blue-800 leading-snug">
								{member.name}
							</h5>
							<p class="text-xs font-bold text-amber-700 mt-0.5">
								{member.title}
							</p>
							<p class="text-[11px] text-slate-500 mt-1">
								{member.sectionLabel}
							</p>
						</div>

						<div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px]">
							<span class="font-bold text-slate-400">Municipality of Tanauan</span>
							<span class="font-black text-blue-950 group-hover:underline">View Details</span>
						</div>
					</button>
				{/each}
			</div>

			{#if filteredPersonnel.length === 0}
				<div class="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-600">
					<p class="text-sm font-black text-blue-950">No personnel found</p>
					<p class="text-xs text-slate-500 mt-1">Try changing your search keywords or active section filter.</p>
				</div>
			{/if}
		</div>
	{/if}

	<!-- TAB 3: OFFICIAL PDF DOCUMENT -->
	{#if activeTab === 'document'}
		<div class="w-full rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-4">
			<div class="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-200 pb-4">
				<div>
					<h3 class="text-base sm:text-lg font-black text-blue-950 uppercase">
						Official Municipal Agriculture Office Structure (PDF)
					</h3>
					<p class="text-xs text-slate-500">
						Official ratified organizational chart from the Municipality of Tanauan records.
					</p>
				</div>
				<a
					href="/Municipal_Agriculture_Office_Org_Chart.pdf"
					download="Municipal_Agriculture_Office_Org_Chart.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-4 py-2 text-xs font-black text-amber-300 uppercase shadow-sm hover:bg-blue-900 transition-all"
				>
					<span>Open / Download PDF</span>
				</a>
			</div>

			<!-- PDF Embed Frame -->
			<div class="relative w-full h-[650px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
				<iframe
					src="/Municipal_Agriculture_Office_Org_Chart.pdf"
					title="Municipal Agriculture Office Official Org Chart PDF"
					class="w-full h-full border-0"
				></iframe>
			</div>
		</div>
	{/if}
</div>

<!-- PERSONNEL PROFILE INSPECTOR MODAL -->
{#if selectedMember}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
	>
		<div class="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-blue-900/30 overflow-hidden">
			<button
				type="button"
				onclick={closeInspect}
				class="absolute top-4 right-4 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs transition-colors"
				aria-label="Close"
			>
				Close
			</button>

			<div>
				<span class="inline-block text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full mb-1.5 bg-blue-950 text-amber-300">
					{selectedMember.badge}
				</span>
				<h3 class="text-xl sm:text-2xl font-black text-blue-950 tracking-tight leading-snug">
					{selectedMember.name}
				</h3>
				<p class="text-xs font-bold text-amber-600 uppercase tracking-wide mt-0.5">
					{selectedMember.title}
				</p>
				<p class="text-xs font-semibold text-slate-500 mt-0.5">
					{selectedMember.sectionLabel}
				</p>
			</div>

			<div class="mt-6 pt-5 border-t border-slate-200 space-y-3">
				<div>
					<h4 class="text-xs font-black uppercase text-blue-950 tracking-wider">
						Scope of Responsibilities &amp; Operations
					</h4>
					<p class="text-xs text-slate-600 mt-1 leading-relaxed">
						{selectedMember.duties}
					</p>
				</div>

				<div class="rounded-xl bg-slate-50 p-3 border border-slate-200 flex items-center justify-between text-xs">
					<span class="text-slate-500 font-bold">LGU Department</span>
					<span class="text-blue-950 font-black">Municipal Agriculture Office (MAO)</span>
				</div>
			</div>

			<div class="mt-6 flex justify-end">
				<button
					type="button"
					onclick={closeInspect}
					class="px-5 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-black uppercase tracking-wider transition-colors"
				>
					Close Profile
				</button>
			</div>
		</div>
	</div>
{/if}
