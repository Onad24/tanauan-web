<script>
	import { onMount } from 'svelte';

	let charter = {
		title: "CITIZEN'S CHARTER — Municipal Health Office",
		office: 'Municipal Health Office, Tanauan, Leyte',
		head_of_office: {
			name: 'Dr. Arlene V. Santo, M.D.',
			position: 'Municipal Health Officer / Department Head',
			office: 'Municipal Health Office, Tanauan, Leyte'
		},
		vision:
			'The Municipal Health Office carries out the delivery of the health services and other related programs, projects, and activities.',
		services: [
			{
				id: 'sanitary_permit',
				title: 'Issuance of Sanitary Permit',
				about: 'Issue sanitary permit for businesses after document validation.',
				processing_time: '10-12 minutes',
				requirements: ['Accomplished Business Permit Application Form'],
				steps: [
					'Secure and fill out the Business Permit Application Form completely and attach the needed requirements',
					'If documents are in order, Sanitary Permit for signature of MHO',
					'Receive the signed document'
				],
				fees: '-',
				in_charge: 'Victorino Salubon / Elmer Ripalda / Jennifer B. Artogue / Dr. Arlene Santo'
			},
			{
				id: 'health_certificate',
				title: 'Issuance of Health Certificate / Health Card',
				about: 'Provide health certificate/card after document and lab validation.',
				processing_time: '15-20 minutes',
				requirements: [
					'Accomplished Business Permit Application Form',
					'Laboratory work-up result (Chest X-ray, Fecalysis)'
				],
				steps: [
					'Secure and fill out Business Permit Application Form',
					'Submit laboratory results',
					'Receive the signed health certificate/card'
				],
				fees: '-',
				in_charge: 'Victorino Salubon / Elmer Ripalda / Jennifer B. Artogue / Dr. Arlene Santo'
			},
			{
				id: 'complaints_sanitation',
				title: 'Respond to Complaints on Environmental Sanitation',
				about: 'Receive, verify, inspect, and provide recommendations for complaints.',
				processing_time: '1 working day',
				requirements: ['Formal Letter of Complaint'],
				steps: [
					'Submit Complaint Letter to MHO',
					'Courtesy call to Brgy. Chairman and ocular inspection',
					'Make inspection report and provide recommendations',
					'Complainant to ask update from Brgy. Officials'
				],
				fees: '-',
				in_charge: 'Victorino Salubon / Elmer Ripalda / Jennifer B. Artogue / Dr. Arlene Santo'
			},
			{
				id: 'chlorine',
				title: 'Issuance of Chlorine Granules',
				about: 'Provide chlorine for water disinfection after logbook entry.',
				processing_time: '10 minutes',
				requirements: ['Dispensary logbook entry'],
				steps: [
					'Fill out required information on the dispensary logbook',
					'Receive instructions on proper utilization of chlorine'
				],
				fees: '-',
				in_charge: 'Victorino Salubon / Elmer Ripalda / Jennifer B. Artogue'
			},
			{
				id: 'dental_services',
				title: 'Dental Services',
				about: 'Provide dental care, extraction, and issue Dental Health Certificate.',
				processing_time: 'Depends on client’s case',
				requirements: [
					'Updated Brgy. Health Certificate',
					'Individual Patient Treatment Record Form'
				],
				steps: [
					'Enlist name and contact number for appointment',
					'Submit requirements and pay corresponding fee',
					'Oral examination / extraction',
					'Request Dental Health Certificate if needed'
				],
				fees: 'Php 50/tooth, Php 80 Dental Health Certificate',
				in_charge: 'Evangelina Go / Dr. Karen Mae Leones / Miracelo Vertudes / Ma. Clenia Pilola'
			}
			// ... add remaining MHO services similarly
		],
		feedback:
			'For inquiries or complaints regarding the services, clients may approach the office directly or submit feedback through official channels.',
		note_unreadable:
			'Please verify all health office details with the Municipal Health Officer before finalizing transactions.'
	};

	// Navigation
	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Modal logic (Zoom + Pan)
	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/MHO.webp';

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
			<p class="text-sm text-gray-600">{charter.address}</p>
			<p class="mt-1 text-sm text-gray-700">
				Head of Office: <strong>{charter.head_of_office.name}</strong> — {charter.head_of_office
					.position}
			</p>
			<p class="mt-1 text-sm text-gray-600"><strong>Vision:</strong> {charter.vision}</p>
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

	<!-- Document Preview -->
	<div class="fixed top-[140px] right-4 z-50 hidden lg:block">
		<div
			class="w-48 rounded-xl bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
		>
			<button
				class="block w-full overflow-hidden rounded-xl"
				on:click={() => openImageModal('/CITIZENS CHARTER/RHU.webp')}
				aria-label="Open charter image"
			>
				<img
					src="/CITIZENS CHARTER/RHU.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/RHU.webp')}>View Full Image</button
				>
			</div>
		</div>
	</div>

	<div class="mb-4 block lg:hidden">
		<button
			class="w-full overflow-hidden rounded-xl"
			on:click={() => openImageModal('/CITIZENS CHARTER/RHU.webp')}
			aria-label="Open charter image"
		>
			<img
				src="/CITIZENS CHARTER/RHU.webp"
				alt="Charter preview"
				class="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
			/>
		</button>
		<div class="mt-2 text-center">
			<p class="text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
			<button
				class="mt-1 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
				on:click={() => openImageModal('/CITIZENS CHARTER/RHU.webp')}>View Full Image</button
			>
		</div>
	</div>

	<!-- Services Section -->
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
		<p>Prepared for: Municipal Health Office — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Draft integration. Please verify all health office details with MHO.
		</p>
	</footer>
</div>
