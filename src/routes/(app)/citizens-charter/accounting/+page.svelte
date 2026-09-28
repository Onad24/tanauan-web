<script>
	import { onMount } from 'svelte';

	let charter = {
		title: `CITIZEN'S CHARTER — Municipal Accounting Office`,
		office:
			'Municipal Accounting Office, 2nd Floor, Presidencia Building, Tanauan Town Hall, Tanauan, Leyte',
		head: `MAR P. VILLEGAS — Department Head`,
		vision: `The Office of the Municipal Accountant takes charge of both the accounting and internal audit services of the municipality and keeps all accounts and financial records of the Local Government.`,
		mission: `To provide accurate, timely, and accountable financial and accounting services to all municipal offices, ensuring transparency and adherence to government regulations.`,
		pledge: `We, the officials and employees of the Municipal Accounting Office, commit to render efficient, courteous, and prompt service, and to uphold integrity, transparency, and accountability in the discharge of our duties.`,
		services: [
			// --- Accounting Office Services ---
			{
				id: 'regular_expenses',
				title: 'Processing of Payments for Regular Operating Expenses',
				about: `Upon transmittal of complete and proper documents, the Office of the Municipal Accountant issues a certification as a pre-requisite on payment for claims.`,
				requirements: ['Prescribed documents by COA Circular 2012-001 per transactions.'],
				steps: [
					'Submit to MBO DV & OBR with complete supporting documents.',
					'Review propriety and completeness of supporting documents and certify Box “A” of DV and forwards the same to the MTO.',
					'Submit the completed documents to Municipal Treasurer’s Office for certification and issuance of check.'
				],
				processing_time: 'Within the day (10 minutes – 24 hours depending on step)',
				fees: 'None',
				in_charge: 'Accounting Staff / Municipal Accountant'
			},
			{
				id: 'non_regular_expenditures',
				title: 'Processing of Payments for Non-Regular / Capital Expenditures',
				about: `Upon transmittal of complete and proper documents, the Office of the Municipal Accountant issues a certification as a pre-requisite on payment for claims.`,
				requirements: ['Prescribed documents by COA Circular 2012-001 per transactions.'],
				steps: [
					'BAC/MEO/Supply Office submit complete documents to Accounting for contract and transaction review.',
					'Review completeness of documents and determine propriety, validity and legality of transaction.',
					'Prepare DV and OBR if transaction is valid, proper and legal and is supported with complete documents and forwards the same to the Office of the Mayor.',
					'Submit to MBO DV & OBR with complete supporting documents.',
					'Review propriety and completeness of supporting documents and certify Box “A” of DV and forwards the same to the MTO.'
				],
				processing_time: 'Maximum of 7 working days (steps vary)',
				fees: 'None',
				in_charge: 'Accounting Staff / Municipal Accountant'
			},
			{
				id: 'accountants_advice',
				title: 'Issuance of Accountant’s Advice',
				about: `Issue advice certifying that checks issued are properly authorized.`,
				requirements: ['Properly issued checks supported with DVs'],
				steps: [
					'MTO submits properly issued checks together with the duly processed DVs to Accounting Office.',
					'Records withholding taxes for remittances purposes, countersigns on the Accountant’s Advice and forwards the same to the Municipal Accountant.',
					'Approves JEVs and certify the Accountant’s Advice.'
				],
				processing_time: 'Maximum 1 hour depending on volume of transactions (steps vary)',
				fees: 'None',
				in_charge: 'Accounting Clerk / Accounting Staff / Municipal Accountant'
			},
			{
				id: 'no_outstanding_obligation',
				title: 'Issuance of Certificate of No Outstanding Obligations',
				about: `Upon the request of the client and after verification of records, issues certificate as to whether or not concerned client has outstanding obligation.`,
				requirements: [
					'Proof of payment and details of bidding to be participated by the requesting party.'
				],
				steps: [
					'Pays certification fee at the MTO and present OR to Accounting Office.',
					'Check accounting records, prepare the certification and forward to the accountant.',
					'Sign the certification.'
				],
				processing_time: 'Maximum 10 minutes (step 1), 1 minute (step 3)',
				fees: 'Php 80.00',
				in_charge: 'Accounting Staff / Municipal Accountant'
			}
		],
		feedback: `Concerns, suggestions, and feedback regarding accounting services may be submitted to the Municipal Accounting Office. The office commits to provide acknowledgment and a response within the prescribed timeframes.`,
		note_unreadable: `Some parts of the original citizen’s charter may need verification — please confirm details with the Municipal Accounting Office.`
	};

	// Navigation
	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Modal (Zoom + Pan) — unchanged
	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/MACCO.webp';

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
			<p class="mt-2 text-sm"><strong>Department Head:</strong> {charter.head}</p>
			<p class="mt-2 text-sm"><strong>Vision:</strong> {charter.vision}</p>
			<p class="mt-1 text-sm"><strong>Mission:</strong> {charter.mission}</p>
			<p class="mt-1 text-sm"><strong>Pledge:</strong> {charter.pledge}</p>
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
				on:click={() => openImageModal('/CITIZENS CHARTER/MACCO.webp')}
				aria-label="Open charter image"
			>
				<img
					src="/CITIZENS CHARTER/MACCO.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/MACCO.webp')}>View Full Image</button
				>
			</div>
		</div>
	</div>

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

	<section class="mb-6 rounded-lg bg-white p-5 shadow-sm">
		<h2 class="text-lg font-semibold">Feedback & Redress Mechanism</h2>
		<p class="mt-2 text-sm">{charter.feedback}</p>
		<p class="mt-3 text-xs text-red-600">{charter.note_unreadable}</p>
	</section>

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
		<p>Prepared for: Municipal Accounting Office — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Draft integration. Please verify all office details with the Municipal
			Accounting Office.
		</p>
	</footer>
</div>
