<script>
	import { fade, fly, scale } from 'svelte/transition';

	// Category filter state
	let selectedCategory = $state('all');
	// Lightbox state: null or { group, image, index, list }
	let activeLightbox = $state(null);
	let viewMode = $state('grid'); // 'grid' | 'grouped'

	const programs = [
		{
			id: 'agri-fair',
			title: 'Municipal Agri-Fair & Farmers Trade Exposition',
			shortTitle: 'Agri-Fair & Farmers Expo',
			badge: '🌾 Trade & Crop Exhibition',
			accent: '#059669',
			icon: '🌾',
			year: '2026 Season',
			description:
				'Showcase of high-value crops, fresh farm produce, and value-added agricultural goods by Tanauan rural women associations (such as Sta. Elena Women\'s Assoc) and participating barangays (Brgy. Sacme, Brgy. Talolora) during the municipal agricultural fair and booth judging competition.',
			highlights: ['Brgy. Sacme Harvest Display', 'Brgy. Talolora Farmers Pavilion', 'Sta. Elena Women’s Assoc Goods', 'Official Inter-Barangay Judging'],
			images: [
				{
					src: '/images/accomplishments/agriculture/agri-fair/agri-fair-1.jpg',
					title: 'Brgy. Sacme Farmers Agricultural Booth',
					caption: 'Elaborate booth display of bountiful root crops, vegetables, and high-value fruit harvests from Brgy. Sacme farmers.'
				},
				{
					src: '/images/accomplishments/agriculture/agri-fair/agri-fair-2.jpg',
					title: 'Brgy. Talolora Agricultural Exhibit',
					caption: 'Comprehensive agricultural exposition featuring local farm staples and organic produce from Brgy. Talolora.'
				},
				{
					src: '/images/accomplishments/agriculture/agri-fair/agri-fair-3.jpg',
					title: 'Farm Fresh Harvest & Agri Products',
					caption: 'Freshly harvested corn, squash, bananas, and high-value vegetables showcased by local farmer groups.'
				},
				{
					src: '/images/accomplishments/agriculture/agri-fair/agri-fair-4.jpg',
					title: 'Official Evaluation & Agri-Fair Judging',
					caption: 'Evaluation team inspecting produce quality, aesthetic presentation, and variety during the municipal judging session.'
				},
				{
					src: '/images/accomplishments/agriculture/agri-fair/agri-fair-5.jpg',
					title: 'Community Farmers Exhibition Grounds',
					caption: 'Bustling municipal grounds with vibrant agricultural booths celebrating local farmer industry and harvests.'
				},
				{
					src: '/images/accomplishments/agriculture/agri-fair/agri-fair-6.jpg',
					title: 'Tanauan Agricultural Heritage Pavilion',
					caption: 'Highlighting traditional farming methods, seeds preservation, and rural farming family contributions.'
				},
				{
					src: '/images/accomplishments/agriculture/agri-fair/agri-fair-7.jpg',
					title: 'Sta. Elena Women’s Association Showcase',
					caption: 'Enterprise and livelihood products by the Sta. Elena Women\'s Association featuring packaged and value-added delicacies.'
				}
			]
		},
		{
			id: 'anti-rabies',
			title: 'Mass Anti-Rabies Vaccination & Veterinary Outreach Mission',
			shortTitle: 'Anti-Rabies & Veterinary Care',
			badge: '💉 Animal Health & Rabies Eradication',
			accent: '#d97706',
			icon: '🐕',
			year: '2026 Mission',
			description:
				'Municipal-wide mobile veterinary missions, anti-rabies vaccination of dogs and cats, vitamin supplementation, and livestock disease prevention conducted across Tanauan barangays to safeguard public health and eradicate rabies.',
			highlights: ['Free Anti-Rabies Inoculation', 'Vitamin & Deworming Supplementation', 'Door-to-Door & Barangay Hall Triage', 'Responsible Pet Ownership Education'],
			images: [
				{
					src: '/images/accomplishments/agriculture/anti-rabies/anti-rabies-1.jpeg',
					title: 'Barangay Anti-Rabies Mobile Vaccination',
					caption: 'Veterinary team administering free anti-rabies shots to canine companions at the barangay covered court.'
				},
				{
					src: '/images/accomplishments/agriculture/anti-rabies/anti-rabies-2.jpeg',
					title: 'Community Pet Health Assessment',
					caption: 'Veterinary technician evaluating pet health indicators prior to vaccine inoculation.'
				},
				{
					src: '/images/accomplishments/agriculture/anti-rabies/anti-rabies-3.jpeg',
					title: 'Safe Animal Handling & Vaccine Shot',
					caption: 'Ensuring safe, stress-free vaccination for local dogs brought by caring community pet owners.'
				},
				{
					src: '/images/accomplishments/agriculture/anti-rabies/anti-rabies-4.jpeg',
					title: 'Barangay Frontline Veterinary Deployment',
					caption: 'Tanauan MAO veterinary staff coordinating field logistics and resident pet registries.'
				},
				{
					src: '/images/accomplishments/agriculture/anti-rabies/anti-rabies-5.jpeg',
					title: 'Youth & Resident Participation',
					caption: 'Local residents actively bringing their pets to participate in the Rabies-Free Tanauan advocacy.'
				},
				{
					src: '/images/accomplishments/agriculture/anti-rabies/anti-rabies-6.jpeg',
					title: 'Pet Registration & Vaccination Record',
					caption: 'Issuance of official municipal pet vaccination cards for rabies tracking and safety verification.'
				},
				{
					src: '/images/accomplishments/agriculture/anti-rabies/anti-rabies-7.jpeg',
					title: 'Veterinary Biologics & Cold-Chain Storage',
					caption: 'Strict temperature-monitored rabies vaccine cold-chain preservation at field sites.'
				},
				{
					src: '/images/accomplishments/agriculture/anti-rabies/anti-rabies-8.jpeg',
					title: 'Barangay Health Workers Collaboration',
					caption: 'MAO livestock team working shoulder-to-shoulder with BHWs and barangay council officials.'
				},
				{
					src: '/images/accomplishments/agriculture/anti-rabies/anti-rabies-9.jpeg',
					title: 'Feline & Canine Vaccination Drive',
					caption: 'Comprehensive inoculation covering both domestic cats and dogs across community sitios.'
				},
				{
					src: '/images/accomplishments/agriculture/anti-rabies/anti-rabies-10.jpeg',
					title: 'Field Vaccination Mission In Action',
					caption: 'Delivering direct animal healthcare services straight to neighborhood doorsteps.'
				},
				{
					src: '/images/accomplishments/agriculture/anti-rabies/anti-rabies-11.jpeg',
					title: 'Rabies-Free Tanauan Municipal Mission',
					caption: 'Successful completion of community batch vaccination with certified immunization records.'
				}
			]
		},
		{
			id: 'palay-seeds',
			title: 'Certified Palay Seeds & Bio-Fertilizer Subsidized Distribution',
			shortTitle: 'Palay Seeds & Fertilizer Distribution',
			badge: '🌱 Food Security & Input Subsidies',
			accent: '#0284c7',
			icon: '🌾',
			year: '2026 Cropping Season',
			description:
				'Massive seasonal distribution of certified inbred and hybrid rice seeds, bio-fertilizers, and soil enhancers to registered RSBSA farmers and agricultural cooperatives in Tanauan, lowering planting costs and ensuring high harvest yields.',
			highlights: ['Certified Inbred & Hybrid Rice Seeds', 'Subsidized Bio-Fertilizer Bundles', 'Direct RSBSA Beneficiary Validation', 'LGU Grain Dryer & Production Support'],
			images: [
				{
					src: '/images/accomplishments/agriculture/palay-seeds/palay-seeds-1.jfif',
					title: 'Batch Delivery of Certified Palay Seeds',
					caption: 'Fleet delivery of high-yield certified palay seed sacks ready for seasonal allocation to Tanauan rice farmers.'
				},
				{
					src: '/images/accomplishments/agriculture/palay-seeds/palay-seeds-2.jfif',
					title: 'Agricultural Warehouse Stocking',
					caption: 'Careful inventory staging of certified seeds and nutrient fertilizers inside the municipal agricultural storage hub.'
				},
				{
					src: '/images/accomplishments/agriculture/palay-seeds/palay-seeds-3.jfif',
					title: 'Farmer Beneficiary Validation',
					caption: 'Farmers presenting RSBSA stubs and verification cards before receiving approved seed allocations.'
				},
				{
					src: '/images/accomplishments/agriculture/palay-seeds/palay-seeds-4.jfif',
					title: 'Organized Distribution Staging Area',
					caption: 'Smooth, orderly queueing and disbursement operations conducted at the municipal staging center.'
				},
				{
					src: '/images/accomplishments/agriculture/palay-seeds/palay-seeds-5.jfif',
					title: 'Seed Bag Turnover to Rice Farmers',
					caption: 'Beneficiary farmers receiving certified sacks matched to their registered parcel cultivation size.'
				},
				{
					src: '/images/accomplishments/agriculture/palay-seeds/palay-seeds-6.jfif',
					title: 'Bio-Fertilizer & Soil Nutrient Distribution',
					caption: 'Distributing complementary organic bio-fertilizer and micro-nutrient packs to boost tillering.'
				},
				{
					src: '/images/accomplishments/agriculture/palay-seeds/palay-seeds-7.jfif',
					title: 'Extension Technical Guidance Desk',
					caption: 'Agricultural technicians providing seeding rate and planting distance advisory alongside seed release.'
				},
				{
					src: '/images/accomplishments/agriculture/palay-seeds/palay-seeds-8.jfif',
					title: 'Tanauan Farmers Signing Acknowledgement',
					caption: 'Transparent recording and signing of official DA seed distribution vouchers.'
				},
				{
					src: '/images/accomplishments/agriculture/palay-seeds/palay-seeds-9.jfif',
					title: 'Community Transport to Farmlands',
					caption: 'Farmers transporting allotted seed sacks directly to paddy fields across the 54 barangays.'
				},
				{
					src: '/images/accomplishments/agriculture/palay-seeds/palay-seeds-10.jpeg',
					title: 'Truckload Offloading Operations',
					caption: 'MAO personnel and volunteer farmers offloading fresh stock from the Department of Agriculture logistics carrier.'
				},
				{
					src: '/images/accomplishments/agriculture/palay-seeds/palay-seeds-11.jpeg',
					title: 'Multi-Barangay Agricultural Mobilization',
					caption: 'Coordinated distribution schedule ensuring equitable allocation across all rice-producing barangays.'
				},
				{
					src: '/images/accomplishments/agriculture/palay-seeds/palay-seeds-12.jpeg',
					title: 'Farmer Beneficiaries with Seed Allocations',
					caption: 'Delighted farmers equipped with high-germination certified seed sacks for the upcoming cropping cycle.'
				},
				{
					src: '/images/accomplishments/agriculture/palay-seeds/palay-seeds-13.jpeg',
					title: 'Food Resilient Tanauan Rice Mission',
					caption: 'Celebrating sustainable agricultural productivity and local grain self-sufficiency.'
				}
			]
		},
		{
			id: 'rcef-award',
			title: 'Rice Competitiveness Enhancement Fund (RCEF) Top Performance Award',
			shortTitle: 'RCEF Regional Performance Award',
			badge: '🏆 Regional Excellence & Distinction',
			accent: '#4f46e5',
			icon: '🏆',
			year: 'National Recognition',
			description:
				'Official recognition and prestigious plaque conferred by the Department of Agriculture (DA Region 8) and PhilRice to the Municipality of Tanauan for exemplary performance in seed distribution efficiency, mechanization adoption, and farmer training under the Rice Competitiveness Enhancement Fund.',
			highlights: ['DA & PhilRice Commendation', 'High Seed Distribution Adoption Rate', 'Exemplary Municipal Agriculturist Leadership', 'Farmer Mechanization Milestone'],
			images: [
				{
					src: '/images/accomplishments/agriculture/rcef-award/rcef-award-1.jpg',
					title: 'Official RCEF Plaque of Recognition',
					caption: 'Prestigious award presented to the Municipality of Tanauan for outstanding implementation and distribution of certified inbred rice seeds.'
				},
				{
					src: '/images/accomplishments/agriculture/rcef-award/rcef-award-2.jpg',
					title: 'Awarding Ceremony & Regional Honors',
					caption: 'Municipal officials and MAO leadership receiving the regional award during the DA-PhilRice Agricultural Summit.'
				}
			]
		}
	];

	// Compute all flat images for 'all' filter
	const allImages = $derived(
		programs.flatMap((prog) =>
			prog.images.map((img, idx) => ({
				...img,
				programId: prog.id,
				programTitle: prog.shortTitle,
				programBadge: prog.badge,
				accent: prog.accent,
				idx
			}))
		)
	);

	// Filtered display
	const filteredImages = $derived(
		selectedCategory === 'all'
			? allImages
			: allImages.filter((img) => img.programId === selectedCategory)
	);

	function openLightbox(item, list) {
		const idx = list.findIndex((x) => x.src === item.src);
		activeLightbox = {
			item,
			list,
			index: idx >= 0 ? idx : 0
		};
	}

	function closeLightbox() {
		activeLightbox = null;
	}

	function nextImage() {
		if (!activeLightbox) return;
		const nextIdx = (activeLightbox.index + 1) % activeLightbox.list.length;
		activeLightbox = {
			...activeLightbox,
			index: nextIdx,
			item: activeLightbox.list[nextIdx]
		};
	}

	function prevImage() {
		if (!activeLightbox) return;
		const prevIdx =
			(activeLightbox.index - 1 + activeLightbox.list.length) % activeLightbox.list.length;
		activeLightbox = {
			...activeLightbox,
			index: prevIdx,
			item: activeLightbox.list[prevIdx]
		};
	}

	function handleKeydown(e) {
		if (e.key === 'Escape' && activeLightbox) closeLightbox();
		if (e.key === 'ArrowRight' && activeLightbox) nextImage();
		if (e.key === 'ArrowLeft' && activeLightbox) prevImage();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- ACCOMPLISHMENTS GALLERY CONTAINER -->
<div class="relative">
	<!-- Header Bar & Filter Controls -->
	<div class="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 pb-6">
		<div>
			<div class="flex items-center gap-2 mb-2">
				<span class="flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse"></span>
				<span class="text-xs font-black uppercase tracking-wider text-blue-950">
					Official Photographic Documentation // 4 Key Programs
				</span>
			</div>
			<h3 class="text-2xl sm:text-3xl font-black text-blue-950">
				Field Accomplishments & Program Milestones
			</h3>
			<p class="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
				Documented frontline milestones across agricultural trade, livestock health, seed distributions,
				and regional excellence awards.
			</p>
		</div>

		<!-- Category Filter Pills -->
		<div class="flex flex-wrap items-center gap-2 shrink-0">
			<button
				type="button"
				onclick={() => (selectedCategory = 'all')}
				class="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition-all {selectedCategory ===
				'all'
					? 'bg-blue-950 text-amber-300 shadow-sm scale-105'
					: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-950'}"
			>
				<span>📂 All Programs</span>
				<span
					class="rounded-full px-1.5 py-0.2 text-[10px] font-black {selectedCategory === 'all'
						? 'bg-amber-400 text-blue-950'
						: 'bg-slate-200 text-slate-700'}"
				>
					{allImages.length}
				</span>
			</button>

			{#each programs as prog}
				<button
					type="button"
					onclick={() => (selectedCategory = prog.id)}
					class="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition-all {selectedCategory ===
					prog.id
						? 'bg-blue-950 text-amber-300 shadow-sm scale-105'
						: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-950'}"
				>
					<span>{prog.icon}</span>
					<span>{prog.shortTitle}</span>
					<span
						class="rounded-full px-1.5 py-0.2 text-[10px] font-black {selectedCategory === prog.id
							? 'bg-amber-400 text-blue-950'
							: 'bg-slate-200 text-slate-700'}"
					>
						{prog.images.length}
					</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- PROGRAM GROUPED SHOWCASE (When a specific program is selected) -->
	{#if selectedCategory !== 'all'}
		{@const currentProg = programs.find((p) => p.id === selectedCategory)}
		{#if currentProg}
			<div class="mb-8 rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-sm" transition:fade>
				<div class="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-100">
					<div>
						<div class="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black text-blue-950 uppercase mb-2">
							<span>{currentProg.icon}</span>
							<span>{currentProg.badge}</span>
							<span>•</span>
							<span>{currentProg.year}</span>
						</div>
						<h4 class="text-xl sm:text-2xl font-black text-blue-950">
							{currentProg.title}
						</h4>
						<p class="mt-2 text-sm text-slate-700 leading-relaxed max-w-3xl">
							{currentProg.description}
						</p>
					</div>

					<div class="shrink-0">
						<span class="rounded-2xl bg-amber-400/20 border border-amber-300 text-amber-900 px-4 py-2 text-xs font-black inline-block">
							{currentProg.images.length} High-Res Photos
						</span>
					</div>
				</div>

				<!-- Program Key Highlights Tags -->
				<div class="mt-4 flex flex-wrap items-center gap-2">
					<span class="text-xs font-black text-slate-400 uppercase mr-1">Focus Areas:</span>
					{#each currentProg.highlights as hl}
						<span class="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
							✓ {hl}
						</span>
					{/each}
				</div>
			</div>
		{/if}
	{/if}

	<!-- PHOTO GALLERY GRID (Animated Stagger) -->
	<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#each filteredImages as img, i (img.src)}
			<div
				class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400 hover:shadow-xl cursor-pointer"
				role="button"
				tabindex="0"
				onclick={() => openLightbox(img, filteredImages)}
				onkeydown={(e) => e.key === 'Enter' && openLightbox(img, filteredImages)}
			>
				<!-- Image Container with Aspect Ratio and Zoom on Hover -->
				<div class="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
					<img
						src={img.src}
						alt={img.title}
						loading="lazy"
						class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
					/>

					<!-- Subtle Gradient Overlay -->
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					></div>

					<!-- Hover Zoom Icon Pill -->
					<div
						class="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-blue-950/85 px-3 py-1 text-[11px] font-black text-amber-300 shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
					>
						<span>🔍 Expand</span>
					</div>

					<!-- Program Badge on Image -->
					<div class="absolute top-2.5 left-2.5">
						<span
							class="rounded-md bg-blue-950/80 px-2 py-0.5 text-[10px] font-black text-white shadow-xs backdrop-blur-xs uppercase tracking-wider"
						>
							{img.programTitle}
						</span>
					</div>
				</div>

				<!-- Caption / Details Box -->
				<div class="p-4 flex flex-col flex-1 justify-between bg-white">
					<div>
						<h5 class="text-sm font-black text-slate-900 leading-snug group-hover:text-blue-950 transition-colors line-clamp-1">
							{img.title}
						</h5>
						<p class="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
							{img.caption}
						</p>
					</div>

					<div class="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
						<span class="font-bold text-blue-900 group-hover:underline">
							View Full Photo →
						</span>
						<span class="font-mono text-[10px] text-slate-400">
							#{String(i + 1).padStart(2, '0')}
						</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<!-- ========================================== -->
<!-- FULLSCREEN LIGHTBOX MODAL (ANIMATED)       -->
<!-- ========================================== -->
{#if activeLightbox}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden"
		transition:fade={{ duration: 200 }}
		role="dialog"
		aria-modal="true"
	>
		<!-- Dark Blur Backdrop -->
		<div
			class="fixed inset-0 bg-blue-950/90 backdrop-blur-md"
			onclick={closeLightbox}
			role="button"
			tabindex="0"
			onkeydown={(e) => e.key === 'Enter' && closeLightbox()}
		></div>

		<!-- Modal Container -->
		<div
			class="relative z-10 flex flex-col max-h-[95vh] w-full max-w-5xl rounded-3xl border-2 border-white/20 bg-slate-900 text-white shadow-2xl overflow-hidden"
			transition:scale={{ duration: 250, start: 0.95 }}
		>
			<!-- Top Bar -->
			<div class="flex items-center justify-between border-b border-white/10 bg-slate-950 px-6 py-4">
				<div class="flex items-center gap-3">
					<span class="rounded-full bg-amber-400 px-3 py-0.5 text-xs font-black text-blue-950 uppercase">
						{activeLightbox.item.programTitle}
					</span>
					<span class="text-xs text-slate-400">
						Photo {activeLightbox.index + 1} of {activeLightbox.list.length}
					</span>
				</div>

				<div class="flex items-center gap-2">
					<a
						href={activeLightbox.item.src}
						download
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-bold text-white transition-all"
						title="Download image"
					>
						<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
						</svg>
						<span>Save</span>
					</a>

					<button
						type="button"
						onclick={closeLightbox}
						class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all font-bold"
						title="Close (Esc)"
					>
						✕
					</button>
				</div>
			</div>

			<!-- Image Display Viewport with Navigation Chevrons -->
			<div class="relative flex-1 flex items-center justify-center bg-black/60 min-h-[350px] max-h-[65vh] p-4 overflow-hidden">
				<img
					src={activeLightbox.item.src}
					alt={activeLightbox.item.title}
					class="max-h-[60vh] max-w-full object-contain rounded-xl shadow-lg transition-all duration-300"
				/>

				<!-- Prev Button -->
				<button
					type="button"
					onclick={(e) => {
						e.stopPropagation();
						prevImage();
					}}
					class="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-950/80 text-white hover:bg-amber-400 hover:text-blue-950 shadow-lg backdrop-blur-xs transition-all hover:scale-110 active:scale-95 text-xl font-bold cursor-pointer"
					title="Previous (Left Arrow)"
				>
					‹
				</button>

				<!-- Next Button -->
				<button
					type="button"
					onclick={(e) => {
						e.stopPropagation();
						nextImage();
					}}
					class="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-950/80 text-white hover:bg-amber-400 hover:text-blue-950 shadow-lg backdrop-blur-xs transition-all hover:scale-110 active:scale-95 text-xl font-bold cursor-pointer"
					title="Next (Right Arrow)"
				>
					›
				</button>
			</div>

			<!-- Bottom Description Bar -->
			<div class="bg-slate-950 px-6 py-4 border-t border-white/10">
				<h4 class="text-base sm:text-lg font-black text-amber-300">
					{activeLightbox.item.title}
				</h4>
				<p class="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
					{activeLightbox.item.caption}
				</p>
			</div>
		</div>
	</div>
{/if}
