<script>
	let showModal = $state(false);
	let activeTab = $state('organogram'); // 'organogram' | 'directory' | 'document'
	let selectedMember = $state(null);
	let searchQuery = $state('');
	let selectedUnit = $state('all');
	let selectedStatus = $state('all');

	// All 60 verified personnel from the official GSO Organizational Chart PDF
	const personnel = [
		// Executive Head
		{
			id: 'ramos-eugenio',
			name: 'Eugenio C. Ramos, Jr.',
			title: 'GSO Head / Operation Manager',
			unit: 'Executive',
			unitLabel: 'Executive & Office Management',
			status: 'Head',
			statusBadge: 'Department Head',
			image: '/images/gso-personnel/ramos-eugenio.jpg',
			duties:
				'Directs overall municipal property management, logistical support, maintenance of public infrastructure, venue reservations, and operational fleet readiness across the municipality.'
		},

		// Administrative & Office Staff (10 Office Staff from PDF + 2 Clerical Aides organized from Field Workers)
		{
			id: 'soyosa-honeyline',
			name: 'Honeyline B. Soyosa',
			title: 'Clerical / Utility Worker',
			unit: 'admin',
			unitLabel: 'Administrative & Clerical Support',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/soyosa-honeyline.jpg',
			duties: 'Manages administrative correspondence, inter-office utility assistance, and focal clerical tasks.'
		},
		{
			id: 'naraja-pamela',
			name: 'Pamela Naraja',
			title: 'Book Binder',
			unit: 'admin',
			unitLabel: 'Administrative & Records Support',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/naraja-pamela.jpg',
			duties: 'Supervises archival bookbinding, preservation of statutory documents, and public records collation.'
		},
		{
			id: 'glory-roger',
			name: 'Roger Glory',
			title: 'Logistics',
			unit: 'admin',
			unitLabel: 'Logistics Operations',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/glory-roger.jpg',
			duties: 'Coordinates municipal equipment dispatch, tents and chairs inventory control, and civic event setups.'
		},
		{
			id: 'candila-ahrjean',
			name: 'Ahrjean A. Candila',
			title: 'Clerical Aide',
			unit: 'admin',
			unitLabel: 'Administrative & Clerical Support',
			status: 'Casual',
			statusBadge: 'Casual',
			image: '/images/gso-personnel/candila-ahrjean.jpg',
			duties: 'Processes public borrower slips, equipment return inspection forms, and front-desk inquiries.'
		},
		{
			id: 'duma-pedro',
			name: 'Pedro C. Duma',
			title: 'Clerical Aide',
			unit: 'admin',
			unitLabel: 'Administrative & Clerical Support',
			status: 'Casual',
			statusBadge: 'Casual',
			image: '/images/gso-personnel/duma-pedro.jpg',
			duties: 'Facilitates incoming and outgoing document tracking and departmental communication.'
		},
		{
			id: 'avila-aiza',
			name: 'Aiza Avila',
			title: 'Clerical Aide',
			unit: 'admin',
			unitLabel: 'Administrative & Clerical Support',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/avila-aiza.jpg',
			duties: 'Assists in office encoding, public service documentation, and document filing.'
		},
		{
			id: 'banares-remilyn',
			name: 'Remilyn Bañares',
			title: 'Clerical Aide',
			unit: 'admin',
			unitLabel: 'Administrative & Clerical Support',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/banares-remilyn.jpg',
			duties: 'Maintains records of municipal venue bookings, Amphitheater reservations, and client schedules.'
		},
		{
			id: 'gobenciong-ginna',
			name: 'Ginna Gobenciong',
			title: 'Clerical Aide',
			unit: 'admin',
			unitLabel: 'Administrative & Clerical Support',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/gobenciong-ginna.jpg',
			duties: 'Handles client transaction intake, verification of requirements, and clerical coordination.'
		},
		{
			id: 'lumbre-asuncion',
			name: 'Asuncion Lumbre',
			title: 'Clerical Aide',
			unit: 'admin',
			unitLabel: 'Administrative & Clerical Support',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/lumbre-asuncion.jpg',
			duties: 'Coordinates internal clerical routing, inventory records, and office supplies management.'
		},
		{
			id: 'tizon-loreto',
			name: 'Loreto Tizon',
			title: 'Clerical Aide',
			unit: 'admin',
			unitLabel: 'Administrative & Clerical Support',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/tizon-loreto.jpg',
			duties: 'Performs document indexing, data entry, and clerical support across GSO administrative units.'
		},
		{
			id: 'elona-janeth',
			name: 'Janeth Elona',
			title: 'Clerical Aide',
			unit: 'admin',
			unitLabel: 'Administrative & Clerical Support',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/elona-janeth.jpg',
			duties: 'Provides clerical recording for field operations, maintenance dispatches, and work orders.'
		},
		{
			id: 'parungao-meljohn',
			name: 'Meljohn Parungao',
			title: 'Clerical Aide',
			unit: 'admin',
			unitLabel: 'Administrative & Clerical Support',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/parungao-meljohn.jpg',
			duties: 'Supports administrative log tracking for motor pool trip tickets and field maintenance requests.'
		},

		// Electrical & Power Maintenance Unit (5 personnel)
		{
			id: 'songalia-rolando',
			name: 'Rolando Songalia',
			title: 'Electrician',
			unit: 'electrical',
			unitLabel: 'Electrical & Power Maintenance Unit',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/songalia-rolando.jpg',
			duties: 'Lead municipal electrician overseeing electrical wiring, generator maintenance, and power integrity across town facilities.'
		},
		{
			id: 'redona-paul',
			name: 'Paul Redoña',
			title: 'Assistant Electrician',
			unit: 'electrical',
			unitLabel: 'Electrical & Power Maintenance Unit',
			status: 'Casual',
			statusBadge: 'Casual',
			image: '/images/gso-personnel/redona-paul.jpg',
			duties: 'Assists in electrical line installations, sound system wiring, and public street lighting maintenance.'
		},
		{
			id: 'alicando-jayric',
			name: 'Jayric Alicando',
			title: 'Assistant Electrician',
			unit: 'electrical',
			unitLabel: 'Electrical & Power Maintenance Unit',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/alicando-jayric.jpg',
			duties: 'Performs troubleshooting of electrical circuits, sound equipment setup, and venue illumination.'
		},
		{
			id: 'naraja-reggie-boy',
			name: 'Reggie Boy Naraja',
			title: 'Assistant Electrician',
			unit: 'electrical',
			unitLabel: 'Electrical & Power Maintenance Unit',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/naraja-reggie-boy.jpg',
			duties: 'Supports electrical maintenance of civic centers, amphitheater lighting, and official municipal events.'
		},
		{
			id: 'soyosa-mannix',
			name: 'Mannix Soyosa',
			title: 'Assistant Electrician',
			unit: 'electrical',
			unitLabel: 'Electrical & Power Maintenance Unit',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/soyosa-mannix.jpg',
			duties: 'Executes rapid-response electrical repairs and electrical preventive maintenance in municipal halls.'
		},

		// Motor Pool, Fleet & Transportation Logistics (3 Drivers)
		{
			id: 'daya-on-dennis',
			name: 'Dennis Daya-on',
			title: 'Driver',
			unit: 'motorpool',
			unitLabel: 'Motor Pool & Fleet Transport',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/daya-on-dennis.jpg',
			duties: 'Drives official municipal service vehicles, assists in logistical hauling and emergency transport.'
		},
		{
			id: 'parungao-mel-ivan',
			name: 'Mel Ivan Parungao',
			title: 'Driver',
			unit: 'motorpool',
			unitLabel: 'Motor Pool & Fleet Transport',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/parungao-mel-ivan.jpg',
			duties: 'Operates municipal utility vehicles, coordinates equipment transit, and ensures vehicle road readiness.'
		},
		{
			id: 'redona-rechard',
			name: 'Rechard Redoña',
			title: 'Driver',
			unit: 'motorpool',
			unitLabel: 'Motor Pool & Fleet Transport',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/redona-rechard.jpg',
			duties: 'Dispatches municipal delivery trucks, chairs/tent hauling, and inter-departmental transport.'
		},

		// Specialized Trades & Public Grounds Maintenance (4 personnel)
		{
			id: 'repasa-ranel',
			name: 'Ranel Repasa',
			title: 'Carpenter',
			unit: 'trades',
			unitLabel: 'Specialized Trades & Grounds',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/repasa-ranel.jpg',
			duties: 'Executes carpentry, wood fixtures construction, stage assembly, and structural repairs for LGU buildings.'
		},
		{
			id: 'hubahib-anthony',
			name: 'Anthony Hubahib',
			title: 'Welder',
			unit: 'trades',
			unitLabel: 'Specialized Trades & Grounds',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/hubahib-anthony.jpg',
			duties: 'Performs metal fabrication, tent frame reinforcement, fence welding, and civic infrastructure welding.'
		},
		{
			id: 'odullada-adamson',
			name: 'Adamson Odullada',
			title: 'Park Attendant',
			unit: 'trades',
			unitLabel: 'Specialized Trades & Grounds',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/odullada-adamson.jpg',
			duties: 'Oversees public plaza cleanliness, park facility security, and recreational grounds maintenance.'
		},
		{
			id: 'garcia-jerry',
			name: 'Jerry Garcia',
			title: 'Gardener',
			unit: 'trades',
			unitLabel: 'Specialized Trades & Grounds',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/garcia-jerry.jpg',
			duties: 'Maintains municipal landscape greenery, botanical upkeep, and beautification of public plaza grounds.'
		},

		// Building Grounds, Custodial & Sanitation Utility Services (35 Utility Workers)
		// Permanent (8)
		{
			id: 'arcena-rosie',
			name: 'Rosie C. Arcena',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/arcena-rosie.jpg',
			duties: 'Performs sanitation, custodial upkeep, and maintenance of public government facilities.'
		},
		{
			id: 'badrina-daryl',
			name: 'Daryl Badrina',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/badrina-daryl.jpg',
			duties: 'Executes facility sanitization, grounds maintenance, and general utility assistance.'
		},
		{
			id: 'cadion-rayle',
			name: 'Rayle M. Cadion',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/cadion-rayle.jpg',
			duties: 'Carries out physical maintenance, venue clean-up, and municipal building sanitation.'
		},
		{
			id: 'dandan-geraldine',
			name: 'Geraldine Dandan',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/dandan-geraldine.jpg',
			duties: 'Ensures cleanliness of executive offices, civic venues, and public corridors.'
		},
		{
			id: 'echaque-christal',
			name: 'Christal Echaque',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/echaque-christal.jpg',
			duties: 'Maintains sanitary conditions of public washrooms, lobbies, and administrative halls.'
		},
		{
			id: 'gausin-lordeliza',
			name: 'Lordeliza A. Gausin',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/gausin-lordeliza.jpg',
			duties: 'Supervises daily custodial procedures and supplies replenishment for public offices.'
		},
		{
			id: 'marchadesch-jesusito',
			name: 'Jesusito Marchadesch',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/marchadesch-jesusito.jpg',
			duties: 'Handles building maintenance, equipment carrying, and event space preparation.'
		},
		{
			id: 'mariano-may',
			name: 'May D. Mariano',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Permanent',
			statusBadge: 'Permanent',
			image: '/images/gso-personnel/mariano-may.jpg',
			duties: 'Performs waste segregation, venue cleaning, and routine government facility upkeep.'
		},

		// Casual (1)
		{
			id: 'dulay-eleuterio',
			name: 'Eleuterio P. Dulay',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Casual',
			statusBadge: 'Casual',
			image: '/images/gso-personnel/dulay-eleuterio.jpg',
			duties: 'Conducts ground clearing, trash collection, and venue maintenance.'
		},

		// Job Order Utility Workers (26)
		{
			id: 'abano-raymond',
			name: 'Raymond Abaño',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/abano-raymond.jpg',
			duties: 'Assists in tent hauling, chair distribution, and municipal events logistics.'
		},
		{
			id: 'abarientos-allan',
			name: 'Allan Abarientos',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/abarientos-allan.jpg',
			duties: 'Performs perimeter grounds cleaning, grass cutting, and public venue sanitation.'
		},
		{
			id: 'alicer-junjie',
			name: 'Junjie Alicer',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/alicer-junjie.jpg',
			duties: 'Assists in venue stage installation, furniture movement, and facility care.'
		},
		{
			id: 'badeo-dominic',
			name: 'Dominic Badeo',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/badeo-dominic.jpg',
			duties: 'Conducts daily sweep and sanitation across municipal hall grounds and civic centers.'
		},
		{
			id: 'badeo-rommel',
			name: 'Rommel Badeo',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/badeo-rommel.jpg',
			duties: 'Provides field utility support during municipal ceremonies and public convocations.'
		},
		{
			id: 'bete-jeffrey',
			name: 'Jeffrey Bete',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/bete-jeffrey.jpg',
			duties: 'Assists in heavy equipment mobilization, logistics loading, and public site maintenance.'
		},
		{
			id: 'catudio-marjoy',
			name: 'Marjoy Catudio',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/catudio-marjoy.jpg',
			duties: 'Executes sanitization of civic complex rest facilities and office rooms.'
		},
		{
			id: 'corales-joey',
			name: 'Joey Corales',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/corales-joey.jpg',
			duties: 'Provides physical manual support for building repairs, painting, and utility needs.'
		},
		{
			id: 'cumpio-rogelio',
			name: 'Rogelio Cumpio',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/cumpio-rogelio.jpg',
			duties: 'Performs public venue janitorial upkeep and grounds maintenance.'
		},
		{
			id: 'cumpio-zosima',
			name: 'Zosima Cumpio',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/cumpio-zosima.jpg',
			duties: 'Maintains pristine cleanliness and tidiness of government session halls and common areas.'
		},
		{
			id: 'dalagan-dennis',
			name: 'Dennis Dalagan',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/dalagan-dennis.jpg',
			duties: 'Conducts outdoor lawn mowing, debris clearing, and public pathway upkeep.'
		},
		{
			id: 'daya-on-melody',
			name: 'Melody Daya-on',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/daya-on-melody.jpg',
			duties: 'Assists in indoor sanitization, dusting, and office environment maintenance.'
		},
		{
			id: 'de-veyra-siony',
			name: 'Siony De Veyra',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/de-veyra-siony.jpg',
			duties: 'Maintains administrative buildings and public service transaction counters clean and sanitized.'
		},
		{
			id: 'durana-larry',
			name: 'Larry Durana',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/durana-larry.jpg',
			duties: 'Supports event setup, barricade arrangements, and sound equipment transport.'
		},
		{
			id: 'hababag-joel',
			name: 'Joel Hababag',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/hababag-joel.jpg',
			duties: 'Assists in civic facility structural cleaning, drainage clearing, and grounds upkeep.'
		},
		{
			id: 'mercado-alex',
			name: 'Alex Mercado',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/mercado-alex.jpg',
			duties: 'Provides field utility assistance, event sound equipment handling, and public ground maintenance.'
		},
		{
			id: 'nerja-alfonso',
			name: 'Alfonso Nerja',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/nerja-alfonso.jpg',
			duties: 'Maintains sanitation in municipal parks, plazas, and outdoor recreational areas.'
		},
		{
			id: 'olimberio-carlos-miguel',
			name: 'Carlos Miguel Olimberio',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/olimberio-carlos-miguel.jpg',
			duties: 'Assists in tent installation, canopy setups, and civic assembly chairs deployment.'
		},
		{
			id: 'palo-felix',
			name: 'Felix Palo',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/palo-felix.jpg',
			duties: 'Handles public building window washing, floor polishing, and post-event waste management.'
		},
		{
			id: 'raz-rosell',
			name: 'Rosell Raz',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/raz-rosell.jpg',
			duties: 'Performs daily custodial duties for municipal halls and executive conference rooms.'
		},
		{
			id: 'rebano-roque',
			name: 'Roque Rebano',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/rebano-roque.jpg',
			duties: 'Conducts routine maintenance of public facilities, plumbing inspection assist, and grounds care.'
		},
		{
			id: 'royeras-aljhon',
			name: 'Aljhon Royeras',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/royeras-aljhon.jpg',
			duties: 'Assists in event logistics coordination, furniture relocation, and custodial maintenance.'
		},
		{
			id: 'santos-sales',
			name: 'Sales Santos',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/santos-sales.jpg',
			duties: 'Performs sanitization of town civic center, presidencia lobby, and auditorium seating.'
		},
		{
			id: 'soledad-ryan',
			name: 'Ryan Soledad',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/soledad-ryan.jpg',
			duties: 'Assists with physical facilities upkeep, event stage setups, and grounds maintenance.'
		},
		{
			id: 'tolibas-byron',
			name: 'Byron Tolibas',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/tolibas-byron.jpg',
			duties: 'Conducts general cleaning, waste disposal, and facility readiness maintenance.'
		},
		{
			id: 'villamor-concordio',
			name: 'Concordio Villamor',
			title: 'Utility Worker',
			unit: 'custodial',
			unitLabel: 'Building Grounds & Custodial Services',
			status: 'Job Order',
			statusBadge: 'Job Order',
			image: '/images/gso-personnel/villamor-concordio.jpg',
			duties: 'Assists with municipal buildings upkeep, ground sanitation, and disaster recovery logistics.'
		}
	];

	// Filtered personnel for Directory view
	let filteredPersonnel = $derived(
		personnel.filter((p) => {
			const matchesSearch =
				searchQuery.trim() === '' ||
				p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.unitLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.statusBadge.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesUnit = selectedUnit === 'all' || p.unit === selectedUnit;
			const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;

			return matchesSearch && matchesUnit && matchesStatus;
		})
	);

	// Unit divisions for hierarchical views
	const executive = personnel.find((p) => p.id === 'ramos-eugenio');
	const adminStaff = personnel.filter((p) => p.unit === 'admin');
	const electricalTeam = personnel.filter((p) => p.unit === 'electrical');
	const motorpoolTeam = personnel.filter((p) => p.unit === 'motorpool');
	const tradesTeam = personnel.filter((p) => p.unit === 'trades');
	const custodialWorkers = personnel.filter((p) => p.unit === 'custodial');

	function inspectMember(member) {
		selectedMember = member;
	}

	function closeInspect() {
		selectedMember = null;
	}

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (closeModal(), closeInspect())} />

