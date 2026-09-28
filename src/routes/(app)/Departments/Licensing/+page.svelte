<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const licensingOfficeData = {
		officeName: 'Business Permit & Licensing Office',
		officeCode: 'BPLO',
		category: 'Business Development & Regulatory Services',
		municipality: 'Municipality of Tanauan, Leyte',
		citizensCharterUrl: '/citizens-charter/licensing',
		heroTitlePrefix: 'Business Permit &',
		heroTitleHighlight: 'Licensing',
		heroTitleSuffix: 'Section',
		headRoleSubtitle: 'Officer-In-Charge',
		serviceWindowsTitle: 'FRONTLINE BUSINESS SERVICES:',
		tagline:
			'Supporting business growth through efficient licensing services, transparent regulatory processes, and fair compliance enforcement for all entrepreneurs and enterprises in Tanauan.',
		typewriterWords: [
			'Streamlined Business Registration & Renewal',
			'Promoting Fair Regulation & Ease of Doing Business',
			'Transparent, Fast & Responsive Frontline Assistance',
			'Empowering Local Entrepreneurs Across 54 Barangays'
		],
		head: {
			name: 'Rodele E. Maceda',
			title: 'Officer-In-Charge',
			term: 'Section Head',
			quote:
				'Our primary commitment is to make doing business in Tanauan accessible, expeditious, and transparent, partnering with our business community to stimulate inclusive local economic progress.',
			credentials: [
				'Business Development Services Specialist',
				'Public Administration & Regulatory Compliance',
				'Local Government Operations Officer'
			],
			room: 'Ground Floor, Business One-Stop Shop (BOSS), Tanauan Municipal Hall',
			schedule: 'Monday – Friday: 8:00 AM – 5:00 PM (No Noon Break)'
		},
		stats: [
			{
				value: '2,500',
				suffix: '+',
				label: 'Active Businesses',
				description: 'Registered enterprises and micro-businesses operating in Tanauan'
			},
			{
				value: '95',
				suffix: '%',
				label: 'Permit Processing',
				description: 'Target turnaround rating under Ease of Doing Business standards'
			},
			{
				value: '100',
				suffix: '%',
				label: 'Compliance Rate',
				description: 'Regulatory adherence across commercial establishments'
			},
			{
				value: '12',
				suffix: '+',
				label: 'Years of Service',
				description: 'Dedicated frontline support fostering municipal enterprise growth'
			}
		],
		mandates: [
			{
				index: '01',
				code: 'BUS-PERM',
				title: 'Business Permit Issuance & Assessment',
				description:
					"Processes, evaluates, and issues new Mayor's Business Permits for commercial, industrial, and service establishments across Tanauan.",
				tag: 'Core Service',
				details: [
					'New Business Application Verification & Assessment',
					'Evaluation of Locational Clearance & Barangay Clearances',
					"Official Mayor's Permit Document Release"
				]
			},
			{
				index: '02',
				code: 'LIC-RENW',
				title: 'Annual License Renewal & Assessment',
				description:
					'Facilitates timely business license renewals, verifies tax declarations, and coordinates statutory clearance validations during the annual BOSS period.',
				tag: 'Business Continuity',
				details: [
					'Annual Business Tax Assessment & Verification',
					'Business One-Stop Shop (BOSS) Integration',
					'Penalty Mitigation & Renewal Advisory'
				]
			},
			{
				index: '03',
				code: 'COMP-MON',
				title: 'Compliance Monitoring & Inspections',
				description:
					'Conducts joint and routine regulatory ocular inspections of commercial entities to verify adherence to municipal ordinances and zoning laws.',
				tag: 'Field Enforcement',
				details: [
					'Joint Inspection Team (JIT) Coordination',
					'Post-Audit Assessment & Ordinance Adherence',
					'Issuance of Compliance & Rectification Notices'
				]
			},
			{
				index: '04',
				code: 'FEE-COLL',
				title: 'Regulatory Fee Collection & Billing',
				description:
					"Calculates regulatory fees, sanitary inspection charges, and business licensing dues in strict coordination with the Municipal Treasurer's Office.",
				tag: 'Fiscal Coordination',
				details: [
					'Assessment Order of Payment (AOP) Computation',
					'Special Permit Fee Evaluation',
					'Coordinated Billing with Municipal Treasury'
				]
			},
			{
				index: '05',
				code: 'REC-MGMT',
				title: 'Business Registry & Records Management',
				description:
					'Maintains an updated master registry of registered businesses, trade names, capital investments, and employment statistics.',
				tag: 'Data & Systems',
				details: [
					'Comprehensive Business Enterprise Database Management',
					'Statistical Economic Reports for SB & Executive Leadership',
					'Digital Archive of Historical Clearances & Permits'
				]
			},
			{
				index: '06',
				code: 'POL-ENFC',
				title: 'Licensing Policy & Ordinance Enforcement',
				description:
					'Implements the Local Revenue Code, Anti-Red Tape Authority (ARTA) mandates, and local resolutions concerning commercial operation guidelines.',
				tag: 'Governance & Policy',
				details: [
					'Enforcement of RA 11032 (Ease of Doing Business)',
					'Ordinance Implementation & Public Advisory Notices',
					'Citizen Grievance & Inquiries Assistance'
				]
			}
		],
		frontlineServices: [
			{
				title: 'New Business Permit Application',
				desc: 'Initial registration, document review & tax assessment',
				window: 'WINDOW 1',
				url: '/citizens-charter/licensing'
			},
			{
				title: 'Business Permit Renewal',
				desc: 'Annual renewal, clearance validation & permit release',
				window: 'WINDOW 2',
				url: '/citizens-charter/licensing'
			},
			{
				title: 'Special Permits & Clearances',
				desc: 'Special event permits, certifications & retirement filing',
				window: 'WINDOW 3',
				url: '/citizens-charter/licensing'
			}
		],
		guidelinesTitle: 'Business Permitting Service Protocols',
		guidelinesText:
			'Pursuant to RA 11032 (Ease of Doing Business and Efficient Government Service Delivery Act of 2018), the Business Permit and Licensing Office operates with continuous frontline services without noon breaks.',
		guidelinesServiceLabel: 'BPLO FRONTLINE COUNTERS',
		guidelinesFooterNote:
			'Special lane provided for Senior Citizens, PWDs, and Pregnant Women entrepreneurs.',
		structureDivisions: [
			{
				code: '01 // MUNICIPAL TREASURY',
				title: 'Robert T. Prisno',
				subtitle: 'Acting Municipal Treasurer'
			},
			{
				code: '02 // BPLO IN-CHARGE',
				title: 'Rodele E. Maceda',
				subtitle: 'BPLO – Officer-In-Charge'
			},
			{
				code: '03 // CLERK – INSPECTION',
				title: 'Renerio P. Budaño',
				subtitle: 'Clerk – Inspection'
			},
			{
				code: '04 // OPERATIONS & CLERKS',
				title: 'B. Malate, Jr. & L. Alabar',
				subtitle: 'Clerks – Permitting & Records'
			}
		],
		footerServices: [
			'Window 1: New Business Permit Application & Evaluation',
			'Window 2: Business Permit Renewal & Clearance Verification',
			'Window 3: Special Permits, Business Retirement & Certifications'
		],
		personnelSummary:
			'Meet the dedicated team of business licensing officers, evaluators, inspectors, and administrative staff facilitating commerce and entrepreneurship in Tanauan.',
		schedule: {
			hours: 'Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)',
			location: 'Ground Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
			contactNumber: '(053) 321-2045 / +63 917 842 6110',
			email: 'licensing@tanauanleyte.gov.ph',
			helpline: 'Business One-Stop Shop (BOSS) Helpdesk: Ground Floor Lobby'
		},
		department: 'Licensing',
		downloadableFormsTitle: 'Downloadable BPLO Forms & Citizen Checklists',
		downloadableFormsSubtitle:
			'Official printable application forms and documentary checklists provided by the Business Permit and Licensing Office for expedited frontline registration and processing.',
		downloadableForms: [
			{
				title: 'Unified Application Form (UAF) for Business Permit',
				description:
					'Official ARTA/DILG Annex 1 two-page application form covering applicant details, business activity lines, Lessor data, LGU document verification, and BFP fire safety fee assessment.',
				fileUrl: '/forms/licensing/BPLO-Unified-Application-Form-Business-Permit.pdf',
				badge: 'ANNEX 1 • 2-PAGE PDF',
				fileSize: '275 KB • Official Form',
				service: 'Business Permit Registration & Renewal'
			},
			{
				title: 'Application Form for Public Transport Service',
				description:
					'Official registration and renewal intake sheet for MCH, Pedicab, Single Motor, e-Trike, and Motopot operators/drivers, including MV OR/CR info and traffic seminar certification.',
				fileUrl: '/forms/licensing/BPLO-Application-Form-Public-Transport-Service.pdf',
				badge: 'TRANS-01 • PDF',
				fileSize: '192 KB • Official Form',
				service: 'Public Transport Franchising & Licensing'
			},
			{
				title: 'Checklist Requirements: Business Application',
				description:
					'Official documentary guide for New and Renewal business applications detailing general requirements (UAF, DTI/SEC/CDA, Barangay & Sanitary clearances, BFP-FSIC) and additional backroom clearances.',
				fileUrl:
					'/forms/licensing/BPLO-Checklist-Documentary-Requirements-Business-Application.jpg',
				badge: 'CHECKLIST • IMAGE',
				fileSize: '159 KB • Official Checklist',
				service: 'Commercial Business Establishments'
			},
			{
				title: 'Checklist Requirements: MCH, Motopot & Single Motorcycle',
				description:
					"Required documentary checklist including application form, route/residence clearance, cedula, traffic seminar indorsement, police clearance, LTO MV registration/OR, driver's licenses, and BPLO/PNP inspection.",
				fileUrl: '/forms/licensing/BPLO-Checklist-MCH-Motopot-Single-Motorcycle.jpg',
				badge: 'CHECKLIST • IMAGE',
				fileSize: '160 KB • Official Checklist',
				service: 'Motorcycle & Tricycle Permitting'
			},
			{
				title: 'Checklist Requirements: e-Trike & Pedicab',
				description:
					'Complete list of documentary requirements for electric tricycles and pedicabs covering application form, traffic head indorsement, barangay clearance, residence certificate, proof of ownership, and unit inspection.',
				fileUrl: '/forms/licensing/BPLO-Checklist-eTrike-Pedicab.jpg',
				badge: 'CHECKLIST • IMAGE',
				fileSize: '147 KB • Official Checklist',
				service: 'e-Trike & Pedicab Licensing'
			}
		]
	};

	let showImageModal = $state(false);

	const pageData = $derived(mergeOfficeData(licensingOfficeData, data?.officePageData));
