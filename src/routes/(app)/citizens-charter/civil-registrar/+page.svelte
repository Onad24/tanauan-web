<script>
	import { onMount } from 'svelte';

	// Citizen Charter Data
	let charter = {
		title: "CITIZEN'S CHARTER — Municipal Civil Registrar",
		office: 'Office of the Municipal Civil Registrar, Tanauan, Leyte',
		head_of_office: {
			name: 'Vincent Francis A. Salvaña',
			position: 'Department Head',
			office: 'Office of the Municipal Civil Registrar, Tanauan, Leyte'
		},
		vision:
			'The office of the Municipal Civil Registrar implements civil registration programs of the Municipality pursuant to the Civil Registry Law.',
		services: [
			{
				id: 'documents',
				title: 'Application for Documents (Birth, Marriage, Death)',
				about:
					'Register birth, marriage, and death events within the prescribed period and receive certificates.',
				processing_time: '34 minutes',
				requirements: [
					'Birth: Marriage Contract of Parents, PSA Negative Certificate of the Child, Baptismal Certificate of the Child, Affidavit of 2 Disinterested Persons (Delayed Registration), Current Community Tax Certificate/Valid ID, Affidavit to Use the Surname of the Father (if parents are not married)',
					'Marriage: Copy of COM for Registration, Joint affidavit of the applicant duly notarized (for delayed registration), Negative Result from PSA (for delayed registration), Old copy of the unregistered document (for delayed registration)',
					'Death: Personal appearance of informant (spouse or nearest kin) if death occurred at home, Death Certificate prepared by hospital if death occurred in hospital'
				],
				steps: [
					'Proceed to the Municipal Civil Registrar’s Office (MCR) and verbalize request',
					'If document/s is available proceed to Municipal Treasury Office (MTO) for payment',
					'Present Official Receipt to registry clerk',
					'Checks and signs the certificate',
					'Receives the Certificate'
				],
				fees: 'Php 80.00',
				in_charge:
					'Vincent Francis A. Salvaña / Virginia Parmo / Miracelo Vertudes / Ma. Clenia Pilola'
			},
			{
				id: 'marriage_license',
				title: 'Application for Marriage License',
				about:
					'File separate sworn applications for marriage license with the proper local civil registrar.',
				processing_time: '10 days & 1 hour',
				requirements: [
					'Pre-marital Counselling Certificates',
					'Birth/Baptismal Certificates of Contracting Parties/Valid ID/CTC',
					'Parental Consent (if minor)',
					'Parental Advise (21-24 of age)',
					'Certificate of No Marriage (CENOMAR)',
					'Duly Notarized Affidavit of Cohabitant for couples living together 5+ years'
				],
				steps: [
					'Applicants to proceed to the Municipal Civil Registrar’s Office (MCR) and verbalize request',
					'Applicants submit requirements',
					'If requirements are complete, proceed for payment to MTO',
					'Applicants present Official Receipt to registry clerk',
					'Posting of Notice of Application',
					'Claim Marriage License after posting'
				],
				fees: 'Php 150.00',
				in_charge:
					'Vincent Francis A. Salvaña / Virginia Parmo / Miracelo Vertudes / Ma. Clenia Pilola'
			},
			{
				id: 'timely_registration',
				title: 'Timely Registration of Vital Events (Birth, Marriage, Death)',
				about:
					'Register all vital events within the prescribed period and release owner’s copy of registered documents.',
				processing_time: '50 minutes',
				requirements: [],
				steps: [
					'Proceed to MCR Office and provide needed info',
					'Review civil registry form and let signatories affix signatures',
					'Claim owner’s copy of registered documents'
				],
				fees: '-',
				in_charge: 'Vincent Francis A. Salvaña / Virginia Parmo'
			},
			{
				id: 'late_registration',
				title: 'Late Registration of Vital Events (Birth, Marriage, Death)',
				about:
					'Register vital events beyond the prescribed period and secure delayed registration certificates.',
				processing_time: 'Depends on event',
				requirements: [
					'Birth: PSA Negative Registration, Baptismal Certificate, Form 137-E / School Certification, Marriage Contract of Parents, AUSF & AAP if not married, Voter’s Registration Record, Affidavit of two disinterested persons',
					'Marriage: PSA Negative Registration, Certificate of Marriage (Form 97), Marriage Certificate from parish/religious sector, Joint Affidavit of two disinterested persons',
					'Death: PSA Negative Certification, Certificate of Death signed by Municipal Health Officer, Joint Affidavit of two disinterested persons'
				],
				steps: [
					'Proceed to MCR Office and verbalize request',
					'Submit required documents',
					'Review and sign civil registry forms',
					'MCR subscribes affidavits',
					'Posting of Notice of Delayed Registration',
					'Approved registration of vital events',
					'Claim owner’s copy of late registered documents'
				],
				fees: 'Php 50 – 30 per affidavit depending on event',
				in_charge:
					'Vincent Francis A. Salvaña / Virginia Parmo / Miracelo Vertudes / Ma. Clenia Pilola'
			},
			{
				id: 'breqs',
				title: 'Batch Request Query System (BREQS)',
				about:
					'Submit requests for multiple civil registry documents and track their release from PSA CRS outlets.',
				processing_time: '7 working days + half day for delivery',
				requirements: [
					'Application Form: WHITE – Certificate of Live Birth, PINK – Certificate of Marriage, YELLOW – Certificate of Death, GREEN – Certificate of No Marriage/Advisory on Marriage'
				],
				steps: [
					'Submit all requirements to BREQS Collecting Officer',
					'Wait for PSA schedule for release',
					'Office Personnel travels to CRS outlet to claim request',
					'Client claims requested Civil Registry documents'
				],
				fees: 'Php 155 – 210 per copy depending on document type',
				in_charge: 'Vincent Francis A. Salvaña / Jovey Ann B. Buendia / Ma. Cyril C. Bibar'
			}
		],
		feedback:
			'For inquiries or complaints, clients may approach the office directly or submit feedback through official channels.',
		note_unreadable:
			'Please verify all civil registry details with the Municipal Civil Registrar before finalizing transactions.'
	};

	// Navigation
	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Modal (Zoom + Pan)
	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/MCR.webp';

	function openImageModal(src = modalSrc) {
		modalSrc = src;
		modalOpen = true;
		document.body.style.overflow = 'hidden';
		zoom = 1;
		pos = { x: 0, y: 0 };
	}

	function closeImageModal() {
		modalOpen = false;
		document.body.style.overflow = '';
	}

	function downloadModalImage() {
		const a = document.createElement('a');
		a.href = modalSrc;
		a.download = modalSrc.split('/').pop();
		document.body.appendChild(a);
		a.click();
		a.remove();
	}

	// Zoom & Pan logic
	let zoom = 1;
	let pos = { x: 0, y: 0 };
	let lastPos = { x: 0, y: 0 };
	let dragging = false;
	let initialDistance = 0;
	let initialZoom = 1;

	function onWheel(e) {
		e.preventDefault();
		const delta = e.deltaY < 0 ? 0.1 : -0.1;
		const newZoom = Math.min(Math.max(zoom + delta, 1), 5);
		const rect = e.target.getBoundingClientRect();
		const offsetX = e.clientX - rect.left;
		const offsetY = e.clientY - rect.top;
		const dx = offsetX - rect.width / 2;
		const dy = offsetY - rect.height / 2;
		pos.x -= dx * (newZoom / zoom - 1);
		pos.y -= dy * (newZoom / zoom - 1);
		zoom = newZoom;
	}

	function startDrag(e) {
		dragging = true;
		lastPos = { x: e.clientX, y: e.clientY };
	}
	function onDrag(e) {
		if (!dragging) return;
		pos.x += e.clientX - lastPos.x;
		pos.y += e.clientY - lastPos.y;
		lastPos = { x: e.clientX, y: e.clientY };
	}
	function endDrag() {
		dragging = false;
	}
	function getDistance(touches) {
		const dx = touches[0].clientX - touches[1].clientX;
		const dy = touches[0].clientY - touches[1].clientY;
		return Math.sqrt(dx * dx + dy * dy);
	}
	function onTouchStart(e) {
		if (e.touches.length === 1) {
			dragging = true;
			lastPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
		} else if (e.touches.length === 2) {
			dragging = false;
			initialDistance = getDistance(e.touches);
			initialZoom = zoom;
		}
	}
	function onTouchMove(e) {
		if (e.touches.length === 1 && dragging) {
			pos.x += e.touches[0].clientX - lastPos.x;
			pos.y += e.touches[0].clientY - lastPos.y;
			lastPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
		} else if (e.touches.length === 2) {
			const scale = getDistance(e.touches) / initialDistance;
			zoom = Math.min(Math.max(initialZoom * scale, 1), 5);
		}
	}
	function onTouchEnd(e) {
		if (e.touches.length === 0) dragging = false;
	}
