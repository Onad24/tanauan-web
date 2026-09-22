<script>
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { derived, get } from 'svelte/store';
	import { slide } from 'svelte/transition';
	import GeminiChatbox from '$lib/GeminiChatbox.svelte';
	import { defaultNavDepartments } from '$lib/config';
	import { currentLang, languages, translations } from '$lib/i18n';
	import '../../app.css';

	export let data;

	const defaultVmOffices = [
		{
			name: 'Mission / Vision',
			href: '/Departments/Vice-Mayors-Office#mission-vision',
			visible: true
		},
		{ name: 'Staffing Pattern', href: '/Departments/Vice-Mayors-Office#staffing', visible: true },
		{ name: 'Services', href: '/Departments/Vice-Mayors-Office#services', visible: true },
		{
			name: 'Announcements / Other Info',
			href: '/Departments/Vice-Mayors-Office#announcements',
			visible: true
		}
	];

	const defaultSbOffices = [
		{
			name: 'Mission / Vision',
			href: '/Departments/Sangguniang-Bayan#mission-vision',
			visible: true
		},
		{
			name: 'Organizational Structure',
			href: '/Departments/Sangguniang-Bayan#org-chart',
			visible: true
		},
		{ name: "Citizen's Charter", href: '/citizens-charter', visible: true },
		{
			name: 'Approved Resolutions',
			href: '/Departments/Sangguniang-Bayan#resolutions',
			visible: true
		},
		{ name: 'Ordinances', href: '/Departments/Sangguniang-Bayan#ordinances', visible: true },
		{ name: 'Services Offered', href: '/Departments/Sangguniang-Bayan#services', visible: true },
		{
			name: 'Announcements / Other Info',
			href: '/Departments/Sangguniang-Bayan#announcements',
			visible: true
		}
	];

	$: navGroups = (data?.navGroups ?? defaultNavDepartments).flatMap((g) => {
		let group = { ...g };
		if (group.group === 'Special Bodies') {
			group.group = 'Tanauan Association of Municipal Employees (TAME)';
		}
		if (group.group === 'Other LGU Departments') {
			group.group = 'Other LGU Offices';
		}
		if (group.group === 'MLGOO' || group.group?.includes('MLGOO')) {
			group.category = 'national';
		}
		if (group.group === 'Office of the Vice Mayor' || group.group?.includes('Vice Mayor')) {
			group.offices = defaultVmOffices;
		}
		if (group.group === 'Office of the Sangguniang Bayan' || group.group === 'Sangguniang Bayan') {
			group.offices = defaultSbOffices;
		}
		return [group];
	});
	$: localOffices = navGroups.filter((g) => g.category !== 'national');
	$: nationalOffices = navGroups.filter((g) => g.category === 'national');
	$: t = translations[$currentLang] || translations.en;

	let isOpen = false;
	let showLoader = true;
	let scrollY = 0;

	// Loader slideshow states
	let currentImageIndex = 0;
	const loaderImages = [
		'/AERIAL DRONE SHOTS/Tanauan Arial View.webp',
		'/Tourism/municipyo-1.jpg',
		'/Tourism/chruch-1.jpg',
		'/Tourism/plaza-1.jpg',
		'/AERIAL DRONE SHOTS/Transpo-hub.webp'
	];
	let loaderInterval;

	// hide navbar when scrolling down, show when scrolling up
	let lastScrollY = 0;
	let navHidden = false;
	let _ticking = false;

	const isHome = derived(page, ($page) => $page.url.pathname === '/');
	const isOfficials = derived(page, ($page) => $page.url.pathname === '/Officials');

	// Reactively set scroll state
	$: scrolled = scrollY > 50;
	// True only on homepage or officials page before any scroll — enables transparent navbar over hero/cover
	$: isTransparent = ($isHome || $isOfficials) && !scrolled;

	// Mobile menu states
	let activeMobileSection = ''; // 'municipality', 'offices', 'tourism', 'news', 'transparency'
	let activeMobileDeptSub = ''; // 'mayor', 'vice-mayor', 'treasurer', 'mswdo', 'health', 'other', 'mlgoo'

	// Search state
	let searchOpen = false;
	let searchQuery = '';
	let searchInputEl;

	const sitePages = [
		{ name: 'Home', href: '/' },
		{ name: 'Vision and Mission', href: '/Mission and Vision' },
		{ name: 'History', href: '/History' },
		{ name: 'Geography', href: '/Geography' },
		{ name: 'Demographics', href: '/Demographics' },
		{ name: 'Climate', href: '/Climate' },
		{ name: 'Religion', href: '/Religion' },
		{ name: 'Language', href: '/Language' },
		{ name: 'Elected Officials', href: '/Officials' },
		{ name: 'Barangays', href: '/Barangays' },
		{ name: 'Hazard & Emergency Map', href: '/Community Hazard & Preparedness Interactive Map' },
		{ name: 'Facts and Figures', href: '/Facts and Figures' },
		{ name: 'Awards and Citations', href: '/Awards and Citations' },
		{ name: 'Tax and Fees', href: '/Tax and Fees' },
		{ name: 'Mayors-Office', href: '/Departments/Mayors-Office' },
		{ name: "Municipal Administrator's Office", href: '/Departments/Municipal-Administrator' },
		{ name: 'HRMO', href: '/Departments/HRMO' },
		{ name: 'PESO', href: '/Departments/PESO' },
		{ name: 'GSO', href: '/Departments/GSO' },
		{ name: 'MENRO', href: '/Departments/MENRO' },
		{ name: 'Tourism Office', href: '/Departments/Tourism' },
		{ name: 'Procurement Office', href: '/Departments/Procurement' },
		{ name: 'PhilHealth Office', href: '/Departments/PhilHealth' },
		{ name: 'IT Office', href: '/Departments/IT' },
		{ name: 'Vice Mayors-Office', href: '/Departments/Vice Mayors-Office' },
		{ name: 'Legislative Staff', href: '/Departments/Legislative Staff' },
		{ name: 'Sangguniang Bayan', href: '/Departments/Sangguniang-Bayan' },
		{ name: "Treasurer's Office (MTO)", href: '/Departments/Treasurer' },
		{ name: 'Licensing Office', href: '/Departments/Licensing' },
		{ name: 'Market', href: '/Departments/Market' },
		{ name: 'Slaughterhouse', href: '/Departments/Slaugtherhouse' },
		{ name: 'Cemetery', href: '/Departments/Cemetery' },
		{ name: 'MSWDO', href: '/Departments/MSWDO' },
		{ name: 'Day Care Services', href: '/Departments/Day Care' },
		{ name: 'Senior Citizens (OSCA)', href: '/Departments/OSCA' },
		{ name: 'Local Youth Development (LYDO)', href: '/Departments/LYDO' },
		{ name: 'Solo Parent', href: '/Departments/Solo-Parent' },
		{ name: 'PWD Office', href: '/Departments/PWD' },
		{ name: 'Health Office (MHO)', href: '/Departments/Health Office' },
		{ name: 'Sanitation Unit', href: '/Departments/Sanitation' },
		{ name: 'Dental Unit', href: '/Departments/Dental' },
		{ name: 'Planning & Development', href: '/Departments/Planning' },
		{ name: 'Engineering Office', href: '/Departments/Engineering' },
		{ name: 'Accounting Office', href: '/Departments/Accounting' },
		{ name: 'Agriculture Office', href: '/Departments/Agriculture' },
		{ name: 'Budget Office', href: '/Departments/Budget' },
		{ name: 'Civil Registrar', href: '/Departments/Civil Registrar' },
		{ name: 'Assessors Office', href: '/Departments/Assessors' },
		{ name: 'MDRRMO', href: '/Departments/MDRRMO' },
		{ name: 'MLGOO', href: '/Departments/MLGOO' },
		{ name: 'Liga ng mga Barangay', href: '/Departments/Liga' },
		{ name: 'SK Federation', href: '/Departments/SK-FED' },
		{ name: 'Municipal Police', href: '/Departments/Police' },
		{ name: 'Bureau of Fire Protection', href: '/Departments/Fire' },
		{ name: 'TAME', href: '/Departments/TAME' },
		{ name: 'Cultural Heritage', href: '/Tourism/Cultural Heritage' },
		{ name: 'Our Products', href: '/Tourism/Our Products' },
		{ name: 'Pasaka Festival', href: '/Tourism/Pasaka Festival' },
		{ name: 'Christmas Festival', href: '/Tourism/Christmas Festival' },
		{ name: 'Skimboarding', href: '/Tourism/Skimboarding' },
		{ name: 'Tourist Spots', href: '/Tourism/Tourist-Spots' },
		{ name: 'Infrastructures', href: '/Tourism/Infrastructures' },
		{ name: 'Local and Abroad News', href: '/News/Local and Abroad' },
		{ name: 'Events', href: '/News/Events' },
		{ name: 'Full Disclosure Portal', href: '/full-disclosure-portal' },
		{ name: "Citizen's Charter", href: '/citizens-charter' },
		{ name: 'Bids and Awards', href: '/bids-and-awards' },
		{ name: 'Contact Us', href: '/Contact' },
		{ name: 'Frequently Asked Questions (FAQ)', href: '/FAQ' },
		{ name: 'Citizen Satisfaction Survey', href: '/Survey' }
	];

	$: filteredPages = searchQuery.trim()
		? sitePages.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
		: [];

	function openSearch() {
		searchOpen = true;
		searchQuery = '';
		setTimeout(() => searchInputEl?.focus(), 100);
	}

	function closeSearch() {
		searchOpen = false;
		searchQuery = '';
	}

	function handleSearchKeydown(e) {
		if (e.key === 'Escape') closeSearch();
	}

	function toggleMobileSection(section) {
		activeMobileSection = activeMobileSection === section ? '' : section;
	}

	function toggleMobileDeptSub(sub) {
		activeMobileDeptSub = activeMobileDeptSub === sub ? '' : sub;
	}

	// Reset isOpen and accordion states when page changes
	$: {
		if ($page.url.pathname) {
			isOpen = false; // Close mobile menu on page change
			activeMobileSection = ''; // Reset open mobile section
			activeMobileDeptSub = ''; // Reset open mobile sub-section
		}
	}

	onMount(async () => {
		const gsap = (await import('gsap')).default;
		const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
		gsap.registerPlugin(ScrollTrigger);

		const wave = gsap.timeline({ repeat: -1, yoyo: true });
		wave.to('.wave-path', {
			duration: 2,
			attr: {
				d: `M0 160L80 133.3C160 107 320 53 480 69.3C640 85 800 171 960 186.7C1120 203 1280 149 1360 122.7L1440 96V320H1360C1280 320 1120 320 960 320C800 320 640 320 480 320C320 320 160 320 80 320H0Z`
			},
			ease: 'sine.inOut'
		});

		// scroll handler: update scrollY and decide whether to hide navbar
		const handleScroll = () => {
			const current = window.scrollY || 0;
			scrollY = current;

			if (!_ticking) {
				window.requestAnimationFrame(() => {
					// Only hide navbar on large screens (desktop), not on mobile/tablet
					const isDesktop = window.innerWidth >= 1280;

					if (isDesktop && current > lastScrollY && current > 120) {
						navHidden = true;
					} else {
						navHidden = false;
					}
					lastScrollY = current <= 0 ? 0 : current;
					_ticking = false;
				});
				_ticking = true;
			}
		};

		// attach listener (passive for performance)
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Start slideshow interval
		loaderInterval = setInterval(() => {
			currentImageIndex = (currentImageIndex + 1) % loaderImages.length;
		}, 400);

		setTimeout(() => {
			if (loaderInterval) clearInterval(loaderInterval);
			gsap.to('.loader', {
				opacity: 0,
				duration: 0.5,
				onComplete: () => (showLoader = false)
			});

			gsap.from('.navbar', {
				y: -50,
				opacity: 0,
				duration: 0.6,
				delay: 0.1,
				ease: 'power2.out'
			});
		}, 1200);

		// cleanup
		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (loaderInterval) clearInterval(loaderInterval);
		};
	});

	// also ensure cleanup in case onMount return isn't used elsewhere
	onDestroy(() => {
		try {
			window.removeEventListener('scroll', handleScroll);
		} catch (e) {
			// ignore
		}
		if (loaderInterval) clearInterval(loaderInterval);
	});
