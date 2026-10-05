<script>
	import { fade, slide, scale } from 'svelte/transition';

	// View Modes: 'organogram' (Tree Hierarchy), 'prime' (PRIME-HRM Pillars), 'directory' (Searchable Roster)
	let activeTab = $state('organogram');
	let searchQuery = $state('');
	let selectedDivision = $state('all');
	let selectedMember = $state(null);

	// Complete Official HRMO Structure & Core Units for Municipality of Tanauan, Leyte
	const hrmoPersonnel = [
		// 1. EXECUTIVE GOVERNANCE
		{
			id: 'mayor-merilo',
			name: 'Hon. Ma. Gina E. Merilo',
			title: 'Municipal Mayor',
			division: 'Executive',
			divisionLabel: 'Executive Governance & Appointing Authority',
			tier: 'mayor',
			level: 1,
			badge: 'Local Chief Executive',
			color: 'border-amber-400 bg-gradient-to-b from-blue-950 to-blue-900 text-white',
			badgeColor: 'bg-amber-400 text-blue-950',
			stat: 'Appointing Authority',
			duties:
				'Serves as the Local Chief Executive and official Appointing Authority for the Municipality of Tanauan, Leyte. Issues appointments for plantilla, casual, and contractual personnel, and approves municipal human resource development policies in accordance with Civil Service laws.',
			legalBasis: 'Local Government Code of 1991 (RA 7160), Section 444 (b)(1)(v)'
		},
		{
			id: 'admin-abando',
			name: 'Ret. Judge Ephrem S. Abando',
			title: 'Municipal Administrator',
			division: 'Executive',
			divisionLabel: 'Executive Management & Administration',
			tier: 'admin',
			level: 2,
			badge: 'Executive Oversight',
			color: 'border-blue-800 bg-gradient-to-b from-slate-900 to-blue-950 text-white',
			badgeColor: 'bg-blue-900 text-amber-300 border border-amber-400/40',
			stat: 'Executive Coordination',
			duties:
				'Exercises executive administrative supervision assisting the Municipal Mayor in coordinating the operations of all statutory municipal departments and ensuring efficient personnel management throughout the LGU.',
			legalBasis: 'Local Government Code of 1991 (RA 7160), Section 480'
		},
		{
			id: 'head-tizon',
			name: 'Atty. Federico C. Tizon, EnP',
			title: 'Municipal Government Department Head (HRMO III)',
			division: 'Executive',
			divisionLabel: 'Office of the Department Head',
			tier: 'head',
			level: 3,
			badge: 'HRMO Head / Legal Specialist',
			color: 'border-amber-400 bg-gradient-to-b from-blue-900 via-blue-950 to-slate-900 text-white shadow-xl',
			badgeColor: 'bg-amber-400 text-blue-950 font-black',
			stat: 'CSC PRIME-HRM Lead',
			duties:
				'Directs, administers, and supervises the comprehensive human resource management program of the Municipality of Tanauan. Enforces Civil Service Commission (CSC) laws, rules, and jurisprudence; chairs HR development committees, provides legal counsel on administrative personnel matters, and steers the municipality toward PRIME-HRM Bronze/Silver accreditation.',
			legalBasis: 'Civil Service Law (PD 807) & CSC MC No. 19, s. 2012 / LGC Sec. 474'
		},

		// 2. RECRUITMENT, SELECTION & PLACEMENT (RSP)
		{
			id: 'rsp-lead',
			name: 'Recruitment, Selection & Placement Unit',
			title: 'Human Resource Management Officer (RSP Lead)',
			division: 'RSP',
			divisionLabel: 'Recruitment, Selection & Placement (RSP)',
			tier: 'division',
			level: 4,
			badge: 'Core Pillar I',
			color: 'border-blue-700 bg-white text-blue-950',
			badgeColor: 'bg-blue-950 text-amber-300',
			stat: 'Merit & Fitness',
			duties:
				'Administers competitive, transparent, and merit-based recruitment for all permanent, casual, and job-order positions. Manages job vacancy postings, qualification standard evaluations, written examinations, and secretarial support to the Human Resource Merit Promotion and Selection Board (HRMPSB).',
			legalBasis: '2017 Omnibus Rules on Appointments and Other Human Resource Actions (ORAOHRA)'
		},
		{
			id: 'rsp-student-immersion',
			name: 'Student Immersion & Internship Desk',
			title: 'OJT & Work Immersion Coordinator',
			division: 'RSP',
			divisionLabel: 'Student Immersion & OJT Unit',
			tier: 'staff',
			level: 5,
			badge: 'Youth & Academia',
			color: 'border-slate-200 bg-slate-50 text-slate-800',
			badgeColor: 'bg-blue-100 text-blue-900 border border-blue-200',
			stat: 'OJT / Immersion',
			duties:
				'Facilitates institutional partnership MOAs with universities, colleges, and Senior High Schools for student on-the-job training (OJT) and Grade 12 work immersion across municipal departments.',
			legalBasis: 'DepEd DO No. 30, s. 2017 & LGU Youth Training Partnership Guidelines'
		},

		// 3. LEARNING & PERFORMANCE MANAGEMENT (L&D / PM)
		{
			id: 'ld-lead',
			name: 'Learning & Performance Management Unit',
			title: 'HR Development Officer (L&D / PM Lead)',
			division: 'LD',
			divisionLabel: 'Learning, Development & Performance Management',
			tier: 'division',
			level: 4,
			badge: 'Core Pillar II & III',
			color: 'border-blue-700 bg-white text-blue-950',
			badgeColor: 'bg-blue-950 text-amber-300',
			stat: 'Competency Growth',
			duties:
				'Formulates the annual Municipal Learning and Development Plan based on systematic Training Needs Analysis (TNA). Oversees the Strategic Performance Management System (SPMS), audited Individual/Office Performance Commitment Reviews (IPCR/OPCR), and mandatory CSC training programs.',
			legalBasis: 'CSC MC No. 6, s. 2012 (SPMS Guidelines) & CSC MC No. 3, s. 2012'
		},
		{
			id: 'praise-unit',
			name: 'Rewards & Recognition Secretariat',
			title: 'PRAISE Committee Focal Person',
			division: 'LD',
			divisionLabel: 'Employee Welfare & Recognition',
			tier: 'staff',
			level: 5,
			badge: 'Core Pillar IV',
			color: 'border-slate-200 bg-slate-50 text-slate-800',
			badgeColor: 'bg-amber-100 text-amber-900 border border-amber-300',
			stat: 'PRAISE Incentive',
			duties:
				'Implements the Program on Awards and Incentives for Service Excellence (PRAISE) to recognize outstanding public servants, service milestone honorees, and innovative civil service contributors.',
			legalBasis: 'CSC Resolution No. 010112 / CSC MC No. 01, s. 2001'
		},

		// 4. PERSONNEL ADMINISTRATION, COMPENSATION & BENEFITS (PACB)
		{
			id: 'pacb-lead',
			name: 'Personnel Administration & Records Unit',
			title: 'Supervising HRMO (Records & Benefits Lead)',
			division: 'PACB',
			divisionLabel: 'Personnel Administration, Compensation & Benefits',
			tier: 'division',
			level: 4,
			badge: 'Records & Benefits',
			color: 'border-blue-700 bg-white text-blue-950',
			badgeColor: 'bg-blue-950 text-amber-300',
			stat: '201 Archival',
			duties:
				'Maintains official 201 Personnel Files, service cards, and digital biometric attendance archives. Audits statutory leave applications, monetization requests, and service records for municipal personnel.',
			legalBasis: 'CSC Memorandum Circular No. 41, s. 1998 (Omnibus Rules on Leave)'
		},
		{
			id: 'pacb-compensation',
			name: 'Compensation, Payroll & Social Benefits Desk',
			title: 'Benefits & Step Increment Specialist',
			division: 'PACB',
			divisionLabel: 'Payroll & Social Security Liaison',
			tier: 'staff',
			level: 5,
			badge: 'GSIS / PhilHealth',
			color: 'border-slate-200 bg-slate-50 text-slate-800',
			badgeColor: 'bg-blue-100 text-blue-900 border border-blue-200',
			stat: 'Social Benefits',
			duties:
				'Coordinates statutory step increments, longevity pay, Plantilla of Personnel modifications, and liaison with GSIS, PhilHealth, Pag-IBIG, and the Employees\' Compensation Commission (ECC).',
			legalBasis: 'Salary Standardization Law (RA 11466) & DBM LGU Compensation Manual'
		},

		// 5. EMPLOYEE RELATIONS, LEGAL & CSC COMPLIANCE
		{
			id: 'compliance-lead',
			name: 'Employee Relations & Compliance Unit',
			title: 'Legal Compliance & Grievance Officer',
			division: 'COMPLIANCE',
			divisionLabel: 'Employee Relations, Legal & Ethics Compliance',
			tier: 'division',
			level: 4,
			badge: 'Ethics & Legal',
			color: 'border-blue-700 bg-white text-blue-950',
			badgeColor: 'bg-blue-950 text-amber-300',
			stat: 'CSC Integrity',
			duties:
				'Enforces the Code of Conduct and Ethical Standards for Public Officials (RA 6713), supervises the Municipal Grievance Machinery, coordinates with the Tanauan Association of Municipal Employees (TAME), and manages ARTA Anti-Red Tape compliance.',
			legalBasis: 'Republic Act No. 6713 (Code of Conduct) & RA 11032 (Ease of Doing Business)'
		},
		{
			id: 'public-assistance-desk',
			name: 'HR Public Assistance & Client Service Window',
			title: 'Frontline Public Assistance Desk',
			division: 'COMPLIANCE',
			divisionLabel: 'Frontline Citizen Charter Window',
			tier: 'staff',
			level: 5,
			badge: 'ARTA Frontline',
			color: 'border-slate-200 bg-slate-50 text-slate-800',
			badgeColor: 'bg-amber-100 text-amber-900 border border-amber-300',
			stat: 'Citizen Service',
			duties:
				'Assists active employees, retirees, and job seekers with Certificate of Employment (COE), service record authentication, leave inquiries, and ARTA client satisfaction feedback.',
			legalBasis: 'Tanauan Citizen’s Charter HRMO Service Specifications'
		}
	];

	// PRIME-HRM 4 Pillars Data
	const primePillars = [
		{
			number: '01',
			code: 'RSP',
			title: 'Recruitment, Selection & Placement',
			badge: 'Pillar I • Meritocracy',
			description:
				'Installs competency-based hiring systems that ensure equal employment opportunity, rigorous qualification standards, and transparency in government service appointments.',
			systems: [
				'Human Resource Merit Promotion and Selection Board (HRMPSB)',
				'Competency-Based Job Descriptions & Testing Framework',
				'Equal Employment Opportunity Principle (EEOP) Implementation',
				'Civil Service Commission Publication & Onboarding Process'
			],
			status: 'Maturity Level II Compliant'
		},
		{
			number: '02',
			code: 'L&D',
			title: 'Learning & Development',
			badge: 'Pillar II • Capacity Building',
			description:
				'Institutionalizes structured human capital interventions that elevate competencies, ethics, and leadership skills across all 54 barangay and municipal offices.',
			systems: [
				'Systematic Training Needs Analysis (TNA) Cycle',
				'Executive Leadership & Supervisory Mentorship Modules',
				'Continuous Professional Education & Technical Seminars',
				'Pre-Retirement Counseling & Transition Programs'
			],
			status: 'Institutionalized System'
		},
		{
			number: '03',
			code: 'PM',
			title: 'Performance Management',
			badge: 'Pillar III • Accountability',
			description:
				'Aligns individual employee performance with municipal strategic development goals through objective, audited, and evidence-backed performance evaluation.',
			systems: [
				'Strategic Performance Management System (SPMS)',
				'Office & Individual Performance Commitment Review (OPCR/IPCR)',
				'Semi-Annual Calibrated Performance Review Sessions',
				'Performance Management Team (PMT) Auditing & Calibration'
			],
			status: 'CSC Approved SPMS'
		},
		{
			number: '04',
			code: 'R&R',
			title: 'Rewards & Recognition',
			badge: 'Pillar IV • Motivation',
			description:
				'Rewards exemplary dedication, ethical service, and innovative public contributions, fostering high morale and institutional pride in the municipality.',
			systems: [
				'Program on Awards and Incentives for Service Excellence (PRAISE)',
				'Annual Municipal Public Service Longevity Awards',
				'Cost-Saving and Innovation Merit Recognition',
				'Non-Monetary Incentives, Commendations & Career Growth'
			],
			status: 'Active PRAISE Committee'
		}
	];

	// Filtered personnel based on search and division
	const filteredPersonnel = $derived.by(() => {
		return hrmoPersonnel.filter((member) => {
			const matchesDivision = selectedDivision === 'all' || member.division === selectedDivision;
			const query = searchQuery.trim().toLowerCase();
			const matchesSearch =
				!query ||
				member.name.toLowerCase().includes(query) ||
				member.title.toLowerCase().includes(query) ||
				member.divisionLabel.toLowerCase().includes(query) ||
				member.badge.toLowerCase().includes(query) ||
				member.duties.toLowerCase().includes(query);
			return matchesDivision && matchesSearch;
		});
	});

	function inspectMember(member) {
		selectedMember = member;
	}

	function closeInspect() {
		selectedMember = null;
	}
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && closeInspect()} />

