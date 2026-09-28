<script>
	import { onMount } from 'svelte';

	let charter = {
		title: "CITIZEN'S CHARTER — Municipal Assessor's Office",
		office: "Office of the Municipal Assessor's Office, Tanauan, Leyte",
		head_of_office: {
			name: 'Rochel M. Orit',
			position: 'Municipal Assessor / Department Head',
			office: "Municipal Assessor's Office, Tanauan, Leyte"
		},
		vision:
			'To maintain an accurate and up-to-date assessment of real property within the municipality to ensure equitable taxation.',
		services: [
			{
				id: 'ctc_assessment',
				title: 'Issuance of Certification/Certified True Copies of Assessment Records',
				about: `Provide certified copies of real property assessment records including Tax Declarations (with/without property holdings, no improvement, and history tracer) for owners or authorized representatives.`,
				requirements: [
					'Request Form (Municipal Assessor’s Office)',
					'Latest RPT Official Receipt (From owner)',
					'Tax Receipt (Municipal Treasurer’s Office)',
					'Authorization letter or valid documents of inheritance/heirship (if applicable)'
				],
				steps: [
					'Proceed to MASSO and verbalize request',
					'If not delinquent, pay fees at Municipal Treasurer’s Office',
					'Present official receipt and wait while records are processed',
					'Certification checked & signed by the assessor',
					'Receive approved certification'
				],
				processing_time: '37 minutes',
				fees: 'Php 80.00 (includes documentary stamp tax)',
				in_charge: 'Engr. Rochel M. Orit, R.E.A., R.E.B., M.P.R.M / MASSO Personnel'
			},
			{
				id: 'transfer_revision',
				title: 'Transfer/Revision of Real Property Tax Declaration',
				about: `Transfer or revise real property tax declarations upon submission of registered documents, certified electronic copy of title, or approved subdivision/consolidation plan.`,
				requirements: [
					'Certified True Copies of Proof of Ownership (Title, Deeds, CAR/eCAR, Approved Subdivision Plan, Lot Technical Description)',
					'Latest RPT receipt or tax clearance',
					'History Tracer / Old Tax Declaration',
					'Special Power of Attorney (if applicable)',
					'Valid ID(s) of owner, seller, buyer, or authorized representative'
				],
				steps: [
					'Proceed to MASSO and submit documents',
					'MASSO verifies documents and enters data on Tax Declaration',
					'Recommendation sent to Provincial Assessor for approval',
					'Receive approved Tax Declaration',
					'Notice of Assessment is prepared and released'
				],
				processing_time: '47 days & 21 minutes',
				fees: 'Transfer Fee & Real Property Tax (as prescribed)',
				in_charge: 'Engr. Rochel M. Orit, R.E.A., R.E.B., M.P.R.M / MASSO Personnel'
			},
			{
				id: 'appraisal_assessment',
				title: 'Appraisal and Assessment of Newly Installed Machinery/Buildings',
				about: `Ocular inspection and reassessment of newly constructed buildings, newly installed machineries, or improvements for taxation purposes.`,
				requirements: [
					'Notice of Inspection (MASSO)',
					'Deed of Sale / Affidavit of Consent',
					'Floor Plan or Sketch Layout and Floor Area',
					'Pictures of Building or Machinery',
					'Community Tax Certificate',
					'Receipt for Real Property Tax up to the current year'
				],
				steps: [
					'Proceed to MASSO and verbalize request',
					'Ocular inspection conducted',
					'Submit FAAS and supporting documents',
					'Data typed on Tax Declaration; cancel old forms',
					'Submit to Provincial Assessor for approval',
					'Receive approved Tax Declaration',
					'Prepare and serve Notice of Assessment'
				],
				processing_time: '47 days, 4 hours & 11 minutes',
				fees: 'None',
				in_charge:
					'Engr. Rochel M. Orit, R.E.A., R.E.B., M.P.R.M / MASSO Personnel / Municipal Engineering Office'
			},
			{
				id: 'annotation',
				title: 'Annotation of Bail Bonds, Mortgages, Liens, and Encumbrances',
				about: `Update the tax declaration to reflect annotations for bail bonds, mortgages, liens, or other encumbrances.`,
				requirements: [],
				steps: [
					'Verify records at Provincial Assessor’s Office',
					'Submit request to MASSO for annotation',
					'Check & sign the Tax Declaration',
					'Receive annotated Tax Declaration copy'
				],
				processing_time: '21 minutes',
				fees: 'None',
				in_charge: 'Engr. Rochel M. Orit, R.E.A., R.E.B., M.P.R.M / Enriqueto O. Portula, R.E.A'
			},
			{
				id: 'correctional_revision',
				title: 'Correctional Revision: Sec. 221 R.A. 7160',
				about: `Correct assessment errors, changes in actual use, partial destruction, improvements, or errors in declarant's name or area.`,
				requirements: [
					'Affidavit of Waiver',
					'Sketch Plan',
					'Building Permit',
					'Affidavit of two adjoining lot owners',
					'Birth/Death Certificate',
					'Affidavit of Correction',
					'Lot Technical Description BL Forms',
					'Affidavit of one and the same person'
				],
				steps: [
					'Submit request to MASSO and conduct ocular inspection',
					'Write information on FAAS',
					'Submit FAAS for appraisal & assessment',
					'Type info on Tax Declaration; cancel old forms',
					'Client signs Sworn Statement',
					'Recommendation sent to Provincial Assessor',
					'Submit Tax Declaration to Provincial Assessor',
					'Receive approved Tax Declaration',
					'Prepare and serve Notice of Assessment'
				],
				processing_time: '48 days, 6 hours & 1 minute',
				fees: 'None',
				in_charge: 'Engr. Rochel M. Orit, R.E.A., R.E.B., M.P.R.M / MASSO Personnel'
			}
		],
		feedback: `Clients can submit concerns, complaints, or suggestions to the Municipal Assessor’s Office. The office commits to acknowledge and respond in a timely manner.`,
		note_unreadable: `Some procedural details or personnel names may need confirmation from the MASSO office.`
	};

	// Navigation
	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Modal (Zoom + Pan) — same as before
	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/MASSO.webp';

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
			{#if charter.head_of_office}
				<p class="mt-1 text-sm text-gray-700">
					Head of Office: <strong>{charter.head_of_office.name}</strong> — {charter.head_of_office
						.position}
				</p>
				<p class="mt-1 text-sm text-gray-600"><strong>Vision:</strong> {charter.vision}</p>
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
				on:click={() => openImageModal('/CITIZENS CHARTER/MASSO.webp')}
				aria-label="Open charter image"
			>
				<img
					src="/CITIZENS CHARTER/MASSO.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/MASSO.webp')}>View Full Image</button
				>
			</div>
		</div>
	</div>

	<!-- Mobile preview -->
	<div class="mb-4 block lg:hidden">
		<button
			class="w-full overflow-hidden rounded-xl"
			on:click={() => openImageModal('/CITIZENS CHARTER/MASSO.webp')}
			aria-label="Open charter image"
		>
			<img
				src="/CITIZENS CHARTER/MASSO.webp"
				alt="Charter preview"
				class="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
			/>
		</button>
		<div class="mt-2 text-center">
			<p class="text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
			<button
				class="mt-1 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
				on:click={() => openImageModal('/CITIZENS CHARTER/MPDC.webp')}>View Full Image</button
			>
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
		<p>Prepared for: Municipal Assessor’s Office — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Draft integration. Please verify all details with the Municipal Assessor's
			Office.
		</p>
	</footer>
</div>
