<script>
	import { onMount } from 'svelte';

	let visible = $state(false);
	let activeTab = $state('all'); // 'all' | 'profile' | 'phrasebook' | 'education'
	let searchQuery = $state('');
	let selectedCategory = $state('All');

	onMount(() => {
		visible = true;
	});

	const categories = ['All', 'Greetings', 'Dining & Shopping', 'Directions', 'Useful Expressions'];

	const phrases = [
		{
			english: 'Good morning',
			tagalog: 'Magandang umaga',
			waray: 'Maupay nga aga',
			category: 'Greetings'
		},
		{
			english: 'Good afternoon',
			tagalog: 'Magandang hapon',
			waray: 'Maupay nga kulop',
			category: 'Greetings'
		},
		{
			english: 'Good evening',
			tagalog: 'Magandang gabi',
			waray: 'Maupay nga gab-i',
			category: 'Greetings'
		},
		{
			english: 'Thank you very much',
			tagalog: 'Maraming salamat',
			waray: 'Damo nga salamat',
			category: 'Useful Expressions'
		},
		{
			english: 'How are you?',
			tagalog: 'Kumusta ka?',
			waray: 'Kumusta ka?',
			category: 'Greetings'
		},
		{
			english: 'I am fine, thank you',
			tagalog: 'Mabuti naman, salamat',
			waray: 'Maupay man, salamat',
			category: 'Useful Expressions'
		},
		{
			english: 'What is your name?',
			tagalog: 'Ano ang pangalan mo?',
			waray: 'Ano ang ngaran mo?',
			category: 'Greetings'
		},
		{
			english: 'How much is this?',
			tagalog: 'Magkano ito?',
			waray: 'Tagpira ini?',
			category: 'Dining & Shopping'
		},
		{
			english: 'Where is the municipal hall?',
			tagalog: 'Saan ang munisipyo?',
			waray: 'Hain an munisipyo?',
			category: 'Directions'
		},
		{
			english: 'Delicious',
			tagalog: 'Masarap',
			waray: 'Makarasa',
			category: 'Dining & Shopping'
		},
		{
			english: 'Yes',
			tagalog: 'Oo',
			waray: 'Oo',
			category: 'Useful Expressions'
		},
		{
			english: 'No',
			tagalog: 'Hindi',
			waray: 'Dire',
			category: 'Useful Expressions'
		},
		{
			english: 'Goodbye',
			tagalog: 'Paalam',
			waray: 'Sige una na ako / Babay',
			category: 'Greetings'
		}
	];

	// Filtered phrases computed reactivity
	let filteredPhrases = $derived(
		phrases.filter((phrase) => {
			const matchesCategory = selectedCategory === 'All' || phrase.category === selectedCategory;
			const matchesSearch =
				phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
				phrase.tagalog.toLowerCase().includes(searchQuery.toLowerCase()) ||
				phrase.waray.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		})
	);
</script>

