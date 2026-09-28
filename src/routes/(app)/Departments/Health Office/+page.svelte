<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import HealthOfficeOrgChart from '$lib/Components/Offices/HealthOfficeOrgChart.svelte';
	import { mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const healthOfficeData = {
		officeName: "Municipal Health Office",
		officeCode: "MHO",
		category: "Public Health & Social Services",
		municipality: "Municipality of Tanauan, Leyte",
		citizensCharterUrl: "/citizens-charter/health-office",
		heroTitlePrefix: "Municipal",
		heroTitleHighlight: "Health",
		heroTitleSuffix: "Office",
		headRoleSubtitle: "Public Health Administrator",
		serviceWindowsTitle: "FRONTLINE HEALTHCARE SERVICES:",
		tagline:
			"Delivering accessible, compassionate, and quality primary healthcare to every Tanauanon, from disease prevention and health promotion to comprehensive clinical treatment and emergency medical response.",
		typewriterWords: [
			"Compassionate & High-Quality Healthcare for All",
			"Promoting Preventive Medicine Across 54 Barangays",
			"Accessible Primary Consultations, Pharmacy & Lab Care",
			"Rapid Emergency Response & Dignified Public Health Service"
		],
		head: {
			name: "Dr. Arlene V. Santo",
			title: "Municipal Health Officer",
			term: "Department Head",
			quote:
				"Our sacred duty is to guarantee that every family across all 54 barangays of Tanauan has prompt, dignified access to life-saving medical attention, preventive wellness, and compassionate primary care.",
			credentials: [
				"Doctor of Medicine (M.D.)",
				"Licensed Physician",
				"Public Health & Epidemiology Specialist"
			],
			room: "Ground Floor, Rural Health Unit (RHU), Tanauan Health Complex",
			schedule: "Monday – Friday: 8:00 AM – 5:00 PM (Emergency 24/7)"
		},
		stats: [
			{
				value: "54",
				suffix: "",
				label: "Barangays Covered",
				description: "Dedicated midwifes and healthcare catchment areas municipality-wide"
			},
			{
				value: "100",
				suffix: "%",
				label: "Primary Care Access",
				description: "Universal health consultations, triage, and free medicine programs"
			},
			{
				value: "24/7",
				suffix: "",
				label: "Emergency Dispatch",
				description: "Dedicated municipal ambulance drivers and active emergency standby"
			},
			{
				value: "98.8",
				suffix: "%",
				label: "Immunization Coverage",
				description: "Extensive maternal, infant, and community immunization coverage"
			}
		],
		mandates: [
			{
				index: "01",
				code: "CLIN-CARE",
				title: "Primary Clinical Consultations & Care",
				description:
					"Administers general health check-ups, diagnostics, medical certificates, patient triage, and outpatient consultations for citizens of all age groups.",
				tag: "Core Healthcare",
				details: [
					"General Medical Consultations & Outpatient Care",
					"Patient Triage & Vital Signs Assessment",
					"Medical Clearances & Health Certificates"
				]
			},
			{
				index: "02",
				code: "MAT-CHLD",
				title: "Maternal, Newborn & Child Health",
				description:
					"Guarantees safe motherhood, regular prenatal and postnatal examinations, infant nutrition monitoring, and comprehensive national immunization schedules.",
				tag: "Maternal Care",
				details: [
					"Prenatal, Delivery & Postnatal Clinical Follow-ups",
					"Expanded Program on Immunization (EPI) for Infants",
					"Nutritional Surveillance & Child Wellness Monitoring"
				]
			},
			{
				index: "03",
				code: "PHARM-MED",
				title: "Pharmacy & Essential Medicine Supply",
				description:
					"Dispenses physician-prescribed maintenance and acute medicines, manages local pharmacy inventory, and ensures equitable access to vital drugs.",
				tag: "Pharmacy Services",
				details: [
					"Free Government Medicine Dispensing",
					"Prescription Verification & Patient Education",
					"Essential Medicine Storage & Cold-Chain Management"
				]
			},
			{
				index: "04",
				code: "DIAG-LAB",
				title: "Diagnostic & Laboratory Testing",
				description:
					"Conducts clinical laboratory examinations including blood chemistry, hematology, urinalysis, sputum tests, and diagnostic specimen extraction.",
				tag: "Diagnostic Center",
				details: [
					"CBC, Urinalysis, Fecalysis & Blood Typing",
					"Screening for Infectious Diseases & TB Microscopy",
					"Accredited Medical Diagnostic Result Issuance"
				]
			},
			{
				index: "05",
				code: "ENV-SANI",
				title: "Sanitation & Environmental Health",
				description:
					"Inspects food establishments, water sources, and public facilities to enforce the Sanitation Code of the Philippines and safeguard public hygiene.",
				tag: "Sanitation & Safety",
				details: [
					"Sanitary Permit & Health Card Inspections",
					"Drinking Water Source Testing & Monitoring",
					"Community Vector Control & Disease Prevention"
				]
			},
			{
				index: "06",
				code: "DENT-PHIL",
				title: "Dental Healthcare & PhilHealth Programs",
				description:
					"Provides preventive oral care, tooth extraction, dental check-ups, alongside seamless PhilHealth Konsulta registration and benefit processing.",
				tag: "Specialized Programs",
				details: [
					"Oral Health Examinations & Extractions",
					"PhilHealth Konsulta Registration & Profiling",
					"Electronic Medical Records (EMR) Synchronization"
				]
			}
		],
		frontlineServices: [
			{
				title: "Primary Consultations & Triage",
				desc: "General check-ups, vital signs, diagnosis & medical clearances",
				window: "ROOM 1",
				url: "/citizens-charter/health-office"
			},
			{
				title: "Pharmacy & Medicines",
				desc: "Prescription dispensing, maintenance medications & counseling",
				window: "ROOM 2",
				url: "/citizens-charter/health-office"
			},
			{
				title: "Diagnostic Laboratory Services",
				desc: "Specimen extraction, routine tests, TB screening & results",
				window: "ROOM 3",
				url: "/citizens-charter/health-office"
			}
		],
		guidelinesTitle: "Health Service Guidelines & Protocols",
		guidelinesText:
			"In accordance with Universal Healthcare (UHC) and Republic Act 11032, the Municipal Health Office maintains continuous clinical services and prioritized emergency triage without noon breaks.",
		guidelinesServiceLabel: "CLINICAL ROOMS & HELPDESK",
		guidelinesFooterNote: "Dedicated priority triage for Senior Citizens, PWDs, Infants, and Pregnant Women.",
		structureDivisions: [
			{
				code: "01 // MHO HEAD",
				title: "Executive Leadership",
				subtitle: "Supervision & Municipal Health Strategy"
			},
			{
				code: "02 // NURSING & MIDWIFERY",
				title: "Clinical & Catchment Care",
				subtitle: "Rural Health Units & 54 Barangays"
			},
			{
				code: "03 // DIAGNOSTICS & PHARMACY",
				title: "Ancillary Services",
				subtitle: "Laboratory, Pharmacy & Dental Health"
			},
			{
				code: "04 // SANITATION & EMR",
				title: "Public Health & Records",
				subtitle: "Sanitary Inspection & PhilHealth"
			}
		],
		footerServices: [
			"Room 1: Primary Consultations & Triage (Senior & PWD Priority)",
			"Room 2: Pharmacy & Prescription Dispensing",
			"Room 3: Diagnostic Laboratory & Clinical Testing"
		],
		personnelSummary:
			"Meet the dedicated team of municipal health physicians, nurses, catchment midwives, medical technologists, pharmacists, dentists, sanitary inspectors, and emergency personnel serving Tanauan.",
		schedule: {
			hours: "Monday – Friday | 8:00 AM – 5:00 PM (Emergency 24/7)",
			location: "Tanauan Health Complex, Real St., Tanauan, Leyte",
			contactNumber: "(053) 321-2045 / +63 917 842 6110",
			email: "health@tanauanleyte.gov.ph",
			helpline: "Helpdesk & Triage: Main Reception Lobby"
		},
		department: "Health Office",
		downloadableForms: [
			{
				title: "MHO Patient Data & Clinical Record",
				description: "Comprehensive medical intake sheet detailing personal demographics, PhilHealth information, past medical/surgical history, NCD risk assessment, and OB-GYNE record.",
				fileUrl: "/forms/health-office/MHO-Patient-Data-Record.pdf",
				badge: "CLINIC FORM",
				fileSize: "881 KB • 2-Page PDF",
				service: "Outpatient Consultation & Primary Care"
			},
			{
				title: "MHO Individual Treatment Record (Dental)",
				description: "Official dental health status examination and oral health condition monitoring chart for tooth restorations, extractions, prophylaxes, and sealants.",
				fileUrl: "/forms/health-office/MHO-Individual-Treatment-Record-Dental.pdf",
				badge: "DENTAL FORM 1",
				fileSize: "371 KB • 2-Page PDF",
				service: "Dental Health Clinic & Oral Healthcare"
			},
			{
				title: "PhilHealth Member Registration Form (PMRF)",
				description: "Universal Health Care (UHC) member registration and record amendment form for direct and indirect contributors, KonSulTa provider selection, and dependent declarations.",
				fileUrl: "/forms/health-office/PhilHealth-Member-Registration-Form-PMRF.pdf",
				badge: "PMRF UHC v.1",
				fileSize: "711 KB • Official Form",
				service: "EMR & PhilHealth Konsulta Registration"
			}
		]
	};

	let activeModalSection = $state(null);

	function handleDivisionClick(division, idx) {
		if (idx === 1) {
			activeModalSection = 'nursing';
		} else if (idx === 2) {
			activeModalSection = 'pharmacy';
		} else if (idx === 3) {
			activeModalSection = 'sanitation';
		}
	}

	const pageData = $derived(mergeOfficeData(healthOfficeData, data?.officePageData));
</script>

{#snippet healthOrgChart()}
	<HealthOfficeOrgChart
		{activeModalSection}
		onSelectSection={(sec) => (activeModalSection = sec)}
	/>
{/snippet}

<OfficeTemplate
	{...pageData}
	showAwards={false}
	customOrgChart={healthOrgChart}
	onDivisionClick={handleDivisionClick}
/>
