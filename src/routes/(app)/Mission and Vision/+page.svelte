<script>
	import { onMount } from 'svelte';

	let visible = $state(false);
	let activeTab = $state('all'); // 'all' | 'vision' | 'mission'

	onMount(() => {
		visible = true;
	});
</script>

<svelte:head>
	<title>Vision & Mission | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="The official Vision, Mission, Core Values, and Quality Policy of the Municipal Government of Tanauan, Leyte, Philippines."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="mv-root">
	<!-- Hero Header with Royal Blue & Amber Ambient Glow -->
	<header class="mv-hero">
		<!-- Floating animated ambient glows -->
		<div class="mv-ambient mv-ambient-royal"></div>
		<div class="mv-ambient mv-ambient-amber"></div>
		<div class="mv-ambient mv-ambient-bottom"></div>

		<div class="mv-hero-inner" class:is-visible={visible}>
			<nav class="mv-breadcrumb" aria-label="Breadcrumb">
				<a href="/" class="mv-crumb-link">Home</a>
				<span class="mv-crumb-sep">/</span>
				<span class="mv-crumb-parent">Our Municipality</span>
				<span class="mv-crumb-sep">/</span>
				<span class="mv-crumb-current">Vision & Mission</span>
			</nav>

			<div class="mv-pill-badge">
				<span class="mv-badge-dot"></span>
				<span class="mv-badge-text">Tanauan 2032 Blueprint</span>
			</div>

			<h1 class="mv-hero-title">
				Vision &amp; <span class="mv-amber-gradient">Mission</span>
			</h1>

			<p class="mv-hero-subtitle">
				Municipality of Tanauan, Leyte &bull; Bungto han Kamag-araman
			</p>

			<p class="mv-hero-description">
				The strategic compass guiding our governance, sustainable economic growth, and people-centered
				public service toward a resilient and thriving future.
			</p>

			<!-- Quick Filter Toggle -->
			<div class="mv-filter-group" role="tablist" aria-label="View toggle">
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'all'}
					class="mv-filter-btn"
					class:is-active={activeTab === 'all'}
					onclick={() => (activeTab = 'all')}
				>
					Overview
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'vision'}
					class="mv-filter-btn"
					class:is-active={activeTab === 'vision'}
					onclick={() => (activeTab = 'vision')}
				>
					Vision 2032
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'mission'}
					class="mv-filter-btn"
					class:is-active={activeTab === 'mission'}
					onclick={() => (activeTab = 'mission')}
				>
					Mission
				</button>
			</div>
		</div>
	</header>

	<!-- Main Content Section -->
	<main class="mv-main">
		<div class="mv-container">
			<!-- Dual Strategic Cards: Vision & Mission -->
			<section class="mv-dual-grid" class:is-visible={visible}>
				<!-- VISION CARD -->
				{#if activeTab === 'all' || activeTab === 'vision'}
					<article
						class="mv-card mv-card-vision"
						class:mv-card-full={activeTab === 'vision'}
					>
						<div class="mv-card-sheen"></div>
						<div class="mv-card-header">
							<span class="mv-card-number">01</span>
							<div class="mv-card-titles">
								<span class="mv-card-tag mv-tag-royal">Strategic Future</span>
								<h2 class="mv-card-heading">Our Vision</h2>
							</div>
						</div>

						<div class="mv-divider-amber"></div>

						<p class="mv-card-text">
							Tanauan by 2032, a <strong class="mv-highlight-amber">1st class municipality</strong>
							which is a premier tourism destination, education hub, and an investment haven in the province
							of Leyte &mdash; inhabited by a healthy and empowered citizenry living in peaceful and resilient
							communities; with a competitive, diversified, dynamic, and inclusive economy; a disaster-proof,
							quality, and adequate social support and infrastructure system; and an ecologically balanced,
							sustainable, and aesthetic environment &mdash; under an effective and efficient participatory
							and people-centered leadership with a strong political will.
						</p>

						<div class="mv-card-footer">
							<div class="mv-card-stat">
								<span class="mv-stat-label">Target Milestone</span>
								<span class="mv-stat-val">Year 2032</span>
							</div>
							<div class="mv-card-stat">
								<span class="mv-stat-label">Classification Goal</span>
								<span class="mv-stat-val">1st Class Municipality</span>
							</div>
						</div>
					</article>
				{/if}

				<!-- MISSION CARD -->
				{#if activeTab === 'all' || activeTab === 'mission'}
					<article
						class="mv-card mv-card-mission"
						class:mv-card-full={activeTab === 'mission'}
					>
						<div class="mv-card-sheen"></div>
						<div class="mv-card-header">
							<span class="mv-card-number mv-number-amber">02</span>
							<div class="mv-card-titles">
								<span class="mv-card-tag mv-tag-amber">Executive Mandate</span>
								<h2 class="mv-card-heading">Our Mission</h2>
							</div>
						</div>

						<div class="mv-divider-royal"></div>

						<p class="mv-card-text">
							The Municipal Government of Tanauan shall take the lead in the
							<strong class="mv-highlight-royal">integration and implementation</strong>
							of programs, projects, and activities; promote strong multi-sectoral level partnerships;
							and mobilize resources through a strong political will and unity of purpose.
						</p>

						<div class="mv-card-footer">
							<div class="mv-card-stat">
								<span class="mv-stat-label">Core Approach</span>
								<span class="mv-stat-val">Integrated Execution</span>
							</div>
							<div class="mv-card-stat">
								<span class="mv-stat-label">Civic Strategy</span>
								<span class="mv-stat-val">Multi-Sectoral Unity</span>
							</div>
						</div>
					</article>
				{/if}
			</section>

			<!-- CORE VALUES SECTION -->
			<section class="mv-section-block" class:is-visible={visible}>
				<div class="mv-section-head">
					<div class="mv-pill-badge">
						<span class="mv-badge-dot"></span>
						<span class="mv-badge-text">Organizational DNA</span>
					</div>
					<h2 class="mv-section-title">
						Our Core <span class="mv-amber-text">Values</span>
					</h2>
					<p class="mv-section-subtitle">
						The foundational pillars that guide every decision, public service interaction, and municipal program.
					</p>
				</div>

				<div class="mv-values-grid">
					<!-- 01 Integrity -->
					<div class="mv-value-card">
						<div class="mv-value-top">
							<span class="mv-value-num">01</span>
							<span class="mv-value-badge mv-tag-royal">Governance</span>
						</div>
						<h3 class="mv-value-title">Integrity</h3>
						<p class="mv-value-desc">Honest, ethical, and transparent governance with absolute fiscal accountability.</p>
					</div>

					<!-- 02 Excellence -->
					<div class="mv-value-card mv-value-amber">
						<div class="mv-value-top">
							<span class="mv-value-num mv-num-amber">02</span>
							<span class="mv-value-badge mv-tag-amber">Standards</span>
						</div>
						<h3 class="mv-value-title">Excellence</h3>
						<p class="mv-value-desc">Striving relentlessly for the highest quality in public delivery and citizen satisfaction.</p>
					</div>

					<!-- 03 Accountability -->
					<div class="mv-value-card">
						<div class="mv-value-top">
							<span class="mv-value-num">03</span>
							<span class="mv-value-badge mv-tag-royal">Responsibility</span>
						</div>
						<h3 class="mv-value-title">Accountability</h3>
						<p class="mv-value-desc">Answerable, reliable public stewardship dedicated to the welfare of all constituents.</p>
					</div>

					<!-- 04 Teamwork -->
					<div class="mv-value-card mv-value-amber">
						<div class="mv-value-top">
							<span class="mv-value-num mv-num-amber">04</span>
							<span class="mv-value-badge mv-tag-amber">Collaboration</span>
						</div>
						<h3 class="mv-value-title">Teamwork</h3>
						<p class="mv-value-desc">Uniting departments, communities, and sectoral partners for synchronized progress.</p>
					</div>

					<!-- 05 Service -->
					<div class="mv-value-card">
						<div class="mv-value-top">
							<span class="mv-value-num">05</span>
							<span class="mv-value-badge mv-tag-royal">Constituents</span>
						</div>
						<h3 class="mv-value-title">Service</h3>
						<p class="mv-value-desc">Empathetic, responsive, and people-centered care that prioritizes every citizen.</p>
					</div>

					<!-- 06 Resilience -->
					<div class="mv-value-card mv-value-amber">
						<div class="mv-value-top">
							<span class="mv-value-num mv-num-amber">06</span>
							<span class="mv-value-badge mv-tag-amber">Preparedness</span>
						</div>
						<h3 class="mv-value-title">Resilience</h3>
						<p class="mv-value-desc">Disaster-ready, proactive systems protecting lives, livelihoods, and our environment.</p>
					</div>
				</div>
			</section>

			<!-- QUALITY POLICY SECTION -->
			<section class="mv-section-block mv-policy-block" class:is-visible={visible}>
				<div class="mv-policy-card">
					<div class="mv-policy-glow"></div>
					<div class="mv-policy-header">
						<div class="mv-policy-title-wrap">
							<span class="mv-card-tag mv-tag-amber">Service Standard</span>
							<h2 class="mv-policy-heading">Quality Policy</h2>
							<p class="mv-policy-subheading">Our unwavering commitment to world-class local governance</p>
						</div>
						<div class="mv-policy-stamp">
							<span class="mv-stamp-code">ISO &bull; LGU</span>
							<span class="mv-stamp-sub">Public Trust</span>
						</div>
					</div>

					<div class="mv-divider-amber"></div>

					<div class="mv-policy-pillars">
						<div class="mv-pillar-item">
							<div class="mv-pillar-idx">Pillar 1</div>
							<h3 class="mv-pillar-name">Competent Leadership</h3>
							<p class="mv-pillar-desc">
								Qualified, visionary public servants dedicated to proactive governance, policy consistency, and merit-based administrative performance.
							</p>
						</div>

						<div class="mv-pillar-item mv-pillar-amber">
							<div class="mv-pillar-idx mv-pillar-idx-amber">Pillar 2</div>
							<h3 class="mv-pillar-name">Continuous Improvement</h3>
							<p class="mv-pillar-desc">
								Regularly modernizing municipal systems, streamlining citizen transactions, and adopting data-driven solutions for superior service delivery.
							</p>
						</div>

						<div class="mv-pillar-item">
							<div class="mv-pillar-idx">Pillar 3</div>
							<h3 class="mv-pillar-name">Citizen Satisfaction</h3>
							<p class="mv-pillar-desc">
								Actively listening to constituents, removing bureaucratic hurdles, and ensuring every Tanauanon experiences prompt and courteous service.
							</p>
						</div>

						<div class="mv-pillar-item mv-pillar-amber">
							<div class="mv-pillar-idx mv-pillar-idx-amber">Pillar 4</div>
							<h3 class="mv-pillar-name">Sustainable Development</h3>
							<p class="mv-pillar-desc">
								Balancing rapid infrastructure and economic growth with environmental preservation, climate-resilient engineering, and ecological balance.
							</p>
						</div>
					</div>
				</div>
			</section>

			<!-- Compliance Notice -->
			<footer class="mv-compliance">
				<div class="mv-compliance-bar"></div>
				<p class="mv-compliance-text">
					Republic of the Philippines &bull; Province of Leyte &bull; Municipality of Tanauan
				</p>
				<p class="mv-compliance-sub">
					Complies with the Department of Information and Communications Technology (DICT) Philippine Government Website Standards.
				</p>
			</footer>
		</div>
	</main>
</div>

<style>
	/* ==========================================================
	   GLOBAL TYPOGRAPHY & DESIGN SYSTEM (POPPINS & ROYAL/AMBER)
	   ========================================================== */
	.mv-root {
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
	.mv-hero {
		position: relative;
		background: linear-gradient(135deg, #040b17 0%, #0a1b3a 45%, #102a5c 100%);
		padding: 5rem 1.5rem 6.5rem;
		border-bottom: 2px solid rgba(245, 158, 11, 0.25);
		overflow: hidden;
		text-align: center;
	}

	/* Animated Ambient Glows */
	.mv-ambient {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
		opacity: 0.45;
		animation: floatOrb 12s ease-in-out infinite alternate;
	}

	.mv-ambient-royal {
		width: 480px;
		height: 480px;
		background: radial-gradient(circle, #1d4ed8 0%, transparent 70%);
		top: -120px;
		left: -80px;
	}

	.mv-ambient-amber {
		width: 420px;
		height: 420px;
		background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
		top: 30px;
		right: -100px;
		animation-duration: 15s;
		animation-delay: -3s;
	}

	.mv-ambient-bottom {
		width: 600px;
		height: 300px;
		background: radial-gradient(circle, #1e40af 0%, transparent 70%);
		bottom: -100px;
		left: 50%;
		transform: translateX(-50%);
		animation-duration: 18s;
		animation-delay: -6s;
	}

	@keyframes floatOrb {
		0% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(25px, -35px) scale(1.1);
		}
		100% {
			transform: translate(-30px, 20px) scale(0.95);
		}
	}

	.mv-hero-inner {
		position: relative;
		z-index: 10;
		max-width: 56rem;
		margin: 0 auto;
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.mv-hero-inner.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Breadcrumb */
	.mv-breadcrumb {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8125rem;
		color: #93c5fd;
		margin-bottom: 1.75rem;
		letter-spacing: 0.025em;
	}

	.mv-crumb-link {
		color: #93c5fd;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.mv-crumb-link:hover {
		color: #fbbf24;
	}

	.mv-crumb-sep {
		color: rgba(245, 158, 11, 0.45);
	}

	.mv-crumb-parent {
		color: #bfdbfe;
	}

	.mv-crumb-current {
		color: #f59e0b;
		font-weight: 600;
	}

	/* Pill Badges */
	.mv-pill-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.375rem 1rem;
		border-radius: 9999px;
		background: rgba(245, 158, 11, 0.12);
		border: 1px solid rgba(245, 158, 11, 0.35);
		margin-bottom: 1.25rem;
		box-shadow: 0 0 20px rgba(245, 158, 11, 0.15);
	}

	.mv-badge-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 9999px;
		background-color: #f59e0b;
		box-shadow: 0 0 10px #f59e0b;
		animation: pulseDot 2s ease-in-out infinite;
	}

	@keyframes pulseDot {
		0%, 100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.5;
			transform: scale(0.85);
		}
	}

	.mv-badge-text {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #fbbf24;
	}

	/* Hero Titles */
	.mv-hero-title {
		font-size: 2.75rem;
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1.15;
		color: #ffffff;
		margin: 0 0 0.75rem;
	}

	@media (min-width: 640px) {
		.mv-hero-title {
			font-size: 3.75rem;
		}
	}

	@media (min-width: 1024px) {
		.mv-hero-title {
			font-size: 4.5rem;
		}
	}

	.mv-amber-gradient {
		background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		display: inline-block;
		text-shadow: 0 0 30px rgba(245, 158, 11, 0.3);
	}

	.mv-hero-subtitle {
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #60a5fa;
		margin-bottom: 1.25rem;
	}

	.mv-hero-description {
		font-size: 1rem;
		line-height: 1.7;
		color: #cbd5e1;
		max-width: 42rem;
		margin: 0 auto 2.25rem;
		font-weight: 300;
	}

	@media (min-width: 640px) {
		.mv-hero-description {
			font-size: 1.125rem;
		}
	}

	/* Filter Group Buttons */
	.mv-filter-group {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem;
		background: rgba(10, 27, 58, 0.85);
		border: 1px solid rgba(59, 130, 246, 0.3);
		border-radius: 9999px;
		backdrop-blur-md: 10px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
	}

	.mv-filter-btn {
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

	.mv-filter-btn:hover {
		color: #fbbf24;
	}

	.mv-filter-btn.is-active {
		background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
		color: #ffffff;
		box-shadow: 0 4px 15px rgba(29, 78, 216, 0.45), 0 0 0 1px rgba(245, 158, 11, 0.5);
	}

	/* ==========================================================
	   MAIN LAYOUT & DUAL STRATEGIC CARDS
	   ========================================================== */
	.mv-main {
		position: relative;
		padding: 3.5rem 1.25rem 6rem;
		z-index: 20;
	}

	.mv-container {
		max-width: 76rem;
		margin: 0 auto;
	}

	.mv-dual-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		margin-bottom: 4.5rem;
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s,
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
	}

	.mv-dual-grid.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	@media (min-width: 1024px) {
		.mv-dual-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.mv-dual-grid:has(.mv-card-full) {
			grid-template-columns: 1fr;
		}
	}

	/* Cards */
	.mv-card {
		position: relative;
		background: linear-gradient(165deg, #0e2246 0%, #091733 60%, #061127 100%);
		border: 2px solid rgba(59, 130, 246, 0.25);
		border-radius: 1.75rem;
		padding: 2.25rem 2rem;
		box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			border-color 0.4s ease,
			box-shadow 0.4s ease;
		overflow: hidden;
	}

	.mv-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8);
	}

	.mv-card-vision:hover {
		border-color: #3b82f6;
		box-shadow: 0 20px 50px -10px rgba(37, 99, 235, 0.35);
	}

	.mv-card-mission:hover {
		border-color: #f59e0b;
		box-shadow: 0 20px 50px -10px rgba(245, 158, 11, 0.35);
	}

	/* Sheen sweeping light effect */
	.mv-card-sheen {
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

	.mv-card:hover .mv-card-sheen {
		left: 150%;
	}

	.mv-card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}

	.mv-card-number {
		font-size: 2.5rem;
		font-weight: 900;
		line-height: 1;
		color: #3b82f6;
		opacity: 0.8;
		letter-spacing: -0.05em;
	}

	.mv-number-amber {
		color: #f59e0b;
	}

	.mv-card-titles {
		text-align: right;
	}

	.mv-card-tag {
		display: inline-block;
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		margin-bottom: 0.35rem;
	}

	.mv-tag-royal {
		background: rgba(37, 99, 235, 0.2);
		color: #93c5fd;
		border: 1px solid rgba(59, 130, 246, 0.4);
	}

	.mv-tag-amber {
		background: rgba(245, 158, 11, 0.18);
		color: #fde68a;
		border: 1px solid rgba(245, 158, 11, 0.45);
	}

	.mv-card-heading {
		font-size: 1.75rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #ffffff;
		margin: 0;
	}

	.mv-divider-amber {
		height: 3px;
		width: 100%;
		background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 60%, transparent 100%);
		border-radius: 9999px;
		margin-bottom: 1.75rem;
	}

	.mv-divider-royal {
		height: 3px;
		width: 100%;
		background: linear-gradient(90deg, #2563eb 0%, #60a5fa 60%, transparent 100%);
		border-radius: 9999px;
		margin-bottom: 1.75rem;
	}

	.mv-card-text {
		font-size: 1rem;
		line-height: 1.85;
		color: #cbd5e1;
		font-weight: 400;
		margin-bottom: 2rem;
	}

	@media (min-width: 640px) {
		.mv-card-text {
			font-size: 1.0625rem;
		}
	}

	.mv-highlight-amber {
		color: #fbbf24;
		font-weight: 700;
		text-shadow: 0 0 12px rgba(245, 158, 11, 0.3);
	}

	.mv-highlight-royal {
		color: #93c5fd;
		font-weight: 700;
		text-shadow: 0 0 12px rgba(37, 99, 235, 0.3);
	}

	.mv-card-footer {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.mv-card-stat {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.mv-stat-label {
		font-size: 0.6875rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #94a3b8;
		font-weight: 600;
	}

	.mv-stat-val {
		font-size: 0.9375rem;
		font-weight: 700;
		color: #ffffff;
	}

	/* ==========================================================
	   CORE VALUES SECTION
	   ========================================================== */
	.mv-section-block {
		margin-bottom: 5rem;
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s,
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
	}

	.mv-section-block.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	.mv-section-head {
		text-align: center;
		margin-bottom: 2.75rem;
	}

	.mv-section-title {
		font-size: 2.25rem;
		font-weight: 900;
		letter-spacing: -0.02em;
		color: #ffffff;
		margin: 0.5rem 0 0.75rem;
	}

	@media (min-width: 640px) {
		.mv-section-title {
			font-size: 2.75rem;
		}
	}

	.mv-amber-text {
		color: #f59e0b;
	}

	.mv-section-subtitle {
		font-size: 0.9375rem;
		color: #94a3b8;
		max-width: 36rem;
		margin: 0 auto;
		line-height: 1.6;
	}

	.mv-values-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1.25rem;
	}

	@media (min-width: 640px) {
		.mv-values-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.mv-values-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.mv-value-card {
		background: linear-gradient(170deg, #0b1c3a 0%, #071329 100%);
		border: 1.5px solid rgba(59, 130, 246, 0.2);
		border-radius: 1.25rem;
		padding: 1.75rem 1.5rem;
		transition: all 0.35s ease;
		position: relative;
		overflow: hidden;
	}

	.mv-value-card:hover {
		transform: translateY(-5px);
		border-color: #2563eb;
		box-shadow: 0 15px 35px -10px rgba(37, 99, 235, 0.3);
	}

	.mv-value-amber:hover {
		border-color: #f59e0b;
		box-shadow: 0 15px 35px -10px rgba(245, 158, 11, 0.3);
	}

	.mv-value-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.25rem;
	}

	.mv-value-num {
		font-size: 1.75rem;
		font-weight: 900;
		line-height: 1;
		color: #3b82f6;
		letter-spacing: -0.05em;
	}

	.mv-num-amber {
		color: #f59e0b;
	}

	.mv-value-badge {
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 0.2rem 0.6rem;
		border-radius: 9999px;
	}

	.mv-value-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 0.5rem;
	}

	.mv-value-desc {
		font-size: 0.875rem;
		line-height: 1.6;
		color: #94a3b8;
		margin: 0;
	}

	/* ==========================================================
	   QUALITY POLICY SECTION
	   ========================================================== */
	.mv-policy-block {
		margin-bottom: 4.5rem;
	}

	.mv-policy-card {
		position: relative;
		background: linear-gradient(145deg, #0e244b 0%, #0a1936 60%, #061127 100%);
		border: 2px solid rgba(245, 158, 11, 0.35);
		border-radius: 2rem;
		padding: 2.75rem 2rem;
		overflow: hidden;
		box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.65), 0 0 40px rgba(245, 158, 11, 0.08);
	}

	@media (min-width: 768px) {
		.mv-policy-card {
			padding: 3.5rem 3rem;
		}
	}

	.mv-policy-glow {
		position: absolute;
		top: -100px;
		right: -100px;
		width: 350px;
		height: 350px;
		background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%);
		border-radius: 50%;
		filter: blur(50px);
		pointer-events: none;
	}

	.mv-policy-header {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		justify-content: space-between;
		margin-bottom: 2rem;
	}

	@media (min-width: 768px) {
		.mv-policy-header {
			flex-direction: row;
			align-items: flex-end;
		}
	}

	.mv-policy-heading {
		font-size: 2rem;
		font-weight: 900;
		color: #ffffff;
		letter-spacing: -0.02em;
		margin: 0.5rem 0 0.25rem;
	}

	@media (min-width: 640px) {
		.mv-policy-heading {
			font-size: 2.5rem;
		}
	}

	.mv-policy-subheading {
		font-size: 0.9375rem;
		color: #94a3b8;
		margin: 0;
	}

	.mv-policy-stamp {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 1.5rem;
		border: 1.5px dashed rgba(245, 158, 11, 0.5);
		border-radius: 1rem;
		background: rgba(245, 158, 11, 0.08);
		align-self: flex-start;
	}

	@media (min-width: 768px) {
		.mv-policy-stamp {
			align-self: auto;
		}
	}

	.mv-stamp-code {
		font-size: 0.8125rem;
		font-weight: 800;
		letter-spacing: 0.15em;
		color: #fbbf24;
	}

	.mv-stamp-sub {
		font-size: 0.625rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #cbd5e1;
	}

	.mv-policy-pillars {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.75rem;
	}

	@media (min-width: 768px) {
		.mv-policy-pillars {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.mv-pillar-item {
		background: rgba(10, 27, 58, 0.5);
		border-left: 3px solid #2563eb;
		border-radius: 0 1rem 1rem 0;
		padding: 1.5rem 1.25rem;
		transition: all 0.3s ease;
	}

	.mv-pillar-item:hover {
		background: rgba(10, 27, 58, 0.8);
		transform: translateX(4px);
	}

	.mv-pillar-amber {
		border-left-color: #f59e0b;
	}

	.mv-pillar-idx {
		font-size: 0.6875rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: #60a5fa;
		margin-bottom: 0.35rem;
	}

	.mv-pillar-idx-amber {
		color: #fbbf24;
	}

	.mv-pillar-name {
		font-size: 1.125rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 0.5rem;
	}

	.mv-pillar-desc {
		font-size: 0.875rem;
		line-height: 1.6;
		color: #94a3b8;
		margin: 0;
	}

	/* ==========================================================
	   COMPLIANCE FOOTER
	   ========================================================== */
	.mv-compliance {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.mv-compliance-bar {
		width: 4rem;
		height: 3px;
		background: linear-gradient(90deg, #1d4ed8 0%, #f59e0b 100%);
		border-radius: 9999px;
		margin: 0 auto 1.5rem;
	}

	.mv-compliance-text {
		font-size: 0.8125rem;
		font-weight: 600;
		color: #94a3b8;
		margin: 0 0 0.35rem;
		letter-spacing: 0.04em;
	}

	.mv-compliance-sub {
		font-size: 0.75rem;
		color: #64748b;
		margin: 0;
	}
</style>
