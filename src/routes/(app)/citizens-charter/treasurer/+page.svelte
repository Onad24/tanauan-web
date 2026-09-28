<script>
	import { onMount } from 'svelte';
	let charter = {
		title: "CITIZEN'S CHARTER — Municipal Treasurer's Office",
		office: "Municipal Treasurer's Office, Tanauan, Leyte",
		head_of_office: {
			name: 'RESTITUTA C. CAVITE',
			position: 'Department Head'
		},
		vision:
			'The office of the Municipal Treasury takes charge and exercises proper management of the funds of the Local Government Unit, and maintains and updates the tax information system of the municipality.',
		services: [
			{
				id: 'cedula',
				title: 'Issuance of Community Tax Certificate (Cedula)',
				about:
					'Community Tax is collected for individuals 18 years old and above who are regularly employed and individuals required by law to file income tax.',
				processing_time: '5 minutes',
				requirements: [
					'Individual: Valid Identification Card — Any government issued ID',
					'Individual: Old Community Tax Certificate (CTC) — Provided by Individual Taxpayer',
					'Individual: Client Information Slip — Municipal Treasurer’s Office',
					'Business: Valid ID of Owner or Representative — Any government issued ID',
					'Business: Old Community Tax Certificate (CTC) — Provided by Business Owner',
					'Business: Annual Gross Receipts duly certified — Business/Company Accounting Office'
				],
				steps: [
					'Present valid ID or client information slip — Revenue Collection Clerk writes down info and computes amount.',
					'Pay the computed amount — Revenue Collection Clerk issues the Community Tax Certificate.'
				],
				fees: 'Individual: Php 5.00, Business: Php 500.00 + Php1.00 per Php1,000 gross income or Php2.00 per Php5,000 gross receipts/assessed value.',
				in_charge: 'Revenue Collection Clerks'
			},
			{
				id: 'real-property-tax',
				title: 'Payment for Current/Delinquent Real Property Tax',
				about:
					'Real properties such as land, buildings, and machinery are assessed by the Municipal Assessor’s Office. Payments can be annual, semi-annual, or quarterly. Payment within the first quarter can avail 20% discount if no delinquency exists.',
				processing_time: '5-10 minutes',
				requirements: [
					'Official Receipt of previous years or latest Property Tax Assessment — Owner’s Copy',
					'Copy of Latest Tax Declaration of the Property — Office of the Municipal Assessor',
					'Verification/Assessment Slip — Office of the Municipal Assessor'
				],
				steps: [
					'Proceed to Revenue Collection Clerk — Verification, acceptance of payment and issuance of Official Receipt.',
					'Pay the necessary amount — Revenue Collection Clerk computes and accepts payment and issues Official Receipt.'
				],
				fees: 'Depends on assessment value of the property.',
				in_charge: 'Revenue Collection Clerks'
			},
			{
				id: 'tax-clearance',
				title: 'Issuance of Tax Clearance Certificate',
				about: 'Tax clearance certificate is proof that all real property taxes have been paid.',
				processing_time: '5-15 minutes',
				requirements: [
					'Official Receipt of previous years or latest Property Tax Assessment — Owner’s Copy',
					'Copy of Latest Tax Declaration of the Property — Office of the Municipal Assessor',
					'Verification/Assessment Slip — Office of the Municipal Assessor'
				],
				steps: [
					'Proceed to Revenue Collection Clerk (RCC) — Verification, acceptance, and issuance of Official Receipt.',
					'Wait for Tax Clearance for signature by Municipal Treasurer or representative.',
					'Receive original copy of the Clearance/Certification signed by Municipal Treasurer.'
				],
				fees: 'Php 80.00',
				in_charge: 'Revenue Collection Clerks and other MTO Personnel'
			},
			{
				id: 'transfer-tax',
				title: 'Payment of Transfer Tax / Issuance of Transfer Fee Certificate',
				about:
					'A transfer tax is charged to complete a sale of property from owner to another. Certification fee is collected for the issuance of certificate.',
				processing_time: '5-15 minutes',
				requirements: [
					'Official Receipt of previous years or latest Property Tax Assessment — Owner’s Copy',
					'Copy of Latest Tax Declaration of the Property — Office of the Municipal Assessor',
					'Absolute Deed of Sale — Owner’s Copy'
				],
				steps: [
					'Proceed to Revenue Collection Clerk (RCC) — Verification, acceptance of payment and issuance of Official Receipt.',
					'Wait for Transfer Fee Certificate for signature by Municipal Treasurer or representative.',
					'Receive original copy of the Certification duly signed by Municipal Treasurer.'
				],
				fees: 'Depends on selling price or zonal/assessed value. Php 80.00 for certification.',
				in_charge: 'Revenue Collection Clerks and other MTO Personnel'
			}
		],
		feedback:
			'For complaints, suggestions, or inquiries, please contact the Municipal Treasurer’s Office directly or submit feedback through the official LGU feedback channels.',
		note_unreadable:
			'All documents and procedures are subject to verification by the Municipal Treasurer’s Office.'
	};

	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/PESO.webp';
	let zoom = 1;
	let pos = { x: 0, y: 0 };
	let lastPos = { x: 0, y: 0 };
	let dragging = false;
	let initialDistance = 0;
	let initialZoom = 1;

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
		e.preventDefault();
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
			const newDistance = getDistance(e.touches);
			const scale = newDistance / initialDistance;
			zoom = Math.min(Math.max(initialZoom * scale, 1), 5);
		}
	}

	function onTouchEnd(e) {
		if (e.touches.length === 0) dragging = false;
	}
</script>

<div class="mx-auto max-w-5xl p-6">
	<header class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h1 class="text-2xl font-semibold">{charter.title}</h1>
			<p class="text-sm text-gray-600">{charter.office}</p>

			{#if charter.head_of_office}
				<p class="mt-1 text-sm text-gray-700">
					Head of Office: <strong>{charter.head_of_office.name}</strong> — {charter.head_of_office
						.position}
				</p>
			{/if}

			{#if charter.vision}
				<p class="mt-1 text-sm text-gray-600"><strong>Vision:</strong> {charter.vision}</p>
			{/if}

			{#if charter.mission}
				<p class="mt-1 text-sm text-gray-600"><strong>Mission:</strong> {charter.mission}</p>
			{/if}
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

	<div class="fixed top-[140px] right-4 z-50 hidden lg:block">
		<div
			class="w-48 rounded-xl bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
		>
			<button
				class="block w-full overflow-hidden rounded-xl"
				on:click={() => openImageModal('/CITIZENS CHARTER/MTO.webp')}
				aria-label="Open charter image"
			>
				<img
					src="/CITIZENS CHARTER/MTO.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/MTO.webp')}>View Full Image</button
				>
			</div>
		</div>
	</div>

	<!-- Services section -->
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

	<!-- Feedback & Redress -->
	<section class="mb-6 rounded-lg bg-white p-5 shadow-sm">
		<h2 class="text-lg font-semibold">Feedback & Redress Mechanism</h2>
		<p class="mt-2 text-sm">{charter.feedback}</p>
		<p class="mt-3 text-xs text-red-600">{charter.note_unreadable}</p>
	</section>

	{#if modalOpen}
		<!-- Modal Overlay -->
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
					on:click={closeImageModal}
					aria-label="Close Modal">×</button
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

	<footer class="mt-6 text-center text-sm text-gray-600">
		<p>Prepared for: Municipal Treasurer’s Office — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Draft integration. Please verify all details with the Municipal Treasurer's
			Office.
		</p>
	</footer>
</div>
