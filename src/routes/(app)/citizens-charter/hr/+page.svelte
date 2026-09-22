<script>
	import { onMount } from 'svelte';

	let charter = {
		title: `CITIZEN'S CHARTER — Human Resource Management Office`,
		office:
			'Human Resource Management Office, Ground Floor, Tanauan Town Hall, 888 Real Street, Tanauan, Leyte',
		head: 'ATTY. FEDERICO C. TIZON — HRMO III',
		vision: `The office is tasked to implement policies in accordance with CSC laws, rules and regulations, and enforce all laws and ordinances pertinent to efficient, effective, and sound public personnel management.`,
		mission: `Responsible for forming a sound recruitment and selection system, developing programs and activities that promote the welfare of personnel within the Local Government Unit.`,
		pledge: `We, the officials and employees of the Human Resource Management Office, commit to provide courteous, prompt, and efficient services, ensuring integrity and transparency in all our duties.`,
		services: [
			{
				id: 'request_certification',
				title: 'Request for Certification',
				about: `Provide employment records of requesting parties, whether resigned, retired, or currently employed, for any legal purpose.`,
				requirements: [
					'Proof of payment / Official Receipt (MTO)',
					'Authorization letter with valid IDs if through representative'
				],
				steps: [
					'Proceed to HR office and verbally request for certification',
					'Pay corresponding fee at Municipal Treasurer’s Office',
					'Present OR and wait for issuance of certification'
				],
				processing_time: 'Approx. 10–15 minutes',
				fees: '30.00 PHP',
				in_charge: 'HRMO / Municipal Treasurer Staff'
			},
			{
				id: 'internship_program',
				title: 'Internship Program (OJT) of College Students',
				about: `Offer On-the-Job Training (OJT) to eligible college students as a pre-requisite before graduation.`,
				requirements: [
					'Endorsement letter from school OJT coordinator/dean',
					'Resume with latest picture (student provided)'
				],
				steps: [
					'Submit endorsement letter to Office of the Mayor',
					'HR staff informs student of internship start date',
					'Attend orientation and begin internship at assigned office',
					'Submit accomplishment report and rating sheet upon completion'
				],
				processing_time: 'Varies (30 min–1 hour per step)',
				fees: 'None',
				in_charge: 'HRMO / Mayor’s Office Staff'
			},
			{
				id: 'work_immersion',
				title: 'Work Immersion Program for Grade 12 Students',
				about: `LGU serves as work immersion venue for Grade 12 students as pre-requisite before graduation.`,
				requirements: [
					'Memorandum of Agreement (School)',
					'SB Resolution (Sangguniang Bayan)',
					'Application Letter, Resume, Medical Certificate, Parent Consent (Student)'
				],
				steps: [
					'Submit endorsement letter and MOA via Mayor’s Office',
					'HRMO orients students and assigns them to offices',
					'Submit accomplishment report, rating sheet, and DTR upon completion'
				],
				processing_time: 'Approx. 30 min per transaction step',
				fees: 'None',
				in_charge: 'HRMO / Mayor’s Office / Sangguniang Bayan Officials'
			},
			{
				id: 'job_vacancies_plantilla',
				title: 'Application to Job Vacancies (Plantilla Positions)',
				about: `Publishes vacant funded positions for individuals entering government service or seeking promotion.`,
				requirements: [
					'Application letter addressed to Municipal Mayor',
					'Duly accomplished PDS (CSC form 212)',
					'Authenticated TOR, Diploma, Civil Service or PRC Eligibility',
					'Medical certificate, clearances, and other supporting documents'
				],
				steps: [
					'Check posted vacant positions and submit application documents',
					'Evaluation by HRMO / HRMPSB',
					'Interview and assessment conducted',
					'Submission of complete requirements upon qualification',
					'Oath of Office facilitated by HRMO'
				],
				processing_time: '4–5 hours total',
				fees: 'None',
				in_charge: 'HRMO / HR Staff'
			},
			{
				id: 'job_vacancies_casual',
				title: 'Application to Job Vacancies (Job Order / Casual)',
				about: `LGU offers contract-based positions for limited term employment.`,
				requirements: [
					'Duly accomplished PDS (CSC form 212)',
					'Medical certificate',
					'Barangay, Court, Police Clearance'
				],
				steps: [
					'Submit PDS to HR Office',
					'Evaluation, interview, and endorsement to LCE',
					'Secure complete requirements and prepare contract / appointment',
					'Report to HRMO for orientation and assignment'
				],
				processing_time: 'Approx. 30–45 minutes per step',
				fees: 'None',
				in_charge: 'HRMO / HR Staff'
			}
		],
		feedback: `Concerns, complaints, and suggestions may be submitted to HRMO. The office commits to acknowledge and respond within prescribed timeframes.`,
		note_unreadable: `Please verify all details directly with HRMO, especially for official documents and processes.`
	};

	// Navigation
	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Modal (Zoom + Pan)
	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/HRMO.webp';

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
			<p class="mt-1 text-sm font-medium text-gray-700">Head: {charter.head}</p>
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
				on:click={() => openImageModal('/CITIZENS CHARTER/HRMO.webp')}
				aria-label="Open charter image"
			>
				<img
					src="/CITIZENS CHARTER/HRMO.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/HRMO.webp')}>View Full Image</button
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
		<p>Prepared for: Human Resource Management Office — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Draft integration. Please verify all HRMO processes with the office directly.
		</p>
	</footer>
</div>
