<script>
	import { onMount } from 'svelte';
	import { fade, fly, slide, scale } from 'svelte/transition';

	let {
		officeLocation = 'Ground Floor, Agricultural Extension Office, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
		officeHours = 'Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)',
		contactNumber = '(053) 321-2045 / +63 917 842 6110',
		email = 'agriculture@tanauanleyte.gov.ph',
		charterUrl = '/citizens-charter/agriculture'
	} = $props();

	// Active tab category filter
	let activeCategory = $state('all');
	let searchQuery = $state('');
	let selectedBeneficiary = $state('all');

	// Active Modal for viewing full Citizen's Charter details of a service
	let activeServiceModal = $state(null);
	// Modal for Downloadable Forms Directory
	let isFormsModalOpen = $state(false);
	// General Procedure Expanded Step
	let activeProcedureStep = $state(1);

	// Interactive requirements checklist in the modal: stores checked status by item key
	let checkedRequirements = $state({});

	const categories = [
		{ id: 'all', label: 'All Services', icon: '🌾', count: 17, badgeColor: 'bg-blue-900 text-white' },
		{ id: 'crop', label: 'Crops & Production', icon: '🌱', count: 6, badgeColor: 'bg-emerald-700 text-white' },
		{ id: 'livestock', label: 'Livestock Services', icon: '🐄', count: 2, badgeColor: 'bg-amber-700 text-white' },
		{ id: 'fisheries', label: 'Fisheries Section', icon: '🐟', count: 5, badgeColor: 'bg-cyan-800 text-white' },
		{ id: 'institutional', label: 'Institutional Dev.', icon: '🤝', count: 2, badgeColor: 'bg-indigo-800 text-white' },
		{ id: 'pca', label: 'PCA Coconut Services', icon: '🌴', count: 2, badgeColor: 'bg-teal-800 text-white' }
	];

	const beneficiariesList = [
		{ id: 'all', label: 'All Beneficiaries' },
		{ id: 'farmers', label: 'Farmers & Tellers' },
		{ id: 'fisherfolk', label: 'Fisherfolk' },
		{ id: 'livestock', label: 'Livestock Raisers' },
		{ id: 'associations', label: 'Rural Associations' },
		{ id: 'landowners', label: 'Landowners / Applicants' }
	];

	// All 17 Services directly extracted from the official MAO document
	const services = [
		// Section A: Crop Section
		{
			id: 'rsbsa-crop',
			serviceNumber: 1,
			sectionId: 'crop',
			sectionName: 'Crop Section',
			sectionBadge: 'Crops & Production',
			title: 'RSBSA Registration (Farmers & Farmworkers)',
			shortDesc:
				'Enrollment in the Registry System for Basic Sectors in Agriculture to qualify for national subsidies, inputs, and crop programs.',
			fullDesc:
				'The Registry System for Basic Sectors in Agriculture (RSBSA) registration provides the Municipal Agriculture Office with an updated database of active farmers and agricultural stakeholders. The information serves as the primary basis for identifying beneficiaries and planning, implementing, and monitoring agricultural interventions.',
			beneficiaryTag: 'farmers',
			beneficiaries: 'Farmers, farmworkers, and agricultural stakeholders operating within the municipality',
			processingTime: 'Approximately 10 minutes',
			timeMinutes: 10,
			fees: 'None (100% Free of Charge)',
			unit: 'Crop Section / RSBSA Registration Desk',
			icon: '📋',
			badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-900',
			accentColor: '#059669',
			downloadFormName: 'RSBSA Registration & Enrollment Form',
			downloadFormUrl: '/forms/agriculture/MAO_RSBSA_REGISTRATION_FORM.pdf',
			requirements: [
				{
					group: 'Proof of Identity (Any 1 valid government ID)',
					items: [
						'Birth Certificate',
						'PhilID / National ID / ePhilID',
						"Driver's License",
						'eCard / UMID / SSS ID / GSIS ID',
						'Voter’s ID or Certificate',
						'TIN ID / Pag-IBIG ID / PhilHealth ID',
						'Senior Citizen ID / PWD ID / Solo Parent ID / 4Ps ID',
						'Civil / Municipal / Barangay ID / Employee or Student ID'
					]
				},
				{
					group: 'Proof of Land Ownership, Tenancy, or Farming Agreement (Any 1 applicable)',
					items: [
						'Certificate of Land Transfer (CLT) / Emancipation Patent (EP)',
						'Individual CLOA / Collective CLOA / Co-ownership CLOA',
						'Agricultural Sales Patent / Homestead Patent / Free Patent',
						'Certificate of Title / Regular Title',
						'Certificate of Ancestral Domain Title (CADT) / CALT',
						'Tax Declaration / Real Property Tax Receipt',
						'Lease Agreement / Tenancy Agreement or Farming Certification'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Secure & Accomplish Form',
					desc: 'Secure the official RSBSA Registration Form from the MAO desk or download online and fill out all farm details.',
					duration: '5 minutes'
				},
				{
					stepNum: 2,
					title: 'Submit Supporting Documents',
					desc: 'Submit completed form together with valid government ID and proof of land ownership/tenancy to assigned personnel.',
					duration: '5 minutes'
				},
				{
					stepNum: 3,
					title: 'Verification & Database Validation',
					desc: 'The Crop Section validates submitted information against municipal cadastral maps and barangay rosters.',
					duration: 'Instant'
				},
				{
					stepNum: 4,
					title: 'Issuance of Reference / Control Number',
					desc: 'Registration is officially encoded and the farmer is issued an official RSBSA Reference / Control Number stub.',
					duration: 'Immediate'
				}
			],
			legalBasis: 'Department of Agriculture RSBSA Guidelines & Registry Database Standards'
		},
		{
			id: 'rice-seed-distribution',
			serviceNumber: 2,
			sectionId: 'crop',
			sectionName: 'Crop Section',
			sectionBadge: 'Crops & Production',
			title: 'Rice Seed Distribution',
			shortDesc:
				'Subsidized certified and hybrid rice seeds distribution for registered farmers to lower input costs and boost yield.',
			fullDesc:
				'The Rice Seed Distribution service provides qualified farmers with certified inbred or hybrid rice seeds to support rice production, reduce cropping overhead expenses, and improve farm productivity. The office conducts continuous field monitoring to validate seed utilization and record crop performance.',
			beneficiaryTag: 'farmers',
			beneficiaries: 'Qualified rice farmers registered within Tanauan, Leyte',
			processingTime: 'Approximately 8 minutes',
			timeMinutes: 8,
			fees: 'None (100% Free of Charge)',
			unit: 'Crop Section / Rice Program Coordination Desk',
			icon: '🌾',
			badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-900',
			accentColor: '#059669',
			downloadFormName: 'Seed Release Voucher',
			downloadFormUrl: '#download-rice-seed',
			requirements: [
				{
					group: 'Beneficiary Requirements',
					items: [
						'Registered farmer under RSBSA (Present RSBSA Reference / Control Number)',
						'Applicable valid Identification Card (Government or Barangay ID)',
						'Other program-specific requirements when applicable (e.g. Masterlist inclusion)'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Masterlist Identification & Validation',
					desc: 'Farmer is verified and checked against the approved masterlist of rice seed allocation for the planting season.',
					duration: '2 minutes'
				},
				{
					stepNum: 2,
					title: 'Document Presentation',
					desc: 'Farmer presents valid ID and RSBSA Reference/Control Number stub.',
					duration: '2 minutes'
				},
				{
					stepNum: 3,
					title: 'Record Verification',
					desc: 'MAO personnel verify farm size allocation and endorse for release.',
					duration: '2 minutes'
				},
				{
					stepNum: 4,
					title: 'Seed Release & Acknowledgement',
					desc: 'Rice seeds are released to the farmer upon signing the official acknowledgement receipt.',
					duration: '2 minutes'
				}
			],
			legalBasis: 'National Rice Program & LGU Food Security Productivity Assistance'
		},
		{
			id: 'vegetable-seed-distribution',
			serviceNumber: 3,
			sectionId: 'crop',
			sectionName: 'Crop Section',
			sectionBadge: 'Crops & Production',
			title: 'Vegetable Seed Distribution',
			shortDesc:
				'High-value vegetable seeds distribution for smallholders, backyard gardeners, and communal farm initiatives.',
			fullDesc:
				'The Vegetable Seed Distribution service provides certified vegetable seeds and high-value crop production inputs to qualified farmers and urban/rural households. It encourages crop diversification, household food sustainability, and commercial market production.',
			beneficiaryTag: 'farmers',
			beneficiaries: 'Qualified farmers, backyard growers, and households within the municipality',
			processingTime: 'Approximately 8 minutes',
			timeMinutes: 8,
			fees: 'None (100% Free of Charge)',
			unit: 'Crop Section / High-Value Crops Development Program (HVCDP)',
			icon: '🥕',
			badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-900',
			accentColor: '#059669',
			downloadFormName: 'Vegetable Seed Assistance Request Slip',
			downloadFormUrl: '#download-veg-seed',
			requirements: [
				{
					group: 'Required Documents',
					items: [
						'RSBSA registration stub or number (when applicable for commercial growers)',
						'Valid Government, School, or Barangay Identification Card',
						'Other program-specific requirements when applicable'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Request & Beneficiary Identification',
					desc: 'Farmer or household representative requests seed assistance at the HVCDP desk.',
					duration: '2 minutes'
				},
				{
					stepNum: 2,
					title: 'Eligibility Verification',
					desc: 'MAO personnel verify eligibility against seasonal seed inventory and municipal allocations.',
					duration: '2 minutes'
				},
				{
					stepNum: 3,
					title: 'Presentation of Identification',
					desc: 'Applicant presents valid ID and signs the distribution roster.',
					duration: '2 minutes'
				},
				{
					stepNum: 4,
					title: 'Preparation & Seed Handover',
					desc: 'Appropriate vegetable seed packets (pinakbet mix, leafy varieties, legumes) are released.',
					duration: '2 minutes'
				}
			],
			legalBasis: 'High-Value Crops Development Program (HVCDP) Republic Act 7900'
		},
		{
			id: 'farm-machinery-assistance',
			serviceNumber: 4,
			sectionId: 'crop',
			sectionName: 'Crop Section',
			sectionBadge: 'Crops & Production',
			title: 'Farm Machinery & Equipment Assistance',
			shortDesc:
				'Borrowing and scheduling of tractors, hand tillers, water pumps, threshers, and municipal farm equipment.',
			fullDesc:
				'The Municipal Agriculture Office facilitates operational assistance involving LGU-managed farm machinery and post-harvest equipment intended to modernize operations, lower equipment rental expenses, and boost field harvest efficiency.',
			beneficiaryTag: 'associations',
			beneficiaries: 'Individual farmers, accredited farmer cooperatives, and associations',
			processingTime: '1 to 2 Working Days (Subject to schedule)',
			timeMinutes: 1440,
			fees: 'None (100% Free Public Loan / Fuel arrangements per guidelines)',
			unit: 'Crop Section / Agricultural Machinery & Motor Pool Unit',
			icon: '🚜',
			badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-900',
			accentColor: '#059669',
			downloadFormName: 'Letter Request for Farm Machineries & Tractor (Waray)',
			downloadFormUrl: '/forms/agriculture/MAO_LETTER_REQUEST_FOR_MACHINERIES.pdf',
			requirements: [
				{
					group: 'Mandatory Submission Documents',
					items: [
						'Letter Request addressed to the Local Chief Executive (Mayor)',
						'Proof of active RSBSA registration',
						'Valid Government ID of applicant or authorized association representative',
						'Program-specific memorandum or equipment custody agreement'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Submission of Letter Request',
					desc: 'Applicant submits letter of intent/request to the Mayor’s Office for official approval.',
					duration: 'Step 1'
				},
				{
					stepNum: 2,
					title: 'Evaluation & Schedule by Municipal Agriculturist',
					desc: 'Approved request is routed to MAO for field validation, machine availability, and calendar scheduling.',
					duration: 'Step 2'
				},
				{
					stepNum: 3,
					title: 'Equipment Dispatch & Safe Utilization',
					desc: 'Beneficiary utilizes equipment pursuant to municipal safety terms and machine maintenance conditions.',
					duration: 'Step 3'
				},
				{
					stepNum: 4,
					title: 'Return & Motor Pool Inspection',
					desc: 'Equipment is returned to the municipal motor pool for technical inspection and sign-off.',
					duration: 'Step 4'
				}
			],
			legalBasis: 'Agricultural and Fisheries Mechanization (AFMech) Act (RA 10601)'
		},
		{
			id: 'pcic-insurance-application',
			serviceNumber: 5,
			sectionId: 'crop',
			sectionName: 'Crop Section',
			sectionBadge: 'Financial Assistance & Insurance',
			title: 'PCIC Insurance Application',
			shortDesc:
				'Assistance in obtaining government subsidized agricultural crop and livestock insurance through PCIC.',
			fullDesc:
				'The office assists farmers in applying for agricultural insurance through the Philippine Crop Insurance Corporation (PCIC). This safeguards producers against devastating financial loss resulting from typhoons, floods, droughts, pest infestations, and plant diseases.',
			beneficiaryTag: 'farmers',
			beneficiaries: 'Farmers with active standing crops, livestock, poultry, or agricultural assets',
			processingTime: 'Immediate intake counter transmittal',
			timeMinutes: 15,
			fees: 'None (Subsidized premium for RSBSA-registered farmers)',
			unit: 'Crop Section / PCIC Helpdesk & Insurance Transmittal',
			icon: '🛡️',
			badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-900',
			accentColor: '#059669',
			downloadFormName: 'PCIC Rice & Corn Crop Insurance Application',
			downloadFormUrl: '/forms/agriculture/MAO_PCIC_APPLICATION_FORM.pdf',
			requirements: [
				{
					group: 'Document Checklist',
					items: [
						'Photocopy of RSBSA stub or valid RSBSA enrollment document',
						'Photocopy of valid Government-issued ID',
						'Two (2) completely accomplished copies of PCIC Insurance Application Form'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Secure Insurance Application Form',
					desc: 'Obtain form from MAO desk or download directly from municipal portal.',
					duration: '3 minutes'
				},
				{
					stepNum: 2,
					title: 'Completely Accomplish Form',
					desc: 'Fill out farm parcel boundaries, planting dates, variety, and expected harvest date.',
					duration: '5 minutes'
				},
				{
					stepNum: 3,
					title: 'Prepare Required Attachments',
					desc: 'Attach RSBSA photocopy and valid ID copies.',
					duration: '2 minutes'
				},
				{
					stepNum: 4,
					title: 'Submit for Batch Transmittal',
					desc: 'MAO PCIC desk validates completeness and bundles for official submission to PCIC Regional Office.',
					duration: '5 minutes'
				}
			],
			legalBasis: 'Philippine Crop Insurance Corporation Charter (PD 1467 as amended)'
		},
		{
			id: 'pcic-claim-indemnity',
			serviceNumber: 6,
			sectionId: 'crop',
			sectionName: 'Crop Section',
			sectionBadge: 'Financial Assistance & Insurance',
			title: 'PCIC Claim of Indemnity',
			shortDesc:
				'Filing and verification of disaster/pest damage claims for insured crops and agricultural assets.',
			fullDesc:
				'Assists covered farmers in filing and processing their claims for indemnity following calamity damages, floods, typhoons, or pest attacks in accordance with statutory PCIC claim regulations.',
			beneficiaryTag: 'farmers',
			beneficiaries: 'Insured farmers whose insured crops or livestock suffered verifiable damage',
			processingTime: 'Immediate intake & transmittal for field validation',
			timeMinutes: 15,
			fees: 'None (100% Free Public Assistance)',
			unit: 'Crop Section / PCIC Calamity & Claims Desk',
			icon: '📑',
			badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-900',
			accentColor: '#059669',
			downloadFormName: 'PCIC Claims of Indemnity (Paghahabol Bayad)',
			downloadFormUrl: '/forms/agriculture/MAO_PCIC_CLAIMS_OF_IDEMNITY.pdf',
			requirements: [
				{
					group: 'Requirements for Claim Filing',
					items: [
						'Accomplished Claim of Indemnity Form / Notice of Loss',
						'Two (2) clear photocopies of the accomplished form (3 sets total)',
						'Copy of Certificate of Cover (COC) / Policy Number',
						'Valid Government ID of the claimant'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Secure Claim of Indemnity Form',
					desc: 'Obtain form immediately within the prescribed notice period after damage occurrence.',
					duration: '2 minutes'
				},
				{
					stepNum: 2,
					title: 'Accomplish Details Accurately',
					desc: 'Specify date of occurrence, cause of loss (typhoon/pest/flood), and percentage of affected acreage.',
					duration: '5 minutes'
				},
				{
					stepNum: 3,
					title: 'Photocopy Required Sets',
					desc: 'Produce 2 duplicate photocopies (3 copies total) as required by PCIC auditors.',
					duration: '3 minutes'
				},
				{
					stepNum: 4,
					title: 'Submission & Field Damage Assessment',
					desc: 'Submit to MAO. Adjuster/technician schedules field site validation to calculate indemnity payout.',
					duration: '5 minutes'
				}
			],
			legalBasis: 'PCIC Operational Guidelines for Calamity Adjustments'
		},

		// Section B: Livestock Section
		{
			id: 'medicines-vaccines',
			serviceNumber: 7,
			sectionId: 'livestock',
			sectionName: 'Livestock Section',
			sectionBadge: 'Livestock Services',
			title: 'Veterinary Medicines and Vaccines',
			shortDesc:
				'Free distribution of veterinary biologics, dewormers, vitamins, and vaccines for cattle, swine, goats, and poultry.',
			fullDesc:
				'The Municipal Agriculture Office provides essential veterinary pharmaceuticals, antibiotics, anti-parasitics, vitamins, and vaccines to livestock raisers and rural households to maintain herd health and prevent contagious animal diseases.',
			beneficiaryTag: 'livestock',
			beneficiaries: 'Livestock and poultry raisers, backyard animal owners, and households',
			processingTime: 'Approximately 5 minutes',
			timeMinutes: 5,
			fees: 'None (100% Free of Charge)',
			unit: 'Livestock Section / Municipal Veterinary & Animal Health Unit',
			icon: '💉',
			badgeColor: 'border-amber-300 bg-amber-50 text-amber-900',
			accentColor: '#d97706',
			downloadFormName: 'Veterinary Supply Requisition Slip',
			downloadFormUrl: '#download-vet-slip',
			requirements: [
				{
					group: 'Requirements',
					items: [
						'Direct verbal or written request from the livestock owner/raiser',
						'RSBSA Number or valid livestock inventory records',
						'Program guidelines compliance (e.g. proof of animal head count)'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Request Veterinary Supplies',
					desc: 'Owner presents request and specifies animal type, condition, and provides RSBSA number.',
					duration: '1 minute'
				},
				{
					stepNum: 2,
					title: 'Assessment & Record Verification',
					desc: 'Livestock technician evaluates dosage requirement against municipal animal health registry.',
					duration: '2 minutes'
				},
				{
					stepNum: 3,
					title: 'Release of Medicine & Advisory',
					desc: 'Veterinary medicines or vaccines are dispensed along with instructions on proper administration.',
					duration: '2 minutes'
				}
			],
			legalBasis: 'Animal Welfare Act (RA 8485 as amended) & Bureau of Animal Industry Protocols'
		},
		{
			id: 'livestock-dispersal',
			serviceNumber: 8,
			sectionId: 'livestock',
			sectionName: 'Livestock Section',
			sectionBadge: 'Livestock Services',
			title: 'Livestock Dispersal Program',
			shortDesc:
				'Breeding stock dispersal (cattle, swine, goats) to augment household income and expand local production.',
			fullDesc:
				'Livestock dispersal provides qualified smallholders with breeding stock to support household livelihood, enhance municipal livestock genetics, and foster income-generating capacity through a rolling dispersal agreement.',
			beneficiaryTag: 'livestock',
			beneficiaries: 'Qualified farmers, livestock raisers, and agricultural households',
			processingTime: 'Subject to validation & batch stock availability',
			timeMinutes: 2880,
			fees: 'None (100% Free Public Dispersal Program)',
			unit: 'Livestock Section / Dispersal & Field Validation Unit',
			icon: '🐂',
			badgeColor: 'border-amber-300 bg-amber-50 text-amber-900',
			accentColor: '#d97706',
			downloadFormName: 'Livestock Dispersal Application & Agreement Form',
			downloadFormUrl: '#download-livestock-agreement',
			requirements: [
				{
					group: 'Mandatory Application Packet',
					items: [
						'Letter Request addressed to the Local Chief Executive (Mayor)',
						'Valid RSBSA Registration Number',
						'Government or Barangay Valid ID',
						'Applicable registration/identification records or proof of pasture/housing capacity'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Submission of Letter of Intent',
					desc: 'Applicant submits letter request to the Mayor’s Office for formal endorsement.',
					duration: 'Step 1'
				},
				{
					stepNum: 2,
					title: 'Approval & Field Validation',
					desc: 'Request is forwarded to Municipal Agriculturist for farm inspection and forage capacity validation.',
					duration: 'Step 2'
				},
				{
					stepNum: 3,
					title: 'Signing of Dispersal Agreement',
					desc: 'Qualified applicant executes the dispersal contract specifying progeny turnover terms.',
					duration: 'Step 3'
				},
				{
					stepNum: 4,
					title: 'Inspection & Official Turnover',
					desc: 'Livestock technician verifies animal health tag and conducts official turnover to beneficiary.',
					duration: 'Step 4'
				}
			],
			legalBasis: 'LGU Municipal Livestock Multiplier & Dispersal Ordinance'
		},

		// Section C: Fisheries Section
		{
			id: 'rsbsa-nfrs-fisheries',
			serviceNumber: 9,
			sectionId: 'fisheries',
			sectionName: 'Fisheries Section',
			sectionBadge: 'Fisheries Section',
			title: 'RSBSA / NFRS Registration (Fisherfolk)',
			shortDesc:
				'National registration under RSBSA & NFRS for capture fishers, fish vendors, and aquaculture workers.',
			fullDesc:
				'Facilitates the formal registration of qualified fisherfolk under the Registry System for Basic Sectors in Agriculture and National Program for Municipal Fisherfolk Registration (RSBSA/NFRS) to establish baseline entitlement for municipal and BFAR interventions.',
			beneficiaryTag: 'fisherfolk',
			beneficiaries: 'Municipal fishers, fish workers, gleaners, and aquaculture operators',
			processingTime: 'Approximately 15 minutes',
			timeMinutes: 15,
			fees: 'None (100% Free of Charge)',
			unit: 'Fisheries Section / NFRS Registration Desk',
			icon: '🐟',
			badgeColor: 'border-cyan-300 bg-cyan-50 text-cyan-900',
			accentColor: '#0e7490',
			downloadFormName: 'BFAR FishR / NFRS Registration Form',
			downloadFormUrl: '#download-fishr-form',
			requirements: [
				{
					group: 'Registration Requirements',
					items: [
						'Accomplished NFRS / FishR official registration form',
						'Valid Government ID / Voter’s ID',
						'Proof of fishing activity or livelihood (Barangay Certification of Residency & Fisherfolk Status)'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Secure & Fill Out Form',
					desc: 'Secure fisheries registration form from Fisheries desk or download online.',
					duration: '5 minutes'
				},
				{
					stepNum: 2,
					title: 'Submit Supporting Documents',
					desc: 'Submit form together with Barangay Certification to assigned fisheries technician.',
					duration: '3 minutes'
				},
				{
					stepNum: 3,
					title: 'Verification & Completeness Check',
					desc: 'Technician verifies coastal barangay jurisdiction and fishing gear classification.',
					duration: '4 minutes'
				},
				{
					stepNum: 4,
					title: 'Record Encoding & Control Number Issuance',
					desc: 'Details are encoded into the national database; official NFRS Reference Number is issued.',
					duration: '3 minutes'
				}
			],
			legalBasis: 'Philippine Fisheries Code of 1998 (RA 8550 as amended by RA 10654)'
		},
		{
			id: 'fisherfolk-registration',
			serviceNumber: 10,
			sectionId: 'fisheries',
			sectionName: 'Fisheries Section',
			sectionBadge: 'Fisheries Section',
			title: 'Fisherfolk Registration (Municipal Database)',
			shortDesc:
				'Enlistment in the municipal fisherfolk registry for local assistance, fuel subsidies, and safety permits.',
			fullDesc:
				'Maintains an up-to-date municipal directory of individuals actively engaged in fishing, gleaning, seaweed farming, and aquaculture in Tanauan coastal waters to facilitate access to local emergency aid, gear distribution, and coastal training.',
			beneficiaryTag: 'fisherfolk',
			beneficiaries: 'Fisherfolk and coastal community workers within the municipality',
			processingTime: 'Approximately 15 minutes',
			timeMinutes: 15,
			fees: 'None (100% Free of Charge)',
			unit: 'Fisheries Section / Agricultural Technician on Fisheries',
			icon: '🎣',
			badgeColor: 'border-cyan-300 bg-cyan-50 text-cyan-900',
			accentColor: '#0e7490',
			downloadFormName: 'Municipal Fisherfolk Registration Form',
			downloadFormUrl: '#download-fisherfolk-reg',
			requirements: [
				{
					group: 'Requirements',
					items: [
						'Accomplished Municipal Fisherfolk Registration Form',
						'Valid Government or Barangay ID',
						'1x1 or 2x2 photo for fisherfolk ID card',
						'Other applicable supporting documents (e.g. boat name if applicable)'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Form Accomplishment',
					desc: 'Fisher accomplishes registration form detailing fishing gears and primary catching grounds.',
					duration: '5 minutes'
				},
				{
					stepNum: 2,
					title: 'Submission to Fisheries Desk',
					desc: 'Submit documents directly to the Agricultural Technician on Fisheries.',
					duration: '3 minutes'
				},
				{
					stepNum: 3,
					title: 'Verification of Credentials',
					desc: 'Technician verifies identity and validates fishing activities within municipal waters.',
					duration: '4 minutes'
				},
				{
					stepNum: 4,
					title: 'Database Logging & Certificate Issuance',
					desc: 'Registration is confirmed and recorded; municipal fisherfolk number provided.',
					duration: '3 minutes'
				}
			],
			legalBasis: 'Municipal Fisheries Ordinance & Tanauan Coastal Resource Management Plan'
		},
		{
			id: 'boat-registration',
			serviceNumber: 11,
			sectionId: 'fisheries',
			sectionName: 'Fisheries Section',
			sectionBadge: 'Fisheries Section',
			title: 'Boat Registration – 3 Gross Tonnage and Below (BoatR)',
			shortDesc:
				'Physical measurement, admeasurement, and licensing for motorized and non-motorized municipal fishing bancas.',
			fullDesc:
				'Facilitates official documentation, admeasurement, and licensing of fishing boats with a capacity of 3 gross tons and below to establish legal ownership, comply with maritime regulations, support marine conservation, and qualify owners for government fishing gear subsidies.',
			beneficiaryTag: 'fisherfolk',
			beneficiaries: 'Fisherfolk and boat owners operating craft of 3 gross tons and below',
			processingTime: '~Half a day (Measurement) + 10 mins (Recording)',
			timeMinutes: 250,
			fees: 'None at MAO intake counter (100% Free Inspection)',
			unit: 'Fisheries Section / BoatR Admeasurement & Licensing Team',
			icon: '🚤',
			badgeColor: 'border-cyan-300 bg-cyan-50 text-cyan-900',
			accentColor: '#0e7490',
			downloadFormName: 'BoatR Admeasurement & Registration Form',
			downloadFormUrl: '#download-boatr-form',
			requirements: [
				{
					group: 'Required Application Documents',
					items: [
						'Letter Request addressed to the Municipal Agriculture Office',
						'Physical color photograph of the boat (full side view showing color and hull)',
						'Valid Government ID of the boat owner',
						'Proof of Ownership (Deed of Sale, official receipts of boat building materials, or notarized Affidavit of Ownership)'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Submit Letter Request',
					desc: 'Boat owner submits letter request and ownership documents to the Fisheries Technician.',
					duration: '5 minutes'
				},
				{
					stepNum: 2,
					title: 'Field Admeasurement & Physical Inspection',
					desc: 'Fisheries technicians conduct physical dimension measurement (length, breadth, depth) at the coastline.',
					duration: '~Half a day'
				},
				{
					stepNum: 3,
					title: 'Accomplish Official BoatR Papers',
					desc: 'Owner signs verified admeasurement worksheet and registration application form.',
					duration: '10 minutes'
				},
				{
					stepNum: 4,
					title: 'Database Entry & Municipal Boat Plate Issuance',
					desc: 'Complete records are entered into the municipal BoatR database and license clearance is issued.',
					duration: '10 minutes'
				}
			],
			legalBasis: 'DILP-DA-DOTC Joint Memorandum Circular on BoatR Registration'
		},
		{
			id: 'fingerlings-dispersal',
			serviceNumber: 12,
			sectionId: 'fisheries',
			sectionName: 'Fisheries Section',
			sectionBadge: 'Fisheries Section',
			title: 'Fingerlings Dispersal (Tilapia & Carp)',
			shortDesc:
				'Coordination with BFAR for high-quality fingerling stocking in inland ponds, dams, and communal bodies.',
			fullDesc:
				'Facilitates the distribution of quality fingerlings in close coordination with the Bureau of Fisheries and Aquatic Resources (BFAR Region VIII) to qualified pond operators and communal water projects to boost inland fish output and food security.',
			beneficiaryTag: 'fisherfolk',
			beneficiaries: 'Qualified fisherfolk, fishpond operators, communal water associations',
			processingTime: '~1 day site inspection + ~3 weeks BFAR approval + 1 hour release',
			timeMinutes: 3000,
			fees: 'None (Subsidized BFAR & LGU Public Stocking)',
			unit: 'Fisheries Section in coordination with BFAR Region VIII',
			icon: '🐟',
			badgeColor: 'border-cyan-300 bg-cyan-50 text-cyan-900',
			accentColor: '#0e7490',
			downloadFormName: 'BFAR Fingerlings Dispersal Request (Individual / Assoc)',
			downloadFormUrl: '/forms/agriculture/MAO_FINGERLINGS_REQUEST_FORM1_-_INDIVIDUAL.pdf',
			requirements: [
				{
					group: 'Application Requirements',
					items: [
						'Valid RSBSA / NFRS Reference Number',
						'Accomplished Fingerling Request Form',
						'Valid ID of the requesting party or association president',
						'Satisfactory pond site inspection / pond water quality qualification'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Application & Farm Site Inspection',
					desc: 'Beneficiary submits request. Fisheries staff conduct field inspection of pond dimensions and water parameters.',
					duration: '~1 day'
				},
				{
					stepNum: 2,
					title: 'Technical Endorsement to BFAR',
					desc: 'MAO prepares technical endorsement and transmits requisition to BFAR Regional Hatchery for approval.',
					duration: '~3 weeks'
				},
				{
					stepNum: 3,
					title: 'Release, Briefing & Water Acclimatization',
					desc: 'Beneficiary receives technical briefing on feeds/acclimatization before fingerlings are released.',
					duration: '~1 hour'
				}
			],
			legalBasis: 'BFAR Inland Aquaculture Assistance Program'
		},
		{
			id: 'bantay-dagat-enforcement',
			serviceNumber: 13,
			sectionId: 'fisheries',
			sectionName: 'Fisheries Section',
			sectionBadge: 'Fisheries Section',
			title: 'Fishery Law Enforcement / Bantay Dagat Assistance',
			shortDesc:
				'24/7 coastal patrol, marine sanctuary protection, and enforcement against illegal, unreported & unregulated fishing.',
			fullDesc:
				'The Municipal Agriculture Office, through the Fishery Law Enforcement Team (Bantay Dagat), protects municipal waters, preserves coastal biodiversity, enforces fishery regulations, and assists municipal fishers in safe maritime navigation.',
			beneficiaryTag: 'fisherfolk',
			beneficiaries: 'Fisherfolk, coastal barangays, and the marine environment of Tanauan',
			processingTime: 'Immediate dispatch / 24/7 On-call response',
			timeMinutes: 1,
			fees: 'None (100% Free Public Protective Service)',
			unit: 'Bantay Dagat / Fishery Law Enforcement Team & PNP Maritime',
			icon: '⚓',
			badgeColor: 'border-cyan-300 bg-cyan-50 text-cyan-900',
			accentColor: '#0e7490',
			downloadFormName: 'Illegal Fishing Incident Report Form',
			downloadFormUrl: '#download-bantay-dagat-form',
			requirements: [
				{
					group: 'Intake / Assistance Requirements',
					items: [
						'Report of illegal fishing activity / incident notification',
						'Request for coastal seaborne patrol or search-and-rescue assistance',
						'Coordination from Barangay Fisheries and Aquatic Resource Management Council (MFARMC/BFARMC)'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Incident Intake & Logging',
					desc: 'Bantay Dagat operations desk logs coordinate details, suspicious vessels, or emergency assistance request.',
					duration: 'Immediate'
				},
				{
					stepNum: 2,
					title: 'Tactical Deployment & Seaborne Patrol',
					desc: 'Team deploys patrol vessel to enforce marine laws, inspect fishing gears, or conduct coastal monitoring.',
					duration: 'On-demand'
				},
				{
					stepNum: 3,
					title: 'Documentation & Multi-Agency Coordination',
					desc: 'Violations are documented; coordinates with Tanauan PNP, Coast Guard, and Legal Officer for prosecution.',
					duration: 'Standard protocol'
				}
			],
			legalBasis: 'Republic Act 10654 & Tanauan Municipal Coastal Environment Code'
		},

		// Section D: Institutional Development Section
		{
			id: 'association-registration',
			serviceNumber: 14,
			sectionId: 'institutional',
			sectionName: 'Institutional Development Section',
			sectionBadge: 'Institutional Development',
			title: 'Assistance on Registration of Associations',
			shortDesc:
				'Technical guidance in drafting constitutions, by-laws, and securing accreditation from DOLE, SEC, or CDA.',
			fullDesc:
				'Provides technical advisory assistance to farmers, fisherfolk, and rural livelihood associations in organizing formal groups, establishing governance structures, and completing mandatory accreditation documents for DOLE, SEC, or CDA.',
			beneficiaryTag: 'associations',
			beneficiaries: 'Farmers, fisherfolk, rural women, and youth livelihood associations',
			processingTime: '~1 day consultation + ~20 minutes document check',
			timeMinutes: 1460,
			fees: 'None (100% Free Technical Assistance)',
			unit: 'Institutional Development Section / Cooperatives & Associations Officer',
			icon: '🤝',
			badgeColor: 'border-indigo-300 bg-indigo-50 text-indigo-900',
			accentColor: '#4338ca',
			downloadFormName: 'Association By-Laws & Charter Template',
			downloadFormUrl: '#download-assoc-template',
			requirements: [
				{
					group: 'Document Checklist',
					items: [
						'Letter Request addressed to the Municipal Agriculture Office',
						'Proposed organization name and roster of interim officers and members',
						'List of officers with complete addresses and contact numbers',
						'Draft Constitution and By-Laws (CBL)',
						'Community Tax Certificate (CTC / Sedula) of officers for notarization'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Submission of Letter Request',
					desc: 'Association submits formal request seeking organizational advisory and registration support.',
					duration: '5 minutes'
				},
				{
					stepNum: 2,
					title: 'Consultation & By-Laws Drafting Session',
					desc: 'MAO holds organizational meeting to discuss regulatory requirements and guide CBL drafting.',
					duration: '~1 day'
				},
				{
					stepNum: 3,
					title: 'Accomplishment of Official Charter Forms',
					desc: 'Association finalizes charter documents, member profiles, and notarized resolutions.',
					duration: 'Variable'
				},
				{
					stepNum: 4,
					title: 'Document Verification & Agency Endorsement',
					desc: 'MAO reviews packet (~20 mins) and prepares endorsement to DOLE, SEC, or CDA.',
					duration: '~20 minutes'
				}
			],
			legalBasis: 'Local Government Code of 1991 (NGO/PO Accreditation) & DOLE D.O. 40-03'
		},
		{
			id: 'livelihood-assistance',
			serviceNumber: 15,
			sectionId: 'institutional',
			sectionName: 'Institutional Development Section',
			sectionBadge: 'Institutional Development',
			title: 'Agricultural Livelihood Assistance',
			shortDesc:
				'Connecting organized groups to capital, processing tools, value-adding equipment, and enterprise funds.',
			fullDesc:
				'Helps qualified farmers, fisherfolk, and registered community associations access municipal, national, and grant-funded livelihood programs, food processing equipment, and micro-enterprise funding to improve rural household income.',
			beneficiaryTag: 'associations',
			beneficiaries: 'Qualified farmers, fisherfolk, and accredited community associations',
			processingTime: '~2 Working Days total processing upon receipt',
			timeMinutes: 2880,
			fees: 'None (100% Free Public Program)',
			unit: 'Institutional Development Section / Enterprise Development Coordinator',
			icon: '💼',
			badgeColor: 'border-indigo-300 bg-indigo-50 text-indigo-900',
			accentColor: '#4338ca',
			downloadFormName: 'Livelihood Assistance Project Proposal Template',
			downloadFormUrl: '#download-livelihood-proposal',
			requirements: [
				{
					group: 'Application Packet',
					items: [
						'Letter Request addressed to the Local Chief Executive (Mayor)',
						'Valid IDs of key association officers and list of target beneficiaries',
						'Community Tax Certificate (CTC / Sedula)',
						'Financial Statement / Bank Account details of the Association',
						'Business Permit or Municipal Registration Certificate (when applicable)'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Letter Request Submission',
					desc: 'Applicant submits letter of intent with project proposal to the Mayor’s Office.',
					duration: 'Step 1'
				},
				{
					stepNum: 2,
					title: 'Endorsement to MAO',
					desc: 'Mayor’s Office evaluates and routes approved request to MAO for technical appraisal.',
					duration: 'Step 2'
				},
				{
					stepNum: 3,
					title: 'Field Evaluation & Document Preparation',
					desc: 'MAO evaluates project feasibility, verifies beneficiaries, and prepares release voucher.',
					duration: 'Step 3'
				},
				{
					stepNum: 4,
					title: 'Release & Enterprise Monitoring',
					desc: 'Facilitates turnover of livelihood equipment or grant funds subject to quarterly auditing.',
					duration: '~2 days total'
				}
			],
			legalBasis: 'Tanauan Rural Enterprise Development Policy & DILG Community Livelihood Mandate'
		},

		// Section E: Philippine Coconut Authority (PCA) Services
		{
			id: 'pca-rsbsa-registration',
			serviceNumber: 16,
			sectionId: 'pca',
			sectionName: 'Philippine Coconut Authority (PCA)',
			sectionBadge: 'PCA Services',
			title: 'PCA RSBSA / NCFRS Registration',
			shortDesc:
				'National Coconut Farmers Registry System enrollment to qualify for CFIDP scholarships, health, and farm inputs.',
			fullDesc:
				'Assists coconut farmers, farmworkers, and tenant-tillers in registering under the PCA-related RSBSA / National Coconut Farmers Registry System (NCFRS) to qualify for Coconut Farmers and Industry Development Plan (CFIDP) benefits, including educational assistance, crop insurance, hybrid seedlings, and medical support.',
			beneficiaryTag: 'farmers',
			beneficiaries: 'Coconut farmers, farmworkers, and tenant-tillers operating within Tanauan',
			processingTime: 'Approximately 10 minutes',
			timeMinutes: 10,
			fees: 'None (100% Free of Charge)',
			unit: 'PCA Helpdesk / MAO Coconut Development Focal Desk',
			icon: '🌴',
			badgeColor: 'border-teal-300 bg-teal-50 text-teal-900',
			accentColor: '#0f766e',
			downloadFormName: 'PCA NCFRS Registration Form',
			downloadFormUrl: '#download-pca-ncfrs',
			requirements: [
				{
					group: 'Required Documents',
					items: [
						'Accomplished PCA RSBSA / NCFRS Registration Form',
						'Valid Government-issued Identification Card',
						'Proof of land ownership, tenancy, or farming agreement (Land Title, Tax Dec, or Tenancy Cert)'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Secure & Accomplish PCA Form',
					desc: 'Coconut farmer secures official NCFRS form at the MAO/PCA counter.',
					duration: '4 minutes'
				},
				{
					stepNum: 2,
					title: 'Present Proof of Identity & Tillage',
					desc: 'Farmer presents valid ID and proof of coconut farm holding or tenant-tiller status.',
					duration: '3 minutes'
				},
				{
					stepNum: 3,
					title: 'Verification & National Registry Logging',
					desc: 'MAO PCA focal person verifies entries and logs records directly into the PCA NCFRS system.',
					duration: '3 minutes'
				}
			],
			legalBasis: 'Coconut Farmers and Industry Trust Fund Act (Republic Act 11524)'
		},
		{
			id: 'permit-cut-coconut',
			serviceNumber: 17,
			sectionId: 'pca',
			sectionName: 'Philippine Coconut Authority (PCA)',
			sectionBadge: 'PCA Services',
			title: 'Permit to Cut Coconut Trees (PTCA)',
			shortDesc:
				'Processing of documentary permits for cutting senile, damaged, or hazard-posing coconut trees under RA 8048 / 10593.',
			fullDesc:
				'Assists landowners and applicants in processing mandatory documentary requirements for obtaining a Permit to Cut Coconut Trees (PTCA) through the Philippine Coconut Authority (PCA) in strict compliance with the Coconut Preservation Act (Republic Act 8048 as amended by RA 10593).',
			beneficiaryTag: 'landowners',
			beneficiaries: 'Landowners, heirs, developers, and authorized representatives',
			processingTime: 'Inspection scheduled + PCA Permit Issuance',
			timeMinutes: 2880,
			fees: 'None at MAO intake counter (Official PCA statutory fees per PCA rules)',
			unit: 'Coconut Development Office (CDO) / Philippine Coconut Authority (PCA) Field Desk',
			icon: '🪓',
			badgeColor: 'border-teal-300 bg-teal-50 text-teal-900',
			accentColor: '#0f766e',
			downloadFormName: 'PCA Permit to Cut Coconut Trees (PTCA) Checklist & Form',
			downloadFormUrl: '/forms/agriculture/MAO_PERMISSION_TO_CUT_(PCA)_CHECKLIST.pdf',
			requirements: [
				{
					group: 'Documentary Checklist (As prescribed by RA 8048 / 10593)',
					items: [
						'Fully accomplished PTCA Application Form',
						'Latest Land Title / Free Patent / Tax Declaration (Photocopy)',
						'Government-issued ID Card of Landowner',
						'Barangay Certification on tree location and purpose of cutting',
						'Inspection Report signed by Coconut Development Officer (CDO)',
						'Certificate of Chainsaw Registration (Photocopy)',
						'Authorization Letter / Special Power of Attorney (SPA) if applicant is not the title owner',
						'Birth Certificate if applicant is the child of owner',
						'Program of Works and Notice to Proceed (if applicable for public works/construction)'
					]
				}
			],
			steps: [
				{
					stepNum: 1,
					title: 'Secure & Accomplish Application',
					desc: 'Secure and complete PTCA application form at the MAO/PCA service counter.',
					duration: '5 minutes'
				},
				{
					stepNum: 2,
					title: 'Submit Supporting Documents',
					desc: 'Submit form together with land title/tax declaration, ID, and registered chainsaw details.',
					duration: '5 minutes'
				},
				{
					stepNum: 3,
					title: 'Field Site Inspection by CDO',
					desc: 'Coconut Development Officer conducts field inspection and prepares official Inspection Report.',
					duration: 'Scheduled'
				},
				{
					stepNum: 4,
					title: 'PCA Packet Processing & Issuance',
					desc: 'Complete inspection packet is endorsed to PCA for final permit issuance and official receipting.',
					duration: 'Final issuance'
				}
			],
			legalBasis: 'Coconut Preservation Act of 1995 (RA 8048) as amended by RA 10593'
		}
	];

	// Filtered services logic
	const filteredServices = $derived(
		services.filter((svc) => {
			const matchesCategory = activeCategory === 'all' || svc.sectionId === activeCategory;
			const matchesBeneficiary =
				selectedBeneficiary === 'all' ||
				svc.beneficiaryTag === selectedBeneficiary ||
				svc.beneficiaries.toLowerCase().includes(selectedBeneficiary);
			const matchesSearch =
				!searchQuery.trim() ||
				svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				svc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
				svc.sectionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				svc.unit.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesBeneficiary && matchesSearch;
		})
	);

	function openModal(svc) {
		activeServiceModal = svc;
		// Initialize requirement checkboxes
		checkedRequirements = {};
	}

	function closeModal() {
		activeServiceModal = null;
	}

	function toggleRequirement(key) {
		checkedRequirements = {
			...checkedRequirements,
			[key]: !checkedRequirements[key]
		};
	}

	function handleKeydown(e) {
		if (e.key === 'Escape') {
			if (activeServiceModal) closeModal();
			if (isFormsModalOpen) isFormsModalOpen = false;
		}
	}

	function printServiceDetails() {
		if (typeof window !== 'undefined') {
			window.print();
		}
	}

	// General Procedure Roadmap Steps from Section IV
	const roadmapSteps = [
		{
			num: 1,
			title: 'Inquire at Section Desk',
			tagline: 'Initial Guidance & Counseling',
			desc: 'Approach the designated section desk (Crop, Livestock, Fisheries, Institutional, or PCA) at the Municipal Agriculture Office.',
			icon: '💬',
			tip: 'Our agricultural technicians will assess your specific request and guide you to the exact service form.'
		},
		{
			num: 2,
			title: 'Secure Official Form',
			tagline: 'Physical or Online Download',
			desc: 'Obtain the official application form directly from our counter or download it anytime via this municipal web portal.',
			icon: '📥',
			tip: 'Forms are completely free. You can print them at home to save time at the hall.'
		},
		{
			num: 3,
			title: 'Accomplish & Prepare Attachments',
			tagline: 'Documentation Readiness',
			desc: 'Fill out required forms completely and gather necessary proofs (valid ID, RSBSA number, land title, or barangay certificate).',
			icon: '✍️',
			tip: 'Double-check spelling of names and farm parcel boundaries to avoid delays during encoding.'
		},
		{
			num: 4,
			title: 'Submit for Intake Validation',
			tagline: 'Counter Evaluation',
			desc: 'Submit all papers to the assigned technician for immediate verification of completeness and eligibility.',
			icon: '📤',
			tip: 'All intake and assessment transactions are strictly 100% free of charge.'
		},
		{
			num: 5,
			title: 'Verification & Field Inspection',
			tagline: 'Technical Assessment',
			desc: 'Technicians verify database records or conduct field inspections (farm validation, pond site inspection, boat admeasurement).',
			icon: '🔍',
			tip: 'For boat or farm machinery requests, an on-site visit is scheduled within 24–48 hours.'
		},
		{
			num: 6,
			title: 'Processing & Program Release',
			tagline: 'Service Turnover',
			desc: 'Release of requested seed inputs, veterinary supplies, certificates, insurance transmittal, or approved permits.',
			icon: '🎉',
			tip: 'Beneficiaries receive a briefing on proper utilization and monitoring guidelines.'
		}
	];

	// Downloadable forms directory (Official PDF files from MAO)
	const downloadableFormsList = [
		{
			code: 'DA-MAO-RSBSA-2026',
			title: 'RSBSA Registration & Enrollment Form',
			category: 'Crops & Livestock',
			format: 'Official PDF Document',
			size: '853 KB',
			description: 'Official Department of Agriculture enrollment form for farmers, farmworkers, and agri stakeholders to qualify for national subsidies and insurance.',
			link: '/forms/agriculture/MAO_RSBSA_REGISTRATION_FORM.pdf',
			icon: '📋',
			badge: 'DA Standard'
		},
		{
			code: 'PCIC-RO8-RC-UPI-0',
			title: 'PCIC Rice & Corn Crop Insurance Application',
			category: 'Crop Insurance',
			format: 'Official PDF Document',
			size: '930 KB',
			description: 'Philippine Crop Insurance Corporation (PCIC Region VIII) application form for individual rice and corn crop protection against calamities, floods, and pests.',
			link: '/forms/agriculture/MAO_PCIC_APPLICATION_FORM.pdf',
			icon: '🛡️',
			badge: 'PCIC Region 8'
		},
		{
			code: 'PCIC-RO8-CLAIM-01',
			title: 'PCIC Claims of Indemnity (Paghahabol Bayad)',
			category: 'Crop Insurance',
			format: 'Official PDF Document',
			size: '848 KB',
			description: 'Official notice of loss and claims form for insured farmers seeking indemnity reimbursement following typhoon, flood, or pest damage.',
			link: '/forms/agriculture/MAO_PCIC_CLAIMS_OF_IDEMNITY.pdf',
			icon: '📑',
			badge: 'PCIC Region 8'
		},
		{
			code: 'MAO-MACH-REQ',
			title: 'Letter Request for Farm Machineries & Tractor (Waray Template)',
			category: 'Crop Section / Mechanization',
			format: 'Official PDF Document',
			size: '241 KB',
			description: 'Official letter request template in Waray addressed to Municipal Mayor Hon. Ma. Gina E. Merilo for borrowing and field scheduling of municipal tractors.',
			link: '/forms/agriculture/MAO_LETTER_REQUEST_FOR_MACHINERIES.pdf',
			icon: '🚜',
			badge: 'LGU Tanauan'
		},
		{
			code: 'BFAR-RFAPC-FORM-01',
			title: 'BFAR Fingerlings Dispersal Request (Individual)',
			category: 'Fisheries & Aquaculture',
			format: 'Official PDF Document',
			size: '381 KB',
			description: 'Bureau of Fisheries and Aquatic Resources (BFAR Region 8) & MAO Grow-Out fingerling requisition form for individual fishers and pond operators.',
			link: '/forms/agriculture/MAO_FINGERLINGS_REQUEST_FORM1_-_INDIVIDUAL.pdf',
			icon: '🐟',
			badge: 'BFAR Region 8'
		},
		{
			code: 'BFAR-RFAPC-FORM-02',
			title: 'BFAR Fingerlings Dispersal Request (Association / Group)',
			category: 'Fisheries & Aquaculture',
			format: 'Official PDF Document',
			size: '413 KB',
			description: 'BFAR Region 8 request form and member roster attachment for accredited fisherfolk associations and communal water management groups.',
			link: '/forms/agriculture/MAO_FINGERLINGS_REQUEST_FORM2_-_ASSOC_OR_GROUP.pdf',
			icon: '👥',
			badge: 'BFAR Region 8'
		},
		{
			code: 'PCA-CDO-PTCA-2026',
			title: 'PCA Permit to Cut Coconut Trees (PTCA) Checklist & Application',
			category: 'PCA Coconut Services',
			format: 'Official PDF Document',
			size: '552 KB',
			description: 'Complete documentary requirements checklist, chainsaw registration details, and application form for coconut cutting permits under RA 8048 / 10593.',
			link: '/forms/agriculture/MAO_PERMISSION_TO_CUT_(PCA)_CHECKLIST.pdf',
			icon: '🌴',
			badge: 'PCA Regional'
		}
	];
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- MAIN SERVICES PORTAL CONTAINER -->
<section
	id="services"
	class="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-28 text-slate-800"
>
	<!-- Subtle Royal Blue & Amber Background Gradients -->
	<div
		class="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-blue-700/10 blur-3xl"
	></div>

	<div class="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- 1. HEADER / HERO SECTION -->
		<div class="mb-14 text-center lg:text-left">
			<div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-slate-200">
				<div class="max-w-3xl">
					<!-- Pill Badge -->
					<div
						class="inline-flex items-center gap-2 rounded-full border border-blue-900/20 bg-blue-950 px-4 py-1.5 text-xs font-black tracking-wider text-amber-300 uppercase shadow-xs transition-transform hover:scale-105"
					>
						<span class="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
						<span>Official Citizen's Charter // MAO Tanauan</span>
					</div>

					<!-- Portal Title -->
					<h2
						class="mt-4 text-3xl font-black tracking-tight text-blue-950 sm:text-4xl lg:text-5xl"
					>
						Municipal Agriculture Office
						<span
							class="block bg-gradient-to-r from-blue-900 via-blue-800 to-amber-600 bg-clip-text text-transparent"
						>
							Services Portal & Directory
						</span>
					</h2>

					<!-- Subtitle / Tagline -->
					<p class="mt-4 text-base leading-relaxed font-normal text-slate-700 sm:text-lg">
						Committed to empowering Tanauan's farmers, fisherfolk, livestock raisers, and agricultural
						cooperatives. Transparent guidelines, step-by-step citizen charter procedures, and
						<strong class="font-bold text-blue-950 underline decoration-amber-400 decoration-2 underline-offset-4">
							100% free frontline public services
						</strong>
						at the intake counter.
					</p>
				</div>

				<!-- Quick Highlights Box -->
				<div class="flex flex-wrap items-center justify-center lg:justify-end gap-3 shrink-0">

					<a
						href="#general-procedure"
						class="inline-flex items-center gap-2 rounded-xl border-2 border-blue-950 bg-white hover:bg-blue-50 text-blue-950 font-black px-5 py-3 shadow-xs transition-all hover:scale-105 active:scale-95 text-sm"
					>
						<span>General Procedure</span>
						<span class="text-amber-500 font-bold">↓</span>
					</a>
				</div>
			</div>

			<!-- Live Stats Bar -->
			<div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
				<div
					class="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs text-center transition-all hover:border-amber-400 hover:shadow-md"
				>
					<div class="text-3xl font-black text-blue-950">17</div>
					<div class="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
						Frontline Services
					</div>
					<div class="mt-0.5 text-[11px] text-emerald-700 font-bold">Comprehensive Charter</div>
				</div>

				<div
					class="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs text-center transition-all hover:border-amber-400 hover:shadow-md"
				>
					<div class="text-3xl font-black text-amber-600">₱0.00</div>
					<div class="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
						Intake Counter Fees
					</div>
					<div class="mt-0.5 text-[11px] text-emerald-700 font-bold">100% Free of Charge</div>
				</div>

				<div
					class="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs text-center transition-all hover:border-amber-400 hover:shadow-md"
				>
					<div class="text-3xl font-black text-blue-950">5</div>
					<div class="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
						Specialized Sections
					</div>
					<div class="mt-0.5 text-[11px] text-slate-600 font-bold">Crops, Livestock, Fish, Org, PCA</div>
				</div>

				<div
					class="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs text-center transition-all hover:border-amber-400 hover:shadow-md"
				>
					<div class="text-3xl font-black text-blue-900">54</div>
					<div class="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
						Barangays Reached
					</div>
					<div class="mt-0.5 text-[11px] text-blue-700 font-bold">Tanauan Municipal-Wide</div>
				</div>
			</div>
		</div>

		<!-- 2. SEARCH & FILTER CONTROLS -->
		<div
			class="mb-10 rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all"
		>
			<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
				<!-- Search Input -->
				<div class="relative flex-1">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
						<svg
							class="h-5 w-5 text-slate-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search by service name, seeds, boat, vaccine, permit, or requirements..."
						class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pr-10 pl-11 text-sm font-medium text-slate-900 placeholder-slate-400 transition-all focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-blue-900/20 focus:outline-none"
					/>
					{#if searchQuery}
						<button
							type="button"
							onclick={() => (searchQuery = '')}
							class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
							title="Clear search"
						>
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					{/if}
				</div>

				<!-- Beneficiary Quick Filter -->
				<div class="flex items-center gap-2">
					<label for="beneficiary-select" class="text-xs font-bold text-slate-500 uppercase shrink-0">
						Beneficiary:
					</label>
					<select
						id="beneficiary-select"
						bind:value={selectedBeneficiary}
						class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-blue-950 focus:border-blue-900 focus:outline-none cursor-pointer"
					>
						{#each beneficiariesList as b}
							<option value={b.id}>{b.label}</option>
						{/each}
					</select>
				</div>
			</div>

			<!-- Category Filter Tabs -->
			<div class="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
				<span class="mr-1 text-xs font-extrabold tracking-wider text-slate-400 uppercase">
					Section:
				</span>
				{#each categories as cat}
					<button
						type="button"
						onclick={() => (activeCategory = cat.id)}
						class="group inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-extrabold transition-all {activeCategory ===
						cat.id
							? 'bg-blue-950 text-amber-300 shadow-sm scale-105'
							: 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-blue-950'}"
					>
						<span>{cat.icon}</span>
						<span>{cat.label}</span>
						<span
							class="rounded-full px-1.5 py-0.5 text-[10px] font-black transition-colors {activeCategory ===
							cat.id
								? 'bg-amber-400 text-blue-950'
								: 'bg-white text-slate-600 group-hover:bg-blue-100'}"
						>
							{cat.count}
						</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- 3. SERVICES GRID -->
		<div class="mb-14">
			<div class="mb-4 flex items-center justify-between">
				<div class="text-xs font-black tracking-wider text-slate-500 uppercase">
					Showing <span class="text-blue-950 font-black">{filteredServices.length}</span> of {services.length}
					services
				</div>
				{#if searchQuery || activeCategory !== 'all' || selectedBeneficiary !== 'all'}
					<button
						type="button"
						onclick={() => {
							searchQuery = '';
							activeCategory = 'all';
							selectedBeneficiary = 'all';
						}}
						class="text-xs font-bold text-blue-900 hover:underline cursor-pointer"
					>
						Reset all filters
					</button>
				{/if}
			</div>

			{#if filteredServices.length === 0}
				<!-- Empty State -->
				<div
					class="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center shadow-xs"
				>
					<div class="text-5xl">🌾</div>
					<h3 class="mt-4 text-lg font-black text-blue-950">No matching services found</h3>
					<p class="mt-1 text-sm text-slate-600">
						Try adjusting your search keywords or clearing your category filters.
					</p>
					<button
						type="button"
						onclick={() => {
							searchQuery = '';
							activeCategory = 'all';
							selectedBeneficiary = 'all';
						}}
						class="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-950 px-4 py-2 text-xs font-black text-amber-300 shadow-xs hover:bg-blue-900"
					>
						Show All 17 Services
					</button>
				</div>
			{:else}
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each filteredServices as svc (svc.id)}
						<!-- Service Card with Rich Hover Lift & Amber Glow -->
						<div
							role="button"
							tabindex="0"
							onclick={() => openModal(svc)}
							onkeydown={(e) => e.key === 'Enter' && openModal(svc)}
							class="group relative flex flex-col justify-between rounded-3xl border-2 border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-blue-900"
						>
							<!-- Top Header Info -->
							<div>
								<div class="mb-4 flex items-center justify-between gap-2">
									<!-- Section Tag Badge -->
									<span
										class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wider {svc.badgeColor}"
									>
										<span class="text-xs">{svc.icon}</span>
										<span>{svc.sectionBadge}</span>
									</span>

									<!-- Service Number Pill -->
									<span
										class="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-black text-slate-600 group-hover:bg-amber-400 group-hover:border-amber-400 group-hover:text-blue-950 transition-colors"
									>
										SVC #{svc.serviceNumber.toString().padStart(2, '0')}
									</span>
								</div>

								<!-- Service Title -->
								<h3
									class="mb-2 text-lg font-black leading-snug text-blue-950 group-hover:text-blue-900 transition-colors"
								>
									{svc.title}
								</h3>

								<!-- Short Description -->
								<p class="mb-4 text-xs leading-relaxed text-slate-600">
									{svc.shortDesc}
								</p>

								<!-- Key Metrics Row -->
								<div class="mb-4 space-y-2 rounded-2xl bg-slate-50/80 p-3 text-xs border border-slate-100">
									<!-- Beneficiaries -->
									<div class="flex items-start gap-2">
										<span class="text-slate-400 shrink-0">👥</span>
										<div class="leading-tight text-slate-700">
											<span class="font-bold text-slate-900">For:</span> {svc.beneficiaries}
										</div>
									</div>

									<!-- Processing Time -->
									<div class="flex items-center justify-between text-[11px]">
										<span class="inline-flex items-center gap-1 font-semibold text-slate-600">
											<svg class="h-3.5 w-3.5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
											{svc.processingTime}
										</span>

										<span class="inline-flex items-center gap-1 font-black text-emerald-700">
											<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
											100% Free
										</span>
									</div>
								</div>
							</div>

							<!-- Card Footer Actions -->
							<div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
								{#if svc.downloadFormUrl && svc.downloadFormUrl.startsWith('/forms/')}
									<a
										href={svc.downloadFormUrl}
										download
										target="_blank"
										rel="noopener noreferrer"
										onclick={(e) => e.stopPropagation()}
										class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 px-2.5 py-1 text-[11px] font-black hover:bg-emerald-100 transition-colors shadow-2xs"
										title="Download Official PDF Form"
									>
										<span>📥 PDF Form</span>
										<span>↓</span>
									</a>
								{:else}
									<span class="font-bold text-blue-900 group-hover:underline flex items-center gap-1">
										<span>Citizen's Charter</span>
										<span class="transition-transform group-hover:translate-x-0.5">→</span>
									</span>
								{/if}

								<button
									type="button"
									onclick={(e) => {
										e.stopPropagation();
										openModal(svc);
									}}
									class="inline-flex items-center gap-1 rounded-xl bg-blue-950 px-3.5 py-1.5 text-xs font-black text-amber-300 shadow-2xs transition-all group-hover:bg-blue-900 active:scale-95"
								>
									<span>View Guide</span>
									<span>↗</span>
								</button>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>


		<!-- 4. SECTION IV: GENERAL PROCEDURE ROADMAP (Citizen Workflow) -->
		<div id="general-procedure" class="mb-16 scroll-mt-24">
			<div
				class="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden"
			>
				<div class="mb-8 max-w-3xl">
					<div
						class="mb-2 inline-flex items-center gap-1.5 rounded-md border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-black tracking-wider text-amber-950 uppercase"
					>
						<span>PDF Section IV // General Workflow</span>
					</div>
					<h3 class="text-2xl font-black text-blue-950 sm:text-3xl">
						General Procedure for Availing Services
					</h3>
					<p class="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
						All clients seeking agricultural inputs, registrations, permits, or veterinary assistance
						from the Municipal Agriculture Office follow these standard citizen charter steps.
					</p>
				</div>

				<!-- Step-by-Step Interactive Timeline -->
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each roadmapSteps as step}
						<div
							class="relative flex flex-col justify-between rounded-2xl border-2 p-5 transition-all duration-200 {activeProcedureStep ===
							step.num
								? 'border-blue-900 bg-blue-50/50 shadow-md -translate-y-1'
								: 'border-slate-200 bg-slate-50/60 hover:border-slate-300'}"
							role="button"
							tabindex="0"
							onclick={() => (activeProcedureStep = step.num)}
							onkeydown={(e) => e.key === 'Enter' && (activeProcedureStep = step.num)}
						>
							<div>
								<div class="mb-3 flex items-center justify-between">
									<span
										class="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-950 text-xs font-black text-amber-300 shadow-xs"
									>
										0{step.num}
									</span>
									<span class="text-xl">{step.icon}</span>
								</div>

								<div class="text-[11px] font-black uppercase tracking-wider text-blue-900">
									{step.tagline}
								</div>
								<h4 class="mt-1 text-base font-black text-slate-900">
									{step.title}
								</h4>
								<p class="mt-2 text-xs leading-relaxed text-slate-600">
									{step.desc}
								</p>
							</div>

							<!-- Citizen Tip Box -->
							<div
								class="mt-4 rounded-xl border border-amber-200/80 bg-amber-50/80 p-2.5 text-[11px] leading-snug text-amber-950"
							>
								<span class="font-bold text-amber-900">💡 Tip:</span> {step.tip}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- 5. CALL-TO-ACTION (CTA) & CONTACT HELPDESK SECTION -->
		<div
			class="rounded-3xl border-2 border-blue-950 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-8 sm:p-12 text-white shadow-xl relative overflow-hidden"
		>
			<div
				class="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-amber-400/10 blur-2xl"
			></div>

			<div class="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
				<div class="lg:col-span-7">
					<div
						class="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-black tracking-wider text-amber-300 uppercase"
					>
						<span>Direct Citizen Helpdesk // Anti-Red Tape Compliant</span>
					</div>

					<h3 class="mt-4 text-2xl font-black text-white sm:text-3xl lg:text-4xl">
						Have Questions or Need Assistance with Your Farm or Fishery?
					</h3>

					<p class="mt-3 text-sm leading-relaxed text-blue-100 sm:text-base">
						Visit our frontline intake windows at the Tanauan Municipal Hall. In compliance with
						Republic Act 11032, our staff operate with
						<strong class="text-amber-300 font-bold">No Noon Break</strong> to serve you seamlessly.
					</p>

					<!-- Info Highlights -->
					<div class="mt-6 grid gap-4 sm:grid-cols-2 text-xs">
						<div class="flex items-start gap-3 rounded-2xl bg-white/10 p-3.5 backdrop-blur-xs">
							<span class="text-lg">📍</span>
							<div>
								<div class="font-bold uppercase tracking-wider text-amber-300">Office Location</div>
								<div class="mt-0.5 text-blue-100 leading-snug">{officeLocation}</div>
							</div>
						</div>

						<div class="flex items-start gap-3 rounded-2xl bg-white/10 p-3.5 backdrop-blur-xs">
							<span class="text-lg">🕒</span>
							<div>
								<div class="font-bold uppercase tracking-wider text-amber-300">Service Hours</div>
								<div class="mt-0.5 text-blue-100 leading-snug">{officeHours}</div>
							</div>
						</div>

						<div class="flex items-start gap-3 rounded-2xl bg-white/10 p-3.5 backdrop-blur-xs">
							<span class="text-lg">📞</span>
							<div>
								<div class="font-bold uppercase tracking-wider text-amber-300">Hotline Numbers</div>
								<div class="mt-0.5 text-blue-100 leading-snug">{contactNumber}</div>
							</div>
						</div>

						<div class="flex items-start gap-3 rounded-2xl bg-white/10 p-3.5 backdrop-blur-xs">
							<span class="text-lg">✉️</span>
							<div>
								<div class="font-bold uppercase tracking-wider text-amber-300">Official Email</div>
								<div class="mt-0.5 text-blue-100 leading-snug break-all">{email}</div>
							</div>
						</div>
					</div>
				</div>

				<div class="lg:col-span-5 flex flex-col gap-4">
					<div class="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md text-center">
						<div class="text-4xl mb-3">📄</div>
						<h4 class="text-lg font-black text-white">Download Citizen's Charter Forms</h4>
						<p class="mt-1 text-xs text-blue-200">
							Save time by printing RSBSA, PCIC insurance, and BoatR application forms prior to
							visiting.
						</p>

						<button
							type="button"
							onclick={() => (isFormsModalOpen = true)}
							class="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-blue-950 font-black py-3.5 px-6 shadow-lg transition-all hover:scale-105 active:scale-95 text-sm cursor-pointer"
						>
							<svg class="h-4 w-4 text-blue-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							<span>Open Forms Repository</span>
						</button>

						<a
							href="mailto:{email}?subject=Inquiry%20to%20Municipal%20Agriculture%20Office"
							class="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-6 transition-all text-xs"
						>
							<span>Send Official Email Inquiry ↗</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ========================================== -->
<!-- 6. INTERACTIVE SERVICE DETAILS MODAL       -->
<!-- ========================================== -->
{#if activeServiceModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
		transition:fade={{ duration: 200 }}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-service-title"
	>
		<!-- Backdrop -->
		<div
			class="fixed inset-0 bg-blue-950/70 backdrop-blur-sm"
			onclick={closeModal}
			role="button"
			tabindex="0"
			onkeydown={(e) => e.key === 'Enter' && closeModal()}
		></div>

		<!-- Modal Container -->
		<div
			class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-slate-300 bg-white shadow-2xl z-10"
			transition:scale={{ duration: 250, start: 0.95 }}
		>
			<!-- Modal Header with Royal Blue Gradient -->
			<div
				class="sticky top-0 z-20 flex items-start justify-between border-b border-blue-900/20 bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 p-6 text-white"
			>
				<div>
					<div class="flex flex-wrap items-center gap-2">
						<span
							class="rounded-full bg-amber-400 px-3 py-0.5 text-xs font-black text-blue-950 uppercase"
						>
							Service #{activeServiceModal.serviceNumber}
						</span>
						<span class="rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold text-white">
							{activeServiceModal.sectionName}
						</span>
						<span class="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-0.5 text-xs font-black">
							✓ 100% Free Public Intake
						</span>
					</div>

					<h2
						id="modal-service-title"
						class="mt-3 text-xl sm:text-2xl font-black leading-tight text-white"
					>
						{activeServiceModal.title}
					</h2>
				</div>

				<div class="flex items-center gap-2 shrink-0 ml-4">
					<button
						type="button"
						onclick={printServiceDetails}
						class="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-bold text-white transition-all"
						title="Print Guide"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
							/>
						</svg>
						<span>Print</span>
					</button>

					<button
						type="button"
						onclick={closeModal}
						class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
						title="Close (Esc)"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>

			<!-- Modal Body -->
			<div class="p-6 sm:p-8 space-y-8">
				<!-- Service Overview -->
				<div>
					<h3 class="text-xs font-black uppercase tracking-wider text-blue-900">
						Service Overview & Purpose
					</h3>
					<p class="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
						{activeServiceModal.fullDesc}
					</p>

					{#if activeServiceModal.legalBasis}
						<div class="mt-2 text-xs font-semibold text-slate-500 italic">
							Statutory / Regulatory Basis: {activeServiceModal.legalBasis}
						</div>
					{/if}
				</div>

				<!-- Quick Highlights Grid -->
				<div class="grid gap-4 sm:grid-cols-3">
					<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
						<div class="text-[11px] font-black uppercase tracking-wider text-slate-500">
							Target Beneficiaries
						</div>
						<div class="mt-1 text-xs font-black text-blue-950">
							{activeServiceModal.beneficiaries}
						</div>
					</div>

					<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
						<div class="text-[11px] font-black uppercase tracking-wider text-slate-500">
							Processing Time
						</div>
						<div class="mt-1 text-xs font-black text-blue-950">
							{activeServiceModal.processingTime}
						</div>
					</div>

					<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
						<div class="text-[11px] font-black uppercase tracking-wider text-slate-500">
							Responsible Unit
						</div>
						<div class="mt-1 text-xs font-black text-blue-950">
							{activeServiceModal.unit}
						</div>
					</div>
				</div>

				<!-- Required Documents / Interactive Checklist -->
				<div class="rounded-2xl border-2 border-slate-200 bg-slate-50/50 p-5 sm:p-6">
					<div class="flex items-center justify-between mb-4">
						<div>
							<h3 class="text-sm font-black uppercase tracking-wider text-blue-950">
								Required Documents / Checklist
							</h3>
							<p class="text-xs text-slate-500">
								Click any item below to tick it off your personal preparation checklist before visiting.
							</p>
						</div>
						<span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-950">
							Checklist Mode
						</span>
					</div>

					<div class="space-y-4">
						{#each activeServiceModal.requirements as reqGroup, gIdx}
							<div class="rounded-xl border border-slate-200 bg-white p-4">
								<h4 class="text-xs font-black uppercase tracking-wider text-blue-900 mb-2.5">
									{reqGroup.group}
								</h4>
								<ul class="space-y-2">
									{#each reqGroup.items as item, iIdx}
										{@const key = `${activeServiceModal.id}-${gIdx}-${iIdx}`}
										<li>
											<button
												type="button"
												onclick={() => toggleRequirement(key)}
												class="w-full text-left flex items-start gap-3 p-2 rounded-lg transition-colors hover:bg-slate-50 cursor-pointer"
											>
												<span
													class="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold transition-all {checkedRequirements[
														key
													]
														? 'border-emerald-600 bg-emerald-600 text-white'
														: 'border-slate-300 bg-white text-transparent'}"
												>
													✓
												</span>
												<span
													class="text-xs font-medium text-slate-800 leading-snug {checkedRequirements[
														key
													]
														? 'line-through text-slate-400 font-normal'
														: ''}"
												>
													{item}
												</span>
											</button>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</div>

				<!-- Step-by-Step Procedure / Citizen Workflow -->
				<div>
					<h3 class="text-sm font-black uppercase tracking-wider text-blue-950 mb-4">
						Step-by-Step Procedure & Citizen's Charter Workflow
					</h3>

					<ol class="space-y-3">
						{#each activeServiceModal.steps as step}
							<li
								class="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs"
							>
								<span
									class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-xs font-black text-amber-300 shadow-xs"
								>
									{step.stepNum}
								</span>
								<div class="flex-1">
									<div class="flex items-center justify-between gap-2">
										<h4 class="text-sm font-black text-slate-900">{step.title}</h4>
										<span
											class="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-blue-900 shrink-0"
										>
											⏱ {step.duration}
										</span>
									</div>
									<p class="mt-1 text-xs text-slate-600 leading-relaxed">
										{step.desc}
									</p>
								</div>
							</li>
						{/each}
					</ol>
				</div>

				<!-- Downloadable Form Notice if applicable -->
				{#if activeServiceModal.downloadFormName}
					<div
						class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/80 p-4"
					>
						<div class="flex items-center gap-3">
							<div
								class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-lg"
							>
								↓
							</div>
							<div>
								<div class="text-[10px] font-black uppercase tracking-wider text-emerald-800">
									Downloadable Form Available
								</div>
								<div class="text-sm font-black text-slate-900">
									{activeServiceModal.downloadFormName}
								</div>
							</div>
						</div>

						<div class="flex items-center gap-2">
							{#if activeServiceModal.downloadFormUrl && activeServiceModal.downloadFormUrl.startsWith('/forms/')}
								<a
									href={activeServiceModal.downloadFormUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-bold px-3 py-2 text-xs transition-all"
								>
									<span>View PDF ↗</span>
								</a>

								<a
									href={activeServiceModal.downloadFormUrl}
									download
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2 text-xs shadow-xs transition-all active:scale-95 shrink-0"
								>
									<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
									<span>Download PDF</span>
								</a>
							{:else}
								<button
									type="button"
									onclick={() => {
										isFormsModalOpen = true;
										closeModal();
									}}
									class="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2 text-xs shadow-xs transition-all active:scale-95 shrink-0"
								>
									<span>Get Form in Repository</span>
									<span>↗</span>
								</button>
							{/if}
						</div>
					</div>
				{/if}
			</div>

			<!-- Modal Footer -->
			<div
				class="sticky bottom-0 z-20 flex items-center justify-between border-t border-slate-200 bg-slate-50 p-4 sm:p-6"
			>
				<div class="text-xs text-slate-500">
					Intake Window: <strong class="text-slate-800">{activeServiceModal.unit}</strong>
				</div>
				<button
					type="button"
					onclick={closeModal}
					class="rounded-xl bg-blue-950 hover:bg-blue-900 text-amber-300 font-black px-5 py-2 text-xs shadow-xs transition-all hover:scale-105 active:scale-95"
				>
					Done / Close
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- ========================================== -->
<!-- 7. DOWNLOADABLE FORMS MODAL REPOSITORY     -->
<!-- ========================================== -->
{#if isFormsModalOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
		transition:fade={{ duration: 200 }}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-forms-title"
	>
		<!-- Backdrop -->
		<div
			class="fixed inset-0 bg-blue-950/70 backdrop-blur-sm"
			onclick={() => (isFormsModalOpen = false)}
			role="button"
			tabindex="0"
			onkeydown={(e) => e.key === 'Enter' && (isFormsModalOpen = false)}
		></div>

		<!-- Container -->
		<div
			class="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border-2 border-slate-300 bg-white shadow-2xl z-10"
			transition:scale={{ duration: 250, start: 0.95 }}
		>
			<div
				class="sticky top-0 z-20 flex items-center justify-between border-b border-blue-900/20 bg-blue-950 p-6 text-white"
			>
				<div>
					<div class="flex items-center gap-2">
						<span
							class="rounded-full bg-amber-400 px-3 py-0.5 text-xs font-black text-blue-950 uppercase"
						>
							Download Center
						</span>
						<span class="text-xs text-blue-200">
							{downloadableFormsList.length} Official Forms
						</span>
					</div>
					<h2 id="modal-forms-title" class="mt-2 text-xl font-black text-white">
						Municipal Agriculture Office Downloadable Forms
					</h2>
				</div>

				<button
					type="button"
					onclick={() => (isFormsModalOpen = false)}
					class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
				>
					✕
				</button>
			</div>

			<div class="p-6 space-y-4">
				<p class="text-xs text-slate-600">
					All forms are official local government templates and free of charge. You may print them,
					fill out details at home, and bring them directly to the MAO intake windows.
				</p>

				<div class="space-y-3">
					{#each downloadableFormsList as form}
						<div
							class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-amber-400 hover:bg-white hover:shadow-md"
						>
							<div>
								<div class="flex items-center gap-2">
									<span class="rounded bg-slate-200 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-700">
										{form.code}
									</span>
									<span class="text-xs font-bold text-blue-900 uppercase">
										{form.category}
									</span>
								</div>
								<h3 class="mt-1 text-sm font-black text-slate-900">{form.title}</h3>
								<p class="mt-0.5 text-xs text-slate-500 leading-snug">{form.description}</p>
								<div class="mt-1 text-[11px] text-slate-400">
									Format: <strong class="text-slate-600">{form.format}</strong> • Size: {form.size}
								</div>
							</div>

							<div class="flex items-center gap-2">
								<a
									href={form.link}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex shrink-0 items-center justify-center gap-1 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 px-3 py-2 text-xs font-bold transition-all"
								>
									<span>View ↗</span>
								</a>

								<a
									href={form.link}
									download
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-amber-300 px-4 py-2 text-xs font-black shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
								>
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
										/>
									</svg>
									<span>Download PDF</span>
								</a>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="sticky bottom-0 z-20 flex justify-end border-t border-slate-200 bg-slate-50 p-4">
				<button
					type="button"
					onclick={() => (isFormsModalOpen = false)}
					class="rounded-xl bg-blue-950 text-amber-300 font-black px-5 py-2 text-xs"
				>
					Close Forms
				</button>
			</div>
		</div>
	</div>
{/if}
