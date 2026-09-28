<script>
	import { onMount } from 'svelte';
	let gsap;
	let ScrollTrigger;

	let slides = [
		{
			type: 'image',
			src: '/images/pasaka1.jpg',
			caption: 'Pasaka Festival street dancers',
			year: '2024'
		},
		{
			type: 'image',
			src: '/images/pasaka2.jpg',
			caption: 'Colorful costumes and smiles',
			year: '2024'
		},
		{
			type: 'video',
			src: '/videos/pasaka1.mp4',
			caption: 'Highlights of the Grand Parade',
			year: '2023'
		},
		{
			type: 'image',
			src: '/images/pasaka3.jpg',
			caption: 'Community celebration and unity',
			year: '2023'
		},
		{
			type: 'video',
			src: '/videos/pasaka2.mp4',
			caption: 'Traditional dance performance',
			year: '2022'
		}
	];

	let archives = [
		{
			year: '2024',
			theme: 'Unity in Faith',
			participants: '45 Barangays',
			highlight: 'Record-breaking 50,000 spectators'
		},
		{
			year: '2023',
			theme: 'Rising Together',
			participants: '42 Barangays',
			highlight: 'First international media coverage'
		},
		{
			year: '2022',
			theme: 'Hope Renewed',
			participants: '38 Barangays',
			highlight: 'Post-pandemic revival celebration'
		},
		{
			year: '2021',
			theme: 'Virtual Pasaka',
			participants: '30 Barangays',
			highlight: 'First online streaming of the festival'
		},
		{ year: '2020', theme: 'Cancelled', participants: '-', highlight: 'Pandemic year' },
		{
			year: '2019',
			theme: 'Golden Jubilee',
			participants: '50 Barangays',
			highlight: '50th anniversary celebration'
		}
	];

	let statistics = [
		{ number: '50+', label: 'Years of Tradition', icon: '' },
		{ number: '45', label: 'Participating Barangays', icon: '' },
		{ number: '50K+', label: 'Annual Visitors', icon: '' },
		{ number: '500+', label: 'Performers', icon: '' }
	];

	let currentSlide = 0;
	let interval;
	let activeArchiveYear = '2024';

	const nextSlide = () => {
		currentSlide = (currentSlide + 1) % slides.length;
	};

	const prevSlide = () => {
		currentSlide = (currentSlide - 1 + slides.length) % slides.length;
	};

	const goToSlide = (i) => {
		currentSlide = i;
	};

	let lightboxOpen = false;
	let lightboxSrc = '';
	let lightboxType = 'image';
	let lightboxCaption = '';

	const openLightbox = (item) => {
		lightboxOpen = true;
		lightboxSrc = item.src;
		lightboxType = item.type;
		lightboxCaption = item.caption;
	};

	const closeLightbox = () => {
		lightboxOpen = false;
		lightboxSrc = '';
	};

	const handleKeydown = (e) => {
		if (lightboxOpen && e.key === 'Escape') {
			closeLightbox();
		}
	};

	onMount(async () => {
		const gsapModule = await import('gsap');
		gsap = gsapModule.default || gsapModule;
		const ScrollTriggerModule = await import('gsap/ScrollTrigger');
		ScrollTrigger = ScrollTriggerModule.default || ScrollTriggerModule.ScrollTrigger;
		gsap.registerPlugin(ScrollTrigger);

		interval = setInterval(nextSlide, 6000);

		// Hero animations
		gsap.from('.hero-logo', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'power3.out' });
		gsap.from('.hero-title', { y: 60, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
		gsap.from('.hero-subtitle', { y: 40, opacity: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
		gsap.from('.hero-cta', { y: 30, opacity: 0, duration: 1, delay: 0.7, ease: 'power3.out' });
		gsap.from('.scroll-indicator', {
			y: -20,
			opacity: 0,
			duration: 1,
			delay: 1.2,
			ease: 'power3.out'
		});

		// Parallax for hero background
		gsap.to('.hero-bg', {
			yPercent: 50,
			ease: 'none',
			scrollTrigger: {
				trigger: '.hero-section',
				start: 'top top',
				end: 'bottom top',
				scrub: true
			}
		});

		// Statistics counter animation
		gsap.utils.toArray('.stat-item').forEach((el) => {
			gsap.from(el, {
				scrollTrigger: { trigger: el, start: 'top 85%' },
				y: 60,
				opacity: 0,
				duration: 0.8,
				stagger: 0.2
			});
		});

		// About section parallax
		gsap.to('.about-image', {
			yPercent: -20,
			ease: 'none',
			scrollTrigger: {
				trigger: '.about-section',
				start: 'top bottom',
				end: 'bottom top',
				scrub: true
			}
		});

		// Timeline animations
		gsap.utils.toArray('.timeline-item').forEach((el, i) => {
			gsap.from(el, {
				scrollTrigger: { trigger: el, start: 'top 80%' },
				x: i % 2 === 0 ? -80 : 80,
				opacity: 0,
				duration: 1,
				ease: 'power3.out'
			});
		});

		// Highlight cards stagger
		gsap.from('.highlight-card', {
			scrollTrigger: { trigger: '.highlights-section', start: 'top 75%' },
			y: 80,
			opacity: 1,
			duration: 0.8,
			stagger: 0.15,
			ease: 'power3.out'
		});

		// Gallery items
		gsap.utils.toArray('.gallery-item').forEach((el, i) => {
			gsap.from(el, {
				scrollTrigger: { trigger: el, start: 'top 90%' },
				y: 50,
				opacity: 0,
				duration: 0.6,
				delay: i * 0.1
			});
		});

		// Archives section
		gsap.from('.archive-header', {
			scrollTrigger: { trigger: '.archives-section', start: 'top 80%' },
			y: 50,
			opacity: 0,
			duration: 1
		});

		// Parallax quote section
		gsap.to('.quote-bg', {
			yPercent: 30,
			ease: 'none',
			scrollTrigger: {
				trigger: '.quote-section',
				start: 'top bottom',
				end: 'bottom top',
				scrub: true
			}
		});

		// CTA section
		gsap.from('.cta-content', {
			scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
			y: 60,
			opacity: 0,
			duration: 1
		});

		window.addEventListener('keydown', handleKeydown);

		return () => {
			clearInterval(interval);
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- HERO SECTION -->
<section class="hero-section relative h-screen w-full overflow-hidden">
	<div class="hero-bg absolute inset-0 z-0">
		<div
			class="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
		></div>
		<img
			src="/Tourism/pasaka/pasaka-hero.webp"
			alt="Pasaka Festival"
			class="h-full w-full object-cover"
		/>
	</div>

	<div
		class="relative z-20 flex h-full flex-col items-center justify-center px-3 text-center text-white sm:px-4 md:px-6"
	>
		<img
			src="/Tourism/pasaka/Pasaka-logo.webp"
			alt="Pasaka Festival Logo"
			class="hero-logo mb-4 w-20 object-contain sm:mb-6 sm:w-28 md:mb-9 md:w-36 lg:w-44 xl:w-52"
		/>

		<p
			class="hero-subtitle font-inter mb-2 text-xs font-medium tracking-[0.2em] text-amber-300 uppercase sm:mb-3 sm:text-sm sm:tracking-[0.3em] md:mb-4 md:text-base"
		>
			Tanauan, Leyte • Philippines
		</p>
		<h1
			class="hero-title font-playfair text-3xl leading-tight font-bold sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
		>
			Pasaka Festival
		</h1>
		<p
			class="hero-subtitle font-inter mx-auto mt-3 max-w-2xl text-sm leading-relaxed font-light text-white/90 sm:mt-4 sm:text-base md:mt-6 md:text-lg lg:text-xl"
		>
			A celebration of faith, culture, and community — uniting hearts through vibrant traditions
			since 1969.
		</p>
		<div
			class="hero-cta mt-6 flex flex-col flex-wrap justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4 md:mt-10"
		>
			<a
				href="#about"
				class="group font-inter flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-xs font-semibold text-black transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95 sm:px-8 sm:py-3 sm:text-sm"
			>
				Discover More
				<svg
					class="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 8l4 4m0 0l-4 4m4-4H3"
					/>
				</svg>
			</a>
			<a
				href="#gallery"
				class="font-inter rounded-full border-2 border-white/50 px-6 py-2.5 text-xs font-semibold text-white transition-all hover:border-white hover:bg-white/10 active:scale-95 sm:px-8 sm:py-3 sm:text-sm"
			>
				View Gallery
			</a>
		</div>
	</div>

	<div
		class="scroll-indicator absolute bottom-4 left-1/2 z-20 -translate-x-1/2 sm:bottom-6 md:bottom-8"
	>
		<div class="flex flex-col items-center text-white/70">
			<span class="font-inter mb-1.5 text-[10px] tracking-widest uppercase sm:mb-2 sm:text-xs"
				>Scroll</span
			>
			<div class="h-10 w-5 rounded-full border-2 border-white/50 p-1 sm:h-12 sm:w-6">
				<div
					class="scroll-dot h-1.5 w-1.5 animate-bounce rounded-full bg-white sm:h-2 sm:w-2"
				></div>
			</div>
		</div>
	</div>
</section>

<!-- STATISTICS BAR -->
<section class="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 py-8 sm:py-10 md:py-12">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
			{#each statistics as stat}
				<div class="stat-item text-center">
					<span class="mb-1.5 block text-2xl sm:mb-2 sm:text-3xl">{stat.icon}</span>
					<span class="font-playfair text-2xl font-bold text-white sm:text-4xl md:text-5xl"
						>{stat.number}</span
					>
					<p
						class="font-inter mt-1 text-[11px] font-medium tracking-wider text-white/90 uppercase sm:mt-2 sm:text-xs md:text-sm"
					>
						{stat.label}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ABOUT SECTION -->
<section id="about" class="about-section relative overflow-hidden bg-stone-50 py-24">
	<div class="mx-auto max-w-7xl px-4">
		<div class="grid items-center gap-8 sm:gap-12 md:gap-16 lg:grid-cols-2">
			<div class="order-2 lg:order-1">
				<span
					class="font-inter text-xs font-semibold tracking-widest text-amber-600 uppercase sm:text-sm"
					>About the Festival</span
				>
				<h2
					class="font-playfair mt-3 text-2xl font-bold text-stone-900 sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl"
				>
					A Living Heritage of Faith & Celebration
				</h2>
				<div
					class="font-inter mt-6 space-y-3 text-base leading-relaxed text-stone-600 sm:mt-8 sm:space-y-4 sm:text-lg md:space-y-6"
				>
					<p>
						The Pasaka Festival, derived from the Waray word meaning "to invite," is an annual
						celebration that pays homage to Assumption of Our Lady and commemorates the rich
						cultural heritage of Tanauan, Leyte.
					</p>
					<p>
						What began as a humble thanksgiving ritual has evolved into one of Eastern Visayas' most
						spectacular cultural events, drawing thousands of visitors who come to witness the
						mesmerizing street dances, elaborate costumes, and the unwavering devotion of the
						Tanauanons.
					</p>
					<p>
						Each August, the streets come alive with the rhythmic beat of drums, the vibrant swirl
						of colorful costumes, and the infectious joy of a community united in celebration.
					</p>
				</div>
				<div class="mt-8 flex flex-wrap gap-4 sm:mt-10 sm:gap-6">
					<div class="flex items-center gap-2 sm:gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 sm:h-12 sm:w-12"
						>
							<svg
								class="h-5 w-5 sm:h-6 sm:w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div>
							<p class="font-inter text-xs font-medium text-stone-500 sm:text-sm">When</p>
							<p class="font-inter text-sm font-semibold text-stone-900 sm:text-base">
								Every August 1-15
							</p>
						</div>
					</div>
					<div class="flex items-center gap-2 sm:gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 sm:h-12 sm:w-12"
						>
							<svg
								class="h-5 w-5 sm:h-6 sm:w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</div>
						<div>
							<p class="font-inter text-xs font-medium text-stone-500 sm:text-sm">Where</p>
							<p class="font-inter text-sm font-semibold text-stone-900 sm:text-base">
								Tanauan, Leyte
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="about-image order-1 lg:order-2">
				<div class="relative">
					<div
						class="absolute -top-2 -left-2 h-full w-full rounded-2xl border-2 border-amber-500/30 sm:-top-4 sm:-left-4"
					></div>
					<img
						src="/Tourism/pasaka/pasaka-image1.webp"
						alt="Pasaka Festival Celebration"
						class="relative h-64 w-full rounded-2xl object-cover shadow-2xl sm:h-96 md:h-[500px]"
					/>
					<div
						class="absolute -right-4 -bottom-4 rounded-xl bg-amber-500 p-4 shadow-xl sm:-right-6 sm:-bottom-6 sm:p-6"
					>
						<p class="font-playfair text-2xl font-bold text-white sm:text-3xl md:text-4xl">55+</p>
						<p class="font-inter text-xs font-medium text-white/90 sm:text-sm">
							Years of Tradition
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- FEATURED SLIDESHOW -->
<section class="relative bg-stone-900 py-16 sm:py-20 md:py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="mb-8 text-center sm:mb-12">
			<span
				class="font-inter text-xs font-semibold tracking-widest text-amber-400 uppercase sm:text-sm"
				>Featured Media</span
			>
			<h2
				class="font-playfair mt-3 text-2xl font-bold text-white sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl"
			>
				Moments of Joy
			</h2>
		</div>

		<div class="relative overflow-hidden rounded-2xl shadow-2xl">
			<div class="relative aspect-[16/9]">
				{#if slides[currentSlide].type === 'image'}
					<img
						src={slides[currentSlide].src}
						alt={slides[currentSlide].caption}
						class="h-full w-full object-cover transition-all duration-1000"
					/>
				{:else if slides[currentSlide].type === 'video'}
					<video
						src={slides[currentSlide].src}
						autoplay
						muted
						loop
						playsinline
						class="h-full w-full object-cover"
					></video>
				{/if}

				<div
					class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
				></div>

				<div class="absolute right-0 bottom-0 left-0 p-4 sm:p-6 md:p-8">
					<span
						class="font-inter mb-2 inline-block rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-semibold text-black sm:px-3 sm:text-xs"
					>
						{slides[currentSlide].year}
					</span>
					<p class="font-inter text-base font-medium text-white sm:text-lg md:text-2xl">
						{slides[currentSlide].caption}
					</p>
				</div>
			</div>

			<!-- Controls -->
			<button
				class="absolute top-1/2 left-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 sm:left-4 sm:h-12 sm:w-12"
				on:click={prevSlide}
			>
				<svg
					class="h-5 w-5 text-white sm:h-6 sm:w-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>
			<button
				class="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/20 sm:right-4 sm:h-12 sm:w-12"
				on:click={nextSlide}
			>
				<svg
					class="h-5 w-5 text-white sm:h-6 sm:w-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>

		<!-- Thumbnail Navigation -->
		<div class="mt-4 flex justify-center gap-2 overflow-x-auto pb-2 sm:mt-6 sm:gap-3">
			{#each slides as slide, i}
				<button
					class="group relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all sm:h-16 sm:w-24 {i ===
					currentSlide
						? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-stone-900'
						: 'opacity-50 hover:opacity-75'}"
					on:click={() => goToSlide(i)}
				>
					{#if slide.type === 'image'}
						<img src={slide.src} alt="" class="h-full w-full object-cover" />
					{:else}
						<video src={slide.src} class="h-full w-full object-cover"></video>
						<div class="absolute inset-0 flex items-center justify-center bg-black/30">
							<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
								<path d="M8 5v14l11-7z" />
							</svg>
						</div>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- PARALLAX QUOTE -->
<section
	class="quote-section relative h-[50vh] min-h-[350px] overflow-hidden sm:h-[60vh] sm:min-h-[400px]"
>
	<div class="quote-bg absolute inset-0 -top-20 -bottom-20">
		<img
			src="/Tourism/pasaka/pasaka-image1.webp"
			alt="Festival Crowd"
			class="h-full w-full object-cover"
		/>
		<div class="absolute inset-0 bg-amber-900/80"></div>
	</div>
	<div class="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
		<div class="text-center">
			<svg
				class="mx-auto mb-4 h-8 w-8 text-amber-300/50 sm:mb-6 sm:h-12 sm:w-12"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
				/>
			</svg>
			<blockquote
				class="font-playfair mx-auto max-w-4xl text-lg leading-relaxed font-medium text-white italic sm:text-2xl md:text-3xl lg:text-5xl"
			>
				"Pasaka is not just a festival. It is the heartbeat of Tanauan — a living testament to our
				faith, resilience, and unity as a people."
			</blockquote>
			<p class="font-inter mt-4 text-sm font-medium text-amber-200 sm:mt-8 sm:text-lg">
				— Municipal Tourism Office
			</p>
		</div>
	</div>
</section>

<!-- TIMELINE -->
<section class="bg-white py-16 sm:py-20 md:py-24">
	<div class="mx-auto max-w-5xl px-4 sm:px-6">
		<div class="mb-12 text-center sm:mb-16">
			<span
				class="font-inter text-xs font-semibold tracking-widest text-amber-600 uppercase sm:text-sm"
				>Our Journey</span
			>
			<h2
				class="font-playfair mt-3 text-2xl font-bold text-stone-900 sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl"
			>
				Festival Timeline
			</h2>
		</div>

		<div class="relative">
			<!-- Timeline Line -->
			<div
				class="absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-200 md:block"
			></div>

			<div class="space-y-8 sm:space-y-12">
				<div class="timeline-item relative md:flex md:items-center">
					<div class="md:w-1/2 md:pr-12 md:text-right">
						<span class="font-playfair text-3xl font-bold text-amber-500 sm:text-4xl md:text-5xl"
							>1969</span
						>
						<h3
							class="font-playfair mt-2 text-lg font-semibold text-stone-900 sm:text-xl md:text-2xl"
						>
							The Beginning
						</h3>
						<p class="font-inter mt-2 text-sm text-stone-600 sm:mt-3 sm:text-base">
							The Pasaka Festival was born as a humble thanksgiving celebration, honoring the Señor
							Santo Niño and marking the town's foundation anniversary.
						</p>
					</div>
					<div
						class="absolute left-1/2 hidden h-5 w-5 -translate-x-1/2 rounded-full border-4 border-amber-500 bg-white md:block"
					></div>
					<div class="md:w-1/2 md:pl-12"></div>
				</div>

				<div class="timeline-item relative md:flex md:items-center">
					<div class="md:w-1/2 md:pr-12"></div>
					<div
						class="absolute left-1/2 hidden h-5 w-5 -translate-x-1/2 rounded-full border-4 border-amber-500 bg-white md:block"
					></div>
					<div class="md:w-1/2 md:pl-12">
						<span class="font-playfair text-3xl font-bold text-amber-500 sm:text-4xl md:text-5xl"
							>1980s</span
						>
						<h3
							class="font-playfair mt-2 text-lg font-semibold text-stone-900 sm:text-xl md:text-2xl"
						>
							Growing Recognition
						</h3>
						<p class="font-inter mt-2 text-sm text-stone-600 sm:mt-3 sm:text-base">
							The festival gained regional recognition as more barangays joined with elaborate
							floats and synchronized dance performances.
						</p>
					</div>
				</div>

				<div class="timeline-item relative md:flex md:items-center">
					<div class="md:w-1/2 md:pr-12 md:text-right">
						<span class="font-playfair text-3xl font-bold text-amber-500 sm:text-4xl md:text-5xl"
							>1990s</span
						>
						<h3
							class="font-playfair mt-2 text-lg font-semibold text-stone-900 sm:text-xl md:text-2xl"
						>
							Cultural Renaissance
						</h3>
						<p class="font-inter mt-2 text-sm text-stone-600 sm:mt-3 sm:text-base">
							Street dancing competitions were formalized, attracting performers from neighboring
							municipalities and elevating artistic standards.
						</p>
					</div>
					<div
						class="absolute left-1/2 hidden h-5 w-5 -translate-x-1/2 rounded-full border-4 border-amber-500 bg-white md:block"
					></div>
					<div class="md:w-1/2 md:pl-12"></div>
				</div>

				<div class="timeline-item relative md:flex md:items-center">
					<div class="md:w-1/2 md:pr-12"></div>
					<div
						class="absolute left-1/2 hidden h-5 w-5 -translate-x-1/2 rounded-full border-4 border-amber-500 bg-white md:block"
					></div>
					<div class="md:w-1/2 md:pl-12">
						<span class="font-playfair text-3xl font-bold text-amber-500 sm:text-4xl md:text-5xl"
							>2013</span
						>
						<h3
							class="font-playfair mt-2 text-lg font-semibold text-stone-900 sm:text-xl md:text-2xl"
						>
							Rising from Yolanda
						</h3>
						<p class="font-inter mt-2 text-sm text-stone-600 sm:mt-3 sm:text-base">
							After Typhoon Yolanda's devastation, Pasaka became a symbol of hope and resilience,
							uniting the community in recovery.
						</p>
					</div>
				</div>

				<div class="timeline-item relative md:flex md:items-center">
					<div class="md:w-1/2 md:pr-12 md:text-right">
						<span class="font-playfair text-3xl font-bold text-amber-500 sm:text-4xl md:text-5xl"
							>Today</span
						>
						<h3
							class="font-playfair mt-2 text-lg font-semibold text-stone-900 sm:text-xl md:text-2xl"
						>
							A National Treasure
						</h3>
						<p class="font-inter mt-2 text-sm text-stone-600 sm:mt-3 sm:text-base">
							Pasaka Festival continues to thrive as one of the Philippines' most vibrant cultural
							celebrations, welcoming visitors from around the world.
						</p>
					</div>
					<div
						class="absolute left-1/2 hidden h-5 w-5 -translate-x-1/2 rounded-full border-4 border-amber-500 bg-white md:block"
					></div>
					<div class="md:w-1/2 md:pl-12"></div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- HIGHLIGHTS -->
<section class="highlights-section bg-stone-100 py-24">
	<div class="mx-auto max-w-6xl px-4">
		<div class="mb-16 text-center">
			<span class="font-inter text-sm font-semibold tracking-widest text-amber-600 uppercase"
				>What to Experience</span
			>
			<h2 class="font-playfair mt-4 text-4xl font-bold text-stone-900 sm:text-5xl">
				Festival Highlights
			</h2>
		</div>

		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			<div
				class="highlight-card group rounded-2xl bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white transition-transform group-hover:scale-110"
				>
					<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
						/>
					</svg>
				</div>
				<h3 class="font-playfair mb-3 text-2xl font-semibold text-stone-900">Street Dancing</h3>
				<p class="font-inter leading-relaxed text-stone-600">
					Witness the vibrant street dancing competition featuring colorful costumes, synchronized
					choreography, and rhythmic drumbeats that echo through the streets.
				</p>
			</div>

			<div
				class="highlight-card group rounded-2xl bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white transition-transform group-hover:scale-110"
				>
					<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</div>
				<h3 class="font-playfair mb-3 text-2xl font-semibold text-stone-900">
					Religious Procession
				</h3>
				<p class="font-inter leading-relaxed text-stone-600">
					Join the solemn procession of the Señor Santo Niño through the town streets, a moving
					display of faith that unites generations.
				</p>
			</div>

			<div
				class="highlight-card group rounded-2xl bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white transition-transform group-hover:scale-110"
				>
					<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>
				</div>
				<h3 class="font-playfair mb-3 text-2xl font-semibold text-stone-900">Community Feast</h3>
				<p class="font-inter leading-relaxed text-stone-600">
					Experience the warmth of Filipino hospitality with community feasts featuring local
					delicacies and traditional Waray cuisine.
				</p>
			</div>

			<div
				class="highlight-card group rounded-2xl bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white transition-transform group-hover:scale-110"
				>
					<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
						/>
					</svg>
				</div>
				<h3 class="font-playfair mb-3 text-2xl font-semibold text-stone-900">Float Parade</h3>
				<p class="font-inter leading-relaxed text-stone-600">
					Marvel at elaborately decorated floats representing different barangays, each telling
					unique stories of faith and heritage.
				</p>
			</div>

			<div
				class="highlight-card group rounded-2xl bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white transition-transform group-hover:scale-110"
				>
					<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
				</div>
				<h3 class="font-playfair mb-3 text-2xl font-semibold text-stone-900">Cultural Exhibits</h3>
				<p class="font-inter leading-relaxed text-stone-600">
					Explore exhibitions showcasing Waray art, craftsmanship, and historical artifacts that
					tell the story of Tanauan's rich heritage.
				</p>
			</div>

			<div
				class="highlight-card group rounded-2xl bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl"
			>
				<div
					class="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white transition-transform group-hover:scale-110"
				>
					<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="font-playfair mb-3 text-2xl font-semibold text-stone-900">Live Entertainment</h3>
				<p class="font-inter leading-relaxed text-stone-600">
					Enjoy concerts, talent shows, and performances by local and national artists that keep the
					festivities alive until night.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ARCHIVES -->
<section class="archives-section bg-stone-900 py-24">
	<div class="mx-auto max-w-6xl px-4">
		<div class="archive-header mb-16 text-center">
			<span class="font-inter text-sm font-semibold tracking-widest text-amber-400 uppercase"
				>Festival Records</span
			>
			<h2 class="font-playfair mt-4 text-4xl font-bold text-white sm:text-5xl">Archives</h2>
			<p class="font-inter mx-auto mt-4 max-w-2xl text-lg text-stone-400">
				A look back at the themes, participation, and memorable moments from past celebrations.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Year Selector -->
			<div class="space-y-3">
				{#each archives as archive}
					<button
						class="w-full rounded-xl p-4 text-left transition-all {activeArchiveYear ===
						archive.year
							? 'bg-amber-500 text-black'
							: 'bg-stone-800 text-white hover:bg-stone-700'}"
						on:click={() => (activeArchiveYear = archive.year)}
					>
						<span class="font-playfair text-2xl font-bold">{archive.year}</span>
						<p class="font-inter mt-1 text-sm opacity-80">{archive.theme}</p>
					</button>
				{/each}
			</div>

			<!-- Archive Details -->
			<div class="lg:col-span-2">
				{#each archives as archive}
					{#if activeArchiveYear === archive.year}
						<div class="rounded-2xl bg-stone-800 p-8">
							<div class="mb-8 flex items-center gap-4">
								<span class="font-playfair text-6xl font-bold text-amber-500">{archive.year}</span>
								<div>
									<p class="font-inter text-sm tracking-wider text-stone-400 uppercase">Theme</p>
									<p class="font-playfair text-2xl font-semibold text-white">{archive.theme}</p>
								</div>
							</div>

							<div class="grid gap-6 sm:grid-cols-2">
								<div class="rounded-xl bg-stone-700/50 p-6">
									<p class="font-inter text-sm tracking-wider text-stone-400 uppercase">
										Participants
									</p>
									<p class="font-playfair mt-2 text-3xl font-bold text-white">
										{archive.participants}
									</p>
								</div>
								<div class="rounded-xl bg-stone-700/50 p-6">
									<p class="font-inter text-sm tracking-wider text-stone-400 uppercase">
										Highlight
									</p>
									<p class="font-inter mt-2 text-lg text-white">{archive.highlight}</p>
								</div>
							</div>

							<div class="mt-8">
								<p class="font-inter mb-4 text-sm tracking-wider text-stone-400 uppercase">
									Gallery Preview
								</p>
								<div class="grid grid-cols-3 gap-3">
									{#each [1, 2, 3] as _}
										<div class="aspect-square overflow-hidden rounded-lg bg-stone-700">
											<img
												src="/images/pasaka-archive-{archive.year}.jpg"
												alt="Archive {archive.year}"
												class="h-full w-full object-cover opacity-70 transition-opacity hover:opacity-100"
											/>
										</div>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- GALLERY -->
<section id="gallery" class="bg-white py-24">
	<div class="mx-auto max-w-7xl px-4">
		<div class="mb-16 text-center">
			<span class="font-inter text-sm font-semibold tracking-widest text-amber-600 uppercase"
				>Visual Stories</span
			>
			<h2 class="font-playfair mt-4 text-4xl font-bold text-stone-900 sm:text-5xl">
				Festival Gallery
			</h2>
		</div>

		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
			{#each slides as item, i}
				<div
					class="gallery-item group relative cursor-pointer overflow-hidden rounded-xl {i === 0
						? 'col-span-2 row-span-2'
						: ''}"
					on:click={() => item.type === 'image' && openLightbox(item)}
				>
					{#if item.type === 'image'}
						<img
							src={item.src}
							alt={item.caption}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 {i ===
							0
								? 'aspect-square'
								: 'aspect-[4/3]'}"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"
						>
							<div class="absolute right-0 bottom-0 left-0 p-4">
								<p class="font-inter text-sm text-white">{item.caption}</p>
							</div>
						</div>
						<div
							class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
						>
							<div class="rounded-full bg-white/20 p-3 backdrop-blur-sm">
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
									/>
								</svg>
							</div>
						</div>
					{:else if item.type === 'video'}
						<div class="relative aspect-[4/3]">
							<video src={item.src} class="h-full w-full object-cover"></video>
							<div class="absolute inset-0 flex items-center justify-center bg-black/30">
								<div class="rounded-full bg-white/90 p-4 shadow-lg">
									<svg class="h-8 w-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8 5v14l11-7z" />
									</svg>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<div class="mt-12 text-center">
			<a
				href="/gallery"
				class="font-inter inline-flex items-center gap-2 rounded-full border-2 border-amber-500 px-8 py-3 text-sm font-semibold text-amber-600 transition-all hover:bg-amber-500 hover:text-white"
			>
				View Full Gallery
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 8l4 4m0 0l-4 4m4-4H3"
					/>
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- LIGHTBOX -->
{#if lightboxOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
		on:click={closeLightbox}
	>
		<button
			class="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
			on:click={closeLightbox}
		>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>

		<div class="relative max-h-[90vh] max-w-[90vw]" on:click|stopPropagation>
			{#if lightboxType === 'image'}
				<img src={lightboxSrc} alt={lightboxCaption} class="max-h-[85vh] rounded-lg shadow-2xl" />
			{:else if lightboxType === 'video'}
				<video src={lightboxSrc} controls autoplay class="max-h-[85vh] rounded-lg shadow-2xl"
				></video>
			{/if}
			<p class="font-inter mt-4 text-center text-lg text-white">{lightboxCaption}</p>
		</div>
	</div>
{/if}

<style>
	:global(body) {
		font-family: 'Inter', sans-serif;
	}

	.font-playfair {
		font-family: 'Playfair Display', serif;
	}

	.font-inter {
		font-family: 'Inter', sans-serif;
	}

	.scroll-dot {
		animation: scrollBounce 2s infinite;
	}

	@keyframes scrollBounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(16px);
		}
	}

	/* Smooth scroll */
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Custom scrollbar */
	:global(::-webkit-scrollbar) {
		width: 10px;
	}

	:global(::-webkit-scrollbar-track) {
		background: #1c1917;
	}

	:global(::-webkit-scrollbar-thumb) {
		background: #f59e0b;
		border-radius: 5px;
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: #d97706;
	}
</style>
