<script>
	import { onMount, tick } from 'svelte';
	import { fade, scale, fly } from 'svelte/transition';

	// ==========================================
	// OFFICIAL MUNICIPAL HEALTH OFFICE HIERARCHY
	// (Extracted directly from Official Tanauan MHO Chart PDF)
	// ==========================================

	// Executive Head of Office (Level 1)
	let mhoHead = $state({
		id: 'santo-arlene',
		name: 'Dr. Arlene V. Santo',
		position: 'Municipal Health Officer',
		roleCategory: 'Executive Healthcare Governance',
		badge: 'Head of Office / MHO',
		level: 1,
		color: '#f59e0b', // Amber / Gold
		glow: 'rgba(245, 158, 11, 0.4)',
		image: '/HealthOffice/santo-arlene.jpg',
		window: 'Office of the Municipal Health Officer',
		office: 'Rural Health Unit (RHU), Tanauan Municipal Health Center, Tanauan, Leyte',
		hours: 'Monday – Friday | 8:00 AM – 5:00 PM (24/7 Emergency Support)',
		contact: 'health@tanauanleyte.gov.ph',
		overview:
			'Directs the Municipal Health Office of Tanauan, administering municipal healthcare policies, primary care delivery, epidemiological surveillance, Universal Health Care (UHC) integration, and maternal-child health programs across all 54 barangays.',
		duties: [
			'Directs and oversees the implementation of all public health programs, clinical consultations, and primary care delivery',
			'Formulates the Local Municipal Health Plan in strict alignment with Department of Health (DOH) standards and Universal Health Care guidelines',
			'Exercises administrative, clinical, and technical supervision over the Rural Health Unit, birthing facilities, and 54 Barangay Health Stations',
			'Leads disease surveillance, epidemiological investigation, public health emergency operations, and municipal immunization campaigns'
		],
		services: [
			'General Clinical Consultations & Medical Certification',
			'Public Health Policy & Program Direction',
			'Universal Health Care (UHC) & PhilHealth Konsulta Oversight',
			'Medico-Legal Examination & Statutory Health Clearances'
		],
		expanded: true
	});

	// The 8 Clinical & Specialized Service Sections (Level 2 Main Row)
	let clinicalSections = $state([
		{
			id: 'sec-nursing',
			title: 'Nursing and Midwifery Services',
			shortTitle: 'Nursing & Midwifery',
			color: '#06b6d4', // Cyan
			glow: 'rgba(6, 182, 212, 0.35)',
			isMultiColumn: true,
			expanded: true,
			// Row 1
			row1: [
				{
					id: 'margallo-tita',
					name: 'Tita C. Margallo',
					position: 'Public Health Nurse II',
					roleCategory: 'Nursing and Midwifery Services',
					badge: 'Nurse II / Supervisor',
					color: '#06b6d4',
					glow: 'rgba(6, 182, 212, 0.3)',
					image: '/HealthOffice/margallo-tita.jpg',
					window: 'Nursing Station & EPI Clinic',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Senior Public Health Nurse coordinating the National Expanded Program on Immunization (EPI), field nursing supervision, and maternal care monitoring across municipal health stations.',
					duties: [
						'Supervises municipal childhood immunization schedules and cold chain potency compliance',
						'Monitors maternal health indicators and high-risk pregnancy registries',
						'Provides technical mentorship to rural catchment midwives and Barangay Health Workers (BHWs)',
						'Conducts community epidemiological tracking and communicable disease reporting'
					],
					services: [
						'Expanded Program on Immunization (EPI)',
						'Prenatal Nursing Assessment & Guidance',
						'Family Planning Clinical Guidance',
						'National Tuberculosis DOTS Program Coordination'
					]
				},
				{
					id: 'coronado-mary-jay',
					name: 'Mary Jay E. Coronado',
					position: 'Public Health Nurse II',
					roleCategory: 'Nursing and Midwifery Services',
					badge: 'Nurse II / Clinical Lead',
					color: '#06b6d4',
					glow: 'rgba(6, 182, 212, 0.3)',
					image: '/HealthOffice/coronado-mary-jay.jpg',
					window: 'Maternal & Child Health Care Desk',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Supervises primary maternal and child health clinic sessions, adolescent reproductive health education, and outpatient nursing interventions.',
					duties: [
						'Conducts clinical nursing evaluations and emergency first-line patient care',
						'Manages vaccine inventory, logistics requisition, and cold storage monitoring',
						'Organizes community health outreach missions and school-based health drives',
						'Maintains comprehensive nursing consultation records and patient progress logs'
					],
					services: [
						'Child Health & Wellness Clinical Evaluations',
						'Vaccine & Cold Storage Management',
						'Adolescent Health & Development Services',
						'Infectious Disease Surveillance Support'
					]
				}
			],
			// Row 2
			row2: [
				{
					id: 'cabrera-reinah',
					name: 'Reinah Mary Feb S. Cabrera',
					position: 'Nurse',
					roleCategory: 'Nursing and Midwifery Services',
					badge: 'Nurse / HEPO Lead',
					color: '#06b6d4',
					glow: 'rgba(6, 182, 212, 0.3)',
					image: '/HealthOffice/cabrera-reinah-mary-feb.jpg',
					window: 'Health Education & Promotion Desk',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Acts as Health Education and Promotion Officer (HEPO), coordinating municipal wellness drives, nutrition awareness, and community health literacy campaigns.',
					duties: [
						'Formulates and disseminates public health information, education, and communication (IEC) materials',
						'Coordinates municipal health education campaigns in 54 barangays and public schools',
						'Assists in clinical outpatient nursing intake, triage, and vital signs monitoring',
						'Conducts health literacy lectures on lifestyle diseases and epidemic prevention'
					],
					services: [
						'Health Education & Promotion (HEPO) Programs',
						'Public Health IEC Materials Dissemination',
						'Community Wellness & Hygiene Advocacy',
						'School & Barangay Health Education'
					]
				},
				{
					id: 'gomez-lany',
					name: 'Lany O. Gomez',
					position: 'Midwife',
					roleCategory: 'Nursing and Midwifery Services',
					badge: 'Midwife / Main Health Center',
					color: '#0891b2',
					glow: 'rgba(8, 145, 178, 0.25)',
					image: '/HealthOffice/gomez-lany.jpg',
					window: 'MHC Birthing & Midwifery Clinic',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Provides frontline clinical midwifery at the Main Health Center birthing unit, delivering antenatal care, delivery assistance, postpartum recovery, and newborn screening.',
					duties: [
						'Administers routine prenatal checkups, abdominal palpation, and fetal heartbeat monitoring',
						'Provides normal spontaneous delivery care and immediate newborn cord management',
						'Conducts newborn screening and administers initial BCG and Hepatitis B vaccines',
						'Provides postpartum care and lactation management guidance to new mothers'
					],
					services: [
						'Normal Spontaneous Delivery (NSD) Care',
						'Newborn Screening & Initial Immunization',
						'Prenatal & Postnatal Care Sessions',
						'Lactation & Breastfeeding Counseling'
					]
				}
			],
			// Row 3
			row3: [
				{
					id: 'igrobay-golda-may',
					name: 'Golda May B. Igrobay',
					position: 'Midwife',
					roleCategory: 'Nursing and Midwifery Services',
					badge: 'Catchment Midwife',
					color: '#0891b2',
					glow: 'rgba(8, 145, 178, 0.25)',
					image: '/HealthOffice/igrobay-golda-may.jpg',
					window: 'Calsadahay Catchment Health Station',
					office: 'Barangay Health Station, Tanauan, Leyte',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Provides essential rural midwifery services, infant immunization, and safe motherhood tracking across assigned barangay catchment communities.',
					duties: [
						'Manages Barangay Health Station operations and registers target maternal clients',
						'Conducts routine infant weighing, micronutrient supplementation, and deworming',
						'Identifies high-risk obstetric cases and facilitates prompt referral to the MHO',
						'Mobilizes Barangay Health Workers for community immunizations'
					],
					services: [
						'Barangay Health Station Midwifery Consults',
						'Infant Growth Monitoring & Micronutrient Support',
						'Community Maternal Healthcare',
						'Rural Immunization Sessions'
					]
				},
				{
					id: 'redona-bernadette',
					name: 'Bernadette M. Redona',
					position: 'Midwife',
					roleCategory: 'Nursing and Midwifery Services',
					badge: 'Catchment Midwife',
					color: '#0891b2',
					glow: 'rgba(8, 145, 178, 0.25)',
					image: '/HealthOffice/redona-bernadette.jpg',
					window: 'Malaguicay Catchment Health Station',
					office: 'Barangay Health Station, Tanauan, Leyte',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Frontline midwife providing maternal healthcare, modern family planning methods, and village immunization drives in assigned barangays.',
					duties: [
						'Dispenses family planning commodities and provides reproductive health counseling',
						'Executes national immunization schedules for infants and young children',
						'Maintains the official Target Client List (TCL) for maternal and child health',
						'Conducts home visitation for postpartum mothers and neonates'
					],
					services: [
						'Modern Family Planning Commodities & Counseling',
						'Target Client List (TCL) Record Management',
						'Postpartum Home Visits & Neonatal Checkups',
						'Community Immunization Monitoring'
					]
				}
			],
			// Row 4
			row4: [
				{
					id: 'paujana-lupicina',
					name: 'Lupicina C. Paujana',
					position: 'Midwife',
					roleCategory: 'Nursing and Midwifery Services',
					badge: 'Catchment Midwife',
					color: '#0891b2',
					glow: 'rgba(8, 145, 178, 0.25)',
					image: '/HealthOffice/paujana-lupicina.jpg',
					window: 'Salvador Catchment Health Station',
					office: 'Barangay Health Station, Tanauan, Leyte',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Dedicated catchment midwife delivering safe motherhood interventions, cervical cancer screening advocacy, and child nutrition monitoring.',
					duties: [
						'Performs primary antenatal examinations and blood pressure surveillance',
						'Facilitates community cervical cancer awareness and visual inspection screenings',
						'Distributes iron, folic acid, and essential supplements to expectant mothers',
						'Maintains active communication with barangay officials for health program delivery'
					],
					services: [
						'Antenatal Care & Nutritional Supplementation',
						'Cervical Cancer Screening Awareness',
						'Barangay Health Nutrition Programs',
						'Emergency Obstetric Referral Coordination'
					]
				},
				{
					id: 'esquivel-fatima',
					name: 'Fatima C. Esquivel',
					position: 'Midwife',
					roleCategory: 'Nursing and Midwifery Services',
					badge: 'Catchment Midwife',
					color: '#0891b2',
					glow: 'rgba(8, 145, 178, 0.25)',
					image: '/HealthOffice/esquivel-fatima.jpg',
					window: 'Solano Catchment Health Station',
					office: 'Barangay Health Station, Tanauan, Leyte',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Community midwife overseeing maternal health programs, tetanus toxoid vaccinations, and BHW field training in designated barangays.',
					duties: [
						'Administers tetanus toxoid immunizations to pregnant women and women of reproductive age',
						'Mentors and supervises Barangay Health Workers in primary record keeping',
						'Performs regular clinic sessions at the local Barangay Health Station',
						'Facilitates birth registration documentation for home and center deliveries'
					],
					services: [
						'Maternal Tetanus Toxoid Immunization',
						'BHW Supervisory & Field Support',
						'Barangay Clinic Sessions',
						'Civil Registration Birth Notification Assistance'
					]
				}
			],
			// Row 5 (Centered)
			row5: [
				{
					id: 'lamata-elvira',
					name: 'Elvira J. Lamata',
					position: 'Midwife',
					roleCategory: 'Nursing and Midwifery Services',
					badge: 'Catchment Midwife',
					color: '#0891b2',
					glow: 'rgba(8, 145, 178, 0.25)',
					image: '/HealthOffice/lamata-elvira.jpg',
					window: 'Cabuynan Catchment Health Station',
					office: 'Barangay Health Station, Tanauan, Leyte',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Experienced healthcare midwife safeguarding child survival, routine vaccinations, and safe delivery compliance in rural Tanauan.',
					duties: [
						'Conducts intensive under-five child growth tracking and malnutrition monitoring',
						'Organizes supplemental immunization activities for measles, rubella, and polio',
						'Maintains comprehensive catchment health profiles and population demographic data',
						'Conducts regular health education for mothers on breastfeeding and child care'
					],
					services: [
						'Under-Five Child Growth & Nutrition Surveillance',
						'Supplemental Mass Vaccination Drives',
						'Barangay Health Station Catchment Profiles',
						'Maternal Health & Nutrition Education'
					]
				}
			],
			// Flat list of all 9 members for Grid / Search
			members: []
		},
		{
			id: 'sec-triage',
			title: 'Triage',
			shortTitle: 'Triage',
			color: '#3b82f6', // Blue
			glow: 'rgba(59, 130, 246, 0.35)',
			expanded: true,
			members: [
				{
					id: 'salvacion-ma-lourdes',
					name: 'Ma. Lourdes D. Salvacion',
					position: 'Nurse',
					roleCategory: 'Triage',
					badge: 'Triage Nurse',
					color: '#3b82f6',
					glow: 'rgba(59, 130, 246, 0.3)',
					image: '/HealthOffice/salvacion-ma-lourdes.jpg',
					window: 'Main Triage & Clinical Screening Desk',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Supervises clinical triage, patient acuity assessment, vital signs verification, and immediate routing to primary care physicians or emergency isolation.',
					duties: [
						'Assesses presenting symptoms and classifies patients according to clinical urgency',
						'Performs precise blood pressure, temperature, pulse, and oxygen saturation checks',
						'Identifies suspected communicable or respiratory illnesses for isolation triage',
						'Coordinates swift transfer for emergency patients requiring immediate medical attention'
					],
					services: [
						'Rapid Patient Clinical Triage & Acuity Grading',
						'Comprehensive Vital Signs Measurement',
						'Infection Control & Respiratory Screening',
						'Emergency Patient Route Navigation'
					]
				},
				{
					id: 'pardales-darlene',
					name: 'Darlene O. Pardales',
					position: 'Midwife',
					roleCategory: 'Triage',
					badge: 'Triage Midwife',
					color: '#3b82f6',
					glow: 'rgba(59, 130, 246, 0.3)',
					image: '/HealthOffice/pardales-darlene.jpg',
					window: 'Maternal & Pediatric Triage Station',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Specialized triage officer screening expectant mothers, neonates, and children for early signs of clinical complications upon arrival.',
					duties: [
						'Screens pregnant women for signs of pre-eclampsia, labor onset, or obstetric emergencies',
						'Takes pediatric anthropometric measurements (weight, height, MUAC)',
						'Guides mothers to appropriate consultation rooms or birthing triage bays',
						'Maintains orderly daily triage logs and patient encounter registries'
					],
					services: [
						'Obstetric & Maternal Triage Evaluation',
						'Pediatric Anthropometric Measurement',
						'Early Warning Complication Screening',
						'Intake Documentation & Encounter Logging'
					]
				},
				{
					id: 'dalo-mariel-ruth',
					name: 'Mariel Ruth Dalo',
					position: 'Midwife',
					roleCategory: 'Triage',
					badge: 'Triage Midwife',
					color: '#3b82f6',
					glow: 'rgba(59, 130, 246, 0.3)',
					image: '/HealthOffice/dalo-mariel-ruth.jpg',
					window: 'Frontline Queue & Screening Desk',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Coordinates frontline patient queue flow, priority lane management for senior citizens and PWDs, and preliminary health history intake.',
					duties: [
						'Welcomes patients, verifies consultation intents, and issues queue numbers',
						'Ensures expedited priority access for seniors, pregnant women, and persons with disability',
						'Assists in rapid temperature checks and basic symptom questionnaires',
						'Liaises with Medical Records and Doctors for seamless patient flow'
					],
					services: [
						'Frontline Patient Queue Direction',
						'Priority Lane Assistance (Seniors / PWD / Infants)',
						'Preliminary Symptom Questionnaires',
						'Consultation Flow Management'
					]
				}
			]
		},
		{
			id: 'sec-pharmacy',
			title: 'Pharmacy',
			shortTitle: 'Pharmacy',
			color: '#10b981', // Emerald
			glow: 'rgba(16, 185, 129, 0.35)',
			expanded: true,
			members: [
				{
					id: 'corilla-dyna-marie',
					name: 'Dyna Marie S. Corilla',
					position: 'Pharmacist',
					roleCategory: 'Pharmacy',
					badge: 'Registered Pharmacist',
					color: '#10b981',
					glow: 'rgba(16, 185, 129, 0.3)',
					image: '/HealthOffice/corilla-dyna-marie.jpg',
					window: 'Municipal RHU Pharmacy Dispensary',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Leads the Municipal Pharmacy Unit, overseeing essential government medicine procurement, quality storage, legal prescription dispensing, and drug safety education.',
					duties: [
						'Evaluates doctor prescriptions for dosage accuracy, drug interactions, and contraindications',
						'Dispenses free municipal maintenance medicines for hypertension, diabetes, and acute illnesses',
						'Monitors medicine inventory, expiration dates, and cold-chain pharmaceutical storage',
						'Educates patients on safe drug administration, side effects, and adherence regimens'
					],
					services: [
						'Free Essential Government Medicine Dispensing',
						'Doctor Prescription Verification & Review',
						'Maintenance Drug Subsidy Program (Hypertension/Diabetes)',
						'Pharmacovigilance & Patient Drug Counseling'
					]
				},
				{
					id: 'mendiola-liza',
					name: 'Liza Mendiola',
					position: 'Pharmacy Assistant',
					roleCategory: 'Pharmacy',
					badge: 'Pharmacy Assistant',
					color: '#10b981',
					glow: 'rgba(16, 185, 129, 0.3)',
					image: '/HealthOffice/mendiola-liza.jpg',
					window: 'Pharmacy Dispensing Window',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Provides technical support in pharmaceutical stock management, packaging of dispensed medications, inventory record keeping, and patient queue handling.',
					duties: [
						'Prepares and labels prescribed pharmaceuticals under registered pharmacist supervision',
						'Maintains daily medicine dispensing logs and patient beneficiary ledgers',
						'Assists in physical drug inventory counting and stock replenishment requisitions',
						'Ensures clean, organized, and sanitary pharmacy dispensing counters'
					],
					services: [
						'Medication Packaging & Labeling Assistance',
						'Daily Medicine Dispensing Log Maintenance',
						'Pharmaceutical Stock Shelving & Organization',
						'Beneficiary Record Verification'
					]
				}
			]
		},
		{
			id: 'sec-laboratory',
			title: 'Laboratory',
			shortTitle: 'Laboratory',
			color: '#8b5cf6', // Purple
			glow: 'rgba(139, 92, 246, 0.35)',
			expanded: true,
			members: [
				{
					id: 'mercado-andrew',
					name: 'Andrew Nathaniel F. Mercado',
					position: 'Medical Technologist',
					roleCategory: 'Laboratory',
					badge: 'Medical Technologist',
					color: '#8b5cf6',
					glow: 'rgba(139, 92, 246, 0.3)',
					image: '/HealthOffice/mercado-andrew.jpg',
					window: 'Clinical Diagnostic Laboratory',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Registered Medical Technologist heading the diagnostic clinical laboratory, conducting clinical chemistry, hematology, urinalysis, sputum microscopy, and diagnostic testing.',
					duties: [
						'Performs clinical hematology tests (CBC, Platelet Count) and blood typing',
						'Conducts microscopic examination of urine, stool, and sputum samples (TB DOTS)',
						'Validates and signs laboratory diagnostic test results for physician assessment',
						'Maintains strict laboratory biosafety, quality control calibration, and waste management'
					],
					services: [
						'Complete Blood Count (CBC) & Hematology',
						'Routine Urinalysis & Fecalysis Diagnostics',
						'Sputum Microscopy (Tuberculosis Detection)',
						'Fasting Blood Sugar (FBS) & Rapid Diagnostic Tests'
					]
				},
				{
					id: 'severino-jessa-mae',
					name: 'Jessa Mae Severino',
					position: 'Laboratory Aide',
					roleCategory: 'Laboratory',
					badge: 'Laboratory Aide',
					color: '#8b5cf6',
					glow: 'rgba(139, 92, 246, 0.3)',
					image: '/HealthOffice/severino-jessa-mae.jpg',
					window: 'Specimen Receiving & Sterilization Area',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Supports laboratory operations through patient specimen reception, barcode labeling, autoclave sterilization of equipment, and clinical waste disposal.',
					duties: [
						'Receives and codes patient diagnostic samples with proper identification tags',
						'Operates autoclave sterilizers for reusable laboratory instruments and glassware',
						'Maintains laboratory cleanliness, bench sanitation, and reagent storage organization',
						'Prepares specimen collection containers and assists in patient logbook documentation'
					],
					services: [
						'Specimen Receiving & Identification Tagging',
						'Laboratory Equipment Autoclave Sterilization',
						'Biohazard Waste Disposal Management',
						'Laboratory Reagent & Inventory Organization'
					]
				}
			]
		},
		{
			id: 'sec-medical-record',
			title: 'Medical Record',
			shortTitle: 'Medical Record',
			color: '#ec4899', // Pink / Rose
			glow: 'rgba(236, 72, 153, 0.35)',
			expanded: true,
			members: [
				{
					id: 'angelio-zaira',
					name: 'Zaira B. Angelio',
					position: 'Medical Record Officer/ Encoder',
					roleCategory: 'Medical Record',
					badge: 'Records Officer / Encoder',
					color: '#ec4899',
					glow: 'rgba(236, 72, 153, 0.3)',
					image: '/HealthOffice/angelio-zaira.jpg',
					window: 'Health Information & Records Window',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Manages the municipal health records archive, electronic health records (EHR) encoding, national Field Health Services Information System (FHSIS) data, and medical certificate records.',
					duties: [
						'Encodes daily medical consultations and diagnoses into the municipal digital health database',
						'Safekeeps, organizes, and archives confidential patient physical and electronic health records',
						'Generates monthly municipal health morbidity, mortality, and epidemiological reports for DOH',
						'Processes and prepares official medical records for physician certification'
					],
					services: [
						'Electronic Medical Records (EMR / EHR) Maintenance',
						'Field Health Services Information System (FHSIS) Reporting',
						'Medical Certificate Processing & Archiving',
						'Confidential Patient Records Retrieval'
					]
				}
			]
		},
		{
			id: 'sec-dental',
			title: 'Dental Services',
			shortTitle: 'Dental Services',
			color: '#14b8a6', // Teal
			glow: 'rgba(20, 184, 166, 0.35)',
			expanded: true,
			members: [
				{
					id: 'leones-karen-mae',
					name: 'Dr. Karen Mae C. Leones',
					position: 'Dentist II',
					roleCategory: 'Dental Services',
					badge: 'Dentist II / Public Health Dentist',
					color: '#14b8a6',
					glow: 'rgba(20, 184, 166, 0.3)',
					image: '/HealthOffice/leones-karen-mae.jpg',
					window: 'Municipal Dental Clinic',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Public Health Dentist providing comprehensive oral healthcare, therapeutic tooth extractions, oral disease prevention, fluoride varnish programs, and community dental missions.',
					duties: [
						'Conducts oral examinations, clinical diagnosis of dental pathologies, and consultations',
						'Performs therapeutic and surgical dental extractions with local anesthesia',
						'Implements preventive fluoride applications and oral health education for children and pregnant women',
						'Conducts school-based and community outreach dental missions across Tanauan'
					],
					services: [
						'Therapeutic Tooth Extractions & Minor Oral Surgery',
						'Oral Health Consultations & Clinical Diagnostics',
						'Topical Fluoride Therapy & Dental Sealants',
						'School & Barangay Oral Health Missions'
					]
				},
				{
					id: 'odtuhan-katherine',
					name: 'Katherine C. Odtuhan',
					position: 'Dental Aide',
					roleCategory: 'Dental Services',
					badge: 'Dental Aide',
					color: '#14b8a6',
					glow: 'rgba(20, 184, 166, 0.3)',
					image: '/HealthOffice/odtuhan-katherine.jpg',
					window: 'Dental Operatory & Sterilization Unit',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Assists the Municipal Dentist in clinical operatory procedures, dental chairside assistance, surgical instrument sterilization, and patient scheduling.',
					duties: [
						'Prepares dental instruments, operatory tray setups, and clinical disposable materials',
						'Operates high-pressure autoclave sterilizers to maintain strict dental surgical asepsis',
						'Assists chairside during extractions and oral procedures (suctioning, instrument passing)',
						'Maintains dental clinic appointment registers and procedure documentation'
					],
					services: [
						'Chairside Dental Operatory Assistance',
						'Surgical Dental Instrument Autoclave Sterilization',
						'Dental Patient Registry & Appointment Scheduling',
						'Dental Consumables & Anesthetic Inventory Support'
					]
				}
			]
		},
		{
			id: 'sec-sanitation',
			title: 'Sanitation Service',
			shortTitle: 'Sanitation Service',
			color: '#84cc16', // Lime
			glow: 'rgba(132, 204, 22, 0.35)',
			expanded: true,
			members: [
				{
					id: 'artogue-jennifer',
					name: 'Jennifer Artogue',
					position: 'Sanitation Inspector II',
					roleCategory: 'Sanitation Service',
					badge: 'Sanitation Inspector II',
					color: '#84cc16',
					glow: 'rgba(132, 204, 22, 0.3)',
					image: '/HealthOffice/artogue-jennifer.jpg',
					window: 'Sanitary Inspection & Permitting Desk',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Senior Sanitation Inspector enforcing the Code on Sanitation of the Philippines (PD 856), municipal business sanitary inspections, food handler clearances, and potable water testing.',
					duties: [
						'Conducts rigorous sanitary evaluations of commercial establishments, eateries, and food stalls',
						'Reviews and validates documentary compliance for Sanitary Permit issuance',
						'Conducts bacteriological and chemical water sampling from municipal water systems',
						'Investigates public environmental health complaints and nuisance reports'
					],
					services: [
						'Sanitary Permit Evaluation & Inspection',
						'Food Handler Health Certificate Clearance',
						'Municipal Drinking Water Bacteriological Quality Testing',
						'Environmental Health Enforcement & Nuisance Abatement'
					]
				},
				{
					id: 'salubon-victorino',
					name: 'Victorino A. Salubon',
					position: 'Sanitation Inspector I',
					roleCategory: 'Sanitation Service',
					badge: 'Sanitation Inspector I',
					color: '#84cc16',
					glow: 'rgba(132, 204, 22, 0.3)',
					image: '/HealthOffice/salubon-victorino.jpg',
					window: 'Field Sanitary Inspection Desk',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Field sanitary inspector monitoring public facilities, public markets, slaughterhouses, boarding houses, and solid waste sanitary conditions.',
					duties: [
						'Conducts routine sanitary inspections in the Tanauan Public Market and meat shops',
						'Collects water samples from shallow wells and community water reservoirs',
						'Issues formal notices of sanitation violation and monitors corrective compliance',
						'Inspects municipal cemeteries and exhumation requests for sanitary compliance'
					],
					services: [
						'Public Market & Commercial Stall Sanitation Inspections',
						'Potable Water Source Field Surveillance',
						'Cemetery & Exhumation Sanitary Clearance',
						'Sanitation Violation Field Inspections'
					]
				},
				{
					id: 'ripalda-elmer',
					name: 'Elmer U. Ripalda',
					position: 'Sanitation Inspector I',
					roleCategory: 'Sanitation Service',
					badge: 'Sanitation Inspector I',
					color: '#84cc16',
					glow: 'rgba(132, 204, 22, 0.3)',
					image: '/HealthOffice/ripalda-elmer.jpg',
					window: 'Vector Control & Sanitation Desk',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Specializes in environmental vector control, anti-dengue misting/larviciding surveillance, household sanitary toilet verification, and Zero Open Defecation (ZOD) programs.',
					duties: [
						'Performs mosquito larval surveys and directs targeted anti-dengue misting in high-risk zones',
						'Verifies household sanitary toilet construction under the Zero Open Defecation campaign',
						'Educates rural communities on hygienic solid waste disposal and safe sewage disposal',
						'Assists in potable water chlorine testing in barangay water sources'
					],
					services: [
						'Anti-Dengue Vector Surveillance & Targeted Misting',
						'Zero Open Defecation (ZOD) Household Certification',
						'Community Environmental Hygiene Advocacy',
						'Potable Water Residual Chlorine Testing'
					]
				}
			]
		},
		{
			id: 'sec-philhealth',
			title: 'Philhealth Service',
			shortTitle: 'Philhealth Service',
			color: '#0284c7', // Sky / Philhealth Blue
			glow: 'rgba(2, 132, 199, 0.35)',
			expanded: true,
			members: [
				{
					id: 'buendia-rodel',
					name: 'Rodel A. Buendia',
					position: 'Philhealth Coordinator',
					roleCategory: 'Philhealth Service',
					badge: 'Philhealth Coordinator',
					color: '#0284c7',
					glow: 'rgba(2, 132, 199, 0.3)',
					image: '/HealthOffice/buendia-rodel.jpg',
					window: 'PhilHealth Konsulta & Billing Desk',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Leads the Municipal PhilHealth Service Unit, supervising the PhilHealth Konsulta program, primary care benefit reimbursements, accreditation standards, and UHC coverage expansion.',
					duties: [
						'Oversees the municipal implementation of PhilHealth Konsulta primary care benefits',
						'Liaises directly with the PhilHealth Regional Office 8 for facility accreditation and claims',
						'Monitors electronic claims submissions, reimbursements, and benefit reconciliation',
						'Directs municipal mass PhilHealth registration campaigns in the 54 barangays'
					],
					services: [
						'PhilHealth Konsulta Program Administration',
						'Primary Care Benefit (PCB) Accreditation & Claims',
						'Universal Health Care Coverage Expansion',
						'Inter-Agency PhilHealth Regional Coordination'
					]
				},
				{
					id: 'redona-irene',
					name: 'Irene Redona',
					position: 'Philhealth Staff',
					roleCategory: 'Philhealth Service',
					badge: 'Philhealth Staff',
					color: '#0284c7',
					glow: 'rgba(2, 132, 199, 0.3)',
					image: '/HealthOffice/redona-irene.jpg',
					window: 'PhilHealth Registration Window',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Assists Tanauan residents in accomplishing PhilHealth Member Registration Forms (PMRF), updating dependent declarations, and obtaining PhilHealth Identification Numbers (PIN).',
					duties: [
						'Screens and processes PhilHealth Member Registration Forms (PMRF) for new enrollees',
						'Updates member records (declaration of qualified dependents, change of marital status)',
						'Verifies membership status and generates Member Data Records (MDR)',
						'Assists point-of-service indigent patients in emergency enrollment'
					],
					services: [
						'PhilHealth Member Registration Form (PMRF) Processing',
						'Member Data Record (MDR) Verification & Issuance',
						'Dependent Declaration & Record Updates',
						'Point-of-Service Indigent Enrollment Guidance'
					]
				},
				{
					id: 'almaden-sherlyn',
					name: 'Sherlyn Almaden',
					position: 'Philhealth Staff',
					roleCategory: 'Philhealth Service',
					badge: 'Philhealth Staff',
					color: '#0284c7',
					glow: 'rgba(2, 132, 199, 0.3)',
					image: '/HealthOffice/almaden-sherlyn.jpg',
					window: 'E-Konsulta Encounter Window',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Encodes clinical patient encounters into the online PhilHealth e-Konsulta portal, verifies benefit claim attachments, and assists patients with Konsulta profiling.',
					duties: [
						'Encodes patient medical histories, physical examination data, and laboratory results into e-Konsulta',
						'Validates member eligibility through the PhilHealth electronic claims system',
						'Assists patients in selecting their accredited Tanauan RHU as primary Konsulta provider',
						'Reconciles electronic billing summaries with the Municipal Accounting Office'
					],
					services: [
						'E-Konsulta Online Encounter Registration',
						'Electronic Claims Eligibility Validation',
						'Primary Care Provider Selection Assistance',
						'Konsulta Consultation Billing Support'
					]
				},
				{
					id: 'balmes-joy',
					name: 'Joy Balmes',
					position: 'Philhealth Staff',
					roleCategory: 'Philhealth Service',
					badge: 'Philhealth Staff',
					color: '#0284c7',
					glow: 'rgba(2, 132, 199, 0.3)',
					image: '/HealthOffice/balmes-joy.jpg',
					window: 'PhilHealth Helpdesk & Frontline Window',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Dedicated frontline staff providing compassionate guidance to senior citizens, 4Ps beneficiaries, and indigent patients navigating PhilHealth healthcare entitlements.',
					duties: [
						'Provides frontline customer support and answers inquiries regarding PhilHealth benefits',
						'Assists senior citizens and 4Ps beneficiaries in documentary requirement completion',
						'Maintains the daily visitor logs and queuing assistance at the PhilHealth desk',
						'Guides patients on availing diagnostic tests covered under the Konsulta package'
					],
					services: [
						'Senior Citizen & 4Ps PhilHealth Guidance',
						'Frontline Benefit Inquiries & Consultation Support',
						'Konsulta Covered Diagnostics Orientation',
						'Patient Document Verification & Navigation'
					]
				}
			]
		}
	]);

	// Populate flat members array for nursing
	clinicalSections[0].members = [
		...clinicalSections[0].row1,
		...clinicalSections[0].row2,
		...clinicalSections[0].row3,
		...clinicalSections[0].row4,
		...clinicalSections[0].row5
	];

	// The 3 Operational & Administrative Support Units (Level 2 Central Trunk Downward)
	let supportSections = $state([
		{
			id: 'sec-ambulance',
			title: 'Ambulance Driver',
			shortTitle: 'Ambulance Driver',
			color: '#ef4444', // Red
			glow: 'rgba(239, 68, 68, 0.35)',
			expanded: true,
			members: [
				{
					id: 'cuayzon-jhon-davis',
					name: 'Jhon Davis V. Cuayzon',
					position: 'Ambulance Driver',
					roleCategory: 'Ambulance Driver',
					badge: 'Ambulance Driver',
					color: '#ef4444',
					glow: 'rgba(239, 68, 68, 0.3)',
					image: '/HealthOffice/cuayzon-jhon-davis.jpg',
					window: 'Emergency Dispatch Bay',
					office: 'Tanauan Municipal Health Center',
					hours: '24/7 On-Call Emergency Shift',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Operates municipal emergency transport ambulances, ensuring rapid, safe patient conduction and inter-facility transfers to tertiary referral hospitals in Tacloban City.',
					duties: [
						'Conducts 24/7 emergency patient transport for trauma, critical illness, and obstetric crises',
						'Performs daily pre-trip vehicle inspections (fuel, oil, tire pressure, sirens, emergency lights)',
						'Assists medical personnel with patient stretcher handling and oxygen equipment setup',
						'Maintains complete emergency trip tickets and vehicle maintenance logbooks'
					],
					services: [
						'24/7 Emergency Medical Transport',
						'Inter-Facility Referral Conduction (Tanauan to Tertiary Hospitals)',
						'Disaster & Trauma Emergency Evacuation',
						'Ambulance Vehicle Preparedness & Safety'
					]
				},
				{
					id: 'modesto-antonio',
					name: 'Antonio B. Modesto Jr.',
					position: 'Ambulance Driver',
					roleCategory: 'Ambulance Driver',
					badge: 'Ambulance Driver',
					color: '#ef4444',
					glow: 'rgba(239, 68, 68, 0.3)',
					image: '/HealthOffice/modesto-antonio.jpg',
					window: 'Emergency Dispatch Bay',
					office: 'Tanauan Municipal Health Center',
					hours: '24/7 On-Call Emergency Shift',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Ensures round-the-clock emergency vehicle operational readiness for emergency hospital transfers, disaster medical deployments, and rural maternal conduction.',
					duties: [
						'Responds immediately to high-priority emergency transport dispatches across 54 barangays',
						'Drives emergency ambulance safely under siren and emergency navigation protocols',
						'Maintains emergency on-board sanitization and assists healthcare responders',
						'Monitors routine preventive maintenance and rapid emergency refueling'
					],
					services: [
						'Emergency Patient Hospital Conduction',
						'Maternal & High-Risk Obstetric Transport',
						'24/7 Dispatch Standby & Route Navigation',
						'Emergency Fleet Maintenance Readiness'
					]
				}
			]
		},
		{
			id: 'sec-clerical',
			title: 'Admin Clerical Aide',
			shortTitle: 'Admin Clerical Aide',
			color: '#f97316', // Orange
			glow: 'rgba(249, 115, 22, 0.35)',
			expanded: true,
			members: [
				{
					id: 'golar-ivanajean',
					name: 'Ivanajean P. Golar',
					position: 'Clerical Aide',
					roleCategory: 'Admin Clerical Aide',
					badge: 'Clerical Aide',
					color: '#f97316',
					glow: 'rgba(249, 115, 22, 0.3)',
					image: '/HealthOffice/golar-ivanajean.jpg',
					window: 'MHO Executive Office & Receiving Desk',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Provides administrative, secretarial, and clerical assistance to the Municipal Health Officer, coordinating official communications, filing, and office logistics.',
					duties: [
						'Receives, logs, and routes official incoming and outgoing correspondence and memos',
						'Maintains the executive calendar, appointment schedules, and meeting minutes for the MHO',
						'Prepares administrative travel orders, supply purchase requests, and office documents',
						'Coordinates communication between the Health Office and the Office of the Mayor'
					],
					services: [
						'Official Correspondence & Document Tracking',
						'Administrative Filing & Executive Assistance',
						'Meeting Coordination & Minutes Preparation',
						'Office Supply & Requisition Support'
					]
				}
			]
		},
		{
			id: 'sec-support',
			title: 'Support Staff/Utility Worker',
			shortTitle: 'Support / Utility',
			color: '#64748b', // Slate
			glow: 'rgba(100, 116, 139, 0.35)',
			expanded: true,
			row1: [
				{
					id: 'tiolo-mariel',
					name: 'Mariel Tiolo',
					position: 'Utility Worker',
					roleCategory: 'Support Staff/Utility Worker',
					badge: 'Utility Worker',
					color: '#64748b',
					glow: 'rgba(100, 116, 139, 0.25)',
					image: '/HealthOffice/tiolo-mariel.jpg',
					window: 'RHU Facility & Maintenance Unit',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Oversees clinic sanitation, infectious disease barrier disinfection, and hospital-grade cleaning in primary examination rooms and diagnostic suites.',
					duties: [
						'Performs hospital-grade sanitization and disinfection of clinical rooms and consultation suites',
						'Safely collects, segregates, and disposes of healthcare and general waste according to protocol',
						'Maintains clean, orderly, and hygienic patient waiting facilities and entrance lobbies',
						'Assists in logistics, heavy equipment handling, and clinic setup during mass vaccination drives'
					],
					services: [
						'Clinic Sanitization & Environmental Infection Control',
						'Healthcare Waste Segregation & Safe Handling',
						'Facility Cleanliness Maintenance',
						'Vaccination Campaign Logistics Support'
					]
				},
				{
					id: 'arandia-lorenzo',
					name: 'Lorenzo Arandia',
					position: 'Utility Worker',
					roleCategory: 'Support Staff/Utility Worker',
					badge: 'Utility Worker',
					color: '#64748b',
					glow: 'rgba(100, 116, 139, 0.25)',
					image: '/HealthOffice/arandia-lorenzo.jpg',
					window: 'RHU Grounds & Utilities Desk',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Maintains physical facilities, electrical safety, plumbing fixtures, and general perimeter cleanliness of the Municipal Health Center.',
					duties: [
						'Conducts routine building repairs, plumbing maintenance, and water pump monitoring',
						'Ensures electrical backup generator readiness for vaccine cold storage integrity',
						'Maintains perimeter grounds, drainage trenches, and grounds cleanliness',
						'Assists in moving health supplies, bulk medicines, and medical outreach cargo'
					],
					services: [
						'Facility Physical Maintenance & Plumbing Checks',
						'Vaccine Cold Chain Backup Generator Monitoring',
						'Perimeter Grounds Sanitation & Upkeep',
						'Medical Cargo & Supply Logistics Handling'
					]
				}
			],
			row2: [
				{
					id: 'arcena-john-ray',
					name: 'John Ray Arcena',
					position: 'Utility Worker',
					roleCategory: 'Support Staff/Utility Worker',
					badge: 'Utility Worker',
					color: '#64748b',
					glow: 'rgba(100, 116, 139, 0.25)',
					image: '/HealthOffice/arcena-john-ray.jpg',
					window: 'RHU Sanitization Unit',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Conducts continuous sanitization of high-contact surfaces, triage screening bays, and public rest facilities in the health complex.',
					duties: [
						'Sanitizes patient reception desks, door handles, handrails, and waiting bay seating',
						'Maintains spotless hygiene and sanitary supplies in all patient and staff restrooms',
						'Assists in preparing clinical examination materials and cleaning equipment',
						'Supports administrative staff in inter-office deliveries and municipal hall errands'
					],
					services: [
						'High-Touch Surface Disinfection Protocols',
						'Public Restroom Hygiene & Sanitation',
						'Clinic Operatory Tidiness & Setup',
						'Administrative Courier & Errand Assistance'
					]
				},
				{
					id: 'parone-lea',
					name: 'Lea Parone',
					position: 'Utility Worker',
					roleCategory: 'Support Staff/Utility Worker',
					badge: 'Utility Worker',
					color: '#64748b',
					glow: 'rgba(100, 116, 139, 0.25)',
					image: '/HealthOffice/parone-lea.jpg',
					window: 'Birthing Facility & Clinic Sanitization',
					office: 'Tanauan Municipal Health Center',
					hours: 'Monday – Friday | 8:00 AM – 5:00 PM',
					contact: 'health@tanauanleyte.gov.ph',
					overview:
						'Specializes in environmental sanitation of the maternal birthing ward, postpartum recovery beds, and newborn care stations.',
					duties: [
						'Maintains strict sterility and cleanliness in the labor and delivery room',
						'Changes, washes, and sterilizes clinical bed linens, towels, and patient gowns',
						'Disinfects postpartum recovery beds and baby bassinets after each discharge',
						'Handles color-coded medical waste disposal containers according to DOH regulations'
					],
					services: [
						'Maternal Birthing Ward Specialized Sanitization',
						'Clinical Linen Replacement & Disinfection',
						'Newborn Care Area Cleanliness Standards',
						'Color-Coded Biohazard Waste Segregation'
					]
				}
			],
			members: []
		}
	]);

	// Populate flat members array for support
	supportSections[2].members = [
		...supportSections[2].row1,
		...supportSections[2].row2
	];

	// Flatten all 34 personnel for search, filter & grid views
	const allPersonnel = $derived([
		mhoHead,
		...clinicalSections.flatMap((s) => s.members),
		...supportSections.flatMap((s) => s.members)
	]);

	// ==========================================
	// COMPONENT STATE & CONTROLS
	// ==========================================
	let searchQuery = $state('');
	let selectedCategoryFilter = $state('all');
	let selectedPerson = $state(null);
	let viewMode = $state('tree'); // 'tree' (Tree Hierarchy) | 'grid' (Role Roster)
	let selectedFocus = $state('all'); // 'all' | 'clinical' | 'support' | individual section id
	let zoomScale = $state(0.45);
	let panOffset = $state({ x: 0, y: 0 });
	let isPanning = $state(false);
	let panStart = $state({ x: 0, y: 0 });
	let failedImages = $state(new Set());

	// Dynamic Viewport Measurement & Sizing
	let viewportEl = $state(null);
	let treeWrapperEl = $state(null);
	let canvasHeight = $state(580);

	// Filtered sections for Tree Hierarchy based on Focus
	const displayedClinicalSections = $derived(
		selectedFocus === 'all' || selectedFocus === 'clinical'
			? clinicalSections
			: clinicalSections.filter((s) => s.id === selectedFocus)
	);

	const displayedSupportSections = $derived(
		selectedFocus === 'all' || selectedFocus === 'support'
			? supportSections
			: supportSections.filter((s) => s.id === selectedFocus)
	);

	const showClinicalTier = $derived(
		displayedClinicalSections.length > 0 && selectedFocus !== 'support'
	);

	const showSupportTier = $derived(
		displayedSupportSections.length > 0 && selectedFocus !== 'clinical'
	);

	// Search filter match
	function matchesSearch(person, query) {
		if (!query.trim()) return true;
		const q = query.toLowerCase().trim();
		return (
			person.name.toLowerCase().includes(q) ||
			person.position.toLowerCase().includes(q) ||
			person.roleCategory.toLowerCase().includes(q) ||
			person.badge.toLowerCase().includes(q) ||
			(person.window && person.window.toLowerCase().includes(q)) ||
			(person.services && person.services.some((s) => s.toLowerCase().includes(q))) ||
			(person.duties && person.duties.some((d) => d.toLowerCase().includes(q)))
		);
	}

	// Filter by Section Category in Grid View
	const filteredPersonnel = $derived(
		allPersonnel.filter((person) => {
			const matchesCat =
				selectedCategoryFilter === 'all' ||
				person.roleCategory === selectedCategoryFilter;
			const matchesText = matchesSearch(person, searchQuery);
			return matchesCat && matchesText;
		})
	);

	// Automatic Fit Calculation based on current view & viewport
	function autoFit(mode = 'contain') {
		if (!viewportEl || !treeWrapperEl) return;
		const vpW = viewportEl.clientWidth;
		if (!vpW) return;

		const windowH = typeof window !== 'undefined' ? window.innerHeight : 900;
		// Determine comfortable viewport height (max 660px on large desktop, 420-520px on laptop/tablet)
		const maxAllowedH = Math.min(Math.round(windowH * 0.68), 660);
		const targetH = Math.max(420, maxAllowedH);

		const contentW = treeWrapperEl.scrollWidth || treeWrapperEl.offsetWidth || 1800;
		const contentH = treeWrapperEl.scrollHeight || treeWrapperEl.offsetHeight || 1200;

		if (!contentW || !contentH) return;

		const padX = 40;
		const padY = 40;

		const scaleX = (vpW - padX) / contentW;
		const scaleY = (targetH - padY) / contentH;

		let targetScale;
		if (mode === 'width') {
			targetScale = Math.min(scaleX, 1.05);
		} else {
			targetScale = Math.min(scaleX, scaleY);
		}

		// Clamp between 0.22 and 1.05
		targetScale = Math.max(0.22, Math.min(targetScale, 1.05));
		zoomScale = Number(targetScale.toFixed(2));
		panOffset = { x: 0, y: 0 };

		// Dynamically size the canvas so there's zero empty void at bottom
		const visualH = Math.round(contentH * zoomScale);
		canvasHeight = Math.max(420, Math.min(visualH + 48, maxAllowedH));
	}

	function handleFocusChange() {
		tick().then(() => {
			autoFit('contain');
		});
	}

	// Expand / Collapse All
	function expandAll() {
		mhoHead.expanded = true;
		clinicalSections.forEach((s) => (s.expanded = true));
		supportSections.forEach((s) => (s.expanded = true));
		tick().then(() => autoFit('contain'));
	}

	function collapseAll() {
		clinicalSections.forEach((s) => (s.expanded = false));
		supportSections.forEach((s) => (s.expanded = false));
		tick().then(() => autoFit('contain'));
	}

	// Zoom Controls
	function zoomIn() {
		zoomScale = Math.min(Number((zoomScale + 0.05).toFixed(2)), 1.8);
	}

	function zoomOut() {
		zoomScale = Math.max(Number((zoomScale - 0.05).toFixed(2)), 0.2);
	}

	function resetZoom() {
		autoFit('contain');
	}

	function fitView() {
		autoFit('contain');
	}

	// Drag & Pan handlers (Mouse)
	function startPan(e) {
		if (e.target.closest('button') || e.target.closest('input') || e.target.closest('select')) return;
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

	// Touch Pan handlers (Mobile / Tablet)
	let touchStart = { x: 0, y: 0 };
	function startTouchPan(e) {
		if (e.target.closest('button') || e.target.closest('input') || e.target.closest('select')) return;
		if (e.touches.length === 1) {
			isPanning = true;
			touchStart = {
				x: e.touches[0].clientX - panOffset.x,
				y: e.touches[0].clientY - panOffset.y
			};
		}
	}

	function doTouchPan(e) {
		if (!isPanning || e.touches.length !== 1) return;
		panOffset = {
			x: e.touches[0].clientX - touchStart.x,
			y: e.touches[0].clientY - touchStart.y
		};
	}

	// Mouse Wheel Zoom (Pinch or Ctrl+Wheel)
	function handleWheel(e) {
		if (e.ctrlKey || e.metaKey) {
			e.preventDefault();
			const delta = -e.deltaY * 0.002;
			zoomScale = Math.max(0.2, Math.min(1.8, Number((zoomScale + delta).toFixed(2))));
		}
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

	// Auto-fit on mount and observe container size changes
	onMount(() => {
		tick().then(() => {
			autoFit('contain');
		});

		let lastW = 0;
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const w = Math.round(entry.contentRect.width);
				if (w > 0 && Math.abs(w - lastW) > 8) {
					lastW = w;
					autoFit('contain');
				}
			}
		});

		if (viewportEl) {
			resizeObserver.observe(viewportEl);
		}

		return () => {
			resizeObserver.disconnect();
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- MAIN ORGANIZATIONAL CHART WRAPPER (MATCHING ENGINEERING OFFICE AESTHETICS) -->
<div
	class="relative w-full overflow-hidden rounded-3xl border-2 border-slate-800 bg-gradient-to-b from-[#09182f] via-[#061226] to-[#030914] p-4 sm:p-8 md:p-10 text-white shadow-2xl"
>
	<!-- Anti-Gravity Atmospheric Glow Lights -->
	<div
		class="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl animate-pulse"
		style="animation-duration: 8s;"
	></div>
	<div
		class="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl animate-pulse"
		style="animation-duration: 10s;"
	></div>
	<div
		class="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse"
		style="animation-duration: 7s;"
	></div>

	<!-- ============================================== -->
	<!-- HEADER: OFFICIAL SEALS & TITLE                 -->
	<!-- ============================================== -->
	<div
		class="relative z-10 mb-8 flex flex-col items-center justify-between gap-6 border-b border-white/10 pb-6 lg:flex-row"
	>
		<!-- Left: Municipal Official Seal -->
		<div class="flex items-center gap-4 sm:gap-5">
			<div class="relative flex items-center">
				<img
					src="/HRMO/official-seal.png"
					alt="Municipality of Tanauan Official Seal"
					class="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-amber-400/80 bg-white/10 object-contain p-1 shadow-lg shadow-amber-500/20"
				/>
			</div>
			<div>
				<span class="text-[11px] font-black uppercase tracking-widest text-amber-400 sm:text-xs">
					Republic of the Philippines • Province of Leyte
				</span>
				<h2 class="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
					Municipal Health Office
				</h2>
				<p class="text-xs sm:text-sm font-semibold text-cyan-200/80">
					Official Organizational Structure & Healthcare Hierarchy (34 Healthcare Personnel)
				</p>
			</div>
		</div>

		<!-- Right: Quick Stat Badges -->
		<div class="flex flex-wrap items-center gap-2.5 sm:gap-3">
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Total Personnel</span>
				<span class="text-sm font-black text-amber-300">34 Active Healthcare Staff</span>
			</div>
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Healthcare Mandate</span>
				<span class="text-sm font-black text-emerald-400">RA 11223 & RA 7160</span>
			</div>
			<div class="rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-center backdrop-blur-md">
				<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Operational Sections</span>
				<span class="text-sm font-black text-cyan-400">8 Clinical • 3 Support Units</span>
			</div>
		</div>
	</div>

	<!-- ============================================== -->
	<!-- INTERACTIVE TOOLBAR: SEARCH, VIEW TOGGLE, ZOOM -->
	<!-- ============================================== -->
	<div
		class="relative z-10 mb-8 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 p-3.5 backdrop-blur-md shadow-lg"
	>
		<!-- Search Input with Live Filter -->
		<div class="relative w-full xl:max-w-md shrink-0">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search 34 personnel by name, role, section..."
				class="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 shadow-inner outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
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
			<!-- View Mode Toggle: Tree Hierarchy first, Role Roster second -->
			<div class="flex rounded-xl border border-white/20 bg-slate-900/80 p-1">
				<button
					type="button"
					onclick={() => (viewMode = 'tree')}
					class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all {viewMode === 'tree' ? 'bg-cyan-600 text-white shadow' : 'text-slate-300 hover:text-white'}"
				>
					Tree Hierarchy
				</button>
				<button
					type="button"
					onclick={() => (viewMode = 'grid')}
					class="rounded-lg px-3 py-1.5 text-xs font-bold transition-all {viewMode === 'grid' ? 'bg-cyan-600 text-white shadow' : 'text-slate-300 hover:text-white'}"
				>
					Role Roster
				</button>
			</div>

			<!-- Tree Canvas Controls (available when in tree mode) -->
			{#if viewMode === 'tree'}
				<!-- View / Focus Selector: "What I want to view" -->
				<div class="flex items-center gap-1.5 rounded-xl border border-cyan-400/40 bg-slate-900/90 px-3 py-1.5 shadow-md">
					<span class="text-[11px] font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1">
						<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
						</svg>
						Focus:
					</span>
					<select
						bind:value={selectedFocus}
						onchange={handleFocusChange}
						class="bg-transparent text-xs font-bold text-white outline-none cursor-pointer pr-1"
					>
						<option value="all" class="bg-slate-900 text-amber-300 font-bold">🏢 All Sections (Entire Office • 34 Staff)</option>
						<option value="clinical" class="bg-slate-900 text-cyan-300 font-bold">🩺 All Clinical Services (8 Sections)</option>
						<option value="support" class="bg-slate-900 text-orange-300 font-bold">🚑 All Operations & Support (3 Units)</option>
						<optgroup label="── Clinical Sections ──" class="bg-slate-900 text-slate-400 font-semibold">
							{#each clinicalSections as sec}
								<option value={sec.id} class="bg-slate-900 text-white">
									{sec.title} ({sec.members.length})
								</option>
							{/each}
						</optgroup>
						<optgroup label="── Support Units ──" class="bg-slate-900 text-slate-400 font-semibold">
							{#each supportSections as sec}
								<option value={sec.id} class="bg-slate-900 text-white">
									{sec.title} ({sec.members.length})
								</option>
							{/each}
						</optgroup>
					</select>
				</div>

				<!-- Expand / Collapse All -->
				<button
					type="button"
					onclick={expandAll}
					class="rounded-xl border border-white/15 bg-white/5 px-2.5 py-2 text-xs font-bold text-slate-300 hover:bg-white/15 hover:text-white transition-colors"
					title="Expand all sections"
				>
					Expand All
				</button>
				<button
					type="button"
					onclick={collapseAll}
					class="rounded-xl border border-white/15 bg-white/5 px-2.5 py-2 text-xs font-bold text-slate-300 hover:bg-white/15 hover:text-white transition-colors"
					title="Collapse all sections"
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
					<span class="px-2 text-xs font-mono font-bold text-amber-300 min-w-[3rem] text-center">
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
						onclick={() => autoFit('contain')}
						class="ml-1 rounded-lg px-2.5 py-1 text-[11px] font-black text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all cursor-pointer flex items-center gap-1 border border-cyan-500/40"
						title="Automatically fit to screen based on what you want to view"
					>
						<svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
						</svg>
						Auto Fit
					</button>
					<button
						type="button"
						onclick={() => autoFit('width')}
						class="ml-1 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
						title="Fit all columns to screen width"
					>
						Fit Width
					</button>
					<button
						type="button"
						onclick={resetZoom}
						class="ml-1 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
						title="Reset Auto Fit"
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
		<!-- Section Filter Tabs -->
		<div class="mb-6 flex flex-wrap items-center gap-1.5 border-b border-white/10 pb-4">
			<button
				type="button"
				onclick={() => (selectedCategoryFilter = 'all')}
				class="rounded-xl px-3 py-1.5 text-xs font-bold transition-all {selectedCategoryFilter === 'all' ? 'bg-cyan-500 text-slate-950 font-black shadow-md' : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'}"
			>
				All Personnel ({allPersonnel.length})
			</button>
			{#each clinicalSections as sec}
				<button
					type="button"
					onclick={() => (selectedCategoryFilter = sec.title)}
					class="rounded-xl px-3 py-1.5 text-xs font-bold transition-all {selectedCategoryFilter === sec.title ? 'bg-cyan-500 text-slate-950 font-black shadow-md' : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'}"
				>
					{sec.shortTitle} ({sec.members.length})
				</button>
			{/each}
			{#each supportSections as sec}
				<button
					type="button"
					onclick={() => (selectedCategoryFilter = sec.title)}
					class="rounded-xl px-3 py-1.5 text-xs font-bold transition-all {selectedCategoryFilter === sec.title ? 'bg-cyan-500 text-slate-950 font-black shadow-md' : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'}"
				>
					{sec.shortTitle} ({sec.members.length})
				</button>
			{/each}
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4">
			{#each filteredPersonnel as person (person.id)}
				<div
					role="button"
					tabindex="0"
					onclick={() => openDetail(person)}
					onkeydown={(e) => e.key === 'Enter' && openDetail(person)}
					class="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-5 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-102 hover:border-cyan-400 cursor-pointer"
					style="box-shadow: 0 10px 30px {person.glow};"
				>
					<div class="flex items-start gap-3.5">
						<!-- Portrait Avatar -->
						<div
							class="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-white/80 bg-slate-900 shadow-md"
						>
							{#if !failedImages.has(person.id) && person.image}
								<img
									src={person.image}
									alt={person.name}
									class="h-full w-full object-cover object-top scale-115 origin-top transition-transform duration-300 group-hover:scale-125"
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
										.filter((c) => c && c.match(/[A-Z]/))
										.slice(0, 2)
										.join('')}
								</div>
							{/if}
						</div>

						<div class="min-w-0 flex-1">
							<span
								class="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider truncate max-w-full"
								style="background-color: {person.color}25; color: {person.color}; border: 1px solid {person.color}66;"
							>
								{person.badge}
							</span>
							<h3
								class="mt-1 text-sm sm:text-base font-black text-white group-hover:text-cyan-300 transition-colors leading-tight"
							>
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

					<div
						class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-slate-300"
					>
						<span class="text-slate-400 truncate max-w-[140px]">{person.roleCategory}</span>
						<span class="text-cyan-300 group-hover:underline transition-all">View Profile</span>
					</div>
				</div>
			{/each}
		</div>

	<!-- ============================================== -->
	<!-- MAIN CANVAS VIEWPORT (TREE HIERARCHY)         -->
	<!-- NON-OVERLAPPING STRICT BLUEPRINT ARCHITECTURE -->
	<!-- ============================================== -->
	{:else}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			bind:this={viewportEl}
			class="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-4 sm:p-6 cursor-grab active:cursor-grabbing select-none transition-[height] duration-300 ease-out"
			style="height: {canvasHeight}px;"
			onmousedown={startPan}
			onmousemove={doPan}
			onmouseup={endPan}
			onmouseleave={endPan}
			ontouchstart={startTouchPan}
			ontouchmove={doTouchPan}
			ontouchend={endPan}
			onwheel={handleWheel}
		>
			<!-- Draggable / Zoomable Transform Container -->
			<div
				class="w-full h-full flex flex-col items-center justify-start pointer-events-auto"
			>
				<div
					class="transition-transform duration-100 ease-out flex flex-col items-center origin-top py-2"
					style="transform: translate({panOffset.x}px, {panOffset.y}px) scale({zoomScale}); transform-origin: top center;"
				>
					<!-- Inner Min-Width Wrapper guaranteeing ZERO horizontal squishing / overlapping -->
					<div
						bind:this={treeWrapperEl}
						class="flex flex-col items-center w-max min-w-full px-8 py-2"
					>

						<!-- ============================================== -->
						<!-- TIER 1: MUNICIPAL HEALTH OFFICER (HEAD OF OFFICE) -->
						<!-- ============================================== -->
						<div class="relative flex flex-col items-center z-20">
							{@render nodeCard(mhoHead, 'w-72 sm:w-80')}

							<!-- Main Vertical Trunk Stem down -->
							{#if showClinicalTier}
								<div class="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-cyan-400 shadow-sm shadow-amber-400/50"></div>
							{:else if showSupportTier}
								<div class="h-10 w-1.5 bg-gradient-to-b from-amber-400 to-orange-400 shadow-sm shadow-amber-400/50"></div>
							{/if}
						</div>

						<!-- ============================================== -->
						<!-- TIER 2: 8 CLINICAL & SPECIALIZED SERVICE LANES -->
						<!-- ============================================== -->
						{#if showClinicalTier}
							<div class="relative flex flex-col items-center w-full z-10">
								<!-- Horizontal Crossbar spanning columns when multiple columns are shown -->
								{#if displayedClinicalSections.length > 1}
									<div
										class="pointer-events-none absolute top-0 left-[220px] right-[110px] h-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-sky-400 shadow-sm shadow-cyan-400/30"
									></div>
								{/if}

								<!-- The Dedicated Column Swimlanes -->
								<div class="relative flex items-start justify-center gap-6 pt-0">
									{#each displayedClinicalSections as section (section.id)}
										<!-- Special handling for Nursing & Midwifery: 2-column wide swimlane to match PDF -->
										{#if section.isMultiColumn}
											<div class="relative flex flex-col items-center w-[450px] shrink-0">
												<!-- Vertical Drop Line from Crossbar -->
												<div class="h-6 w-1" style="background-color: {section.color};"></div>

												<!-- Section Title Pill -->
												<div
													class="mb-3 flex w-full items-center justify-between rounded-xl px-3.5 py-1.5 shadow-md transition-all"
													style="background-color: {section.color}25; color: {section.color}; border: 1.5px solid {section.color}80;"
												>
													<span class="text-[11px] font-black uppercase tracking-wider truncate">
														{section.title}
													</span>
													<button
														type="button"
														onclick={() => (section.expanded = !section.expanded)}
														class="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-900/80 text-[11px] font-black text-white hover:scale-110 active:scale-95"
														title={section.expanded ? 'Collapse Section' : 'Expand Section'}
													>
														{section.expanded ? '−' : '+'}
													</button>
												</div>

												{#if section.expanded}
													<div class="flex flex-col items-center gap-3.5 w-full">
														<!-- Row 1: Tita Margallo & Mary Jay Coronado -->
														<div class="grid grid-cols-2 gap-3.5 w-full">
															{@render nodeCard(section.row1[0], 'w-full')}
															{@render nodeCard(section.row1[1], 'w-full')}
														</div>
														<!-- Connector -->
														<div class="h-3 w-1" style="background-color: {section.color}80;"></div>

														<!-- Row 2: Reinah Cabrera & Lany Gomez -->
														<div class="grid grid-cols-2 gap-3.5 w-full">
															{@render nodeCard(section.row2[0], 'w-full')}
															{@render nodeCard(section.row2[1], 'w-full')}
														</div>
														<!-- Connector -->
														<div class="h-3 w-1" style="background-color: {section.color}80;"></div>

														<!-- Row 3: Golda May Igrobay & Bernadette Redona -->
														<div class="grid grid-cols-2 gap-3.5 w-full">
															{@render nodeCard(section.row3[0], 'w-full')}
															{@render nodeCard(section.row3[1], 'w-full')}
														</div>
														<!-- Connector -->
														<div class="h-3 w-1" style="background-color: {section.color}80;"></div>

														<!-- Row 4: Lupicina Paujana & Fatima Esquivel -->
														<div class="grid grid-cols-2 gap-3.5 w-full">
															{@render nodeCard(section.row4[0], 'w-full')}
															{@render nodeCard(section.row4[1], 'w-full')}
														</div>
														<!-- Connector -->
														<div class="h-3 w-1" style="background-color: {section.color}80;"></div>

														<!-- Row 5 (Centered): Elvira Lamata -->
														<div class="flex justify-center w-full">
															{@render nodeCard(section.row5[0], 'w-56')}
														</div>
													</div>
												{:else}
													<div class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs text-slate-400 w-full">
														<span>9 healthcare personnel (collapsed)</span>
													</div>
												{/if}
											</div>

										<!-- Standard Single Column Sections (Triage, Pharmacy, Lab, Records, Dental, Sanitation, PhilHealth) -->
										{:else}
											<div class="relative flex flex-col items-center w-56 shrink-0">
												<!-- Vertical Drop Line from Crossbar -->
												<div class="h-6 w-1" style="background-color: {section.color};"></div>

												<!-- Section Title Pill -->
												<div
													class="mb-3 flex w-full items-center justify-between rounded-xl px-3.5 py-1.5 shadow-md transition-all"
													style="background-color: {section.color}25; color: {section.color}; border: 1.5px solid {section.color}80;"
												>
													<span class="text-[11px] font-black uppercase tracking-wider truncate">
														{section.title}
													</span>
													<button
														type="button"
														onclick={() => (section.expanded = !section.expanded)}
														class="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-900/80 text-[11px] font-black text-white hover:scale-110 active:scale-95"
														title={section.expanded ? 'Collapse Section' : 'Expand Section'}
													>
														{section.expanded ? '−' : '+'}
													</button>
												</div>

												<!-- Vertical Stack of Personnel in this Section (ZERO Horizontal Overlap) -->
												{#if section.expanded}
													<div class="flex flex-col items-center gap-3.5 w-full">
														{#each section.members as person, pIdx (person.id)}
															{#if pIdx > 0}
																<!-- Vertical Connector between cards -->
																<div class="h-3 w-1" style="background-color: {section.color}80;"></div>
															{/if}
															{@render nodeCard(person, 'w-full')}
														{/each}
													</div>
												{:else}
													<div class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs text-slate-400 w-full">
														<span>{section.members.length} personnel (collapsed)</span>
													</div>
												{/if}
											</div>
										{/if}
									{/each}
								</div>
							</div>
						{/if}

						<!-- ============================================== -->
						<!-- TIER 3: OPERATIONS & ADMINISTRATIVE SUPPORT    -->
						<!-- (Ambulance Driver, Clerical Aide, Utility)      -->
						<!-- ============================================== -->
						{#if showSupportTier}
							<div class="relative flex flex-col items-center w-full {showClinicalTier ? 'mt-12 pt-8 border-t-2 border-dashed border-white/20' : 'pt-2'} z-10">
								{#if showClinicalTier}
									<!-- Central Stem Connector Badge from the top -->
									<div
										class="absolute -top-4 rounded-full border border-amber-400/80 bg-slate-900 px-5 py-1 text-xs font-black uppercase tracking-wider text-amber-300 shadow-xl"
									>
										Administrative & Operations Support Trunk
									</div>

									<!-- Vertical Drop Line to Support Crossbar -->
									<div class="h-6 w-1.5 bg-gradient-to-b from-amber-400 to-orange-400 shadow-sm shadow-amber-400/50"></div>
								{/if}

								<!-- Support Services Horizontal Bar spanning across the units -->
								<div class="relative flex flex-col items-center w-full">
									{#if displayedSupportSections.length > 1}
										<div
											class="pointer-events-none absolute top-0 left-[230px] right-[230px] h-1.5 rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-slate-400 shadow-sm"
										></div>
									{/if}

									<div class="relative flex items-start justify-center gap-10 sm:gap-14 pt-0">
										{#each displayedSupportSections as section (section.id)}
											{#if section.id === 'sec-ambulance'}
												<!-- Unit 1: Ambulance Driver (2 cards side by side matching PDF) -->
												<div class="relative flex flex-col items-center w-[450px] shrink-0">
													<div class="h-6 w-1" style="background-color: {section.color};"></div>
													<div
														class="mb-3 flex w-full items-center justify-between rounded-xl px-3.5 py-1.5 shadow-md"
														style="background-color: {section.color}25; color: {section.color}; border: 1.5px solid {section.color}80;"
													>
														<span class="text-[11px] font-black uppercase tracking-wider truncate">
															{section.title}
														</span>
														<button
															type="button"
															onclick={() => (section.expanded = !section.expanded)}
															class="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-900/80 text-[11px] font-black text-white hover:scale-110 active:scale-95"
															title={section.expanded ? 'Collapse Unit' : 'Expand Unit'}
														>
															{section.expanded ? '−' : '+'}
														</button>
													</div>

													{#if section.expanded}
														<div class="grid grid-cols-2 gap-3.5 w-full">
															{@render nodeCard(section.members[0], 'w-full')}
															{@render nodeCard(section.members[1], 'w-full')}
														</div>
													{:else}
														<div class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs text-slate-400 w-full">
															<span>2 ambulance personnel (collapsed)</span>
														</div>
													{/if}
												</div>

											{:else if section.id === 'sec-clerical'}
												<!-- Unit 2: Admin Clerical Aide (1 card matching PDF) -->
												<div class="relative flex flex-col items-center w-56 shrink-0">
													<div class="h-6 w-1" style="background-color: {section.color};"></div>
													<div
														class="mb-3 flex w-full items-center justify-between rounded-xl px-3.5 py-1.5 shadow-md"
														style="background-color: {section.color}25; color: {section.color}; border: 1.5px solid {section.color}80;"
													>
														<span class="text-[11px] font-black uppercase tracking-wider truncate">
															{section.title}
														</span>
														<button
															type="button"
															onclick={() => (section.expanded = !section.expanded)}
															class="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-900/80 text-[11px] font-black text-white hover:scale-110 active:scale-95"
															title={section.expanded ? 'Collapse Unit' : 'Expand Unit'}
														>
															{section.expanded ? '−' : '+'}
														</button>
													</div>

													{#if section.expanded}
														<div class="flex flex-col items-center w-full">
															{@render nodeCard(section.members[0], 'w-full')}
														</div>
													{:else}
														<div class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs text-slate-400 w-full">
															<span>1 clerical personnel (collapsed)</span>
														</div>
													{/if}
												</div>

											{:else if section.id === 'sec-utility'}
												<!-- Unit 3: Support Staff / Utility Worker (2x2 grid matching PDF) -->
												<div class="relative flex flex-col items-center w-[450px] shrink-0">
													<div class="h-6 w-1" style="background-color: {section.color};"></div>
													<div
														class="mb-3 flex w-full items-center justify-between rounded-xl px-3.5 py-1.5 shadow-md"
														style="background-color: {section.color}25; color: {section.color}; border: 1.5px solid {section.color}80;"
													>
														<span class="text-[11px] font-black uppercase tracking-wider truncate">
															{section.title}
														</span>
														<button
															type="button"
															onclick={() => (section.expanded = !section.expanded)}
															class="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-900/80 text-[11px] font-black text-white hover:scale-110 active:scale-95"
															title={section.expanded ? 'Collapse Unit' : 'Expand Unit'}
														>
															{section.expanded ? '−' : '+'}
														</button>
													</div>

													{#if section.expanded}
														<div class="flex flex-col items-center gap-3.5 w-full">
															<div class="grid grid-cols-2 gap-3.5 w-full">
																{@render nodeCard(section.row1[0], 'w-full')}
																{@render nodeCard(section.row1[1], 'w-full')}
															</div>
															<div class="h-3 w-1" style="background-color: {section.color}80;"></div>
															<div class="grid grid-cols-2 gap-3.5 w-full">
																{@render nodeCard(section.row2[0], 'w-full')}
																{@render nodeCard(section.row2[1], 'w-full')}
															</div>
														</div>
													{:else}
														<div class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs text-slate-400 w-full">
															<span>4 utility personnel (collapsed)</span>
														</div>
													{/if}
												</div>
											{/if}
										{/each}
									</div>
								</div>
							</div>
						{/if}

					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- ============================================== -->
	<!-- FOOTER LEGEND & INSTRUCTIONS                   -->
	<!-- ============================================== -->
	<div
		class="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400"
	>
		<div class="flex flex-wrap items-center gap-3.5 sm:gap-5">
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#f59e0b] shadow-sm shadow-amber-400/50"></span>
				<span class="font-bold text-slate-200">Health Governance</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#06b6d4] shadow-sm shadow-cyan-400/50"></span>
				<span class="font-bold text-slate-200">Nursing & Midwifery</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#3b82f6] shadow-sm shadow-blue-400/50"></span>
				<span class="font-bold text-slate-200">Triage Intake</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#10b981] shadow-sm shadow-emerald-400/50"></span>
				<span class="font-bold text-slate-200">Pharmacy</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#8b5cf6] shadow-sm shadow-purple-400/50"></span>
				<span class="font-bold text-slate-200">Laboratory</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#ec4899] shadow-sm shadow-pink-400/50"></span>
				<span class="font-bold text-slate-200">Medical Record</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#14b8a6] shadow-sm shadow-teal-400/50"></span>
				<span class="font-bold text-slate-200">Dental</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#84cc16] shadow-sm shadow-lime-400/50"></span>
				<span class="font-bold text-slate-200">Sanitation</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#0284c7] shadow-sm shadow-sky-400/50"></span>
				<span class="font-bold text-slate-200">PhilHealth</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#ef4444] shadow-sm shadow-red-400/50"></span>
				<span class="font-bold text-slate-200">Ambulance</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#f97316] shadow-sm shadow-orange-400/50"></span>
				<span class="font-bold text-slate-200">Admin Clerical</span>
			</span>
			<span class="flex items-center gap-2">
				<span class="h-3 w-3 rounded-full bg-[#64748b] shadow-sm shadow-slate-400/50"></span>
				<span class="font-bold text-slate-200">Support Staff</span>
			</span>
		</div>
		<div class="flex items-center gap-2 text-slate-400 font-semibold">
			<span class="inline-block h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
			<span>💡 Click any card for details • Drag to pan • Ctrl + scroll to zoom • Use "Focus" dropdown to auto-fit sections</span>
		</div>
	</div>
</div>

<!-- ============================================== -->
<!-- REUSABLE SNIPPET: NODE CARD COMPONENT          -->
<!-- ============================================== -->
{#snippet nodeCard(person, cardWidth = 'w-56')}
	{@const isMatch = matchesSearch(person, searchQuery)}
	{@const hasQuery = searchQuery.trim().length > 0}

	<div
		class="relative flex flex-col items-center transition-all duration-300"
		style="opacity: {hasQuery && !isMatch ? 0.35 : 1}; transform: {hasQuery && isMatch ? 'scale(1.04)' : 'scale(1)'};"
	>
		<!-- Anti-Gravity Floating Card Container -->
		<div
			role="button"
			tabindex="0"
			onclick={() => openDetail(person)}
			onkeydown={(e) => e.key === 'Enter' && openDetail(person)}
			class="group relative flex {cardWidth} flex-col items-center rounded-3xl border-2 border-white/20 bg-gradient-to-b from-[#112444]/90 via-[#0c1a33]/90 to-[#071021]/95 p-3.5 sm:p-4 backdrop-blur-md shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-400 hover:shadow-2xl cursor-pointer"
			style="box-shadow: 0 10px 25px -5px {person.glow};"
		>
			<!-- Ambient Card Corner Highlight -->
			<div
				class="pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full opacity-30 blur-xl"
				style="background-color: {person.color};"
			></div>

			<!-- Official Portrait Avatar Frame -->
			<div
				class="relative mb-2.5 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/90 bg-slate-900 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400"
				style="box-shadow: 0 0 18px {person.glow};"
			>
				{#if !failedImages.has(person.id) && person.image}
					<img
						src={person.image}
						alt={person.name}
						class="h-full w-full object-cover object-top scale-115 origin-top transition-transform duration-300 group-hover:scale-125"
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
							.filter((c) => c && c.match(/[A-Z]/))
							.slice(0, 2)
							.join('')}
					</div>
				{/if}

				<!-- Tooltip Pill -->
				<span
					class="pointer-events-none absolute -bottom-1 rounded-full bg-cyan-400 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-slate-950 opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100"
				>
					PROFILE
				</span>
			</div>

			<!-- Person Role Badge -->
			<span
				class="mb-1 inline-block rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-xs text-center truncate max-w-full"
				style="background-color: {person.color}25; color: {person.color}; border: 1px solid {person.color}80;"
			>
				{person.badge}
			</span>

			<!-- Full Name -->
			<h3
				class="text-center text-xs sm:text-sm font-black text-white leading-tight transition-colors group-hover:text-cyan-300 line-clamp-1"
			>
				{person.name}
			</h3>

			<!-- Official Position -->
			<p class="mt-0.5 text-center text-[11px] font-bold text-sky-200 leading-snug line-clamp-1">
				{person.position}
			</p>

			<!-- Assignment / Window Badge -->
			<div
				class="mt-2 flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-semibold text-slate-300"
			>
				<span class="truncate max-w-[170px] text-center">{person.window}</span>
			</div>
		</div>
	</div>
{/snippet}

<!-- ============================================== -->
<!-- INTERACTIVE PERSON PROFILE DETAIL MODAL        -->
<!-- ============================================== -->
{#if selectedPerson}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
		transition:fade={{ duration: 200 }}
		role="dialog"
		aria-modal="true"
		aria-labelledby="person-detail-name"
		tabindex="-1"
		onkeydown={(e) => e.key === 'Escape' && closeDetail()}
		onclick={(e) => e.target === e.currentTarget && closeDetail()}
	>
		<div
			class="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border-2 border-white/20 bg-gradient-to-b from-[#0f2343] via-[#09172e] to-[#040b17] text-white shadow-2xl"
			style="box-shadow: 0 25px 60px -15px {selectedPerson.glow};"
			transition:scale={{ duration: 250, start: 0.95 }}
		>
			<!-- Ambient Decorative Corner Lighting -->
			<div
				class="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
				style="background-color: {selectedPerson.color};"
			></div>

			<!-- Modal Close Button -->
			<button
				type="button"
				onclick={closeDetail}
				class="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-slate-300 backdrop-blur-md hover:bg-white/20 hover:text-white transition-all cursor-pointer"
				title="Close modal (Esc)"
			>
				✕
			</button>

			<!-- Modal Body (Scrollable) -->
			<div class="max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6">
				<!-- Header Section: Portrait & Title -->
				<div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-white/10 pb-6">
					<div
						class="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-3xl border-3 border-white/90 bg-slate-900 shadow-2xl"
						style="box-shadow: 0 0 25px {selectedPerson.glow};"
					>
						{#if !failedImages.has(selectedPerson.id) && selectedPerson.image}
							<img
								src={selectedPerson.image}
								alt={selectedPerson.name}
								class="h-full w-full object-cover object-top scale-115 origin-top"
								onerror={() => onImgError(selectedPerson.id)}
							/>
						{:else}
							<div
								class="flex h-full w-full items-center justify-center font-black text-3xl text-white"
								style="background: {selectedPerson.color};"
							>
								{selectedPerson.name
									.split(' ')
									.map((n) => n[0])
									.filter((c) => c && c.match(/[A-Z]/))
									.slice(0, 2)
									.join('')}
							</div>
						{/if}
					</div>

					<div class="text-center sm:text-left flex-1 min-w-0">
						<span
							class="inline-block rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-wider"
							style="background-color: {selectedPerson.color}25; color: {selectedPerson.color}; border: 1px solid {selectedPerson.color}80;"
						>
							{selectedPerson.badge}
						</span>
						<h2 id="person-detail-name" class="mt-1.5 text-2xl font-black text-white leading-tight">
							{selectedPerson.name}
						</h2>
						<p class="text-sm font-bold text-cyan-300 mt-0.5">
							{selectedPerson.position}
						</p>
						<p class="mt-1 text-xs font-semibold text-slate-300">
							{selectedPerson.roleCategory}
						</p>
					</div>
				</div>

				<!-- Quick Metadata Grid -->
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
					<div class="rounded-xl border border-white/10 bg-white/5 p-3">
						<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Assignment Desk</span>
						<span class="mt-0.5 block font-bold text-white">{selectedPerson.window}</span>
					</div>
					<div class="rounded-xl border border-white/10 bg-white/5 p-3">
						<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Office Location</span>
						<span class="mt-0.5 block font-bold text-white">{selectedPerson.office}</span>
					</div>
					<div class="rounded-xl border border-white/10 bg-white/5 p-3">
						<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Service Hours</span>
						<span class="mt-0.5 block font-bold text-white">{selectedPerson.hours}</span>
					</div>
					<div class="rounded-xl border border-white/10 bg-white/5 p-3">
						<span class="block text-[10px] font-black uppercase tracking-wider text-slate-400">Official Contact</span>
						<span class="mt-0.5 block font-bold text-cyan-300">{selectedPerson.contact}</span>
					</div>
				</div>

				<!-- Role Overview Description -->
				<div>
					<h4 class="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
						Role Overview & Clinical Mandate
					</h4>
					<p class="text-xs sm:text-sm text-slate-200 leading-relaxed rounded-2xl border border-white/10 bg-white/5 p-4">
						{selectedPerson.overview}
					</p>
				</div>

				<!-- Key Official Duties -->
				{#if selectedPerson.duties && selectedPerson.duties.length > 0}
					<div>
						<h4 class="text-xs font-black uppercase tracking-wider text-cyan-400 mb-2.5">
							Key Responsibilities & Public Health Duties
						</h4>
						<ul class="space-y-2">
							{#each selectedPerson.duties as duty}
								<li class="flex items-start gap-2.5 text-xs text-slate-200">
									<span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-black mt-0.5">
										✓
									</span>
									<span class="leading-relaxed">{duty}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				<!-- Frontline Services & Mandates -->
				{#if selectedPerson.services && selectedPerson.services.length > 0}
					<div>
						<h4 class="text-xs font-black uppercase tracking-wider text-amber-400 mb-2.5">
							Core Healthcare Services & Programs
						</h4>
						<div class="flex flex-wrap gap-2">
							{#each selectedPerson.services as service}
								<span class="rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-200">
									{service}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Modal Footer -->
			<div class="flex items-center justify-end gap-3 border-t border-white/10 bg-black/30 p-4 px-6 sm:px-8">
				<button
					type="button"
					onclick={closeDetail}
					class="rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold text-white hover:bg-white/20 transition-all cursor-pointer"
				>
					Close Profile
				</button>
			</div>
		</div>
	</div>
{/if}
