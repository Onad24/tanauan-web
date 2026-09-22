<script>
	import { onMount } from 'svelte';

	let charter = {
		title: `CITIZEN'S CHARTER — Municipal Engineer's Office`,
		office: 'Office of the Municipal Engineer, Tanauan, Leyte',
		head_of_office: {
			name: 'Engr. Raul S. Soliva',
			position: 'Municipal Engineer / Department Head',
			office: "Municipal Engineer's Office, Tanauan, Leyte"
		},
		vision: `To provide efficient and sustainable engineering services that ensure safe, functional, and environmentally responsible infrastructure for the community.`,
		mission: `The Office of the Municipal Engineer shall administer, enforce, and comply with national building codes, while delivering quality engineering services, project supervision, and technical guidance for public and private infrastructure development.`,
		pledge: `We, the officials and employees of the Office of the Municipal Engineer, commit to render professional, transparent, and timely services while upholding integrity, accountability, and public safety in the performance of our duties.`,
		services: [
			{
				id: 'building_permit',
				title: 'Issuance of Building Permit',
				about: `A Building Permit is required prior to construction, alteration, major repair, renovation, or conversion of any building/structure. Ancillary and Accessory Permits may also be required.`,
				requirements: [
					'Application Form (NBC Form B-01)',
					'Barangay Clearance',
					'Certified True Copy of Original Certificate of Title (OCT/TCT/Tax Declaration) or lease agreement',
					'Latest Real Property Tax Receipt / Tax Clearance',
					'Locational and Zoning Clearance from MPDO',
					'Bill of Materials / Cost Estimate signed by Licensed Civil Engineer or Architect',
					'Building Plans with specifications signed by licensed professionals (5 sets)',
					'Sketch Plan of Land with Technical Description (2 copies)',
					'DPWH Clearance if along National Road'
				],
				steps: [
					'Submit duly accomplished application form and requirements',
					'Pay corresponding fees at MTO and submit Official Receipt to MEO',
					'Return receiving copy of transmittal',
					'Log and receive the Building Permit'
				],
				processing_time: '4–7 days',
				fees: 'As per IRR of PD 1096 / Municipal schedule',
				in_charge: 'Engr. Raul S. Soliva / Hector Quizol / John Ike Cinco'
			},
			{
				id: 'occupancy_permit',
				title: 'Issuance of Occupancy Permit',
				about: `Certificate of Occupancy issued after payment of fees and compliance with building requirements. Partial or additional occupancy permits may be issued if necessary.`,
				requirements: [
					'Application for Certificate of Occupancy',
					'Certificate of Completion (Notarized)',
					'Certificate of Completion (Electrical Works)',
					'As-Built Plans and Specifications signed by professionals',
					'Daily Construction Logbook'
				],
				steps: [
					'Submit application form and requirements',
					'Pay corresponding fees at MTO and submit Official Receipt',
					'Inspection and verification',
					'Log and receive the Occupancy Permit'
				],
				processing_time: '4–6 days',
				fees: 'P360.00 (Commercial/Institutional), Residential varies',
				in_charge: 'Engr. Raul S. Soliva / Hector Quizol / John Ike Cinco'
			},
			{
				id: 'fencing_permit',
				title: 'Issuance of Fencing Permit',
				about:
					'Permit required prior to construction, erection, alteration, or repair of fencing structures.',
				requirements: [
					'Application for Fencing Permit',
					'Zoning Clearance',
					'Approved Survey Plan (Certified True Copy)',
					'Certified True Copy of OCT/TCT/Tax Declaration (2 copies) or lease agreement',
					'Latest Real Property Tax Receipt',
					'Fencing Plans signed by Licensed Civil Engineer or Architect',
					'DPWH Clearance if along National Road'
				],
				steps: [
					'Secure application form and required documents',
					'Submit application and documents',
					'Fee computation and issuance of order of payment',
					'Pay fees and submit Official Receipt',
					'Verification and building inspection',
					'Processing and issuance of Fencing Permit'
				],
				processing_time: '2–3 working days',
				fees: 'As per IRR of PD 1096 / per linear meter',
				in_charge: 'Engr. Raul S. Soliva / Hector Quizol / John Ike Cinco / Climaco Primer'
			},
			{
				id: 'demolition_permit',
				title: 'Issuance of Demolition Permit',
				about: 'Permit required before demolition of any building/structure.',
				requirements: ['Application Letter / Resolution'],
				steps: [
					'Submit application letter',
					'Conduct inspection',
					'Fee computation and issuance of order of payment',
					'Pay fees and submit Official Receipt',
					'Processing and issuance of Demolition Permit'
				],
				processing_time: '1–2 days',
				fees: 'As per IRR of PD 1096',
				in_charge: 'Engr. Raul Soliva / Hector Quizol / John Ike Cinco'
			},
			{
				id: 'excavation_permit',
				title: 'Issuance of Excavation Permit',
				about: 'Permit required before excavation work on any site.',
				requirements: ['Application Letter / Resolution'],
				steps: [
					'Submit application letter',
					'Conduct inspection',
					'Fee computation and issuance of order of payment',
					'Pay fees and submit Official Receipt',
					'Processing and issuance of Excavation Permit'
				],
				processing_time: '1–2 days',
				fees: 'As per IRR of PD 1096',
				in_charge: 'Engr. Raul Soliva / Hector Quizol / John Ike Cinco / Climaco Primer'
			},
			{
				id: 'electrical_permit',
				title: 'Application for Electrical Permit',
				about: 'Permit required before electrical installation or modification in buildings.',
				requirements: ['Application Letter / Resolution'],
				steps: [
					'Submit requirements',
					'Transmittal to Fire Safety',
					'Site inspection',
					'Issue order of payment',
					'Pay fees and submit Official Receipt',
					'Submit CFEI for signature',
					'Building Official signs CFEI and issues Electrical Permit'
				],
				processing_time: '1–2 days',
				fees: 'Residential – P207.45, Commercial/Institutional – P360.00',
				in_charge: 'Engr. Raul Soliva / Hector Quizol / John Ike Cinco / Climaco Primer'
			},
			{
				id: 'burial_permit',
				title: 'Application for Burial Permit',
				about: 'Permit required for burial in cemeteries.',
				requirements: ['Registered Death Certificate', 'Application Form'],
				steps: [
					'Submit death certificate and application',
					'Inspection at cemetery',
					'Pay fee and submit Official Receipt',
					'Log and receive Burial Permit'
				],
				processing_time: '2–3 hours',
				fees: 'P100.00',
				in_charge: 'Hector Quizol / Analyn Udtohan / Margielyn Malate / John Ike Cinco'
			},
			{
				id: 'water_connection_certificate',
				title: 'Issuance of Water Connection Certificate',
				about: 'Certificate required for water connection in residential or commercial buildings.',
				requirements: [
					'Tax Declaration (photocopy)',
					'Affidavit of Consent if not the lot owner',
					'Original Building Permit',
					'As-built plan (if concrete structure)',
					'Picture of structure',
					'Barangay Clearance',
					'Locational Clearance'
				],
				steps: [
					'Submit requirements',
					'Pay fees and submit Official Receipt',
					'Site inspection and approval',
					'Claim the certificate'
				],
				processing_time: '1 day',
				fees: 'P430.00',
				in_charge: 'Hector Quizol / John Ike Cinco'
			},
			{
				id: 'annual_inspection',
				title: 'Annual Inspection for Commercial Establishment',
				about:
					'Annual inspection to ensure compliance with building and safety regulations for commercial establishments.',
				requirements: ['Business Permit Application Form', 'Detailed Structural Plan'],
				steps: [
					'Secure application form',
					'Inspection of establishment',
					'Fee computation and issuance of order of payment',
					'Pay fees and submit Official Receipt',
					'Approval and logging of Business Permit Application'
				],
				processing_time: '2–6 days',
				fees: 'As per IRR of PD 1096',
				in_charge:
					'Engr. Raul Soliva / Hector Quizol / Margielyn Malate / Climaco Primer / John Ike Cinco'
			},
			{
				id: 'municipal_infrastructure',
				title: 'Municipal and Barangay Infrastructure Project',
				about: 'Request and evaluation of public infrastructure projects.',
				requirements: ['Request Letter / Resolution'],
				steps: [
					'Present request letter',
					'Inspection and evaluation of project',
					'Estimate preparation, drafts, and working drawings',
					'Approval and signing of project proposal'
				],
				processing_time: '7+ days depending on complexity',
				fees: 'None specified',
				in_charge:
					'Hector Quizol / John Ike Cinco / Engr. Realen Cabaguing / Municipal Mayor / Barangay Chairperson'
			}
		],
		feedback: `Concerns, suggestions, and project inquiries may be submitted to the Office of the Municipal Engineer. The office commits to provide acknowledgment and a response within the prescribed timeframes.`,
		note_unreadable: `Some parts of the original citizen’s charter may need verification — please confirm details with the Municipal Engineer's Office.`
	};

	// Navigation
	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Modal (Zoom + Pan) — same as before
	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/MEO.webp';

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
				on:click={() => openImageModal('/CITIZENS CHARTER/MEO.webp')}
				aria-label="Open charter image"
			>
				<img
					src="/CITIZENS CHARTER/MEO.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/MEO.webp')}>View Full Image</button
				>
			</div>
		</div>
	</div>
	<!-- Mobile preview -->
	<div class="mb-4 block lg:hidden">
		<button
			class="w-full overflow-hidden rounded-xl"
			on:click={() => openImageModal('/CITIZENS CHARTER/MEO.webp')}
			aria-label="Open charter image"
		>
			<img
				src="/CITIZENS CHARTER/MEO.webp"
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
		<p>Prepared for: Municipal Engineer’s Office — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Draft integration. Please verify all engineering office details with the
			Municipal Engineer's Office.
		</p>
	</footer>
</div>