</script>

{#snippet licensingAccomplishments()}
	<div class="space-y-8">
		<!-- Featured Official Scorecard Card -->
		<div class="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm sm:p-8">
			<!-- Header / Folio Tag -->
			<div
				class="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center"
			>
				<div>
					<div class="mb-2 flex items-center gap-2">
						<span class="h-3 w-3 animate-pulse rounded-full bg-amber-500"></span>
						<span class="font-mono text-xs font-black tracking-widest text-blue-950 uppercase">
							AUDITED REPORT // BPLO-2026-Q3
						</span>
						<span
							class="rounded-md border border-emerald-300 bg-emerald-100 px-2.5 py-0.5 text-[11px] font-black text-emerald-800"
						>
							OFFICIAL SCORECARD
						</span>
					</div>
					<h3 class="text-2xl font-black tracking-tight text-blue-950 sm:text-3xl">
						Comparative Summary of Registration and Assessment
					</h3>
					<p class="mt-1 text-sm font-semibold text-slate-600">
						Audited performance benchmark as of August 2026 • January – August 2025 vs. January –
						August 2026
					</p>
				</div>

				<button
					type="button"
					onclick={() => (showImageModal = true)}
					class="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-blue-950 px-5 py-3 text-xs font-black tracking-wider text-amber-300 uppercase shadow-md transition-all hover:scale-102 hover:bg-blue-900 hover:text-white active:scale-98"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<span>View Official Document</span>
				</button>
			</div>

			<!-- Executive Comparative KPI Cards -->
			<div class="my-8 grid grid-cols-1 gap-5 md:grid-cols-3">
				<div class="rounded-2xl border-2 border-blue-200 bg-blue-50/80 p-5">
					<div class="mb-1 text-[11px] font-black tracking-wider text-blue-900 uppercase">
						TOTAL REGISTRATIONS (2026)
					</div>
					<div class="flex items-baseline gap-2">
						<span class="text-3xl font-black text-blue-950 sm:text-4xl">3,637</span>
						<span class="text-xs font-bold text-slate-500">units</span>
					</div>
					<div class="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-700">
						<span class="rounded bg-emerald-200 px-1.5 py-0.5 font-black text-emerald-950"
							>↑ +6.4%</span
						>
						<span>from 3,418 in 2025</span>
					</div>
				</div>

				<div class="rounded-2xl border-2 border-amber-200 bg-amber-50/80 p-5">
					<div class="mb-1 text-[11px] font-black tracking-wider text-amber-900 uppercase">
						TOTAL ASSESSMENT REVENUE
					</div>
					<div class="flex items-baseline gap-2">
						<span class="text-2xl font-black text-amber-950 sm:text-3xl">₱25,801,882.26</span>
					</div>
					<div class="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-700">
						<span class="rounded bg-emerald-200 px-1.5 py-0.5 font-black text-emerald-950"
							>↑ +17.7%</span
						>
						<span>from ₱21.92M in 2025</span>
					</div>
				</div>

				<div class="rounded-2xl border-2 border-emerald-200 bg-emerald-50/80 p-5">
					<div class="mb-1 text-[11px] font-black tracking-wider text-emerald-900 uppercase">
						BUSINESS ENTERPRISES ASSESSMENT
					</div>
					<div class="flex items-baseline gap-2">
						<span class="text-2xl font-black text-emerald-950 sm:text-3xl">₱23,299,031.08</span>
					</div>
					<div class="mt-2 flex items-center gap-1 text-xs font-bold text-emerald-700">
						<span class="rounded bg-emerald-200 px-1.5 py-0.5 font-black text-emerald-950"
							>↑ +20.3%</span
						>
						<span>from ₱19.35M in 2025</span>
					</div>
				</div>
			</div>

			<!-- Official Data Table matching the Municipal Slide -->
			<div class="overflow-x-auto rounded-2xl border-2 border-slate-300 shadow-inner">
				<table class="w-full border-collapse text-left text-sm">
					<thead>
						<tr class="border-b-2 border-amber-500 bg-amber-400 font-black text-blue-950">
							<th
								rowspan="2"
								class="border-r border-amber-500/60 px-5 py-4 align-middle tracking-wider uppercase"
							>
								Particular
							</th>
							<th
								colspan="2"
								class="border-r border-amber-500/60 bg-amber-500/30 px-4 py-2.5 text-center tracking-wider uppercase"
							>
								January – August 2025
							</th>
							<th
								colspan="2"
								class="bg-amber-500/50 px-4 py-2.5 text-center tracking-wider uppercase"
							>
								January – August 2026
							</th>
						</tr>
						<tr
							class="border-b-2 border-slate-300 bg-amber-300/80 text-xs font-black text-blue-950 uppercase"
						>
							<th class="border-r border-amber-400/80 px-4 py-2.5 text-center">Registered</th>
							<th class="border-r border-amber-500/80 px-4 py-2.5 text-right">Assessment (₱)</th>
							<th class="border-r border-amber-400/80 px-4 py-2.5 text-center">Registered</th>
							<th class="px-4 py-2.5 text-right">Assessment (₱)</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-200 bg-white font-medium text-slate-800">
						<!-- Row 1: Business Establishment -->
						<tr class="transition-colors hover:bg-slate-50">
							<td class="border-r border-slate-200 px-5 py-3.5 font-black text-blue-950">
								Business Establishment
							</td>
							<td class="border-r border-slate-200 px-4 py-3.5 text-center font-mono">1,137</td>
							<td class="border-r border-slate-200 px-4 py-3.5 text-right font-mono"
								>19,358,167.16</td
							>
							<td
								class="border-r border-slate-200 px-4 py-3.5 text-center font-mono font-bold text-blue-900"
								>1,154</td
							>
							<td class="px-4 py-3.5 text-right font-mono font-bold text-emerald-700"
								>23,299,031.08</td
							>
						</tr>

						<!-- Row 2: Public Transport -->
						<tr class="transition-colors hover:bg-slate-50">
							<td class="border-r border-slate-200 px-5 py-3.5 font-black text-blue-950">
								Public Transport
							</td>
							<td class="border-r border-slate-200 px-4 py-3.5 text-center font-mono">2,165</td>
							<td class="border-r border-slate-200 px-4 py-3.5 text-right font-mono"
								>2,198,881.00</td
							>
							<td
								class="border-r border-slate-200 px-4 py-3.5 text-center font-mono font-bold text-blue-900"
								>2,355</td
							>
							<td class="px-4 py-3.5 text-right font-mono font-bold text-blue-950">2,100,761.40</td>
						</tr>

						<!-- Row 3: Special Permit -->
						<tr class="transition-colors hover:bg-slate-50">
							<td class="border-r border-slate-200 px-5 py-3.5 font-black text-blue-950">
								Special Permit
							</td>
							<td class="border-r border-slate-200 px-4 py-3.5 text-center font-mono">116</td>
							<td class="border-r border-slate-200 px-4 py-3.5 text-right font-mono">363,112.35</td>
							<td
								class="border-r border-slate-200 px-4 py-3.5 text-center font-mono font-bold text-blue-900"
								>128</td
							>
							<td class="px-4 py-3.5 text-right font-mono font-bold text-emerald-700">402,089.78</td
							>
						</tr>

						<!-- Row 4: Total -->
						<tr
							class="border-t-2 border-b-2 border-yellow-500 bg-yellow-300 font-black text-blue-950"
						>
							<td class="border-r border-yellow-400 px-5 py-4 text-base tracking-wider uppercase">
								Total
							</td>
							<td class="border-r border-yellow-400 px-4 py-4 text-center font-mono text-base"
								>3,418</td
							>
							<td class="border-r border-yellow-500 px-4 py-4 text-right font-mono text-base"
								>21,920,160.51</td
							>
							<td class="border-r border-yellow-400 px-4 py-4 text-center font-mono text-base"
								>3,637</td
							>
							<td class="px-4 py-4 text-right font-mono text-base text-blue-950">25,801,882.26</td>
						</tr>

						<!-- Row 5: Increase / Decrease Percentage -->
						<tr class="bg-amber-50/70 font-black text-slate-900">
							<td class="border-r border-slate-200 px-5 py-3.5 text-xs tracking-wider uppercase">
								Increase / Decrease (%)
							</td>
							<td
								colspan="4"
								class="px-5 py-3.5 text-center font-mono text-sm font-black text-emerald-700"
							>
								6% Registrations Increase &nbsp;•&nbsp; 17.7% Revenue Assessment Increase
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Audit Subtext / Verification Footer -->
			<div
				class="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-500 sm:flex-row"
			>
				<div class="flex items-center gap-2">
					<span class="h-2 w-2 rounded-full bg-blue-900"></span>
					<span>Business Permit & Licensing Office (BPLO) • Official Municipal Records</span>
				</div>
				<div>Report Reference: BPLO-AUDIT-2026-AUG</div>
			</div>
		</div>
	</div>
{/snippet}

<!-- Official Document Preview Modal -->
{#if showImageModal}
	<div
		class="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-blue-950/80 p-4 backdrop-blur-md duration-200"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border-4 border-amber-400 bg-white shadow-2xl"
		>
			<!-- Header -->
			<div
				class="flex items-center justify-between border-b border-blue-800 bg-gradient-to-r from-blue-950 to-blue-900 px-6 py-4 text-white"
			>
				<div class="flex items-center gap-3">
					<span class="h-3 w-3 rounded-full bg-amber-400"></span>
					<div>
						<h4 class="text-base leading-tight font-black tracking-tight text-white">
							Comparative Summary of Registration and Assessment (As of August 2026)
						</h4>
						<span class="font-mono text-xs text-amber-300"
							>BPLO Official Performance Disclosure</span
						>
					</div>
				</div>
				<button
					type="button"
					onclick={() => (showImageModal = false)}
					class="rounded-xl bg-white/10 p-2 text-white transition-all hover:bg-red-600"
					aria-label="Close document"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<!-- Image Container -->
			<div class="flex items-center justify-center overflow-y-auto bg-slate-900 p-4 sm:p-6">
				<img
					src="/images/accomplishments/bplo-comparative-summary-2026.jpg"
					alt="Comparative Summary of Registration and Assessment As of August 2026"
					class="h-auto max-h-[75vh] w-full rounded-xl border border-slate-700 object-contain shadow-lg"
				/>
			</div>

			<!-- Footer Action -->
			<div
				class="flex items-center justify-between border-t border-slate-200 bg-slate-100 px-6 py-3.5 text-xs"
			>
				<span class="font-bold text-slate-600"
					>Business Permit & Licensing Office, Municipality of Tanauan, Leyte</span
				>
				<a
					href="/images/accomplishments/bplo-comparative-summary-2026.jpg"
					target="_blank"
					download="BPLO-Comparative-Summary-2026.jpg"
					class="rounded-xl bg-blue-950 px-4 py-2 font-black tracking-wider text-amber-300 uppercase transition-all hover:bg-blue-900 hover:text-white"
				>
					Download Full Resolution ↗
				</a>
			</div>
		</div>
	</div>
{/if}

<OfficeTemplate {...pageData} showAwards={true} customAccomplishments={licensingAccomplishments} />
