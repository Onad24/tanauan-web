<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	// Full Municipal Agriculture Office (MAO) Configuration, Official Hierarchy & Downloadables
	const maoDefaults = {
		department: 'Agriculture',
		officeName: 'Municipal Agriculture Office',
		officeCode: 'MAO',
		category: 'Agricultural & Rural Development',
		municipality: 'Municipality of Tanauan, Leyte',
		citizensCharterUrl: '/citizens-charter/agriculture',
		formsAtEnd: true,
		showPersonnel: false,
		tagline:
			'Advancing sustainable agriculture, food security, and farmer empowerment for the farming and fishing communities of Tanauan, Leyte.',
		typewriterWords: [
			'Sustainable Agriculture for Tanauan',
			'Empowering Local Farmers & Fisherfolk',
			'Food Security & Livelihood Development',
			'Modern Farming for Rural Progress'
		],
		head: {
			name: 'Susana O. Miranda',
			title: 'Municipal Agriculturist',
			term: 'Department Head',
			quote:
				'True public service in agriculture empowers our farming and fishing communities through innovative extension, resilient crop systems, and sustainable livelihood support for every Tanauananon.',
			credentials: [
				'Municipal Agriculturist',
				'Department Head',
				'Licensed Agriculturist',
				'Agricultural Extension Specialist',
				'Rural Development Practitioner'
			],
			room: 'Ground Floor, Agricultural Extension Office, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
			schedule: 'Monday to Friday | 8:00 AM – 5:00 PM (No Noon Break)'
		},
		preparedBy: {
			name: 'Susana O. Miranda',
			title: 'Municipal Agriculturist'
		},
		reviewedBy: {
			name: 'Hon. Ma. Gina E. Merilo',
			title: 'Municipal Mayor'
		},
		stats: [
			{
				value: '36',
				suffix: '',
				label: 'Total Personnel',
				description: 'Municipal Agriculturist, Technical Officers, Field Staff & 11 Law Enforcement Officers'
			},
			{
				value: '54',
				suffix: '',
				label: 'Barangays Served',
				description: 'Comprehensive agricultural & fisheries extension across all barangays'
			},
			{
				value: '5',
				suffix: '',
				label: 'Operating Sections',
				description: 'Crops, Rice/HVCDP, Livestock, Extension & Farm Machinery, Fisheries'
			},
			{
				value: '11',
				suffix: '',
				label: 'Fishery Enforcement Team',
				description: 'Active coastal and marine sanctuary protection personnel (Bantay Dagat)'
			}
		],
		mandates: [
			{
				index: '01',
				code: 'EXT-SVC',
				title: 'Agricultural Extension Services',
				description:
					'Provides technical assistance, training, and agronomic guidance to farmers and fisherfolk across the 54 barangays.',
				tag: 'Core Function',
				details: [
					'Farm Visits, Soil Health & Technical Guidance',
					'Farmer Training, Seminars & Demo Farm Operations',
					'Crop Pest & Disease Surveillance'
				]
			},
			{
				index: '02',
				code: 'PROG-IMPL',
				title: 'Program Implementation & Farm Mechanization',
				description:
					'Implements national and municipal programs for rice, corn, high-value crops, livestock dispersal, and heavy tractor land preparation.',
				tag: 'Program Execution',
				details: [
					'Certified Seed & Fertilizer Subsidies',
					'Tractor Land Preparation Assistance',
					'Livestock Dispersal & Veterinary Support'
				]
			},
			{
				index: '03',
				code: 'COAST-FISH',
				title: 'Fisheries & Marine Sanctuary Protection',
				description:
					'Oversees coastal resource conservation, fisherfolk licensing (FishR/BoatR), and sea-borne patrol operations by the Fishery Law Enforcement Team.',
				tag: 'Coastal Governance',
				details: [
					'Fisherfolk Registry & Boat Licensing',
					'Marine Sanctuary Upkeep & Coral Reef Protection',
					'24/7 Sea Patrol by Fishery Law Enforcement Team (FLET)'
				]
			}
		],
		schedule: {
			hours: 'Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)',
			location: 'Ground Floor, Agricultural Extension Office, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
			contactNumber: '(053) 321-2045 / +63 917 842 6110',
			email: 'agriculture@tanauanleyte.gov.ph',
			helpline: 'Agriculture Helpdesk Windows 1 & 2'
		},
		downloadableForms: [
			{
				index: '01',
				category: 'Farmer Registry & Subsidies',
				title: 'Registry System for Basic Sectors in Agriculture (RSBSA) Enrollment Form',
				type: 'Official Registry Application • DA-RSBSA 2024',
				icon: '',
				description:
					'Official government registration form required for all farmers, farm workers, fishers, and agri-youth to access agricultural subsidies, certified seeds, fertilizer vouchers, fuel subsidies, and PCIC crop insurance in Tanauan.',
				format: 'Official 2-Page PDF Document',
				fileSize: '833 KB',
				url: '/forms/agriculture/RSBSA_Enrollment_Form.pdf',
				downloadUrl: '/forms/agriculture/RSBSA_Enrollment_Form.pdf',
				htmlUrl: '/forms/agriculture/rsbsa-enrollment-form.html',
				requirements: [
					'1 Recent 2x2 colored ID photo taken within 6 months',
					'Valid Government-Issued ID (PhilID, Driver\'s License, Voter\'s ID, Postal ID)',
					'Proof of Land Ownership or Farm Parcel Tenure (Land Title, Tax Declaration, Certificate of Land Transfer, or Tenant Lease Agreement)',
					'Accomplished Part 1 to Part 4 detailing personal info, livelihood profile, and farm parcel area',
					'Barangay Certification and Farmers Association / Cooperative endorsement'
				]
			},
			{
				index: '02',
				category: 'Coconut Development & Permitting',
				title: 'Permit to Cut Coconut Trees (PTC) Requirements & Checklist',
				type: 'Official PCA Regulatory Checklist',
				icon: '',
				description:
					'Official documentary prerequisites, application form, and inspection clearance required by the Philippine Coconut Authority (PCA) and MAO Coconut Development Officer (CDO) for lawful coconut tree cutting and replacement replanting under RA 8048 / RA 10593.',
				format: 'Official PDF Document',
				fileSize: '539 KB',
				url: '/forms/agriculture/Permit_to_Cut_Requirements.pdf',
				downloadUrl: '/forms/agriculture/Permit_to_Cut_Requirements.pdf',
				htmlUrl: '/forms/agriculture/permit-to-cut-requirements.html',
				requirements: [
					'Fully Accomplished PTC Application Form stating valid ground for cutting',
					'Latest Real Property Land Title or Tax Declaration (Photocopy)',
					'Valid Government-Issued ID of Landowner/Applicant (Photocopy)',
					'Barangay Certification from the Punong Barangay',
					'On-site Inspection Report from PCA Coconut Development Officer (CDO)',
					'Certificate of Chainsaw Registration from DENR/LGU (Photocopy)',
					'Replanting Program of Work/s (1:1 replacement ratio commitment)'
				]
			},
			{
				index: '03',
				category: 'Fisheries & Aquaculture',
				title: 'BFAR Request for Grow Out & Fingerlings Dispersal Form',
				type: 'Official Aquaculture Application • BFAR-R8',
				icon: '',
				description:
					'Official Bureau of Fisheries and Aquatic Resources (BFAR Region 8) request form for fish fingerlings allocation (Tilapia, Bangus, Carp), aquaculture pond/cage site validation, culture technical clearance, and association member roster schedules.',
				format: 'Official 3-Page PDF Document',
				fileSize: '403 KB',
				url: '/forms/agriculture/BFAR_Request_for_Grow_Out_Form.pdf',
				downloadUrl: '/forms/agriculture/BFAR_Request_for_Grow_Out_Form.pdf',
				htmlUrl: '/forms/agriculture/bfar-request-for-grow-out.html',
				requirements: [
					'Registered Fisherfolk under FishR / Certificate of Fisherfolk Registration',
					'On-site technical evaluation and water source validation by MAO/BFAR Fisheries Technician',
					'Specification of culture structure dimensions (earthen pond, concrete tank, or fish cage)',
					'Signed Acknowledgement Receipt and commitment to submit harvest production reports',
					'For Organizations: Accomplished Association / PO Member Roster attachment sheet'
				]
			},
			{
				index: '04',
				category: 'Farm Mechanization & Machinery',
				title: 'Hangyu ha Paggamit hin Tractor (Tractor Service Request Form)',
				type: 'Official Waray Service Request Letter',
				icon: '',
				description:
					'Official letter request template in Waray addressed to Hon. Ma. Gina E. Merilo (Municipal Mayor) for local farmers (parag-uma) to request municipal tractor plowing and harrowing land preparation services for their farm parcels.',
				format: 'Official PDF Document',
				fileSize: '235 KB',
				url: '/forms/agriculture/Hangyu_ha_Paggamit_hin_Tractor.pdf',
				downloadUrl: '/forms/agriculture/Hangyu_ha_Paggamit_hin_Tractor.pdf',
				htmlUrl: '/forms/agriculture/hangyu-ha-paggamit-hin-tractor.html',
				requirements: [
					'Accomplished letter stating farmer name, residential barangay, and farm lot barangay location',
					'Indication of total farm area in hectares for plowing/harrowing schedule calculation',
					'Scheduling and field route verification by MAO Farm Machinery Operations Unit',
					'Assignment of authorized municipal tractor operator and approval by Municipal Agriculturist'
				]
			},
			{
				index: '05',
				category: 'Crop Insurance & Indemnity',
				title: 'Application for Rice/Corn Crop Insurance (Individual Application)',
				type: 'Official PCIC Application • Form RC-UPI-0',
				icon: '',
				description:
					'Official Philippine Crop Insurance Corporation (PCIC Region 8) individual application form for insuring rice and corn crops against typhoon, flood, drought, and pest damages with subsidized government premiums under RSBSA.',
				format: 'Official PDF Application',
				fileSize: '908 KB',
				url: '/forms/agriculture/PCIC_Application_Rice_Corn_Insurance.pdf',
				downloadUrl: '/forms/agriculture/PCIC_Application_Rice_Corn_Insurance.pdf',
				htmlUrl: '/forms/agriculture/pcic-application-rice-corn-insurance.html',
				requirements: [
					'Proof of enrollment under DA-RSBSA / Farmer GeoRef ID',
					'Farm lot boundaries (North, East, South, West adjacent lots)',
					'Cropping details (variety planted, sowing date, planting date, and harvest date)',
					'Valid Government-issued ID and contact details of farmer applicant',
					'Endorsement from MAO PCIC Focal Persons (Willy Moralina / Lenneth Soyosa)'
				]
			},
			{
				index: '06',
				category: 'Crop Insurance & Indemnity',
				title: 'Claims for Indemnity (Paghahabol Bayad) Damage Assessment Form',
				type: 'Official PCIC Claim Form',
				icon: '',
				description:
					'Official notice of loss and claim for indemnity submitted by insured farmers to the PCIC and MAO to request a field adjuster damage assessment for insured crops affected by calamity, pests, or disease.',
				format: 'Official PDF Form',
				fileSize: '827 KB',
				url: '/forms/agriculture/PCIC_Claim_for_Indemnity_Damage.pdf',
				downloadUrl: '/forms/agriculture/PCIC_Claim_for_Indemnity_Damage.pdf',
				htmlUrl: '/forms/agriculture/pcic-claim-for-indemnity.html',
				requirements: [
					'Certificate of Insurance Cover (CIC Number)',
					'Detailed cause of loss description (typhoon, flood, drought, or pest/disease)',
					'Estimated area damaged in hectares and degree/percentage of crop damage',
					'Location Sketch Plan (LSP / Krokis ng Bukid na Nasalanta) indicating adjacent boundaries',
					'Filing within the required notice of loss window (within days of occurrence) with MAO PCIC Desk'
				]
			}
		],
		accomplishments: [
			{
				id: 'cogon-agri-fair',
				dataCategory: 'display',
				badge: 'Display',
				folderId: 'display',
				folderTitle: 'Exhibits & Displays',
				folderDirectory: 'static/images/agriculture/exhibits-displays/',
				index: '01',
				category: 'schools',
				categoryLabel: 'School Agriculture & Nutrition',
				title: 'Cogon Elementary School Agri Fair & Harvest Pavilion',
				theme: 'Sowing Synergy, Harvesting Sustainability: Uniting Schools, Barangays, and Farmers for Food Security',
				date: '2026 Agri Fair Exhibition',
				location: 'Cogon Elementary School, Tanauan II District',
				image: '/images/agriculture/exhibits-displays/cogon-elementary-agri-fair-2026.jpg',
				summary: 'Traditional bamboo-and-nipa harvest pavilion exhibiting an abundant assortment of school-grown vegetables, supporting school feeding programs and agricultural literacy.',
				details: [
					'Harvest display featured eggplant, yardlong beans, string beans, pineapples, bananas, squash, and fresh leafy greens',
					'Reinforces the School-Based Feeding Program (SBFP) through sustainable vegetable yields',
					'Promotes agricultural literacy, zero-waste composting, and community food sovereignty among pupils and parents'
				],
				stats: {
					metric: '100% Organic',
					label: 'School Garden Yield'
				}
			},
			{
				id: 'sta-elena-women',
				dataCategory: 'display',
				badge: 'Display',
				folderId: 'display',
				folderTitle: 'Exhibits & Displays',
				folderDirectory: 'static/images/agriculture/exhibits-displays/',
				index: '02',
				category: 'women',
				categoryLabel: 'Rural Women & Agri-Enterprise',
				title: 'Brgy. Sta. Elena Women\'s Association Produce Showcase',
				theme: 'Empowering Rural Women Farmers through Value-Added Marketing and Direct Farm-to-Consumer Distribution',
				date: '2026 Agri-Trade Fair',
				location: 'Tanauan Agri Trade Fair Grounds / Brgy. Sta. Elena',
				image: '/images/agriculture/exhibits-displays/sta-elena-womens-association-produce.jpg',
				summary: 'Community cooperative farm produce stall featuring fresh watermelons, sweet potatoes, gabi, and vegetables, providing direct farm returns for rural women.',
				details: [
					'Direct farm marketing eliminating intermediary markups, providing premium returns for women farm producers',
					'Comprehensive inventory including fresh watermelons, sweet potatoes (camote), taro (gabi), cucumbers, and squash',
					'Supported by MAO Rural Improvement Club (RIC) technical seminars on post-harvest handling and packaging'
				],
				stats: {
					metric: 'Direct Market',
					label: 'Cooperative Stall'
				}
			},
			{
				id: 'tugop-gulayan',
				dataCategory: 'display',
				badge: 'Display',
				folderId: 'display',
				folderTitle: 'Exhibits & Displays',
				folderDirectory: 'static/images/agriculture/exhibits-displays/',
				index: '03',
				category: 'schools',
				categoryLabel: 'School-Community Farming',
				title: 'Tugop Elementary School Gulayan sa Paaralan Pavilion',
				theme: 'DepEd Tanauan II District Sustainable Organic Vegetable Garden and Rural Livelihood Center',
				date: '2026 Agri Showcase',
				location: 'Tugop Elementary School, Tanauan II District',
				image: '/images/agriculture/exhibits-displays/tugop-elementary-gulayan-sa-paaralan.jpg',
				summary: 'Authentic nipa-thatched bamboo agricultural kubo demonstrating bio-intensive gardening and soil enrichment practices.',
				details: [
					'Bountiful canopy exhibits of native saba bananas, calabaza squash, patola (sponge gourd), and root tubers',
					'Serves as a field learning laboratory for bio-intensive gardening and soil enrichment practices',
					'Accredited under the Tanauan Municipal Agricultural Extension school outreach network'
				],
				stats: {
					metric: 'Bio-Intensive',
					label: 'School Farm Method'
				}
			},
			{
				id: 'mao-evaluation',
				dataCategory: 'display',
				badge: 'Display',
				folderId: 'display',
				folderTitle: 'Exhibits & Displays',
				folderDirectory: 'static/images/agriculture/exhibits-displays/',
				index: '04',
				category: 'evaluation',
				categoryLabel: 'Agronomic Technical Quality Audit',
				title: 'MAO Field Agronomic Evaluation & Harvest Auditing',
				theme: 'Produce Quality Verification, Harvest Tabulation, and Standardized Competition Scoring',
				date: '2026 Official Fair Scoring',
				location: 'Agri-Trade Fair Booths, Tanauan Municipal Hall Grounds',
				image: '/images/agriculture/exhibits-displays/mao-technical-evaluation-harvest.jpg',
				summary: 'On-site crop quality assessment, harvest yield tabulation, and competitive booth grading conducted by licensed Agricultural Technologists.',
				details: [
					'Standardized rubric auditing produce weight, pest-free integrity, visual appeal, and nutritional viability',
					'Verification of organic and GAP (Good Agricultural Practices) adherence among participating barangay exhibitors',
					'Official scoring tabulations submitted for municipal agricultural merit citations and incentive awards'
				],
				stats: {
					metric: 'GAP Verified',
					label: 'Agronomic Quality'
				}
			},
			{
				id: 'san-roque-gulayan',
				dataCategory: 'display',
				badge: 'Display',
				folderId: 'display',
				folderTitle: 'Exhibits & Displays',
				folderDirectory: 'static/images/agriculture/exhibits-displays/',
				index: '05',
				category: 'schools',
				categoryLabel: 'School Agriculture & Nutrition',
				title: 'San Roque Elementary School Harvest Exhibition',
				theme: 'Tanauan II District Gulayan sa Paaralan Photo Documentation and Containerized Vegetable Production',
				date: '2026 Agri Trade Fair',
				location: 'San Roque Elementary School, Tanauan II District',
				image: '/images/agriculture/exhibits-displays/san-roque-elementary-gulayan-sa-paaralan.jpg',
				summary: 'Curated harvest display of cucumbers, eggplants, gourds, and ornamental container crops complemented by student cropping cycle photo documentation.',
				details: [
					'Harvest table showcasing cucumbers, eggplants, gourds, and containerized ornamental crop arrangements',
					'Step-by-step visual documentation recording seed bed preparation, transplanting, and vermicomposting routines',
					'Demonstrates strong volunteer parent-teacher community solidarity for children\'s dietary health'
				],
				stats: {
					metric: 'Community-Led',
					label: 'PTA Collaboration'
				}
			},
			{
				id: 'award-barangay-delegation',
				dataCategory: 'awarding',
				badge: 'Awarding',
				folderId: 'awarding',
				folderTitle: 'Awarding Ceremony & Agricultural Honors',
				folderDirectory: 'static/images/agriculture/awarding/ceremony-honors/',
				index: '01',
				category: 'awarding',
				categoryLabel: 'Awarding Ceremony',
				title: 'Barangay Agricultural Delegation Recognition',
				theme: 'Official Conferment of Certificate of Recognition for Community Booth Excellence and Crop Diversity',
				date: '2026 Ceremonial Awarding',
				location: 'Tanauan Civic Center / Floral Ceremonial Stage',
				partner: 'MAO Extension & Municipal Sangguniang Bayan',
				image: '/images/agriculture/awarding/ceremony-honors/barangay-delegation-certificate-award.jpg',
				summary: 'Municipal Agriculturist Susana O. Miranda along with Sangguniang Bayan leaders award an official Certificate of Recognition to the participating barangay agricultural delegation for exemplary harvest yield and community booth presentation.',
				details: [
					'Conferred for active community farming participation and produce exhibition excellence',
					'Jointly signed by Municipal Mayor Hon. Ma. Gina E. Merilo and Municipal Agriculturist',
					'Attended by local farming leaders, agricultural technologist coordinators, and municipal officials'
				],
				stats: {
					metric: 'Honored',
					label: 'Barangay Category'
				}
			},
			{
				id: 'award-keynote-address',
				dataCategory: 'awarding',
				badge: 'Awarding',
				folderId: 'awarding',
				folderTitle: 'Awarding Ceremony & Agricultural Honors',
				folderDirectory: 'static/images/agriculture/awarding/ceremony-honors/',
				index: '02',
				category: 'awarding',
				categoryLabel: 'Awarding Ceremony',
				title: 'Keynote Message on Food Security & Farmer Welfare',
				theme: 'Empowering Tanauan Agricultural Stakeholders through Legislative Support and Modern Farm Mechanization',
				date: '2026 Ceremonial Awarding',
				location: 'Ceremonial Stage, Tanauan, Leyte',
				partner: 'Sangguniang Bayan Committee on Agriculture',
				image: '/images/agriculture/awarding/ceremony-honors/keynote-inspirational-address-awarding.jpg',
				summary: 'The Sangguniang Bayan Member on Agriculture delivers the inspirational address celebrating the tenacity of local farmers and commending the Municipal Agriculture Office for impactful extension initiatives.',
				details: [
					'Emphasizes ongoing municipal legislative measures for subsidized seed distribution, fuel vouchers, and tractor services',
					'Commends DepEd Tanauan II educators and pupils for advancing sustainable Gulayan sa Paaralan school gardens',
					'Reaffirms LGU Tanauan\'s commitment to agricultural sustainability and food self-sufficiency'
				],
				stats: {
					metric: 'Leadership',
					label: 'Inspirational Address'
				}
			},
			{
				id: 'award-outstanding-achiever',
				dataCategory: 'awarding',
				badge: 'Awarding',
				folderId: 'awarding',
				folderTitle: 'Awarding Ceremony & Agricultural Honors',
				folderDirectory: 'static/images/agriculture/awarding/ceremony-honors/',
				index: '03',
				category: 'awarding',
				categoryLabel: 'Awarding Ceremony',
				title: 'Outstanding Woman Agri-Achiever Recognition',
				theme: 'Exemplary Leadership in High-Value Crop Farming and Rural Community Livelihoods',
				date: '2026 Ceremonial Awarding',
				location: 'Tanauan Civic Center / Floral Ceremonial Stage',
				partner: 'Rural Improvement Club (RIC) & MAO Unit',
				image: '/images/agriculture/awarding/ceremony-honors/outstanding-agri-achiever-individual-award.jpg',
				summary: 'Formal presentation of a framed Certificate of Recognition and tokens of appreciation to an outstanding woman farmer leader by Municipal Agriculturist Susana Miranda and municipal dignitaries.',
				details: [
					'Conferred for exceptional yield performance in high-value vegetable and root crop cultivation',
					'Highlights leadership within the Rural Improvement Club (RIC) and women-led cooperative marketing',
					'Includes certificate of merit and official agricultural production incentive package'
				],
				stats: {
					metric: 'Excellence',
					label: 'Outstanding Achiever'
				}
			},
			{
				id: 'award-school-gulayan',
				dataCategory: 'awarding',
				badge: 'Awarding',
				folderId: 'awarding',
				folderTitle: 'Awarding Ceremony & Agricultural Honors',
				folderDirectory: 'static/images/agriculture/awarding/ceremony-honors/',
				index: '04',
				category: 'awarding',
				categoryLabel: 'Awarding Ceremony',
				title: 'School Gulayan sa Paaralan Top Performer Award',
				theme: 'Outstanding School Nutrition Garden and Bio-Intensive Organic Agriculture',
				date: '2026 Ceremonial Awarding',
				location: 'Tanauan Civic Center / Floral Ceremonial Stage',
				partner: 'DepEd Tanauan II District & MAO School Nutrition Unit',
				image: '/images/agriculture/awarding/ceremony-honors/school-gulayan-recognition-certificate.jpg',
				summary: 'Conferment of the Certificate of Excellence to the school delegation and PTA officers for maintaining high-yield, bio-intensive organic vegetable gardens that support school feeding programs.',
				details: [
					'Audited and verified by the MAO technical evaluation team on crop variety, soil quality, and yield volume',
					'Received by school heads, faculty garden advisers, and parent-teacher community partners',
					'Directly supplements the daily feeding programs for malnourished and undernourished school children'
				],
				stats: {
					metric: 'Top Honor',
					label: 'School Category'
				}
			},
			{
				id: 'award-grand-assembly',
				dataCategory: 'awarding',
				badge: 'Awarding',
				folderId: 'awarding',
				folderTitle: 'Awarding Ceremony & Agricultural Honors',
				folderDirectory: 'static/images/agriculture/awarding/ceremony-honors/',
				index: '05',
				category: 'awarding',
				categoryLabel: 'Awarding Ceremony',
				title: 'Grand Assembly of Agricultural Awardees & Officials',
				theme: 'Culmination of the 2026 Tanauan Agri-Trade Fair and Harvest Showcase',
				date: '2026 Ceremonial Awarding',
				location: 'Tanauan Civic Center / Grand Ceremonial Staircase',
				partner: 'Municipality of Tanauan, Leyte & MAO',
				image: '/images/agriculture/awarding/ceremony-honors/grand-assembly-awardees-photo.jpg',
				summary: 'Commemorative gathering bringing together all awardees, barangay farming delegations, women association leaders, teachers, agricultural technologists, and municipal officials on the grand floral staircase.',
				details: [
					'Unites all participating farming sectors across the 54 barangays of Tanauan, Leyte',
					'Demonstrates collective dedication toward zero hunger, climate resilience, and food sovereignty',
					'Official milestone documentation preserved in the Municipal Agriculture Office public transparency archive'
				],
				stats: {
					metric: 'Unity',
					label: 'Grand Assembly'
				}
			},
			{
				id: 'rabies-canine-shot',
				dataCategory: 'rabies',
				badge: 'Anti-Rabies',
				folderId: 'rabies',
				folderTitle: 'Anti-Rabies Campaign & Pet Vaccination',
				folderDirectory: 'static/images/agriculture/anti-rabies/',
				index: '01',
				category: 'rabies',
				categoryLabel: 'Anti-Rabies Campaign',
				title: 'Canine Subcutaneous Anti-Rabies Vaccination',
				theme: 'Clustered Barangay Veterinary Mission for Rabies Prevention and Canine Health',
				date: '2026 Veterinary Health Mission',
				location: 'Barangay Multi-Purpose Center, Tanauan, Leyte',
				partner: 'MAO Veterinary & Livestock Section',
				image: '/images/agriculture/anti-rabies/rabies-vaccination-canine-shot.jpg',
				summary: 'An authorized MAO agricultural technician administers subcutaneous rabies immunization to a community dog held safely by its owner, preventing rabies transmission and safeguarding public health.',
				details: [
					'Subcutaneous anti-rabies dose safely administered in strict adherence to veterinary standards',
					'Protects local communities in accordance with Republic Act No. 9482 (Anti-Rabies Act of 2007)',
					'Provides pet owners with an official municipal rabies immunization certificate card'
				],
				stats: {
					metric: 'Immunized',
					label: 'Canine Health'
				}
			},
			{
				id: 'rabies-owner-triage',
				dataCategory: 'rabies',
				badge: 'Anti-Rabies',
				folderId: 'rabies',
				folderTitle: 'Anti-Rabies Campaign & Pet Vaccination',
				folderDirectory: 'static/images/agriculture/anti-rabies/',
				index: '02',
				category: 'rabies',
				categoryLabel: 'Anti-Rabies Campaign',
				title: 'Pet Pre-Vaccine Physical Triage & Registration',
				theme: 'Promoting Responsible Pet Ownership and Community Animal Wellness in Tanauan',
				date: '2026 Veterinary Health Mission',
				location: 'Barangay Covered Station, Tanauan, Leyte',
				partner: 'MAO Livestock Unit & Barangay Officials',
				image: '/images/agriculture/anti-rabies/pet-owner-dog-triage.jpg',
				summary: 'A responsible resident brings an alert Belgian Malinois cross for weight assessment, temperature screening, and pre-vaccination fitness check before receiving the anti-rabies vaccine.',
				details: [
					'Physical health triage ensuring animals are healthy, afebrile, and ready for immunization',
					'Official entry logged into the Tanauan Municipal Domestic Pet Registry',
					'Briefing for pet owners on post-vaccination hydration, observation, and care instructions'
				],
				stats: {
					metric: 'Screened',
					label: 'Pre-Vaccine Triage'
				}
			},
			{
				id: 'rabies-puppy-table',
				dataCategory: 'rabies',
				badge: 'Anti-Rabies',
				folderId: 'rabies',
				folderTitle: 'Anti-Rabies Campaign & Pet Vaccination',
				folderDirectory: 'static/images/agriculture/anti-rabies/',
				index: '03',
				category: 'rabies',
				categoryLabel: 'Anti-Rabies Campaign',
				title: 'Clustered Barangay Pet Inoculation Clinic',
				theme: 'Free Canine and Feline Vaccination Services for Clustered Rural Households',
				date: '2026 Veterinary Health Mission',
				location: 'Barangay Triage Station, Tanauan, Leyte',
				partner: 'MAO Veterinary Team & Barangay Health Workers',
				image: '/images/agriculture/anti-rabies/puppy-cat-rabies-table-vaccination.jpg',
				summary: 'Municipal agricultural and veterinary staff inoculate a young pup on the clinical examination table while neighbors holding cats and dogs wait in line for their free anti-rabies shots.',
				details: [
					'Comprehensive multi-pet outreach catering to both domestic puppies, adult dogs, and feline companions',
					'Coordinated with Barangay Health Workers for streamlined masterlisting and verification',
					'Guarantees high community herd immunity to sustain Tanauan\'s rabies-free status'
				],
				stats: {
					metric: '100% Free',
					label: 'Barangay Mission'
				}
			},
			{
				id: 'rabies-shih-tzu',
				dataCategory: 'rabies',
				badge: 'Anti-Rabies',
				folderId: 'rabies',
				folderTitle: 'Anti-Rabies Campaign & Pet Vaccination',
				folderDirectory: 'static/images/agriculture/anti-rabies/',
				index: '04',
				category: 'rabies',
				categoryLabel: 'Anti-Rabies Campaign',
				title: 'Companion Pet Rabies Immunization Care',
				theme: 'Gentle, Stress-Free Veterinary Vaccine Administration for Domestic Pets',
				date: '2026 Veterinary Health Mission',
				location: 'Barangay Covered Court, Tanauan, Leyte',
				partner: 'MAO Animal Welfare & Veterinary Division',
				image: '/images/agriculture/anti-rabies/shih-tzu-rabies-injection.jpg',
				summary: 'Veterinary personnel calmly administers the rabies vaccine to a companion Shih Tzu dog comforted safely in the arms of its owner during the free barangay pet health mission.',
				details: [
					'Stress-reducing animal handling techniques ensuring safety for pet, owner, and vaccinator',
					'Post-vaccine advisory issued on tick and flea control and basic pet nutrition',
					'Strengthens human-animal bond and community disease resilience across Tanauan'
				],
				stats: {
					metric: 'Protected',
					label: 'Companion Pet'
				}
			},
			{
				id: 'seeds-hybrid-rice',
				dataCategory: 'seeds',
				badge: 'Seed Inputs',
				folderId: 'seeds',
				folderTitle: 'Certified Seeds & Agricultural Inputs Distribution',
				folderDirectory: 'static/images/agriculture/rice-seeds/',
				index: '01',
				category: 'seeds',
				categoryLabel: 'Certified Seeds & Inputs',
				title: 'DA RFO-08 Certified Hybrid Rice Seeds Distribution',
				theme: 'Enhancing Rice Productivity and Food Self-Sufficiency in Tanauan, Leyte',
				date: '2026 Cropping Season Distribution',
				location: 'MAO Agricultural Seed Depot, Tanauan Municipal Hall',
				partner: 'Department of Agriculture Regional Field Office 08 (DA RFO-08)',
				image: '/images/agriculture/rice-seeds/da-rfo8-hybrid-rice-seeds.jpg',
				summary: 'Official allocation of high-yielding certified Hybrid Rice Seeds provided by DA Regional Field Office 08 for distribution to registered Tanauan rice farmers under the municipal crop support program.',
				details: [
					'High-vigor certified hybrid seeds formulated for superior panicle count and lodging tolerance',
					'Equipped with official DA RFO-08 quality verification seals and QR code traceability',
					'Complemented by MAO agronomic guidance on optimal seedling spacing and nutrient management'
				],
				stats: {
					metric: 'DA RFO-08',
					label: 'Certified Seeds'
				}
			}
		]
	};

	const baseDefaults = {
		...maoDefaults,
		...(getDeptDefaults('Agriculture') ?? {}),
		showPersonnel: false,
		formsAtEnd: true,
		department: 'Agriculture',
		downloadableForms: maoDefaults.downloadableForms,
		accomplishments: maoDefaults.accomplishments
	};

	// Merge Firestore dynamic data over defaults
	const pageData = $derived({
		...mergeOfficeData(baseDefaults, data?.officePageData),
		department: 'Agriculture',
		showPersonnel: false,
		formsAtEnd: true,
		downloadableForms: maoDefaults.downloadableForms,
		accomplishments: maoDefaults.accomplishments
	});
</script>

<svelte:head>
	<title>Municipal Agriculture Office (MAO) | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Official Supervisory Structure, Personnel Directory, Services, and Downloadable Forms of the Municipal Agriculture Office (MAO), Municipality of Tanauan, Leyte."
	/>
</svelte:head>

<OfficeTemplate
	{...pageData}
	department="Agriculture"
	showAccomplishments={true}
	showPersonnel={false}
	formsAtEnd={true}
/>