</script>

<div class="mx-auto max-w-5xl p-6">
	<!-- Header -->
	<header class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-semibold">{charter.title}</h1>
			<p class="text-sm text-gray-600">{charter.office}</p>
			<p class="mt-1 text-sm text-gray-700">
				Head of Office: <strong>{charter.head_of_office.name}</strong> — {charter.head_of_office
					.position}
			</p>
			<p class="mt-1 text-sm italic">{charter.vision}</p>
		</div>
		<div class="flex gap-2">
			<button
				class="rounded border bg-white px-3 py-2 text-sm shadow-sm"
				on:click={() => window.print()}>Print</button
			>
			<button
				class="rounded border bg-white px-3 py-2 text-sm shadow-sm"
				on:click={() => scrollTo('services')}>Jump to Services</button
			>
		</div>
	</header>

	<!-- Charter Preview -->
	<div class="fixed top-[140px] right-4 z-50 hidden lg:block">
		<div
			class="w-48 rounded-xl bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
		>
			<button
				class="block w-full overflow-hidden rounded-xl"
				on:click={() => openImageModal('/CITIZENS CHARTER/MCR.webp')}
			>
				<img
					src="/CITIZENS CHARTER/MCR.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/MCR.webp')}>View Full Image</button
				>
			</div>
		</div>
	</div>

	<div class="mb-4 block lg:hidden">
		<button
			class="w-full overflow-hidden rounded-xl"
			on:click={() => openImageModal('/CITIZENS CHARTER/MCR.webp')}
		>
			<img
				src="/CITIZENS CHARTER/MCR.webp"
				alt="Charter preview"
				class="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
			/>
		</button>
		<div class="mt-2 text-center">
			<p class="text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
			<button
				class="mt-1 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
				on:click={() => openImageModal('/CITIZENS CHARTER/MCR.webp')}>View Full Image</button
			>
		</div>
	</div>

	<!-- Services -->
	<section id="services" class="mb-6 space-y-4">
		<h2 class="text-xl font-semibold">Services</h2>
		{#each charter.services as svc}
			<article id={svc.id} class="rounded-lg bg-white p-5 shadow-sm">
				<div class="flex items-start justify-between">
					<div>
						<h3 class="text-lg font-semibold">{svc.title}</h3>
						<p class="mt-1 text-sm text-gray-600">{svc.about}</p>
					</div>
					<div class="text-xs text-gray-500">
						Processing time: <strong>{svc.processing_time}</strong>
					</div>
				</div>
				<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
					<div>
						<h4 class="font-medium">Requirements</h4>
						<ul class="mt-2 list-inside list-disc space-y-1 text-sm">
							{#each svc.requirements as r}
								<li>{r}</li>
							{/each}
						</ul>
					</div>
					<div>
						<h4 class="font-medium">Steps</h4>
						<ol class="mt-2 list-inside list-decimal space-y-1 text-sm">
							{#each svc.steps as st}
								<li>{st}</li>
							{/each}
						</ol>
					</div>
					<div>
						<h4 class="font-medium">Fees & In-Charge</h4>
						<p class="mt-2 text-sm">{svc.fees}</p>
						<p class="mt-1 text-sm">In‑Charge: <strong>{svc.in_charge}</strong></p>
					</div>
				</div>
			</article>
		{/each}
	</section>

	<!-- Feedback -->
	<section class="mb-6 rounded-lg bg-white p-5 shadow-sm">
		<h2 class="text-lg font-semibold">Feedback & Redress Mechanism</h2>
		<p class="mt-2 text-sm">{charter.feedback}</p>
		<p class="mt-3 text-xs text-red-600">{charter.note_unreadable}</p>
	</section>

	<!-- Modal -->
	{#if modalOpen}
		<div
			class="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm"
			role="dialog"
			aria-modal="true"
			on:click={closeImageModal}
		>
			<div
				class="relative mx-4 w-full max-w-3xl scale-95 transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300"
				on:click|stopPropagation
			>
				<button
					class="absolute top-3 right-3 rounded-full bg-white p-1 text-2xl font-bold text-gray-700 shadow-md transition-colors hover:text-gray-900"
					on:click={closeImageModal}>×</button
				>
				<div
					class="cursor-grab overflow-hidden"
					on:wheel={onWheel}
					on:mousedown={startDrag}
					on:mousemove={onDrag}
					on:mouseup={endDrag}
					on:mouseleave={endDrag}
					on:touchstart={onTouchStart}
					on:touchmove={onTouchMove}
					on:touchend={onTouchEnd}
				>
					<img
						src={modalSrc}
						alt="Charter document"
						class="max-h-[80vh] w-full bg-gray-50 object-contain transition-transform duration-100 ease-out"
						style="transform: translate({pos.x}px, {pos.y}px) scale({zoom});"
					/>
				</div>
				<div class="flex justify-end gap-3 bg-gray-50 p-4">
					<button
						class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
						on:click={downloadModalImage}>Download</button
					>
					<button
						class="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
						on:click={closeImageModal}>Close</button
					>
				</div>
			</div>
		</div>
	{/if}

	<!-- Footer -->
	<footer class="mt-6 text-center text-sm text-gray-600">
		<p>Prepared for: Municipal Civil Registrar — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Draft integration. Please verify all civil registry details with the Municipal
			Civil Registrar.
		</p>
	</footer>
</div>