<div class="w-full max-w-6xl mx-auto flex flex-col items-center space-y-6">
	<!-- Top Bar: Title & Mode Switcher -->
	<div class="flex flex-wrap items-center justify-between gap-4 w-full px-2">
		<div class="flex items-center gap-2.5">
			<span
				class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-950 border border-blue-200"
			>
				<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
				Official GSO Structure
			</span>
			<span class="text-xs font-bold text-slate-500 hidden sm:inline-block">
				60 Total Personnel // Fully Organized
			</span>
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
					<span>Original PDF</span>
				</button>
			</div>

			<!-- PDF Download -->
			<a
				href="/General_Services_Section_Org_Chart.pdf"
				download="General_Services_Section_Org_Chart.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-950 transition-colors shadow-2xs"
				title="Download official PDF document"
			>
				<span>Download PDF</span>
			</a>
		</div>
	</div>

	<!-- Organization & Clarification Banner -->
	<div class="w-full bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-blue-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
		<div>
			<h4 class="text-sm font-black text-amber-300 uppercase tracking-wide">
				Data Organization & Functional Unit Structure
			</h4>
			<p class="text-xs text-slate-300 mt-0.5 leading-relaxed">
				In the original unorganized PDF roster, 49 field workers were placed into a single flat grid with clerical staff and various technicians mixed together. Here, all 60 personnel are categorized into their appropriate functional divisions: Executive, Administration & Clerical, Electrical & Power, Motor Pool, Specialized Trades, and Custodial Utility Operations.
			</p>
		</div>
		<div class="flex items-center gap-2 shrink-0 self-end md:self-center">
			<span class="px-2.5 py-1 rounded-md bg-white/10 text-white text-[11px] font-bold border border-white/20">
				1 Head
			</span>
			<span class="px-2.5 py-1 rounded-md bg-white/10 text-white text-[11px] font-bold border border-white/20">
				12 Admin / Clerical
			</span>
			<span class="px-2.5 py-1 rounded-md bg-white/10 text-white text-[11px] font-bold border border-white/20">
				47 Field Ops
			</span>
		</div>
	</div>

	<!-- TAB 1: INTERACTIVE ORGANOGRAM -->
	{#if activeTab === 'organogram'}
		<div class="w-full rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-8 shadow-sm flex flex-col items-center relative overflow-hidden">
			<!-- Subtle Watermark -->
			<img
				src="/tanauan logo.svg"
				alt=""
				class="pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none"
			/>

			<!-- Level 1: Executive Head -->
			{#if executive}
				<div class="relative flex flex-col items-center mb-8">
					<button
						type="button"
						onclick={() => inspectMember(executive)}
						class="group relative flex flex-col items-center bg-gradient-to-b from-blue-900 to-blue-950 text-white rounded-2xl p-4 shadow-lg border-2 border-amber-400 transition-all hover:scale-105 hover:shadow-xl text-center w-72 sm:w-80 cursor-pointer"
					>
						<div class="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-400 text-blue-950 text-[10px] font-black uppercase tracking-wider shadow-xs">
							GSO Department Head
						</div>
						<div class="relative h-24 w-24 rounded-full overflow-hidden border-3 border-amber-400 shadow-md mb-2.5 bg-slate-800">
							<img
								src={executive.image}
								alt={executive.name}
								class="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
							/>
						</div>
						<h3 class="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-amber-300">
							{executive.name}
						</h3>
						<p class="text-xs font-bold text-amber-300 tracking-wide mt-0.5">
							{executive.title}
						</p>
						<span class="mt-2 text-[10px] font-semibold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full">
							Click to view responsibilities
						</span>
					</button>

					<!-- Connector Line to Level 2 -->
					<div class="w-0.5 h-8 bg-blue-900 mt-2"></div>
				</div>
			{/if}

			<!-- Level 2 Branching: Section 1 vs Section 2 -->
			<div class="w-full max-w-4xl relative mb-8">
				<!-- Horizontal Connector -->
				<div class="hidden md:block w-3/4 mx-auto h-0.5 bg-blue-900 relative">
					<div class="absolute left-0 -top-0.5 w-0.5 h-6 bg-blue-900"></div>
					<div class="absolute right-0 -top-0.5 w-0.5 h-6 bg-blue-900"></div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
					<!-- SECTION 1 HEADER CARD -->
					<div class="rounded-2xl border-2 border-blue-600 bg-blue-50/60 p-4 text-center shadow-xs">
						<div class="inline-block px-3 py-0.5 rounded-full bg-blue-700 text-white text-[10px] font-black uppercase tracking-wider mb-1">
							Division 1
						</div>
						<h4 class="text-base font-black text-blue-950 uppercase tracking-tight">
							Administrative & Clerical Operations
						</h4>
						<p class="text-xs text-slate-600 font-semibold mt-0.5">
							12 Personnel • Records, Logistics, & Frontline Services
						</p>
					</div>

					<!-- SECTION 2 HEADER CARD -->
					<div class="rounded-2xl border-2 border-emerald-600 bg-emerald-50/60 p-4 text-center shadow-xs">
						<div class="inline-block px-3 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider mb-1">
							Division 2
						</div>
						<h4 class="text-base font-black text-blue-950 uppercase tracking-tight">
							Field Operations & Public Facilities
						</h4>
						<p class="text-xs text-slate-600 font-semibold mt-0.5">
							47 Personnel • Power, Fleet, Trades, & Custodial Grounds
						</p>
					</div>
				</div>
			</div>

			<!-- UNIT BLOCKS CONTAINER -->
			<div class="w-full space-y-10">
				<!-- UNIT 1: Administrative, Logistics & Clerical Support -->
				<div class="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
					<div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
						<div class="flex items-center gap-2">
							<span class="h-3 w-3 rounded-full bg-blue-700"></span>
							<h5 class="text-sm font-black text-blue-950 uppercase tracking-wide">
								Administrative, Logistics & Office Staff ({adminStaff.length})
							</h5>
						</div>
						<span class="text-[11px] font-bold text-slate-500">
							Permanent (3) • Casual (2) • Job Order (7)
						</span>
					</div>

					<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
						{#each adminStaff as member}
							<button
								type="button"
								onclick={() => inspectMember(member)}
								class="group flex flex-col items-center bg-white rounded-xl p-3 border border-slate-200 shadow-2xs hover:border-blue-700 hover:shadow-md transition-all text-center cursor-pointer"
							>
								<div class="h-16 w-16 rounded-full overflow-hidden border-2 border-blue-600 mb-2 bg-slate-100 shrink-0">
									<img src={member.image} alt={member.name} class="h-full w-full object-cover object-top group-hover:scale-105 transition-transform" />
								</div>
								<h6 class="text-xs font-black text-blue-950 group-hover:text-blue-700 leading-tight">
									{member.name}
								</h6>
								<span class="text-[10px] font-bold text-slate-500 mt-0.5 leading-tight">
									{member.title}
								</span>
								<span
									class={`mt-1.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
										member.status === 'Permanent'
											? 'bg-blue-100 text-blue-800'
											: member.status === 'Casual'
											? 'bg-amber-100 text-amber-800'
											: 'bg-slate-100 text-slate-700'
									}`}
								>
									{member.status}
								</span>
							</button>
						{/each}
					</div>
				</div>

				<!-- UNIT 2: Electrical & Power Maintenance -->
				<div class="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
					<div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
						<div class="flex items-center gap-2">
							<span class="h-3 w-3 rounded-full bg-amber-500"></span>
							<h5 class="text-sm font-black text-blue-950 uppercase tracking-wide">
								Electrical & Power Maintenance Unit ({electricalTeam.length})
							</h5>
						</div>
						<span class="text-[11px] font-bold text-slate-500">
							Lead Electrician & 4 Assistant Electricians
						</span>
					</div>

					<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
						{#each electricalTeam as member}
							<button
								type="button"
								onclick={() => inspectMember(member)}
								class="group flex flex-col items-center bg-white rounded-xl p-3 border border-slate-200 shadow-2xs hover:border-amber-600 hover:shadow-md transition-all text-center cursor-pointer"
							>
								<div class="h-16 w-16 rounded-full overflow-hidden border-2 border-amber-500 mb-2 bg-slate-100 shrink-0">
									<img src={member.image} alt={member.name} class="h-full w-full object-cover object-top group-hover:scale-105 transition-transform" />
								</div>
								<h6 class="text-xs font-black text-blue-950 group-hover:text-amber-800 leading-tight">
									{member.name}
								</h6>
								<span class="text-[10px] font-bold text-slate-500 mt-0.5 leading-tight">
									{member.title}
								</span>
								<span
									class={`mt-1.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
										member.status === 'Permanent'
											? 'bg-blue-100 text-blue-800'
											: member.status === 'Casual'
											? 'bg-amber-100 text-amber-800'
											: 'bg-slate-100 text-slate-700'
									}`}
								>
									{member.status}
								</span>
							</button>
						{/each}
					</div>
				</div>

				<!-- UNIT 3 & 4: Motor Pool & Specialized Trades -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<!-- Motor Pool -->
					<div class="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
						<div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
							<div class="flex items-center gap-2">
								<span class="h-3 w-3 rounded-full bg-sky-600"></span>
								<h5 class="text-sm font-black text-blue-950 uppercase tracking-wide">
									Motor Pool & Fleet Transport ({motorpoolTeam.length})
								</h5>
							</div>
							<span class="text-[11px] font-bold text-slate-500">Drivers & Logistics</span>
						</div>
						<div class="grid grid-cols-3 gap-3">
							{#each motorpoolTeam as member}
								<button
									type="button"
									onclick={() => inspectMember(member)}
									class="group flex flex-col items-center bg-white rounded-xl p-3 border border-slate-200 shadow-2xs hover:border-sky-600 hover:shadow-md transition-all text-center cursor-pointer"
								>
									<div class="h-16 w-16 rounded-full overflow-hidden border-2 border-sky-600 mb-2 bg-slate-100 shrink-0">
										<img src={member.image} alt={member.name} class="h-full w-full object-cover object-top group-hover:scale-105 transition-transform" />
									</div>
									<h6 class="text-xs font-black text-blue-950 group-hover:text-sky-700 leading-tight">
										{member.name}
									</h6>
									<span class="text-[10px] font-bold text-slate-500 mt-0.5 leading-tight">
										{member.title}
									</span>
									<span class="mt-1.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
										{member.status}
									</span>
								</button>
							{/each}
						</div>
					</div>

					<!-- Specialized Trades & Parks -->
					<div class="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
						<div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
							<div class="flex items-center gap-2">
								<span class="h-3 w-3 rounded-full bg-indigo-600"></span>
								<h5 class="text-sm font-black text-blue-950 uppercase tracking-wide">
									Trades & Public Parks ({tradesTeam.length})
								</h5>
							</div>
							<span class="text-[11px] font-bold text-slate-500">Carpenter, Welder, Parks</span>
						</div>
						<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
							{#each tradesTeam as member}
								<button
									type="button"
									onclick={() => inspectMember(member)}
									class="group flex flex-col items-center bg-white rounded-xl p-3 border border-slate-200 shadow-2xs hover:border-indigo-600 hover:shadow-md transition-all text-center cursor-pointer"
								>
									<div class="h-16 w-16 rounded-full overflow-hidden border-2 border-indigo-600 mb-2 bg-slate-100 shrink-0">
										<img src={member.image} alt={member.name} class="h-full w-full object-cover object-top group-hover:scale-105 transition-transform" />
									</div>
									<h6 class="text-xs font-black text-blue-950 group-hover:text-indigo-700 leading-tight">
										{member.name}
									</h6>
									<span class="text-[10px] font-bold text-slate-500 mt-0.5 leading-tight">
										{member.title}
									</span>
									<span
										class={`mt-1.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
											member.status === 'Permanent'
												? 'bg-blue-100 text-blue-800'
												: 'bg-slate-100 text-slate-700'
										}`}
									>
										{member.status}
									</span>
								</button>
							{/each}
						</div>
					</div>
				</div>

				<!-- UNIT 5: Building Grounds, Custodial & General Utility Workers -->
				<div class="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
					<div class="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 mb-4 gap-2">
						<div class="flex items-center gap-2">
							<span class="h-3 w-3 rounded-full bg-emerald-600"></span>
							<h5 class="text-sm font-black text-blue-950 uppercase tracking-wide">
								Building Grounds & Custodial Services ({custodialWorkers.length})
							</h5>
						</div>
						<span class="text-[11px] font-bold text-slate-500">
							Permanent (8) • Casual (1) • Job Order (26)
						</span>
					</div>

					<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
						{#each custodialWorkers as member}
							<button
								type="button"
								onclick={() => inspectMember(member)}
								class="group flex flex-col items-center bg-white rounded-xl p-2.5 border border-slate-200 shadow-2xs hover:border-emerald-600 hover:shadow-md transition-all text-center cursor-pointer"
							>
								<div class="h-14 w-14 rounded-full overflow-hidden border-2 border-emerald-500 mb-1.5 bg-slate-100 shrink-0">
									<img src={member.image} alt={member.name} class="h-full w-full object-cover object-top group-hover:scale-105 transition-transform" />
								</div>
								<h6 class="text-[11px] font-black text-blue-950 group-hover:text-emerald-700 leading-tight">
									{member.name}
								</h6>
								<span class="text-[9px] font-semibold text-slate-500 mt-0.5 leading-tight">
									{member.title}
								</span>
								<span
									class={`mt-1 text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full ${
										member.status === 'Permanent'
											? 'bg-blue-100 text-blue-800'
											: member.status === 'Casual'
											? 'bg-amber-100 text-amber-800'
											: 'bg-slate-100 text-slate-600'
									}`}
								>
									{member.status}
								</span>
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- TAB 2: SEARCHABLE DIRECTORY VIEW -->
	{#if activeTab === 'directory'}
		<div class="w-full space-y-6">
			<!-- Filters & Search Toolbar -->
			<div class="bg-white rounded-2xl border-2 border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
				<div class="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
					<!-- Search Input -->
					<div class="relative flex-1">
						<input
							type="text"
							bind:value={searchQuery}
							placeholder="Search by name, title, or service unit..."
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

					<!-- Unit Filter -->
					<div class="flex items-center gap-2">
						<select
							bind:value={selectedUnit}
							class="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 focus:border-blue-900 focus:outline-none"
						>
							<option value="all">All Units (60)</option>
							<option value="Executive">Executive Head (1)</option>
							<option value="admin">Administrative & Clerical (12)</option>
							<option value="electrical">Electrical & Power (5)</option>
							<option value="motorpool">Motor Pool & Fleet (3)</option>
							<option value="trades">Trades & Public Parks (4)</option>
							<option value="custodial">Custodial & Utility (35)</option>
						</select>

						<!-- Appointment Status Filter -->
						<select
							bind:value={selectedStatus}
							class="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 focus:border-blue-900 focus:outline-none"
						>
							<option value="all">All Appointments</option>
							<option value="Head">Department Head (1)</option>
							<option value="Permanent">Permanent (14)</option>
							<option value="Casual">Casual (4)</option>
							<option value="Job Order">Job Order (41)</option>
						</select>
					</div>
				</div>

				<!-- Quick Filter Chips -->
				<div class="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
					<span class="text-[11px] font-black uppercase text-slate-400 mr-1">Showing:</span>
					<span class="font-bold text-blue-950">{filteredPersonnel.length} personnel matching criteria</span>
					{#if searchQuery || selectedUnit !== 'all' || selectedStatus !== 'all'}
						<button
							type="button"
							onclick={() => {
								searchQuery = '';
								selectedUnit = 'all';
								selectedStatus = 'all';
							}}
							class="ml-auto text-[11px] font-black text-amber-600 hover:text-amber-800 underline"
						>
							Reset filters
						</button>
					{/if}
				</div>
			</div>

			<!-- Directory Grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each filteredPersonnel as member}
					<button
						type="button"
						onclick={() => inspectMember(member)}
						class="group flex items-center gap-3.5 bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-blue-900 hover:shadow-md transition-all text-left cursor-pointer"
					>
						<div class="h-14 w-14 rounded-full overflow-hidden border-2 border-slate-300 group-hover:border-blue-700 mb-0 bg-slate-100 shrink-0">
							<img src={member.image} alt={member.name} class="h-full w-full object-cover object-top group-hover:scale-105 transition-transform" />
						</div>
						<div class="min-w-0 flex-1">
							<div class="flex items-center gap-1.5">
								<span
									class={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full ${
										member.status === 'Head'
											? 'bg-blue-950 text-amber-300'
											: member.status === 'Permanent'
											? 'bg-blue-100 text-blue-800'
											: member.status === 'Casual'
											? 'bg-amber-100 text-amber-800'
											: 'bg-slate-100 text-slate-700'
									}`}
								>
									{member.statusBadge}
								</span>
							</div>
							<h5 class="text-xs font-black text-blue-950 group-hover:text-blue-800 truncate mt-1">
								{member.name}
							</h5>
							<p class="text-[10px] font-bold text-slate-500 truncate">
								{member.title}
							</p>
							<p class="text-[9px] text-slate-400 truncate mt-0.5">
								{member.unitLabel}
							</p>
						</div>
					</button>
				{/each}
			</div>

			{#if filteredPersonnel.length === 0}
				<div class="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-600">
					<p class="text-sm font-black text-blue-950">No personnel found</p>
					<p class="text-xs text-slate-500 mt-1">Try changing your search keywords or active filters.</p>
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
						Official General Services Section Document (PDF)
					</h3>
					<p class="text-xs text-slate-500">
						Official scanned 3-page chart from the Municipality of Tanauan records.
					</p>
				</div>
				<a
					href="/General_Services_Section_Org_Chart.pdf"
					download="General_Services_Section_Org_Chart.pdf"
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
					src="/General_Services_Section_Org_Chart.pdf"
					title="General Services Section Official Org Chart PDF"
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
		<div
			class="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-blue-900/30 overflow-hidden"
		>
			<button
				type="button"
				onclick={closeInspect}
				class="absolute top-4 right-4 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs transition-colors"
				aria-label="Close"
			>
				Close
			</button>

			<div class="flex flex-col sm:flex-row items-center sm:items-start gap-5">
				<div class="h-28 w-28 rounded-2xl overflow-hidden border-3 border-blue-900 shadow-md bg-slate-100 shrink-0">
					<img
						src={selectedMember.image}
						alt={selectedMember.name}
						class="h-full w-full object-cover object-top"
					/>
				</div>

				<div class="text-center sm:text-left min-w-0">
					<span
						class={`inline-block text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full mb-1.5 ${
							selectedMember.status === 'Head'
								? 'bg-blue-950 text-amber-300'
								: selectedMember.status === 'Permanent'
								? 'bg-blue-100 text-blue-800'
								: selectedMember.status === 'Casual'
								? 'bg-amber-100 text-amber-800'
								: 'bg-slate-100 text-slate-700'
						}`}
					>
						{selectedMember.statusBadge}
					</span>
					<h3 class="text-lg sm:text-xl font-black text-blue-950 tracking-tight leading-snug">
						{selectedMember.name}
					</h3>
					<p class="text-xs font-bold text-amber-600 uppercase tracking-wide mt-0.5">
						{selectedMember.title}
					</p>
					<p class="text-[11px] font-semibold text-slate-500 mt-0.5">
						{selectedMember.unitLabel}
					</p>
				</div>
			</div>

			<div class="mt-6 pt-5 border-t border-slate-200 space-y-3">
				<div>
					<h4 class="text-xs font-black uppercase text-blue-950 tracking-wider">
						Official Scope of Responsibilities
					</h4>
					<p class="text-xs text-slate-600 mt-1 leading-relaxed">
						{selectedMember.duties}
					</p>
				</div>

				<div class="rounded-xl bg-slate-50 p-3 border border-slate-200 flex items-center justify-between text-xs">
					<span class="text-slate-500 font-bold">Municipality</span>
					<span class="text-blue-950 font-black">Tanauan, Leyte</span>
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
