<script>
	import { fade, slide } from 'svelte/transition';

	let activeModal = $state(null);
	let activeFilter = $state('all'); // 'all' | 'biodegradable' | 'recyclable' | 'residual' | 'special'
	let searchItem = $state('');

	const wasteCategories = [
		{
			id: 'biodegradable',
			index: '01',
			code: 'BIO-WASTE',
			tagalogTitle: 'NABUBULOK NA BASURA',
			englishTitle: 'BIODEGRADABLE WASTE',
			category: 'Organics & Compostables',
			badge: 'Compostable',
			accentBorder: 'border-t-amber-400',
			badgeColor: 'bg-amber-400 text-blue-950 font-black',
			icon: '🍂',
			pdfUrl: '/docs/menro/biodegradable-waste-guidelines.pdf',
			description:
				'Mga basurang nabubulok at organikong galing sa kusina, bakuran, at palengke na maaaring gawing pataba (compost) sa lupa.',
			items: [
				{ name: 'Balat ng prutas & gulay', desc: 'Fruit & vegetable peels, trimmings, spoiled produce' },
				{ name: 'Hasang', desc: 'Fish gills from kitchen food preparation' },
				{ name: 'Bituka at tinik ng isda', desc: 'Fish entrails, bones, and seafood offal' },
				{ name: 'Tuyong dahon', desc: 'Dry leaves, garden twigs, grass clippings' },
				{ name: 'Tirang pagkain', desc: 'Leftover cooked food, rice, vegetable scraps' },
				{ name: 'Atbp.,', desc: 'Eggshells, coffee grounds, iba pang nabubulok na bagay' }
			],
			disposalGuide:
				'Ihiwalay sa ibang basura. Maaaring ibaon sa bakuran o i-compost upang maging organikong pataba. Kinokolekta rin para sa municipal/barangay composting facility.',
			handlingRules: [
				'Huwag ihalo sa plastik, sachet, o di-nabubulok na balot.',
				'Patuluin ang sabaw o likido bago ilagay sa sisidlan.',
				'Maaaring gamitin bilang pataba sa mga pananim at urban garden.'
			]
		},
		{
			id: 'recyclable',
			index: '02',
			code: 'RECY-WASTE',
			tagalogTitle: 'NARERESIKLO NA BASURA',
			englishTitle: 'RECYCLABLE WASTE',
			category: 'Dry Recyclables & Commercial Materials',
			badge: 'Materials Recovery',
			accentBorder: 'border-t-blue-600',
			badgeColor: 'bg-blue-600 text-white font-black',
			icon: '♻️',
			pdfUrl: '/docs/menro/recyclable-waste-guidelines.pdf',
			description:
				'Mga tuyo at malinis na materyales na maaari pang gamitin muli, iproseso sa pabrika, o ibenta sa mga junk shop at MRF.',
			items: [
				{ name: 'Papel', desc: 'Newspapers, bond paper, books, magazines, notebooks' },
				{ name: 'Karton', desc: 'Corrugated boxes, cardboard packaging, egg trays' },
				{ name: 'Bote', desc: 'Glass bottles, glass jars, cullet, beverage bottles' },
				{ name: 'Tin cans', desc: 'Food tin cans, aluminum soft drink cans, metal covers' },
				{ name: 'Pet bottles', desc: 'Clear plastic drinking water and soda bottles' },
				{ name: 'Plastics', desc: 'Hard plastics, clean plastic containers, gallons' },
				{ name: 'Atbp.,', desc: 'Scrap metals, reusable dry containers' }
			],
			disposalGuide:
				'Siguruhing malinis at tuyo bago iimbak o ilabas. Dalhin sa Barangay Materials Recovery Facility (MRF) o ibenta sa mga accredited junk shop.',
			handlingRules: [
				'Banlawan at patuyuin ang mga bote at lata upang maiwasan ang amoy at insekto.',
				'Tupiin o i-compress ang mga karton at PET bottles upang makatipid sa espasyo.',
				'Ihiwalay ang basag na salamin at balutin nang maayos para sa kaligtasan.'
			]
		},
		{
			id: 'residual',
			index: '03',
			code: 'RESI-WASTE',
			tagalogTitle: 'DI-NARERESIKLO NA BASURA',
			englishTitle: 'RESIDUAL WASTE',
			category: 'Sanitary Landfill Disposal',
			badge: 'Municipal Landfill',
			accentBorder: 'border-t-amber-500',
			badgeColor: 'bg-amber-500 text-blue-950 font-black',
			icon: '🗑️',
			pdfUrl: '/docs/menro/residual-waste-guidelines.pdf',
			description:
				'Mga basurang hindi na maaaring gawing kompos at hindi na nareresiklo. Ito ang tanging basurang kinokolekta ng MENRO truck patungo sa Sanitary Landfill.',
			items: [
				{ name: 'Sanitary napkins', desc: 'Feminine hygiene pads and pantyliners' },
				{ name: 'Disposable diapers', desc: 'Used baby diapers and adult incontinence pads' },
				{ name: 'Sachet', desc: 'Single-use shampoo, coffee, milk, and seasoning packets' },
				{ name: 'Balat ng kendi', desc: 'Candy, biscuit, snack, and junk food wrappers' },
				{ name: 'Tissue', desc: 'Used facial tissues, toilet paper, paper towels' },
				{
					name: 'At iba pang bagay na hindi na maaaring gawing kompos o iresiklo',
					desc: 'Cigarette butts, worn-out rubber, heavily soiled items'
				}
			],
			disposalGuide:
				'Ibalot nang maayos sa matibay na sako o basurahan. Ilabas lamang sa itinakdang araw at oras ng pagdaan ng MENRO Garbage Truck.',
			handlingRules: [
				'Tiyaking nakatali nang maayos ang lalagyan upang hindi kalkalin ng hayop.',
				'Huwag ihalo sa nabubulok o espesyal na basura.',
				'Ilabas sa designated collection point bago mag-6:00 AM sa takdang araw.'
			]
		},
		{
			id: 'special',
			index: '04',
			code: 'SPEC-WASTE',
			tagalogTitle: 'NAKAKALASON NA BASURA',
			englishTitle: 'SPECIAL / HAZARDOUS WASTE',
			category: 'Hazardous & Electronic Waste',
			badge: 'Special Handling',
			accentBorder: 'border-t-blue-950',
			badgeColor: 'bg-blue-950 text-amber-300 font-black border border-amber-400',
			icon: '⚠️',
			pdfUrl: '/docs/menro/special-waste-guidelines.pdf',
			description:
				'Mga mapanganib, nakalalason, o elektronikong basura na nagtataglay ng kemikal o lead. Mahigpit na ipinagbabawal na ihalo sa ordinaryong basura.',
			items: [
				{ name: 'Pintura', desc: 'Leftover lead and oil-based paints, primers, varnish' },
				{ name: 'Spray Canister', desc: 'Pressurized aerosol spray cans, insecticide sprays' },
				{ name: 'Thinner', desc: 'Paint thinners, lacquer solvents, chemical strippers' },
				{ name: 'Baterya (Lead-acid/ household)', desc: 'Car/motorcycle batteries, AA/AAA/Lithium batteries' },
				{
					name: 'Mga sirang gamit tulad ng',
					desc: 'Bulky hazardous e-waste and discarded household appliances',
					subitems: [
						'Sirang aparador',
						'Sirang TV',
						'Sirang radyo',
						'Sirang refrigerator',
						'Atbp:'
					]
				}
			],
			disposalGuide:
				'Huwag itapon sa ordinaryong basurahan o sa ilog. Itabi sa ligtas na lugar at makipag-ugnayan sa MENRO para sa special hazardous collection schedule.',
			handlingRules: [
				'Mahigpit na ipinagbabawal ang pagsunog (open burning) o pagbaon sa lupa.',
				'Ilayo sa mga bata at pinagmumulan ng apoy o tubig.',
				'Makipag-ugnayan sa MENRO Tanauan para sa quarterly Special Waste Drop-off.'
			]
		}
	];

	const filteredCategories = $derived(
		wasteCategories.filter((cat) => {
			const matchesCategory = activeFilter === 'all' || cat.id === activeFilter;
			const query = searchItem.trim().toLowerCase();
			if (!query) return matchesCategory;

			const matchesTitle =
				cat.tagalogTitle.toLowerCase().includes(query) ||
				cat.englishTitle.toLowerCase().includes(query) ||
				cat.description.toLowerCase().includes(query);

			const matchesItems = cat.items.some(
				(item) => item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
			);

			return matchesCategory && (matchesTitle || matchesItems);
		})
	);

	function openDetailModal(category) {
		activeModal = category;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeDetailModal() {
		activeModal = null;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function handleKeydown(e) {
		if (e.key === 'Escape' && activeModal) {
			closeDetailModal();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="relative w-full">
	<!-- Control Bar: Search Input & Category Filter Tabs -->
	<div class="mb-8 rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
		<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
			<!-- Live Item Search -->
			<div class="relative flex-1 max-w-lg">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
					🔍
				</div>
				<input
					type="text"
					bind:value={searchItem}
					placeholder="Mag-search ng basura (hal. diaper, bote, hasang, pintura, sachet, karton, baterya)..."
					class="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-xs sm:text-sm font-medium text-slate-900 transition focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-400/20"
				/>
				{#if searchItem}
					<button
						type="button"
						onclick={() => (searchItem = '')}
						class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold text-slate-400 hover:text-slate-700"
					>
						Clear ✕
					</button>
				{/if}
			</div>

			<!-- Quick Filter Pills (Royal Blue & Amber Yellow) -->
			<div class="flex flex-wrap items-center gap-1.5">
				<button
					type="button"
					onclick={() => (activeFilter = 'all')}
					class="rounded-xl px-3.5 py-2 text-xs font-black uppercase tracking-wider transition-all {activeFilter === 'all' ? 'bg-blue-950 text-amber-300 shadow-md scale-105' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
				>
					Lahat (4 Uri)
				</button>
				<button
					type="button"
					onclick={() => (activeFilter = 'biodegradable')}
					class="rounded-xl px-3.5 py-2 text-xs font-black uppercase tracking-wider transition-all {activeFilter === 'biodegradable' ? 'bg-amber-400 text-blue-950 shadow-md scale-105' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
				>
					🍂 Nabubulok
				</button>
				<button
					type="button"
					onclick={() => (activeFilter = 'recyclable')}
					class="rounded-xl px-3.5 py-2 text-xs font-black uppercase tracking-wider transition-all {activeFilter === 'recyclable' ? 'bg-blue-600 text-white shadow-md scale-105' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
				>
					♻️ Nareresiklo
				</button>
				<button
					type="button"
					onclick={() => (activeFilter = 'residual')}
					class="rounded-xl px-3.5 py-2 text-xs font-black uppercase tracking-wider transition-all {activeFilter === 'residual' ? 'bg-amber-500 text-blue-950 shadow-md scale-105' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
				>
					🗑️ Di-Nareresiklo
				</button>
				<button
					type="button"
					onclick={() => (activeFilter = 'special')}
					class="rounded-xl px-3.5 py-2 text-xs font-black uppercase tracking-wider transition-all {activeFilter === 'special' ? 'bg-blue-950 text-amber-400 border border-amber-400 shadow-md scale-105' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
				>
					⚠️ Nakakalason
				</button>
			</div>
		</div>

		{#if searchItem}
			<div class="mt-3 flex items-center justify-between text-xs font-bold text-slate-600 border-t border-slate-100 pt-3">
				<span>
					Showing results matching "<strong class="text-blue-950">{searchItem}</strong>"
				</span>
				<button type="button" onclick={() => (searchItem = '')} class="text-blue-900 underline hover:text-amber-600">
					Reset filter
				</button>
			</div>
		{/if}
	</div>

	<!-- 4 Categories Cards Grid -->
	<div class="grid gap-6 md:grid-cols-2">
		{#if filteredCategories.length === 0}
			<div class="col-span-full rounded-3xl border-2 border-slate-200 bg-white p-12 text-center text-slate-500">
				<div class="text-4xl mb-2">🔍</div>
				<h4 class="text-lg font-black text-slate-800">Walang nahanap na tugmang uri ng basura</h4>
				<p class="text-xs text-slate-500 mt-1">Subukang i-clear ang search o i-reset ang filter.</p>
			</div>
		{:else}
			{#each filteredCategories as category}
				<div
					class="flex flex-col justify-between rounded-3xl border-2 border-slate-200 border-t-8 {category.accentBorder} bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-amber-400"
				>
					<div>
						<!-- Card Top Badge Header -->
						<div class="mb-4 flex items-center justify-between gap-2">
							<div class="flex items-center gap-2.5">
								<span class="text-2xl sm:text-3xl select-none">{category.icon}</span>
								<div>
									<span class="text-[10px] font-mono font-black tracking-wider text-blue-900 uppercase">
										KATATEGORYA {category.index} // {category.code}
									</span>
									<span class="block text-xs font-bold text-slate-500">
										{category.category}
									</span>
								</div>
							</div>

							<span class="rounded-lg px-2.5 py-1 text-xs uppercase tracking-wide shadow-xs {category.badgeColor}">
								{category.badge}
							</span>
						</div>

						<!-- Titles -->
						<h3 class="text-xl sm:text-2xl font-black text-blue-950 tracking-tight">
							{category.tagalogTitle}
						</h3>
						<div class="text-xs sm:text-sm font-black text-amber-600 uppercase tracking-wide mb-3">
							({category.englishTitle})
						</div>

						<!-- Description -->
						<p class="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium mb-5">
							{category.description}
						</p>

						<!-- Official Item List (Extracted from PDF) -->
						<div class="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 mb-5">
							<div class="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2.5 flex items-center justify-between">
								<span>Mga Halimbawa ng Basura:</span>
								<span class="text-blue-900 font-bold">{category.items.length} Pangunahing Uri</span>
							</div>

							<ul class="space-y-2">
								{#each category.items as item}
									<li class="flex flex-col text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
										<div class="flex items-start">
											<span class="mr-2 font-black text-amber-500 select-none">•</span>
											<div>
												<strong class="text-slate-900">{item.name}</strong>
												{#if item.desc}
													<span class="block text-[11px] font-normal text-slate-500">{item.desc}</span>
												{/if}
											</div>
										</div>
										{#if item.subitems && item.subitems.length > 0}
											<div class="ml-6 mt-1.5 space-y-1 rounded-xl bg-amber-50/70 p-2.5 border border-amber-200/60">
												{#each item.subitems as sub}
													<div class="flex items-center text-xs font-bold text-blue-950">
														<span class="mr-2 text-amber-600 font-black">➢</span>
														<span>{sub}</span>
													</div>
												{/each}
											</div>
										{/if}
									</li>
								{/each}
							</ul>
						</div>
					</div>

					<!-- Bottom Action / Modal Button & PDF Link -->
					<div class="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
						<button
							type="button"
							onclick={() => openDetailModal(category)}
							class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-950 hover:bg-blue-900 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-amber-300 shadow-md transition-all hover:scale-105 active:scale-95"
						>
							<span>Gabay sa Pagtatapon</span>
							<span>↗</span>
						</button>

						<a
							href={category.pdfUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-amber-50 hover:border-amber-400 px-4 py-2.5 text-xs font-bold text-slate-700 transition"
						>
							<span>📄 Opisyal na PDF</span>
						</a>
					</div>
				</div>
			{/each}
		{/if}
	</div>

	<!-- General Citizen Advisory Notice (Royal Blue & Amber Yellow) -->
	<div class="mt-8 rounded-3xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 via-white to-amber-50/70 p-6 sm:p-8 shadow-sm">
		<div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
			<div class="flex items-start gap-4">
				<span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-blue-950 font-black text-2xl shadow-inner">
					⚖️
				</span>
				<div>
					<div class="flex items-center gap-2">
						<span class="rounded bg-blue-950 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-300 uppercase">
							RA 9003 & MO NO. 2024-20
						</span>
						<span class="text-xs font-bold text-amber-900">Mahigpit na Pagpapatupad</span>
					</div>
					<h4 class="mt-1 text-base sm:text-lg font-black text-blue-950">
						Batas sa Tamang Pagbubukod-bukod ng Basura sa Pinagmulan (Segregation at Source)
					</h4>
					<p class="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
						Mahigpit na ipinagbabawal ang paghahalo ng basura. Ang unsegregated o magkahalong basura ay <strong>HINDI HAHAKUTIN</strong> ng mga kolektor ng MENRO. Ang sinumang lalabag ay papatawan ng kaukulang multa at parusa alinsunod sa batas.
					</p>
				</div>
			</div>

			<a
				href="#collection-schedule"
				class="shrink-0 rounded-2xl bg-blue-950 hover:bg-blue-900 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-amber-300 shadow-md transition hover:scale-105 active:scale-95"
			>
				Tingnan ang Iskedyul ng Hakot →
			</a>
		</div>
	</div>

	<!-- Detail Modal Window -->
	{#if activeModal}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
			transition:fade={{ duration: 200 }}
			onclick={closeDetailModal}
			role="dialog"
			aria-modal="true"
		>
			<div
				class="relative my-auto w-full max-w-2xl rounded-3xl border-2 border-amber-400 bg-white p-6 sm:p-8 shadow-2xl overflow-hidden"
				onclick={(e) => e.stopPropagation()}
			>
				<!-- Modal Close Button -->
				<button
					type="button"
					onclick={closeDetailModal}
					class="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 text-slate-700 transition hover:bg-amber-400 hover:text-blue-950"
					aria-label="Close modal"
				>
					✕
				</button>

				<!-- Modal Header -->
				<div class="flex items-center gap-3 border-b border-slate-200 pb-5">
					<span class="text-3xl sm:text-4xl">{activeModal.icon}</span>
					<div>
						<span class="rounded px-2 py-0.5 text-[10px] font-black uppercase tracking-wider {activeModal.badgeColor}">
							{activeModal.badge}
						</span>
						<h3 class="text-xl sm:text-2xl font-black text-blue-950 mt-1">
							{activeModal.tagalogTitle}
						</h3>
						<div class="text-xs font-bold text-amber-700 uppercase">
							({activeModal.englishTitle})
						</div>
					</div>
				</div>

				<!-- Modal Body -->
				<div class="mt-5 space-y-4 max-h-[62vh] overflow-y-auto pr-1">
					<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
						<div class="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1">
							Kahulugan at Saklaw
						</div>
						<p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
							{activeModal.description}
						</p>
					</div>

					<div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
						<div class="text-[10px] font-black uppercase tracking-wider text-blue-900 mb-2">
							Gabay sa Wastong Pag-iimbak at Pagtatapon
						</div>
						<p class="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
							{activeModal.disposalGuide}
						</p>
					</div>

					<!-- Itemized Checklist from PDF -->
					<div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
						<div class="text-[10px] font-black uppercase tracking-wider text-blue-950 mb-2.5 flex items-center justify-between">
							<span>Talaan ng mga Basura sa Kategoryang Ito:</span>
							<span class="text-amber-600 font-bold">{activeModal.items.length} Pangunahing Uri</span>
						</div>
						<ul class="space-y-2">
							{#each activeModal.items as item}
								<li class="flex flex-col text-xs text-slate-800 font-semibold leading-snug">
									<div class="flex items-start">
										<span class="mr-2 font-black text-amber-500">•</span>
										<div>
											<strong class="text-slate-900">{item.name}</strong>
											{#if item.desc}
												<span class="block text-[11px] font-normal text-slate-500">{item.desc}</span>
											{/if}
										</div>
									</div>
									{#if item.subitems && item.subitems.length > 0}
										<div class="ml-5 mt-1.5 space-y-1 rounded-xl bg-amber-50 p-2.5 border border-amber-200/60">
											{#each item.subitems as sub}
												<div class="flex items-center text-xs font-bold text-blue-950">
													<span class="mr-2 text-amber-600 font-black">➢</span>
													<span>{sub}</span>
												</div>
											{/each}
										</div>
									{/if}
								</li>
							{/each}
						</ul>
					</div>

					<div class="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
						<div class="text-[10px] font-black uppercase tracking-wider text-amber-950 mb-2">
							Mahalagang Alituntunin sa Paghawak:
						</div>
						<ul class="space-y-1.5 text-xs text-amber-950 font-medium">
							{#each activeModal.handlingRules as rule}
								<li class="flex items-start gap-2">
									<span class="font-bold text-amber-600">✓</span>
									<span>{rule}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>

				<!-- Modal Footer -->
				<div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 pt-4">
					<a
						href={activeModal.pdfUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs font-bold text-blue-900 hover:text-amber-600 underline flex items-center gap-1"
					>
						<span>Tingnan ang Opisyal na PDF Document</span>
						<span>↗</span>
					</a>

					<button
						type="button"
						onclick={closeDetailModal}
						class="w-full sm:w-auto rounded-xl bg-blue-950 hover:bg-blue-900 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-amber-300 shadow-sm transition active:scale-95"
					>
						Isara
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
