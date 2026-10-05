<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { barangayData } from '$lib/config';

	let visible = $state(false);
	let search = $state('');
	let selectedBarangayName = $state(null);

	// Svelte 5 derived state for filtered list
	let filteredNames = $derived(
		Object.keys(barangayData)
			.filter((name) => name.toLowerCase().includes(search.toLowerCase()))
			.sort()
	);

	let selectedBarangay = $derived(selectedBarangayName ? barangayData[selectedBarangayName] : null);

	// ---------- Modal helpers ----------
	function openModal(name) {
		selectedBarangayName = name;
	}

	function closeModal() {
		selectedBarangayName = null;
	}

	onMount(() => {
		visible = true;

		// Keyboard ESC handling
		const handleKeyDown = (e) => {
			if (e.key === 'Escape' && selectedBarangayName) {
				closeModal();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<svelte:head>
	<title>Barangays of Tanauan | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Official registry of the 54 barangays in the Municipality of Tanauan, Leyte, Philippines. Explore local history, leadership, population, and community portals."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="brgy-root">
	<!-- Hero Section with Royal Blue & Amber Ambient Atmosphere -->
	<header class="brgy-hero">
		<div class="brgy-ambient brgy-ambient-royal"></div>
		<div class="brgy-ambient brgy-ambient-amber"></div>
		<div class="brgy-ambient brgy-ambient-bottom"></div>

		<div class="brgy-hero-inner" class:is-visible={visible}>
			<h1 class="brgy-hero-title">
				Barangays of <span class="brgy-amber-gradient">Tanauan</span>
			</h1>

			<p class="brgy-hero-subtitle">
				Municipality of Tanauan, Leyte &bull; Bungto han Kamag-araman
			</p>

			<p class="brgy-hero-description">
				Official registry and directory of the 54 vibrant barangays comprising the Municipality of Tanauan,
				Leyte. Explore local leadership, historical backgrounds, demographics, and community portals.
			</p>

			<!-- Search & Counter Control Bar -->
			<div class="brgy-search-box">
				<div class="brgy-search-input-wrap">
					<svg class="brgy-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						type="text"
						bind:value={search}
						placeholder="Search by Barangay name (e.g. Bislig, Pago, San Roque)..."
						class="brgy-search-input"
					/>
					{#if search}
						<button
							type="button"
							class="brgy-clear-btn"
							onclick={() => (search = '')}
							aria-label="Clear search"
						>
							&times;
						</button>
					{/if}
				</div>

				<div class="brgy-counter-pill">
					<span class="brgy-counter-dot"></span>
					<span class="brgy-counter-text">
						Showing <strong>{filteredNames.length}</strong> of {Object.keys(barangayData).length} Barangays
					</span>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Body Container -->
	<main class="brgy-main">
		<div class="brgy-container">
			<div class="brgy-grid" class:is-visible={visible}>
				{#if filteredNames.length > 0}
					{#each filteredNames as name}
						{@const item = barangayData[name]}
						<button
							type="button"
							onclick={() => openModal(name)}
							class="brgy-card"
						>
							<div class="brgy-card-sheen"></div>

							<!-- Image Container with Fallback or Official Seal -->
							<div class="brgy-img-wrap" class:has-seal={!!item.logo}>
								{#if item.logo}
									<div class="brgy-seal-container">
										<img
											src={item.logo}
											alt="Official Seal of Barangay {name}"
											class="brgy-seal-img"
											loading="lazy"
										/>
									</div>
								{:else}
									<div class="brgy-img-fallback">
										<svg
											class="brgy-fallback-icon"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="1.5"
												d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
											/>
										</svg>
										<span class="brgy-fallback-caption">Tanauan, Leyte</span>
									</div>

									{#if item.bgImage}
										<img
											src={item.bgImage}
											alt={name}
											class="brgy-card-img"
											loading="lazy"
											onerror={(e) => {
												e.currentTarget.style.display = 'none';
											}}
										/>
									{/if}
								{/if}

								<div class="brgy-img-overlay"></div>
							</div>

							<!-- Card Body -->
							<div class="brgy-card-body">
								<div class="brgy-card-header">
									<h2 class="brgy-card-title">{name}</h2>
								</div>

								<div class="brgy-captain-wrap" title="Punong Barangay">
									<svg class="brgy-captain-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
									<span class="brgy-captain-name">
										{item.captain || 'Punong Barangay'}
									</span>
								</div>

								<div class="brgy-divider-subtle"></div>

								<p class="brgy-history-preview">
									{item.history || 'Historical details registered under the municipal archives of Tanauan.'}
								</p>

								<div class="brgy-card-action">
									<span class="brgy-action-label">View Community Profile</span>
									<svg class="brgy-action-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
									</svg>
								</div>
							</div>
						</button>
					{/each}
				{:else}
					<div class="brgy-empty-state">
						<svg class="brgy-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<h3 class="brgy-empty-title">No Barangays Found</h3>
						<p class="brgy-empty-desc">
							No communities matched "{search}". Please check the spelling or clear the search.
						</p>
						<button
							type="button"
							class="brgy-empty-reset-btn"
							onclick={() => (search = '')}
						>
							Reset Search Filter
						</button>
					</div>
				{/if}
			</div>
		</div>
	</main>
</div>

<!-- ===================================================================
     ROYAL BLUE & AMBER MODAL PROFILE WIDGET
=================================================================== -->
{#if selectedBarangayName}
	<div
		transition:fade={{ duration: 200 }}
		class="brgy-modal-overlay"
		onclick={closeModal}
		role="button"
		tabindex="0"
		onkeydown={(e) => e.key === 'Escape' && closeModal()}
	>
		<!-- Modal Content Box -->
		<div
			transition:fly={{ y: 24, duration: 300, easing: cubicOut }}
			class="brgy-modal-box"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			tabindex="-1"
			role="dialog"
			aria-labelledby="modal-title"
			aria-modal="true"
		>
			<!-- Close Button -->
			<button
				class="brgy-modal-close"
				onclick={closeModal}
				aria-label="Close details"
			>
				<svg class="brgy-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<!-- Scrollable Content Area -->
			<div class="brgy-modal-scroll">
				{#if selectedBarangay.bgImage}
					<div class="brgy-modal-cover">
						<img
							src={selectedBarangay.bgImage}
							alt={selectedBarangayName}
							class="brgy-modal-cover-img"
							onerror={(e) => {
								e.currentTarget.parentElement.style.display = 'none';
							}}
						/>
						<div class="brgy-modal-cover-gradient"></div>
					</div>
				{/if}

				<div class="brgy-modal-body">
					<!-- Title Header with Official Seal Badge -->
					<div class="brgy-modal-head">
						<div class="brgy-modal-title-row">
							{#if selectedBarangay.logo}
								<div class="brgy-modal-seal-badge">
									<img
										src={selectedBarangay.logo}
										alt="Official Seal of Barangay {selectedBarangayName}"
										class="brgy-modal-seal-img"
									/>
								</div>
							{/if}
							<div class="brgy-modal-title-info">
								<span class="brgy-registry-badge">Barangay Registry</span>
								<h2 id="modal-title" class="brgy-modal-title">
									{selectedBarangayName}
								</h2>
								<p class="brgy-modal-subtitle">
									Municipality of Tanauan, Province of Leyte &bull; Region VIII
								</p>
							</div>
						</div>
					</div>

					<!-- Key Metrics / Stats Row -->
					<div class="brgy-modal-stats">
						<div class="brgy-modal-stat-item">
							<span class="brgy-stat-label">Punong Barangay</span>
							<span class="brgy-stat-val brgy-stat-white">{selectedBarangay.captain || '—'}</span>
						</div>
						<div class="brgy-modal-stat-item">
							<span class="brgy-stat-label">Estimated Population</span>
							<span class="brgy-stat-val brgy-stat-amber">{selectedBarangay.population || '—'}</span>
						</div>
						<div class="brgy-modal-stat-item">
							<span class="brgy-stat-label">Official Contact</span>
							<span class="brgy-stat-val brgy-stat-royal" title={selectedBarangay.contact}>
								{selectedBarangay.contact || 'Municipal Hall Trunkline'}
							</span>
						</div>
					</div>

					<div class="brgy-modal-divider"></div>

					<!-- Content Grid -->
					<div class="brgy-modal-content-grid">
						<!-- Left Side: History -->
						<div class="brgy-modal-history-col">
							<h3 class="brgy-section-heading">Historical Background</h3>
							<div class="brgy-prose">
								<p>
									{selectedBarangay.history ||
										'Historical narratives and background chronicles for this barangay are officially cataloged within the local archives and cultural tourism registry of Tanauan, Leyte.'}
								</p>
							</div>
						</div>

						<!-- Right Side: Gallery & Links -->
						<div class="brgy-modal-side-col">
							<!-- Gallery -->
							{#if selectedBarangay.images && selectedBarangay.images.length > 0}
								<div class="brgy-gallery-wrap">
									<h3 class="brgy-section-heading">Community Gallery</h3>
									<div class="brgy-gallery-grid">
										{#each selectedBarangay.images as img, index}
											<div class="brgy-gallery-thumb">
												<img
													src={img}
													alt="{selectedBarangayName} feature {index + 1}"
													class="brgy-thumb-img"
													onerror={(e) => {
														e.currentTarget.parentElement.style.display = 'none';
													}}
												/>
											</div>
										{/each}
									</div>
								</div>
							{/if}

							<!-- Links & Actions -->
							<div class="brgy-portals-wrap">
								<h3 class="brgy-section-heading">Portals &amp; Direct Engagement</h3>
								<div class="brgy-links-list">
									{#if selectedBarangay.website}
										<a
											href={selectedBarangay.website}
											target="_blank"
											rel="noopener noreferrer"
											class="brgy-portal-link"
										>
											<span>Official Web Portal</span>
											<svg class="brgy-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
											</svg>
										</a>
									{/if}
									{#if selectedBarangay.facebook}
										<a
											href={selectedBarangay.facebook}
											target="_blank"
											rel="noopener noreferrer"
											class="brgy-portal-link"
										>
											<span>Barangay Facebook Page</span>
											<svg class="brgy-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
											</svg>
										</a>
									{/if}
									{#if selectedBarangay.contact}
										<a
											href="mailto:{selectedBarangay.contact}"
											class="brgy-contact-btn"
										>
											Send Official Email
										</a>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* ==========================================================
	   POPPINS TYPOGRAPHY & ROYAL/AMBER DESIGN SYSTEM
	   ========================================================== */
	.brgy-root {
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
	.brgy-hero {
		position: relative;
		padding: 4.5rem 1.25rem 3.5rem;
		text-align: center;
		overflow: hidden;
		background: radial-gradient(circle at 50% 20%, #0d2347 0%, #061124 75%);
		border-bottom: 1px solid rgba(59, 130, 246, 0.2);
	}

	.brgy-ambient {
		position: absolute;
		border-radius: 9999px;
		filter: blur(80px);
		pointer-events: none;
		z-index: 1;
	}

	.brgy-ambient-royal {
		top: -10%;
		left: 15%;
		width: 450px;
		height: 450px;
		background: radial-gradient(circle, rgba(29, 78, 216, 0.35) 0%, transparent 70%);
	}

	.brgy-ambient-amber {
		top: 5%;
		right: 15%;
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%);
	}

	.brgy-ambient-bottom {
		bottom: -15%;
		left: 35%;
		width: 500px;
		height: 300px;
		background: radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, transparent 70%);
	}

	.brgy-hero-inner {
		position: relative;
		max-width: 54rem;
		margin: 0 auto;
		z-index: 10;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.brgy-hero-inner.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	.brgy-hero-title {
		font-size: 2.75rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: #ffffff;
		line-height: 1.15;
		margin: 0 0 0.875rem;
	}

	@media (min-width: 640px) {
		.brgy-hero-title {
			font-size: 3.5rem;
		}
	}

	.brgy-amber-gradient {
		background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fcd34d 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		display: inline-block;
	}

	.brgy-hero-subtitle {
		font-size: 0.9375rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #93c5fd;
		margin: 0 0 1.25rem;
	}

	.brgy-hero-description {
		font-size: 1.0625rem;
		line-height: 1.7;
		color: #cbd5e1;
		margin: 0 auto 2.5rem;
		text-align: justify;
		max-width: 46rem;
	}

	/* Search & Counter Control Bar */
	.brgy-search-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.25rem;
		width: 100%;
		max-width: 44rem;
		margin: 0 auto;
	}

	.brgy-search-input-wrap {
		position: relative;
		width: 100%;
	}

	.brgy-search-icon {
		position: absolute;
		left: 1.125rem;
		top: 50%;
		transform: translateY(-50%);
		width: 1.25rem;
		height: 1.25rem;
		color: #60a5fa;
		pointer-events: none;
	}

	.brgy-search-input {
		width: 100%;
		padding: 0.95rem 2.75rem 0.95rem 3.125rem;
		background: rgba(10, 25, 54, 0.75);
		backdrop-filter: blur(12px);
		border: 1.5px solid rgba(59, 130, 246, 0.35);
		border-radius: 9999px;
		color: #ffffff;
		font-size: 0.9375rem;
		font-family: inherit;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.05);
		outline: none;
		transition: all 0.3s ease;
	}

	.brgy-search-input::placeholder {
		color: #64748b;
	}

	.brgy-search-input:focus {
		border-color: #f59e0b;
		box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25), 0 10px 30px rgba(0, 0, 0, 0.5);
		background: rgba(14, 34, 70, 0.9);
	}

	.brgy-clear-btn {
		position: absolute;
		right: 1.125rem;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.1);
		border: none;
		color: #cbd5e1;
		font-size: 1.25rem;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 9999px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		line-height: 1;
		transition: all 0.2s ease;
	}

	.brgy-clear-btn:hover {
		background: rgba(245, 158, 11, 0.25);
		color: #fbbf24;
	}

	.brgy-counter-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.375rem 1rem;
		border-radius: 9999px;
		background: rgba(14, 34, 70, 0.6);
		border: 1px solid rgba(59, 130, 246, 0.25);
		font-size: 0.8125rem;
		color: #94a3b8;
	}

	.brgy-counter-dot {
		width: 7px;
		height: 7px;
		border-radius: 9999px;
		background-color: #10b981;
		box-shadow: 0 0 8px #10b981;
	}

	.brgy-counter-text strong {
		color: #fbbf24;
	}

	/* ==========================================================
	   MAIN CONTENT CONTAINER & CARD GRID
	   ========================================================== */
	.brgy-main {
		position: relative;
		padding: 3.5rem 1.25rem 6rem;
		z-index: 20;
	}

	.brgy-container {
		max-width: 76rem;
		margin: 0 auto;
	}

	.brgy-grid {
		display: grid;
		gap: 1.75rem;
		grid-template-columns: 1fr;
		opacity: 0;
		transform: translateY(24px);
		transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s,
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
	}

	.brgy-grid.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	@media (min-width: 640px) {
		.brgy-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.brgy-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* Card Component */
	.brgy-card {
		position: relative;
		display: flex;
		flex-direction: column;
		background: linear-gradient(165deg, #0e2246 0%, #091733 60%, #061127 100%);
		border: 1.5px solid rgba(59, 130, 246, 0.22);
		border-radius: 1.5rem;
		padding: 1.25rem;
		text-align: left;
		cursor: pointer;
		box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.65);
		transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			border-color 0.35s ease,
			box-shadow 0.35s ease;
		overflow: hidden;
		width: 100%;
		font-family: inherit;
	}

	.brgy-card:hover {
		transform: translateY(-5px);
		border-color: rgba(245, 158, 11, 0.55);
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 25px rgba(245, 158, 11, 0.12);
	}

	.brgy-card-sheen {
		position: absolute;
		top: 0;
		left: -150%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
		transform: skewX(-20deg);
		transition: left 0.8s ease;
		pointer-events: none;
		z-index: 10;
	}

	.brgy-card:hover .brgy-card-sheen {
		left: 150%;
	}

	/* Card Cover Image */
	.brgy-img-wrap {
		position: relative;
		height: 10.5rem;
		width: 100%;
		border-radius: 1rem;
		overflow: hidden;
		background: linear-gradient(135deg, #0c1e3d 0%, #050d1e 100%);
		border: 1px solid rgba(59, 130, 246, 0.2);
	}

	.brgy-img-fallback {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		color: rgba(255, 255, 255, 0.2);
	}

	.brgy-fallback-icon {
		width: 2.25rem;
		height: 2.25rem;
	}

	.brgy-fallback-caption {
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgba(147, 197, 253, 0.4);
	}

	.brgy-card-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
		z-index: 2;
	}

	.brgy-card:hover .brgy-card-img {
		transform: scale(1.05);
	}

	.brgy-img-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 50%, rgba(6, 17, 39, 0.85) 100%);
		z-index: 3;
		pointer-events: none;
	}

	/* Official Seal in Card Cover */
	.brgy-seal-container {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: radial-gradient(circle at center, rgba(29, 78, 216, 0.35) 0%, rgba(6, 17, 36, 0.95) 75%);
		z-index: 2;
	}

	.brgy-seal-img {
		width: 6.25rem;
		height: 6.25rem;
		object-fit: contain;
		filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.65)) drop-shadow(0 0 12px rgba(245, 158, 11, 0.35));
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
	}

	.brgy-card:hover .brgy-seal-img {
		transform: scale(1.08);
		filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 20px rgba(245, 158, 11, 0.6));
	}

	/* Card Body Content */
	.brgy-card-body {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 1.125rem 0.25rem 0.25rem;
	}

	.brgy-card-header {
		margin-bottom: 0.625rem;
	}

	.brgy-card-title {
		font-size: 1.3125rem;
		font-weight: 700;
		color: #ffffff;
		letter-spacing: -0.02em;
		margin: 0;
		transition: color 0.25s ease;
	}

	.brgy-card:hover .brgy-card-title {
		color: #fbbf24;
	}

	.brgy-captain-wrap {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.brgy-captain-icon {
		width: 1.15rem;
		height: 1.15rem;
		color: #fbbf24;
		flex-shrink: 0;
	}

	.brgy-captain-name {
		font-size: 1.0625rem;
		font-weight: 600;
		color: #f1f5f9;
		letter-spacing: -0.01em;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.brgy-card:hover .brgy-captain-name {
		color: #fbbf24;
	}

	.brgy-divider-subtle {
		height: 1px;
		width: 100%;
		background: rgba(59, 130, 246, 0.15);
		margin: 0.875rem 0;
	}

	.brgy-history-preview {
		font-size: 0.8125rem;
		line-height: 1.6;
		color: #94a3b8;
		text-align: justify;
		margin: 0 0 1.125rem;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		flex: 1;
	}

	.brgy-card-action {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 0.75rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		color: #93c5fd;
		font-size: 0.8125rem;
		font-weight: 600;
		transition: color 0.25s ease;
	}

	.brgy-card:hover .brgy-card-action {
		color: #fbbf24;
	}

	.brgy-action-arrow {
		width: 1.1rem;
		height: 1.1rem;
		transform: translateX(0);
		transition: transform 0.3s ease;
	}

	.brgy-card:hover .brgy-action-arrow {
		transform: translateX(4px);
	}

	/* Empty Search Results */
	.brgy-empty-state {
		grid-column: 1 / -1;
		padding: 4.5rem 1.5rem;
		text-align: center;
		background: linear-gradient(165deg, #0e2246 0%, #091733 100%);
		border: 1.5px dashed rgba(59, 130, 246, 0.3);
		border-radius: 1.75rem;
	}

	.brgy-empty-icon {
		width: 3.5rem;
		height: 3.5rem;
		color: #64748b;
		margin: 0 auto 1rem;
	}

	.brgy-empty-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 0.5rem;
	}

	.brgy-empty-desc {
		font-size: 0.875rem;
		color: #94a3b8;
		max-width: 24rem;
		margin: 0 auto 1.5rem;
		line-height: 1.5;
	}

	.brgy-empty-reset-btn {
		display: inline-block;
		padding: 0.65rem 1.5rem;
		border-radius: 9999px;
		background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
		border: 1px solid rgba(245, 158, 11, 0.4);
		color: #ffffff;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.25s ease;
	}

	.brgy-empty-reset-btn:hover {
		background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
		box-shadow: 0 4px 15px rgba(29, 78, 216, 0.5);
	}

	/* ==========================================================
	   MODAL PROFILE WIDGET
	   ========================================================== */
	.brgy-modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(3, 7, 18, 0.85);
		backdrop-filter: blur(12px);
		padding: 1.25rem;
	}

	.brgy-modal-box {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 52rem;
		max-height: 88vh;
		background: linear-gradient(165deg, #0e2246 0%, #091733 60%, #061127 100%);
		border: 1.5px solid rgba(59, 130, 246, 0.35);
		border-radius: 1.75rem;
		box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(29, 78, 216, 0.25);
		overflow: hidden;
		color: #e2e8f0;
	}

	.brgy-modal-close {
		position: absolute;
		top: 1.125rem;
		right: 1.125rem;
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 9999px;
		background: rgba(14, 34, 70, 0.85);
		border: 1px solid rgba(59, 130, 246, 0.35);
		color: #cbd5e1;
		cursor: pointer;
		backdrop-filter: blur(8px);
		transition: all 0.25s ease;
	}

	.brgy-modal-close:hover {
		background: #f59e0b;
		border-color: #fbbf24;
		color: #061124;
		transform: rotate(90deg);
	}

	.brgy-close-icon {
		width: 1.125rem;
		height: 1.125rem;
	}

	.brgy-modal-scroll {
		flex: 1;
		overflow-y: auto;
	}

	/* Scrollbar styling */
	.brgy-modal-scroll::-webkit-scrollbar {
		width: 6px;
	}

	.brgy-modal-scroll::-webkit-scrollbar-track {
		background: #061124;
	}

	.brgy-modal-scroll::-webkit-scrollbar-thumb {
		background: #1e3a8a;
		border-radius: 9999px;
	}

	.brgy-modal-scroll::-webkit-scrollbar-thumb:hover {
		background: #3b82f6;
	}

	.brgy-modal-cover {
		position: relative;
		height: 13rem;
		width: 100%;
		overflow: hidden;
		background: #020712;
	}

	.brgy-modal-cover-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.brgy-modal-cover-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 40%, #091733 100%);
		pointer-events: none;
	}

	.brgy-modal-body {
		padding: 1.75rem 2rem 2.25rem;
	}

	.brgy-modal-head {
		text-align: left;
		margin-bottom: 1.5rem;
	}

	.brgy-modal-title-row {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.brgy-modal-seal-badge {
		width: 5.5rem;
		height: 5.5rem;
		flex-shrink: 0;
		border-radius: 9999px;
		background: rgba(10, 25, 54, 0.7);
		border: 2px solid rgba(245, 158, 11, 0.5);
		padding: 0.25rem;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 20px rgba(245, 158, 11, 0.25);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.brgy-modal-seal-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		border-radius: 9999px;
	}

	.brgy-modal-title-info {
		flex: 1;
		min-width: 0;
	}

	@media (max-width: 640px) {
		.brgy-modal-title-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.875rem;
		}

		.brgy-modal-seal-badge {
			width: 4.5rem;
			height: 4.5rem;
		}
	}

	.brgy-registry-badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		background: rgba(245, 158, 11, 0.15);
		border: 1px solid rgba(245, 158, 11, 0.35);
		color: #fbbf24;
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin-bottom: 0.625rem;
	}

	.brgy-modal-title {
		font-size: 2rem;
		font-weight: 800;
		color: #ffffff;
		letter-spacing: -0.02em;
		margin: 0 0 0.25rem;
	}

	@media (min-width: 640px) {
		.brgy-modal-title {
			font-size: 2.375rem;
		}
	}

	.brgy-modal-subtitle {
		font-size: 0.875rem;
		color: #94a3b8;
		margin: 0;
	}

	/* Stats Row in Modal */
	.brgy-modal-stats {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		background: rgba(6, 17, 39, 0.55);
		border: 1px solid rgba(59, 130, 246, 0.2);
		border-radius: 1.125rem;
		padding: 1.125rem 1.5rem;
		margin-bottom: 1.5rem;
	}

	@media (min-width: 640px) {
		.brgy-modal-stats {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.brgy-modal-stat-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.brgy-stat-label {
		font-size: 0.6875rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #64748b;
	}

	.brgy-stat-val {
		font-size: 0.9375rem;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.brgy-stat-white {
		color: #ffffff;
	}

	.brgy-stat-amber {
		color: #fbbf24;
	}

	.brgy-stat-royal {
		color: #93c5fd;
	}

	.brgy-modal-divider {
		height: 2px;
		width: 100%;
		background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, transparent 100%);
		border-radius: 9999px;
		margin-bottom: 1.75rem;
	}

	/* Modal Content Grid */
	.brgy-modal-content-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 768px) {
		.brgy-modal-content-grid {
			grid-template-columns: 1.25fr 1fr;
		}
	}

	.brgy-section-heading {
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #fbbf24;
		margin: 0 0 0.75rem;
	}

	.brgy-prose p {
		font-size: 0.875rem;
		line-height: 1.75;
		color: #cbd5e1;
		text-align: justify;
		margin: 0;
	}

	.brgy-modal-side-col {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* Gallery in Modal */
	.brgy-gallery-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.625rem;
	}

	.brgy-gallery-thumb {
		position: relative;
		aspect-ratio: 4 / 3;
		border-radius: 0.75rem;
		overflow: hidden;
		border: 1px solid rgba(59, 130, 246, 0.25);
		background: #020712;
	}

	.brgy-thumb-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.brgy-gallery-thumb:hover .brgy-thumb-img {
		transform: scale(1.06);
	}

	/* Portals & Links */
	.brgy-links-list {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.brgy-portal-link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		background: rgba(14, 34, 70, 0.5);
		border: 1px solid rgba(59, 130, 246, 0.25);
		border-radius: 0.875rem;
		color: #e2e8f0;
		font-size: 0.8125rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.25s ease;
	}

	.brgy-portal-link:hover {
		background: rgba(29, 78, 216, 0.3);
		border-color: #f59e0b;
		color: #fbbf24;
		transform: translateX(3px);
	}

	.brgy-link-icon {
		width: 0.95rem;
		height: 0.95rem;
		color: #60a5fa;
		transition: transform 0.25s ease;
	}

	.brgy-portal-link:hover .brgy-link-icon {
		transform: translateX(3px);
		color: #fbbf24;
	}

	.brgy-contact-btn {
		display: block;
		padding: 0.8125rem 1rem;
		text-align: center;
		border-radius: 0.875rem;
		background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
		border: 1px solid rgba(245, 158, 11, 0.5);
		color: #ffffff;
		font-size: 0.8125rem;
		font-weight: 700;
		text-decoration: none;
		box-shadow: 0 4px 15px rgba(29, 78, 216, 0.35);
		transition: all 0.25s ease;
	}

	.brgy-contact-btn:hover {
		background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
		box-shadow: 0 6px 20px rgba(29, 78, 216, 0.5), 0 0 15px rgba(245, 158, 11, 0.3);
		transform: translateY(-2px);
	}
</style>
