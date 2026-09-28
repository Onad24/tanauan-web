<script>
	import { onMount } from 'svelte';

	let charter = {
		title: "CITIZEN'S CHARTER — Municipal Social Welfare & Development Office",
		office: 'Municipal Social Welfare & Development Office, Tanauan, Leyte',
		head_of_office: {
			name: 'JASMIN U. BORJA',
			position: 'Department Head'
		},
		vision: `The Office of the Municipal Social Welfare and Development ensures social welfare and development programs are delivered effectively to all sectors of the community.`,
		mission: `To provide timely and appropriate social welfare and development services, programs, and interventions for the well-being of individuals, families, and communities in Tanauan.`,
		pledge: `We, the officials and staff of the MSWDO, commit to deliver efficient, courteous, and responsive services to all clients while upholding integrity, transparency, and accountability.`,
		services: [
			{
				id: 'assistance-crisis',
				title: 'Assistance for Individual in Crisis Situation',
				about:
					'Provides immediate assistance for individuals in crisis situations, including subsistence, medical, and burial support.',
				processing_time: '5 - 10 minutes',
				requirements: [
					'For Subsistence: Brgy. Indigency, 1 Valid ID',
					'For Medical Assistance: Prescription/Laboratory request, Brgy. Indigency, 1 Valid ID',
					'For Burial Assistance (Non-Senior): Registered Death Certificate, Brgy. Indigency, 1 Valid ID'
				],
				steps: [
					'Client to approach the MSWDO for assistance → Intake interview and advise to wait',
					'Assessment and recommendation of assistance → Prepare necessary documents',
					'Client proceeds to Mayor’s Office to have documents signed',
					'Client proceeds to Municipal Treasurer’s Office to receive cash assistance'
				],
				fees: 'None',
				in_charge:
					'Josephine T. Dela Cruz and other MSWDO staff / Mayor of Tanauan / Chona Simborio'
			},
			{
				id: 'referral-agencies',
				title: 'Referral to Regional and Other Welfare Agencies',
				about:
					'Refers clients to regional or specialized welfare agencies based on assessed needs.',
				processing_time: '15 - 20 minutes',
				requirements: [
					'For Medical: Medical Abstract/Certificate, Laboratory request/Prescription/Hospital bill, Brgy. Indigency, 1 Valid ID',
					'For Burial: Registered Death Certificate, Funeral Contract, Brgy. Indigency, 1 Valid ID'
				],
				steps: [
					'Client approaches MSWDO for assistance → Interview and gather data about client and family',
					'MSWDO prepares Social Case Study Report → Document assessment and recommendation',
					'Client proceeds to the recommended agency'
				],
				fees: 'None',
				in_charge: 'Ruth Josephine T. Salubon and Arleen B. Cinco'
			},
			{
				id: 'pre-marriage-certificate',
				title: 'Issuance of Pre-Marriage Counseling Certificate',
				about:
					'Provides counseling and issues certification for couples applying for a marriage license.',
				processing_time: '2 hours',
				requirements: [
					'Duly accomplished application form',
					'Official receipt for paid fee',
					'Attendance sheet from counseling session'
				],
				steps: [
					'Applicants secure and fill out application form → Check and verify information; advise payment at MTO',
					'Client pays corresponding fee at MTO → Prepare Social Case Study Report',
					'Client presents Official Receipt → Conduct Pre-Marriage Counseling',
					'Issuance of Pre-Marriage Certificate → Release certificate to applicant'
				],
				fees: 'Corresponding fee at MTO',
				in_charge: 'Ruth Josephine T. Salubon / Ginny C. Quinos / MSWDO Staff / MTO personnel'
			}
			// Add other services following same structure
		],
		feedback:
			'Concerns, suggestions, and complaints may be submitted directly to the MSWDO. The office commits to provide acknowledgment and response within prescribed timeframes.',
		note_unreadable: 'Please ensure all submitted documents are complete and verifiable.',
		image: '/CITIZENS CHARTER/MSWDO.webp'
	};

	// Navigation
	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Modal (Zoom + Pan)
	let modalOpen = false;
	let modalSrc = charter.image;

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

	function onWheel(e) {
		e.preventDefault();
		const delta = e.deltaY < 0 ? 0.1 : -0.1;
		zoom = Math.min(Math.max(zoom + delta, 1), 5);
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
			<p class="mt-1 text-sm text-gray-600"><strong>Vision:</strong> {charter.vision}</p>
			<p class="mt-1 text-sm text-gray-600"><strong>Mission:</strong> {charter.mission}</p>
			<p class="mt-1 text-sm text-gray-600"><strong>Pledge:</strong> {charter.pledge}</p>
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
				on:click={() => openImageModal()}
				aria-label="Open charter image"
			>
				<img
					src={charter.image}
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal()}>View Full Image</button
				>
			</div>
		</div>
	</div>

	<div class="mb-4 block lg:hidden">
		<button
			class="w-full overflow-hidden rounded-xl"
			on:click={() => openImageModal()}
			aria-label="Open charter image"
		>
			<img
				src={charter.image}
				alt="Charter preview"
				class="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
			/>
		</button>
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
		<p>Prepared for: Municipal Social Welfare & Development Office — Tanauan, Leyte</p>
	</footer>
</div>
