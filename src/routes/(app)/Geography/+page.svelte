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
	<title>Geography | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Geographic profile, location, terrain, and transportation information of the Municipality of Tanauan, Leyte, Philippines."
	/>
</svelte:head>

<PageHero
	title="Geography"
	subtitle="Municipality of Tanauan, Leyte"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z' /></svg>"
/>

<section class="relative bg-slate-50 pt-8 pb-20">
	<div class="mx-auto max-w-6xl px-6 sm:px-10">
		<!-- Overview + Key Stats -->
		<div
			class="grid gap-8 lg:grid-cols-3"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease;"
		>
			<!-- Main Content -->
			<div class="lg:col-span-2">
				<div class="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
					<div class="mb-6 flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
						>
							<svg
								class="h-5 w-5"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
								/>
							</svg>
						</div>
						<h2 class="text-xl font-bold text-slate-900">Location Overview</h2>
					</div>
					<div class="space-y-4 text-base leading-relaxed text-slate-600">
						<p>
							Tanauan is located in the <strong class="text-slate-800">eastern part of Leyte</strong
							>, facing the Leyte Gulf. It is bordered by Palo to the north and Tolosa to the south.
						</p>
						<p>
							The terrain is mostly flat with some rolling hills in the western part. It has a total
							land area of <strong class="text-slate-800">78.63 square kilometers</strong>.
						</p>
						<p>
							Tanauan is accessible via the <strong class="text-slate-800">Maharlika Highway</strong
							> and is approximately 18 kilometers south of Tacloban City.
						</p>
					</div>
				</div>
			</div>

			<!-- Quick Stats Sidebar -->
			<div class="space-y-4">
				<div
					class="group rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
				>
					<div class="mb-2 flex items-center gap-2">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
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
									d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
								/><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
								/></svg
							>
						</div>
						<span class="text-xs font-semibold tracking-wider text-slate-400 uppercase"
							>Land Area</span
						>
					</div>
					<p class="text-2xl font-bold text-slate-900">78.63 km²</p>
					<p class="mt-1 text-xs text-slate-500">Coastal & inland zones</p>
				</div>

				<div
					class="group rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-yellow-200 hover:shadow-md"
				>
					<div class="mb-2 flex items-center gap-2">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600"
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
									d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z"
								/></svg
							>
						</div>
						<span class="text-xs font-semibold tracking-wider text-slate-400 uppercase"
							>Barangays</span
						>
					</div>
					<p class="text-2xl font-bold text-slate-900">54</p>
					<p class="mt-1 text-xs text-slate-500">Administrative divisions</p>
				</div>

				<div
					class="group rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md"
				>
					<div class="mb-2 flex items-center gap-2">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
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
									d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.375m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375"
								/></svg
							>
						</div>
						<span class="text-xs font-semibold tracking-wider text-slate-400 uppercase"
							>Distance</span
						>
					</div>
					<p class="text-2xl font-bold text-slate-900">~18 km</p>
					<p class="mt-1 text-xs text-slate-500">South of Tacloban City</p>
				</div>
			</div>
		</div>

		<!-- Topographic Map -->
		<div
			class="mt-10"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 120ms;"
		>
			<div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
				<div class="mb-5 flex items-center gap-3">
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
								d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
							/></svg
						>
					</div>
					<h2 class="text-xl font-bold text-slate-900">Topographic Map</h2>
				</div>
				<img
					src="/Topographic-Map.webp"
					alt="Topographic map of Tanauan, Leyte"
					class="w-full rounded-xl shadow-md"
					loading="lazy"
				/>
			</div>
		</div>

		<!-- Transportation Section -->
		<div
			class="mt-10"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 240ms;"
		>
			<div class="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
				<!-- Header -->
				<div class="border-b border-slate-100 p-6 pb-6 sm:p-8">
					<div class="flex items-center gap-3">
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
									d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.375m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375"
								/></svg
							>
						</div>
						<div>
							<h2 class="text-xl font-bold text-slate-900">Transportation</h2>
							<p class="text-sm text-slate-500">Connectivity & travel access</p>
						</div>
					</div>
				</div>

				<div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
					<!-- Travel Times -->
					<div>
						<h3
							class="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wider text-slate-500 uppercase"
						>
							<svg
								class="h-4 w-4 text-blue-500"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/></svg
							>
							Estimated Travel Times
						</h3>
						<div class="space-y-3">
							{#each [{ from: 'Tacloban City', time: '25–30 min', mode: 'Jeepney / Multicab' }, { from: 'Palo', time: '10–15 min', mode: 'Tricycle / Bus' }, { from: 'Tolosa', time: '15–20 min', mode: 'Jeepney / Van' }, { from: 'Ormoc City', time: '2–3 hrs', mode: 'Van / Bus' }, { from: 'Tacloban Airport', time: '~30 min', mode: 'Van / Taxi' }] as route}
								<div
									class="flex items-center justify-between rounded-lg border border-slate-100 p-3 transition-colors hover:bg-slate-50"
								>
									<div>
										<p class="text-sm font-semibold text-slate-800">From {route.from}</p>
										<p class="text-xs text-slate-500">{route.mode}</p>
									</div>
									<span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
										>{route.time}</span
									>
								</div>
							{/each}
						</div>
					</div>

					<!-- Transport Hub Image + Modes -->
					<div class="space-y-6">
						<img
							src="/AERIAL DRONE SHOTS/Transpo-hub.webp"
							alt="Tanauan Transportation Hub"
							class="w-full rounded-xl shadow-md"
							loading="lazy"
						/>

						<div>
							<h3
								class="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wider text-slate-500 uppercase"
							>
								<svg
									class="h-4 w-4 text-yellow-500"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.375m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375"
									/></svg
								>
								Available Modes
							</h3>
							<div class="grid grid-cols-2 gap-2">
								{#each ['Jeepneys & Multicabs', 'Tricycles', 'Habal-Habal', 'V-Hire (Vans)', 'Buses'] as mode}
									<div class="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
										<div class="h-1.5 w-1.5 rounded-full bg-yellow-400"></div>
										<span class="text-xs font-medium text-slate-700">{mode}</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Interactive Map -->
		<div
			class="mt-10"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 360ms;"
		>
			<div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
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
									d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
								/><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
								/></svg
							>
						</div>
						<h2 class="text-xl font-bold text-slate-900">Interactive Map</h2>
					</div>
				</div>
				<iframe
					class="h-80 w-full sm:h-96"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62808.52511199441!2d124.9703192!3d11.0668825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33085a05d5e5666b%3A0xb28df02dfb012397!2sTanauan%2C%20Leyte!5e0!3m2!1sen!2sph!4v1626525845623!5m2!1sen!2sph"
					allowfullscreen=""
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					title="Tanauan, Leyte Map"
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
