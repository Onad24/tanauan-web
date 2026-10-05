<script>
	import { onMount } from 'svelte';

	let visible = $state(false);
	let activeTab = $state('all'); // 'all' | 'heritage' | 'denominations' | 'milestones'

	onMount(() => {
		visible = true;
	});

	const denominations = [
		{
			name: 'Roman Catholic',
			desc: 'Main spiritual hub: Assumption of Our Lady Parish Church. Core driver of civic fiestas and historical traditions.',
			theme: 'amber'
		},
		{
			name: 'Iglesia ni Cristo',
			pct: '',
			desc: 'Established and growing congregations across southern and poblacion barangays.',
			theme: 'royal'
		},
		{
			name: 'Born Again & Evangelicals',
			pct: '',
			desc: 'Active Christian fellowships and community churches in the poblacion and rural centers.',
			theme: 'royal'
		},
		{
			name: 'Seventh-day Adventists',
			pct: '',
			desc: 'Active community outreach in health missions, youth education, and family guidance.',
			theme: 'royal'
		},
		{
			name: "Jehovah's Witnesses",
			pct: '',
			desc: 'Congregations maintaining regular Christian meetings and community Bible education across barangays.',
			theme: 'royal'
		}
	];

	const milestones = [
		{
			date: 'June 2025',
			title: 'Interfaith Unity Gathering',
			desc: 'More than 10 local churches and denominational leaders gathered for a municipal-sponsored interfaith conference advancing civic dialogue and communal assistance.'
		},
		{
			date: 'March 2024',
			title: 'Youth Formation & Leadership Programs',
			desc: 'Over 200 young Tanauanons completed value formation and community leadership seminars spearheaded by Catholic and Evangelical youth ministries.'
		},
		{
			date: 'January 2024',
			title: 'Historic Church Restoration Project',
			desc: 'Major preservation and structural retrofitting of the historic Assumption Parish Church with national cultural heritage funding.'
		}
	];
</script>

