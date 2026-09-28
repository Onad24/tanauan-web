<script>
	import { onMount } from 'svelte';
	import PageHero from '$lib/Components/PageHero.svelte';

	let { data } = $props();
	const rows = $derived(data?.rows || []);

	let visible = $state(false);
	let selectedYear = $state('All');
	let selectedIssuer = $state('All');

	// Milestone Awards (Timeline)
	const timelineAwards = [
		{
			year: '1998',
			title: 'Most Peaceful Municipality',
			desc: 'Recognized by the Philippine National Police (PNP) Region VIII for outstanding peace and order maintenance.',
			iconColor: 'bg-emerald-500'
		},
		{
			year: '2006',
			title: 'Most Business-Friendly Municipality',
			desc: 'Awarded during the Philippine Business Conference for streamline business permitting processes and economic support.',
			iconColor: 'bg-blue-600'
		},
		{
			year: '2015',
			title: 'Seal of Good Housekeeping',
			desc: 'Conferred by the Department of the Interior and Local Government (DILG) for transparency and fiscal management.',
			iconColor: 'bg-yellow-500'
		},
		{
			year: '2018',
			title: 'Seal of Good Local Governance',
			desc: 'The prestigious SGLG award from the DILG, recognizing performance across financial, disaster readiness, and social protection areas.',
			iconColor: 'bg-blue-900'
		},
		{
			year: '2020',
			title: 'Top 5 Most Competitive Municipality',
			desc: 'Ranked nationwide among 2nd Class Municipalities by the DTI Cities and Municipalities Competitiveness Index (CMCI).',
			iconColor: 'bg-purple-600'
		}
	];

	// Deriving unique filter values from loaded database rows
	let yearsList = $derived(
		['All', ...new Set(rows.map((a) => a.year?.toString()).filter(Boolean))].sort((a, b) => b - a)
	);
	let issuersList = $derived(
		['All', ...new Set(rows.map((a) => a.awarding_body).filter(Boolean))].sort()
	);

	// Filtered database awards
	let filteredRecentAwards = $derived(
		rows.filter((a) => {
			const matchesYear = selectedYear === 'All' || a.year?.toString() === selectedYear;
			const matchesIssuer = selectedIssuer === 'All' || a.awarding_body === selectedIssuer;
			return matchesYear && matchesIssuer;
		})
	);

	// Count statistics
	let totalCount = $derived(rows.length + timelineAwards.length);
	let recentCount = $derived(rows.length);

	onMount(async () => {
		setTimeout(() => {
			visible = true;
		}, 100);

		// GSAP counters & fade-in animations
		try {
			const { gsap } = await import('gsap');

			gsap.from('#totalCount', {
				innerText: 0,
				duration: 1.2,
				snap: { innerText: 1 },
				ease: 'power1.out'
			});
			gsap.from('#recentCount', {
				innerText: 0,
				duration: 1.2,
				snap: { innerText: 1 },
				ease: 'power1.out'
			});
			gsap.from('#milestoneCount', {
				innerText: 0,
				duration: 1.2,
				snap: { innerText: 1 },
				ease: 'power1.out'
			});

			gsap.from('.timeline-item', {
				opacity: 0,
				x: -20,
				duration: 0.6,
				stagger: 0.15,
				ease: 'power2.out',
				delay: 0.2
			});
		} catch (e) {
			console.error('Failed to run GSAP animations', e);
		}
	});
</script>

<svelte:head>
	<title>Awards & Distinctions | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Discover the milestones, national achievements, and citations received by the Municipality of Tanauan, Leyte, Philippines."
	/>
</svelte:head>

<PageHero
	title="Awards & Citations"
	subtitle="Celebrating civic excellence, good governance, and community milestones"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-6.75a1.125 1.125 0 00-1.125 1.125v3.375m9 0h-9M9 3.75h6M12 3.75v3m-3.375 0H15.37c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H8.625A1.125 1.125 0 017.5 10.125v-2.25c0-.621.504-1.125 1.125-1.125z' /></svg>"
/>

