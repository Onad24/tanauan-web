<script>
	import { onMount } from 'svelte';

	// --- Charter data ---
	let charter = {
		title: `CITIZEN'S CHARTER — Office of the Municipal Agriculturist`,
		office: 'Office of the Municipal Agriculturist, Tanauan, Leyte',
		head_of_office: {
			name: 'Susana O. Miranda',
			position: 'Department Head',
			address: 'Second Floor, Tanauan Town Hall, 888 Real Street, Tanauan, Leyte'
		},
		mission: `Enforce agricultural laws, policies and ordinances which the Office is mandated to implement. Identify, develop, and access funding support for agricultural facilities and infrastructures and implement them in partnership with other support institutions.`,
		pledge: `We, the officials and employees of the Municipal Agriculturist Office, commit to render efficient, courteous, and prompt service, and to uphold integrity, transparency, and sustainability in the discharge of our duties.`,
		services: [
			// --- Crop Section ---
			{
				id: 'rsbsa_registration',
				title: 'Registry System for Basic Sectors in Agriculture (RSBSA) Registration',
				about:
					'Reliable source of data to be used as reference in implementing various programs and evaluating policies of the DA.',
				classification: 'Simple',
				type_of_transaction: 'G2C – Government to Citizens',
				who_may_avail: 'Farmers',
				requirements: [
					'Barangay Certification indicating land area and location (Barangay)',
					'RSBSA form (Properly filled-out) (Municipal Agriculture Office)'
				],
				steps: [
					'Secure RSBSA form from Agriculture Office — Office staff gives instructions on filling-out the form',
					'Submit the accomplished form — Office staff checks the form and assigns reference/control number'
				],
				processing_time: '5 + 5 minutes',
				fees: 'None',
				in_charge: 'Office staff'
			},
			{
				id: 'rice_seed_distribution',
				title: 'Rice Seed Distribution',
				about:
					'Program to subsidize rice farmers and increase yields. Technicians monitor planting and production.',
				classification: 'Simple',
				type_of_transaction: 'G2C – Government to Citizens',
				who_may_avail: 'Farmers',
				requirements: [
					'RSBSA Reference/Control number (Municipal Agriculture Office)',
					'Other documents required per program (which office requiring the documents)'
				],
				steps: [
					'Present the RSBSA Ref./Control No. — Staff checks name in master list and takes picture (for hybrid)'
				],
				processing_time: '8 minutes',
				fees: 'None',
				in_charge: 'Office staff in charge for rice'
			},
			{
				id: 'vegetable_seed_distribution',
				title: 'Vegetable Seed Distribution',
				about: 'Program to subsidize high-value crops farmers and increase production.',
				classification: 'Simple',
				type_of_transaction: 'G2C – Government to Citizens',
				who_may_avail: 'Farmers',
				requirements: [
					'RSBSA Reference/Control number (Municipal Agriculture Office)',
					'Other documents required per program (which office requiring the documents)'
				],
				steps: [
					'Present the RSBSA Ref./Control No. — Staff checks name in master list and distributes seeds'
				],
				processing_time: '8 minutes',
				fees: 'None',
				in_charge: 'Office staff in charge for vegetables'
			},
			{
				id: 'farm_machinery',
				title: 'Farm Machinery(ies)/Equipment',
				about: 'Provides mechanization to help farmers defray rental fees and boost crop yields.',
				classification: 'Simple',
				type_of_transaction: 'G2C – Government to Citizens',
				who_may_avail: 'Farmers',
				requirements: ['Letter request to the LCE (Client to make)'],
				steps: [
					'Submit letter request to Mayor’s Office — If approved, forwarded to Municipal Agriculturist for schedule',
					'Return borrowed farm machinery/equipment — Staff checks returned items at motor pool'
				],
				processing_time: '5 + 10 minutes',
				fees: 'None',
				in_charge: 'Office staff assigned to Farm Machineries'
			},

			// --- Livestock Section ---
			{
				id: 'livestock_medicines',
				title: 'Medicines or Vaccines',
				about:
					'Helps farmers and households prevent deadly diseases in cattle and domesticated animals.',
				classification: 'Simple',
				type_of_transaction: 'G2C – Government to Citizens',
				who_may_avail: 'Farmers and households',
				requirements: ['RSBSA number (provided by requesting party)'],
				steps: ['Provide RSBSA number and verbally request — Staff looks up name in masterlist'],
				processing_time: '5 minutes',
				fees: 'None',
				in_charge: 'Office staff assigned for livestock'
			},
			{
				id: 'livestock_dispersal',
				title: 'Livestock Dispersal',
				about: 'Provides input assistance to qualified farmers to improve income and livelihood.',
				classification: 'Simple',
				type_of_transaction: 'G2C – Government to Citizens',
				who_may_avail: 'Farmers',
				requirements: [
					'Letter request to LCE (Requesting party to make)',
					'RSBSA number (provided by requesting party)',
					'ID (provided by requesting party)',
					'Other documents as required (respective offices)'
				],
				steps: [
					'Submit letter of intent to Mayor — Staff forwards approved letter to Municipal Agriculturist',
					'Present RSBSA number and fill-out contract/documents — Staff checks masterlist and verifies documents'
				],
				processing_time: '5 + 10 minutes',
				fees: 'None',
				in_charge: 'Office staff assigned for livestock'
			},

			// --- Fisheries Section ---
			{
				id: 'fisheries_rsbsa',
				title: 'RSBSA/NFRS Registration',
				about:
					'Reliable data source for implementing programs and evaluating DA policies for fisherfolks.',
				classification: 'Simple',
				type_of_transaction: 'G2C – Government to Citizens',
				who_may_avail: 'Fisherfolks',
				requirements: ['Registration form (Municipal Agriculture Office)'],
				steps: [
					'Fill-out form and submit to Agri. Technician — Staff checks completeness and provides reference/control number'
				],
				processing_time: '15 minutes',
				fees: 'None',
				in_charge: 'Office staff assigned for fisheries'
			},
			{
				id: 'boat_registration',
				title: 'Boat Registration (3 Tonners and Below)',
				about:
					'Registers municipal fishing vessels to prove legality of ownership and for program reference.',
				classification: 'Simple',
				type_of_transaction: 'G2C – Government to Citizens',
				who_may_avail: 'Fisherfolks',
				requirements: [
					'Letter request (client to make)',
					'Picture of boat (provided by requesting party)',
					'Owner ID (provided by requesting party)',
					'Other required documents (respective offices)'
				],
				steps: [
					'Submit letter request to Agri. Technician — Technician measures boat and forwards approved letter',
					'Fill-out necessary documents — Staff checks completeness and registers boat in database'
				],
				processing_time: 'Half day + 10 minutes',
				fees: 'None',
				in_charge: 'Office staff assigned for fisheries'
			},
			{
				id: 'fingerlings_dispersal',
				title: 'Fingerlings Dispersal',
				about:
					'Disperses free fingerlings to qualified beneficiaries with BFAR cooperation to improve fisherfolks’ income.',
				classification: 'Simple',
				type_of_transaction: 'G2C – Government to Citizens',
				who_may_avail: 'Fisherfolks',
				requirements: [
					'RSBSA/NFRS number (Municipal Agriculture Office)',
					'Request form (Municipal Agriculture Office)',
					'ID of requesting party (provided by requesting party)'
				],
				steps: [
					'Present RSBSA/NFRS number and fill-out request form — Staff schedules site inspection',
					'Wait for approval — Staff prepares endorsement to BFAR',
					'Claim fingerlings — Staff conducts briefing and disperses fingerlings'
				],
				processing_time: '1 day + 3 weeks + 1 hour',
				fees: 'None',
				in_charge: 'Office staff assigned for fisheries'
			},

			// --- Institutional Development Section ---
			{
				id: 'association_registration',
				title: 'Assistance on Registration of Associations',
				about:
					'Helps associations/members gain access to information, capital, technology, and promote production/income.',
				classification: 'Simple',
				type_of_transaction: 'G2C – Government to Citizens',
				who_may_avail: 'Farmers/Fisherfolks/Livelihood Associations',
				requirements: [
					'Letter request (requesting party to make)',
					'Community Tax Certificate (Municipal Treasurer’s Office)',
					'Other notarized documents (respective offices)'
				],
				steps: [
					'Submit letter request — Staff schedules and conducts meeting with association',
					'Fill-out necessary documents — Staff advises submission to DOLE/CDA'
				],
				processing_time: '1 day + 20 minutes',
				fees: 'None',
				in_charge: 'Office staff assigned to IDS'
			},
			{
				id: 'livelihood_assistance',
				title: 'Livelihood Assistance',
				about:
					'Helps associations/organizations access livelihood programs to enhance community capacity and address poverty issues.',
				classification: 'Simple',
				type_of_transaction: 'G2C – Government to Citizens',
				who_may_avail: 'Farmers/Fisherfolks/Livelihood Associations',
				requirements: [
					'Letter request (requesting party to make)',
					'Community Tax Certificate (Municipal Treasurer’s Office)',
					'IDs of beneficiaries',
					'Financial Statement of assoc./org.',
					'Business permit if necessary',
					'Other documents as needed'
				],
				steps: [
					'Submit letter request to Mayor — Staff informs association if approved',
					'Wait for release — Staff evaluates beneficiaries, prepares documents, and releases assistance'
				],
				processing_time: '10 minutes + 2 days',
				fees: 'None',
				in_charge: 'Office staff assigned to IDS'
			}
		],
		feedback: `Concerns, suggestions, and service-related questions may be submitted to the Municipal Agriculturist Office. The office commits to respond within prescribed timeframes.`,
		note_unreadable: `Please verify details with LGU offices; some service requirements or procedures may be updated.`
	};

	// --- Smooth Scroll ---
	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// --- Modal Logic ---
	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/MAO.webp';
	let zoom = 1;
	let pos = { x: 0, y: 0 };
	let lastPos = { x: 0, y: 0 };
	let dragging = false;
	let initialDistance = 0;
	let initialZoom = 1;

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
			const scale = newDistance / initialDistance;
			zoom = Math.min(Math.max(initialZoom * scale, 1), 5);
		}
	}

	function onTouchEnd(e) {
		if (e.touches.length === 0) dragging = false;
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
			<p class="mt-1 text-sm text-gray-600"><strong>Mision:</strong> {charter.mission}</p>
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

	<!-- Desktop Charter Preview -->
	<div class="fixed top-[140px] right-4 z-50 hidden lg:block">
		<div
			class="w-48 rounded-xl bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
		>
			<button
				class="block w-full overflow-hidden rounded-xl"
				on:click={() => openImageModal('/CITIZENS CHARTER/MAO.webp')}
				aria-label="Open charter image"
			>
				<img
					src="/CITIZENS CHARTER/MAO.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/MAO.webp')}>View Full Image</button
				>
			</div>
		</div>
	</div>

	<!-- Mobile preview -->
	<div class="mb-4 block lg:hidden">
		<button
			class="w-full overflow-hidden rounded-xl"
			on:click={() => openImageModal('/CITIZENS CHARTER/MAO.webp')}
			aria-label="Open charter image"
		>
			<img
				src="/CITIZENS CHARTER/MPDC.webp"
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
							{#each svc.requirements as r}<li>{r}</li>{/each}
						</ul>
					</div>
					<div>
						<h4 class="font-medium">Steps</h4>
						<ol class="mt-2 list-inside list-decimal space-y-1 text-sm">
							{#each svc.steps as st}<li>{st}</li>{/each}
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

	<!-- Feedback Section -->
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
		<p>Prepared for: Municipal Agriculturist Office — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Final integration. Please verify all details with the Municipal Agriculturist
			Office.
		</p>
	</footer>
</div>
