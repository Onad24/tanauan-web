<script>
	import { onMount } from 'svelte';
	import PageHero from '$lib/Components/PageHero.svelte';

	let visible = $state(false);

	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 100);
	});
</script>

<svelte:head>
	<title>Demographics | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Population statistics, age distribution, household data, and demographic trends of the Municipality of Tanauan, Leyte, Philippines."
	/>
</svelte:head>

<PageHero
	title="Demographics"
	subtitle="Municipality of Tanauan, Leyte"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' /></svg>"
/>

<section class="relative bg-slate-50 pt-8 pb-20">
	<div class="mx-auto max-w-6xl px-6 sm:px-10">
		<!-- Stat Cards Row -->
		<div
			class="grid grid-cols-2 gap-4 sm:grid-cols-4"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease;"
		>
			{#each [{ label: 'Population (2020)', value: '57,455', icon: 'users', color: 'blue' }, { label: 'Population (2024)', value: '60,212', icon: 'trending', color: 'yellow' }, { label: 'Barangays', value: '54', icon: 'building', color: 'blue' }, { label: 'Households', value: '13,518', icon: 'home', color: 'yellow' }] as stat}
				<div
					class="group rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-{stat.color ===
					'blue'
						? 'blue'
						: 'yellow'}-200"
				>
					<div
						class="mb-2 flex h-9 w-9 items-center justify-center rounded-lg {stat.color === 'blue'
							? 'bg-blue-50 text-blue-600'
							: 'bg-yellow-50 text-yellow-600'}"
					>
						{#if stat.icon === 'users'}
							<svg
								class="h-4 w-4"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
								/></svg
							>
						{:else if stat.icon === 'trending'}
							<svg
								class="h-4 w-4"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
								/></svg
							>
						{:else if stat.icon === 'building'}
							<svg
								class="h-4 w-4"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z"
								/></svg
							>
						{:else}
							<svg
								class="h-4 w-4"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
								/></svg
							>
						{/if}
					</div>
					<p class="text-2xl font-bold text-slate-900">{stat.value}</p>
					<p class="mt-0.5 text-xs text-slate-500">{stat.label}</p>
				</div>
			{/each}
		</div>

		<!-- Population Overview -->
		<div
			class="mt-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 120ms;"
		>
			<div class="mb-6 flex items-center gap-3">
				<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
					<svg
						class="h-5 w-5"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
						/></svg
					>
				</div>
				<h2 class="text-xl font-bold text-slate-900">Population Summary</h2>
			</div>

			<div class="space-y-3 text-base leading-relaxed text-slate-600">
				<p>
					According to the <strong class="text-slate-800"
						>2020 Census of Population and Housing</strong
					>, Tanauan has a population of <strong class="text-slate-800">57,455</strong> (1 May
					2020), spread across <strong class="text-slate-800">54 barangays</strong>, within a land
					area of approximately <strong class="text-slate-800">78.4 km²</strong>.
				</p>
				<p>
					The <strong class="text-slate-800">2024 official census</strong> shows growth to about
					<strong class="text-slate-800">60,212 residents</strong> as of 1 July 2024, a modest increase
					over four years.
				</p>
			</div>
		</div>

		<!-- Age & Sex Distribution Table -->
		<div
			class="mt-8 rounded-2xl border border-slate-200/80 bg-white shadow-sm"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 240ms;"
		>
			<div class="border-b border-slate-100 p-6 pb-5 sm:p-8">
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
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
							/></svg
						>
					</div>
					<div>
						<h2 class="text-xl font-bold text-slate-900">Age & Sex Distribution</h2>
						<p class="text-sm text-slate-500">2020 Census Data</p>
					</div>
				</div>
			</div>

			<div class="overflow-x-auto p-6 pt-4 sm:p-8">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-slate-200">
							<th
								class="pr-4 pb-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
								>Category</th
							>
							<th
								class="pr-4 pb-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase"
								>Count</th
							>
							<th
								class="pb-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase"
								>%</th
							>
						</tr>
					</thead>
					<tbody class="text-slate-700">
						{#each [{ cat: 'Total population', count: '57,455', pct: '100%', highlight: true }, { cat: '0–14 years', count: '18,420', pct: '~32.1%' }, { cat: '15–64 years', count: '35,450', pct: '~61.7%' }, { cat: '65+ years', count: '3,533', pct: '~6.1%' }, { cat: 'Males', count: '29,688', pct: '~51.7%' }, { cat: 'Females', count: '27,767', pct: '~48.3%' }] as row}
							<tr
								class="border-b border-slate-100 transition-colors hover:bg-slate-50 {row.highlight
									? 'bg-blue-50/50 font-semibold'
									: ''}"
							>
								<td class="py-3 pr-4">{row.cat}</td>
								<td class="py-3 pr-4 text-right font-medium">{row.count}</td>
								<td class="py-3 text-right">{row.pct}</td>
							</tr>
						{/each}
					</tbody>
				</table>
				<p class="mt-4 text-xs text-slate-400 italic">
					Source: PSA Eastern Visayas Special Release, May–July 2025.
				</p>
			</div>
		</div>

		<!-- Household, Language, Religion, Growth in grid -->
		<div
			class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 360ms;"
		>
			<!-- Household & Language -->
			<div class="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm">
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
						<svg
							class="h-4 w-4"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
							/></svg
						>
					</div>
					<h3 class="font-bold text-slate-800">Household & Language</h3>
				</div>
				<p class="text-sm leading-relaxed text-slate-600">
					As of the <strong>2015 Census</strong>, there were <strong>13,518 households</strong> with
					an average size of about <strong>4.1 persons</strong>. Most residents speak
					<strong>Waray-Waray</strong>, with Filipino and English widely understood.
				</p>
			</div>

			<!-- Religion & Livelihood -->
			<div class="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm">
				<div class="mb-4 flex items-center gap-3">
					<div
						class="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600"
					>
						<svg
							class="h-4 w-4"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
							/></svg
						>
					</div>
					<h3 class="font-bold text-slate-800">Religion & Livelihood</h3>
				</div>
				<p class="text-sm leading-relaxed text-slate-600">
					Predominantly <strong>Roman Catholic</strong>, with Iglesia ni Cristo, Evangelicals, and
					Protestants present. Major income sources include <strong>agriculture</strong>,
					<strong>fishing</strong>, and micro-enterprises.
				</p>
			</div>

			<!-- Population Growth -->
			<div
				class="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1"
			>
				<div class="mb-4 flex items-center gap-3">
					<div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
						<svg
							class="h-4 w-4"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
							/></svg
						>
					</div>
					<h3 class="font-bold text-slate-800">Population Growth</h3>
				</div>
				<div class="flex items-end gap-4">
					{#each [{ year: '2015', pop: '55,021', pct: 70 }, { year: '2020', pop: '57,455', pct: 82 }, { year: '2024', pop: '60,212', pct: 95 }] as bar}
						<div class="flex flex-1 flex-col items-center">
							<span class="mb-1 text-xs font-bold text-slate-800">{bar.pop}</span>
							<div
								class="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 transition-all"
								style="height: {bar.pct}px;"
							></div>
							<span class="mt-2 text-xs text-slate-500">{bar.year}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Interactive Dashboard -->
		<div
			class="mt-10 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 480ms;"
		>
			<div class="border-b border-slate-100 p-6 pb-5 sm:p-8">
				<div class="flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20"
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
								d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
							/></svg
						>
					</div>
					<div>
						<h2 class="text-xl font-bold text-slate-900">Interactive Dashboard</h2>
						<p class="text-sm text-slate-500">Explore demographic data interactively</p>
					</div>
				</div>
			</div>
			<div class="h-[450px] w-full sm:h-[600px]">
				<iframe
					src="https://lookerstudio.google.com/embed/reporting/4339f855-8037-445d-9cdb-bcfb105a7556/page/p_rvelqh5qhd"
					class="h-full w-full border-0"
					title="Demographics Dashboard"
					allowfullscreen
					sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
				></iframe>
			</div>
		</div>
	</div>
</section>

<style>
	.opacity-0 {
		opacity: 0;
	}
	.opacity-100 {
		opacity: 1;
	}
	.translate-y-6 {
		transform: translateY(1.5rem);
	}
	.translate-y-0 {
		transform: translateY(0);
	}
</style>
