<script>
	import { onMount } from 'svelte';
	import Modal from '$lib/Modal.svelte';
	import InteractiveWeatherWidget from '$lib/InteractiveWeatherWidget.svelte';
	import HeroRippleCanvas from '$lib/Components/HeroRippleCanvas.svelte';
	let gsap;
	let { data } = $props();

	let selectedNews = $state(null);
	let isModalOpen = $state(false);

	function openNewsModal(newsItem) {
		selectedNews = newsItem;
		isModalOpen = true;
	}

	function closeNewsModal() {
		isModalOpen = false;
		selectedNews = null;
	}

	// Hero slides with paired announcements
	const heroContent = [
		{
			image: '/Tourism/church/chruch-1.jpg',
			headline: 'Historic Our Lady Of Assumption Church',
			subtext: 'A testament to our rich cultural heritage and faith'
		},
		{
			image: '/Tourism/skimboarding/skimboarding archive/dagat-5.jpg',
			headline: 'Pristine Coastal Waters',
			subtext: "Experience the beauty of Tanauan's stunning coastline"
		},
		{
			image: '/Tourism/municipyo/municipyo-1.jpg',
			headline: 'Serving Our Community',
			subtext: 'Committed to transparent and efficient governance'
		},
		{
			image: '/Tourism/plaza/plaza-1.jpg',
			headline: 'Heart of Tanauan',
			subtext: 'Where history meets modern community life'
		}
	];

	let currentSlide = $state(0);
	let isAutoPlaying = $state(true);
	let isTransitioning = $state(false);

	// Official Announcements Fallback Roster
	const defaultAnnouncements = [
		{
			id: 'pagasa-weather',
			department: 'DOST-PAGASA',
			header: 'DOST-PAGASA Weather Advisory: Eastern Visayas partly cloudy with localized rainshowers. No active tropical cyclone in PAR.',
			content: 'Official DOST-PAGASA Weather Bulletin for Tanauan, Leyte and Eastern Visayas:\n\n• Synoptic Condition: Easterlies affecting the eastern section of Visayas.\n• Forecast: Partly cloudy to cloudy skies with isolated rainshowers or thunderstorms.\n• Coastal Waters: Slight to moderate sea conditions.\n• Cyclone Advisory: Tropical Cyclone Wind Signal (TCWS) #0. No active tropical disturbance or storm threat within the Philippine Area of Responsibility (PAR).\n\nResidents along coastal barangays (San Roque, Sto. Niño, Bislig, Mohon) and low-lying agricultural areas are advised to stay updated via official MDRRMO broadcasts.',
			date_added: new Date().toISOString()
		},
		{
			id: 'hotline-bulletin',
			department: 'MDRRMO',
			header: 'Tanauan 24/7 Emergency Hotlines Active: Rescue 0912-936-6706 | PNP 0951-163-3878 | BFP 0916-197-4504',
			content: 'The Tanauan Municipal Disaster Risk Reduction and Management Office (MDRRMO) reminds all residents that 24/7 Emergency Dispatch is on full operational standby.\n\n• Tanauan Rescue / Ambulance: 0912-936-6706 / 0916-197-7360\n• Philippine National Police (Tanauan MPS): 0951-163-3878 / 0917-120-5207\n• Bureau of Fire Protection (Tanauan Fire Station): 0916-197-4504 / 0922-344-8887\n• Municipal Hall Switchboard: +63 53 123 4567\n\nSave these emergency contacts on your mobile phones.',
			date_added: new Date().toISOString()
		},
		{
			id: 'bplo-permits',
			department: 'BPLO',
			header: 'Business Permits & Real Property Tax 20% Prompt-Payment Discount Notice',
			content: 'The Office of the Municipal Mayor and the Municipal Treasurer’s Office (MTO) inform commercial establishment owners and landholders in Tanauan, Leyte:\n\n• Business Permit Renewal and Business One-Stop Shop (BOSS) is accessible at the Ground Floor, Municipal Hall.\n• Real Property Tax (Amilyar) payments settled before March 31 qualify for prompt-payment discounts of up to 20%.\n\nPayments can be transacted at MTO Counter 1 to 4, Monday through Friday, 8:00 AM – 5:00 PM without noon break.',
			date_added: new Date().toISOString()
		},
		{
			id: 'mswdo-payout',
			department: 'MSWDO',
			header: 'Social Welfare Assistance (AICS) & Senior Citizens OSCA ID Validation Ongoing',
			content: 'The Municipal Social Welfare and Development Office (MSWDO) conducts regular validation for the Social Pension Program, Assistance to Individuals in Crisis Situations (AICS), Solo Parent registrations, and Persons with Disability (PDAO) assistance.\n\nRequirements may be submitted at the MSWDO Help Desk, Tanauan Municipal Compound.',
			date_added: new Date().toISOString()
		}
	];

	let activeAnnouncements = $derived(
		data.announcements && data.announcements.length > 0
			? data.announcements
			: defaultAnnouncements
	);


	let copiedHotline = $state('');
	async function copyHotlineNumber(num) {
		try {
			await navigator.clipboard.writeText(num);
			copiedHotline = num;
			setTimeout(() => {
				if (copiedHotline === num) copiedHotline = '';
			}, 2000);
		} catch (e) {}
	}

	let isChangingText = $state(false);
	let heroTimer = null;

	function startHeroTimer() {
		if (heroTimer) clearInterval(heroTimer);
		heroTimer = setInterval(() => {
			if (isAutoPlaying && typeof document !== 'undefined' && document.visibilityState === 'visible') {
				nextSlide();
			}
		}, 6000);
	}

	function goToSlide(index) {
		if (index === currentSlide || isTransitioning) return;
		isTransitioning = true;
		isChangingText = true;

		// 1. Text smoothly fades out (250ms)
		setTimeout(() => {
			currentSlide = index;
			// 2. New slide text is placed, smoothly fades in (350ms)
			isChangingText = false;
		}, 260);

		// 3. Reset auto-play interval so it never double-skips
		startHeroTimer();

		// 4. Release transition lock after image cross-fade finishes (1000ms)
		setTimeout(() => {
			isTransitioning = false;
		}, 1000);
	}

	function nextSlide() {
		goToSlide((currentSlide + 1) % heroContent.length);
	}

	function prevSlide() {
		goToSlide((currentSlide - 1 + heroContent.length) % heroContent.length);
	}

	// ── PowerPoint Slide Transition between Hero and Next Section ──
	let heroSection = $state(null);
	let nextSection = $state(null);
	let isSlideTransitioning = $state(false);

	function transitionToNextSection() {
		if (isSlideTransitioning || !nextSection || !heroSection) return;
		isSlideTransitioning = true;

		const targetY = nextSection.offsetTop || heroSection.offsetHeight;

		window.scrollTo({
			top: targetY,
			behavior: 'smooth'
		});

		setTimeout(() => {
			isSlideTransitioning = false;
		}, 850);
	}

	function transitionToHeroSection() {
		if (isSlideTransitioning) return;
		isSlideTransitioning = true;

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});

		setTimeout(() => {
			isSlideTransitioning = false;
		}, 850);
	}

	onMount(async () => {
		const gsapModule = await import('gsap');
		gsap = gsapModule.default || gsapModule;
		const ScrollTriggerModule = await import('gsap/ScrollTrigger');
		const ScrollTrigger = ScrollTriggerModule.default || ScrollTriggerModule;
		gsap.registerPlugin(ScrollTrigger);

		// ── Staggered hero entrance for welcome headline ──
		gsap.from('.hero-badge', {
			opacity: 0,
			y: 28,
			duration: 0.9,
			ease: 'power3.out',
			delay: 0.15
		});

		// Hero autoplay
		startHeroTimer();
		// Announcements ticker autoplay
		startAnnouncementTimer();

		// Scroll animations
		gsap.utils.toArray('.animate-on-scroll').forEach((el, i) => {
			gsap.from(el, {
				scrollTrigger: { trigger: el, start: 'top 85%' },
				opacity: 0,
				y: 40,
				duration: 0.7,
				ease: 'power3.out',
				delay: i * 0.08
			});
		});

		// ── PowerPoint-Style Wheel & Touch Transition ──
		let touchStartY = 0;
		let touchStartX = 0;

		function handleWheel(e) {
			if (!heroSection || !nextSection || isSlideTransitioning) return;

			const heroHeight = heroSection.offsetHeight;
			const currentY = window.scrollY;

			// When at the hero section and user scrolls DOWN
			if (currentY < heroHeight * 0.35 && e.deltaY > 12) {
				e.preventDefault();
				transitionToNextSection();
			}
			// When at the start of the next section and user scrolls UP
			else if (currentY >= heroHeight * 0.7 && currentY <= heroHeight + 50 && e.deltaY < -12) {
				e.preventDefault();
				transitionToHeroSection();
			}
		}

		function handleTouchStart(e) {
			if (e.touches && e.touches.length > 0) {
				touchStartY = e.touches[0].clientY;
				touchStartX = e.touches[0].clientX;
			}
		}

		function handleTouchMove(e) {
			if (!heroSection || !nextSection || isSlideTransitioning || !e.touches || e.touches.length === 0) return;

			const currentY = e.touches[0].clientY;
			const currentX = e.touches[0].clientX;
			const deltaY = currentY - touchStartY;
			const deltaX = currentX - touchStartX;

			// Ensure it's a vertical swipe
			if (Math.abs(deltaY) < Math.abs(deltaX) * 1.2) return;

			const heroHeight = heroSection.offsetHeight;
			const scrollY = window.scrollY;

			// If at hero section and swiping up (moving down into page)
			if (scrollY < 40 && deltaY < -28) {
				if (e.cancelable) e.preventDefault();
				transitionToNextSection();
			}
			// If at next section header and swiping down (moving back up to hero)
			else if (scrollY <= heroHeight + 60 && scrollY >= heroHeight * 0.6 && deltaY > 28) {
				if (e.cancelable) e.preventDefault();
				transitionToHeroSection();
			}
		}

		window.addEventListener('wheel', handleWheel, { passive: false });
		window.addEventListener('touchstart', handleTouchStart, { passive: true });
		window.addEventListener('touchmove', handleTouchMove, { passive: false });

		return () => {
			if (heroTimer) clearInterval(heroTimer);
			if (announcementTimer) clearInterval(announcementTimer);
			window.removeEventListener('wheel', handleWheel);
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchmove', handleTouchMove);
		};
	});

	// Announcements Ticker Carousel State
	let currentAnnouncementIdx = $state(0);
	let announcementTimer = null;
	let isAnnouncementPaused = $state(false);

	function startAnnouncementTimer() {
		if (announcementTimer) clearInterval(announcementTimer);
		announcementTimer = setInterval(() => {
			if (!isAnnouncementPaused && activeAnnouncements.length > 1) {
				currentAnnouncementIdx = (currentAnnouncementIdx + 1) % activeAnnouncements.length;
			}
		}, 5500);
	}

	function nextAnnouncement() {
		if (activeAnnouncements.length > 0) {
			currentAnnouncementIdx = (currentAnnouncementIdx + 1) % activeAnnouncements.length;
		}
	}

	function prevAnnouncement() {
		if (activeAnnouncements.length > 0) {
			currentAnnouncementIdx = (currentAnnouncementIdx - 1 + activeAnnouncements.length) % activeAnnouncements.length;
		}
	}
