<script>
	let showModal = $state(false);
	let activeTab = $state('tree'); // 'tree' | 'document'
	let selectedMember = $state(null);

	const members = {
		mayor: {
			id: 'mayor',
			name: 'HON. MA. GINA E. MERILO',
			title: 'Municipal Mayor',
			roleBadge: 'Executive Head',
			badgeColor: 'bg-red-600 text-white',
			description:
				'Local Chief Executive of the Municipality of Tanauan, Leyte. Exercises executive direction and administrative control over all municipal services, ordinances, and regulatory sections.',
			borderColor: 'border-[#dc2626]'
		},
		administrator: {
			id: 'admin',
			name: 'RET. JUDGE EPHREM S. ABANDO',
			title: 'Municipal Administrator',
			roleBadge: 'Executive Management',
			badgeColor: 'bg-red-600 text-white',
			description:
				'Serves as the executive administrator assisting the Municipal Mayor in coordinating the operations of all statutory municipal departments and administrative units.',
			borderColor: 'border-[#dc2626]'
		},
		treasurer: {
			id: 'treasurer',
			name: 'ROBERT T. PRISNO',
			title: 'Acting Municipal Treasurer',
			roleBadge: 'Office of the Municipal Treasurer',
			badgeColor: 'bg-slate-900 text-white',
			description:
				'Supervises municipal revenue assessment, fee collection, tax records, and statutory financial governance, including direct oversight over the Business Permit & Licensing Section.',
			borderColor: 'border-black'
		},
		bploOic: {
			id: 'bplo-oic',
			name: 'RODELE E. MACEDA',
			title: 'BPLO - Officer-In-Charge',
			roleBadge: 'BPLO Section Head',
			badgeColor: 'bg-blue-900 text-white',
			description:
				'Leads daily operations of the Business Permit & Licensing Section. Oversees unified application filing, ARTA compliance, business clearances, and permit processing.',
			borderColor: 'border-[#1e3a8a]'
		},
		inspector: {
			id: 'inspector',
			name: 'RENERIO P. BUDAÑO',
			title: 'Clerk – Inspection',
			roleBadge: 'Inspection Unit',
			badgeColor: 'bg-emerald-700 text-white',
			description:
				'Conducts regulatory field inspections of commercial establishments across Tanauan to verify building safety, zoning, sanitary compliance, and tax ordinance adherence.',
			borderColor: 'border-[#16a34a]'
		},
		clerkMalate: {
			id: 'clerk-malate',
			name: 'BENEDICTO R. MALATE, JR.',
			title: 'Clerk',
			roleBadge: 'BPLO Records & Processing',
			badgeColor: 'bg-slate-800 text-white',
			description:
				'Facilitates document verification, intake evaluation, data encoding, and archival of municipal business permit records.',
			borderColor: 'border-black'
		},
		clerkAlabar: {
			id: 'clerk-alabar',
			name: 'LYLE CLAUDETTE C. ALABAR',
			title: 'Clerk',
			roleBadge: 'BPLO Public Window',
			badgeColor: 'bg-slate-800 text-white',
			description:
				'Provides frontline client assistance at the BPLO service counter, coordinates clearance releases, and assists taxpayers with permit renewal procedures.',
			borderColor: 'border-black'
		}
	};

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}

	function inspectMember(member) {
		selectedMember = member;
	}

	function closeInspect() {
		selectedMember = null;
	}
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (closeModal(), closeInspect())} />

