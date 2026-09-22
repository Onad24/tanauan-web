<script>
	import { onMount } from 'svelte';
	let gsap;
	let loaded = false;

	onMount(async () => {
		const gsapModule = await import('gsap');
		gsap = gsapModule.default || gsapModule;
		const ScrollTriggerModule = await import('gsap/ScrollTrigger');
		const ScrollTrigger = ScrollTriggerModule.default || ScrollTriggerModule;
		gsap.registerPlugin(ScrollTrigger);

		loaded = true;

		// Hero parallax and text reveal
		gsap.fromTo('.hero-bg', { scale: 1.15 }, { scale: 1, duration: 2.5, ease: 'power2.out' });

		gsap.from('.hero-title span', {
			y: 80,
			opacity: 0,
			duration: 1,
			stagger: 0.12,
			ease: 'power4.out',
			delay: 0.3
		});

		gsap.from('.hero-subtitle', {
			y: 30,
			opacity: 0,
			duration: 1,
			ease: 'power3.out',
			delay: 1
		});

		gsap.from('.hero-cta', {
			y: 20,
			opacity: 0,
			duration: 0.8,
			ease: 'power3.out',
			delay: 1.3
		});

		gsap.from('.scroll-indicator', {
			y: -10,
			opacity: 0,
			duration: 0.8,
			ease: 'power3.out',
			delay: 1.6
		});

		// Floating animation for scroll indicator
		gsap.to('.scroll-indicator', {
			y: 10,
			duration: 1.5,
			repeat: -1,
			yoyo: true,
			ease: 'power1.inOut'
		});

		// Section headers with line animation
		document.querySelectorAll('.section-header').forEach((header) => {
			const lineEl = header.querySelector('.section-line');
			if (lineEl) {
				gsap.from(lineEl, {
					scaleX: 0,
					duration: 1,
					ease: 'power3.inOut',
					scrollTrigger: {
						trigger: header,
						start: 'top 80%'
					}
				});
			}

			const numEl = header.querySelector('.section-number');
			if (numEl) {
				gsap.from(numEl, {
					opacity: 0,
					x: -30,
					duration: 0.8,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: header,
						start: 'top 80%'
					}
				});
			}

			const h2El = header.querySelector('h2');
			if (h2El) {
				gsap.from(h2El, {
					opacity: 0,
					y: 30,
					duration: 0.8,
					ease: 'power3.out',
					delay: 0.2,
					scrollTrigger: {
						trigger: header,
						start: 'top 80%'
					}
				});
			}
		});

		// Content cards with stagger
		document.querySelectorAll('.heritage-section').forEach((section, index) => {
			const isEven = index % 2 === 0;

			const textEl = section.querySelector('.content-text');
			if (textEl) {
				gsap.from(textEl, {
					opacity: 0,
					x: isEven ? -60 : 60,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: section,
						start: 'top 70%'
					}
				});
			}

			const cards = section.querySelectorAll('.image-card');
			if (cards.length) {
				gsap.from(cards, {
					opacity: 0,
					y: 60,
					scale: 0.9,
					duration: 0.8,
					stagger: 0.15,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: section,
						start: 'top 70%'
					}
				});
			}

			// Parallax effect on images
			section.querySelectorAll('.image-card img').forEach((img) => {
				gsap.to(img, {
					y: -30,
					ease: 'none',
					scrollTrigger: {
						trigger: img,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1
					}
				});
			});
		});

		// Stats counter animation
		document.querySelectorAll('.stat-number').forEach((stat) => {
			gsap.from(stat, {
				textContent: 0,
				duration: 2,
				ease: 'power2.out',
				snap: { textContent: 1 },
				scrollTrigger: {
					trigger: stat,
					start: 'top 80%'
				}
			});
		});

		// Floating decorative elements
		gsap.to('.float-element', {
			y: -20,
			duration: 3,
			repeat: -1,
			yoyo: true,
			ease: 'power1.inOut',
			stagger: 0.5
		});
	});
</script>

