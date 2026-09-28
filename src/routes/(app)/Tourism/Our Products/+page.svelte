<script>
	import { onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let activeCategory = 'All';
	let searchQuery = '';
	let selectedProduct = null;
	let activeProcessTab = 0;

	const categories = ['All', 'Delicacies', 'Crafts', 'Marine', 'Others'];

	const products = [
		{
			id: 'binagol',
			name: 'Binagol',
			localName: 'Talyan & Muscovado Delicacy',
			category: 'Delicacies',
			tag: 'Heritage Icon',
			desc: 'A celebrated sweet delicacy of slow-cooked taro root, condensed milk, and luscious coconut caramel nestled in a polished coconut shell.',
			story: 'Binagol is the sweet culinary soul of Leyte. Crafted from locally harvested talyan—a giant upland taro root—it hides a molten core of brown sugar caramel beneath a velvet layer of mashed taro and coconut cream. Bound with banana leaves and tied with natural twine in halved coconut shells (bagol), it remains the ultimate pasalubong of Tanauan.',
			img: '/Tourism/products/Binagol.webp',
			origin: 'Tanauan Native Kitchens',
			keyNotes: 'Velvety Taro • Coconut Caramel • Warm Vanilla Notes',
			ingredients: ['Talyan Taro Root', 'Pure Coconut Milk', 'Muscovado Sugar', 'Egg Yolks', 'Condensed Milk'],
			themeColor: '#B45309', // Warm Coconut Caramel
			themeBg: '#FFFBEB',
			badge: 'Top Pasalubong'
		},
		{
			id: 'moron',
			name: 'Tsokolate Moron',
			localName: 'Moron de Tanauan',
			category: 'Delicacies',
			tag: 'Chocolate Kakanin',
			desc: 'An exquisite marble swirl of dark native cacao and sweet glutinous rice dough, steamed in scalded banana leaves until silky.',
			story: 'Moron represents the peak of Visayan kakanin confectionery. Two distinct doughs—one infused with pure native roasted cacao tablea and crushed peanuts, the other with rich coconut cream and sticky rice—are hand-rolled into a harmonious spiral, sealed in fresh banana leaves, and steamed for hours to achieve a chewy, melt-in-the-mouth texture.',
			img: '/Tourism/products/Moron.webp',
			origin: 'Tanauan Heritage Kitchens',
			keyNotes: 'Single-Origin Cacao • Roasted Peanuts • Chewy Sticky Rice',
			ingredients: ['Malagkit Sticky Rice', 'Native Tablea Cacao', 'Coconut Cream', 'Roasted Peanuts', 'Cane Sugar'],
			themeColor: '#701A75', // Sikwate Cacao
			themeBg: '#FDF4FF',
			badge: 'Signature Kakanin'
		},
		{
			id: 'lechon',
			name: 'Tanauan Crispy Lechon',
			localName: 'Lechon Baboy',
			category: 'Delicacies',
			tag: 'Fiesta Centerpiece',
			desc: 'Whole roast suckling pig seasoned with mountain lemongrass, native garlic, and wild herbs, rotisserie-roasted over coconut embers until glass-crisp.',
			story: 'In Tanauan, lechon is an art of patience and tradition. Stuffed generously with wild lemongrass (tanglad), local garlic cloves, whole peppercorns, and bay leaves, the pig is slow-roasted over glowing coconut charcoal for hours. The result is razor-thin, glass-crisp skin enclosing exceptionally tender and aromatic meat.',
			img: '/Tourism/products/Lechon.webp',
			origin: 'Tanauan Master Roasteries',
			keyNotes: 'Glass-Crisp Crackling • Lemongrass & Garlic Infused • Tender Juicy Meat',
			ingredients: ['Native Reared Pork', 'Mountain Lemongrass', 'Tanauan Garlic', 'Sea Salt', 'Coconut Charcoal Smoke'],
			themeColor: '#BE123C', // Flame Roast Red
			themeBg: '#FFF1F2',
			badge: 'Fiesta Essential'
		},
		{
			id: 'tablea',
			name: 'Single-Origin Tablea',
			localName: 'Tablea / Sikwate Cacao',
			category: 'Delicacies',
			tag: '100% Ground Cacao',
			desc: 'Tablea is made from pure ground-up cacao beans with rich natural fat, heated with water into the traditional Filipino breakfast drink called Sikwate.',
			story: 'Tablea is different from a hot chocolate mix because it contains more natural fat and is made from ground-up cacao beans, usually heated and combined with water to make a traditional Filipino chocolate drink called sikwate—which is basically a full-fat hot chocolate base, with your own choice of how much sugar and/or milk to add. The name may also come from the Spanish word tablear, meaning rolling and dividing, an allusion to the way in which the balls and/or tablets are formed. When a Filipino\'s chocolate craving hits, it\'s usually not for a bar of chocolate, but for a steaming cup of breakfast tablea. To make tablea, the beans are harvested, fermented, dried, roasted, peeled, and ground into a smooth cacao mass formed into balls or tablets while the purest chocolate is cacao mass plus sugar.',
			img: '/Tourism/products/Tablea.webp',
			origin: 'Tanauan Agro-Forestry Farms',
			keyNotes: 'Full-Fat Cacao Base • Natural Cocoa Butter • Steaming Breakfast Sikwate',
			ingredients: ['100% Fermented Cacao Beans', 'Natural Cacao Mass', 'Raw Cane Sugar (Optional)'],
			themeColor: '#78350F', // Rich Roasted Cacao
			themeBg: '#FEF3C7',
			badge: 'Breakfast Essential'
		},
		{
			id: 'bamboo-craft',
			name: 'Fine Bamboo Furniture & Wares',
			localName: 'Kawayan Furniture & Accessories',
			category: 'Crafts',
			tag: 'Pacific & Orient Art',
			desc: 'Fine quality bamboo furniture, gazebos, living & dining room sets, beds, and home accessories skillfully handcrafted from natural bamboo.',
			story: 'Welcome to the home of fine quality bamboo furniture, bamboo gazebos, bamboo living room sets, bamboo dining room sets, bamboo beds, and bamboo accessories. Bamboo, in a skillful work of art, with the beauty of its own forms and its warm character—the precious natural material bamboo is destined to fulfill the natural human desire at your very own home. There is nothing like bamboo to create the authentic atmosphere of the Pacific and the Orient. Get into the spirit of the places that gave birth to some of the world\'s classic bamboo furniture right here in Tanauan.',
			img: '/Tourism/products/bamboo-craft.webp',
			origin: 'Tanauan Bamboo Artisans',
			keyNotes: 'Fine Bamboo Gazebos • Living & Dining Sets • Custom Beds & Accessories',
			ingredients: ['Selected Mature Bamboo', 'Natural Rattan Binds', 'Weather-Resistant Seal'],
			themeColor: '#15803D', // Fresh Bamboo Green
			themeBg: '#F0FDF4',
			badge: 'Artisanal Furniture'
		},
		{
			id: 'daba',
			name: 'Daba (Clay Pots & Jars)',
			localName: 'Daba (Waray-Waray Clay Pots)',
			category: 'Crafts',
			tag: 'Living Tradition',
			desc: '"Daba" is the Waray-Waray term for clay pots. The potters of Tanauan have preserved this trade, art, and livelihood since way back when.',
			story: '"Daba" is a Waray-Waray term for clay pots. The potters of Tanauan, Leyte have been with the municipality from since way back when. It\'s common practice for homeowners and garden enthusiasts to head there for their gardening pot and clay cooking pot needs. These earthen-wares have been a part of our tradition. It has been a trade, an art, and a livelihood for many of them, and we Leyteños ought to be good supporters and allow them not only to continue but to flourish. Classic, conventional pots, Zen garden-inspired and curvy jars—it\'s all there. Demand for bricks is increasing too. Lady potters make close to 20 per day depending on the demand. Since Typhoon Yolanda, the mountain-scape changed in Tanauan and the quality of the soil has decreased, filled with pebbles and other artifacts, but the potters are passionately doing their best.',
			img: '/Tourism/products/Daba.webp',
			origin: 'Tanauan Pottery Guilds',
			keyNotes: 'Conventional Pots • Zen Garden Jars • Traditional Bricks',
			ingredients: ['Tanauan Silt Clay', 'Natural Sand Temper', 'Wood-Fired Kiln Ceramic'],
			themeColor: '#C2410C', // Terracotta Clay
			themeBg: '#FFF7ED',
			badge: 'Living Tradition'
		},
		{
			id: 'native-crafts',
			name: 'Banig & Bariw Weaves',
			localName: 'Bariw (Pandamus Copelandii)',
			category: 'Crafts',
			tag: 'Resilience & Art',
			desc: 'Handwoven from bariw leaves (pandan), crafted into durable mats, bags, and decor, alongside post-Yolanda coconut shell and wood artifacts.',
			story: 'Banig is popularly known as a product from bariw leaves (common name pandan) scientifically known as Pandamus Copelandii which belongs to the Pandanaceae family. Bariw has a versatile economic use; it can be made into mats, hats, baskets, slippers, handbags, portfolios, decors and other fancy articles which are long lasting and well-crafted by the Tanauanons through hardworking hands which makes it extra special. Bariw products like banig could not only be tapped as fancy articles but could even surpass the quality and style of other fashionable attire not only locally but even internationally. There are also native products that reflect the resilience of the community in Tanauan, Leyte. When the municipality was struck by Yolanda, the worst typhoon in the country\'s history, Tanauanons nonetheless found strength and inspiration for their art. For instance, there were hand-cut, hand-carved coconut shell adornments, as well as rosary beads crafted from wood debris left by the typhoon.',
			img: '/Tourism/products/Native.webp',
			origin: 'Tanauan Weavers & Artisans',
			keyNotes: 'Bariw Leaf Mats • Handbags & Portfolios • Hand-Carved Coconut Shell Art',
			ingredients: ['Bariw Leaves (Pandan)', 'Natural Botanical Dyes', 'Hand-Carved Coconut Shells', 'Typhoon Wood Beads'],
			themeColor: '#A16207', // Golden Sunlit Abaca / Bariw
			themeBg: '#FEFCE8',
			badge: 'Resilient Heritage'
		},
		{
			id: 'bulad',
			name: 'Bulad (Dried Fish)',
			localName: 'Bulad (Waray-Waray Dried Fish)',
			category: 'Marine',
			tag: 'Beach Seine Catch',
			desc: '“Bulad” is the Waray-Waray term for dried fish, caught using the traditional beach seine fishing method along the coast of Tanauan.',
			story: '“Bulad” is a Waray-Waray term for dried fish. Fishermen pull their nets as they perform the beach seine method of fishing at the coastal town of Tanauan, Leyte. The fisherman inspects fish caught and laid out to dry along the beach of Tanauan, Leyte.',
			img: '/Tourism/products/Bulad-fish.webp',
			origin: 'Coastal Tanauan Shoreline',
			keyNotes: 'Beach Seine Method • Sun-Dried on Bamboo • Coastal Morning Harvest',
			ingredients: ['Fresh Beach Seine Catch', 'Solar Sea Salt', 'Pacific Sun & Ocean Breeze'],
			themeColor: '#0369A1', // Pacific Coastal Blue
			themeBg: '#F0F9FF',
			badge: 'Beach Seine Catch'
		},
		{
			id: 'tuba-suoy',
			name: 'Tuba & Su-oy (Wine & Vinegar)',
			localName: 'Tuba & Su-oy han Niyog',
			category: 'Others',
			tag: 'Mananggiti Commodity',
			desc: '“Tuba” is Waray-Waray for fermented coconut wine with barok, while “Su-oy” is natural coconut vinegar from fermented palm sap.',
			story: '“Tuba” is a Waray-Waray term for coconut wine and this is a fermented drink primarily composed of coconut sap and barok while “Su-oy” is a term for the coconut vinegar and this came from the fermented coconut sap. These products are commonly found in the municipality. Further, being a commodity, can be a source of income on the part of the “mananggiti” and anyone who wishes to sell it.',
			img: '/Tourism/products/Tuba-Suoy.webp',
			origin: 'Tanauan Coconut Groves',
			keyNotes: 'Tuba Wine with Barok • Su-oy Fermented Vinegar • Harvested by Mananggiti',
			ingredients: ['Fresh Coconut Palm Sap', 'Natural Barok Bark (for Tuba)', 'Fermented Coconut Vinegar (Su-oy)'],
			themeColor: '#0F766E', // Palm Grove Teal
			themeBg: '#F0FDFA',
			badge: 'Mananggiti Harvest'
		}
	];

	const processSteps = [
		{
			title: 'The Art of Binagol',
			subtitle: 'Taro Harvest & Caramel Magic',
			desc: 'Talyan taro is slow-simmered with rich coconut milk and muscovado sugar for hours until velvety. A luscious brown sugar caramel is poured into the bottom of a halved coconut shell, covered with the taro dough, and wrapped securely in banana leaves.',
			tag: 'Culinary Heritage',
			iconType: 'sparkles',
			color: '#B45309'
		},
		{
			title: 'Pure Tablea & Sikwate',
			subtitle: 'Spanish Tablear Rolling & Roasting',
			desc: 'Cacao beans are harvested, fermented, and sun-dried before being fire-roasted, peeled, and ground into a smooth cacao mass. Formed into classic balls or tablets ("tablear"), it yields a rich full-fat base for steaming morning sikwate.',
			tag: 'Traditional Cacao',
			iconType: 'layers',
			color: '#78350F'
		},
		{
			title: 'Ancestral Pottery (Daba)',
			subtitle: 'Hand-Molded by Tanauan Lady Potters',
			desc: 'Lady potters in Tanauan produce close to 20 clay pots and curvy jars per day. From classic cooking pots to Zen garden-inspired jars and building bricks, each piece is hand-turned and kiln-fired, keeping this ancient Leyteño trade and livelihood flourishing.',
			tag: 'Living Tradition',
			iconType: 'flame',
			color: '#C2410C'
		},
		{
			title: 'Bariw (Pandan) & Bamboo Weaving',
			subtitle: 'Pandamus Copelandii & Resilient Crafts',
			desc: 'Bariw leaves are harvested and hand-woven into durable banig mats, hats, bags, and portfolios. Reflecting community resilience, local artisans also craft hand-carved coconut shell adornments and rosary beads from wood debris.',
			tag: 'Eco-Artisan & Resilience',
			iconType: 'leaf',
			color: '#15803D'
		}
	];

	const pairings = [
		{
			title: 'Binagol & Hot Sikwate Cacao',
			desc: 'The rich caramel notes of Binagol balance the deep, earthy bitterness of 100% native cacao hot chocolate.',
			iconType: 'coffee',
			accent: '#B45309'
		},
		{
			title: 'Crispy Bulad & Spiced Suoy',
			desc: 'Golden-fried dried fish dipped in tangy, chili-infused coconut vinegar alongside steaming garlic fried rice.',
			iconType: 'fish',
			accent: '#0369A1'
		},
		{
			title: 'Tanauan Lechon & Tuba Suka',
			desc: 'Crackling roast pork paired with aged palm vinegar cuts through richness and heightens the lemongrass aroma.',
			iconType: 'flame',
			accent: '#BE123C'
		},
		{
			title: 'Tsokolate Moron & Barako Coffee',
			desc: 'Warm, steamed chocolate-swirled moron served alongside fresh Visayan drip coffee for the quintessential afternoon merienda.',
			iconType: 'utensils',
			accent: '#701A75'
		}
	];

	// Filtered products list
	$: filteredProducts = products.filter((p) => {
		const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
		const matchesSearch =
			searchQuery.trim() === '' ||
			p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.localName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.keyNotes.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.category.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	function openModal(product) {
		selectedProduct = product;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeModal() {
		selectedProduct = null;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	onMount(() => {
		return () => {
			if (typeof document !== 'undefined') {
				document.body.style.overflow = '';
			}
		};
	});
</script>

<svelte:head>
	<title>Our Products — Tanauan Leyte Cultural & Gastronomic Treasures</title>
	<meta
		name="description"
		content="Discover the appetizing delicacies, sweet pasalubong, and authentic artisanal crafts of Tanauan, Leyte — Binagol, Tsokolate Moron, Crispy Lechon, Daba Pottery, and Bamboo Crafts."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,900;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cinzel:wght@600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="products-page">
	<!-- ═══════════════════════════════════════════════════════════════════ -->
	<!-- 1. WARM APPETIZING HERO SECTION                                    -->
	<!-- ═══════════════════════════════════════════════════════════════════ -->
	<header class="hero-wrap">
		<!-- Soft ambient food-inspired glow circles -->
		<div class="hero-glow glow-caramel"></div>
		<div class="hero-glow glow-palm"></div>
		<div class="hero-pattern"></div>

		<div class="site-container relative z-10 text-center">
			<!-- Food Heritage Badge with SVG Icon -->
			<div class="hero-tag-badge">
				<svg class="w-4 h-4 text-emerald-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
					<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
				</svg>
				<span class="badge-text">Tanauan, Leyte • Flavors & Living Traditions</span>
			</div>

			<!-- Main Warm Headline -->
			<h1 class="hero-heading">
				<span class="eyebrow-text">Warmth of the Earth • Sweetness of the Palms</span>
				<span class="main-title">Authentic Flavors & Handcrafted Treasures</span>
			</h1>

			<!-- Appetizing Lead Paragraph -->
			<p class="hero-lead">
				From the sweet, golden depths of coconut caramel in <strong>Binagol</strong> and silky swirls of chocolate <strong>Moron</strong>, to riverbed clay pottery and sun-dried ocean harvests—taste and experience the true warmth of Tanauan.
			</p>

			<!-- Quick Highlights Bar -->
			<div class="hero-highlights-card">
				<div class="highlight-item">
					<span class="highlight-num text-terracotta">9+</span>
					<span class="highlight-label">Signature Delicacies & Crafts</span>
				</div>
				<div class="highlight-divider"></div>
				<div class="highlight-item">
					<span class="highlight-num text-palm">100%</span>
					<span class="highlight-label">Locally Grown & Harvested</span>
				</div>
				<div class="highlight-divider"></div>
				<div class="highlight-item">
					<span class="highlight-num text-caramel">Generations</span>
					<span class="highlight-label">Of Traditional Craftsmanship</span>
				</div>
			</div>
		</div>
	</header>

	<!-- ═══════════════════════════════════════════════════════════════════ -->
	<!-- 2. SIGNATURE SPOTLIGHT: THE LEGENDARY BINAGOL                      -->
	<!-- ═══════════════════════════════════════════════════════════════════ -->
	<section class="spotlight-wrap">
		<div class="site-container">
			<div class="spotlight-box">
				<!-- High-Res Media -->
				<div class="spotlight-img-frame">
					<img src="/Tourism/products/Binagol.webp" alt="Authentic Tanauan Binagol Delicacy" />
					<div class="spotlight-pill">
						<svg class="w-3.5 h-3.5 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
							<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
						</svg>
						<span>Tanauan's #1 Pasalubong</span>
					</div>
				</div>

				<!-- Editorial Description -->
				<div class="spotlight-details">
					<div class="spotlight-header-group">
						<span class="spotlight-eyebrow">The Sweet Soul of Eastern Visayas</span>
						<h2 class="spotlight-name">The Legendary Binagol</h2>
						<p class="spotlight-subtitle">Mountain Talyan Taro • Slow-Simmered Coconut Milk • Muscovado Caramel</p>
					</div>

					<p class="spotlight-body">
						Served in an authentic halved coconut shell (<em>bagol</em>) and wrapped with banana leaves, Binagol is Tanauan's most celebrated pasalubong. Beneath its smooth, velvety taro crust lies a luscious pool of golden coconut caramel that melts delicately on the palate.
					</p>

					<!-- Tasting Notes Matrix -->
					<div class="flavor-notes-grid">
						<div class="flavor-pill">
							<span class="pill-label">Flavor Profile</span>
							<span class="pill-val">Warm Coconut Caramel & Toasted Taro</span>
						</div>
						<div class="flavor-pill">
							<span class="pill-label">Best Enjoyed</span>
							<span class="pill-val">Warm with Hot Sikwate Cacao</span>
						</div>
						<div class="flavor-pill">
							<span class="pill-label">Packaging</span>
							<span class="pill-val">Natural Coconut Shell & Banana Leaf</span>
						</div>
						<div class="flavor-pill">
							<span class="pill-label">Heritage Roots</span>
							<span class="pill-val">Ancestral Visayan Recipe</span>
						</div>
					</div>

					<button
						type="button"
						class="btn-caramel"
						on:click={() => openModal(products[0])}
					>
						Discover Binagol Story & Recipe →
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════════════ -->
	<!-- 3. CATALOGUE / CATEGORY FILTER & LIVE SEARCH                        -->
	<!-- ═══════════════════════════════════════════════════════════════════ -->
	<section class="catalogue-wrap">
		<div class="site-container">
			<!-- Header -->
			<div class="section-head text-center">
				<span class="head-sub">Taste & Craft Collection</span>
				<h2 class="head-title">Explore All Local Goods</h2>
				<div class="head-line"></div>
			</div>

			<!-- Filter & Search Toolbar -->
			<div class="filter-toolbar">
				<!-- Category Buttons -->
				<div class="filter-categories">
					{#each categories as cat}
						<button
							type="button"
							class="cat-button {activeCategory === cat ? 'active' : ''}"
							on:click={() => (activeCategory = cat)}
						>
							<span>{cat}</span>
							<span class="cat-badge">
								{cat === 'All'
									? products.length
									: products.filter((p) => p.category === cat).length}
							</span>
						</button>
					{/each}
				</div>

				<!-- Search Input -->
				<div class="search-box">
					<svg class="search-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Search delicacies, crafts, ingredients..."
						class="search-field"
					/>
					{#if searchQuery}
						<button type="button" class="search-reset" on:click={() => (searchQuery = '')}>
							✕
						</button>
					{/if}
				</div>
			</div>

			<!-- Products Grid -->
			{#if filteredProducts.length === 0}
				<div class="empty-state-box">
					<svg class="w-12 h-12 mx-auto text-amber-700/60 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
						<circle cx="11" cy="11" r="8"/>
						<path d="m21 21-4.3-4.3"/>
					</svg>
					<h3 class="empty-heading">No products match your search</h3>
					<p class="empty-sub">Try searching for other ingredients or reset your category filters.</p>
					<button
						type="button"
						class="btn-outline-terracotta"
						on:click={() => {
							searchQuery = '';
							activeCategory = 'All';
						}}
					>
						Reset All Filters
					</button>
				</div>
			{:else}
				<div class="goods-grid">
					{#each filteredProducts as product (product.id)}
						<div
							class="good-card"
							role="button"
							tabindex="0"
							on:click={() => openModal(product)}
							on:keydown={(e) => e.key === 'Enter' && openModal(product)}
						>
							<!-- Card Image -->
							<div class="good-img-wrap">
								<img src={product.img} alt={product.name} loading="lazy" class="good-img" />
								<div class="good-img-shade"></div>

								<!-- Badge -->
								<span
									class="good-badge"
									style="background-color: {product.themeBg}; color: {product.themeColor}; border-color: {product.themeColor}33;"
								>
									{product.badge}
								</span>

								<span class="good-category-tag">
									{product.category}
								</span>
							</div>

							<!-- Card Info -->
							<div class="good-content">
								<div class="good-meta-top">
									<span class="good-origin flex items-center gap-1">
										<svg class="w-3.5 h-3.5 text-stone-500 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
											<circle cx="12" cy="10" r="3"/>
										</svg>
										{product.origin}
									</span>
									<span class="good-local" style="color: {product.themeColor};">{product.localName}</span>
								</div>

								<h3 class="good-name">{product.name}</h3>

								<p class="good-desc">{product.desc}</p>

								<!-- Flavor / Note Chip -->
								<div class="good-flavor-chip" style="background: {product.themeBg}; border-color: {product.themeColor}25;">
									<span class="chip-dot" style="background: {product.themeColor};"></span>
									<span class="chip-flavor-text" style="color: {product.themeColor};">{product.keyNotes}</span>
								</div>

								<!-- Action Footer -->
								<div class="good-card-footer" style="color: {product.themeColor};">
									<span class="footer-action-text">Read Heritage Story</span>
									<span class="footer-arrow">→</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════════════ -->
	<!-- 4. CRAFT & CULINARY PROCESS (INTERACTIVE TABS)                     -->
	<!-- ═══════════════════════════════════════════════════════════════════ -->
	<section class="process-wrap">
		<div class="site-container">
			<div class="section-head text-center">
				<span class="head-sub">Artisanal Mastery</span>
				<h2 class="head-title">How Tanauan's Goods are Made</h2>
				<div class="head-line"></div>
			</div>

			<!-- Tab Bar with SVG Icons -->
			<div class="process-tab-nav">
				{#each processSteps as step, idx}
					<button
						type="button"
						class="process-nav-btn {activeProcessTab === idx ? 'active' : ''}"
						on:click={() => (activeProcessTab = idx)}
					>
						{#if step.iconType === 'sparkles'}
							<svg class="w-4 h-4 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>
							</svg>
						{:else if step.iconType === 'layers'}
							<svg class="w-4 h-4 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<polygon points="12 2 2 7 12 12 22 7 12 2"/>
								<polyline points="2 17 12 22 22 17"/>
								<polyline points="2 12 12 17 22 12"/>
							</svg>
						{:else if step.iconType === 'flame'}
							<svg class="w-4 h-4 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
							</svg>
						{:else}
							<svg class="w-4 h-4 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
								<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
							</svg>
						{/if}
						<span class="p-nav-text">{step.title}</span>
					</button>
				{/each}
			</div>

			<!-- Active Process Detail Showcase -->
			<div class="process-showcase-box" transition:fade={{ duration: 200 }}>
				<div class="showcase-header">
					<span
						class="showcase-tag"
						style="color: {processSteps[activeProcessTab].color}; background: {processSteps[activeProcessTab].color}15;"
					>
						{processSteps[activeProcessTab].tag}
					</span>
					<h3 class="showcase-title">{processSteps[activeProcessTab].title}</h3>
					<h4 class="showcase-subtitle">{processSteps[activeProcessTab].subtitle}</h4>
				</div>

				<p class="showcase-desc">{processSteps[activeProcessTab].desc}</p>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════════════ -->
	<!-- 5. PERFECT FLAVOR PAIRINGS (WITH CLEAN SVG ICONS)                   -->
	<!-- ═══════════════════════════════════════════════════════════════════ -->
	<section class="pairings-wrap">
		<div class="site-container">
			<div class="section-head text-center">
				<span class="head-sub">Gastronomic Harmony</span>
				<h2 class="head-title">Classic Tanauan Flavor Pairings</h2>
				<div class="head-line"></div>
			</div>

			<div class="pairings-cards-grid">
				{#each pairings as pair}
					<div class="pairing-item-box">
						<div class="pairing-icon-circle" style="background: {pair.accent}15; color: {pair.accent};">
							{#if pair.iconType === 'coffee'}
								<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
									<path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
									<line x1="6" y1="2" x2="6" y2="4"/>
									<line x1="10" y1="2" x2="10" y2="4"/>
									<line x1="14" y1="2" x2="14" y2="4"/>
								</svg>
							{:else if pair.iconType === 'fish'}
								<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/>
									<path d="M18 12v.5"/>
									<path d="M16 17.93a12.56 12.56 0 0 0-4-3.93"/>
									<path d="M7.4 8.5C5.8 9.5 4 11 2 12c2 1 3.8 2.5 5.4 3.5"/>
								</svg>
							{:else if pair.iconType === 'flame'}
								<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
								</svg>
							{:else}
								<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/>
									<path d="M15 2v10"/>
									<path d="M15 12v10"/>
									<path d="M6 2v20"/>
									<path d="M6 7h4"/>
								</svg>
							{/if}
						</div>
						<h3 class="pairing-name">{pair.title}</h3>
						<p class="pairing-text">{pair.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════════════ -->
	<!-- 6. APPETIZING PULL QUOTE SECTION                                   -->
	<!-- ═══════════════════════════════════════════════════════════════════ -->
	<section class="warm-quote-wrap">
		<div class="site-container">
			<div class="warm-quote-card">
				<span class="warm-quote-symbol">“</span>
				<blockquote class="warm-quote-body">
					Every spoonful of warm Binagol, every swirl of native Tsokolate Moron, and every clay pot fired on our riverbanks carries the soul of Tanauan's soil and the generosity of our people.
				</blockquote>
				<div class="warm-quote-cite">
					<strong>Municipality of Tanauan, Leyte</strong>
					<span>Tourism, Culture & Heritage Office</span>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══════════════════════════════════════════════════════════════════ -->
	<!-- 7. PRODUCT DETAIL MODAL (CLEANED WITHOUT INQUIRE BUTTON)           -->
	<!-- ═══════════════════════════════════════════════════════════════════ -->
	{#if selectedProduct}
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div
			class="modal-overlay"
			transition:fade={{ duration: 200 }}
			on:click={closeModal}
			on:keydown={(e) => e.key === 'Escape' && closeModal()}
			role="dialog"
			tabindex="-1"
			aria-modal="true"
		>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class="modal-card"
				transition:scale={{ start: 0.95, duration: 250, easing: quintOut }}
				on:click|stopPropagation
			>
				<!-- Close Button -->
				<button type="button" class="modal-close-button" on:click={closeModal} aria-label="Close">
					✕
				</button>

				<div class="modal-layout-grid">
					<!-- Product Photo -->
					<div class="modal-img-frame">
						<img src={selectedProduct.img} alt={selectedProduct.name} />
						<div
							class="modal-floating-pill"
							style="background: {selectedProduct.themeColor}; color: #ffffff;"
						>
							{selectedProduct.badge}
						</div>
					</div>

					<!-- Details Section -->
					<div class="modal-text-content">
						<div class="modal-top-tags">
							<span
								class="modal-cat-tag"
								style="color: {selectedProduct.themeColor}; background: {selectedProduct.themeBg};"
							>
								{selectedProduct.category}
							</span>
							<span class="modal-origin-pill flex items-center gap-1">
								<svg class="w-3.5 h-3.5 text-stone-500 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
									<circle cx="12" cy="10" r="3"/>
								</svg>
								{selectedProduct.origin}
							</span>
						</div>

						<h2 class="modal-product-title">{selectedProduct.name}</h2>
						<p class="modal-dialect-name" style="color: {selectedProduct.themeColor};">
							Local Waray name: <em>{selectedProduct.localName}</em>
						</p>

						<div class="modal-story-box">
							<p>{selectedProduct.story}</p>
						</div>

						<!-- Ingredients / Materials Tag Cloud -->
						<div class="modal-ingredients-section">
							<span class="ing-title">Fresh Ingredients & Materials:</span>
							<div class="ing-tag-cloud">
								{#each selectedProduct.ingredients as item}
									<span class="ing-tag-item">
										<svg class="w-3 h-3 text-emerald-700 inline mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
										</svg>
										{item}
									</span>
								{/each}
							</div>
						</div>

						<!-- Flavor / Characteristic Banner -->
						<div
							class="modal-flavor-banner"
							style="border-left-color: {selectedProduct.themeColor}; background: {selectedProduct.themeBg};"
						>
							<span class="flavor-banner-label" style="color: {selectedProduct.themeColor};">Flavor Character:</span>
							<p class="flavor-banner-val">{selectedProduct.keyNotes}</p>
						</div>

						<!-- Clean Close Action -->
						<div class="modal-btn-row">
							<button type="button" class="btn-modal-close" on:click={closeModal}>
								Close Story
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	/* ═══════════════════════════════════════════════════════════════════ */
	/* WARM FOOD & ARTISANAL COLOR THEORY STYLESHEET                       */
	/* ═══════════════════════════════════════════════════════════════════ */

	:global(body) {
		background-color: #FAF7F2;
		color: #2D241E;
		font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
		margin: 0;
		padding: 0;
	}

	.products-page {
		background-color: #FAF7F2;
		color: #2D241E;
		min-height: 100vh;
		position: relative;
		overflow-x: hidden;
	}

	.site-container {
		max-width: 1240px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	/* Text Color Utility Helpers */
	.text-terracotta { color: #C2410C; }
	.text-palm { color: #15803D; }
	.text-caramel { color: #B45309; }

	/* ── 1. Hero Section ── */
	.hero-wrap {
		position: relative;
		padding: 7rem 1.5rem 5rem;
		background: radial-gradient(circle at 50% 25%, #FFF6EB 0%, #FAF7F2 85%);
		border-bottom: 1px solid #EFE4D6;
		overflow: hidden;
	}

	.hero-glow {
		position: absolute;
		border-radius: 9999px;
		filter: blur(120px);
		pointer-events: none;
		opacity: 0.35;
	}

	.glow-caramel {
		top: -100px;
		left: 50%;
		transform: translateX(-50%);
		width: 500px;
		height: 500px;
		background: #FBBF24;
	}

	.glow-palm {
		bottom: 0;
		right: 5%;
		width: 350px;
		height: 350px;
		background: #86EFAC;
	}

	.hero-pattern {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(#D97706 0.75px, transparent 0.75px);
		background-size: 28px 28px;
		opacity: 0.07;
		pointer-events: none;
	}

	.hero-tag-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 1.25rem;
		border-radius: 9999px;
		background: #F0FDF4;
		border: 1px solid #BBF7D0;
		color: #166534;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		margin-bottom: 1.5rem;
		box-shadow: 0 2px 10px rgba(22, 101, 52, 0.08);
	}

	.hero-heading {
		margin: 0 0 1.5rem;
		line-height: 1.1;
	}

	.eyebrow-text {
		display: block;
		font-family: 'Cinzel', serif;
		font-size: clamp(0.85rem, 1.8vw, 1.1rem);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #9A3412;
		margin-bottom: 0.75rem;
		font-weight: 700;
	}

	.main-title {
		display: block;
		font-family: 'Playfair Display', Georgia, serif;
		font-size: clamp(2.5rem, 6vw, 4.8rem);
		font-weight: 700;
		color: #2D241E;
		letter-spacing: -0.02em;
	}

	.hero-lead {
		font-size: clamp(1rem, 2vw, 1.15rem);
		line-height: 1.8;
		color: #5C4E43;
		max-width: 760px;
		margin: 0 auto 2.5rem;
		font-weight: 400;
	}

	.hero-lead strong {
		color: #9A3412;
		font-weight: 600;
	}

	.hero-highlights-card {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		padding: 1.25rem 2.5rem;
		background: #FFFFFF;
		border: 1px solid #EFE4D6;
		border-radius: 1.25rem;
		box-shadow: 0 15px 35px rgba(69, 42, 23, 0.06);
	}

	.highlight-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.highlight-num {
		font-family: 'Playfair Display', serif;
		font-size: 2rem;
		font-weight: 700;
		line-height: 1;
	}

	.highlight-label {
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #786C62;
		margin-top: 0.35rem;
	}

	.highlight-divider {
		width: 1px;
		height: 36px;
		background: #EFE4D6;
	}

	/* ── 2. Curator Spotlight ── */
	.spotlight-wrap {
		padding: 5rem 0;
		background: #FFFDF9;
		border-bottom: 1px solid #EFE4D6;
	}

	.spotlight-box {
		display: grid;
		grid-template-columns: 1fr 1.15fr;
		gap: 3.5rem;
		align-items: center;
		background: #FAF5EE;
		border: 1px solid #EAE0D3;
		border-radius: 2rem;
		padding: 3rem;
		box-shadow: 0 20px 45px rgba(69, 42, 23, 0.05);
	}

	.spotlight-img-frame {
		position: relative;
		border-radius: 1.5rem;
		overflow: hidden;
		aspect-ratio: 4/3;
		box-shadow: 0 15px 35px rgba(69, 42, 23, 0.15);
		border: 4px solid #FFFFFF;
	}

	.spotlight-img-frame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s ease;
	}

	.spotlight-box:hover .spotlight-img-frame img {
		transform: scale(1.04);
	}

	.spotlight-pill {
		position: absolute;
		top: 1rem;
		left: 1rem;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.4rem 0.9rem;
		border-radius: 9999px;
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(8px);
		border: 1px solid #EAE0D3;
		color: #9A3412;
		font-size: 0.75rem;
		font-weight: 700;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
	}

	.spotlight-details {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.spotlight-eyebrow {
		font-family: 'Cinzel', serif;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #B45309;
	}

	.spotlight-name {
		font-family: 'Playfair Display', serif;
		font-size: clamp(2rem, 3.5vw, 2.8rem);
		font-weight: 700;
		color: #2D241E;
		margin: 0.2rem 0;
		line-height: 1.15;
	}

	.spotlight-subtitle {
		font-size: 0.85rem;
		color: #9A3412;
		font-style: italic;
		font-family: 'Playfair Display', serif;
		margin: 0;
	}

	.spotlight-body {
		font-size: 0.96rem;
		line-height: 1.8;
		color: #5C4E43;
		margin: 0;
	}

	.flavor-notes-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.85rem;
		padding: 1.25rem;
		background: #FFFFFF;
		border-radius: 1rem;
		border: 1px solid #EFE4D6;
		margin: 0.25rem 0;
	}

	.flavor-pill {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.pill-label {
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #948679;
		font-weight: 700;
	}

	.pill-val {
		font-size: 0.82rem;
		color: #2D241E;
		font-weight: 600;
	}

	.btn-caramel {
		display: inline-block;
		align-self: flex-start;
		padding: 0.85rem 1.85rem;
		border-radius: 9999px;
		background: #B45309;
		color: #FFFFFF;
		font-size: 0.8rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		border: none;
		cursor: pointer;
		box-shadow: 0 4px 15px rgba(180, 83, 9, 0.3);
		transition: all 0.25s ease;
	}

	.btn-caramel:hover {
		background: #9A3412;
		transform: translateY(-2px);
		box-shadow: 0 8px 22px rgba(180, 83, 9, 0.4);
	}

	/* ── 3. Catalogue & Products Grid ── */
	.catalogue-wrap {
		padding: 5.5rem 0;
	}

	.section-head {
		margin-bottom: 3rem;
	}

	.head-sub {
		display: block;
		font-family: 'Cinzel', serif;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: #B45309;
		margin-bottom: 0.4rem;
	}

	.head-title {
		font-family: 'Playfair Display', serif;
		font-size: clamp(2rem, 3.8vw, 3rem);
		font-weight: 700;
		color: #2D241E;
		margin: 0 0 0.85rem;
	}

	.head-line {
		width: 50px;
		height: 3px;
		background: #B45309;
		border-radius: 2px;
		margin: 0 auto;
	}

	.filter-toolbar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1.25rem;
		background: #FFFFFF;
		border: 1px solid #EFE4D6;
		border-radius: 1.25rem;
		padding: 0.85rem 1.25rem;
		margin-bottom: 3rem;
		box-shadow: 0 6px 20px rgba(69, 42, 23, 0.04);
	}

	.filter-categories {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.cat-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1.15rem;
		border-radius: 9999px;
		font-size: 0.78rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: transparent;
		color: #6B5E53;
		border: 1px solid transparent;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.cat-button:hover {
		color: #2D241E;
		background: #FAF5EE;
	}

	.cat-button.active {
		background: #9A3412;
		color: #FFFFFF;
		font-weight: 700;
		box-shadow: 0 4px 12px rgba(154, 52, 18, 0.3);
	}

	.cat-badge {
		font-size: 0.68rem;
		padding: 0.15rem 0.45rem;
		border-radius: 9999px;
		background: rgba(0, 0, 0, 0.06);
	}

	.cat-button.active .cat-badge {
		background: rgba(255, 255, 255, 0.25);
		color: #FFFFFF;
	}

	.search-box {
		position: relative;
		min-width: 270px;
	}

	.search-svg {
		position: absolute;
		left: 0.9rem;
		top: 50%;
		transform: translateY(-50%);
		width: 0.95rem;
		height: 0.95rem;
		color: #948679;
		pointer-events: none;
	}

	.search-field {
		width: 100%;
		padding: 0.55rem 2.2rem 0.55rem 2.4rem;
		border-radius: 9999px;
		background: #FAF7F2;
		border: 1px solid #EAE0D3;
		color: #2D241E;
		font-size: 0.82rem;
		outline: none;
		transition: border-color 0.2s;
	}

	.search-field:focus {
		border-color: #9A3412;
		background: #FFFFFF;
	}

	.search-reset {
		position: absolute;
		right: 0.85rem;
		top: 50%;
		transform: translateY(-50%);
		background: transparent;
		border: none;
		color: #948679;
		cursor: pointer;
		font-size: 0.75rem;
	}

	.goods-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
		gap: 2rem;
	}

	.good-card {
		background: #FFFFFF;
		border: 1px solid #EFE4D6;
		border-radius: 1.5rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		cursor: pointer;
		transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
		box-shadow: 0 8px 24px rgba(69, 42, 23, 0.04);
	}

	.good-card:hover {
		transform: translateY(-6px);
		border-color: #D97706;
		box-shadow: 0 18px 36px rgba(69, 42, 23, 0.1);
	}

	.good-img-wrap {
		position: relative;
		width: 100%;
		aspect-ratio: 4/3;
		overflow: hidden;
		background: #FAF5EE;
	}

	.good-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.6s ease;
	}

	.good-card:hover .good-img {
		transform: scale(1.06);
	}

	.good-img-shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(45, 36, 30, 0.4) 0%, transparent 60%);
	}

	.good-badge {
		position: absolute;
		top: 0.85rem;
		left: 0.85rem;
		padding: 0.25rem 0.65rem;
		border-radius: 9999px;
		border: 1px solid;
		font-size: 0.65rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		backdrop-filter: blur(8px);
	}

	.good-category-tag {
		position: absolute;
		bottom: 0.85rem;
		right: 0.85rem;
		padding: 0.2rem 0.55rem;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.9);
		color: #2D241E;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	}

	.good-content {
		padding: 1.35rem;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 0.65rem;
	}

	.good-meta-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.72rem;
	}

	.good-origin {
		color: #786C62;
	}

	.good-local {
		font-style: italic;
		font-family: 'Playfair Display', serif;
		font-weight: 600;
	}

	.good-name {
		font-family: 'Playfair Display', serif;
		font-size: 1.35rem;
		font-weight: 700;
		color: #2D241E;
		margin: 0;
	}

	.good-desc {
		font-size: 0.85rem;
		line-height: 1.6;
		color: #5C4E43;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.good-flavor-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 0.7rem;
		border-radius: 8px;
		border: 1px solid;
		font-size: 0.72rem;
		font-weight: 600;
		margin-top: auto;
	}

	.chip-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
	}

	.good-card-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 0.85rem;
		border-top: 1px solid #F3EBE1;
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.footer-arrow {
		font-size: 0.95rem;
		transition: transform 0.2s;
	}

	.good-card:hover .footer-arrow {
		transform: translateX(4px);
	}

	/* ── 4. Process Section ── */
	.process-wrap {
		padding: 5.5rem 0;
		background: #FFFDF9;
		border-top: 1px solid #EFE4D6;
		border-bottom: 1px solid #EFE4D6;
	}

	.process-tab-nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.85rem;
		margin-bottom: 2.5rem;
	}

	.process-nav-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		padding: 0.75rem 1.5rem;
		border-radius: 9999px;
		background: #FFFFFF;
		border: 1px solid #EAE0D3;
		color: #6B5E53;
		font-size: 0.85rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.25s ease;
		box-shadow: 0 2px 8px rgba(69, 42, 23, 0.03);
	}

	.process-nav-btn:hover {
		background: #FAF5EE;
		color: #2D241E;
	}

	.process-nav-btn.active {
		background: #9A3412;
		color: #FFFFFF;
		border-color: #9A3412;
		font-weight: 700;
		box-shadow: 0 4px 15px rgba(154, 52, 18, 0.3);
	}

	.process-showcase-box {
		max-width: 780px;
		margin: 0 auto;
		background: #FAF5EE;
		border: 1px solid #EAE0D3;
		border-radius: 1.5rem;
		padding: 2.5rem;
		text-align: center;
		box-shadow: 0 15px 35px rgba(69, 42, 23, 0.05);
	}

	.showcase-tag {
		display: inline-block;
		font-family: 'Cinzel', serif;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		margin-bottom: 0.65rem;
	}

	.showcase-title {
		font-family: 'Playfair Display', serif;
		font-size: 2rem;
		font-weight: 700;
		color: #2D241E;
		margin: 0 0 0.4rem;
	}

	.showcase-subtitle {
		font-size: 0.95rem;
		color: #9A3412;
		font-style: italic;
		font-family: 'Playfair Display', serif;
		margin: 0 0 1.25rem;
	}

	.showcase-desc {
		font-size: 0.98rem;
		line-height: 1.8;
		color: #5C4E43;
		margin: 0;
	}

	/* ── 5. Pairings Section ── */
	.pairings-wrap {
		padding: 5.5rem 0;
	}

	.pairings-cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.pairing-item-box {
		background: #FFFFFF;
		border: 1px solid #EFE4D6;
		border-radius: 1.25rem;
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		box-shadow: 0 6px 18px rgba(69, 42, 23, 0.03);
		transition: transform 0.25s, box-shadow 0.25s;
	}

	.pairing-item-box:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 28px rgba(69, 42, 23, 0.08);
	}

	.pairing-icon-circle {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.25rem;
	}

	.pairing-name {
		font-family: 'Playfair Display', serif;
		font-size: 1.15rem;
		font-weight: 700;
		color: #2D241E;
		margin: 0;
	}

	.pairing-text {
		font-size: 0.82rem;
		line-height: 1.6;
		color: #5C4E43;
		margin: 0;
	}

	/* ── 6. Quote Section ── */
	.warm-quote-wrap {
		padding: 5rem 0;
		background: radial-gradient(circle at 50% 50%, #FFF7ED 0%, #FAF7F2 75%);
		border-top: 1px solid #EFE4D6;
	}

	.warm-quote-card {
		max-width: 820px;
		margin: 0 auto;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.warm-quote-symbol {
		font-family: 'Playfair Display', Georgia, serif;
		font-size: 4rem;
		line-height: 1;
		color: #C2410C;
		opacity: 0.5;
		margin-bottom: -0.85rem;
	}

	.warm-quote-body {
		font-family: 'Playfair Display', Georgia, serif;
		font-size: clamp(1.25rem, 2.5vw, 1.85rem);
		font-weight: 400;
		font-style: italic;
		line-height: 1.6;
		color: #3B2F28;
		margin: 0 0 1.5rem;
	}

	.warm-quote-cite strong {
		display: block;
		font-size: 0.8rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #9A3412;
		margin-bottom: 0.2rem;
	}

	.warm-quote-cite span {
		font-size: 0.78rem;
		color: #786C62;
	}

	/* ── 7. Modal Dialog ── */
	.modal-overlay {
		position: fixed;
		inset: 0;
		z-index: 9999;
		background: rgba(35, 25, 18, 0.75);
		backdrop-filter: blur(10px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}

	.modal-card {
		position: relative;
		width: 100%;
		max-width: 920px;
		max-height: 90vh;
		background: #FFFDF9;
		border: 1px solid #EAE0D3;
		border-radius: 1.75rem;
		overflow-y: auto;
		box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
		padding: 2.25rem;
	}

	.modal-close-button {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 50%;
		background: #F3EBE1;
		border: none;
		color: #4A3E35;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		font-size: 0.95rem;
		transition: all 0.2s;
		z-index: 10;
	}

	.modal-close-button:hover {
		background: #9A3412;
		color: #FFFFFF;
	}

	.modal-layout-grid {
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: 2.25rem;
		align-items: start;
	}

	.modal-img-frame {
		position: relative;
		border-radius: 1.25rem;
		overflow: hidden;
		aspect-ratio: 1;
		border: 1px solid #EAE0D3;
		background: #FAF5EE;
	}

	.modal-img-frame img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.modal-floating-pill {
		position: absolute;
		top: 0.85rem;
		left: 0.85rem;
		padding: 0.3rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.68rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.modal-text-content {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.modal-top-tags {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.modal-cat-tag {
		padding: 0.2rem 0.6rem;
		border-radius: 6px;
	}

	.modal-origin-pill {
		color: #786C62;
	}

	.modal-product-title {
		font-family: 'Playfair Display', serif;
		font-size: clamp(1.6rem, 2.5vw, 2.2rem);
		font-weight: 700;
		color: #2D241E;
		margin: 0;
		line-height: 1.15;
	}

	.modal-dialect-name {
		font-size: 0.85rem;
		margin: 0;
	}

	.modal-story-box {
		font-size: 0.9rem;
		line-height: 1.75;
		color: #5C4E43;
	}

	.modal-ingredients-section {
		background: #FAF5EE;
		border: 1px solid #EAE0D3;
		border-radius: 0.85rem;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.ing-title {
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #786C62;
	}

	.ing-tag-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.ing-tag-item {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem 0.6rem;
		border-radius: 6px;
		background: #FFFFFF;
		border: 1px solid #E5DACB;
		color: #3B2F28;
		font-size: 0.72rem;
		font-weight: 600;
	}

	.modal-flavor-banner {
		padding: 0.65rem 0.85rem;
		border-left: 3px solid;
		border-radius: 0 6px 6px 0;
	}

	.flavor-banner-label {
		display: block;
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.flavor-banner-val {
		font-size: 0.82rem;
		color: #2D241E;
		margin: 0.15rem 0 0;
		font-weight: 600;
	}

	.modal-btn-row {
		display: flex;
		gap: 0.85rem;
		margin-top: 0.5rem;
	}

	.btn-modal-close {
		width: 100%;
		padding: 0.85rem 1.5rem;
		border-radius: 9999px;
		background: #9A3412;
		color: #FFFFFF;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		border: none;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.btn-modal-close:hover {
		background: #7C2D12;
	}

	/* ── Empty State ── */
	.empty-state-box {
		text-align: center;
		padding: 4rem 2rem;
		background: #FFFFFF;
		border-radius: 1.5rem;
		border: 1px solid #EFE4D6;
	}

	.empty-heading {
		font-family: 'Playfair Display', serif;
		font-size: 1.6rem;
		font-weight: 700;
		color: #2D241E;
		margin: 0 0 0.4rem;
	}

	.empty-sub {
		font-size: 0.88rem;
		color: #786C62;
		margin: 0 0 1.25rem;
	}

	.btn-outline-terracotta {
		padding: 0.65rem 1.4rem;
		border-radius: 9999px;
		background: transparent;
		border: 1px solid #9A3412;
		color: #9A3412;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		cursor: pointer;
	}

	.btn-outline-terracotta:hover {
		background: #9A3412;
		color: #FFFFFF;
	}

	/* ═══════════════════════════════════════════════════════════════════ */
	/* RESPONSIVE DESIGN (TABLET & MOBILE)                                */
	/* ═══════════════════════════════════════════════════════════════════ */

	@media (max-width: 992px) {
		.spotlight-box {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding: 2rem;
		}

		.modal-layout-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.hero-wrap {
			padding: 5.5rem 1rem 3.5rem;
		}

		.hero-highlights-card {
			gap: 1rem;
			padding: 1rem 1.5rem;
		}

		.highlight-num {
			font-size: 1.5rem;
		}

		.filter-toolbar {
			flex-direction: column;
			align-items: stretch;
		}

		.search-box {
			min-width: 100%;
		}

		.goods-grid {
			grid-template-columns: 1fr;
		}

		.process-showcase-box {
			padding: 1.75rem 1.25rem;
		}

		.modal-card {
			padding: 1.5rem;
		}
	}
</style>
