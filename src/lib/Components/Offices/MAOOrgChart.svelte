<script>
	import { onMount } from 'svelte';
	import { fade, fly, scale, slide } from 'svelte/transition';

	// Selected officer for detail drawer
	let selectedPersonnel = $state(null);

	// Search and filter state
	let searchQuery = $state('');
	let activeSectionFilter = $state('all');
	let activeView = $state('chart'); // 'chart' | 'directory'

	// Expand/Collapse state for sections in chart view
	let collapsedSections = $state({
		livestockTech: false,
		crops: false,
		extensionMachinery: false,
		fisheries: false,
		enforcement: false
	});

	function toggleSection(secKey) {
		collapsedSections[secKey] = !collapsedSections[secKey];
	}

	function expandAll() {
		collapsedSections = {
			livestockTech: false,
			crops: false,
			extensionMachinery: false,
			fisheries: false,
			enforcement: false
		};
	}

	function collapseAll() {
		collapsedSections = {
			livestockTech: true,
			crops: true,
			extensionMachinery: true,
			fisheries: true,
			enforcement: true
		};
	}

	function openPersonnelModal(person) {
		selectedPersonnel = person;
	}

	function closePersonnelModal() {
		selectedPersonnel = null;
	}

	function handleKeydown(e) {
		if (e.key === 'Escape' && selectedPersonnel) {
			closePersonnelModal();
		}
	}

	// Lock body scroll when drawer is open
	$effect(() => {
		if (typeof document !== 'undefined') {
			if (selectedPersonnel) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		}
		return () => {
			if (typeof document !== 'undefined') {
				document.body.style.overflow = '';
			}
		};
	});

	// --- 1. LEADERSHIP ---
	const mayor = {
		id: 'mayor',
		name: 'Hon. Ma. Gina E. Merilo',
		title: 'Municipal Mayor',
		level: 'executive',
		section: 'Municipal Executive Governance',
		sectionKey: 'leadership',
		badge: 'Municipal Chief Executive',
		tag: 'Appointing Authority',
		icon: '🏛️',
		avatarText: 'GM',
		accentColor: '#F59E0B',
		office: 'Office of the Municipal Mayor, 2nd Floor, Tanauan Town Hall',
		email: 'mayor@tanauanleyte.gov.ph',
		contact: '(053) 321-2045 / Municipal Trunkline',
		schedule: 'Monday to Friday | 8:00 AM – 5:00 PM',
		bio: 'Municipal Mayor and Appointing Authority of Tanauan, Leyte, providing overarching executive leadership, funding mobilization, and policy support for local agricultural transformation, food security, and rural livelihood upliftment.',
		responsibilities: [
			'Exercises executive supervision and strategic policy direction over the Municipal Agriculture Office',
			'Approves municipal agricultural development masterplans, food security programs, and calamity interventions',
			'Signs agricultural infrastructure grants, machinery funding, and farmer subsidy ordinances',
			'Mobilizes inter-agency partnerships with the Department of Agriculture, PhilRice, BFAR, and PCA'
		],
		services: [
			'Executive approval for Municipal Tractor & Heavy Machinery deployment',
			'LGU counterpart agricultural subsidy endorsements',
			'Special Farmer & Fisherfolk Emergency Calamity Relief'
		],
		tags: ['Executive Leadership', 'Policy Direction', 'LGU Governance', 'Agricultural Subsidies']
	};

	const headOfOffice = {
		id: 'head-of-office',
		name: 'Susana O. Miranda',
		title: 'Municipal Agriculturist',
		level: 'head',
		section: 'Office of the Municipal Agriculturist',
		sectionKey: 'leadership',
		badge: 'Department Head',
		tag: 'Head of Office',
		icon: '🌾',
		avatarText: 'SM',
		accentColor: '#3B82F6',
		office: 'Ground Floor, Agricultural Extension Office, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
		email: 'agriculture@tanauanleyte.gov.ph',
		contact: '(053) 321-2045 / +63 917 842 6110',
		schedule: 'Monday to Friday | 8:00 AM – 5:00 PM (No Noon Break)',
		bio: 'Licensed Agriculturist heading the Municipal Agriculture Office of Tanauan, Leyte. Spearheads comprehensive extension services, seed and fertilizer dispersal, veterinary public health, fisheries conservation, and agricultural modernizations across all 54 barangays.',
		responsibilities: [
			'Formulates and executes the Municipal Agricultural & Fishery Development Plan (MAFDP)',
			'Directs and evaluates all technical divisions: Crops, Livestock, Extension, Fisheries, and Law Enforcement',
			'Coordinates with DA Region 8, PhilRice, BFAR, PCA, and PCIC for regional programs implementation',
			'Oversees registry validation (RSBSA) and ensures timely delivery of free inputs to registered farmers',
			'Advises the Municipal Mayor and Sangguniang Bayan on agricultural ordinances and food security strategies'
		],
		services: [
			'Agricultural Extension & Technical Advisory Intake',
			'Registry System for Basic Sectors in Agriculture (RSBSA) Validation',
			'Municipal Calamity Damage Assessment & Crop Loss Endorsements',
			'Department of Agriculture Inter-Agency Liaison'
		],
		tags: ['Department Head', 'Extension Leadership', 'Food Security', 'Strategic Planning', 'RSBSA Supervision']
	};

	// --- 2. DIVISIONS & PERSONNEL DATA ---
	const divisions = [
		{
			key: 'livestockTech',
			name: 'Livestock, Monitoring, IT & Support Units',
			shortName: 'Livestock & Support',
			icon: '🐄',
			badge: 'Section 01 // Animal Health, M&E, PCIC & Geotagging',
			accent: '#D97706',
			description: 'Veterinary care, livestock immunization, crop insurance facilitation, project M&E, IT geotagging, and seed distribution support.',
			lead: {
				id: 'jimmy-lou-tebrero',
				name: 'Jimmy Lou Tebrero',
				title: 'Agricultural Technologist II',
				role: 'Livestock Section Lead',
				section: 'Livestock Section',
				sectionKey: 'livestockTech',
				badge: 'Division Lead',
				icon: '🐄',
				avatarText: 'JT',
				office: 'MAO Livestock Unit, Ground Floor',
				email: 'livestock@tanauanleyte.gov.ph',
				contact: '(053) 321-2045 / Loc. 118',
				responsibilities: [
					'Supervises municipal veterinary outreach, anti-rabies drives, and animal health clinics',
					'Monitors poultry, swine, and ruminant populations across all 54 barangays',
					'Conducts diagnosis and treatment of livestock ailments and facilitates veterinary drug dispensation',
					'Issues Veterinary Health Certificates and shipping permits for livestock movement'
				],
				services: [
					'Animal Care & Veterinary Consultation',
					'Canine & Feline Anti-Rabies Vaccination',
					'Livestock Deworming & Vitamin Supplementation',
					'Veterinary Shipping Clearance'
				],
				tags: ['Veterinary Care', 'Anti-Rabies Drive', 'Livestock Health', 'Animal Technologist']
			},
			personnel: [
				{
					id: 'hospicio-cesar',
					name: 'Hospicio Cesar',
					title: 'PCA Personnel',
					role: 'Philippine Coconut Authority Liaison',
					section: 'Livestock & Support Units',
					sectionKey: 'livestockTech',
					badge: 'PCA Partner Unit',
					icon: '🥥',
					avatarText: 'HC',
					office: 'MAO Extension Desk / PCA Satellite',
					email: 'pca@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Liaises between the Philippine Coconut Authority (PCA) and Tanauan coconut farmers',
						'Coordinates coconut fertilization, replanting, and pest management programs',
						'Validates Coconut Farmers and Industry Trust Fund (CFITF) registrations',
						'Assists in salt fertilizer and hybrid coconut seedling distribution'
					],
					services: [
						'PCA Coconut Farmer Registry Processing',
						'Salt Fertilizer Dispersal Assistance',
						'Coconut Seedling Replanting Support'
					],
					tags: ['Coconut Development', 'PCA Programs', 'CFITF Verification', 'Agri Extension']
				},
				{
					id: 'exuperio-cordero',
					name: 'Exuperio Cordero',
					title: 'Monitoring & Evaluation Point Person',
					role: 'Project Performance & Field Validator',
					section: 'Livestock & Support Units',
					sectionKey: 'livestockTech',
					badge: 'M&E Officer',
					icon: '📊',
					avatarText: 'EC',
					office: 'MAO Planning Desk',
					email: 'me.cordero@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Tracks field implementation milestones of municipal and DA-funded programs',
						'Conducts on-site verification of seed germinations, harvest yields, and project beneficiaries',
						'Prepares periodic monitoring reports for the Sangguniang Bayan and provincial monitors',
						'Validates disaster damage assessments submitted by barangay agricultural coordinators'
					],
					services: [
						'Field Program Monitoring & Spot Checks',
						'Agricultural Yield Verification',
						'Calamity Damage Field Inspection'
					],
					tags: ['Monitoring & Evaluation', 'Yield Validation', 'Project Tracking', 'Field Verification']
				},
				{
					id: 'rommel-de-san-miguel',
					name: 'Rommel De San Miguel',
					title: 'Monitoring & Evaluation Point Person',
					role: 'Project Performance & Field Validator',
					section: 'Livestock & Support Units',
					sectionKey: 'livestockTech',
					badge: 'M&E Officer',
					icon: '📊',
					avatarText: 'RS',
					office: 'MAO Planning Desk',
					email: 'me.sanmiguel@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Executes structured field surveys and evaluates program delivery efficiency',
						'Maintains database of monitored farmer beneficiaries and distribution audit logs',
						'Cross-checks beneficiary compliance for government subsidized inputs',
						'Prepares quarterly performance scorecards for MAO management review'
					],
					services: [
						'Quarterly Performance Scorecard Preparation',
						'Farmer Beneficiary Verification',
						'Input Utilization Audit'
					],
					tags: ['M&E Systems', 'Performance Auditing', 'Field Surveillance', 'Data Analytics']
				},
				{
					id: 'willy-moralina',
					name: 'Willy Moralina',
					title: 'PCIC Focal Person',
					role: 'Philippine Crop Insurance Corp Specialist',
					section: 'Livestock & Support Units',
					sectionKey: 'livestockTech',
					badge: 'Insurance Specialist',
					icon: '🛡️',
					avatarText: 'WM',
					office: 'MAO Crop Insurance Window',
					email: 'pcic.moralina@tanauanleyte.gov.ph',
					contact: '(053) 321-2045 / Loc. 119',
					responsibilities: [
						'Assists farmers and fisherfolk in filing PCIC crop and livestock insurance applications',
						'Processes Notice of Loss (NOL) and Claims of Indemnity following natural typhoons or floods',
						'Coordinates field damage adjusters from PCIC Region VIII for rapid compensation release',
						'Conducts farmer orientation seminars on free government-subsidized insurance coverage'
					],
					services: [
						'PCIC Rice, Corn & HVCDP Insurance Application',
						'Livestock & Fisheries Insurance Intake',
						'Notice of Loss (NOL) and Indemnity Claim Processing'
					],
					tags: ['Crop Insurance', 'PCIC Region VIII', 'Indemnity Claims', 'Disaster Relief']
				},
				{
					id: 'lenneth-soyosa',
					name: 'Lenneth Soyosa',
					title: 'PCIC Focal Person',
					role: 'Philippine Crop Insurance Corp Specialist',
					section: 'Livestock & Support Units',
					sectionKey: 'livestockTech',
					badge: 'Insurance Specialist',
					icon: '🛡️',
					avatarText: 'LS',
					office: 'MAO Crop Insurance Window',
					email: 'pcic.soyosa@tanauanleyte.gov.ph',
					contact: '(053) 321-2045 / Loc. 119',
					responsibilities: [
						'Validates RSBSA eligibility prerequisites for zero-premium crop insurance enrollment',
						'Encodes and updates municipal insurance ledger records in the PCIC registry portal',
						'Receives and audits submitted documentary proofs, barangay certifications, and damage photos',
						'Liaises directly with the PCIC Leyte provincial office for prompt claim check releases'
					],
					services: [
						'Free Agricultural Insurance Enrollment Intake',
						'Claim Status Tracking & Check Distribution Assistance',
						'Barangay Insurance Documentation Guidance'
					],
					tags: ['PCIC Operations', 'Claim Adjudication', 'Farmer Protection', 'Eligibility Verification']
				},
				{
					id: 'colin-d-ripalda',
					name: 'Colin D. Ripalda',
					title: 'Geotag / IT Section In-Charge',
					role: 'Digital Agriculture & GIS Specialist',
					section: 'Livestock & Support Units',
					sectionKey: 'livestockTech',
					badge: 'IT & Geotag Lead',
					icon: '💻',
					avatarText: 'CR',
					office: 'MAO IT & Database Center',
					email: 'it.ripalda@tanauanleyte.gov.ph',
					contact: '(053) 321-2045 / Loc. 120',
					responsibilities: [
						'Manages the municipal RSBSA digital database and Philippine Farmer Registry synchronization',
						'Conducts satellite GPS farm parcel geotagging and boundary mapping',
						'Operates IT infrastructure, agricultural reporting dashboards, and digital registry backups',
						'Generates spatial maps for municipal cropping zones, flood hazards, and production hotspots'
					],
					services: [
						'Farm Parcel GPS Geotagging & Coordinate Mapping',
						'RSBSA System Encoding & Reference Number Verification',
						'Agricultural Spatial & Statistical Data Inquiries'
					],
					tags: ['GIS Geotagging', 'RSBSA Database', 'Digital Agriculture', 'Data Mapping']
				},
				{
					id: 'jneen-y-villamor',
					name: 'Jneen Y. Villamor',
					title: 'Seeds Distribution Staff',
					role: 'Input Logistics & Inventory Custodian',
					section: 'Livestock & Support Units',
					sectionKey: 'livestockTech',
					badge: 'Logistics Officer',
					icon: '🌱',
					avatarText: 'JV',
					office: 'MAO Seeds Storage Facility',
					email: 'seeds.villamor@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Safekeeps, catalogs, and manages inventory of certified inbred rice seeds, corn seeds, and vegetable packets',
						'Verifies RSBSA vouchers and masterlists during seasonal mass distribution drives',
						'Maintains warehouse quality control, humidity standards, and seed viability test schedules',
						'Prepares distribution tally sheets and liquidation reports for PhilRice and DA'
					],
					services: [
						'Certified Palay Seed Voucher Requisition',
						'Vegetable & High-Value Crop Seed Dispensation',
						'Seed Stock Availability Verification'
					],
					tags: ['Seeds Logistics', 'Warehouse Custody', 'Voucher Liquidation', 'Inventory Management']
				}
			]
		},
		{
			key: 'crops',
			name: 'Crops & Horticulture Division',
			shortName: 'Crops Division',
			icon: '🌾',
			badge: 'Section 02 // Rice, Corn, Cassava & High-Value Crops',
			accent: '#10B981',
			description: 'Agronomic guidance, hybrid and inbred rice technology, corn and cassava development, vegetable production, and pest surveillance.',
			lead: {
				id: 'claridyl-t-abas',
				name: 'Claridyl T. Abas',
				title: 'Agricultural Technologist',
				role: 'Crop Section Lead',
				section: 'Crop Section',
				sectionKey: 'crops',
				badge: 'Crop Technologist',
				icon: '🌾',
				avatarText: 'CA',
				office: 'MAO Crop Extension Desk',
				email: 'crops.abas@tanauanleyte.gov.ph',
				contact: '(053) 321-2045 / Loc. 115',
				responsibilities: [
					'Spearheads municipal crop development, soil management, and high-yield agricultural strategies',
					'Organizes Farmer Field Schools (FFS) and hands-on seminars on Integrated Pest Management (IPM)',
					'Conducts farm parcel soil sample collection for laboratory fertility testing',
					'Formulates seasonal planting calendar advisories adapted to local climate predictions'
				],
				services: [
					'Soil Sampling & Fertilizer Recommendation Advisory',
					'Pest & Crop Disease Diagnosis & Field Prescription',
					'Technical Guidance on Sustainable Crop Production'
				],
				tags: ['Agronomy', 'Soil Testing', 'IPM Pest Management', 'Farmer Field Schools']
			},
			personnel: [
				{
					id: 'mariel-c-cornejo',
					name: 'Mariel C. Cornejo',
					title: 'Agricultural Technologist',
					role: 'Rice & High-Value Crops Development Program (HVCDP) Specialist',
					section: 'Crops & Horticulture Division',
					sectionKey: 'crops',
					badge: 'Rice / HVCDP Specialist',
					icon: '🍚',
					avatarText: 'MC',
					office: 'MAO Rice Program Desk',
					email: 'rice.cornejo@tanauanleyte.gov.ph',
					contact: '(053) 321-2045 / Loc. 116',
					responsibilities: [
						'Manages the municipal Rice Competitiveness Enhancement Fund (RCEF) seed and fertilizer distribution',
						'Supervises High-Value Crops Development Program (HVCDP) vegetable gardens and greenhouse projects',
						'Provides technical training on hybrid rice cultivation, water-saving irrigation, and organic fertilizers',
						'Maintains master records of municipal palay hectarage, planting stages, and estimated yields'
					],
					services: [
						'RCEF Certified Inbred Palay Seed Allocation',
						'Hybrid Rice Program Enrollment & Voucher Claiming',
						'High-Value Vegetable Seeds & Garden Kit Distribution'
					],
					tags: ['RCEF Rice Program', 'HVCDP Vegetables', 'Hybrid Rice', 'Crop Yield Estimation']
				},
				{
					id: 'mary-cris-g-ripalda',
					name: 'Mary Cris G. Ripalda',
					title: 'Crop Section Staff',
					role: 'Corn & Cassava Program Specialist',
					section: 'Crops & Horticulture Division',
					sectionKey: 'crops',
					badge: 'Corn & Cassava Specialist',
					icon: '🌽',
					avatarText: 'MR',
					office: 'MAO Crop Unit Desk',
					email: 'corn.ripalda@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Promotes improved yellow corn, white flint corn, and industrial cassava cultivation among upland farmers',
						'Distributes certified corn seeds, cassava stalks, and bio-fertilizer inputs',
						'Coordinates post-harvest processing, sheller machine scheduling, and market matching with feed millers',
						'Monitors fall armyworm (FAW) incidence and conducts rapid containment measures'
					],
					services: [
						'Corn & Cassava Planting Materials Requisition',
						'Fall Armyworm Field Inspection & Biocontrol Dispensation',
						'Corn Sheller Equipment Scheduling'
					],
					tags: ['Corn Production', 'Cassava Cultivation', 'Pest Surveillance', 'Post-Harvest Linking']
				}
			]
		},
		{
			key: 'extensionMachinery',
			name: 'Extension Services & Farm Mechanization',
			shortName: 'Extension & Machinery',
			icon: '🚜',
			badge: 'Section 03 // Barangay Outreach, Farmer Groups & Tractor Operations',
			accent: '#2563EB',
			description: 'Barangay technical extension, rural community organizing, and municipal farm tractor and heavy mechanization operations.',
			lead: {
				id: 'micheal-salvana',
				name: 'Micheal Salvaña',
				title: 'Extension Services Personnel',
				role: 'Extension Operations Officer',
				section: 'Extension Services Section',
				sectionKey: 'extensionMachinery',
				badge: 'Extension Lead',
				icon: '📣',
				avatarText: 'MS',
				office: 'MAO Extension Hall',
				email: 'extension.salvana@tanauanleyte.gov.ph',
				contact: '(053) 321-2045 / Loc. 117',
				responsibilities: [
					'Coordinates frontline extension activities across Tanauan’s agricultural clusters',
					'Schedules barangay-level consultations, farmer assemblies, and technological demonstrations',
					'Liaises between farmer associations and municipal mechanization services',
					'Oversees logistical staging for agricultural inputs transport and field deployment'
				],
				services: [
					'Barangay Agricultural Assembly Scheduling',
					'Extension Technology Demonstration Requests',
					'Farmer Association Technical Liaison'
				],
				tags: ['Agricultural Extension', 'Field Demonstrations', 'Farmer Outreach', 'Rural Development']
			},
			personnel: [
				{
					id: 'ma-theresa-almacin',
					name: 'Ma. Theresa Almacin',
					title: 'Extension Services Personnel',
					role: 'Barangay Liaison & Documentation Officer',
					section: 'Extension Services & Machinery',
					sectionKey: 'extensionMachinery',
					badge: 'Extension Specialist',
					icon: '📋',
					avatarText: 'TA',
					office: 'MAO Extension Desk',
					email: 'extension.almacin@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Assists barangay councils and agricultural committees with official extension correspondence',
						'Conducts intake validation for farmer group assistance and subsidy requests',
						'Maintains comprehensive attendance and documentation archives of all MAO trainings and workshops',
						'Prepares activity progress documentation and photo-narrative accomplishment reports'
					],
					services: [
						'Farmer Association Accreditation Support',
						'Extension Training Registration & Certification',
						'Community Agricultural Inquiries'
					],
					tags: ['Extension Documentation', 'Barangay Coordination', 'Training Records', 'Community Liaison']
				},
				{
					id: 'loueza-mae-n-games',
					name: 'Loueza Mae N. Games',
					title: 'Agricultural Extension Worker',
					role: 'Field Extension Specialist',
					section: 'Extension Services & Machinery',
					sectionKey: 'extensionMachinery',
					badge: 'Field Extensionist',
					icon: '🌱',
					avatarText: 'LG',
					office: 'MAO Field Services',
					email: 'extension.games@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Conducts on-site farm visits to evaluate crop standing, irrigation access, and agronomic challenges',
						'Facilitates distribution of extension bulletins, weather advisories, and pest management guides',
						'Gathers grassroots farmer feedback on municipal agricultural programs and service delivery',
						'Assists farmers in filling out official subsidy and loan program application forms'
					],
					services: [
						'On-Site Farm Inspection & Technical Consultation',
						'Distribution of Agricultural Printed Guides & IEC Materials',
						'Frontline Farmer Guidance & Advisory'
					],
					tags: ['Field Extension', 'Farmer Consultation', 'Grassroots Outreach', 'IEC Materials']
				},
				{
					id: 'kenn-gene-c-avila',
					name: 'Kenn Gene C. Avila',
					title: 'Tractor Operator',
					role: 'Municipal Mechanization Heavy Equipment Operator',
					section: 'Farm Mechanization Unit',
					sectionKey: 'extensionMachinery',
					badge: 'Tractor Operations',
					icon: '🚜',
					avatarText: 'KA',
					office: 'MAO Mechanization Depot, Tanauan Town Hall Grounds',
					email: 'machinery@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Operates municipal 4-wheel drive tractors for land preparation, rotavation, and plowing',
						'Carries out preventive equipment maintenance, engine oil checks, and hydraulic inspections',
						'Executes field plowing schedules across priority barangay rice paddies',
						'Ensures safe transport and deployment of heavy farm machinery along municipal routes'
					],
					services: [
						'Tractor Land Preparation & Rotavation Scheduling',
						'Rice Field Plowing Assistance',
						'Mechanization Technical Queries'
					],
					tags: ['Tractor Operator', 'Land Preparation', 'Rotavation', 'Machinery Maintenance']
				},
				{
					id: 'jovito-de-paz',
					name: 'Jovito De Paz',
					title: 'Tractor Operator',
					role: 'Municipal Mechanization Heavy Equipment Operator',
					section: 'Farm Mechanization Unit',
					sectionKey: 'extensionMachinery',
					badge: 'Tractor Operations',
					icon: '🚜',
					avatarText: 'JP',
					office: 'MAO Mechanization Depot',
					email: 'machinery@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Operates municipal agricultural tractors and implements for harrowing and leveling',
						'Performs pre-operation equipment safety checks and field fuel consumption tracking',
						'Coordinates field ingress and egress with requesting barangay agricultural chairs',
						'Conducts basic field mechanical troubleshooting and tool maintenance'
					],
					services: [
						'Harrowing & Field Leveling Deployment',
						'Municipal Farm Machinery Operation',
						'Barangay Plowing Assistance'
					],
					tags: ['Tractor Operator', 'Field Leveling', 'Heavy Machinery', 'Equipment Safety']
				},
				{
					id: 'sofronio-estabillo',
					name: 'Sofronio Estabillo',
					title: 'Farm Machinery Operator',
					role: 'Mechanization Support & Field Crew',
					section: 'Farm Mechanization Unit',
					sectionKey: 'extensionMachinery',
					badge: 'Machinery Crew',
					icon: '⚙️',
					avatarText: 'SE',
					office: 'MAO Mechanization Depot',
					email: 'machinery@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Assists in tractor implement attachment (plow disc, rotavator, trailer)',
						'Performs cleaning, greasing, and daily washing of agricultural machinery and equipment',
						'Monitors tool inventory and assists operators during complex field maneuvers',
						'Supports municipal post-harvest drying and transport operations'
					],
					services: [
						'Mechanization Field Crew Support',
						'Implement Hitching & Tool Inspection',
						'Field Log Registration'
					],
					tags: ['Machinery Crew', 'Equipment Maintenance', 'Field Operations', 'Mechanization Support']
				},
				{
					id: 'anthony-duaban',
					name: 'Anthony Duaban',
					title: 'Farm Machinery Operator',
					role: 'Mechanization Support & Field Crew',
					section: 'Farm Mechanization Unit',
					sectionKey: 'extensionMachinery',
					badge: 'Machinery Crew',
					icon: '⚙️',
					avatarText: 'AD',
					office: 'MAO Mechanization Depot',
					email: 'machinery@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Maintains staging areas and safety perimeters during tractor operations in rural barangays',
						'Assists with refueling, battery checks, and routine mechanical service intervals',
						'Assists farmers in positioning borders and clearing rocks before plowing operations',
						'Supports emergency recovery and towing of field equipment'
					],
					services: [
						'Field Preparation & Hazard Clearing Assistance',
						'Equipment Crew Support',
						'Mechanization Operations'
					],
					tags: ['Field Crew', 'Equipment Safety', 'Maintenance Support', 'Tractor Logistics']
				},
				{
					id: 'joel-abasola',
					name: 'Joel Abasola',
					title: 'Farm Machinery Operator',
					role: 'Mechanization Support & Field Crew',
					section: 'Farm Mechanization Unit',
					sectionKey: 'extensionMachinery',
					badge: 'Machinery Crew',
					icon: '⚙️',
					avatarText: 'JA',
					office: 'MAO Mechanization Depot',
					email: 'machinery@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Provides field operational assistance during intensive municipal planting seasons',
						'Assists with lubrication, tire pressure auditing, and blade replacement on rotavators',
						'Records daily tractor operational hours and fuel utilization logs',
						'Coordinates equipment security at barangay field parking locations'
					],
					services: [
						'Mechanization Log Verification',
						'Field Support Operations',
						'Maintenance Assistance'
					],
					tags: ['Machinery Crew', 'Field Logs', 'Rotavator Service', 'Equipment Operations']
				},
				{
					id: 'jason-cijas',
					name: 'Jason Cijas',
					title: 'Farm Machinery Operator',
					role: 'Mechanization Support & Field Crew',
					section: 'Farm Mechanization Unit',
					sectionKey: 'extensionMachinery',
					badge: 'Machinery Crew',
					icon: '⚙️',
					avatarText: 'JC',
					office: 'MAO Mechanization Depot',
					email: 'machinery@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Supports field logistics and equipment setup for municipal agricultural machinery',
						'Performs post-operation inspections and cleans mud and debris from undercarriages',
						'Assists operators with terrain assessment in water-saturated marshlands',
						'Helps stage agricultural demonstration machinery at municipal exhibitions'
					],
					services: [
						'Machinery Field Dispatch Support',
						'Post-Plowing Equipment Care',
						'Exhibition Machinery Staging'
					],
					tags: ['Machinery Support', 'Logistics Crew', 'Terrain Inspection', 'Depot Operations']
				}
			]
		},
		{
			key: 'fisheries',
			name: 'Fishery & Coastal Resource Management',
			shortName: 'Fisheries & Coastal',
			icon: '🐟',
			badge: 'Section 04 // Aquaculture, Boat Licensing & Coastal Sustainability',
			accent: '#0891B2',
			description: 'Fisherfolk registry (FishR), boat licensing (BoatR), fingerlings dispersal, tilapia hatchery support, and coastal livelihood development.',
			lead: {
				id: 'roselyn-m-casilan',
				name: 'Roselyn M. Casilan',
				title: 'Agricultural Technologist',
				role: 'Fisheries Section Lead',
				section: 'Fisheries Section',
				sectionKey: 'fisheries',
				badge: 'Fisheries Technologist',
				icon: '🐟',
				avatarText: 'RC',
				office: 'MAO Fisheries & Coastal Desk',
				email: 'fisheries.casilan@tanauanleyte.gov.ph',
				contact: '(053) 321-2045 / Loc. 114',
				responsibilities: [
					'Oversees municipal fisheries management, coastal protection, and sustainable aquaculture programs',
					'Administers the National Program for Municipal Fisherfolk Registration (FishR) in Tanauan',
					'Processes Municipal Fishing Vessel & Gear Registration (BoatR) and inspection permits',
					'Facilitates fingerling dispersals (tilapia, bangus) in coordination with BFAR Region 8'
				],
				services: [
					'FishR Municipal Fisherfolk Registration & ID Issuance',
					'BoatR Motorized / Non-Motorized Fishing Vessel Registration',
					'Freshwater Tilapia & Bangus Fingerling Requisition',
					'Fisheries Livelihood Training & Grant Endorsement'
				],
				tags: ['Fisheries Technologist', 'FishR Registry', 'BoatR Licensing', 'Aquaculture', 'Coastal Protection']
			},
			personnel: [
				{
					id: 'glen-c-gil',
					name: 'Glen C. Gil',
					title: 'Agricultural Technologist II',
					role: 'Fisheries & Coastal Resource Specialist',
					section: 'Fisheries & Coastal Management',
					sectionKey: 'fisheries',
					badge: 'Fisheries Technologist II',
					icon: '🌊',
					avatarText: 'GG',
					office: 'MAO Fisheries Desk',
					email: 'fisheries.gil@tanauanleyte.gov.ph',
					contact: '(053) 321-2045 / Loc. 114',
					responsibilities: [
						'Conducts marine sanctuary monitoring and coastal reef habitat assessments',
						'Inspects fishing boat engines, dimensions, and gear compliance before license issuance',
						'Provides technical advice to fishpond and fish cage operators on water quality and feed ratios',
						'Liaises with coastal barangay councils on fishery ordinances and seasonal closed seasons'
					],
					services: [
						'Fishing Vessel Physical Inspection & Admeasurement',
						'Fishpond & Aquaculture Water Quality Assessment',
						'Coastal Resource Ecology Consultation'
					],
					tags: ['Coastal Ecology', 'Vessel Admeasurement', 'Fishpond Advisory', 'Marine Sanctuaries']
				},
				{
					id: 'ma-teresa-arcena',
					name: 'Ma. Teresa Arcena',
					title: 'Community Organizer',
					role: 'Fisherfolk & Farmer Community Mobilizer',
					section: 'Fisheries & Coastal Management',
					sectionKey: 'fisheries',
					badge: 'Community Organizer',
					icon: '🤝',
					avatarText: 'MA',
					office: 'MAO Community Organizing Unit',
					email: 'community.arcena@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: [
						'Organizes and strengthens coastal Fisherfolk Associations (FAs) and rural cooperatives',
						'Facilitates community consultations on marine protected areas and mangrove rehabilitation',
						'Assists women fisherfolk groups in establishing post-harvest fish processing enterprises (e.g. smoked fish, dried fish)',
						'Conducts organizational strengthening workshops and leadership trainings'
					],
					services: [
						'Fisherfolk Association Formation & SEC/CDA Registration Guidance',
						'Post-Harvest Fishery Enterprise Assistance',
						'Mangrove Reforestation Volunteer Mobilization'
					],
					tags: ['Community Organizing', 'Fisherfolk Empowerment', 'Post-Harvest Livelihoods', 'Cooperative Development']
				}
			]
		},
		{
			key: 'enforcement',
			name: 'Fishery Law Enforcement Team (Bantay Dagat)',
			shortName: 'Bantay Dagat Patrol',
			icon: '🛡️',
			badge: 'Section 05 // Coastal Patrol, Anti-Illegal Fishing & Marine Conservation',
			accent: '#DC2626',
			description: '24/7 coastal seaborne patrols, enforcement of Republic Act 10654 (Fisheries Code), marine sanctuary surveillance, and protection of Tanauan waters.',
			lead: {
				id: 'alex-l-tabuyan',
				name: 'Alex L. Tabuyan',
				title: 'Team Leader',
				role: 'Fishery Law Enforcement Lead Warden',
				section: 'Fishery Law Enforcement Team',
				sectionKey: 'enforcement',
				badge: 'Enforcement Commander',
				icon: '🛡️',
				avatarText: 'AT',
				office: 'MAO Bantay Dagat Station, Coastal Operations Base',
				email: 'bantaydagat@tanauanleyte.gov.ph',
				contact: '(053) 321-2045 / Bantay Dagat Hotline',
				responsibilities: [
					'Commands municipal seaborne patrol operations across Tanauan municipal waters (15 km zone)',
					'Enforces RA 8550 as amended by RA 10654 (The Philippine Fisheries Code)',
					'Coordinates joint maritime operations with the Philippine National Police Maritime Group and Philippine Coast Guard',
					'Apprehends illegal, unreported, and unregulated (IUU) fishing violators, fine mesh nets, and dynamite fishers',
					'Safeguards municipal fish sanctuaries and designated marine reserves from encroaching commercial vessels'
				],
				services: [
					'Immediate Seaborne Patrol & Emergency Maritime Response',
					'Illegal Fishing Incident Reporting & Verification',
					'Coastal Boundary Dispute Conciliation'
				],
				tags: ['Bantay Dagat Commander', 'Maritime Patrol', 'Anti-IUU Enforcement', 'Coastal Protection']
			},
			personnel: [
				{
					id: 'eje-estalane',
					name: 'Eje Estalane',
					title: 'Enforcement Officer',
					role: 'Bantay Dagat Seaborne Patrol Officer',
					section: 'Fishery Law Enforcement Team',
					sectionKey: 'enforcement',
					badge: 'Patrol Officer',
					icon: '⚓',
					avatarText: 'EE',
					office: 'Bantay Dagat Base',
					email: 'enforcement@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: ['Conducts scheduled seaborne patrols', 'Inspects boat registration and fishing gear permits', 'Maintains patrol craft equipment and nautical instruments'],
					services: ['Seaborne Fishery Surveillance', 'Emergency Rescue Assistance'],
					tags: ['Bantay Dagat', 'Patrol Officer', 'Vessel Inspection']
				},
				{
					id: 'mark-c-dela-cruz',
					name: 'Mark C. Dela Cruz',
					title: 'Enforcement Officer',
					role: 'Bantay Dagat Seaborne Patrol Officer',
					section: 'Fishery Law Enforcement Team',
					sectionKey: 'enforcement',
					badge: 'Patrol Officer',
					icon: '⚓',
					avatarText: 'MC',
					office: 'Bantay Dagat Base',
					email: 'enforcement@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: ['Participates in night-time coastal vigilance', 'Guards declared marine sanctuaries', 'Assists in documenting seized contraband and evidence handling'],
					services: ['Marine Sanctuary Surveillance', 'Coastal Reporting'],
					tags: ['Bantay Dagat', 'Night Patrol', 'Sanctuary Guard']
				},
				{
					id: 'randy-alicer',
					name: 'Randy Alicer',
					title: 'Enforcement Officer',
					role: 'Bantay Dagat Seaborne Patrol Officer',
					section: 'Fishery Law Enforcement Team',
					sectionKey: 'enforcement',
					badge: 'Patrol Officer',
					icon: '⚓',
					avatarText: 'RA',
					office: 'Bantay Dagat Base',
					email: 'enforcement@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: ['Monitors shoreline fish landing sites (pantalan)', 'Verifies fish catch methods and detects blast-fished or cyanide-caught fish', 'Educates coastal fishers on municipal ordinances'],
					services: ['Fish Landing Inspection', 'Gear Compliance Check'],
					tags: ['Bantay Dagat', 'Landing Site Audit', 'Catch Verification']
				},
				{
					id: 'romeo-pahayahay',
					name: 'Romeo Pahayahay',
					title: 'Enforcement Officer',
					role: 'Bantay Dagat Seaborne Patrol Officer',
					section: 'Fishery Law Enforcement Team',
					sectionKey: 'enforcement',
					badge: 'Patrol Officer',
					icon: '⚓',
					avatarText: 'RP',
					office: 'Bantay Dagat Base',
					email: 'enforcement@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: ['Operates municipal patrol speedboats during interception maneuvers', 'Maintains outboard engine readiness and fuel reserves', 'Provides safety escort during marine research surveys'],
					services: ['Patrol Boat Operations', 'Maritime Safety Escort'],
					tags: ['Bantay Dagat', 'Boat Pilot', 'Engine Maintenance']
				},
				{
					id: 'romarico-maglinte',
					name: 'Romarico Maglinte',
					title: 'Enforcement Officer',
					role: 'Bantay Dagat Seaborne Patrol Officer',
					section: 'Fishery Law Enforcement Team',
					sectionKey: 'enforcement',
					badge: 'Patrol Officer',
					icon: '⚓',
					avatarText: 'RM',
					office: 'Bantay Dagat Base',
					email: 'enforcement@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: ['Monitors municipal water boundaries against encroaching commercial trawlers', 'Serves citations and warnings for illegal gear infractions', 'Assists in coastal mangrove cleanup operations'],
					services: ['Boundary Surveillance', 'Infraction Warning Issuance'],
					tags: ['Bantay Dagat', 'Boundary Guard', 'Ordinance Enforcement']
				},
				{
					id: 'pelagio-cadion',
					name: 'Pelagio Cadion',
					title: 'Enforcement Officer',
					role: 'Bantay Dagat Seaborne Patrol Officer',
					section: 'Fishery Law Enforcement Team',
					sectionKey: 'enforcement',
					badge: 'Patrol Officer',
					icon: '⚓',
					avatarText: 'PC',
					office: 'Bantay Dagat Base',
					email: 'enforcement@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: ['Coordinates with barangay coastal tanods on intelligence gathering', 'Reports unusual vessel sightings in shallow reef zones', 'Conducts community awareness on turtle and marine mammal protection'],
					services: ['Barangay Tanod Coordination', 'Marine Wildlife Protection'],
					tags: ['Bantay Dagat', 'Intelligence Gathering', 'Wildlife Protection']
				},
				{
					id: 'diosdado-lobres',
					name: 'Diosdado Lobres',
					title: 'Enforcement Officer',
					role: 'Bantay Dagat Seaborne Patrol Officer',
					section: 'Fishery Law Enforcement Team',
					sectionKey: 'enforcement',
					badge: 'Patrol Officer',
					icon: '⚓',
					avatarText: 'DL',
					office: 'Bantay Dagat Base',
					email: 'enforcement@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: ['Conducts daylight shoreline sweeps for abandoned or illegal driftnets', 'Assists stranded or distressed fisherfolk during squalls and foul weather', 'Maintains station communication logs'],
					services: ['Shoreline Net Sweeps', 'Adverse Weather Assistance'],
					tags: ['Bantay Dagat', 'Shoreline Patrol', 'Rescue Support']
				},
				{
					id: 'roger-nogueras',
					name: 'Roger Nogueras',
					title: 'Enforcement Officer',
					role: 'Bantay Dagat Seaborne Patrol Officer',
					section: 'Fishery Law Enforcement Team',
					sectionKey: 'enforcement',
					badge: 'Patrol Officer',
					icon: '⚓',
					avatarText: 'RN',
					office: 'Bantay Dagat Base',
					email: 'enforcement@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: ['Enforces closed season fishing moratoriums on designated fish species', 'Inspects mesh sizes of push nets and beach seines', 'Participates in tactical maritime drills'],
					services: ['Closed Season Inspections', 'Gear Regulation Audits'],
					tags: ['Bantay Dagat', 'Mesh Size Audits', 'Moratorium Enforcement']
				},
				{
					id: 'christopher-catan',
					name: 'Christopher Catan',
					title: 'Enforcement Officer',
					role: 'Bantay Dagat Seaborne Patrol Officer',
					section: 'Fishery Law Enforcement Team',
					sectionKey: 'enforcement',
					badge: 'Patrol Officer',
					icon: '⚓',
					avatarText: 'CC',
					office: 'Bantay Dagat Base',
					email: 'enforcement@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: ['Maintains searchlights, life vests, and safety gear aboard patrol boats', 'Assists during joint operations with PNP Maritime', 'Helps facilitate fisherfolk consultation meetings'],
					services: ['Vessel Safety Equipment Checks', 'Joint Patrol Participation'],
					tags: ['Bantay Dagat', 'Safety Equipment', 'Maritime Operations']
				},
				{
					id: 'marbel-operio',
					name: 'Marbel Operio',
					title: 'Enforcement Officer',
					role: 'Bantay Dagat Seaborne Patrol Officer',
					section: 'Fishery Law Enforcement Team',
					sectionKey: 'enforcement',
					badge: 'Patrol Officer',
					icon: '⚓',
					avatarText: 'MO',
					office: 'Bantay Dagat Base',
					email: 'enforcement@tanauanleyte.gov.ph',
					contact: '(053) 321-2045',
					responsibilities: ['Monitors tidal estuary zones and river mouths against illegal traps', 'Assists in boundary buoy maintenance marking the marine sanctuary', 'Prepares patrol duty shift logs and fuel consumption summaries'],
					services: ['Estuary Patrol & Trap Inspection', 'Sanctuary Buoy Maintenance'],
					tags: ['Bantay Dagat', 'Estuary Patrol', 'Buoy Maintenance', 'Duty Logs']
				}
			]
		}
	];

	// Flat list of all personnel for directory & search
	const allPersonnel = $derived([
		mayor,
		headOfOffice,
		...divisions.flatMap((d) => [d.lead, ...d.personnel])
	]);

	// Filtered personnel based on search query and category filter
	const filteredPersonnel = $derived(
		allPersonnel.filter((person) => {
			const q = searchQuery.toLowerCase().trim();
			const matchesQuery =
				!q ||
				person.name.toLowerCase().includes(q) ||
				person.title.toLowerCase().includes(q) ||
				person.section.toLowerCase().includes(q) ||
				(person.tags && person.tags.some((t) => t.toLowerCase().includes(q)));

			const matchesCategory =
				activeSectionFilter === 'all' ||
				person.sectionKey === activeSectionFilter;

			return matchesQuery && matchesCategory;
		})
	);
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- MAIN ORG CHART WRAPPER -->
<div class="relative w-full">
	<!-- Top Controls & Search Bar Header -->
	<div class="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-slate-200 pb-6">
		<div>
			<div class="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-black text-amber-950 uppercase tracking-wide mb-2">
				<span class="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
				<span>Municipal Governance Structure</span>
				<span>•</span>
				<span>35 Plantilla & Technical Officers</span>
			</div>
			<h3 class="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
				Municipal Agriculture Office — Organizational Structure
			</h3>
			<p class="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
				Empowering local agriculture through dedicated public service, strategic leadership, and comprehensive technical extension across Tanauan's 54 barangays.
			</p>
		</div>

		<!-- Action Buttons: View Toggle & Expand/Collapse -->
		<div class="flex flex-wrap items-center gap-2.5 shrink-0">
			<!-- View Mode Buttons -->
			<div class="inline-flex rounded-2xl border-2 border-slate-200 bg-slate-100 p-1">
				<button
					type="button"
					onclick={() => (activeView = 'chart')}
					class="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all {activeView === 'chart'
						? 'bg-blue-950 text-amber-300 shadow-sm'
						: 'text-slate-700 hover:text-blue-950'}"
				>
					<span>🌳</span>
					<span>Hierarchy Chart</span>
				</button>
				<button
					type="button"
					onclick={() => (activeView = 'directory')}
					class="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-black transition-all {activeView === 'directory'
						? 'bg-blue-950 text-amber-300 shadow-sm'
						: 'text-slate-700 hover:text-blue-950'}"
				>
					<span>📋</span>
					<span>Personnel Directory</span>
				</button>
			</div>

			{#if activeView === 'chart'}
				<div class="flex items-center gap-1.5">
					<button
						type="button"
						onclick={expandAll}
						class="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-950 transition-all shadow-2xs"
						title="Expand all divisions"
					>
						Expand All
					</button>
					<button
						type="button"
						onclick={collapseAll}
						class="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-950 transition-all shadow-2xs"
						title="Collapse all divisions"
					>
						Collapse All
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- Search & Filter Controls -->
	<div class="mb-8 rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 sm:p-5 shadow-2xs">
		<div class="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
			<!-- Search Input -->
			<div class="relative flex-1">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search personnel by name, position, or section (e.g., Rice, Fisheries, Tractor, PCIC)..."
					class="w-full rounded-xl border border-slate-300 bg-white py-2 pl-10 pr-4 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-900 focus:outline-hidden focus:ring-2 focus:ring-blue-900/20"
				/>
				{#if searchQuery}
					<button
						type="button"
						onclick={() => (searchQuery = '')}
						class="absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-bold text-slate-400 hover:text-slate-600"
					>
						✕ Clear
					</button>
				{/if}
			</div>

			<!-- Filter Pills -->
			<div class="flex flex-wrap items-center gap-1.5">
				<button
					type="button"
					onclick={() => (activeSectionFilter = 'all')}
					class="rounded-lg px-2.5 py-1 text-xs font-black transition-all {activeSectionFilter === 'all'
						? 'bg-blue-950 text-amber-300 shadow-2xs'
						: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}"
				>
					All ({allPersonnel.length})
				</button>
				<button
					type="button"
					onclick={() => (activeSectionFilter = 'leadership')}
					class="rounded-lg px-2.5 py-1 text-xs font-black transition-all {activeSectionFilter === 'leadership'
						? 'bg-blue-950 text-amber-300 shadow-2xs'
						: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}"
				>
					👑 Leadership (2)
				</button>
				<button
					type="button"
					onclick={() => (activeSectionFilter = 'livestockTech')}
					class="rounded-lg px-2.5 py-1 text-xs font-black transition-all {activeSectionFilter === 'livestockTech'
						? 'bg-blue-950 text-amber-300 shadow-2xs'
						: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}"
				>
					🐄 Livestock & Tech (8)
				</button>
				<button
					type="button"
					onclick={() => (activeSectionFilter = 'crops')}
					class="rounded-lg px-2.5 py-1 text-xs font-black transition-all {activeSectionFilter === 'crops'
						? 'bg-blue-950 text-amber-300 shadow-2xs'
						: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}"
				>
					🌾 Crops & Rice (3)
				</button>
				<button
					type="button"
					onclick={() => (activeSectionFilter = 'extensionMachinery')}
					class="rounded-lg px-2.5 py-1 text-xs font-black transition-all {activeSectionFilter === 'extensionMachinery'
						? 'bg-blue-950 text-amber-300 shadow-2xs'
						: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}"
				>
					🚜 Extension & Tractor (9)
				</button>
				<button
					type="button"
					onclick={() => (activeSectionFilter = 'fisheries')}
					class="rounded-lg px-2.5 py-1 text-xs font-black transition-all {activeSectionFilter === 'fisheries'
						? 'bg-blue-950 text-amber-300 shadow-2xs'
						: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}"
				>
					🐟 Fisheries (3)
				</button>
				<button
					type="button"
					onclick={() => (activeSectionFilter = 'enforcement')}
					class="rounded-lg px-2.5 py-1 text-xs font-black transition-all {activeSectionFilter === 'enforcement'
						? 'bg-blue-950 text-amber-300 shadow-2xs'
						: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'}"
				>
					🛡️ Bantay Dagat (11)
				</button>
			</div>
		</div>
	</div>

	<!-- ======================================================== -->
	<!-- 1. HIERARCHICAL CHART VIEW (ANIMATED FLOWCHART)          -->
	<!-- ======================================================== -->
	{#if activeView === 'chart' && !searchQuery}
		<div class="relative overflow-x-auto pb-8 pt-4">
			<div class="min-w-[960px] flex flex-col items-center">
				<!-- LEVEL 0: MUNICIPAL MAYOR -->
				<div class="relative flex flex-col items-center">
					<div
						role="button"
						tabindex="0"
						onclick={() => openPersonnelModal(mayor)}
						onkeydown={(e) => e.key === 'Enter' && openPersonnelModal(mayor)}
						class="group relative flex w-80 cursor-pointer flex-col items-center rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-blue-950 to-blue-900 p-5 text-white shadow-lg transition-all duration-300 hover:scale-102 hover:border-amber-300 hover:shadow-amber-400/20 hover:shadow-xl"
					>
						<span class="absolute -top-3 rounded-full bg-amber-400 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-blue-950 shadow-xs">
							⭐ Appointing Authority
						</span>
						<div class="mt-1 flex items-center gap-3">
							<div class="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-400 bg-amber-400/20 text-lg font-black text-amber-300 shadow-inner">
								🏛️
							</div>
							<div class="text-left">
								<h4 class="text-base font-black tracking-tight text-white group-hover:text-amber-300 transition-colors">
									{mayor.name}
								</h4>
								<p class="text-xs font-semibold text-amber-300">{mayor.title}</p>
								<p class="text-[11px] text-blue-200">Municipality of Tanauan, Leyte</p>
							</div>
						</div>
						<div class="mt-3 w-full border-t border-white/10 pt-2 text-center text-[10px] font-bold text-amber-300/80 group-hover:text-amber-300">
							Click to View Executive Responsibilities →
						</div>
					</div>

					<!-- Hierarchy Connector Stem: Mayor to Agriculturist -->
					<div class="flex flex-col items-center">
						<div class="h-8 w-1 bg-gradient-to-b from-amber-400 to-blue-900"></div>
						<div class="h-2 w-2 rounded-full bg-blue-900"></div>
					</div>
				</div>

				<!-- LEVEL 1: MUNICIPAL AGRICULTURIST (HEAD OF OFFICE) -->
				<div class="relative flex flex-col items-center">
					<div
						role="button"
						tabindex="0"
						onclick={() => openPersonnelModal(headOfOffice)}
						onkeydown={(e) => e.key === 'Enter' && openPersonnelModal(headOfOffice)}
						class="group relative flex w-88 cursor-pointer flex-col items-center rounded-2xl border-2 border-blue-900 bg-white p-5 shadow-lg transition-all duration-300 hover:scale-102 hover:border-amber-400 hover:shadow-amber-400/20 hover:shadow-xl"
					>
						<span class="absolute -top-3 rounded-full bg-blue-950 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-300 shadow-xs">
							🌾 Department Head
						</span>
						<div class="mt-1 flex items-center gap-3.5">
							<div class="flex h-13 w-13 items-center justify-center rounded-full border-2 border-blue-900 bg-blue-50 text-xl font-black text-blue-950 shadow-inner">
								{headOfOffice.avatarText}
							</div>
							<div class="text-left">
								<h4 class="text-base font-black tracking-tight text-blue-950 group-hover:text-amber-600 transition-colors">
									{headOfOffice.name}
								</h4>
								<p class="text-xs font-black text-amber-600">{headOfOffice.title}</p>
								<p class="text-[11px] text-slate-500 font-medium">Head of Office // MAO Tanauan</p>
							</div>
						</div>

						<!-- Mini highlights -->
						<div class="mt-3 flex flex-wrap justify-center gap-1.5 border-t border-slate-100 pt-2.5">
							<span class="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-900">Crops</span>
							<span class="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-900">Livestock</span>
							<span class="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-900">Extension</span>
							<span class="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-900">Fisheries</span>
						</div>

						<div class="mt-2 text-center text-[10px] font-bold text-blue-900 group-hover:underline">
							Click to View Officer Profile & Mandate →
						</div>
					</div>

					<!-- Hierarchy Connector Stem: Head to Divisions Bus -->
					<div class="flex flex-col items-center">
						<div class="h-8 w-1 bg-blue-900"></div>
						<!-- Horizontal Bus Line Spanning Divisions -->
						<div class="relative h-1 w-[900px] bg-blue-900 rounded-full">
							<!-- 5 Drop Down Stems for the 5 Divisions -->
							<div class="absolute left-[10%] -bottom-4 h-4 w-1 bg-blue-900"></div>
							<div class="absolute left-[30%] -bottom-4 h-4 w-1 bg-blue-900"></div>
							<div class="absolute left-[50%] -bottom-4 h-4 w-1 bg-blue-900"></div>
							<div class="absolute left-[70%] -bottom-4 h-4 w-1 bg-blue-900"></div>
							<div class="absolute left-[90%] -bottom-4 h-4 w-1 bg-blue-900"></div>
						</div>
					</div>
				</div>

				<!-- LEVEL 2: 5 KEY DIVISIONS COLUMNS -->
				<div class="mt-4 grid grid-cols-5 gap-4 w-full max-w-[1240px] items-start">
					{#each divisions as div}
						<div class="flex flex-col rounded-2xl border-2 border-slate-200 bg-slate-50/70 p-3 transition-all hover:border-slate-300">
							<!-- Division Header with Collapse/Expand Toggle -->
							<div class="flex items-center justify-between pb-2.5 border-b border-slate-200">
								<div class="flex items-center gap-1.5">
									<span class="text-base">{div.icon}</span>
									<span class="text-[11px] font-black uppercase text-blue-950 line-clamp-1" title={div.name}>
										{div.shortName}
									</span>
								</div>
								<button
									type="button"
									onclick={() => toggleSection(div.key)}
									class="flex h-5 w-5 items-center justify-center rounded-md bg-white border border-slate-300 text-[10px] font-bold text-slate-600 hover:bg-slate-100 hover:text-blue-950"
									title={collapsedSections[div.key] ? 'Expand' : 'Collapse'}
								>
									{collapsedSections[div.key] ? '+' : '−'}
								</button>
							</div>

							<!-- Division Lead Card -->
							<div
								role="button"
								tabindex="0"
								onclick={() => openPersonnelModal(div.lead)}
								onkeydown={(e) => e.key === 'Enter' && openPersonnelModal(div.lead)}
								class="group mt-2.5 flex cursor-pointer flex-col rounded-xl border-2 border-blue-900/30 bg-white p-3 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md"
							>
								<div class="flex items-start justify-between gap-1">
									<span class="rounded-md bg-amber-400 px-1.5 py-0.2 text-[9px] font-black text-blue-950 uppercase">
										Lead
									</span>
									<span class="text-[10px] text-slate-400">🔍</span>
								</div>
								<h5 class="mt-1.5 text-xs font-black text-blue-950 group-hover:text-amber-600 transition-colors leading-snug">
									{div.lead.name}
								</h5>
								<p class="text-[10px] font-bold text-amber-600 leading-tight mt-0.5">{div.lead.title}</p>
								<p class="text-[9px] text-slate-500 line-clamp-1 mt-0.5">{div.lead.role}</p>
							</div>

							<!-- Personnel List (Collapsible) -->
							{#if !collapsedSections[div.key]}
								<div class="mt-2.5 flex flex-col gap-2 pt-2 border-t border-dashed border-slate-200" transition:slide>
									<span class="text-[9px] font-black uppercase tracking-wider text-slate-400">
										Staff / Operators ({div.personnel.length})
									</span>

									{#each div.personnel as staff}
										<div
											role="button"
											tabindex="0"
											onclick={() => openPersonnelModal(staff)}
											onkeydown={(e) => e.key === 'Enter' && openPersonnelModal(staff)}
											class="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-white p-2 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-xs"
										>
											<div class="flex items-center gap-2 min-w-0">
												<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-[10px] font-black text-blue-950 group-hover:bg-amber-100 group-hover:text-amber-950 transition-colors">
													{staff.avatarText}
												</div>
												<div class="min-w-0">
													<p class="text-[11px] font-black text-slate-900 group-hover:text-blue-950 transition-colors truncate">
														{staff.name}
													</p>
													<p class="text-[9px] font-medium text-slate-500 truncate">
														{staff.title}
													</p>
												</div>
											</div>
											<span class="text-[10px] text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all">
												→
											</span>
										</div>
									{/each}
								</div>
							{:else}
								<div class="mt-2 text-center">
									<button
										type="button"
										onclick={() => toggleSection(div.key)}
										class="text-[10px] font-bold text-blue-900 hover:underline"
									>
										+ Show {div.personnel.length} staff members
									</button>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- ======================================================== -->
	<!-- 2. FILTERED GRID / DIRECTORY VIEW                        -->
	<!-- ======================================================== -->
	{#if activeView === 'directory' || searchQuery}
		<div>
			<div class="mb-4 flex items-center justify-between">
				<p class="text-xs font-bold text-slate-500">
					Showing <span class="font-black text-blue-950">{filteredPersonnel.length}</span> personnel matching criteria
				</p>
				{#if searchQuery}
					<button
						type="button"
						onclick={() => (searchQuery = '')}
						class="text-xs font-bold text-blue-900 hover:underline"
					>
						Clear search filter
					</button>
				{/if}
			</div>

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each filteredPersonnel as person (person.id)}
					<div
						role="button"
						tabindex="0"
						onclick={() => openPersonnelModal(person)}
						onkeydown={(e) => e.key === 'Enter' && openPersonnelModal(person)}
						class="group flex cursor-pointer flex-col justify-between rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg"
					>
						<div>
							<!-- Header pill -->
							<div class="flex items-center justify-between gap-2 mb-3">
								<span class="rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider {person.level === 'executive' || person.level === 'head'
									? 'bg-blue-950 text-amber-300'
									: 'bg-slate-100 text-slate-700'}">
									{person.badge || person.section}
								</span>
								<span class="text-xs">{person.icon || '👤'}</span>
							</div>

							<!-- Profile Row -->
							<div class="flex items-start gap-3">
								<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-blue-50 text-sm font-black text-blue-950 group-hover:border-amber-400 transition-colors">
									{person.avatarText || 'AG'}
								</div>
								<div class="min-w-0 flex-1">
									<h4 class="text-sm font-black text-blue-950 group-hover:text-amber-600 transition-colors leading-tight">
										{person.name}
									</h4>
									<p class="text-xs font-bold text-slate-600 mt-0.5">{person.title}</p>
									<p class="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{person.section}</p>
								</div>
							</div>

							<!-- Tags -->
							{#if person.tags && person.tags.length > 0}
								<div class="mt-3 flex flex-wrap gap-1">
									{#each person.tags.slice(0, 3) as tag}
										<span class="rounded-md bg-amber-50 border border-amber-200/60 px-1.5 py-0.2 text-[9px] font-bold text-amber-900">
											{tag}
										</span>
									{/each}
								</div>
							{/if}
						</div>

						<div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:underline">
							<span>View Profile & Duties</span>
							<span>→</span>
						</div>
					</div>
				{/each}
			</div>

			{#if filteredPersonnel.length === 0}
				<div class="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
					<span class="text-4xl">🔍</span>
					<h4 class="mt-3 text-base font-black text-blue-950">No personnel found</h4>
					<p class="mt-1 text-xs text-slate-500">
						No personnel match "{searchQuery}". Try searching by another keyword or section.
					</p>
					<button
						type="button"
						onclick={() => {
							searchQuery = '';
							activeSectionFilter = 'all';
						}}
						class="mt-4 rounded-xl bg-blue-950 px-4 py-2 text-xs font-black text-amber-300 hover:bg-blue-900"
					>
						Reset All Filters
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>

<!-- ======================================================== -->
<!-- 3. DETAIL MODAL / DRAWER (SLIDE-OUT FROM RIGHT)          -->
<!-- ======================================================== -->
{#if selectedPersonnel}
	<div
		class="fixed inset-0 z-50 flex items-center justify-end p-0 overflow-hidden"
		transition:fade={{ duration: 200 }}
		role="dialog"
		aria-modal="true"
	>
		<!-- Dark Blur Backdrop -->
		<div
			class="fixed inset-0 bg-blue-950/80 backdrop-blur-xs"
			onclick={closePersonnelModal}
			role="button"
			tabindex="0"
			onkeydown={(e) => e.key === 'Enter' && closePersonnelModal()}
		></div>

		<!-- Slide-Out Drawer Panel -->
		<div
			class="relative z-10 flex h-full w-full max-w-lg flex-col bg-white shadow-2xl overflow-y-auto"
			transition:fly={{ x: 400, duration: 250 }}
		>
			<!-- Drawer Header -->
			<div class="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-blue-950 px-6 py-5 text-white">
				<div class="flex items-center gap-2.5">
					<span class="text-xl">{selectedPersonnel.icon || '🌾'}</span>
					<div>
						<span class="rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-blue-950">
							{selectedPersonnel.badge || selectedPersonnel.section}
						</span>
						<p class="text-xs text-blue-200 mt-0.5">Municipal Agriculture Office Personnel Profile</p>
					</div>
				</div>

				<button
					type="button"
					onclick={closePersonnelModal}
					class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all font-bold text-sm"
					title="Close (Esc)"
				>
					✕
				</button>
			</div>

			<!-- Drawer Body -->
			<div class="p-6 space-y-6">
				<!-- Officer Profile Card -->
				<div class="flex items-start gap-4 rounded-2xl border-2 border-slate-200 bg-slate-50 p-5">
					<div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-3 border-amber-400 bg-blue-950 text-2xl font-black text-amber-300 shadow-md">
						{selectedPersonnel.avatarText || 'AG'}
					</div>
					<div class="min-w-0 flex-1">
						<h3 class="text-xl font-black text-blue-950 leading-tight">
							{selectedPersonnel.name}
						</h3>
						<p class="text-sm font-bold text-amber-600 mt-0.5">{selectedPersonnel.title}</p>
						{#if selectedPersonnel.role && selectedPersonnel.role !== selectedPersonnel.title}
							<p class="text-xs font-semibold text-slate-600 mt-0.5">{selectedPersonnel.role}</p>
						{/if}
						<p class="text-xs text-slate-500 mt-1">
							{selectedPersonnel.section}
						</p>
					</div>
				</div>

				<!-- Office Location & Contact Details -->
				<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
					<h4 class="text-xs font-black uppercase tracking-wider text-slate-400">
						Office Station & Communication
					</h4>
					<div class="grid gap-2.5 text-xs text-slate-700">
						<div class="flex items-start gap-2.5">
							<span class="text-slate-400 shrink-0">📍</span>
							<div>
								<span class="font-bold text-slate-900">Station / Room:</span>
								<p class="text-slate-600">{selectedPersonnel.office || 'Ground Floor, Agricultural Extension Office, Tanauan Town Hall'}</p>
							</div>
						</div>
						<div class="flex items-center gap-2.5">
							<span class="text-slate-400 shrink-0">📞</span>
							<div>
								<span class="font-bold text-slate-900">Contact / Local:</span>
								<span class="text-slate-600 ml-1">{selectedPersonnel.contact || '(053) 321-2045'}</span>
							</div>
						</div>
						<div class="flex items-center gap-2.5">
							<span class="text-slate-400 shrink-0">✉️</span>
							<div>
								<span class="font-bold text-slate-900">Official Email:</span>
								<span class="text-blue-900 font-semibold ml-1">{selectedPersonnel.email || 'agriculture@tanauanleyte.gov.ph'}</span>
							</div>
						</div>
						<div class="flex items-center gap-2.5">
							<span class="text-slate-400 shrink-0">⏰</span>
							<div>
								<span class="font-bold text-slate-900">Office Hours:</span>
								<span class="text-slate-600 ml-1">{selectedPersonnel.schedule || 'Monday to Friday | 8:00 AM – 5:00 PM'}</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Overview / Bio -->
				{#if selectedPersonnel.bio}
					<div>
						<h4 class="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
							Executive Overview
						</h4>
						<p class="text-xs sm:text-sm text-slate-700 leading-relaxed rounded-xl bg-blue-50/50 border border-blue-100 p-3.5">
							{selectedPersonnel.bio}
						</p>
					</div>
				{/if}

				<!-- Key Mandates & Responsibilities -->
				{#if selectedPersonnel.responsibilities && selectedPersonnel.responsibilities.length > 0}
					<div>
						<h4 class="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">
							Key Responsibilities & Operational Duties
						</h4>
						<ul class="space-y-2">
							{#each selectedPersonnel.responsibilities as resp}
								<li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
									<span class="text-amber-500 font-bold shrink-0 mt-0.5">✓</span>
									<span>{resp}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!-- Direct Services Handled -->
				{#if selectedPersonnel.services && selectedPersonnel.services.length > 0}
					<div class="rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-4">
						<h4 class="text-xs font-black uppercase tracking-wider text-amber-950 mb-2 flex items-center gap-1.5">
							<span>📑</span>
							<span>Direct Frontline Citizen's Charter Services</span>
						</h4>
						<ul class="space-y-1.5">
							{#each selectedPersonnel.services as svc}
								<li class="flex items-center gap-2 text-xs font-bold text-blue-950">
									<span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
									<span>{svc}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!-- Tag Cloud -->
				{#if selectedPersonnel.tags && selectedPersonnel.tags.length > 0}
					<div>
						<h4 class="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
							Competencies & Technical Tags
						</h4>
						<div class="flex flex-wrap gap-1.5">
							{#each selectedPersonnel.tags as tag}
								<span class="rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700">
									#{tag}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Drawer Footer -->
			<div class="sticky bottom-0 border-t border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
				<a
					href="/citizens-charter/agriculture"
					class="inline-flex items-center gap-1.5 text-xs font-black text-blue-900 hover:text-amber-600 transition-colors"
				>
					<span>View MAO Citizen's Charter</span>
					<span>→</span>
				</a>

				<button
					type="button"
					onclick={closePersonnelModal}
					class="rounded-xl bg-blue-950 px-4 py-2 text-xs font-black text-amber-300 hover:bg-blue-900 transition-all shadow-xs"
				>
					Close Profile
				</button>
			</div>
		</div>
	</div>
{/if}
