<script>
	import { fade, fly, scale } from 'svelte/transition';

	// Modal State
	let isFolderOpen = $state(false);
	let activeImageIndex = $state(0);
	let isHovered = $state(false);
	let fullscreenImage = $state(null);

	const brapPhotos = [
		{
			src: '/images/accomplishments/civil-registrar/brap/brap-1.jpg',
			title: 'Barangayan 2024 Serbisyo Fair — Community COLB Releasing',
			description:
				'Municipal Civil Registrar officers, municipal executives, and community families holding their newly released Certificates of Live Birth (COLB) during the Barangayan 2024 Serbisyo Fair in Tanauan.'
		},
		{
			src: '/images/accomplishments/civil-registrar/brap/brap-2.jpg',
			title: 'Beneficiaries Displaying Official PSA Birth Certificates',
			description:
				'Dozens of resident beneficiaries seated at the barangay center proudly presenting their registered civil registry birth certificates processed under BRAP.'
		},
		{
			src: '/images/accomplishments/civil-registrar/brap/brap-3.jpg',
			title: 'Ceremonial Certificate Handover & Institutional Recognition',
			description:
				'Official turnover and ceremonial presentation of BRAP milestone certificates with municipal leaders and civil registry personnel.'
		},
		{
			src: '/images/accomplishments/civil-registrar/brap/brap-4.jpg',
			title: 'Frontline Civil Registry Officers & Municipal Delegations',
			description:
				'Collaborative field operations between Tanauan Municipal Civil Registrar staff and local officials during the mass birth certificate distribution.'
		},
		{
			src: '/images/accomplishments/civil-registrar/brap/brap-5.jpg',
			title: 'Official COLB Document Issuance with PhilSys Integration',
			description:
				'MCR personnel officially presenting a verified security-paper Certificate of Live Birth to an empowered beneficiary at the PhilSys registration kiosk.'
		},
		{
			src: '/images/accomplishments/civil-registrar/brap/brap-6.jpg',
			title: 'On-Site Mobile Civil Registry Encoding & Verification Desk',
			description:
				'Mobile workstations deployed to barangay covered courts, providing electronic verification, live encoding, and printing for rural residents.'
		},
		{
			src: '/images/accomplishments/civil-registrar/brap/brap-7.jpg',
			title: 'Municipal Civil Registrar Field Team & Partners',
			description:
				'The dedicated personnel of the Office of the Municipal Civil Registrar of Tanauan, Leyte, coordinating logistics and client intake.'
		},
		{
			src: '/images/accomplishments/civil-registrar/brap/brap-8.jpg',
			title: 'Comprehensive Mobile Registration Operations Desk',
			description:
				'Multi-terminal registration setup facilitating batch processing, affidavit execution, and identity verification in the field.'
		},
		{
			src: '/images/accomplishments/civil-registrar/brap/brap-9.jpg',
			title: 'Direct Client Assistance & Requirements Review Desk',
			description:
				'Civil registrar staff conducting one-on-one evaluations with residents for delayed registration and clerical document corrections.'
		}
	];

	function openFolder() {
		isFolderOpen = true;
		activeImageIndex = 0;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	}

	function closeFolder() {
		isFolderOpen = false;
		fullscreenImage = null;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function nextImage() {
		activeImageIndex = (activeImageIndex + 1) % brapPhotos.length;
	}

	function prevImage() {
		activeImageIndex = (activeImageIndex - 1 + brapPhotos.length) % brapPhotos.length;
	}

	function handleKeydown(e) {
		if (!isFolderOpen) return;
		if (e.key === 'Escape') {
			if (fullscreenImage) {
				fullscreenImage = null;
			} else {
				closeFolder();
			}
		} else if (e.key === 'ArrowRight') {
			nextImage();
		} else if (e.key === 'ArrowLeft') {
			prevImage();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="relative w-full">
	<!-- Interactive 3D Folder Container -->
	<div class="mx-auto max-w-4xl">
		<button
			type="button"
			onclick={openFolder}
			onmouseenter={() => (isHovered = true)}
			onmouseleave={() => (isHovered = false)}
			class="group relative block w-full text-left focus:outline-none focus:ring-4 focus:ring-amber-400/50 rounded-3xl"
			aria-label="Open Birth Registration Assistance Project Accomplishment Folder"
		>
			<!-- Ambient Backlight Glow -->
			<div
				class="absolute -inset-2 rounded-[32px] bg-gradient-to-r from-blue-700 via-amber-400 to-indigo-700 opacity-20 blur-xl transition-all duration-500 group-hover:opacity-40 group-hover:blur-2xl"
			></div>

			<!-- Folder Base Exterior Shell -->
			<div
				class="relative overflow-hidden rounded-3xl border-2 border-slate-300 bg-gradient-to-b from-amber-50/90 via-white to-slate-100 p-6 sm:p-10 shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-amber-400 group-hover:shadow-2xl"
			>
				<!-- Top Folder Tab (Realistic Manila / Civic Dossier Tab) -->
				<div class="absolute -top-1 left-8 sm:left-12 flex items-center">
					<div
						class="flex items-center gap-2 rounded-t-xl border-t-2 border-x-2 border-amber-400/80 bg-amber-400 px-5 py-1.5 text-xs font-black tracking-wider text-blue-950 uppercase shadow-md transition-transform duration-300 group-hover:-translate-y-1"
					>
						<span class="inline-block h-2 w-2 rounded-full bg-blue-950 animate-pulse"></span>
						<span>OFFICIAL DOSSIER // MCR-BRAP-2024</span>
					</div>
				</div>

				<!-- Subtle Folder Watermark / Pattern Background -->
				<div class="pointer-events-none absolute right-4 bottom-4 text-slate-100 font-black text-8xl sm:text-9xl select-none opacity-40">
					BRAP
				</div>

				<div class="relative z-10 pt-4">
					<!-- Top Meta Header -->
					<div class="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
						<div class="flex items-center gap-2.5">
							<span class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-950 text-amber-300 text-lg shadow-inner">
								📁
							</span>
							<div>
								<span class="text-[11px] font-mono font-black tracking-wider text-blue-900 uppercase">
									MUNICIPAL CIVIL REGISTRAR // FLAGSHIP PROGRAM
								</span>
								<h3 class="text-xl sm:text-2xl font-black text-blue-950 tracking-tight">
									Birth Registration Assistance Project (BRAP)
								</h3>
							</div>
						</div>

						<span
							class="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800 uppercase tracking-wide shadow-sm"
						>
							<span class="h-2 w-2 rounded-full bg-emerald-500"></span>
							Active Community Project
						</span>
					</div>

					<!-- Visual Peek: Layered Documents peeking out with smooth CSS tilt -->
					<div class="relative mb-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-6 overflow-hidden">
						<!-- Folder Flap Visual Animation -->
						<div
							class="flex flex-col md:flex-row items-center justify-between gap-6 transition-transform duration-500 {isHovered ? 'scale-[1.01]' : ''}"
						>
							<!-- Document Description -->
							<div class="flex-1 space-y-3">
								<p class="text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
									Free delayed birth registration, mobile encoding, and issuance of security-paper
									Certificates of Live Birth (COLB) for marginalized and underserved residents across Tanauan’s 54 barangays.
								</p>

								<!-- Quick Key Highlights Pills -->
								<div class="flex flex-wrap gap-2 pt-1">
									<span class="rounded-lg bg-blue-100/80 border border-blue-200 px-2.5 py-1 text-xs font-bold text-blue-900">
										📜 9 Photographic Disclosures
									</span>
									<span class="rounded-lg bg-amber-100/80 border border-amber-200 px-2.5 py-1 text-xs font-bold text-amber-950">
										🏛️ PSA & BLGU Partnership
									</span>
									<span class="rounded-lg bg-emerald-100/80 border border-emerald-200 px-2.5 py-1 text-xs font-bold text-emerald-950">
										₱0 Free Civic Service
									</span>
								</div>
							</div>

							<!-- Overlapping Stacked Photo Preview Cards -->
							<div class="relative h-28 w-44 sm:h-32 sm:w-56 shrink-0">
								<!-- 3rd Layer -->
								<div
									class="absolute right-6 top-1 h-24 w-36 sm:h-28 sm:w-44 rounded-xl border-2 border-white bg-slate-300 shadow-md transition-all duration-500 overflow-hidden {isHovered ? 'rotate-12 translate-x-3 -translate-y-2' : 'rotate-6'}"
								>
									<img src={brapPhotos[2].src} alt="" class="h-full w-full object-cover" />
								</div>
								<!-- 2nd Layer -->
								<div
									class="absolute right-3 top-2 h-24 w-36 sm:h-28 sm:w-44 rounded-xl border-2 border-white bg-slate-200 shadow-md transition-all duration-500 overflow-hidden {isHovered ? '-rotate-6 -translate-x-2 -translate-y-1' : '-rotate-3'}"
								>
									<img src={brapPhotos[1].src} alt="" class="h-full w-full object-cover" />
								</div>
								<!-- 1st Top Layer -->
								<div
									class="absolute right-0 top-3 h-24 w-36 sm:h-28 sm:w-44 rounded-xl border-2 border-amber-400 bg-white shadow-xl transition-all duration-500 overflow-hidden {isHovered ? 'scale-105 shadow-2xl' : ''}"
								>
									<img src={brapPhotos[0].src} alt="" class="h-full w-full object-cover" />
									<div class="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent flex items-end p-2">
										<span class="text-[10px] font-black text-amber-300 uppercase tracking-wide">
											Preview Record
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Bottom Folder Footer & Interactive Click Button -->
					<div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
						<div class="flex items-center gap-2 text-xs font-bold text-slate-500">
							<span class="inline-block h-2 w-2 rounded-full bg-amber-500"></span>
							<span>Click anywhere on this folder to inspect full project records & gallery</span>
						</div>

						<div
							class="inline-flex items-center gap-2 rounded-2xl bg-blue-950 px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300 shadow-lg transition-all duration-300 group-hover:bg-blue-900 group-hover:scale-105 group-hover:shadow-amber-400/20 active:scale-95"
						>
							<span>Open Accomplishment Dossier</span>
							<span class="text-base transition-transform duration-300 group-hover:translate-x-1">📂 ↗</span>
						</div>
					</div>
				</div>
			</div>
		</button>
	</div>

	<!-- POPUP MODAL WINDOW (Information & Photo Showcase) -->
	{#if isFolderOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
			transition:fade={{ duration: 250 }}
			onclick={closeFolder}
			onkeydown={(e) => e.key === 'Escape' && closeFolder()}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-brap-title"
			tabindex="-1"
		>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="relative my-auto w-full max-w-5xl rounded-3xl border-2 border-amber-400/60 bg-white shadow-2xl overflow-hidden"
				transition:scale={{ duration: 300, start: 0.95 }}
				onclick={(e) => e.stopPropagation()}
			>
				<!-- Top Header Bar with Accent Gradient -->
				<div class="relative border-b-2 border-slate-200 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 px-6 py-5 text-white">
					<div class="flex items-center justify-between gap-4">
						<div class="flex items-center gap-3">
							<div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400 text-blue-950 text-xl font-black shadow-md">
								📁
							</div>
							<div>
								<div class="flex items-center gap-2">
									<span class="text-[10px] font-mono font-black tracking-widest text-amber-400 uppercase">
										OFFICIAL ACCOMPLISHMENT DOSSIER
									</span>
									<span class="rounded bg-blue-800/80 px-2 py-0.5 text-[9px] font-black text-blue-200 uppercase">
										MCR Tanauan
									</span>
								</div>
								<h2 id="modal-brap-title" class="text-xl sm:text-2xl font-black tracking-tight text-white">
									Birth Registration Assistance Project (BRAP)
								</h2>
							</div>
						</div>

						<!-- Close Button -->
						<button
							type="button"
							onclick={closeFolder}
							class="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white transition-all hover:bg-amber-400 hover:text-blue-950 hover:scale-105 active:scale-95"
							aria-label="Close modal"
						>
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				<!-- Modal Body Content -->
				<div class="max-h-[78vh] overflow-y-auto p-6 sm:p-8 space-y-8 bg-slate-50/50">
					<!-- Project Summary Banner -->
					<div class="grid gap-4 sm:grid-cols-3">
						<div class="rounded-2xl border border-blue-200 bg-blue-50/70 p-4">
							<div class="text-[10px] font-black uppercase tracking-wider text-blue-700">Project Mandate</div>
							<div class="mt-1 text-sm font-black text-blue-950">Universal Legal Identity</div>
							<p class="mt-1 text-xs text-slate-600">Ensuring every Tanauananon is officially registered pursuant to RA 3753.</p>
						</div>

						<div class="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
							<div class="text-[10px] font-black uppercase tracking-wider text-amber-800">Coverage & Reach</div>
							<div class="mt-1 text-sm font-black text-amber-950">54 Municipal Barangays</div>
							<p class="mt-1 text-xs text-slate-600">Mobile caravans deployed directly to barangay covered courts and centers.</p>
						</div>

						<div class="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
							<div class="text-[10px] font-black uppercase tracking-wider text-emerald-800">Beneficiary Cost</div>
							<div class="mt-1 text-sm font-black text-emerald-950">100% Free Public Service</div>
							<p class="mt-1 text-xs text-slate-600">All filing, late registration penalties, and document fees subsidized by government.</p>
						</div>
					</div>

					<!-- Narrative Overview -->
					<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
						<h3 class="text-base font-black text-blue-950 mb-2 flex items-center gap-2">
							<span class="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
							Program Narrative & Impact
						</h3>
						<p class="text-sm leading-relaxed text-slate-700">
							The <strong>Birth Registration Assistance Project (BRAP)</strong> is an institutional initiative of the
							<strong>Philippine Statistics Authority (PSA)</strong> implemented in close coordination with the
							<strong>Office of the Municipal Civil Registrar (MCR) of Tanauan, Leyte</strong>. BRAP seeks to ensure that
							all Filipinos, especially those in marginalized, indigenous, and low-income communities who have never had their
							vital events registered, receive an official <strong>Certificate of Live Birth (COLB)</strong> free of charge.
						</p>
						<p class="mt-3 text-sm leading-relaxed text-slate-700">
							Through Tanauan’s <strong>Barangayan Serbisyo Fairs</strong>, the MCR team under Municipal Civil Registrar
							<strong>Vincent Francis A. Salvaña</strong> conducts on-site intake, review of baptismal/joint affidavits,
							mobile data encoding, PhilSys biometric verification, and immediate document release—unlocking vital legal rights,
							school enrollment, social welfare benefits, and senior citizen services for previously unregistered citizens.
						</p>
					</div>

					<!-- Photo Gallery Showcase Section -->
					<div class="rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
						<div class="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
							<div>
								<span class="text-[10px] font-mono font-black tracking-wider text-blue-900 uppercase">
									PHOTOGRAPHIC EVIDENCE // 0{activeImageIndex + 1} OF 0{brapPhotos.length}
								</span>
								<h4 class="text-lg font-black text-blue-950">Field Operations & Distribution Gallery</h4>
							</div>

							<!-- Image Navigation Controls -->
							<div class="flex items-center gap-2">
								<button
									type="button"
									onclick={prevImage}
									class="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 text-slate-800 transition hover:bg-blue-950 hover:text-amber-300 hover:border-blue-950"
									aria-label="Previous photo"
								>
									←
								</button>
								<button
									type="button"
									onclick={nextImage}
									class="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 text-slate-800 transition hover:bg-blue-950 hover:text-amber-300 hover:border-blue-950"
									aria-label="Next photo"
								>
									→
								</button>
							</div>
						</div>

						<!-- Main Highlight Display Image -->
						<div class="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-200">
							<img
								src={brapPhotos[activeImageIndex].src}
								alt={brapPhotos[activeImageIndex].title}
								class="h-72 sm:h-96 w-full object-contain bg-slate-950 transition-all duration-300"
							/>

							<!-- Click to Expand Button -->
							<button
								type="button"
								onclick={() => (fullscreenImage = brapPhotos[activeImageIndex])}
								class="absolute top-3 right-3 rounded-xl bg-slate-950/70 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-amber-400 hover:text-blue-950"
							>
								🔍 View Fullscreen
							</button>

							<!-- Image Caption Overlay -->
							<div class="p-4 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/50 text-white">
								<h5 class="text-base font-black text-amber-300">
									{brapPhotos[activeImageIndex].title}
								</h5>
								<p class="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
									{brapPhotos[activeImageIndex].description}
								</p>
							</div>
						</div>

						<!-- Interactive Thumbnail Row -->
						<div class="mt-4 grid grid-cols-5 sm:grid-cols-9 gap-2">
							{#each brapPhotos as photo, idx}
								<button
									type="button"
									onclick={() => (activeImageIndex = idx)}
									class="relative h-14 sm:h-16 w-full overflow-hidden rounded-xl border-2 transition-all duration-200 {activeImageIndex === idx ? 'border-amber-500 scale-105 shadow-md' : 'border-slate-200 opacity-60 hover:opacity-100'}"
								>
									<img src={photo.src} alt="" class="h-full w-full object-cover" />
								</button>
							{/each}
						</div>
					</div>

					<!-- Official Project Partners & Implementing Unit -->
					<div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
						<div class="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Implementing Office & Coordination</div>
						<div class="grid gap-4 sm:grid-cols-2 text-sm">
							<div>
								<div class="font-black text-blue-950">Office of the Municipal Civil Registrar (MCR)</div>
								<div class="text-xs text-slate-600 mt-0.5">Ground Floor, Tanauan Town Hall, Real St., Tanauan, Leyte</div>
								<div class="text-xs font-semibold text-blue-800 mt-1">Lead: Vincent Francis A. Salvaña, Municipal Civil Registrar</div>
							</div>
							<div>
								<div class="font-black text-blue-950">National & Inter-Agency Partners</div>
								<div class="text-xs text-slate-600 mt-0.5">Philippine Statistics Authority (PSA) • PhilSys Registry Team</div>
								<div class="text-xs font-semibold text-slate-700 mt-1">Tanauan Municipal Government Executive Support</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Modal Footer -->
				<div class="flex items-center justify-between border-t-2 border-slate-200 bg-slate-100 px-6 py-4">
					<div class="text-xs font-bold text-slate-600">
						Official Transparency & Performance Record • MCR Tanauan
					</div>
					<button
						type="button"
						onclick={closeFolder}
						class="rounded-xl bg-blue-950 hover:bg-blue-900 px-6 py-2.5 text-xs font-black uppercase tracking-wider text-amber-300 shadow-sm transition hover:scale-105 active:scale-95"
					>
						Close Dossier
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Fullscreen Lightbox View if clicked -->
	{#if fullscreenImage}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="fixed inset-0 z-60 flex items-center justify-center bg-black/95 p-4"
			transition:fade={{ duration: 200 }}
			onclick={() => (fullscreenImage = null)}
			onkeydown={(e) => e.key === 'Escape' && (fullscreenImage = null)}
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<button
				type="button"
				class="absolute top-5 right-5 text-3xl font-bold text-white hover:text-amber-400"
				onclick={() => (fullscreenImage = null)}
			>
				✕
			</button>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="max-h-[90vh] max-w-5xl text-center" onclick={(e) => e.stopPropagation()}>
				<img
					src={fullscreenImage.src}
					alt={fullscreenImage.title}
					class="mx-auto max-h-[80vh] rounded-xl object-contain shadow-2xl"
				/>
				<div class="mt-3 text-white text-sm font-black">{fullscreenImage.title}</div>
				<div class="mt-1 text-slate-300 text-xs">{fullscreenImage.description}</div>
			</div>
		</div>
	{/if}
</div>
