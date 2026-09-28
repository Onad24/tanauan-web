<script>
	import { onMount } from 'svelte';

	const officials = {
		mayor: {
			name: 'Hon. Merilo Gina',
			role: 'Municipal Mayor',
			img: '/Elected Officials/1.webp',
			tagline: 'Leading with integrity, vision, and a heart for every Tanauanon.',
			achievements: [
				'Implemented major infrastructure projects in 2024–2025, modernizing public roads and facilities.',
				'Recognized for outstanding fiscal management and clean governance audits.',
				'Introduced comprehensive eco-friendly, green energy, and waste management programs in local communities.'
			]
		},
		viceMayor: {
			name: 'Hon. Kapunan Archie',
			role: 'Municipal Vice Mayor',
			img: '/Elected Officials/2.webp',
			tagline: 'Fostering transparency, progress, and inclusive legislation.',
			achievements: [
				'Promoted transparency and open-door policies in local legislative council.',
				'Led dynamic youth engagement and SK development initiatives.',
				'Supported essential educational scholarship and livelihood training programs.'
			]
		},
		councilors: [
			{
				name: 'Hon. Jan Elmer Magdalaga',
				role: 'Municipal Councilor',
				img: '/Elected Officials/3.webp',
				committee: 'Infrastructure, Zoning & Personnel',
				achievements: [
					'Chairman, Committee on Infrastructure, Engineering and Public Works',
					'Chairman, Committee on Municipal Zoning, Planning, Land use and Development',
					'Chairman, Committee on Personnel and Human Resource Development'
				]
			},
			{
				name: 'Hon. Mark Christian Ferdinand Gimenez',
				role: 'Municipal Councilor',
				img: '/Elected Officials/4.webp',
				committee: 'Public Safety, Ways & Means, & Climate Change',
				achievements: [
					'Chairman, Committee on Police, Fire, Penology, Public Safety and Human Rights',
					'Chairman, Committee on Ways and Means',
					'Chairman, Committee on Climate Change and Disaster Risk Reduction and Management'
				]
			},
			{
				name: 'Hon. Mae Jane Morabe-Borais',
				role: 'Municipal Councilor',
				img: '/Elected Officials/5.webp',
				committee: 'Agriculture, Environment, Housing & Animal Welfare',
				achievements: [
					'Chairman, Committee on Agriculture, Rural Development, and Agrarian Relations',
					'Chairman, Committee on Natural Resources, Environment Protection and Rehabilitation',
					'Chairman, Committee on Housing and Resettlement',
					'Chairman, Committee on Animal Welfare'
				]
			},
			{
				name: 'Hon. Cherry Anne Fiel',
				role: 'Municipal Councilor',
				img: '/Elected Officials/6.webp',
				committee: 'Laws, Education, Women & Family, & Senior Citizens',
				achievements: [
					'Chairman, Committee on Laws, Ordinances, Public Accountability and Good Government',
					'Chairman, Committee on Education, Arts, Culture, Science and Technology',
					'Chairman, Committee on Women, Family, Gender Equity and Social Services',
					'Chairman, Committee on Senior Citizens'
				]
			},
			{
				name: 'Hon. Mark Efren Merilo',
				role: 'Municipal Councilor',
				img: '/Elected Officials/8.webp',
				committee: 'Energy, Market, Local Relations & Anti-Drugs',
				achievements: [
					'Chairman, Committee on Energy, Transportation, Communication and other utilities and Franchising',
					'Chairman, Committee on Market and Slaughterhouse',
					'Chairman, Committee on Local and International Relations',
					'Chairman, Committee on Dangerous Drugs'
				]
			},
			{
				name: 'Hon. Quintin Octa Jr.',
				role: 'Municipal Councilor',
				img: '/Elected Officials/9.webp',
				committee: 'Finance, Budget, Health & Sanitation',
				achievements: [
					'Chairman, Committee on Finance, Budget and Appropriation',
					'Chairman, Committee on Health, Hospital Services and Sanitation'
				]
			},
			{
				name: 'Hon. Josie Creer',
				role: 'Municipal Councilor',
				img: '/Elected Officials/10.webp',
				committee: 'Tourism, Economic Enterprise & Patrimonial Properties',
				achievements: [
					'Chairman, Committee on Tourism, Arts and Culture, Historical Affairs and Street and Government Structure Naming',
					'Chairman, Committee on Economic Enterprise',
					'Chairman, Committee on Patrimonial Properties'
				]
			},
			{
				name: 'Hon. Lauro Villero',
				role: 'Municipal Councilor',
				img: '/Elected Officials/11.webp',
				committee: 'Games, Licensing, Cooperatives & Labor',
				achievements: [
					'Chairman, Committee on Games and Amusement and Licensing',
					'Chairman, Committee on Cooperatives, Entrepreneurship, Organization, Civic Organization, non-Government Organization and Livelihood Development',
					'Chairman, Committee on Labor, Employment and Public Service'
				]
			},
			{
				name: 'Hon. Efren Merilo',
				role: 'ABC President',
				img: '/Elected Officials/12.webp',
				committee: 'Barangay Affairs',
				achievements: [
					'Chairman, Committee on Barangay Affairs',
					'Strengthening coordination between the municipal government and all 54 barangays'
				]
			},
			{
				name: 'Hon. Kyle Mesias',
				role: 'SK Federation President',
				img: '/Elected Officials/13.webp',
				committee: 'Youth, Sports & Development',
				achievements: [
					'Chairman, Committee on Youth, Sports and Development',
					'Empowering youth-led sports, digital literacy, and civic engagement projects'
				]
			}
		]
	};

	let scrollY = $state(0);
	let innerHeight = $state(0);
	let innerWidth = $state(0);
	let trackWidth = $state(0);

	let pages = [
		{ type: 'cover' },
		{
			type: 'category',
			branch: 'Executive',
			title: 'The Executive Branch',
			subtitle: 'Office of the Mayor • Local Chief Executive',
			desc: 'Mandated under Republic Act 7160 to enforce all laws and municipal ordinances, execute the municipal budget, and direct the delivery of basic services to all 54 barangays.'
		},
		{ type: 'official', data: officials.mayor, indexStr: '01', branch: 'Executive' },
		{
			type: 'category',
			branch: 'Legislative',
			title: 'The Legislative Branch',
			subtitle: 'Sangguniang Bayan • Presiding Officer & Councilors',
			desc: 'The official policy-making body of the Municipality of Tanauan, headed by the Municipal Vice Mayor and composed of regular and ex-officio councilors.'
		},
		{ type: 'official', data: officials.viceMayor, indexStr: '02', branch: 'Legislative' },
		...officials.councilors.map((c, i) => ({
			type: 'official',
			data: c,
			indexStr: String(i + 3).padStart(2, '0'),
			branch: 'Legislative'
		})),
		{ type: 'outro' }
	];

	// For an ultra-smooth experience, we map 1 viewport height of scrolling to 1 screen width of horizontal movement.
	let maxScroll = $derived(Math.max(0, pages.length * innerHeight - innerHeight));
	let maxTranslate = $derived(Math.max(0, trackWidth - innerWidth));

	let progress = $derived(maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0);
	let translateX = $derived(progress * maxTranslate);

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function scrollToPage(pageIndex) {
		const targetScroll = (pageIndex / Math.max(1, pages.length - 1)) * maxScroll;
		window.scrollTo({ top: targetScroll, behavior: 'smooth' });
	}

	// Intersection Observer Action for Scroll Reveal Animations
	function inview(node) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						node.classList.add('is-inview');
					} else {
						// Remove class when off-screen to replay animation on re-entry
						node.classList.remove('is-inview');
					}
				});
			},
			{
				root: null,
				threshold: 0.2 // Triggers when 20% of the section enters the screen
			}
		);

		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<svelte:head>
	<title>Elected Officials | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Meet the elected officials of the Municipality of Tanauan, Leyte — dedicated public servants shaping a legacy of service, transparency, and progress."
	/>
