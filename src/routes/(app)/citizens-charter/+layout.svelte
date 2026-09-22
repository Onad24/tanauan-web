<script>
	import { page } from '$app/stores';
	import PageHero from '$lib/Components/PageHero.svelte';
	import { slide } from 'svelte/transition';

	let mobileMenuOpen = $state(false);

	const nav = [
		{
			href: '/citizens-charter',
			title: 'Overview',
			icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15'
		},
		{
			href: '/citizens-charter/services',
			title: 'Services & Processes',
			icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
		},
		{
			href: '/citizens-charter/forms',
			title: 'Forms & Templates',
			icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
		},
		{
			href: '/citizens-charter/feedback',
			title: 'Feedback & Redress',
			icon: 'M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
		},
		{
			href: '/citizens-charter/civil-registrar',
			title: 'Civil Registrar',
			icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
		},
		{
			href: '/citizens-charter/health',
			title: 'Health',
			icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		{
			href: '/citizens-charter/agriculture',
			title: 'Agriculture',
			icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
		},
		{
			href: '/citizens-charter/business-permit',
			title: 'Business Permit',
			icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		},
		{
			href: '/citizens-charter/accounting',
			title: 'Accounting',
			icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
		},
		{
			href: '/citizens-charter/peso',
			title: 'PESO',
			icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		},
		{
			href: '/citizens-charter/social-welfare',
			title: 'Social Welfare',
			icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
		},
		{
			href: '/citizens-charter/sanggunian',
			title: 'Sanggunian',
			icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
		},
		{
			href: '/citizens-charter/environment',
			title: 'Environment',
			icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
		},
		{
			href: '/citizens-charter/budget',
			title: 'Budget',
			icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		{
			href: '/citizens-charter/planning',
			title: 'Planning',
			icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
		},
		{
			href: '/citizens-charter/hr',
			title: 'Human Resources',
			icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
		},
		{
			href: '/citizens-charter/engineering',
			title: 'Engineering',
			icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
		},
		{
			href: '/citizens-charter/assessor',
			title: 'Assessor',
			icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
		},
		{
			href: '/citizens-charter/treasurer',
			title: 'Treasurer',
			icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		{
			href: '/citizens-charter/ABATTOIR',
			title: 'Slaughterhouse',
			icon: 'M17 14v6m-3-3h6M6 10h2m-2 4h2m-2 4h2m10-14L10 6.5 4 10v10a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1z'
		}
	];

	const isActive = (href) => {
		const path = $page.url.pathname.replace(/\/$/, '');
		const clean = href.replace(/\/$/, '');
		if (clean === '/citizens-charter')
			return path === '/citizens-charter' || path === '' || path === '/';
		return path === clean || path.startsWith(clean + '/');
	};

	$effect(() => {
		if ($page.url.pathname) {
			mobileMenuOpen = false;
		}
	});

	let activeItem = $derived(nav.find((item) => isActive(item.href)) || nav[0]);
</script>

<svelte:head>
	<title>Citizen's Charter — {activeItem ? activeItem.title : 'Sections'}</title>
</svelte:head>

<PageHero
	title="Citizen's Charter"
	subtitle={activeItem ? activeItem.title : 'Overview'}
	breadcrumbParent="Our Municipality"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15' /></svg>"
/>

<section class="min-h-screen bg-slate-50 pt-8 pb-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
			<!-- Left navigation column -->
			<aside class="lg:col-span-1">
				<!-- Mobile selector dropdown (visible only on mobile/tablet) -->
				<div class="relative mb-6 w-full lg:hidden">
					<button
						type="button"
						class="flex w-full items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-5 py-4 text-left font-bold text-slate-800 shadow-sm transition-all duration-200 hover:border-blue-500 hover:shadow focus:outline-none"
						onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					>
						<span class="flex items-center gap-2.5">
							<svg
								class="h-5 w-5 text-blue-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d={activeItem.icon} />
							</svg>
							{activeItem ? activeItem.title : 'Select Section'}
						</span>
						<svg
							class="h-5 w-5 text-slate-400 transition-transform duration-300 {mobileMenuOpen
								? 'rotate-180 text-blue-600'
								: ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							stroke-width="2.5"
							><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg
						>
					</button>

					{#if mobileMenuOpen}
						<div
							transition:slide={{ duration: 200 }}
							class="absolute right-0 left-0 z-30 mt-2 max-h-[350px] space-y-1 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-xl"
						>
							{#each nav as item}
								<a
									href={item.href}
									class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-150 {isActive(
										item.href
									)
										? 'bg-blue-900 font-bold text-white shadow-sm'
										: 'text-slate-700 hover:bg-slate-50'}"
									onclick={() => (mobileMenuOpen = false)}
								>
									<svg
										class="h-4 w-4 shrink-0 {isActive(item.href) ? 'text-white' : 'text-slate-400'}"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										stroke-width="2"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
									</svg>
									<span>{item.title}</span>
								</a>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Desktop Sidebar panel (visible only on desktop) -->
				<div
					class="hidden space-y-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm lg:block"
				>
					<div class="border-b border-slate-100 px-2 py-1">
						<h3 class="text-xs font-bold tracking-widest text-slate-400 uppercase">
							Charter Navigation
						</h3>
						<p class="mt-1 text-sm font-bold text-blue-900">LGU Sections</p>
					</div>

					<nav class="scrollbar-thin max-h-[calc(100vh-250px)] space-y-1 overflow-y-auto pr-1">
						{#each nav as item}
							<a
								href={item.href}
								class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 {isActive(
									item.href
								)
									? 'bg-blue-900 font-bold text-white shadow-sm'
									: 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}"
								aria-current={isActive(item.href) ? 'page' : undefined}
							>
								<svg
									class="h-4 w-4 shrink-0 transition-colors {isActive(item.href)
										? 'text-white'
										: 'text-slate-400 group-hover:text-blue-600'}"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									stroke-width="2"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
								</svg>
								<span>{item.title}</span>
							</a>
						{/each}
					</nav>
				</div>
			</aside>

			<!-- Right content column -->
			<main class="min-w-0 lg:col-span-3">
				<slot />
			</main>
		</div>
	</div>
</section>

<style>
	/* Scrollbar styling for sidebar */
	.scrollbar-thin::-webkit-scrollbar {
		width: 4px;
		display: block;
	}
	.scrollbar-thin::-webkit-scrollbar-track {
		background: transparent;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 2px;
	}

	/* Cohesive Global Styles for all subpage cards under citizens-charter slot */

	/* Reset default subpage layout paddings and widths to match parent slot */
	:global(main .mx-auto.max-w-5xl.p-6) {
		max-width: 100% !important;
		padding: 0 !important;
		margin: 0 !important;
	}
	:global(main .page.container) {
		max-width: 100% !important;
		padding: 0 !important;
		margin: 0 !important;
	}

	/* Hide redundant primary h1 tags inside subpages (since PageHero handles layout heading) */
	:global(main h1) {
		display: none !important;
	}

	/* Styling for department information headers */
	:global(main header.mb-6) {
		background: #ffffff;
		border: 1px solid rgba(226, 232, 240, 0.8);
		border-radius: 16px;
		padding: 24px;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
		margin-bottom: 24px !important;
		position: relative;
		overflow: hidden;
	}
	:global(main header.mb-6::before) {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(to right, #1e3a8a, #f59e0b); /* Blue & Yellow LGU gradient */
	}

	/* Global card improvements for all sections & articles */
	:global(main .card),
	:global(main article),
	:global(main section.rounded-lg) {
		position: relative;
		border: 1px solid rgba(226, 232, 240, 0.8) !important;
		background: #ffffff !important;
		border-radius: 16px !important;
		padding: 24px !important;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05) !important;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
		overflow: hidden;
	}

	:global(main .card:hover),
	:global(main article:hover),
	:global(main section.rounded-lg:hover) {
		box-shadow:
			0 10px 25px -5px rgba(0, 0, 0, 0.05),
			0 8px 10px -6px rgba(0, 0, 0, 0.05) !important;
		border-color: #bfdbfe !important;
		transform: translateY(-2px);
	}

	/* Top LGU-blue border line indicator on cards */
	:global(main .card::before),
	:global(main article::before),
	:global(main section.rounded-lg::before) {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(to right, #1e3a8a, #3b82f6);
	}

	/* Styled list markers for lists inside cards */
	:global(main ul.list-disc) {
		list-style: none !important;
		padding-left: 0 !important;
	}
	:global(main ul.list-disc li) {
		position: relative;
		padding-left: 1.5rem;
		margin-bottom: 0.5rem;
	}
	:global(main ul.list-disc li::before) {
		content: '•';
		color: #3b82f6; /* Blue bullet */
		font-weight: bold;
		font-size: 1.25rem;
		position: absolute;
		left: 0.25rem;
		top: -0.15rem;
	}

	/* Styled step list items */
	:global(main ol.list-decimal) {
		list-style: none !important;
		padding-left: 0 !important;
	}
	:global(main ol.list-decimal li) {
		position: relative;
		padding-left: 2rem;
		margin-bottom: 0.75rem;
		background: #f8fafc;
		padding: 12px 16px 12px 2.5rem;
		border-radius: 12px;
		border: 1px solid #f1f5f9;
	}
	:global(main ol.list-decimal li::before) {
		counter-increment: section;
		content: counter(section);
		background: #3b82f6;
		color: #ffffff;
		font-weight: bold;
		font-size: 0.75rem;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 9999px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0.75rem;
		top: 0.9rem;
	}

	/* Clean styling for standard sub-buttons */
	:global(main button.rounded.border) {
		background: #ffffff !important;
		border: 1px solid #e2e8f0 !important;
		border-radius: 10px !important;
		padding: 8px 16px !important;
		font-weight: 600 !important;
		color: #475569 !important;
		transition: all 0.2s ease !important;
	}
	:global(main button.rounded.border:hover) {
		background: #f8fafc !important;
		border-color: #cbd5e1 !important;
		color: #1e293b !important;
	}
</style>
