<script>
	import { onMount } from 'svelte';

	let visible = $state(false);
	let activeTab = $state('all'); // 'all' | 'current' | 'monthly'

	let { data } = $props();

	const months = [
		{ name: 'January', temp: 26.5, rain: 234, humidity: 86 },
		{ name: 'February', temp: 26.8, rain: 178, humidity: 84 },
		{ name: 'March', temp: 27.2, rain: 120, humidity: 81 },
		{ name: 'April', temp: 28.1, rain: 98, humidity: 79 },
		{ name: 'May', temp: 28.6, rain: 112, humidity: 80 },
		{ name: 'June', temp: 28.3, rain: 152, humidity: 83 },
		{ name: 'July', temp: 27.9, rain: 198, humidity: 85 },
		{ name: 'August', temp: 28.0, rain: 190, humidity: 86 },
		{ name: 'September', temp: 27.6, rain: 220, humidity: 87 },
		{ name: 'October', temp: 27.2, rain: 245, humidity: 88 },
		{ name: 'November', temp: 26.9, rain: 280, humidity: 89 },
		{ name: 'December', temp: 26.6, rain: 310, humidity: 90 }
	];

	onMount(() => {
		visible = true;
	});
</script>

<svelte:head>
	<title>Climate & Weather | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Climate profile, live weather data, temperature averages, rainfall patterns, and humidity statistics for the Municipality of Tanauan, Leyte, Philippines."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="clim-root">
	<!-- Hero Section with Royal Blue & Amber Ambient Atmosphere -->
	<header class="clim-hero">
		<div class="clim-ambient clim-ambient-royal"></div>
		<div class="clim-ambient clim-ambient-amber"></div>
		<div class="clim-ambient clim-ambient-bottom"></div>

		<div class="clim-hero-inner" class:is-visible={visible}>
			<h1 class="clim-hero-title">
				Climate &amp; <span class="clim-amber-gradient">Weather</span>
			</h1>

			<p class="clim-hero-subtitle">
				Municipality of Tanauan, Leyte &bull; Bungto han Kamag-araman
			</p>

			<p class="clim-hero-description">
				Discover Tanauan's tropical maritime climate, live atmospheric conditions, and historical monthly weather
				patterns that shape local agriculture, fisheries, and coastal living.
			</p>

			<!-- Interactive Section Selector -->
			<div class="clim-filter-group" role="tablist" aria-label="Climate sections">
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'all'}
					class="clim-filter-btn"
					class:is-active={activeTab === 'all'}
					onclick={() => (activeTab = 'all')}
				>
					Complete Profile
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'current'}
					class="clim-filter-btn"
					class:is-active={activeTab === 'current'}
					onclick={() => (activeTab = 'current')}
				>
					Live Weather &amp; Overview
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'monthly'}
					class="clim-filter-btn"
					class:is-active={activeTab === 'monthly'}
					onclick={() => (activeTab = 'monthly')}
				>
					Monthly Patterns
				</button>
			</div>
		</div>
	</header>

	<!-- Main Body Container -->
	<main class="clim-main">
		<div class="clim-container">

			<!-- SECTION 1: Live Weather + Climate Overview -->
			{#if activeTab === 'all' || activeTab === 'current'}
				<section class="clim-section-block" class:is-visible={visible}>
					<div class="clim-grid-dual">

						<!-- Live Weather Card -->
						<div class="clim-card clim-live-card">
							<div class="clim-card-sheen"></div>
							<div class="clim-card-head">
								<div>
									<h2 class="clim-card-title">Current Weather</h2>
									<p class="clim-card-subtitle">Real-time telemetry via WeatherAPI</p>
								</div>
							</div>

							<div class="clim-divider-amber"></div>

							{#if data?.climateData}
								<div class="clim-live-body">
									<div class="clim-live-main">
										<div class="clim-icon-wrap">
											<img
												src={data.climateData.condition.icon}
												alt={data.climateData.condition.text}
												class="clim-weather-icon"
											/>
										</div>
										<div>
											<div class="clim-live-temp">{data.climateData.temp_c}°C</div>
											<div class="clim-live-condition">{data.climateData.condition.text}</div>
										</div>
									</div>

									<div class="clim-live-stats">
										<div class="clim-substat">
											<span class="clim-substat-label">Humidity</span>
											<span class="clim-substat-val clim-val-amber">{data.climateData.humidity}%</span>
										</div>
										<div class="clim-substat">
											<span class="clim-substat-label">Wind Speed</span>
											<span class="clim-substat-val clim-val-royal">{data.climateData.wind_kph} <span class="clim-substat-unit">kph</span></span>
										</div>
									</div>
								</div>
							{:else}
								<div class="clim-empty-weather">
									<p class="clim-empty-title">Atmospheric Station Offline</p>
									<p class="clim-empty-sub">Live telemetry is temporarily unavailable. Displaying historical climate parameters.</p>
								</div>
							{/if}
						</div>

						<!-- Climate Overview Card -->
						<div class="clim-card clim-overview-card">
							<div class="clim-card-sheen"></div>
							<div class="clim-card-head">
								<div>
									<h2 class="clim-card-title">Climate Overview</h2>
									<p class="clim-card-subtitle">Type II tropical maritime classification</p>
								</div>
							</div>

							<div class="clim-divider-royal"></div>

							<div class="clim-prose">
								<p>
									Tanauan is characterized by a <strong class="clim-highlight-amber">tropical climate (Type II)</strong>
									under the Coronas Philippine Climate Classification System. This classification is marked by the
									absence of a dry season, accompanied by a very pronounced maximum rainfall period typically extending
									from <strong class="clim-highlight-royal">November to January</strong>.
								</p>
								<p>
									Positioned along the eastern coastal seaboard of Leyte facing the Leyte Gulf, the municipality experiences
									regular northeast monsoon winds and maritime breezes. Ambient temperatures comfortably range between
									<strong class="clim-highlight-royal">24°C and 32°C</strong> year-round with high relative humidity.
								</p>
								<p>
									This climate supports prosperous year-round agricultural cultivation, coconut plantations, and coastal
									aquaculture while requiring proactive disaster preparedness during the regional typhoon season.
								</p>
							</div>

							<!-- Climate Quick Metric Boxes -->
							<div class="clim-metrics-row">
								<div class="clim-metric-box">
									<span class="clim-metric-label">Avg Temperature</span>
									<div class="clim-metric-val">27.5<span class="clim-metric-unit">°C</span></div>
								</div>
								<div class="clim-metric-box">
									<span class="clim-metric-label">Annual Rainfall</span>
									<div class="clim-metric-val clim-metric-amber">2,337<span class="clim-metric-unit">mm</span></div>
								</div>
								<div class="clim-metric-box">
									<span class="clim-metric-label">Mean Humidity</span>
									<div class="clim-metric-val">85<span class="clim-metric-unit">%</span></div>
								</div>
							</div>
						</div>

					</div>
				</section>
			{/if}

			<!-- SECTION 2: Monthly Climate Table -->
			{#if activeTab === 'all' || activeTab === 'monthly'}
				<section class="clim-section-block" class:is-visible={visible}>
					<div class="clim-card">
						<div class="clim-card-sheen"></div>
						<div class="clim-card-head">
							<div>
								<h2 class="clim-card-title">Monthly Climate Overview</h2>
								<p class="clim-card-subtitle">
									Historical annual temperature, precipitation, and relative humidity averages
								</p>
							</div>
						</div>

						<div class="clim-divider-amber"></div>

						<div class="clim-table-wrapper">
							<table class="clim-table">
								<thead>
									<tr>
										<th>Month</th>
										<th class="text-right">Avg Temp (°C)</th>
										<th class="text-right">Rainfall (mm)</th>
										<th class="text-right">Humidity (%)</th>
									</tr>
								</thead>
								<tbody>
									{#each months as month}
										<tr>
											<td class="clim-cell-month">{month.name}</td>
											<td class="clim-cell-temp text-right">
												<div class="clim-bar-wrap">
													<span class="clim-bar-number">{month.temp}°C</span>
													<div class="clim-mini-track">
														<div
															class="clim-mini-bar clim-bar-temp"
															style="width: {Math.max(15, (month.temp - 24) * 20)}%;"
														></div>
													</div>
												</div>
											</td>
											<td class="clim-cell-rain text-right">
												<div class="clim-bar-wrap">
													<span class="clim-bar-number">{month.rain} mm</span>
													<div class="clim-mini-track">
														<div
															class="clim-mini-bar clim-bar-rain"
															style="width: {Math.min(100, Math.max(15, (month.rain / 310) * 100))}%;"
														></div>
													</div>
												</div>
											</td>
											<td class="clim-cell-hum text-right">
												<span class="clim-hum-pill">{month.humidity}%</span>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>

						<p class="clim-source-note">
							Source: PAGASA Agrometeorological & Climatological Records for Region VIII (Eastern Visayas).
						</p>
					</div>
				</section>
			{/if}

		</div>
	</main>
</div>

<style>
	/* ==========================================================
	   POPPINS TYPOGRAPHY & ROYAL/AMBER DESIGN SYSTEM
	   ========================================================== */
	.clim-root {
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
	.clim-hero {
		position: relative;
		background: linear-gradient(135deg, #040b17 0%, #0a1b3a 45%, #102a5c 100%);
		padding: 5rem 1.5rem 6.5rem;
		border-bottom: 2px solid rgba(245, 158, 11, 0.25);
		overflow: hidden;
		text-align: center;
	}

	/* Ambient Floating Glows */
	.clim-ambient {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
		opacity: 0.45;
		animation: floatOrb 14s ease-in-out infinite alternate;
	}

	.clim-ambient-royal {
		width: 480px;
		height: 480px;
		background: radial-gradient(circle, #1d4ed8 0%, transparent 70%);
		top: -100px;
		left: -80px;
	}

	.clim-ambient-amber {
		width: 420px;
		height: 420px;
		background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
		top: 40px;
		right: -80px;
		animation-duration: 16s;
		animation-delay: -4s;
	}

	.clim-ambient-bottom {
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

	.clim-hero-inner {
		position: relative;
		z-index: 10;
		max-width: 56rem;
		margin: 0 auto;
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.clim-hero-inner.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Hero Titles */
	.clim-hero-title {
		font-size: 2.75rem;
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1.15;
		color: #ffffff;
		margin: 0 0 0.75rem;
	}

	@media (min-width: 640px) {
		.clim-hero-title {
			font-size: 3.75rem;
		}
	}

	@media (min-width: 1024px) {
		.clim-hero-title {
			font-size: 4.5rem;
		}
	}

	.clim-amber-gradient {
		background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		display: inline-block;
		text-shadow: 0 0 30px rgba(245, 158, 11, 0.3);
	}

	.clim-hero-subtitle {
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #60a5fa;
		margin-bottom: 1.25rem;
	}

	.clim-hero-description {
		font-size: 1rem;
		line-height: 1.7;
		color: #cbd5e1;
		max-width: 44rem;
		margin: 0 auto 2.25rem;
		font-weight: 300;
	}

	@media (min-width: 640px) {
		.clim-hero-description {
			font-size: 1.125rem;
		}
	}

	/* Filter Group Buttons */
	.clim-filter-group {
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

	.clim-filter-btn {
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

	.clim-filter-btn:hover {
		color: #fbbf24;
	}

	.clim-filter-btn.is-active {
		background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
		color: #ffffff;
		box-shadow:
			0 4px 15px rgba(29, 78, 216, 0.45),
			0 0 0 1px rgba(245, 158, 11, 0.5);
	}

	/* ==========================================================
	   MAIN LAYOUT & CARDS
	   ========================================================== */
	.clim-main {
		position: relative;
		padding: 3.5rem 1.25rem 6rem;
		z-index: 20;
	}

	.clim-container {
		max-width: 76rem;
		margin: 0 auto;
	}

	.clim-section-block {
		margin-bottom: 3.5rem;
		opacity: 0;
		transform: translateY(28px);
		transition:
			opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s,
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
	}

	.clim-section-block.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* General Card Styling */
	.clim-card {
		position: relative;
		background: linear-gradient(165deg, #0e2246 0%, #091733 60%, #061127 100%);
		border: 2px solid rgba(59, 130, 246, 0.25);
		border-radius: 1.75rem;
		padding: 2.25rem 2rem;
		box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
		transition:
			transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			border-color 0.35s ease,
			box-shadow 0.35s ease;
		overflow: hidden;
	}

	.clim-card:hover {
		transform: translateY(-4px);
		border-color: rgba(59, 130, 246, 0.45);
		box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.8);
	}

	/* Sheen sweeping light effect */
	.clim-card-sheen {
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

	.clim-card:hover .clim-card-sheen {
		left: 150%;
	}

	.clim-card-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.25rem;
	}

	.clim-card-title {
		font-size: 1.75rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #ffffff;
		margin: 0;
	}

	.clim-card-subtitle {
		font-size: 0.875rem;
		color: #94a3b8;
		margin: 0.25rem 0 0;
	}

	/* Gradient Dividers */
	.clim-divider-amber {
		height: 3px;
		width: 100%;
		background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 60%, transparent 100%);
		border-radius: 9999px;
		margin-bottom: 1.75rem;
	}

	.clim-divider-royal {
		height: 3px;
		width: 100%;
		background: linear-gradient(90deg, #2563eb 0%, #60a5fa 60%, transparent 100%);
		border-radius: 9999px;
		margin-bottom: 1.75rem;
	}

	/* Dual Grid Layout */
	.clim-grid-dual {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		.clim-grid-dual {
			grid-template-columns: 1fr 1.6fr;
		}
	}

	/* ==========================================================
	   LIVE WEATHER COMPONENT
	   ========================================================== */
	.clim-live-card {
		display: flex;
		flex-direction: column;
	}

	.clim-live-body {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		flex: 1;
		justify-content: center;
	}

	.clim-live-main {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 1rem 1.25rem;
		background: rgba(6, 17, 36, 0.6);
		border: 1px solid rgba(59, 130, 246, 0.25);
		border-radius: 1.25rem;
	}

	.clim-icon-wrap {
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 1rem;
		background: rgba(14, 34, 70, 0.8);
		border: 1px solid rgba(245, 158, 11, 0.35);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 20px rgba(245, 158, 11, 0.15);
	}

	.clim-weather-icon {
		width: 3.5rem;
		height: 3.5rem;
		object-fit: contain;
	}

	.clim-live-temp {
		font-size: 2.75rem;
		font-weight: 900;
		color: #ffffff;
		line-height: 1.1;
		letter-spacing: -0.03em;
	}

	.clim-live-condition {
		font-size: 1rem;
		font-weight: 600;
		color: #fbbf24;
		margin-top: 0.2rem;
	}

	.clim-live-stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.clim-substat {
		background: rgba(8, 21, 45, 0.7);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1rem;
		padding: 1.1rem 1rem;
		text-align: center;
		transition: border-color 0.25s ease;
	}

	.clim-substat:hover {
		border-color: rgba(59, 130, 246, 0.4);
	}

	.clim-substat-label {
		display: block;
		font-size: 0.75rem;
		font-weight: 600;
		color: #94a3b8;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: 0.35rem;
	}

	.clim-substat-val {
		font-size: 1.5rem;
		font-weight: 800;
		line-height: 1;
	}

	.clim-substat-unit {
		font-size: 0.875rem;
		font-weight: 600;
		color: #94a3b8;
	}

	.clim-val-amber {
		color: #f59e0b;
	}

	.clim-val-royal {
		color: #60a5fa;
	}

	.clim-empty-weather {
		padding: 2.5rem 1.5rem;
		text-align: center;
		background: rgba(6, 17, 36, 0.5);
		border-radius: 1.25rem;
		border: 1px dashed rgba(255, 255, 255, 0.15);
	}

	.clim-empty-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: #ffffff;
		margin-bottom: 0.5rem;
	}

	.clim-empty-sub {
		font-size: 0.875rem;
		color: #94a3b8;
		line-height: 1.6;
		margin: 0;
	}

	/* ==========================================================
	   CLIMATE OVERVIEW PROSE & QUICK STATS
	   ========================================================== */
	.clim-overview-card {
		display: flex;
		flex-direction: column;
	}

	.clim-prose p {
		font-size: 1rem;
		line-height: 1.85;
		color: #cbd5e1;
		margin: 0 0 1.25rem;
		text-align: justify;
	}

	.clim-highlight-amber {
		color: #fbbf24;
		font-weight: 700;
	}

	.clim-highlight-royal {
		color: #93c5fd;
		font-weight: 700;
	}

	.clim-metrics-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.clim-metric-box {
		background: linear-gradient(155deg, #0b1c3a 0%, #071329 100%);
		border: 1.5px solid rgba(59, 130, 246, 0.3);
		border-radius: 1rem;
		padding: 1rem;
		text-align: center;
		transition: all 0.3s ease;
	}

	.clim-metric-box:hover {
		transform: translateY(-3px);
		border-color: #f59e0b;
		box-shadow: 0 10px 25px -8px rgba(245, 158, 11, 0.25);
	}

	.clim-metric-label {
		display: block;
		font-size: 0.6875rem;
		font-weight: 700;
		color: #94a3b8;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: 0.35rem;
	}

	.clim-metric-val {
		font-size: 1.5rem;
		font-weight: 900;
		color: #ffffff;
		line-height: 1.1;
	}

	.clim-metric-unit {
		font-size: 0.875rem;
		font-weight: 600;
		color: #60a5fa;
		margin-left: 0.15rem;
	}

	.clim-metric-amber {
		color: #fbbf24;
	}

	/* ==========================================================
	   SECTION 2: MONTHLY CLIMATE TABLE
	   ========================================================== */
	.clim-table-wrapper {
		overflow-x: auto;
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(6, 17, 36, 0.6);
	}

	.clim-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9375rem;
		text-align: left;
	}

	.clim-table thead th {
		padding: 1rem 1.25rem;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #93c5fd;
		background: rgba(14, 34, 70, 0.6);
		border-bottom: 1px solid rgba(59, 130, 246, 0.25);
	}

	.clim-table tbody td {
		padding: 0.95rem 1.25rem;
		color: #cbd5e1;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		transition: background 0.2s ease;
	}

	.clim-table tbody tr:last-child td {
		border-bottom: none;
	}

	.clim-table tbody tr:hover td {
		background: rgba(37, 99, 235, 0.08);
	}

	.clim-cell-month {
		font-weight: 600;
		color: #ffffff;
	}

	.clim-bar-wrap {
		display: inline-flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.75rem;
		width: 100%;
		max-width: 14rem;
	}

	.clim-bar-number {
		font-variant-numeric: tabular-nums;
		font-weight: 600;
		white-space: nowrap;
	}

	.clim-mini-track {
		flex: 1;
		height: 0.5rem;
		background: rgba(14, 34, 70, 0.7);
		border-radius: 9999px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.08);
		min-width: 3.5rem;
	}

	.clim-mini-bar {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.6s ease;
	}

	.clim-bar-temp {
		background: linear-gradient(90deg, #f59e0b 0%, #ef4444 100%);
		box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
	}

	.clim-bar-rain {
		background: linear-gradient(90deg, #38bdf8 0%, #2563eb 100%);
		box-shadow: 0 0 10px rgba(37, 99, 235, 0.4);
	}

	.clim-hum-pill {
		display: inline-block;
		font-size: 0.8125rem;
		font-weight: 700;
		padding: 0.2rem 0.65rem;
		border-radius: 9999px;
		background: rgba(37, 99, 235, 0.16);
		color: #93c5fd;
		border: 1px solid rgba(59, 130, 246, 0.35);
		font-variant-numeric: tabular-nums;
	}

	.text-right {
		text-align: right;
	}

	.clim-source-note {
		font-size: 0.75rem;
		font-style: italic;
		color: #94a3b8;
		margin: 1.25rem 0 0;
	}
</style>
