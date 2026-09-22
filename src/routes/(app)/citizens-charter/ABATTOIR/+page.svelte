<script>
	import { onMount } from 'svelte';

	let charter = {
		title: `CITIZEN'S CHARTER — Municipal Abattoir`,
		office: 'Office of the Municipal Abattoir, Tanauan, Leyte',
		head_of_office: {
			name: 'Ralph Rheo R. Tiu',
			position: 'Meat Inspector',
			office: 'Municipal Abattoir, Tanauan, Leyte'
		},
		vision: `To provide safe and quality meat and meat products for human consumption while supporting national and local meat inspection standards.`,
		mission: `Implement RA 9296 and local policies, standards, and guidelines to assure meat safety, public health, and economic contribution.`,
		pledge: `We commit to deliver professional, timely, and transparent services while upholding public safety, quality assurance, and integrity.`,
		services: [
			{
				title: 'Slaughtering of Livestocks (Hog, Cattle)',
				about:
					'To provide service to those needing slaughtering of livestock and assure the public of safe and quality meat.',
				office_division: 'Office of the Municipal Abattoir',
				classification: 'Simple',
				transaction_type: 'G2C – Government to Citizen',
				who_may_avail: ['Meat Vendors', 'Livestock Raisers', 'General Public'],
				checklist_of_requirements: [
					{ requirement: 'Animal health certificate', source: 'Municipal Agriculture Office' },
					{ requirement: 'Certificate of Ownership', source: 'Municipal Treasurer’s Office' },
					{
						requirement: 'Certificate of Transfer for Large Animals',
						source: 'Municipal Treasurer’s Office'
					},
					{ requirement: 'Barangay Certification as to proof of ownership', source: 'Barangay' },
					{ requirement: 'Business Permit (for meat vendors)', source: 'Client to provide' }
				],
				process_steps: [
					{
						step: 1,
						client_action:
							'Proceed to the slaughterhouse and verbally request the slaughter service',
						agency_action:
							'Interview clients regarding the kind of animal to slaughter and prepare the assessment report',
						fees: 'None',
						processing_time: '5 minutes',
						responsible_personnel: ['Meat Inspector on duty']
					},
					{
						step: 2,
						client_action: 'Put the animal to the holding pen and present the required documents',
						agency_action: `1. Check/verify the documents
2. Conduct ante-mortem inspection
3. Observe the animal and give butcher the go signal
4. Perform the slaughtering procedure
5. Conduct post-mortem examination
6. Weighing and branding the carcass`,
						fees: 'None',
						processing_time: '3 hours',
						responsible_personnel: ['Meat Inspector', 'Butcher']
					},
					{
						step: 3,
						client_action: 'Pay the corresponding fee at the Municipal Treasury Office',
						agency_action: 'Accept payment and provide the proof of payment/OR',
						fees: 'Depends on assessment report',
						processing_time: '5 minutes',
						responsible_personnel: ['MTO Staff']
					},
					{
						step: 4,
						client_action:
							'Present the proof of payment and receive the carcasses and certificates',
						agency_action: `1. Issue meat inspection certificate for good carcasses. Inform meat handler if condemned organs.
2. Advise to proceed to dispatch area`,
						fees: 'Depends on assessment report',
						processing_time: '30 minutes',
						responsible_personnel: ['Meat Inspector', 'Butcher']
					}
				]
			}
		],
		feedback: `Concerns, suggestions, and inquiries may be submitted to the Office of the Municipal Abattoir. Responses will be given within prescribed timeframes.`,
		note_unreadable: `Please verify details with the Municipal Abattoir before official submission.`
	};

	// Scroll to section
	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Modal logic
	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/ABATTOIR.webp';

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
				on:click={() => openImageModal('/CITIZENS CHARTER/ABATTOIR.webp')}
				aria-label="Open charter image"
			>
				<img
					src="/CITIZENS CHARTER/ABATTOIR.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/ABATTOIR.webp')}>View Full Image</button
				>
			</div>
		</div>
	</div>

	<!-- Mobile preview -->
	<div class="mb-4 block lg:hidden">
		<button
			class="w-full overflow-hidden rounded-xl"
			on:click={() => openImageModal('/CITIZENS CHARTER/ABATTOIR.webp')}
			aria-label="Open charter image"
		>
			<img
				src="/CITIZENS CHARTER/ABATTOIR.webp"
				alt="Charter preview"
				class="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
			/>
		</button>
		<div class="mt-2 text-center">
			<p class="text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
			<button
				class="mt-1 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
				on:click={() => openImageModal('/CITIZENS CHARTER/ABATTOIR.webp')}>View Full Image</button
			>
		</div>
	</div>

	<!-- Services -->
	<section id="services" class="mb-6 space-y-4">
		<h2 class="text-xl font-semibold">Services</h2>
		{#each charter.services as svc}
			<article class="rounded-lg bg-white p-5 shadow-sm">
				<div class="flex items-start justify-between">
					<div>
						<h3 class="text-lg font-semibold">{svc.title}</h3>
						<p class="mt-1 text-sm text-gray-600">{svc.about}</p>
					</div>
				</div>
				<div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
					<div>
						<h4 class="font-medium">Requirements</h4>
						<ul class="mt-2 list-inside list-disc space-y-1 text-sm">
							{#each svc.checklist_of_requirements as r}
								<li>{r.requirement} — <span class="text-gray-500">{r.source}</span></li>
							{/each}
						</ul>
					</div>
					<div class="md:col-span-3">
						<h4 class="font-medium">Process Steps</h4>
						<ol class="mt-2 list-inside list-decimal space-y-2 text-sm">
							{#each svc.process_steps as st}
								<li>
									<p><strong>Client Action:</strong> {st.client_action}</p>
									<p><strong>Agency Action:</strong> {st.agency_action}</p>
									<p><strong>Fees:</strong> {st.fees}</p>
									<p><strong>Processing Time:</strong> {st.processing_time}</p>
									<p><strong>Responsible:</strong> {st.responsible_personnel.join(', ')}</p>
								</li>
							{/each}
						</ol>
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
		<p>Prepared for: Municipal Abattoir — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Draft integration. Please verify all details with the Municipal Abattoir Office.
		</p>
	</footer>
</div>
