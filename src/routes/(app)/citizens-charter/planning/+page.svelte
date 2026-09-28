<script>
	import { onMount } from 'svelte';

	let charter = {
		title: "CITIZEN'S CHARTER — Municipal Planning & Development Office",
		office: 'Municipal Planning and Development Office, Tanauan, Leyte',
		head_of_office: {
			name: 'ARTURO B. PEREZ JR.',
			position: 'Department Head'
		},
		address: 'Ground Floor, Presidencia Town Hall, 888 Real Street, Tanauan, Leyte',
		vision: `The Municipal Planning and Development Office is tasked to prepare comprehensive plans and other planning documents for submission and approval by the Municipal Development Council (MDC), and coordinate and integrate all sectoral plans and studies undertaken by the Municipality.`,
		mission: `To ensure effective municipal planning, facilitate sustainable development projects, and provide timely technical assistance and services to the community.`,
		pledge: `We commit to provide accurate, efficient, and transparent planning services to all stakeholders.`,

		services: [
			{
				id: 'zoning-clearance',
				title: 'Issuance of Zoning Certification / Locational Clearance Application',
				about:
					'A Zoning Clearance/Certification is required to ensure that the proposed structure and activity are allowed within the particular zone or location based on the Municipal Zoning Ordinance No. 7 Series of 2001 approved under Sangguniang Bayan Resolution No. 01-207 Series of 2001.',
				office: 'Municipal Planning and Development Office (MPDO)',
				classification: 'Simple',
				transaction_type: 'G2C – Government to Citizen',
				who_may_avail: 'Developers, Property Lot Owners, Organizations',
				processing_time: '20-30 minutes',
				requirements: [
					'Duly Notarized Locational Clearance Form (1 Original) — MPDO',
					'Current year’s Tax Declaration (1 Original, 1 Photocopy) — Municipal Assessor’s Office',
					'Current year’s Tax Clearance (2 Original, 1 Photocopy) — Municipal Treasurer’s Office',
					'Technical Description (2 Certified True Copies) — DENR Tacloban City',
					'Barangay Clearance with Specific Purpose (1 Original, 1 Photocopy) — Concerned Barangay',
					'Building Plan (2 sets signed and sealed) — Licensed Civil Engineer, Architect, Electrical Engineer, and Master Plumber',
					'Bill of Materials (2 sets signed and sealed) — Licensed Civil Engineer / Architect',
					'Technical Specifications (2 sets signed and sealed) — Licensed Civil Engineer / Architect',
					'Proof of Ownership (whichever is applicable – 2 certified true copies) — LRA / Registered Lot Owner',
					'Current year’s Professional Tax Receipt (PTR) & PRC License (2 copies – originally signed and sealed) — Licensed Civil Engineer / Architect / Electrical Engineer / Master Plumber',
					'Supplemental Documents (Structural Design & Analysis, DPWH Clearance, SB/Barangay Resolution, ECC/CNC, Authorization Letter, IDs, Long Yellow Envelope) — As applicable'
				],
				steps: [
					{
						client_step: 'Secure application form and list of requirements from MPDO',
						agency_action: 'Provide form and checklist, prepare two copies per document',
						fees_to_be_paid: 'As per fee schedule',
						processing_time: '5 minutes',
						person_responsible: 'Climaco E. Primer'
					},
					{
						client_step: 'Submit accomplished form and requirements',
						agency_action: 'Check documents for completeness and advise client to pay fees at MTO',
						fees_to_be_paid: 'As per fee schedule',
						processing_time: '5-10 minutes',
						person_responsible: 'Climaco E. Primer'
					},
					{
						client_step: 'Pay corresponding fee at MTO',
						agency_action: 'N/A',
						fees_to_be_paid: 'As per fee schedule',
						processing_time: '5 minutes',
						person_responsible: 'Carmencita Boco / Miracelo Vertudes / Ma. Clenia Pilola'
					},
					{
						client_step: 'Submit Official Receipt',
						agency_action: 'Issue Zoning Certification / Clearance',
						fees_to_be_paid: 'N/A',
						processing_time: '5 minutes',
						person_responsible: 'Climaco E. Primer'
					}
				],
				fees: [
					{
						category: 'A. SINGLE RESIDENTIAL STRUCTURE ATTACHED OR DETACHED',
						tiers: [
							{ range: 'P100,000.00 and below', fee: 'P240.00' },
							{ range: 'Over P100,000.00 to P200,000.00', fee: 'P480.00' },
							{ range: 'Over P200,000.00', fee: 'P600.00 + (1/10 of 1% in excess of P200,000.00)' }
						]
					},
					{
						category: 'B. APARTMENTS/TOWNHOUSES',
						tiers: [
							{ range: 'P500,000.00 and below', fee: 'P1,200.00' },
							{ range: 'Over P500,000.00 to P2 Million', fee: 'P1,800.00' },
							{
								range: 'Over P2 Million',
								fee: 'P3,000.00 + (1/10 of 1% of cost in excess of P2M regardless of number of doors)'
							}
						]
					},
					{
						category: 'C. DORMITORIES',
						tiers: [
							{ range: 'P2 Million and below', fee: 'P3,000.00' },
							{
								range: 'Over P2 Million',
								fee: 'P3,000.00 + (1/10 of 1% of cost in excess of P2M regardless of number of doors)'
							}
						]
					},
					{
						category: 'D. INSTITUTIONAL PROJECTS',
						tiers: [
							{ range: 'Below P2 Million', fee: 'P2,400.00' },
							{ range: 'Over P2 Million', fee: 'P2,400.00 + (1/10 of 1% of cost in excess of P2M)' }
						]
					},
					{
						category: 'E. COMMERCIAL, INDUSTRIAL AND AGRO-INDUSTRIAL PROJECTS',
						tiers: [
							{ range: 'Below P100,000.00', fee: 'P1,200.00' },
							{ range: 'Over P100,000.00 to P500,000.00', fee: 'P1,800.00' },
							{ range: 'Over P500,000.00 to P1 Million', fee: 'P2,400.00' },
							{ range: 'Over P1 Million to P2 Million', fee: 'P3,600.00' },
							{ range: 'Over P2 Million', fee: 'P6,000.00 + (1/10 of 1% of cost in excess of P2M)' }
						]
					},
					{
						category:
							'F. SPECIAL USES/SPECIAL PROJECTS (Gasoline Station, Cell Sites, Slaughter House, Treatment Plant, Cockpit, Beach Resorts, etc.)',
						tiers: [
							{ range: 'Below P2 Million', fee: 'P6,000.00' },
							{ range: 'Over P2 Million', fee: 'P6,000.00 + (1/10 of 1% of cost in excess of P2M)' }
						]
					},
					{
						category: 'G. ALTERCATION/EXPANSION (Affected areas/cost of expansion only)',
						tiers: [
							{
								range: 'Same as original application',
								fee: 'Refer to respective category fees above'
							}
						]
					},
					{
						category: 'ZONING CERTIFICATION FEE',
						tiers: [{ range: 'Per hectare or portion of it', fee: 'P500.00' }]
					}
				]
			}
		],

		feedback:
			'For comments or complaints regarding services, please coordinate directly with the Municipal Planning and Development Office.',
		note_unreadable: 'Ensure all documents are complete and legible before submission.',
		image: '/CITIZENS CHARTER/MPDC.webp'
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
	<!-- Header -->
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

	<!-- Image Preview -->
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

	<!-- Services -->
	<section id="services" class="mb-6 space-y-4">
		<h2 class="text-xl font-semibold">Services</h2>
		{#each charter.services as svc}
			<article id={svc.id} class="rounded-lg bg-white p-5 shadow-sm">
				<div class="flex items-start justify-between">
					<div>
						<h3 class="text-lg font-semibold">{svc.title}</h3>
						<p class="mt-1 text-sm text-gray-600">{svc.about}</p>
						<p class="mt-1 text-sm text-gray-500"><strong>Office:</strong> {svc.office}</p>
						<p class="mt-1 text-sm text-gray-500">
							<strong>Classification:</strong>
							{svc.classification}
						</p>
						<p class="mt-1 text-sm text-gray-500"><strong>Type:</strong> {svc.transaction_type}</p>
						<p class="mt-1 text-sm text-gray-500">
							<strong>Who may avail:</strong>
							{svc.who_may_avail}
						</p>
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
								<li>
									<strong>Client:</strong>
									{st.client_step} <br />
									<strong>Agency:</strong>
									{st.agency_action} <br />
									<strong>Fees:</strong>
									{st.fees_to_be_paid} <br />
									<strong>Time:</strong>
									{st.processing_time} <br />
									<strong>Person Responsible:</strong>
									{st.person_responsible}
								</li>
							{/each}
						</ol>
					</div>
					<div>
						<h4 class="font-medium">Fees</h4>
						{#each svc.fees as fee}
							<p class="mt-2 font-semibold">{fee.type}</p>
							<ul class="mt-1 list-inside list-disc text-sm">
								{#each fee.tiers as tier}
									<li>{tier.range}: {tier.fee}</li>
								{/each}
							</ul>
						{/each}
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
					on:click={closeImageModal}>×</button
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

	<!-- Footer -->
	<footer class="mt-6 text-center text-sm text-gray-600">
		<p>Prepared for: Municipal Planning & Development Office — Tanauan, Leyte</p>
	</footer>
</div>