<div class="w-full max-w-5xl mx-auto flex flex-col items-center space-y-6">
	<!-- View Mode Switcher & Quick Actions -->
	<div class="flex flex-wrap items-center justify-between gap-3 w-full px-2">
		<div class="flex items-center gap-2">
			<span
				class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-950 border border-blue-200"
			>
				<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
				BPLO Ratified Hierarchy
			</span>
			<span class="text-xs font-semibold text-slate-500 hidden sm:inline-block">
				Office of the Municipal Treasurer
			</span>
		</div>

		<div class="flex items-center gap-2">
			<!-- Mode Switcher -->
			<div class="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-2xs">
				<button
					type="button"
					onclick={() => (activeTab = 'tree')}
					class={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
						activeTab === 'tree'
							? 'bg-blue-950 text-amber-300 shadow-xs'
							: 'text-slate-600 hover:text-blue-950 hover:bg-white/60'
					}`}
				>
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
					<span>Interactive Organogram</span>
				</button>
				<button
					type="button"
					onclick={() => (activeTab = 'document')}
					class={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
						activeTab === 'document'
							? 'bg-blue-950 text-amber-300 shadow-xs'
							: 'text-slate-600 hover:text-blue-950 hover:bg-white/60'
					}`}
				>
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					<span>Official Document (PDF)</span>
				</button>
			</div>

			<!-- Download PDF Button -->
			<a
				href="/BPLO-Organizational-Chart.pdf"
				download="Tanauan-BPLO-Organizational-Structure.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-950 transition-colors shadow-2xs"
				title="Download official PDF document"
			>
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
					/>
				</svg>
				<span class="hidden sm:inline">Download PDF</span>
			</a>

			<!-- Fullscreen Button -->
			<button
				type="button"
				onclick={openModal}
				class="inline-flex items-center gap-1.5 rounded-lg bg-blue-950 px-3 py-1.5 text-xs font-black tracking-wider text-white uppercase shadow-sm transition-all hover:bg-blue-900 active:scale-95"
				title="Expand fullscreen view"
			>
				<span>[⛶ Fullscreen]</span>
			</button>
		</div>
	</div>

	{#if activeTab === 'tree'}
		<!-- ── MAIN CODED ORGANIZATIONAL CHART ── -->
		<div
			class="relative w-full rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-12 shadow-sm transition-all overflow-hidden"
		>
			<!-- Subtle Transparent Watermark Seal -->
			<div
				class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04] select-none"
			>
				<img src="/bplo-seal-tanauan.png" alt="" class="w-[420px] h-[420px] object-contain" />
			</div>

			<!-- Official Document Header (Exact Republic Letterhead & Transparent Official Seals) -->
			<div class="relative z-10 flex flex-col items-center text-center pb-8 border-b-2 border-slate-200">
				<div class="flex items-center justify-between w-full max-w-3xl px-2 sm:px-6 mb-4">
					<!-- Left: Tanauan Municipal Seal (Transparent PNG) -->
					<div class="w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
						<img
							src="/bplo-seal-tanauan.png"
							alt="Municipality of Tanauan Official Seal"
							class="max-w-full max-h-full object-contain drop-shadow-sm filter"
						/>
					</div>

					<!-- Center: Official Republic Typography -->
					<div class="space-y-0.5 px-2">
						<p class="text-xs sm:text-sm font-serif text-slate-700 tracking-wide">
							Republic of the Philippines
						</p>
						<p class="text-xs sm:text-sm font-serif text-slate-700 tracking-wide">
							Province of Leyte
						</p>
						<h3 class="text-sm sm:text-base md:text-lg font-black tracking-wider text-slate-900 uppercase">
							MUNICIPALITY OF TANAUAN
						</h3>
						<p class="text-xs font-mono text-slate-400 tracking-widest">-o0o-</p>
						<h4 class="text-xs sm:text-sm md:text-base font-black text-slate-800 tracking-wide uppercase">
							OFFICE OF THE MUNICIPAL TREASURER
						</h4>
						<h2 class="text-sm sm:text-lg md:text-xl font-black text-[#1e3a8a] tracking-wide uppercase">
							BUSINESS PERMIT &amp; LICENSING SECTION
						</h2>
					</div>

					<!-- Right: BPLS Circular Seal (Transparent PNG) -->
					<div class="w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
						<img
							src="/bplo-logo-circular.png"
							alt="Business Permit &amp; Licensing Section Logo"
							class="max-w-full max-h-full object-contain drop-shadow-sm filter"
						/>
					</div>
				</div>

				<!-- Section Title (Exact Document Typography) -->
				<div class="mt-2">
					<h1 class="text-lg sm:text-2xl md:text-3xl font-black tracking-[0.18em] text-slate-900 uppercase">
						ORGANIZATIONAL STRUCTURE
					</h1>
				</div>
			</div>

			<!-- ── HIERARCHICAL TREE ARCHITECTURE ── -->
			<div class="relative z-10 mt-10 flex flex-col items-center w-full max-w-4xl mx-auto">
				<!-- LEVEL 1: MUNICIPAL MAYOR (CENTER) -->
				<div class="relative flex flex-col items-center z-10">
					<button
						type="button"
						onclick={() => inspectMember(members.mayor)}
						class="w-72 sm:w-84 rounded-2xl border-[3px] border-[#dc2626] bg-white px-5 py-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer group"
						title="Click to view role profile"
					>
						<h4 class="text-sm sm:text-base font-black text-slate-950 uppercase tracking-wide group-hover:text-red-700 transition-colors">
							HON. MA. GINA E. MERILO
						</h4>
						<p class="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
							Municipal Mayor
						</p>
					</button>
				</div>

				<!-- INTERMEDIARY ZONE: VERTICAL LINE FROM MAYOR TO TREASURER WITH RIGHT BRANCH TO ADMINISTRATOR -->
				<!-- Desktop (lg+): Vertical spine with dedicated horizontal right branch -->
				<div class="relative w-full hidden lg:flex items-center justify-center h-36">
					<!-- Central Vertical Spine Line (from Mayor to Treasurer) -->
					<div class="w-[3px] h-full bg-black absolute left-1/2 -translate-x-1/2 top-0"></div>

					<!-- Horizontal branch line from spine to Administrator -->
					<div class="h-[3px] bg-black absolute left-1/2 top-1/2 w-14"></div>

					<!-- Administrator Card (Positioned to the right of the spine) -->
					<div class="absolute left-[calc(50%+3.5rem)] top-1/2 -translate-y-1/2 z-10">
						<button
							type="button"
							onclick={() => inspectMember(members.administrator)}
							class="w-72 sm:w-84 rounded-2xl border-[3px] border-[#dc2626] bg-white px-5 py-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer group"
							title="Click to view role profile"
						>
							<h4 class="text-sm sm:text-base font-black text-slate-950 uppercase tracking-wide group-hover:text-red-700 transition-colors">
								RET. JUDGE EPHREM S. ABANDO
							</h4>
							<p class="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
								Municipal Administrator
							</p>
						</button>
					</div>
				</div>

				<!-- Mobile / Tablet (< lg): Vertical inline sequence with clean black connectors -->
				<div class="flex lg:hidden flex-col items-center w-full">
					<div class="w-[3px] h-8 bg-black"></div>
					<button
						type="button"
						onclick={() => inspectMember(members.administrator)}
						class="w-72 sm:w-84 rounded-2xl border-[3px] border-[#dc2626] bg-white px-5 py-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer group z-10"
						title="Click to view role profile"
					>
						<h4 class="text-sm sm:text-base font-black text-slate-950 uppercase tracking-wide group-hover:text-red-700 transition-colors">
							RET. JUDGE EPHREM S. ABANDO
						</h4>
						<p class="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
							Municipal Administrator
						</p>
					</button>
					<div class="w-[3px] h-8 bg-black"></div>
				</div>

				<!-- LEVEL 2: ACTING MUNICIPAL TREASURER (CENTER) -->
				<div class="relative flex flex-col items-center z-10">
					<button
						type="button"
						onclick={() => inspectMember(members.treasurer)}
						class="w-72 sm:w-84 rounded-2xl border-[3px] border-black bg-white px-5 py-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer group"
						title="Click to view role profile"
					>
						<h4 class="text-sm sm:text-base font-black text-slate-950 uppercase tracking-wide group-hover:text-blue-900 transition-colors">
							ROBERT T. PRISNO
						</h4>
						<p class="text-xs sm:text-sm font-semibold text-slate-700 mt-1">
							Acting Municipal Treasurer
						</p>
					</button>

					<!-- Vertical stem dropping to Level 3 crossbar -->
					<div class="w-[3px] h-9 sm:h-11 bg-black"></div>
				</div>

				<!-- LEVEL 3: HORIZONTAL DISTRIBUTION BAR & TWO-COLUMN BRANCHES -->
				<!-- Desktop/Tablet Horizontal Distribution Bar -->
				<div class="hidden sm:block w-full max-w-2xl h-[3px] bg-black relative">
					<!-- Left drop to BPLO OIC -->
					<div class="absolute left-1/4 -top-0.5 w-[3px] h-8 bg-black -translate-x-1/2"></div>
					<!-- Right drop to Inspection Clerk -->
					<div class="absolute right-1/4 -top-0.5 w-[3px] h-8 bg-black translate-x-1/2"></div>
				</div>

				<!-- Level 3 Columns: Left (BPLO OIC + Clerks) & Right (Inspection Clerk) -->
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 w-full max-w-3xl mt-0 sm:mt-7">
					<!-- COLUMN 1: BPLO - OFFICER-IN-CHARGE (Blue Border) & SUBORDINATE CLERKS -->
					<div class="flex flex-col items-center">
						<button
							type="button"
							onclick={() => inspectMember(members.bploOic)}
							class="w-72 sm:w-80 rounded-2xl border-[3px] border-[#1e3a8a] bg-white px-4 py-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer group z-10"
							title="Click to view role profile"
						>
							<h4 class="text-sm sm:text-base font-black text-slate-950 uppercase tracking-wide group-hover:text-blue-900 transition-colors">
								RODELE E. MACEDA
							</h4>
							<p class="text-xs sm:text-sm font-semibold text-[#1e3a8a] mt-1">
								BPLO - Officer-In-Charge
							</p>
						</button>

						<!-- Vertical stem dropping from Rodele E. Maceda to Clerks -->
						<div class="w-[3px] h-9 sm:h-11 bg-black"></div>

						<!-- Horizontal crossbar for subordinate clerks -->
						<div class="hidden sm:block w-full max-w-xs h-[3px] bg-black relative">
							<!-- Left drop to Benedicto Malate -->
							<div class="absolute left-1/4 -top-0.5 w-[3px] h-7 bg-black -translate-x-1/2"></div>
							<!-- Right drop to Lyle Claudette Alabar -->
							<div class="absolute right-1/4 -top-0.5 w-[3px] h-7 bg-black translate-x-1/2"></div>
						</div>

						<!-- LEVEL 4: SUBORDINATE CLERKS (Black Borders) -->
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xs mt-0 sm:mt-6">
							<!-- Benedicto R. Malate, Jr. -->
							<button
								type="button"
								onclick={() => inspectMember(members.clerkMalate)}
								class="rounded-2xl border-[3px] border-black bg-white px-3 py-3 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer group"
								title="Click to view role profile"
							>
								<h5 class="text-xs sm:text-sm font-black text-slate-950 uppercase leading-snug group-hover:text-blue-950">
									BENEDICTO R. MALATE, JR.
								</h5>
								<p class="text-xs font-semibold text-slate-700 mt-0.5">
									Clerk
								</p>
							</button>

							<!-- Lyle Claudette C. Alabar -->
							<button
								type="button"
								onclick={() => inspectMember(members.clerkAlabar)}
								class="rounded-2xl border-[3px] border-black bg-white px-3 py-3 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer group"
								title="Click to view role profile"
							>
								<h5 class="text-xs sm:text-sm font-black text-slate-950 uppercase leading-snug group-hover:text-blue-950">
									LYLE CLAUDETTE C. ALABAR
								</h5>
								<p class="text-xs font-semibold text-slate-700 mt-0.5">
									Clerk
								</p>
							</button>
						</div>
					</div>

					<!-- COLUMN 2: CLERK – INSPECTION (Green Border) -->
					<div class="flex flex-col items-center">
						<button
							type="button"
							onclick={() => inspectMember(members.inspector)}
							class="w-72 sm:w-80 rounded-2xl border-[3px] border-[#16a34a] bg-white px-4 py-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 text-center cursor-pointer group z-10"
							title="Click to view role profile"
						>
							<h4 class="text-sm sm:text-base font-black text-slate-950 uppercase tracking-wide group-hover:text-emerald-700 transition-colors">
								RENERIO P. BUDAÑO
							</h4>
							<p class="text-xs sm:text-sm font-semibold text-[#16a34a] mt-1">
								Clerk – Inspection
							</p>
						</button>
					</div>
				</div>
			</div>

			<!-- Official Banner Graphic Footer (Transparent PNG Banner) -->
			<div class="relative z-10 mt-14 pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div class="flex items-center gap-3">
					<img
						src="/bplo-banner-footer.png"
						alt="BPLS Official Banner"
						class="h-10 sm:h-12 w-auto object-contain filter drop-shadow-2xs"
					/>
				</div>

				<div class="text-center sm:text-right">
					<div class="text-[11px] font-black text-blue-950 uppercase tracking-wider">
						Official Document No. BPLO-ORG-2025-01
					</div>
					<div class="text-[10px] font-medium text-slate-500">
						Office of the Municipal Treasurer • Business Permit &amp; Licensing Section
					</div>
				</div>
			</div>
		</div>
	{:else}
		<!-- ── OFFICIAL PDF EMBEDDED VIEWER TAB ── -->
		<div
			class="relative w-full rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-8 shadow-sm text-center"
		>
			<div class="max-w-2xl mx-auto space-y-4 mb-6">
				<div class="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-blue-950">
					<span>Official Ratified Public Record</span>
				</div>
				<h3 class="text-xl sm:text-2xl font-black text-blue-950 uppercase">
					BPLO Organizational Structure Document
				</h3>
				<p class="text-sm text-slate-600">
					View or download the official certified PDF document signed and archived for the Business Permit &amp; Licensing Section under the Office of the Municipal Treasurer.
				</p>

				<div class="flex flex-wrap items-center justify-center gap-3 pt-2">
					<a
						href="/BPLO-Organizational-Chart.pdf"
						download="Tanauan-BPLO-Organizational-Chart.pdf"
						class="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md hover:bg-blue-900 transition-all hover:scale-102"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
						</svg>
						<span>Download Official PDF (291 KB)</span>
					</a>
					<a
						href="/BPLO-Organizational-Chart.pdf"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-800 hover:border-blue-900 hover:text-blue-950 transition-all"
					>
						<span>Open in New Tab ↗</span>
					</a>
				</div>
			</div>

			<!-- PDF Frame Preview -->
			<div class="w-full h-[650px] rounded-2xl border-2 border-slate-200 overflow-hidden shadow-inner bg-slate-100">
				<iframe
					src="/BPLO-Organizational-Chart.pdf#view=FitH"
					title="BPLO Official Organizational Chart PDF"
					class="w-full h-full border-0"
				></iframe>
			</div>
		</div>
	{/if}
