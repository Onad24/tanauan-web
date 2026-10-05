<script>
	import { onMount } from 'svelte';
	import {
		Users,
		TrendingUp,
		TrendingDown,
		Home,
		MapPin,
		Compass,
		BarChart3,
		ArrowUpRight,
		ArrowDownRight,
		Layers,
		Sparkles,
		Building2,
		Calendar,
		Maximize2,
		Percent,
		ShieldCheck,
		Info,
		PieChart
	} from 'lucide-svelte';

	// Page animation state
	let visible = $state(false);
	let activeTab = $state('all'); // 'all' | 'history' | 'barangays' | 'dashboard'

	// Historical census data (1903 - 2020) from PSA
	const historicalData = [
		{ year: 1903, pop: 18256, rate: null, label: 'Early Census', note: 'First baseline census' },
		{ year: 1918, pop: 18880, rate: 0.21, label: 'American Period', note: '+0.21% annual growth' },
		{ year: 1939, pop: 21934, rate: 0.75, label: 'Commonwealth', note: '+0.75% annual growth' },
		{ year: 1948, pop: 24573, rate: 1.17, label: 'Post-War Era', note: '+1.17% annual growth' },
		{ year: 1960, pop: 23421, rate: -0.42, label: 'Out-Migration Dip', note: '-0.42% contraction' },
		{ year: 1970, pop: 29438, rate: 2.26, label: 'Mid-Century Peak', note: '★ Peak historical growth (2.26%)' },
		{ year: 1975, pop: 30541, rate: 0.74, label: 'Mid-70s Census', note: '+0.74% annual growth' },
		{ year: 1980, pop: 31487, rate: 0.61, label: 'Stable Expansion', note: '+0.61% annual growth' },
		{ year: 1990, pop: 38033, rate: 1.91, label: 'Agrarian Growth', note: '+1.91% annual growth' },
		{ year: 1995, pop: 40716, rate: 1.29, label: 'Mid-90s Census', note: '+1.29% annual growth' },
		{ year: 2000, pop: 45056, rate: 2.20, label: 'Millennium Rise', note: '+2.20% strong expansion' },
		{ year: 2007, pop: 47426, rate: 0.71, label: 'Mid-2000s Census', note: '+0.71% annual growth' },
		{ year: 2010, pop: 50119, rate: 2.03, label: '50k Milestone', note: '+2.03% crossed 50k citizens' },
		{ year: 2015, pop: 55021, rate: 1.79, label: 'Resilience Era', note: '+1.79% post-calamity recovery' },
		{ year: 2020, pop: 57455, rate: 0.92, label: 'Official Census', note: '+0.92% 57,455 inhabitants' }
	];

	// Population & Household series (1990 - 2015/2020)
	const householdSeries = [
		{ year: 1990, pop: 38033, households: 7696, avgSize: '4.94' },
		{ year: 1995, pop: 40716, households: 8315, avgSize: '4.90' },
		{ year: 2000, pop: 45056, households: 9224, avgSize: '4.88' },
		{ year: 2007, pop: 47426, households: 10305, avgSize: '4.60' },
		{ year: 2010, pop: 50119, households: 10979, avgSize: '4.56' },
		{ year: 2015, pop: 55021, households: 13518, avgSize: '4.07' },
		{ year: 2020, pop: 57455, households: 12808, avgSize: '4.49' }
	];

	// Notable Barangay Highlights (2020 Census)
	const topBarangays = [
		{ name: 'Pago', pop: 3989, share: '6.94%', rank: 1, tag: 'Most Populous' },
		{ name: 'Santo Niño Poblacion', pop: 3747, share: '6.52%', rank: 2, tag: 'Urban Town Center' },
		{ name: 'Canramos', pop: 3320, share: '5.78%', rank: 3, tag: 'Major Commercial Hub' },
		{ name: 'Cabuynan', pop: 3070, share: '5.34%', rank: 4, tag: 'Key Coastal Community' }
	];

	const rapidGrowthBarangays = [
		{
			name: 'Sacme',
			growth: '+32.30%',
			label: 'Fastest Municipal Growth',
			desc: 'Leading all 54 barangays in intercensal population surge'
		},
		{
			name: 'Pago',
			growth: '+19.18%',
			label: 'Sustained Expansion',
			desc: 'Combines the largest resident count with double-digit growth momentum'
		}
	];

	const decliningBarangays = [
		{
			name: 'San Roque',
			decline: '-7.13%',
			label: 'Population Contraction',
			desc: 'Local demographic readjustment and resettlement migration'
		},
		{
			name: 'Catigbian',
			decline: '-7.28%',
			label: 'Negative Growth Trend',
			desc: 'Out-migration toward town center and commercial corridors'
		}
	];

	// Age & Sex distribution (2020 Census)
	const ageSexData = [
		{ category: '0–14 years (Young Dependents)', count: '18,420', pct: 32.1, color: 'amber' },
		{ category: '15–64 years (Working Age Cohort)', count: '35,450', pct: 61.7, color: 'blue' },
		{ category: '65+ years (Senior Dependents)', count: '3,533', pct: 6.1, color: 'amber' },
		{ category: 'Male Population', count: '29,688', pct: 51.7, color: 'blue' },
		{ category: 'Female Population', count: '27,767', pct: 48.3, color: 'amber' }
	];

	// Interactive chart state
	let activeChartTab = $state('population'); // 'population' | 'growth'
	let activeCensusIndex = $state(14); // defaults to 2020
	let activeCensus = $derived(historicalData[activeCensusIndex]);

	// Chart dimensions & calculations
	const chartW = 860;
	const chartH = 260;
	const padX = 45;
	const padTop = 30;
	const padBottom = 35;
	const innerW = chartW - padX * 2;
	const innerH = chartH - padTop - padBottom;

	const minPop = 15000;
	const maxPop = 62000;

	// Baseline y coordinate for growth rate chart (0% line)
	const zeroY = padTop + (2.5 / 3.5) * innerH;

	// Compute SVG coordinates for population curve
	const popPoints = $derived(
		historicalData.map((d, i) => {
			const x = padX + (i / (historicalData.length - 1)) * innerW;
			const y = padTop + (1 - (d.pop - minPop) / (maxPop - minPop)) * innerH;
			return { x, y, ...d };
		})
	);

	const svgPathString = $derived(
		popPoints.reduce((acc, pt, i) => {
			if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
			const prev = popPoints[i - 1];
			const cx1 = prev.x + (pt.x - prev.x) / 2;
			const cy1 = prev.y;
			const cx2 = prev.x + (pt.x - prev.x) / 2;
			const cy2 = pt.y;
			return `${acc} C ${cx1.toFixed(1)} ${cy1.toFixed(1)}, ${cx2.toFixed(1)} ${cy2.toFixed(1)}, ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
		}, '')
	);

	const svgAreaString = $derived(
		`${svgPathString} L ${popPoints[popPoints.length - 1].x.toFixed(1)} ${(chartH - padBottom).toFixed(1)} L ${popPoints[0].x.toFixed(1)} ${(chartH - padBottom).toFixed(1)} Z`
	);

	const maxHouseholdPop = 60000;

	onMount(() => {
		visible = true;
	});
</script>

<svelte:head>
	<title>Demographics | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Comprehensive demographic profile, historical growth rates from 1903 to 2020, household projections, and notable barangay population highlights of the Municipality of Tanauan, Leyte."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="geo-root">
	<!-- Hero Section with Royal Blue & Amber Ambient Atmosphere (Matching Geography Design) -->
	<header class="geo-hero">
		<div class="geo-ambient geo-ambient-royal"></div>
		<div class="geo-ambient geo-ambient-amber"></div>
		<div class="geo-ambient geo-ambient-bottom"></div>

		<div class="geo-hero-inner" class:is-visible={visible}>
			<h1 class="geo-hero-title">
				Demographic <span class="geo-amber-gradient">Profile</span>
			</h1>

			<p class="geo-hero-subtitle">
				Municipality of Tanauan, Leyte &bull; Bungto han Kamag-araman
			</p>

			<p class="geo-hero-description">
				Official Philippine Statistics Authority (PSA) census records, municipal population
				dynamics, intercensal historical growth rates (1903–2020), household trends, and notable
				barangay population highlights.
			</p>

			<!-- Interactive Section Selector -->
			<div class="geo-filter-group" role="tablist" aria-label="Demographics sections">
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'all'}
					class="geo-filter-btn"
					class:is-active={activeTab === 'all'}
					onclick={() => (activeTab = 'all')}
				>
					Complete Profile
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'history'}
					class="geo-filter-btn"
					class:is-active={activeTab === 'history'}
					onclick={() => (activeTab = 'history')}
				>
					Historical Timeline
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'barangays'}
					class="geo-filter-btn"
					class:is-active={activeTab === 'barangays'}
					onclick={() => (activeTab = 'barangays')}
				>
					Barangay Highlights
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'dashboard'}
					class="geo-filter-btn"
					class:is-active={activeTab === 'dashboard'}
					onclick={() => (activeTab = 'dashboard')}
				>
					GIS Dashboard
				</button>
			</div>
		</div>
	</header>

	<!-- Main Body Container -->
	<main class="geo-main">
		<div class="geo-container">
			<!-- ==========================================================
			     SECTION 1: 4 KEY DEMOGRAPHIC & GEOGRAPHIC STAT CARDS
			     ========================================================== -->
			<section class="geo-section-block" class:is-visible={visible}>
				<div class="geo-stats-grid">
					<!-- Card 1: Total Population (Royal Blue) -->
					<div class="geo-stat-card geo-stat-royal">
						<div class="geo-card-sheen"></div>
						<div class="geo-stat-top">
							<div class="geo-stat-icon-wrap geo-icon-royal">
								<Users class="h-5 w-5" />
							</div>
							<span class="geo-stat-badge geo-badge-royal">
								<Sparkles class="h-3 w-3 text-amber-400" />
								2020 PSA Census
							</span>
						</div>
						<div class="geo-stat-body">
							<div class="geo-stat-val">57,455</div>
							<div class="geo-stat-lbl geo-lbl-royal">Total Inhabitants</div>
							<div class="geo-stat-tags">
								<span class="geo-tag geo-tag-royal">3.23% of Leyte</span>
								<span class="geo-tag geo-tag-amber">1.26% of Region VIII</span>
							</div>
						</div>
						<div class="geo-stat-bottom-line geo-line-royal"></div>
					</div>

					<!-- Card 2: Geographic Land Area (Amber Yellow) -->
					<div class="geo-stat-card geo-stat-amber">
						<div class="geo-card-sheen"></div>
						<div class="geo-stat-top">
							<div class="geo-stat-icon-wrap geo-icon-amber">
								<Compass class="h-5 w-5" />
							</div>
							<span class="geo-stat-badge geo-badge-amber">Coastal Municipality</span>
						</div>
						<div class="geo-stat-body">
							<div class="geo-stat-val">
								78.41 <span class="geo-stat-unit">km²</span>
							</div>
							<div class="geo-stat-lbl geo-lbl-amber">Geographic Land Area</div>
							<div class="geo-stat-tags">
								<span class="geo-tag geo-tag-slate">30.27 sq miles</span>
								<span class="geo-tag geo-tag-amber">1.24% of Leyte Area</span>
							</div>
						</div>
						<div class="geo-stat-bottom-line geo-line-amber"></div>
					</div>

					<!-- Card 3: Population Density (Royal Blue) -->
					<div class="geo-stat-card geo-stat-royal">
						<div class="geo-card-sheen"></div>
						<div class="geo-stat-top">
							<div class="geo-stat-icon-wrap geo-icon-royal">
								<Layers class="h-5 w-5" />
							</div>
							<span class="geo-stat-badge geo-badge-royal">54 Barangays</span>
						</div>
						<div class="geo-stat-body">
							<div class="geo-stat-val">
								733 <span class="geo-stat-unit">/ km²</span>
							</div>
							<div class="geo-stat-lbl geo-lbl-royal">Population Density</div>
							<div class="geo-stat-tags">
								<span class="geo-tag geo-tag-royal">1,898 / sq mile</span>
								<span class="geo-tag geo-tag-slate">High Coastal Density</span>
							</div>
						</div>
						<div class="geo-stat-bottom-line geo-line-royal"></div>
					</div>

					<!-- Card 4: Total Households (Amber Yellow) -->
					<div class="geo-stat-card geo-stat-amber">
						<div class="geo-card-sheen"></div>
						<div class="geo-stat-top">
							<div class="geo-stat-icon-wrap geo-icon-amber">
								<Home class="h-5 w-5" />
							</div>
							<span class="geo-stat-badge geo-badge-amber">Household Count</span>
						</div>
						<div class="geo-stat-body">
							<div class="geo-stat-val">12,808</div>
							<div class="geo-stat-lbl geo-lbl-amber">Total Households (2020)</div>
							<div class="geo-stat-tags">
								<span class="geo-tag geo-tag-amber">~4.49 persons / HH</span>
								<span class="geo-tag geo-tag-royal">+66.4% since 1990</span>
							</div>
						</div>
						<div class="geo-stat-bottom-line geo-line-amber"></div>
					</div>
				</div>
			</section>

			<!-- ==========================================================
			     SECTION 2: GEOGRAPHIC LOCATION & TERRITORIAL SHARES
			     ========================================================== -->
			{#if activeTab === 'all' || activeTab === 'history'}
				<section class="geo-section-block" class:is-visible={visible}>
					<div class="geo-card">
						<div class="geo-card-sheen"></div>
						<div class="geo-card-head">
							<div>
								<div class="geo-badge-prefix">
									<MapPin class="h-3.5 w-3.5 text-blue-400" />
									<span>Geographic Profile &bull; Eastern Seaboard of Leyte</span>
								</div>
								<h2 class="geo-card-title">Strategic Coastal Municipality</h2>
								<p class="geo-card-subtitle">
									Area footprint, territorial proportion, and provincial population contribution
								</p>
							</div>
						</div>

						<div class="geo-divider-royal"></div>

						<div class="geo-overview-grid">
							<!-- Narrative -->
							<div class="geo-overview-text">
								<p>
									Tanauan is a coastal municipality in Leyte province, covering an area of <strong
										class="text-blue-400">78.41 square kilometers</strong
									>
									(30.27 square miles), which accounts for
									<strong class="text-blue-400">1.24% of Leyte's total area</strong>.
								</p>
								<p>
									Its total population of <strong class="text-amber-400"
										>57,455 inhabitants (2020 Census)</strong
									>
									represents <strong class="text-blue-400">3.23% of Leyte's total population</strong>
									and
									<strong class="text-amber-400">1.26% of Eastern Visayas' overall population</strong
									>, yielding an average density of
									<strong class="text-white">733 inhabitants per km²</strong> (1,898 per sq mi) across
									<strong class="text-amber-400">12,808 households</strong>.
								</p>
							</div>

							<!-- Visual Meters -->
							<div class="geo-meters-card">
								<h3 class="geo-meters-title">Territorial &amp; Population Share</h3>

								<!-- Leyte Pop Share -->
								<div class="geo-meter-item">
									<div class="geo-meter-head">
										<span class="geo-meter-label">
											<span class="geo-meter-dot geo-dot-royal"></span>
											Leyte Population Share
										</span>
										<span class="geo-meter-value text-blue-400">3.23%</span>
									</div>
									<div class="geo-meter-track">
										<div
											class="geo-meter-fill geo-fill-royal"
											style="width: {visible ? '32.3%' : '0%'};"
										></div>
									</div>
								</div>

								<!-- Region VIII Pop Share -->
								<div class="geo-meter-item">
									<div class="geo-meter-head">
										<span class="geo-meter-label">
											<span class="geo-meter-dot geo-dot-amber"></span>
											Region VIII (Eastern Visayas) Pop Share
										</span>
										<span class="geo-meter-value text-amber-400">1.26%</span>
									</div>
									<div class="geo-meter-track">
										<div
											class="geo-meter-fill geo-fill-amber"
											style="width: {visible ? '12.6%' : '0%'}; transition-delay: 150ms;"
										></div>
									</div>
								</div>

								<!-- Leyte Land Area Share -->
								<div class="geo-meter-item">
									<div class="geo-meter-head">
										<span class="geo-meter-label">
											<span class="geo-meter-dot geo-dot-royal"></span>
											Leyte Land Area Share
										</span>
										<span class="geo-meter-value text-blue-300">1.24%</span>
									</div>
									<div class="geo-meter-track">
										<div
											class="geo-meter-fill geo-fill-royal"
											style="width: {visible ? '12.4%' : '0%'}; transition-delay: 300ms;"
										></div>
									</div>
								</div>

								<p class="geo-meters-note">
									Computed from Philippine Statistics Authority (PSA) official census returns.
								</p>
							</div>
						</div>
					</div>
				</section>
			{/if}

			<!-- ==========================================================
			     SECTION 3: HISTORICAL POPULATION & GROWTH RATE (1903–2020)
			     ========================================================== -->
			{#if activeTab === 'all' || activeTab === 'history'}
				<section class="geo-section-block" class:is-visible={visible}>
					<div class="geo-card">
						<div class="geo-card-sheen"></div>
						<div class="geo-card-head">
							<div>
								<div class="geo-badge-prefix">
									<BarChart3 class="h-3.5 w-3.5 text-amber-400" />
									<span>117-Year Historical Timeline &bull; 15 National Censuses</span>
								</div>
								<h2 class="geo-card-title">Municipal Population Size &amp; Growth Rate</h2>
								<p class="geo-card-subtitle">
									Chronological census records and intercensal growth dynamics from 1903 to 2020 (PSA)
								</p>
							</div>

							<!-- Chart Mode Toggle -->
							<div class="geo-chart-toggle-group">
								<button
									type="button"
									onclick={() => (activeChartTab = 'population')}
									class="geo-chart-toggle-btn"
									class:is-active-royal={activeChartTab === 'population'}
								>
									<TrendingUp class="h-3.5 w-3.5" />
									Population Curve
								</button>
								<button
									type="button"
									onclick={() => (activeChartTab = 'growth')}
									class="geo-chart-toggle-btn"
									class:is-active-amber={activeChartTab === 'growth'}
								>
									<Percent class="h-3.5 w-3.5" />
									Growth Rate (%)
								</button>
							</div>
						</div>

						<div class="geo-divider-amber"></div>

						<!-- Inspector Card -->
						<div class="geo-inspector-card">
							<div class="geo-inspector-left">
								<div class="geo-inspector-icon">
									<Calendar class="h-5 w-5 text-amber-300" />
								</div>
								<div>
									<div class="geo-inspector-year-row">
										<span class="geo-inspector-year">{activeCensus.year} Census</span>
										<span class="geo-inspector-badge">{activeCensus.label}</span>
									</div>
									<p class="geo-inspector-note">{activeCensus.note}</p>
								</div>
							</div>

							<div class="geo-inspector-right">
								<div class="geo-inspector-metric">
									<span class="geo-metric-label">Population</span>
									<span class="geo-metric-val text-blue-400">
										{activeCensus.pop.toLocaleString()}
									</span>
								</div>
								<div class="geo-inspector-divider"></div>
								<div class="geo-inspector-metric">
									<span class="geo-metric-label">Annual Growth</span>
									<span
										class="geo-metric-val {activeCensus.rate === null
											? 'text-slate-500'
											: activeCensus.rate < 0
												? 'text-rose-400'
												: 'text-amber-400'}"
									>
										{activeCensus.rate !== null
											? `${activeCensus.rate > 0 ? '+' : ''}${activeCensus.rate.toFixed(2)}%`
											: '— (Base)'}
									</span>
								</div>
							</div>
						</div>

						<!-- Interactive SVG Chart Viewport -->
						<div class="geo-chart-viewport">
							{#if activeChartTab === 'population'}
								<svg
									viewBox="0 0 {chartW} {chartH}"
									class="geo-svg-chart"
									role="img"
									aria-label="Population Curve Chart"
								>
									<defs>
										<linearGradient id="popAreaGradDark" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stop-color="#2563eb" stop-opacity="0.45" />
											<stop offset="85%" stop-color="#1d4ed8" stop-opacity="0.05" />
											<stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.0" />
										</linearGradient>
										<linearGradient id="popStrokeGradDark" x1="0" y1="0" x2="1" y2="0">
											<stop offset="0%" stop-color="#3b82f6" />
											<stop offset="60%" stop-color="#60a5fa" />
											<stop offset="100%" stop-color="#f59e0b" />
										</linearGradient>
									</defs>

									<!-- Horizontal Grid Lines -->
									{#each [20000, 30000, 40000, 50000, 60000] as gridPop}
										{@const gy = padTop + (1 - (gridPop - minPop) / (maxPop - minPop)) * innerH}
										<line
											x1={padX}
											y1={gy}
											x2={chartW - padX}
											y2={gy}
											stroke="rgba(255, 255, 255, 0.08)"
											stroke-dasharray="4 4"
											stroke-width="1"
										/>
										<text
											x={padX - 8}
											y={gy + 3}
											text-anchor="end"
											fill="#64748b"
											font-size="10"
											font-family="inherit"
										>
											{(gridPop / 1000).toFixed(0)}k
										</text>
									{/each}

									<!-- Area fill -->
									<path d={svgAreaString} fill="url(#popAreaGradDark)" />

									<!-- Stroke Line -->
									<path
										d={svgPathString}
										fill="none"
										stroke="url(#popStrokeGradDark)"
										stroke-width="3.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>

									<!-- Points -->
									{#each popPoints as pt, i}
										<g
											class="geo-svg-node"
											onmouseenter={() => (activeCensusIndex = i)}
											role="button"
											tabindex="0"
											aria-label="{pt.year} census data point"
											onkeydown={(e) => {
												if (e.key === 'Enter' || e.key === ' ') activeCensusIndex = i;
											}}
										>
											<!-- Halo -->
											<circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />

											{#if activeCensusIndex === i}
												<circle
													cx={pt.x}
													cy={pt.y}
													r="10"
													fill="#f59e0b"
													fill-opacity="0.3"
													class="animate-ping"
												/>
												<line
													x1={pt.x}
													y1={padTop}
													x2={pt.x}
													y2={chartH - padBottom}
													stroke="#f59e0b"
													stroke-width="1.5"
													stroke-dasharray="3 3"
												/>
											{/if}

											<circle
												cx={pt.x}
												cy={pt.y}
												r={activeCensusIndex === i ? '6.5' : '4.5'}
												fill={activeCensusIndex === i
													? '#f59e0b'
													: i === popPoints.length - 1
														? '#fbbf24'
														: '#3b82f6'}
												stroke="#061124"
												stroke-width="2.5"
											/>

											<!-- Year Label -->
											<text
												x={pt.x}
												y={chartH - padBottom + 18}
												text-anchor="middle"
												fill={activeCensusIndex === i ? '#fbbf24' : '#64748b'}
												font-size={activeCensusIndex === i ? '11' : '10'}
												font-weight={activeCensusIndex === i ? '700' : '500'}
											>
												{pt.year}
											</text>
										</g>
									{/each}
								</svg>
							{:else}
								<svg
									viewBox="0 0 {chartW} {chartH}"
									class="geo-svg-chart"
									role="img"
									aria-label="Annual Growth Rate Chart"
								>
									<!-- Grid lines -->
									{#each [-0.5, 0.0, 1.0, 2.0, 2.5] as rateMark}
										{@const gy = padTop + ((2.5 - rateMark) / 3.5) * innerH}
										<line
											x1={padX}
											y1={gy}
											x2={chartW - padX}
											y2={gy}
											stroke={rateMark === 0
												? 'rgba(255, 255, 255, 0.25)'
												: 'rgba(255, 255, 255, 0.08)'}
											stroke-width={rateMark === 0 ? '1.5' : '1'}
											stroke-dasharray={rateMark === 0 ? '' : '4 4'}
										/>
										<text
											x={padX - 8}
											y={gy + 3}
											text-anchor="end"
											fill={rateMark === 0 ? '#cbd5e1' : '#64748b'}
											font-size="10"
											font-weight={rateMark === 0 ? '700' : '400'}
										>
											{rateMark.toFixed(1)}%
										</text>
									{/each}

									<!-- Bars -->
									{#each historicalData as d, i}
										{@const colW = innerW / historicalData.length}
										{@const cx = padX + i * colW + colW / 2}
										{@const barWidth = 24}

										{#if d.rate !== null}
											{@const barH = Math.abs(d.rate) * (innerH / 3.5)}
											{@const barY = d.rate >= 0 ? zeroY - barH : zeroY}

											<g
												class="geo-svg-node"
												onmouseenter={() => (activeCensusIndex = i)}
												role="button"
												tabindex="0"
												aria-label="{d.year} census growth rate bar"
												onkeydown={(e) => {
													if (e.key === 'Enter' || e.key === ' ') activeCensusIndex = i;
												}}
											>
												<rect
													x={cx - barWidth / 2}
													y={barY}
													width={barWidth}
													height={barH}
													rx="4"
													fill={activeCensusIndex === i
														? d.rate < 0
															? '#f43f5e'
															: '#fbbf24'
														: d.rate < 0
															? '#e11d48'
															: d.rate >= 2.0
																? '#3b82f6'
																: '#f59e0b'}
												/>

												<text
													x={cx}
													y={d.rate >= 0 ? barY - 4 : barY + barH + 11}
													text-anchor="middle"
													fill={d.rate < 0
														? '#fb7185'
														: activeCensusIndex === i
															? '#fbbf24'
															: '#cbd5e1'}
													font-size="9"
													font-weight="700"
												>
													{d.rate > 0 ? '+' : ''}{d.rate.toFixed(2)}%
												</text>
											</g>
										{:else}
											<text
												x={cx}
												y={zeroY - 6}
												text-anchor="middle"
												fill="#64748b"
												font-size="9"
												font-style="italic"
											>
												Base
											</text>
										{/if}

										<!-- Year label -->
										<text
											x={cx}
											y={chartH - padBottom + 18}
											text-anchor="middle"
											fill={activeCensusIndex === i ? '#fbbf24' : '#64748b'}
											font-size={activeCensusIndex === i ? '11' : '10'}
											font-weight={activeCensusIndex === i ? '700' : '500'}
										>
											{d.year}
										</text>
									{/each}
								</svg>
							{/if}
						</div>

						<!-- Historical Milestones Deck -->
						<div class="geo-milestones-grid">
							<!-- 1970 Peak -->
							<div class="geo-milestone-card geo-border-amber">
								<div class="geo-milestone-top text-amber-400">
									<TrendingUp class="h-3.5 w-3.5" />
									<span>1970 Peak Mid-Century</span>
								</div>
								<div class="geo-milestone-val">2.26% Annual Growth</div>
								<p class="geo-milestone-desc">
									Tanauan's highest mid-century acceleration, reaching 29,438 residents.
								</p>
							</div>

							<!-- 1960 Dip -->
							<div class="geo-milestone-card geo-border-rose">
								<div class="geo-milestone-top text-rose-400">
									<TrendingDown class="h-3.5 w-3.5" />
									<span>1960 Contraction</span>
								</div>
								<div class="geo-milestone-val">-0.42% Dip (23,421)</div>
								<p class="geo-milestone-desc">
									The sole registered intercensal dip, driven by post-war outward migration.
								</p>
							</div>

							<!-- 2020 Modern Benchmark -->
							<div class="geo-milestone-card geo-border-royal">
								<div class="geo-milestone-top text-blue-400">
									<ShieldCheck class="h-3.5 w-3.5" />
									<span>2020 PSA Benchmark</span>
								</div>
								<div class="geo-milestone-val">57,455 Total Citizens</div>
								<p class="geo-milestone-desc">
									Growth stabilized at +0.92%, confirming sustained community resilience.
								</p>
							</div>
						</div>
					</div>
				</section>
			{/if}

			<!-- ==========================================================
			     SECTION 4: POPULATION & HOUSEHOLD PROJECTIONS (1990–2020)
			     ========================================================== -->
			{#if activeTab === 'all' || activeTab === 'history'}
				<section class="geo-section-block" class:is-visible={visible}>
					<div class="geo-card">
						<div class="geo-card-sheen"></div>
						<div class="geo-card-head">
							<div>
								<div class="geo-badge-prefix">
									<Home class="h-3.5 w-3.5 text-blue-400" />
									<span>Comparative Projections &bull; 1990 – 2015/2020 Series</span>
								</div>
								<h2 class="geo-card-title">Total Population &amp; Household Trends</h2>
								<p class="geo-card-subtitle">
									Tracking family division, household formation, and density per household
								</p>
							</div>

							<!-- Legend -->
							<div class="geo-legend-wrap">
								<div class="geo-legend-item">
									<span class="geo-legend-box geo-box-royal"></span>
									<span>Total Population</span>
								</div>
								<div class="geo-legend-item">
									<span class="geo-legend-box geo-box-amber"></span>
									<span>Total Households</span>
								</div>
							</div>
						</div>

						<div class="geo-divider-royal"></div>

						<!-- Dual Comparative Track Items -->
						<div class="geo-hh-list">
							{#each householdSeries as item, idx}
								{@const popWidth = (item.pop / maxHouseholdPop) * 100}
								{@const hhWidth = (item.households / maxHouseholdPop) * 100}

								<div class="geo-hh-item">
									<div class="geo-hh-header">
										<div class="geo-hh-left">
											<span class="geo-hh-year-badge">{item.year}</span>
											<span class="geo-hh-year-label">Census Year {item.year}</span>
										</div>

										<div class="geo-hh-meta">
											<span class="geo-meta-text">
												<strong class="text-blue-400">{item.pop.toLocaleString()}</strong> pop
											</span>
											<span class="geo-meta-sep">&bull;</span>
											<span class="geo-meta-text">
												<strong class="text-amber-400">{item.households.toLocaleString()}</strong> HH
											</span>
											<span class="geo-hh-avg-badge">{item.avgSize} persons / HH</span>
										</div>
									</div>

									<div class="geo-hh-bars">
										<!-- Pop bar (Royal Blue) -->
										<div class="geo-hh-bar-row">
											<span class="geo-bar-tag">Pop</span>
											<div class="geo-bar-track">
												<div
													class="geo-bar-fill geo-fill-royal"
													style="width: {visible ? `${popWidth}%` : '0%'};"
												></div>
											</div>
											<span class="geo-bar-num text-blue-400">{item.pop.toLocaleString()}</span>
										</div>

										<!-- Household bar (Amber Yellow) -->
										<div class="geo-hh-bar-row">
											<span class="geo-bar-tag">HH</span>
											<div class="geo-bar-track">
												<div
													class="geo-bar-fill geo-fill-amber"
													style="width: {visible ? `${hhWidth}%` : '0%'}; transition-delay: {idx *
														50}ms;"
												></div>
											</div>
											<span class="geo-bar-num text-amber-400">{item.households.toLocaleString()}</span>
										</div>
									</div>
								</div>
							{/each}
						</div>

						<!-- Bottom Analysis Note -->
						<div class="geo-analysis-callout">
							<Info class="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
							<p class="geo-callout-text">
								<strong>Household Size Dynamics:</strong> Between 1990 and 2015, total households
								in Tanauan rose from <strong>7,696 to 13,518</strong> (+75.6%), reflecting family
								subdivision and residential growth, while average size transitioned from
								<strong>4.94 down to 4.07 persons</strong>. By 2020, Tanauan counted
								<strong>12,808 households</strong> averaging
								<strong>4.49 occupants per household</strong>.
							</p>
						</div>
					</div>
				</section>
			{/if}

			<!-- ==========================================================
			     SECTION 5: NOTABLE BARANGAY HIGHLIGHTS (2020 CENSUS)
			     ========================================================== -->
			{#if activeTab === 'all' || activeTab === 'barangays'}
				<section class="geo-section-block" class:is-visible={visible}>
					<div class="geo-card">
						<div class="geo-card-sheen"></div>
						<div class="geo-card-head">
							<div>
								<div class="geo-badge-prefix">
									<Building2 class="h-3.5 w-3.5 text-blue-400" />
									<span>Barangay Demographics &bull; 2020 Census PSA Records</span>
								</div>
								<h2 class="geo-card-title">Notable Barangay Highlights</h2>
								<p class="geo-card-subtitle">
									Top population centers, highest growth acceleration, and demographic adjustments
								</p>
							</div>
						</div>

						<div class="geo-divider-amber"></div>

						<div class="geo-brgy-layout">
							<!-- Left Column: Top 4 Populated Barangays -->
							<div class="geo-brgy-col">
								<div class="geo-subhead-wrap">
									<h3 class="geo-transit-subhead">Highest Population Barangays</h3>
									<span class="geo-transit-caption">Largest resident concentrations</span>
								</div>

								<div class="geo-brgy-list">
									{#each topBarangays as b}
										{@const barPct = (b.pop / 4000) * 100}
										<div class="geo-brgy-item">
											<div class="geo-brgy-item-top">
												<div class="geo-brgy-title-wrap">
													<span class="geo-rank-badge">#{b.rank}</span>
													<div>
														<h4 class="geo-brgy-name">Barangay {b.name}</h4>
														<p class="geo-brgy-tag">{b.tag}</p>
													</div>
												</div>

												<div class="geo-brgy-stat-wrap">
													<span class="geo-brgy-pop text-blue-400">
														{b.pop.toLocaleString()}
													</span>
													<span class="geo-brgy-share text-amber-400">
														{b.share} of Tanauan
													</span>
												</div>
											</div>

											<div class="geo-meter-track" style="margin-top: 0.75rem;">
												<div
													class="geo-meter-fill geo-fill-royal"
													style="width: {visible ? `${barPct}%` : '0%'};"
												></div>
											</div>
										</div>
									{/each}
								</div>
							</div>

							<!-- Right Column: Rapid Growth & Declining Decks -->
							<div class="geo-brgy-col">
								<!-- Rapid Growth -->
								<div class="geo-subhead-wrap">
									<h3 class="geo-transit-subhead">Rapid Growth Barangays</h3>
									<span class="geo-transit-caption">Leading acceleration surge</span>
								</div>

								<div class="geo-growth-grid">
									{#each rapidGrowthBarangays as b}
										<div class="geo-growth-card geo-growth-positive">
											<div class="geo-growth-head">
												<span class="geo-growth-name">Brgy. {b.name}</span>
												<span class="geo-growth-badge geo-badge-growth">
													<ArrowUpRight class="h-3.5 w-3.5" />
													{b.growth}
												</span>
											</div>
											<div class="geo-growth-lbl text-amber-400">{b.label}</div>
											<p class="geo-growth-desc">{b.desc}</p>
										</div>
									{/each}
								</div>

								<!-- Population Decline -->
								<div class="geo-subhead-wrap" style="margin-top: 1.75rem;">
									<h3 class="geo-transit-subhead">Barangays Facing Population Decline</h3>
									<span class="geo-transit-caption">Local contraction &amp; migration shifts</span>
								</div>

								<div class="geo-growth-grid">
									{#each decliningBarangays as b}
										<div class="geo-growth-card geo-growth-negative">
											<div class="geo-growth-head">
												<span class="geo-growth-name">Brgy. {b.name}</span>
												<span class="geo-growth-badge geo-badge-decline">
													<ArrowDownRight class="h-3.5 w-3.5" />
													{b.decline}
												</span>
											</div>
											<div class="geo-growth-lbl text-rose-400">{b.label}</div>
											<p class="geo-growth-desc">{b.desc}</p>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</section>
			{/if}

			<!-- ==========================================================
			     SECTION 6: AGE & SEX COHORT DISTRIBUTION
			     ========================================================== -->
			{#if activeTab === 'all' || activeTab === 'barangays'}
				<section class="geo-section-block" class:is-visible={visible}>
					<div class="geo-card">
						<div class="geo-card-sheen"></div>
						<div class="geo-card-head">
							<div>
								<div class="geo-badge-prefix">
									<PieChart class="h-3.5 w-3.5 text-amber-400" />
									<span>Demographic Composition &bull; 2020 Census of Population</span>
								</div>
								<h2 class="geo-card-title">Age &amp; Sex Cohort Distribution</h2>
								<p class="geo-card-subtitle">
									Productive age distribution, dependency ratios, and gender balance across Tanauan
								</p>
							</div>
						</div>

						<div class="geo-divider-royal"></div>

						<!-- Cohort Bars -->
						<div class="geo-cohort-bars">
							{#each ageSexData as item}
								<div class="geo-cohort-item">
									<div class="geo-cohort-head">
										<span class="geo-cohort-name">
											<span
												class="geo-meter-dot {item.color === 'blue'
													? 'geo-dot-royal'
													: 'geo-dot-amber'}"
											></span>
											{item.category}
										</span>
										<span class="geo-cohort-val">
											<strong class={item.color === 'blue' ? 'text-blue-400' : 'text-amber-400'}>
												{item.count}
											</strong>
											<span class="text-slate-400">({item.pct}%)</span>
										</span>
									</div>
									<div class="geo-meter-track">
										<div
											class="geo-meter-fill {item.color === 'blue'
												? 'geo-fill-royal'
												: 'geo-fill-amber'}"
											style="width: {visible ? `${item.pct}%` : '0%'};"
										></div>
									</div>
								</div>
							{/each}
						</div>

						<!-- Ratio Cards -->
						<div class="geo-ratios-grid">
							<div class="geo-ratio-card">
								<span class="geo-ratio-tag text-blue-400">Working-Age Core</span>
								<div class="geo-ratio-val text-blue-300">61.7%</div>
								<p class="geo-ratio-desc">
									35,450 residents aged 15–64 forming the active productive municipal workforce.
								</p>
							</div>

							<div class="geo-ratio-card">
								<span class="geo-ratio-tag text-amber-400">Young Dependents</span>
								<div class="geo-ratio-val text-amber-300">32.1%</div>
								<p class="geo-ratio-desc">
									18,420 youths under 15 years old attending Tanauan's primary and secondary
									schools.
								</p>
							</div>

							<div class="geo-ratio-card">
								<span class="geo-ratio-tag text-slate-400">Sex Ratio Balance</span>
								<div class="geo-ratio-val text-white">106.9 Males</div>
								<p class="geo-ratio-desc">
									Per 100 females (29,688 males vs 27,767 females), characteristic of coastal
									settlements.
								</p>
							</div>
						</div>
					</div>
				</section>
			{/if}

			<!-- ==========================================================
			     SECTION 7: INTERACTIVE GIS & DEMOGRAPHICS DASHBOARD
			     ========================================================== -->
			{#if activeTab === 'all' || activeTab === 'dashboard'}
				<section class="geo-section-block" class:is-visible={visible}>
					<div class="geo-card">
						<div class="geo-card-sheen"></div>
						<div class="geo-card-head">
							<div>
								<div class="geo-badge-prefix">
									<Maximize2 class="h-3.5 w-3.5 text-amber-400" />
									<span>Interactive GIS &bull; Looker Studio Demographics Map</span>
								</div>
								<h2 class="geo-card-title">Interactive Demographics Dashboard</h2>
								<p class="geo-card-subtitle">
									Explore territorial boundaries, demographic maps, and spatial analytics interactively
								</p>
							</div>

							<a
								href="https://lookerstudio.google.com/reporting/4339f855-8037-445d-9cdb-bcfb105a7556/page/p_rvelqh5qhd"
								target="_blank"
								rel="noopener noreferrer"
								class="geo-fullscreen-btn"
							>
								<span>Open Fullscreen</span>
								<ArrowUpRight class="h-3.5 w-3.5" />
							</a>
						</div>

						<div class="geo-divider-amber"></div>

						<div class="geo-map-frame-wrapper">
							<iframe
								class="geo-dashboard-iframe"
								src="https://lookerstudio.google.com/embed/reporting/4339f855-8037-445d-9cdb-bcfb105a7556/page/p_rvelqh5qhd"
								title="Tanauan Leyte Demographics Dashboard"
								allowfullscreen
								sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
							></iframe>
						</div>
					</div>
				</section>
			{/if}

			<!-- Footer Citation Note -->
			<div class="geo-footer-citation">
				Data Source: Philippine Statistics Authority (PSA) Censuses of Population and Housing
				(1903–2020) &bull; Municipality of Tanauan Local Government Unit (LGU).
			</div>
		</div>
	</main>
</div>

<style>
	/* ==========================================================
	   POPPINS TYPOGRAPHY & ROYAL/AMBER DESIGN SYSTEM
	   (Exact Design System from Geography Page)
	   ========================================================== */
	.geo-root {
		font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background-color: #061124;
		color: #e2e8f0;
		min-height: 100vh;
		position: relative;
		overflow-x: hidden;
	}

	/* ==========================================================
	   HERO SECTION
	   ========================================================== */
	.geo-hero {
		position: relative;
		background: linear-gradient(135deg, #040b17 0%, #0a1b3a 45%, #102a5c 100%);
		padding: 5rem 1.5rem 6.5rem;
		border-bottom: 2px solid rgba(245, 158, 11, 0.25);
		overflow: hidden;
		text-align: center;
	}

	/* Ambient Floating Glows */
	.geo-ambient {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
		opacity: 0.45;
		animation: floatOrb 14s ease-in-out infinite alternate;
	}

	.geo-ambient-royal {
		width: 480px;
		height: 480px;
		background: radial-gradient(circle, #1d4ed8 0%, transparent 70%);
		top: -100px;
		left: -80px;
	}

	.geo-ambient-amber {
		width: 420px;
		height: 420px;
		background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
		top: 40px;
		right: -80px;
		animation-duration: 16s;
		animation-delay: -4s;
	}

	.geo-ambient-bottom {
		width: 600px;
		height: 300px;
		background: radial-gradient(circle, #1e40af 0%, transparent 70%);
		bottom: -100px;
		left: 50%;
		transform: translateX(-50%);
		animation-duration: 18s;
		animation-delay: -8s;
	}

	@keyframes floatOrb {
		0% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(30px, -40px) scale(1.08);
		}
		100% {
			transform: translate(-25px, 25px) scale(0.95);
		}
	}

	.geo-hero-inner {
		position: relative;
		z-index: 10;
		max-width: 56rem;
		margin: 0 auto;
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.geo-hero-inner.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Hero Titles */
	.geo-hero-title {
		font-size: 2.75rem;
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1.15;
		color: #ffffff;
		margin: 0 0 0.75rem;
	}

	@media (min-width: 640px) {
		.geo-hero-title {
			font-size: 3.75rem;
		}
	}

	@media (min-width: 1024px) {
		.geo-hero-title {
			font-size: 4.5rem;
		}
	}

	.geo-amber-gradient {
		background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		display: inline-block;
		text-shadow: 0 0 30px rgba(245, 158, 11, 0.3);
	}

	.geo-hero-subtitle {
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #60a5fa;
		margin-bottom: 1.25rem;
	}

	.geo-hero-description {
		font-size: 1rem;
		line-height: 1.7;
		color: #cbd5e1;
		max-width: 46rem;
		margin: 0 auto 2.25rem;
		font-weight: 300;
	}

	@media (min-width: 640px) {
		.geo-hero-description {
			font-size: 1.125rem;
		}
	}

	/* Filter Group Buttons */
	.geo-filter-group {
		display: inline-flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.375rem;
		padding: 0.375rem;
		background: rgba(10, 27, 58, 0.85);
		border: 1px solid rgba(59, 130, 246, 0.3);
		border-radius: 9999px;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
	}

	.geo-filter-btn {
		font-family: 'Poppins', sans-serif;
		font-size: 0.8125rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		padding: 0.5rem 1.25rem;
		border-radius: 9999px;
		border: none;
		background: transparent;
		color: #94a3b8;
		cursor: pointer;
		transition: all 0.25s ease;
	}

	.geo-filter-btn:hover {
		color: #fbbf24;
	}

	.geo-filter-btn.is-active {
		background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
		color: #ffffff;
		box-shadow: 0 4px 15px rgba(29, 78, 216, 0.45), 0 0 0 1px rgba(245, 158, 11, 0.5);
	}

	/* ==========================================================
	   MAIN LAYOUT & CONTAINER
	   ========================================================== */
	.geo-main {
		position: relative;
		padding: 3.5rem 1.25rem 6rem;
		z-index: 20;
	}

	.geo-container {
		max-width: 76rem;
		margin: 0 auto;
	}

	.geo-section-block {
		margin-bottom: 3.5rem;
		opacity: 0;
		transform: translateY(28px);
		transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s,
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
	}

	.geo-section-block.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* General Card Styling */
	.geo-card {
		position: relative;
		background: linear-gradient(165deg, #0e2246 0%, #091733 60%, #061127 100%);
		border: 2px solid rgba(59, 130, 246, 0.25);
		border-radius: 1.75rem;
		padding: 2.25rem 2rem;
		box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
		transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			border-color 0.35s ease,
			box-shadow 0.35s ease;
		overflow: hidden;
	}

	.geo-card:hover {
		transform: translateY(-4px);
		border-color: rgba(59, 130, 246, 0.45);
		box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.8);
	}

	/* Sheen sweeping light effect */
	.geo-card-sheen {
		position: absolute;
		top: 0;
		left: -150%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), transparent);
		transform: skewX(-20deg);
		transition: left 0.8s ease;
		pointer-events: none;
	}

	.geo-card:hover .geo-card-sheen {
		left: 150%;
	}

	.geo-card-head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.25rem;
	}

	@media (min-width: 640px) {
		.geo-card-head {
			flex-direction: row;
			align-items: flex-start;
			justify-content: space-between;
		}
	}

	.geo-badge-prefix {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #94a3b8;
		margin-bottom: 0.375rem;
	}

	.geo-card-title {
		font-size: 1.75rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #ffffff;
		margin: 0;
	}

	.geo-card-subtitle {
		font-size: 0.875rem;
		color: #94a3b8;
		margin: 0.25rem 0 0;
	}

	/* Gradient Dividers */
	.geo-divider-amber {
		height: 3px;
		width: 100%;
		background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 60%, transparent 100%);
		border-radius: 9999px;
		margin-bottom: 1.75rem;
	}

	.geo-divider-royal {
		height: 3px;
		width: 100%;
		background: linear-gradient(90deg, #2563eb 0%, #60a5fa 60%, transparent 100%);
		border-radius: 9999px;
		margin-bottom: 1.75rem;
	}

	/* ==========================================================
	   SECTION 1: STATS GRID
	   ========================================================== */
	.geo-stats-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	@media (min-width: 640px) {
		.geo-stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.geo-stats-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.geo-stat-card {
		position: relative;
		background: linear-gradient(165deg, #0e2246 0%, #091733 60%, #061127 100%);
		border-radius: 1.5rem;
		padding: 1.5rem;
		box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.6);
		transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
		overflow: hidden;
	}

	.geo-stat-card:hover {
		transform: translateY(-4px);
	}

	.geo-stat-royal {
		border: 2px solid rgba(59, 130, 246, 0.3);
	}

	.geo-stat-royal:hover {
		border-color: #3b82f6;
		box-shadow: 0 20px 35px -10px rgba(29, 78, 216, 0.35);
	}

	.geo-stat-amber {
		border: 2px solid rgba(245, 158, 11, 0.3);
	}

	.geo-stat-amber:hover {
		border-color: #f59e0b;
		box-shadow: 0 20px 35px -10px rgba(245, 158, 11, 0.35);
	}

	.geo-stat-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.125rem;
	}

	.geo-stat-icon-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		border-radius: 0.875rem;
	}

	.geo-icon-royal {
		background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
		color: #ffffff;
		box-shadow: 0 4px 15px rgba(29, 78, 216, 0.4);
	}

	.geo-icon-amber {
		background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
		color: #ffffff;
		box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
	}

	.geo-stat-badge {
		font-size: 0.6875rem;
		font-weight: 700;
		padding: 0.25rem 0.625rem;
		border-radius: 9999px;
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.geo-badge-royal {
		background: rgba(30, 64, 175, 0.35);
		color: #93c5fd;
		border: 1px solid rgba(59, 130, 246, 0.3);
	}

	.geo-badge-amber {
		background: rgba(180, 83, 9, 0.35);
		color: #fcd34d;
		border: 1px solid rgba(245, 158, 11, 0.3);
	}

	.geo-stat-val {
		font-size: 2.125rem;
		font-weight: 900;
		letter-spacing: -0.02em;
		color: #ffffff;
		line-height: 1.1;
	}

	.geo-stat-unit {
		font-size: 1rem;
		font-weight: 600;
		color: #94a3b8;
	}

	.geo-stat-lbl {
		font-size: 0.6875rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-top: 0.375rem;
	}

	.geo-lbl-royal {
		color: #60a5fa;
	}

	.geo-lbl-amber {
		color: #fbbf24;
	}

	.geo-stat-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin-top: 0.875rem;
		padding-top: 0.75rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.geo-tag {
		font-size: 0.6875rem;
		font-weight: 600;
		padding: 0.2rem 0.5rem;
		border-radius: 0.375rem;
	}

	.geo-tag-royal {
		background: rgba(29, 78, 216, 0.25);
		color: #93c5fd;
		border: 1px solid rgba(59, 130, 246, 0.25);
	}

	.geo-tag-amber {
		background: rgba(245, 158, 11, 0.2);
		color: #fde68a;
		border: 1px solid rgba(245, 158, 11, 0.25);
	}

	.geo-tag-slate {
		background: rgba(255, 255, 255, 0.06);
		color: #cbd5e1;
	}

	.geo-stat-bottom-line {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 3px;
	}

	.geo-line-royal {
		background: linear-gradient(90deg, #1d4ed8 0%, #60a5fa 100%);
	}

	.geo-line-amber {
		background: linear-gradient(90deg, #d97706 0%, #fbbf24 100%);
	}

	/* ==========================================================
	   SECTION 2: GEOGRAPHIC OVERVIEW
	   ========================================================== */
	.geo-overview-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		.geo-overview-grid {
			grid-template-columns: 1.4fr 1fr;
			align-items: center;
		}
	}

	.geo-overview-text {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		font-size: 1rem;
		line-height: 1.75;
		color: #cbd5e1;
		font-weight: 300;
	}

	.geo-meters-card {
		background: rgba(10, 27, 58, 0.7);
		border: 1px solid rgba(59, 130, 246, 0.25);
		border-radius: 1.25rem;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.geo-meters-title {
		font-size: 0.75rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #94a3b8;
		margin: 0;
	}

	.geo-meter-item {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.geo-meter-head {
		display: flex;
		justify-content: space-between;
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.geo-meter-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #cbd5e1;
	}

	.geo-meter-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
	}

	.geo-dot-royal {
		background: #3b82f6;
		box-shadow: 0 0 8px #2563eb;
	}

	.geo-dot-amber {
		background: #f59e0b;
		box-shadow: 0 0 8px #f59e0b;
	}

	.geo-meter-track {
		height: 0.625rem;
		width: 100%;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 9999px;
		overflow: hidden;
	}

	.geo-meter-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.geo-fill-royal {
		background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 100%);
	}

	.geo-fill-amber {
		background: linear-gradient(90deg, #d97706 0%, #fbbf24 100%);
	}

	.geo-meters-note {
		font-size: 0.6875rem;
		color: #64748b;
		margin: 0;
		font-style: italic;
	}

	/* ==========================================================
	   SECTION 3: HISTORICAL TIMELINE
	   ========================================================== */
	.geo-chart-toggle-group {
		display: inline-flex;
		align-self: flex-start;
		background: rgba(10, 27, 58, 0.9);
		border: 1px solid rgba(59, 130, 246, 0.25);
		border-radius: 0.75rem;
		padding: 0.25rem;
		gap: 0.25rem;
	}

	.geo-chart-toggle-btn {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-family: 'Poppins', sans-serif;
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.375rem 0.875rem;
		border-radius: 0.5rem;
		border: none;
		background: transparent;
		color: #94a3b8;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.geo-chart-toggle-btn:hover {
		color: #ffffff;
	}

	.geo-chart-toggle-btn.is-active-royal {
		background: #2563eb;
		color: #ffffff;
		box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
	}

	.geo-chart-toggle-btn.is-active-amber {
		background: #f59e0b;
		color: #040b17;
		box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
	}

	.geo-inspector-card {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		background: rgba(10, 27, 58, 0.65);
		border: 1px solid rgba(59, 130, 246, 0.25);
		border-radius: 1.25rem;
		padding: 1.25rem 1.5rem;
		margin-bottom: 1.5rem;
	}

	.geo-inspector-left {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.geo-inspector-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: 0.875rem;
		background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
		border: 1px solid rgba(59, 130, 246, 0.3);
		box-shadow: 0 4px 15px rgba(29, 78, 216, 0.3);
	}

	.geo-inspector-year-row {
		display: flex;
		align-items: center;
		gap: 0.625rem;
	}

	.geo-inspector-year {
		font-size: 1.25rem;
		font-weight: 800;
		color: #ffffff;
	}

	.geo-inspector-badge {
		font-size: 0.6875rem;
		font-weight: 700;
		padding: 0.2rem 0.5rem;
		border-radius: 9999px;
		background: rgba(37, 99, 235, 0.25);
		color: #93c5fd;
		border: 1px solid rgba(59, 130, 246, 0.3);
	}

	.geo-inspector-note {
		font-size: 0.75rem;
		color: #94a3b8;
		margin: 0.2rem 0 0;
	}

	.geo-inspector-right {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.geo-inspector-metric {
		display: flex;
		flex-direction: column;
	}

	.geo-metric-label {
		font-size: 0.6875rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #64748b;
	}

	.geo-metric-val {
		font-size: 1.5rem;
		font-weight: 900;
		line-height: 1.1;
	}

	.geo-inspector-divider {
		width: 1px;
		height: 2.25rem;
		background: rgba(255, 255, 255, 0.1);
	}

	.geo-chart-viewport {
		overflow-x: auto;
		margin-bottom: 2rem;
	}

	.geo-svg-chart {
		min-width: 720px;
		width: 100%;
		height: 16rem;
		overflow: visible;
	}

	.geo-svg-node {
		cursor: pointer;
		outline: none;
	}

	.geo-milestones-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	@media (min-width: 640px) {
		.geo-milestones-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.geo-milestone-card {
		background: rgba(10, 27, 58, 0.5);
		border-radius: 1rem;
		padding: 1.125rem;
		transition: all 0.25s ease;
	}

	.geo-milestone-card:hover {
		background: rgba(10, 27, 58, 0.85);
		transform: translateY(-2px);
	}

	.geo-border-amber {
		border: 1px solid rgba(245, 158, 11, 0.3);
	}

	.geo-border-rose {
		border: 1px solid rgba(244, 63, 94, 0.3);
	}

	.geo-border-royal {
		border: 1px solid rgba(59, 130, 246, 0.3);
	}

	.geo-milestone-top {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.6875rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.geo-milestone-val {
		font-size: 1.125rem;
		font-weight: 800;
		color: #ffffff;
		margin: 0.375rem 0 0.25rem;
	}

	.geo-milestone-desc {
		font-size: 0.75rem;
		color: #94a3b8;
		line-height: 1.45;
		margin: 0;
	}

	/* ==========================================================
	   SECTION 4: HOUSEHOLD PROJECTIONS
	   ========================================================== */
	.geo-legend-wrap {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: #cbd5e1;
	}

	.geo-legend-item {
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	.geo-legend-box {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 0.25rem;
	}

	.geo-box-royal {
		background: #2563eb;
	}

	.geo-box-amber {
		background: #f59e0b;
	}

	.geo-hh-list {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
	}

	.geo-hh-item {
		background: rgba(10, 27, 58, 0.6);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 1rem;
		padding: 1rem 1.25rem;
		transition: all 0.3s ease;
	}

	.geo-hh-item:hover {
		background: rgba(10, 27, 58, 0.95);
		border-color: #3b82f6;
		transform: translateX(4px);
	}

	.geo-hh-header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.625rem;
	}

	.geo-hh-left {
		display: flex;
		align-items: center;
		gap: 0.625rem;
	}

	.geo-hh-year-badge {
		font-size: 0.75rem;
		font-weight: 900;
		color: #ffffff;
		background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
		padding: 0.25rem 0.625rem;
		border-radius: 0.5rem;
		box-shadow: 0 2px 8px rgba(29, 78, 216, 0.4);
	}

	.geo-hh-year-label {
		font-size: 0.875rem;
		font-weight: 700;
		color: #ffffff;
	}

	.geo-hh-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: #94a3b8;
	}

	.geo-meta-sep {
		color: #475569;
	}

	.geo-hh-avg-badge {
		font-size: 0.6875rem;
		font-weight: 700;
		color: #fcd34d;
		background: rgba(245, 158, 11, 0.18);
		border: 1px solid rgba(245, 158, 11, 0.3);
		padding: 0.2rem 0.5rem;
		border-radius: 0.375rem;
	}

	.geo-hh-bars {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.geo-hh-bar-row {
		display: flex;
		align-items: center;
		gap: 0.625rem;
	}

	.geo-bar-tag {
		width: 2.25rem;
		font-size: 0.625rem;
		font-weight: 800;
		text-transform: uppercase;
		color: #64748b;
	}

	.geo-bar-track {
		flex: 1;
		height: 0.5rem;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 9999px;
		overflow: hidden;
	}

	.geo-bar-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.geo-bar-num {
		width: 4.5rem;
		text-align: right;
		font-size: 0.75rem;
		font-weight: 700;
	}

	.geo-analysis-callout {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		background: rgba(245, 158, 11, 0.08);
		border: 1px solid rgba(245, 158, 11, 0.25);
		border-radius: 1rem;
		padding: 1rem 1.25rem;
		margin-top: 1.5rem;
	}

	.geo-callout-text {
		font-size: 0.75rem;
		line-height: 1.6;
		color: #cbd5e1;
		margin: 0;
	}

	/* ==========================================================
	   SECTION 5: BARANGAY HIGHLIGHTS
	   ========================================================== */
	.geo-brgy-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.25rem;
	}

	@media (min-width: 1024px) {
		.geo-brgy-layout {
			grid-template-columns: 1fr 1fr;
		}
	}

	.geo-brgy-col {
		display: flex;
		flex-direction: column;
	}

	.geo-subhead-wrap {
		margin-bottom: 1.125rem;
	}

	.geo-transit-subhead {
		font-size: 1.125rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0;
	}

	.geo-transit-caption {
		font-size: 0.75rem;
		color: #94a3b8;
	}

	.geo-brgy-list {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
	}

	.geo-brgy-item {
		background: rgba(10, 27, 58, 0.6);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 1rem;
		padding: 1rem 1.25rem;
		transition: all 0.3s ease;
	}

	.geo-brgy-item:hover {
		background: rgba(10, 27, 58, 0.95);
		border-color: #3b82f6;
		transform: translateY(-2px);
	}

	.geo-brgy-item-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.geo-brgy-title-wrap {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.geo-rank-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 0.5rem;
		background: rgba(37, 99, 235, 0.3);
		color: #93c5fd;
		font-size: 0.75rem;
		font-weight: 800;
		border: 1px solid rgba(59, 130, 246, 0.3);
	}

	.geo-brgy-name {
		font-size: 0.9375rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0;
	}

	.geo-brgy-tag {
		font-size: 0.6875rem;
		color: #94a3b8;
		margin: 0.125rem 0 0;
	}

	.geo-brgy-stat-wrap {
		text-align: right;
	}

	.geo-brgy-pop {
		display: block;
		font-size: 1.125rem;
		font-weight: 900;
	}

	.geo-brgy-share {
		display: block;
		font-size: 0.6875rem;
		font-weight: 600;
	}

	.geo-growth-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.geo-growth-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.geo-growth-card {
		border-radius: 1rem;
		padding: 1rem;
		transition: all 0.25s ease;
	}

	.geo-growth-card:hover {
		transform: translateY(-2px);
	}

	.geo-growth-positive {
		background: rgba(245, 158, 11, 0.08);
		border: 1px solid rgba(245, 158, 11, 0.25);
	}

	.geo-growth-positive:hover {
		background: rgba(245, 158, 11, 0.16);
		border-color: #f59e0b;
	}

	.geo-growth-negative {
		background: rgba(244, 63, 94, 0.08);
		border: 1px solid rgba(244, 63, 94, 0.25);
	}

	.geo-growth-negative:hover {
		background: rgba(244, 63, 94, 0.16);
		border-color: #f43f5e;
	}

	.geo-growth-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.25rem;
	}

	.geo-growth-name {
		font-size: 0.875rem;
		font-weight: 800;
		color: #ffffff;
	}

	.geo-growth-badge {
		font-size: 0.75rem;
		font-weight: 800;
		padding: 0.2rem 0.5rem;
		border-radius: 9999px;
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.geo-badge-growth {
		background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
		color: #040b17;
		box-shadow: 0 2px 8px rgba(245, 158, 11, 0.35);
	}

	.geo-badge-decline {
		background: linear-gradient(135deg, #e11d48 0%, #f43f5e 100%);
		color: #ffffff;
		box-shadow: 0 2px 8px rgba(244, 63, 94, 0.35);
	}

	.geo-growth-lbl {
		font-size: 0.6875rem;
		font-weight: 700;
		margin-top: 0.125rem;
	}

	.geo-growth-desc {
		font-size: 0.6875rem;
		color: #94a3b8;
		line-height: 1.45;
		margin: 0.375rem 0 0;
	}

	/* ==========================================================
	   SECTION 6: AGE & SEX COHORT
	   ========================================================== */
	.geo-cohort-bars {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.geo-cohort-item {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.geo-cohort-head {
		display: flex;
		justify-content: space-between;
		font-size: 0.8125rem;
		font-weight: 700;
	}

	.geo-cohort-name {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #e2e8f0;
	}

	.geo-cohort-val {
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	.geo-ratios-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	@media (min-width: 640px) {
		.geo-ratios-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.geo-ratio-card {
		background: rgba(10, 27, 58, 0.5);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 1rem;
		padding: 1.125rem;
	}

	.geo-ratio-tag {
		font-size: 0.6875rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.geo-ratio-val {
		font-size: 1.5rem;
		font-weight: 900;
		margin: 0.25rem 0;
	}

	.geo-ratio-desc {
		font-size: 0.75rem;
		color: #94a3b8;
		line-height: 1.45;
		margin: 0;
	}

	/* ==========================================================
	   SECTION 7: INTERACTIVE MAP / GIS
	   ========================================================== */
	.geo-fullscreen-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-family: 'Poppins', sans-serif;
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.5rem 1rem;
		border-radius: 0.75rem;
		background: rgba(37, 99, 235, 0.2);
		color: #93c5fd;
		border: 1px solid rgba(59, 130, 246, 0.35);
		text-decoration: none;
		transition: all 0.25s ease;
	}

	.geo-fullscreen-btn:hover {
		background: #2563eb;
		color: #ffffff;
		border-color: #2563eb;
		box-shadow: 0 4px 15px rgba(37, 99, 235, 0.45);
	}

	.geo-map-frame-wrapper {
		border-radius: 1.25rem;
		overflow: hidden;
		border: 1.5px solid rgba(59, 130, 246, 0.3);
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
		background: #020712;
	}

	.geo-dashboard-iframe {
		width: 100%;
		height: 28rem;
		border: none;
		display: block;
	}

	@media (min-width: 640px) {
		.geo-dashboard-iframe {
			height: 36rem;
		}
	}

	.geo-footer-citation {
		text-align: center;
		font-size: 0.75rem;
		color: #64748b;
		margin-top: 2rem;
	}
</style>
