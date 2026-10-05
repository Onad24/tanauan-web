<script>
	import { onMount } from 'svelte';

	let visible = $state(false);
	let activeTab = $state('all'); // 'all' | 'maps' | 'transport'

	onMount(() => {
		visible = true;
	});

	const routes = [
		{ from: 'Tacloban City', time: '25–30 min', mode: 'Jeepney / Multicab', distance: '~18 km' },
		{ from: 'Palo', time: '10–15 min', mode: 'Tricycle / Bus', distance: '~8 km' },
		{ from: 'Tolosa', time: '15–20 min', mode: 'Jeepney / Van', distance: '~11 km' },
		{ from: 'Tacloban Airport', time: '~30 min', mode: 'Van / Taxi', distance: '~22 km' },
		{ from: 'Ormoc City', time: '2–3 hrs', mode: 'Van / Bus', distance: '~95 km' }
	];

	const transportModes = [
		{ name: 'Jeepneys & Multicabs', desc: 'Frequent inter-town routes via Maharlika Highway' },
		{ name: 'Tricycles', desc: 'Inner-barangay routes and local point-to-point transit' },
		{ name: 'Habal-Habal', desc: 'Accessible transit to upland and interior barangays' },
		{ name: 'V-Hire (Vans)', desc: 'Express point-to-point connections across Leyte' },
		{ name: 'Provincial Buses', desc: 'Regional transit linking southern and northern Leyte' }
	];
</script>

