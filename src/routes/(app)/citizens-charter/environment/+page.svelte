<script>
	import { onMount } from 'svelte';

	let charter = {
		title: `CITIZEN'S CHARTER — Municipal Environment and Natural Resources Office`,
		office: 'Office of the MENRO, Tanauan, Leyte',
		head_of_office: {
			name: 'Mark Leo T. Cinco',
			position: 'MENRO-Designate',
			office: 'Ground Floor, Tanauan Presidencia Hall, 888 Real Street, Tanauan, Leyte'
		},
		vision: `The office of MENRO is mandated to ensure an environment-friendly municipality through maintaining cleanliness and sanitation, regulation of natural resources, reforestation, and waste material recovery. It also develops plans and strategies for environmental programs and projects.`,
		pledge: `We commit to provide professional, transparent, and timely services while ensuring environmental protection and sustainability for the municipality.`,
		services: [
			{
				title: 'Walk-in Clients Requesting the Garbage Pick-Up',
				about:
					'Accommodates clients from households, establishments, or industries and other barangays that are out of routinary garbage collection to manage garbage and prevent health hazards.',
				office_division: 'Municipal Environment and Natural Resources Office / Solid Waste Section',
				classification: 'Ministerial',
				transaction_type: ['Government to Citizens'],
				who_may_avail: ['Residential', 'Commercial', 'Institutional', 'Industrial'],
				checklist_of_requirements: [
					{
						requirement: 'Letter Request / Brgy. Resolution',
						source: 'Requesting party to make a request from Mayor’s Office'
					}
				],
				process_steps: [
					{
						step: 1,
						client_action:
							'File a request to the Mayor’s Office, monitor if forwarded to MENRO, talk to MENRO regarding the request',
						agency_action:
							'Appoint the garbage collection team to pick the garbage for proper disposal',
						fee: 'None',
						processing_time: '1-2 days',
						responsible_personnel: ['MENRO and SWM staff']
					}
				]
			},
			{
				title: 'Routinary Garbage Collection (RA 9003)',
				about:
					'Routinary garbage/waste collection as mandated by law for the protection of public health, safety, and environmental quality.',
				office_division: 'Municipal Environment and Natural Resources Office / Solid Waste Section',
				classification: 'Governmental Function',
				transaction_type: ['Government to Citizens'],
				who_may_avail: ['Residential', 'Commercial', 'Institutional', 'Industrial'],
				checklist_of_requirements: [
					{
						requirement: 'Personal - Request Letter',
						source: 'Requesting party to make a request from Mayor’s Office'
					},
					{
						requirement: 'Barangay - Resolution',
						source: 'Requesting party to make a request from Mayor’s Office'
					}
				],
				process_steps: [
					{
						step: 1,
						client_action:
							'Place segregated garbage outside of the house during collection schedule; return garbage bin inside after collection',
						agency_action: 'Immediately collect the waste/garbage for disposal',
						fee: 'None',
						processing_time: '2-3 hours daily schedule',
						responsible_personnel: ['SWM Section staff / Garbage collection']
					}
				]
			},
			{
				title:
					'Enforcement of Hazardous and Toxic Waste Act, Clean Air Act, Clean Water Act, and Sanitation Code',
				about:
					'Enforces environmental laws to control, supervise, and regulate activities on toxic chemicals, hazardous waste, air, water, and sanitation.',
				office_division:
					'Municipal Environment and Natural Resources Office / Pollution Control Section',
				classification: 'Regulatory - Governmental Function',
				transaction_type: ['Government to Citizens'],
				who_may_avail: ['Residential', 'Commercial', 'Institutional', 'Industrial'],
				checklist_of_requirements: [
					{
						requirement: 'Request / Complaint',
						source: 'Requesting party to make a request or elevate complaint to Mayor’s Office'
					}
				],
				process_steps: [
					{
						step: 1,
						client_action: 'File a written complaint/request to the Mayor’s Office',
						agency_action:
							'Act on it by setting a schedule for inspection of the environmental complaint',
						fee: 'None',
						processing_time: '1-2 days',
						responsible_personnel: ['MENRO / Pollution Control staff']
					},
					{
						step: 2,
						client_action:
							'Monitor if request is forwarded to MENRO; talk to MENRO regarding the request/complaint',
						agency_action:
							'If found affirmative of the violation, issue Cease-and-Desist Order after notice and administrative hearing',
						fee: 'None',
						processing_time: 'Depending on action taken',
						responsible_personnel: ['MENRO / Pollution Control staff']
					}
				]
			},
			{
				title: 'Tree Cutting Permit (PD 705)',
				about:
					'Supports implementation of PD 705 for proper management and conservation of forest resources.',
				office_division: 'Municipal Environment and Natural Resources Office',
				classification: 'Devolved Governmental Function',
				transaction_type: ['Government to Citizens'],
				who_may_avail: ['Residential', 'Agricultural Sector'],
				checklist_of_requirements: [
					{ requirement: 'Barangay Certification of No Objection', source: 'Barangay' },
					{ requirement: 'Pictures of the tree/s', source: 'Client to provide' },
					{
						requirement: 'Tax Declaration / OCT',
						source: 'If available - client to provide; if not - Municipal Assessor’s Office'
					},
					{ requirement: 'Proof of payment / OR', source: 'Municipal Treasurer’s Office' }
				],
				process_steps: [
					{
						step: 1,
						client_action:
							'Secure all necessary requirements; pay certification fee at Municipal Treasurer’s Office and present proof of payment; file documents in MENRO office',
						agency_action: 'Immediately make/print certification as long as documents are complete',
						fee: '₱80.00',
						processing_time: '10 minutes',
						responsible_personnel: ['MENRO Staff']
					}
				]
			},
			{
				title: 'Coastal Clean-up (PD 856 and RA 10654)',
				about:
					'Supports PD 856 and RA 10654 in promoting public health, preventing deterioration, and eliminating illegal, unreported, and unregulated fishing activities.',
				office_division: 'Office of the Municipal Agriculturist',
				classification: 'Devolved Governmental Function',
				transaction_type: ['Government to Citizens'],
				who_may_avail: ['Households', 'NGOs', 'Barangays'],
				checklist_of_requirements: [
					{
						requirement: 'Letter Request',
						source: 'Requesting party to file request to Mayor’s Office'
					}
				],
				process_steps: [
					{
						step: 1,
						client_action:
							'File a written complaint/request to the Mayor’s Office; monitor if forwarded to MENRO; talk to MENRO regarding the request/complaint',
						agency_action:
							'Conduct inspection and coordinate with barangay officials and other stakeholders/participants',
						fee: 'None',
						processing_time: '1-2 days',
						responsible_personnel: ['MENRO / Solid Waste Section Staff']
					}
				]
			}
		],
		feedback: `Concerns, suggestions, and inquiries may be submitted to the MENRO. The office commits to provide acknowledgment and response within the prescribed timeframes.`,
		note_unreadable: `Please confirm all MENRO-related details with the Municipal Environment and Natural Resources Office.`
	};

	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/MENRO.webp';
	let zoom = 1;
	let pos = { x: 0, y: 0 };
	let lastPos = { x: 0, y: 0 };
	let dragging = false;
	let initialDistance = 0;
	let initialZoom = 1;

	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

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
				<p class="text-xs text-gray-500">{charter.head_of_office.office}</p>
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

	<!-- Sidebar preview & mobile image -->
	<div class="fixed top-[140px] right-4 z-50 hidden lg:block">
		<div
			class="w-48 rounded-xl bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
		>
			<button
				class="block w-full overflow-hidden rounded-xl"
				on:click={() => openImageModal('/CITIZENS CHARTER/MENRO.webp')}
				aria-label="Open charter image"
			>
				<img
					src="/CITIZENS CHARTER/MENRO.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/MENRO.webp')}>View Full Image</button
				>
			</div>
		</div>
	</div>

	<div class="mb-4 block lg:hidden">
		<button
			class="w-full overflow-hidden rounded-xl"
			on:click={() => openImageModal('/CITIZENS CHARTER/MENRO.webp')}
			aria-label="Open charter image"
		>
			<img
				src="/CITIZENS CHARTER/MENRO.webp"
				alt="Charter preview"
				class="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
			/>
		</button>
		<div class="mt-2 text-center">
			<p class="text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
			<button
				class="mt-1 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
				on:click={() => openImageModal('/CITIZENS CHARTER/MENRO.webp')}>View Full Image</button
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
		<p>Prepared for: Municipal Treasurer’s Office & MENRO — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Draft integration. Please verify all environmental office details with MENRO.
		</p>
	</footer>
</div>
