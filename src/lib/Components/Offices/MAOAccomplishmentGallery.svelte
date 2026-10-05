<script>
	import { fade, scale } from 'svelte/transition';

	let { accomplishments: propAccomplishments = null } = $props();

	// Folder selection: 'awarding' | 'display' | 'all' | 'folders' (overview)
	let activeFolderId = $state('awarding'); // default to 'awarding' as requested
	let isFolderExpanded = $state(true); // folder expansion state
	let activeModalIndex = $state(null); // lightbox modal index

	const AWARDING_DIR = 'static/images/agriculture/awarding/ceremony-honors/';
	const EXHIBITS_DIR = 'static/images/agriculture/exhibits-displays/';
	const RABIES_DIR = 'static/images/agriculture/anti-rabies/';
	const SEEDS_DIR = 'static/images/agriculture/rice-seeds/';
	const AWARDING_URL = '/images/agriculture/awarding/ceremony-honors';
	const EXHIBITS_URL = '/images/agriculture/exhibits-displays';
	const RABIES_URL = '/images/agriculture/anti-rabies';
	const SEEDS_URL = '/images/agriculture/rice-seeds';

	function resolveImageUrl(img, category = 'display') {
		if (!img) return '';
		if (img.startsWith('http://') || img.startsWith('https://')) return img;
		if (
			img.startsWith('/images/agriculture/awarding/ceremony-honors/') ||
			img.startsWith('/images/agriculture/exhibits-displays/') ||
			img.startsWith('/images/agriculture/anti-rabies/') ||
			img.startsWith('/images/agriculture/rice-seeds/')
		) {
			return img;
		}
		const filename = img.split('/').pop();
		if (category === 'awarding') {
			return `${AWARDING_URL}/${filename}`;
		}
		if (category === 'rabies') {
			return `${RABIES_URL}/${filename}`;
		}
		if (category === 'seeds') {
			return `${SEEDS_URL}/${filename}`;
		}
		return `${EXHIBITS_URL}/${filename}`;
	}

	// Folder directory definitions
	const folderDefinitions = {
		awarding: {
			id: 'awarding',
			slug: 'ceremony-honors',
			title: 'Awarding Ceremony & Agricultural Honors',
			badge: 'Awarding',
			dataCategory: 'awarding',
			directory: AWARDING_DIR,
			urlPrefix: AWARDING_URL,
			coverImage: `${AWARDING_URL}/grand-assembly-awardees-photo.jpg`,
			description:
				'Official ceremonial awarding and honors assembly recognizing top-performing barangay agricultural delegations, exemplary Gulayan sa Paaralan school nutrition gardens, outstanding women farmers, and agricultural achievers.',
			highlights: [
				'Conferment of framed Certificates of Recognition',
				'Barangay agricultural delegation commendations',
				'Grand floral staircase official photo assembly'
			]
		},
		display: {
			id: 'display',
			slug: 'exhibits-displays',
			title: 'Exhibits & Displays Showcase',
			badge: 'Display',
			dataCategory: 'display',
			directory: EXHIBITS_DIR,
			urlPrefix: EXHIBITS_URL,
			coverImage: `${EXHIBITS_URL}/cogon-elementary-agri-fair-2026.jpg`,
			description:
				'Curated visual showcases and gallery views of organic harvest pavilions, traditional bamboo kubos, women cooperative produce stalls, and on-site agronomic quality evaluations.',
			highlights: [
				'Traditional bamboo and nipa harvest pavilions',
				'100% organically grown vegetable exhibits',
				'Inter-agency DepEd Tanauan II & MAO extension synergy'
			]
		},
		rabies: {
			id: 'rabies',
			slug: 'anti-rabies',
			title: 'Anti-Rabies Campaign & Pet Vaccination',
			badge: 'Anti-Rabies',
			dataCategory: 'rabies',
			directory: RABIES_DIR,
			urlPrefix: RABIES_URL,
			coverImage: `${RABIES_URL}/puppy-cat-rabies-table-vaccination.jpg`,
			description:
				'Mass anti-rabies vaccination campaign and community pet healthcare outreach led by the Municipal Agriculture Office Veterinary and Livestock Section across Tanauan barangays to ensure zero rabies incidence and protect public health.',
			highlights: [
				'Door-to-door and clustered barangay canine & feline rabies immunization',
				'Veterinary physical assessment, health triage, and vaccination records',
				'Advocacy on responsible pet ownership in compliance with RA 9482'
			]
		},
		seeds: {
			id: 'seeds',
			slug: 'rice-seeds',
			title: 'Certified Seeds & Agricultural Inputs Distribution',
			badge: 'Seed Inputs',
			dataCategory: 'seeds',
			directory: SEEDS_DIR,
			urlPrefix: SEEDS_URL,
			coverImage: `${SEEDS_URL}/da-rfo8-hybrid-rice-seeds.jpg`,
			description:
				'Provision and distribution of high-yielding certified Hybrid Rice Seeds and crop production inputs in partnership with the Department of Agriculture Regional Field Office 08 (DA RFO-08) to boost local rice harvest volume and farmer incomes.',
			highlights: [
				'DA RFO-08 subsidized certified hybrid rice seed allocation',
				'Enhanced crop productivity and climate resilience for local farmers',
				'Technical advisory and agronomic guidance from MAO Rice Technicians'
			]
		}
	};

	const defaultAccomplishments = [
		// ==========================================
		// GROUP 1: AWARDING CEREMONY
		// Directory: static/images/agriculture/awarding/ceremony-honors/
		// ==========================================
		{
			id: 'award-barangay-delegation',
			dataCategory: 'awarding',
			folderId: 'awarding',
			badge: 'Awarding',
			categoryLabel: 'Awarding Ceremony',
			index: '01',
			title: 'Barangay Agricultural Delegation Recognition',
			theme: 'Official Conferment of Certificate of Recognition for Community Booth Excellence and Crop Diversity',
			date: '2026 Ceremonial Awarding',
			location: 'Tanauan Civic Center / Floral Ceremonial Stage',
			partner: 'MAO Extension & Municipal Sangguniang Bayan',
			image: `${AWARDING_URL}/barangay-delegation-certificate-award.jpg`,
			summary:
				'Municipal Agriculturist Susana O. Miranda along with Sangguniang Bayan officials present an official Certificate of Recognition to the participating barangay agricultural delegation for exemplary harvest yield and community booth presentation.',
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
			folderId: 'awarding',
			badge: 'Awarding',
			categoryLabel: 'Awarding Ceremony',
			index: '02',
			title: 'Keynote Message on Food Security & Farmer Welfare',
			theme: 'Empowering Tanauan Agricultural Stakeholders through Legislative Support and Modern Farm Mechanization',
			date: '2026 Ceremonial Awarding',
			location: 'Ceremonial Stage, Tanauan, Leyte',
			partner: 'Sangguniang Bayan Committee on Agriculture',
			image: `${AWARDING_URL}/keynote-inspirational-address-awarding.jpg`,
			summary:
				'The Sangguniang Bayan Member on Agriculture delivers the inspirational address celebrating the tenacity of local farmers and commending the Municipal Agriculture Office for impactful extension initiatives.',
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
			folderId: 'awarding',
			badge: 'Awarding',
			categoryLabel: 'Awarding Ceremony',
			index: '03',
			title: 'Outstanding Woman Agri-Achiever Recognition',
			theme: 'Exemplary Leadership in High-Value Crop Farming and Rural Community Livelihoods',
			date: '2026 Ceremonial Awarding',
			location: 'Tanauan Civic Center / Floral Ceremonial Stage',
			partner: 'Rural Improvement Club (RIC) & MAO Unit',
			image: `${AWARDING_URL}/outstanding-agri-achiever-individual-award.jpg`,
			summary:
				'Formal presentation of a framed Certificate of Recognition and tokens of appreciation to an outstanding woman farmer leader by Municipal Agriculturist Susana Miranda and municipal dignitaries.',
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
			folderId: 'awarding',
			badge: 'Awarding',
			categoryLabel: 'Awarding Ceremony',
			index: '04',
			title: 'School Gulayan sa Paaralan Top Performer Award',
			theme: 'Outstanding School Nutrition Garden and Bio-Intensive Organic Agriculture',
			date: '2026 Ceremonial Awarding',
			location: 'Tanauan Civic Center / Floral Ceremonial Stage',
			partner: 'DepEd Tanauan II District & MAO School Nutrition Unit',
			image: `${AWARDING_URL}/school-gulayan-recognition-certificate.jpg`,
			summary:
				'Conferment of the Certificate of Excellence to the school delegation and PTA officers for maintaining high-yield, bio-intensive organic vegetable gardens that support school feeding programs.',
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
			folderId: 'awarding',
			badge: 'Awarding',
			categoryLabel: 'Awarding Ceremony',
			index: '05',
			title: 'Grand Assembly of Agricultural Awardees & Officials',
			theme: 'Culmination of the 2026 Tanauan Agri-Trade Fair and Harvest Showcase',
			date: '2026 Ceremonial Awarding',
			location: 'Tanauan Civic Center / Grand Ceremonial Staircase',
			partner: 'Municipality of Tanauan, Leyte & MAO',
			image: `${AWARDING_URL}/grand-assembly-awardees-photo.jpg`,
			summary:
				'Commemorative gathering bringing together all awardees, barangay farming delegations, women association leaders, teachers, agricultural technologists, and municipal officials on the grand floral staircase.',
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

		// ==========================================
		// GROUP 2: EXHIBITS & DISPLAYS
		// Directory: static/images/agriculture/exhibits-displays/
		// ==========================================
		{
			id: 'cogon-agri-fair',
			dataCategory: 'display',
			folderId: 'display',
			badge: 'Display',
			categoryLabel: 'Exhibits & Displays',
			index: '01',
			title: 'Cogon Elementary School Agri Fair & Harvest Pavilion',
			theme: 'Sowing Synergy, Harvesting Sustainability: Uniting Schools, Barangays, and Farmers for Food Security',
			date: '2026 Agri Fair Exhibition',
			location: 'Cogon Elementary School, Tanauan II District',
			partner: 'Department of Education Tanauan II & MAO Extension',
			image: `${EXHIBITS_URL}/cogon-elementary-agri-fair-2026.jpg`,
			summary:
				'In collaborative partnership with the Department of Education and the Municipal Agriculture Office, educators, community leaders, and local farming families built a traditional bamboo-and-nipa harvest pavilion exhibiting an abundant assortment of school-grown vegetables.',
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
			folderId: 'display',
			badge: 'Display',
			categoryLabel: 'Exhibits & Displays',
			index: '02',
			title: 'Brgy. Sta. Elena Women\'s Association Produce Showcase',
			theme: 'Empowering Rural Women Farmers through Value-Added Marketing and Direct Farm-to-Consumer Distribution',
			date: '2026 Agri-Trade Fair',
			location: 'Tanauan Agri Trade Fair Grounds / Brgy. Sta. Elena',
			partner: 'Brgy. Sta. Elena Women\'s Association & MAO RIC Unit',
			image: `${EXHIBITS_URL}/sta-elena-womens-association-produce.jpg`,
			summary:
				'Members and officers of the Barangay Sta. Elena Women\'s Association organized an expansive municipal fair booth highlighting community agricultural produce, high-value watermelons, root crops, and vegetable harvests.',
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
			folderId: 'display',
			badge: 'Display',
			categoryLabel: 'Exhibits & Displays',
			index: '03',
			title: 'Tugop Elementary School Gulayan sa Paaralan Pavilion',
			theme: 'DepEd Tanauan II District Sustainable Organic Vegetable Garden and Rural Livelihood Center',
			date: '2026 Agri Showcase',
			location: 'Tugop Elementary School, Tanauan II District',
			partner: 'DepEd Tanauan II District & Tanauan LGU',
			image: `${EXHIBITS_URL}/tugop-elementary-gulayan-sa-paaralan.jpg`,
			summary:
				'Tugop Elementary School constructed an authentic nipa-thatched bamboo agricultural kubo laden with harvested produce, highlighting the successful integration of ecological gardening into the elementary basic education curriculum.',
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
			folderId: 'display',
			badge: 'Display',
			categoryLabel: 'Exhibits & Displays',
			index: '04',
			title: 'MAO Field Agronomic Evaluation & Harvest Auditing',
			theme: 'Produce Quality Verification, Harvest Tabulation, and Standardized Competition Scoring',
			date: '2026 Official Fair Scoring',
			location: 'Agri-Trade Fair Booths, Tanauan Municipal Hall Grounds',
			partner: 'Municipal Agriculture Office Technical Officers',
			image: `${EXHIBITS_URL}/mao-technical-evaluation-harvest.jpg`,
			summary:
				'A designated Agricultural Technologist from the Municipal Agriculture Office conducts systematic on-site crop quality assessment, harvest yield tabulation, and competitive booth grading during the 2026 Agri-Trade Fair.',
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
			folderId: 'display',
			badge: 'Display',
			categoryLabel: 'Exhibits & Displays',
			index: '05',
			title: 'San Roque Elementary School Harvest Exhibition',
			theme: 'Tanauan II District Gulayan sa Paaralan Photo Documentation and Containerized Vegetable Production',
			date: '2026 Agri Trade Fair',
			location: 'San Roque Elementary School, Tanauan II District',
			partner: 'DepEd Tanauan II & San Roque Community Volunteers',
			image: `${EXHIBITS_URL}/san-roque-elementary-gulayan-sa-paaralan.jpg`,
			summary:
				'Educators, parents, and community volunteers from San Roque Elementary School presented a curated harvest display complemented by an interactive photo documentary gallery highlighting their complete seasonal cropping cycle.',
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

		// ==========================================
		// GROUP 3: ANTI-RABIES CAMPAIGN
		// Directory: static/images/agriculture/anti-rabies/
		// ==========================================
		{
			id: 'rabies-canine-shot',
			dataCategory: 'rabies',
			folderId: 'rabies',
			badge: 'Anti-Rabies',
			categoryLabel: 'Anti-Rabies Campaign',
			index: '01',
			title: 'Canine Subcutaneous Anti-Rabies Vaccination',
			theme: 'Clustered Barangay Veterinary Mission for Rabies Prevention and Canine Health',
			date: '2026 Veterinary Health Mission',
			location: 'Barangay Multi-Purpose Center, Tanauan, Leyte',
			partner: 'MAO Veterinary & Livestock Section',
			image: `${RABIES_URL}/rabies-vaccination-canine-shot.jpg`,
			summary:
				'An authorized MAO agricultural technician administers subcutaneous rabies immunization to a community dog held safely by its owner, preventing rabies transmission and safeguarding public health.',
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
			folderId: 'rabies',
			badge: 'Anti-Rabies',
			categoryLabel: 'Anti-Rabies Campaign',
			index: '02',
			title: 'Pet Pre-Vaccine Physical Triage & Registration',
			theme: 'Promoting Responsible Pet Ownership and Community Animal Wellness in Tanauan',
			date: '2026 Veterinary Health Mission',
			location: 'Barangay Covered Station, Tanauan, Leyte',
			partner: 'MAO Livestock Unit & Barangay Officials',
			image: `${RABIES_URL}/pet-owner-dog-triage.jpg`,
			summary:
				'A responsible resident brings an alert Belgian Malinois cross for weight assessment, temperature screening, and pre-vaccination fitness check before receiving the anti-rabies vaccine.',
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
			folderId: 'rabies',
			badge: 'Anti-Rabies',
			categoryLabel: 'Anti-Rabies Campaign',
			index: '03',
			title: 'Clustered Barangay Pet Inoculation Clinic',
			theme: 'Free Canine and Feline Vaccination Services for Clustered Rural Households',
			date: '2026 Veterinary Health Mission',
			location: 'Barangay Triage Station, Tanauan, Leyte',
			partner: 'MAO Veterinary Team & Barangay Health Workers',
			image: `${RABIES_URL}/puppy-cat-rabies-table-vaccination.jpg`,
			summary:
				'Municipal agricultural and veterinary staff inoculate a young pup on the clinical examination table while neighbors holding cats and dogs wait in line for their free anti-rabies shots.',
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
			folderId: 'rabies',
			badge: 'Anti-Rabies',
			categoryLabel: 'Anti-Rabies Campaign',
			index: '04',
			title: 'Companion Pet Rabies Immunization Care',
			theme: 'Gentle, Stress-Free Veterinary Vaccine Administration for Domestic Pets',
			date: '2026 Veterinary Health Mission',
			location: 'Barangay Covered Court, Tanauan, Leyte',
			partner: 'MAO Animal Welfare & Veterinary Division',
			image: `${RABIES_URL}/shih-tzu-rabies-injection.jpg`,
			summary:
				'Veterinary personnel calmly administers the rabies vaccine to a companion Shih Tzu dog comforted safely in the arms of its owner during the free barangay pet health mission.',
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

		// ==========================================
		// GROUP 4: CERTIFIED SEEDS & INPUTS
		// Directory: static/images/agriculture/rice-seeds/
		// ==========================================
		{
			id: 'seeds-hybrid-rice',
			dataCategory: 'seeds',
			folderId: 'seeds',
			badge: 'Seed Inputs',
			categoryLabel: 'Certified Seeds & Inputs',
			index: '01',
			title: 'DA RFO-08 Certified Hybrid Rice Seeds Distribution',
			theme: 'Enhancing Rice Productivity and Food Self-Sufficiency in Tanauan, Leyte',
			date: '2026 Cropping Season Distribution',
			location: 'MAO Agricultural Seed Depot, Tanauan Municipal Hall',
			partner: 'Department of Agriculture Regional Field Office 08 (DA RFO-08)',
			image: `${SEEDS_URL}/da-rfo8-hybrid-rice-seeds.jpg`,
			summary:
				'Official allocation of high-yielding certified Hybrid Rice Seeds provided by DA Regional Field Office 08 for distribution to registered Tanauan rice farmers under the municipal crop support program.',
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
	];

	// Normalize incoming items
	const allItems = $derived.by(() => {
		if (!propAccomplishments || !Array.isArray(propAccomplishments) || propAccomplishments.length === 0) {
			return defaultAccomplishments;
		}
		return propAccomplishments.map((item, idx) => {
			const fallback = defaultAccomplishments.find((d) => d.id === item.id) || defaultAccomplishments[idx] || {};
			const dataCategory =
				item.dataCategory || fallback.dataCategory || (item.category === 'awarding' || item.folder === 'awarding' ? 'awarding' : item.category === 'rabies' || item.folder === 'rabies' ? 'rabies' : item.category === 'seeds' || item.folder === 'seeds' ? 'seeds' : 'display');
			const folderId = item.folderId || fallback.folderId || dataCategory;
			const badge = item.badge || fallback.badge || (dataCategory === 'awarding' ? 'Awarding' : dataCategory === 'rabies' ? 'Anti-Rabies' : dataCategory === 'seeds' ? 'Seed Inputs' : 'Display');
			const categoryLabel = item.categoryLabel || fallback.categoryLabel || (dataCategory === 'awarding' ? 'Awarding Ceremony' : dataCategory === 'rabies' ? 'Anti-Rabies Campaign' : dataCategory === 'seeds' ? 'Certified Seeds & Inputs' : 'Exhibits & Displays');
			return {
				...fallback,
				...item,
				folderId,
				dataCategory,
				badge,
				categoryLabel,
				image: resolveImageUrl(item.image || fallback.image, dataCategory),
				details: Array.isArray(item.details) && item.details.length > 0 ? item.details : (fallback.details || []),
				stats: item.stats || fallback.stats || { metric: 'Verified', label: 'Field Asset' }
			};
		});
	});

	// Items inside the currently selected folder view
	const currentFolderItems = $derived.by(() => {
		if (activeFolderId === 'all') return allItems;
		return allItems.filter((i) => i.dataCategory === activeFolderId || i.folderId === activeFolderId);
	});

	// Dynamic directory tag string
	const currentDirectoryTag = $derived.by(() => {
		if (activeFolderId === 'awarding') return AWARDING_DIR;
		if (activeFolderId === 'display') return EXHIBITS_DIR;
		if (activeFolderId === 'rabies') return RABIES_DIR;
		if (activeFolderId === 'seeds') return SEEDS_DIR;
		return 'static/images/agriculture/ (All Activity Folders)';
	});

	// Active folder metadata
	const currentFolderMeta = $derived.by(() => {
		if (folderDefinitions[activeFolderId]) return folderDefinitions[activeFolderId];
		return {
			id: 'all',
			slug: 'all-activity-folders',
			title: 'All Consolidated Activity Folders',
			badge: 'All Activities',
			dataCategory: 'all',
			directory: currentDirectoryTag,
			description:
				'Unified directory containing Awarding Ceremony, Exhibits & Displays, Anti-Rabies Campaign, and Certified Seed Distribution photo assets.'
		};
	});

	const awardingCount = $derived(allItems.filter((i) => i.dataCategory === 'awarding').length);
	const displayCount = $derived(allItems.filter((i) => i.dataCategory === 'display').length);
	const rabiesCount = $derived(allItems.filter((i) => i.dataCategory === 'rabies').length);
	const seedsCount = $derived(allItems.filter((i) => i.dataCategory === 'seeds').length);

	const activeModalItem = $derived(
		activeModalIndex !== null ? currentFolderItems[activeModalIndex] : null
	);

	function openFolder(folderKey) {
		activeFolderId = folderKey;
		isFolderExpanded = true;
		activeModalIndex = null;
	}

	function toggleFolderExpansion() {
		isFolderExpanded = !isFolderExpanded;
	}

	function openModal(idx) {
		activeModalIndex = idx;
	}

	function closeModal() {
		activeModalIndex = null;
	}

	function nextModal() {
		if (activeModalIndex !== null) {
			activeModalIndex = (activeModalIndex + 1) % currentFolderItems.length;
		}
	}

	function prevModal() {
		if (activeModalIndex !== null) {
			activeModalIndex = (activeModalIndex - 1 + currentFolderItems.length) % currentFolderItems.length;
		}
	}

	function handleKeydown(e) {
		if (activeModalIndex !== null) {
			if (e.key === 'Escape') closeModal();
			if (e.key === 'ArrowRight') nextModal();
			if (e.key === 'ArrowLeft') prevModal();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="relative w-full">
	<!-- 1. Folder Navigation & Activity Switcher: Sleek Pill Toggle -->
	<div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-3xl border-2 border-slate-200 bg-white shadow-sm">
		<div>
			<div class="text-[11px] font-black uppercase tracking-wider text-slate-500">
				ACTIVITY DIRECTORY BROWSER // SELECT FOLDER
			</div>
			<div class="text-base font-black text-blue-950">
				Municipal Agriculture Activity Dossiers
			</div>
		</div>

		<!-- Folder Selection Tabs (Pure typography, strictly zero icons) -->
		<div class="inline-flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
			<button
				type="button"
				onclick={() => openFolder('awarding')}
				class="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 {activeFolderId === 'awarding' ? 'bg-amber-400 text-blue-950 shadow-md scale-105 border border-amber-500' : 'bg-transparent text-slate-700 hover:text-blue-950 hover:bg-white'}"
			>
				Folder: Awarding ({awardingCount})
			</button>

			<button
				type="button"
				onclick={() => openFolder('display')}
				class="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 {activeFolderId === 'display' ? 'bg-blue-950 text-amber-300 shadow-md scale-105 border border-blue-900' : 'bg-transparent text-slate-700 hover:text-blue-950 hover:bg-white'}"
			>
				Folder: Exhibits ({displayCount})
			</button>

			<button
				type="button"
				onclick={() => openFolder('rabies')}
				class="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 {activeFolderId === 'rabies' ? 'bg-amber-400 text-blue-950 shadow-md scale-105 border border-amber-500' : 'bg-transparent text-slate-700 hover:text-blue-950 hover:bg-white'}"
			>
				Folder: Anti-Rabies ({rabiesCount})
			</button>

			<button
				type="button"
				onclick={() => openFolder('seeds')}
				class="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 {activeFolderId === 'seeds' ? 'bg-blue-950 text-amber-300 shadow-md scale-105 border border-blue-900' : 'bg-transparent text-slate-700 hover:text-blue-950 hover:bg-white'}"
			>
				Folder: Seed Inputs ({seedsCount})
			</button>

			<button
				type="button"
				onclick={() => openFolder('all')}
				class="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 {activeFolderId === 'all' ? 'bg-blue-950 text-amber-300 shadow-md scale-105 border border-blue-900' : 'bg-transparent text-slate-700 hover:text-blue-950 hover:bg-white'}"
			>
				All Folders ({allItems.length})
			</button>
		</div>
	</div>

	<!-- 2. Folder View UI Component: Explicit Folder Dossier Header Card -->
	<div
		data-category={currentFolderMeta.dataCategory}
		class="relative overflow-hidden rounded-3xl border-2 border-blue-900 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 p-6 sm:p-8 text-white shadow-xl mb-10 transition-all duration-300"
	>
		<div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
		<div class="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

		<!-- Folder Header Top Row with Dynamic Directory Tag -->
		<div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
			<div class="max-w-3xl">
				<!-- Dynamic Pathing & Status Badges -->
				<div class="flex flex-wrap items-center gap-2 mb-3">
					<span class="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-black tracking-wider text-amber-300 uppercase">
						<span class="h-2 w-2 rounded-full bg-amber-400"></span>
						<span>FOLDER DOSSIER // {currentFolderMeta.badge.toUpperCase()}</span>
					</span>

					<!-- Dynamic Consolidated Directory Tag -->
					<span class="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-900/80 px-3.5 py-1 text-xs font-mono font-bold tracking-wider text-amber-200">
						<span>DIRECTORY: {currentDirectoryTag}</span>
					</span>
				</div>

				<h3 class="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
					{currentFolderMeta.title}
				</h3>

				<p class="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
					{currentFolderMeta.description}
				</p>
			</div>

			<!-- Dynamic Active Items Counter Box -->
			<div class="flex items-center gap-3 shrink-0">
				<div class="rounded-2xl border border-blue-800 bg-blue-900/70 p-4 text-center min-w-[130px]">
					<div class="text-3xl font-black text-amber-400">{currentFolderItems.length}</div>
					<div class="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 mt-0.5">
						Active Items
					</div>
				</div>

				<div class="rounded-2xl border border-blue-800 bg-blue-900/70 p-4 text-center min-w-[130px]">
					<div class="text-xs font-black uppercase text-amber-300">DIR CONSOLIDATED</div>
					<div class="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 mt-1">
						Single Subfolder
					</div>
				</div>
			</div>
		</div>

		<!-- Folder Controls & Expansion Toggle -->
		<div class="relative z-10 mt-8 pt-6 border-t border-blue-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
			<div class="flex items-center gap-3">
				<span class="text-xs font-black uppercase tracking-wider text-amber-300">
					FOLDER CONTENTS:
				</span>
				<span class="text-xs font-bold text-slate-300">
					Displaying {currentFolderItems.length} image assets captured for {currentFolderMeta.title}
				</span>
			</div>

			<div class="flex items-center gap-2">
				<button
					type="button"
					onclick={toggleFolderExpansion}
					class="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-blue-900/80 hover:bg-blue-800 text-amber-300 hover:text-white border border-blue-700 transition-all cursor-pointer"
				>
					{isFolderExpanded ? '[ Collapse Folder View ]' : '[ Expand Folder View ]'}
				</button>
			</div>
		</div>
	</div>

	<!-- 3. Inner Contents: Responsive CSS Grid of Image Assets within this Folder View -->
	{#if isFolderExpanded}
		<div
			transition:fade={{ duration: 200 }}
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
		>
			{#each currentFolderItems as item, idx (item.id)}
				<article
					data-category={item.dataCategory}
					transition:scale={{ duration: 250, start: 0.96 }}
					class="group relative flex flex-col justify-between rounded-3xl border-2 border-slate-200 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-2xl"
				>
					<!-- Top Accent Color Bar: Amber Yellow for Awarding, Royal Blue for Display -->
					<div class="h-2 w-full {item.dataCategory === 'awarding' || item.dataCategory === 'rabies' ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-blue-950' : 'bg-gradient-to-r from-blue-950 via-amber-400 to-blue-900'}"></div>

					<div class="p-6">
						<!-- Card Header: Activity Category & Folio Marker (e.g., AWARDING // 01, RABIES // 01) -->
						<div class="flex items-center justify-between gap-2 pb-4 border-b border-slate-100">
							<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider {item.dataCategory === 'awarding' || item.dataCategory === 'seeds' ? 'bg-amber-400 text-blue-950' : 'bg-blue-950 text-amber-300'}">
								{item.dataCategory === 'awarding' ? 'AWARDING //' : item.dataCategory === 'rabies' ? 'RABIES //' : item.dataCategory === 'seeds' ? 'SEEDS //' : 'DISPLAY //'} {item.index}
							</span>

							<span class="text-xs font-extrabold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
								{item.categoryLabel}
							</span>
						</div>

						<!-- Image Container with Hover Zoom & Small Top-Corner Activity Badge Overlay -->
						<div class="relative my-4 overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 shadow-inner aspect-[4/3] group-hover:border-blue-900 transition-colors">
							<img
								src={item.image}
								alt={item.title}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
							/>

							<!-- Small Activity Badge Overlay on Top Corner: "Awarding", "Anti-Rabies", etc. -->
							<div class="absolute top-3 left-3 z-10">
								<span class="px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider shadow-md border {item.dataCategory === 'awarding' || item.dataCategory === 'seeds' ? 'bg-amber-400 text-blue-950 border-amber-500' : 'bg-blue-950 text-amber-300 border-blue-800'}">
									{item.badge}
								</span>
							</div>

							<!-- Floating Hover Overlay Button -->
							<button
								type="button"
								onclick={() => openModal(idx)}
								class="absolute inset-0 flex flex-col items-center justify-center bg-blue-950/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-xs text-white cursor-pointer"
								aria-label="Open full-screen preview of {item.title}"
							>
								<span class="px-4 py-2 rounded-xl bg-amber-400 text-blue-950 font-black text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95">
									View Asset Lightbox
								</span>
								<span class="text-[11px] font-bold text-amber-200 mt-2">
									Click to Enlarge
								</span>
							</button>
						</div>

						<!-- Content Block: Title, Theme Caption, and Summary -->
						<div>
							<div class="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
								{item.location} • {item.date}
							</div>

							<h4 class="mt-1 text-xl font-black text-blue-950 group-hover:text-blue-900 leading-snug tracking-tight">
								{item.title}
							</h4>

							<!-- Caption Overlay Box -->
							<p class="mt-2 text-xs font-semibold {item.dataCategory === 'awarding' || item.dataCategory === 'rabies' ? 'text-amber-900 bg-amber-50/90 border-amber-200' : 'text-blue-950 bg-blue-50/70 border-blue-200/60'} p-2.5 rounded-xl border leading-relaxed">
								"{item.theme}"
							</p>

							<p class="mt-3 text-sm text-slate-700 leading-relaxed line-clamp-3">
								{item.summary}
							</p>
						</div>

						<!-- Highlights List -->
						{#if item.details && item.details.length > 0}
							<div class="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
								{#each item.details as detail}
									<div class="flex items-start gap-2 text-xs text-slate-600 leading-normal">
										<span class="h-1.5 w-1.5 rounded-full {item.dataCategory === 'awarding' || item.dataCategory === 'rabies' ? 'bg-amber-500' : 'bg-blue-900'} mt-1.5 shrink-0"></span>
										<span>{detail}</span>
									</div>
								{/each}
							</div>
						{/if}
					</div>

					<!-- Card Footer: Stats Metric & Lightbox Action Button -->
					<div class="mt-4 p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
						<div>
							<div class="text-[10px] font-black uppercase text-slate-500">{item.stats?.label ?? 'Category'}</div>
							<div class="text-sm font-black text-blue-950">{item.stats?.metric ?? 'Verified'}</div>
						</div>
						<button
							type="button"
							onclick={() => openModal(idx)}
							class="px-4 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-amber-300 hover:text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
						>
							Examine Record
						</button>
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<!-- Collapsed State Notice -->
		<div class="p-8 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 text-center">
			<div class="text-sm font-black uppercase tracking-wider text-blue-950">
				Folder View is Collapsed ({currentFolderItems.length} Assets Hidden)
			</div>
			<p class="text-xs text-slate-500 mt-1">
				Click the button below to expand and view the {currentFolderMeta.title} photo assets.
			</p>
			<button
				type="button"
				onclick={toggleFolderExpansion}
				class="mt-4 px-6 py-2.5 rounded-xl bg-blue-950 text-amber-300 font-black text-xs uppercase tracking-wider shadow-md hover:bg-blue-900 transition-all cursor-pointer"
			>
				[ Expand Folder Contents ]
			</button>
		</div>
	{/if}

	<!-- 4. Interactive Full-Screen Lightbox Preview (Navigates within active folder) -->
	{#if activeModalItem}
		<div
			transition:fade={{ duration: 200 }}
			class="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/90 p-4 sm:p-6 backdrop-blur-md"
		>
			<div
				transition:scale={{ duration: 250, start: 0.95 }}
				class="relative flex flex-col max-h-[92vh] w-full max-w-5xl rounded-3xl border-2 border-blue-800 bg-slate-900 text-white shadow-2xl overflow-hidden"
			>
				<!-- Lightbox Navigation Header -->
				<div class="flex items-center justify-between border-b border-blue-800/80 bg-blue-950 px-6 py-4">
					<div class="flex items-center gap-3">
						<span class="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider {activeModalItem.dataCategory === 'awarding' || activeModalItem.dataCategory === 'seeds' ? 'bg-amber-400 text-blue-950' : 'bg-blue-900 text-amber-300 border border-amber-400/40'}">
							{activeModalItem.badge} // {activeModalIndex + 1} OF {currentFolderItems.length}
						</span>
						<span class="text-xs font-extrabold text-slate-300 uppercase hidden sm:inline">
							{activeModalItem.categoryLabel}
						</span>
					</div>

					<div class="flex items-center gap-2">
						<button
							type="button"
							onclick={prevModal}
							class="px-3.5 py-1.5 rounded-lg border border-blue-700 bg-blue-900/60 hover:bg-blue-800 text-amber-300 font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
						>
							Prev
						</button>
						<button
							type="button"
							onclick={nextModal}
							class="px-3.5 py-1.5 rounded-lg border border-blue-700 bg-blue-900/60 hover:bg-blue-800 text-amber-300 font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
						>
							Next
						</button>
						<button
							type="button"
							onclick={closeModal}
							class="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider transition-colors ml-2 cursor-pointer"
						>
							Close
						</button>
					</div>
				</div>

				<!-- Lightbox Content Area -->
				<div class="flex-1 overflow-y-auto">
					<div class="grid lg:grid-cols-12 gap-0">
						<!-- Image Display Canvas -->
						<div class="lg:col-span-7 bg-black flex items-center justify-center p-2 min-h-[350px] sm:min-h-[460px]">
							<img
								src={activeModalItem.image}
								alt={activeModalItem.title}
								class="max-h-[70vh] w-auto object-contain rounded-xl"
							/>
						</div>

						<!-- Lightbox Metadata Drawer -->
						<div class="lg:col-span-5 p-6 sm:p-8 bg-slate-900 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-blue-800">
							<div>
								<div class="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider {activeModalItem.dataCategory === 'awarding' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' : 'bg-blue-800/40 text-blue-200 border border-blue-600/40'}">
									Activity: {activeModalItem.badge}
								</div>

								<h3 class="mt-3 text-2xl font-black text-white leading-snug">
									{activeModalItem.title}
								</h3>

								<div class="mt-2 text-xs font-bold text-amber-400">
									Location: {activeModalItem.location}
								</div>
								<div class="text-xs text-slate-400">
									Partner: {activeModalItem.partner}
								</div>

								<div class="mt-4 p-3 rounded-xl bg-blue-950/80 border border-blue-800 text-xs text-amber-200 font-medium leading-relaxed">
									"{activeModalItem.theme}"
								</div>

								<p class="mt-4 text-sm text-slate-300 leading-relaxed font-normal">
									{activeModalItem.summary}
								</p>

								{#if activeModalItem.details && activeModalItem.details.length > 0}
									<div class="mt-4 pt-4 border-t border-blue-800/80 space-y-2">
										<div class="text-[11px] font-black uppercase tracking-wider text-amber-400">
											{activeModalItem.dataCategory === 'awarding' ? 'Official Recognition Citations:' : 'Agronomic & Exhibit Highlights:'}
										</div>
										{#each activeModalItem.details as detail}
											<div class="flex items-start gap-2 text-xs text-slate-300">
												<span class="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
												<span>{detail}</span>
											</div>
										{/each}
									</div>
								{/if}
							</div>

							<!-- Lightbox Action Footer -->
							<div class="mt-6 pt-4 border-t border-blue-800/80 flex items-center justify-between">
								<a
									href={activeModalItem.image}
									target="_blank"
									rel="noopener noreferrer"
									class="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-xs uppercase tracking-wider transition-all"
								>
									Open Original Full File
								</a>
								<span class="text-[11px] font-mono font-bold text-slate-400">
									{activeModalItem.dataCategory === 'awarding' ? 'DIR // CEREMONY-HONORS' : 'DIR // EXHIBITS-DISPLAYS'}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
