<script>
	import { onMount } from 'svelte';
	import { fade, scale, fly } from 'svelte/transition';

	// ==========================================
	// OFFICIAL MUNICIPAL ENGINEERING OFFICE HIERARCHY
	// (Extracted directly from Official Tanauan MEO Chart)
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
		office: 'Office of the Municipal Mayor, 2nd Floor, Tanauan Municipal Hall',
		hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
		contact: 'mayor@tanauanleyte.gov.ph',
		overview:
			'Chief Executive of the Municipality of Tanauan, Leyte. Exercises executive authority, overall administrative supervision, and governance over municipal infrastructure, public works, and local development policies.',
		duties: [
			'Exercises general executive supervision over all municipal infrastructure and engineering projects',
			'Authorizes municipal engineering allocations, capital outlay, and heavy equipment acquisition',
			'Enforces all national laws, the National Building Code (PD 1096), and local zoning ordinances',
			'Champions modern, climate-resilient, and disaster-proof public infrastructure for Tanauan'
		],
		services: [
			'Executive Infrastructure Approvals',
			'Municipal Capital Works Program Oversight',
			'Inter-Agency Public Works Coordination'
		],
		expanded: true,
		children: [
			{
				id: 'meo-head',
				name: 'Engr. Raul S. Soliva',
				position: 'Municipal Engineer',
				roleCategory: 'Head of Office',
				badge: 'Department Head',
				level: 2,
				color: '#38bdf8', // sky blue
				glow: 'rgba(56, 189, 248, 0.35)',
				image: '/Engineering/soliva-raul.jpg',
				window: 'Office of the Municipal Engineer',
				office: 'Municipal Engineering Office, Tanauan Town Hall, Real St., Tanauan, Leyte',
				hours: 'Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)',
				contact: 'engineering@tanauanleyte.gov.ph',
				overview:
					'Directs and manages the Municipal Engineering Office, overseeing public infrastructure planning, civil construction, project implementation, and the administration and enforcement of the National Building Code (PD 1096).',
				duties: [
					'Plans, programs, and directs the construction, repair, and maintenance of public buildings, municipal roads, and drainage systems',
					'Acts as the Municipal Building Official enforcing the National Building Code of the Philippines (PD 1096)',
					'Reviews, validates, and approves engineering designs, cost estimates, structural plans, and technical specifications',
					'Supervises project implementation, material testing, safety protocols, and post-construction inspections across 54 barangays'
				],
				services: [
					'Building, Occupancy, & Fencing Permit Approvals',
					'Public Infrastructure Program Direction',
					'Technical Engineering Evaluation & Certification',
					'Annual Public Works Programming'
				],
				expanded: true,
				children: [
					// ==========================================
					// BRANCH 1: PLANNING SECTION
					// ==========================================
					{
						id: 'planning-head',
						sectionTitle: 'PLANNING SECTION',
						name: 'Engr. Realen T. Cabaguing',
						position: 'Planning Section Head / Engineer I',
						roleCategory: 'Planning & Design Section',
						badge: 'Section Head / Engineer I',
						level: 3,
						color: '#a855f7', // purple
						glow: 'rgba(168, 85, 247, 0.35)',
						image: '/Engineering/cabaguing-realen.jpg',
						window: 'Planning & Design Desk',
						office: 'Municipal Engineering Office, Tanauan Town Hall',
						hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
						contact: 'engineering@tanauanleyte.gov.ph',
						overview:
							'Leads the Planning Section, coordinating architectural, structural, civil, and electrical engineering plans, program of works (POW), and cost estimates for municipal infrastructure projects.',
						duties: [
							'Supervises the preparation of comprehensive architectural, structural, and electrical working drawings',
							'Formulates Detailed Engineering Designs (DED), Program of Works (POW), and Detailed Unit Price Analysis (DUPA)',
							'Coordinates technical surveys, site evaluations, and feasibility assessments for upcoming projects',
							'Ensures all designs conform to DPWH standards, accessibility laws (BP 344), and green building guidelines'
						],
						services: [
							'Detailed Engineering Design (DED)',
							'Program of Works (POW) Preparation',
							'Architectural & Structural Plan Evaluation',
							'Cost Estimates & Bill of Materials'
						],
						expanded: true,
						children: [
							// ARCHITECTURAL DIVISION
							{
								id: 'arch-mostajo',
								divisionTitle: 'ARCHITECTURAL DIVISION',
								name: 'Ar. Ofelia M. Mostajo',
								position: 'Architect / Project Personnel',
								roleCategory: 'Architectural Division',
								badge: 'Architect',
								level: 4,
								color: '#ec4899', // pink
								glow: 'rgba(236, 72, 153, 0.3)',
								image: '/Engineering/mostajo-ofelia.jpg',
								window: 'Architectural Design Unit',
								office: 'Municipal Engineering Office, Tanauan Town Hall',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'engineering@tanauanleyte.gov.ph',
								overview:
									'Performs architectural design, space programming, building aesthetic integration, and architectural plan review for municipal civic structures and public facilities.',
								duties: [
									'Prepares 2D drafting and 3D architectural renderings for municipal buildings, public spaces, and parks',
									'Reviews architectural drawings submitted for building permits in compliance with BP 344 and NBCP',
									'Conducts architectural site inspections to ensure compliance with approved design layouts'
								],
								services: [
									'Architectural Drawings & 3D Modeling',
									'Accessibility Law (BP 344) Verification',
									'Building Permit Architectural Clearance'
								],
								expanded: false,
								children: []
							},
							// CIVIL / STRUCTURAL DIVISION
							{
								id: 'civil-devaras',
								divisionTitle: 'CIVIL / STRUCTURAL DIVISION',
								name: 'Engr. Ellsworth Gabriel Devaras',
								position: 'Civil Engineer / Project Personnel',
								roleCategory: 'Civil / Structural Division',
								badge: 'Civil Engineer',
								level: 4,
								color: '#3b82f6', // blue
								glow: 'rgba(59, 130, 246, 0.3)',
								image: '/Engineering/devaras-ellsworth.jpg',
								window: 'Civil & Structural Design Unit',
								office: 'Municipal Engineering Office, Tanauan Town Hall',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'engineering@tanauanleyte.gov.ph',
								overview:
									'Handles structural analysis, civil engineering calculations, concrete and steel design verification, and soil foundation evaluations.',
								duties: [
									'Performs structural calculations, seismic analysis, and wind load engineering evaluations',
									'Drafts structural plans, foundation details, and bar bending schedules',
									'Reviews structural design sheets and soil investigation reports for permit applications'
								],
								services: [
									'Structural Analysis & Plan Certification',
									'Civil Engineering Technical Review',
									'Foundation & Drainage Design'
								],
								expanded: true,
								children: [
									{
										id: 'civil-malate',
										name: 'Margielyn G. Malate',
										position: 'Project Personnel',
										roleCategory: 'Civil / Structural Division',
										badge: 'Project Personnel',
										level: 5,
										color: '#0284c7', // light blue
										glow: 'rgba(2, 132, 199, 0.25)',
										image: '/Engineering/malate-margielyn.jpg',
										window: 'Civil / Structural Project Desk',
										office: 'Municipal Engineering Office, Tanauan Town Hall',
										hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
										contact: 'engineering@tanauanleyte.gov.ph',
										overview:
											'Provides technical drafting assistance, project documentation, bill of materials preparation, and site measurement support for civil works.',
										duties: [
											'Assists in preparing technical documents, cost estimates, and bid documents for civil works',
											'Conducts site measurement, photo-documentation, and field verification for civil projects',
											'Maintains project registry records and design archives'
										],
										services: [
											'Quantity Survey Support',
											'Drafting Assistance & Project Archiving'
										],
										expanded: true,
										children: [
											{
												id: 'civil-tobias',
												name: 'Rhenzo T. Tobias',
												position: 'Project Personnel',
												roleCategory: 'Civil / Structural Division',
												badge: 'Project Personnel',
												level: 5,
												color: '#0284c7',
												glow: 'rgba(2, 132, 199, 0.25)',
												image: '/Engineering/tobias-rhenzo.jpg',
												window: 'Civil / Structural Project Desk',
												office: 'Municipal Engineering Office, Tanauan Town Hall',
												hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
												contact: 'engineering@tanauanleyte.gov.ph',
												overview:
													'Supports civil engineering project surveys, CAD drawing updates, elevation profiling, and material inventory logging.',
												duties: [
													'Assists in topographical and structural surveys for municipal road and drainage alignments',
													'Prepares CAD revisions and as-built drawing documentation',
													'Performs field verification of structural progress'
												],
												services: [
													'CAD Drafting & Field Layout',
													'As-Built Documentation'
												],
												expanded: true,
												children: [
													{
														id: 'civil-udtohan',
														name: 'Analyn A. Udtohan',
														position: 'Project Personnel',
														roleCategory: 'Civil / Structural Division',
														badge: 'Project Personnel',
														level: 5,
														color: '#0284c7',
														glow: 'rgba(2, 132, 199, 0.25)',
														image: '/Engineering/udtohan-analyn.jpg',
														window: 'Civil / Structural Project Desk',
														office: 'Municipal Engineering Office, Tanauan Town Hall',
														hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
														contact: 'engineering@tanauanleyte.gov.ph',
														overview:
															'Provides administrative coordination, engineering document control, contract file tracking, and cross-division project communication.',
														duties: [
															'Organizes engineering blueprints, approved permits, and contractor compliance filings',
															'Maintains logging of civil engineering submittals and transmittal dockets',
															'Coordinates client inquiries regarding municipal project schedules'
														],
														services: [
															'Engineering Document Control',
															'Project Docket Management'
														],
														expanded: true,
														children: [
															{
																id: 'civil-fabre',
																name: 'Laurence Paul Fabre',
																position: 'Project Personnel',
																roleCategory: 'Civil / Structural Division',
																badge: 'Project Personnel',
																level: 5,
																color: '#0284c7',
																glow: 'rgba(2, 132, 199, 0.25)',
																image: '/Engineering/fabre-laurence.jpg',
																window: 'Civil / Structural Project Desk',
																office: 'Municipal Engineering Office, Tanauan Town Hall',
																hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
																contact: 'engineering@tanauanleyte.gov.ph',
																overview:
																	'Provides field support, site reconnaissance, civil works log recording, and material sample handling for the civil and structural division.',
																duties: [
																	'Assists in recording daily construction weather logs and civil project activity',
																	'Supports field personnel during concrete pouring inspections and slump test sampling',
																	'Encodes project milestone reports into municipal database'
																],
																services: [
																	'Field Survey Assistance',
																	'Construction Log Maintenance'
																],
																expanded: false,
																children: []
															}
														]
													}
												]
											}
										]
									}
								]
							},
							// ELECTRICAL DIVISION
							{
								id: 'elec-delmigues',
								divisionTitle: 'ELECTRICAL DIVISION',
								name: 'Engr. Cristian Delmigues',
								position: 'Electrical Engineer I',
								roleCategory: 'Electrical Division',
								badge: 'Electrical Engineer I',
								level: 4,
								color: '#eab308', // yellow
								glow: 'rgba(234, 179, 8, 0.3)',
								image: '/Engineering/delmigues-cristian.jpg',
								window: 'Electrical Division Desk',
								office: 'Municipal Engineering Office, Tanauan Town Hall',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'engineering@tanauanleyte.gov.ph',
								overview:
									'Supervises electrical plan design, load schedule computations, municipal street lighting systems, public electrical safety, and Philippine Electrical Code compliance.',
								duties: [
									'Designs electrical layouts, single-line diagrams, and panel board schedules for municipal buildings',
									'Reviews electrical plans and load calculations for Certificate of Final Electrical Inspection (CFEI)',
									'Supervises the installation and regular maintenance of municipal streetlights and electrical substations'
								],
								services: [
									'Electrical Plan Review & Evaluation',
									'Certificate of Final Electrical Inspection (CFEI)',
									'Municipal Lighting Network Oversight'
								],
								expanded: true,
								children: [
									{
										id: 'elec-macacando',
										name: 'Engr. Jetro Jay C. Macacando',
										position: 'Electrical Engineer',
										roleCategory: 'Electrical Division',
										badge: 'Electrical Engineer',
										level: 5,
										color: '#f59e0b', // amber
										glow: 'rgba(245, 158, 11, 0.25)',
										image: '/Engineering/macacando-jetro.jpg',
										window: 'Electrical Inspection Desk',
										office: 'Municipal Engineering Office, Tanauan Town Hall',
										hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
										contact: 'engineering@tanauanleyte.gov.ph',
										overview:
											'Conducts electrical inspections, voltage testing, generator maintenance monitoring, and field review for electrical wiring installations.',
										duties: [
											'Performs on-site electrical inspections of commercial, residential, and institutional buildings',
											'Inspects municipal backup generators, transformers, and emergency lighting systems',
											'Verifies compliance of wiring materials and safety grounding with the Philippine Electrical Code'
										],
										services: [
											'Electrical Safety Field Inspections',
											'Generator & Transformer Monitoring',
											'CFEI Technical Endorsement'
										],
										expanded: false,
										children: []
									}
								]
							}
						]
					},
					// ==========================================
					// BRANCH 2: PROJECT IMPLEMENTATION SECTION
					// ==========================================
					{
						id: 'impl-head',
						sectionTitle: 'PROJECT IMPLEMENTATION SECTION',
						name: 'Engr. Derwin D. Badion',
						position: 'Implementation Section Head / Engineer II',
						roleCategory: 'Project Implementation Section',
						badge: 'Section Head / Engineer II',
						level: 3,
						color: '#10b981', // emerald
						glow: 'rgba(16, 185, 129, 0.35)',
						image: '/Engineering/badion-derwin.jpg',
						window: 'Project Implementation Unit',
						office: 'Municipal Engineering Office, Tanauan Town Hall',
						hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
						contact: 'engineering@tanauanleyte.gov.ph',
						overview:
							'Leads the Project Implementation Section, overseeing on-site execution, contractor management, quality assurance, construction timelines, and physical accomplishments across all municipal infrastructure contracts.',
						duties: [
							'Supervises physical construction and rehabilitation of municipal roads, seawalls, bridges, and public centers',
							'Reviews contractor Statements of Work Accomplished (SWA) and prepares progress billing certifications',
							'Ensures strict adherence to project timelines, PERT/CPM schedules, and safety regulations',
							'Conducts pre-construction meetings and coordinates utility relocations with external utility providers'
						],
						services: [
							'Infrastructure Project Supervision',
							'Progress Billing & SWA Validation',
							'Quality Control & Materials Compliance',
							'Contractor Progress Audits'
						],
						expanded: true,
						children: [
							{
								id: 'impl-ignacio',
								name: 'Engr. Dennis Ignacio',
								position: 'Project Inspector / Engineering Assistant',
								roleCategory: 'Project Implementation Section',
								badge: 'Engineering Assistant',
								level: 4,
								color: '#059669', // dark emerald
								glow: 'rgba(5, 150, 105, 0.3)',
								image: '/Engineering/ignacio-dennis.jpg',
								window: 'Field Inspection Desk',
								office: 'Municipal Engineering Office, Tanauan Town Hall',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'engineering@tanauanleyte.gov.ph',
								overview:
									'Conducts rigorous on-site quality inspections, concrete and rebar testing verification, and daily construction log monitoring for municipal projects.',
								duties: [
									'Conducts regular field monitoring of contractor construction activities and materials delivered on site',
									'Witnesses material testing (concrete cylinder compression tests, soil compaction tests)',
									'Prepares field inspection reports and flags deficiencies for immediate contractor rectification'
								],
								services: [
									'On-Site Quality Control',
									'Materials Testing Verification',
									'Punchlisting & Final Inspection'
								],
								expanded: true,
								children: [
									{
										id: 'impl-lotoc',
										name: 'Engr. Edner H. Lotoc',
										position: 'Civil Engineer / Project Inspector',
										roleCategory: 'Project Implementation Section',
										badge: 'Civil Engineer / Inspector',
										level: 5,
										color: '#14b8a6', // teal
										glow: 'rgba(20, 184, 166, 0.3)',
										image: '/Engineering/lotoc-edner.jpg',
										window: 'Civil Works Monitoring Desk',
										office: 'Municipal Engineering Office, Tanauan Town Hall',
										hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
										contact: 'engineering@tanauanleyte.gov.ph',
										overview:
											'Monitors civil structural execution, drainage line grades, pavement thickness, and coordinates site surveys during active construction phases.',
										duties: [
											'Verifies grade elevations, road base compaction, and drainage outfall alignments',
											'Monitors structural concrete pours and structural steel bolting/welding standards',
											'Prepares visual progress documentation and bi-weekly engineering accomplishment summaries'
										],
										services: [
											'Civil Works Monitoring',
											'Grade & Alignment Verification',
											'Site Progress Documentation'
										],
										expanded: false,
										children: []
									}
								]
							}
						]
					},
					// ==========================================
					// BRANCH 3: PD 1096 SECTION (BUILDING OFFICIAL)
					// ==========================================
					{
						id: 'pd1096-head',
						sectionTitle: 'PD 1096 SECTION (BUILDING OFFICIAL)',
						name: 'Mr. Hector C. Quizol',
						position: 'PD 1096 Section Head / Engineering Aide',
						roleCategory: 'Building Official Section',
						badge: 'Section Head / Engineering Aide',
						level: 3,
						color: '#f97316', // orange
						glow: 'rgba(249, 115, 22, 0.35)',
						image: '/Engineering/quizol-hector.jpg',
						window: 'PD 1096 / Building Permit Desk',
						office: 'Office of the Building Official, Ground Floor, Tanauan Town Hall',
						hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
						contact: 'engineering@tanauanleyte.gov.ph',
						overview:
							'Heads the PD 1096 Section (Office of the Building Official), managing the intake, regulatory evaluation, routing, and processing of Building, Occupancy, Demolition, and Accessory Permits under the National Building Code of the Philippines.',
						duties: [
							'Receives and screens building permit applications and documentary requirements (NBC Form B-01)',
							'Coordinates technical plan routing among architectural, civil/structural, sanitary, and electrical evaluators',
							'Computes statutory fees pursuant to the IRR of Presidential Decree No. 1096 and local revenue code',
							'Recommends approval and issuance of Building and Occupancy Permits to the Municipal Engineer'
						],
						services: [
							'Building Permit Application (NBC Form B-01)',
							'Occupancy Permit Processing',
							'Fencing, Demolition & Excavation Permits',
							'Signboard & Accessory Permits'
						],
						expanded: true,
						children: [
							{
								id: 'pd1096-cinco',
								name: 'John Ike P. Cinco',
								position: 'Project Personnel / PD1096 Inspector',
								roleCategory: 'Building Official Section',
								badge: 'PD 1096 Inspector',
								level: 4,
								color: '#ea580c', // deep orange
								glow: 'rgba(234, 88, 12, 0.3)',
								image: '/Engineering/cinco-john-ike.jpg',
								window: 'Building Inspection & Enforcement Unit',
								office: 'Office of the Building Official, Ground Floor, Tanauan Town Hall',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'engineering@tanauanleyte.gov.ph',
								overview:
									'Conducts pre-permit site verifications, ongoing construction compliance checks, and final occupancy inspections under the National Building Code (PD 1096).',
								duties: [
									'Conducts on-site verification before building permit approval to ensure zoning setbacks and road right-of-way compliance',
									'Performs periodic compliance inspections of active private and commercial construction sites',
									'Investigates reports of illegal construction or lack of building permits and issues notice of violation when required',
									'Conducts joint final inspection with Bureau of Fire Protection (BFP) for issuance of Certificate of Occupancy'
								],
								services: [
									'Pre-Construction Site Verification',
									'Occupancy Inspection & Safety Clearance',
									'Illegal Construction Monitoring & Notice of Violation'
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
			(person.sectionTitle && person.sectionTitle.toLowerCase().includes(q)) ||
			(person.divisionTitle && person.divisionTitle.toLowerCase().includes(q)) ||
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
		if (orgData.children && orgData.children[0]) {
			orgData.children[0].expanded = true; // keep MEO head visible
		}
	}

	// Zoom Controls
	function zoomIn() {
		zoomScale = Math.min(zoomScale + 0.15, 1.8);
	}

	function zoomOut() {
		zoomScale = Math.max(zoomScale - 0.15, 0.55);
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
<div class="relative w-full overflow-hidden rounded-3xl border-2 border-slate-800 bg-gradient-to-b from-[#09182f] via-[#061226] to-[#030914] p-4 sm:p-8 md:p-10 text-white shadow-2xl">
	<!-- Anti-Gravity Atmospheric Glow Lights -->
	<div class="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl animate-pulse" style="animation-duration: 8s;"></div>
	<div class="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl animate-pulse" style="animation-duration: 10s;"></div>
	<div class="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" style="animation-duration: 7s;"></div>

	<!-- ============================================== -->
	<!-- HEADER: OFFICIAL SEALS & TITLE                 -->
	<!-- ============================================== -->
	<div class="relative z-10 mb-8 flex flex-col items-center justify-between gap-6 border-b border-white/10 pb-6 lg:flex-row">
		<!-- Left: Municipal & Engineering Seals -->
		<div class="flex items-center gap-4 sm:gap-5">
			<div class="relative flex items-center gap-2">
				<img
					src="/HRMO/official-seal.png"
					alt="Municipality of Tanauan Official Seal"
					class="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-amber-400/80 bg-white/10 object-contain p-1 shadow-lg shadow-amber-500/20"
				/>
				<img
					src="/Engineering/engineering-seal.jpg"
					alt="Municipal Engineering Office Seal"
					class="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-sky-400/80 bg-white/10 object-contain p-1 shadow-lg shadow-sky-500/20"
				/>
			</div>
			<div>
				<span class="text-[11px] font-black uppercase tracking-widest text-amber-400 sm:text-xs">
					Municipality of Tanauan, Leyte
				</span>
				<h2 class="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
					Municipal Engineering Office
				</h2>
				<p class="text-xs sm:text-sm font-semibold text-sky-200/80">
					Official Organizational Structure & Engineering Hierarchy
				</p>
			</div>
		</div>

		<!-- Right: Quick Stat Badges -->
		<div class="flex flex-wrap items-center gap-2.5 sm:gap-3">
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Total Personnel</span>
				<span class="text-sm font-black text-amber-300">15 Active Engineers & Staff</span>
			</div>
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Building Code Mandate</span>
				<span class="text-sm font-black text-emerald-400">PD 1096 & RA 7160</span>
			</div>
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Core Sections</span>
				<span class="text-sm font-black text-sky-400">3 Sections • 3 Divisions</span>
			</div>
		</div>
	</div>

	<!-- ============================================== -->
	<!-- INTERACTIVE TOOLBAR: SEARCH, VIEW TOGGLE, ZOOM -->
	<!-- ============================================== -->
	<div class="relative z-10 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 p-3.5 backdrop-blur-md shadow-lg">
		<!-- Search Input with Live Filter -->
		<div class="relative flex-1 max-w-md">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search by name, role, division, service (e.g. Planning, Structural, Electrical, Soliva)..."
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
					title="Expand all branches"
				>
					Expand All
				</button>
				<button
					type="button"
					onclick={collapseAll}
					class="rounded-xl border border-white/15 bg-white/5 px-2.5 py-2 text-xs font-bold text-slate-300 hover:bg-white/15 hover:text-white transition-colors"
					title="Collapse sub-branches"
				>
					Collapse
				</button>

				<!-- Zoom Controls -->
				<div class="flex items-center rounded-xl border border-white/20 bg-slate-900/80 p-1">
					<button
						type="button"
						onclick={zoomOut}
						class="h-8 w-8 rounded-lg text-sm font-black text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
						title="Zoom Out"
					>-</button>
					<span class="px-2 text-xs font-mono font-bold text-amber-300">
						{Math.round(zoomScale * 100)}%
					</span>
					<button
						type="button"
						onclick={zoomIn}
						class="h-8 w-8 rounded-lg text-sm font-black text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
						title="Zoom In"
					>+</button>
					<button
						type="button"
						onclick={resetZoom}
						class="ml-1 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
						title="Reset Zoom to 100%"
					>
						Reset
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- ============================================== -->
	<!-- GRID VIEW: ROLE ROSTER                         -->
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
								{#if !failedImages.has(person.id) && person.image}
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

							<div class="min-w-0 flex-1">
								<span
									class="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider"
									style="background-color: {person.color}25; color: {person.color}; border: 1px solid {person.color}66;"
								>
									{person.badge}
								</span>
								<h3 class="mt-1 text-base font-black text-white group-hover:text-amber-300 transition-colors leading-tight truncate">
									{person.name}
								</h3>
								<p class="text-xs font-bold text-sky-200 mt-0.5 leading-snug">
									{person.position}
								</p>
								<p class="mt-1 text-[11px] font-medium text-slate-400 truncate">
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
			class="relative min-h-[750px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-8 cursor-grab active:cursor-grabbing select-none"
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
				<!-- LEVEL 1: LOCAL CHIEF EXECUTIVE (ROOT)          -->
				<!-- ============================================== -->
				<div class="relative flex flex-col items-center">
					{@render nodeCard(orgData)}

					<!-- Connector downward to Municipal Engineer -->
					{#if orgData.expanded && orgData.children && orgData.children.length > 0}
						<div class="relative flex flex-col items-center">
							<!-- Vertical connection line -->
							<div class="h-10 w-1 bg-gradient-to-b from-amber-400 to-sky-400 shadow-sm shadow-amber-400/50"></div>

							<!-- ============================================== -->
							<!-- LEVEL 2: MUNICIPAL ENGINEER (HEAD OF OFFICE)   -->
							<!-- ============================================== -->
							{#each orgData.children as meo (meo.id)}
								<div class="relative flex flex-col items-center">
									{@render nodeCard(meo)}

									<!-- Connector to Level 3 Sections -->
									{#if meo.expanded && meo.children && meo.children.length > 0}
										<div class="relative flex flex-col items-center w-full pt-10">
											<!-- Top vertical stem -->
											<div class="absolute top-0 h-8 w-1 bg-sky-400 shadow-sm shadow-sky-400/50"></div>

											<!-- Horizontal Connecting Bar across 3 main sections -->
											<div class="relative flex items-start justify-center gap-8 sm:gap-14 pt-4">
												<!-- Crossbar spanning the 3 sections -->
												<div class="pointer-events-none absolute top-0 left-20 right-20 h-1 bg-gradient-to-r from-purple-400 via-emerald-400 to-orange-400 shadow-sm"></div>

												<!-- ============================================== -->
												<!-- LEVEL 3: THE 3 SECTIONS                        -->
												<!-- ============================================== -->
												{#each meo.children as section (section.id)}
													<div class="relative flex flex-col items-center">
														<!-- Drop line from crossbar -->
														<div class="h-6 w-1" style="background-color: {section.color};"></div>

														<!-- Section Title Pill -->
														{#if section.sectionTitle}
															<div
																class="mb-3 rounded-xl px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-center shadow-md"
																style="background-color: {section.color}25; color: {section.color}; border: 1.5px solid {section.color}80;"
															>
																{section.sectionTitle}
															</div>
														{/if}

														{@render nodeCard(section)}

														<!-- ============================================== -->
														<!-- SECTION 1 (PLANNING): 3 DIVISIONS             -->
														<!-- ============================================== -->
														{#if section.id === 'planning-head' && section.expanded && section.children && section.children.length > 0}
															<div class="relative flex flex-col items-center w-full pt-10">
																<!-- Stem line down from Planning Section Head -->
																<div class="absolute top-0 h-8 w-1 bg-purple-400 shadow-sm shadow-purple-400/50"></div>

																<!-- Horizontal Bar spanning Architectural, Civil, Electrical -->
																<div class="relative flex items-start justify-center gap-6 sm:gap-8 pt-4">
																	<div class="pointer-events-none absolute top-0 left-16 right-16 h-1 bg-gradient-to-r from-pink-400 via-blue-400 to-yellow-400 shadow-sm"></div>

																	{#each section.children as division (division.id)}
																		<div class="relative flex flex-col items-center">
																			<div class="h-6 w-1" style="background-color: {division.color};"></div>

																			<!-- Division Title Header Box -->
																			{#if division.divisionTitle}
																				<div
																					class="mb-2.5 rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-center"
																					style="background-color: {division.color}20; color: {division.color}; border: 1px solid {division.color}60;"
																				>
																					{division.divisionTitle}
																				</div>
																			{/if}

																			{@render nodeCard(division)}

																			<!-- Recursive Vertical Column Rendering for sub-personnel (e.g. Civil personnel list & Electrical) -->
																			{#if division.expanded && division.children && division.children.length > 0}
																				{@render verticalStack(division.children)}
																			{/if}
																		</div>
																	{/each}
																</div>
															</div>

														<!-- ============================================== -->
														<!-- SECTION 2 & 3: VERTICAL STACK BRANCHES        -->
														<!-- ============================================== -->
														{:else if section.expanded && section.children && section.children.length > 0}
															<div class="relative flex flex-col items-center pt-2">
																{@render verticalStack(section.children)}
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
	<!-- FOOTER LEGEND & INSTRUCTIONS                   -->
	<!-- ============================================== -->
	<div class="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400">
		<div class="flex flex-wrap items-center gap-4">
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#f59e0b] shadow-sm shadow-amber-400/50"></span>
				<span class="font-bold text-slate-200">Executive Governance</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#38bdf8] shadow-sm shadow-sky-400/50"></span>
				<span class="font-bold text-slate-200">Municipal Engineer (Head)</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#a855f7] shadow-sm shadow-purple-400/50"></span>
				<span class="font-bold text-slate-200">Planning Section</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#10b981] shadow-sm shadow-emerald-400/50"></span>
				<span class="font-bold text-slate-200">Project Implementation</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#f97316] shadow-sm shadow-orange-400/50"></span>
				<span class="font-bold text-slate-200">PD 1096 (Building Official)</span>
			</span>
		</div>
		<div class="flex items-center gap-2 text-slate-400 font-semibold">
			<span class="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
			<span>Click any node to view official duties, contact & services</span>
		</div>
	</div>
</div>

<!-- ============================================== -->
<!-- REUSABLE SNIPPET: VERTICAL STACK RENDERER      -->
<!-- ============================================== -->
{#snippet verticalStack(children)}
	{#each children as child (child.id)}
		<div class="relative flex flex-col items-center">
			<!-- Vertical drop connector -->
			<div class="h-8 w-1" style="background-color: {child.color};"></div>
			{@render nodeCard(child)}

			{#if child.expanded && child.children && child.children.length > 0}
				{@render verticalStack(child.children)}
			{/if}
		</div>
	{/each}
{/snippet}

<!-- ============================================== -->
<!-- REUSABLE SNIPPET: NODE CARD COMPONENT          -->
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
				{#if !failedImages.has(person.id) && person.image}
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
				class="mb-1.5 inline-block rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-xs text-center"
				style="background-color: {person.color}25; color: {person.color}; border: 1px solid {person.color}80;"
			>
				{person.badge}
			</span>

			<!-- Full Name -->
			<h3 class="text-center text-sm sm:text-base font-black text-white leading-tight transition-colors group-hover:text-amber-300">
				{person.name}
			</h3>

			<!-- Official Position -->
			<p class="mt-0.5 text-center text-xs font-bold text-sky-200 leading-snug">
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
<!-- INTERACTIVE PERSON PROFILE DETAIL MODAL        -->
<!-- ============================================== -->
{#if selectedPerson}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
		role="dialog"
		aria-modal="true"
		aria-labelledby="person-detail-title"
	>
		<!-- Dim / Blurred Backdrop -->
		<button
			type="button"
			class="absolute inset-0 w-full h-full bg-blue-950/80 backdrop-blur-md transition-opacity cursor-pointer border-0"
			onclick={closeDetail}
			aria-label="Close dialog backdrop"
			transition:fade={{ duration: 200 }}
		></button>

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
						{#if !failedImages.has(selectedPerson.id) && selectedPerson.image}
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

				<!-- Technical / Permitting Services Handled -->
				{#if selectedPerson.services && selectedPerson.services.length > 0}
					<div>
						<div class="mb-2 text-[11px] font-black uppercase tracking-wider text-emerald-400">
							Technical Services & Permitting Clearance Handled
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
					Tanauan Municipal Government • Municipal Engineering Office
				</span>
				<div class="flex items-center gap-2">
					<a
						href="/citizens-charter/engineering"
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
