<script>
	import { onMount } from 'svelte';
	import PageHero from '$lib/Components/PageHero.svelte';

	let visible = $state(false);

	let { data } = $props();

	const months = [
		{ name: 'January', temp: 26.5, rain: 234, humidity: 86 },
		{ name: 'February', temp: 26.8, rain: 178, humidity: 84 },
		{ name: 'March', temp: 27.2, rain: 120, humidity: 81 },
		{ name: 'April', temp: 28.1, rain: 98, humidity: 79 },
		{ name: 'May', temp: 28.6, rain: 112, humidity: 80 },
		{ name: 'June', temp: 28.3, rain: 152, humidity: 83 },
		{ name: 'July', temp: 27.9, rain: 198, humidity: 85 },
		{ name: 'August', temp: 28.0, rain: 190, humidity: 86 },
		{ name: 'September', temp: 27.6, rain: 220, humidity: 87 },
		{ name: 'October', temp: 27.2, rain: 245, humidity: 88 },
		{ name: 'November', temp: 26.9, rain: 280, humidity: 89 },
		{ name: 'December', temp: 26.6, rain: 310, humidity: 90 }
	];

	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 100);
	});
</script>

<svelte:head>
	<title>Climate | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Climate data, weather patterns, monthly temperatures, rainfall, and humidity information for the Municipality of Tanauan, Leyte, Philippines."
	/>
</svelte:head>

<PageHero
	title="Climate"
	subtitle="Municipality of Tanauan, Leyte"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z' /></svg>"
/>

<section class="relative bg-slate-50 pt-8 pb-20">
	<div class="mx-auto max-w-6xl px-6 sm:px-10">
		<!-- Live Weather + Climate Type -->
		<div
			class="grid gap-6 lg:grid-cols-3"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease;"
		>
			<!-- Live Weather -->
			<div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
				<div class="mb-4 flex items-center gap-3">
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
								d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
							/></svg
						>
					</div>
					<div>
						<h2 class="font-bold text-slate-900">Current Weather</h2>
						<p class="text-xs text-slate-500">Live via WeatherAPI</p>
					</div>
				</div>

				{#if data?.climateData}
					<div class="flex items-center gap-4">
						<img src={data.climateData.condition.icon} alt="Weather icon" class="h-16 w-16" />
						<div>
							<p class="text-4xl font-bold text-slate-900">{data.climateData.temp_c}°C</p>
							<p class="text-sm text-slate-600">{data.climateData.condition.text}</p>
						</div>
					</div>
					<div class="mt-4 grid grid-cols-2 gap-3">
						<div class="rounded-lg bg-slate-50 p-3 text-center">
							<p class="text-xs text-slate-500">Humidity</p>
							<p class="text-lg font-bold text-blue-700">{data.climateData.humidity}%</p>
						</div>
						<div class="rounded-lg bg-slate-50 p-3 text-center">
							<p class="text-xs text-slate-500">Wind</p>
							<p class="text-lg font-bold text-blue-700">{data.climateData.wind_kph} kph</p>
						</div>
					</div>
				{:else}
					<div class="flex flex-col items-center justify-center py-6 text-center">
						<svg
							class="mb-2 h-10 w-10 text-slate-300"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
							/></svg
						>
						<p class="text-sm text-slate-400">Weather data currently unavailable</p>
					</div>
				{/if}
			</div>

			<!-- Climate Overview -->
			<div
				class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2"
			>
				<div class="mb-5 flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
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
								d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
							/></svg
						>
					</div>
					<h2 class="text-xl font-bold text-slate-900">Climate Overview</h2>
				</div>
				<div class="space-y-4 text-base leading-relaxed text-slate-600">
					<p>
						Tanauan features a <strong class="text-slate-800">tropical climate (Type II)</strong> in
						the Philippine climate classification, with no pronounced dry season and abundant rainfall
						mostly from November to January.
					</p>
					<p>
						Located along the eastern seaboard, the municipality is prone to monsoons and typhoons.
						Temperatures range between <strong class="text-slate-800">24°C to 32°C</strong> throughout
						the year with high humidity.
					</p>
					<p>
						This climate supports year-round farming and fishing. Residents are advised to stay
						alert during typhoon season and plan agricultural activities accordingly.
					</p>
				</div>

				<!-- Climate quick facts -->
				<div class="mt-6 grid grid-cols-3 gap-3">
					<div class="rounded-lg border border-slate-100 bg-slate-50 p-3 text-center">
						<p class="text-xs text-slate-500">Avg Temp</p>
						<p class="text-lg font-bold text-slate-800">27.5°C</p>
					</div>
					<div class="rounded-lg border border-slate-100 bg-slate-50 p-3 text-center">
						<p class="text-xs text-slate-500">Annual Rain</p>
						<p class="text-lg font-bold text-slate-800">2,337 mm</p>
					</div>
					<div class="rounded-lg border border-slate-100 bg-slate-50 p-3 text-center">
						<p class="text-xs text-slate-500">Avg Humidity</p>
						<p class="text-lg font-bold text-slate-800">85%</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Monthly Climate Table -->
		<div
			class="mt-10 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
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
								d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
							/></svg
						>
					</div>
					<div>
						<h2 class="text-xl font-bold text-slate-900">Monthly Climate Overview</h2>
						<p class="text-sm text-slate-500">Average temperature, rainfall & humidity</p>
					</div>
				</div>
			</div>

			<div class="overflow-x-auto p-6 pt-4 sm:p-8">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-slate-200">
							<th
								class="pr-4 pb-3 text-left text-xs font-semibold tracking-wider text-slate-500 uppercase"
								>Month</th
							>
							<th
								class="pr-4 pb-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase"
								>Avg Temp (°C)</th
							>
							<th
								class="pr-4 pb-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase"
								>Rainfall (mm)</th
							>
							<th
								class="pb-3 text-right text-xs font-semibold tracking-wider text-slate-500 uppercase"
								>Humidity (%)</th
							>
						</tr>
					</thead>
					<tbody class="text-slate-700">
						{#each months as month}
							<tr class="border-b border-slate-100 transition-colors hover:bg-slate-50">
								<td class="py-3 pr-4 font-medium">{month.name}</td>
								<td class="py-3 pr-4 text-right">
									<span class="inline-flex items-center gap-1">
										{month.temp}
										<span
											class="inline-block h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
											style:width="{(month.temp - 24) * 12}px"
										></span>
									</span>
								</td>
								<td class="py-3 pr-4 text-right">
									<span class="inline-flex items-center gap-1">
										{month.rain}
										<span
											class="inline-block h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
											style:width="{month.rain / 6}px"
										></span>
									</span>
								</td>
								<td class="py-3 text-right">{month.humidity}</td>
							</tr>
						{/each}
					</tbody>
				</table>
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
