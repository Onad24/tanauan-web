<script>
	import { onMount } from 'svelte';

	const contacts = [
		{
			name: 'Municipal Hall',
			number: '+63 53 123 4567',
			altNumber: '+63 912 345 6789',
			description: 'General inquiries, public administration, and local government services.',
			responseTime: 'Office Hours',
			priority: 'normal',
			category: 'Administration',
			themeColor: '#0ea5e9' // Ocean Blue
		},
		{
			name: 'Bureau of Fire Protection',
			number: '+63 916-197-4504',
			altNumber: '+63 922-344-8887',
			description: 'Fire suppression, prevention, rescue operations, and safety inspections.',
			responseTime: '~5 min response',
			priority: 'critical',
			category: 'Emergency',
			themeColor: '#ef4444' // Crimson Red
		},
		{
			name: 'Tanauan Rescue',
			number: '+63 912-936-6706',
			altNumber: '+63 916-197-7360',
			description: '24/7 medical emergencies, ambulance transport, and disaster response.',
			responseTime: '~7 min response',
			priority: 'critical',
			category: 'Rescue',
			themeColor: '#f97316' // Safety Orange
		},
		{
			name: 'Philippine National Police',
			number: '+63 951-163-3878',
			altNumber: '+63 917-120-5207',
			description: 'Law enforcement, public safety maintenance, and community security.',
			responseTime: 'Immediate dispatch',
			priority: 'critical',
			category: 'Security',
			themeColor: '#3b82f6' // Police Blue
		}
	];

	let copiedKey = '';

	async function copyToClipboard(number, key) {
		try {
			await navigator.clipboard.writeText(number);
			copiedKey = key;
			setTimeout(() => {
				if (copiedKey === key) copiedKey = '';
			}, 2000);
		} catch (err) {
			console.error('Failed to copy number:', err);
		}
	}

	let scrolled = false;

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 200;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollToContacts() {
		document.getElementById('contacts-section')?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Emergency Hotlines & Contact Us — Tanauan, Leyte</title>
	<meta
		name="description"
		content="Official emergency numbers, hotlines, and service directories for the Municipality of Tanauan, Leyte."
	/>
</svelte:head>

<!-- Minimal Floating Emergency Trigger -->
{#if scrolled}
	<button
		class="floating-sos-pill"
		on:click={scrollToContacts}
		aria-label="Scroll to emergency contacts"
	>
		<span class="sos-indicator"></span>
		<svg
			class="h-4 w-4"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path
				d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.27 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
			/>
		</svg>
		<span>Quick Hotlines</span>
	</button>
{/if}

<div class="contact-page">
	<!-- Hero / Header Section -->
	<header class="contact-header">
		<div class="header-container">
			<div class="badge-row">
				<span class="status-badge">
					<span class="status-dot"></span>
					Verified 24/7 Emergency Support
				</span>
			</div>

			<h1 class="page-title">
				Emergency & Public <span class="text-gradient">Hotlines</span>
			</h1>

			<p class="page-subtitle">
				Immediate lines of communication connecting you directly to local emergency responders,
				administrative offices, and municipal support teams.
			</p>

			<div class="quick-notice">
				<svg
					class="notice-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line
						x1="12"
						y1="8"
						x2="12.01"
						y2="8"
					/>
				</svg>
				<span>Mobile users: Tap any hotline number below to initiate a call directly.</span>
			</div>
		</div>
	</header>

	<!-- Contacts Grid -->
	<main id="contacts-section" class="contacts-grid-section">
		<div class="grid-container">
			<div class="contacts-grid">
				{#each contacts as contact, i}
					<article class="contact-card" style="--accent-color: {contact.themeColor}">
						<!-- Card Header: Title and Icon -->
						<div class="card-top">
							<div class="card-brand">
								<span class="category-tag {contact.category.toLowerCase()}">
									{contact.category}
								</span>
								<h2 class="card-name">{contact.name}</h2>
							</div>

							<div class="icon-wrapper">
								{#if contact.name === 'Municipal Hall'}
									<!-- Building / Town Hall Icon -->
									<svg
										class="card-icon"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M3 21h18" /><path
											d="M5 21V10a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11"
										/><path d="M9 21v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4" /><path
											d="M10 12h4"
										/><path d="M10 16h4" />
									</svg>
								{:else if contact.name === 'Bureau of Fire Protection'}
									<!-- Flame Icon -->
									<svg
										class="card-icon"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path
											d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3z"
										/>
									</svg>
								{:else if contact.name === 'Tanauan Rescue'}
									<!-- Activity / Heartbeat Pulse Icon -->
									<svg
										class="card-icon"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
									</svg>
								{:else}
									<!-- Police Shield Icon -->
									<svg
										class="card-icon"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
									</svg>
								{/if}
							</div>
						</div>

						<p class="card-desc">{contact.description}</p>

						<!-- Card Meta Info -->
						<div class="card-meta">
							<div class="meta-item">
								<svg
									class="meta-icon"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
								</svg>
								<span>{contact.responseTime}</span>
							</div>

							<div class="meta-item">
								{#if contact.priority === 'critical'}
									<span class="pulse-indicator critical"></span>
									<span class="meta-label text-critical">High Priority</span>
								{:else}
									<span class="pulse-indicator normal"></span>
									<span class="meta-label text-normal">General Lines</span>
								{/if}
							</div>
						</div>

						<!-- Phone Actions -->
						<div class="phone-actions-container">
							<!-- Primary Line -->
							<div class="phone-item-row">
								<div class="phone-details">
									<span class="phone-type">Primary</span>
									<a href="tel:{contact.number.replace(/[^0-9+]/g, '')}" class="phone-link">
										{contact.number}
									</a>
								</div>

								<div class="action-buttons">
									<a
										href="tel:{contact.number.replace(/[^0-9+]/g, '')}"
										class="action-btn call-action"
										title="Call number"
										aria-label="Call {contact.name} primary"
									>
										<svg
											class="btn-icon"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.27 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
											/>
										</svg>
									</a>
									<button
										on:click={() => copyToClipboard(contact.number, `${i}-primary`)}
										class="action-btn copy-action"
										class:copied={copiedKey === `${i}-primary`}
										title="Copy to clipboard"
										aria-label="Copy primary number"
									>
										{#if copiedKey === `${i}-primary`}
											<svg
												class="btn-icon text-success"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2.5"
											>
												<polyline points="20 6 9 17 4 12" />
											</svg>
										{:else}
											<svg
												class="btn-icon"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
											>
												<rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path
													d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
												/>
											</svg>
										{/if}
									</button>
								</div>
							</div>

							<!-- Backup Line -->
							<div class="phone-item-row">
								<div class="phone-details">
									<span class="phone-type">Backup</span>
									<a href="tel:{contact.altNumber.replace(/[^0-9+]/g, '')}" class="phone-link">
										{contact.altNumber}
									</a>
								</div>

								<div class="action-buttons">
									<a
										href="tel:{contact.altNumber.replace(/[^0-9+]/g, '')}"
										class="action-btn call-action"
										title="Call backup number"
										aria-label="Call {contact.name} backup"
									>
										<svg
											class="btn-icon"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
										>
											<path
												d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.27 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
											/>
										</svg>
									</a>
									<button
										on:click={() => copyToClipboard(contact.altNumber, `${i}-backup`)}
										class="action-btn copy-action"
										class:copied={copiedKey === `${i}-backup`}
										title="Copy to clipboard"
										aria-label="Copy backup number"
									>
										{#if copiedKey === `${i}-backup`}
											<svg
												class="btn-icon text-success"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2.5"
											>
												<polyline points="20 6 9 17 4 12" />
											</svg>
										{:else}
											<svg
												class="btn-icon"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
											>
												<rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path
													d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
												/>
											</svg>
										{/if}
									</button>
								</div>
							</div>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</main>

	<!-- Guideline / Emergency Protocol Steps -->
	<section class="protocol-section">
		<div class="protocol-container">
			<div class="protocol-header">
				<span class="section-label font-bold">Standard Procedure</span>
				<h2 class="section-title">Emergency Guidelines</h2>
				<p class="section-subtitle">
					Ensure the fastest, most effective response from municipal services by following this
					communication protocol.
				</p>
			</div>

			<div class="steps-flow">
				<div class="step-card">
					<div class="step-num-bg">01</div>
					<div class="step-body">
						<h3 class="step-title">Maintain Composure</h3>
						<p class="step-text">
							Take deep breaths. Speak slowly and clearly. Relaying structured information calmly
							reduces overall dispatch time.
						</p>
					</div>
				</div>

				<div class="step-card">
					<div class="step-num-bg">02</div>
					<div class="step-body">
						<h3 class="step-title">Specify Location</h3>
						<p class="step-text">
							Lead with the precise street address, barangay, and recognizable nearby landmarks so
							units navigate directly to you.
						</p>
					</div>
				</div>

				<div class="step-card">
					<div class="step-body">
						<div class="step-num-bg">03</div>
						<h3 class="step-title">Detail the Situation</h3>
						<p class="step-text">
							State what happened, the number of individuals affected, any obvious injuries, and
							active hazards (fire, traffic, etc.).
						</p>
					</div>
				</div>

				<div class="step-card">
					<div class="step-body">
						<div class="step-num-bg">04</div>
						<h3 class="step-title">Stay Connected</h3>
						<p class="step-text">
							Do not terminate the call until the responder prompts you. Prepare to receive
							call-backs from the responding crew.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Minimal Info Footer -->
	<footer class="directory-footer">
		<div class="footer-container">
			<div class="footer-status-bar">
				<span class="status-dot"></span>
				<span class="footer-status-text">All emergency response facilities operational</span>
			</div>
			<div class="divider-dot">•</div>
			<div class="footer-note">Last verified update: June 2026</div>
			<div class="divider-dot">•</div>
			<div class="footer-note text-link">
				For administrative concerns, visit Municipal Offices during local business hours.
			</div>
		</div>
	</footer>
</div>

<style>
	/* Custom styling for sleek, modern, and minimalist design */
	.contact-page {
		min-height: 100vh;
		background:
			radial-gradient(circle at 100% 0%, rgba(14, 165, 233, 0.03) 0%, transparent 40%),
			radial-gradient(circle at 0% 100%, rgba(239, 68, 68, 0.02) 0%, transparent 45%), #fafbfd;
		font-family:
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
		color: #1e293b;
		padding-bottom: 4rem;
	}

	/* Floating SOS Button */
	.floating-sos-pill {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		z-index: 50;
		background: #0f172a;
		color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 9999px;
		padding: 0.75rem 1.25rem;
		font-size: 0.825rem;
		font-weight: 600;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.25);
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.floating-sos-pill:hover {
		background: #1e293b;
		transform: translateY(-2px);
		box-shadow: 0 15px 30px -5px rgba(15, 23, 42, 0.35);
	}
	.floating-sos-pill:active {
		transform: translateY(0);
	}
	.sos-indicator {
		width: 8px;
		height: 8px;
		background-color: #ef4444;
		border-radius: 50%;
		animation: pulse-ring 2s infinite;
	}
	@keyframes pulse-ring {
		0% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
		}
		70% {
			transform: scale(1);
			box-shadow: 0 0 0 6px rgba(239, 68, 68, 0);
		}
		100% {
			transform: scale(0.95);
			box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
		}
	}

	/* Contact Header */
	.contact-header {
		padding: 5rem 1.5rem 3.5rem;
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
	}
	.badge-row {
		display: flex;
		justify-content: center;
		margin-bottom: 1.5rem;
	}
	.status-badge {
		background-color: #ffffff;
		border: 1px solid #e2e8f0;
		font-size: 0.75rem;
		font-weight: 600;
		color: #475569;
		padding: 0.375rem 1rem;
		border-radius: 9999px;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
	}
	.status-dot {
		width: 6px;
		height: 6px;
		background-color: #10b981;
		border-radius: 50%;
		animation: status-pulse 2.5s infinite;
	}
	@keyframes status-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	.page-title {
		font-size: clamp(2.25rem, 5vw, 3.25rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		color: #0f172a;
		line-height: 1.1;
		margin-bottom: 1.25rem;
	}
	.text-gradient {
		background: linear-gradient(135deg, #0284c7, #3b82f6);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}
	.page-subtitle {
		font-size: 1.05rem;
		line-height: 1.6;
		color: #475569;
		margin-bottom: 2rem;
		max-width: 680px;
		margin-left: auto;
		margin-right: auto;
	}
	.quick-notice {
		background-color: rgba(14, 165, 233, 0.04);
		border: 1px solid rgba(14, 165, 233, 0.08);
		border-radius: 100px;
		padding: 0.5rem 1.25rem;
		font-size: 0.8rem;
		color: #0284c7;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		max-width: 100%;
		text-align: left;
	}
	.notice-icon {
		width: 14px;
		height: 14px;
		flex-shrink: 0;
	}

	/* Contacts Grid Section */
	.contacts-grid-section {
		padding: 0 1.5rem 4rem;
	}
	.grid-container {
		max-width: 1200px;
		margin: 0 auto;
	}
	.contacts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
		gap: 2rem;
	}

	/* Cards Styling */
	.contact-card {
		background: #ffffff;
		border: 1px solid #e2e8f0;
		border-radius: 1.25rem;
		padding: 2.25rem;
		display: flex;
		flex-direction: column;
		box-shadow:
			0 1px 3px rgba(0, 0, 0, 0.01),
			0 1px 2px rgba(0, 0, 0, 0.005);
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		position: relative;
		overflow: hidden;
	}
	.contact-card:hover {
		transform: translateY(-3px);
		border-color: var(--accent-color);
		box-shadow: 0 12px 30px -10px rgba(15, 23, 42, 0.06);
	}
	.contact-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--accent-color);
		opacity: 0.8;
	}

	.card-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	.card-brand {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.category-tag {
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.25rem 0.625rem;
		border-radius: 9999px;
		width: fit-content;
		line-height: 1;
	}
	.category-tag.emergency {
		background-color: #fef2f2;
		color: #ef4444;
		border: 1px solid #fee2e2;
	}
	.category-tag.rescue {
		background-color: #fff7ed;
		color: #f97316;
		border: 1px solid #ffedd5;
	}
	.category-tag.security {
		background-color: #eff6ff;
		color: #3b82f6;
		border: 1px solid #dbeafe;
	}
	.category-tag.administration {
		background-color: #f0f9ff;
		color: #0ea5e9;
		border: 1px solid #e0f2fe;
	}

	.card-name {
		font-size: 1.375rem;
		font-weight: 700;
		color: #0f172a;
		letter-spacing: -0.02em;
		line-height: 1.2;
	}
	.icon-wrapper {
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background-color: #f8fafc;
		border: 1px solid #f1f5f9;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--accent-color);
		flex-shrink: 0;
	}
	.card-icon {
		width: 22px;
		height: 22px;
	}

	.card-desc {
		font-size: 0.875rem;
		line-height: 1.6;
		color: #475569;
		margin-bottom: 1.5rem;
	}

	.card-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid #f1f5f9;
		margin-bottom: 1.5rem;
	}
	.meta-item {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.8rem;
		color: #64748b;
		background-color: #f8fafc;
		border: 1px solid #f1f5f9;
		padding: 0.25rem 0.625rem;
		border-radius: 6px;
	}
	.meta-icon {
		width: 14px;
		height: 14px;
	}
	.pulse-indicator {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		display: inline-block;
	}
	.pulse-indicator.critical {
		background-color: #ef4444;
		box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
	}
	.pulse-indicator.normal {
		background-color: #0ea5e9;
		box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
	}
	.text-critical {
		color: #ef4444;
		font-weight: 600;
	}
	.text-normal {
		color: #0ea5e9;
		font-weight: 600;
	}

	/* Phone lists actions */
	.phone-actions-container {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: auto;
	}
	.phone-item-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #f8fafc;
		border: 1px solid #f1f5f9;
		padding: 0.75rem 1rem;
		border-radius: 10px;
		transition: all 0.2s ease;
	}
	.phone-item-row:hover {
		background-color: #ffffff;
		border-color: #e2e8f0;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
	}
	.phone-details {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}
	.phone-type {
		font-size: 0.625rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #94a3b8;
	}
	.phone-link {
		font-size: 0.95rem;
		font-weight: 600;
		color: #1e293b;
		text-decoration: none;
		transition: color 0.15s ease;
	}
	.phone-link:hover {
		color: var(--accent-color);
	}
	.action-buttons {
		display: flex;
		gap: 0.5rem;
	}
	.action-btn {
		width: 32px;
		height: 32px;
		border-radius: 8px;
		border: 1px solid #cbd5e1;
		background-color: #ffffff;
		color: #475569;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.action-btn:hover {
		background-color: #f1f5f9;
		border-color: #94a3b8;
		color: #0f172a;
	}
	.call-action:hover {
		background-color: #f0fdf4;
		border-color: #bbf7d0;
		color: #15803d;
	}
	.copy-action.copied {
		background-color: #f0fdf4;
		border-color: #bbf7d0;
	}
	.btn-icon {
		width: 14px;
		height: 14px;
	}
	.text-success {
		color: #10b981;
	}

	/* Protocol Guideline Section */
	.protocol-section {
		background-color: #ffffff;
		border-top: 1px solid #f1f5f9;
		border-bottom: 1px solid #f1f5f9;
		padding: 5rem 1.5rem;
		margin-top: 3rem;
	}
	.protocol-container {
		max-width: 1200px;
		margin: 0 auto;
	}
	.protocol-header {
		text-align: center;
		max-width: 650px;
		margin: 0 auto 4rem;
	}
	.section-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #0284c7;
		display: block;
		margin-bottom: 0.5rem;
	}
	.section-title {
		font-size: 2rem;
		font-weight: 800;
		color: #0f172a;
		letter-spacing: -0.02em;
		margin-bottom: 1rem;
	}
	.section-subtitle {
		font-size: 0.95rem;
		line-height: 1.6;
		color: #475569;
	}

	.steps-flow {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 2rem;
	}
	.step-card {
		padding: 2.25rem 1.75rem;
		background-color: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 1rem;
		position: relative;
		overflow: hidden;
		transition: all 0.2s ease;
	}
	.step-card:hover {
		transform: translateY(-2px);
		border-color: #cbd5e1;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
	}
	.step-num-bg {
		font-size: 3.5rem;
		font-weight: 900;
		line-height: 1;
		color: rgba(148, 163, 184, 0.08);
		position: absolute;
		right: 1.25rem;
		top: 1rem;
		user-select: none;
	}
	.step-body {
		position: relative;
		z-index: 2;
	}
	.step-title {
		font-size: 1.1rem;
		font-weight: 700;
		color: #0f172a;
		margin-bottom: 0.75rem;
	}
	.step-text {
		font-size: 0.85rem;
		line-height: 1.6;
		color: #475569;
	}

	/* Directory Footer */
	.directory-footer {
		padding: 3rem 1.5rem 0;
	}
	.footer-container {
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.75rem;
		font-size: 0.8rem;
		color: #64748b;
	}
	.footer-status-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.footer-status-text {
		color: #475569;
		font-weight: 500;
	}
	.divider-dot {
		color: #cbd5e1;
		user-select: none;
	}
	.footer-note {
		color: #64748b;
	}
	.text-link {
		color: #0ea5e9;
	}

	/* Media Queries */
	@media (max-width: 768px) {
		.contact-header {
			padding: 4rem 1rem 2.5rem;
		}
		.contacts-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
		.protocol-section {
			padding: 4rem 1rem;
		}
		.steps-flow {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}
		.footer-container {
			flex-direction: column;
			gap: 0.5rem;
			text-align: center;
		}
		.divider-dot {
			display: none;
		}
		.floating-sos-pill {
			bottom: 1.5rem;
			right: 1.5rem;
			padding: 0.625rem 1rem;
		}
	}
</style>
