<script>
	let activeTab = $state('table'); // 'table' | 'slide'
	let showModal = $state(false);

	const summaryData = [
		{
			particular: 'Business Establishment',
			category: 'Commercial & Retail Enterprises',
			icon: 'building',
			y2025: {
				registered: 1137,
				assessment: 19358167.16
			},
			y2026: {
				registered: 1154,
				assessment: 23299031.08
			},
			regGrowth: '+1.5%',
			regDelta: '+17',
			assGrowth: '+20.36%',
			assDelta: '+₱3,940,863.92',
			isPositive: true
		},
		{
			particular: 'Public Transport',
			category: 'MTOP, E-Trikes & Pedicab Franchises',
			icon: 'transport',
			y2025: {
				registered: 2165,
				assessment: 2198881.0
			},
			y2026: {
				registered: 2355,
				assessment: 2100761.4
			},
			regGrowth: '+8.78%',
			regDelta: '+190',
			assGrowth: '-4.46%',
			assDelta: '-₱98,119.60',
			isPositive: true
		},
		{
			particular: 'Special Permit',
			category: 'Occasional & Special Activity Permits',
			icon: 'ticket',
			y2025: {
				registered: 116,
				assessment: 363112.35
			},
			y2026: {
				registered: 128,
				assessment: 402089.78
			},
			regGrowth: '+10.34%',
			regDelta: '+12',
			assGrowth: '+10.73%',
			assDelta: '+₱38,977.43',
			isPositive: true
		}
	];

	const totals = {
		y2025: {
			registered: 3418,
			assessment: 21920160.51
		},
		y2026: {
			registered: 3637,
			assessment: 25801882.26
		},
		overallRegIncrease: '6% (increase)',
		overallAssIncrease: '17.7% (increase)',
		totalRegDelta: '+219',
		totalAssDelta: '+₱3,881,721.75'
	};

	function formatCurrency(val) {
		return new Intl.NumberFormat('en-PH', {
			style: 'currency',
			currency: 'PHP',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(val);
	}

	function formatNumber(val) {
		return new Intl.NumberFormat('en-PH').format(val);
	}

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && closeModal()} />

<div class="w-full flex flex-col space-y-6">
	<!-- Top Controls & Action Bar -->
	<div class="flex flex-wrap items-center justify-between gap-3 px-1">
		<div class="flex items-center gap-2">
			<span
				class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-950 border border-amber-300"
			>
				<span class="h-2 w-2 rounded-full bg-amber-600 animate-pulse"></span>
				Official BPLO Fiscal Audit Report
			</span>
			<span class="text-xs font-semibold text-slate-500 hidden sm:inline-block">
				As of August 2026
			</span>
		</div>

		<div class="flex items-center gap-2">
			<!-- Mode Switcher -->
			<div class="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-2xs">
				<button
					type="button"
					onclick={() => (activeTab = 'table')}
					class={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
						activeTab === 'table'
							? 'bg-blue-950 text-amber-300 shadow-xs'
							: 'text-slate-600 hover:text-blue-950 hover:bg-white/60'
					}`}
				>
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
						/>
					</svg>
					<span>Audited Scorecard</span>
				</button>

				<button
					type="button"
					onclick={() => (activeTab = 'slide')}
					class={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-black transition-all ${
						activeTab === 'slide'
							? 'bg-blue-950 text-amber-300 shadow-xs'
							: 'text-slate-600 hover:text-blue-950 hover:bg-white/60'
					}`}
				>
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<span>Official Slide Document</span>
				</button>
			</div>

			<!-- Direct Download Image Button -->
			<a
				href="/images/accomplishments/bplo-comparative-summary-2026.jpg"
				download="BPLO-Comparative-Summary-Registration-Assessment-2026.jpg"
				class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-950 transition-colors shadow-2xs"
				title="Download official report slide"
			>
				<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
					/>
				</svg>
				<span class="hidden sm:inline">Download Slide</span>
			</a>

			<!-- Fullscreen Preview -->
			<button
				type="button"
				onclick={openModal}
				class="inline-flex items-center gap-1.5 rounded-lg bg-blue-950 px-3 py-1.5 text-xs font-black tracking-wider text-white uppercase shadow-sm transition-all hover:bg-blue-900 active:scale-95"
				title="Open high-resolution slide viewer"
			>
				<span>[⛶ Fullscreen]</span>
			</button>
		</div>
	</div>

	<!-- ── KEY PERFORMANCE METRIC CARDS ── -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
		<!-- Total Assessment Collection Card -->
		<div class="relative overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-white via-emerald-50/20 to-emerald-100/30 p-5 shadow-sm">
			<div class="flex items-center justify-between gap-2 mb-2">
				<span class="text-[10px] font-black uppercase tracking-wider text-emerald-800">
					Total Assessment (2026)
				</span>
				<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white shadow-2xs">
					+17.7% YoY
				</span>
			</div>
			<div class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
				₱25,801,882.26
			</div>
			<div class="mt-1 flex items-center justify-between text-xs text-slate-600 font-medium">
				<span>2025: ₱21,920,160.51</span>
				<span class="font-bold text-emerald-700">+₱3.88M</span>
			</div>
		</div>

		<!-- Total Registered Entities Card -->
		<div class="relative overflow-hidden rounded-2xl border-2 border-blue-500/40 bg-gradient-to-br from-white via-blue-50/20 to-blue-100/30 p-5 shadow-sm">
			<div class="flex items-center justify-between gap-2 mb-2">
				<span class="text-[10px] font-black uppercase tracking-wider text-blue-900">
					Total Registrations
				</span>
				<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-900 text-white shadow-2xs">
					+6.0% YoY
				</span>
			</div>
			<div class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
				3,637 Entities
			</div>
			<div class="mt-1 flex items-center justify-between text-xs text-slate-600 font-medium">
				<span>2025: 3,418 Registered</span>
				<span class="font-bold text-blue-900">+219 Units</span>
			</div>
		</div>

		<!-- Business Establishments Assessment Card -->
		<div class="relative overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-white via-amber-50/20 to-amber-100/30 p-5 shadow-sm">
			<div class="flex items-center justify-between gap-2 mb-2">
				<span class="text-[10px] font-black uppercase tracking-wider text-amber-900">
					Commercial Establishments
				</span>
				<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-amber-950 shadow-2xs">
					+20.36%
				</span>
			</div>
			<div class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
				₱23,299,031.08
			</div>
			<div class="mt-1 flex items-center justify-between text-xs text-slate-600 font-medium">
				<span>1,154 Establishments</span>
				<span class="font-bold text-amber-900">+₱3.94M</span>
			</div>
		</div>

		<!-- Public Transport Card -->
		<div class="relative overflow-hidden rounded-2xl border-2 border-purple-500/40 bg-gradient-to-br from-white via-purple-50/20 to-purple-100/30 p-5 shadow-sm">
			<div class="flex items-center justify-between gap-2 mb-2">
				<span class="text-[10px] font-black uppercase tracking-wider text-purple-900">
					Public Transport (MTOP)
				</span>
				<span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-700 text-white shadow-2xs">
					+8.78% Reg
				</span>
			</div>
			<div class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
				2,355 Units
			</div>
			<div class="mt-1 flex items-center justify-between text-xs text-slate-600 font-medium">
				<span>Assessment: ₱2.10M</span>
				<span class="font-bold text-purple-900">+190 Units</span>
			</div>
		</div>
	</div>

	{#if activeTab === 'table'}
		<!-- ── AUDITED COMPARATIVE SUMMARY TABLE CONTAINER ── -->
		<div class="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-sm overflow-hidden">
			<!-- Header Banner matching Official Slide Lettering -->
			<div class="relative mb-6 pb-6 border-b-2 border-slate-200 text-center">
				<!-- Philippine Flag Tri-Color Ribbon Top Bar -->
				<div class="h-2 w-full max-w-md mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-700 via-amber-400 to-red-600"></div>

				<h3 class="text-lg sm:text-2xl font-black tracking-wide text-slate-900 uppercase">
					COMPARATIVE SUMMARY OF REGISTRATION AND ASSESSMENT
				</h3>
				<p class="text-sm sm:text-base font-extrabold italic text-red-600 mt-1">
					As of August 2026
				</p>
				<p class="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
					Municipal Government of Tanauan, Leyte • Business Permit &amp; Licensing Section
				</p>
			</div>

			<!-- Responsive Scrollable Data Table -->
			<div class="overflow-x-auto rounded-2xl border-2 border-slate-800 shadow-sm">
				<table class="w-full text-left border-collapse text-sm">
					<thead>
						<!-- Tier 1 Header -->
						<tr class="bg-amber-400 text-slate-950 border-b-2 border-slate-800 font-black uppercase text-center">
							<th rowspan="2" class="p-4 border-r-2 border-slate-800 text-left text-xs sm:text-sm tracking-wider">
								PARTICULAR
							</th>
							<th colspan="2" class="p-3 border-r-2 border-slate-800 text-xs sm:text-sm tracking-wider">
								January – August 2025
							</th>
							<th colspan="2" class="p-3 text-xs sm:text-sm tracking-wider">
								January – August 2026
							</th>
						</tr>
						<!-- Tier 2 Header -->
						<tr class="bg-amber-300 text-slate-950 border-b-2 border-slate-800 font-extrabold text-center text-xs uppercase">
							<th class="p-2.5 border-r-2 border-slate-800 w-28 sm:w-32">
								Registered
							</th>
							<th class="p-2.5 border-r-2 border-slate-800 w-40 sm:w-48">
								Assessment
							</th>
							<th class="p-2.5 border-r-2 border-slate-800 w-28 sm:w-32">
								Registered
							</th>
							<th class="p-2.5 w-40 sm:w-48">
								Assessment
							</th>
						</tr>
					</thead>

					<tbody class="divide-y-2 divide-slate-300 font-medium text-slate-900">
						{#each summaryData as row}
							<tr class="hover:bg-amber-50/50 transition-colors">
								<td class="p-3.5 sm:p-4 border-r-2 border-slate-800">
									<div class="font-black text-slate-950 text-xs sm:text-sm">
										{row.particular}
									</div>
									<div class="text-[11px] font-semibold text-slate-500">
										{row.category}
									</div>
								</td>

								<!-- 2025 Data -->
								<td class="p-3.5 sm:p-4 text-center border-r-2 border-slate-800 font-mono font-bold text-xs sm:text-sm">
									{formatNumber(row.y2025.registered)}
								</td>
								<td class="p-3.5 sm:p-4 text-right border-r-2 border-slate-800 font-mono font-bold text-xs sm:text-sm">
									{formatCurrency(row.y2025.assessment)}
								</td>

								<!-- 2026 Data -->
								<td class="p-3.5 sm:p-4 text-center border-r-2 border-slate-800 font-mono font-black text-xs sm:text-sm bg-blue-50/40">
									<span class="text-blue-950">{formatNumber(row.y2026.registered)}</span>
									<span class="block text-[10px] font-extrabold text-emerald-700">{row.regDelta}</span>
								</td>
								<td class="p-3.5 sm:p-4 text-right font-mono font-black text-xs sm:text-sm bg-blue-50/40">
									<span class="text-blue-950">{formatCurrency(row.y2026.assessment)}</span>
									<span class="block text-[10px] font-extrabold {row.assGrowth.startsWith('+') ? 'text-emerald-700' : 'text-slate-500'}">
										{row.assDelta} ({row.assGrowth})
									</span>
								</td>
							</tr>
						{/each}

						<!-- TOTAL HIGHLIGHT ROW (BRIGHT YELLOW MATCHING THE OFFICIAL DOCUMENT) -->
						<tr class="bg-amber-300 font-black text-slate-950 border-t-4 border-b-2 border-slate-800">
							<td class="p-4 border-r-2 border-slate-800 text-sm sm:text-base uppercase tracking-wider">
								Total
							</td>
							<td class="p-4 text-center border-r-2 border-slate-800 font-mono text-sm sm:text-base">
								{formatNumber(totals.y2025.registered)}
							</td>
							<td class="p-4 text-right border-r-2 border-slate-800 font-mono text-sm sm:text-base">
								{formatCurrency(totals.y2025.assessment)}
							</td>
							<td class="p-4 text-center border-r-2 border-slate-800 font-mono text-sm sm:text-base bg-amber-400">
								{formatNumber(totals.y2026.registered)}
							</td>
							<td class="p-4 text-right font-mono text-sm sm:text-base bg-amber-400">
								{formatCurrency(totals.y2026.assessment)}
							</td>
						</tr>

						<!-- INCREASE / DECREASE ROW -->
						<tr class="bg-slate-50 font-black text-slate-900 border-t-2 border-slate-800">
							<td class="p-4 border-r-2 border-slate-800 text-xs sm:text-sm uppercase tracking-wide">
								Increase/Decrease (%)
							</td>
							<td colspan="4" class="p-4 text-center text-sm sm:text-base text-slate-950 tracking-wider">
								<span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-300 font-black">
									<svg class="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
									</svg>
									<span>6% (Registrations) &nbsp;/&nbsp; 17.7% (Assessment Increase)</span>
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Footer Note & Audit Certification -->
			<div class="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
				<div class="flex items-center gap-2">
					<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
					<span class="font-bold text-slate-800">Source: BPLO Consolidated Revenue &amp; Permit Ledger</span>
				</div>
				<div class="font-serif italic font-bold text-blue-900">
					BUSINESS PERMIT &amp; LICENSING SECTION
				</div>
			</div>
		</div>
	{:else}
		<!-- ── OFFICIAL SLIDE IMAGE VIEW TAB ── -->
		<div class="rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-sm text-center">
			<div class="max-w-2xl mx-auto space-y-3 mb-6">
				<h3 class="text-xl sm:text-2xl font-black text-blue-950 uppercase">
					Official Report Slide
				</h3>
				<p class="text-sm text-slate-600">
					Verified presentation slide submitted to the Local Chief Executive and the Municipal Council, showing the audited comparison between FY 2025 and FY 2026.
				</p>
			</div>

			<!-- Image Display Container with Zoom Hint -->
			<button
				type="button"
				onclick={openModal}
				class="group relative mx-auto block max-w-4xl overflow-hidden rounded-2xl border-4 border-slate-300 bg-slate-100 shadow-md hover:border-blue-900 hover:shadow-xl transition-all cursor-zoom-in"
				title="Click to view full size in high resolution"
			>
				<img
					src="/images/accomplishments/bplo-comparative-summary-2026.jpg"
					alt="Comparative Summary of Registration and Assessment As of August 2026"
					class="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
				/>

				<div class="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-blue-950/90 text-white px-3 py-1.5 text-xs font-bold shadow-md backdrop-blur-xs">
					<span>🔍 Click to inspect fullscreen</span>
				</div>
			</button>
		</div>
	{/if}
</div>

<!-- ── FULLSCREEN LIGHTBOX MODAL FOR OFFICIAL SLIDE ── -->
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
							Comparative Summary of Registration &amp; Assessment (As of August 2026)
						</div>
						<div class="text-xs font-medium text-blue-200">
							Business Permit &amp; Licensing Section • Municipality of Tanauan, Leyte
						</div>
					</div>
				</div>

				<div class="flex items-center gap-3">
					<a
						href="/images/accomplishments/bplo-comparative-summary-2026.jpg"
						download="BPLO-Comparative-Summary-2026.jpg"
						class="rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-black tracking-wider text-blue-950 uppercase transition-all hover:bg-amber-300 shadow-sm"
					>
						Download Image ↗
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

			<!-- Modal Image Viewport -->
			<div class="flex-1 overflow-auto bg-slate-900 p-4 sm:p-6 flex items-center justify-center">
				<img
					src="/images/accomplishments/bplo-comparative-summary-2026.jpg"
					alt="Official BPLO Comparative Summary Slide"
					class="max-h-[75vh] w-auto max-w-full rounded-xl border border-slate-700 object-contain shadow-2xl"
				/>
			</div>

			<!-- Modal Footer -->
			<div class="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-600">
				<span>Press ESC or click outside to close preview.</span>
				<span class="text-blue-900 font-mono">OFFICIAL AUDITED SCORECARD</span>
			</div>
		</div>
	</div>
{/if}
