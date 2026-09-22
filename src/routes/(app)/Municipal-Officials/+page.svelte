<script>
	import { onMount } from 'svelte';
	import OfficialCard from '$lib/OfficialCard.svelte';

	let { data } = $props();
	let gsap;

	onMount(async () => {
		document.title = 'Municipal Officials | Municipality of Tanauan, Leyte';
		const gsapModule = await import('gsap');
		gsap = gsapModule.default || gsapModule;
		const ScrollTriggerModule = await import('gsap/ScrollTrigger');
		const ScrollTrigger = ScrollTriggerModule.default || ScrollTriggerModule;
		gsap.registerPlugin(ScrollTrigger);

		gsap.utils.toArray('.fade-in').forEach((el, i) => {
			gsap.from(el, {
				opacity: 0,
				y: 30,
				duration: 0.8,
				ease: 'power2.out',
				delay: i * 0.05,
				scrollTrigger: {
					trigger: el,
					start: 'top 90%',
					toggleActions: 'play none none none'
				}
			});
		});
	});
</script>

<section class="min-h-screen bg-slate-900 py-16 text-white">
	<div class="mx-auto max-w-7xl px-6">
		<div class="text-center mb-12">
			<span class="rounded-full bg-yellow-400/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-yellow-400">
				Governance Hierarchy
			</span>
			<h1 class="fade-in mt-3 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
				Municipal Officials Directory
			</h1>
			<p class="fade-in mx-auto mt-2 max-w-2xl text-base text-slate-300">
				Elected and appointed public servants of the Municipality of Tanauan, Leyte.
			</p>
		</div>

		<!-- ================= EXECUTIVE BRANCH ================= -->
		<div class="mb-16 rounded-3xl border border-blue-500/20 bg-slate-950/60 p-8 shadow-2xl backdrop-blur-md">
			<div class="mb-8 border-b border-white/10 pb-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
				<div>
					<span class="text-xs font-bold uppercase tracking-widest text-blue-400">Local Chief Executive</span>
					<h2 class="text-2xl font-black text-white sm:text-3xl">The Executive Branch</h2>
				</div>
				<span class="rounded-full bg-blue-900/80 px-3 py-1 text-[11px] font-bold text-blue-200">
					Administration & Service Delivery
				</span>
			</div>

			<!-- Mayor -->
			{#if data.mayor}
				<div class="fade-in mb-8 text-center">
					<div class="mx-auto max-w-sm">
						<OfficialCard official={data.mayor} />
					</div>
				</div>
			{/if}

			<!-- Appointed Executive Heads -->
			{#if data.appointedOfficials && data.appointedOfficials.length > 0}
				<h3 class="fade-in mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
					Executive Department Heads & Appointed Officials
				</h3>
				<div class="fade-in grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each data.appointedOfficials as official}
						<OfficialCard {official} />
					{/each}
				</div>
			{/if}
		</div>

		<!-- ================= LEGISLATIVE BRANCH ================= -->
		<div class="mb-16 rounded-3xl border border-amber-500/20 bg-slate-950/60 p-8 shadow-2xl backdrop-blur-md">
			<div class="mb-8 border-b border-white/10 pb-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
				<div>
					<span class="text-xs font-bold uppercase tracking-widest text-amber-400">Policy-Making & Ordinances</span>
					<h2 class="text-2xl font-black text-white sm:text-3xl">The Legislative Branch (Sangguniang Bayan)</h2>
				</div>
				<span class="rounded-full bg-amber-900/80 px-3 py-1 text-[11px] font-bold text-amber-200">
					Presiding Officer & Councilors
				</span>
			</div>

			<!-- Vice Mayor -->
			{#if data.viceMayor}
				<div class="fade-in mb-10 text-center">
					<div class="mx-auto max-w-sm">
						<OfficialCard official={data.viceMayor} />
					</div>
				</div>
			{/if}

			<!-- Councilors -->
			{#if data.councilors && data.councilors.length > 0}
				<h3 class="fade-in mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
					Sangguniang Bayan Members (Municipal Councilors)
				</h3>
				<div class="fade-in grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each data.councilors as councilor}
						<OfficialCard official={councilor} />
					{/each}
				</div>
			{/if}
		</div>

		<!-- ================= BARANGAY OFFICIALS ================= -->
		{#if data.barangayOfficials && data.barangayOfficials.length > 0}
			<div class="rounded-3xl border border-white/10 bg-slate-950/40 p-8">
				<div class="mb-6 border-b border-white/10 pb-4">
					<span class="text-xs font-bold uppercase tracking-widest text-emerald-400">Community Leadership</span>
					<h2 class="text-2xl font-black text-white">Barangay Officials</h2>
				</div>
				<div class="fade-in grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each data.barangayOfficials as official}
						<OfficialCard {official} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>
