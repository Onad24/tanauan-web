<script>
	import { fade, fly, scale } from 'svelte/transition';

	// Modal State
	let isFolderOpen = $state(false);
	let activeImageIndex = $state(0);
	let isHovered = $state(false);
	let fullscreenImage = $state(null);

	const menroRecords = [
		{
			src: '/images/accomplishments/menro/landfill-containment-facility.jpg',
			title: 'Tanauan Sanitary Landfill & Containment Cell Operations',
			tag: 'Field Facility Operations',
			badgeColor: 'bg-blue-900 text-amber-300 border border-blue-800',
			description:
				'Aerial drone overview of the active lined waste containment cell at the Tanauan Sanitary Landfill. Features heavy excavator equipment handling daily operations alongside the frontline MENRO environmental personnel in uniform and municipal waste collection fleet trucks.'
		},
		{
			src: '/images/accomplishments/menro/waste-diversion-status-chart.jpg',
			title: 'Status of Waste Diversion — Target vs. Actual Performance',
			tag: 'Diversion Scorecard',
			badgeColor: 'bg-amber-400 text-blue-950 border border-amber-300 font-black',
			description:
				'Official comparative performance chart demonstrating a daily waste diversion accomplishment of 18,656.75 kgs/day (64.03%) against the 20,322.36 kgs/day (69.75%) target under the approved Ten-Year Solid Waste Management Plan (short by 5.72%).'
		},
		{
			src: '/images/accomplishments/menro/waste-generation-disposal-table.jpg',
			title: 'Waste Segregation, Diversion & Disposal Matrix (Year 2026)',
			tag: 'Statistical Projections',
			badgeColor: 'bg-blue-700 text-white border border-blue-600',
			description:
				'Comprehensive analytical table for Year 2026 based on a projected population of 60,700 with 0.48 kg/day per capita generation, yielding 29,136.00 kgs/day daily generation, and comparing target vs. actual disposal of 10,479.25 kgs/day (35.97%).'
		},
		{
			src: '/images/accomplishments/menro/ra-9003-swm-plan.jpg',
			title: 'RA 9003 Enforcement & Approved Ten-Year SWM Plan (2024–2033)',
			tag: 'Statutory Directives',
			badgeColor: 'bg-amber-500 text-blue-950 border border-amber-400 font-black',
			description:
				'Statutory enforcement pursuant to Republic Act No. 9003 (Ecological Solid Waste Management Act of 2000), Municipal Ordinance No. 2024-20, and the approved Ten-Year Solid Waste Management Plan under the executive leadership of Hon. Mayor Ma. Gina E. Merilo.'
		},
		{
			src: '/images/accomplishments/menro/menro-updates-framework.jpg',
			title: 'MENRO Updates, Policy Mandates & Accomplishments Framework',
			tag: 'Policy Framework',
			badgeColor: 'bg-blue-950 text-amber-400 border border-blue-800',
			description:
				'Official agenda of MENRO priorities: RA 9003 national compliance, Municipal Ordinance No. 2024-20 Solid Waste Management Ordinance, approved Ten-Year Solid Waste Management Plan, and continuous status tracking of MENRO Projects, Programs, and Activities (PPAs).'
		},
		{
			src: '/images/accomplishments/menro/waste-collection-schedule.png',
			title: 'Official Weekday Waste Collection Schedule & Routes Roster',
			tag: 'Collection Deployment',
			badgeColor: 'bg-amber-400 text-blue-950 border border-amber-300 font-black',
			description:
				'Official weekly deployment schedule detailing designated compactors and mini dump trucks, drivers, collectors, appointment statuses, and weekday area coverage across all Tanauan barangays, highways, and the public market.'
		}
	];

	function openFolder() {
		isFolderOpen = true;
		activeImageIndex = 0;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeFolder() {
		isFolderOpen = false;
		fullscreenImage = null;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function nextImage() {
		activeImageIndex = (activeImageIndex + 1) % menroRecords.length;
	}

	function prevImage() {
		activeImageIndex = (activeImageIndex - 1 + menroRecords.length) % menroRecords.length;
	}

	function handleKeydown(e) {
		if (!isFolderOpen) return;
		if (e.key === 'Escape') {
			if (fullscreenImage) {
				fullscreenImage = null;
			} else {
				closeFolder();
			}
		} else if (e.key === 'ArrowRight') {
			nextImage();
		} else if (e.key === 'ArrowLeft') {
			prevImage();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="relative w-full">
	<!-- Interactive 3D Folder Container -->
	<div class="mx-auto max-w-4xl">
		<button
			type="button"
			onclick={openFolder}
			onmouseenter={() => (isHovered = true)}
			onmouseleave={() => (isHovered = false)}
			class="group relative block w-full text-left focus:outline-none focus:ring-4 focus:ring-amber-400/50 rounded-3xl"
			aria-label="Open Solid Waste Management & Diversion Accomplishment Folder"
		>
			<!-- Ambient Backlight Glow (Royal Blue & Amber Yellow) -->
			<div
				class="absolute -inset-2 rounded-[32px] bg-gradient-to-r from-blue-700 via-amber-400 to-indigo-800 opacity-20 blur-xl transition-all duration-500 group-hover:opacity-40 group-hover:blur-2xl"
			></div>

			<!-- Folder Base Exterior Shell -->
			<div
				class="relative overflow-hidden rounded-3xl border-2 border-slate-300 bg-gradient-to-b from-amber-50/90 via-white to-slate-100 p-6 sm:p-10 shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-amber-400 group-hover:shadow-2xl"
			>
				<!-- Top Folder Tab (Realistic Manila / Civic Dossier Tab) -->
				<div class="absolute -top-1 left-8 sm:left-12 flex items-center">
					<div
						class="flex items-center gap-2 rounded-t-xl border-t-2 border-x-2 border-amber-400/80 bg-amber-400 px-5 py-1.5 text-xs font-black tracking-wider text-blue-950 uppercase shadow-md transition-transform duration-300 group-hover:-translate-y-1"
					>
						<span class="inline-block h-2 w-2 rounded-full bg-blue-950 animate-pulse"></span>
						<span>OFFICIAL DOSSIER // MENRO-SWM-2026</span>
					</div>
				</div>

				<!-- Subtle Folder Watermark / Pattern Background -->
				<div class="pointer-events-none absolute right-4 bottom-4 text-slate-100 font-black text-8xl sm:text-9xl select-none opacity-40">
					MENRO
				</div>

				<div class="relative z-10 pt-4">
					<!-- Top Meta Header -->
					<div class="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
						<div class="flex items-center gap-2.5">
							<span class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-950 text-amber-300 text-lg shadow-inner">
								📁
							</span>
							<div>
								<span class="text-[11px] font-mono font-black tracking-wider text-blue-900 uppercase">
									MUNICIPAL ENVIRONMENT & NATURAL RESOURCES // FLAGSHIP PROGRAM
								</span>
								<h3 class="text-xl sm:text-2xl font-black text-blue-950 tracking-tight">
									Ten-Year Solid Waste Management Plan (2024–2033)
								</h3>
							</div>
						</div>

						<span
							class="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-black text-amber-950 uppercase tracking-wide shadow-sm"
						>
							<span class="h-2 w-2 rounded-full bg-amber-500"></span>
							RA 9003 & MO No. 2024-20
						</span>
					</div>

					<!-- Visual Peek: Layered Documents peeking out with smooth CSS tilt -->
					<div class="relative mb-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-6 overflow-hidden">
						<!-- Folder Flap Visual Animation -->
						<div
							class="flex flex-col md:flex-row items-center justify-between gap-6 transition-transform duration-500 {isHovered ? 'scale-[1.01]' : ''}"
						>
							<!-- Document Description -->
							<div class="flex-1 space-y-3">
								<p class="text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
									Statutory accomplishment disclosures on municipal ecological solid waste management, daily waste generation,
									sanitary landfill containment operations, and achieving a <strong>64.03% waste diversion rate</strong> (18,656.75 kgs/day)
									across Tanauan's 54 barangays.
								</p>

								<!-- Quick Key Highlights Pills (Royal Blue & Amber Yellow) -->
								<div class="flex flex-wrap gap-2 pt-1">
									<span class="rounded-lg bg-blue-100/90 border border-blue-200 px-2.5 py-1 text-xs font-bold text-blue-900">
										📜 RA 9003 & MO 2024-20
									</span>
									<span class="rounded-lg bg-amber-100/90 border border-amber-200 px-2.5 py-1 text-xs font-bold text-amber-950">
										📊 64.03% Actual Waste Diversion
									</span>
									<span class="rounded-lg bg-blue-100/90 border border-blue-200 px-2.5 py-1 text-xs font-bold text-blue-900">
										🚜 Sanitary Landfill Operations
									</span>
									<span class="rounded-lg bg-amber-100/90 border border-amber-200 px-2.5 py-1 text-xs font-bold text-amber-950">
										👥 60,700 Population Served
									</span>
								</div>
							</div>

							<!-- Overlapping Stacked Photo Preview Cards -->
							<div class="relative h-28 w-44 sm:h-32 sm:w-56 shrink-0">
								<!-- 3rd Layer -->
								<div
									class="absolute right-6 top-1 h-24 w-36 sm:h-28 sm:w-44 rounded-xl border-2 border-white bg-slate-300 shadow-md transition-all duration-500 overflow-hidden {isHovered ? 'rotate-12 translate-x-3 -translate-y-2' : 'rotate-6'}"
								>
									<img src={menroRecords[2].src} alt="" class="h-full w-full object-cover" />
								</div>
								<!-- 2nd Layer -->
								<div
									class="absolute right-3 top-2 h-24 w-36 sm:h-28 sm:w-44 rounded-xl border-2 border-white bg-slate-200 shadow-md transition-all duration-500 overflow-hidden {isHovered ? '-rotate-6 -translate-x-2 -translate-y-1' : '-rotate-3'}"
								>
									<img src={menroRecords[1].src} alt="" class="h-full w-full object-cover" />
								</div>
								<!-- 1st Top Layer -->
								<div
									class="absolute right-0 top-3 h-24 w-36 sm:h-28 sm:w-44 rounded-xl border-2 border-amber-400 bg-white shadow-xl transition-all duration-500 overflow-hidden {isHovered ? 'scale-105 shadow-2xl' : ''}"
								>
									<img src={menroRecords[0].src} alt="" class="h-full w-full object-cover" />
									<div class="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent flex items-end p-2">
										<span class="text-[10px] font-black text-amber-300 uppercase tracking-wide">
											Landfill Facility
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Bottom Folder Footer & Interactive Click Button -->
					<div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
						<div class="flex items-center gap-2 text-xs font-bold text-slate-500">
							<span class="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
							<span>Click anywhere on this folder to inspect full SWM records, diversion analytics & photo gallery</span>
						</div>

						<div
							class="inline-flex items-center gap-2 rounded-2xl bg-blue-950 px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300 shadow-lg transition-all duration-300 group-hover:bg-blue-900 group-hover:scale-105 group-hover:shadow-amber-400/20 active:scale-95"
						>
							<span>Open Accomplishment Dossier</span>
							<span class="text-base transition-transform duration-300 group-hover:translate-x-1">📂 ↗</span>
						</div>
					</div>
				</div>
			</div>
		</button>
	</div>

	<!-- POPUP MODAL WINDOW (Information, Matrix & Photo Showcase) -->
	{#if isFolderOpen}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
			transition:fade={{ duration: 250 }}
			onclick={closeFolder}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-menro-title"
		>
			<div
				class="relative my-auto w-full max-w-5xl rounded-3xl border-2 border-amber-400/70 bg-white shadow-2xl overflow-hidden"
				transition:scale={{ duration: 300, start: 0.95 }}
				onclick={(e) => e.stopPropagation()}
			>
				<!-- Top Header Bar with Accent Gradient (Royal Blue to Deep Slate) -->
				<div class="relative border-b-2 border-slate-200 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 px-6 py-5 text-white">
					<div class="flex items-center justify-between gap-4">
						<div class="flex items-center gap-3">
							<div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400 text-blue-950 text-xl font-black shadow-md">
								📁
							</div>
							<div>
								<div class="flex items-center gap-2">
									<span class="text-[10px] font-mono font-black tracking-widest text-amber-400 uppercase">
										OFFICIAL ACCOMPLISHMENT DOSSIER
									</span>
									<span class="rounded bg-blue-800/80 px-2 py-0.5 text-[9px] font-black text-blue-200 uppercase">
										MENRO Tanauan
									</span>
								</div>
								<h2 id="modal-menro-title" class="text-xl sm:text-2xl font-black tracking-tight text-white">
									Ten-Year Solid Waste Management Plan (2024–2033)
								</h2>
							</div>
						</div>

						<!-- Close Button -->
						<button
							type="button"
							onclick={closeFolder}
							class="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white transition-all hover:bg-amber-400 hover:text-blue-950 hover:scale-105 active:scale-95"
							aria-label="Close modal"
						>
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				<!-- Modal Body Content -->
				<div class="max-h-[78vh] overflow-y-auto p-6 sm:p-8 space-y-8 bg-slate-50/60">
					<!-- Project Summary Banner -->
					<div class="grid gap-4 sm:grid-cols-3">
						<div class="rounded-2xl border border-blue-200 bg-blue-50/80 p-4">
							<div class="text-[10px] font-black uppercase tracking-wider text-blue-700">Statutory Mandate</div>
							<div class="mt-1 text-sm font-black text-blue-950">RA 9003 & MO No. 2024-20</div>
							<p class="mt-1 text-xs text-slate-600">
								Enforcing ecological solid waste segregation, mandatory diversion standards, and Ten-Year SWM Plan.
							</p>
						</div>

						<div class="rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
							<div class="text-[10px] font-black uppercase tracking-wider text-amber-800">2026 Waste Generation</div>
							<div class="mt-1 text-sm font-black text-amber-950">29,136.00 kgs/day</div>
							<p class="mt-1 text-xs text-slate-600">
								Projected for 60,700 municipal population at 0.48 kg per capita daily waste generation.
							</p>
						</div>

						<div class="rounded-2xl border border-blue-200 bg-blue-50/80 p-4">
							<div class="text-[10px] font-black uppercase tracking-wider text-blue-800">Actual Waste Diversion</div>
							<div class="mt-1 text-sm font-black text-blue-950">18,656.75 kgs/day (64.03%)</div>
							<p class="mt-1 text-xs text-slate-600">
								Diverted through recycling, recovery, and composting against 69.75% Ten-Year target.
							</p>
						</div>
					</div>

					<!-- Narrative Overview -->
					<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
						<h3 class="text-base font-black text-blue-950 mb-2 flex items-center gap-2">
							<span class="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
							Statutory Mandate & Policy Implementation
						</h3>
						<p class="text-sm leading-relaxed text-slate-700">
							Pursuant to <strong>Republic Act No. 9003</strong> (Ecological Solid Waste Management Act of 2000),
							<strong>Municipal Ordinance No. 2024-20</strong> (Solid Waste Management Ordinance of Tanauan, Leyte),
							and the approved <strong>Ten-Year Solid Waste Management Plan (2024–2033)</strong> under the executive
							leadership of <strong>Hon. Mayor Ma. Gina E. Merilo</strong>, the <strong>Municipal Environment & Natural Resources Office (MENRO)</strong>
							enforces municipal-wide waste segregation, material recovery, and compliant landfill management.
						</p>
						<p class="mt-3 text-sm leading-relaxed text-slate-700">
							The municipality continuously operates and monitors its sanitary landfill containment facility, mobilizing frontline
							collection trucks and field sanitation crews across all <strong>54 barangays</strong> to ensure systematic waste diversion,
							minimize residual landfill disposal, and safeguard public health and groundwater ecology.
						</p>
					</div>

					<!-- Official Data Table & Performance Scorecard (Extracted from Slides 4 & 5) -->
					<div class="rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
						<div class="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
							<div>
								<span class="text-[10px] font-mono font-black tracking-wider text-blue-900 uppercase">
									STATISTICAL DISCLOSURE // YEAR 2026 PROJECTIONS & ACTUALS
								</span>
								<h4 class="text-lg font-black text-blue-950">Waste Segregation, Diversion & Disposal Matrix</h4>
							</div>
							<span class="rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-black text-amber-950">
								Official LGU Tanauan Scorecard
							</span>
						</div>

						<!-- Responsive Table -->
						<div class="overflow-x-auto rounded-2xl border border-slate-200">
							<table class="w-full text-left text-xs sm:text-sm">
								<thead class="bg-blue-950 text-white font-black text-[11px] uppercase tracking-wider">
									<tr>
										<th class="p-3 sm:p-4">Metric Parameter</th>
										<th class="p-3 sm:p-4 text-center">Unit / Benchmark</th>
										<th class="p-3 sm:p-4 text-center">Approved Target</th>
										<th class="p-3 sm:p-4 text-center">Actual Performance</th>
										<th class="p-3 sm:p-4 text-center">Variance / Status</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-slate-200 font-medium text-slate-700">
									<tr class="bg-slate-50/50 hover:bg-amber-50/50 transition">
										<td class="p-3 sm:p-4 font-bold text-slate-900">Projected Population</td>
										<td class="p-3 sm:p-4 text-center text-slate-600">Citizens</td>
										<td class="p-3 sm:p-4 text-center font-bold text-slate-900">60,700.00</td>
										<td class="p-3 sm:p-4 text-center font-bold text-slate-900">60,700.00</td>
										<td class="p-3 sm:p-4 text-center text-blue-700 font-bold">100% Baseline</td>
									</tr>
									<tr class="hover:bg-amber-50/50 transition">
										<td class="p-3 sm:p-4 font-bold text-slate-900">Waste Generation Per Capita</td>
										<td class="p-3 sm:p-4 text-center text-slate-600">kgs / day</td>
										<td class="p-3 sm:p-4 text-center font-bold text-slate-900">0.48</td>
										<td class="p-3 sm:p-4 text-center font-bold text-slate-900">0.48</td>
										<td class="p-3 sm:p-4 text-center text-blue-700 font-bold">Standard Factor</td>
									</tr>
									<tr class="bg-slate-50/50 hover:bg-amber-50/50 transition">
										<td class="p-3 sm:p-4 font-bold text-slate-900">Daily Waste Generation</td>
										<td class="p-3 sm:p-4 text-center text-slate-600">kgs / day</td>
										<td class="p-3 sm:p-4 text-center font-bold text-slate-900">29,136.00</td>
										<td class="p-3 sm:p-4 text-center font-bold text-slate-900">29,136.00</td>
										<td class="p-3 sm:p-4 text-center text-slate-600">Municipal Total</td>
									</tr>
									<tr class="hover:bg-blue-50/50 transition">
										<td class="p-3 sm:p-4 font-bold text-blue-950 flex items-center gap-1.5">
											<span class="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
											Waste Diversion Rate
										</td>
										<td class="p-3 sm:p-4 text-center text-blue-800 font-semibold">% diverted</td>
										<td class="p-3 sm:p-4 text-center font-black text-blue-900">69.75%</td>
										<td class="p-3 sm:p-4 text-center font-black text-blue-950 bg-blue-50/90">64.03%</td>
										<td class="p-3 sm:p-4 text-center font-black text-amber-800 bg-amber-100/80">-5.72% Gap</td>
									</tr>
									<tr class="bg-slate-50/50 hover:bg-blue-50/50 transition">
										<td class="p-3 sm:p-4 font-bold text-blue-950">Weight Diverted Daily</td>
										<td class="p-3 sm:p-4 text-center text-blue-800 font-semibold">kgs / day</td>
										<td class="p-3 sm:p-4 text-center font-black text-blue-900">20,322.36</td>
										<td class="p-3 sm:p-4 text-center font-black text-blue-950 bg-blue-50/90">18,656.75</td>
										<td class="p-3 sm:p-4 text-center text-amber-800 font-bold">-1,665.61 kgs</td>
									</tr>
									<tr class="hover:bg-amber-50/60 transition">
										<td class="p-3 sm:p-4 font-bold text-amber-950 flex items-center gap-1.5">
											<span class="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
											Waste Disposal Rate (Landfill)
										</td>
										<td class="p-3 sm:p-4 text-center text-amber-900 font-semibold">% disposed</td>
										<td class="p-3 sm:p-4 text-center font-black text-blue-900">30.25%</td>
										<td class="p-3 sm:p-4 text-center font-black text-amber-950 bg-amber-100/80">35.97%</td>
										<td class="p-3 sm:p-4 text-center font-black text-amber-900 bg-amber-100/90">+5.72% Excess</td>
									</tr>
									<tr class="bg-slate-50/50 hover:bg-amber-50/60 transition">
										<td class="p-3 sm:p-4 font-bold text-amber-950">Weight Disposed Daily</td>
										<td class="p-3 sm:p-4 text-center text-amber-900 font-semibold">kgs / day</td>
										<td class="p-3 sm:p-4 text-center font-black text-blue-900">8,813.64</td>
										<td class="p-3 sm:p-4 text-center font-black text-amber-950 bg-amber-100/80">10,479.25</td>
										<td class="p-3 sm:p-4 text-center text-amber-900 font-bold">+1,665.61 kgs</td>
									</tr>
								</tbody>
							</table>
						</div>

						<!-- Interactive Comparative Visual Bar Analytics (Royal Blue & Amber Yellow) -->
						<div class="mt-6 grid gap-6 md:grid-cols-2">
							<!-- Chart 1: Waste Diversion Comparison -->
							<div class="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
								<div class="flex items-center justify-between mb-3">
									<h5 class="text-xs sm:text-sm font-black text-blue-950 uppercase tracking-tight">
										Waste Diversion: Target vs. Actual
									</h5>
									<span class="text-[11px] font-bold text-slate-500">kgs/day</span>
								</div>

								<!-- Target Bar -->
								<div class="space-y-1.5 mb-3">
									<div class="flex justify-between text-xs font-bold text-slate-700">
										<span class="flex items-center gap-1.5">
											<span class="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
											Target (Approved 10-Yr Plan)
										</span>
										<span class="text-blue-900 font-black">20,322.36 kgs (69.75%)</span>
									</div>
									<div class="h-4 w-full rounded-full bg-slate-200 overflow-hidden">
										<div class="h-full rounded-full bg-blue-600 transition-all duration-700" style="width: 69.75%"></div>
									</div>
								</div>

								<!-- Actual Bar -->
								<div class="space-y-1.5">
									<div class="flex justify-between text-xs font-bold text-slate-700">
										<span class="flex items-center gap-1.5">
											<span class="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
											Actual Accomplishment
										</span>
										<span class="text-amber-900 font-black">18,656.75 kgs (64.03%)</span>
									</div>
									<div class="h-4 w-full rounded-full bg-slate-200 overflow-hidden">
										<div class="h-full rounded-full bg-amber-400 transition-all duration-700" style="width: 64.03%"></div>
									</div>
								</div>

								<div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
									<span>Diversion Gap to Target:</span>
									<span class="text-amber-700 font-black">-5.72% (-1,665.61 kgs/day)</span>
								</div>
							</div>

							<!-- Chart 2: Waste Disposal Comparison -->
							<div class="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
								<div class="flex items-center justify-between mb-3">
									<h5 class="text-xs sm:text-sm font-black text-blue-950 uppercase tracking-tight">
										Waste Disposal (Landfill): Target vs. Actual
									</h5>
									<span class="text-[11px] font-bold text-slate-500">kgs/day</span>
								</div>

								<!-- Target Bar -->
								<div class="space-y-1.5 mb-3">
									<div class="flex justify-between text-xs font-bold text-slate-700">
										<span class="flex items-center gap-1.5">
											<span class="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
											Target Cap (30.25% Max)
										</span>
										<span class="text-blue-900 font-black">8,813.64 kgs (30.25%)</span>
									</div>
									<div class="h-4 w-full rounded-full bg-slate-200 overflow-hidden">
										<div class="h-full rounded-full bg-blue-500 transition-all duration-700" style="width: 30.25%"></div>
									</div>
								</div>

								<!-- Actual Bar -->
								<div class="space-y-1.5">
									<div class="flex justify-between text-xs font-bold text-slate-700">
										<span class="flex items-center gap-1.5">
											<span class="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
											Actual Landfill Disposal
										</span>
										<span class="text-amber-900 font-black">10,479.25 kgs (35.97%)</span>
									</div>
									<div class="h-4 w-full rounded-full bg-slate-200 overflow-hidden">
										<div class="h-full rounded-full bg-amber-500 transition-all duration-700" style="width: 35.97%"></div>
									</div>
								</div>

								<div class="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
									<span>Excess Residual Disposal:</span>
									<span class="text-amber-800 font-black">+5.72% (+1,665.61 kgs/day)</span>
								</div>
							</div>
						</div>

						<!-- Official Presentation Footnote Box -->
						<div class="mt-4 rounded-xl border border-amber-300 bg-amber-50/80 p-3.5 flex items-start gap-2.5 text-xs text-amber-950 font-medium">
							<span class="text-base leading-none">⚠️</span>
							<div>
								<span class="font-black text-amber-900">Official Finding & Action Plan:</span>
								<span>
									The municipality is currently short of <strong>5.72% accomplishment</strong> in compliance with the approved
									Ten-Year Solid Waste Management Plan. MENRO is aggressively expanding barangay-level segregation monitoring,
									composting facilities, and Materials Recovery Facilities (MRFs) to divert residual waste and attain full 69.75% diversion.
								</span>
							</div>
						</div>
					</div>

					<!-- Photo Gallery Showcase Section -->
					<div class="rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
						<div class="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
							<div>
								<span class="text-[10px] font-mono font-black tracking-wider text-blue-900 uppercase">
									PHOTOGRAPHIC EVIDENCE // 0{activeImageIndex + 1} OF 0{menroRecords.length}
								</span>
								<h4 class="text-lg font-black text-blue-950">Field Operations & Presentation Exhibits</h4>
							</div>

							<!-- Image Navigation Controls -->
							<div class="flex items-center gap-2">
								<button
									type="button"
									onclick={prevImage}
									class="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 text-slate-800 transition hover:bg-blue-950 hover:text-amber-300 hover:border-blue-950"
									aria-label="Previous exhibit"
								>
									←
								</button>
								<button
									type="button"
									onclick={nextImage}
									class="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 text-slate-800 transition hover:bg-blue-950 hover:text-amber-300 hover:border-blue-950"
									aria-label="Next exhibit"
								>
									→
								</button>
							</div>
						</div>

						<!-- Main Highlight Display Image -->
						<div class="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-200">
							<img
								src={menroRecords[activeImageIndex].src}
								alt={menroRecords[activeImageIndex].title}
								class="h-72 sm:h-96 w-full object-contain bg-slate-950 transition-all duration-300"
							/>

							<!-- Click to Expand Button -->
							<button
								type="button"
								onclick={() => (fullscreenImage = menroRecords[activeImageIndex])}
								class="absolute top-3 right-3 rounded-xl bg-slate-950/75 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-amber-400 hover:text-blue-950"
							>
								🔍 View Fullscreen
							</button>

							<!-- Image Caption Overlay -->
							<div class="p-4 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/50 text-white">
								<div class="flex items-center gap-2 mb-1">
									<span class="rounded px-2 py-0.5 text-[10px] font-black uppercase {menroRecords[activeImageIndex].badgeColor}">
										{menroRecords[activeImageIndex].tag}
									</span>
								</div>
								<h5 class="text-base font-black text-amber-300">
									{menroRecords[activeImageIndex].title}
								</h5>
								<p class="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
									{menroRecords[activeImageIndex].description}
								</p>
							</div>
						</div>

						<!-- Interactive Thumbnail Row -->
						<div class="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
							{#each menroRecords as record, idx}
								<button
									type="button"
									onclick={() => (activeImageIndex = idx)}
									class="relative h-14 sm:h-20 w-full overflow-hidden rounded-xl border-2 transition-all duration-200 {activeImageIndex === idx ? 'border-amber-400 scale-105 shadow-md' : 'border-slate-200 opacity-60 hover:opacity-100'}"
								>
									<img src={record.src} alt="" class="h-full w-full object-cover" />
								</button>
							{/each}
						</div>
					</div>

					<!-- Official Implementing Office & Executive Leadership -->
					<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
						<div class="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Implementing Office & Executive Coordination</div>
						<div class="grid gap-4 sm:grid-cols-2 text-sm">
							<div>
								<div class="font-black text-blue-950">Municipal Environment & Natural Resources Office (MENRO)</div>
								<div class="text-xs text-slate-600 mt-0.5">Ground Floor, Tanauan Town Hall, Real St., Tanauan, Leyte</div>
								<div class="text-xs font-semibold text-blue-800 mt-1">Lead: Municipal Environment & Natural Resources Officer</div>
							</div>
							<div>
								<div class="font-black text-blue-950">Executive Leadership & Strategic Plan Formulation</div>
								<div class="text-xs text-slate-600 mt-0.5">Hon. Ma. Gina E. Merilo — Municipal Mayor, Municipality of Tanauan, Leyte</div>
								<div class="text-xs font-semibold text-slate-700 mt-1">Approved Ten-Year Solid Waste Management Plan (2024–2033)</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Modal Footer -->
				<div class="flex items-center justify-between border-t-2 border-slate-200 bg-slate-100 px-6 py-4">
					<div class="text-xs font-bold text-slate-600">
						Official Transparency & Environmental Performance Record • MENRO Tanauan
					</div>
					<button
						type="button"
						onclick={closeFolder}
						class="rounded-xl bg-blue-950 hover:bg-blue-900 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-amber-300 shadow-sm transition hover:scale-105 active:scale-95"
					>
						Close Dossier
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Fullscreen Lightbox View -->
	{#if fullscreenImage}
		<div
			class="fixed inset-0 z-60 flex items-center justify-center bg-black/95 p-4"
			transition:fade={{ duration: 200 }}
			onclick={() => (fullscreenImage = null)}
			role="dialog"
		>
			<button
				type="button"
				class="absolute top-5 right-5 text-3xl font-bold text-white hover:text-amber-400"
				onclick={() => (fullscreenImage = null)}
			>
				✕
			</button>
			<div class="max-h-[90vh] max-w-5xl text-center" onclick={(e) => e.stopPropagation()}>
				<img
					src={fullscreenImage.src}
					alt={fullscreenImage.title}
					class="mx-auto max-h-[80vh] rounded-xl object-contain shadow-2xl"
				/>
				<div class="mt-3 text-white text-base font-black">{fullscreenImage.title}</div>
				<div class="mt-1 text-slate-300 text-xs sm:text-sm max-w-3xl mx-auto">{fullscreenImage.description}</div>
			</div>
		</div>
	{/if}
</div>