</script>

<svelte:head>
	<title>Tanauan, Leyte Bungto han Kamag-araman</title>
	<link rel="preload" as="image" href="/AERIAL DRONE SHOTS/Tanauan Arial View.webp" />
	<link rel="preload" as="image" href="/Tourism/municipyo-1.jpg" />
</svelte:head>

{#if showLoader}
	<div
		class="loader fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white"
	>
		<!-- Slideshow Background Images -->
		{#each loaderImages as img, idx}
			<img
				src={img}
				alt="Discover Tanauan Background"
				class="loader-image absolute inset-0 h-full w-full object-cover"
				class:active={currentImageIndex === idx}
			/>
		{/each}

		<!-- Premium overlay with subtle radial gradient -->
		<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80"></div>

		<!-- Loader Content Card -->
		<div
			class="animate-fadeIn relative z-10 mx-auto w-[90%] max-w-md overflow-hidden rounded-2xl border border-white/10 bg-black/35 px-8 py-12 text-center shadow-2xl backdrop-blur-md transition-all duration-700"
		>
			<!-- Corner borders for a premium frame look -->
			<div
				class="absolute top-0 left-0 h-4 w-4 rounded-tl-sm border-t-2 border-l-2 border-yellow-400/80"
			></div>
			<div
				class="absolute top-0 right-0 h-4 w-4 rounded-tr-sm border-t-2 border-r-2 border-yellow-400/80"
			></div>
			<div
				class="absolute bottom-0 left-0 h-4 w-4 rounded-bl-sm border-b-2 border-l-2 border-yellow-400/80"
			></div>
			<div
				class="absolute right-0 bottom-0 h-4 w-4 rounded-br-sm border-r-2 border-b-2 border-yellow-400/80"
			></div>

			<!-- Branding Tag -->
			<span
				class="mb-3 block animate-pulse text-xs font-bold tracking-[0.4em] text-yellow-400 uppercase"
			>
				Discover
			</span>

			<!-- Main Title -->
			<h1
				class="mb-3 font-heading text-4xl leading-none font-extrabold tracking-widest text-white md:text-5xl"
			>
				TANAUAN
			</h1>

			<!-- Tagline / Subtitle -->
			<p class="font-fancy mb-6 text-lg tracking-wide text-yellow-100/90 italic md:text-xl">
				Bungto han Kamag-araman
			</p>

			<!-- Custom Animated Loader Progress Bar -->
			<div class="relative mx-auto h-[2px] w-48 overflow-hidden rounded-full bg-white/20">
				<div
					class="animate-loaderProgress h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"
				></div>
			</div>

			<!-- Subtle MVP/Info Description -->
			<p class="mt-8 font-mono text-[10px] tracking-widest text-white/40 uppercase">
				demo version • all rights reserved
			</p>
		</div>
	</div>
{:else}
	<!-- Top Philippine Flag colored ribbon -->
	<div
		class="fixed top-0 right-0 left-0 z-50 h-[4px] w-full bg-gradient-to-r from-[#0038a8] via-[#fcd116] to-[#ce1126] shadow-sm"
	></div>

	<nav
		class={`navbar font-navbar fixed top-[4px] z-40 flex w-full items-center justify-between px-4 py-3 transition-all duration-500 md:px-6
		${isTransparent ? 'border-b border-transparent bg-transparent text-white' : scrolled ? 'border-b border-slate-200/40 bg-white/95 text-slate-800 shadow-sm backdrop-blur-md' : 'border-b border-transparent bg-white/85 text-slate-900 backdrop-blur-sm'}`}
		style={`transform: translateY(${navHidden && !isOpen ? '-110%' : '0'}); transition: transform 300ms ease; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;`}
		aria-hidden={false}
	>
		<!-- Logo + Branding container -->
		<a
			href="/"
			class="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.01]"
		>
			<img
				src="/images/tanauan-logo.jpg"
				alt="Tanauan Municipal Seal"
				class="h-12 w-auto rounded-full sm:h-14"
			/>
			<div class="hidden flex-col text-left sm:flex">
				<span
					class={`text-[9px] leading-none font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${isTransparent ? 'text-white/70' : 'text-slate-500'}`}
					>Municipality of</span
				>
				<span
					class={`font-heading text-sm font-black tracking-wide uppercase transition-colors duration-500 ${isTransparent ? 'text-white' : 'text-blue-900'}`}
					>Tanauan, Leyte</span
				>
			</div>
		</a>

		<!-- Mobile Search + Hamburger -->
		<div class="flex items-center gap-1 xl:hidden">
			<button
				on:click={openSearch}
				class={`rounded-xl p-2 transition-all duration-300 ${isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100 hover:text-blue-900'}`}
				aria-label="Search"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2.2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</button>
			<button
				on:click={() => (isOpen = !isOpen)}
				class={`rounded-xl p-2 transition-all duration-300 focus:outline-none ${isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100 hover:text-blue-900'}`}
				aria-label="Toggle Menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 transition-transform duration-300"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2.2"
				>
					{#if isOpen}
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>

		<div
			class="relative hidden items-center space-x-2 text-[13px] font-bold tracking-wider text-slate-700 xl:flex"
		>
			<!-- HOME BUTTON -->
			<a
				href="/"
				class={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-bold tracking-wider transition-all duration-300 ${
					$isHome
						? isTransparent
							? 'bg-white/20 text-yellow-300 shadow-inner'
							: 'bg-blue-900 text-white shadow-sm'
						: isTransparent
							? 'text-white hover:bg-white/10'
							: 'text-slate-700 hover:bg-slate-100/60 hover:text-blue-900'
				}`}
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2.2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
				{t.home || 'HOME'}
			</a>

			<!-- OUR MUNICIPALITY -->
			<div class="group/menu relative">
				<button
					class={isTransparent
						? 'flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-bold tracking-wider text-white transition-all duration-300 hover:bg-white/10'
						: 'flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-bold tracking-wider text-slate-700 transition-all duration-300 hover:bg-slate-100/50 hover:text-blue-900'}
				>
					OUR MUNICIPALITY
					<svg
						class={isTransparent
							? 'h-3.5 w-3.5 text-white/50 transition-all duration-300 group-hover/menu:rotate-180 group-hover/menu:text-white'
							: 'h-3.5 w-3.5 text-slate-400 transition-all duration-300 group-hover/menu:rotate-180 group-hover/menu:text-blue-900'}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
					>
				</button>
				<div
					class="invisible absolute top-full left-0 z-50 mt-2 min-w-[270px] translate-y-2 transform space-y-0.5 rounded-2xl border border-slate-200/50 bg-white p-3 text-slate-700 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 ease-out group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100"
				>
					<a
						href="/Mission and Vision"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Mission and Vision' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
						>Vision and Mission</a
					>
					<a
						href="/History"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/History' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
						>History</a
					>
					<a
						href="/Geography"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Geography' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
						>Geography</a
					>
					<a
						href="/Demographics"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Demographics' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
						>Demographics</a
					>
					<a
						href="/Climate"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Climate' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
						>Climate</a
					>
					<a
						href="/Religion"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Religion' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
						>Religion</a
					>
					<a
						href="/Language"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Language' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
						>Language</a
					>
					<a
						href="/Officials"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Officials' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
						>Elected Officials</a
					>
					<a
						href="/Barangays"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Barangays' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
						>Barangays</a
					>
					<a
						href="/Community Hazard & Preparedness Interactive Map"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Community Hazard & Preparedness Interactive Map' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
						>Hazard & Emergency Map</a
					>
					<a
						href="/Facts and Figures"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Facts and Figures' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
						>Facts and Figures</a
					>
					<a
						href="/Awards and Citations"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Awards and Citations' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
						>Awards and Citations</a
					>
					<a
						href="/Tax and Fees"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Tax and Fees' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
						>Tax and Fees</a
					>
				</div>
			</div>

			<!-- DEPARTMENTS (dynamic from Firestore) -->
			<div class="group/menu relative">
				<button
					class={isTransparent
						? 'flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-bold tracking-wider text-white transition-all duration-300 hover:bg-white/10'
						: 'flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-bold tracking-wider text-slate-700 transition-all duration-300 hover:bg-slate-100/50 hover:text-blue-900'}
				>
					OFFICES
					<svg
						class={isTransparent
							? 'h-3.5 w-3.5 text-white/50 transition-all duration-300 group-hover/menu:rotate-180 group-hover/menu:text-white'
							: 'h-3.5 w-3.5 text-slate-400 transition-all duration-300 group-hover/menu:rotate-180 group-hover/menu:text-blue-900'}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
					>
				</button>

				<div
					class="invisible absolute top-full left-0 z-50 mt-2 min-w-[320px] translate-y-2 transform rounded-2xl border border-slate-200/60 bg-white p-3 text-slate-700 opacity-0 shadow-2xl backdrop-blur-md transition-all duration-300 ease-out group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100"
				>
					<!-- Local Government Offices Header -->
					<div
						class="mb-1.5 flex items-center justify-between border-b border-slate-100 px-3 pb-1 text-[10px] font-extrabold tracking-widest text-blue-900 uppercase"
					>
						<span>Local Government Offices</span>
						<span class="rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-bold text-blue-800"
							>LGU</span
						>
					</div>

					<div class="mb-3 space-y-0.5">
						{#each localOffices as group}
							{@const visibleOffices = group.offices?.filter((o) => o.visible !== false) ?? []}
							{#if visibleOffices.length === 1}
								<a
									href={visibleOffices[0].href}
									class={`block rounded-xl px-3 py-1.5 text-[12.5px] font-semibold transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === visibleOffices[0].href ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-700'}`}
								>
									{group.group}
								</a>
							{:else if visibleOffices.length > 1}
								<div class="group/submenu relative">
									<button
										class={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-[12.5px] font-semibold transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${
											visibleOffices.some((o) => $page.url.pathname === o.href)
												? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900'
												: 'text-slate-700'
										}`}
									>
										{group.group}
										<svg
											class="h-3.5 w-3.5 text-slate-400 transition-colors group-hover/submenu:text-blue-900"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											stroke-width="2.5"
											><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg
										>
									</button>

									<div
										class="invisible absolute top-0 left-full z-50 ml-2 min-w-[270px] -translate-x-2 transform rounded-2xl border border-slate-200/50 bg-white p-3 text-slate-700 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 ease-out group-hover/submenu:visible group-hover/submenu:translate-x-0 group-hover/submenu:opacity-100"
									>
										<div class="custom-scrollbar max-h-[380px] space-y-0.5 overflow-y-auto pr-1">
											{#each visibleOffices as office}
												<a
													href={office.href}
													class={`block rounded-lg px-3 py-1.5 text-[12px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === office.href ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
													>{office.name}</a
												>
											{/each}
										</div>
									</div>
								</div>
							{/if}
						{/each}
					</div>

					<!-- National Government Agencies Header -->
					<div
						class="border-slate-150 mb-1.5 flex items-center justify-between border-t px-3 pt-2 pb-1 text-[10px] font-extrabold tracking-widest text-amber-900 uppercase"
					>
						<span>National Government Agencies</span>
						<span class="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800"
							>NGA</span
						>
					</div>

					<div class="space-y-0.5">
						{#each nationalOffices as group}
							{@const visibleOffices = group.offices?.filter((o) => o.visible !== false) ?? []}
							{#if visibleOffices.length === 1}
								<a
									href={visibleOffices[0].href}
									class={`block rounded-xl px-3 py-1.5 text-[12.5px] font-semibold transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === visibleOffices[0].href ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-700'}`}
								>
									{group.group}
								</a>
							{:else if visibleOffices.length > 1}
								<div class="group/submenu relative">
									<button
										class={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-[12.5px] font-semibold transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${
											visibleOffices.some((o) => $page.url.pathname === o.href)
												? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900'
												: 'text-slate-700'
										}`}
									>
										{group.group}
										<svg
											class="h-3.5 w-3.5 text-slate-400 transition-colors group-hover/submenu:text-blue-900"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											stroke-width="2.5"
											><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg
										>
									</button>

									<div
										class="invisible absolute top-0 left-full z-50 ml-2 min-w-[270px] -translate-x-2 transform rounded-2xl border border-slate-200/50 bg-white p-3 text-slate-700 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 ease-out group-hover/submenu:visible group-hover/submenu:translate-x-0 group-hover/submenu:opacity-100"
									>
										<div class="custom-scrollbar max-h-[380px] space-y-0.5 overflow-y-auto pr-1">
											{#each visibleOffices as office}
												<a
													href={office.href}
													class={`block rounded-lg px-3 py-1.5 text-[12px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === office.href ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
													>{office.name}</a
												>
											{/each}
										</div>
									</div>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>

			<!-- TOURISM -->
			<div class="group/menu relative">
				<button
					class={isTransparent
						? 'flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-bold tracking-wider text-white transition-all duration-300 hover:bg-white/10'
						: 'flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-bold tracking-wider text-slate-700 transition-all duration-300 hover:bg-slate-100/50 hover:text-blue-900'}
				>
					TOURISM
					<svg
						class={isTransparent
							? 'h-3.5 w-3.5 text-white/50 transition-all duration-300 group-hover/menu:rotate-180 group-hover/menu:text-white'
							: 'h-3.5 w-3.5 text-slate-400 transition-all duration-300 group-hover/menu:rotate-180 group-hover/menu:text-blue-900'}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
					>
				</button>
				<div
					class="invisible absolute top-full left-1/2 z-50 mt-2 min-w-[250px] -translate-x-1/2 translate-y-2 transform space-y-0.5 rounded-2xl border border-slate-200/50 bg-white p-3 text-slate-700 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 ease-out group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100"
				>
					<a
						href="/Tourism/Cultural Heritage"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Tourism/Cultural Heritage' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
					>
						Cultural Heritage
					</a>
					<a
						href="/Tourism/Our Products"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Tourism/Our Products' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
					>
						Our Products
					</a>
					<a
						href="/Tourism/Pasaka Festival"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Tourism/Pasaka Festival' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
					>
						Pasaka Festival
					</a>
					<a
						href="/Tourism/Christmas Festival"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Tourism/Christmas Festival' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
					>
						Christmas Festival
					</a>
					<a
						href="/Tourism/Skimboarding"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Tourism/Skimboarding' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
					>
						Skimboarding
					</a>
					<a
						href="/Tourism/Tourist-Spots"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Tourism/Tourist-Spots' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
					>
						Tourist Spots
					</a>
					<a
						href="/Tourism/Infrastructures"
						class={`block rounded-lg px-3 py-2 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Tourism/Infrastructures' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
					>
						Infrastructures
					</a>
				</div>
			</div>

			<!-- NEWS RELEASES -->
			<div class="group/menu relative">
				<button
					class={isTransparent
						? 'flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-bold tracking-wider text-white transition-all duration-300 hover:bg-white/10'
						: 'flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-bold tracking-wider text-slate-700 transition-all duration-300 hover:bg-slate-100/50 hover:text-blue-900'}
				>
					NEWS RELEASES
					<svg
						class={isTransparent
							? 'h-3.5 w-3.5 text-white/50 transition-all duration-300 group-hover/menu:rotate-180 group-hover/menu:text-white'
							: 'h-3.5 w-3.5 text-slate-400 transition-all duration-300 group-hover/menu:rotate-180 group-hover/menu:text-blue-900'}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
					>
				</button>
				<div
					class="invisible absolute top-full right-0 z-50 mt-2 min-w-[220px] translate-y-2 transform space-y-0.5 rounded-2xl border border-slate-200/50 bg-white p-3 text-slate-700 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 ease-out group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100"
				>
					<a
						href="/News/Local and Abroad"
						class={`block rounded-lg px-3 py-2.5 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/News/Local and Abroad' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
					>
						Local and Abroad
					</a>
					<!--
					<a
						href="/News/Activities"
						class={`block rounded-lg px-3 py-2.5 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/News/Activities' ? 'bg-blue-50/50 font-bold text-blue-900 border-l-2 border-blue-900 pl-2' : 'text-slate-600'}`}
					>
						Activities
					</a>
					-->
					<a
						href="/News/Events"
						class={`block rounded-lg px-3 py-2.5 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/News/Events' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
					>
						Events
					</a>
				</div>
			</div>

			<!-- TRANSPARENCY -->
			<div class="group/menu relative">
				<button
					class={isTransparent
						? 'flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-bold tracking-wider text-white transition-all duration-300 hover:bg-white/10'
						: 'flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-bold tracking-wider text-slate-700 transition-all duration-300 hover:bg-slate-100/50 hover:text-blue-900'}
				>
					TRANSPARENCY
					<svg
						class={isTransparent
							? 'h-3.5 w-3.5 text-white/50 transition-all duration-300 group-hover/menu:rotate-180 group-hover/menu:text-white'
							: 'h-3.5 w-3.5 text-slate-400 transition-all duration-300 group-hover/menu:rotate-180 group-hover/menu:text-blue-900'}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
					>
				</button>
				<div
					class="invisible absolute top-full right-0 z-50 mt-2 min-w-[240px] translate-y-2 transform space-y-0.5 rounded-2xl border border-slate-200/50 bg-white p-3 text-slate-700 opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 ease-out group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100"
				>
					<a
						href="/full-disclosure-portal"
						class={`block rounded-lg px-3 py-2.5 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/full-disclosure-portal' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
					>
						Full Disclosure Portal
					</a>
					<a
						href="/citizens-charter"
						class={`block rounded-lg px-3 py-2.5 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/citizens-charter' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
					>
						Citizen’s Charter
					</a>
					<a
						href="/bids-and-awards"
						class={`block rounded-lg px-3 py-2.5 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/bids-and-awards' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
					>
						Bids and Awards
					</a>
					<a
						href="/Survey"
						class={`block rounded-lg px-3 py-2.5 text-[13px] transition-all duration-200 hover:bg-slate-50 hover:text-blue-900 ${$page.url.pathname === '/Survey' ? 'border-l-2 border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
					>
						Citizen Satisfaction Survey
					</a>
				</div>
			</div>

			<!-- CONTACT US -->
			<a
				href="/Contact"
				class={isTransparent
					? 'rounded-xl px-3 py-2 text-[13px] font-bold tracking-wider text-white transition-all duration-300 hover:bg-white/10'
					: 'rounded-xl px-3 py-2 text-[13px] font-bold tracking-wider text-slate-700 transition-all duration-300 hover:bg-slate-100/50 hover:text-blue-900'}
				>CONTACT US</a
			>

			<!-- LANGUAGE SWITCHER -->
			<div class="group/lang relative ml-1">
				<button
					class={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-extrabold uppercase transition-all duration-300 ${
						isTransparent
							? 'border-white/30 text-white hover:bg-white/15'
							: 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-blue-900'
					}`}
					title="Select Language / Pinulongan"
					aria-label="Language selector"
				>
					<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
						/>
					</svg>
					<span>{$currentLang.toUpperCase()}</span>
					<svg
						class="h-3 w-3 text-slate-400 transition-transform group-hover/lang:rotate-180"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
				<div
					class="invisible absolute top-full right-0 z-50 mt-2 min-w-[170px] translate-y-2 transform rounded-2xl border border-slate-200/80 bg-white p-2 text-slate-800 opacity-0 shadow-2xl backdrop-blur-md transition-all duration-200 group-hover/lang:visible group-hover/lang:translate-y-0 group-hover/lang:opacity-100"
				>
					{#each languages as lang}
						<button
							on:click={() => ($currentLang = lang.code)}
							class={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
								$currentLang === lang.code
									? 'bg-blue-50 font-bold text-blue-900'
									: 'text-slate-600 hover:bg-slate-50'
							}`}
						>
							<span>{lang.label}</span>
							{#if $currentLang === lang.code}
								<span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
							{/if}
						</button>
					{/each}
					<div class="my-1 border-t border-slate-100 pt-1">
						<a
							href="/Language"
							class="block rounded-lg px-3 py-1.5 text-center text-[11px] font-bold text-blue-700 hover:bg-blue-50"
						>
							Waray Phrasebook →
						</a>
					</div>
				</div>
			</div>

			<!-- SEARCH BUTTON (Desktop) -->
			<button
				on:click={openSearch}
				class={`ml-1 rounded-xl p-2 transition-all duration-300 ${isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100 hover:text-blue-900'}`}
				aria-label="Search"
				title="Search pages"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2.2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</button>
		</div>
	</nav>

	<!-- Search Overlay -->
	{#if searchOpen}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm"
			on:click|self={closeSearch}
			on:keydown={handleSearchKeydown}
			role="dialog"
			aria-modal="true"
			aria-label="Search pages"
			tabindex="-1"
			transition:slide={{ duration: 200 }}
		>
			<div
				class="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-2xl"
			>
				<!-- Search Input -->
				<div class="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 shrink-0 text-slate-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						bind:this={searchInputEl}
						bind:value={searchQuery}
						on:keydown={handleSearchKeydown}
						type="text"
						placeholder="Search pages... (e.g. Tourism, HRMO, Barangays)"
						class="w-full bg-transparent text-base text-slate-800 placeholder-slate-400 outline-none"
					/>
					<button
						on:click={closeSearch}
						class="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
						aria-label="Close search"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<!-- Results -->
				<div class="custom-scrollbar max-h-[50vh] overflow-y-auto">
					{#if searchQuery.trim() && filteredPages.length > 0}
						<div class="p-2">
							{#each filteredPages as result}
								<a
									href={result.href}
									on:click={closeSearch}
									class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-900"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 shrink-0 text-slate-400"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
									</svg>
									<span class="font-medium">{result.name}</span>
								</a>
							{/each}
						</div>
					{:else if searchQuery.trim()}
						<div class="px-5 py-8 text-center text-sm text-slate-400">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mx-auto mb-2 h-8 w-8 text-slate-300"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="1.5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
							No pages found for "{searchQuery}"
						</div>
					{:else}
						<div class="px-5 py-6 text-center text-sm text-slate-400">
							Type to search across all pages
						</div>
					{/if}
				</div>

				<!-- Keyboard Hint -->
				<div
					class="flex items-center justify-end border-t border-slate-100 px-4 py-2.5 text-[11px] text-slate-400"
				>
					<span
						class="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px]"
						>ESC</span
					>
					<span class="ml-1.5">to close</span>
				</div>
			</div>
		</div>
	{/if}

	{#if isOpen}
		<div
			class="custom-scrollbar fixed top-[72px] right-4 z-50 mx-auto max-h-[85vh] w-[calc(100%-2rem)] transform overflow-y-auto rounded-3xl border border-slate-200/50 bg-white/95 p-5 text-slate-800 shadow-2xl backdrop-blur-md transition-all duration-500 ease-in-out sm:right-6 sm:w-[350px] xl:hidden"
		>
			<!-- Top colored ribbon for government style inside the mobile menu card -->
			<div
				class="absolute top-0 right-0 left-0 h-[4px] rounded-t-3xl bg-gradient-to-r from-[#0038a8] via-[#fcd116] to-[#ce1126]"
			></div>

			<!-- Mobile Accordion Menu -->
			<div class="mt-4 flex flex-col gap-2">
				<!-- Mobile Home Link -->
				<a
					href="/"
					class={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-bold tracking-wider uppercase transition-all duration-200 ${
						$isHome
							? 'bg-blue-900 text-white shadow-sm'
							: 'text-slate-700 hover:bg-slate-100/50 hover:text-blue-900'
					}`}
					on:click={() => (isOpen = false)}
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.2"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
					<span>{t.home || 'Home'}</span>
				</a>

				<!-- Section 1: Our Municipality -->
				<div>
					<button
						on:click={() => toggleMobileSection('municipality')}
						class="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-bold tracking-wider text-slate-700 uppercase transition-all duration-200 hover:bg-slate-100/50"
					>
						Our Municipality
						<svg
							class={`h-4 w-4 text-slate-400 transition-transform duration-300 ${activeMobileSection === 'municipality' ? 'rotate-180 text-blue-900' : ''}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M19 9l-7 7-7-7"
							/></svg
						>
					</button>
					{#if activeMobileSection === 'municipality'}
						<div
							transition:slide={{ duration: 250 }}
							class="mt-1 mb-2 flex flex-col gap-1 border-l border-slate-100 pl-3"
						>
							<a
								href="/Mission and Vision"
								class={`block rounded-lg px-3 py-1.5 text-[13px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Mission and Vision' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Vision and Mission</a
							>
							<a
								href="/History"
								class={`block rounded-lg px-3 py-1.5 text-[13px] transition-all hover:text-blue-900 ${$page.url.pathname === '/History' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>History</a
							>
							<a
								href="/Geography"
								class={`block rounded-lg px-3 py-1.5 text-[13px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Geography' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Geography</a
							>
							<a
								href="/Demographics"
								class={`block rounded-lg px-3 py-1.5 text-[13px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Demographics' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Demographics</a
							>
							<a
								href="/Climate"
								class={`block rounded-lg px-3 py-1.5 text-[13px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Climate' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Climate</a
							>
							<a
								href="/Religion"
								class={`block rounded-lg px-3 py-1.5 text-[13px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Religion' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Religion</a
							>
							<a
								href="/Language"
								class={`block rounded-lg px-3 py-1.5 text-[13px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Language' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Language</a
							>
							<a
								href="/Officials"
								class={`block rounded-lg px-3 py-1.5 text-[13px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Officials' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Elected Officials</a
							>
							<a
								href="/Barangays"
								class={`block rounded-lg px-3 py-1.5 text-[13px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Barangays' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Barangays</a
							>
							<a
								href="/Community Hazard & Preparedness Interactive Map"
								class={`block rounded-lg px-3 py-1.5 text-[13px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Community Hazard & Preparedness Interactive Map' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Hazard & Emergency Map</a
							>
							<a
								href="/Facts and Figures"
								class={`block rounded-lg px-3 py-1.5 text-[13px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Facts and Figures' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Facts & Figures</a
							>
							<a
								href="/Awards and Citations"
								class={`block rounded-lg px-3 py-1.5 text-[13px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Awards and Citations' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Awards & Citations</a
							>
							<a
								href="/Tax and Fees"
								class={`block rounded-lg px-3 py-1.5 text-[13px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Tax and Fees' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Tax & Fees</a
							>
						</div>
					{/if}
				</div>

				<!-- Section 2: Offices -->
				<div>
					<button
						on:click={() => toggleMobileSection('offices')}
						class="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-bold tracking-wider text-slate-700 uppercase transition-all duration-200 hover:bg-slate-100/50"
					>
						Offices
						<svg
							class={`h-4 w-4 text-slate-400 transition-transform duration-300 ${activeMobileSection === 'offices' ? 'rotate-180 text-blue-900' : ''}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M19 9l-7 7-7-7"
							/></svg
						>
					</button>
					{#if activeMobileSection === 'offices'}
						<div
							transition:slide={{ duration: 250 }}
							class="mt-1 mb-2 flex flex-col gap-1 border-l border-slate-100 pl-3"
						>
							<!-- Office of the Mayor Sub-accordion -->
							<div>
								<button
									on:click={() => toggleMobileDeptSub('mayor')}
									class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50"
								>
									Office of the Mayor
									<svg
										class={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${activeMobileDeptSub === 'mayor' ? 'rotate-180 text-blue-900' : ''}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
									>
								</button>
								{#if activeMobileDeptSub === 'mayor'}
									<div
										transition:slide={{ duration: 200 }}
										class="mt-1 mb-2 flex flex-col gap-1 border-l border-slate-100 pl-3 text-slate-600"
									>
										<a
											href="/Departments/Mayors-Office"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Mayors-Office' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Mayor’s Office</a
										>
										<a
											href="/Departments/Municipal-Administrator"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Municipal-Administrator' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Municipal Administrator</a
										>
										<a
											href="/Departments/HRMO"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/HRMO' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Human Resource Office</a
										>
										<a
											href="/Departments/PESO"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/PESO' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Public Employment Service Office</a
										>
										<a
											href="/Departments/GSO"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/GSO' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>General Services Office</a
										>
										<a
											href="/Departments/MENRO"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/MENRO' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Environment Office</a
										>
										<a
											href="/Departments/Tourism"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Tourism' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Tourism Office</a
										>
										<a
											href="/Departments/Procurement"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Procurement' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Procurement Office</a
										>
										<a
											href="/Departments/PhilHealth"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/PhilHealth' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>PhilHealth Office</a
										>
										<a
											href="/Departments/IT"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/IT' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>IT Office</a
										>
									</div>
								{/if}
							</div>

							<!-- Office of the Vice Mayor Sub-accordion -->
							<div>
								<button
									on:click={() => toggleMobileDeptSub('vice-mayor')}
									class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50"
								>
									Office of the Vice Mayor
									<svg
										class={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${activeMobileDeptSub === 'vice-mayor' ? 'rotate-180 text-blue-900' : ''}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
									>
								</button>
								{#if activeMobileDeptSub === 'vice-mayor'}
									<div
										transition:slide={{ duration: 200 }}
										class="mt-1 mb-2 flex flex-col gap-1 border-l border-slate-100 pl-3 text-slate-600"
									>
										<a
											href="/Departments/Vice-Mayors-Office#mission-vision"
											class="block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900"
											on:click={() => (isOpen = false)}>Mission / Vision</a
										>
										<a
											href="/Departments/Vice-Mayors-Office#staffing"
											class="block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900"
											on:click={() => (isOpen = false)}>Staffing Pattern</a
										>
										<a
											href="/Departments/Vice-Mayors-Office#services"
											class="block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900"
											on:click={() => (isOpen = false)}>Services</a
										>
										<a
											href="/Departments/Vice-Mayors-Office#announcements"
											class="block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900"
											on:click={() => (isOpen = false)}>Announcements / Other Info</a
										>
									</div>
								{/if}
							</div>

							<!-- Office of the Sangguniang Bayan Sub-accordion -->
							<div>
								<button
									on:click={() => toggleMobileDeptSub('sangguniang-bayan')}
									class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50"
								>
									Office of the Sangguniang Bayan
									<svg
										class={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${activeMobileDeptSub === 'sangguniang-bayan' ? 'rotate-180 text-blue-900' : ''}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
									>
								</button>
								{#if activeMobileDeptSub === 'sangguniang-bayan'}
									<div
										transition:slide={{ duration: 200 }}
										class="mt-1 mb-2 flex flex-col gap-1 border-l border-slate-100 pl-3 text-slate-600"
									>
										<a
											href="/Departments/Sangguniang-Bayan#mission-vision"
											class="block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900"
											on:click={() => (isOpen = false)}>Mission / Vision</a
										>
										<a
											href="/Departments/Sangguniang-Bayan#org-chart"
											class="block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900"
											on:click={() => (isOpen = false)}>Organizational Structure</a
										>
										<a
											href="/citizens-charter"
											class="block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900"
											on:click={() => (isOpen = false)}>Citizen's Charter</a
										>
										<a
											href="/Departments/Sangguniang-Bayan#resolutions"
											class="block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900"
											on:click={() => (isOpen = false)}>Approved Resolutions</a
										>
										<a
											href="/Departments/Sangguniang-Bayan#ordinances"
											class="block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900"
											on:click={() => (isOpen = false)}>Ordinances</a
										>
										<a
											href="/Departments/Sangguniang-Bayan#services"
											class="block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900"
											on:click={() => (isOpen = false)}>Services Offered</a
										>
										<a
											href="/Departments/Sangguniang-Bayan#announcements"
											class="block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900"
											on:click={() => (isOpen = false)}>Announcements / Other Info</a
										>
									</div>
								{/if}
							</div>

							<!-- Treasurer’s Office Sub-accordion -->
							<div>
								<button
									on:click={() => toggleMobileDeptSub('treasurer')}
									class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50"
								>
									Treasurer’s Office (MTO)
									<svg
										class={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${activeMobileDeptSub === 'treasurer' ? 'rotate-180 text-blue-900' : ''}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
									>
								</button>
								{#if activeMobileDeptSub === 'treasurer'}
									<div
										transition:slide={{ duration: 200 }}
										class="mt-1 mb-2 flex flex-col gap-1 border-l border-slate-100 pl-3 text-slate-600"
									>
										<a
											href="/Departments/Treasurer"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Treasurer' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Municipal Treasurer</a
										>
										<a
											href="/Departments/Licensing"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Licensing' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Licensing Office</a
										>
										<a
											href="/Departments/Market"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Market' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Market</a
										>
										<a
											href="/Departments/Slaugtherhouse"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Slaugtherhouse' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Slaughterhouse</a
										>
										<a
											href="/Departments/Cemetery"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Cemetery' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Cemetery</a
										>
									</div>
								{/if}
							</div>

							<!-- MSWDO Sub-accordion -->
							<div>
								<button
									on:click={() => toggleMobileDeptSub('mswdo')}
									class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50"
								>
									Social Welfare & Development (MSWDO)
									<svg
										class={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${activeMobileDeptSub === 'mswdo' ? 'rotate-180 text-blue-900' : ''}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
									>
								</button>
								{#if activeMobileDeptSub === 'mswdo'}
									<div
										transition:slide={{ duration: 200 }}
										class="mt-1 mb-2 flex flex-col gap-1 border-l border-slate-100 pl-3 text-slate-600"
									>
										<a
											href="/Departments/MSWDO"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/MSWDO' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>MSWDO</a
										>
										<a
											href="/Departments/Day Care"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Day Care' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Day Care Services</a
										>
										<a
											href="/Departments/OSCA"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/OSCA' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Senior Citizens OSCA</a
										>
										<a
											href="/Departments/LYDO"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/LYDO' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Youth Development LYDO</a
										>
										<a
											href="/Departments/Solo-Parent"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Solo-Parent' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Solo Parent</a
										>
										<a
											href="/Departments/PWD"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/PWD' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>PWD Office</a
										>
									</div>
								{/if}
							</div>

							<!-- Health Office Sub-accordion -->
							<div>
								<button
									on:click={() => toggleMobileDeptSub('health')}
									class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50"
								>
									Health Office (MHO)
									<svg
										class={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${activeMobileDeptSub === 'health' ? 'rotate-180 text-blue-900' : ''}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
									>
								</button>
								{#if activeMobileDeptSub === 'health'}
									<div
										transition:slide={{ duration: 200 }}
										class="mt-1 mb-2 flex flex-col gap-1 border-l border-slate-100 pl-3 text-slate-600"
									>
										<a
											href="/Departments/Health Office"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Health Office' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Municipal Health Office</a
										>
										<a
											href="/Departments/Sanitation"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Sanitation' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Sanitation Unit</a
										>
										<a
											href="/Departments/Dental"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Dental' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Dental Unit</a
										>
									</div>
								{/if}
							</div>

							<!-- Other Departments Sub-accordion -->
							<div>
								<button
									on:click={() => toggleMobileDeptSub('other')}
									class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50"
								>
									Other LGU Offices
									<svg
										class={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${activeMobileDeptSub === 'other' ? 'rotate-180 text-blue-900' : ''}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
									>
								</button>
								{#if activeMobileDeptSub === 'other'}
									<div
										transition:slide={{ duration: 200 }}
										class="mt-1 mb-2 flex flex-col gap-1 border-l border-slate-100 pl-3 text-slate-600"
									>
										<a
											href="/Departments/Planning"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Planning' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Planning & Development</a
										>
										<a
											href="/Departments/Engineering"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Engineering' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Engineering Office</a
										>
										<a
											href="/Departments/Accounting"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Accounting' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Accounting Office</a
										>
										<a
											href="/Departments/Agriculture"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Agriculture' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Agriculture Office</a
										>
										<a
											href="/Departments/Budget"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Budget' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Budget Office</a
										>
										<a
											href="/Departments/Civil Registrar"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Civil Registrar' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Civil Registrar</a
										>
										<a
											href="/Departments/Assessors"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Assessors' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Assessors Office</a
										>
										<a
											href="/Departments/MDRRMO"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/MDRRMO' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>MDRRMO</a
										>
									</div>
								{/if}
							</div>

							<!-- TAME -->
							<a
								href="/Departments/TAME"
								class={`block rounded-xl px-3 py-2 text-[13px] font-semibold transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/TAME' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>TAME</a
							>

							<!-- National Government Agencies Header (Mobile) -->
							<div
								class="border-slate-150 mt-3 mb-1 flex items-center justify-between border-t px-3 pt-3 pb-1 text-[10px] font-extrabold tracking-widest text-amber-900 uppercase"
							>
								<span>National Government Agencies</span>
								<span class="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800"
									>NGA</span
								>
							</div>

							<!-- MLGOO Sub-accordion -->
							<div>
								<button
									on:click={() => toggleMobileDeptSub('mlgoo')}
									class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[13px] font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-50"
								>
									MLGOO
									<svg
										class={`h-3.5 w-3.5 text-slate-400 transition-transform duration-300 ${activeMobileDeptSub === 'mlgoo' ? 'rotate-180 text-blue-900' : ''}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
									>
								</button>
								{#if activeMobileDeptSub === 'mlgoo'}
									<div
										transition:slide={{ duration: 200 }}
										class="mt-1 mb-2 flex flex-col gap-1 border-l border-slate-100 pl-3 text-slate-600"
									>
										<a
											href="/Departments/MLGOO"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/MLGOO' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>MLGOO Office</a
										>
										<a
											href="/Departments/Liga"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Liga' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Liga ng mga Barangay</a
										>
										<a
											href="/Departments/SK-FED"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/SK-FED' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>SK Federation</a
										>
										<a
											href="/Departments/Police"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Police' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Municipal Police</a
										>
										<a
											href="/Departments/Fire"
											class={`block rounded-lg px-3 py-1.5 text-[12.5px] transition-all hover:text-blue-900 ${$page.url.pathname === '/Departments/Fire' ? 'border-l border-blue-900 bg-blue-50/50 pl-2 font-bold text-blue-900' : ''}`}
											on:click={() => (isOpen = false)}>Bureau of Fire Protection</a
										>
									</div>
								{/if}
							</div>
						</div>
					{/if}
				</div>

				<!-- Section 3: Tourism -->
				<div>
					<button
						on:click={() => toggleMobileSection('tourism')}
						class="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-bold tracking-wider text-slate-700 uppercase transition-all duration-200 hover:bg-slate-100/50"
					>
						Tourism
						<svg
							class={`h-4 w-4 text-slate-400 transition-transform duration-300 ${activeMobileSection === 'tourism' ? 'rotate-180 text-blue-900' : ''}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
						>
					</button>
					{#if activeMobileSection === 'tourism'}
						<div
							transition:slide={{ duration: 250 }}
							class="mt-1 mb-2 flex flex-col gap-1 border-l border-slate-100 pl-3"
						>
							<a
								href="/Tourism/Cultural Heritage"
								class={`block rounded-xl px-4 py-2 text-[13.5px] font-medium transition-all hover:text-blue-900 ${$page.url.pathname === '/Tourism/Cultural Heritage' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Cultural Heritage</a
							>
							<a
								href="/Tourism/Our Products"
								class={`block rounded-xl px-4 py-2 text-[13.5px] font-medium transition-all hover:text-blue-900 ${$page.url.pathname === '/Tourism/Our Products' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Our Products</a
							>
							<a
								href="/Tourism/Pasaka Festival"
								class={`block rounded-xl px-4 py-2 text-[13.5px] font-medium transition-all hover:text-blue-900 ${$page.url.pathname === '/Tourism/Pasaka Festival' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Pasaka Festival</a
							>
							<a
								href="/Tourism/Christmas Festival"
								class={`block rounded-xl px-4 py-2 text-[13.5px] font-medium transition-all hover:text-blue-900 ${$page.url.pathname === '/Tourism/Christmas Festival' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Christmas Festival</a
							>
							<a
								href="/Tourism/Skimboarding"
								class={`block rounded-xl px-4 py-2 text-[13.5px] font-medium transition-all hover:text-blue-900 ${$page.url.pathname === '/Tourism/Skimboarding' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Skimboarding</a
							>
							<a
								href="/Tourism/Tourist-Spots"
								class={`block rounded-xl px-4 py-2 text-[13.5px] font-medium transition-all hover:text-blue-900 ${$page.url.pathname === '/Tourism/Tourist-Spots' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Tourist Spots</a
							>
							<a
								href="/Tourism/Infrastructures"
								class={`block rounded-xl px-4 py-2 text-[13.5px] font-medium transition-all hover:text-blue-900 ${$page.url.pathname === '/Tourism/Infrastructures' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Infrastructures</a
							>
						</div>
					{/if}
				</div>

				<!-- Section 4: News Releases -->
				<div>
					<button
						on:click={() => toggleMobileSection('news')}
						class="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-bold tracking-wider text-slate-700 uppercase transition-all duration-200 hover:bg-slate-100/50"
					>
						News Releases
						<svg
							class={`h-4 w-4 text-slate-400 transition-transform duration-300 ${activeMobileSection === 'news' ? 'rotate-180 text-blue-900' : ''}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
						>
					</button>
					{#if activeMobileSection === 'news'}
						<div
							transition:slide={{ duration: 250 }}
							class="mt-1 mb-2 flex flex-col gap-1 border-l border-slate-100 pl-3"
						>
							<a
								href="/News/Local and Abroad"
								class={`block rounded-xl px-4 py-2 text-[13.5px] font-medium transition-all hover:text-blue-900 ${$page.url.pathname === '/News/Local and Abroad' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Local & Abroad</a
							>
							<!-- <a href="/News/Activities" class={`block rounded-xl px-4 py-2 text-[13.5px] transition-all hover:text-blue-900 font-medium ${$page.url.pathname === '/News/Activities' ? 'bg-blue-50/70 font-bold text-blue-900 border-l-2 border-blue-900 pl-3.5' : 'text-slate-600'}`} on:click={() => (isOpen = false)}>Activities</a> -->
							<a
								href="/News/Events"
								class={`block rounded-xl px-4 py-2 text-[13.5px] font-medium transition-all hover:text-blue-900 ${$page.url.pathname === '/News/Events' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Events</a
							>
						</div>
					{/if}
				</div>

				<!-- Section 5: Transparency -->
				<div>
					<button
						on:click={() => toggleMobileSection('transparency')}
						class="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-bold tracking-wider text-slate-700 uppercase transition-all duration-200 hover:bg-slate-100/50"
					>
						Transparency
						<svg
							class={`h-4 w-4 text-slate-400 transition-transform duration-300 ${activeMobileSection === 'transparency' ? 'rotate-180 text-blue-900' : ''}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
						>
					</button>
					{#if activeMobileSection === 'transparency'}
						<div
							transition:slide={{ duration: 250 }}
							class="mt-1 mb-2 flex flex-col gap-1 border-l border-slate-100 pl-3"
						>
							<a
								href="/full-disclosure-portal"
								class={`block rounded-xl px-4 py-2 text-[13.5px] font-medium transition-all hover:text-blue-900 ${$page.url.pathname === '/full-disclosure-portal' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Full Disclosure Portal</a
							>
							<a
								href="/citizens-charter"
								class={`block rounded-xl px-4 py-2 text-[13.5px] font-medium transition-all hover:text-blue-900 ${$page.url.pathname === '/citizens-charter' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Citizen’s Charter</a
							>
							<a
								href="/bids-and-awards"
								class={`block rounded-xl px-4 py-2 text-[13.5px] font-medium transition-all hover:text-blue-900 ${$page.url.pathname === '/bids-and-awards' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-600'}`}
								on:click={() => (isOpen = false)}>Bids & Awards</a
							>
						</div>
					{/if}
				</div>

				<!-- Citizen Survey in Mobile -->
				<a
					href="/Survey"
					class={`block rounded-xl px-3 py-2.5 text-left text-sm font-bold tracking-wider uppercase transition-all hover:bg-slate-100/50 hover:text-blue-900 ${$page.url.pathname === '/Survey' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-700'}`}
					on:click={() => (isOpen = false)}
				>
					Citizen Survey
				</a>

				<!-- Contact Us -->
				<a
					href="/Contact"
					class={`block rounded-xl px-3 py-2.5 text-left text-sm font-bold tracking-wider uppercase transition-all hover:bg-slate-100/50 hover:text-blue-900 ${$page.url.pathname === '/Contact' ? 'border-l-2 border-blue-900 bg-blue-50/70 pl-3.5 font-bold text-blue-900' : 'text-slate-700'}`}
					on:click={() => (isOpen = false)}
				>
					Contact Us
				</a>

				<!-- Mobile Language Selector -->
				<div class="mt-2 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3">
					<div
						class="mb-2 flex items-center justify-between text-[10px] font-extrabold tracking-wider text-slate-500 uppercase"
					>
						<span>Language / Pinulongan</span>
						<span class="rounded bg-blue-100 px-1.5 py-0.5 font-bold text-blue-900"
							>{$currentLang.toUpperCase()}</span
						>
					</div>
					<div class="grid grid-cols-3 gap-1.5">
						{#each languages as l}
							<button
								type="button"
								on:click={() => ($currentLang = l.code)}
								class={`rounded-lg py-1.5 text-xs font-bold transition-all ${
									$currentLang === l.code
										? 'bg-blue-900 text-white shadow-sm'
										: 'bg-white text-slate-700 hover:bg-slate-100'
								}`}
							>
								{l.short}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}

	<div class={$isHome || $isOfficials ? 'pt-0' : 'pt-[76px] md:pt-[84px]'}>
		<slot />
		<GeminiChatbox />
	</div>

	<footer class="animate-footer relative py-8 text-white">
		<!-- Background image with darker overlay for high contrast -->
		<div class="absolute inset-0">
			<img
				src="/Tourism/beach/home_footer.jpg"
				alt="Footer Background"
				class="h-full w-full object-cover"
			/>
			<div
				class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/85 to-black/70"
			></div>
		</div>

		<div class="relative container mx-auto max-w-7xl px-4 text-center">
			<!-- Official Seals Row with enhanced Tanauan Seal -->
			<div class="mb-6 flex flex-wrap items-center justify-center gap-6">
				<div class="relative">
					<img
						src="/images/tanauan-logo.jpg"
						alt="Tanauan Municipal Seal"
						class="h-14 w-14 rounded-full object-cover shadow-lg ring-2 ring-yellow-400 transition hover:scale-105"
					/>
				</div>
				<img
					src="/images/egov-2.png"
					alt="iGovPhil"
					class="h-12 rounded-full object-cover transition hover:scale-105"
				/>
				<img
					src="/images/vagongfelepens.png"
					alt="Bagong Pilipinas"
					class="h-12 object-contain transition hover:scale-105"
				/>
				<img
					src="/images/Ph transpaency.webp"
					alt="Transparency Seal"
					class="h-12 rounded-full object-cover transition hover:scale-105"
				/>
				<img
					src="/images/better-brighter-2.png"
					alt="Better & Brighter Tanauan"
					class="h-12 object-contain transition hover:scale-105"
				/>
			</div>

			<!-- Footer Navigation Links -->
			<div
				class="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-200"
			>
				<a href="/" class="transition hover:text-yellow-300">Home</a>
				<span class="text-white/30">•</span>
				<a href="/Officials" class="transition hover:text-yellow-300">Officials</a>
				<span class="text-white/30">•</span>
				<a href="/FAQ" class="transition hover:text-yellow-300">FAQ</a>
				<span class="text-white/30">•</span>
				<a href="/Survey" class="transition hover:text-yellow-300">Citizen Survey</a>
				<span class="text-white/30">•</span>
				<a href="/full-disclosure-portal" class="transition hover:text-yellow-300"
					>Transparency Portal</a
				>
				<span class="text-white/30">•</span>
				<a href="/Contact" class="transition hover:text-yellow-300">Emergency Hotlines & Contact</a>
			</div>

			<div class="space-y-1 text-xs text-slate-300">
				<p class="font-medium text-white">
					© 2025 Municipality of Tanauan, Leyte • Bungto han Kamag-araman
				</p>
				<p class="font-semibold text-yellow-300/90">Better & Brighter Tanauan • Powered by LSDS</p>
			</div>
		</div>
	</footer>
{/if}

<style>
	/* Lock navbar font regardless of any sub-page global CSS */
	:global(.navbar),
	:global(.navbar *) {
		font-family:
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			sans-serif !important;
	}

	.animate-fadeIn {
		animation: fadeIn 2s ease-out;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: scale(0.95);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.loader-image {
		opacity: 0;
		transform: scale(1.02);
		transition:
			opacity 1.2s ease-in-out,
			transform 3.5s ease-out;
		filter: brightness(0.45) contrast(1.1);
	}
	.loader-image.active {
		opacity: 1;
		transform: scale(1.08);
	}

	@keyframes loaderProgress {
		0% {
			width: 0%;
		}
		100% {
			width: 100%;
		}
	}
	.animate-loaderProgress {
		animation: loaderProgress 2.8s linear forwards;
	}

	.nav-link {
		color: inherit;
		cursor: pointer;
		background: none;
		border: none;
	}

	.nav-link:hover {
		color: #fbbf24;
	}

	.dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: 0.5rem;
		background-color: white;
		color: #1e3a8a;
		border-radius: 0.5rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		padding: 1rem;
		z-index: 50;
		opacity: 0;
		visibility: hidden;
		transform: translateY(10px);
		pointer-events: none;
		transition: all 0.3s ease-in-out;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 200px;
	}

	.dropdown a {
		display: block;
		font-size: 0.875rem;
		transition: all 0.2s ease-in-out;
		padding: 0.25rem 0;
	}

	.dropdown a:hover {
		color: #eab308;
		transform: translateX(4px);
	}

	main {
		padding-top: var(--navbar-height);
	}

	/* Custom scrollbar for dropdown menus */
	.custom-scrollbar::-webkit-scrollbar {
		width: 5px;
		height: 5px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: #94a3b8;
	}
</style>