<svelte:head>
	<title>Cultural Heritage of Tanauan, Leyte | Discover Our Legacy</title>
	<meta
		name="description"
		content="Explore 316 years of rich cultural heritage in Tanauan, Leyte. Discover historic churches, traditional dances, the Balinsasayaw Singers, and the vibrant Pasaka Festival."
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="heritage-page">
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-bg">
			<img src="/Tourism/chruch-1.jpg" alt="Cultural Heritage of Tanauan" class="hero-bg-img" />
			<div class="hero-overlay"></div>
		</div>

		<!-- Decorative Elements -->
		<div class="hero-decor">
			<div class="float-element orb orb-1"></div>
			<div class="float-element orb orb-2"></div>
			<div class="float-element orb orb-3"></div>
		</div>

		<div class="hero-content">
			<div class="hero-badge">
				<span>Discover Our Legacy</span>
			</div>

			<h1 class="hero-title">
				<span>Cultural</span>
				<span class="accent">Heritage</span>
				<br />
				<span class="sub">of Tanauan, Leyte</span>
			</h1>

			<p class="hero-subtitle">
				Journey through centuries of tradition, artistry, and the enduring spirit of a community
				rich in history and cultural pride.
			</p>

			<div class="hero-cta">
				<a href="#explore" class="btn-explore">
					Explore Heritage
					<svg class="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						></path>
					</svg>
				</a>
			</div>
		</div>

		<div class="scroll-indicator">
			<span>Scroll</span>
			<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M19 14l-7 7m0 0l-7-7m7 7V3"
				></path>
			</svg>
		</div>
	</section>

	<!-- Stats Section -->
	<section class="stats-section">
		<div class="container">
			<div class="stats-grid">
				<div class="stat-item">
					<div class="stat-number">316</div>
					<div class="stat-label">Years of History</div>
				</div>
				<div class="stat-item">
					<div class="stat-number">5</div>
					<div class="stat-label">Heritage Sites</div>
				</div>
				<div class="stat-item">
					<div class="stat-number">3</div>
					<div class="stat-label">Traditional Dances</div>
				</div>
				<div class="stat-item">
					<div class="stat-number">1</div>
					<div class="stat-label">Annual Festival</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Heritage Section 1: Assumption Parish Church -->
	<section id="explore" class="heritage-section section-church">
		<div class="container">
			<div class="section-header">
				<div class="header-row">
					<span class="section-number">01</span>
					<div class="section-line"></div>
				</div>
				<h2>
					Assumption of Our Lady
					<span class="subtitle">Parish Church</span>
				</h2>
			</div>

			<div class="heritage-grid">
				<div class="content-text">
					<div class="content-tag">
						<span class="tag-line"></span>
						Est. 1704
					</div>
					<p class="lead-text">
						A magnificent testament to faith and resilience, built by Jesuit missionaries with coral
						stone walls that have withstood centuries of history.
					</p>
					<p class="body-text">
						Originally constructed as a fortress against Moro raids, this sacred landmark features
						an ornate baroque facade and houses precious relics that chronicle Tanauan's spiritual
						journey through the ages. It is home to the image of Nuestra Señora de la Asuncion, one
						of the oldest Marian images in the province.
					</p>
					<div class="content-tags">
						<span class="tag">National Heritage</span>
						<span class="tag">Baroque Architecture</span>
						<span class="tag">Est. 1704</span>
					</div>
				</div>

				<div class="image-mosaic mosaic-church">
					<div class="image-card card-main">
						<img
							src="/Tourism/Cultural Heritage/assumption-church.png"
							alt="Assumption Parish facade"
						/>
					</div>
					<div class="image-card card-side">
						<img src="/Tourism/church-2.jpg" alt="Parish interior" />
					</div>
					<div class="image-card card-accent">
						<div class="accent-content">
							<div class="accent-number">320+</div>
							<div class="accent-label">Years Standing</div>
						</div>
					</div>
					<div class="image-card card-bottom">
						<img src="/Tourism/chruch-1.jpg" alt="Parish details" />
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Heritage Section 2: Balinsasayaw Singers -->
	<section class="heritage-section section-singers">
		<div class="container">
			<div class="section-header header-right">
				<div class="header-row row-right">
					<div class="section-line line-right"></div>
					<span class="section-number">02</span>
				</div>
				<h2>
					Balinsasayaw Singers
					<span class="subtitle sub-teal">Musical Heritage of Tanauan</span>
				</h2>
			</div>

			<div class="heritage-grid grid-reverse">
				<div class="image-mosaic mosaic-singers">
					<div class="image-card card-tall">
						<img
							src="/Tourism/Cultural Heritage/balinsasayaw-singers.png"
							alt="Balinsasayaw Singers performing"
						/>
					</div>
					<div class="image-card card-small">
						<img src="/Tourism/" alt="Cultural performance" />
					</div>
					<div class="image-card card-accent accent-teal">
						<div class="accent-content">
							<svg class="accent-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
								></path>
							</svg>
							<div class="accent-label">Musical Legacy</div>
						</div>
					</div>
				</div>

				<div class="content-text">
					<div class="content-tag tag-teal">
						<span class="tag-line line-teal"></span>
						Traditional Vocal Group
					</div>
					<p class="lead-text">
						The Balinsasayaw Singers are a celebrated choral ensemble from Tanauan, Leyte, renowned
						for preserving and performing traditional Waray folk music.
					</p>
					<p class="body-text">
						Named after the balinsasayaw (swiftlet bird), this distinguished group has carried the
						melodic heritage of Eastern Visayas to national prominence, recording beloved folk songs
						like "Singsing" and performing at cultural events across the Philippines.
					</p>
					<div class="content-tags">
						<span class="tag tag-alt-teal">Choral Group</span>
						<span class="tag tag-alt-teal">Waray Folk Music</span>
						<span class="tag tag-alt-teal">Cultural Preservation</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Heritage Section 3: Pasaka Festival -->
	<section class="heritage-section section-pasaka">
		<div class="container">
			<div class="section-header">
				<div class="header-row">
					<span class="section-number">03</span>
					<div class="section-line line-rose"></div>
				</div>
				<h2>
					Pasaka Festival
					<span class="subtitle sub-rose">Festival of Thanksgiving</span>
				</h2>
			</div>

			<div class="heritage-grid">
				<div class="content-text">
					<div class="content-tag tag-rose">
						<span class="tag-line line-rose-solid"></span>
						Annual Celebration
					</div>
					<p class="lead-text">
						A vibrant thanksgiving festival celebrated every August in honor of Tanauan's patroness,
						Our Lady of the Assumption.
					</p>
					<p class="body-text">
						The word "Pasaka" is a Waray term meaning to invite progress, health, and good fortune.
						The festival is a spectacular showcase of street dancing, elaborate costumes, and
						rhythmic drumbeats that tell the story of the town's rich culture, resilience, and
						faith.
					</p>
					<div class="kuratsa-feature">
						<div class="feature-icon">
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
						</div>
						<div>
							<div class="feature-title">Grand Champion</div>
							<div class="feature-desc">Aliwan Fiesta & Pintados-Kasadyaan</div>
						</div>
					</div>
				</div>

				<div class="image-mosaic mosaic-kuratsa">
					<div class="image-card card-kuratsa-1">
						<img src="/Tourism/pasaka/pasaka-hero.webp" alt="Pasaka Festival Street Dance" />
					</div>
					<div class="image-card card-kuratsa-2">
						<img src="/Tourism/pasaka/pasaka.jpg" alt="Pasaka Festival Costumes" />
					</div>
					<div class="image-card card-accent accent-rose">
						<div class="accent-content">
							<svg class="accent-icon icon-rose" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
								/>
							</svg>
							<div class="accent-label">Faith & Joy</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Heritage Section 4: Public Plaza -->
	<section class="heritage-section section-plaza">
		<div class="container">
			<div class="section-header header-center">
				<div class="header-row row-center">
					<div class="section-line line-center"></div>
					<span class="section-number num-dark">04</span>
					<div class="section-line line-center"></div>
				</div>
				<h2 class="text-white">
					Tanauan Public Plaza
					<span class="subtitle sub-gold">Heart of the Community</span>
				</h2>
			</div>

			<div class="plaza-grid">
				<div class="content-text text-light">
					<div class="content-tag tag-gold">
						<span class="tag-line line-gold-solid"></span>
						Civic Heritage
					</div>
					<p class="lead-text lead-light">
						Beneath the canopy of centuries-old acacia trees, the plaza stands as a gathering place
						where community bonds are forged and celebrations come alive.
					</p>
					<p class="body-text body-light">
						The mini-amphitheater hosts cultural performances, civic events, and the daily rhythm of
						Tanauan life—a testament to the enduring spirit of togetherness.
					</p>
				</div>

				<div class="plaza-images">
					<div class="image-card plaza-main">
						<img src="/Tourism/plaza-1.jpg" alt="Plaza with acacia trees" />
					</div>
					<div class="image-card plaza-side">
						<img src="/Tourism/plaza-2.jpg" alt="Mini-amphitheater" />
					</div>
					<div class="image-card plaza-side">
						<img src="/Tourism/plaza-3.jpg" alt="Community event" />
					</div>
					<div class="image-card card-accent accent-gold-glass">
						<div class="accent-content">
							<svg
								class="accent-icon"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								stroke-width="1.5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 3v18m0-18C8.5 3 6 5.5 6 9c0 3.5 2.5 6 6 6m0-12c3.5 0 6 2.5 6 6 0 3.5-2.5 6-6 6M6 9h12M9 15h6"
								/>
							</svg>
							<div class="accent-number-small">Centuries of Shade</div>
							<div class="accent-label">Where memories are made</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Heritage Section 5: Tanauan Municipal Hall -->
	<section id="municipal-hall" class="heritage-section section-municipal">
		<div class="container">
			<div class="section-header">
				<div class="header-row">
					<span class="section-number">05</span>
					<div class="section-line line-indigo"></div>
				</div>
				<h2>
					Tanauan Municipal Hall
					<span class="subtitle sub-indigo">Center of Governance</span>
				</h2>
			</div>

			<div class="heritage-grid">
				<div class="content-text">
					<div class="content-tag tag-indigo">
						<span class="tag-line line-indigo-solid"></span>
						Est. 1910 (Reimagined through Modern Development)
					</div>
					<p class="lead-text">
						A landmark of civic leadership and public service, the Municipal Hall stands as a symbol
						of Tanauan's commitment to progress while preserving its historical roots.
					</p>
					<p class="body-text">
						Over the decades, the structure has evolved through several architectural improvements,
						blending traditional Filipino municipal design with modern government infrastructure. It
						serves as the seat of local governance and a symbol of civic pride for Tanauanons.
					</p>
					<div class="content-tags">
						<span class="tag tag-alt-indigo">Civic Landmark</span>
						<span class="tag tag-alt-indigo">Local Governance</span>
						<span class="tag tag-alt-indigo">Historic Site</span>
					</div>
				</div>

				<div class="image-mosaic mosaic-municipal">
					<div class="image-card card-main">
						<img src="/Tourism/_MG_1774.JPG" alt="Tanauan Municipal Hall Front" />
					</div>
					<div class="image-card card-side">
						<img src="/Tourism/e858fe29-3f1c-461f-8f5a-ce47be22a9b3.jpg" alt="Municipal Hall entrance" />
					</div>
					<div class="image-card card-accent accent-indigo">
						<div class="accent-content">
							<svg
								class="accent-icon"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								stroke-width="1.5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.33L12 5.5l-8.25 4.83V21h16.5z"
								/>
							</svg>
							<div class="accent-label">Civic Pride</div>
						</div>
					</div>
					<div class="image-card card-bottom">
						<img src="/Tourism/municipyo-1.jpg" alt="Municipal Hall side view" />
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Heritage Section 6: Tanauan Airstrip -->
	<section id="tanauan-airstrip" class="heritage-section section-airstrip">
		<div class="container">
			<div class="section-header header-right">
				<div class="header-row row-right">
					<div class="section-line line-right line-slate"></div>
					<span class="section-number">06</span>
				</div>
				<h2>
					Tanauan Airstrip
					<span class="subtitle sub-slate">A Historical World War II Site</span>
				</h2>
			</div>

			<div class="heritage-grid grid-reverse">
				<div class="image-mosaic mosaic-church">
					<div class="image-card card-main">
						<img src="/Tourism/Cultural Heritage/images.webp" alt="Airstrip Front" />
					</div>
					<div class="image-card card-side">
						<img src="/Tourism/Cultural Heritage/images-2.webp" alt="Side View" />
					</div>
					<div class="image-card card-accent accent-slate">
						<div class="accent-content">
							<svg
								class="accent-icon"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								stroke-width="1.5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
								/>
							</svg>
							<div class="accent-label">Historic Aviation</div>
						</div>
					</div>
					<div class="image-card card-bottom">
						<img src="/Tourism/Cultural Heritage/images.webp" alt="Historical Plaque" />
					</div>
				</div>

				<div class="content-text text-right-lg">
					<div class="content-tag tag-slate">
						<span class="tag-line line-slate-solid"></span>
						World War II Landmark
					</div>
					<p class="lead-text">
						Built during World War II by American forces, the Tanauan Airstrip played a crucial role
						in the liberation of Leyte and the Pacific campaign.
					</p>
					<p class="body-text">
						Though little remains today, the site stands as a testament to the bravery and strategic
						importance of Tanauan in Philippine history during the Allied liberation campaign.
					</p>
					<div class="content-tags">
						<span class="tag tag-alt-slate">WWII History</span>
						<span class="tag tag-alt-slate">Liberation of Leyte</span>
						<span class="tag tag-alt-slate">Military Heritage</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Heritage Section 7: Surge of Hope -->
	<section id="surge-of-hope" class="heritage-section section-surge">
		<div class="container">
			<div class="section-header header-center">
				<div class="header-row row-center">
					<div class="section-line line-center line-emerald"></div>
					<span class="section-number num-dark">07</span>
					<div class="section-line line-center line-emerald"></div>
				</div>
				<h2 class="text-white">
					Surge of Hope
					<span class="subtitle sub-emerald">Community Resilience Project</span>
				</h2>
			</div>

			<div class="heritage-grid">
				<div class="content-text text-light">
					<div class="content-tag tag-emerald">
						<span class="tag-line line-emerald-solid"></span>
						Civic Initiative
					</div>
					<p class="lead-text lead-light">
						A heartwarming initiative where the community comes together to support those in need,
						symbolizing hope, unity, and shared responsibility.
					</p>
					<p class="body-text body-light">
						The project highlights the spirit of Tanauan, where collective efforts transform
						challenges into opportunities for growth and compassion.
					</p>
				</div>

				<div class="image-mosaic mosaic-church">
					<div class="image-card card-main">
						<img
							src="/Tourism/pasaka/665342580_3134866316904724_7322023335565184051_n.jpg"
							alt="Community Activity"
						/>
					</div>
					<div class="image-card card-side">
						<img src="/Tourism/pasaka/pasaka-image1.webp" alt="Volunteers Helping" />
					</div>
					<div class="image-card card-accent accent-emerald">
						<div class="accent-content">
							<svg
								class="accent-icon"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								stroke-width="1.5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772"
								/>
							</svg>
							<div class="accent-label">Unity in Action</div>
						</div>
					</div>
					<div class="image-card card-bottom">
						<img src="/Tourism/pasaka/history_pasaka.jpg" alt="Community Event" />
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Heritage Section 8: Hanging Bride -->
	<section id="hanging-bride" class="heritage-section section-bride">
		<div class="container">
			<div class="section-header">
				<div class="header-row">
					<span class="section-number">08</span>
					<div class="section-line line-fuchsia"></div>
				</div>
				<h2>
					Hanging Bride
					<span class="subtitle sub-fuchsia">Brgy Balud Tradition</span>
				</h2>
			</div>

			<div class="heritage-grid">
				<div class="content-text">
					<div class="content-tag tag-fuchsia">
						<span class="tag-line line-fuchsia-solid"></span>
						Unique Cultural Ritual
					</div>
					<p class="lead-text">
						A fascinating and rare tradition where stories and rituals come alive through local
						folklore, capturing the imagination of visitors and locals alike.
					</p>
					<p class="body-text">
						This event reflects Brgy Balud's rich cultural tapestry, preserving ancestral practices
						and keeping heritage alive for future generations.
					</p>
					<div class="content-tags">
						<span class="tag tag-alt-fuchsia">Local Folklore</span>
						<span class="tag tag-alt-fuchsia">Ancestral Tradition</span>
						<span class="tag tag-alt-fuchsia">Brgy Balud</span>
					</div>
				</div>

				<div class="image-mosaic mosaic-kuratsa">
					<div class="image-card card-kuratsa-1">
						<img
							src="/Tourism/e858fe29-3f1c-461f-8f5a-ce47be22a9b3.jpg"
							alt="Hanging Bride Ceremony"
						/>
					</div>
					<div class="image-card card-kuratsa-2">
						<img src="/Tourism/pottery-2.jpg" alt="Local Participants" />
					</div>
					<div class="image-card card-accent accent-fuchsia">
						<div class="accent-content">
							<div class="accent-number-small">Cultural Heritage</div>
							<div class="accent-label">Traditions preserved</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	/* ========================================
	   BASE & TYPOGRAPHY
	   ======================================== */
	.heritage-page {
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			sans-serif;
		overflow-x: hidden;
		background: #faf9f7;
	}

	.font-serif,
	h1,
	h2,
	.accent-number,
	.accent-number-small {
		font-family: 'Playfair Display', Georgia, serif;
	}

	.container {
		max-width: 80rem;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	@media (min-width: 640px) {
		.container {
			padding: 0 2rem;
		}
	}

	/* ========================================
	   HERO SECTION
	   ======================================== */
	.hero {
		position: relative;
		height: 100vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
	}

	.hero-bg-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			rgba(30, 58, 95, 0.88) 0%,
			rgba(15, 50, 50, 0.75) 40%,
			rgba(100, 60, 20, 0.65) 100%
		);
	}

	.hero-decor {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
	}

	.orb-1 {
		top: 5rem;
		left: 2.5rem;
		width: 8rem;
		height: 8rem;
		background: rgba(212, 175, 55, 0.12);
	}

	.orb-2 {
		top: 10rem;
		right: 5rem;
		width: 12rem;
		height: 12rem;
		background: rgba(56, 163, 165, 0.1);
	}

	.orb-3 {
		bottom: 10rem;
		left: 25%;
		width: 10rem;
		height: 10rem;
		background: rgba(139, 92, 246, 0.08);
	}

	.hero-content {
		position: relative;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: 0 1rem;
	}

	.hero-badge span {
		display: inline-block;
		padding: 0.5rem 1.25rem;
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: #d4af37;
		border: 1px solid rgba(212, 175, 55, 0.3);
		border-radius: 9999px;
		backdrop-filter: blur(8px);
		margin-bottom: 1.5rem;
	}

	.hero-title {
		font-family: 'Playfair Display', Georgia, serif;
		font-size: clamp(2.5rem, 6vw, 5.5rem);
		font-weight: 300;
		color: #fff;
		line-height: 1.1;
		margin-bottom: 1.5rem;
		overflow: hidden;
	}

	.hero-title span {
		display: inline-block;
	}

	.hero-title .accent {
		color: #d4af37;
		margin-left: 0.3em;
	}

	.hero-title .sub {
		display: block;
		font-size: 0.5em;
		margin-top: 0.5rem;
		font-weight: 200;
		letter-spacing: 0.05em;
		color: rgba(255, 255, 255, 0.85);
	}

	.hero-subtitle {
		max-width: 40rem;
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.8);
		font-weight: 300;
		line-height: 1.7;
	}

	.hero-cta {
		margin-top: 2.5rem;
	}

	.btn-explore {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.9rem 2rem;
		background: #d4af37;
		color: #1a1a1a;
		font-weight: 500;
		border-radius: 9999px;
		text-decoration: none;
		transition: all 0.3s ease;
		font-size: 0.95rem;
	}

	.btn-explore:hover {
		background: #e5c34b;
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
	}

	.btn-arrow {
		width: 1rem;
		height: 1rem;
		transition: transform 0.3s ease;
	}

	.btn-explore:hover .btn-arrow {
		transform: translateX(4px);
	}

	.scroll-indicator {
		position: absolute;
		bottom: 2.5rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.scroll-indicator span {
		font-size: 0.7rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}

	.scroll-indicator svg {
		width: 1.5rem;
		height: 1.5rem;
	}

	/* ========================================
	   STATS SECTION
	   ======================================== */
	.stats-section {
		padding: 3rem 0;
		background: #d97706; /* Solid orange background */
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		max-width: 1000px;
		margin: 0 auto;
	}

	@media (min-width: 768px) {
		.stats-grid {
			grid-template-columns: repeat(4, 1fr);
			gap: 2rem;
		}
	}

	.stat-item {
		text-align: center;
		padding: 1.5rem 1rem;
	}

	.stat-number {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 3rem;
		font-weight: 700;
		color: #ffffff;
		line-height: 1;
		margin-bottom: 0.5rem;
	}

	@media (min-width: 768px) {
		.stat-number {
			font-size: 4rem;
		}
	}

	.stat-label {
		color: #ffffff;
		font-size: 1rem;
		font-family: 'Inter', system-ui, sans-serif;
	}

	/* ========================================
	   SECTION HEADERS
	   ======================================== */
	.section-header {
		margin-bottom: 3.5rem;
	}

	.header-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.row-right {
		justify-content: flex-end;
	}

	.row-center {
		justify-content: center;
	}

	.header-right {
		text-align: right;
	}

	.header-center {
		text-align: center;
	}

	.section-number {
		font-family: 'Playfair Display', Georgia, serif;
		font-size: 3.5rem;
		color: rgba(180, 175, 165, 0.25);
		line-height: 1;
	}

	@media (min-width: 768px) {
		.section-number {
			font-size: 5rem;
		}
	}

	.num-dark {
		color: rgba(80, 80, 80, 0.2);
	}

	.section-line {
		height: 1px;
		flex: 1;
		background: linear-gradient(to right, #d4af37, transparent);
		transform-origin: left;
	}

	.line-right {
		background: linear-gradient(to left, #0d9488, transparent);
		transform-origin: right;
	}

	.line-rose {
		background: linear-gradient(to right, #e11d48, transparent);
	}

	.line-indigo {
		background: linear-gradient(to right, #6366f1, transparent);
	}

	.line-slate {
		background: linear-gradient(to right, #64748b, transparent);
	}

	.line-center {
		width: 6rem;
		flex: none;
		background: linear-gradient(to right, transparent, #d4af37, transparent);
	}

	.line-emerald {
		background: linear-gradient(to right, transparent, #10b981, transparent);
	}

	.line-fuchsia {
		background: linear-gradient(to right, #c026d3, transparent);
	}

	h2 {
		font-family: 'Playfair Display', Georgia, serif;
		font-size: 2.25rem;
		color: #292524;
		line-height: 1.2;
	}

	@media (min-width: 768px) {
		h2 {
			font-size: 3.25rem;
		}
	}

	.text-white {
		color: #fff;
	}

	.subtitle {
		display: block;
		font-size: 0.55em;
		font-weight: 300;
		margin-top: 0.5rem;
		color: #d4af37;
	}

	.sub-teal {
		color: #0d9488;
	}
	.sub-rose {
		color: #e11d48;
	}
	.sub-gold {
		color: #d4af37;
	}
	.sub-indigo {
		color: #818cf8;
	}
	.sub-slate {
		color: #94a3b8;
	}
	.sub-emerald {
		color: #34d399;
	}
	.sub-fuchsia {
		color: #d946ef;
	}

	/* ========================================
	   HERITAGE SECTIONS & GRIDS
	   ======================================== */
	.heritage-section {
		padding: 5rem 0;
	}

	@media (min-width: 768px) {
		.heritage-section {
			padding: 7rem 0;
		}
	}

	.section-church {
		background: #fff;
	}
	.section-singers {
		background: #f8faf8;
	}
	.section-kuratsa {
		background: #fff;
	}
	.section-plaza {
		background: linear-gradient(135deg, #1a1a2e 0%, #1e293b 100%);
		color: #fff;
	}
	.section-municipal {
		background: #faf9f7;
	}
	.section-airstrip {
		background: #fff;
	}
	.section-surge {
		background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
		color: #fff;
	}
	.section-bride {
		background: #faf9f7;
	}

	.heritage-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
		align-items: center;
	}

	@media (min-width: 1024px) {
		.heritage-grid {
			grid-template-columns: 1fr 1fr;
			gap: 4rem;
		}
	}

	.grid-reverse .content-text {
		order: 1;
	}

	@media (min-width: 1024px) {
		.grid-reverse .content-text {
			order: 2;
		}
		.grid-reverse .image-mosaic {
			order: 1;
		}
	}

	/* ========================================
	   CONTENT TEXT
	   ======================================== */
	.content-tag {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #d4af37;
		margin-bottom: 1.25rem;
	}

	.tag-teal {
		color: #0d9488;
	}
	.tag-rose {
		color: #e11d48;
	}
	.tag-gold {
		color: #d4af37;
	}
	.tag-indigo {
		color: #6366f1;
	}
	.tag-slate {
		color: #64748b;
	}
	.tag-emerald {
		color: #10b981;
	}
	.tag-fuchsia {
		color: #c026d3;
	}

	.tag-line {
		display: inline-block;
		width: 2rem;
		height: 1px;
		background: #d4af37;
	}

	.line-teal {
		background: #0d9488;
	}
	.line-rose-solid {
		background: #e11d48;
	}
	.line-gold-solid {
		background: #d4af37;
	}
	.line-indigo-solid {
		background: #6366f1;
	}
	.line-slate-solid {
		background: #64748b;
	}
	.line-emerald-solid {
		background: #10b981;
	}
	.line-fuchsia-solid {
		background: #c026d3;
	}

	.lead-text {
		font-size: 1.2rem;
		color: #44403c;
		font-weight: 300;
		line-height: 1.7;
		margin-bottom: 1rem;
	}

	@media (min-width: 768px) {
		.lead-text {
			font-size: 1.35rem;
		}
	}

	.body-text {
		color: #78716c;
		line-height: 1.75;
		margin-bottom: 1.25rem;
	}

	.lead-light {
		color: rgba(255, 255, 255, 0.85);
	}
	.body-light {
		color: rgba(255, 255, 255, 0.6);
	}

	.text-right-lg {
		text-align: left;
	}

	@media (min-width: 1024px) {
		.text-right-lg {
			text-align: right;
		}
	}

	.content-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.tag {
		padding: 0.4rem 1rem;
		background: rgba(212, 175, 55, 0.1);
		color: #92700a;
		border-radius: 9999px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.tag-alt-teal {
		background: rgba(13, 148, 136, 0.1);
		color: #0d7e74;
	}

	.tag-alt-indigo {
		background: rgba(99, 102, 241, 0.1);
		color: #4f46e5;
	}

	.tag-alt-slate {
		background: rgba(100, 116, 139, 0.1);
		color: #475569;
	}

	.tag-alt-fuchsia {
		background: rgba(192, 38, 211, 0.1);
		color: #a21caf;
	}

	/* ========================================
	   IMAGE MOSAICS
	   ======================================== */
	.image-card {
		position: relative;
		overflow: hidden;
		border-radius: 1rem;
	}

	.image-card::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.25), transparent);
		opacity: 0;
		transition: opacity 0.4s ease;
		pointer-events: none;
	}

	.image-card:hover::after {
		opacity: 1;
	}

	.image-card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.7s ease;
	}

	.image-card:hover img {
		transform: scale(1.08);
	}

	/* Church / Municipal / Airstrip / Surge mosaic */
	.mosaic-church,
	.mosaic-municipal {
		display: grid;
		grid-template-columns: 4fr 2fr;
		grid-template-rows: 3fr 2fr 1fr;
		gap: 0.75rem;
		height: 450px;
	}

	@media (min-width: 768px) {
		.mosaic-church,
		.mosaic-municipal {
			height: 500px;
		}
	}

	.mosaic-church .card-main,
	.mosaic-municipal .card-main {
		grid-column: 1;
		grid-row: 1 / 3;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
	}

	.mosaic-church .card-side,
	.mosaic-municipal .card-side {
		grid-column: 2;
		grid-row: 1;
	}

	.mosaic-church .card-accent,
	.mosaic-municipal .card-accent {
		grid-column: 2;
		grid-row: 2;
	}

	.mosaic-church .card-bottom,
	.mosaic-municipal .card-bottom {
		grid-column: 1 / -1;
		grid-row: 3;
	}

	/* Singers mosaic */
	.mosaic-singers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 0.75rem;
		height: 450px;
	}

	@media (min-width: 768px) {
		.mosaic-singers {
			height: 500px;
		}
	}

	.mosaic-singers .card-tall {
		grid-row: 1 / -1;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
	}

	.mosaic-singers .card-small {
		grid-column: 2;
		grid-row: 1;
	}

	.mosaic-singers .card-accent {
		grid-column: 2;
		grid-row: 2;
	}

	/* Kuratsa / Bride mosaic */
	.mosaic-kuratsa {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 0.75rem;
		height: 450px;
	}

	@media (min-width: 768px) {
		.mosaic-kuratsa {
			height: 500px;
		}
	}

	.card-kuratsa-1 {
		grid-row: 1 / -1;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
	}

	.card-kuratsa-2 {
		grid-column: 2;
		grid-row: 1;
	}

	/* Plaza grid */
	.plaza-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	@media (min-width: 1024px) {
		.plaza-grid {
			grid-template-columns: 1fr 2fr;
			gap: 4rem;
		}
	}

	.plaza-images {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 1fr 1fr;
		gap: 0.75rem;
		height: 350px;
	}

	@media (min-width: 768px) {
		.plaza-images {
			height: 400px;
		}
	}

	.plaza-main {
		grid-column: 1 / 3;
		grid-row: 1;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
	}

	.plaza-side:nth-child(2) {
		grid-column: 3;
		grid-row: 1;
	}

	.plaza-side:nth-child(3) {
		grid-column: 1;
		grid-row: 2;
	}

	.accent-gold-glass {
		grid-column: 2 / 4;
		grid-row: 2;
	}

	/* ========================================
	   ACCENT CARDS (colored overlay cards)
	   ======================================== */
	.card-accent {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-accent::after {
		display: none;
	}

	.accent-content {
		text-align: center;
		padding: 1rem;
	}

	.accent-icon {
		width: 2.5rem;
		height: 2.5rem;
		margin: 0 auto 0.5rem;
		opacity: 0.9;
		color: currentColor;
	}

	.accent-number {
		font-family: 'Playfair Display', Georgia, serif;
		font-size: 2.25rem;
		color: #fff;
	}

	.accent-number-small {
		font-family: 'Playfair Display', Georgia, serif;
		font-size: 1.1rem;
		color: #fff;
	}

	.accent-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		opacity: 0.8;
		margin-top: 0.25rem;
		color: #fff;
	}

	/* Default amber accent */
	.card-accent:not([class*='accent-']),
	.mosaic-church .card-accent {
		background: linear-gradient(135deg, #d4af37, #b8860b);
		color: #fff;
	}

	.accent-teal {
		background: linear-gradient(135deg, #0d9488, #0f766e);
		color: #fff;
	}

	.accent-rose {
		background: linear-gradient(135deg, #e11d48, #be123c);
		color: #fff;
	}

	.accent-gold-glass {
		background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), rgba(184, 134, 11, 0.15));
		border: 1px solid rgba(212, 175, 55, 0.25);
		backdrop-filter: blur(8px);
	}

	.accent-gold-glass .accent-number-small {
		color: #d4af37;
	}

	.accent-gold-glass .accent-label {
		color: rgba(255, 255, 255, 0.5);
	}

	.accent-gold-glass .accent-icon {
		color: #d4af37;
	}

	.accent-indigo {
		background: linear-gradient(135deg, #6366f1, #4f46e5);
		color: #fff;
	}

	.accent-slate {
		background: linear-gradient(135deg, #475569, #334155);
		color: #fff;
	}

	.accent-emerald {
		background: linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(5, 150, 105, 0.18));
		border: 1px solid rgba(16, 185, 129, 0.3);
	}

	.accent-emerald .accent-icon {
		color: #34d399;
	}

	.accent-emerald .accent-number-small,
	.accent-emerald .accent-label {
		color: rgba(255, 255, 255, 0.7);
	}

	.accent-fuchsia {
		background: linear-gradient(135deg, #c026d3, #a21caf);
		color: #fff;
	}

	.icon-rose {
		color: #fff;
	}

	/* ========================================
	   KURATSA FEATURE BOX
	   ======================================== */
	.kuratsa-feature {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.feature-icon {
		width: 3.5rem;
		height: 3.5rem;
		border-radius: 50%;
		background: rgba(225, 29, 72, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.feature-icon svg {
		width: 1.75rem;
		height: 1.75rem;
		color: #e11d48;
	}

	.feature-title {
		font-weight: 500;
		color: #292524;
	}

	.feature-desc {
		font-size: 0.85rem;
		color: #78716c;
	}

	/* ========================================
	   SMOOTH SCROLL
	   ======================================== */
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