</svelte:head>

<svelte:window bind:scrollY bind:innerHeight bind:innerWidth />

<!-- The extremely tall scroll container that powers the horizontal scroll -->
<div style="height: {pages.length * 100}vh;" class="relative w-full bg-slate-900 font-sans">
	<!-- The sticky viewport that locks perfectly to the top of the screen -->
	<div class="sticky top-0 h-[100dvh] w-full overflow-hidden bg-slate-50">
		<!-- Global Golden Progress Bar -->
		<div
			class="absolute top-0 left-0 z-50 h-1.5 bg-amber-400 shadow-[0_0_15px_rgba(252,209,22,0.8)] transition-all duration-75"
			style="width: {progress * 100}%"
		></div>



		<!-- The horizontal flex track moving left as you scroll down -->
		<div
			class="flex h-full ease-out will-change-transform"
			style="transform: translate3d(-{translateX}px, 0, 0); width: max-content;"
			bind:clientWidth={trackWidth}
		>
			{#each pages as page, i}
				<!-- Visual gap between adjacent officials (Sangguniang Bayan members) -->
				{#if i > 0 && pages[i - 1].type === 'official' && page.type === 'official'}
					<div
						class="relative z-20 flex h-full w-12 shrink-0 items-center justify-center overflow-hidden border-x border-slate-900 bg-[#01050e] shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] md:w-24"
					>
						<!-- Subtle texture and glowing line for premium feel -->
						<div
							class="absolute inset-0 bg-[url('/Tourism/municipyo-1.jpg')] bg-cover bg-center opacity-[0.05]"
						></div>
						<div
							class="h-1/3 w-[1px] bg-gradient-to-b from-transparent via-amber-400/30 to-transparent"
						></div>
					</div>
				{/if}

				<!-- ===================== COVER SECTION ===================== -->
				{#if page.type === 'cover'}
					<section
						use:inview
						style="width: {innerWidth}px;"
						class="relative flex h-full shrink-0 items-center justify-center overflow-hidden border-r border-slate-800 bg-slate-900"
					>
						<img
							src="/Tourism/municipyo-1.jpg"
							alt="Municipyo"
							class="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 transition-transform duration-[3s] ease-out [.is-inview_&]:scale-100"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/80"
						></div>

						<div class="relative z-10 w-full max-w-5xl px-8">
							<div
								class="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end"
							>
								<div class="flex-1">
									<div
										class="mb-8 flex -translate-x-12 items-center gap-3 opacity-0 transition-all delay-300 duration-1000 ease-out [.is-inview_&]:translate-x-0 [.is-inview_&]:opacity-100"
									>
										<div class="flex h-[2px] w-12 overflow-hidden rounded-full shadow-sm">
											<div class="w-1/3 bg-[#0038a8]"></div>
											<div class="w-1/3 bg-[#fcd116]"></div>
											<div class="w-1/3 bg-[#ce1126]"></div>
										</div>
										<span
											class="font-heading text-xs font-bold tracking-[0.3em] text-amber-400 uppercase"
											>Republic of the Philippines</span
										>
									</div>

									<h1
										class="font-heading mb-8 translate-y-16 text-5xl leading-[0.9] font-black tracking-tight text-white uppercase opacity-0 transition-all delay-500 duration-1000 ease-out sm:text-7xl lg:text-[6rem] [.is-inview_&]:translate-y-0 [.is-inview_&]:opacity-100"
									>
										Elected <br /><span
											class="text-[#0038a8] drop-shadow-[0_0_15px_rgba(0,56,168,0.5)]"
											>Officials</span
										>
									</h1>

									<p
										class="font-fancy max-w-2xl translate-y-8 border-l-2 border-slate-700 pl-5 text-lg leading-relaxed font-light text-slate-300 italic opacity-0 transition-all delay-[700ms] duration-1000 ease-out sm:pl-6 sm:text-2xl [.is-inview_&]:translate-y-0 [.is-inview_&]:opacity-100"
									>
										"Dedicated public servants shaping a legacy of service, transparency, and
										progressive governance for every Tanauanon."
									</p>

								</div>

								<!-- Scroll Indicator -->
								<div
									class="flex shrink-0 flex-col items-center gap-4 pb-4 opacity-0 transition-opacity delay-1000 duration-1000 [.is-inview_&]:opacity-100"
								>
									<div
										class="h-24 w-[1px] bg-gradient-to-b from-transparent via-amber-400 to-amber-400"
									></div>
									<span
										class="rotate-180 text-[10px] font-bold tracking-[0.3em] text-amber-400 uppercase [writing-mode:vertical-rl]"
										>Scroll to Explore</span
									>
								</div>
							</div>
						</div>
					</section>

					<!-- ===================== CATEGORY INTRO SECTION ===================== -->
				{:else if page.type === 'category'}
					<section
						use:inview
						style="width: {innerWidth}px;"
						class="group relative flex h-full shrink-0 items-center justify-center overflow-hidden border-r border-slate-900 bg-[#020b1e]"
					>
						<!-- Subtle background layer -->
						<img
							src="/Tourism/municipyo-1.jpg"
							alt="Municipyo"
							class="absolute inset-0 h-full w-full scale-125 object-cover opacity-10 transition-transform duration-[3s] ease-out [.is-inview_&]:scale-105"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-[#01050e] via-transparent to-[#01050e]"
						></div>

						<!-- Typography -->
						<div class="relative z-10 w-full max-w-4xl px-8 text-center">
							<div
								class="mb-8 flex -translate-y-8 items-center justify-center gap-6 opacity-0 transition-all delay-300 duration-1000 ease-out [.is-inview_&]:translate-y-0 [.is-inview_&]:opacity-100"
							>
								<div class="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-400/50"></div>
								<span
									class="font-heading text-[10px] font-bold tracking-[0.4em] text-amber-400 uppercase sm:text-xs"
								>
									{page.subtitle}
								</span>
								<div class="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-400/50"></div>
							</div>

							<h2
								class="font-heading scale-95 text-4xl leading-[1.1] font-black text-white uppercase opacity-0 drop-shadow-2xl transition-all delay-500 duration-1000 ease-out sm:text-6xl md:text-7xl lg:text-8xl [.is-inview_&]:scale-100 [.is-inview_&]:opacity-100"
							>
								{page.title}
							</h2>

							{#if page.desc}
								<p
									class="mt-6 max-w-2xl mx-auto text-sm leading-relaxed text-slate-300 font-light opacity-0 transition-all delay-700 duration-1000 ease-out [.is-inview_&]:opacity-100 sm:text-base"
								>
									{page.desc}
								</p>
							{/if}
						</div>
					</section>

					<!-- ===================== OFFICIAL SECTION ===================== -->
				{:else if page.type === 'official'}
					<section
						use:inview
						style="width: {innerWidth}px;"
						class="group relative flex h-full shrink-0 flex-col overflow-hidden bg-white md:flex-row"
					>
						<!-- Massive typography watermark in background -->
						<div
							class="font-heading pointer-events-none absolute -right-10 -bottom-10 z-0 translate-x-32 text-[14rem] leading-none font-black text-slate-50 opacity-0 transition-all duration-[1.5s] ease-out select-none md:text-[20rem] lg:text-[30rem] [.is-inview_&]:translate-x-0 [.is-inview_&]:opacity-100"
						>
							{page.indexStr}
						</div>

						<!-- LEFT: Portrait Photography (45% height on mobile, 45% width on md) -->
						<div
							class="relative z-10 h-[45%] w-full shrink-0 overflow-hidden border-b border-slate-200 bg-slate-100 shadow-[10px_0_30px_rgba(0,0,0,0.05)] md:h-[100dvh] md:w-[45%] md:border-r md:border-b-0"
						>
							<!-- Image scale reveal -->
							<img
								src={page.data.img}
								alt={page.data.name}
								class="h-full w-full scale-[1.15] object-cover object-top contrast-125 grayscale-[20%] transition-transform duration-[2s] ease-out [.is-inview_&]:scale-100"
								loading="lazy"
							/>

							<!-- Elegant dark gradient overlay at bottom of photo -->
							<div
								class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent md:h-48"
							></div>

							<!-- Quick info pinned to photo -->
							<div
								class="absolute bottom-6 left-6 translate-y-12 pr-6 opacity-0 transition-all delay-500 duration-1000 ease-out sm:left-12 md:bottom-10 md:pr-8 [.is-inview_&]:translate-y-0 [.is-inview_&]:opacity-100"
							>
								<span
									class="font-heading mb-2 inline-block rounded-sm border border-amber-400/30 bg-amber-400/20 px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-amber-300 uppercase backdrop-blur-md md:mb-3 md:text-[10px]"
								>
									{page.data.role}
								</span>
								<h2
									class="font-fancy text-2xl leading-tight font-bold text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
								>
									{page.data.name}
								</h2>
							</div>
						</div>

						<!-- RIGHT: Information & Details (55% height on mobile, 55% width on md) -->
						<div
							class="custom-scrollbar relative z-10 flex h-[55%] w-full flex-col justify-center overflow-y-auto bg-transparent p-6 sm:p-12 md:h-[100dvh] md:w-[55%] lg:p-24"
						>
							<div class="max-w-2xl pt-2 md:pt-0">
								<!-- Committee Badge for Councilors -->
								{#if page.data.committee}
									<div
										class="mb-6 inline-flex -translate-y-4 items-center gap-3 text-[#0038a8] opacity-0 transition-all delay-[600ms] duration-700 ease-out md:mb-10 [.is-inview_&]:translate-y-0 [.is-inview_&]:opacity-100"
									>
										<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
											/></svg
										>
										<span class="font-heading text-xs font-bold tracking-[0.25em] uppercase"
											>{page.data.committee}</span
										>
									</div>
								{/if}

								<!-- Personal Quote / Tagline -->
								{#if page.data.tagline}
									<blockquote
										class="relative mb-8 translate-y-8 opacity-0 transition-all delay-[700ms] duration-1000 ease-out md:mb-12 [.is-inview_&]:translate-y-0 [.is-inview_&]:opacity-100"
									>
										<span
											class="pointer-events-none absolute -top-3 -left-4 font-serif text-5xl text-slate-200 md:-top-4 md:-left-6 md:text-6xl"
											>"</span
										>
										<p
											class="font-fancy relative z-10 text-xl leading-relaxed font-light text-slate-800 italic sm:text-2xl lg:text-3xl"
										>
											{page.data.tagline}
										</p>
									</blockquote>
								{/if}

								<!-- Key Initiatives List -->
								<div
									class="opacity-0 transition-opacity delay-[900ms] duration-1000 [.is-inview_&]:opacity-100"
								>
									<h4
										class="font-heading mb-6 flex items-center gap-4 text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase md:mb-8 md:text-xs"
									>
										<div class="h-[1px] w-8 bg-slate-300 md:w-12"></div>
										Key Initiatives
									</h4>
									<div class="space-y-4 md:space-y-6">
										{#each page.data.achievements as achievement, idx}
											<div
												class="flex translate-x-8 items-start gap-4 opacity-0 transition-all duration-700 ease-out md:gap-5 [.is-inview_&]:translate-x-0 [.is-inview_&]:opacity-100"
												style="transition-delay: {1000 + idx * 150}ms;"
											>
												<span
													class="font-heading flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[9px] font-bold text-slate-400 md:h-8 md:w-8 md:text-[10px]"
												>
													0{idx + 1}
												</span>
												<p
													class="font-fancy pt-0.5 text-base leading-relaxed text-slate-600 md:text-lg"
												>
													{achievement}
												</p>
											</div>
										{/each}
									</div>
								</div>
							</div>
						</div>
					</section>

					<!-- ===================== OUTRO SECTION ===================== -->
				{:else if page.type === 'outro'}
					<section
						use:inview
						style="width: {innerWidth}px;"
						class="relative flex h-full shrink-0 items-center justify-center border-l border-slate-800 bg-slate-900 text-white"
					>
						<div class="px-8 text-center">
							<svg
								class="mx-auto mb-8 h-20 w-20 scale-50 text-[#0038a8] opacity-0 transition-all delay-300 duration-1000 ease-out [.is-inview_&]:scale-100 [.is-inview_&]:opacity-80"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.944 2c-3.077 1.183-4.944 3.388-5.654 6h5.71v9.725h-11v-6zm-13 0c0-5.141 3.892-10.519 10-11.725l.944 2c-3.077 1.183-4.944 3.388-5.654 6h5.71v9.725h-11v-6z"
								/>
							</svg>

							<h2
								class="font-heading mb-6 translate-y-8 text-4xl font-bold tracking-wider uppercase opacity-0 drop-shadow-md transition-all delay-500 duration-1000 ease-out sm:text-5xl [.is-inview_&]:translate-y-0 [.is-inview_&]:opacity-100"
							>
								End of Chapter
							</h2>

							<p
								class="font-fancy mx-auto mb-12 max-w-xl translate-y-8 text-xl leading-relaxed text-slate-300 italic opacity-0 transition-all delay-[700ms] duration-1000 ease-out sm:text-2xl [.is-inview_&]:translate-y-0 [.is-inview_&]:opacity-100"
							>
								"Leadership is not a position or a title, it is action and example. Together, we
								move Tanauan forward."
							</p>

							<div
								class="opacity-0 transition-opacity delay-1000 duration-1000 [.is-inview_&]:opacity-100"
							>
								<button
									onclick={scrollToTop}
									class="group font-heading inline-flex items-center gap-4 rounded-sm border border-amber-400/50 bg-transparent px-8 py-4 text-xs font-bold tracking-[0.2em] text-amber-400 uppercase transition-all duration-300 hover:bg-amber-400 hover:text-slate-900"
								>
									<svg
										class="h-5 w-5 transition-transform group-hover:-translate-y-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 10l7-7m0 0l7 7m-7-7v18"
										/></svg
									>
									Return to Beginning
								</button>
							</div>
						</div>
					</section>
				{/if}
			{/each}
		</div>
	</div>
</div>
