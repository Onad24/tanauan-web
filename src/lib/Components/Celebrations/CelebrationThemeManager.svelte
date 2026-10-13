<script>
	import { onMount } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';

	/**
	 * Available celebration themes configuration
	 */
	export const CELEBRATION_THEMES = [
		{
			id: 'halloween',
			name: 'Halloween & Undas',
			season: 'October – November',
			icon: '🎃',
			secondaryIcon: '🦇',
			badge: 'Spooky Season Edition',
			title: '🎃 Special Celebration: Halloween & Undas 2026',
			greeting:
				'Greetings from the Office of the Municipal Mayor! Wishing every Tanauananon family a peaceful, safe, and blessed All Saints’ and All Souls’ Day season.',
			colors: {
				primary: '#ea580c', // Pumpkin orange
				secondary: '#7e22ce', // Spooky purple
				accent: '#f59e0b', // Candle amber
				glow: 'rgba(234, 88, 12, 0.35)'
			},
			colorDots: ['#ea580c', '#7e22ce', '#1e1b4b']
		},
		{
			id: 'christmas',
			name: 'Paskuhan sa Tanauan',
			season: 'December – January',
			icon: '🎄',
			secondaryIcon: '⭐',
			badge: 'Christmas Season Edition',
			title: '🎄 Paskuhan sa Tanauan 2026',
			greeting:
				'Maligayang Pasko at Manigong Bagong Taon! May this holiday season bring peace, unity, warmth, and continuous progress to every Tanauananon household.',
			colors: {
				primary: '#dc2626', // Holiday red
				secondary: '#15803d', // Pine green
				accent: '#eab308', // Star gold
				glow: 'rgba(220, 38, 38, 0.35)'
			},
			colorDots: ['#dc2626', '#15803d', '#eab308']
		},
		{
			id: 'fiesta',
			name: 'Pasaka Festival & Fiesta',
			season: 'August – Fiesta Season',
			icon: '🎉',
			secondaryIcon: '🥁',
			badge: 'Pasaka Festival Edition',
			title: '🎉 Viva Señor Santo Niño! Pasaka Festival Celebration',
			greeting:
				'Celebrating faith, vibrant cultural heritage, and our people’s enduring resilience! Warmest fiesta greetings from the Office of the Municipal Mayor.',
			colors: {
				primary: '#2563eb', // Festival royal blue
				secondary: '#f59e0b', // Fiesta gold
				accent: '#ef4444', // Fiesta crimson
				glow: 'rgba(37, 99, 235, 0.35)'
			},
			colorDots: ['#2563eb', '#f59e0b', '#ef4444']
		},
		{
			id: 'foundation',
			name: 'Araw ng Tanauan',
			season: 'Municipal Foundation Day',
			icon: '🏅',
			secondaryIcon: '✨',
			badge: 'Foundation Celebration',
			title: '🏅 Happy Araw ng Tanauan!',
			greeting:
				'Honoring the rich heritage, strength, and visionary future of our beloved Municipality. Proud of 54 thriving barangays moving forward together!',
			colors: {
				primary: '#059669', // Civic emerald
				secondary: '#d97706', // Amber gold
				accent: '#0284c7', // Sky cyan
				glow: 'rgba(5, 150, 105, 0.35)'
			},
			colorDots: ['#059669', '#d97706', '#0284c7']
		},
		{
			id: 'default',
			name: 'Official Civic (Default)',
			season: 'Standard Municipal Palette',
			icon: '🏛️',
			secondaryIcon: '⚖️',
			badge: 'Official Executive Edition',
			title: 'Office of the Municipal Mayor',
			greeting:
				'Leading local government with integrity, accountability, and servant leadership for all citizens of Tanauan, Leyte.',
			colors: {
				primary: '#1e3a8a', // Tanauan Navy
				secondary: '#f59e0b', // Tanauan Amber
				accent: '#0f172a', // Deep slate
				glow: 'rgba(30, 58, 138, 0.25)'
			},
			colorDots: ['#1e3a8a', '#f59e0b', '#0f172a']
		}
	];

	let {
		currentTheme = $bindable('halloween'),
		officeCode = 'OMM',
		officeName = 'Office of the Municipal Mayor',
		children
	} = $props();

	let isModalOpen = $state(false);
	let showBanner = $state(true);
	let effectsEnabled = $state(true);

	const activeThemeObj = $derived(
		CELEBRATION_THEMES.find((t) => t.id === currentTheme) || CELEBRATION_THEMES[0]
	);

	onMount(() => {
		try {
			const savedTheme = localStorage.getItem('tanauan_celebration_theme');
			if (savedTheme && CELEBRATION_THEMES.some((t) => t.id === savedTheme)) {
				currentTheme = savedTheme;
			} else {
				// Default to halloween since Halloween is approaching
				currentTheme = 'halloween';
			}

			const savedEffects = localStorage.getItem('tanauan_celebration_effects');
			if (savedEffects !== null) {
				effectsEnabled = savedEffects === 'true';
			}

			const savedBanner = localStorage.getItem('tanauan_celebration_banner');
			if (savedBanner !== null) {
				showBanner = savedBanner === 'true';
			}
		} catch (e) {
			// localStorage fallback
		}
	});

	function setTheme(themeId) {
		currentTheme = themeId;
		try {
			localStorage.setItem('tanauan_celebration_theme', themeId);
		} catch (e) {}
	}

	function toggleEffects() {
		effectsEnabled = !effectsEnabled;
		try {
			localStorage.setItem('tanauan_celebration_effects', String(effectsEnabled));
		} catch (e) {}
	}

	function toggleBanner() {
		showBanner = !showBanner;
		try {
			localStorage.setItem('tanauan_celebration_banner', String(showBanner));
		} catch (e) {}
	}

	function openModal() {
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}

	function handleKeydown(e) {
		if (e.key === 'Escape' && isModalOpen) {
			closeModal();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="celebration-wrapper celebration-theme-{currentTheme} relative min-h-screen">
	<!-- Top Celebration Announcement Header Banner -->
	{#if showBanner && currentTheme !== 'default'}
		<aside
			class="celebration-top-banner relative z-20 border-b border-black/10 px-4 py-2.5 transition-colors duration-500"
			role="region"
			aria-label="Celebration Announcement"
		>
			<div class="container mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
				<div class="flex items-center gap-2.5">
					<span class="celebration-banner-icon animate-bounce text-lg" aria-hidden="true">
						{activeThemeObj.icon}
					</span>
					<div class="flex flex-wrap items-baseline gap-1.5">
						<span class="font-black uppercase tracking-wider text-amber-300">
							{activeThemeObj.badge} •
						</span>
						<span class="font-medium text-white/95">
							{activeThemeObj.greeting}
						</span>
					</div>
				</div>

				<div class="flex items-center gap-2 text-xs">
					<button
						type="button"
						onclick={openModal}
						class="celebration-banner-btn inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
					>
						<span>Change Celebration Theme</span>
						<span class="text-xs">▾</span>
					</button>

					<button
						type="button"
						onclick={toggleBanner}
						class="rounded-full p-1 text-white/70 hover:bg-white/10 hover:text-white"
						title="Dismiss banner"
						aria-label="Dismiss banner"
					>
						<svg class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>
		</aside>
	{/if}

	<!-- Celebration Floating Particles & Corner Decorations Layer -->
	{#if effectsEnabled}
		<div class="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
			{#if currentTheme === 'halloween'}
				<!-- 1. SPIDER WEBS & DANGLING SPIDER -->
				<!-- Top-Left Spider Web -->
				<div class="spider-web-corner top-0 left-0">
					<svg class="h-44 w-44 text-orange-400/35 drop-shadow-md sm:h-56 sm:w-56" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2">
						<path d="M0,0 L100,0 C70,10 40,40 30,100 L0,100 Z" stroke-width="0.8" opacity="0.4" />
						<!-- Radial threads -->
						<line x1="0" y1="0" x2="100" y2="0" />
						<line x1="0" y1="0" x2="92" y2="38" />
						<line x1="0" y1="0" x2="70" y2="70" />
						<line x1="0" y1="0" x2="38" y2="92" />
						<line x1="0" y1="0" x2="0" y2="100" />
						<!-- Concentric web arcs -->
						<path d="M20,0 Q18,8 14,14 Q8,18 0,20" />
						<path d="M40,0 Q36,16 28,28 Q16,36 0,40" />
						<path d="M60,0 Q54,24 42,42 Q24,54 0,60" />
						<path d="M80,0 Q72,32 56,56 Q32,72 0,80" />
						<path d="M100,0 Q90,40 70,70 Q40,90 0,100" />
					</svg>

					<!-- Dangling Spider on a silk thread -->
					<div class="hanging-spider">
						<div class="spider-thread"></div>
						<div class="spider-icon">
							<svg viewBox="0 0 32 32" class="h-7 w-7 text-slate-900 drop-shadow-md">
								<!-- Spider abdomen & head -->
								<ellipse cx="16" cy="18" rx="6" ry="8" fill="#1e1b4b" stroke="#ea580c" stroke-width="0.8" />
								<circle cx="16" cy="10" r="4" fill="#0f172a" stroke="#ea580c" stroke-width="0.8" />
								<!-- Glowing red eyes -->
								<circle cx="14.5" cy="9.5" r="1" fill="#ef4444" />
								<circle cx="17.5" cy="9.5" r="1" fill="#ef4444" />
								<!-- Spider legs -->
								<path d="M12,10 Q6,6 4,11 M12,12 Q5,12 3,16 M12,14 Q6,18 4,22 M12,16 Q7,22 6,26" fill="none" stroke="#ea580c" stroke-width="1.2" stroke-linecap="round" />
								<path d="M20,10 Q26,6 28,11 M20,12 Q27,12 29,16 M20,14 Q26,18 28,22 M20,16 Q25,22 26,26" fill="none" stroke="#ea580c" stroke-width="1.2" stroke-linecap="round" />
							</svg>
						</div>
					</div>
				</div>

				<!-- Top-Right Spider Web -->
				<div class="spider-web-corner top-0 right-0 -scale-x-100">
					<svg class="h-44 w-44 text-orange-400/35 drop-shadow-md sm:h-56 sm:w-56" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="1.2">
						<path d="M0,0 L100,0 C70,10 40,40 30,100 L0,100 Z" stroke-width="0.8" opacity="0.4" />
						<line x1="0" y1="0" x2="100" y2="0" />
						<line x1="0" y1="0" x2="92" y2="38" />
						<line x1="0" y1="0" x2="70" y2="70" />
						<line x1="0" y1="0" x2="38" y2="92" />
						<line x1="0" y1="0" x2="0" y2="100" />
						<path d="M20,0 Q18,8 14,14 Q8,18 0,20" />
						<path d="M40,0 Q36,16 28,28 Q16,36 0,40" />
						<path d="M60,0 Q54,24 42,42 Q24,54 0,60" />
						<path d="M80,0 Q72,32 56,56 Q32,72 0,80" />
						<path d="M100,0 Q90,40 70,70 Q40,90 0,100" />
					</svg>
				</div>

				<!-- 2. LUMINOUS FLOATING GHOST -->
				<div class="spooky-ghost-container">
					<div class="spooky-ghost">
						<svg viewBox="0 0 80 100" class="h-20 w-16 drop-shadow-[0_0_18px_rgba(255,255,255,0.85)] sm:h-28 sm:w-22">
							<defs>
								<linearGradient id="ghostGrad" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
									<stop offset="60%" stop-color="#f3e8ff" stop-opacity="0.85" />
									<stop offset="100%" stop-color="#c084fc" stop-opacity="0.75" />
								</linearGradient>
							</defs>
							<!-- Ghost Body with undulating hem -->
							<path
								d="M40,8 C22,8 10,24 10,48 C10,65 14,80 18,86 C22,82 26,86 30,82 C34,86 38,82 42,86 C46,82 50,86 54,82 C58,86 62,82 66,86 C70,80 74,65 74,48 C74,24 58,8 40,8 Z"
								fill="url(#ghostGrad)"
								stroke="#e9d5ff"
								stroke-width="1"
							/>
							<!-- Cute Ghost Eyes -->
							<ellipse cx="28" cy="38" rx="4" ry="5.5" fill="#1e1b4b" />
							<ellipse cx="48" cy="38" rx="4" ry="5.5" fill="#1e1b4b" />
							<!-- Eye glint reflections -->
							<circle cx="26.5" cy="36.5" r="1.5" fill="#ffffff" />
							<circle cx="46.5" cy="36.5" r="1.5" fill="#ffffff" />
							<!-- Cute smiling mouth -->
							<ellipse cx="38" cy="49" rx="3.5" ry="5" fill="#1e1b4b" />
							<!-- Rosy purple blush cheeks -->
							<circle cx="22" cy="44" r="3" fill="#f472b6" opacity="0.4" />
							<circle cx="54" cy="44" r="3" fill="#f472b6" opacity="0.4" />
							<!-- Little floating arms -->
							<path d="M12,46 Q4,48 8,56 Q12,54 14,50" fill="#ffffff" opacity="0.9" />
							<path d="M68,46 Q76,42 74,52 Q68,54 66,50" fill="#ffffff" opacity="0.9" />
						</svg>
						<span class="spooky-ghost-boo font-black tracking-widest text-[11px] text-purple-200">BOO! 👻</span>
					</div>
				</div>

				<!-- 3. ANIMATED WAVING SKELETON -->
				<div class="spooky-skeleton-container">
					<div class="spooky-skeleton">
						<svg viewBox="0 0 100 130" class="h-24 w-20 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)] sm:h-32 sm:w-26">
							<!-- Skull Head -->
							<ellipse cx="50" cy="32" rx="18" ry="16" fill="#f8fafc" stroke="#64748b" stroke-width="1.2" />
							<!-- Cheekbones & jaw -->
							<path d="M38,38 L38,46 Q50,50 62,46 L62,38" fill="#f8fafc" stroke="#64748b" stroke-width="1.2" />
							<!-- Glowing Eye Sockets -->
							<ellipse cx="43" cy="30" rx="5" ry="6" fill="#0f172a" />
							<ellipse cx="57" cy="30" rx="5" ry="6" fill="#0f172a" />
							<circle cx="43" cy="30" r="1.8" fill="#f59e0b" class="skeleton-pupil" />
							<circle cx="57" cy="30" r="1.8" fill="#f59e0b" class="skeleton-pupil" />
							<!-- Nose cavity -->
							<polygon points="50,36 48,40 52,40" fill="#0f172a" />
							<!-- Teeth -->
							<line x1="42" y1="44" x2="58" y2="44" stroke="#64748b" stroke-width="1.2" />
							<line x1="46" y1="41" x2="46" y2="47" stroke="#64748b" stroke-width="1" />
							<line x1="50" y1="41" x2="50" y2="47" stroke="#64748b" stroke-width="1" />
							<line x1="54" y1="41" x2="54" y2="47" stroke="#64748b" stroke-width="1" />
							<!-- Spine / Backbone -->
							<line x1="50" y1="48" x2="50" y2="90" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round" />
							<!-- Ribs -->
							<path d="M36,56 Q50,53 64,56" fill="none" stroke="#f1f5f9" stroke-width="3" stroke-linecap="round" />
							<path d="M34,65 Q50,62 66,65" fill="none" stroke="#f1f5f9" stroke-width="3" stroke-linecap="round" />
							<path d="M36,74 Q50,71 64,74" fill="none" stroke="#f1f5f9" stroke-width="3" stroke-linecap="round" />
							<!-- Pelvis / Hip -->
							<path d="M38,88 Q50,84 62,88 Q50,96 38,88 Z" fill="#e2e8f0" stroke="#64748b" stroke-width="1" />
							<!-- Left Arm resting -->
							<path d="M34,56 Q24,68 28,84" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />
							<!-- Right Waving Arm -->
							<g class="skeleton-arm-wave">
								<path d="M66,56 Q78,50 82,38 Q86,26 84,20" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />
								<!-- Hand bone waving -->
								<circle cx="84" cy="18" r="3" fill="#f8fafc" stroke="#64748b" stroke-width="0.8" />
								<line x1="84" y1="18" x2="88" y2="12" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" />
								<line x1="84" y1="18" x2="84" y2="10" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" />
								<line x1="84" y1="18" x2="80" y2="12" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" />
							</g>
						</svg>
						<span class="spooky-skeleton-tag font-mono text-[9px] font-black uppercase text-amber-300">🦴 SKELETON</span>
					</div>
				</div>

				<!-- 4. CARVED GLOWING JACK-O'-LANTERN PUMPKIN CLUSTER -->
				<div class="spooky-pumpkin-patch">
					<!-- Main Carved Jack-o'-Lantern Pumpkin -->
					<div class="spooky-pumpkin spooky-pumpkin-main">
						<svg viewBox="0 0 100 85" class="h-16 w-20 drop-shadow-[0_0_20px_rgba(249,115,22,0.65)] sm:h-22 sm:w-28">
							<defs>
								<linearGradient id="pumpkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stop-color="#fb923c" />
									<stop offset="50%" stop-color="#ea580c" />
									<stop offset="100%" stop-color="#c2410c" />
								</linearGradient>
								<radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
									<stop offset="0%" stop-color="#fef08a" />
									<stop offset="60%" stop-color="#f59e0b" />
									<stop offset="100%" stop-color="#ea580c" />
								</radialGradient>
							</defs>
							<!-- Stem & Leaf -->
							<path d="M48,15 Q50,4 58,2 Q57,8 54,15 Z" fill="#15803d" stroke="#14532d" stroke-width="1" />
							<path d="M53,10 Q62,8 65,13 Q58,15 53,10 Z" fill="#22c55e" opacity="0.8" />
							<!-- Pumpkin body lobes -->
							<ellipse cx="28" cy="48" rx="18" ry="26" fill="url(#pumpkinGrad)" stroke="#9a3412" stroke-width="0.8" />
							<ellipse cx="72" cy="48" rx="18" ry="26" fill="url(#pumpkinGrad)" stroke="#9a3412" stroke-width="0.8" />
							<ellipse cx="38" cy="48" rx="16" ry="28" fill="url(#pumpkinGrad)" stroke="#9a3412" stroke-width="0.8" />
							<ellipse cx="62" cy="48" rx="16" ry="28" fill="url(#pumpkinGrad)" stroke="#9a3412" stroke-width="0.8" />
							<ellipse cx="50" cy="48" rx="16" ry="30" fill="url(#pumpkinGrad)" stroke="#9a3412" stroke-width="0.8" />
							<!-- Carved Glowing Jack-o'-Lantern Eyes -->
							<polygon points="34,42 42,42 38,33" fill="url(#candleGlow)" class="pumpkin-candle" />
							<polygon points="58,42 66,42 62,33" fill="url(#candleGlow)" class="pumpkin-candle" />
							<!-- Carved Glowing Nose -->
							<polygon points="50,46 47,52 53,52" fill="url(#candleGlow)" class="pumpkin-candle" />
							<!-- Carved Jagged Toothy Grin -->
							<path
								d="M30,58 L36,62 L42,59 L46,64 L50,60 L54,64 L58,59 L64,62 L70,58 L66,66 L58,68 L54,65 L50,68 L46,65 L42,68 L34,66 Z"
								fill="url(#candleGlow)"
								class="pumpkin-candle"
							/>
						</svg>
					</div>

					<!-- Second Smaller Companion Pumpkin -->
					<div class="spooky-pumpkin spooky-pumpkin-mini">
						<svg viewBox="0 0 100 85" class="h-10 w-12 drop-shadow-[0_0_12px_rgba(249,115,22,0.5)] sm:h-14 sm:w-16">
							<!-- Stem -->
							<path d="M48,15 Q52,5 57,4 Q55,10 52,15 Z" fill="#15803d" />
							<!-- Body -->
							<ellipse cx="32" cy="48" rx="16" ry="24" fill="#f97316" />
							<ellipse cx="68" cy="48" rx="16" ry="24" fill="#f97316" />
							<ellipse cx="50" cy="48" rx="18" ry="28" fill="#ea580c" />
							<!-- Eyes & Smile -->
							<polygon points="36,44 42,44 39,36" fill="#fef08a" class="pumpkin-candle" />
							<polygon points="58,44 64,44 61,36" fill="#fef08a" class="pumpkin-candle" />
							<path d="M36,58 Q50,70 64,58 Q50,64 36,58 Z" fill="#fef08a" class="pumpkin-candle" />
						</svg>
					</div>
				</div>

				<!-- Animated Flying SVG Bats (Enhanced) -->
				<div class="bat bat-1">
					<svg viewBox="0 0 48 24" class="h-6 w-12 text-slate-900/60 drop-shadow-md">
						<path
							fill="currentColor"
							d="M24,10 C21,6 16,3 10,4 C5,5 2,9 0,13 C4,12 8,13 11,16 C14,14 17,14 20,16 C22,14 23,12 24,11 C25,12 26,14 28,16 C31,14 34,14 37,16 C40,13 44,12 48,13 C46,9 43,5 38,4 C32,3 27,6 24,10 Z"
						/>
					</svg>
				</div>
				<div class="bat bat-2">
					<svg viewBox="0 0 48 24" class="h-8 w-16 text-purple-950/70 drop-shadow-md">
						<path
							fill="currentColor"
							d="M24,10 C21,6 16,3 10,4 C5,5 2,9 0,13 C4,12 8,13 11,16 C14,14 17,14 20,16 C22,14 23,12 24,11 C25,12 26,14 28,16 C31,14 34,14 37,16 C40,13 44,12 48,13 C46,9 43,5 38,4 C32,3 27,6 24,10 Z"
						/>
					</svg>
				</div>
				<div class="bat bat-3">
					<svg viewBox="0 0 48 24" class="h-5 w-10 text-orange-950/60 drop-shadow-md">
						<path
							fill="currentColor"
							d="M24,10 C21,6 16,3 10,4 C5,5 2,9 0,13 C4,12 8,13 11,16 C14,14 17,14 20,16 C22,14 23,12 24,11 C25,12 26,14 28,16 C31,14 34,14 37,16 C40,13 44,12 48,13 C46,9 43,5 38,4 C32,3 27,6 24,10 Z"
						/>
					</svg>
				</div>
			{:else if currentTheme === 'christmas'}
				<!-- Drifting Snowflakes for Christmas -->
				<div class="snow snow-1">❄</div>
				<div class="snow snow-2">❅</div>
				<div class="snow snow-3">❄</div>
				<div class="snow snow-4">❆</div>
				<div class="snow snow-5">❄</div>
			{:else if currentTheme === 'fiesta'}
				<!-- Festive Confetti / Banderitas for Pasaka Festival -->
				<div class="confetti confetti-1">🎏</div>
				<div class="confetti confetti-2">✨</div>
				<div class="confetti confetti-3">🎊</div>
				<div class="confetti confetti-4">✨</div>
			{/if}
		</div>
	{/if}

	<!-- The Main Content (OfficeTemplate) -->
	<div class="celebration-content relative z-0">
		{@render children?.()}
	</div>

	<!-- Floating Celebration Theme Switcher FAB Button (Bottom Right) -->
	<aside class="fixed right-5 bottom-6 z-40 print:hidden" aria-label="Theme Switcher Controls">
		<button
			type="button"
			onclick={openModal}
			class="celebration-fab group flex items-center gap-2.5 rounded-full px-4 py-2.5 font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
			title="Choose Celebration Theme"
			aria-haspopup="dialog"
			aria-expanded={isModalOpen}
		>
			<span class="celebration-fab-icon text-xl transition-transform duration-300 group-hover:rotate-12">
				{activeThemeObj.icon}
			</span>
			<div class="flex flex-col text-left">
				<span class="text-[10px] font-black uppercase tracking-wider opacity-80">Celebration</span>
				<span class="text-xs font-extrabold whitespace-nowrap">{activeThemeObj.name}</span>
			</div>
			<span class="ml-1 rounded-full bg-white/20 p-1 text-[10px] transition-transform group-hover:translate-x-0.5">
				⚙️
			</span>
		</button>
	</aside>

	<!-- Interactive Celebration Theme Studio Modal -->
	{#if isModalOpen}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-all sm:p-6"
			role="dialog"
			aria-modal="true"
			aria-labelledby="theme-modal-title"
			tabindex="-1"
		>
			<!-- Backdrop -->
			<button
				type="button"
				class="absolute inset-0 bg-slate-950/60"
				onclick={closeModal}
				aria-label="Close theme selector modal backdrop"
			></button>

			<!-- Modal Card -->
			<div
				transition:scale={{ duration: 200, start: 0.95 }}
				class="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-white/95 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-8"
			>
				<!-- Modal Header -->
				<div class="flex items-start justify-between border-b border-slate-200 pb-5">
					<div>
						<div class="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-black text-amber-700">
							<span>✨ TANAUAN CELEBRATION STUDIO</span>
						</div>
						<h2 id="theme-modal-title" class="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
							Select Festive Theme
						</h2>
						<p class="mt-1 text-xs text-slate-600 sm:text-sm">
							Transform the Mayor's Office presentation according to ongoing municipal celebrations and holidays.
						</p>
					</div>

					<button
						type="button"
						onclick={closeModal}
						class="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
						aria-label="Close modal"
					>
						<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>

				<!-- Themes Grid -->
				<div class="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
					{#each CELEBRATION_THEMES as theme}
						{@const isSelected = currentTheme === theme.id}
						<button
							type="button"
							onclick={() => setTheme(theme.id)}
							class="group relative flex flex-col items-start rounded-2xl border-2 p-4 text-left transition-all duration-200 {isSelected
								? 'border-amber-500 bg-amber-500/5 shadow-md ring-2 ring-amber-500/20'
								: 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-50'}"
						>
							<!-- Active Badge -->
							{#if isSelected}
								<span class="absolute top-3 right-3 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-black tracking-wider text-white">
									ACTIVE
								</span>
							{/if}

							<div class="flex items-center gap-3">
								<span class="rounded-xl bg-white p-2 text-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
									{theme.icon}
								</span>
								<div>
									<h3 class="text-sm font-black text-slate-900 group-hover:text-blue-950">
										{theme.name}
									</h3>
									<span class="text-[11px] font-semibold text-slate-500">
										{theme.season}
									</span>
								</div>
							</div>

							<p class="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-2">
								{theme.greeting}
							</p>

							<!-- Color Palette Dots Preview -->
							<div class="mt-3.5 flex items-center justify-between w-full pt-2 border-t border-slate-200/60">
								<div class="flex items-center gap-1.5">
									{#each theme.colorDots as dot}
										<span class="h-3 w-3 rounded-full shadow-inner border border-white" style="background-color: {dot};"></span>
									{/each}
								</div>
								<span class="text-[11px] font-bold {isSelected ? 'text-amber-600 font-extrabold' : 'text-slate-400 group-hover:text-slate-600'}">
									{isSelected ? 'Selected ✓' : 'Apply Theme →'}
								</span>
							</div>
						</button>
					{/each}
				</div>

				<!-- Settings & Accessibility Toggles -->
				<div class="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
					<div class="flex flex-wrap items-center justify-between gap-3 text-xs">
						<label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
							<input
								type="checkbox"
								bind:checked={effectsEnabled}
								onchange={toggleEffects}
								class="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
							/>
							<span>Floating Festival Animations (Bats, Snow, Confetti)</span>
						</label>

						<label class="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
							<input
								type="checkbox"
								bind:checked={showBanner}
								onchange={toggleBanner}
								class="h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
							/>
							<span>Top Celebration Banner</span>
						</label>
					</div>
				</div>

				<!-- Modal Footer -->
				<div class="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
					<button
						type="button"
						onclick={() => setTheme('default')}
						class="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
					>
						↺ Reset to Official Civic Defaults
					</button>

					<button
						type="button"
						onclick={closeModal}
						class="rounded-xl bg-blue-950 px-5 py-2.5 text-xs font-black text-white shadow-md hover:bg-blue-900 active:scale-95 transition-all"
					>
						Done & Enjoy Celebration ✕
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	/* =========================================================================
	   CELEBRATION THEME STYLES (Tailored for Tanauan Municipality)
	   ========================================================================= */

	/* Floating Action Button (FAB) */
	.celebration-fab {
		background: linear-gradient(135deg, #1e3a8a, #0f172a);
		border: 2px solid rgba(255, 255, 255, 0.2);
	}

	/* --- HALLOWEEN & UNDAS THEME --- */
	.celebration-theme-halloween .celebration-top-banner {
		background: linear-gradient(90deg, #180e29 0%, #3b0764 40%, #1e1b4b 100%);
		border-bottom: 2px solid #ea580c;
		box-shadow: 0 4px 20px rgba(234, 88, 12, 0.25);
	}
	.celebration-theme-halloween .celebration-banner-btn {
		background: #ea580c;
		color: #ffffff;
	}
	.celebration-theme-halloween .celebration-banner-btn:hover {
		background: #f97316;
	}
	.celebration-theme-halloween .celebration-fab {
		background: linear-gradient(135deg, #ea580c 0%, #6b21a8 100%);
		border: 2px solid #f97316;
		box-shadow: 0 8px 30px rgba(234, 88, 12, 0.45);
	}

	/* Atmospheric Hero Overrides for Halloween */
	:global(.celebration-theme-halloween #overview) {
		background: linear-gradient(180deg, #fef3c7 0%, #ffedd5 30%, #f8fafc 100%) !important;
		border-bottom-color: #ea580c !important;
	}
	:global(.celebration-theme-halloween .bg-amber-500) {
		background-color: #ea580c !important;
	}
	:global(.celebration-theme-halloween .border-amber-400) {
		border-color: #ea580c !important;
	}
	:global(.celebration-theme-halloween .selection\:bg-amber-300) {
		background-color: #fdba74 !important;
		color: #431407 !important;
	}

	/* --- CHRISTMAS / PASKUHAN THEME --- */
	.celebration-theme-christmas .celebration-top-banner {
		background: linear-gradient(90deg, #7f1d1d 0%, #14532d 50%, #991b1b 100%);
		border-bottom: 2px solid #eab308;
		box-shadow: 0 4px 20px rgba(220, 38, 38, 0.25);
	}
	.celebration-theme-christmas .celebration-banner-btn {
		background: #eab308;
		color: #14532d;
	}
	.celebration-theme-christmas .celebration-fab {
		background: linear-gradient(135deg, #dc2626 0%, #15803d 100%);
		border: 2px solid #eab308;
		box-shadow: 0 8px 30px rgba(220, 38, 38, 0.45);
	}
	:global(.celebration-theme-christmas #overview) {
		background: linear-gradient(180deg, #ecfdf5 0%, #fee2e2 40%, #f8fafc 100%) !important;
		border-bottom-color: #dc2626 !important;
	}

	/* --- FIESTA / PASAKA THEME --- */
	.celebration-theme-fiesta .celebration-top-banner {
		background: linear-gradient(90deg, #1e3a8a 0%, #b45309 50%, #b91c1c 100%);
		border-bottom: 2px solid #f59e0b;
	}
	.celebration-theme-fiesta .celebration-banner-btn {
		background: #f59e0b;
		color: #1e3a8a;
	}
	.celebration-theme-fiesta .celebration-fab {
		background: linear-gradient(135deg, #2563eb 0%, #f59e0b 100%);
		border: 2px solid #fcd34d;
	}

	/* --- FOUNDATION DAY THEME --- */
	.celebration-theme-foundation .celebration-top-banner {
		background: linear-gradient(90deg, #064e3b 0%, #b45309 100%);
		border-bottom: 2px solid #34d399;
	}
	.celebration-theme-foundation .celebration-banner-btn {
		background: #34d399;
		color: #064e3b;
	}
	.celebration-theme-foundation .celebration-fab {
		background: linear-gradient(135deg, #059669 0%, #d97706 100%);
		border: 2px solid #34d399;
	}

	/* =========================================================================
	   ANIMATED PARTICLES & FESTIVE EFFECTS
	   ========================================================================= */

	/* 1. Spider Web & Hanging Spider */
	.spider-web-corner {
		position: absolute;
		pointer-events: none;
		z-index: 12;
		transition: opacity 0.5s ease;
	}
	.hanging-spider {
		position: absolute;
		top: 18px;
		left: 48px;
		display: flex;
		flex-direction: column;
		align-items: center;
		animation: spiderDrop 7s ease-in-out infinite;
		transform-origin: top center;
	}
	.spider-thread {
		width: 1.5px;
		height: 60px;
		background: linear-gradient(180deg, rgba(234, 88, 12, 0.6), rgba(30, 27, 75, 0.8));
	}
	.spider-icon {
		margin-top: -2px;
		animation: spiderWiggle 3.5s ease-in-out infinite;
	}
	@keyframes spiderDrop {
		0%, 100% {
			transform: translateY(0) rotate(0deg);
		}
		30% {
			transform: translateY(45px) rotate(8deg);
		}
		50% {
			transform: translateY(20px) rotate(-6deg);
		}
		75% {
			transform: translateY(60px) rotate(5deg);
		}
	}
	@keyframes spiderWiggle {
		0%, 100% { transform: rotate(0deg); }
		50% { transform: rotate(10deg); }
	}

	/* 2. Luminous Floating Ghost */
	.spooky-ghost-container {
		position: absolute;
		top: 16%;
		left: 8%;
		z-index: 12;
		pointer-events: none;
		animation: ghostDrift 16s ease-in-out infinite;
	}
	.spooky-ghost {
		display: flex;
		flex-direction: column;
		align-items: center;
		animation: ghostHover 4s ease-in-out infinite;
	}
	.spooky-ghost-boo {
		margin-top: 2px;
		padding: 2px 8px;
		border-radius: 9999px;
		background: rgba(88, 28, 135, 0.85);
		border: 1px solid rgba(192, 132, 252, 0.4);
		box-shadow: 0 0 10px rgba(192, 132, 252, 0.4);
		animation: booPulse 2s ease-in-out infinite alternate;
	}
	@keyframes ghostDrift {
		0% {
			transform: translate(0, 0) scale(0.95);
			opacity: 0.85;
		}
		40% {
			transform: translate(12vw, 5vh) scale(1.05);
			opacity: 0.95;
		}
		70% {
			transform: translate(4vw, -4vh) scale(1);
			opacity: 0.9;
		}
		100% {
			transform: translate(0, 0) scale(0.95);
			opacity: 0.85;
		}
	}
	@keyframes ghostHover {
		0%, 100% {
			transform: translateY(0) rotate(-2deg);
		}
		50% {
			transform: translateY(-14px) rotate(3deg);
		}
	}
	@keyframes booPulse {
		0% { transform: scale(0.95); opacity: 0.8; }
		100% { transform: scale(1.05); opacity: 1; }
	}

	/* 3. Animated Waving Skeleton */
	.spooky-skeleton-container {
		position: absolute;
		top: 32%;
		right: 3%;
		z-index: 12;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.spooky-skeleton {
		display: flex;
		flex-direction: column;
		align-items: center;
		animation: skeletonGroove 4.5s ease-in-out infinite;
	}
	.skeleton-arm-wave {
		transform-origin: 66px 56px;
		animation: skeletonWave 1.6s ease-in-out infinite alternate;
	}
	.skeleton-pupil {
		animation: eyeGlow 1.2s ease-in-out infinite alternate;
	}
	.spooky-skeleton-tag {
		margin-top: -6px;
		padding: 2px 6px;
		border-radius: 6px;
		background: rgba(15, 23, 42, 0.85);
		border: 1px solid rgba(245, 158, 11, 0.4);
		box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
	}
	@keyframes skeletonWave {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(-25deg); }
	}
	@keyframes skeletonGroove {
		0%, 100% {
			transform: translateY(0) rotate(0deg);
		}
		35% {
			transform: translateY(-8px) rotate(3deg);
		}
		70% {
			transform: translateY(-3px) rotate(-3deg);
		}
	}
	@keyframes eyeGlow {
		0% { opacity: 0.6; r: 1.5; }
		100% { opacity: 1; r: 2.2; }
	}

	/* 4. Carved Glowing Jack-o'-Lantern Pumpkins */
	.spooky-pumpkin-patch {
		position: absolute;
		bottom: 24px;
		left: 24px;
		z-index: 14;
		pointer-events: none;
		display: flex;
		align-items: flex-end;
		gap: -10px;
	}
	.spooky-pumpkin-main {
		animation: pumpkinFloat 4s ease-in-out infinite;
	}
	.spooky-pumpkin-mini {
		margin-left: -18px;
		margin-bottom: -4px;
		animation: pumpkinFloat 3.2s ease-in-out infinite 0.5s;
	}
	.pumpkin-candle {
		animation: pumpkinFlicker 1.8s ease-in-out infinite alternate;
	}
	@keyframes pumpkinFloat {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-6px);
		}
	}
	@keyframes pumpkinFlicker {
		0% {
			opacity: 0.85;
			filter: drop-shadow(0 0 4px #f59e0b);
		}
		50% {
			opacity: 1;
			filter: drop-shadow(0 0 14px #ea580c);
		}
		100% {
			opacity: 0.75;
			filter: drop-shadow(0 0 6px #fef08a);
		}
	}

	/* Floating Bats for Halloween */
	.bat {
		position: absolute;
		animation: batFloat 16s infinite ease-in-out;
		opacity: 0.55;
	}
	.bat-1 {
		top: 15%;
		left: -10%;
		animation-duration: 22s;
		animation-delay: 0s;
	}
	.bat-2 {
		top: 30%;
		left: -15%;
		animation-duration: 18s;
		animation-delay: 5s;
	}
	.bat-3 {
		top: 22%;
		left: -12%;
		animation-duration: 26s;
		animation-delay: 11s;
	}

	@keyframes batFloat {
		0% {
			transform: translate(-10vw, 0) scale(0.8) rotate(-4deg);
			opacity: 0;
		}
		15% {
			opacity: 0.65;
		}
		45% {
			transform: translate(45vw, 6vh) scale(1) rotate(6deg);
		}
		85% {
			opacity: 0.65;
		}
		100% {
			transform: translate(110vw, -4vh) scale(0.9) rotate(-3deg);
			opacity: 0;
		}
	}

	/* Snowflakes for Christmas */
	.snow {
		position: absolute;
		top: -5%;
		color: #93c5fd;
		opacity: 0.6;
		font-size: 1.5rem;
		animation: snowfall 10s infinite linear;
	}
	.snow-1 { left: 10%; animation-duration: 12s; animation-delay: 0s; }
	.snow-2 { left: 30%; animation-duration: 9s; animation-delay: 2s; font-size: 2rem; }
	.snow-3 { left: 55%; animation-duration: 14s; animation-delay: 4s; }
	.snow-4 { left: 75%; animation-duration: 11s; animation-delay: 1s; font-size: 1.8rem; }
	.snow-5 { left: 90%; animation-duration: 13s; animation-delay: 3s; }

	@keyframes snowfall {
		0% {
			transform: translateY(-5vh) rotate(0deg);
			opacity: 0;
		}
		20% {
			opacity: 0.7;
		}
		80% {
			opacity: 0.7;
		}
		100% {
			transform: translateY(105vh) rotate(360deg);
			opacity: 0;
		}
	}

	/* Confetti for Fiesta */
	.confetti {
		position: absolute;
		top: -5%;
		font-size: 1.4rem;
		opacity: 0.7;
		animation: confettiFall 8s infinite linear;
	}
	.confetti-1 { left: 15%; animation-duration: 7s; animation-delay: 0s; }
	.confetti-2 { left: 40%; animation-duration: 9s; animation-delay: 2s; }
	.confetti-3 { left: 65%; animation-duration: 8s; animation-delay: 1s; }
	.confetti-4 { left: 85%; animation-duration: 10s; animation-delay: 3s; }

	@keyframes confettiFall {
		0% {
			transform: translateY(-5vh) rotate(0deg);
			opacity: 0;
		}
		20% {
			opacity: 0.75;
		}
		80% {
			opacity: 0.75;
		}
		100% {
			transform: translateY(105vh) rotate(720deg);
			opacity: 0;
		}
	}
</style>