</div>

<!-- ── DETAIL MODAL POPUP (ON NODE CLICK) ── -->
{#if selectedMember}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/80 p-4 backdrop-blur-xs"
		role="presentation"
	>
		<button
			type="button"
			class="fixed inset-0 h-full w-full cursor-default bg-transparent border-0"
			onclick={closeInspect}
			aria-label="Close modal background"
		></button>

		<div
			class="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border-4 border-amber-400 bg-white shadow-2xl transition-all"
			role="dialog"
			aria-modal="true"
		>
			<!-- Header -->
			<div class="flex items-center justify-between border-b-2 border-amber-400 bg-blue-950 px-6 py-4 text-white">
				<div class="flex items-center gap-2.5">
					<span class="h-3 w-3 rounded-full bg-amber-400"></span>
					<span class="text-xs font-black tracking-widest uppercase text-amber-300">
						Official Profile &amp; Role Details
					</span>
				</div>
				<button
					type="button"
					onclick={closeInspect}
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900 text-sm font-black text-white hover:bg-red-600 transition-colors"
					aria-label="Close details"
				>
					✕
				</button>
			</div>

			<!-- Content Body -->
			<div class="p-6 space-y-4">
				<div class="border-b border-slate-200 pb-4">
					<span class="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider {selectedMember.badgeColor} mb-2">
						{selectedMember.roleBadge}
					</span>
					<h3 class="text-xl font-black text-slate-950 uppercase">
						{selectedMember.name}
					</h3>
					<p class="text-sm font-bold text-blue-900 uppercase">
						{selectedMember.title}
					</p>
				</div>

				<div class="space-y-2">
					<div class="text-xs font-black uppercase tracking-wider text-slate-500">
						Designation &amp; Statutory Function
					</div>
					<p class="text-sm text-slate-700 leading-relaxed">
						{selectedMember.description}
					</p>
				</div>

				<div class="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs space-y-2 text-slate-600 font-medium">
					<div class="flex justify-between items-center">
						<span class="text-slate-500">Department:</span>
						<span class="font-bold text-slate-900">Office of the Municipal Treasurer</span>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-slate-500">Section:</span>
						<span class="font-bold text-slate-900">Business Permit &amp; Licensing Section</span>
					</div>
					<div class="flex justify-between items-center">
						<span class="text-slate-500">Location:</span>
						<span class="font-bold text-slate-900">Ground Floor, Municipal Hall, Tanauan</span>
					</div>
				</div>
			</div>

			<!-- Footer -->
			<div class="flex items-center justify-end border-t border-slate-200 bg-slate-50 px-6 py-3">
				<button
					type="button"
					onclick={closeInspect}
					class="rounded-xl bg-blue-950 px-5 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-blue-900"
				>
					Close
				</button>
			</div>
		</div>
	</div>
{/if}

<!-- ── FULLSCREEN LIGHTBOX MODAL ── -->
{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/85 p-4 backdrop-blur-md"
		role="presentation"
	>
		<button
			type="button"
			class="fixed inset-0 h-full w-full cursor-default bg-transparent border-0"
			onclick={closeModal}
			aria-label="Close modal background"
		></button>

		<div
			class="relative z-10 flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border-4 border-amber-400 bg-white shadow-2xl"
			role="dialog"
			aria-modal="true"
		>
			<!-- Modal Header -->
			<div class="flex items-center justify-between border-b-2 border-amber-400 bg-blue-950 px-6 py-4 text-white">
				<div class="flex items-center gap-3">
					<span class="h-3 w-3 rounded-full bg-amber-400"></span>
					<div>
						<div class="text-sm font-black tracking-wide uppercase">
							Business Permit &amp; Licensing Section — Organizational Hierarchy
						</div>
						<div class="text-xs font-medium text-blue-200">
							Municipality of Tanauan, Province of Leyte
						</div>
					</div>
				</div>

				<div class="flex items-center gap-3">
					<a
						href="/BPLO-Organizational-Chart.pdf"
						download="Tanauan-BPLO-Organizational-Structure.pdf"
						class="rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-black tracking-wider text-blue-950 uppercase transition-all hover:bg-amber-300 shadow-sm"
					>
						Download PDF ↗
					</a>
					<button
						type="button"
						onclick={closeModal}
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900 text-sm font-black text-white hover:bg-red-600 transition-colors"
						aria-label="Close modal"
					>
						✕
					</button>
				</div>
			</div>

			<!-- Modal Viewport -->
			<div class="flex-1 overflow-auto bg-slate-50 p-6 sm:p-8">
				<iframe
					src="/BPLO-Organizational-Chart.pdf#view=FitH"
					title="BPLO Official Organizational Chart Fullscreen"
					class="w-full h-[70vh] rounded-xl border border-slate-300 bg-white shadow-md"
				></iframe>
			</div>

			<!-- Modal Footer -->
			<div class="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-600">
				<span>Press ESC or click outside to close viewer.</span>
				<span class="text-blue-900 font-mono">OFFICIAL MUNICIPAL GOVERNMENT DOCUMENT</span>
			</div>
		</div>
	</div>
{/if}
