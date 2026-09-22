export const roles = ['super admin', 'admin', 'staff', 'manager', 'director', 'consultant'];

// Portal Permissions & Workflow Roles
export const portalRoles = [
	{ id: 'super admin', label: 'Super Admin (System)', desc: 'Universal access across all departments. All submissions auto-approved.' },
	{ id: 'department head', label: 'Department Head', desc: 'Full authority over department page. Assigns page designer and approves submissions.' },
	{ id: 'page designer', label: 'Designated Page Designer', desc: 'Authorized to design page and submit posts. Submissions require Department Head approval.' },
	{ id: 'staff', label: 'Department Staff', desc: 'Standard department employee.' }
];

export const positions = [
	'Mayor',
	'Vice Mayor',
	'Municipal Councilor',
	'ABC President',
	'SK Federation President',
	'Barangay Captain',
	'Barangay Councilor',
	'SK Chairperson',
	'SK Counsilor'
];

export const departments = [
	{ name: 'System Administrator', roles: ['super admin'] },
	{ name: 'Accounting', roles: ['admin', 'staff', 'manager'] },
	{ name: 'Agriculture', roles: ['admin', 'staff', 'manager'] },
	{
		name: 'Assessors',
		roles: ['Municipal Assessor', 'Clerical Aide', 'Tax Mapping Aide', 'Book Binder I', 'Clerk I']
	},
	{ name: 'Budget', roles: ['Municipal Budget Officer', 'RCC III', 'Clerk III', 'Clerk I', 'Clerk'] },
	{ name: 'Cemetery', roles: ['admin', 'staff', 'manager'] },
	{ name: 'Civil Registrar', roles: ['admin', 'staff', 'manager'] },
	{ name: 'Day Care', roles: ['admin', 'staff', 'manager'] },
	{ name: 'Dental', roles: ['admin', 'staff', 'manager'] },
	{ name: 'Economic Enterprise', roles: ['admin', 'staff', 'manager'] },
	{
		name: 'Engineering',
		roles: [
			'Municipal Engineer',
			'Engineering Aide',
			'Engineer I',
			'Enigneer II',
			'Engineering Assistant',
			'Electrical Engineer',
			'Project Engineer',
			'Project Architect',
			'Project Personnel'
		]
	},
	{ name: 'GSO', roles: ['admin', 'staff', 'manager'] },
	{ name: 'Health Office', roles: ['admin', 'staff', 'manager'] },
	{ name: 'HRMO', roles: ['HRMO III', 'HRMA', 'Clerk I', 'Admin Aide I', 'Clerical Aide I'] },
	{ name: 'IT', roles: ['admin', 'staff', 'manager'] },
	{ name: 'Legislative Staff', roles: ['admin', 'staff', 'manager'] },
	{
		name: 'Licensing',
		roles: ['Municipal Treasurer', 'BPLO - Officer-In-Charge', 'Inspection', 'Clerk']
	},
	{ name: 'LYDO', roles: ['admin', 'staff', 'manager'] },
	{ name: 'MAO', roles: ['admin', 'staff', 'manager'] },
	{
		name: 'Market',
		roles: [
			'Market Supervisor III',
			'Admin Aide I (In-charge Market Operation)',
			'Social Welfare Aide (Market Collector)',
			'Book Binder I (Market Collector)',
			'Ticket Checker (Market Collector)',
			'Clerk I',
			'Utility (Sweeper)'
		]
	},
	{ name: "Mayors-Office", roles: ['admin', 'staff', 'manager'] },
	{ name: 'MDRRMO', roles: ['admin', 'staff', 'manager'] },
	{ name: 'MENRO', roles: ['admin', 'staff', 'manager'] },
	{ name: 'MSWDO', roles: ['admin', 'staff', 'manager'] },
	{ name: 'MLGOO', roles: ['admin', 'staff', 'manager'] },
	{ name: 'Municipal Administrator', roles: ['admin', 'staff', 'manager'] },
	{ name: 'OSCA', roles: ['admin', 'staff', 'manager'] },
	{ name: 'PESO', roles: ['LEO III/PESO Manager', 'PESO STAFF', 'DOLE GIP'] },
	{
		name: 'Planning',
		roles: [
			'Municipal Planning and Development Coordinator',
			'Planning Officer III',
			'Project Development Assistant',
			'Admin Aide III',
			'Statistician Aide',
			'Admin Aide',
			'Draftsman I',
			'Clerk I',
			'Clerical Aide',
			'Community Facilitator - TF'
		]
	},
	{ name: 'Sanitation', roles: ['admin', 'staff', 'manager'] },
	{ name: 'Slaughterhouse', roles: ['admin', 'staff', 'manager'] },
	{ name: 'TAME', roles: ['admin', 'staff', 'manager'] },
	{ name: 'Tourism', roles: ['admin', 'staff', 'manager'] },
	{
		name: 'Treasurer',
		roles: [
			'Municipal Treasurer',
			'Cashier I',
			'Cashier I/Alternate eSRE Focal Person',
			'Clerk I',
			'Clerk I/AICS',
			'Clerk I/DORELCO',
			'Admin Assistant II',
			'Disbursing Officer Designate',
			'HRMO I/eSRE Focal Person',
			'Petty Cash',
			'Liquidating Officer',
			'Alternate Meat Inspector',
			'Driver II',
			'Book Binder II',
			'Administrative Aide IV',
			'Administrative Aide',
			'RCCC I',
			'RCC II',
			'RCC II/DORELCO',
			'RCC III',
			'Utility Worker'
		]
	},
	{ name: "Vice Mayors-Office", roles: ['admin', 'staff', 'manager'] },
	{
		name: 'Sangguniang Bayan',
		roles: [
			'Staff to the Office of the Vice Mayor',
			'Staff to the Sangguniang Bayan Member',
			'Sangguniang Bayan Secretary',
			'Local Legislative Staff IV',
			'Stenographer',
			'Local Legislative Staff II',
			'Local Legislative Staff I',
			'Administrative Aide'
		]
	}
];

export const officesByDepartment = {
	Accounting: ['Main Office', 'Audit Unit', 'Records'],
	Agriculture: ['Main Office', 'Extension Office', 'Research Unit'],
	Assessors: ['Main Office', 'Field Unit'],
	Budget: ['Main Office', 'Analysis Unit'],
	Cemetery: ['Main Office', 'Maintenance'],
	'Civil Registrar': ['Main Office', 'Records Unit'],
	'Day Care': ['Facility 1', 'Facility 2'],
	Dental: ['Main Office', 'Clinic'],
	'Economic Enterprise': ['Main Office', 'Operations'],
	Engineering: ['Main Office', 'Project Unit', 'Design Unit'],
	GSO: ['Main Office', 'Property Unit', 'Procurement'],
	'Health Office': ['Main Office', 'Clinic', 'Field Services'],
	HRMO: ['Main Office', 'Records Unit', 'Training'],
	IT: ['Main Office', 'Server Room', 'Support Desk'],
	'Legislative Staff': ['Main Office', 'Records'],
	Licensing: ['Main Office', 'Processing Unit'],
	LYDO: ['Main Office', 'Program Unit'],
	Market: ['Main Office', 'Operations'],
	"Mayors-Office": ['Main Office', 'Administrative Unit'],
	MDRRMO: ['Main Office', 'Disaster Response'],
	MENRO: ['Main Office', 'Environmental Unit'],
	MSWDO: ['Main Office', 'Services Unit'],
	'Municipal Administrator': ['Main Office', 'Administration'],
	OSCA: ['Main Office', 'Services Unit'],
	Planning: ['Main Office', 'Development Unit'],
	Sanitation: ['Main Office', 'Operations', 'Maintenance'],
	Slaughterhouse: ['Main Office', 'Processing Unit'],
	Tourism: ['Main Office', 'Marketing', 'Events'],
	Treasurer: ['Main Office', 'Accounting Unit'],
	"Vice Mayors-Office": ['Main Office', 'Administrative Unit']
};

export const sbMemberOptions = ['yes', 'no'];

export const postTypes = [
	'news',
	'local news',
	'abroad news',
	'announcement',
	'event',
	'update',
	'accomplishment',
	'activity',
	'other'
];
export const othersTypes = [`Citizen's Charter`, 'Organizational Chart'];

// ─── Section Layout Designs ─────────────────────────────────────────────────
export const sectionLayouts = [
	{
		id: 'grid',
		label: 'Classic Grid',
		desc: 'Equal-width 1–3 column auto-fit',
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>`
	},
	{
		id: 'magazine',
		label: 'Magazine',
		desc: 'Hero first card + smaller grid',
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="10" rx="1"/><rect x="3" y="15" width="8" height="6" rx="1"/><rect x="13" y="15" width="8" height="6" rx="1"/></svg>`
	},
	{
		id: 'masonry',
		label: 'Masonry',
		desc: 'Pinterest-style unequal heights',
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="8" height="12" rx="1"/><rect x="13" y="3" width="8" height="7" rx="1"/><rect x="13" y="12" width="8" height="9" rx="1"/><rect x="3" y="17" width="8" height="4" rx="1"/></svg>`
	},
	{
		id: 'timeline',
		label: 'Timeline',
		desc: 'Chronological vertical entries',
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="3" x2="12" y2="21"/><circle cx="12" cy="7" r="2" fill="currentColor"/><rect x="14" y="5" width="7" height="4" rx="1"/><circle cx="12" cy="13" r="2" fill="currentColor"/><rect x="3" y="11" width="7" height="4" rx="1"/><circle cx="12" cy="19" r="2" fill="currentColor"/><rect x="14" y="17" width="7" height="4" rx="1"/></svg>`
	},
	{
		id: 'editorial',
		label: 'Editorial',
		desc: 'Full-width stacked, big typography',
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="5" rx="1"/><rect x="3" y="10" width="18" height="5" rx="1"/><rect x="3" y="17" width="18" height="4" rx="1"/></svg>`
	},
	{
		id: 'list',
		label: 'Compact List',
		desc: 'Slim horizontal rows, formal',
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`
	}
];

// ─── Card Style Designs ──────────────────────────────────────────────────────
export const cardStyles = [
	{
		id: 'default',
		label: 'Standard',
		desc: 'Clean white card, subtle shadow',
		preview: { bg: '#ffffff', border: '#e2e8f0', text: '#1e293b', accent: '#3b82f6' }
	},
	{
		id: 'glass',
		label: 'Glassmorphism',
		desc: 'Frosted glass, blur backdrop',
		preview: { bg: 'rgba(255,255,255,0.15)', border: 'rgba(255,255,255,0.3)', text: '#ffffff', accent: '#60a5fa' }
	},
	{
		id: 'newspaper',
		label: 'Newspaper',
		desc: 'Serif fonts, editorial typeset',
		preview: { bg: '#fefce8', border: '#92400e', text: '#1c1917', accent: '#92400e' }
	},
	{
		id: 'bold',
		label: 'Bold / Magazine',
		desc: 'Full-bleed image, vivid overlay',
		preview: { bg: '#0f172a', border: '#f59e0b', text: '#f8fafc', accent: '#f59e0b' }
	},
	{
		id: 'polaroid',
		label: 'Polaroid',
		desc: 'White photo frame, caption below',
		preview: { bg: '#ffffff', border: '#d1d5db', text: '#374151', accent: '#6b7280' }
	},
	{
		id: 'minimal',
		label: 'Borderless',
		desc: 'Flat, no container, typography-first',
		preview: { bg: 'transparent', border: 'transparent', text: '#0f172a', accent: '#6366f1' }
	}
];