<svelte:head>
	<title>Language & Communication | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Linguistic profile of Tanauan, Leyte. Learn about Waray-Waray, Filipino, and English usage, including an interactive language phrasebook."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="lang-root">
	<!-- Hero Section with Royal Blue & Amber Ambient Atmosphere -->
	<header class="lang-hero">
		<div class="lang-ambient lang-ambient-royal"></div>
		<div class="lang-ambient lang-ambient-amber"></div>
		<div class="lang-ambient lang-ambient-bottom"></div>

		<div class="lang-hero-inner" class:is-visible={visible}>
			<h1 class="lang-hero-title">
				Language &amp; <span class="lang-amber-gradient">Communication</span>
			</h1>

			<p class="lang-hero-subtitle">
				Municipality of Tanauan, Leyte &bull; Bungto han Kamag-araman
			</p>

			<p class="lang-hero-description">
				Discover Tanauan's rich linguistic heritage, widespread multilingual literacy, and interactive
				Waray-Waray phrasebook celebrating the cultural voice of our people.
			</p>

			<!-- Interactive Section Selector -->
			<div class="lang-filter-group" role="tablist" aria-label="Language sections">
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'all'}
					class="lang-filter-btn"
					class:is-active={activeTab === 'all'}
					onclick={() => (activeTab = 'all')}
				>
					Complete Overview
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'profile'}
					class="lang-filter-btn"
					class:is-active={activeTab === 'profile'}
					onclick={() => (activeTab = 'profile')}
				>
					Linguistic Profile
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'phrasebook'}
					class="lang-filter-btn"
					class:is-active={activeTab === 'phrasebook'}
					onclick={() => (activeTab = 'phrasebook')}
				>
					Phrasebook
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={activeTab === 'education'}
					class="lang-filter-btn"
					class:is-active={activeTab === 'education'}
					onclick={() => (activeTab = 'education')}
				>
					Education &amp; Media
				</button>
			</div>
		</div>
	</header>

	<!-- Main Body Container -->
	<main class="lang-main">
		<div class="lang-container">

			<!-- SECTION 1: Waray-Waray & Linguistic Distribution -->
			{#if activeTab === 'all' || activeTab === 'profile'}
				<section class="lang-section-block" class:is-visible={visible}>
					<div class="lang-grid-dual">

						<!-- Narrative Card -->
						<div class="lang-card lang-narrative-card">
							<div class="lang-card-sheen"></div>
							<div class="lang-card-head">
								<div>
									<h2 class="lang-card-title">Waray-Waray: The Soul of Tanauan</h2>
									<p class="lang-card-subtitle">Cultural bedrock of communal life and oral heritage</p>
								</div>
							</div>

							<div class="lang-divider-amber"></div>

							<div class="lang-prose">
								<p>
									<strong class="lang-highlight-amber">Waray-Waray</strong> (specifically the Leyte-Waray
									dialect variant) is the native mother tongue spoken by virtually the entire population of
									Tanauan. It serves as the bedrock of everyday social interaction, commerce, folk culture,
									and familial bonds.
								</p>
								<p>
									Known for its expressive phonetic cadence and extensive vocabulary, Waray-Waray connects
									contemporary Tanauanons directly to their ancestral roots across Eastern Visayas. It is
									spoken in homes, primary school classrooms, and community civic assemblies.
								</p>
							</div>

							<div class="lang-chips-row">
								<div class="lang-chip-box">
									<span class="lang-chip-label">Language Family</span>
									<span class="lang-chip-val">Austronesian (Malayo-Polynesian)</span>
								</div>
								<div class="lang-chip-box">
									<span class="lang-chip-label">Local Subgroup</span>
									<span class="lang-chip-val lang-val-amber">Leyte-Waray Dialect</span>
								</div>
							</div>
						</div>

						<!-- Literacy Distribution Card -->
						<div class="lang-card lang-stats-card">
							<div class="lang-card-sheen"></div>
							<div class="lang-card-head">
								<div>
									<h2 class="lang-card-title">Linguistic Adaptability</h2>
									<p class="lang-card-subtitle">Functional multilingual literacy across Tanauan</p>
								</div>
							</div>

							<div class="lang-divider-royal"></div>

							<div class="lang-bars-list">
								<!-- Waray-Waray -->
								<div class="lang-bar-item">
									<div class="lang-bar-header">
										<span class="lang-bar-name">Waray-Waray (Native Language)</span>
										<span class="lang-bar-pct lang-val-royal">98.5%</span>
									</div>
									<div class="lang-track">
										<div class="lang-fill lang-fill-royal" style="width: 98.5%;"></div>
									</div>
								</div>

								<!-- Filipino/Tagalog -->
								<div class="lang-bar-item">
									<div class="lang-bar-header">
										<span class="lang-bar-name">Filipino / Tagalog (National Bilingual)</span>
										<span class="lang-bar-pct lang-val-amber">92.0%</span>
									</div>
									<div class="lang-track">
										<div class="lang-fill lang-fill-amber" style="width: 92%;"></div>
									</div>
								</div>

								<!-- English -->
								<div class="lang-bar-item">
									<div class="lang-bar-header">
										<span class="lang-bar-name">English (Commerce &amp; Higher Education)</span>
										<span class="lang-bar-pct lang-val-emerald">85.5%</span>
									</div>
									<div class="lang-track">
										<div class="lang-fill lang-fill-emerald" style="width: 85.5%;"></div>
									</div>
								</div>
							</div>

							<p class="lang-note">
								* Statistical estimates derived from municipal educational records and regional demographic profiles indicating exceptionally high levels of functional multilingual literacy.
							</p>
						</div>

					</div>
				</section>
			{/if}

			<!-- SECTION 2: Interactive Phrasebook -->
			{#if activeTab === 'all' || activeTab === 'phrasebook'}
				<section class="lang-section-block" class:is-visible={visible}>
					<div class="lang-card">
						<div class="lang-card-sheen"></div>
						<div class="lang-card-head">
							<div>
								<h2 class="lang-card-title">Interactive Waray-Waray Phrasebook</h2>
								<p class="lang-card-subtitle">
									Everyday vocabulary, practical greetings, and useful conversational expressions
								</p>
							</div>
						</div>

						<div class="lang-divider-amber"></div>

						<!-- Filter & Search Controls -->
						<div class="lang-controls">
							<div class="lang-cats-pills">
								{#each categories as category}
									<button
										type="button"
										onclick={() => (selectedCategory = category)}
										class="lang-cat-btn"
										class:is-active={selectedCategory === category}
									>
										{category}
									</button>
								{/each}
							</div>

							<div class="lang-search-wrapper">
								<input
									type="text"
									bind:value={searchQuery}
									placeholder="Search translations in English, Tagalog, or Waray..."
									class="lang-search-input"
								/>
							</div>
						</div>

						<!-- Phrase Table -->
						<div class="lang-table-wrapper">
							<table class="lang-table">
								<thead>
									<tr>
										<th>English</th>
										<th>Tagalog / Filipino</th>
										<th class="lang-th-waray">Waray-Waray</th>
										<th>Category</th>
									</tr>
								</thead>
								<tbody>
									{#if filteredPhrases.length > 0}
										{#each filteredPhrases as phrase}
											<tr>
												<td class="lang-td-english">{phrase.english}</td>
												<td class="lang-td-tagalog">{phrase.tagalog}</td>
												<td class="lang-td-waray">{phrase.waray}</td>
												<td>
													<span class="lang-category-pill">{phrase.category}</span>
												</td>
											</tr>
										{/each}
									{:else}
										<tr>
											<td colspan="4" class="lang-empty-row">
												No phrases found matching "{searchQuery}".
											</td>
										</tr>
									{/if}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			{/if}

			<!-- SECTION 3: Educational and Cultural Sections -->
			{#if activeTab === 'all' || activeTab === 'education'}
				<section class="lang-section-block" class:is-visible={visible}>
					<div class="lang-grid-dual">
						<!-- MTB-MLE in Schools -->
						<div class="lang-card">
							<div class="lang-card-sheen"></div>
							<div class="lang-card-head">
								<div>
									<h2 class="lang-card-title">MTB-MLE Program in Schools</h2>
									<p class="lang-card-subtitle">Mother Tongue-Based Multilingual Education</p>
								</div>
							</div>

							<div class="lang-divider-royal"></div>

							<div class="lang-prose">
								<p>
									In strict alignment with the Department of Education (DepEd), Tanauan elementary schools
									systematically implement the <strong class="lang-highlight-royal">Mother Tongue-Based Multilingual Education (MTB-MLE)</strong>
									curriculum framework.
								</p>
								<p>
									From Kindergarten through Grade 3, Waray-Waray is utilized as the primary medium of instruction,
									enabling young learners to build solid literacy, cognitive foundations, and cultural pride before
									gradually transitioning to Filipino and English in intermediate grades.
								</p>
							</div>
						</div>

						<!-- Governance & Media Reach -->
						<div class="lang-card">
							<div class="lang-card-sheen"></div>
							<div class="lang-card-head">
								<div>
									<h2 class="lang-card-title">Governance &amp; Media Reach</h2>
									<p class="lang-card-subtitle">Bilingual administration &amp; community engagement</p>
								</div>
							</div>

							<div class="lang-divider-amber"></div>

							<div class="lang-prose">
								<p>
									Local public consultations, health advisories, and disaster alerts are widely communicated in
									<strong class="lang-highlight-amber">Waray-Waray</strong> to guarantee seamless comprehension across
									all 54 barangays.
								</p>
								<p>
									Official municipal documentation, municipal ordinances, and inter-agency correspondences are maintained
									in <strong class="lang-highlight-royal">English</strong>, with regional media utilizing bilingual broadcasts
									for accessible civic information.
								</p>
							</div>
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
	.lang-root {
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
	.lang-hero {
		position: relative;
		background: linear-gradient(135deg, #040b17 0%, #0a1b3a 45%, #102a5c 100%);
		padding: 5rem 1.5rem 6.5rem;
		border-bottom: 2px solid rgba(245, 158, 11, 0.25);
		overflow: hidden;
		text-align: center;
	}

	/* Ambient Floating Glows */
	.lang-ambient {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		pointer-events: none;
		opacity: 0.45;
		animation: floatOrb 14s ease-in-out infinite alternate;
	}

	.lang-ambient-royal {
		width: 480px;
		height: 480px;
		background: radial-gradient(circle, #1d4ed8 0%, transparent 70%);
		top: -100px;
		left: -80px;
	}

	.lang-ambient-amber {
		width: 420px;
		height: 420px;
		background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
		top: 40px;
		right: -80px;
		animation-duration: 16s;
		animation-delay: -4s;
	}

	.lang-ambient-bottom {
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

	.lang-hero-inner {
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

	.lang-hero-inner.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Hero Titles */
	.lang-hero-title {
		font-size: 2.75rem;
		font-weight: 900;
		letter-spacing: -0.03em;
		line-height: 1.15;
		color: #ffffff;
		margin: 0 0 0.75rem;
	}

	@media (min-width: 640px) {
		.lang-hero-title {
			font-size: 3.75rem;
		}
	}

	@media (min-width: 1024px) {
		.lang-hero-title {
			font-size: 4.5rem;
		}
	}

	.lang-amber-gradient {
		background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		display: inline-block;
		text-shadow: 0 0 30px rgba(245, 158, 11, 0.3);
	}

	.lang-hero-subtitle {
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #60a5fa;
		margin-bottom: 1.25rem;
	}

	.lang-hero-description {
		font-size: 1rem;
		line-height: 1.7;
		color: #cbd5e1;
		max-width: 44rem;
		margin: 0 auto 2.25rem;
		font-weight: 300;
	}

	@media (min-width: 640px) {
		.lang-hero-description {
			font-size: 1.125rem;
		}
	}

	/* Filter Group Buttons */
	.lang-filter-group {
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

	.lang-filter-btn {
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

	.lang-filter-btn:hover {
		color: #fbbf24;
	}

	.lang-filter-btn.is-active {
		background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
		color: #ffffff;
		box-shadow:
			0 4px 15px rgba(29, 78, 216, 0.45),
			0 0 0 1px rgba(245, 158, 11, 0.5);
	}

	/* ==========================================================
	   MAIN LAYOUT & CARDS
	   ========================================================== */
	.lang-main {
		position: relative;
		padding: 3.5rem 1.25rem 6rem;
		z-index: 20;
	}

	.lang-container {
		max-width: 76rem;
		margin: 0 auto;
	}

	.lang-section-block {
		margin-bottom: 3.5rem;
		opacity: 0;
		transform: translateY(28px);
		transition:
			opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s,
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
	}

	.lang-section-block.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* General Card Styling */
	.lang-card {
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

	.lang-card:hover {
		transform: translateY(-4px);
		border-color: rgba(59, 130, 246, 0.45);
		box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.8);
	}

	/* Sheen sweeping light effect */
	.lang-card-sheen {
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

	.lang-card:hover .lang-card-sheen {
		left: 150%;
	}

	.lang-card-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.25rem;
	}

	.lang-card-title {
		font-size: 1.75rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #ffffff;
		margin: 0;
	}

	.lang-card-subtitle {
		font-size: 0.875rem;
		color: #94a3b8;
		margin: 0.25rem 0 0;
	}

	/* Gradient Dividers */
	.lang-divider-amber {
		height: 3px;
		width: 100%;
		background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 60%, transparent 100%);
		border-radius: 9999px;
		margin-bottom: 1.75rem;
	}

	.lang-divider-royal {
		height: 3px;
		width: 100%;
		background: linear-gradient(90deg, #2563eb 0%, #60a5fa 60%, transparent 100%);
		border-radius: 9999px;
		margin-bottom: 1.75rem;
	}

	/* Dual Grid Layout */
	.lang-grid-dual {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		.lang-grid-dual {
			grid-template-columns: 1.2fr 1fr;
		}
	}

	/* Prose & Highlights */
	.lang-prose p {
		font-size: 1rem;
		line-height: 1.85;
		color: #cbd5e1;
		margin: 0 0 1.25rem;
		text-align: justify;
	}

	.lang-prose p:last-child {
		margin-bottom: 0;
	}

	.lang-highlight-amber {
		color: #fbbf24;
		font-weight: 700;
	}

	.lang-highlight-royal {
		color: #93c5fd;
		font-weight: 700;
	}

	/* Chips Row */
	.lang-chips-row {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1rem;
		margin-top: 1.75rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	@media (min-width: 640px) {
		.lang-chips-row {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.lang-chip-box {
		background: linear-gradient(155deg, #0b1c3a 0%, #071329 100%);
		border: 1.5px solid rgba(59, 130, 246, 0.3);
		border-radius: 1rem;
		padding: 1rem;
		text-align: center;
		transition: all 0.3s ease;
	}

	.lang-chip-box:hover {
		border-color: #f59e0b;
		transform: translateY(-2px);
	}

	.lang-chip-label {
		display: block;
		font-size: 0.6875rem;
		font-weight: 700;
		color: #94a3b8;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin-bottom: 0.25rem;
	}

	.lang-chip-val {
		font-size: 0.9375rem;
		font-weight: 800;
		color: #ffffff;
	}

	.lang-val-amber {
		color: #fbbf24;
	}

	.lang-val-royal {
		color: #60a5fa;
	}

	.lang-val-emerald {
		color: #34d399;
	}

	/* Progress Bars */
	.lang-bars-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.lang-bar-item {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.lang-bar-header {
		display: flex;
		justify-content: space-between;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.lang-bar-name {
		color: #cbd5e1;
	}

	.lang-bar-pct {
		font-weight: 800;
		font-variant-numeric: tabular-nums;
	}

	.lang-track {
		width: 100%;
		height: 0.625rem;
		background: rgba(14, 34, 70, 0.8);
		border-radius: 9999px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.lang-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.lang-fill-royal {
		background: linear-gradient(90deg, #2563eb 0%, #60a5fa 100%);
		box-shadow: 0 0 10px rgba(37, 99, 235, 0.4);
	}

	.lang-fill-amber {
		background: linear-gradient(90deg, #d97706 0%, #fbbf24 100%);
		box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
	}

	.lang-fill-emerald {
		background: linear-gradient(90deg, #059669 0%, #34d399 100%);
		box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
	}

	.lang-note {
		font-size: 0.75rem;
		font-style: italic;
		color: #94a3b8;
		margin-top: 1.5rem;
		line-height: 1.5;
	}

	/* ==========================================================
	   SECTION 2: PHRASEBOOK STYLES
	   ========================================================== */
	.lang-controls {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		margin-bottom: 1.75rem;
	}

	@media (min-width: 1024px) {
		.lang-controls {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
	}

	.lang-cats-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.lang-cat-btn {
		font-family: 'Poppins', sans-serif;
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.4rem 1rem;
		border-radius: 9999px;
		border: 1px solid rgba(59, 130, 246, 0.3);
		background: rgba(10, 27, 58, 0.6);
		color: #94a3b8;
		cursor: pointer;
		transition: all 0.25s ease;
	}

	.lang-cat-btn:hover {
		color: #ffffff;
		border-color: #60a5fa;
	}

	.lang-cat-btn.is-active {
		background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
		color: #ffffff;
		border-color: rgba(245, 158, 11, 0.5);
		box-shadow: 0 4px 15px rgba(29, 78, 216, 0.4);
	}

	.lang-search-wrapper {
		width: 100%;
		max-width: 24rem;
	}

	.lang-search-input {
		width: 100%;
		font-family: 'Poppins', sans-serif;
		font-size: 0.875rem;
		padding: 0.6rem 1.15rem;
		background: rgba(6, 17, 36, 0.7);
		border: 1.5px solid rgba(59, 130, 246, 0.35);
		border-radius: 9999px;
		color: #ffffff;
		outline: none;
		transition: border-color 0.25s ease, box-shadow 0.25s ease;
	}

	.lang-search-input:focus {
		border-color: #f59e0b;
		box-shadow: 0 0 15px rgba(245, 158, 11, 0.25);
	}

	.lang-search-input::placeholder {
		color: #64748b;
	}

	/* Phrasebook Table */
	.lang-table-wrapper {
		overflow-x: auto;
		border-radius: 1rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: rgba(6, 17, 36, 0.6);
	}

	.lang-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.9375rem;
		text-align: left;
	}

	.lang-table thead th {
		padding: 1rem 1.25rem;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #93c5fd;
		background: rgba(14, 34, 70, 0.6);
		border-bottom: 1px solid rgba(59, 130, 246, 0.25);
	}

	.lang-table thead .lang-th-waray {
		color: #fbbf24;
		background: rgba(245, 158, 11, 0.12);
	}

	.lang-table tbody td {
		padding: 1rem 1.25rem;
		color: #cbd5e1;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		transition: background 0.2s ease;
	}

	.lang-table tbody tr:last-child td {
		border-bottom: none;
	}

	.lang-table tbody tr:hover td {
		background: rgba(37, 99, 235, 0.08);
	}

	.lang-td-english {
		font-weight: 600;
		color: #ffffff;
	}

	.lang-td-tagalog {
		color: #94a3b8;
	}

	.lang-td-waray {
		font-weight: 800;
		color: #fbbf24;
		background: rgba(245, 158, 11, 0.06);
	}

	.lang-category-pill {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.2rem 0.65rem;
		border-radius: 9999px;
		background: rgba(37, 99, 235, 0.16);
		color: #93c5fd;
		border: 1px solid rgba(59, 130, 246, 0.35);
	}

	.lang-empty-row {
		padding: 2.5rem;
		text-align: center;
		color: #94a3b8;
		font-style: italic;
	}
</style>