<svelte:head>
	<title>Geography | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Geographic profile, location, terrain, and transportation information of the Municipality of Tanauan, Leyte, Philippines."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="geo-root">
	<!-- Hero Section with Royal Blue & Amber Ambient Atmosphere -->
	<header class="geo-hero">
		<div class="geo-ambient geo-ambient-royal"></div>
		<div class="geo-ambient geo-ambient-amber"></div>
		<div class="geo-ambient geo-ambient-bottom"></div>

		<div class="geo-hero-inner" class:is-visible={visible}>
			<h1 class="geo-hero-title">
				Geographic <span class="geo-amber-gradient">Profile</span>
			</h1>

			<p class="geo-hero-subtitle">
				Municipality of Tanauan, Leyte &bull; Bungto han Kamag-araman
			</p>

			<p class="geo-hero-description">
				Strategically nestled along the picturesque shores of the Leyte Gulf, Tanauan combines
				fertile coastal plains, gentle rolling hills, and seamless connectivity along the Maharlika
				Highway corridor.
			</p>

			<!-- Interactive Section Selector -->
			<div class="geo-filter-group" role="tablist" aria-label="Geography sections">
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
					aria-selected={activeTab === 'maps'}
					class="geo-filter-btn"
					class:is-active={activeTab === 'maps'}
					onclick={() => (activeTab = 'maps')}
				>
					Maps
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'transport'}
					class="geo-filter-btn"
					class:is-active={activeTab === 'transport'}
					onclick={() => (activeTab = 'transport')}
				>
					Transportation
				</button>
			</div>
		</div>
	</header>

	<!-- Main Body Container -->
	<main class="geo-main">
		<div class="geo-container">

			<!-- SECTION 2: Topographic Map & Geographic Visualization -->
			{#if activeTab === 'all' || activeTab === 'maps'}
				<section class="geo-section-block" class:is-visible={visible}>
					<div class="geo-card geo-map-card">
						<div class="geo-card-sheen"></div>
						<div class="geo-card-head">
							<div>
								<h2 class="geo-card-title">Topographic Map</h2>
								<p class="geo-card-subtitle">
									High-resolution terrain elevation and geographical boundary breakdown
								</p>
							</div>
						</div>

						<div class="geo-divider-royal"></div>

						<div class="geo-img-wrapper">
							<img
								src="/Topographic-Map.webp"
								alt="Topographic map of Tanauan, Leyte"
								class="geo-full-img"
								loading="lazy"
							/>
						</div>

						<div class="geo-map-footer">
							<div class="geo-footer-item">
								<span class="geo-footer-label">Terrain Classification</span>
								<span class="geo-footer-val">Alluvial Flatland &amp; Western Rolling Hills</span>
							</div>
							<div class="geo-footer-item">
								<span class="geo-footer-label">Seaward Exposure</span>
								<span class="geo-footer-val">Direct Maritime Access &bull; Leyte Gulf</span>
							</div>
							<div class="geo-footer-item">
								<span class="geo-footer-label">Elevation Profile</span>
								<span class="geo-footer-val">Near Sea-Level Coastline to Inland Slopes</span>
							</div>
						</div>
					</div>
				</section>
			{/if}

			<!-- SECTION 3: Transportation Infrastructure & Travel Times -->
			{#if activeTab === 'all' || activeTab === 'transport'}
				<section class="geo-section-block" class:is-visible={visible}>
					<div class="geo-card geo-transit-card">
						<div class="geo-card-sheen"></div>
						<div class="geo-card-head">
							<div>
								<h2 class="geo-card-title">Transportation &amp; Regional Access</h2>
								<p class="geo-card-subtitle">
									Comprehensive route timelines, vehicle modes, and municipal transit hub operations
								</p>
							</div>
						</div>

						<div class="geo-divider-amber"></div>

						<div class="geo-transit-layout">
							<!-- Travel Times List -->
							<div class="geo-transit-col">
								<div class="geo-subhead-wrap">
									<h3 class="geo-transit-subhead">Estimated Travel Times</h3>
									<span class="geo-transit-caption">Calculated from key arrival nodes</span>
								</div>

								<div class="geo-routes-list">
									{#each routes as route}
										<div class="geo-route-item">
											<div class="geo-route-info">
												<div>
													<h4 class="geo-route-from">From {route.from}</h4>
													<p class="geo-route-meta">{route.mode} &bull; {route.distance}</p>
												</div>
											</div>
											<div class="geo-route-time-badge">
												{route.time}
											</div>
										</div>
									{/each}
								</div>
							</div>

							<!-- Transport Hub Photo & Modes -->
							<div class="geo-transit-col">
								<div class="geo-subhead-wrap">
									<h3 class="geo-transit-subhead">Tanauan Transportation Hub</h3>
									<span class="geo-transit-caption">Aerial perspective of the central terminal</span>
								</div>

								<div class="geo-img-wrapper geo-hub-wrapper">
									<img
										src="/AERIAL DRONE SHOTS/Transpo-hub.webp"
										alt="Tanauan Transportation Hub aerial drone shot"
										class="geo-full-img"
										loading="lazy"
									/>
								</div>

								<div class="geo-subhead-wrap" style="margin-top: 1.5rem;">
									<h3 class="geo-transit-subhead">Available Transit Modes</h3>
									<span class="geo-transit-caption">Daily municipal &amp; regional fleet</span>
								</div>

								<div class="geo-modes-grid">
									{#each transportModes as mode}
										<div class="geo-mode-item">
											<div class="geo-mode-header">
												<h4 class="geo-mode-name">{mode.name}</h4>
											</div>
											<p class="geo-mode-desc">{mode.desc}</p>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</section>
			{/if}

			<!-- SECTION 4: Interactive Geographic Map -->
			{#if activeTab === 'all' || activeTab === 'maps'}
				<section class="geo-section-block" class:is-visible={visible}>
					<div class="geo-card geo-interactive-card">
						<div class="geo-card-sheen"></div>
						<div class="geo-card-head">
							<div>
								<h2 class="geo-card-title">Interactive Map</h2>
								<p class="geo-card-subtitle">
									Explore territorial boundaries, waterways, road networks, and municipal landmarks
								</p>
							</div>
						</div>

						<div class="geo-divider-amber"></div>

						<div class="geo-map-frame-wrapper">
							<iframe
								class="geo-map-iframe"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62808.52511199441!2d124.9703192!3d11.0668825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33085a05d5e5666b%3A0xb28df02dfb012397!2sTanauan%2C%20Leyte!5e0!3m2!1sen!2sph!4v1626525845623!5m2!1sen!2sph"
								allowfullscreen=""
								loading="lazy"
								referrerpolicy="no-referrer-when-downgrade"
								title="Tanauan, Leyte Interactive Map"
							></iframe>
						</div>
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
		max-width: 44rem;
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
	   MAIN LAYOUT & CARDS
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
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.25rem;
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
	   SECTION 2 & 3: MAPS & TRANSIT
	   ========================================================== */
	.geo-img-wrapper {
		position: relative;
		border-radius: 1.25rem;
		overflow: hidden;
		border: 1.5px solid rgba(255, 255, 255, 0.12);
		background: #020712;
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
	}

	.geo-full-img {
		width: 100%;
		height: auto;
		display: block;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.geo-img-wrapper:hover .geo-full-img {
		transform: scale(1.02);
	}

	.geo-map-footer {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
		margin-top: 1.5rem;
		padding-top: 1.25rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	@media (min-width: 640px) {
		.geo-map-footer {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.geo-footer-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.geo-footer-label {
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #94a3b8;
	}

	.geo-footer-val {
		font-size: 0.875rem;
		font-weight: 600;
		color: #f1f5f9;
	}

	/* Transit Grid Layout */
	.geo-transit-layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2.25rem;
	}

	@media (min-width: 1024px) {
		.geo-transit-layout {
			grid-template-columns: 1fr 1fr;
		}
	}

	.geo-subhead-wrap {
		margin-bottom: 1.25rem;
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

	/* Route Timeline Items */
	.geo-routes-list {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
	}

	.geo-route-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		background: rgba(10, 27, 58, 0.6);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 1rem;
		padding: 1rem 1.25rem;
		transition: all 0.3s ease;
	}

	.geo-route-item:hover {
		background: rgba(10, 27, 58, 0.95);
		border-color: #f59e0b;
		transform: translateX(4px);
	}

	.geo-route-info {
		display: flex;
		align-items: center;
		gap: 1rem;
	}


	.geo-route-from {
		font-size: 0.9375rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0;
	}

	.geo-route-meta {
		font-size: 0.75rem;
		color: #94a3b8;
		margin: 0.2rem 0 0;
	}

	.geo-route-time-badge {
		font-size: 0.8125rem;
		font-weight: 700;
		color: #040b17;
		background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
		padding: 0.375rem 0.875rem;
		border-radius: 9999px;
		box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);
		white-space: nowrap;
	}

	/* Transport Modes */
	.geo-modes-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}

	@media (min-width: 640px) {
		.geo-modes-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.geo-mode-item {
		background: rgba(10, 27, 58, 0.45);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 0.875rem;
		padding: 0.875rem 1rem;
		transition: all 0.25s ease;
	}

	.geo-mode-item:hover {
		background: rgba(10, 27, 58, 0.8);
		border-color: #3b82f6;
	}

	.geo-mode-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}


	.geo-mode-name {
		font-size: 0.875rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0;
	}

	.geo-mode-desc {
		font-size: 0.75rem;
		color: #94a3b8;
		line-height: 1.4;
		margin: 0;
	}

	/* ==========================================================
	   SECTION 4: INTERACTIVE MAP
	   ========================================================== */
	.geo-map-frame-wrapper {
		border-radius: 1.25rem;
		overflow: hidden;
		border: 1.5px solid rgba(59, 130, 246, 0.3);
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
	}

	.geo-map-iframe {
		width: 100%;
		height: 22rem;
		border: none;
		display: block;
	}

	@media (min-width: 640px) {
		.geo-map-iframe {
			height: 28rem;
		}
	}

</style>
