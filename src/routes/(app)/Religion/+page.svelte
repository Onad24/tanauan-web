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
	<title>Religion | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Religious life, denominations, parish history, festivals, and spiritual heritage of the Municipality of Tanauan, Leyte, Philippines."
	/>
</svelte:head>

<PageHero
	title="Religious Life"
	subtitle="Municipality of Tanauan, Leyte"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' /></svg>"
/>

<section class="relative bg-slate-50 pt-8 pb-20">
	<div class="mx-auto max-w-6xl px-6 sm:px-10">
		<!-- Intro + Church Image -->
		<div
			class="grid gap-8 lg:grid-cols-5"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease;"
		>
			<!-- Text Content -->
			<div
				class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3"
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
								d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
							/></svg
						>
					</div>
					<h2 class="text-xl font-bold text-slate-900">Faith & Spiritual Heritage</h2>
				</div>
				<div class="space-y-4 text-base leading-relaxed text-slate-600">
					<p>
						Religion plays a vital role in the lives of the people of Tanauan. Predominantly <strong
							class="text-slate-800">Roman Catholic</strong
						>, the town's spiritual life is centered around the
						<strong class="text-slate-800">Assumption of Our Lady Parish Church</strong>, one of the
						oldest in Leyte, founded in the early 18th century.
					</p>
					<p>
						This historic church stands as a symbol of faith and community resilience, having
						survived natural disasters and wars through centuries of devotion.
					</p>
				</div>
			</div>

			<!-- Church Image -->
			<div class="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm lg:col-span-2">
				<img
					src="/Tourism/church-2.jpg"
					alt="Assumption of Our Lady Church, Tanauan"
					class="h-full w-full object-cover"
					loading="lazy"
				/>
			</div>
		</div>

		<!-- Parish History & Festivities -->
		<div
			class="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 120ms;"
		>
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
							d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
						/></svg
					>
				</div>
				<h2 class="text-xl font-bold text-slate-900">Parish History & Festivities</h2>
			</div>
			<div class="grid gap-6 lg:grid-cols-2">
				<div class="text-base leading-relaxed text-slate-600">
					<p>
						The town celebrates its annual fiesta every <strong class="text-slate-800"
							>August 15</strong
						>, the Feast of the Assumption, with religious processions, novenas, and community
						events.
					</p>
					<p class="mt-3">
						In 2025, the parish celebrated its <strong class="text-slate-800"
							>315th year anniversary</strong
						> with major activities like food drives, inter-barangay masses, and youth catechism workshops.
					</p>
				</div>
				<div class="text-base leading-relaxed text-slate-600">
					<p>
						The church architecture features <strong class="text-slate-800"
							>Spanish colonial influences</strong
						> and continues to be restored as a national cultural treasure under the National Historical
						Commission.
					</p>
				</div>
			</div>
		</div>

		<!-- Religious Denominations -->
		<div
			class="mt-8"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 240ms;"
		>
			<div class="mb-6 text-center">
				<span
					class="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-blue-700 uppercase"
				>
					<svg
						class="h-3.5 w-3.5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
						/></svg
					>
					Religious Communities
				</span>
				<h2 class="mt-3 text-2xl font-bold tracking-tight text-slate-900">Denominations</h2>
			</div>

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each [{ name: 'Roman Catholic', pct: '~85%', desc: 'Main spiritual hub: Assumption of Our Lady Parish', color: 'blue' }, { name: 'Iglesia ni Cristo', pct: '', desc: 'Growing community, especially in southern barangays', color: 'yellow' }, { name: 'Born Again / Evangelicals', pct: '', desc: 'Small churches in poblacion and barangay centers', color: 'blue' }, { name: 'Seventh-day Adventists', pct: '', desc: 'Active in education and community health missions', color: 'yellow' }, { name: "Jehovah's Witnesses", pct: '', desc: 'Present in remote barangays with regular Bible studies', color: 'blue' }] as denom}
					<div
						class="group rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-{denom.color ===
						'blue'
							? 'blue'
							: 'yellow'}-200"
					>
						<div class="mb-2 flex items-center justify-between">
							<h3 class="font-bold text-slate-800">{denom.name}</h3>
							{#if denom.pct}
								<span class="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700"
									>{denom.pct}</span
								>
							{/if}
						</div>
						<p class="text-sm text-slate-500">{denom.desc}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Recent Developments -->
		<div
			class="mt-10 rounded-2xl border border-slate-200/80 bg-white shadow-sm"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 360ms;"
		>
			<div class="border-b border-slate-100 p-6 pb-5 sm:p-8">
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
								d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
							/></svg
						>
					</div>
					<div>
						<h2 class="text-xl font-bold text-slate-900">Recent Developments</h2>
						<p class="text-sm text-slate-500">2024–2025</p>
					</div>
				</div>
			</div>

			<div class="p-6 sm:p-8">
				<div class="relative space-y-6 border-l-2 border-yellow-300 pl-8">
					{#each [{ date: 'June 2025', title: 'Interfaith Unity Gathering', desc: 'More than 10 local churches joined a town-sponsored event promoting religious dialogue and cooperation.' }, { date: 'March 2024', title: 'Youth Formation Programs', desc: 'Over 200 young people completed religious education programs led by the Catholic and Evangelical youth ministries.' }, { date: 'January 2024', title: 'Church Restoration Project', desc: 'Major renovations to preserve the historic Assumption Parish with funding from the National Historical Commission.' }] as event}
						<div class="relative">
							<div
								class="absolute top-1 -left-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-yellow-400 bg-white"
							>
								<div class="h-2 w-2 rounded-full bg-yellow-400"></div>
							</div>
							<div>
								<span class="text-xs font-semibold tracking-wider text-yellow-600 uppercase"
									>{event.date}</span
								>
								<h3 class="mt-0.5 font-bold text-slate-800">{event.title}</h3>
								<p class="mt-1 text-sm text-slate-600">{event.desc}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Source -->
		<p class="mt-8 text-center text-xs text-slate-400 italic">
			Last updated: July 2025 · Sources: Parish Archives · LGU Reports · PSA Eastern Visayas
		</p>
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