<svelte:head>
	<title>Religious Life | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Religious heritage, parish history, faith denominations, fiestas, and spiritual life in the Municipality of Tanauan, Leyte, Philippines."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="rel-root">
	<!-- Hero Section with Royal Blue & Amber Ambient Atmosphere -->
	<header class="rel-hero">
		<div class="rel-ambient rel-ambient-royal"></div>
		<div class="rel-ambient rel-ambient-amber"></div>
		<div class="rel-ambient rel-ambient-bottom"></div>

		<div class="rel-hero-inner" class:is-visible={visible}>
			<h1 class="rel-hero-title">
				Religious &amp; <span class="rel-amber-gradient">Spiritual Life</span>
			</h1>

			<p class="rel-hero-subtitle">
				Municipality of Tanauan, Leyte &bull; Bungto han Kamag-araman
			</p>

			<p class="rel-hero-description">
				Discover Tanauan's deep spiritual foundations, centuries-old parish history, harmonious multi-denominational
				fellowships, and living faith traditions that unite our communities.
			</p>

			<!-- Interactive Section Selector -->
			<div class="rel-filter-group" role="tablist" aria-label="Religion sections">
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'all'}
					class="rel-filter-btn"
					class:is-active={activeTab === 'all'}
					onclick={() => (activeTab = 'all')}
				>
					Complete Overview
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'heritage'}
					class="rel-filter-btn"
					class:is-active={activeTab === 'heritage'}
					onclick={() => (activeTab = 'heritage')}
				>
					Heritage &amp; History
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'denominations'}
					class="rel-filter-btn"
					class:is-active={activeTab === 'denominations'}
					onclick={() => (activeTab = 'denominations')}
				>
					Denominations
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'milestones'}
					class="rel-filter-btn"
					class:is-active={activeTab === 'milestones'}
					onclick={() => (activeTab = 'milestones')}
				>
					Milestones
				</button>
			</div>
		</div>
	</header>

	<!-- Main Body Container -->
	<main class="rel-main">
		<div class="rel-container">

			<!-- SECTION 1: Faith & Spiritual Heritage with Church Image -->
			{#if activeTab === 'all' || activeTab === 'heritage'}
				<section class="rel-section-block" class:is-visible={visible}>
					<div class="rel-grid-dual">

						<!-- Heritage Prose Card -->
						<div class="rel-card rel-heritage-card">
							<div class="rel-card-sheen"></div>
							<div class="rel-card-head">
								<div>
									<h2 class="rel-card-title">Faith &amp; Spiritual Heritage</h2>
									<p class="rel-card-subtitle">Centuries of communal devotion &amp; civic resilience</p>
								</div>
							</div>

							<div class="rel-divider-amber"></div>

							<div class="rel-prose">
								<p>
									Religion continues to serve as an enduring cornerstone in the civic and cultural identity
									of Tanauan. Predominantly <strong class="rel-highlight-amber">Roman Catholic</strong>, the
									town's spiritual life is anchored by the historic
									<strong class="rel-highlight-royal">Assumption of Our Lady Parish Church</strong>, widely
									recognized as one of the oldest ecclesiastical landmarks in the province of Leyte,
									founded in the <strong class="rel-highlight-amber">early 18th century</strong>.
								</p>
								<p>
									This venerated sanctuary stands as a living testament to faith and communal perseverance,
									having withstood typhoons, seismic events, and colonial conflicts across centuries of collective
									devotion.
								</p>
							</div>

							<div class="rel-badges-row">
								<div class="rel-badge-box">
									<span class="rel-badge-label">Founding Era</span>
									<span class="rel-badge-val">Early 18th Century</span>
								</div>
								<div class="rel-badge-box">
									<span class="rel-badge-label">Patronal Feast</span>
									<span class="rel-badge-val rel-val-amber">August 15 (Assumption)</span>
								</div>
							</div>
						</div>

						<!-- Church Landmark Image Card -->
						<div class="rel-card rel-photo-card">
							<div class="rel-card-sheen"></div>
							<div class="rel-card-head">
								<div>
									<h2 class="rel-card-title">Our Lady of the Assumption</h2>
									<p class="rel-card-subtitle">Parish Church of Tanauan, Leyte</p>
								</div>
							</div>

							<div class="rel-divider-royal"></div>

							<div class="rel-img-wrapper">
								<img
									src="/Tourism/church-2.jpg"
									alt="Assumption of Our Lady Parish Church, Tanauan, Leyte"
									class="rel-full-img"
									loading="lazy"
								/>
							</div>

							<div class="rel-photo-meta">
								<span class="rel-meta-dot"></span>
								<span>Registered Cultural Landmark &bull; Roman Catholic Archdiocese of Palo</span>
							</div>
						</div>

					</div>
				</section>

				<!-- SECTION 2: Parish History & Festivities -->
				<section class="rel-section-block" class:is-visible={visible}>
					<div class="rel-card">
						<div class="rel-card-sheen"></div>
						<div class="rel-card-head">
							<div>
								<h2 class="rel-card-title">Parish History &amp; Festivities</h2>
								<p class="rel-card-subtitle">Living traditions, annual celebrations, and architectural legacy</p>
							</div>
						</div>

						<div class="rel-divider-royal"></div>

						<div class="rel-fest-grid">
							<div class="rel-fest-item">
								<h3 class="rel-fest-heading">Annual Patronal Fiesta</h3>
								<p class="rel-fest-desc">
									Tanauan celebrates its grand municipal fiesta annually every <strong class="rel-highlight-amber">August 15</strong>,
									commemorating the Solemnity of the Assumption. The celebration draws thousands of pilgrims, returning Tanauanons,
									and visitors for religious processions, novena masses, civic parades, and vibrant cultural presentations.
								</p>
							</div>

							<div class="rel-fest-item">
								<h3 class="rel-fest-heading">315th Jubilee Anniversary</h3>
								<p class="rel-fest-desc">
									In 2025, the parish observed its historic <strong class="rel-highlight-royal">315th Anniversary</strong>,
									highlighting over three centuries of evangelization through expansive humanitarian outreaches, food distributions,
									inter-barangay masses, and youth catechetical leadership conferences.
								</p>
							</div>

							<div class="rel-fest-item">
								<h3 class="rel-fest-heading">Colonial Architecture</h3>
								<p class="rel-fest-desc">
									The church structure preserves <strong class="rel-highlight-amber">Spanish colonial architecture</strong>
									featuring thick stone masonry, classical pediments, and enduring bell towers. It continues to be actively preserved
									as an irreplaceable historical treasure under the National Historical Commission of the Philippines.
								</p>
							</div>
						</div>
					</div>
				</section>
			{/if}

			<!-- SECTION 3: Religious Denominations -->
			{#if activeTab === 'all' || activeTab === 'denominations'}
				<section class="rel-section-block" class:is-visible={visible}>
					<div class="rel-card">
						<div class="rel-card-sheen"></div>
						<div class="rel-card-head">
							<div>
								<h2 class="rel-card-title">Religious Denominations</h2>
								<p class="rel-card-subtitle">Diverse congregations coexisting in fellowship and civic peace</p>
							</div>
						</div>

						<div class="rel-divider-amber"></div>

						<div class="rel-denoms-grid">
							{#each denominations as denom}
								<div class="rel-denom-card" class:rel-denom-amber={denom.theme === 'amber'}>
									<div class="rel-denom-header">
										<h3 class="rel-denom-title">{denom.name}</h3>
									</div>
									<p class="rel-denom-desc">{denom.desc}</p>
								</div>
							{/each}
						</div>
					</div>
				</section>
			{/if}

			<!-- SECTION 4: Recent Developments & Milestones -->
			{#if activeTab === 'all' || activeTab === 'milestones'}
				<section class="rel-section-block" class:is-visible={visible}>
					<div class="rel-card">
						<div class="rel-card-sheen"></div>
						<div class="rel-card-head">
							<div>
								<h2 class="rel-card-title">Recent Developments &amp; Milestones</h2>
								<p class="rel-card-subtitle">Key interfaith initiatives, youth formation, and preservation projects</p>
							</div>
						</div>

						<div class="rel-divider-royal"></div>

						<div class="rel-timeline">
							{#each milestones as item}
								<div class="rel-timeline-item">
									<div class="rel-timeline-node">
										<div class="rel-node-dot"></div>
									</div>
									<div class="rel-timeline-content">
										<span class="rel-timeline-date">{item.date}</span>
										<h3 class="rel-timeline-title">{item.title}</h3>
										<p class="rel-timeline-desc">{item.desc}</p>
									</div>
								</div>
							{/each}
						</div>

						<p class="rel-source-note">
							Sources: Parish Archives of Our Lady of the Assumption &bull; Municipal Planning &amp; Development Office &bull; PSA Eastern Visayas.
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
	.rel-root {
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
	.rel-hero {
		position: relative;
		background: linear-gradient(135deg, #040b17 0%, #0a1b3a 45%, #102a5c 100%);
		padding: 5rem 1.5rem 6.5rem;
		border-bottom: 2px solid rgba(245, 158, 11, 0.25);
		overflow: hidden;
		text-align: center;
	}

	/* Ambient Floating Glows */
	.rel-ambient {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
		opacity: 0.45;
		animation: floatOrb 14s ease-in-out infinite alternate;
	}

	.rel-ambient-royal {
		width: 480px;
		height: 480px;
		background: radial-gradient(circle, #1d4ed8 0%, transparent 70%);
		top: -100px;
		left: -80px;
	}

	.rel-ambient-amber {
		width: 420px;
		height: 420px;
		background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
		top: 40px;
		right: -80px;
		animation-duration: 16s;
		animation-delay: -4s;
	}

	.rel-ambient-bottom {
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

	.rel-hero-inner {
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

	.rel-hero-inner.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Hero Titles */
	.rel-hero-title {
		font-size: 2.75rem;
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1.15;
		color: #ffffff;
		margin: 0 0 0.75rem;
	}

	@media (min-width: 640px) {
		.rel-hero-title {
			font-size: 3.75rem;
		}
	}

	@media (min-width: 1024px) {
		.rel-hero-title {
			font-size: 4.5rem;
		}
	}

	.rel-amber-gradient {
		background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		display: inline-block;
		text-shadow: 0 0 30px rgba(245, 158, 11, 0.3);
	}

	.rel-hero-subtitle {
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #60a5fa;
		margin-bottom: 1.25rem;
	}

	.rel-hero-description {
		font-size: 1rem;
		line-height: 1.7;
		color: #cbd5e1;
		max-width: 44rem;
		margin: 0 auto 2.25rem;
		font-weight: 300;
	}

	@media (min-width: 640px) {
		.rel-hero-description {
			font-size: 1.125rem;
		}
	}

	/* Filter Group Buttons */
	.rel-filter-group {
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

	.rel-filter-btn {
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

	.rel-filter-btn:hover {
		color: #fbbf24;
	}

	.rel-filter-btn.is-active {
		background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
		color: #ffffff;
		box-shadow:
			0 4px 15px rgba(29, 78, 216, 0.45),
			0 0 0 1px rgba(245, 158, 11, 0.5);
	}

	/* ==========================================================
	   MAIN LAYOUT & CARDS
	   ========================================================== */
	.rel-main {
		position: relative;
		padding: 3.5rem 1.25rem 6rem;
		z-index: 20;
	}

	.rel-container {
		max-width: 76rem;
		margin: 0 auto;
	}

	.rel-section-block {
		margin-bottom: 3.5rem;
		opacity: 0;
		transform: translateY(28px);
		transition:
			opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s,
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
	}

	.rel-section-block.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* General Card Styling */
	.rel-card {
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

	.rel-card:hover {
		transform: translateY(-4px);
		border-color: rgba(59, 130, 246, 0.45);
		box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.8);
	}

	/* Sheen sweeping light effect */
	.rel-card-sheen {
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

	.rel-card:hover .rel-card-sheen {
		left: 150%;
	}

	.rel-card-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.25rem;
	}

	.rel-card-title {
		font-size: 1.75rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #ffffff;
		margin: 0;
	}

	.rel-card-subtitle {
		font-size: 0.875rem;
		color: #94a3b8;
		margin: 0.25rem 0 0;
	}

	/* Gradient Dividers */
	.rel-divider-amber {
		height: 3px;
		width: 100%;
		background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 60%, transparent 100%);
		border-radius: 9999px;
		margin-bottom: 1.75rem;
	}

	.rel-divider-royal {
		height: 3px;
		width: 100%;
		background: linear-gradient(90deg, #2563eb 0%, #60a5fa 60%, transparent 100%);
		border-radius: 9999px;
		margin-bottom: 1.75rem;
	}

	/* Prose & Highlights */
	.rel-prose p {
		font-size: 1rem;
		line-height: 1.85;
		color: #cbd5e1;
		margin: 0 0 1.25rem;
		text-align: justify;
	}

	.rel-prose p:last-child {
		margin-bottom: 0;
	}

	.rel-highlight-amber {
		color: #fbbf24;
		font-weight: 700;
	}

	.rel-highlight-royal {
		color: #93c5fd;
		font-weight: 700;
	}

	/* ==========================================================
	   SECTION 1: DUAL GRID (HERITAGE + CHURCH PHOTO)
	   ========================================================== */
	.rel-grid-dual {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		.rel-grid-dual {
			grid-template-columns: 1.3fr 1fr;
		}
	}

	.rel-heritage-card {
		display: flex;
		flex-direction: column;
	}

	.rel-badges-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		margin-top: auto;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.rel-badge-box {
		background: linear-gradient(155deg, #0b1c3a 0%, #071329 100%);
		border: 1.5px solid rgba(59, 130, 246, 0.3);
		border-radius: 1rem;
		padding: 1rem;
		text-align: center;
		transition: all 0.3s ease;
	}

	.rel-badge-box:hover {
		border-color: #f59e0b;
		transform: translateY(-2px);
	}

	.rel-badge-label {
		display: block;
		font-size: 0.6875rem;
		font-weight: 700;
		color: #94a3b8;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: 0.25rem;
	}

	.rel-badge-val {
		font-size: 1.0625rem;
		font-weight: 800;
		color: #ffffff;
	}

	.rel-val-amber {
		color: #fbbf24;
	}

	/* Church Photo Card */
	.rel-photo-card {
		display: flex;
		flex-direction: column;
	}

	.rel-img-wrapper {
		position: relative;
		border-radius: 1.25rem;
		overflow: hidden;
		border: 1.5px solid rgba(255, 255, 255, 0.12);
		background: #020712;
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
		flex: 1;
		min-height: 240px;
	}

	.rel-full-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.6s ease;
	}

	.rel-photo-card:hover .rel-full-img {
		transform: scale(1.03);
	}

	.rel-photo-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: #94a3b8;
		margin-top: 1rem;
		font-weight: 500;
	}

	.rel-meta-dot {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 9999px;
		background: #f59e0b;
		box-shadow: 0 0 8px #f59e0b;
	}

	/* ==========================================================
	   SECTION 2: FESTIVITIES GRID
	   ========================================================== */
	.rel-fest-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.75rem;
	}

	@media (min-width: 768px) {
		.rel-fest-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.rel-fest-item {
		background: rgba(6, 17, 36, 0.55);
		border: 1px solid rgba(59, 130, 246, 0.25);
		border-radius: 1.25rem;
		padding: 1.5rem;
		transition: all 0.3s ease;
	}

	.rel-fest-item:hover {
		border-color: rgba(245, 158, 11, 0.45);
		transform: translateY(-3px);
	}

	.rel-fest-heading {
		font-size: 1.125rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 0.75rem;
	}

	.rel-fest-desc {
		font-size: 0.875rem;
		line-height: 1.65;
		color: #94a3b8;
		margin: 0;
		text-align: justify;
	}

	/* ==========================================================
	   SECTION 3: DENOMINATIONS GRID
	   ========================================================== */
	.rel-denoms-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	@media (min-width: 640px) {
		.rel-denoms-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.rel-denoms-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.rel-denom-card {
		background: linear-gradient(155deg, #0b1c3a 0%, #071329 100%);
		border: 1.5px solid rgba(59, 130, 246, 0.3);
		border-radius: 1.25rem;
		padding: 1.5rem;
		transition: all 0.3s ease;
	}

	.rel-denom-card:hover {
		transform: translateY(-4px);
		border-color: #2563eb;
		box-shadow: 0 15px 35px -10px rgba(37, 99, 235, 0.3);
	}

	.rel-denom-amber {
		border-color: rgba(245, 158, 11, 0.35);
	}

	.rel-denom-amber:hover {
		border-color: #f59e0b;
		box-shadow: 0 15px 35px -10px rgba(245, 158, 11, 0.35);
	}

	.rel-denom-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		margin-bottom: 0.65rem;
	}

	.rel-denom-title {
		font-size: 1.0625rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0;
	}


	.rel-denom-desc {
		font-size: 0.8125rem;
		line-height: 1.6;
		color: #94a3b8;
		margin: 0;
	}

	/* ==========================================================
	   SECTION 4: TIMELINE / MILESTONES
	   ========================================================== */
	.rel-timeline {
		position: relative;
		padding-left: 2rem;
		margin: 1.5rem 0;
	}

	.rel-timeline::before {
		content: '';
		position: absolute;
		left: 0.45rem;
		top: 0.5rem;
		bottom: 0.5rem;
		width: 2px;
		background: linear-gradient(180deg, #f59e0b 0%, #2563eb 100%);
		border-radius: 9999px;
	}

	.rel-timeline-item {
		position: relative;
		margin-bottom: 2rem;
	}

	.rel-timeline-item:last-child {
		margin-bottom: 0;
	}

	.rel-timeline-node {
		position: absolute;
		left: -2rem;
		top: 0.25rem;
		width: 1rem;
		height: 1rem;
		border-radius: 9999px;
		background: #061124;
		border: 2px solid #f59e0b;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
	}

	.rel-node-dot {
		width: 0.35rem;
		height: 0.35rem;
		border-radius: 9999px;
		background: #fbbf24;
	}

	.rel-timeline-content {
		background: rgba(6, 17, 36, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1rem;
		padding: 1.25rem 1.5rem;
		transition: border-color 0.25s ease;
	}

	.rel-timeline-content:hover {
		border-color: rgba(59, 130, 246, 0.4);
	}

	.rel-timeline-date {
		display: inline-block;
		font-size: 0.6875rem;
		font-weight: 700;
		color: #f59e0b;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 0.35rem;
	}

	.rel-timeline-title {
		font-size: 1.0625rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 0.5rem;
	}

	.rel-timeline-desc {
		font-size: 0.875rem;
		line-height: 1.65;
		color: #94a3b8;
		margin: 0;
		text-align: justify;
	}

	.rel-source-note {
		font-size: 0.75rem;
		font-style: italic;
		color: #94a3b8;
		margin: 2rem 0 0;
	}
</style>
