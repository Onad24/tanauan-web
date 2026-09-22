<!-- HistorySection.svelte -->
<script>
	import { onMount, onDestroy } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	// Register ScrollTrigger plugin
	gsap.registerPlugin(ScrollTrigger);

	let container;
	let ctx;

	const timelineEvents = [
		{
			year: '1661',
			title: 'The Arrival',
			content:
				'Juanillo Siengco, a Chinese mestizo from Sugbo (Cebu), journeyed with his wife Susana Baga and companions to the eastern coast of Leyte, navigating the Binahaan River in search of fertile farmlands.',
			icon: ''
		},
		{
			year: '1687',
			title: 'Faith Takes Root',
			content:
				'Jesuit missionaries visited the settlement, planting the seeds of Christianity that would grow into the deep spiritual heritage Tanauan holds today.',
			icon: ''
		},
		{
			year: '1701',
			title: 'Birth of a Municipality',
			content:
				'Tanauan was formally established with its first town officials appointed under Spanish colonial rule, marking the beginning of organized governance.',
			icon: ''
		},
		{
			year: '1704',
			title: 'Church of Our Lady',
			content:
				'The Church of Our Lady of the Assumption was completed, becoming one of the oldest and most historically significant religious structures in Leyte.',
			icon: ''
		},
		{
			year: '1852',
			title: "Tolosa's Independence",
			content:
				'The adjacent town of Tolosa, once part of Tanauan, gained its autonomy through a petition to the Spanish government.',
			icon: ''
		},
		{
			year: '1906',
			title: 'Rise of Intellectuals',
			content:
				"Don Jaime C. de Veyra became the first Filipino Governor of Leyte, cementing Tanauan's reputation as the 'Cradle of Intellectuals' (Bungto Han Kamag-araman).",
			icon: ''
		},
		{
			year: '1944',
			title: 'Liberation Day',
			content:
				"Following General MacArthur's landing, the US Sixth Army established headquarters in Tanauan. A vital airfield was built, instrumental in liberating the Philippines.",
			icon: ''
		},
		{
			year: '2013',
			title: 'Rising from Yolanda',
			content:
				'Typhoon Yolanda devastated the municipality, but the resilient spirit of Tanauananons shone through as the community rebuilt stronger than ever.',
			icon: ''
		}
	];

	const notableFigures = [
		{
			name: 'Don Jaime C. de Veyra',
			title: 'First Filipino Governor of Leyte',
			achievements:
				'Philippine Commission member, Resident Commissioner to Washington D.C., National Researcher'
		},
		{
			name: 'Aleja de la Cruz',
			title: 'Pioneer in Education',
			achievements: "Known as 'Manang Elek', she paved the way for education in Tanauan"
		},
		{
			name: 'Florencia Espina',
			title: 'Healthcare Pioneer',
			achievements: 'One of the first six Filipino nurses in 1910'
		},
		{
			name: 'Pedro A. Villegas',
			title: 'WWII Hero',
			achievements: 'Refused to serve Japanese forces, joined guerrilla resistance'
		}
	];

	onMount(() => {
		ctx = gsap.context(() => {
			// Hero section parallax
			gsap.to('.history-hero-bg', {
				yPercent: 50,
				ease: 'none',
				scrollTrigger: {
					trigger: '.history-hero',
					start: 'top top',
					end: 'bottom top',
					scrub: true
				}
			});

			// Hero text animation
			gsap.from('.history-hero-content > *', {
				y: 100,
				opacity: 0,
				duration: 1.5,
				stagger: 0.2,
				ease: 'power4.out'
			});

			// Origin story section
			gsap.from('.origin-card', {
				scrollTrigger: {
					trigger: '.origin-section',
					start: 'top 80%',
					toggleActions: 'play none none reverse'
				},
				y: 80,
				opacity: 0,
				duration: 1,
				ease: 'power3.out'
			});

			// Etymology animation
			gsap.from('.etymology-word', {
				scrollTrigger: {
					trigger: '.etymology-section',
					start: 'top 70%'
				},
				scale: 0.8,
				opacity: 0,
				duration: 1.2,
				ease: 'back.out(1.7)'
			});

			// Timeline events stagger animation
			gsap.utils.toArray('.timeline-event').forEach((event, i) => {
				const direction = i % 2 === 0 ? -100 : 100;

				gsap.from(event, {
					scrollTrigger: {
						trigger: event,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					},
					x: direction,
					opacity: 0,
					duration: 1,
					ease: 'power3.out'
				});
			});

			// Timeline line drawing
			gsap.from('.timeline-line', {
				scrollTrigger: {
					trigger: '.timeline-section',
					start: 'top 60%',
					end: 'bottom 80%',
					scrub: 1
				},
				scaleY: 0,
				transformOrigin: 'top center'
			});

			// Notable figures cards
			gsap.from('.figure-card', {
				scrollTrigger: {
					trigger: '.figures-section',
					start: 'top 75%'
				},
				y: 60,
				opacity: 0,
				duration: 0.8,
				stagger: 0.15,
				ease: 'power2.out'
			});

			// Cultural heritage horizontal scroll
			const culturalItems = gsap.utils.toArray('.cultural-item');
			gsap.to(culturalItems, {
				xPercent: -100 * (culturalItems.length - 1),
				ease: 'none',
				scrollTrigger: {
					trigger: '.cultural-scroll-container',
					pin: true,
					scrub: 1,
					snap: 1 / (culturalItems.length - 1),
					end: () => '+=' + document.querySelector('.cultural-scroll-wrapper').offsetWidth
				}
			});

			// Floating elements animation
			gsap.to('.float-element', {
				y: -20,
				duration: 2,
				ease: 'power1.inOut',
				yoyo: true,
				repeat: -1,
				stagger: {
					each: 0.3,
					from: 'random'
				}
			});

			// Counter animation
			gsap.utils.toArray('.stat-number').forEach((stat) => {
				const target = parseInt(stat.dataset.target);
				gsap.from(stat, {
					scrollTrigger: {
						trigger: stat,
						start: 'top 85%'
					},
					textContent: 0,
					duration: 2,
					ease: 'power1.out',
					snap: { textContent: 1 },
					onUpdate: function () {
						stat.textContent = Math.ceil(this.targets()[0].textContent);
					}
				});
			});
		}, container);
	});

	onDestroy(() => {
		if (ctx) ctx.revert();
	});