<div class="relative w-full max-w-7xl mx-auto space-y-8">
	<!-- Top Navigation & View Mode Switcher: Royal Blue & Amber Yellow Pill Design -->
	<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl border-2 border-slate-200 bg-white shadow-sm">
		<div>
			<div class="text-[11px] font-black uppercase tracking-wider text-slate-500">
				CIVIL SERVICE COMMISSION • LGU TANAUAN, LEYTE
			</div>
			<h2 class="text-xl sm:text-2xl font-black text-blue-950 tracking-tight">
				Human Resource Management Office Organogram
			</h2>
			<div class="mt-0.5 text-xs text-slate-600 font-medium">
				Civil Service Commission PRIME-HRM Level II Framework & Statutory Supervisory Matrix
			</div>
		</div>

		<!-- Mode Switcher Tabs (Strictly Zero Icons, Pure Typography) -->
		<div class="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
			<button
				type="button"
				onclick={() => (activeTab = 'organogram')}
				class="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 {activeTab === 'organogram' ? 'bg-amber-400 text-blue-950 shadow-md scale-105 border border-amber-500' : 'bg-transparent text-slate-700 hover:text-blue-950 hover:bg-white'}"
			>
				Organogram Tree
			</button>

			<button
				type="button"
				onclick={() => (activeTab = 'prime')}
				class="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 {activeTab === 'prime' ? 'bg-blue-950 text-amber-300 shadow-md scale-105 border border-blue-900' : 'bg-transparent text-slate-700 hover:text-blue-950 hover:bg-white'}"
			>
				PRIME-HRM 4 Pillars
			</button>

			<button
				type="button"
				onclick={() => (activeTab = 'directory')}
				class="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 {activeTab === 'directory' ? 'bg-blue-950 text-amber-300 shadow-md scale-105 border border-blue-900' : 'bg-transparent text-slate-700 hover:text-blue-950 hover:bg-white'}"
			>
				Searchable Directory ({hrmoPersonnel.length})
			</button>
		</div>
	</div>

	<!-- Top Highlights Banner -->
	<div class="relative overflow-hidden rounded-3xl border-2 border-blue-900 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 p-6 sm:p-8 text-white shadow-xl">
		<div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
		<div class="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

		<div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
			<div class="max-w-3xl">
				<div class="flex flex-wrap items-center gap-2 mb-3">
					<span class="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-black tracking-wider text-amber-300 uppercase">
						<span class="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
						<span>PRIME-HRM MATURITY LEVEL II FRAMEWORK</span>
					</span>
					<span class="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-900/80 px-3.5 py-1 text-xs font-mono font-bold tracking-wider text-amber-200">
						<span>CSC RESOLUTION NO. 1800692</span>
					</span>
				</div>

				<h3 class="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
					Meritocracy, Professional Competency & Civil Service Excellence
				</h3>

				<p class="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
					The Human Resource Management Office (HRMO) of Tanauan, Leyte administers the municipal government's personnel system, institutionalizing merit-based recruitment, objective performance evaluation, continuous capacity enhancement, and strict compliance with Civil Service Commission standards.
				</p>
			</div>

			<!-- Quick Stats Counter -->
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
				<div class="rounded-2xl border border-blue-800 bg-blue-900/70 p-4 text-center">
					<div class="text-2xl sm:text-3xl font-black text-amber-400">4 Pillars</div>
					<div class="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 mt-0.5">
						PRIME-HRM
					</div>
				</div>

				<div class="rounded-2xl border border-blue-800 bg-blue-900/70 p-4 text-center">
					<div class="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
					<div class="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 mt-0.5">
						CSC Compliant
					</div>
				</div>

				<div class="rounded-2xl border border-blue-800 bg-blue-900/70 p-4 text-center col-span-2 sm:col-span-1">
					<div class="text-2xl sm:text-3xl font-black text-amber-400">54</div>
					<div class="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 mt-0.5">
						Barangays Served
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- TAB 1: INTERACTIVE ORGANOGRAM TREE VIEW -->
	{#if activeTab === 'organogram'}
		<div transition:fade={{ duration: 200 }} class="space-y-10">
			<!-- Tree Instructions -->
			<div class="flex items-center justify-between px-2">
				<div class="text-xs font-black uppercase tracking-wider text-slate-500">
					[ INTERACTIVE SUPERVISORY TREE // CLICK ANY CARD TO INSPECT DUTIES & LEGAL MANDATE ]
				</div>
				<span class="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
					Standard LGU Executive Matrix
				</span>
			</div>

			<!-- Visual Flow Canvas -->
			<div class="relative flex flex-col items-center w-full overflow-x-auto pb-8 pt-4">
				<!-- LEVEL 1: LOCAL CHIEF EXECUTIVE (MAYOR) -->
				<div class="flex flex-col items-center">
					<div
						role="button"
						tabindex="0"
						onclick={() => inspectMember(hrmoPersonnel[0])}
						onkeydown={(e) => e.key === 'Enter' && inspectMember(hrmoPersonnel[0])}
						class="group relative w-80 sm:w-96 rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
					>
						<div class="flex items-center justify-between pb-3 border-b border-blue-800">
							<span class="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-400 text-blue-950">
								Local Chief Executive
							</span>
							<span class="text-[11px] font-mono font-bold text-amber-300">
								TIER 01 // MAYOR
							</span>
						</div>

						<div class="mt-4">
							<h3 class="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
								Hon. Ma. Gina E. Merilo
							</h3>
							<div class="text-xs font-extrabold text-amber-400 uppercase tracking-wide mt-0.5">
								Municipal Mayor
							</div>
							<div class="text-[11px] text-slate-300 mt-2 line-clamp-2">
								Appointing Authority & Executive Direction for all Municipal Personnel & Civil Service Programs.
							</div>
						</div>

						<div class="mt-4 pt-3 border-t border-blue-800/80 flex items-center justify-between text-[11px]">
							<span class="font-bold text-slate-400">RA 7160 Sec. 444</span>
							<span class="font-black text-amber-300">[ Inspect Mandate ]</span>
						</div>
					</div>

					<!-- Vertical Connector Line -->
					<div class="h-8 w-0.5 bg-blue-900"></div>
				</div>

				<!-- LEVEL 2: MUNICIPAL ADMINISTRATOR -->
				<div class="flex flex-col items-center">
					<div
						role="button"
						tabindex="0"
						onclick={() => inspectMember(hrmoPersonnel[1])}
						onkeydown={(e) => e.key === 'Enter' && inspectMember(hrmoPersonnel[1])}
						class="group relative w-80 sm:w-96 rounded-3xl border-2 border-blue-800 bg-slate-900 p-5 text-white shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-xl cursor-pointer"
					>
						<div class="flex items-center justify-between pb-2.5 border-b border-blue-800/80">
							<span class="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-900 text-amber-300 border border-amber-400/40">
								Executive Administration
							</span>
							<span class="text-[10px] font-mono font-bold text-slate-400">
								TIER 02 // ADMIN
							</span>
						</div>

						<div class="mt-3">
							<h4 class="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
								Ret. Judge Ephrem S. Abando
							</h4>
							<div class="text-xs font-extrabold text-amber-300 uppercase tracking-wide mt-0.5">
								Municipal Administrator
							</div>
							<div class="text-[11px] text-slate-300 mt-1.5 line-clamp-2">
								Inter-department administrative coordination and operational oversight.
							</div>
						</div>

						<div class="mt-3 pt-2.5 border-t border-blue-800/60 flex items-center justify-between text-[11px]">
							<span class="font-bold text-slate-400">LGC Sec. 480</span>
							<span class="font-black text-amber-300">[ View Role ]</span>
						</div>
					</div>

					<!-- Vertical Connector Line -->
					<div class="h-8 w-0.5 bg-blue-900"></div>
				</div>

				<!-- LEVEL 3: DEPARTMENT HEAD (HRMO III) -->
				<div class="flex flex-col items-center">
					<div
						role="button"
						tabindex="0"
						onclick={() => inspectMember(hrmoPersonnel[2])}
						onkeydown={(e) => e.key === 'Enter' && inspectMember(hrmoPersonnel[2])}
						class="group relative w-80 sm:w-96 rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-6 text-white shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
					>
						<div class="flex items-center justify-between pb-3 border-b border-blue-800">
							<span class="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-400 text-blue-950">
								Department Head
							</span>
							<span class="text-[11px] font-mono font-bold text-amber-300">
								TIER 03 // HRMO III
							</span>
						</div>

						<div class="mt-4">
							<h3 class="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
								Atty. Federico C. Tizon, EnP
							</h3>
							<div class="text-xs font-black text-amber-400 uppercase tracking-wide mt-0.5">
								Municipal Government Department Head (HRMO III)
							</div>
							<div class="text-[11px] text-slate-200 mt-2 line-clamp-2">
								Civil Service Commission-Accredited Practitioner & Legal Specialist directing all 4 PRIME-HRM Core Pillars.
							</div>
						</div>

						<div class="mt-4 pt-3 border-t border-blue-800 flex items-center justify-between text-[11px]">
							<span class="font-bold text-slate-300">CSC MC No. 19, s. 2012</span>
							<span class="font-black text-amber-300">[ Detailed Profile ]</span>
						</div>
					</div>

					<!-- Trunk & Branch Lines for Operating Divisions -->
					<div class="h-10 w-0.5 bg-blue-900"></div>
					<div class="w-[90%] max-w-4xl h-0.5 bg-blue-900"></div>
				</div>

				<!-- LEVEL 4: 4 CORE OPERATING DIVISIONS -->
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full mt-4">
					<!-- DIV 1: RSP -->
					<div class="flex flex-col items-center space-y-3">
						<div class="h-6 w-0.5 bg-blue-900"></div>
						<div
							role="button"
							tabindex="0"
							onclick={() => inspectMember(hrmoPersonnel[3])}
							onkeydown={(e) => e.key === 'Enter' && inspectMember(hrmoPersonnel[3])}
							class="group w-full rounded-2xl border-2 border-slate-300 hover:border-amber-400 bg-white p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer"
						>
							<div class="h-1.5 w-full bg-gradient-to-r from-blue-950 via-amber-400 to-blue-900 rounded-full mb-3"></div>
							<span class="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-950 text-amber-300">
								PILLAR I // RSP
							</span>
							<h4 class="mt-2 text-base font-black text-blue-950 leading-snug group-hover:text-blue-800">
								Recruitment, Selection & Placement
							</h4>
							<p class="mt-1.5 text-xs text-slate-600 line-clamp-3">
								HRMPSB Secretariat, vacancy publications, applicant screening, qualification testing, and merit onboarding.
							</p>
							<div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
								<span class="font-bold text-slate-400">ORAOHRA 2017</span>
								<span class="font-black text-blue-950 group-hover:text-amber-600">[ View Desk ]</span>
							</div>
						</div>

						<!-- Sub-Desk: Student Immersion -->
						<div class="h-4 w-0.5 bg-blue-900/60"></div>
						<div
							role="button"
							tabindex="0"
							onclick={() => inspectMember(hrmoPersonnel[4])}
							onkeydown={(e) => e.key === 'Enter' && inspectMember(hrmoPersonnel[4])}
							class="w-full rounded-xl border border-slate-200 hover:border-blue-900 bg-slate-50 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer"
						>
							<div class="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded inline-block">
								Desk // OJT & Immersion
							</div>
							<div class="mt-1.5 text-xs font-black text-blue-950">
								College OJT & Senior High Immersion Desk
							</div>
							<div class="text-[10px] text-slate-500 mt-1">
								MOA processing, student placement & evaluation.
							</div>
						</div>
					</div>

					<!-- DIV 2: L&D / PM -->
					<div class="flex flex-col items-center space-y-3">
						<div class="h-6 w-0.5 bg-blue-900"></div>
						<div
							role="button"
							tabindex="0"
							onclick={() => inspectMember(hrmoPersonnel[5])}
							onkeydown={(e) => e.key === 'Enter' && inspectMember(hrmoPersonnel[5])}
							class="group w-full rounded-2xl border-2 border-slate-300 hover:border-amber-400 bg-white p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer"
						>
							<div class="h-1.5 w-full bg-gradient-to-r from-blue-950 via-amber-400 to-blue-900 rounded-full mb-3"></div>
							<span class="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-950 text-amber-300">
								PILLAR II & III // L&D
							</span>
							<h4 class="mt-2 text-base font-black text-blue-950 leading-snug group-hover:text-blue-800">
								Learning & Performance Management
							</h4>
							<p class="mt-1.5 text-xs text-slate-600 line-clamp-3">
								Training Needs Analysis (TNA), capacity building, Strategic Performance Management System (SPMS), IPCR/OPCR.
							</p>
							<div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
								<span class="font-bold text-slate-400">CSC MC No. 6</span>
								<span class="font-black text-blue-950 group-hover:text-amber-600">[ View Desk ]</span>
							</div>
						</div>

						<!-- Sub-Desk: PRAISE -->
						<div class="h-4 w-0.5 bg-blue-900/60"></div>
						<div
							role="button"
							tabindex="0"
							onclick={() => inspectMember(hrmoPersonnel[6])}
							onkeydown={(e) => e.key === 'Enter' && inspectMember(hrmoPersonnel[6])}
							class="w-full rounded-xl border border-slate-200 hover:border-blue-900 bg-slate-50 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer"
						>
							<div class="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded inline-block">
								Desk // PRAISE Awards
							</div>
							<div class="mt-1.5 text-xs font-black text-blue-950">
								Rewards & Recognition Secretariat
							</div>
							<div class="text-[10px] text-slate-500 mt-1">
								Employee merit honors, longevity & service incentives.
							</div>
						</div>
					</div>

					<!-- DIV 3: PACB -->
					<div class="flex flex-col items-center space-y-3">
						<div class="h-6 w-0.5 bg-blue-900"></div>
						<div
							role="button"
							tabindex="0"
							onclick={() => inspectMember(hrmoPersonnel[7])}
							onkeydown={(e) => e.key === 'Enter' && inspectMember(hrmoPersonnel[7])}
							class="group w-full rounded-2xl border-2 border-slate-300 hover:border-amber-400 bg-white p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer"
						>
							<div class="h-1.5 w-full bg-gradient-to-r from-blue-950 via-amber-400 to-blue-900 rounded-full mb-3"></div>
							<span class="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-950 text-amber-300">
								RECORDS & BENEFITS
							</span>
							<h4 class="mt-2 text-base font-black text-blue-950 leading-snug group-hover:text-blue-800">
								Personnel Administration & Benefits
							</h4>
							<p class="mt-1.5 text-xs text-slate-600 line-clamp-3">
								201 files management, service records, leave card auditing, monetization processing, biometric attendance.
							</p>
							<div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
								<span class="font-bold text-slate-400">CSC MC No. 41</span>
								<span class="font-black text-blue-950 group-hover:text-amber-600">[ View Desk ]</span>
							</div>
						</div>

						<!-- Sub-Desk: Compensation & Social Benefits -->
						<div class="h-4 w-0.5 bg-blue-900/60"></div>
						<div
							role="button"
							tabindex="0"
							onclick={() => inspectMember(hrmoPersonnel[8])}
							onkeydown={(e) => e.key === 'Enter' && inspectMember(hrmoPersonnel[8])}
							class="w-full rounded-xl border border-slate-200 hover:border-blue-900 bg-slate-50 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer"
						>
							<div class="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded inline-block">
								Desk // Payroll & Social
							</div>
							<div class="mt-1.5 text-xs font-black text-blue-950">
								Compensation & Social Benefits Desk
							</div>
							<div class="text-[10px] text-slate-500 mt-1">
								Step increments, GSIS, PhilHealth & Pag-IBIG liaison.
							</div>
						</div>
					</div>

					<!-- DIV 4: COMPLIANCE & ARTA -->
					<div class="flex flex-col items-center space-y-3">
						<div class="h-6 w-0.5 bg-blue-900"></div>
						<div
							role="button"
							tabindex="0"
							onclick={() => inspectMember(hrmoPersonnel[9])}
							onkeydown={(e) => e.key === 'Enter' && inspectMember(hrmoPersonnel[9])}
							class="group w-full rounded-2xl border-2 border-slate-300 hover:border-amber-400 bg-white p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer"
						>
							<div class="h-1.5 w-full bg-gradient-to-r from-blue-950 via-amber-400 to-blue-900 rounded-full mb-3"></div>
							<span class="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-blue-950 text-amber-300">
								LEGAL & ETHICS
							</span>
							<h4 class="mt-2 text-base font-black text-blue-950 leading-snug group-hover:text-blue-800">
								Employee Relations & Compliance
							</h4>
							<p class="mt-1.5 text-xs text-slate-600 line-clamp-3">
								RA 6713 Code of Conduct, Grievance Machinery, TAME employee association liaison, and ARTA compliance monitoring.
							</p>
							<div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
								<span class="font-bold text-slate-400">RA 6713 / ARTA</span>
								<span class="font-black text-blue-950 group-hover:text-amber-600">[ View Desk ]</span>
							</div>
						</div>

						<!-- Sub-Desk: Public Assistance -->
						<div class="h-4 w-0.5 bg-blue-900/60"></div>
						<div
							role="button"
							tabindex="0"
							onclick={() => inspectMember(hrmoPersonnel[10])}
							onkeydown={(e) => e.key === 'Enter' && inspectMember(hrmoPersonnel[10])}
							class="w-full rounded-xl border border-slate-200 hover:border-blue-900 bg-slate-50 p-3.5 shadow-2xs hover:shadow-md transition-all cursor-pointer"
						>
							<div class="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded inline-block">
								Desk // ARTA Window
							</div>
							<div class="mt-1.5 text-xs font-black text-blue-950">
								Frontline Public Assistance Counter
							</div>
							<div class="text-[10px] text-slate-500 mt-1">
								COE requests, service records & client guidance.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- TAB 2: PRIME-HRM 4 PILLARS DETAILED MATRIX -->
	{#if activeTab === 'prime'}
		<div transition:fade={{ duration: 200 }} class="space-y-8">
			<div class="flex items-center justify-between px-2">
				<div class="text-xs font-black uppercase tracking-wider text-slate-500">
					[ CIVIL SERVICE COMMISSION PRIME-HRM CORE HR SYSTEMS MATRIX ]
				</div>
				<span class="text-xs font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
					Maturity Level II Pillars
				</span>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
				{#each primePillars as pillar (pillar.code)}
					<div class="flex flex-col justify-between rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-xl">
						<div>
							<div class="flex items-center justify-between pb-4 border-b border-slate-100">
								<span class="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-blue-950 text-amber-300">
									PILLAR {pillar.number} // {pillar.code}
								</span>
								<span class="text-xs font-extrabold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
									{pillar.status}
								</span>
							</div>

							<h3 class="mt-4 text-xl font-black text-blue-950">
								{pillar.title}
							</h3>

							<p class="mt-2 text-sm text-slate-600 leading-relaxed font-normal">
								{pillar.description}
							</p>

							<div class="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
								<div class="text-[11px] font-black uppercase tracking-wider text-slate-400">
									Core Operational Systems
								</div>
								{#each pillar.systems as sys}
									<div class="flex items-start gap-2.5 text-xs text-slate-700">
										<span class="h-2 w-2 rounded-full bg-amber-400 mt-1 shrink-0"></span>
										<span class="font-medium">{sys}</span>
									</div>
								{/each}
							</div>
						</div>

						<div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
							<span class="font-bold text-slate-500">CSC Verified Process</span>
							<span class="font-black text-blue-950">Tanauan LGU Standard</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- TAB 3: SEARCHABLE DIRECTORY & ROSTER VIEW -->
	{#if activeTab === 'directory'}
		<div transition:fade={{ duration: 200 }} class="space-y-6">
			<!-- Filters & Search Toolbar -->
			<div class="p-6 rounded-3xl border-2 border-slate-200 bg-white shadow-sm space-y-4">
				<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div class="relative flex-1">
						<input
							type="text"
							bind:value={searchQuery}
							placeholder="Search by personnel name, title, mandate, or keyword..."
							class="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-blue-950 placeholder:text-slate-400 focus:border-blue-950 focus:bg-white focus:outline-none transition-all"
						/>
					</div>

					<!-- Division Selector -->
					<div class="flex flex-wrap items-center gap-1.5">
						<button
							type="button"
							onclick={() => (selectedDivision = 'all')}
							class="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all {selectedDivision === 'all' ? 'bg-blue-950 text-amber-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
						>
							All Units
						</button>
						<button
							type="button"
							onclick={() => (selectedDivision = 'Executive')}
							class="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all {selectedDivision === 'Executive' ? 'bg-blue-950 text-amber-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
						>
							Executive
						</button>
						<button
							type="button"
							onclick={() => (selectedDivision = 'RSP')}
							class="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all {selectedDivision === 'RSP' ? 'bg-blue-950 text-amber-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
						>
							RSP
						</button>
						<button
							type="button"
							onclick={() => (selectedDivision = 'LD')}
							class="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all {selectedDivision === 'LD' ? 'bg-blue-950 text-amber-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
						>
							L&D / PM
						</button>
						<button
							type="button"
							onclick={() => (selectedDivision = 'PACB')}
							class="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all {selectedDivision === 'PACB' ? 'bg-blue-950 text-amber-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
						>
							Benefits
						</button>
						<button
							type="button"
							onclick={() => (selectedDivision = 'COMPLIANCE')}
							class="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all {selectedDivision === 'COMPLIANCE' ? 'bg-blue-950 text-amber-300' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}"
						>
							Compliance
						</button>
					</div>
				</div>

				<div class="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
					<span>Showing {filteredPersonnel.length} of {hrmoPersonnel.length} active organizational units</span>
					{#if searchQuery}
						<button
							type="button"
							onclick={() => (searchQuery = '')}
							class="text-blue-950 underline hover:text-amber-600 cursor-pointer"
						>
							Clear Search
						</button>
					{/if}
				</div>
			</div>

			<!-- Grid of Personnel / Unit Cards -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each filteredPersonnel as item (item.id)}
					<article
						transition:scale={{ duration: 200, start: 0.98 }}
						class="flex flex-col justify-between rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-xl"
					>
						<div>
							<div class="flex items-center justify-between pb-3 border-b border-slate-100">
								<span class="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider {item.badgeColor}">
									{item.badge}
								</span>
								<span class="text-[10px] font-bold text-slate-500 uppercase">
									{item.divisionLabel}
								</span>
							</div>

							<div class="mt-4">
								<h3 class="text-lg font-black text-blue-950 leading-snug">
									{item.name}
								</h3>
								<div class="text-xs font-bold text-amber-600 uppercase mt-0.5">
									{item.title}
								</div>
								<p class="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-3">
									{item.duties}
								</p>
							</div>
						</div>

						<div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
							<span class="text-[10px] font-mono font-bold text-slate-400">{item.legalBasis}</span>
							<button
								type="button"
								onclick={() => inspectMember(item)}
								class="px-3.5 py-1.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-amber-300 font-black text-xs uppercase tracking-wider transition-transform hover:scale-105 cursor-pointer"
							>
								Inspect Duties
							</button>
						</div>
					</article>
				{/each}
			</div>
		</div>
	{/if}

	<!-- MODAL: DETAILED POSITION & MANDATE INSPECTION -->
	{#if selectedMember}
		<div
			transition:fade={{ duration: 150 }}
			class="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/80 p-4 sm:p-6 backdrop-blur-xs"
		>
			<div
				transition:scale={{ duration: 200, start: 0.95 }}
				class="relative w-full max-w-2xl rounded-3xl border-2 border-amber-400 bg-white p-6 sm:p-8 text-blue-950 shadow-2xl overflow-hidden"
			>
				<!-- Top Bar -->
				<div class="flex items-center justify-between pb-4 border-b border-slate-200">
					<div class="flex items-center gap-2">
						<span class="px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-blue-950 text-amber-300">
							{selectedMember.badge}
						</span>
						<span class="text-xs font-bold text-slate-500 uppercase hidden sm:inline">
							{selectedMember.divisionLabel}
						</span>
					</div>

					<button
						type="button"
						onclick={closeInspect}
						class="px-3.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
					>
						[ Close ]
					</button>
				</div>

				<!-- Member Details Content -->
				<div class="mt-6 space-y-4">
					<div>
						<h3 class="text-2xl font-black text-blue-950 tracking-tight leading-tight">
							{selectedMember.name}
						</h3>
						<div class="text-sm font-black text-amber-600 uppercase mt-0.5">
							{selectedMember.title}
						</div>
					</div>

					<div class="rounded-2xl bg-blue-50/70 border border-blue-200/80 p-4">
						<div class="text-[10px] font-black uppercase tracking-wider text-blue-950 mb-1">
							OFFICIAL DUTIES & CSC MANDATES
						</div>
						<p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
							{selectedMember.duties}
						</p>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
						<div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
							<div class="text-[10px] font-black uppercase text-slate-500">Statutory Legal Basis</div>
							<div class="font-bold text-blue-950 mt-0.5">{selectedMember.legalBasis}</div>
						</div>
						<div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
							<div class="text-[10px] font-black uppercase text-slate-500">Service Hours & Location</div>
							<div class="font-bold text-blue-950 mt-0.5">2nd Flr, Municipal Hall | Mon–Fri 8AM–5PM</div>
						</div>
					</div>
				</div>

				<div class="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
					<span class="text-xs text-slate-500 font-bold">Municipality of Tanauan, Leyte</span>
					<button
						type="button"
						onclick={closeInspect}
						class="px-5 py-2 rounded-xl bg-blue-950 text-amber-300 font-black text-xs uppercase tracking-wider hover:bg-blue-900 transition-all cursor-pointer"
					>
						Done
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
