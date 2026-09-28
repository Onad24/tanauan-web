<script>
	import { onMount } from 'svelte';
	import PageHero from '$lib/Components/PageHero.svelte';

	let visible = $state(false);
	let searchQuery = $state('');
	let selectedCategory = $state('All');

	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 100);
	});

	const categories = ['All', 'Greetings', 'Dining & Shopping', 'Directions', 'Useful Expressions'];

	const phrases = [
		{
			english: 'Good morning',
			tagalog: 'Magandang umaga',
			waray: 'Maupay nga aga',
			category: 'Greetings'
		},
		{
			english: 'Good afternoon',
			tagalog: 'Magandang hapon',
			waray: 'Maupay nga kulop',
			category: 'Greetings'
		},
		{
			english: 'Good evening',
			tagalog: 'Magandang gabi',
			waray: 'Maupay nga gab-i',
			category: 'Greetings'
		},
		{
			english: 'Thank you very much',
			tagalog: 'Maraming salamat',
			waray: 'Damo nga salamat',
			category: 'Useful Expressions'
		},
		{
			english: 'How are you?',
			tagalog: 'Kumusta ka?',
			waray: 'Kumusta ka?',
			category: 'Greetings'
		},
		{
			english: 'I am fine, thank you',
			tagalog: 'Mabuti naman, salamat',
			waray: 'Maupay man, salamat',
			category: 'Useful Expressions'
		},
		{
			english: 'What is your name?',
			tagalog: 'Ano ang pangalan mo?',
			waray: 'Ano ang ngaran mo?',
			category: 'Greetings'
		},
		{
			english: 'How much is this?',
			tagalog: 'Magkano ito?',
			waray: 'Tagpira ini?',
			category: 'Dining & Shopping'
		},
		{
			english: 'Where is the municipal hall?',
			tagalog: 'Saan ang munisipyo?',
			waray: 'Hain an munisipyo?',
			category: 'Directions'
		},
		{ english: 'Delicious', tagalog: 'Masarap', waray: 'Makarasa', category: 'Dining & Shopping' },
		{ english: 'Yes', tagalog: 'Oo', waray: 'Oo', category: 'Useful Expressions' },
		{ english: 'No', tagalog: 'Hindi', waray: 'Dire', category: 'Useful Expressions' },
		{
			english: 'Goodbye',
			tagalog: 'Paalam',
			waray: 'Sige una na ako / Babay',
			category: 'Greetings'
		}
	];

	// Filtered phrases computed reactivity
	let filteredPhrases = $derived(
		phrases.filter((phrase) => {
			const matchesCategory = selectedCategory === 'All' || phrase.category === selectedCategory;
			const matchesSearch =
				phrase.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
				phrase.tagalog.toLowerCase().includes(searchQuery.toLowerCase()) ||
				phrase.waray.toLowerCase().includes(searchQuery.toLowerCase());
			return matchesCategory && matchesSearch;
		})
	);
</script>

<svelte:head>
	<title>Language & Communication | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Linguistic profile of Tanauan, Leyte. Learn about Waray-Waray, Filipino, and English usage, including an interactive language phrasebook."
	/>
</svelte:head>

<PageHero
	title="Language & Communication"
	subtitle="Linguistic heritage and communication landscape of Tanauan, Leyte"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01h18c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v7.01c0 .621.504 1.125 1.125 1.125zm.42 4.76c-.081-.27-.315-.49-.598-.54g.5-5.112v-2.025a1.125 1.125 0 011.64-1l3.58 2.149c.258.156.258.532 0 .688L5.14 17.51c-.267.16-.62.068-.7-.24z' /></svg>"
/>