</script>

<section bind:this={container} class="history-container bg-stone-50">
	<!-- Hero Section -->
	<div class="history-hero relative h-screen overflow-hidden">
		<div
			class="history-hero-bg absolute inset-0 bg-cover bg-center"
			style="background-image: url('/Tourism/history/history_header.jpg');"
		>
			<div
				class="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80"
			></div>
		</div>

		<div
			class="history-hero-content relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
		>
			<span class="mb-4 text-sm font-medium tracking-[0.3em] text-amber-400 uppercase"
				>Est. 1701</span
			>
			<h1 class="mb-6 font-serif text-5xl leading-tight text-white md:text-7xl lg:text-8xl">
				The History of<br />
				<span class="text-amber-400">Tanauan</span>
			</h1>
			<p class="max-w-2xl text-lg leading-relaxed text-stone-300 md:text-xl">
				A journey through centuries of resilience, faith, and the indomitable spirit of the people
				of Leyte
			</p>
			<div class="mt-12 animate-bounce">
				<svg class="h-8 w-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					/>
				</svg>
			</div>
		</div>

		<!-- Decorative floating elements -->
		<div class="float-element absolute top-1/4 left-10 h-4 w-4 rounded-full bg-amber-400/30"></div>
		<div class="float-element absolute top-1/3 right-20 h-6 w-6 rounded-full bg-amber-400/20"></div>
		<div class="float-element absolute bottom-1/4 left-1/4 h-3 w-3 rounded-full bg-white/20"></div>
	</div>

	<!-- Etymology Section -->
	<div class="etymology-section bg-white py-24 md:py-32">
		<div class="mx-auto max-w-6xl px-4 text-center">
			<span class="text-sm font-medium tracking-widest text-amber-600 uppercase">The Name</span>
			<div class="etymology-word my-8">
				<h2 class="mb-4 font-serif text-4xl text-stone-800 md:text-6xl">Tan-awan</h2>
				<p class="text-xl text-stone-500 italic">/tan-a-wan/ — "lookout tower"</p>
			</div>
			<p class="mx-auto max-w-3xl text-lg leading-relaxed text-stone-600">
				The town derived its name from a majestic Molave tree that served as a natural lookout tower
				for early inhabitants. From this vantage point, a sentinel would keep watch for Moro pirates
				who frequently raided coastal communities. A hollow trunk called a <strong
					class="text-amber-700">"bayog"</strong
				>
				was hung from the tree and struck to signal danger, prompting residents to seek refuge in a stone-walled
				fort known as a <strong class="text-amber-700">"cuta."</strong>
			</p>
		</div>
	</div>

	<!-- Origin Story Section -->
	<div class="origin-section bg-gradient-to-br from-stone-100 to-amber-50 py-24">
		<div class="mx-auto max-w-6xl px-4">
			<div class="mb-16 text-center">
				<span class="text-sm font-medium tracking-widest text-amber-600 uppercase"
					>Our Ancestors</span
				>
				<h2 class="mt-4 font-serif text-3xl text-stone-800 md:text-5xl">The Founding Families</h2>
			</div>

			<div
				class="origin-card relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl shadow-stone-200/50 md:p-12"
			>
				<div
					class="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100 opacity-50"
				></div>

				<div class="relative z-10 grid gap-12 md:grid-cols-2">
					<div class="space-y-6">
						<h3 class="font-serif text-2xl text-stone-800">The First Settlers</h3>
						<p class="leading-relaxed text-stone-600">
							In the early days, the area was inhabited by the family of <strong>Calanao</strong>
							(father),
							<strong>Makasanay</strong> (mother), and their daughter <strong>Sangad</strong>, who
							resided by the banks of the Bukid River at the base of Adil Hill.
						</p>
						<p class="leading-relaxed text-stone-600">
							In 1661, <strong>Juanillo Siengco</strong>, a Chinese mestizo from Sugbo (Cebu), along
							with his wife
							<strong>Susana Baga</strong> and companions Cornelio and Elias, journeyed to the eastern
							coast of Leyte, navigating the Binahaan River until they discovered fertile lands.
						</p>
					</div>

					<div class="space-y-6">
						<h3 class="font-serif text-2xl text-stone-800">A Union of Peoples</h3>
						<p class="leading-relaxed text-stone-600">
							The two groups forged a pact of friendship, living in harmony and sharing resources.
							In time, Juanillo's son <strong>Josef</strong> married Calanao's daughter
							<strong>Sangad</strong>, and their union bore five daughters and one son: Anurya,
							Alimocon, Atalabong, Dolido, and Tombalasay.
						</p>
						<p class="leading-relaxed text-stone-600">
							From these founding families, a tribe was formed—laying the groundwork for Tanauan's
							first town officials and the vibrant community that exists today.
						</p>
					</div>
				</div>

				<!-- Family Tree Visualization -->
				<div class="mt-12 border-t border-stone-200 pt-12">
					<div class="flex flex-col items-center">
						<!-- First Generation -->
						<div class="mb-8 flex gap-8 md:gap-16">
							<div class="text-center">
								<div
									class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100"
								>
									<span class="text-xl font-semibold text-stone-700">Calanao</span>
								</div>
								<p class="text-sm text-stone-500">& Makasanay</p>
							</div>
							<div class="text-center">
								<div
									class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100"
								>
									<span class="text-xl font-semibold text-stone-700">Juanillo</span>
								</div>
								<p class="text-sm text-stone-500">& Susana</p>
							</div>
						</div>

						<!-- Connector -->
						<div class="h-8 w-px bg-amber-300"></div>

						<!-- Second Generation -->
						<div class="mt-4 text-center">
							<div
								class="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-amber-200"
							>
								<span class="text-lg font-semibold text-stone-700">Josef & Sangad</span>
							</div>
							<p class="mt-1 text-sm text-stone-500">The Union</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Timeline Section -->
	<div class="timeline-section relative overflow-hidden bg-stone-900 py-24 text-white md:py-32">
		<div class="absolute inset-0 opacity-5">
			<div
				class="absolute inset-0"
				style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"
			></div>
		</div>

		<div class="relative z-10 mx-auto max-w-6xl px-4">
			<div class="mb-20 text-center">
				<span class="text-sm font-medium tracking-widest text-amber-400 uppercase"
					>Through The Ages</span
				>
				<h2 class="mt-4 font-serif text-3xl md:text-5xl">A Journey Through Time</h2>
			</div>

			<div class="relative">
				<!-- Central timeline line -->
				<div
					class="timeline-line absolute left-1/2 h-full w-1 -translate-x-1/2 transform rounded-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600"
				></div>

				{#each timelineEvents as event, i}
					<div
						class="timeline-event relative mb-16 md:mb-24 {i % 2 === 0
							? 'md:pr-1/2 md:text-right'
							: 'md:pl-1/2 md:ml-auto'}"
					>
						<div class="md:w-[calc(50%-3rem)] {i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}">
							<div
								class="group rounded-2xl border border-stone-700/50 bg-stone-800/80 p-6 backdrop-blur-sm transition-all duration-500 hover:border-amber-500/50 md:p-8"
							>
								<div
									class="mb-4 flex items-center gap-4 {i % 2 === 0 ? 'md:flex-row-reverse' : ''}"
								>
									<span class="text-4xl">{event.icon}</span>
									<div>
										<span class="text-2xl font-bold text-amber-400">{event.year}</span>
										<h3 class="font-serif text-xl text-white">{event.title}</h3>
									</div>
								</div>
								<p class="leading-relaxed text-stone-400">{event.content}</p>
							</div>
						</div>

						<!-- Timeline dot -->
						<div
							class="absolute top-8 left-1/2 z-10 hidden h-5 w-5 -translate-x-1/2 transform rounded-full border-4 border-stone-900 bg-amber-400 md:block"
						></div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Statistics Section -->
	<div class="bg-amber-600 py-20">
		<div class="mx-auto max-w-6xl px-4">
			<div class="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
				<div>
					<span class="stat-number text-5xl font-bold text-white md:text-6xl" data-target="324"
						>315</span
					>
					<p class="mt-2 text-amber-100">Years of History</p>
				</div>
				<div>
					<span class="stat-number text-5xl font-bold text-white md:text-6xl" data-target="47"
						>47</span
					>
					<p class="mt-2 text-amber-100">Colonial Era Leaders</p>
				</div>
				<div>
					<span class="stat-number text-5xl font-bold text-white md:text-6xl" data-target="54"
						>54</span
					>
					<p class="mt-2 text-amber-100">Barangays</p>
				</div>
				<div>
					<span class="stat-number text-5xl font-bold text-white md:text-6xl" data-target="1704"
						>1704</span
					>
					<p class="mt-2 text-amber-100">Church Founded</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Notable Figures Section -->
	<div class="figures-section bg-white py-24 md:py-32">
		<div class="mx-auto max-w-6xl px-4">
			<div class="mb-16 text-center">
				<span class="text-sm font-medium tracking-widest text-amber-600 uppercase"
					>Bungto Han Kamag-araman</span
				>
				<h2 class="mt-4 font-serif text-3xl text-stone-800 md:text-5xl">Cradle of Intellectuals</h2>
				<p class="mx-auto mt-4 max-w-2xl text-stone-600">
					Since the Spanish colonial period, Tanauan has been known for producing remarkable
					individuals who shaped Philippine history.
				</p>
			</div>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				{#each notableFigures as figure}
					<div class="figure-card group">
						<div
							class="h-full rounded-2xl border border-stone-200 bg-gradient-to-br from-stone-50 to-amber-50 p-6 transition-all duration-500 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-100/50"
						>
							<h3 class="mb-1 font-serif text-xl text-stone-800">{figure.name}</h3>
							<p class="mb-3 text-sm font-medium text-amber-600">{figure.title}</p>
							<p class="text-sm leading-relaxed text-stone-500">{figure.achievements}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Cultural Heritage Horizontal Scroll -->
	<div class="cultural-scroll-container h-screen overflow-hidden bg-stone-900">
		<div class="cultural-scroll-wrapper flex h-full">
			<!-- Pottery & Crafts -->
			<div
				class="cultural-item relative flex h-full w-screen min-w-screen items-center justify-center p-8"
			>
				<img
					src="/Tourism/history/pottery-1.jpg"
					alt="Pottery"
					class="absolute inset-0 z-0 h-full w-full object-cover opacity-20"
				/>
				<div class="relative z-10 max-w-4xl text-center text-white">
					<h3 class="mb-4 font-serif text-3xl md:text-4xl">Pottery & Crafts</h3>
					<p class="text-lg text-stone-400">
						Barangay Canramos is renowned for its talented potters and as a source of quality clay,
						keeping traditional craftsmanship alive.
					</p>
				</div>
			</div>

			<!-- Pasaka Festival -->
			<div
				class="cultural-item relative flex h-full w-screen min-w-screen items-center justify-center p-8"
			>
				<img
					src="/Tourism/history/history_pasaka.jpg"
					alt="Festival"
					class="absolute inset-0 z-0 h-full w-full object-cover opacity-20"
				/>
				<div class="relative z-10 max-w-4xl text-center text-white">
					<h3 class="mb-4 font-serif text-3xl md:text-4xl">Pasaka Festival</h3>
					<p class="text-lg text-stone-400">
						Derived from the Waray word for "assumption," this festival celebrates Nuestra Señora de
						la Asuncion every August 15th.
					</p>
				</div>
			</div>

			<!-- Skimboarding Capital of Tanauan -->
			<div
				class="cultural-item relative flex h-full w-screen min-w-screen items-center justify-center p-8"
			>
				<img
					src="/Tourism/history/history_skimboarding.jpg"
					alt="Tanauan Skimboarding"
					class="absolute inset-0 z-0 h-full w-full object-cover opacity-20"
				/>

				<div class="relative z-10 max-w-4xl text-center text-white">
					<h3 class="mb-4 font-serif text-3xl md:text-4xl">Skimboarding</h3>

					<p class="text-lg text-stone-400">
						Skimboarding is a popular water sport in Tanauan, Leyte, especially during the summer
						months when waves are ideal for this thrilling activity. Known for its energetic coastal
						culture, the town has produced skilled skimboarders who compete in local and regional
						events. The sport combines elements of surfing and skateboarding, requiring speed,
						balance, and agility as riders glide across the water’s surface.
					</p>
				</div>
			</div>

			<!-- Balinsasayaw Singers -->
			<div
				class="cultural-item relative flex h-full w-screen min-w-screen items-center justify-center p-8"
			>
				<img
					src="/images/singers.png"
					alt="Balinsasayaw Singers"
					class="absolute inset-0 z-0 h-full w-full object-cover opacity-20"
				/>
				<div class="relative z-10 max-w-4xl text-center text-white">
					<h3 class="mb-4 font-serif text-3xl md:text-4xl">Balinsasayaw Singers</h3>
					<p class="text-lg text-stone-400">
						With Danny Basas as musical director and composer of the Tanauan Hymn, they continue to
						entertain local and international visitors.
					</p>
				</div>
			</div>
		</div>

		<!-- Scroll indicator -->
		<div class="absolute bottom-8 left-1/2 -translate-x-1/2 transform text-sm text-stone-500">
			<span class="flex items-center gap-2">
				<svg class="h-5 w-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M14 5l7 7m0 0l-7 7m7-7H3"
					/>
				</svg>
				Scroll to explore
			</span>
		</div>
	</div>

	<!-- WWII Section -->
	<div class="relative bg-gradient-to-br from-stone-800 to-stone-900 py-24 text-white md:py-32">
		<div class="mx-auto max-w-6xl px-4">
			<div class="grid items-center gap-12 md:grid-cols-2">
				<div>
					<span class="text-sm font-medium tracking-widest text-amber-400 uppercase"
						>World War II</span
					>
					<h2 class="mt-4 mb-6 font-serif text-3xl md:text-5xl">A Crucial Chapter in Liberation</h2>
					<p class="mb-6 leading-relaxed text-stone-400">
						Following General Douglas MacArthur's iconic landing on Red Beach in Palo on October 20,
						1944, Tanauan became a crucial strategic site. The US Sixth Army established its
						headquarters here, and a vital airfield was constructed.
					</p>
					<p class="mb-6 leading-relaxed text-stone-400">
						Mayor Pedro A. Villegas and his Secretary Janario Perez refused to serve Japanese
						forces, joining the guerrilla resistance—a testament to the unwavering spirit of
						Tanauananons.
					</p>
					<div class="flex gap-4">
						<div class="rounded-xl bg-amber-500/20 p-4 text-center">
							<span class="block text-2xl font-bold text-amber-400">1944</span>
							<span class="text-sm text-stone-500">Liberation</span>
						</div>
						<div class="rounded-xl bg-amber-500/20 p-4 text-center">
							<span class="block text-2xl font-bold text-amber-400">312th</span>
							<span class="text-sm text-stone-500">Bombardment Group</span>
						</div>
					</div>
				</div>

				<div class="relative">
					<div class="aspect-[4/3] overflow-hidden rounded-2xl bg-stone-700/50">
						<!-- Placeholder for WWII historical image -->
						<div class="absolute inset-0 flex items-center justify-center text-stone-500">
							<img
								src="/Tourism/Cultural Heritage/images-2.webp"
								alt="WW2 Historical Image"
								class="h-full w-full object-contain"
							/>
						</div>
					</div>
					<div class="absolute -bottom-6 -left-6 rounded-xl bg-amber-600 p-4 shadow-xl">
						<p class="font-serif text-white italic">"The Return"</p>
						<p class="text-sm text-amber-100">October 20, 1944</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Resilience Section -->
	<div class="bg-gradient-to-br from-amber-50 to-white py-24 md:py-32">
		<div class="mx-auto max-w-6xl px-4 text-center">
			<span class="text-sm font-medium tracking-widest text-amber-600 uppercase">Resilience</span>
			<h2 class="mt-4 mb-6 font-serif text-3xl text-stone-800 md:text-5xl">
				Rising After Every Storm
			</h2>

			<div class="mx-auto max-w-3xl">
				<p class="mb-8 text-lg leading-relaxed text-stone-600">
					From the tidal wave of 1897 that the historic church withstood, to the devastating Typhoon
					Yolanda (Haiyan) in November 2013, Tanauan has repeatedly demonstrated its capacity for
					recovery and rebuilding.
				</p>

				<div class="rounded-3xl border border-amber-100 bg-white p-8 shadow-xl md:p-12">
					<blockquote class="mb-4 font-serif text-2xl text-stone-700 italic md:text-3xl">
						"The spirit of the Tanauananon cannot be broken—only strengthened."
					</blockquote>
					<p class="text-stone-500">— A testament to resilience</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.min-w-screen {
		min-width: 100vw;
	}

	/* Custom scrollbar for the section */
	.history-container {
		scroll-behavior: smooth;
	}

	/* Responsive timeline adjustments */
	@media (max-width: 768px) {
		.timeline-event {
			padding-left: 2rem;
		}

		.timeline-line {
			left: 1rem;
		}
	}
</style>
