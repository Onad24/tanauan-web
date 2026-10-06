<script>
	import { onMount } from 'svelte';
	import {
		Droplets,
		Wind,
		Thermometer,
		Sun,
		Gauge,
		Eye,
		Compass,
		MapPin,
		Clock,
		Radio
	} from 'lucide-svelte';

	let visible = $state(false);
	let activeTab = $state('all'); // 'all' | 'current' | 'monthly'

	let { data } = $props();

	function formatWeatherTime(timeStr) {
		if (!timeStr) return 'Live';
		try {
			const parts = timeStr.split(' ');
			if (parts.length === 2) {
				const [hours, minutes] = parts[1].split(':');
				const h = parseInt(hours, 10);
				const ampm = h >= 12 ? 'PM' : 'AM';
				const formattedH = h % 12 || 12;
				return `${formattedH}:${minutes} ${ampm}`;
			}
			return timeStr;
		} catch {
			return timeStr;
		}
	}

	function getUVStatus(uv) {
		const val = Number(uv) || 0;
		if (val <= 2)
			return {
				text: 'Low',
				color: '#34d399',
				bg: 'rgba(16, 185, 129, 0.15)',
				border: 'rgba(16, 185, 129, 0.3)'
			};
		if (val <= 5)
			return {
				text: 'Moderate',
				color: '#fbbf24',
				bg: 'rgba(245, 158, 11, 0.15)',
				border: 'rgba(245, 158, 11, 0.3)'
			};
		if (val <= 7)
			return {
				text: 'High',
				color: '#fb923c',
				bg: 'rgba(249, 115, 22, 0.15)',
				border: 'rgba(249, 115, 22, 0.3)'
			};
		return {
			text: 'Very High',
			color: '#f87171',
			bg: 'rgba(239, 68, 68, 0.15)',
			border: 'rgba(239, 68, 68, 0.3)'
		};
	}

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
							<div class="clim-live-glow-radial"></div>

							<div class="clim-card-head">
								<div>
									<h2 class="clim-card-title">Current Weather</h2>
									<p class="clim-card-subtitle">Real-time telemetry via WeatherAPI</p>
								</div>
								<div class="clim-live-badge">
									<span class="clim-pulse-ring">
										<span class="clim-pulse-dot"></span>
									</span>
									<span class="clim-badge-text">LIVE STATION</span>
								</div>
							</div>

							<div class="clim-divider-amber"></div>

							{#if data?.climateData}
								<div class="clim-live-body">
									<!-- Hero Weather Display -->
									<div class="clim-hero-weather">
										<div class="clim-hero-weather-main">
											<div class="clim-icon-wrap">
												<img
													src={data.climateData.condition.icon}
													alt={data.climateData.condition.text}
													class="clim-weather-icon"
												/>
												<div class="clim-icon-glow"></div>
											</div>
											<div class="clim-temp-block">
												<div class="clim-live-temp-wrap">
													<span class="clim-live-temp">{Math.round(data.climateData.temp_c)}</span>
													<span class="clim-temp-deg">°C</span>
												</div>
												<div class="clim-live-condition">{data.climateData.condition.text}</div>
											</div>
										</div>

										<div class="clim-hero-weather-meta">
											{#if data.climateData.feelslike_c !== undefined}
												<div class="clim-chip clim-chip-feels">
													<span class="clim-chip-icon text-amber">
														<Thermometer size={14} />
													</span>
													<span>Feels like <strong>{Math.round(data.climateData.feelslike_c)}°C</strong></span>
												</div>
											{/if}
											<div class="clim-chip clim-chip-loc">
												<span class="clim-chip-icon text-sky">
													<MapPin size={14} />
												</span>
												<span>Tanauan, Leyte</span>
											</div>
										</div>
									</div>

									<!-- 4-Card Telemetry Grid -->
									<div class="clim-telemetry-grid">
										<!-- Humidity -->
										<div class="clim-tele-card">
											<div class="clim-tele-top">
												<div class="clim-tele-icon-badge badge-cyan">
													<span class="clim-tele-icon">
														<Droplets size={15} />
													</span>
												</div>
												<span class="clim-tele-label">Humidity</span>
											</div>
											<div class="clim-tele-val-row">
												<span class="clim-tele-val">{data.climateData.humidity}</span>
												<span class="clim-tele-unit">%</span>
											</div>
											<div class="clim-meter-track">
												<div
													class="clim-meter-bar bar-cyan"
													style="width: {Math.min(100, Math.max(0, data.climateData.humidity))}%"
												></div>
											</div>
											<div class="clim-tele-subtext">
												{data.climateData.humidity >= 80 ? 'High moisture' : data.climateData.humidity >= 60 ? 'Optimal air' : 'Normal air'}
											</div>
										</div>

										<!-- Wind Velocity -->
										<div class="clim-tele-card">
											<div class="clim-tele-top">
												<div class="clim-tele-icon-badge badge-blue">
													<span class="clim-tele-icon">
														<Wind size={15} />
													</span>
												</div>
												<span class="clim-tele-label">Wind Velocity</span>
											</div>
											<div class="clim-tele-val-row">
												<span class="clim-tele-val">{data.climateData.wind_kph}</span>
												<span class="clim-tele-unit">kph</span>
											</div>
											<div class="clim-tag-row">
												<span class="clim-dir-tag">
													<span class="clim-mini-icon text-sky">
														<Compass size={13} />
													</span>
													<span>{data.climateData.wind_dir || 'NW'}</span>
													{#if data.climateData.wind_degree}
														<span class="clim-deg-dim">{data.climateData.wind_degree}°</span>
													{/if}
												</span>
											</div>
											<div class="clim-tele-subtext">
												{data.climateData.wind_kph < 10 ? 'Gentle coastal breeze' : data.climateData.wind_kph < 25 ? 'Moderate wind' : 'Strong wind'}
											</div>
										</div>

										<!-- UV Index -->
										<div class="clim-tele-card">
											<div class="clim-tele-top">
												<div class="clim-tele-icon-badge badge-amber">
													<span class="clim-tele-icon">
														<Sun size={15} />
													</span>
												</div>
												<span class="clim-tele-label">UV Index</span>
											</div>
											<div class="clim-tele-val-row">
												<span class="clim-tele-val">{data.climateData.uv ?? 0}</span>
												{#if data.climateData.uv !== undefined}
													{@const uv = getUVStatus(data.climateData.uv)}
													<span
														class="clim-uv-pill"
														style="color: {uv.color}; background: {uv.bg}; border-color: {uv.border};"
													>
														{uv.text}
													</span>
												{/if}
											</div>
											<div class="clim-meter-track">
												<div
													class="clim-meter-bar bar-amber"
													style="width: {Math.min(100, ((data.climateData.uv ?? 0) / 11) * 100)}%"
												></div>
											</div>
											<div class="clim-tele-subtext">
												{(data.climateData.uv ?? 0) <= 2 ? 'Minimal sun risk' : 'Sun protection advised'}
											</div>
										</div>

										<!-- Barometric Pressure -->
										<div class="clim-tele-card">
											<div class="clim-tele-top">
												<div class="clim-tele-icon-badge badge-indigo">
													<span class="clim-tele-icon">
														<Gauge size={15} />
													</span>
												</div>
												<span class="clim-tele-label">Pressure</span>
											</div>
											<div class="clim-tele-val-row">
												<span class="clim-tele-val">{data.climateData.pressure_mb}</span>
												<span class="clim-tele-unit">hPa</span>
											</div>
											<div class="clim-tag-row">
												<span class="clim-vis-tag">
													<span class="clim-mini-icon text-slate">
														<Eye size={13} />
													</span>
													<span>Vis: {data.climateData.vis_km ?? 10} km</span>
												</span>
											</div>
											<div class="clim-tele-subtext">
												{data.climateData.pressure_mb >= 1013 ? 'High pressure / Stable' : 'Barometric active'}
											</div>
										</div>
									</div>

									<!-- Station Telemetry Footer -->
									<div class="clim-station-footer">
										<div class="clim-station-info">
											<span class="clim-mini-icon text-amber clim-ping-anim">
												<Radio size={13} />
											</span>
											<span>Tanauan Station &bull; Leyte Gulf Coast</span>
										</div>
										<div class="clim-station-time">
											<span class="clim-mini-icon text-slate">
												<Clock size={13} />
											</span>
											<span>Updated {formatWeatherTime(data.climateData.last_updated)}</span>
										</div>
									</div>
								</div>
							{:else}
								<div class="clim-empty-weather">
									<div class="clim-empty-icon-wrap">
										<span class="clim-empty-icon">
											<Radio size={28} />
										</span>
									</div>
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
		position: relative;
	}

	.clim-live-glow-radial {
		position: absolute;
		top: -40px;
		right: -40px;
		width: 320px;
		height: 320px;
		background: radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(37, 99, 235, 0.08) 45%, transparent 70%);
		filter: blur(40px);
		pointer-events: none;
		z-index: 1;
	}

	.clim-live-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.75rem;
		border-radius: 9999px;
		background: rgba(16, 185, 129, 0.12);
		border: 1px solid rgba(16, 185, 129, 0.35);
		box-shadow: 0 0 12px rgba(16, 185, 129, 0.15);
	}

	.clim-badge-text {
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: #34d399;
		text-transform: uppercase;
		font-family: 'Poppins', sans-serif;
	}

	.clim-pulse-ring {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 8px;
		height: 8px;
	}

	.clim-pulse-dot {
		width: 8px;
		height: 8px;
		border-radius: 9999px;
		background: #10b981;
		box-shadow: 0 0 10px #10b981;
		animation: climPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes climPulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.35);
			opacity: 0.6;
			box-shadow: 0 0 14px #10b981;
		}
	}

	.clim-live-body {
		display: flex;
		flex-direction: column;
		gap: 1.15rem;
		flex: 1;
		z-index: 2;
	}

	/* Hero Weather Display */
	.clim-hero-weather {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
		padding: 1.25rem 1.35rem;
		background: rgba(6, 17, 36, 0.65);
		border: 1px solid rgba(59, 130, 246, 0.28);
		border-radius: 1.25rem;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.06),
			0 10px 25px -10px rgba(0, 0, 0, 0.5);
	}

	.clim-hero-weather-main {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.clim-icon-wrap {
		position: relative;
		width: 4.75rem;
		height: 4.75rem;
		border-radius: 1.15rem;
		background: linear-gradient(135deg, rgba(14, 34, 70, 0.95) 0%, rgba(8, 21, 45, 0.98) 100%);
		border: 1px solid rgba(245, 158, 11, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		box-shadow:
			0 0 24px rgba(245, 158, 11, 0.22),
			inset 0 0 12px rgba(245, 158, 11, 0.1);
	}

	.clim-icon-glow {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%);
		pointer-events: none;
	}

	.clim-weather-icon {
		width: 3.5rem;
		height: 3.5rem;
		object-fit: contain;
		filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.35));
		z-index: 2;
	}

	.clim-temp-block {
		display: flex;
		flex-direction: column;
	}

	.clim-live-temp-wrap {
		display: flex;
		align-items: baseline;
		line-height: 1;
	}

	.clim-live-temp {
		font-size: 3.125rem;
		font-weight: 900;
		color: #ffffff;
		letter-spacing: -0.04em;
		text-shadow: 0 4px 20px rgba(255, 255, 255, 0.15);
	}

	.clim-temp-deg {
		font-size: 1.5rem;
		font-weight: 700;
		color: #fbbf24;
		margin-left: 0.15rem;
	}

	.clim-live-condition {
		font-size: 1.0625rem;
		font-weight: 600;
		color: #fbbf24;
		margin-top: 0.25rem;
		letter-spacing: -0.01em;
	}

	.clim-hero-weather-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
		padding-top: 0.75rem;
		border-top: 1px solid rgba(255, 255, 255, 0.07);
	}

	.clim-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.3rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 500;
		color: #cbd5e1;
	}

	.clim-chip-feels {
		background: rgba(245, 158, 11, 0.12);
		border: 1px solid rgba(245, 158, 11, 0.28);
	}

	.clim-chip-loc {
		background: rgba(56, 189, 248, 0.1);
		border: 1px solid rgba(56, 189, 248, 0.25);
	}

	.clim-chip-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 14px;
		height: 14px;
		flex-shrink: 0;
	}

	/* 4-Card Telemetry Grid */
	.clim-telemetry-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.875rem;
	}

	.clim-tele-card {
		position: relative;
		background: rgba(8, 21, 45, 0.75);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 1.15rem;
		padding: 0.95rem 1rem 0.85rem;
		transition: all 0.25s ease;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 112px;
	}

	.clim-tele-card:hover {
		transform: translateY(-2px);
		border-color: rgba(59, 130, 246, 0.45);
		background: rgba(10, 27, 58, 0.85);
		box-shadow: 0 10px 22px -6px rgba(0, 0, 0, 0.45);
	}

	.clim-tele-top {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.35rem;
	}

	.clim-tele-icon-badge {
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.badge-cyan {
		background: rgba(6, 182, 212, 0.15);
		color: #22d3ee;
		border: 1px solid rgba(6, 182, 212, 0.3);
	}

	.badge-blue {
		background: rgba(59, 130, 246, 0.15);
		color: #60a5fa;
		border: 1px solid rgba(59, 130, 246, 0.3);
	}

	.badge-amber {
		background: rgba(245, 158, 11, 0.15);
		color: #fbbf24;
		border: 1px solid rgba(245, 158, 11, 0.3);
	}

	.badge-indigo {
		background: rgba(99, 102, 241, 0.15);
		color: #a5b4fc;
		border: 1px solid rgba(99, 102, 241, 0.3);
	}

	.clim-tele-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 15px;
		height: 15px;
	}

	.clim-tele-label {
		font-size: 0.6875rem;
		font-weight: 700;
		color: #94a3b8;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		font-family: 'Poppins', sans-serif;
	}

	.clim-tele-val-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.35rem;
		margin-bottom: 0.35rem;
	}

	.clim-tele-val {
		font-size: 1.5rem;
		font-weight: 800;
		color: #ffffff;
		line-height: 1;
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
	}

	.clim-tele-unit {
		font-size: 0.8125rem;
		font-weight: 600;
		color: #94a3b8;
	}

	.clim-meter-track {
		width: 100%;
		height: 4px;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 9999px;
		overflow: hidden;
		margin-bottom: 0.35rem;
	}

	.clim-meter-bar {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.bar-cyan {
		background: linear-gradient(90deg, #06b6d4, #38bdf8);
		box-shadow: 0 0 8px rgba(6, 182, 212, 0.4);
	}

	.bar-amber {
		background: linear-gradient(90deg, #f59e0b, #fbbf24);
		box-shadow: 0 0 8px rgba(245, 158, 11, 0.4);
	}

	.clim-tag-row {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		margin-bottom: 0.35rem;
	}

	.clim-dir-tag,
	.clim-vis-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.6875rem;
		font-weight: 600;
		color: #cbd5e1;
		background: rgba(255, 255, 255, 0.05);
		padding: 0.15rem 0.5rem;
		border-radius: 0.375rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.clim-deg-dim {
		color: #64748b;
		font-size: 0.625rem;
		font-weight: 500;
	}

	.clim-uv-pill {
		font-size: 0.6875rem;
		font-weight: 700;
		padding: 0.12rem 0.5rem;
		border-radius: 9999px;
		letter-spacing: 0.02em;
	}

	.clim-tele-subtext {
		font-size: 0.6875rem;
		color: #64748b;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Station Footer */
	.clim-station-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.65rem 0.875rem;
		background: rgba(6, 17, 36, 0.6);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 0.75rem;
		font-size: 0.6875rem;
		color: #94a3b8;
		flex-wrap: wrap;
	}

	.clim-station-info,
	.clim-station-time {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-weight: 500;
	}

	.clim-mini-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 13px;
		height: 13px;
		flex-shrink: 0;
	}

	.clim-ping-anim {
		animation: climPing 2s infinite ease-in-out;
	}

	@keyframes climPing {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.8;
		}
		50% {
			transform: scale(1.15);
			opacity: 1;
		}
	}

	.text-amber {
		color: #f59e0b;
	}

	.text-sky {
		color: #38bdf8;
	}

	.text-slate {
		color: #94a3b8;
	}

	/* Empty / Offline Fallback */
	.clim-empty-weather {
		padding: 3rem 1.5rem;
		text-align: center;
		background: rgba(6, 17, 36, 0.5);
		border-radius: 1.25rem;
		border: 1px dashed rgba(255, 255, 255, 0.15);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
	}

	.clim-empty-icon-wrap {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 1rem;
		background: rgba(245, 158, 11, 0.1);
		border: 1px solid rgba(245, 158, 11, 0.25);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fbbf24;
	}

	.clim-empty-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
	}

	.clim-empty-title {
		font-size: 1.125rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0;
	}

	.clim-empty-sub {
		font-size: 0.875rem;
		color: #94a3b8;
		line-height: 1.6;
		margin: 0;
		max-width: 24rem;
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
