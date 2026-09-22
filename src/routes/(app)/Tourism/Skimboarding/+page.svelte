<script>
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	gsap.registerPlugin(ScrollTrigger);

	let mouseX = 0;
	let mouseY = 0;

	// Skimboarding spots
	const spots = [
		{
			name: 'Santo Niño Beach',
			description:
				'The crown jewel of Tanauan skimboarding. A perfect 200-meter stretch of fine volcanic sand with consistent shore breaks rolling in every 8-12 seconds.',
			difficulty: 'Beginner to Intermediate',
			waveHeight: '0.5 - 1.5m',
			sandType: 'Fine volcanic sand',
			bestTime: '6:00 AM - 9:00 AM',
			facilities: ['Board rentals', 'Instructors', 'Refreshments', 'Restrooms'],
			img: '/Tourism/skimboarding/dagat-1.jpg'
		},
		{
			name: 'Bislig Point',
			description:
				'Where serious riders come to test their limits. Steeper beach angles and more powerful waves create opportunities for advanced maneuvers.',
			difficulty: 'Intermediate to Advanced',
			waveHeight: '1.0 - 2.5m',
			sandType: 'Mixed sand and pebble',
			bestTime: '5:30 AM - 8:00 AM',
			facilities: ['Limited amenities', 'Parking area'],
			img: '/Tourism/skimboarding/dagat-2.jpg'
		},
		{
			name: 'Cabuynan Cove',
			description:
				'A secluded paradise protected from strong winds, offering glassy water conditions ideal for photography and practicing new tricks.',
			difficulty: 'All Skill Levels',
			waveHeight: '0.3 - 1.0m',
			sandType: 'White coral sand',
			bestTime: 'All day (best at sunset)',
			facilities: ['Natural setting', 'Picnic areas'],
			img: '/Tourism/skimboarding/dagat-3.jpg'
		}
	];

	// History timeline with images
	const timeline = [
		{
			year: '2008',
			title: 'The Beginning',
			description:
				"Local fishermen's children discover skimboarding using makeshift wooden boards crafted from old fishing boats along the shores of Tanauan. What began as simple play during low tide soon became a passion.",
			img: '/Tourism/skimboarding/skimboarding%20archive/download%20(4).jpg'
		},
		{
			year: '2012',
			title: 'First Competition',
			description:
				'Tanauan hosts its first informal skimboarding contest with 15 participants from neighboring barangays. The event drew attention from the provincial government and local media.',
			img: '/Tourism/skimboarding/Screenshot%202026-04-07%20082925.JPG'
		},
		{
			year: '2016',
			title: 'Regional Recognition',
			description:
				'Eastern Visayas Tourism Board officially recognizes Tanauan as an emerging water sports destination. The municipality begins developing beachfront infrastructure to support the growing sport.',
			img: '/Tourism/skimboarding/skimboarding%20archive/dagat-5.jpg'
		},
		{
			year: '2019',
			title: 'National Spotlight',
			description:
				'Filipino pro skimboarders visit Tanauan, putting the town on the national skimboarding map. The visit inspired a new generation of local youth to pick up the sport.',
			img: '/Tourism/skimboarding/Screenshot%202026-04-07%20083037.JPG'
		},
		{
			year: '2023',
			title: 'Community Growth',
			description:
				'Local skimboarding community grows to over 500 active riders with organized training programs. Tanauan earns its reputation as the "Skimboarding Capital of Eastern Visayas."',
			img: '/Tourism/skimboarding/Screenshot%202026-04-07%20083255.JPG'
		},
		{
			year: '2025',
			title: 'A New Chapter',
			description:
				'Official Tanauan Skimboarding platform launches, connecting riders worldwide. The National Skimboarding competition was organized RIGHT WHERE IT STARTED — in Tanauan, Leyte.',
			img: '/Tourism/skimboarding/skimboarding%20archive/download.jpg'
		}
	];

	// Gallery images
	const galleryImages = [
		{
			src: '/Tourism/skimboarding/Screenshot%202026-04-07%20082847.JPG',
			alt: 'Skimboarder performing an aerial trick on Tanauan beach'
		},
		{
			src: '/Tourism/skimboarding/Screenshot%202026-04-07%20082925.JPG',
			alt: 'Local rider riding a wave at Santo Niño Beach'
		},
		{
			src: '/Tourism/skimboarding/Screenshot%202026-04-07%20083037.JPG',
			alt: 'Skimboarding action shot with water splash'
		},
		{
			src: '/Tourism/skimboarding/Screenshot%202026-04-07%20083255.JPG',
			alt: 'Tanauan skimboarder catching a wave'
		},
		{
			src: '/Tourism/skimboarding/skimboarding%20archive/download.jpg',
			alt: 'Skimboarding in Tanauan with clear blue water'
		},
		{
			src: '/Tourism/skimboarding/skimboarding%20archive/download%20(1).jpg',
			alt: 'Scenic beach view of Tanauan coastline'
		},
		{
			src: '/Tourism/skimboarding/skimboarding%20archive/dagat-5.jpg',
			alt: 'Beach pier with riders at sunset'
		},
		{
			src: '/Tourism/skimboarding/skimboarding%20archive/download%20(3).jpg',
			alt: 'Tanauan Skimboarding informational poster'
		}
	];

	// Essentials
	const essentials = [
		{
			title: 'What is Skimboarding?',
			content:
				"Skimboarding is a variation of surfing. Unlike surfing, which requires big waves far from shore, skimboarding can be done for as long as there are waves. Riders skim the surface on the shore break when the wave crashes and recedes to the sea — that's where the sport gets its name.",
			icon: 'wave'
		},
		{
			title: 'Why Tanauan?',
			content:
				"Tanauan's unique geography creates perfect skimboarding conditions year-round. Beaches face the Leyte Gulf, receiving consistent swells while being protected from extreme weather. The volcanic sand provides excellent traction, and the community is known as one of the friendliest in the Philippines.",
			icon: 'pin'
		},
		{
			title: 'Best Seasons',
			content:
				'Prime season runs from March to June. The Habagat (southwest monsoon) from July to October brings larger swells for advanced riders. November to February offers moderate conditions perfect for learning.',
			icon: 'sun'
		},
		{
			title: 'What to Bring',
			content:
				'Reef-safe sunscreen, rash guard, towel, drinking water. Board rentals available at Santo Niño Beach (₱150-300/day). A skimboard can be made of smoothed marine plywood or fiberglass, approximately 6 kilograms in weight — flat and shorter but wider than a surfboard.',
			icon: 'bag'
		}
	];

	// Techniques
	const techniques = [
		{
			name: 'The Drop',
			level: 'Beginner',
			description:
				'Run alongside your board, drop it flat on wet sand, and step on with your front foot first, then back foot. Keep your knees bent and weight centered.',
			tips: [
				'Start on flat water first',
				'Practice the motion without a board',
				'Keep your eyes forward, not down'
			],
			img: '/Tourism/skimboarding/skimboarding%20archive/download.jpg'
		},
		{
			name: 'Wave Wrap',
			level: 'Intermediate',
			description:
				'Ride out to meet an incoming wave, use its energy to turn 180°, and ride it back to shore. The bread and butter of wave skimboarding.',
			tips: [
				'Time your approach with the wave',
				'Lean into the turn',
				'Keep low center of gravity'
			],
			img: '/Tourism/skimboarding/Screenshot%202026-04-07%20082925.JPG'
		},
		{
			name: 'Backside Wrap',
			level: 'Intermediate',
			description:
				'Similar to the wave wrap but turning with your back facing the wave. More challenging but essential for progressing.',
			tips: ['Look over your shoulder', 'Commit to the rotation', 'Use your arms for balance'],
			img: '/Tourism/skimboarding/Screenshot%202026-04-07%20083037.JPG'
		},
		{
			name: 'Big Spin',
			level: 'Advanced',
			description:
				'A 360° board rotation combined with a 180° body rotation. One of the most stylish tricks in skimboarding.',
			tips: ['Master shuvits first', 'Pop the tail firmly', 'Catch with your back foot'],
			img: '/Tourism/skimboarding/Screenshot%202026-04-07%20083255.JPG'
		}
	];

	// Community
	const community = {
		totalRiders: 500,
		activeCoaches: 12,
		annualEvents: 10,
		description:
			'The Tanauan skimboarding community is a tight-knit family of ocean lovers. From young groms to seasoned veterans, everyone is welcome. Local riders are known for their hospitality, often lending boards and sharing waves with visitors.',
		meetups: 'Weekly meetups every Saturday at 6 AM at Santo Niño Beach. All skill levels welcome.',
		contact: 'Join our Facebook group: "Tanauan Skimboarding Community"'
	};

	// Travel directions
	const directions = {
		fromManila: {
			option1: 'Flight to Tacloban (1 hour 15 mins) → Van/Bus to Tanauan (30 mins)',
			option2: 'Bus to Tacloban via ferry (24-36 hours) → Local transport to Tanauan'
		},
		fromCebu: {
			option1: 'Flight to Tacloban (45 mins) → Van to Tanauan',
			option2: 'Fast craft to Ormoc (2 hours) → Bus to Tanauan (2.5 hours)'
		},
		localTransport:
			'Tricycles and habal-habal (motorcycle taxis) are available from Tanauan town proper to all beaches. Rates: ₱30-100 depending on distance.'
	};

	// Accommodation
	const accommodations = [
		{
			type: 'Budget',
			name: 'Local homestays',
			price: '₱500-800/night',
			note: 'Authentic local experience'
		},
		{
			type: 'Mid-range',
			name: 'Beach resorts',
			price: '₱1,500-3,000/night',
			note: 'Air-con, breakfast included'
		},
		{
			type: 'Premium',
			name: 'Private villas',
			price: '₱5,000+/night',
			note: 'Beachfront, full amenities'
		}
	];

	// FAQ
	let openFaq = $state(-1);
	const faqs = [
		{
			q: 'Is skimboarding dangerous?',
			a: 'Like any board sport, there are risks, but skimboarding in shallow water is relatively safe. Most injuries are minor scrapes. Always warm up, start in calm conditions, and progress gradually.'
		},
		{
			q: "Can I learn if I've never done any board sports?",
			a: 'Absolutely! Many of our local riders started with zero experience. The basics can be learned in 1-2 sessions. Patience and persistence are the only requirements.'
		},
		{
			q: "What's the minimum age to start?",
			a: "Children as young as 5-6 years old can start learning. Our community has riders from age 6 to 60+. It's never too early or too late to start."
		},
		{
			q: 'Do I need to know how to swim?',
			a: 'Basic swimming skills are recommended. Flatland skimboarding can be done in ankle-deep water, but knowing how to swim adds confidence and safety.'
		},
		{
			q: 'Are there instructors available?',
			a: 'Yes! Several certified local instructors offer lessons at Santo Niño Beach. Group lessons run ₱300-500 per person (2 hours), private lessons ₱800-1,200. Board rental usually included.'
		},
		{
			q: 'What should I do if I get injured?',
			a: 'Minor injuries can be treated at local sari-sari stores with first aid supplies. For serious injuries, the Tanauan District Hospital is 10 minutes away. We recommend travel insurance.'
		},
		{
			q: 'How is skimboarding different from surfing?',
			a: 'Unlike surfing which requires big waves far from shore, skimboarding starts on the sand. You run, drop your board on shallow water, and ride the shore break. The skimboard itself is flat, finless, shorter, and wider than a surfboard — typically made of marine plywood or fiberglass, weighing about 6 kilograms.'
		}
	];

	// Active spot for the showcase
	let activeSpot = $state(0);

	// Counter animation values
	let ridersCount = $state(0);
	let coachesCount = $state(0);
	let eventsCount = $state(0);

	function handleMouseMove(e) {
		mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
		mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
	}

	function scrollReveal(node) {
		if (typeof window === 'undefined') return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						node.classList.add('is-visible');
						node.setAttribute('data-revealed', 'true');
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);
		observer.observe(node);

		// MutationObserver ensures that if Svelte overrides the class attribute dynamically,
		// the 'is-visible' class is immediately restored if it has already been revealed.
		const mutationObserver = new MutationObserver(() => {
			if (node.getAttribute('data-revealed') === 'true' && !node.classList.contains('is-visible')) {
				node.classList.add('is-visible');
			}
		});
		mutationObserver.observe(node, { attributes: true, attributeFilter: ['class'] });

		return {
			destroy() {
				observer.disconnect();
				mutationObserver.disconnect();
			}
		};
	}

	function scrollStagger(node) {
		if (typeof window === 'undefined') return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const children = node.children;
						Array.from(children).forEach((child, i) => {
							child.style.transitionDelay = `${i * 0.1}s`;
							child.classList.add('is-visible');
							child.setAttribute('data-revealed', 'true');
						});
						node.classList.add('is-visible');
						node.setAttribute('data-revealed', 'true');
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);
		observer.observe(node);

		// Watch parent and child elements for dynamic class updates that might strip 'is-visible'
		const mutationObserver = new MutationObserver(() => {
			if (node.getAttribute('data-revealed') === 'true' && !node.classList.contains('is-visible')) {
				node.classList.add('is-visible');
			}
			Array.from(node.children).forEach((child) => {
				if (
					child.getAttribute('data-revealed') === 'true' &&
					!child.classList.contains('is-visible')
				) {
					child.classList.add('is-visible');
				}
			});
		});
		mutationObserver.observe(node, { attributes: true, attributeFilter: ['class'] });
		Array.from(node.children).forEach((child) => {
			mutationObserver.observe(child, { attributes: true, attributeFilter: ['class'] });
		});

		return {
			destroy() {
				observer.disconnect();
				mutationObserver.disconnect();
			}
		};
	}

	onMount(() => {
		// Hero intro animation (GSAP - only for hero)
		const heroTl = gsap.timeline();
		heroTl
			.from('.hero-line', {
				y: '110%',
				rotationX: -80,
				opacity: 0,
				stagger: 0.12,
				duration: 1.2,
				ease: 'expo.out',
				delay: 0.3
			})
			.from('.hero-tagline', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
			.from(
				'.hero-cta-btn',
				{ y: 30, opacity: 0, scale: 0.9, duration: 0.6, ease: 'back.out(1.7)' },
				'-=0.3'
			)
			.from('.hero-scroll', { opacity: 0, y: -20, duration: 0.5 }, '-=0.2')
			.from(
				'.hero-stat',
				{ y: 30, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out' },
				'-=0.4'
			);

		// Parallax on hero background
		gsap.to('.hero-bg-img', {
			yPercent: 30,
			ease: 'none',
			scrollTrigger: {
				trigger: '.hero-section',
				start: 'top top',
				end: 'bottom top',
				scrub: true
			}
		});

		// Mouse parallax on hero elements
		gsap.ticker.add(() => {
			gsap.to('.parallax-slow', {
				x: mouseX * 10,
				y: mouseY * 10,
				duration: 1,
				ease: 'power2.out'
			});
			gsap.to('.parallax-med', { x: mouseX * 25, y: mouseY * 25, duration: 1, ease: 'power2.out' });
		});

		// Counter animation for community stats
		const counterObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						gsap.to(
							{},
							{
								duration: 2,
								ease: 'power2.out',
								onUpdate: function () {
									const progress = this.progress();
									ridersCount = Math.floor(progress * community.totalRiders);
									coachesCount = Math.floor(progress * community.activeCoaches);
									eventsCount = Math.floor(progress * community.annualEvents);
								}
							}
						);
						counterObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.2 }
		);

		const communityEl = document.querySelector('.community-section');
		if (communityEl) counterObserver.observe(communityEl);

		// Marquee animation
		gsap.to('.marquee-track', {
			xPercent: -50,
			duration: 25,
			ease: 'none',
			repeat: -1
		});

		return () => {
			ScrollTrigger.getAll().forEach((t) => t.kill());
			counterObserver.disconnect();
		};
	});