<section class="relative bg-slate-50 pt-8 pb-20">
	<div class="mx-auto max-w-6xl px-6 sm:px-10">
		<!-- Introduction & Distribution Matrix -->
		<div
			class="grid gap-8 lg:grid-cols-12"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease;"
		>
			<!-- Description -->
			<div
				class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7"
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
								d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 006-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
							/></svg
						>
					</div>
					<h2 class="text-xl font-bold text-slate-900">Waray-Waray: The Soul of Tanauan</h2>
				</div>
				<div class="space-y-4 text-base leading-relaxed text-slate-600">
					<p>
						<strong class="font-semibold text-slate-900">Waray-Waray</strong> (specifically the Leyte-Waray
						dialect variant) is the primary native language spoken by nearly the entire population of
						Tanauan. It serves as the bedrock of everyday social interaction, trade, folk culture, and
						family life.
					</p>
					<p>
						Known for its phonetic expressive strength and rich vocabulary, Waray-Waray links
						contemporary Tanauanons directly to their ancestral roots in Eastern Visayas. It is
						widely spoken at home, in schools, and in community-level administration.
					</p>
				</div>
			</div>

			<!-- Literacy & Language Distribution Stats -->
			<div
				class="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:col-span-5"
			>
				<div>
					<h3 class="mb-4 text-lg font-bold text-slate-900">Linguistic Adaptability</h3>
					<div class="space-y-5">
						<!-- Waray-Waray Stat -->
						<div>
							<div class="mb-1.5 flex justify-between text-sm font-medium">
								<span class="text-slate-700">Waray-Waray (Native Language)</span>
								<span class="font-semibold text-blue-600">98.5%</span>
							</div>
							<div class="h-2.5 w-full rounded-full bg-slate-100">
								<div class="h-2.5 rounded-full bg-blue-600" style="width: 98.5%"></div>
							</div>
						</div>

						<!-- Tagalog/Filipino Stat -->
						<div>
							<div class="mb-1.5 flex justify-between text-sm font-medium">
								<span class="text-slate-700">Filipino / Tagalog (Bilingual)</span>
								<span class="font-semibold text-yellow-600">92.0%</span>
							</div>
							<div class="h-2.5 w-full rounded-full bg-slate-100">
								<div class="h-2.5 rounded-full bg-yellow-500" style="width: 92%"></div>
							</div>
						</div>

						<!-- English Stat -->
						<div>
							<div class="mb-1.5 flex justify-between text-sm font-medium">
								<span class="text-slate-700">English (Business & Education)</span>
								<span class="font-semibold text-emerald-600">85.5%</span>
							</div>
							<div class="h-2.5 w-full rounded-full bg-slate-100">
								<div class="h-2.5 rounded-full bg-emerald-600" style="width: 85.5%"></div>
							</div>
						</div>
					</div>
				</div>

				<div class="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500">
					* Estimates based on school registrations and regional demographic profiles indicating
					high levels of functional multilingual literacy.
				</div>
			</div>
		</div>

		<!-- Interactive Phrasebook -->
		<div
			class="mt-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 100ms;"
		>
			<div class="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
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
								d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v12a2.25 2.25 0 01-2.25 2.25H15M9 15.5h.008v.008H9v-.008z"
							/></svg
						>
					</div>
					<div>
						<h2 class="text-xl font-bold text-slate-900">Interactive Waray-Waray Phrasebook</h2>
						<p class="text-xs text-slate-500">
							Learn basic phrases used in daily conversations in Tanauan
						</p>
					</div>
				</div>

				<!-- Search Input -->
				<div class="relative w-full max-w-xs">
					<span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<svg
							class="h-4 w-4 text-slate-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/></svg
						>
					</span>
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search translations..."
						class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-4 pl-9 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
				</div>
			</div>

			<!-- Categories tabs -->
			<div class="mb-6 flex flex-wrap gap-2 border-b border-slate-100 pb-2">
				{#each categories as category}
					<button
						onclick={() => (selectedCategory = category)}
						class="rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 {selectedCategory ===
						category
							? 'border-blue-900 bg-blue-900 text-white shadow-sm'
							: 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'}"
					>
						{category}
					</button>
				{/each}
			</div>

			<!-- Phrase Grid / Table -->
			<div class="border-slate-150 overflow-x-auto rounded-xl border">
				<table class="divide-slate-150 min-w-full divide-y text-left">
					<thead class="bg-slate-50">
						<tr>
							<th class="px-6 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase"
								>English</th
							>
							<th class="px-6 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase"
								>Tagalog / Filipino</th
							>
							<th
								class="bg-blue-50/50 px-6 py-3 text-xs font-semibold tracking-wider text-slate-700 uppercase"
								>Waray-Waray</th
							>
							<th class="px-6 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase"
								>Category</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-100 bg-white">
						{#if filteredPhrases.length > 0}
							{#each filteredPhrases as phrase}
								<tr class="transition-colors hover:bg-slate-50/50">
									<td class="px-6 py-4 text-sm font-medium text-slate-900">{phrase.english}</td>
									<td class="px-6 py-4 text-sm text-slate-600">{phrase.tagalog}</td>
									<td class="bg-blue-50/20 px-6 py-4 text-sm font-bold text-blue-900"
										>{phrase.waray}</td
									>
									<td class="px-6 py-4 text-xs text-slate-500">
										<span
											class="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-800"
										>
											{phrase.category}
										</span>
									</td>
								</tr>
							{/each}
						{:else}
							<tr>
								<td colspan="4" class="px-6 py-10 text-center text-sm text-slate-400">
									No phrases found matching "{searchQuery}"
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>

		<!-- Educational and Cultural Sections -->
		<div
			class="mt-8 grid gap-8 lg:grid-cols-2"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 200ms;"
		>
			<!-- Mother Tongue-Based Multilingual Education (MTB-MLE) -->
			<div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
				<div class="mb-5 flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"
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
								d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.9c2.785 0 5.5-.468 8.231-1.377.3-.1.492-.37.492-.697 0-2.113-.19-4.22-.57-6.28A18.518 18.518 0 0012 5.822c-2.916 0-5.717.678-8.21 1.956L12 12l7.95-4.225"
							/></svg
						>
					</div>
					<h3 class="text-lg font-bold text-slate-900">MTB-MLE Program in Schools</h3>
				</div>
				<div class="space-y-4 text-base leading-relaxed text-slate-600">
					<p>
						In alignment with the Philippine Department of Education (DepEd), Tanauan's elementary
						schools implement the <strong class="text-slate-800"
							>Mother Tongue-Based Multilingual Education (MTB-MLE)</strong
						> framework.
					</p>
					<p>
						In the early stages of primary education (Kindergarten to Grade 3), Waray-Waray is the
						primary medium of instruction. This helps young learners develop solid literacy
						foundations in their native tongue before gradually transitioning to Filipino and
						English. This bilingual policy is proven to yield stronger comprehension and respect for
						heritage.
					</p>
				</div>
			</div>

			<!-- Language in Governance & Communication -->
			<div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
				<div class="mb-5 flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-600"
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
								d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
							/></svg
						>
					</div>
					<h3 class="text-lg font-bold text-slate-900">Governance & Media Reach</h3>
				</div>
				<div class="space-y-4 text-base leading-relaxed text-slate-600">
					<p>
						Local announcements, public health campaigns, and community forums are typically
						conducted in <strong class="text-slate-800">Waray-Waray</strong> to maximize accessibility
						and engagement across all 54 barangays.
					</p>
					<p>
						Official municipal documentation, legal ordinances, and business licenses are formulated
						in <strong class="text-slate-800">English</strong>, with Filipino often used in
						ceremonial events. Regional media, including local FM radio channels and newspapers,
						operate in a hybrid format, ensuring clear communication reaches everyone.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