</script>

<svelte:head>
	<title>Municipality of Tanauan, Leyte | Official Website</title>
</svelte:head>

<!-- Hero Section -->
<section
	bind:this={heroSection}
	class="relative h-screen min-h-[700px] w-full overflow-hidden transition-all duration-700 ease-out {isSlideTransitioning ? 'opacity-95' : ''}"
>
	<!-- Slides -->
	{#each heroContent as content, index}
		<div
			class="hero-slide absolute inset-0 h-full w-full overflow-hidden transition-opacity duration-1000 ease-in-out {currentSlide === index ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'}"
		>
			<img
				src={content.image}
				alt={content.headline}
				loading={index === 0 ? 'eager' : 'lazy'}
				decoding={index === 0 ? 'sync' : 'async'}
				class="h-full w-full object-cover transition-transform duration-[7000ms] ease-out {currentSlide === index ? 'scale-105' : 'scale-100'}"
			/>
		</div>
	{/each}

	<!-- Multi-layer cinematic gradient overlay -->
	<div class="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/85 via-black/40 to-black/20"></div>
	<div class="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-blue-950/70 via-blue-900/20 to-transparent"></div>
	<div class="pointer-events-none absolute top-0 right-0 left-0 z-[2] h-40 bg-gradient-to-b from-black/60 to-transparent"></div>

	<!-- Floating decorative orbs for depth -->
	<div class="hero-orb pointer-events-none absolute top-1/4 right-1/4 z-[2] h-64 w-64 rounded-full bg-yellow-400/5 blur-3xl"></div>
	<div class="hero-orb pointer-events-none absolute bottom-1/3 left-1/3 z-[2] h-96 w-96 rounded-full bg-blue-500/8 blur-3xl"></div>

	<!-- Decorative grid lines -->
	<div class="pointer-events-none absolute inset-0 z-[2] opacity-[0.04]" style="background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px); background-size: 60px 60px;"></div>

	<!-- Interactive Fluid Water Ripple Effect on Mouse Move & Click -->
	<HeroRippleCanvas />

	<!-- HERO CONTENT — editorial bottom-left -->
	<div class="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end pb-20 md:pb-24">
		<div class="container mx-auto px-8 md:px-16 lg:px-24">
			<div class="hero-text pointer-events-auto max-w-3xl">

				<!-- MAIN HEADING — permanent large headline -->
				<div class="hero-badge mb-3">
					<h1 class="welcome-main-headline text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
						Welcome to Tanauan, Leyte
					</h1>
				</div>

				<!-- Dynamic synchronized slide text -->
				<div class="hero-slide-text transition-all duration-300 ease-out {isChangingText ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}">
					<!-- Rotating slide headline — secondary -->
					<p class="hero-headline mb-2 text-sm font-semibold leading-snug text-yellow-200/90 sm:text-base md:text-lg">
						{heroContent[currentSlide].headline}
					</p>

					<!-- Subtext -->
					<p class="hero-subtext mb-6 max-w-lg text-sm leading-relaxed text-white/75">
						{heroContent[currentSlide].subtext}
					</p>
				</div>

				<!-- CTA Buttons -->
				<div class="hero-ctas flex flex-wrap items-center gap-3">
					<a
						href="/Tourism/Cultural Heritage"
						class="group inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-sm font-bold text-blue-900 shadow-lg shadow-yellow-400/25 transition-all duration-300 hover:bg-yellow-300 hover:-translate-y-0.5 cursor-pointer"
					>
						<span>Explore Tanauan</span>
						<svg class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
					<a
						href="/Officials"
						class="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 cursor-pointer"
					>
						Our Officials
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Navigation Arrows -->
	<button
		onclick={prevSlide}
		class="group absolute top-1/2 left-4 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/25 md:left-8 md:h-14 md:w-14 cursor-pointer"
		aria-label="Previous slide"
	>
		<svg class="h-6 w-6 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
	</button>
	<button
		onclick={nextSlide}
		class="group absolute top-1/2 right-4 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/25 md:right-8 md:h-14 md:w-14 cursor-pointer"
		aria-label="Next slide"
	>
		<svg class="h-6 w-6 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
		</svg>
	</button>

	<!-- Navigation Dots -->
	<div class="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-4">
		<div class="flex items-center gap-3">
			{#each heroContent as _, index}
				<button
					onclick={() => goToSlide(index)}
					class={`relative h-2.5 rounded-full transition-all duration-500 overflow-hidden cursor-pointer ${
						currentSlide === index ? 'w-12 bg-white/25' : 'w-2.5 bg-white/40 hover:bg-white/70'
					}`}
					aria-label={`Go to slide ${index + 1}`}
				>
					{#if currentSlide === index}
						{#key currentSlide}
							<span
								class="absolute inset-0 rounded-full bg-yellow-400 shadow-md shadow-yellow-400/50 slide-progress-fill"
							></span>
						{/key}
					{/if}
				</button>
			{/each}
		</div>
		<!-- Scroll cue with direct slide transition on click -->
		<button
			type="button"
			onclick={transitionToNextSection}
			class="flex flex-col items-center gap-1.5 text-white/60 hover:text-yellow-400 transition-colors cursor-pointer group"
			aria-label="Transition to next section"
		>
			<span class="text-[9px] font-bold tracking-[0.3em] uppercase group-hover:tracking-[0.35em] transition-all">Scroll</span>
			<div class="scroll-cue flex h-8 w-5 items-start justify-center rounded-full border border-white/30 group-hover:border-yellow-400/80 p-1 transition-colors">
				<div class="scroll-dot h-1.5 w-1 rounded-full bg-white/70 group-hover:bg-yellow-400"></div>
			</div>
		</button>
	</div>
</section>

<!-- Redesigned Civic Live Bulletin & Announcements Strip -->
<section
	bind:this={nextSection}
	class="announcements-section relative z-20 border-b border-slate-200/90 bg-white/95 py-2.5 shadow-xs backdrop-blur-md"
>
	<div class="container mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
		<div class="flex flex-col justify-between gap-2.5 lg:flex-row lg:items-center">
			<!-- Left: Live Beacon & Emergency Rescue Badge -->
			<div class="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
				<!-- Live Bulletins Capsule -->
				<span class="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold tracking-wider text-white shadow-xs">
					<span class="relative flex h-2 w-2">
						<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
					</span>
					<span class="uppercase tracking-widest text-[10px]">Bulletins</span>
					<span class="rounded bg-emerald-500/25 px-1.5 py-0.2 text-[8.5px] font-black text-emerald-300">LIVE</span>
				</span>

				<!-- Emergency Rescue 24/7 Hotline Pill -->
				<a
					href="tel:09129366706"
					class="group inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50/90 px-3 py-1 text-xs font-bold text-red-700 shadow-2xs transition-all hover:bg-red-100 hover:border-red-300"
					title="Direct Dial: Tanauan Rescue 24/7 (0912-936-6706)"
				>
					<svg class="h-3.5 w-3.5 text-red-600 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
					</svg>
					<span>Rescue 24/7: <span class="font-mono font-extrabold text-red-800">0912-936-6706</span></span>
				</a>
			</div>

			<!-- Middle: Active Cycling Bulletin Ticker -->
			{#if activeAnnouncements.length > 0}
				{@const cur = activeAnnouncements[currentAnnouncementIdx] || activeAnnouncements[0]}
				<div
					class="flex min-w-0 flex-1 items-center gap-3 overflow-hidden rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-1.5 transition-colors hover:bg-slate-100/70"
					role="region"
					aria-label="Active civic announcement"
					onmouseenter={() => (isAnnouncementPaused = true)}
					onmouseleave={() => (isAnnouncementPaused = false)}
				>
					<button
						onclick={() => openNewsModal(cur)}
						class="group flex min-w-0 flex-1 items-center gap-2.5 text-left cursor-pointer"
						title="Click to view full official bulletin"
					>
						<span
							class={`shrink-0 rounded-md border px-2 py-0.5 text-[9.5px] font-black tracking-wider uppercase transition-colors ${
								cur.department === 'MDRRMO'
									? 'border-amber-200 bg-amber-100/80 text-amber-900'
									: cur.department === 'HEALTH OFFICE'
										? 'border-cyan-200 bg-cyan-100/80 text-cyan-900'
										: cur.department === 'BPLO'
											? 'border-emerald-200 bg-emerald-100/80 text-emerald-900'
											: 'border-blue-200 bg-blue-100/80 text-blue-900'
							}`}
						>
							{cur.department || 'LGU'}
						</span>
						<p class="truncate text-xs font-semibold text-slate-700 transition-colors group-hover:text-blue-900">
							{cur.header.replace(/[🚫🔴⚠️📢]/g, '').trim()}
						</p>
					</button>

					<!-- Micro Stepper & Carousel Controls -->
					{#if activeAnnouncements.length > 1}
						<div class="flex items-center gap-1 shrink-0 text-slate-400">
							<span class="font-mono text-[10px] font-semibold text-slate-400 mr-0.5">
								{currentAnnouncementIdx + 1}/{activeAnnouncements.length}
							</span>
							<button
								onclick={prevAnnouncement}
								aria-label="Previous announcement"
								class="flex h-5 w-5 items-center justify-center rounded-md hover:bg-white hover:text-slate-700 transition cursor-pointer"
							>
								<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" /></svg>
							</button>
							<button
								onclick={nextAnnouncement}
								aria-label="Next announcement"
								class="flex h-5 w-5 items-center justify-center rounded-md hover:bg-white hover:text-slate-700 transition cursor-pointer"
							>
								<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" /></svg>
							</button>
						</div>
					{/if}
				</div>
			{/if}

			<!-- Right: Quick Actions -->
			<div class="flex items-center gap-2 shrink-0">
				<a
					href="/Contact"
					class="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
				>
					<svg class="h-3.5 w-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
					</svg>
					<span>Hotlines</span>
				</a>
				<a
					href="/News/Local and Abroad"
					class="inline-flex items-center gap-1 rounded-xl bg-blue-900 px-3 py-1 text-xs font-bold text-white shadow-2xs transition hover:bg-blue-950"
				>
					<span>View All</span>
					<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- COMMENTED OUT: Citizen E-Portal & Official Advisory (Better & Brighter Tanauan Updates)
<section class="services-section py-12 md:py-16 bg-slate-50 border-b border-slate-200">
  <div class="container mx-auto px-6 md:px-12 max-w-7xl">
    <div class="flex flex-col lg:flex-row shadow-md bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
      <div class="lg:w-2/5 bg-blue-900 p-8 flex flex-col justify-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-950"></div>
        <div class="absolute right-0 top-0 opacity-10">
          <svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="white" stroke-width="2"/>
            <circle cx="50" cy="50" r="30" stroke="white" stroke-width="2"/>
          </svg>
        </div>
        
        <div class="relative z-10 text-white">
          <div class="flex items-center gap-3 mb-4">
            <span class="p-2 bg-yellow-400/20 rounded-lg text-yellow-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
            </span>
            <span class="text-xs font-bold uppercase tracking-widest text-blue-200">Official Advisory</span>
          </div>
          <h2 class="text-2xl font-bold mb-4 leading-tight">Better & Brighter Tanauan Updates</h2>
          <div class="relative w-full h-40 rounded-xl overflow-hidden shadow-inner bg-slate-900">
            {#each announcementSlides as slide, index}
              <img
                src={slide}
                alt="LGU Announcement"
                class={`announcement-slide announcement-slide-${index} absolute inset-0 w-full h-full object-cover`}
              />
            {/each}
          </div>
        </div>
      </div>

      <div class="lg:w-3/5 p-8">
        <div class="flex items-end justify-between mb-6">
          <div>
            <h3 class="text-xl font-bold text-slate-800">Citizen E-Services Portal</h3>
            <p class="text-sm text-slate-500 mt-1">Quick access to essential government services</p>
          </div>
          <a href="/services" class="text-sm font-bold text-blue-700 hover:text-blue-800 hover:underline">View All</a>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {#each citizenServices as service}
            <a href={service.href} class="group flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 hover:shadow-sm transition-all duration-300">
              <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-slate-600 group-hover:text-blue-700 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={service.icon}/></svg>
              </div>
              <div>
                <h4 class="font-bold text-slate-800 text-sm group-hover:text-blue-900 transition-colors">{service.title}</h4>
                <p class="text-xs text-slate-500 mt-0.5">{service.desc}</p>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
-->

<!-- Main Content Section: News & Sidebar -->
<section id="news" class="news-section border-b border-slate-200 bg-slate-50 px-6 py-16 md:px-12">
	<div class="container mx-auto max-w-7xl">
		<div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
			<!-- Left Column: News (8 cols) -->
			<div class="space-y-8 lg:col-span-8">
				<div class="flex items-end justify-between border-b border-slate-200 pb-4">
					<div>
						<span class="text-[10px] font-bold tracking-widest text-blue-700 uppercase"
							>News & Press Releases</span
						>
						<h2 class="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
							Latest Information
						</h2>
					</div>
					<a
						href="/News/Local and Abroad"
						class="group inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 transition-colors hover:text-blue-700"
					>
						Local & Abroad News
						<svg
							class="h-4 w-4 transition-transform group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				</div>

				{#if data.posts && data.posts.length > 0}
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						{#each data.posts.slice(0, 6) as newsItem, index (newsItem.id)}
							<article
								class={`animate-on-scroll group cursor-pointer ${index === 0 ? 'md:col-span-2' : ''}`}
							>
								<div
									class="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-blue-200 hover:shadow-md"
								>
									<div class={`relative overflow-hidden ${index === 0 ? 'h-72' : 'h-48'}`}>
										{#if newsItem.media && newsItem.media.length > 0}
											<img
												src={newsItem.media.toString().split(',')[0]}
												alt={newsItem.header}
												class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
											/>
										{:else}
											<div class="flex h-full w-full items-center justify-center bg-slate-100">
												<svg
													class="h-12 w-12 text-slate-300"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													><path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="1.5"
														d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
													/></svg
												>
											</div>
										{/if}
										<!-- Category Badge -->
										<div
											class="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wider text-blue-900 uppercase shadow-sm backdrop-blur-sm"
										>
											{newsItem.type === 'news' || newsItem.type === 'local news'
												? 'Local News'
												: newsItem.type === 'abroad news'
													? 'Abroad News'
													: newsItem.type === 'announcement'
														? 'Announcement'
														: newsItem.type || 'News'}
										</div>
									</div>
									<div class="flex flex-grow flex-col p-6">
										<span
											class="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-400"
										>
											<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
												><path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
												/></svg
											>
											{newsItem.date_added
												? new Date(newsItem.date_added).toLocaleDateString('en-US', {
														month: 'short',
														day: 'numeric',
														year: 'numeric'
													})
												: 'Recent'}
										</span>
										<h3
											class={`mb-3 leading-tight font-bold text-slate-900 transition-colors group-hover:text-blue-700 ${index === 0 ? 'text-2xl' : 'text-lg'}`}
										>
											{newsItem.header}
										</h3>
										<p class="mb-4 line-clamp-2 flex-grow text-sm leading-relaxed text-slate-600">
											{newsItem.content}
										</p>

										<div class="mt-auto flex justify-end border-t border-slate-100 pt-4">
											<button
												onclick={() => openNewsModal(newsItem)}
												class="flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:underline hover:text-blue-900"
											>
												Read full article
												<svg
													class="h-3 w-3 transition-transform group-hover:translate-x-1"
													fill="none"
													stroke="currentColor"
													stroke-width="2.5"
													viewBox="0 0 24 24"
													><path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M9 5l7 7-7 7"
													/></svg
												>
											</button>
										</div>
									</div>
								</div>
							</article>
						{/each}
					</div>
				{:else}
					<div
						class="rounded-2xl border border-slate-200 bg-white py-16 text-center text-slate-400"
					>
						<svg
							class="mx-auto mb-4 h-12 w-12 opacity-50"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
							/></svg
						>
						<p class="font-semibold">No news articles yet.</p>
						<p class="mt-1 text-sm">Check back later for the latest updates.</p>
					</div>
				{/if}
			</div>

			<!-- Right Column: Sidebar (4 cols) -->
			<aside class="space-y-6 lg:col-span-4">
				<!-- Official DOST-PAGASA Interactive Weather & Advisory Bulletin Widget -->
				<InteractiveWeatherWidget />

				<!-- 24/7 Emergency Hotlines Quick Card -->
				<div
					class="animate-on-scroll overflow-hidden rounded-3xl border border-red-200 bg-white shadow-md"
				>
					<div class="bg-gradient-to-r from-red-600 to-rose-700 p-4 text-white">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<span class="flex h-3 w-3 rounded-full bg-white animate-ping"></span>
								<h3 class="text-sm font-black uppercase tracking-wider">24/7 Emergency Hotlines</h3>
							</div>
							<span class="rounded bg-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
								Immediate Dispatch
							</span>
						</div>
						<p class="mt-1 text-xs text-red-100">Municipal Operations & Disaster Response Center</p>
					</div>

					<div class="p-4 space-y-3">
						<!-- Rescue Hotline -->
						<div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
							<div>
								<span class="text-[10px] font-extrabold uppercase tracking-wider text-red-700 block">Tanauan Rescue / MDRRMO</span>
								<span class="text-sm font-black text-slate-900">0912-936-6706</span>
							</div>
							<div class="flex items-center gap-1.5">
								<button
									onclick={() => copyHotlineNumber('0912-936-6706')}
									class="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:text-blue-900 transition"
									title="Copy Number"
								>
									{#if copiedHotline === '0912-936-6706'}
										<svg class="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
									{:else}
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
									{/if}
								</button>
								<a
									href="tel:09129366706"
									class="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700 transition"
								>
									Call
								</a>
							</div>
						</div>

						<!-- Police Hotline -->
						<div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
							<div>
								<span class="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 block">Municipal Police (PNP)</span>
								<span class="text-sm font-black text-slate-900">0951-163-3878</span>
							</div>
							<div class="flex items-center gap-1.5">
								<button
									onclick={() => copyHotlineNumber('0951-163-3878')}
									class="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:text-blue-900 transition"
									title="Copy Number"
								>
									{#if copiedHotline === '0951-163-3878'}
										<svg class="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
									{:else}
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
									{/if}
								</button>
								<a
									href="tel:09511633878"
									class="rounded-lg bg-blue-900 px-3 py-2 text-xs font-bold text-white hover:bg-blue-800 transition"
								>
									Call
								</a>
							</div>
						</div>

						<!-- Fire Station Hotline -->
						<div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
							<div>
								<span class="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 block">Bureau of Fire (BFP)</span>
								<span class="text-sm font-black text-slate-900">0916-197-4504</span>
							</div>
							<div class="flex items-center gap-1.5">
								<button
									onclick={() => copyHotlineNumber('0916-197-4504')}
									class="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:text-blue-900 transition"
									title="Copy Number"
								>
									{#if copiedHotline === '0916-197-4504'}
										<svg class="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
									{:else}
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
									{/if}
								</button>
								<a
									href="tel:09161974504"
									class="rounded-lg bg-amber-600 px-3 py-2 text-xs font-bold text-white hover:bg-amber-700 transition"
								>
									Call
								</a>
							</div>
						</div>

						<!-- Municipal Hall Switchboard -->
						<div class="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
							<div>
								<span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 block">Municipal Hall Switchboard</span>
								<span class="text-sm font-black text-slate-900">+63 53 123 4567</span>
							</div>
							<div class="flex items-center gap-1.5">
								<button
									onclick={() => copyHotlineNumber('+63531234567')}
									class="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:text-blue-900 transition"
									title="Copy Number"
								>
									{#if copiedHotline === '+63531234567'}
										<svg class="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
									{:else}
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
									{/if}
								</button>
								<a
									href="tel:+63531234567"
									class="rounded-lg bg-slate-800 px-3 py-2 text-xs font-bold text-white hover:bg-slate-900 transition"
								>
									Call
								</a>
							</div>
						</div>

						<a
							href="/Contact"
							class="block rounded-xl border border-slate-200 bg-slate-100 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-700 transition hover:bg-blue-50 hover:text-blue-900"
						>
							View Full Directory & 54 Barangays →
						</a>
					</div>
				</div>

				<!-- Transparency Portal (GWT Compliance) -->
				<div
					class="animate-on-scroll overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
				>
					<div
						class="border-slate-150 flex items-center justify-center gap-3 border-b bg-slate-50 p-4"
					>
						<img
							src="/images/Ph transpaency.webp"
							alt="Transparency Seal"
							class="h-12 object-contain"
						/>
						<div class="text-left">
							<span class="block text-[10px] font-bold tracking-widest text-slate-500 uppercase"
								>Government Compliance</span
							>
							<h3 class="text-sm font-extrabold text-slate-800">Transparency Portal</h3>
						</div>
					</div>
					<div class="p-2">
						<a
							href="/full-disclosure-portal"
							class="group flex items-center gap-3 rounded-lg border-b border-slate-100 p-3 transition-colors last:border-0 hover:bg-slate-50"
						>
							<svg
								class="h-5 w-5 text-slate-400 group-hover:text-blue-700"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/></svg
							>
							<span class="text-xs font-bold text-slate-700 group-hover:text-blue-800"
								>Full Disclosure Portal</span
							>
						</a>
						<a
							href="/citizens-charter"
							class="group flex items-center gap-3 rounded-lg border-b border-slate-100 p-3 transition-colors last:border-0 hover:bg-slate-50"
						>
							<svg
								class="h-5 w-5 text-slate-400 group-hover:text-blue-700"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
								/></svg
							>
							<span class="text-xs font-bold text-slate-700 group-hover:text-blue-800"
								>Citizen's Charter</span
							>
						</a>
						<a
							href="/bids-and-awards"
							class="group flex items-center gap-3 rounded-lg border-b border-slate-100 p-3 transition-colors last:border-0 hover:bg-slate-50"
						>
							<svg
								class="h-5 w-5 text-slate-400 group-hover:text-blue-700"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
								/></svg
							>
							<span class="text-xs font-bold text-slate-700 group-hover:text-blue-800"
								>Bids & Awards</span
							>
						</a>
					</div>
				</div>

				<!-- Mayor's Corner -->
				<div
					class="animate-on-scroll overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
				>
					<div class="group relative h-40 overflow-hidden">
						<img
							src="/Tourism/municipyo/municipyo-2.jpg"
							alt="Hon. Mayor Gina Merilo"
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
						<div class="absolute bottom-4 left-5">
							<span
								class="text-[10px] font-bold tracking-widest text-yellow-400 uppercase drop-shadow-md"
								>Office of the Mayor</span
							>
							<h3 class="text-xl leading-tight font-bold text-white">Hon. Gina Merilo</h3>
						</div>
					</div>
					<div class="p-5">
						<p class="mb-4 text-sm leading-relaxed text-slate-600 italic">
							"Focusing on municipal infrastructure development, public safety, social welfare
							programs, and clean governance."
						</p>
						<a
							href="/Mayors Corner"
							class="inline-flex w-full justify-center rounded-lg border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
						>
							Read Mayor's Message
						</a>
					</div>
				</div>

				<!-- Facebook Stream -->
				<div class="animate-on-scroll rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div class="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
						<div
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1877F2] text-white"
						>
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
								/>
							</svg>
						</div>
						<h3 class="text-sm font-bold text-slate-800">Follow Official FB Page</h3>
					</div>
					<div
						class="flex min-h-[300px] w-full items-center justify-center overflow-hidden rounded-lg bg-slate-50"
					>
						<iframe
							src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/BetterAndBrighterTanauan&tabs=timeline&width=340&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
							title="Tanauan Facebook Page"
							width="340"
							height="300"
							style="border:none;overflow:hidden;width:100%;max-width:340px;"
							scrolling="no"
							frameborder="0"
							allowfullscreen="true"
							allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
						>
						</iframe>
					</div>
				</div>
			</aside>
		</div>
	</div>
</section>

<!-- News Modal -->
<Modal open={isModalOpen} title={selectedNews?.header || ''} size="max-w-2xl">
	{#if selectedNews}
		<div class="space-y-4">
			{#if selectedNews.media}
				<img
					src={selectedNews.media.toString().split(',')[0]}
					alt={selectedNews.header}
					class="h-64 w-full rounded-xl object-cover shadow-sm"
				/>
			{/if}
			<div class="prose max-w-none prose-slate">
				<p class="leading-relaxed whitespace-pre-wrap text-slate-700">{selectedNews.content}</p>
			</div>
			{#if selectedNews.link}
				<div
					class="mt-4 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 p-3"
				>
					<div class="flex items-center gap-2 text-blue-900">
						<svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
							/></svg
						>
						<span class="text-sm font-semibold">Attached Link:</span>
					</div>
					<a
						href={selectedNews.link}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:text-blue-900 hover:underline"
					>
						Visit External Page
						<svg
							class="h-4 w-4"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/></svg
						>
					</a>
				</div>
			{/if}
			<div class="mt-6 border-t border-slate-200 pt-4">
				<span class="text-xs font-semibold text-slate-500">
					Published: {selectedNews.date_added
						? new Date(selectedNews.date_added).toLocaleDateString('en-US', {
								month: 'short',
								day: 'numeric',
								year: 'numeric'
							})
						: 'Recent'}
				</span>
			</div>
			<button
				onclick={closeNewsModal}
				class="mt-4 w-full rounded-xl bg-slate-100 px-4 py-3 font-bold text-slate-800 transition-colors hover:bg-slate-200"
			>
				Close Article
			</button>
		</div>
	{/if}
</Modal>

<style>
	.announcements-section,
	.services-section,
	.news-section {
		font-family:
			'Inter',
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
	}

	/* ── Scroll cue bouncing dot ── */
	.scroll-dot {
		animation: scroll-bounce 1.6s ease-in-out infinite;
	}
	@keyframes scroll-bounce {
		0%, 100% { transform: translateY(0); opacity: 0.8; }
		50%       { transform: translateY(14px); opacity: 0.3; }
	}

	/* ── Welcome Badge Ambient Breathing Pulse ── */
	.badge-pulse {
		animation: badge-ambient 2.8s ease-in-out infinite;
	}
	@keyframes badge-ambient {
		0%, 100% {
			transform: scale(1);
			opacity: 0.6;
		}
		50% {
			transform: scale(1.6);
			opacity: 0;
		}
	}

	/* ── Slide Progress Indicator Fill ── */
	.slide-progress-fill {
		animation: progress-fill 6s linear forwards;
	}
	@keyframes progress-fill {
		0% {
			width: 0%;
		}
		100% {
			width: 100%;
		}
	}

	/* ── Hero GSAP entrance performance ── */
	.hero-badge,
	.hero-slide-text {
		will-change: opacity, transform;
	}

	/* ── Welcome Main Headline — Large Animated Gold ── */
	.welcome-main-headline {
		background: linear-gradient(110deg, #facc15 0%, #fef9c3 30%, #fde047 55%, #ca8a04 80%, #facc15 100%);
		background-size: 250% auto;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: welcome-gold-sweep 5s ease-in-out infinite;
		filter: drop-shadow(0 4px 24px rgba(250, 204, 21, 0.35)) drop-shadow(0 2px 4px rgba(0,0,0,0.8));
		letter-spacing: -0.02em;
	}
	@keyframes welcome-gold-sweep {
		0%   { background-position: 0%   50%; }
		50%  { background-position: 100% 50%; }
		100% { background-position: 0%   50%; }
	}
</style>