</script>

<svelte:window onmousemove={handleMouseMove} />

<svelte:head>
	<title>Skimboarding in Tanauan | Leyte, Philippines — Ride the Waves</title>
	<meta
		name="description"
		content="Discover world-class skimboarding in Tanauan, Leyte. Explore pristine beaches, learn techniques, and join our passionate community of 500+ riders."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="skim-page overflow-hidden bg-[#FFF7ED] text-[#0C4A6E]">
	<!-- ==================== HERO SECTION ==================== -->
	<section
		class="hero-section relative flex min-h-screen items-center justify-center overflow-hidden"
	>
		<!-- Background Image with Parallax -->
		<div class="absolute inset-0">
			<img
				src="/Tourism/skimboarding/dagat-1.jpg"
				alt="Tanauan Beach"
				class="hero-bg-img absolute inset-0 h-[130%] w-full object-cover"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-b from-[#0C4A6E]/60 via-[#0C4A6E]/30 to-[#FFF7ED]"
			></div>
		</div>

		<!-- Floating Decorative Elements -->
		<div class="pointer-events-none absolute inset-0 overflow-hidden">
			<div
				class="parallax-slow absolute top-[15%] left-[10%] h-32 w-32 rounded-full bg-[#F97316]/20 blur-2xl"
			></div>
			<div
				class="parallax-med absolute top-[30%] right-[15%] h-48 w-48 rounded-full bg-[#06B6D4]/20 blur-3xl"
			></div>
			<div
				class="parallax-slow absolute bottom-[30%] left-[60%] h-40 w-40 rounded-full bg-[#F59E0B]/15 blur-2xl"
			></div>
		</div>

		<!-- Hero Content -->
		<div class="relative z-10 mx-auto max-w-6xl px-6 pt-20 text-center">
			<!-- Location Tag -->
			<div class="hero-tagline mb-6">
				<span
					class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-5 py-2 text-sm font-medium tracking-wider text-white/90 backdrop-blur-md"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
						/><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
						/></svg
					>
					TANAUAN, LEYTE · PHILIPPINES
				</span>
			</div>

			<!-- Main Title -->
			<h1 class="mb-6" style="perspective: 1000px;">
				<span
					class="hero-line font-display block text-6xl leading-[0.9] tracking-wider text-white drop-shadow-2xl sm:text-7xl md:text-8xl lg:text-[10rem]"
					>SKIM</span
				>
				<span
					class="hero-line font-display block text-6xl leading-[0.9] tracking-wider sm:text-7xl md:text-8xl lg:text-[10rem]"
					style="color: #F97316; text-shadow: 0 4px 30px rgba(249,115,22,0.4);">BOARDING</span
				>
			</h1>

			<!-- Tagline -->
			<p class="hero-tagline mx-auto mb-10 max-w-2xl text-xl font-light text-white/80 md:text-2xl">
				Where <span class="font-semibold text-[#06B6D4]">waves</span> meet
				<span class="font-semibold text-[#FB923C]">passion</span> — ride the shores of Eastern Visayas
			</p>

			<!-- CTA -->
			<a
				href="#discover"
				class="hero-cta-btn inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#F97316] to-[#FB923C] px-8 py-4 text-lg font-bold text-white shadow-xl shadow-orange-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/40 active:scale-95"
			>
				Plan Your Visit
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					/></svg
				>
			</a>

			<!-- Quick Stats -->
			<div class="mt-14 flex flex-wrap justify-center gap-6 md:gap-10">
				{#each [{ value: '500+', label: 'Active Riders' }, { value: '26-30°C', label: 'Water Temp' }, { value: '15+', label: 'Beach Spots' }, { value: '365', label: 'Days Rideable' }] as stat}
					<div class="hero-stat text-center">
						<div class="text-2xl font-black text-white md:text-3xl">{stat.value}</div>
						<div class="mt-1 text-xs tracking-widest text-white/50 uppercase">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Scroll Hint -->
		<div
			class="hero-scroll absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50"
		>
			<span class="text-[10px] tracking-[0.3em] uppercase">Explore</span>
			<div class="flex h-10 w-5 justify-center rounded-full border-2 border-current pt-2">
				<div class="h-3 w-1.5 animate-bounce rounded-full bg-[#06B6D4]"></div>
			</div>
		</div>
	</section>

	<!-- ==================== MARQUEE DIVIDER ==================== -->
	<div class="overflow-hidden bg-[#0C4A6E] py-6">
		<div class="marquee-track flex items-center gap-16 whitespace-nowrap">
			{#each Array(10) as _, i}
				<span
					class="font-display flex items-center gap-8 text-3xl tracking-[0.2em] text-white/20 md:text-4xl"
				>
					RIDE THE WAVE
					<svg class="h-6 w-6 text-[#06B6D4]/40" fill="currentColor" viewBox="0 0 24 24"
						><path
							d="M21 12c-2 0-3-1.5-5-1.5S13 12 11 12s-3-1.5-5-1.5S3 12 1 12"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
						/></svg
					>
				</span>
			{/each}
		</div>
	</div>

	<!-- ==================== DISCOVER SECTION ==================== -->
	<section id="discover" class="bg-gradient-to-b from-[#FFF7ED] to-white py-24 md:py-32">
		<div class="mx-auto max-w-7xl px-6">
			<div use:scrollReveal class="anim-reveal anim-up mb-20 text-center">
				<span
					class="mb-4 inline-block rounded-full bg-[#06B6D4]/10 px-4 py-1.5 text-sm font-bold tracking-widest text-[#0891B2]"
					>DISCOVER</span
				>
				<h2 class="font-display text-5xl tracking-wide text-[#0C4A6E] md:text-6xl lg:text-7xl">
					WHAT IS TANAUAN SKIMBOARDING?
				</h2>
				<div
					class="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9]"
				></div>
			</div>

			<div class="grid items-center gap-16 lg:grid-cols-2">
				<div use:scrollReveal class="anim-reveal anim-left space-y-6">
					<p class="text-lg leading-relaxed text-[#164E63]/80">
						<span class="font-bold text-[#0891B2]">Tanauan, Leyte</span> is rapidly becoming one of the
						Philippines' most exciting skimboarding destinations. Located on the eastern coast of Leyte
						island, facing the vast Leyte Gulf, our beaches offer the perfect combination of geography,
						climate, and community.
					</p>
					<p class="text-lg leading-relaxed text-[#164E63]/80">
						Skimboarding is actually a variation of surfing. Unlike surfing, which is totally
						dependent on big waves, skimboarding can be done for as long as there are waves. The
						skimboarders ride on the shore break when the wave crashes and recedes to the sea — this
						is exactly where skimboarding got its name, because riders <span
							class="font-bold text-[#0C4A6E]">"skim" the surface</span
						> on the shore break.
					</p>

					<div class="grid grid-cols-2 gap-4 pt-6">
						{#each [{ icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', label: 'Year-round waves', color: 'cyan' }, { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', label: '15+ beach spots', color: 'orange' }, { icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', label: '500+ riders', color: 'teal' }, { icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707', label: '26-30°C water', color: 'amber' }] as item}
							<div
								class="group flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#06B6D4]/30 hover:shadow-md"
							>
								<div
									class="rounded-xl bg-gradient-to-br p-2.5 {item.color === 'cyan'
										? 'from-[#06B6D4]/20 to-[#0EA5E9]/10'
										: item.color === 'orange'
											? 'from-[#F97316]/20 to-[#FB923C]/10'
											: item.color === 'teal'
												? 'from-[#14B8A6]/20 to-[#10B981]/10'
												: 'from-[#F59E0B]/20 to-[#FBBF24]/10'} transition-transform group-hover:scale-110"
								>
									<svg
										class="h-5 w-5 {item.color === 'cyan'
											? 'text-[#0891B2]'
											: item.color === 'orange'
												? 'text-[#EA580C]'
												: item.color === 'teal'
													? 'text-[#0D9488]'
													: 'text-[#D97706]'}"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d={item.icon}
										/></svg
									>
								</div>
								<span class="text-sm font-semibold text-[#164E63]">{item.label}</span>
							</div>
						{/each}
					</div>
				</div>

				<div use:scrollReveal class="anim-reveal anim-right relative">
					<div class="group relative overflow-hidden rounded-3xl shadow-2xl">
						<img
							src="/Tourism/skimboarding/dagat-2.jpg"
							alt="Skimboarding at Tanauan Beach"
							class="h-[450px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[550px]"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-[#0C4A6E]/80 via-transparent to-transparent"
						></div>
						<div class="absolute right-0 bottom-0 left-0 p-8">
							<p class="mb-1 text-xl font-bold text-white">Santo Niño Beach</p>
							<p class="font-medium text-[#06B6D4]">The heart of Tanauan skimboarding</p>
						</div>
					</div>
					<!-- Decorative elements -->
					<div
						class="absolute -top-6 -right-6 -z-10 h-32 w-32 rounded-full border-4 border-[#06B6D4]/20"
					></div>
					<div
						class="absolute -bottom-8 -left-8 -z-10 h-24 w-24 rounded-full bg-[#F97316]/15 blur-2xl"
					></div>
				</div>
			</div>
		</div>
	</section>

	<!-- ==================== ESSENTIALS / WHAT YOU NEED TO KNOW ==================== -->
	<section class="bg-white py-24 md:py-32">
		<div class="mx-auto max-w-7xl px-6">
			<div use:scrollReveal class="anim-reveal anim-up mb-20 text-center">
				<span
					class="mb-4 inline-block rounded-full bg-[#F97316]/10 px-4 py-1.5 text-sm font-bold tracking-widest text-[#EA580C]"
					>ESSENTIALS</span
				>
				<h2 class="font-display text-5xl tracking-wide text-[#0C4A6E] md:text-6xl lg:text-7xl">
					WHAT YOU NEED TO KNOW
				</h2>
				<div
					class="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#F97316] to-[#FB923C]"
				></div>
			</div>

			<div use:scrollStagger class="anim-stagger grid gap-6 md:grid-cols-2">
				{#each essentials as item}
					<div
						class="anim-child group rounded-3xl border border-[#E0F2FE] bg-gradient-to-br from-[#F0F9FF] to-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#06B6D4]/40 hover:shadow-xl hover:shadow-[#06B6D4]/5"
					>
						<div
							class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#0EA5E9] shadow-lg shadow-[#06B6D4]/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
						>
							{#if item.icon === 'wave'}
								<svg
									class="h-7 w-7 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M14 5l7 7m0 0l-7 7m7-7H3"
									/></svg
								>
							{:else if item.icon === 'pin'}
								<svg
									class="h-7 w-7 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/></svg
								>
							{:else if item.icon === 'sun'}
								<svg
									class="h-7 w-7 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
									/></svg
								>
							{:else}
								<svg
									class="h-7 w-7 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
									/></svg
								>
							{/if}
						</div>
						<h3
							class="mb-3 text-xl font-bold text-[#0C4A6E] transition-colors group-hover:text-[#0891B2]"
						>
							{item.title}
						</h3>
						<p class="leading-relaxed text-[#164E63]/70">{item.content}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ==================== SPOTS SECTION ==================== -->
	<section class="bg-gradient-to-b from-white to-[#F0F9FF] py-24 md:py-32">
		<div class="mx-auto max-w-7xl px-6">
			<div use:scrollReveal class="anim-reveal anim-up mb-20 text-center">
				<span
					class="mb-4 inline-block rounded-full bg-[#06B6D4]/10 px-4 py-1.5 text-sm font-bold tracking-widest text-[#0891B2]"
					>LOCATIONS</span
				>
				<h2 class="font-display text-5xl tracking-wide text-[#0C4A6E] md:text-6xl lg:text-7xl">
					TOP SKIMBOARDING SPOTS
				</h2>
				<div
					class="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#14B8A6]"
				></div>
				<p class="mx-auto mt-6 max-w-2xl text-[#164E63]/60">
					Each beach offers unique conditions suited for different skill levels and riding styles.
				</p>
			</div>

			<!-- Spot Selector -->
			<div use:scrollReveal class="anim-reveal anim-up mb-12 flex flex-wrap justify-center gap-3">
				{#each spots as spot, i}
					<button
						onclick={() => (activeSpot = i)}
						class="rounded-full px-6 py-3 text-sm font-bold tracking-wide transition-all duration-300 {activeSpot ===
						i
							? 'scale-105 bg-gradient-to-r from-[#06B6D4] to-[#0EA5E9] text-white shadow-lg shadow-[#06B6D4]/30'
							: 'border border-[#E2E8F0] bg-white text-[#164E63] hover:border-[#06B6D4]/40 hover:bg-[#F0F9FF]'}"
					>
						{spot.name}
					</button>
				{/each}
			</div>

			<!-- Active Spot Card -->
			{#key activeSpot}
				<div
					in:fly={{ y: 20, duration: 400, delay: 100 }}
					out:fade={{ duration: 150 }}
					class="overflow-hidden rounded-3xl border border-[#E0F2FE] bg-white shadow-2xl shadow-[#06B6D4]/10"
				>
					<div class="grid gap-0 lg:grid-cols-2">
						<div class="relative h-72 overflow-hidden md:h-96 lg:h-auto">
							<img
								src={spots[activeSpot].img}
								alt={spots[activeSpot].name}
								class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
							/>
							<div
								class="absolute inset-0 hidden bg-gradient-to-r from-transparent to-white/20 lg:block"
							></div>
							<div class="absolute top-4 left-4">
								<span
									class="rounded-full px-4 py-1.5 text-xs font-bold tracking-wider backdrop-blur-md {spots[
										activeSpot
									].difficulty.includes('Beginner')
										? 'bg-[#10B981]/90 text-white'
										: spots[activeSpot].difficulty.includes('Advanced')
											? 'bg-[#F97316]/90 text-white'
											: 'bg-[#06B6D4]/90 text-white'}"
								>
									{spots[activeSpot].difficulty}
								</span>
							</div>
						</div>
						<div class="flex flex-col justify-center p-8 md:p-12">
							<h3 class="font-display mb-4 text-3xl tracking-wider text-[#0C4A6E] md:text-4xl">
								{spots[activeSpot].name.toUpperCase()}
							</h3>
							<p class="mb-8 leading-relaxed text-[#164E63]/70">{spots[activeSpot].description}</p>

							<div class="mb-8 grid grid-cols-2 gap-4">
								<div class="flex items-center gap-3">
									<svg
										class="h-5 w-5 text-[#0891B2]"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
										/></svg
									>
									<div>
										<div class="text-[10px] tracking-widest text-[#164E63]/50 uppercase">Waves</div>
										<div class="text-sm font-bold text-[#0C4A6E]">
											{spots[activeSpot].waveHeight}
										</div>
									</div>
								</div>
								<div class="flex items-center gap-3">
									<svg
										class="h-5 w-5 text-[#0891B2]"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/></svg
									>
									<div>
										<div class="text-[10px] tracking-widest text-[#164E63]/50 uppercase">
											Best Time
										</div>
										<div class="text-sm font-bold text-[#0C4A6E]">{spots[activeSpot].bestTime}</div>
									</div>
								</div>
								<div class="flex items-center gap-3">
									<svg
										class="h-5 w-5 text-[#0891B2]"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
										/></svg
									>
									<div>
										<div class="text-[10px] tracking-widest text-[#164E63]/50 uppercase">Sand</div>
										<div class="text-sm font-bold text-[#0C4A6E]">{spots[activeSpot].sandType}</div>
									</div>
								</div>
							</div>

							<div class="flex flex-wrap gap-2">
								{#each spots[activeSpot].facilities as facility}
									<span
										class="rounded-full border border-[#E0F2FE] bg-[#F0F9FF] px-4 py-1.5 text-xs font-semibold text-[#0891B2] transition-all duration-300 hover:bg-[#06B6D4] hover:text-white"
										>{facility}</span
									>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/key}
		</div>
	</section>

	<!-- ==================== TECHNIQUES / BASIC TECHNIQUES ==================== -->
	<section class="bg-[#F0F9FF] py-24 md:py-32">
		<div class="mx-auto max-w-7xl px-6">
			<div use:scrollReveal class="anim-reveal anim-up mb-20 text-center">
				<span
					class="mb-4 inline-block rounded-full bg-[#14B8A6]/10 px-4 py-1.5 text-sm font-bold tracking-widest text-[#0D9488]"
					>LEARN</span
				>
				<h2 class="font-display text-5xl tracking-wide text-[#0C4A6E] md:text-6xl lg:text-7xl">
					BASIC TECHNIQUES
				</h2>
				<div
					class="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#06B6D4]"
				></div>
				<p class="mx-auto mt-6 max-w-2xl text-[#164E63]/60">
					Master these fundamental techniques to progress from beginner to advanced rider.
				</p>
			</div>

			<div class="space-y-8">
				{#each techniques as tech, idx}
					<div use:scrollReveal class="anim-reveal {idx % 2 === 0 ? 'anim-left' : 'anim-right'}">
						<div
							class="group overflow-hidden rounded-3xl border border-[#E0F2FE] bg-white transition-all duration-300 hover:border-[#14B8A6]/40 hover:shadow-xl hover:shadow-[#14B8A6]/5"
						>
							<div class="grid gap-0 md:grid-cols-2 {idx % 2 !== 0 ? 'direction-rtl' : ''}">
								<!-- Image -->
								<div
									class="relative h-64 overflow-hidden md:h-auto {idx % 2 !== 0
										? 'md:order-2'
										: ''}"
								>
									<img
										src={tech.img}
										alt={tech.name}
										class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									<div
										class="absolute inset-0 bg-gradient-to-t from-[#0C4A6E]/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10"
									></div>
									<div class="absolute top-4 left-4">
										<span
											class="rounded-full px-4 py-1.5 text-xs font-bold tracking-wider backdrop-blur-md {tech.level ===
											'Beginner'
												? 'bg-[#10B981]/90 text-white'
												: tech.level === 'Intermediate'
													? 'bg-[#F59E0B]/90 text-white'
													: 'bg-[#EF4444]/90 text-white'}"
										>
											{tech.level}
										</span>
									</div>
								</div>
								<!-- Content -->
								<div
									class="flex flex-col justify-center p-8 md:p-10 {idx % 2 !== 0
										? 'md:order-1'
										: ''}"
								>
									<div class="mb-4 flex items-center gap-4">
										<span
											class="font-display flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#06B6D4] text-2xl text-white shadow-lg shadow-[#14B8A6]/20"
										>
											{String(idx + 1).padStart(2, '0')}
										</span>
										<h3
											class="text-2xl font-bold text-[#0C4A6E] transition-colors group-hover:text-[#0D9488]"
										>
											{tech.name}
										</h3>
									</div>
									<p class="mb-6 leading-relaxed text-[#164E63]/70">{tech.description}</p>
									<div class="space-y-2">
										<p class="text-sm font-bold text-[#0D9488]">Pro Tips:</p>
										{#each tech.tips as tip}
											<div class="flex items-start gap-2.5">
												<svg
													class="mt-0.5 h-4 w-4 shrink-0 text-[#14B8A6]"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
													><path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M5 13l4 4L19 7"
													/></svg
												>
												<span class="text-sm text-[#164E63]/60">{tip}</span>
											</div>
										{/each}
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ==================== PHOTO GALLERY ==================== -->
	<section class="overflow-hidden bg-gradient-to-b from-[#F0F9FF] to-white py-24 md:py-32">
		<div class="mx-auto max-w-7xl px-6">
			<div use:scrollReveal class="anim-reveal anim-up mb-16 text-center">
				<span
					class="mb-4 inline-block rounded-full bg-[#06B6D4]/10 px-4 py-1.5 text-sm font-bold tracking-widest text-[#0891B2]"
					>GALLERY</span
				>
				<h2 class="font-display text-5xl tracking-wide text-[#0C4A6E] md:text-6xl lg:text-7xl">
					SKIM IN ACTION
				</h2>
				<div
					class="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#F97316]"
				></div>
				<p class="mx-auto mt-6 max-w-2xl text-[#164E63]/60">
					Moments captured from the shores of Tanauan — where the National Skimboarding was
					organized RIGHT WHERE IT STARTED.
				</p>
			</div>

			<div class="bento-gallery">
				{#each galleryImages as img, i}
					<div
						use:scrollReveal
						class="anim-reveal anim-up bento-item bento-item-{i} group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-[#06B6D4]/20"
					>
						<img
							src={img.src}
							alt={img.alt}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<div
							class="absolute inset-0 flex items-end bg-gradient-to-t from-[#0C4A6E]/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						>
							<p class="text-sm font-medium text-white">{img.alt}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ==================== TIMELINE / OUR JOURNEY (REDESIGNED) ==================== -->
	<section
		class="overflow-hidden bg-gradient-to-b from-white via-[#F0F9FF] to-white py-24 md:py-32"
	>
		<div class="mx-auto max-w-6xl px-6">
			<div use:scrollReveal class="anim-reveal anim-up mb-20 text-center">
				<span
					class="mb-4 inline-block rounded-full bg-[#F97316]/10 px-4 py-1.5 text-sm font-bold tracking-widest text-[#EA580C]"
					>HISTORY</span
				>
				<h2 class="font-display text-5xl tracking-wide text-[#0C4A6E] md:text-6xl lg:text-7xl">
					OUR JOURNEY
				</h2>
				<div
					class="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#F97316] to-[#FB923C]"
				></div>
				<p class="mx-auto mt-6 max-w-xl text-[#164E63]/60">
					From humble beginnings to a thriving community — the story of how Tanauan became a
					skimboarding destination.
				</p>
			</div>

			<!-- Vertical Timeline -->
			<div class="timeline-vertical relative">
				<!-- Central line -->
				<div
					class="absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-[#06B6D4] via-[#F97316] to-[#14B8A6] md:left-1/2 md:-translate-x-px"
				></div>

				{#each timeline as event, i}
					<div
						use:scrollReveal
						class="anim-reveal {i % 2 === 0
							? 'anim-left'
							: 'anim-right'} timeline-item relative mb-16 last:mb-0"
					>
						<div class="grid items-center gap-8 md:grid-cols-2">
							<!-- Content side -->
							<div
								class="{i % 2 === 0
									? 'md:pr-16 md:text-right'
									: 'md:order-2 md:pl-16'} pl-16 md:pl-0"
							>
								<!-- Year badge -->
								<div
									class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-4 py-1.5 {i %
										2 ===
									0
										? 'from-[#06B6D4]/10 to-[#0EA5E9]/5'
										: 'from-[#F97316]/10 to-[#FB923C]/5'} mb-3"
								>
									<span
										class="text-sm font-black {i % 2 === 0
											? 'text-[#0891B2]'
											: 'text-[#EA580C]'} tracking-wider">{event.year}</span
									>
								</div>
								<h3 class="mb-3 text-2xl font-bold text-[#0C4A6E] md:text-3xl">{event.title}</h3>
								<p class="leading-relaxed text-[#164E63]/65">{event.description}</p>
							</div>

							<!-- Image side -->
							<div class="{i % 2 === 0 ? 'md:order-2 md:pl-16' : 'md:pr-16'} pl-16 md:pl-0">
								<div class="group relative overflow-hidden rounded-2xl shadow-xl">
									<img
										src={event.img}
										alt="{event.title} - {event.year}"
										class="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-64"
									/>
									<div
										class="absolute inset-0 bg-gradient-to-t from-[#0C4A6E]/60 via-transparent to-transparent"
									></div>
									<div class="absolute bottom-4 left-4">
										<span
											class="rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wider text-white backdrop-blur-md"
											>{event.year}</span
										>
									</div>
								</div>
							</div>
						</div>

						<!-- Timeline dot -->
						<div
							class="absolute top-4 left-6 z-10 -translate-x-1/2 md:top-1/2 md:left-1/2 md:-translate-y-1/2"
						>
							<div
								class="h-5 w-5 rounded-full border-4 bg-white {i % 2 === 0
									? 'border-[#06B6D4]'
									: 'border-[#F97316]'} shadow-lg shadow-current/20 transition-transform duration-300 hover:scale-150"
							></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ==================== COMMUNITY SECTION ==================== -->
	<section class="community-section bg-white py-24 md:py-32">
		<div class="mx-auto max-w-7xl px-6">
			<div use:scrollReveal class="anim-reveal anim-up mb-20 text-center">
				<span
					class="mb-4 inline-block rounded-full bg-[#06B6D4]/10 px-4 py-1.5 text-sm font-bold tracking-widest text-[#0891B2]"
					>COMMUNITY</span
				>
				<h2 class="font-display text-5xl tracking-wide text-[#0C4A6E] md:text-6xl lg:text-7xl">
					JOIN THE FAMILY
				</h2>
				<div
					class="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#14B8A6]"
				></div>
			</div>

			<div class="grid gap-8 lg:grid-cols-3">
				<!-- Description Card -->
				<div use:scrollReveal class="anim-reveal anim-left lg:col-span-2">
					<div
						class="relative overflow-hidden rounded-3xl border border-[#BAE6FD] bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] p-8 md:p-10"
					>
						<!-- Background decorative image -->
						<div class="absolute top-0 right-0 h-48 w-48 overflow-hidden rounded-bl-3xl opacity-10">
							<img
								src="/Tourism/skimboarding/skimboarding%20archive/download%20(4).jpg"
								alt=""
								class="h-full w-full object-cover"
							/>
						</div>
						<p class="relative z-10 mb-8 text-lg leading-relaxed text-[#164E63]/80">
							{community.description}
						</p>
						<div class="relative z-10 space-y-5">
							<div class="flex items-start gap-4">
								<div class="shrink-0 rounded-xl bg-[#06B6D4]/20 p-3">
									<svg
										class="h-6 w-6 text-[#0891B2]"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/></svg
									>
								</div>
								<div>
									<h4 class="mb-1 font-bold text-[#0C4A6E]">Weekly Meetups</h4>
									<p class="text-sm text-[#164E63]/60">{community.meetups}</p>
								</div>
							</div>
							<div class="flex items-start gap-4">
								<div class="shrink-0 rounded-xl bg-[#06B6D4]/20 p-3">
									<svg
										class="h-6 w-6 text-[#0891B2]"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
										/></svg
									>
								</div>
								<div>
									<h4 class="mb-1 font-bold text-[#0C4A6E]">Connect With Us</h4>
									<p class="text-sm text-[#164E63]/60">{community.contact}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Stats Cards -->
				<div use:scrollReveal class="anim-reveal anim-right space-y-5">
					{#each [{ value: ridersCount, suffix: '+', label: 'Active Riders', gradient: 'from-[#06B6D4] to-[#0EA5E9]' }, { value: coachesCount, suffix: '', label: 'Local Coaches', gradient: 'from-[#14B8A6] to-[#10B981]' }, { value: eventsCount, suffix: '+', label: 'Events / Year', gradient: 'from-[#F97316] to-[#FB923C]' }] as stat}
						<div
							class="rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<div
								class="font-display bg-gradient-to-r text-5xl {stat.gradient} mb-1 bg-clip-text text-transparent"
							>
								{stat.value}{stat.suffix}
							</div>
							<div class="text-sm font-semibold tracking-wider text-[#164E63]/50 uppercase">
								{stat.label}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- ==================== GETTING THERE / GETTING TO TANAUAN ==================== -->
	<section class="bg-gradient-to-b from-white to-[#FFFBEB] py-24 md:py-32">
		<div class="mx-auto max-w-7xl px-6">
			<div use:scrollReveal class="anim-reveal anim-up mb-20 text-center">
				<span
					class="mb-4 inline-block rounded-full bg-[#F97316]/10 px-4 py-1.5 text-sm font-bold tracking-widest text-[#EA580C]"
					>TRAVEL</span
				>
				<h2 class="font-display text-5xl tracking-wide text-[#0C4A6E] md:text-6xl lg:text-7xl">
					GETTING TO TANAUAN
				</h2>
				<div
					class="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#F97316] to-[#FB923C]"
				></div>
			</div>

			<div use:scrollStagger class="anim-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				<!-- From Manila -->
				<div
					class="anim-child rounded-3xl border border-[#E2E8F0] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#F97316]/30 hover:shadow-xl"
				>
					<div class="mb-6 flex items-center gap-3">
						<div class="rounded-xl bg-gradient-to-br from-[#F97316]/20 to-[#FB923C]/10 p-3">
							<svg
								class="h-6 w-6 text-[#EA580C]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
								/></svg
							>
						</div>
						<h3 class="text-xl font-bold text-[#0C4A6E]">From Manila</h3>
					</div>
					<div class="space-y-4">
						<div class="rounded-xl bg-[#FFF7ED] p-4">
							<p class="mb-1 text-sm font-bold text-[#EA580C]">Option 1 (Fastest)</p>
							<p class="text-sm text-[#164E63]/60">{directions.fromManila.option1}</p>
						</div>
						<div class="rounded-xl bg-[#FFF7ED] p-4">
							<p class="mb-1 text-sm font-bold text-[#EA580C]">Option 2 (Budget)</p>
							<p class="text-sm text-[#164E63]/60">{directions.fromManila.option2}</p>
						</div>
					</div>
				</div>

				<!-- From Cebu -->
				<div
					class="anim-child rounded-3xl border border-[#E2E8F0] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#06B6D4]/30 hover:shadow-xl"
				>
					<div class="mb-6 flex items-center gap-3">
						<div class="rounded-xl bg-gradient-to-br from-[#06B6D4]/20 to-[#0EA5E9]/10 p-3">
							<svg
								class="h-6 w-6 text-[#0891B2]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
								/></svg
							>
						</div>
						<h3 class="text-xl font-bold text-[#0C4A6E]">From Cebu</h3>
					</div>
					<div class="space-y-4">
						<div class="rounded-xl bg-[#F0F9FF] p-4">
							<p class="mb-1 text-sm font-bold text-[#0891B2]">Option 1 (Fastest)</p>
							<p class="text-sm text-[#164E63]/60">{directions.fromCebu.option1}</p>
						</div>
						<div class="rounded-xl bg-[#F0F9FF] p-4">
							<p class="mb-1 text-sm font-bold text-[#0891B2]">Option 2 (Scenic)</p>
							<p class="text-sm text-[#164E63]/60">{directions.fromCebu.option2}</p>
						</div>
					</div>
				</div>

				<!-- Local Transport & Accommodation -->
				<div
					class="anim-child rounded-3xl border border-[#E2E8F0] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#14B8A6]/30 hover:shadow-xl md:col-span-2 lg:col-span-1"
				>
					<div class="mb-6 flex items-center gap-3">
						<div class="rounded-xl bg-gradient-to-br from-[#14B8A6]/20 to-[#10B981]/10 p-3">
							<svg
								class="h-6 w-6 text-[#0D9488]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/></svg
							>
						</div>
						<h3 class="text-xl font-bold text-[#0C4A6E]">Where to Stay</h3>
					</div>
					<p class="mb-6 text-sm text-[#164E63]/60">{directions.localTransport}</p>
					<div class="space-y-3">
						{#each accommodations as acc}
							<div
								class="flex items-center justify-between rounded-xl bg-[#F0FDF4] p-4 transition-colors hover:bg-[#DCFCE7]"
							>
								<div>
									<span class="text-sm font-bold text-[#0D9488]">{acc.type}</span>
									<p class="text-sm text-[#164E63]/60">{acc.name}</p>
								</div>
								<span class="text-sm font-bold text-[#0C4A6E]">{acc.price}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ==================== FAQ / COMMON QUESTIONS ==================== -->
	<section class="bg-[#FFFBEB] py-24 md:py-32">
		<div class="mx-auto max-w-3xl px-6">
			<div use:scrollReveal class="anim-reveal anim-up mb-20 text-center">
				<span
					class="mb-4 inline-block rounded-full bg-[#06B6D4]/10 px-4 py-1.5 text-sm font-bold tracking-widest text-[#0891B2]"
					>FAQ</span
				>
				<h2 class="font-display text-5xl tracking-wide text-[#0C4A6E] md:text-6xl lg:text-7xl">
					COMMON QUESTIONS
				</h2>
				<div
					class="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#14B8A6]"
				></div>
			</div>

			<div class="space-y-4">
				{#each faqs as faq, i}
					<div
						use:scrollReveal
						class="anim-reveal anim-up rounded-2xl border {openFaq === i
							? 'border-[#06B6D4]/40 bg-white shadow-lg shadow-[#06B6D4]/5'
							: 'border-[#E2E8F0] bg-white hover:border-[#06B6D4]/20'} overflow-hidden shadow-sm transition-colors duration-300"
					>
						<button
							class="flex w-full items-center justify-between p-6 text-left"
							onclick={() => (openFaq = openFaq === i ? -1 : i)}
						>
							<span class="pr-4 font-semibold text-[#0C4A6E]">{faq.q}</span>
							<div
								class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] transition-all duration-300 {openFaq ===
								i
									? 'rotate-45 border-[#06B6D4] bg-[#06B6D4]'
									: ''}"
							>
								<svg
									class="h-4 w-4 {openFaq === i ? 'text-white' : 'text-[#0891B2]'}"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 4v16m8-8H4"
									/></svg
								>
							</div>
						</button>
						{#if openFaq === i}
							<div
								transition:slide={{ duration: 300 }}
								class="border-t border-[#E0F2FE] px-6 pt-4 pb-6"
							>
								<p class="leading-relaxed text-[#164E63]/70">{faq.a}</p>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Footer CTA Removed as requested -->
</main>

<style>
	.bento-gallery {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 1rem;
		grid-auto-rows: 240px;
	}
	.bento-item-0 {
		grid-column: span 6;
		grid-row: span 2;
	}
	.bento-item-1 {
		grid-column: span 3;
		grid-row: span 1;
	}
	.bento-item-2 {
		grid-column: span 3;
		grid-row: span 1;
	}
	.bento-item-3 {
		grid-column: span 3;
		grid-row: span 1;
	}
	.bento-item-4 {
		grid-column: span 3;
		grid-row: span 1;
	}
	.bento-item-5 {
		grid-column: span 4;
		grid-row: span 2;
	}
	.bento-item-6 {
		grid-column: span 4;
		grid-row: span 2;
	}
	.bento-item-7 {
		grid-column: span 4;
		grid-row: span 2;
	}

	@media (max-width: 1024px) {
		.bento-gallery {
			grid-auto-rows: 180px;
		}
	}

	@media (max-width: 768px) {
		.bento-gallery {
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: 200px;
		}
		.bento-item-0 {
			grid-column: span 2;
			grid-row: span 2;
		}
		.bento-item-1,
		.bento-item-2,
		.bento-item-3,
		.bento-item-4 {
			grid-column: span 1;
			grid-row: span 1;
		}
		.bento-item-5,
		.bento-item-6,
		.bento-item-7 {
			grid-column: span 2;
			grid-row: span 2;
		}
	}

	.font-display {
		font-family: 'Bebas Neue', sans-serif;
	}

	.skim-page {
		font-family: 'Inter', sans-serif;
	}

	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}

	/* ===== CSS Reveal Animations (IntersectionObserver driven) ===== */
	/* These MUST be :global() because 'is-visible' is added dynamically via JS */

	:global(.anim-reveal) {
		opacity: 0;
		transition:
			opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	}

	:global(.anim-up) {
		transform: translateY(50px);
	}

	:global(.anim-left) {
		transform: translateX(-50px);
	}

	:global(.anim-right) {
		transform: translateX(50px);
	}

	:global(.anim-scale) {
		transform: scale(0.9);
	}

	:global(.anim-reveal.is-visible),
	:global(.anim-reveal[data-revealed='true']) {
		opacity: 1;
		transform: translateY(0) translateX(0) scale(1);
	}

	/* Stagger children animation */
	:global(.anim-stagger .anim-child) {
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	:global(.anim-stagger .anim-child.is-visible),
	:global(.anim-stagger .anim-child[data-revealed='true']) {
		opacity: 1;
		transform: translateY(0);
	}

	/* ===== Gallery Grid ===== */
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: auto auto;
		gap: 1rem;
	}

	.gallery-item {
		min-height: 220px;
	}

	.gallery-item-0 {
		grid-column: span 2;
		grid-row: span 2;
		min-height: 460px;
	}

	.gallery-item-1,
	.gallery-item-2 {
		grid-column: span 1;
	}

	.gallery-item-3 {
		grid-column: span 1;
	}

	.gallery-item-4 {
		grid-column: span 1;
	}

	.gallery-item-5 {
		grid-column: span 1;
	}

	.gallery-item-6 {
		grid-column: span 1;
	}

	.gallery-item-7 {
		grid-column: span 1;
	}

	@media (max-width: 768px) {
		.gallery-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.gallery-item-0 {
			grid-column: span 2;
			grid-row: span 1;
			min-height: 250px;
		}

		.gallery-item {
			min-height: 180px;
		}
	}

	/* ===== Timeline vertical ===== */
	.timeline-vertical .timeline-item:last-child {
		margin-bottom: 0;
	}

	@keyframes blob {
		0%,
		100% {
			transform: translate(0, 0) scale(1);
		}
		25% {
			transform: translate(20px, -30px) scale(1.1);
		}
		50% {
			transform: translate(-20px, 20px) scale(0.9);
		}
		75% {
			transform: translate(30px, 10px) scale(1.05);
		}
	}
</style>