// ─── Default Nav Department Structure (seed / fallback) ─────────────────────
export const defaultNavDepartments = [
	{
		group: "Office of the Mayor (Executive)",
		category: "local",
		order: 1,
		offices: [
			{ name: "Office of the Mayor", href: "/Departments/Mayors-Office", visible: true },
			{ name: "Municipal Administrator's Office", href: "/Departments/Municipal-Administrator", visible: true },
			{ name: "Human Resource Management Office (HRMO)", href: "/Departments/HRMO", visible: true },
			{ name: "Public Employment Service Office (PESO)", href: "/Departments/Peso", visible: true },
			{ name: "General Services Office (GSO)", href: "/Departments/GSO", visible: true },
			{ name: "Environment & Natural Resources (MENRO)", href: "/Departments/MENRO", visible: true },
			{ name: "Municipal Tourism Office", href: "/Departments/Tourism", visible: true },
			{ name: "Procurement Office", href: "/Departments/Procurement", visible: true },
			{ name: "Information Technology Office (IT)", href: "/Departments/IT", visible: true }
		]
	},
	{
		group: "Office of the Vice Mayor",
		category: "local",
		order: 2,
		offices: [
			{ name: "Mission / Vision", href: "/Departments/Vice-Mayors-Office#mission-vision", visible: true },
			{ name: "Staffing Pattern", href: "/Departments/Vice-Mayors-Office#staffing", visible: true },
			{ name: "Services", href: "/Departments/Vice-Mayors-Office#services", visible: true },
			{ name: "Announcements / Other Info", href: "/Departments/Vice-Mayors-Office#announcements", visible: true }
		]
	},
	{
		group: "Office of the Sangguniang Bayan",
		category: "local",
		order: 3,
		offices: [
			{ name: "Mission / Vision", href: "/Departments/Sangguniang-Bayan#mission-vision", visible: true },
			{ name: "Organizational Structure", href: "/Departments/Sangguniang-Bayan#org-chart", visible: true },
			{ name: "Citizen's Charter", href: "/citizens-charter", visible: true },
			{ name: "Approved Resolutions", href: "/Departments/Sangguniang-Bayan#resolutions", visible: true },
			{ name: "Ordinances", href: "/Departments/Sangguniang-Bayan#ordinances", visible: true },
			{ name: "Services Offered", href: "/Departments/Sangguniang-Bayan#services", visible: true },
			{ name: "Announcements / Other Info", href: "/Departments/Sangguniang-Bayan#announcements", visible: true }
		]
	},
	{
		group: "Treasury & Revenue (MTO)",
		category: "local",
		order: 4,
		offices: [
			{ name: "Municipal Treasurer's Office (MTO)", href: "/Departments/Treasurer", visible: true },
			{ name: "Business Permits & Licensing (BPLO)", href: "/Departments/Licensing", visible: true },
			{ name: "Public Market Operations", href: "/Departments/Market", visible: true },
			{ name: "Municipal Slaughterhouse", href: "/Departments/Slaugtherhouse", visible: true },
			{ name: "Municipal Public Cemetery", href: "/Departments/Cemetery", visible: true }
		]
	},
	{
		group: "Social Welfare & Development (MSWDO)",
		category: "local",
		order: 5,
		offices: [
			{ name: "Municipal Social Welfare & Development (MSWDO)", href: "/Departments/MSWDO", visible: true },
			{ name: "Day Care & Early Childhood Services", href: "/Departments/Day Care", visible: true },
			{ name: "Office of Senior Citizens Affairs (OSCA)", href: "/Departments/OSCA", visible: true },
			{ name: "Local Youth Development Office (LYDO)", href: "/Departments/LYDO", visible: true },
			{ name: "Solo Parents Welfare Office", href: "/Departments/Solo-Parent", visible: true },
			{ name: "Persons with Disability Affairs Office (PDAO/PWD)", href: "/Departments/PWD", visible: true }
		]
	},
	{
		group: "Health & Sanitation (MHO)",
		category: "local",
		order: 6,
		offices: [
			{ name: "Municipal Health Office (MHO)", href: "/Departments/Health Office", visible: true },
			{ name: "Sanitation & Environmental Inspection", href: "/Departments/Sanitation", visible: true },
			{ name: "Municipal Dental Unit", href: "/Departments/Dental", visible: true }
		]
	},
	{
		group: "Infrastructure, Planning & Administration",
		category: "local",
		order: 7,
		offices: [
			{ name: "Municipal Planning & Development (MPDC)", href: "/Departments/Planning", visible: true },
			{ name: "Municipal Engineering Office", href: "/Departments/Engineering", visible: true },
			{ name: "Municipal Accounting Office", href: "/Departments/Accounting", visible: true },
			{ name: "Municipal Agriculture Office (MAO)", href: "/Departments/Agriculture", visible: true },
			{ name: "Municipal Budget Office", href: "/Departments/Budget", visible: true },
			{ name: "Local Civil Registrar (LCR)", href: "/Departments/Civil Registrar", visible: true },
			{ name: "Municipal Assessor's Office", href: "/Departments/Assessors", visible: true },
			{ name: "Disaster Risk Reduction & Management (MDRRMO)", href: "/Departments/MDRRMO", visible: true }
		]
	},
	{
		group: "Employee Welfare (TAME)",
		category: "local",
		order: 8,
		offices: [
			{ name: "Tanauan Association of Municipal Employees (TAME)", href: "/Departments/TAME", visible: true }
		]
	},
	{
		group: "MLGOO",
		category: "national",
		order: 9,
		offices: [
			{ name: "MLGOO Office", href: "/Departments/MLGOO", visible: true },
			{ name: "Liga ng mga Barangay", href: "/Departments/Liga", visible: true },
			{ name: "SK Federation", href: "/Departments/SK-FED", visible: true },
			{ name: "Municipal Police", href: "/Departments/Police", visible: true },
			{ name: "Bureau of Fire Protection", href: "/Departments/Fire", visible: true }
		]
	}
];

