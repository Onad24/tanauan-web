<script>
	import { onMount } from 'svelte';

	let charter = {
		title: `CITIZEN'S CHARTER — Municipal Budget Office`,
		office: 'Office of the Municipal Budget Officer, Tanauan, Leyte',
		head_of_office: {
			name: 'Ermel Milo A. Pilola',
			position: 'Department Head',
			office: 'Office of the Municipal Budget Officer, Tanauan, Leyte'
		},
		vision: `The Municipal Budget Office is mandated to promote sound, efficient and effective management and utilization of government resources as in the achievement of socioeconomic and political development goals.`,
		mission: `Review and consolidate budget proposals of different departments and offices of the Local Government Unit.`,
		pledge: `We, the officials and employees of the Municipal Budget Office, commit to provide professional, transparent, and timely services while ensuring proper use of government resources and supporting local development.`,
		services: [
			{
				title: 'Assist/Review Barangay Annual, Supplemental and SK Budget of 54 Barangays',
				about:
					'Assistance and review of the annual, supplemental budget of barangay and SK budget of 54 barangays of this municipality for the approval at Sanggunian Bayan.',
				office_division: 'Office of the Municipal Budget Officer',
				classification: 'Simple',
				transaction_type: ['G2G'],
				who_may_avail: ['Barangay Treasurer', 'Punong Barangay', 'SK Chairperson', 'SK Treasurer'],
				checklist_of_requirements: [
					{ requirement: 'Appropriation Ordinance', source: 'Barangay Appropriation Ordinance' },
					{ requirement: 'Budget forms', source: 'Municipal Budget Office' },
					{ requirement: 'PPAs, AIP & APP', source: 'Barangay to submit such documents' }
				],
				process_steps: [
					{
						step: 1,
						client_action: 'Compliance of all required forms, resolutions and ordinance.',
						agency_action: 'Review the mandatory obligations and the PPAs',
						fee: 'None',
						processing_time: '1 day',
						responsible_personnel: ['Charito Martija', 'Ermel Milo A. Pilola']
					},
					{
						step: 2,
						client_action: 'If all are in order, it will be transmitted to SB',
						agency_action: 'Transmit to Sanggunian Bayan',
						fee: 'None',
						processing_time: '10 minutes',
						responsible_personnel: ['Charito Martija', 'Ermel Milo A. Pilola']
					}
				]
			},
			{
				title: 'Received Purchase Request of All Municipal Transactions',
				about:
					'To review the appropriations on the specific item in the Annual or Supplemental budget and to certify the availability of funds for Maintenance and Other Operating Expenses and Capital Outlay.',
				office_division: 'Office of the Municipal Budget Officer',
				classification: 'Simple',
				transaction_type: ['G2G'],
				who_may_avail: ['Respective LGU offices'],
				checklist_of_requirements: [
					{
						requirement:
							'Approved Purchase Request (signed by the Requesting Dept. Head, Supply Officer and LCE)',
						source: 'Respective offices'
					},
					{ requirement: 'Updated PPMP if needed', source: 'Respective offices' }
				],
				process_steps: [
					{
						step: 1,
						client_action: 'Compliance of all required forms, resolutions and ordinance.',
						agency_action: 'Signed as to availability of Appropriation/ Allotment',
						fee: 'None',
						processing_time: '15 minutes',
						responsible_personnel: ['Geraldine A. Bacolod', 'Charito Martija']
					}
				]
			},
			{
				title: 'Received Obligation Slip and Voucher of All Municipal Transactions',
				about:
					'This is to obligate payables for both internal and external stakeholders of the municipality.',
				office_division: 'Office of the Municipal Budget Officer',
				classification: 'Simple',
				transaction_type: ['G2G'],
				who_may_avail: ['Respective LGU offices'],
				checklist_of_requirements: [
					{
						requirement:
							'Approved Obligation Slip, PR, PO, Canvass, Abstract, Inspection Report, PPMP and other attachments needed',
						source: 'Respective offices'
					}
				],
				process_steps: [
					{
						step: 1,
						client_action: 'Compliance with the required attachment/ documents.',
						agency_action:
							'Check as to completeness of documents and transmit to Accounting Office',
						fee: 'None',
						processing_time: '20 minutes',
						responsible_personnel: ['Geraldine A. Bacolod', 'Charito Martija']
					}
				]
			}
		],
		feedback: `Concerns, suggestions, and inquiries may be submitted to the Municipal Budget Office. The office commits to provide acknowledgment and a response within the prescribed timeframes.`,
		note_unreadable: `Please confirm all budget-related details with the Municipal Budget Office.`
	};

	// Scroll to section
	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Modal logic
	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/MBO.webp';

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

	// Zoom & Pan
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
			zoom = Math.min(Math.max(initialZoom * (newDistance / initialDistance), 1), 5);
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

	<!-- Sidebar Image Preview -->
	<div class="fixed top-[140px] right-4 z-50 hidden lg:block">
		<div
			class="w-48 rounded-xl bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
		>
			<button
				class="block w-full overflow-hidden rounded-xl"
				on:click={() => openImageModal('/CITIZENS CHARTER/MBO.webp')}
				aria-label="Open charter image"
			>
				<img
					src="/CITIZENS CHARTER/MBO.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/MBO.webp')}>View Full Image</button
				>
			</div>
		</div>
	</div>

	<!-- Mobile preview -->
	<div class="mb-4 block lg:hidden">
		<button
			class="w-full overflow-hidden rounded-xl"
			on:click={() => openImageModal('/CITIZENS CHARTER/MBO.webp')}
			aria-label="Open charter image"
		>
			<img
				src="/CITIZENS CHARTER/MBO.webp"
				alt="Charter preview"
				class="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
			/>
		</button>
		<div class="mt-2 text-center">
			<p class="text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
			<button
				class="mt-1 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
				on:click={() => openImageModal('/CITIZENS CHARTER/MBO.webp')}>View Full Image</button
			>
		</div>
	</div>

	<!-- Services -->
	<section id="services" class="mb-6 space-y-4">
		<h2 class="text-xl font-semibold">Services</h2>
		{#each charter.services as svc}
			<article class="rounded-lg bg-white p-5 shadow-sm">
				<h3 class="text-lg font-semibold">{svc.title}</h3>
				<p class="mt-1 text-sm text-gray-600">{svc.about}</p>
				<div class="mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
					<div>
						<h4 class="font-medium">Requirements</h4>
						<ul class="mt-2 list-inside list-disc space-y-1 text-sm">
							{#each svc.checklist_of_requirements as r}
								<li>{r.requirement} — <em>{r.source}</em></li>
							{/each}
						</ul>
					</div>
					<div>
						<h4 class="font-medium">Process Steps</h4>
						<ol class="mt-2 list-inside list-decimal space-y-1 text-sm">
							{#each svc.process_steps as step}
								<li>
									<strong>Client:</strong>
									{step.client_action}<br />
									<strong>Agency:</strong>
									{step.agency_action}<br />
									<strong>Fee:</strong>
									{step.fee}<br />
									<strong>Time:</strong>
									{step.processing_time}<br />
									<strong>Responsible:</strong>
									{step.responsible_personnel.join(', ')}
								</li>
							{/each}
						</ol>
					</div>
					<div>
						<h4 class="font-medium">Transaction Info</h4>
						<p class="mt-2 text-sm">Classification: {svc.classification}</p>
						<p class="mt-1 text-sm">Type: {svc.transaction_type.join(', ')}</p>
						<p class="mt-1 text-sm">Who may avail: {svc.who_may_avail.join(', ')}</p>
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
						style="transform: translate(${pos.x}px, ${pos.y}px) scale(${zoom});"
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
		<p>Prepared for: Municipal Budget Office — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Draft integration. Please verify all budget office details with the Municipal
			Budget Office.
		</p>
	</footer>
</div>
