<script>
	import { onMount } from 'svelte';
	import PageHero from '$lib/Components/PageHero.svelte';

	let visible = $state(false);

	onMount(() => {
		// Trigger staggered entrance animations
		setTimeout(() => {
			visible = true;
		}, 100);
	});
</script>

<svelte:head>
	<title>Vision & Mission | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="The official Vision, Mission, Core Values, and Quality Policy of the Municipal Government of Tanauan, Leyte, Philippines."
	/>
</svelte:head>

<PageHero
	title="Vision & Mission"
	subtitle="Municipality of Tanauan, Leyte"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' /></svg>"
/>

<!-- Main Content -->
<section class="relative bg-slate-50 pt-8 pb-24">
	<div class="mx-auto max-w-6xl px-6 sm:px-10">
		<!-- Vision & Mission Grid -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<!-- VISION CARD -->
			<div
				class="group relative rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-500 hover:border-blue-200 hover:shadow-lg"
				class:opacity-0={!visible}
				class:translate-y-6={!visible}
				class:opacity-100={visible}
				class:translate-y-0={visible}
				style="transition-delay: 0ms;"
			>
				<!-- Accent top bar -->
				<div
					class="absolute top-0 right-8 left-8 h-1 rounded-b-full bg-gradient-to-r from-blue-600 to-blue-400"
				></div>

				<!-- Icon + Label -->
				<div class="mb-6 flex items-center gap-4">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white"
					>
						<svg
							class="h-6 w-6"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					</div>
					<div>
						<span class="text-xs font-semibold tracking-widest text-blue-600 uppercase">Our</span>
						<h2 class="text-2xl font-bold tracking-tight text-slate-900">Vision</h2>
					</div>
				</div>

				<!-- Content -->
				<p class="text-base leading-relaxed text-slate-600">
					Tanauan by 2032, a <strong class="text-slate-800">1st class municipality</strong> which is
					a premier tourism destination, education hub, and an investment haven in the province of Leyte
					— inhabited by a healthy and empowered citizenry living in peaceful and resilient communities;
					with a competitive, diversified, dynamic, and inclusive economy; a disaster-proof, quality,
					and adequate social support and infrastructure system; and an ecologically balanced, sustainable,
					and aesthetic environment — under an effective and efficient participatory and people-centered
					leadership with a strong political will.
				</p>
			</div>

			<!-- MISSION CARD -->
			<div
				class="group relative rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-500 hover:border-yellow-200 hover:shadow-lg"
				class:opacity-0={!visible}
				class:translate-y-6={!visible}
				class:opacity-100={visible}
				class:translate-y-0={visible}
				style="transition-delay: 120ms;"
			>
				<!-- Accent top bar -->
				<div
					class="absolute top-0 right-8 left-8 h-1 rounded-b-full bg-gradient-to-r from-yellow-500 to-yellow-400"
				></div>

				<!-- Icon + Label -->
				<div class="mb-6 flex items-center gap-4">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 transition-colors duration-300 group-hover:bg-yellow-500 group-hover:text-white"
					>
						<svg
							class="h-6 w-6"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
							/>
						</svg>
					</div>
					<div>
						<span class="text-xs font-semibold tracking-widest text-yellow-600 uppercase">Our</span>
						<h2 class="text-2xl font-bold tracking-tight text-slate-900">Mission</h2>
					</div>
				</div>

				<!-- Content -->
				<p class="text-base leading-relaxed text-slate-600">
					The Municipal Government of Tanauan shall take the lead in the
					<strong class="text-slate-800">integration and implementation</strong> of programs, projects,
					and activities; promote strong multi-sectoral level partnerships; and mobilize resources through
					a strong political will and unity of purpose.
				</p>
			</div>
		</div>

		<!-- CORE VALUES Section -->
		<div
			class="mt-12"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 240ms;"
		>
			<div class="mb-8 text-center">
				<span
					class="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-blue-700 uppercase"
				>
					<svg
						class="h-3.5 w-3.5"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
						/>
					</svg>
					Guiding Principles
				</span>
				<h2 class="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
					Core Values
				</h2>
			</div>

			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
				<!-- Integrity -->
				<div
					class="group flex flex-col items-center rounded-xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
				>
					<div
						class="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white"
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
								d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
							/>
						</svg>
					</div>
					<h3 class="text-sm font-bold text-slate-800">Integrity</h3>
					<p class="mt-1 text-xs text-slate-500">Honest & transparent governance</p>
				</div>

				<!-- Excellence -->
				<div
					class="group flex flex-col items-center rounded-xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-200 hover:shadow-md"
				>
					<div
						class="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 transition-colors group-hover:bg-yellow-500 group-hover:text-white"
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
								d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-2.77.896m5.25-6.624V2.721"
							/>
						</svg>
					</div>
					<h3 class="text-sm font-bold text-slate-800">Excellence</h3>
					<p class="mt-1 text-xs text-slate-500">Striving for the highest standards</p>
				</div>

				<!-- Accountability -->
				<div
					class="group flex flex-col items-center rounded-xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
				>
					<div
						class="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white"
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
								d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
							/>
						</svg>
					</div>
					<h3 class="text-sm font-bold text-slate-800">Accountability</h3>
					<p class="mt-1 text-xs text-slate-500">Responsible public service</p>
				</div>

				<!-- Teamwork -->
				<div
					class="group flex flex-col items-center rounded-xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-200 hover:shadow-md"
				>
					<div
						class="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 transition-colors group-hover:bg-yellow-500 group-hover:text-white"
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
								d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
							/>
						</svg>
					</div>
					<h3 class="text-sm font-bold text-slate-800">Teamwork</h3>
					<p class="mt-1 text-xs text-slate-500">Collaborative partnerships</p>
				</div>

				<!-- Service -->
				<div
					class="group flex flex-col items-center rounded-xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
				>
					<div
						class="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white"
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
								d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
							/>
						</svg>
					</div>
					<h3 class="text-sm font-bold text-slate-800">Service</h3>
					<p class="mt-1 text-xs text-slate-500">People-centered approach</p>
				</div>

				<!-- Resilience -->
				<div
					class="group flex flex-col items-center rounded-xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-200 hover:shadow-md"
				>
					<div
						class="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 transition-colors group-hover:bg-yellow-500 group-hover:text-white"
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
								d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
							/>
						</svg>
					</div>
					<h3 class="text-sm font-bold text-slate-800">Resilience</h3>
					<p class="mt-1 text-xs text-slate-500">Disaster-ready communities</p>
				</div>
			</div>
		</div>

		<!-- QUALITY POLICY Section -->
		<div
			class="mt-12"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 360ms;"
		>
			<div
				class="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm"
			>
				<!-- Decorative side accent -->
				<div
					class="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-blue-600 via-yellow-400 to-blue-600"
				></div>

				<div class="p-8 pl-10 sm:p-10 sm:pl-12">
					<div class="flex items-start gap-5">
						<div
							class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/20"
						>
							<svg
								class="h-7 w-7"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
								/>
							</svg>
						</div>
						<div class="flex-1">
							<h2 class="text-2xl font-bold tracking-tight text-slate-900">Quality Policy</h2>
							<p class="mt-1 text-sm text-slate-500">Our commitment to quality public service</p>
						</div>
					</div>

					<div class="mt-8 grid gap-6 sm:grid-cols-2">
						<div class="flex items-start gap-3">
							<div
								class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
							>
								<svg
									class="h-4 w-4"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
									/>
								</svg>
							</div>
							<div>
								<h4 class="text-sm font-semibold text-slate-800">Competent Leadership</h4>
								<p class="mt-0.5 text-sm text-slate-500">
									Qualified public servants dedicated to effective governance
								</p>
							</div>
						</div>

						<div class="flex items-start gap-3">
							<div
								class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600"
							>
								<svg
									class="h-4 w-4"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
									/>
								</svg>
							</div>
							<div>
								<h4 class="text-sm font-semibold text-slate-800">Continuous Improvement</h4>
								<p class="mt-0.5 text-sm text-slate-500">
									Regularly enhancing systems and processes for better service delivery
								</p>
							</div>
						</div>

						<div class="flex items-start gap-3">
							<div
								class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
							>
								<svg
									class="h-4 w-4"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
									/>
								</svg>
							</div>
							<div>
								<h4 class="text-sm font-semibold text-slate-800">Citizen Satisfaction</h4>
								<p class="mt-0.5 text-sm text-slate-500">
									Prioritizing the needs of every Tanauanon in all our programs
								</p>
							</div>
						</div>

						<div class="flex items-start gap-3">
							<div
								class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600"
							>
								<svg
									class="h-4 w-4"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
									/>
								</svg>
							</div>
							<div>
								<h4 class="text-sm font-semibold text-slate-800">Sustainable Development</h4>
								<p class="mt-0.5 text-sm text-slate-500">
									Balancing growth with environmental responsibility and resilience
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- DICT Compliance Notice -->
		<div
			class="mt-10 flex items-center justify-center gap-3 text-center text-xs text-slate-400"
			class:opacity-0={!visible}
			class:opacity-100={visible}
			style="transition: opacity 500ms ease; transition-delay: 480ms;"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
				/>
			</svg>
			<span>This page complies with DICT Philippine Government Website Standards</span>
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