export const barangayData = {
	Ada: {
		history:
			'There lived a person named Alfonso Balmes, popularly known as "Ponso" who was fond of making jokes to others. His house stands just along the bank of Ada creek. Near his house was the road going to Barangay San Victor Tanauan, Leyte from Barangay Canbalisara. Because of his popularity every person who passed by, ask Ponso if there is fish, his constant answer was "may ada". His constant answer "may ada" was the beginning of the name sitio Ada.',

		population: 'Approx. 2,500',
		captain: 'Juan Dela Cruz',
		contact: 'ada.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Ada+Rice+Fields',
			'https://via.placeholder.com/400x300?text=Ada+Festival'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Ada+Scenic+View',
		website: 'https://ada-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/AdaTanauan'
	},

	Amanluran: {
		history:
			"Barangay Amanluran was formerly a sitio of Barangay Cogon, where the name of the Barangay originated from 'Ucab,' known as 'AMANLURAN.' This ucab was located in the elevated part of the Barangay. According to the elders, the first person to live in this sitio was Domingo Almaden, also known as Inggo, who was the ancestor of the late Barangay Captain Domingo Almaden. Over time, the population in this sitio grew until it became a Barrio. In the early days, there were no roads, and people would walk, rolling up their pants because they would surely pass through mud. They would reach 'Abang' where they would wash up so that by the time they got to the road, their feet would no longer be muddy. The people's livelihoods back then included planting Palawan (a type of crop), planting rice, extracting tuba (a local alcoholic drink) from coconut trees, making kalamay (a type of sweet delicacy), and fishing for freshwater fish, as during that time, there were plenty of fish, especially in Dara-og Creek.",

		population: 'Approx. 3,000',
		captain: 'Maria Santos',
		contact: 'amanluran.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Amanluran+Beach',
			'https://via.placeholder.com/400x300?text=Amanluran+Market'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Amanluran+Coastline',
		website: 'https://amanluran-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/AmanluranTanauan'
	},
	Arado: {
		history:
			'"Arado" means an instrument used to till the land in preparation for planting. It is said that 18 decades ago, a Spanish soldier was exploring and encountered a farmer who was tilling the land. The soldier asked a question to the farmer in Spanish, but since the farmer did not understand Spanish, he simply laughed at the soldier. When the soldier asked the same question again, the farmer replied with "ARADO," thinking the soldier was asking about the tool he was holding. Since then, the place has been called Arado. Over time, when the first village head or "Tenyente del Baryo," known as Tito Binoy, was appointed, and through Republic Act 2370 and Republic Act 3590, this area was officially recognized and named Barangay Arado.',

		population: 'Approx. 2,800',
		captain: 'Pedro Reyes',
		contact: 'arado.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Arado+Health+Center',
			'https://via.placeholder.com/400x300?text=Arado+Fair'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Arado+Community',
		website: 'https://arado-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/AradoTanauan'
	},
	Atipolo: {
		history:
			"ATIPOLO is a big size tree with the same leaves’ formation with the breadfruit. Its fruit is smaller than a knuckle with spikelets and the seeds edible, the taste approaching that of peanut. Come July and August the fruits are ripe and the seed simply fall to the ground due to action of birds and wind that the children would love to gather the rest to cook and enjoy the nice and tasting fruit. The trunk is also sawed for lumber materials, especially for flooring, since many people love its maroon-colored green. So, the story goes, that at the close of the Spanish regime in the country, the area was simply settled by few families and that the place had this tree in great quantity and every fruiting season, people from poblacion came to the place to gather this delectable fruit. When asked where they are going, the answer was simply 'ATIPOLO' and so this barangay acquired its name from the fruit bearing Atipolo tree.",

		population: 'Approx. 1,800',
		captain: 'Ana Gomez',
		contact: 'atipolo.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Atipolo+Farms',
			'https://via.placeholder.com/400x300?text=Atipolo+Hills'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Atipolo+Landscape',
		website: 'https://atipolo-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/AtipoloTanauan'
	},
	Balud: {
		history:
			"During the 20th century, the barangay of Balud gained its name when the Americans arrived in the area during World War II. As they interacted with the local residents, they discovered the abundance of forests and the wide variety of birds that inhabited the area. Fascinated by the birdlife, the Americans developed a fondness for bird shooting as a pastime. Every Sunday morning, the Americans would eagerly make their way to the barangay, bringing along their prized birds. They would engage in bird shooting activities, showcasing their skills and enjoying the thrill. The birds they brought with them became known as the 'Balud Bird,' named after our barangay. When curious locals inquired about the names of these birds, the Americans would often respond with 'Balud nga Tamsi.' This phrase became synonymous with the birds they brought and further solidified the association between our barangay and the avian species. Over time, the name 'Balud' became deeply rooted in the community's identity. The barangay's residents embraced the name, recognizing the significance it held in their history and culture. Today, the name 'Balud' continues to be proudly carried by our barangay, serving as a testament to the shared heritage and the enduring connection between the Americans and the local community.It is worth noting that originally, Barangay Balud was a sitio under Barangay Cameri. However, through the efforts facilitated by RA 2370 and RA 3590, it achieved the status of anindependent barangay. This milestone marked the growth and development of Balud, allowing it to govern its own affairs and cater to the needs of its residents more effectively.",

		population: 'Approx. 2,200',
		captain: 'Carlos Lim',
		contact: 'balud.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Balud+Beach',
			'https://via.placeholder.com/400x300?text=Balud+Festival'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Balud+Shoreline',
		website: 'https://balud-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/BaludTanauan'
	},
	Bangon: {
		history:
			"Bangon was once a part of Calsadahay. It was just a piece of land covered with bamboo and coconut trees. On the edge part of Calsadahay, there was a lake called 'Casbangan' meaning 'Bangon' or 'Get up'. Damiano Yepes and his family are the first settlers in that land. Until such time that other people started to build their houses near the lake because of its affluence in water sources. Houses are built meters away from one another. They are made up of woods and nipa huts. Throughout the years, the area increased its household number as well as its population. And later on, it became a sitio of Calsadahay. The sitio was named Bangon in commemoration of the lake that serves as a border of Calsadahay and the said sitio. In order to maintain peace and integrity, the people decided to pick a leader who will rule the sitio. Their form of votation is by finger pointing. In year 1972, the first appointed 'tenyente de barrio' (Brgy. Captain) was Pedro Badana. He served the sitio for 20 years. And on that same year, the first church of the sitio was established. On the month of May, the first fiesta of the sitio was held. During that very day, a tragedy happened. A fully loaded bus named Tabon-tabon Princess collided with a by passing jeep. During that accident, majority of the passengers died. As the years passes by, because of the growing population in sitio Bangon, it has now been declared as a Barangay and is fully separated from Barangay Calsadahay.",

		population: 'Approx. 1,900',
		captain: 'Luz Garcia',
		contact: 'bangon.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Bangon+Pottery',
			'https://via.placeholder.com/400x300?text=Bangon+Weaving'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Bangon+Workshop',
		website: 'https://bangon-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/BangonTanauan'
	},
	Bantagan: {
		history:
			"In 1914, before the arrival of the Spaniards, this place was called 'BATANG'. It had five houses, and what was known as 'GINHAOPAN' is now known as 'BRGY. CAPTAIN'. He taught children to read and write. A person who completed Grade VI could already teach in the school. The highest level of education at that time was Grade VI. During the Spanish era, there was a mistake in writing 'TAX RECEIPTS', resulting in 'BANTAGAN' instead of 'BATANG'. In 1819, it was formally named 'BANTAGAN'. During the presidency of Ramon Magsaysay, the term 'GINHAOPAN' became 'TENIENTE DEL BARRIO', and 'VICE' was called 'SUPLENTE'. From 1944-1946, Delfin Meniano served as 'Teniente Del Barrio' with Pastor Cordano as 'Suplente'. During their term, they built 'Tagaytay' from Catigbian to Calsadahay and constructed 'Aludayday'. In 1947-1948, Alfredo Copino was the Teniente Del Barrio. His project was the installation of nine 'jetmatic pumps'. From 1949-1985, Servando Magallanes was Teniente Del Barrio. He improved the Batangan road, which is now part of the municipality, with a donation of 180 bags of 'BULGOR' as wages for road construction. They also received 90,000 pesos to buy rocks and 50,000 pesos for additional covering needs. He was the first to clean 'Belisong Creek'. 'Schistosomiasis' provided milk, sardines, and raisins as wages for the workers. Remegio Magallanes brought the image of 'St. Jude', and the residents held a meeting. They built a church and decided to celebrate the feast every May 10-11. He also constructed a dance area and renovated the church. From 1986-1992, Purificacion Meniano was Teniente Del Barrio. Her projects included starting the concreting of a 120-meter road, enlarging the dance area, and building a basketball court and ring. Due to her efforts, the barangay got electricity. From 1993-2007, Marian Resma was the Punong Barangay. She completed many projects by collaborating with government agencies and the municipality. They built the Brgy. Hall, Day Care Center, and now the Health Center. The outpost was repaired four times, the roads were paved, a new Day Care Center and water system were built, the outpost, Health Center, and church were renovated, toilet bowls were purchased, the Brgy. Hall was painted, window grills were installed, and street lights were put up. All barangay leaders that have been a barangay captain in the Brgy. Bantagan have accomplished numerous projects for the welfare of the people.",
		population: 'Approx. 2,600',
		captain: 'Jose Cruz',
		contact: 'bantagan.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Bantagan+Boats',
			'https://via.placeholder.com/400x300?text=Bantagan+Race'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Bantagan+Shore',
		website: 'https://bantagan-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/BantaganTanauan'
	},
	Baras: {
		history:
			'The municipality of Tanauan in Leyte, Philippines, is composed of several barangays, including Baras. Baras is a vibrant and culturally rich barangay that holds a significant place in the history of the municipality. The early history of Baras dates back to the pre-colonial era when the area was inhabited by indigenous people known as the Warays. These native settlers were known for their resilience, resourcefulness, and deep connection to the land. During the Spanish colonial period, Baras, like many other parts of the Philippines, fell under Spanish rule. The Spanish influence left a lasting impact on the culture, traditions, and architecture of the barangay. Catholicism was introduced, and the construction of churches and religious structures became prominent features of the community. Baras played a crucial role during the Philippine Revolution against Spanish rule in the late 19th century. Local heroes and freedom fighters from Baras actively participated in the struggle for independence, bravely fighting against the oppressive colonial forces. Their sacrifices and bravery contributed to the eventual liberation of the Philippines. In the early 20th century, Baras, along with the rest of Tanauan, experienced significant changes and developments. The establishment of schools, health centers, and government offices brought progress and improved the quality of life for the residents. Agriculture, particularly rice farming, became a vital economic activity in the barangay, sustaining the livelihoods of many families.',
		population: 'Approx. 3,500',
		captain: 'Elena Tan',
		contact: 'baras.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Baras+Festival',
			'https://via.placeholder.com/400x300?text=Baras+Church'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Baras+Cultural+Square',
		website: 'https://baras-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/BarasTanauan'
	},
	Binolo: {
		history:
			"The barangay is the basic territorial and political unit of the Philippines. Originally the word barangay meant the boat used by the Malays who migrated around 200 B.C from Borneo to the Phil. Archipelago. Later, it was to refer to any of the native settlement headed by a monarchical chieftain called Datu, Panginoo or pangolo. When the Spaniards arrived in the 16th Century, they adopted the same tribal organization and named the headman cabeza de barangay. Throughout the Spanish period, the barangays were mere administrative units of the government. Existing towns, called pueblos, were composed of poblaciones (town centers), barrios (rural settlements), and visitas (municipal districts). It was only in 1893 with the proclamation of the Maura Law that barangays, each comprised of 100 to 150 families, became territorial wards of towns. In 1931, with the enactment of ACT No. 3861, further administrative reforms were introduced. Long before the ancestors of the rich lowland barrio discovered the place, it was named Barrio Ibarra Santa Rosa de Lima in honor of the residents' patron saint, Santa Rosa de Lima. After many years, the people wanted to change the name of the barrio. The ancestors had farms just a few meters away from their houses, and they depended on the land for sustenance by cultivating and gathering farm products. During cultivation, farmers cleared the land using their bolos to cut the grass. After using their bolos, they would throw them to the ground, and when the bolos bounced, it indicated the boundary of their lands. Because of this, the barrio was named Binolo. The word 'BINOLO' was adapted as the name of their place by the early inhabitants, signifying the farmers' use of bolos in clearing and cultivating the lands, which were densely covered with grass. It further evolved into BINOLO and became the official name of the place. By virtue of a Barangay Resolution, Binolo became one of the barangays of the municipality of Tanauan. Its first Teniente del Barrio was the late Petronilo Rabago. As Barangay Binolo developed, it saw progress in health services, farm-to-market roads, water systems, and electricity reaching most households. In education, the barangay has a Day Care Center, but unfortunately, no elementary school, and many residents remain poor and in need of assistance and financial support to improve their quality of life. Majority of the leaders who served as Barangay Captains during Martial Law held office for two to six years, as elections were not conducted then. The barangay administration was succeeded by several leaders: the first Punong Barangay was Claudio Boco, followed by Milagros Casilan, Rufina Mercado, Wilma U. Boco, Zenaida T. Rabina, and currently Hon. Wilma B. Perez. This small barangay community is proud to be the home of hardworking, honest, and resilient people. Barangay Binolo is considered peaceful. Students study in different universities, people operate small-scale businesses, and others pursue professional careers and skilled work. The barangay offers various programs to its constituents, including beautification, clean and green initiatives, solid waste management, sports activities, medical services, disaster preparedness, livelihood and poverty alleviation training, feeding programs, preservation of peace and order, and anti-drug campaigns. At present, Barangay Binolo is enjoying continuous political, social, and economic development.",
		population: 'Approx. 2,000',
		captain: 'Miguel Santos',
		contact: 'binolo.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Binolo+Forest',
			'https://via.placeholder.com/400x300?text=Binolo+Trail'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Binolo+Greenery',
		website: 'https://binolo-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/BinoloTanauan'
	},
	Binongtoan: {
		history:
			'Based on the local writer in the 16th century, at that time, there were no Spaniards. Binongto-an was inhabited by many people of "Malay Origin," whose homes were built near the "Binahaan River". After the Spanish invasion, there were many houses around the coast because of commerce. But at that time, the Moros killed the women and the men, the people moved to Binongto-an. Based on what was learned by the first barrio lieutenant who is Igmedyo Modesto in the year 1950.\nIn the history of Tanauan, Binongto-an has become a town twice that’s why Binongtoan means \'GUINBONGTOHAN\'. As the years went by, the barangay was led by the different barangay captains and worked together for the betterment of the barangay. Having Brgy Hall and Chapel in 1979–1981, and celebrating the patronage of the barangay on May 14, 1981, with the patron San Antonio de Padua. The first to open the Barangay Road (Salvador-Binongto-an) was in 1984. There was electricity from DORELCO in 1989. In 2015, there was drinking water from LMWD. As time passed, different projects and infrastructures were built and are still in progress in the barangay.',

		population: 'Approx. 2,300',
		captain: 'Clara Reyes',
		contact: 'binongtoan.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Binongtoan+Farms',
			'https://via.placeholder.com/400x300?text=Binongtoan+Market'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Binongtoan+Landscape',
		website: 'https://binongtoan-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/BinongtoanTanauan'
	},
	Bislig: {
		history:
			'In 1751, Iton Bislig became a Barangay. There are two statements about the origin of the name Bislig. First, the first residents identified here came from Bislig, Surigao Del Sur (now Bislig City). That\'s why they called it Bislig as the place they came from. Secondly, it comes from the phrase "Bisan Hilig." During that time, a strong storm passed by, and even though their houses were destroyed, they immediately rebuilt. Brgy. Bislig is located 4 kilometers away from Tanauan, bordered by Cabuynan in the North, Tolosa in the South of San Pedro Bay, in the East by Sinirangan, and Limbuhan Guti in the West. The first barangay captain of Bislig was Juan Oro (1930), followed by Isidoro "Dorong" Palana (1935), Melchor (1945), Hermenigildo Parone (1950), Percineple Demegillo (1960), Arnulfo Santillano (1980), Juan Egonio (2000-2004), Gina Merilo (2004-2012), Efren C. Merilo (2012 to present).\nNuestra Senora de Salvacion is the Patroness of Bislig, celebrated every 25th of April, and this barangay predominantly consists of Roman Catholics. In 1958, Barangay Bislig became a Fishing Port for some neighboring towns, hence it was also called the Fishing Capital of Tanauan, being our primary source of income. From then until now, we have facilities visible in our community. Such as the Brgy. Hall, covered court, Elementary School, Daycare Center, restaurant/hotel, resorts, and other establishments, all of which can be found on the map. Our streets are now all cemented and well-lit at night due to the presence of streetlights.',
		population: 'Approx. 2,700',
		captain: 'Antonio Lim',
		contact: 'bislig.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Bislig+Market',
			'https://via.placeholder.com/400x300?text=Bislig+Street'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Bislig+Trade+Hub',
		website: 'https://bislig-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/BisligTanauan'
	},
	'Buntay (Poblacion)': {
		history:
			'Due to the three bodies of water comprising San Pedro Bay, Embarkadero River, and Mangga River surrounded by "MUMBOON," a vast area where plants and Nipa forests known as BUNTAY thrive, the Barangay name "BUNTAY" originated here in 1704 concurrent with the construction of Tanauan Church. The building material called "CASCOWL" was brought from Marabut, Samar to construct the church walls, passing through the BUNTAY or MUMBOON site rich with vegetation and forests. The "CASCOWL" was transported towards Mangga River, towards the church, before the barangay was officially named BUNTAY.\nFollowing the church\'s completion, it served as an evacuation point during pirate attacks in Tanauan town, visible from BUNTAY, where people sought refuge within its high-walled perimeter with four corner towers used as lookout points during encounters with pirates, Moros, or Muslims during raids.\nIn 1897, the Hurricane Tidal Wave struck Tanauan, where individuals adorned as "Pintados" symbolized victory and prowess. During the BUNTAY era, a leader named "Talyogo," a Pintado figure, became the Captain and at that time, Pintados were individuals possessing leadership or chieftaincy, strength, courage, and stature.',
		population: 'Approx. 4,000',
		captain: 'Rosa Garcia',
		contact: 'buntay.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Buntay+Market',
			'https://via.placeholder.com/400x300?text=Buntay+Plaza'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Buntay+Town+Center',
		website: 'https://buntay-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/BuntayTanauan'
	},
	Cabalagnan: {
		history:
			'In Barangay Cabalagnan, in past times, there were three (3) sitios. The first sitio is Sitio Cabangkalan, the second is Sitio Mahong, and the third is Sitio Lapdok. Sitio Cabangkalan is located to the east, Sitio Mahong is to the west, and Sitio Lapdok is to the north. These three sitios have a river or creek that flows towards the Binahaan River and opens towards Sitio Atipolo of the Barangay. This creek is called Cabalagnan Creek, hence the three sitios are collectively known as Barangay Cabalagnan. Cabalagnan is situated and surrounded by neighboring barangays such as the following; to the east is Barangay Maribi, to the South is Barangay Malaguicay, to the west is Barangay Balud, and to the north is Barangay Baras.',
		population: 'Approx. 2,100',
		captain: 'Felipe Cruz',
		contact: 'cabalagnan.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Cabalagnan+Farms',
			'https://via.placeholder.com/400x300?text=Cabalagnan+Community'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Cabalagnan+Fields',
		website: 'https://cabalagnan-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/CabalagnanTanauan'
	},
	'Cabarasan Guti': {
		history:
			"In 1945 during World War II, the barangay had no name. It was just a sitio in Barangay San Isidro. By the early 1960s, the barangay became an independent barangay with a growing population. During this time, Pedro Arcena became the 'Teniente Del Barrio' in the barangay. It was also during this period that the 'Bernardino Prestillo School Building' was constructed. In the 1980s, an irrigation canal was started from Barangay Tingib, Pastrana, but it was not completed. The Barangay Captain at that time was Aparacion A. Almero. In 1989, the chapel in the barangay was constructed. During the elections, the chapel was used as an election precinct. At that time, there were around 30 households. Also, during this period, a concrete road measuring 50 meters long was built. The Barangay Hall and Day Care Center were initially made of bamboo and nipa. With the assistance of the former mayor of Tanauan, Boy Cinco, three (3) jetmatic pumps were provided to the barangay. Organized groups such as the Barangay Tanods and Day Care Teachers were established during this time.\nIn 1990, the barangay experienced a seven (7) month drought, leading to food scarcity among the residents. In 1992, there were National and Barangay Elections. The Barangay Chairman during this time was Demetrio Balano, and the Sangguniang Kabataan Chairman was Nelia Balano. The Barangay Hall was upgraded with sturdy and lightweight materials. Additionally, 100 meters of cemented road were added during these years. A Basketball Court was also constructed.\nIn 1995, a jetmatic pump was purchased, and electricity was provided to the barangay through BAPA-LEYECO 2. During this time, the former First Lady of the Philippines, Madam Imelda Romualdez Marcos, visited the barangay. In 1997, Ciriaco Guiron became the Barangay Captain, while Merle Balano became the SK Chairman. The road was further cemented, extending to 70 meters.\nIn 2001, Alfred Romualdez and his wife Christina Gonzales visited the barangay. In 2002, Ciriaco Guiron won as Barangay Captain again, with Gary Mosquito as the new SK Chairman. During this time, the Day Care Center was concreted, a tuna was purchased for the outpost Barangay Hall, and a Barangay Health Center was established. The Basketball Court 'phase 1' was also developed. The tuna was later used for essential barangay facilities, leading to the concreting of the Barangay Hall, Health Center, and Tanod Outpost, along with the addition of other facilities like a multi-purpose center and waiting shed.\nIn 2007, Ciriaco Guiron won as Barangay Captain once more, with Gerry Arguilles as the SK Chairman. The roof of the Barangay Hall was renovated during this time. Additional road cementing of 35 meters and 10 meters was done. The construction of Basketball Court 'phase 2' continued, and streetlights were installed with the assistance of the local municipal government.",
		population: 'Approx. 1,700',
		captain: 'Lourdes Tan',
		contact: 'cabarasan-guti.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Cabarasan+Guti+Dance',
			'https://via.placeholder.com/400x300?text=Cabarasan+Guti+Festival'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Cabarasan+Guti+Cultural+Square',
		website: 'https://cabarasan-guti-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/CabarasanGutiTanauan'
	},
	Cabonga_an: {
		history:
			"Previously, the barangay Cabunga-an was a composition of two separate sitios, namely Cabunga-an and Baliong. Cabunga-an is a sitio of Barrio San Victor and was named as Cabunga-an because of the trees called 'BUNGA' or 'BETTLENUT'. Baliong is a sitio of Barrio Cogon and was named after a creek called Baliong Creek. After many years, the sitio folks—Maballo, Udtohan, and Monte, the first families who settled in the area—decided to form a new barrio named Cabunga-an, since it had a larger territory than Baliong. The barangay celebrates its fiesta every April 26, honoring Sto. Niño as its patron saint, a tradition that began in 1987.  It was called a Barrio because it was headed by a Teniente Del Barrio. Upon its approval as a barrio, Juan Balano became the first Teniente Del Barrio (1939–1941). The subsequent leaders were: Demetrio Maballo (1941–1945), Calixto de Paz (1945–1947), Dalmacio Maballo (1947–1950), Pablo Balasbas (1950–1961), and Rosita Laurino (1961–1974). In 1974, the title Teniente Del Barrio was changed to Barangay Captain, with Paciano de Paz serving as the first Barangay Captain (1974–1982). He was followed by Cresencia C. Ibañez (1982–1999), Romeo C. Maballo (1989–1997), and Hon. Bienvinido T. Udtohan (1997–2019). The next Barangay Chairman was Hon. Ginny C. Quinos (2010–2013), who resigned, leading Hon. Romeo M. Pedere to serve as acting Barangay Chairman (June 2013–November 2013). Afterwards, Hon. Bienvinido T. Udtohan again served (2014–2018). Currently, the Barangay Chairman is Hon. Reynan O. Leona (2018–present).",
		population: 'Approx. 2,400',
		captain: 'Manuel Santos',
		contact: 'cabonga-an.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Cabonga-an+Rebuild',
			'https://via.placeholder.com/400x300?text=Cabonga-an+Community'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Cabonga-an+Landscape',
		website: 'https://cabonga-an-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/CabongaAnTanauan'
	},
	Cabuynan: {
		history:
			"This place was named CABUYNAN because there were many BUYON trees, which produce resin and are home to BUHAY shells, which are eaten and delicious when cooked. So, when someone asked where people got the BUYON, the answer was in KABUYONAN, which is why it was named CABUYNAN. In the early days, there were only three houses in CABUYNAN, but the population grew. A chapel was built in 1912, and the land for it was donated by the ENCINA FAMILY in 1915. In 1920, a strong typhoon named UGIS hit, causing houses to be destroyed and extensive damage. The Japanese arrived in Cabuynan and established a garrison or camp in 1938. In 1944, during LIBERATION DAY, the Americans settled here and built schools and hospitals until December 1944. Another strong typhoon named AMY struck, causing significant damage. In 1954, the Elementary School was relocated from Zone 2 to Zone 4. Another strong typhoon named BEBING hit in April 1979, causing significant damage. During the ORMOC tragedy in 1991, this barangay was also affected as the water levels suddenly rose and caused major flooding. The landslide in GINSAUGON, Southern Leyte, also affected this barangay due to the heavy flooding. A signal tower was erected by ISLACOM in 2003. In 2005, a school (TSAT - Tanauan School of Arts and Trade) was established. The CABUYNAN Covered Court was built in 2008, donated by CONGRESSMAN FERDINAND MARTIN ROMUALDEZ, with the efforts and cooperation of the BRGY. COUNCIL led by Brgy. CHAIRMAN RAMIL M. VIERRAS and his councilors: HON. JEANY TOBE, HON. ANTERO ALICER, HON. ERNESTO CABUBAS, HON. ASUNCION P. OCAÑA, HON. JUDITH N. ANGKAYA, HON. GERARDO CADION, BRGY. SECRETARY MARIKRIS C. ABANIS, and BRGY. TREASURER JOYCE C. OCAÑA. In 2011, another significant flood occurred on December 27. The KALAHI CIDSS helped the Barangay by providing a project in 2012, creating the FARM TO MARKET ROAD, identified as a priority project. In 2013, the strongest typhoon, YOLANDA/HAIYAN, hit, killing many people. Cabuynan lost 53 people due to the storm surge and strong winds. In 2014, Typhoon SENYANG caused flooding and a landslide on AMBAO Mountain, resulting in 3 casualties near the CUSTODIO family's house. This typhoon not only affected people but also caused extensive damage to the barangay's agriculture. After these major disasters, the barangay recovered through the REHABILITATION PHASE with support from various NGOs, including KALAHI CIDSS with their second priority project, the CIVIC CENTER, the RTR Foundation which donated a 2-STOREY ELEMENTARY SCHOOL BUILDING, the US_AID which donated a HIGH SCHOOL BUILDING for TSAT (TANAUAN SCHOOL OF ARTS AND TRADE), the ITALIAN GOVERNMENT which donated the EVACUATION CENTER, and the DAY CARE CENTER donated by the SAVE THE CHILDREN FOUNDATION.",
		population: 'Approx. 2,200',
		captain: 'Teresa Lim',
		contact: 'cabuynan.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Cabuynan+School',
			'https://via.placeholder.com/400x300?text=Cabuynan+Classroom'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Cabuynan+Community',
		website: 'https://cabuynan-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/CabuynanTanauan'
	},
	Cahumayhumayan: {
		history:
			"During the Spanish era, Cahumayhumayan became a sitio in Barangay Salvador, Tanauan, Leyte. The name 'Cahumayhumayan' originated from the product 'HUMAY' (rice). Initially, only eight families lived there, with rice farming as their primary livelihood. Over time, the population of Cahumayhumayan increased, and in 1935, it became an independent barangay. In 1940, Narciso Bantulan became the first barangay leader, known as 'Tenyente del Baryo.' In 1941, World War II began. In 1943, a massive flood and typhoon caused the deaths of many Filipinos and Japanese soldiers. From 1944 to 1950, Florentino Balano served as the second Tenyente del Baryo during the HUKBALAHAP rebellion against the government. From 1950 to 1955, Eulalio Natividad was the third Tenyente del Baryo. From 1950 to 1960, Eulalio Donsal was the fourth Tenyente del Baryo. During these years, the barangay experienced flooding due to an insufficient drainage system leading to Binahaan River. From 1960 to 1970, three Tenyente del Baryo served: Luciano Brimon, Alejo Cuayzon, and Juan Cornejo. In 1970, Nicasio Corales was the first Barangay Captain elected by the residents. In 1973, Efipanio Celada became the second Barangay Captain. In 1975, a government project (municipal) established a Marcos-type school building and Barangay Hall. In 1975, Simeon Soriano became the third Barangay Captain. That same year, two waiting sheds and a Barangay Chapel were constructed to celebrate the patron saint of Barangay Cahumayhumayan. In 1976, a significant flood destroyed the road connecting Barangay Cahumayhumayan and Barangay Salvador. From 1989 to 1994, the selection process for the Barangay Council changed. Hon. Adelina B. Tolibas became Barangay Captain by receiving the most votes, making her the first female Barangay Captain of Barangay Cahumayhumayan. During her term, a covered drainage canal and the cementing of the barangay road were implemented. From 1994 to 1997, 1997 to 2002, and 2002 to 2007 (three terms), Hon. Nestor A. Luangco was elected Barangay Chairman. Under his leadership, the barangay purchased land from Bernardo de Paz, where the Barangay Hall and Day Care Center were built in 2008. In subsequent years, an SK Hall was also constructed on the same land. In the following years, the Department of Education (DepEd) launched a program for each barangay to have a school. Due to the Barangay Council's interest, land was again purchased from Abraham Lagarto, and two classrooms for Grades 1 and 2 were constructed. The first teacher was Mrs. Susan Salubon. Over time, more classrooms were added until the Barangay Cahumayhumayan Elementary School was complete. The first principal was Mrs. Esmeralda Martija. Projects such as street lighting and water connections from LMWD, with four topstands and payment based on consumption, were also undertaken. The collections were remitted to the Barangay Treasurer. From 2007 to 2010, Hon. Pedro A. Corales was elected Punong Barangay. He implemented the cementing of the barangay road towards Barangay Catigbi-an and sitio Calaasan. From 2013 to 2018, Hon. Manuel G. Mercado was elected Punong Barangay. During his term, the devastating Typhoon Yolanda struck, destroying many homes and crops. With the help of the government and NGOs, the community gradually recovered. The DSWD initiated a project for barangays, choosing to build additional school buildings. During this period, Martial Law was declared, suspending elections, and Barangay Captain Simeon Soriano remained in office. In 1977-1978, the National Road covering Cahumayhumayan was cemented. In 1983, a drought occurred, with no rain for nine months, preventing rice planting. From 1989 to 1994, an election was held, and Adelina B. Tolibas was elected Barangay Captain, becoming the first female Barangay Captain. Under her leadership, a drainage canal from Zone 6 to Zone 7 was constructed. From 1994 to 1997, 1997 to 2002, and 2002 to 2007, Nestor Luangco served as Barangay Chairman for three terms. Under his administration, the new Barangay Hall, Day Care Center, road cementing, two classrooms, and other projects like street lighting and a concrete pathwalk to the school were established.",
		population: 'Approx. 1,900',
		captain: 'Vicente Reyes',
		contact: 'cahumayhumayan.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Cahumayhumayan+River',
			'https://via.placeholder.com/400x300?text=Cahumayhumayan+Farms'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Cahumayhumayan+Riverside',
		website: 'https://cahumayhumayan-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/CahumayhumayanTanauan'
	},
	Calogcog: {
		history:
			"In the year 1891, Barangay Calogcog was a place that could be reached from the port by crossing the river using a raft or boat, which was navigated with a rope to cross the Binahaan River. Because of this method, the term 'pagcalogcog' became common, eventually leading to the place being named Brgy. Calogcog. From 1980 to 1986, the Barangay Chairman Julian Modesto Sr. started the celebration of Sta. Cruzan in the barangay, which has since been considered the Brgy. Fiesta. The initial celebrations were modest, with groups of nine people sponsoring the Novena [prayer], providing food each day for nine days. On the ninth day of the Novena, the nine groups would come together, bringing food to share, and this practice has continued, becoming recognized as the Brgy. Fiesta. In 1997, zoning was implemented in the barangay, dividing it into seven zones under the leadership of the former Barangay Captain.",

		population: 'Approx. 2,300',
		captain: 'Sofia Garcia',
		contact: 'calogcog.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Calogcog+Church',
			'https://via.placeholder.com/400x300?text=Calogcog+Landmark'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Calogcog+Heritage',
		website: 'https://calogcog-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/CalogcogTanauan'
	},
	Calsadahay: {
		history:
			"Barangay Calsadahay originated from the word 'CARO-CALSADAY', which means a long service road for the people to and from their homes and farms. It used to be called 'AMASI-AN', a word that comes from a small stream that flows through the barangay. There are five (5) Sitios: Bina-ugo, Sitio Iraya, Sitio Ilawod, Sitio Camingohan, and Sitio Casbangan. This barangay was one of the former Sitios of Barangay San Victor, but on June 18, 1961 it was formally named Barrio Calsadahay and then again it was called Barangay Calsadahay and it is one of the 54 barangays in the town of Tanauan, Leyte.",

		population: 'Approx. 2,600',
		captain: 'Ramon Cruz',
		contact: 'calsadahay.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Calsadahay+Fish+Market',
			'https://via.placeholder.com/400x300?text=Calsadahay+Beach'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Calsadahay+Coast',
		website: 'https://calsadahay-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/CalsadahayTanauan'
	},
	Camire: {
		history:
			"The history of Barangay Camire is quite unknown although old folks told long ago, when our old coin (one centavo) was still in large circumference and the Town of Tanauan was still deciding where the Poblacion should be located. The 'Big Man' of the time considered Barangay Camire as their best choice, but the inhabitants rejected the proposal, saying 'Cami na dire,' meaning they did not want the Poblacion there. The phrase was shortened to Camire, and over time it was called Comire. The area of Camire is approximately 64 hectares. The residents speak Waray-Waray, share the same customs and traditions, and maintain their historic way of life. \n\nIn 1940, Casiano Cornejo became the first Barangay Captain, followed by Indong Flores in 1941, Julian Encina in 1942, and Jesus Espina. During the Japanese and American periods, the first chapel was blessed by Padre Urgel, with Marcelo Regis as the first hermano. The school was transferred to a new location that same year. Subsequent Barangay Chairmen included Francisco Cayetano, Cayetano Cobacha, Manuel Canillas, Alejandro Encina, and Nemesio Mora. In 1983, Padre Pascual served as Missionary Priest. From 1986, Ireneo Encina was Barangay Chairman, followed by Magdalino Palo (1986-1989) and Petronio Corrales (1989-1997), during whose terms the road and basketball court were concreted. \n\nElectricity was installed in 1992, and a Tanod Outpost was built in 1994. Further projects included a waiting shed (1995) and SK concrete benches. From 1996 to 2007, Ermelo Redoña served as Barangay Chairman, overseeing construction of the Day Care Center (1998), Barangay Hall and Stage (1999), electric installation in the basketball court (2000-2007), Data Board, underground streetlights, concrete paving, fencing around the school and basketball court, additional waiting sheds, streetlights, and road rehabilitation. The barangay's sources of income included planting Palawan, rice farming, tuba gathering, fishing, and making calamay.",
		population: 'Approx. 2,000',
		captain: 'Clara Tan',
		contact: 'camire.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Camire+Sports',
			'https://via.placeholder.com/400x300?text=Camire+Community'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Camire+Fields',
		website: 'https://camire-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/CamireTanauan'
	},
	Canbalisara: {
		history:
			"The place was formerly a dense and swampy marshland, with numerous bigo palms and potat trees endemic to the wetlands, while in the uplands were buri, bariw, giant narra, and several towering to-og trees, one of which is the tallest in the country and a source of pride for the locality. This promising rural settlement, formerly a sitio of Barrio Cogon, derived its name from the first settler-couple, 'Bali and Sara.' Subsequent landowners and settlers called the settlement 'Canbalisara' because the couple used to give food and clothes to the poor. The exact names of the couple are unknown, but the settlement likely existed long before the coming of the Spaniards in the 18th century, as pre-Hispanic folks did not have family names. That is the story of Barangay Canbalisara, named after the couple Bali and Sara.",
		population: 'Approx. 2,400',
		captain: 'Eduardo Lim',
		contact: 'canbalisara.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Canbalisara+Market',
			'https://via.placeholder.com/400x300?text=Canbalisara+Street'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Canbalisara+Trade',
		website: 'https://canbalisara-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/CanbalisaraTanauan'
	},
	Canramos: {
		history:
			"The earliest known inhabitants of Tanauan, Leyte were a family of three: Calanao, the father; Makasanay, the mother; and Sangad, their daughter. Their settlement was along the bank of the Bukid River at the feet of Adil Hill. In 1601, a Chinese mestizo named Juanillo Siengco settled in the same area and established close ties with Calanao against the Moro pirates. The union of these two families resulted in inter-marriages among their descendants. As their numbers increased, some settled in the northeastern portion of the area, presently called Brgy. Canramos. \n\nOver time, the settlers experienced prosperity and peace under a kind leader called 'Ramos.' The leader's good name attracted others to settle in his area. When asked where they lived, they would reply 'Kan Ramos' (Kan meaning 'owned by'), which later became Canramos. Early Canramos residents included the Ramoses, descendants of the leader Ramos; the Siengcos, descendants of Juanillo Siengco (later changed to Cinco); the Villegases; the Peliños; and other prominent families. \n\nIn the eastern portion of Canramos is Emeterio Ramos Street, named after Cpl. Emeterio Ramos of the Tanauan Police Department, who sacrificed his life defending the Old Municipal Building from raiders. \n\nToday, Barangay Canramos boasts residents who have excelled in various professions and leadership roles in private and government institutions. The barangay has a land area of 7,725 hectares, a population of 3,444, and 1,017 households. Chief agricultural products include coconuts and nipa, while livelihood products include pottery, bamboo furniture, and lechon. The majority of the working population is employed in private and government institutions, while a minority engage in livelihood projects.",
		population: 'Approx. 3,800',
		captain: 'Alicia Santos',
		contact: 'canramos.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Canramos+Hall',
			'https://via.placeholder.com/400x300?text=Canramos+Plaza'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Canramos+Center',
		website: 'https://canramos-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/CanramosTanauan'
	},
	Catigbian: {
		history:
			"Based on the stories of the elders, during the establishment of Brgy Catigbi-an, the area was previously forested with many shrubs and trees and lacked formal roads. People used to walk through trails, and due to the abundance of shrubs, there were many water sources. While creating a canal for the water to pass through, they discovered that the water originated from the Catigbian River in Barangay San Andress. When the people decided to establish their own barangay, they unanimously named it Catigbi-an, derived from the water flowing from the Catigbi-an River.\n\nIn 1966, Estiban Cayanes was appointed as the Barrio Lieutenant. The barangay was officially registered, and a wooden bridge was constructed in 1987, which was later damaged during a typhoon in 1991. Small concrete bridges were subsequently built. The road was initially paved with gravel and stones, and eventually, the Brgy. Road was concreted in 1995. In 2011, through the efforts of Rev. Fr. Rey Caraballa, San Isidro Labrador was chosen as the patron saint, celebrated on May 19. A church was constructed through the barangay's efforts and the DSWD KALAHI CIDSS program. Additionally, the roads were completed, and a new Brgy. Hall was established with support from the DILG agency.",
		population: 'Approx. 2,100',
		captain: 'Victor Reyes',
		contact: 'catigbian.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Catigbian+Rice+Fields',
			'https://via.placeholder.com/400x300?text=Catigbian+Harvest'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Catigbian+Fields',
		website: 'https://catigbian-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/CatigbianTanauan'
	},
	Catmon: {
		history:
			"A decade ago, six families lived together on a hill surrounded by large trees and a modest farm. On special occasions, these families would invite friends from neighboring areas. During one such gathering, they were surprised by a visit from the town's mayor. When asked what the place was called, the eldest among them answered 'CATMON' because the area was surrounded by catmon trees. This is how Barangay Catmon got its name. Barangay Catmon is located in the southern part, about 8 kilometers west of Tanauan. It has an area of approximately 330.9008 hectares, bordered by Barangay Arado to the north, the Gulnarona River to the west, Barangay Limbuhan Dacu to the east, and Barangay Canbalisara to the south. It can be accessed by turning off from Barangay Cabuynan towards Barangay Canbalisara. The first settlers were the couple Vicente and Yokohobe Costiniano around 1820-1830. In 1954, a chapel and a primary school were established, and in 1964, the first patron saint celebration was held. By 1966, Barangay Arado and Barangay Picas held their elections here. In 1870, the area was officially named Barangay Catmon, with Francisco Costiniano as the first chief tanod. His house served as a temporary school during the Commonwealth era, up until Luciano Panzo and his children, including Felicisimo Panzo Sr., during the Second World War. Road construction began in 1976, and in 1984, an eight-month drought affected the barangay. The barangay hall was built in 1988, followed by cement road repairs in 1990. The area experienced flooding in 1991, and electricity was installed in 2004. In 2011, the DSWD provided a budget for a 300-kilometer concrete road. In 2012, a house fire resulted in the death of a child. Typhoon Yolanda struck in 2013, and in 2014, Typhoon Seniang caused severe flooding in zone 1. In 2016, housing was provided for 56 households, and the road in zone 5 was cemented. In 2017, new street lights were installed from zone 1 to zone 4, and roads in zones 4, 6, 7, 2, and 1 were cemented, while the two-story barangay hall was repaired. In 2018, a new barangay hall was built in zone 6 near the basketball court. Roads to Barangay Arado and pathways in zones 5, 3, and 4 were cemented. An additional 30 street lights were installed from zone 4 to zone 7, road construction began in zone 6 connecting to zone 7, and the installation of a pipeline from NAWASA started. The road to the elementary school was cemented, and improvements to the barangay chapel were completed. In 2019, the barangay multipurpose hall and chapel received electricity connections, and a water connection was established from the NAWASA/DPWH water system, marking the continued growth and development of Barangay Catmon into a modern and well-established community.",
		population: 'Approx. 1,800',
		captain: 'Marina Garcia',
		contact: 'catmon.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Catmon+Trees',
			'https://via.placeholder.com/400x300?text=Catmon+Trail'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Catmon+Greenery',
		website: 'https://catmon-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/CatmonTanauan'
	},
	Cogon: {
		history:
			"From the beginning, Cogon was the name of the barangay because it was once covered with cogon grass. In 1860, Julio Molon, who donated or owned the land, together with Seriaco Repalda, the first Teniente del Barrio, established the area as a barangay so that their names would be remembered after they passed away. In 1861, as the barangay was officially recognized, Julio Molon requested the building of a church and the purchase of an image for their patron saint. To mark this occasion, the barangay was christened with a new name based on the patron saint's image: Nuestra Señora de los Desamparados. The town president, Fe Esteban Apari, was invited to the event. On October 12, 1897, a strong typhoon destroyed the crops and houses in the barangay, and in 1898, the church was destroyed as well. Four siblings from the barangay, who had no children, donated their land to rebuild the church. Despite being officially christened with the name of the patron saint, the barangay continues to be called Cogon, as the people are accustomed to the original name.",
		population: 'Approx. 2,500',
		captain: 'Pablo Cruz',
		contact: 'cogon.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Cogon+Cooperative',
			'https://via.placeholder.com/400x300?text=Cogon+Community'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Cogon+Center',
		website: 'https://cogon-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/CogonTanauan'
	},
	Guindag_an: {
		history:
			"Before, the barangay did not have a name. Long ago, the people living in this area lived peacefully, but their tranquility was disturbed when invaders called the 'Pulahan' or 'Moros' came and oppressed the local residents, taking animals, food, and other possessions. Unable to resist at first, the locals eventually united under the guidance of the elders. Men, both married and bachelors, along with the elders, crafted weapons and practiced to prepare for the invaders' return. When the Moros came back, the locals fought bravely and defeated them. From that time on, the community regained peace, and the area was named 'Gindaugan,' meaning 'defeated the Moros.' Over time, the name evolved into 'Guindag-an,' marking the place's history and resilience.",
		population: 'Approx. 1,900',
		captain: 'Lucia Tan',
		contact: 'guindag-an.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Guindag-an+Hills',
			'https://via.placeholder.com/400x300?text=Guindag-an+Trail'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Guindag-an+Landscape',
		website: 'https://guindag-an-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/GuindagAnTanauan'
	},
	Guingauan: {
		history:
			"According to the elders and long-time residents, the name 'Guingauan' comes from the word 'guingao,' a type of fish commonly found in a small river at the boundary of the barangay known as Naliwatan Creek. Over time, 'guingao' became an integral part of the lives of the residents, serving as the basis for naming their barangay 'Guingauan.' The barangay comprises three sitios: Rawis to the north, named for being surrounded by water; 7th Fleet to the east, named after American soldiers from the 7th Fleet camped there; and Kala-asan to the south, named due to the abundance of wild animals. Historically, parts of Guingauan were claimed by Dagami, Tabontabon, and Tanauan, and from 1912 until a proper understanding was reached, the eastern part belonged to Tanauan while the western part was under Tabontabon. During the Japanese era, an old house owned by Mano Poler Francisco Natividad served as Tenyente del Barrio, followed by Ramon Tenta, the first Barangay Captain. The patronal feast is celebrated every June 15 in honor of Nuestra Señora Salvacion, their patron saint.",
		population: 'Approx. 2,200',
		captain: 'Rafael Lim',
		contact: 'guingauan.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Guingauan+Festival',
			'https://via.placeholder.com/400x300?text=Guingauan+Beach'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Guingauan+Coast',
		website: 'https://guingauan-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/GuingauanTanauan'
	},

	Hilagpad: {
		history:
			'Before, our place was called Hilagpad, which had many trees and was once a Sitio of Barangay San Victor. Each family engaged in cutting down trees and clearing the land for ownership. Because of this, the place was called Hilagpad, as each family did not hesitate to claim land ownership. The people responsible for naming it Hilagpad were the early inhabitants: Donato Gausin, Lorenzo Tolibas, and Juan Gausin.',
		population: 'Approx. 2,300',
		captain: 'Carmen Santos',
		contact: 'hilagpad.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Hilagpad+Rebuild',
			'https://via.placeholder.com/400x300?text=Hilagpad+Community'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Hilagpad+Recovery',
		website: 'https://hilagpad-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/HilagpadTanauan'
	},

	Kiling: {
		history:
			'The name Kiling originated from the tree that belongs to the Oxilidaceae Family or Balimbing Family, “Quilim”, which is larger than the edible Balimbing whose fruit is smaller and sweet. Eating the fruit of the Quilim tree can cause dizziness and stomach cramps due to its toxic juice. During the Spanish rule at the close of the 17th century, the area was inhabited by a few scattered settlers who built houses alongside trails connecting the Poblacion of Tanauan to Dagami and Burauen. Merchants transported goods such as lawlaw, budo (salted fish), hipon (salted shrimp), and salt along these trails, divided into legs for rest. Kiling became known as one of these rest stops, where a woman served hot ricecakes and salabat to weary travelers. Over time, the place became popularly known as Kiling. It originally encompassed the area from Bilisong Creek of Malaguicay to Bilisong River of Salvador. The first known Barangay Captain was Domingo Borela, followed by Anastacio Flores. During the American occupation, a Gabaldon school building was erected, and the western part became more inhabited as people gradually prospered.',
		population: 'Approx. 2,000',
		captain: 'Marta Garcia',
		contact: 'kiling.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Kiling+Trade+Route',
			'https://via.placeholder.com/400x300?text=Kiling+Market'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Kiling+Pathways',
		website: 'https://kiling-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/KilingTanauan'
	},

	Lapay: {
		history:
			"In the year 1818, during the Spanish Period, Barangay Lapay underwent significant changes and developments. The barangay was divided into nine sitios: Malaguicay, Guti, Batang, Abang, Rapo-dapo, Payawon, Samoyao, Mangga, Kulapnit, and Malobago. The community was primarily engaged in fishing and hunting wild animals, with hunters roaming the region without permanent settlement. As these hunters ventured along the riverbanks, they discovered an abundance of birds, leading them to name the place 'Lapay.' Leadership in the community was held by prominent figures such as 'Guin-ha-Opan Ambo,' also known as Mang Ambo, followed by Fermin Dandan and Pablo Valera. In May 1960, Barangay Lapay experienced a devastating flood caused by the Binaha-an and Guinarona Rivers, which destroyed crops and marked a challenging period in the barangay's history.",
		population: 'Approx. 2,100',
		captain: 'Benito Reyes',
		contact: 'lapay.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Lapay+Regatta',
			'https://via.placeholder.com/400x300?text=Lapay+Beach'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Lapay+Shoreline',
		website: 'https://lapay-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/LapayTanauan'
	},
	Licod: {
		history:
			"In the 17th century, after Carigara, Leyte was converted to Christianity and the first Roman Catholic church in Tanauan was constructed by Jesuit missionaries along the Embarkadero River, which was then the center of trade and commerce. The church faced east, with four towers and fortified walls to protect against raiding pirates. Early settlers converted to Christianity and settled behind the church, in an area known as 'likod ng simbahan' (back of the church), which eventually became Barangay Licod. In the early 19th century, a cholera epidemic struck Tanauan; Reverend Father Pantaleon de Veyra brought a replica of the Assumption of the Virgin Mary and called on the men of Licod to process the image around the town. Miraculously, the epidemic ended, and the Assumption of the Virgin Mary became the patroness of Tanauan. Over the years, leaders from 'teniente del barrio' to modern 'Barangay Chairman' such as Eusebio Tizon, Candido Velasco, Leopoldo Roa, Alejandro Oliva, Alejandro Moron, Jovencio Badana, Emerita Alvarez, Efigenio Avila, Fulton Morante, and currently Hon. Rolando P. Palo contributed to the development of the barangay, including road concreting, construction of drainage canals, installation of street lights, and other improvements.",

		population: 'Approx. 2,800',
		captain: 'Rolando P. Palo',
		contact: 'licod.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Licod+Festival',
			'https://via.placeholder.com/400x300?text=Licod+Market'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Licod+Coast',
		website: 'https://licod-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/LicodTanauan'
	},
	'Limbuhan Daku': {
		history:
			'Limbuhan Daku has been a large-scale farming hub since the 1920s, specializing in rice and corn.',
		population: 'Approx. 2,500',
		captain: 'Fernando Cruz',
		contact: 'limbuhan-daku.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Limbuhan+Daku+Farms',
			'https://via.placeholder.com/400x300?text=Limbuhan+Daku+Harvest'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Limbuhan+Daku+Fields',
		website: 'https://limbuhan-daku-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/LimbuhanDakuTanauan'
	},
	'Limbuhan Guti': {
		history:
			"The name LIMBUHAN is believed to have originated from the word 'LIMBULIMBU,' symbolizing the hospitality of the early inhabitants who generously offered whatever they could to visitors. Originally a small village near the Guinarona River, Limbuhan was inhabited by natives whose primary occupation was farming. Over time, the village grew into a barangay administered by local leaders, becoming an official barrio of the Municipality of Tanauan. In the 1930s, the first settlers included the families of Elino Daluperit, followed by the families of Diosdado Almeda. As Limbuhan Guti developed, the community made progress in health, farm-to-market roads, water systems, and electricity, though many residents still required assistance to improve their quality of life. Leadership of the barangay has continued to evolve, with different leaders guiding the community from the 1990s to the present.",
		population: 'Approx. 1,800',
		captain: 'Gloria Santos',
		contact: 'limbuhan-guti.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Limbuhan+Guti+Crafts',
			'https://via.placeholder.com/400x300?text=Limbuhan+Guti+Workshop'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Limbuhan+Guti+Village',
		website: 'https://limbuhan-guti-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/LimbuhanGutiTanauan'
	},
	Linao: {
		history:
			"Barangay Linao is an interior barangay of Tanauan, located seven kilometers from the town proper. Covering an area of 87 hectares, it consists of a combination of farmlands and residential lots. The barangay is home to 595 residents across 126 households, with farming as the main source of income. It is surrounded by the Daralog Creek, except on the side bordering Barangay Cogon. Important landmarks mark its boundaries, including a concrete post on the west separating Linao from Cogon and Linao Bridge on the east, separating it from Talolora and Barangay Arado. The barangay’s name comes from a stagnant clear water source in its northern portion, known as 'Linao' in the Waray dialect. This water, once clean and clear, was later destroyed to prevent environmental contamination and the spread of schistosomiasis. The first inhabitants were the families of Narciso Cinco and Remegio Gallano, whose relatives made up the initial population of forty-seven residents. Remegio Gallano served as the first Tenyente del Barrio during the time of President Diosdado Macapagal, and the barangay continued to develop during the presidency of Ferdinand E. Marcos.",
		population: 'Approx. 2,200',
		captain: 'Ricardo Lim',
		contact: 'linao.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Linao+School',
			'https://via.placeholder.com/400x300?text=Linao+Classroom'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Linao+Community',
		website: 'https://linao-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/LinaoTanauan'
	},

	Magay: {
		history:
			'Barangay Magay is a coastal and low-lying barangay covering approximately 12 hectares, divided into three zones. The total population is 638, consisting of 359 males and 325 females. The community engages in various income-generating activities such as sari-sari stores, fishing, pedicab driving, nipa making, backyard gardening, and organic farming through the BOKASHI method. The barangay has essential facilities including a Barangay Hall, chapel, Day Care Center, and recreational facilities for cockfighting. However, Magay faces vulnerabilities due to the absence of a health center, an incapacitated BDRRMC, lack of DRR volunteers, limited community awareness on disaster risk reduction, and inadequate infrastructure. Being only 300 meters from the seashore, the barangay is exposed to hazards such as typhoons, storm surges, earthquakes, tsunamis, and flooding. Super Typhoon Yolanda brought wide-scale destruction to Barangay Magay, damaging houses, disrupting livelihoods, causing injuries, illnesses, hunger, and 71 casualties. At that time, the community had limited knowledge of DRRM preparedness, lacked early warning systems, and had no established communication protocols for disasters.',
		population: 'Approx. 2,300',
		captain: 'Luis Tan',
		contact: 'magay.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Magay+Festival',
			'https://via.placeholder.com/400x300?text=Magay+Farms'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Magay+Fields',
		website: 'https://magay-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/MagayTanauan'
	},
	Maghulod: {
		history:
			"Barangay Maghulod was originally a sitio within Barangay San Victor and Kiling Salvador. It has a small population and is characterized by sparse vegetation around each house and challenging access to the village, making it very quiet during nighttime. In 1945, under the leadership of Ricardo Boco, the village was officially declared Maghulod. The name was derived from 'HUHUDLAN,' reflecting how each landowner protected their property and families, emphasizing ownership and security. This gave the barangay its unique name and identity.",
		population: 'Approx. 2,100',
		captain: 'Elena Cruz',
		contact: 'maghulod.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Maghulod+Watchtower',
			'https://via.placeholder.com/400x300?text=Maghulod+Landmark'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Maghulod+Heritage',
		website: 'https://maghulod-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/MaghulodTanauan'
	},
	Malaguicay: {
		history:
			"During the Spanish period, the community now known as Barangay Malaguicay was originally called 'Quarry,' reflecting the primary occupation of its inhabitants—extracting stones and sand. This name persisted through the Japanese occupation from 1943 to 1944 during World War II. In 1944, American forces liberated the area, and some soldiers stayed in the community, helping restore peace. During an encounter with American soldiers, a local resident, misunderstanding their language, said 'Likay kay Malagay,' which eventually evolved into the name Malaguicay. At that time, the Barangay had 16 households and about 60 residents. Angel Mendigo was appointed as the first Tenyente by the community elders. Over time, the Barangay was equipped with a school and a church, serving as central points for meetings and education. During the tenure of Cong. Daniel 2. Romualdez, Malaguicay was officially registered. As of 2023, Barangay Malaguicay has grown to a population of approximately 1,235 people across 330 households.",
		population: 'Approx. 1,235',
		captain: 'Javier Santos',
		contact: 'malaguicay.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Malaguicay+Sanctuary',
			'https://via.placeholder.com/400x300?text=Malaguicay+Beach'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Malaguicay+Coast',
		website: 'https://malaguicay-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/MalaguicayTanauan'
	},
	Maribi: {
		history:
			"Legend says that in the 17th century, the area now known as Barangay Maribi was a nameless settlement. Travelers would pass through the town of Dagami and Burauen along a trail beside a creek. In the heart of the barangay lived a couple, and the wife was named Maria. One morning, Spanish soldiers resting near the creek asked Maria her name. Nervous, she could only mumble 'Mar.' When asked about a wild fowl swimming nearby, she replied 'bibi,' meaning a wild duck. Over time, travelers called the place 'Maria Bibi,' which eventually evolved into 'Maribi.' The barangay is located along the National Highway, about 2.5 kilometers west of the Poblacion of Tanauan, and is accessible by wheeled vehicles. Covering approximately 200 hectares, half of it is rice fields, while the rest is planted with coconut trees and root crops to supplement the community's staple food. Under Republic Acts 2570 and 3590 in the 20th century, Barangay Maribi was officially recognized.",
		population: 'Approx. 2,000',
		captain: 'Clara Lim',
		contact: 'maribi.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Maribi+Recycling',
			'https://via.placeholder.com/400x300?text=Maribi+Community'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Maribi+Village',
		website: 'https://maribi-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/MaribiTanauan'
	},
	Mohon: {
		history:
			"The name Mohon is an adaptation of the Spanish word 'Mojon,' meaning landmark or milestone. The area, once part of Barangay San Joaquin in Palo, Leyte, was the site where a boundary stone was placed to mark the limits between the Municipalities of Palo and Tanauan. Over time, people from nearby barangays, especially Calogcog, settled in Mohon, which eventually became an extension of Barangay Calogcog. In 1915, Mohon was officially organized as a regular barrio, and today it is one of the fifty-four barangays of Tanauan. Mohon covers an area of 156.1287 hectares along the highway, situated 2 kilometers north of Tanauan and 12 kilometers from Tacloban City. It is bounded by the Calagtaran Channel to the east, Barangay Calogcog to the south, Barangay San Joaquin to the north, and Barangay Camire to the west. The population is predominantly Roman Catholic, and a new chapel was erected in 2005, replacing the old one used since 1951. Historically, Mohon residents engaged in rope making, candy, misua, and chicharon production, with Abaca Rope being particularly renowned. Many residents also migrated to Manila, Davao, and Palawan for better opportunities, while others remained, raising children who became professionals in various fields. Education in Mohon began in 1950, with the first classes held at the house of Severino Asis. Later, Marcelino Cobacha and Bruno Leonido donated land for the present school building. The barangay council, elementary school, and religious organizations have continued to play a central role in the development and civic life of Mohon.",
		population: 'Approx. 2,200',
		captain: 'Antonio Reyes',
		contact: 'mohon.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Mohon+Rebuild',
			'https://via.placeholder.com/400x300?text=Mohon+Infrastructure'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Mohon+Community',
		website: 'https://mohon-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/MohonTanauan'
	},
	Pago: {
		history:
			"Barangay Pago is one of the 54 barangays of Tanauan, Leyte, located near a small hill called 'Adil Hill'. The early inhabitants were farmers and tuba makers, known for being cheerful, kind, and hospitable. According to local lore, Cirilo Gamba, the first Barangay Captain, once rested under a tree in the fields and noticed a variety of birds perched on it. The smallest bird, though not the most attractive, remained resilient under the intense heat, impressing him greatly. He exclaimed, 'That bird is indeed small but terrible!' and decided to name the place 'Barangay Pago' after this remarkable bird. Since then, the community has embraced the name, celebrating their patron saint, the Most Sacred Heart of Jesus, with the first barangay fiesta held on June 4, 1975.",
		population: 'Approx. 2,100',
		captain: 'Sofia Tan',
		contact: 'pago.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Pago+River',
			'https://via.placeholder.com/400x300?text=Pago+Dam'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Pago+Riverside',
		website: 'https://pago-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/PagoTanauan'
	},
	Pasil: {
		history:
			"Long ago, there was an isolated area called Sitio Muday, sparsely populated because it was far from the poblacion. The place was peaceful and known for its agricultural products, particularly rice and root crops. During World War II, Japanese soldiers used Sitio Muday as a hideout and armory, oppressing local Filipinos. The local leader from the Cinco family performed heroic acts, assisting American soldiers by providing crucial information about Japanese positions, though he was eventually captured. Many Filipinos perished during the war, but after the Americans defeated the Japanese, they recovered numerous guns and ammunition. The local term for a gun, 'Pusil' in Waray-Waray, inspired the new name 'Pasil'. Sitio Muday was officially declared Barangay Pasil in 1945, commemorating its history and the bravery of its people.",
		population: 'Approx. 2,300',
		captain: 'Manuel Garcia',
		contact: 'pasil.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Pasil+Festival',
			'https://via.placeholder.com/400x300?text=Pasil+Community'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Pasil+Cultural+Square',
		website: 'https://pasil-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/PasilTanauan'
	},
	Picas: {
		history:
			"In its early days, Barangay Picas was surrounded by vast farmlands, forests, woodlands, hills, and banana plantations. Rice fields were the primary livelihood of its residents. According to local elders, the area was once a revered burial ground for the Japanese, and nearby hills served as hiding places for guerrillas during the Japanese occupation. The community consisted of families like the Oronos, Nuevas, Barbo, Fernandez, and the longstanding Costiniano family, who have owned land from then until now. During the Japanese era, Picas became a refuge for guerrillas who ambushed the enemy. The barangay was divided into two parts called 'Kapikas'—one with houses and the other with small fields. The name 'Picas' was derived from this original term. The patron saint of the barangay is Santa Elena, celebrated every 5th of May.",
		population: 'Approx. 2,500',
		captain: 'Luz Santos',
		contact: 'picas.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Picas+Market',
			'https://via.placeholder.com/400x300?text=Picas+Street'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Picas+Trade+Hub',
		website: 'https://picas-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/PicasTanauan'
	},
	Sacme: {
		history:
			"Barangay Sacme is one of the fifty-four barangays of Tanauan, Leyte, covering 145.51 hectares in the northeast of the municipality. It is bordered by Barangays Cabuynan, Limbuhan Daku, Amanluran, and Tugop. According to elders, the barangay’s name originated from a mother named Tarabitab, who always carried her child on her right hand, a practice called 'sinakmi.' Over time, this behavior became common among mothers in the area, and people began calling the place 'Sakmi.' The letter 'K' was later changed to 'C,' giving the barangay its official name, Sacme. Originally, the community was unified as one barangay, but later it included two sitios, Adgao and Calumbangan. Today, it also encompasses areas like Prime Town Housing and Mont Eagle Ville Subdivision.",
		population: 'Approx. 2,000',
		captain: 'Ricardo Cruz',
		contact: 'sacme.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Sacme+Festival',
			'https://via.placeholder.com/400x300?text=Sacme+Farms'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Sacme+Fields',
		website: 'https://sacme-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/SacmeTanauan'
	},
	Salvador: {
		history:
			"Barangay Salvador, covering seventy-five hectares, is one of the fifty-four barangays of Tanauan, Leyte, located eighteen kilometers south of Tacloban City. It is an agricultural community, producing mainly rice and coconuts. The predominant religion is Catholicism, introduced by Jesuit missionaries as early as 1687, with the church at Campo Santo still standing. The parishioners originally venerated The Nazarene, but in 1929 they began celebrating Saint Joseph as their Patron Saint, with Don Juan Hermoso as the first Hermano Mayor. The barangay was formerly called Barrio Kiling, which included the sitios of Cahumayhumayan, Catigbi-an, Bangon, Kiling 23, Bantagan, Maghulod, Talolora, Binolo, and Guingauan. The name Kiling came from a large inclining tree called 'Nakiling,' later 'Quiling' to the Spaniards, which served as a stopover for traders or as a location for a gong to warn against pirates. During the American period, Barrio Kiling was progressive enough to qualify for a Gabaldon building. Its first Teniente de Barrio was Eugenio Maceda, and constituents Luis de Paz and Felix Aquino were elected municipal councilors. Later, in honor of the contributions of councilor Jose Salvado, Barrio Kiling was renamed Barangay Salvador.",
		population: 'Approx. 2,200',
		captain: 'Jose Tan',
		contact: 'salvador.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Salvador+Festival',
			'https://via.placeholder.com/400x300?text=Salvador+Community'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Salvador+Recovery',
		website: 'https://salvador-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/SalvadorTanauan'
	},
	'San Isidro': {
		history:
			"According to ancestral accounts, the area was originally called Villa Nueva during the Spanish period. Later, when four Chinese businessmen settled there, the place became known as Bungtuhay, with the Binahaan River (then called Salog) serving as a transportation route using 'Baruto.' During the American regime in 1891, the Americans established a permanent presence, constructing a chapel and donating an image of St. Isidore. Recognizing that the majority of residents were farmers and that the land was suitable for rice cultivation, the place was renamed Barangay San Isidro, in honor of the patron saint of farmers.",
		population: 'Approx. 2,300',
		captain: 'Clara Garcia',
		contact: 'san-isidro.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=San+Isidro+Farms',
			'https://via.placeholder.com/400x300?text=San+Isidro+Innovation'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=San+Isidro+Fields',
		website: 'https://san-isidro-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/SanIsidroTanauan'
	},
	'San Miguel (Poblacion)': {
		history:
			'At its beginning, San Miguel was merely a street extending from Solano Bridge up to a crossroad leading to Dagami and Tolosa along the former National Highway. To the right at the crossing was the Public Municipal Catholic Cemetery, where a chapel housing an image of San Miguel (Saint Michael) was installed during the early Spanish regime. The devout inhabitants referred to the area as San Miguel because of their veneration of the saint. The surrounding area, called Sitio Buaya, was named after a tributary of the Solano River infested with crocodiles. Legends say that anyone crossing the river with a replica of San Miguel was unharmed, while those without it were in danger. A stone cutter named Jiong, who migrated from Cebu, built a hiding place for locals from marauding pirates, which later became the Catholic Cemetery. The town’s population gradually increased around this site. Leadership of the area began with Miguel Songalia as Barrio Lieutenant in 1937, followed by Sotero Salceda (1940–1942), Francisco Creer, Esteban Saavedra, Antonio Songalia, Teodulo Estojero, Alejo Felix Mazo, and continuing to the present Punong Barangay and ABC President Ma. Martina L. Gimenez. With the implementation of the Revised Barrio Charter (Republic Act No. 3590) on June 22, 1963, Barrio San Miguel was officially established, its boundaries extended to Havana Street in the east, about 500 meters to the west from San Miguel Street, and up to the boundary of Sitio Buaya. After the proclamation of Martial Law, the name Barrio was changed to Barangay and San Miguel Street was changed to Imelda Boulevard. Barangay San Miguel now encompasses an area from Solano Bridge including one half of Havana Street up to Sitio Buri including the area occupied by the former Tanauan School of Craftsmanship and Home Industries (TSCHI) now Eastern Visayas State University (EVSU), Tanauan Campus.',
		population: 'Approx. 3,900',
		captain: 'Elena Lim',
		contact: 'san-miguel.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=San+Miguel+Church',
			'https://via.placeholder.com/400x300?text=San+Miguel+Plaza'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=San+Miguel+Heritage',
		website: 'https://san-miguel-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/SanMiguelTanauan'
	},

	'San Roque (Poblacion)': {
		history:
			"Barangay San Roque is surrounded by the Embarcadero River on the western and northern boundaries. In the early years, the area was called 'Mombon' because of the sand formations, later also referred to as 'Tabok', meaning 'across the bridge'. A wooden bridge was constructed to give passage to the ocean, which became a favorite spot for fishermen and bathers. Near the bridge, a bakery was built, and a Spanish old lady, Senyora Nonong (Leonora Blanco), lived nearby; she owned an image of Senior San Roque and built a grotto. Between the 1940s and 1950s, frequent typhoons caused flooding, and outbreaks of diseases affected residents, especially children, resulting in fatalities. In response, the elders organized prayer processions with the image of Senior San Roque, which became a yearly tradition held every 15th and 16th of August as a feast day and thanksgiving. The barangay eventually adopted the name of its patron saint, San Roque.",
		population: 'Approx. 4,100',
		captain: 'Victor Santos',
		contact: 'san-roque.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=San+Roque+Plaza',
			'https://via.placeholder.com/400x300?text=San+Roque+Event'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=San+Roque+Center',
		website: 'https://san-roque-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/SanRoqueTanauan'
	},
	'San Victor': {
		history:
			'According to the tales of the old folks, San Victor began in the eighteenth century when three families—Victor, Pedro, and Juan—settled in the area. Victor was appointed as the first leader, and more families soon joined the settlement. In 1893, the Proclamation of Maura Law, which took effect in 1895, laid the foundation of the municipal government comprising different barangays. In the early nineteenth century, a man named Tabako, who owned a large portion of the community, donated parcels of land to the new settlers. In recognition of Victor as the first leader, the barangay was named San Victor. On November 13, 1931, through ACT No. 3861, a Barrio Council was formed, headed by Barrio Lieutenant Crispin Villero, with Prudencia Tabalno as the only woman to serve in that role. In 1945, the Americans changed barangays into barrios, but on September 21, 1974, PD No. 557 and later PD No. 86 reverted the name back to barangays. San Victor covers 183.44 hectares of flat terrain. Its economic activities mainly consist of rice farming, mat weaving, and hog and chicken raising. Farming relied on carabaos for plowing and transportation as there were no machines at the time.',
		population: 'Approx. 2,200',
		captain: 'Marina Reyes',
		contact: 'san-victor.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=San+Victor+Church',
			'https://via.placeholder.com/400x300?text=San+Victor+Pilgrimage'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=San+Victor+Heritage',
		website: 'https://san-victor-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/SanVictorTanauan'
	},
	'Santa Cruz': {
		history:
			"Before World War II in 1940, Barangay Sta. Cruz, Tanauan, Leyte was originally called Barangay Kasuguran and also known as 'Malldong-lidong,' meaning round, due to its circular shape. The area was surrounded by mangroves, which served as a shield or evacuation area during the war. In 1948, Spanish priests renamed the barangay Sta. Cruz and built a chapel using light materials. The 'Peace Crusaders,' with the help of seminarians, erected a large cross in the center of the barangay as a landmark. The barangay celebrates its fiesta every 10th of May in honor of the Holy Cross. In 1990, the barangay constructed roads, bridges, a barangay stage, and the barangay hall, marking the first major infrastructure projects. That same year, Typhoon Undang struck, causing extensive damage to houses, properties, and sources of income. In 2013, Typhoon Haiyan (Yolanda), the deadliest typhoon recorded in Philippine history, devastated Sta. Cruz, destroying homes and properties and causing nearly 100 casualties in the barangay.",
		population: 'Approx. 2,400',
		captain: 'Pablo Lim',
		contact: 'santa-cruz.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Santa+Cruz+Festival',
			'https://via.placeholder.com/400x300?text=Santa+Cruz+Church'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Santa+Cruz+Heritage',
		website: 'https://santa-cruz-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/SantaCruzTanauan'
	},
	'Santa Elena': {
		history:
			"In 1947, after World War II, a school was established in the barangay with roofs made of nipa palm leaves. The first families to settle were the Los Baños, Labayo, Briton, Modesto, Taña, and Arcena families. Dionisio Briton served as the first Teniente Del Barrio, followed by Honorato Perez. In 1952, a Health Clinic with a midwife was established, now known as the 'Multi-purpose Building,' and in 1954, the barangay road funded by Speaker Daniel Romualdez was completed. On October 12, 1970, Typhoon Bebeng struck, causing destruction of houses and trees. During the Japanese occupation, the barangay had no bridge, and in 1970, Francisco Salvana drowned in a boat accident while seeing the image of Santa Elena, the patroness. In 1980, an incident involving Antonio Arcena brought sorrow to Sta. Elena and neighboring barangays. The old bridge was destroyed in 1989, and a new concrete bridge was inaugurated in 1994 with a grand celebration. Further developments included irrigation in 1996, a box culvert in 2003, NAWASA water supply in 2013, a new Barangay Hall by DILG in 2017, and an Automated Water Station in October 2019 with assistance from DENR and the LGU of Tanauan, Leyte.",
		population: 'Approx. 2,100',
		captain: 'Luz Tan',
		contact: 'santa-elena.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Santa+Elena+Bridge',
			'https://via.placeholder.com/400x300?text=Santa+Elena+Landmark'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Santa+Elena+Heritage',
		website: 'https://santa-elena-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/SantaElenaTanauan'
	},
	Solano: {
		history:
			"In Barangay Solano, there used to be a place in the village of Calogcog called Sitio Tangnan. It was named Tangnan because of a tall tree stump that served as a landmark for the people. At night, it was feared by passersby due to many spooky stories associated with it. The sitio was connected to the village of San Miguel by a dilapidated wooden bridge. An American soldier-engineer repaired this bridge and converted it into a concrete bridge. The residents expressed their gratitude by naming the place after the engineer's surname, 'Solano.'",
		population: 'Approx. 2,200',
		captain: 'Clara Cruz',
		contact: 'solano.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Solano+Center',
			'https://via.placeholder.com/400x300?text=Solano+Community'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Solano+Village',
		website: 'https://solano-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/SolanoTanauan'
	},
	'Santo Niño (Haclagan) (Poblacion)': {
		history:
			"The first inhabitants of the place were Batista and Doña Juana. The original name Haclagan comes from 'Haclam' meaning to eat, and 'Laagan' from the pets of Juana and Batista, the uncaged crocodiles. During World War II, Japanese forces invaded, and after their fall, the Americans arrived. An airfield was built by the Americans shortly after landing on Leyte in November 1944, used by the 312th Bombardment Group (Nov 19, 1944–Feb 10, 1945) and the 433rd Troop Carrier Group (Jan 19, 1945–May 31, 1945), and later abandoned. Americans were also the first teachers of the community. In 1945, Constancio Mercado Cordero became the first Tinyente del Baryo and contributed the first school, Sto. Niño Elementary School, which started classes on January 1, 1952. The Catholic Chapel began construction in 1951. In 1957, the municipality of Tanauan issued a memorandum to rename Haclagan to Barangay Poblacion. By 1963, the Catholic Bishop Conference of the Philippines designated Sto. Niño as the patron saint, and in 1965, the barangay officially became Barangay Sto. Niño with its feast day on June 26 every year.",
		population: 'Approx. 4,000',
		captain: 'Ricardo Santos',
		contact: 'santo-nino.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Santo+Niño+Church',
			'https://via.placeholder.com/400x300?text=Santo+Niño+Fiesta'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Santo+Niño+Heritage',
		website: 'https://santo-nino-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/SantoNinoTanauan'
	},

	Talolora: {
		history:
			"According to the elders and inquiries about the origins of Talolora, the area was once a forest with only trails. A notably tall tree, called Talolora, became a landmark for locals and inspired the barangay's name. In 1945, the church of Talolora was built, and the statue of San Isidro Labrador was purchased with contributions from nearby barangays Bangon, Binolo, and Talolora. The feast of San Isidro Labrador is celebrated every May 26. Bartolome Alvarez became the first barangay captain, and a Gabaldon school was established for grades one to six. Subsequent leaders included Domingo Gara and Fablo Cadion (1960–1965). In 1968, Typhoon Bebeng destroyed houses and the school. In 1975, Bonefacic Terora became captain and oversaw the construction of a Marcos-type school and the first paved road, extended by Congressman Roy Montejo and Governor Leopoldo Pitilla. Later leaders included Herminihildo Boco and Bonifacio Terora, with SK Chairpersons Erwin Buendia, Rizza Buendia, Meriam Suyom (2000), and Marlon Acala (2005). During Acala's term, the barangay was electrified. Meriam Suyom continued infrastructure projects, and in 2013, Anastacio L. Dacoco became captain. Super Typhoon Yolanda hit during his term, prompting recovery efforts including streetlight, daycare, and health center rehabilitation. After Dacoco's passing in 2015, Soledad Terora continued his projects, including a two-story barangay hall and road paving under KALAHI-CIDSS. Since 2018, Rodgie A. Buendia has served as barangay captain, actively pursuing projects and improving the community through government and private initiatives.",
		population: 'Approx. 2,100',
		captain: 'Jose Garcia',
		contact: 'talolora.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Talolora+Port',
			'https://via.placeholder.com/400x300?text=Talolora+Trade'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Talolora+Coast',
		website: 'https://talolora-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/TaloloraTanauan'
	},
	Tugop: {
		history:
			"After the Spanish era, Barrio Tugop was established with the leader titled 'Guinhaupan.' Notable early leaders included Colas (Nicolas Lumbre) and Guinhaupan Juan Cinco. During the American occupation, the title became Barrio Lieutenant (Teniente Col. Del Barrio). From 1908 to 1941, leaders included Sebastion Mendigo (Teniente Batic), Benedicto Pelino (Labogbog), Titing Mendigo (Engco Titing), Maximo Cinco (Engco Simo), Francisco Lumbre (Teniente Paran), and Protacio Mendigo (Enco Taciong). In 1929, a strong typhoon caused extensive destruction, and on June 8, 1936, the first Saint Roque festival was held. During World War II, Protacio Mendigo and his deputy Apolonio Albao led the barrio, with guerrilla units headed by Venancio Bañez and later Juan Mendigo. Post-liberation leaders included Dalmacio Songalia, Gabino de Paz, Alfredo Monte (1949–1952), Damaso Gamba (1953), Eliseo Abasola (until 1956), Tranquilino Lazarte, and Maximo Badion (Mimong). Subsequent leaders included Felixberto Cayanes, Gliceria Indic, Tranquilino Lazarte again, Dalmacio Operio (1967–1971), Eifracia L. Cayanes (Kapitan Ponyang, until 1982), and Venancio Banñez (elected May 17, 1982). During Banñez's term, the barangay completed projects such as cementing the dance hall, constructing the road from Lapay to Amanluran, purchasing land for a school, and building a barangay hall, concrete chapel, day care center, health center, Jetmatic pumps, basketball court, and other facilities.",
		population: 'Approx. 2,200',
		captain: 'Elena Tan',
		contact: 'tugop.captain@tanauan-leyte.gov.ph',
		images: [
			'https://via.placeholder.com/400x300?text=Tugop+Housing',
			'https://via.placeholder.com/400x300?text=Tugop+Community'
		],
		bgImage: 'https://via.placeholder.com/800x300?text=Tugop+Recovery',
		website: 'https://tugop-tanauan-leyte.gov.ph',
		facebook: 'https://facebook.com/TugopTanauan'
	}
};
