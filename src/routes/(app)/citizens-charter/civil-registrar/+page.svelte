<script>
	import { onMount } from 'svelte';
	import CivilRegistrarDuties from '$lib/Components/Offices/CivilRegistrarDuties.svelte';

	// Citizen Charter Data
	let charter = {
		title: "CITIZEN'S CHARTER — Municipal Civil Registrar",
		office: 'Office of the Municipal Civil Registrar, Tanauan, Leyte',
		head_of_office: {
			name: 'Vincent Francis A. Salvaña',
			position: 'Department Head',
			office: 'Office of the Municipal Civil Registrar, Tanauan, Leyte'
		},
		vision:
			'The office of the Municipal Civil Registrar implements civil registration programs of the Municipality pursuant to the Civil Registry Law.',
		services: [
			{
				id: 'timely_registration',
				index: '01',
				code: 'TIME-REG',
				title: 'Timely Registration of Vital Events (Birth, Marriage, Death)',
				about:
					'Register vital events (birth, marriage, death) within the prescribed statutory period and receive the owner’s copy of registered documents.',
				processing_time: 'Same day / Within statutory period',
				requirements: [
					'Certificate of Live Birth (COLB) duly signed by attending physician or midwife (for births)',
					'Certificate of Marriage (COM) signed by solemnizing officer and contracting parties (for marriages)',
					'Certificate of Death (COD) signed by attending physician or Municipal Health Officer (for deaths)',
					'Valid government-issued ID of the informant or contracting parties'
				],
				steps: [
					'Proceed to the MCR office, verbalize requests, provide needed information and documents.',
					'Review the prepared civil registry form and let signatories affix their signatures.',
					'Proceed to the treasurer’s office to pay the required fees.',
					'Claim owner’s copy of registered documents of vital events.'
				],
				fees: 'As prescribed by Municipal Revenue Code',
				in_charge: 'Office of the Municipal Civil Registrar / Municipal Treasury Office'
			},
			{
				id: 'late_registration',
				index: '02',
				code: 'LATE-REG',
				title: 'Late Registration of Vital Events (Birth, Marriage, Death)',
				about:
					'Delayed filing and registration of vital events beyond the statutory period. Subject to mandatory 10-day legal posting period before release. Must submit 2 xerox copies of each document.',
				processing_time: '10-Day Mandatory Legal Posting Period Required',
				requirements: [
					'Requirements for Late Registration of Birth (2 xerox copies each): PSA Negative Result (No Record of Birth), Baptismal Certification, Bakuna Record (for children ages 0-5), School Records (Certification / Form 137 / TOR / Diploma), Marriage Certificate of Parents, At least 2 Livebirths of Siblings, Voter’s Certification, Philippine National ID / PhilSys Verification Slip, 2 pcs 2x2 picture with white background, Brgy. Certification, Joint Affidavit of Two Disinterested Persons (with xerox copy of valid ID of witnesses).',
					'Requirements for Late Registration of Marriage (2 xerox copies each): PSA Negative Result (No Record of Marriage), CENOMAR (for both contracting parties), Affidavit of Two Dis-interested Persons (with xerox copy of valid ID of witnesses), Birth certificates of any children born to the couple showing parents’ marriage details, Photocopy of valid government-issued IDs of the couple.',
					'Requirements for Late Registration of Death (2 xerox copies each): PSA Negative Result (No Record of Death), Burial Certificate, Affidavit of Two Dis-interested Persons (with xerox copy of valid ID of witnesses), Photocopy of valid government-issued IDs of the deceased and informant.'
				],
				steps: [
					'Proceed to the MCR office to verbalize the request.',
					'Secure and submit the needed requirements (must submit 2 xerox copies of each document).',
					'Review the filled out civil registry forms and let signatories affix their signatures.',
					'Proceed to the treasurer’s office to pay the required fees.',
					'Claim the owner’s copy of late registered documents (Note: released only after the required 10-day posting period).'
				],
				fees: 'Php 50.00 – 150.00 (depending on event & affidavit notarization)',
				in_charge: 'Office of the Municipal Civil Registrar / Municipal Treasury Office'
			},
			{
				id: 'marriage_license',
				index: '03',
				code: 'MARR-LIC',
				title: 'Application for Marriage License',
				about:
					'Filing separate sworn applications for marriage license before contracting marriage. Subject to mandatory 10-day legal posting period before release. Must submit 2 xerox copies of each document.',
				processing_time: '10-Day Mandatory Legal Posting Period Required',
				requirements: [
					'Core Requirements (2 xerox copies each): CENOMAR (Certificate of No Marriage), PSA/Local Live Birth, Brgy. Residency, Photocopy of valid government-issued IDs, Parental Consent for 18 up to below 21 years of age, Parental Advice for 21 up to 25 years of age.',
					'Additional if one of the couple is a Foreigner: Certificate of Legal Capacity / No Legal Impediment to Contract Marriage issued by the foreigner’s embassy or consulate, Divorce Decree / Annulment / Death Certificate of former spouse (if previously married). Documents not in English must be translated.'
				],
				steps: [
					'Applicants proceed to the MCR office and verbally state their request.',
					'Secure and submit required documents (must submit 2 xerox copies of each document).',
					'If requirements are complete and applicants are qualified, proceed to the treasurer’s office to pay the required fees.',
					'Present the required documents to the MSWD office for pre-marriage counseling.',
					'Submit the complete requirements, including the pre-marriage counseling certificate, to the MCR office for posting of the marriage application.',
					'Claim Marriage License at the MCR office after posting (released strictly after the 10-day posting period).'
				],
				fees: 'Php 150.00 (plus pre-marriage counseling / statutory fees)',
				in_charge: 'Office of the Municipal Civil Registrar / MSWDO / MTO'
			},
			{
				id: 'certified_copies',
				index: '04',
				code: 'CTC-ISSUANCE',
				title: 'Requesting of Certified True Copies of Certificate of Birth, Marriage, Death',
				about:
					'Archival search, verification, and issuance of certified true copies of birth, marriage, and death certificates from municipal archives.',
				processing_time: '30 to 45 minutes (same-day release)',
				requirements: [
					'Valid government-issued ID of the requesting person.',
					'Proof of relationship or authorization (when the requester is not the document owner or is requesting on behalf of another person): Authorization Letter, Valid IDs of document owner and authorized representative, Special Power of Attorney (SPA) when applicable.',
					'For representatives: Valid government-issued ID of both the representative and the person whose record is being requested.'
				],
				steps: [
					'Proceed to the MCR office and verbalize the request.',
					'If the requested document is available, present a valid government-issued ID and other required supporting documents, if any.',
					'Proceed to the treasurer’s office to pay the required fees.',
					'Wait for the processing time and claim your copy from the MCR staff.'
				],
				fees: 'Php 80.00 per certified true copy',
				in_charge: 'Office of the Municipal Civil Registrar / Municipal Treasury Office'
			},
			{
				id: 'clerical_petitions',
				index: '05',
				code: 'RA-PETITIONS',
				title: 'Filing of Petitions for Clerical Error R.A. 9048 & R.A. 10172',
				about:
					'Administrative proceedings for correction of clerical/typographical errors, change of first name, gender, or date of birth without need of a judicial court order. Subject to 10-day consecutive posting on bulletin board and OCRG Manila approval (takes 2 to 6 months). Must submit 2 xerox copies of each document.',
				processing_time: '10-Day Posting + 2 to 6 Months OCRG Manila Final Approval',
				requirements: [
					'Correction of Clerical Error (RA 9048) [2 xerox copies each]: PSA & Local COLB of Child, Baptismal Certificate, Marriage Certificate of Parents (if applicable), Marriage Certificate of Petitioner (if applicable), Voter’s Certification, School Records, Certificate of Employment / Service Record, Valid Government-Issued IDs, Any other supporting documents, Certificate of Indigency (if applicable).',
					'Change of First Name (RA 9048) [2 xerox copies each]: PSA & Local COLB of Child, Baptismal Certificate, Marriage Certificate (if applicable), Voter’s Certification, School Records, Police & NBI Clearance, Service Record / Affidavit of Non-Employment, Newspaper Publication, Valid Government-Issued IDs, Any other supporting documents, Certificate of Indigency (if applicable).',
					'Change of Gender (RA 10172) [2 xerox copies each]: PSA & Local COLB of Child, Baptismal Certificate, Marriage Certificate (if applicable), Voter’s Certification, School Records, Police & NBI Clearance, Service Record / Affidavit of Non-Employment, Medical Certificate from Government Physician, Ultrasound Result, Affidavit of No Medical Record of Birth, Newspaper Publication, Valid Government-Issued IDs, Any other supporting documents, Certificate of Indigency (if applicable).',
					'Change of Day & Month of Birth (RA 10172) [2 xerox copies each]: PSA & Local COLB of Child, Baptismal Certificate, Marriage Certificate (if applicable), Voter’s Certification, School Records, Police & NBI Clearance, Service Record / Affidavit of Non-Employment, Newspaper Publication, Valid Government-Issued IDs, Any other supporting documents, Certificate of Indigency (if applicable).'
				],
				steps: [
					'Proceed to the MCR office and verbalize the request.',
					'Present the documents for initial interview and assessment.',
					'Go to the cashier at the treasurer’s office to pay the required filing fee, get the official receipt and present it to the MCR staff.',
					'The MCR office will post a notice of the petition on their bulletin board for ten (10) consecutive days.',
					'After the ten (10) days posting, the petitioner must return to the MCR office to sign the formal verified petition.',
					'The MCR office forwards the validated petition to the Office of the Civil Registrar General (OCRG) in Manila for final approval, which takes two to six months.',
					'Once approved and affirmed by the CRG, the MCR office will update the petitioner to get the Certificate of Finality from the office to request the updated/annotated document from the Philippine Statistics Authority (PSA).'
				],
				fees: 'RA 9048 Clerical: Php 1,000.00 | RA 9048 First Name: Php 3,000.00 | RA 10172: Php 3,000.00 (plus publication / indigent fee exemptions)',
				in_charge: 'Office of the Municipal Civil Registrar / OCRG PSA Manila'
			}
		],
		feedback:
			'For inquiries or complaints, clients may approach the office directly or submit feedback through official channels.',
		note_unreadable:
			'Please verify all civil registry details with the Municipal Civil Registrar before finalizing transactions.'
	};

	// Navigation
	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	// Modal (Zoom + Pan)
	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/MCR.webp';

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
			const scale = getDistance(e.touches) / initialDistance;
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
			<p class="mt-1 text-sm text-gray-700">
				Head of Office: <strong>{charter.head_of_office.name}</strong> — {charter.head_of_office
					.position}
			</p>
			<p class="mt-1 text-sm italic">{charter.vision}</p>
		</div>
		<div class="flex flex-wrap gap-2">
			<a
				href="/Departments/Civil Registrar#orgchart"
				class="inline-flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-800 shadow-sm transition hover:bg-teal-100"
			>
				<svg class="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
				</svg>
				Org Structure
			</a>
			<button
				class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
				on:click={() => scrollTo('services')}>Jump to Services</button
			>
			<button
				class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
				on:click={() => window.print()}>Print</button
			>
		</div>
	</header>

	<!-- Charter Preview -->
	<div class="fixed top-[140px] right-4 z-50 hidden lg:block">
		<div
			class="w-48 rounded-xl bg-white p-3 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
		>
			<button
				class="block w-full overflow-hidden rounded-xl"
				on:click={() => openImageModal('/CITIZENS CHARTER/MCR.webp')}
			>
				<img
					src="/CITIZENS CHARTER/MCR.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/MCR.webp')}>View Full Image</button
				>
			</div>
		</div>
	</div>

	<div class="mb-4 block lg:hidden">
		<button
			class="w-full overflow-hidden rounded-xl"
			on:click={() => openImageModal('/CITIZENS CHARTER/MCR.webp')}
		>
			<img
				src="/CITIZENS CHARTER/MCR.webp"
				alt="Charter preview"
				class="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
			/>
		</button>
		<div class="mt-2 text-center">
			<p class="text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
			<button
				class="mt-1 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
				on:click={() => openImageModal('/CITIZENS CHARTER/MCR.webp')}>View Full Image</button
			>
		</div>
	</div>

	<!-- Services -->
	<section id="services" class="mb-10 space-y-6">
		<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
			<div>
				<div class="inline-flex items-center gap-2 rounded-md border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-black tracking-wider text-blue-950 uppercase">
					OFFICE OF THE MUNICIPAL CIVIL REGISTRAR // SERVICES OFFERED
				</div>
				<h2 class="mt-2 text-2xl font-black text-blue-950 sm:text-3xl">Official Citizen's Charter & Statutory Services</h2>
				<p class="mt-1 text-sm text-slate-600">
					All procedures, documentary requirements, and mandatory posting periods compliant with Act No. 3753, RA 9048, and RA 10172.
				</p>
			</div>
			<div class="flex items-center gap-2">
				<span class="rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-800 shadow-2xs">
					✓ Complete PDF Data & Animated Guide
				</span>
			</div>
		</div>

		<!-- Animated Interactive Duties & Requirements Guide -->
		<CivilRegistrarDuties />
	</section>

	<!-- Feedback -->
	<section class="mb-6 rounded-lg bg-white p-5 shadow-sm">
		<h2 class="text-lg font-semibold">Feedback & Redress Mechanism</h2>
		<p class="mt-2 text-sm">{charter.feedback}</p>
		<p class="mt-3 text-xs text-red-600">{charter.note_unreadable}</p>
	</section>

	<!-- Modal -->
	{#if modalOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm"
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			on:click={closeImageModal}
			on:keydown={(e) => e.key === 'Escape' && closeImageModal()}
		>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="relative mx-4 w-full max-w-3xl scale-95 transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-300"
				on:click|stopPropagation
			>
				<button
					class="absolute top-3 right-3 rounded-full bg-white p-1 text-2xl font-bold text-gray-700 shadow-md transition-colors hover:text-gray-900"
					on:click={closeImageModal}>×</button
				>
				<!-- svelte-ignore a11y_no_static_element_interactions -->
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
		<p>Prepared for: Municipal Civil Registrar — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Draft integration. Please verify all civil registry details with the Municipal
			Civil Registrar.
		</p>
	</footer>
</div>
