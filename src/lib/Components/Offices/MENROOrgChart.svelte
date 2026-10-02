<script>
	import { onMount } from 'svelte';
	import { fade, scale, fly, slide } from 'svelte/transition';

	// ==========================================
	// OFFICIAL MENRO ORGANIZATIONAL HIERARCHY
	// (Extracted directly from Official Tanauan MENRO Chart)
	// ==========================================
	let orgData = $state({
		id: 'mayor',
		name: 'Hon. Ma. Gina E. Merilo',
		position: 'Municipal Mayor',
		roleCategory: 'Executive Governance',
		badge: 'Local Chief Executive',
		level: 1,
		color: '#f59e0b', // amber yellow
		glow: 'rgba(245, 158, 11, 0.3)',
		image: '/MCR/mayor-merilo.png',
		window: 'Executive Suite',
		office: 'Office of the Municipal Mayor, 2nd Floor, Tanauan Municipal Hall',
		hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
		contact: 'mayor@tanauanleyte.gov.ph',
		overview:
			'Chief Executive of the Municipality of Tanauan, Leyte. Directs municipal environmental policies, approves the Ten-Year Solid Waste Management Plan (2024–2033), and oversees environmental law enforcement under RA 9003.',
		duties: [
			'Exercises general executive supervision over municipal environment and solid waste programs',
			'Authorizes personnel deployment, equipment acquisition, and environmental allocations',
			'Enforces Republic Act No. 9003 and Municipal Ordinance No. 2024-20 across 54 barangays',
			'Champions sustainable ecological governance and environmental protection for Tanauan'
		],
		services: [
			'Executive Environmental Approvals',
			'Inter-Agency Environmental Directives',
			'Ten-Year Solid Waste Management Oversight'
		],
		expanded: true,
		children: [
			{
				id: 'menro-head',
				name: 'Mark Leo T. Cinco',
				position: 'MENRO Designate',
				roleCategory: 'Head of Office',
				badge: 'Department Head',
				level: 2,
				color: '#1d4ed8', // royal blue
				glow: 'rgba(29, 78, 216, 0.3)',
				image: '',
				window: 'Office of the MENRO Head',
				office: 'Ground Floor, Tanauan Town Hall, Real St., Tanauan, Leyte',
				hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
				contact: 'menro@tanauanleyte.gov.ph',
				overview:
					'Directs and manages the Municipal Environment & Natural Resources Office, implementing municipal environmental policies, managing sanitary landfill facilities, and coordinating daily waste collection across 54 barangays.',
				duties: [
					'Implements the Ten-Year Solid Waste Management Plan (2024–2033) and RA 9003',
					'Directs the municipal collection fleet, drivers, heavy equipment operators, and collection crews',
					'Oversees Tanauan Sanitary Landfill operations, containment cells, and diversion benchmarks',
					'Leads environmental compliance inspections and barangay ecological committee coordination'
				],
				services: [
					'Environmental Compliance Certification',
					'Solid Waste Collection Logistics & Route Management',
					'Ecological Enforcement & Public Consultation'
				],
				expanded: true,
				children: [
					{
						id: 'clerical-aide',
						name: 'Catherine B. Badion',
						position: 'Clerical Aide',
						roleCategory: 'Administrative & Clerical Support',
						badge: 'Administrative Support',
						level: 3,
						color: '#f59e0b', // amber yellow
						glow: 'rgba(245, 158, 11, 0.3)',
						image: '',
						window: 'Administrative Desk',
						office: 'MENRO Office, Ground Floor, Tanauan Town Hall',
						hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
						contact: 'menro@tanauanleyte.gov.ph',
						overview:
							'Provides central administrative and secretarial support to the MENRO Designate, managing official communications, correspondence, records filing, and personnel logs.',
						duties: [
							'Manages incoming and outgoing correspondence and public assistance inquiries',
							'Maintains departmental administrative archives, timesheets, and logistical logs',
							'Coordinates inter-office documentation with the Mayor’s Office and Sangguniang Bayan'
						],
						services: [
							'Frontline Client Inquiries',
							'Document Receiving & Routing',
							'Administrative Support'
						],
						expanded: true,
						children: [
							{
								id: 'staff-enetorio',
								name: 'Christine M. Enetorio',
								position: 'MENRO Staff',
								roleCategory: 'Administrative & Clerical Support',
								badge: 'Staff',
								level: 4,
								color: '#3b82f6',
								glow: 'rgba(59, 130, 246, 0.3)',
								image: '',
								window: 'Staff Desk 1',
								office: 'MENRO Office, Tanauan Town Hall',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Handles records verification, report compilation, and administrative coordination.',
								duties: ['Assists in monthly operational report preparation', 'Manages client registry and inquiries'],
								services: ['Public Assistance', 'Records Keeping'],
								expanded: false,
								children: []
							},
							{
								id: 'staff-monte',
								name: 'Lalaine B. Monte',
								position: 'MENRO Staff',
								roleCategory: 'Administrative & Clerical Support',
								badge: 'Staff',
								level: 4,
								color: '#3b82f6',
								glow: 'rgba(59, 130, 246, 0.3)',
								image: '',
								window: 'Staff Desk 2',
								office: 'MENRO Office, Tanauan Town Hall',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Coordinates environmental permit intake and administrative tracking.',
								duties: ['Processes environmental documentation requests', 'Maintains inventory records'],
								services: ['Frontline Intake', 'Document Archiving'],
								expanded: false,
								children: []
							},
							{
								id: 'staff-miralles',
								name: 'Ace C. Miralles',
								position: 'MENRO Staff',
								roleCategory: 'Administrative & Clerical Support',
								badge: 'Staff',
								level: 4,
								color: '#3b82f6',
								glow: 'rgba(59, 130, 246, 0.3)',
								image: '',
								window: 'Staff Desk 3',
								office: 'MENRO Office, Tanauan Town Hall',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Assists in field deployment coordination, fuel records, and operational dispatches.',
								duties: ['Tracks vehicle trip tickets and fuel logs', 'Supports field inspection logistics'],
								services: ['Logistical Tracking', 'Fleet Documentation'],
								expanded: false,
								children: []
							}
						]
					},
					{
						id: 'natural-resources',
						name: 'Glen M. Gil',
						position: 'Agriculturist II',
						roleCategory: 'Natural Resources Section',
						badge: 'Section Lead',
						level: 3,
						color: '#1e40af', // deep royal blue
						glow: 'rgba(30, 64, 175, 0.3)',
						image: '',
						window: 'Natural Resources Section Desk',
						office: 'MENRO Operations, Tanauan Town Hall',
						hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
						contact: 'menro@tanauanleyte.gov.ph',
						overview:
							'Leads the Natural Resources Section of MENRO, overseeing tree planting programs, coastal resource monitoring, heavy earthmoving equipment operations at the landfill, and urban greening.',
						duties: [
							'Supervises seedling nurseries, tree planting programs, and roadside greening',
							'Directs heavy equipment operations for sanitary landfill waste containment',
							'Conducts watershed, mangrove, and environmental habitat assessments',
							'Coordinates DENR conservation initiatives and municipal green spaces'
						],
						services: [
							'Tree Planting & Seedling Inquiries',
							'Landfill Earthmoving Coordination',
							'Natural Resource Assessments'
						],
						expanded: true,
						children: [
							{
								id: 'nr-madrigal',
								name: 'Marlon Madrigal',
								position: 'MENRO Staff',
								roleCategory: 'Natural Resources Section',
								badge: 'Field Staff',
								level: 4,
								color: '#f59e0b',
								glow: 'rgba(245, 158, 11, 0.3)',
								image: '',
								window: 'Field Ops',
								office: 'MENRO Field Operations',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Conducts field monitoring, nursery maintenance, and community greening activities.',
								duties: ['Inspects reforestation and urban greening projects', 'Assists community cleanups'],
								services: ['Field Greening Operations'],
								expanded: false,
								children: []
							},
							{
								id: 'nr-berdan',
								name: 'Arlene Berdan',
								position: 'MENRO Staff',
								roleCategory: 'Natural Resources Section',
								badge: 'Staff',
								level: 4,
								color: '#f59e0b',
								glow: 'rgba(245, 158, 11, 0.3)',
								image: '',
								window: 'Field Ops',
								office: 'MENRO Field Operations',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Supports community environmental advocacy, nursery work, and tree planting documentation.',
								duties: ['Coordinates environmental awareness outreach', 'Maintains planting site records'],
								services: ['Advocacy & Documentation'],
								expanded: false,
								children: []
							},
							{
								id: 'nr-primer',
								name: 'Renee Primer',
								position: 'Driver / Mechanic',
								roleCategory: 'Natural Resources Section',
								badge: 'Fleet Maintenance',
								level: 4,
								color: '#3b82f6',
								glow: 'rgba(59, 130, 246, 0.3)',
								image: '',
								window: 'Motorpool Unit',
								office: 'Tanauan Municipal Motorpool',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Responsible for vehicle mechanical maintenance, troubleshooting, and fleet operations.',
								duties: ['Performs preventive maintenance on collection vehicles', 'Ensures fleet roadworthiness'],
								services: ['Vehicle Maintenance & Repairs'],
								expanded: false,
								children: []
							},
							{
								id: 'nr-zabala',
								name: 'Efren Zabala',
								position: 'Heavy Equipment Operator',
								roleCategory: 'Natural Resources Section',
								badge: 'Equipment Specialist',
								level: 4,
								color: '#3b82f6',
								glow: 'rgba(59, 130, 246, 0.3)',
								image: '',
								window: 'Sanitary Landfill Unit',
								office: 'Tanauan Sanitary Landfill Facility',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Operates excavators and earthmoving machinery at the sanitary landfill containment cells.',
								duties: ['Operates backhoe/excavator for cell leveling and covering', 'Maintains containment slope integrity'],
								services: ['Landfill Earthmoving Operations'],
								expanded: false,
								children: []
							},
							{
								id: 'nr-perez',
								name: 'Arjohn Mark A. Perez',
								position: 'Heavy Equipment Operator',
								roleCategory: 'Natural Resources Section',
								badge: 'Equipment Specialist',
								level: 4,
								color: '#3b82f6',
								glow: 'rgba(59, 130, 246, 0.3)',
								image: '',
								window: 'Sanitary Landfill Unit',
								office: 'Tanauan Sanitary Landfill Facility',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Operates heavy equipment for daily waste spreading, compaction, and soil cover placement.',
								duties: ['Carries out waste spreading and compaction protocols', 'Inspects heavy machinery daily'],
								services: ['Landfill Heavy Equipment Operations'],
								expanded: false,
								children: []
							},
							{
								id: 'nr-varona',
								name: 'Aldwin B. Varona',
								position: 'Sorter',
								roleCategory: 'Natural Resources Section',
								badge: 'Material Recovery',
								level: 4,
								color: '#d97706',
								glow: 'rgba(217, 119, 6, 0.3)',
								image: '',
								window: 'Recovery Unit',
								office: 'MENRO Materials Recovery Facility',
								hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Performs material recovery, sorting of organic compostables, and nursery soil preparation.',
								duties: ['Sorts recyclable materials and compost components', 'Assists nursery operations'],
								services: ['Material Recovery & Sorting'],
								expanded: false,
								children: []
							}
						]
					},
					{
						id: 'solid-waste',
						name: 'Solid Waste Management Section',
						position: 'Collection Fleet & Facility Operations',
						roleCategory: 'Solid Waste Management Section',
						badge: 'Fleet Operations',
						level: 3,
						color: '#1e3a8a', // navy blue
						glow: 'rgba(30, 58, 138, 0.3)',
						image: '',
						window: 'Collection Logistics Unit',
						office: 'MENRO Fleet Headquarters',
						hours: 'Monday – Friday | 6:00 AM – 5:00 PM',
						contact: 'menro@tanauanleyte.gov.ph',
						overview:
							'Comprises the 5 operational collection vehicle units, designated drivers, collectors, and sorters executing daily garbage pickup across Tanauan’s 54 barangays.',
						duties: [
							'Executes weekday municipal waste collection schedule pursuant to Municipal Ordinance No. 2024-20',
							'Collects and transports municipal solid waste to the Tanauan Sanitary Landfill',
							'Manages daily market collection and highway arterial corridors'
						],
						services: [
							'Weekday Barangay Waste Pickup',
							'Public Market Waste Disposal',
							'Highway Corridor Route Operations'
						],
						expanded: true,
						children: [
							{
								id: 'fleet-1',
								name: 'Glicerio Roa, Jr.',
								position: 'Driver (Regular)',
								roleCategory: 'Solid Waste Management Section',
								badge: 'Mini Dump Truck L1D916',
								level: 4,
								color: '#2563eb',
								glow: 'rgba(37, 99, 235, 0.3)',
								image: '',
								window: 'Route: San Roque, Buntay, Canramos, Lapay, Sulod',
								office: 'New Foton Mini Dump Truck (L1D916)',
								hours: 'Mon – Fri: 6:00 AM – 2:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Driver for New Foton Mini Dump Truck L1D916 covering San Roque, Buntay, Canramos, Lapay, and surrounding barangays.',
								duties: ['Operates vehicle on scheduled route', 'Oversees safe loading and disposal at landfill'],
								services: ['Residential Waste Collection'],
								expanded: false,
								children: [
									{ id: 'c-olimberio', name: 'Carlito Olimberio, Jr.', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Job Order', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 1', hours: 'Weekdays', contact: '', overview: 'Assigned collector for Monday route (Burgos & San Roque).', duties: ['Collects segregated waste'], services: ['Waste Collection'], expanded: false, children: [] },
									{ id: 'c-abalos', name: 'Mark Abalos', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Job Order', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 1', hours: 'Weekdays', contact: '', overview: 'Assigned collector for Tuesday route (Bislig Sulod, San Roque Zones).', duties: ['Collects segregated waste'], services: ['Waste Collection'], expanded: false, children: [] },
									{ id: 'c-emanuel', name: 'Emanuel Cinco', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Job Order', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 1', hours: 'Weekdays', contact: '', overview: 'Assigned collector for Thursday route (Lapay, Tugop, Pasil, Binolo).', duties: ['Collects segregated waste'], services: ['Waste Collection'], expanded: false, children: [] },
									{ id: 's-renomeron', name: 'Lester S. Renomeron', position: 'Sorter', roleCategory: 'Solid Waste Management Section', badge: 'Sorter', level: 5, color: '#d97706', glow: 'rgba(217, 119, 6, 0.2)', image: '', window: 'Sorter', office: 'Fleet 1 / MRF', hours: 'Weekdays', contact: '', overview: 'Performs waste sorting and materials recovery.', duties: ['Sorts recyclables and residuals'], services: ['Waste Sorting'], expanded: false, children: [] },
									{ id: 's-bandalan', name: 'Joesua G. Bandalan', position: 'Sorter', roleCategory: 'Solid Waste Management Section', badge: 'Sorter', level: 5, color: '#d97706', glow: 'rgba(217, 119, 6, 0.2)', image: '', window: 'Sorter', office: 'Fleet 1 / MRF', hours: 'Weekdays', contact: '', overview: 'Performs waste sorting and materials recovery.', duties: ['Sorts recyclables and residuals'], services: ['Waste Sorting'], expanded: false, children: [] }
								]
							},
							{
								id: 'fleet-2',
								name: 'Bernardo Gerilla',
								position: 'Driver (Regular)',
								roleCategory: 'Solid Waste Management Section',
								badge: 'Foton Mini Dump Truck',
								level: 4,
								color: '#2563eb',
								glow: 'rgba(37, 99, 235, 0.3)',
								image: '',
								window: 'Route: Plaza, Baras, Sto. Niño, Licod, Arado, Buri',
								office: 'Foton Mini Dump Truck',
								hours: 'Mon – Fri: 6:00 AM – 2:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Driver for Foton Mini Dump Truck servicing the Plaza and key rural barangays from Monday to Friday.',
								duties: ['Operates municipal dumper', 'Ensures timely collection across assigned routes'],
								services: ['Poblacion & Barangay Collection'],
								expanded: false,
								children: [
									{ id: 'c-tabalno', name: 'Florentino Tabalno', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Job Order', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 2', hours: 'Weekdays', contact: '', overview: 'Monday collector for Baras, Cabalagnan, and Maribi.', duties: ['Waste collection'], services: ['Waste Collection'], expanded: false, children: [] },
									{ id: 'c-lumanta', name: 'Lolito Lumanta', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Job Order', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 2', hours: 'Weekdays', contact: '', overview: 'Thursday collector for Amanluran, Linao, Arado, and Cogon.', duties: ['Waste collection'], services: ['Waste Collection'], expanded: false, children: [] },
									{ id: 'c-reymark', name: 'Reymark Cinco', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Job Order', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 2', hours: 'Weekdays', contact: '', overview: 'Tuesday collector for Sto. Niño, Bachelor, and Pawa.', duties: ['Waste collection'], services: ['Waste Collection'], expanded: false, children: [] },
									{ id: 'c-basco', name: 'Jodel Basco', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Job Order', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 2', hours: 'Weekdays', contact: '', overview: 'Wednesday collector for Plaza and Licod.', duties: ['Waste collection'], services: ['Waste Collection'], expanded: false, children: [] },
									{ id: 'u-caonte', name: 'Juanito Caonte', position: 'Utility', roleCategory: 'Solid Waste Management Section', badge: 'Utility Worker', level: 5, color: '#d97706', glow: 'rgba(217, 119, 6, 0.2)', image: '', window: 'Utility', office: 'Fleet 2', hours: 'Weekdays', contact: '', overview: 'General utility and maintenance worker assisting fleet operations.', duties: ['Utility and maintenance'], services: ['Facility Utility Support'], expanded: false, children: [] }
								]
							},
							{
								id: 'fleet-3',
								name: 'Bernie Songalia',
								position: 'Driver (JO)',
								roleCategory: 'Solid Waste Management Section',
								badge: 'New Compactor',
								level: 4,
								color: '#2563eb',
								glow: 'rgba(37, 99, 235, 0.3)',
								image: '',
								window: 'Route: Highway Arterials (Real, Kiling, San Roque, Bislig, Calogcog)',
								office: 'New Compactor Truck',
								hours: 'Mon – Fri: 6:00 AM – 2:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Driver for New Compactor handling high-capacity waste collection along national highways and major barangays.',
								duties: ['Operates compactor mechanism and vehicle', 'Transports compressed waste to landfill'],
								services: ['Compactor Waste Collection'],
								expanded: false,
								children: [
									{ id: 'c-flores', name: 'Rico Flores', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Job Order', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 3', hours: 'Weekdays', contact: '', overview: 'Tuesday highway route collector.', duties: ['Compactor collection'], services: ['Highway Collection'], expanded: false, children: [] },
									{ id: 'c-moreto', name: 'Ephraim Moreto', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Job Order', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 3', hours: 'Weekdays', contact: '', overview: 'Public market and commercial waste collector.', duties: ['Market waste collection'], services: ['Commercial Collection'], expanded: false, children: [] },
									{ id: 'c-catindoy', name: 'Rudy Catindoy', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Job Order', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 3', hours: 'Weekdays', contact: '', overview: 'Monday highway route collector.', duties: ['Highway collection'], services: ['Highway Collection'], expanded: false, children: [] },
									{ id: 'c-maca', name: 'Alejandro Maca', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Casual', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 3', hours: 'Weekdays', contact: '', overview: 'Wednesday highway route collector.', duties: ['Highway collection'], services: ['Highway Collection'], expanded: false, children: [] },
									{ id: 'c-obalan', name: 'Ariel Obalan', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Job Order', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 3', hours: 'Weekdays', contact: '', overview: 'Thursday highway route collector.', duties: ['Highway collection'], services: ['Highway Collection'], expanded: false, children: [] }
								]
							},
							{
								id: 'fleet-4',
								name: 'Semion Roa',
								position: 'Driver (JO)',
								roleCategory: 'Solid Waste Management Section',
								badge: 'Mini Dump Truck L1D914',
								level: 4,
								color: '#2563eb',
								glow: 'rgba(37, 99, 235, 0.3)',
								image: '',
								window: 'Route: Catigbian, Sta. Cruz, Sta. Elena, Picas, Camire',
								office: 'New Foton Mini Dump Truck (L1D914)',
								hours: 'Mon – Fri: 6:00 AM – 2:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Driver for New Foton Mini Dump Truck L1D914 covering southern and inland barangays and Sulod communities.',
								duties: ['Operates dump truck on assigned routes', 'Maintains transport safety and schedule'],
								services: ['Rural Barangay Collection'],
								expanded: false,
								children: [
									{ id: 'c-corales', name: 'Peter Corales', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Regular', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 4', hours: 'Weekdays', contact: '', overview: 'Monday route collector (Catigbian & Binongtoan).', duties: ['Waste collection'], services: ['Waste Collection'], expanded: false, children: [] },
									{ id: 'c-depaz', name: 'Antonio De Paz', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Job Order', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 4', hours: 'Weekdays', contact: '', overview: 'Tuesday route collector (Sta. Cruz & Limbuhan Daku).', duties: ['Waste collection'], services: ['Waste Collection'], expanded: false, children: [] },
									{ id: 'c-tuscano', name: 'Joevinaldo Tuscano', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Job Order', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 4', hours: 'Weekdays', contact: '', overview: 'Wednesday route collector (Sta. Elena & San Isidro).', duties: ['Waste collection'], services: ['Waste Collection'], expanded: false, children: [] },
									{ id: 'c-salazar', name: 'Jeffrey Salazar', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Casual', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 4', hours: 'Weekdays', contact: '', overview: 'Thursday route collector (Picas, Canbalisara, Ada).', duties: ['Waste collection'], services: ['Waste Collection'], expanded: false, children: [] },
									{ id: 's-cinco', name: 'Jhon Rey C. Cinco', position: 'Sorter', roleCategory: 'Solid Waste Management Section', badge: 'Sorter', level: 5, color: '#d97706', glow: 'rgba(217, 119, 6, 0.2)', image: '', window: 'Sorter', office: 'Fleet 4 / MRF', hours: 'Weekdays', contact: '', overview: 'Performs waste sorting and material recovery operations.', duties: ['Sorts recyclables and residuals'], services: ['Waste Sorting'], expanded: false, children: [] }
								]
							},
							{
								id: 'fleet-5',
								name: 'Paulo Songalia',
								position: 'Driver (JO)',
								roleCategory: 'Solid Waste Management Section',
								badge: 'Compactor U3Z435',
								level: 4,
								color: '#2563eb',
								glow: 'rgba(37, 99, 235, 0.3)',
								image: '',
								window: 'Route: Public Market (Daily Operation)',
								office: 'Compactor U3Z435',
								hours: 'Mon – Fri: 5:00 AM – 1:00 PM',
								contact: 'menro@tanauanleyte.gov.ph',
								overview: 'Driver for Compactor U3Z435 responsible for daily high-volume commercial and organic waste collection at the Tanauan Public Market.',
								duties: ['Daily market collection operations', 'Compacts and hauls wet/dry market refuse'],
								services: ['Market Commercial Collection'],
								expanded: false,
								children: [
									{ id: 'c-abas', name: 'Arnel Abas', position: 'Collector', roleCategory: 'Solid Waste Management Section', badge: 'Regular', level: 5, color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.2)', image: '', window: 'Collector', office: 'Fleet 5', hours: 'Weekdays', contact: '', overview: 'Daily market collector.', duties: ['Daily market collection'], services: ['Commercial Collection'], expanded: false, children: [] },
									{ id: 's-garrate', name: 'Jasper N. Garrate', position: 'Sorter', roleCategory: 'Solid Waste Management Section', badge: 'Sorter', level: 5, color: '#d97706', glow: 'rgba(217, 119, 6, 0.2)', image: '', window: 'Sorter', office: 'Fleet 5 / MRF', hours: 'Weekdays', contact: '', overview: 'Material sorter at recovery facility.', duties: ['Sorts market organic and recyclable waste'], services: ['Waste Sorting'], expanded: false, children: [] },
									{ id: 's-perez', name: 'Harvey S. Perez', position: 'Sorter', roleCategory: 'Solid Waste Management Section', badge: 'Sorter', level: 5, color: '#d97706', glow: 'rgba(217, 119, 6, 0.2)', image: '', window: 'Sorter', office: 'Fleet 5 / MRF', hours: 'Weekdays', contact: '', overview: 'Material sorter at recovery facility.', duties: ['Sorts market organic and recyclable waste'], services: ['Waste Sorting'], expanded: false, children: [] }
								]
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
	let selectedCategory = $state('All'); // 'All' | 'Executive & Admin' | 'Natural Resources Section' | 'Solid Waste Management Section'
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

	const filteredPersonnel = $derived(
		allPersonnel.filter((person) => {
			const matchesCat =
				selectedCategory === 'All' ||
				(selectedCategory === 'Executive & Admin' &&
					(person.roleCategory === 'Executive Governance' ||
						person.roleCategory === 'Head of Office' ||
						person.roleCategory === 'Administrative & Clerical Support')) ||
				person.roleCategory === selectedCategory;
			return matchesCat && matchesSearch(person, searchQuery);
		})
	);

	// ==========================================
	// COLLAPSIBLE STRUCTURE & DIVISION ACCORDIONS
	// ==========================================
	let isStructureCollapsed = $state(false);

	let collapsedSections = $state({
		executive: false, // Expanded by default
		naturalResources: false, // Expanded by default
		fleet: true, // Collapsed by default to avoid huge page height
		crew: true // Collapsed by default to avoid huge page height
	});

	const divisions = [
		{
			key: 'executive',
			title: 'Executive Governance & Administrative Support',
			shortTitle: 'Executive & Admin',
			icon: '🏛️',
			badge: 'Municipal Leadership & Office Admin',
			roleCategory: 'Executive & Admin'
		},
		{
			key: 'naturalResources',
			title: 'Natural Resources Management & Landfill Equipment Section',
			shortTitle: 'Natural Resources',
			icon: '🌿',
			badge: 'Tree Greening & Landfill Machinery',
			roleCategory: 'Natural Resources Section'
		},
		{
			key: 'fleet',
			title: 'Solid Waste Collection Fleet & Truck Drivers',
			shortTitle: 'Collection Fleet',
			icon: '🚛',
			badge: '5 Dedicated Route Vehicles',
			roleCategory: 'Solid Waste Management Section'
		},
		{
			key: 'crew',
			title: 'Solid Waste Collection Crew & MRF Sorters',
			shortTitle: 'Collectors & Sorters',
			icon: '🧤',
			badge: 'Frontline Waste Collectors & Materials Sorters',
			roleCategory: 'Solid Waste Management Section'
		}
	];

	function getDivision(person) {
		if (
			person.roleCategory === 'Executive Governance' ||
			person.roleCategory === 'Head of Office' ||
			person.roleCategory === 'Administrative & Clerical Support'
		) {
			return 'executive';
		}
		if (person.roleCategory === 'Natural Resources Section') {
			return 'naturalResources';
		}
		if (
			person.id === 'solid-waste' ||
			person.id.startsWith('fleet-') ||
			(person.position && person.position.toLowerCase().includes('driver'))
		) {
			return 'fleet';
		}
		return 'crew';
	}

	const divisionPersonnel = $derived({
		executive: filteredPersonnel.filter((p) => getDivision(p) === 'executive'),
		naturalResources: filteredPersonnel.filter((p) => getDivision(p) === 'naturalResources'),
		fleet: filteredPersonnel.filter((p) => getDivision(p) === 'fleet'),
		crew: filteredPersonnel.filter((p) => getDivision(p) === 'crew')
	});

	const visibleDivisions = $derived(
		divisions.filter((div) => divisionPersonnel[div.key].length > 0)
	);

	function toggleSection(key) {
		collapsedSections[key] = !collapsedSections[key];
	}

	function expandAllSections() {
		collapsedSections.executive = false;
		collapsedSections.naturalResources = false;
		collapsedSections.fleet = false;
		collapsedSections.crew = false;
	}

	function collapseAllSections() {
		collapsedSections.executive = true;
		collapsedSections.naturalResources = true;
		collapsedSections.fleet = true;
		collapsedSections.crew = true;
	}

	// Auto-expand sections when user types a search query
	$effect(() => {
		if (searchQuery.trim()) {
			if (divisionPersonnel.executive.length > 0) collapsedSections.executive = false;
			if (divisionPersonnel.naturalResources.length > 0) collapsedSections.naturalResources = false;
			if (divisionPersonnel.fleet.length > 0) collapsedSections.fleet = false;
			if (divisionPersonnel.crew.length > 0) collapsedSections.crew = false;
		}
	});

	// Auto-expand relevant division when category filter changes
	$effect(() => {
		if (selectedCategory === 'Executive & Admin') {
			collapsedSections.executive = false;
		} else if (selectedCategory === 'Natural Resources Section') {
			collapsedSections.naturalResources = false;
		} else if (selectedCategory === 'Solid Waste Management Section') {
			collapsedSections.fleet = false;
			collapsedSections.crew = false;
		}
	});

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

	function zoomIn() {
		zoomScale = Math.min(zoomScale + 0.15, 1.8);
	}

	function zoomOut() {
		zoomScale = Math.max(zoomScale - 0.15, 0.4);
	}

	function resetZoom() {
		zoomScale = 1;
		panOffset = { x: 0, y: 0 };
	}

	function handleMouseDown(e) {
		if (e.button !== 0) return;
		isPanning = true;
		panStart = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
	}

	function handleMouseMove(e) {
		if (!isPanning) return;
		panOffset = { x: e.clientX - panStart.x, y: e.clientY - panStart.y };
	}

	function handleMouseUp() {
		isPanning = false;
	}

	function openModal(person) {
		selectedPerson = person;
	}

	function closeModal() {
		selectedPerson = null;
	}

	function getInitials(name) {
		return name
			.split(' ')
			.filter((n) => n && !n.includes('.') && n !== 'Hon.')
			.map((n) => n[0])
			.slice(0, 2)
			.join('')
			.toUpperCase();
	}
</script>

<svelte:window onmouseup={handleMouseUp} onmousemove={handleMouseMove} />

<!-- MAIN ORGANIZATIONAL STRUCTURE CONTAINER (Royal Blue & Amber Yellow Aesthetic) -->
<div class="relative w-full overflow-hidden rounded-3xl border-2 border-slate-300 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 p-4 sm:p-8 text-white shadow-2xl">
	<!-- Ambient Radial Glow Effects -->
	<div class="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>
	<div class="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl"></div>

	<!-- Top Header & Metadata Banner -->
	<div class="relative z-10 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
		<div>
			<div class="flex items-center gap-2 mb-2">
				<span class="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-black tracking-wider text-amber-300 uppercase">
					<span class="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
					OFFICIAL LGU TANAUAN HIERARCHY
				</span>
				<span class="rounded bg-blue-800/80 px-2 py-0.5 text-[10px] font-mono font-bold text-blue-200 uppercase">
					CSC-RATIFIED
				</span>
			</div>
			<h3 class="text-2xl sm:text-3xl font-black tracking-tight text-white">
				MENRO Organizational Structure
			</h3>
			<p class="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl font-medium">
				Official operational hierarchy of the Municipal Environment & Natural Resources Office, comprising executive governance, natural resources stewardship, and the 5-vehicle weekday solid waste collection fleet.
			</p>
		</div>

		<!-- Quick Metric Stats & Master Collapse Toggle -->
		<div class="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Total Personnel</span>
				<span class="text-sm sm:text-base font-black text-amber-300">{allPersonnel.length} Dedicated Staff</span>
			</div>
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Truck Fleet</span>
				<span class="text-sm sm:text-base font-black text-sky-400">5 Vehicles</span>
			</div>
			<button
				type="button"
				onclick={() => (isStructureCollapsed = !isStructureCollapsed)}
				class="inline-flex items-center gap-1.5 rounded-2xl {isStructureCollapsed ? 'bg-amber-400 text-blue-950 font-black' : 'border border-amber-400/40 bg-amber-400/10 text-amber-300 hover:bg-amber-400 hover:text-blue-950 font-black'} px-4 py-2.5 text-xs uppercase tracking-wider shadow-md transition hover:scale-105 active:scale-95"
			>
				<span>{isStructureCollapsed ? '🔽 Expand Structure' : '🔼 Collapse Structure'}</span>
			</button>
			<a
				href="/images/org-charts/menro/menro-org-chart.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 px-3.5 py-2.5 text-xs font-bold text-white shadow-md transition hover:scale-105 active:scale-95"
				title="Inspect official PDF document"
			>
				<span>📄 View PDF</span>
			</a>
		</div>
	</div>

	{#if isStructureCollapsed}
		<!-- Compact Collapsed Executive Summary Card -->
		<div transition:slide={{ duration: 250 }} class="relative z-10 rounded-3xl border-2 border-dashed border-amber-400/50 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-md shadow-xl">
			<div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
				<div class="flex items-start gap-4">
					<div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-blue-950 text-2xl font-black shadow-lg">
						🏛️
					</div>
					<div>
						<div class="flex items-center gap-2">
							<span class="rounded bg-blue-900 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300 uppercase">
								STRUCTURE COLLAPSED
							</span>
							<span class="text-xs font-bold text-slate-300">CSC-Ratified Line of Authority</span>
						</div>
						<h4 class="mt-1 text-lg sm:text-xl font-black text-white">
							MENRO Operational Hierarchy (39 Active Personnel)
						</h4>
						<p class="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-2xl font-medium leading-relaxed">
							Executive supervision led by <strong>Hon. Ma. Gina E. Merilo</strong> (Municipal Mayor) and <strong>Mark Leo T. Cinco</strong> (MENRO Designate), encompassing 4 operational divisions, 5 collection truck fleets, and 16 barangay collection crew members.
						</p>
					</div>
				</div>

				<div class="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
					<button
						type="button"
						onclick={() => (isStructureCollapsed = false)}
						class="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-300 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-blue-950 shadow-lg transition-all hover:scale-105 active:scale-95"
					>
						<span>Expand Full Organizational Structure (39 Personnel)</span>
						<span>▼</span>
					</button>
					<a
						href="/images/org-charts/menro/menro-org-chart.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class="w-full lg:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-3.5 text-xs font-bold text-white transition"
					>
						<span>📄 View PDF</span>
					</a>
				</div>
			</div>

			<!-- 4 Division Preview Badges in Collapsed Mode -->
			<div class="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/10 pt-5">
				{#each divisions as div}
					<button
						type="button"
						onclick={() => {
							isStructureCollapsed = false;
							collapsedSections[div.key] = false;
						}}
						class="flex flex-col items-start rounded-2xl border border-white/10 bg-white/5 p-3.5 text-left transition hover:border-amber-400 hover:bg-white/10"
					>
						<span class="text-2xl mb-1.5">{div.icon}</span>
						<span class="text-xs font-black text-white">{div.shortTitle}</span>
						<span class="text-[11px] font-bold text-amber-300 mt-1">
							{divisionPersonnel[div.key].length} Personnel →
						</span>
					</button>
				{/each}
			</div>
		</div>
	{:else}
		<!-- Snippet for Roster Person Card -->
		{#snippet renderPersonCard(person)}
			<button
				type="button"
				onclick={() => openModal(person)}
				class="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-slate-900/60 p-5 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:bg-slate-900/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
			>
				<!-- Top Accent Line -->
				<div
					class="absolute top-0 left-6 right-6 h-1 rounded-t-full transition-all duration-300 group-hover:h-1.5"
					style="background-color: {person.color}; box-shadow: 0 0 12px {person.glow};"
				></div>

				<div>
					<!-- Avatar / Badge Header -->
					<div class="mb-3 flex items-start justify-between gap-3 pt-1">
						<div class="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 border-white/20 bg-blue-950 shadow-inner flex items-center justify-center font-black text-amber-300 text-sm">
							{#if person.image && !failedImages.has(person.id)}
								<img
									src={person.image}
									alt={person.name}
									class="h-full w-full object-cover"
									onerror={() => failedImages.add(person.id)}
								/>
							{:else}
								<span>{getInitials(person.name)}</span>
							{/if}
						</div>

						<span
							class="inline-block rounded-md border border-white/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
							style="background-color: {person.color}20; color: {person.color}; border-color: {person.color}40;"
						>
							{person.badge}
						</span>
					</div>

					<!-- Name & Position -->
					<h4 class="text-sm font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
						{person.name}
					</h4>
					<p class="mt-0.5 text-xs font-semibold text-slate-300">
						{person.position}
					</p>
					<div class="mt-1 text-[11px] font-medium text-slate-400">
						{person.roleCategory}
					</div>
				</div>

				<!-- Card Bottom Meta -->
				<div class="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-slate-400">
					<span class="truncate max-w-[150px]">{person.window}</span>
					<span class="font-bold text-amber-300 group-hover:translate-x-0.5 transition-transform">Inspect →</span>
				</div>
			</button>
		{/snippet}

		<!-- Interactive Toolbar: Search, View Mode Toggle, Zoom -->
		<div class="relative z-10 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 p-3.5 backdrop-blur-md shadow-lg">
			<!-- Search Input with Live Filter -->
			<div class="relative flex-1 max-w-md">
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Search personnel by name, role, section, vehicle (e.g. Cinco, Gil, Compactor, Sorter)..."
					class="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 shadow-inner outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30"
				/>
				{#if searchQuery}
					<button
						type="button"
						onclick={() => (searchQuery = '')}
						class="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white"
					>
						Clear ✕
					</button>
				{/if}
			</div>

			<!-- Category Filter (in Roster Mode) & View Modes -->
			<div class="flex flex-wrap items-center gap-2">
				<!-- View Mode Toggle -->
				<div class="flex rounded-xl border border-white/20 bg-slate-900/80 p-1">
					<button
						type="button"
						onclick={() => (viewMode = 'grid')}
						class="rounded-lg px-3 py-1.5 text-xs font-black transition-all {viewMode === 'grid' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'}"
					>
						Role Roster
					</button>
					<button
						type="button"
						onclick={() => (viewMode = 'tree')}
						class="rounded-lg px-3 py-1.5 text-xs font-black transition-all {viewMode === 'tree' ? 'bg-blue-600 text-white shadow' : 'text-slate-300 hover:text-white'}"
					>
						Tree Hierarchy
					</button>
				</div>

				<!-- Tree Canvas Controls (available when in tree mode) -->
				{#if viewMode === 'tree'}
					<button
						type="button"
						onclick={expandAll}
						class="rounded-xl border border-white/15 bg-white/5 px-2.5 py-2 text-xs font-bold text-slate-300 hover:bg-white/15 hover:text-white transition-colors"
					>
						Expand
					</button>
					<button
						type="button"
						onclick={collapseAll}
						class="rounded-xl border border-white/15 bg-white/5 px-2.5 py-2 text-xs font-bold text-slate-300 hover:bg-white/15 hover:text-white transition-colors"
					>
						Collapse
					</button>

					<!-- Zoom Controls -->
					<div class="flex items-center rounded-xl border border-white/20 bg-slate-900/80 p-1">
						<button
							type="button"
							onclick={zoomOut}
							class="h-8 w-8 rounded-lg text-sm font-black text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center"
						>-</button>
						<span class="px-2 text-xs font-mono font-bold text-amber-300">
							{Math.round(zoomScale * 100)}%
						</span>
						<button
							type="button"
							onclick={zoomIn}
							class="h-8 w-8 rounded-lg text-sm font-black text-slate-300 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center"
						>+</button>
						<button
							type="button"
							onclick={resetZoom}
							class="ml-1 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
						>
							Reset
						</button>
					</div>
				{/if}
			</div>
		</div>

		<!-- Category Filter Tabs (For Role Roster Mode) & Accordion Controls -->
		{#if viewMode === 'grid'}
			<div class="relative z-10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
				<div class="flex flex-wrap items-center gap-1.5">
					{#each ['All', 'Executive & Admin', 'Natural Resources Section', 'Solid Waste Management Section'] as cat}
						<button
							type="button"
							onclick={() => (selectedCategory = cat)}
							class="rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all {selectedCategory === cat ? 'bg-amber-400 text-blue-950 font-black shadow-md scale-105' : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'}"
						>
							{cat}
						</button>
					{/each}
				</div>

				<div class="flex items-center gap-2 shrink-0">
					<button
						type="button"
						onclick={expandAllSections}
						class="rounded-xl border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-bold text-slate-300 hover:bg-white/15 hover:text-white transition"
					>
						▾ Expand All
					</button>
					<button
						type="button"
						onclick={collapseAllSections}
						class="rounded-xl border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-bold text-slate-300 hover:bg-white/15 hover:text-white transition"
					>
						▴ Collapse All
					</button>
				</div>
			</div>
		{/if}

		<!-- ============================================== -->
		<!-- VIEW 1: ROLE ROSTER GRID VIEW                 -->
		<!-- ============================================== -->
		{#if viewMode === 'grid'}
			<div class="relative z-10">
				{#if filteredPersonnel.length === 0}
					<div class="rounded-2xl border border-white/15 bg-slate-900/60 py-16 text-center text-slate-400">
						<div class="text-3xl mb-2">🔍</div>
						<p class="font-bold text-white">No personnel match "{searchQuery}"</p>
						<p class="text-xs text-slate-400 mt-1">Try clearing your search query or selecting "All" categories.</p>
					</div>
				{:else}
					<div class="space-y-4">
						{#each visibleDivisions as div}
							<div class="rounded-3xl border-2 border-white/15 bg-slate-950/60 overflow-hidden shadow-lg transition-all hover:border-white/25">
								<!-- Collapsible Division Header Button -->
								<button
									type="button"
									onclick={() => toggleSection(div.key)}
									class="flex w-full items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-white/5"
								>
									<div class="flex items-center gap-3.5">
										<span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl shadow-inner">
											{div.icon}
										</span>
										<div>
											<div class="flex items-center gap-2">
												<span class="rounded bg-blue-900/90 px-2 py-0.5 text-[10px] font-mono font-black uppercase text-amber-300">
													{div.badge}
												</span>
												<span class="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-xs font-black text-amber-300">
													{divisionPersonnel[div.key].length} Members
												</span>
											</div>
											<h4 class="mt-1 text-base sm:text-lg font-black text-white">
												{div.title}
											</h4>
										</div>
									</div>

									<div class="flex items-center gap-2.5 shrink-0">
										<span class="hidden sm:inline text-xs font-bold text-slate-400">
											{collapsedSections[div.key] ? 'Click to Expand' : 'Collapse'}
										</span>
										<span class="flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-xs font-black text-amber-300 transition-transform duration-200 {collapsedSections[div.key] ? '' : 'rotate-180'}">
											▼
										</span>
									</div>
								</button>

								<!-- Collapsible Personnel Cards -->
								{#if !collapsedSections[div.key]}
									<div transition:slide={{ duration: 220 }} class="border-t border-white/10 p-4 sm:p-6 bg-slate-900/40">
										<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
											{#each divisionPersonnel[div.key] as person}
												{@render renderPersonCard(person)}
											{/each}
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<!-- ============================================== -->
			<!-- VIEW 2: TREE HIERARCHY CANVAS VIEW             -->
			<!-- ============================================== -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<div
				class="relative z-10 h-[560px] max-h-[600px] overflow-hidden rounded-2xl border border-white/15 bg-slate-950/80 p-6 select-none cursor-grab active:cursor-grabbing shadow-inner"
				onmousedown={handleMouseDown}
				role="region"
				aria-label="Interactive Tree Hierarchy Canvas"
			>
				<div
					class="transition-transform duration-75 origin-top-left"
					style="transform: translate({panOffset.x}px, {panOffset.y}px) scale({zoomScale});"
				>
					<!-- Recursive Tree Snippet -->
					{#snippet renderTreeNode(node, isRoot = false)}
						<div class="flex flex-col items-center">
							<!-- Node Card -->
							<div class="relative flex flex-col items-center">
								<button
									type="button"
									onclick={() => openModal(node)}
									class="group relative flex flex-col items-center rounded-2xl border-2 bg-slate-900/90 p-4 text-center shadow-lg transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 min-w-[180px] max-w-[220px]"
									style="border-color: {node.color}; box-shadow: 0 4px 20px {node.glow};"
								>
									<!-- Top Badge -->
									<span
										class="mb-2 inline-block rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-wider"
										style="background-color: {node.color}25; color: {node.color};"
									>
										{node.badge}
									</span>

									<!-- Avatar / Initial -->
									<div class="mb-2 h-11 w-11 overflow-hidden rounded-xl border-2 border-white/20 bg-blue-950 flex items-center justify-center font-black text-amber-300 text-xs shadow-inner">
										{#if node.image && !failedImages.has(node.id)}
											<img
												src={node.image}
												alt={node.name}
												class="h-full w-full object-cover"
												onerror={() => failedImages.add(node.id)}
											/>
										{:else}
											<span>{getInitials(node.name)}</span>
										{/if}
									</div>

									<!-- Name & Position -->
									<h5 class="text-xs font-black text-white group-hover:text-amber-300 transition-colors leading-tight">
										{node.name}
									</h5>
									<p class="mt-0.5 text-[10px] font-semibold text-slate-300">
										{node.position}
									</p>
								</button>

								<!-- Expand/Collapse Button if has children -->
								{#if node.children && node.children.length > 0}
									<button
										type="button"
										onclick={(e) => {
											e.stopPropagation();
											toggleExpand(node);
										}}
										class="absolute -bottom-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white/40 bg-blue-950 text-[10px] font-black text-amber-300 shadow hover:bg-amber-400 hover:text-blue-950 transition-colors"
										title={node.expanded ? 'Collapse branch' : 'Expand branch'}
									>
										{node.expanded ? '−' : '+'}
									</button>
								{/if}
							</div>

							<!-- Children Nodes Connected with Lines -->
							{#if node.children && node.children.length > 0 && node.expanded}
								<!-- Vertical Connecting Trunk -->
								<div class="h-6 w-0.5 bg-white/25"></div>

								<!-- Horizontal Crossbar -->
								<div class="relative flex justify-center gap-6 pt-2">
									{#if node.children.length > 1}
										<div class="absolute top-0 left-12 right-12 h-0.5 bg-white/25"></div>
									{/if}

									{#each node.children as child}
										<div class="relative flex flex-col items-center">
											<!-- Connector to child -->
											<div class="h-4 w-0.5 bg-white/25"></div>
											{@render renderTreeNode(child)}
										</div>
									{/each}
								</div>
							{/if}
						</div>
					{/snippet}

					<!-- Render Root Node -->
					<div class="p-8">
						{@render renderTreeNode(orgData, true)}
					</div>
				</div>
			</div>
		{/if}

		<!-- Bottom Action Bar (when structure is open) -->
		<div class="relative z-10 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
			<div class="text-xs text-slate-400 font-medium">
				Showing <strong class="text-amber-300">{allPersonnel.length} personnel</strong> across 4 divisions in the official MENRO organizational hierarchy.
			</div>

			<div class="flex items-center gap-3">
				{#if viewMode === 'grid'}
					<button
						type="button"
						onclick={expandAllSections}
						class="text-xs font-bold text-slate-300 hover:text-amber-300 underline transition"
					>
						Expand All
					</button>
					<span class="text-slate-600">•</span>
					<button
						type="button"
						onclick={collapseAllSections}
						class="text-xs font-bold text-slate-300 hover:text-amber-300 underline transition"
					>
						Collapse All
					</button>
					<span class="text-slate-600">•</span>
				{/if}
				<button
					type="button"
					onclick={() => (isStructureCollapsed = true)}
					class="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400 hover:text-blue-950 px-4 py-2 text-xs font-black uppercase text-amber-300 transition"
				>
					<span>▲ Collapse Structure</span>
				</button>
			</div>
		</div>
	{/if}

	<!-- ============================================== -->
	<!-- PERSONNEL DETAIL MODAL (Pop-up Information)    -->
	<!-- ============================================== -->
	{#if selectedPerson}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
			transition:fade={{ duration: 200 }}
			onclick={closeModal}
			onkeydown={(e) => e.key === 'Escape' && closeModal()}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="relative my-auto w-full max-w-xl rounded-3xl border-2 bg-slate-900 p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
				style="border-color: {selectedPerson.color}; box-shadow: 0 0 35px {selectedPerson.glow};"
				transition:scale={{ duration: 250, start: 0.95 }}
				onclick={(e) => e.stopPropagation()}
			>
				<!-- Close Button -->
				<button
					type="button"
					onclick={closeModal}
					class="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-amber-400 hover:text-blue-950"
					aria-label="Close modal"
				>
					✕
				</button>

				<!-- Modal Header -->
				<div class="flex items-start gap-4 border-b border-white/15 pb-5">
					<div class="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-white/30 bg-blue-950 flex items-center justify-center font-black text-amber-300 text-lg shadow-inner">
						{#if selectedPerson.image && !failedImages.has(selectedPerson.id)}
							<img src={selectedPerson.image} alt={selectedPerson.name} class="h-full w-full object-cover" />
						{:else}
							<span>{getInitials(selectedPerson.name)}</span>
						{/if}
					</div>
					<div>
						<span
							class="inline-block rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
							style="background-color: {selectedPerson.color}25; color: {selectedPerson.color};"
						>
							{selectedPerson.badge} • Level {selectedPerson.level}
						</span>
						<h3 class="text-xl sm:text-2xl font-black text-white mt-1">
							{selectedPerson.name}
						</h3>
						<p class="text-sm font-semibold text-amber-300">
							{selectedPerson.position}
						</p>
						<p class="text-xs text-slate-400 mt-0.5">
							{selectedPerson.roleCategory}
						</p>
					</div>
				</div>

				<!-- Modal Body Content -->
				<div class="mt-5 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
					<!-- Overview -->
					<div class="rounded-xl border border-white/10 bg-white/5 p-4">
						<div class="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
							Role Overview
						</div>
						<p class="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
							{selectedPerson.overview}
						</p>
					</div>

					<!-- Official Duties & Public Functions -->
					{#if selectedPerson.duties && selectedPerson.duties.length > 0}
						<div class="rounded-xl border border-white/10 bg-white/5 p-4">
							<div class="text-[10px] font-black uppercase tracking-wider text-amber-300 mb-2">
								Key Duties & Responsibilities
							</div>
							<ul class="space-y-1.5 text-xs text-slate-300">
								{#each selectedPerson.duties as duty}
									<li class="flex items-start gap-2">
										<span class="text-amber-400 font-bold">•</span>
										<span>{duty}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					<!-- Services / Areas -->
					{#if selectedPerson.services && selectedPerson.services.length > 0}
						<div class="rounded-xl border border-white/10 bg-white/5 p-4">
							<div class="text-[10px] font-black uppercase tracking-wider text-sky-400 mb-2">
								Operational Focus & Public Services
							</div>
							<div class="flex flex-wrap gap-1.5">
								{#each selectedPerson.services as service}
									<span class="rounded-md border border-white/10 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white">
										{service}
									</span>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Location & Hours -->
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
						<div class="rounded-xl border border-white/10 bg-white/5 p-3">
							<div class="text-[10px] font-black uppercase tracking-wider text-slate-400">Desk / Unit</div>
							<div class="text-slate-200 font-semibold mt-0.5">{selectedPerson.window}</div>
						</div>
						<div class="rounded-xl border border-white/10 bg-white/5 p-3">
							<div class="text-[10px] font-black uppercase tracking-wider text-slate-400">Official Schedule</div>
							<div class="text-slate-200 font-semibold mt-0.5">{selectedPerson.hours}</div>
						</div>
					</div>
				</div>

				<!-- Modal Footer -->
				<div class="mt-6 flex items-center justify-between border-t border-white/15 pt-4">
					<span class="text-[11px] font-bold text-slate-400">
						Tanauan MENRO Personnel Roster
					</span>
					<button
						type="button"
						onclick={closeModal}
						class="rounded-xl bg-amber-400 hover:bg-amber-300 px-5 py-2 text-xs font-black uppercase tracking-wider text-blue-950 transition active:scale-95"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