<section class="relative bg-slate-50 pt-8 pb-20">
	<div class="mx-auto max-w-6xl px-6 sm:px-10">
		<!-- Stats Cards Section -->
		<div
			class="mb-10 grid gap-6 sm:grid-cols-3"
			class:opacity-0={!visible}
			class:opacity-100={visible}
			style="transition: all 500ms ease;"
		>
			<div
				class="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
			>
				<div>
					<p class="text-xs font-semibold tracking-wider text-slate-500 uppercase">
						Total Distinctions
					</p>
					<h3 id="totalCount" class="mt-2 text-4xl font-extrabold text-blue-900">{totalCount}</h3>
				</div>
				<span class="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500"
					>Milestones and recent awards combined</span
				>
			</div>

			<div
				class="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
			>
				<div>
					<p class="text-xs font-semibold tracking-wider text-slate-500 uppercase">
						Recent Citations
					</p>
					<h3 id="recentCount" class="mt-2 text-4xl font-extrabold text-blue-900">{recentCount}</h3>
				</div>
				<span class="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500"
					>Fetched from municipal records database</span
				>
			</div>

			<div
				class="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md"
			>
				<div>
					<p class="text-xs font-semibold tracking-wider text-slate-500 uppercase">
						Historical Milestones
					</p>
					<h3 id="milestoneCount" class="mt-2 text-4xl font-extrabold text-blue-900">
						{timelineAwards.length}
					</h3>
				</div>
				<span class="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500"
					>Key legacy recognitions since 1998</span
				>
			</div>
		</div>

		<!-- Historical Timeline Section -->
		<div
			class="mb-12 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 100ms;"
		>
			<div class="mb-8 flex items-center gap-3">
				<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-900">
					<svg
						class="h-5 w-5"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
				</div>
				<div>
					<h2 class="text-xl font-bold text-slate-900">Historical Milestones</h2>
					<p class="text-xs font-medium text-slate-500">
						Tracing the legacy of excellence of Tanauan
					</p>
				</div>
			</div>

			<!-- Vertical Timeline -->
			<div class="relative ml-4 space-y-8 border-l border-slate-200 pl-6">
				{#each timelineAwards as award}
					<div class="timeline-item relative">
						<!-- Timeline Node dot -->
						<div
							class="absolute top-1 -left-[31px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-blue-900 shadow-sm ring-4 ring-slate-50"
						></div>

						<div
							class="rounded-xl border border-slate-100 bg-slate-50 p-5 transition-colors hover:bg-slate-100/50"
						>
							<div class="flex flex-wrap items-center gap-3">
								<span
									class="rounded-full px-2.5 py-0.5 text-xs font-extrabold text-white {award.iconColor}"
								>
									{award.year}
								</span>
								<h3 class="text-base font-bold text-slate-900">{award.title}</h3>
							</div>
							<p class="mt-2 text-sm leading-relaxed text-slate-600">{award.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Filter and Grid Sections -->
		<div
			class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 200ms;"
		>
			<div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div class="flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600"
					>
						<svg
							class="h-5 w-5"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							/></svg
						>
					</div>
					<div>
						<h2 class="text-xl font-bold text-slate-900">Recent Citations Registry</h2>
						<p class="text-xs font-medium text-slate-500">
							Verify official plaques, certifications, and project-based awards
						</p>
					</div>
				</div>

				<!-- Custom Filter Selects -->
				<div class="flex flex-wrap gap-3">
					<!-- Year Select -->
					<div class="flex items-center gap-2">
						<label for="year-select" class="text-xs font-bold text-slate-500 uppercase">Year</label>
						<select
							id="year-select"
							bind:value={selectedYear}
							class="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
						>
							{#each yearsList as year}
								<option value={year}>{year}</option>
							{/each}
						</select>
					</div>

					<!-- Awarding Body Select -->
					<div class="flex items-center gap-2">
						<label for="issuer-select" class="text-xs font-bold text-slate-500 uppercase"
							>Issuer</label
						>
						<select
							id="issuer-select"
							bind:value={selectedIssuer}
							class="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
						>
							{#each issuersList as issuer}
								<option value={issuer}>{issuer}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>

			<!-- Dynamic Awards Grid -->
			{#if filteredRecentAwards.length > 0}
				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each filteredRecentAwards as award}
						{@const mediaUrl = award.media ? award.media.toString().split(',')[0] : ''}
						<div
							class="group hover:border-slate-350 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
						>
							<!-- Image wrapper with Zoom effect or beautiful gradient fallback -->
							<div
								class="relative flex h-44 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 to-blue-950"
							>
								{#if mediaUrl}
									<img
										src={mediaUrl}
										alt={award.award}
										class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										loading="lazy"
									/>
								{:else}
									<div
										class="absolute inset-0 opacity-[0.03]"
										style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;1&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"
									></div>
									<div class="flex flex-col items-center p-4 text-center">
										<svg
											class="mb-2 h-10 w-10 text-yellow-400/90"
											fill="none"
											stroke="currentColor"
											stroke-width="1.5"
											viewBox="0 0 24 24"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-6.75a1.125 1.125 0 00-1.125 1.125v3.375m9 0h-9M9 3.75h6M12 3.75v3m-3.375 0H15.37c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H8.625A1.125 1.125 0 017.5 10.125v-2.25c0-.621.504-1.125 1.125-1.125z"
											/></svg
										>
										<span class="text-[10px] font-bold tracking-widest text-blue-200/55 uppercase"
											>Official Recognition</span
										>
									</div>
								{/if}

								<!-- Year Badge overlay -->
								<span
									class="absolute top-3 right-3 rounded-md border border-slate-100 bg-white/90 px-2 py-0.5 text-[10px] font-extrabold text-slate-800 shadow-sm backdrop-blur-sm"
								>
									{award.year}
								</span>
							</div>

							<!-- Content -->
							<div class="flex flex-grow flex-col justify-between p-5">
								<div>
									<h3
										class="line-clamp-1 text-base font-bold text-slate-900 transition-colors group-hover:text-blue-900"
									>
										{award.award}
									</h3>
									<span
										class="mt-1.5 inline-block rounded bg-blue-50 px-2 py-0.5 text-[11px] font-bold tracking-wide text-blue-600 uppercase"
									>
										{award.awarding_body}
									</span>
									<p class="mt-3.5 line-clamp-3 text-sm leading-relaxed text-slate-600">
										{award.description || 'No description provided.'}
									</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="rounded-2xl border border-dashed border-slate-200 py-16 text-center">
					<svg
						class="mx-auto mb-3 h-10 w-10 text-slate-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<h3 class="text-sm font-semibold text-slate-800">No matching awards</h3>
					<p class="mt-1 text-xs text-slate-500">Try resetting the filter criteria above.</p>
				</div>
			{/if}
		</div>
	</div>
</section>
