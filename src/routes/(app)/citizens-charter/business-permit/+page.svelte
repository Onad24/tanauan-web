<script>
	import { onMount } from 'svelte';

	let charter = {
		title: `CITIZEN'S CHARTER — Business Permit and Licensing Section`,
		office:
			'Business Permit and Licensing Section (BPLS), Ground Floor, Municipal Town Hall, Real St., Tanauan, Leyte',
		head: 'RODELE E. MACEDA — Officer-In-Charge',
		vision: `The Business Permit and Licensing Section undertakes the registration, business tax assessment, and regulates entry and operations of all business establishments in the municipality.`,
		mission: `To ensure lawful registration and operation of businesses, provide timely issuance of permits, licenses, certifications, and related services while complying with local government policies and regulations.`,
		pledge: `We commit to deliver BPLS services with efficiency, transparency, and professionalism, safeguarding both government revenue and business compliance.`,
		services: [
			{
				id: 'new_renewal_permits',
				title: 'Application for New / Renewal of Business Permits and Licenses',
				about: `Ensures all businesses are registered, pay taxes/fees, and operate legally. Permit renewal is annual.`,
				requirements: [
					'Unified Application Form (BPLO / Downloadable)',
					'Barangay Business Clearance',
					'Cedula (Community Tax Certificate)',
					'Sanitary Permit / Health Card (MHO/RHU)',
					'Occupancy Permit (if new building)',
					'Contract of Lease (if renting)',
					'Fire Safety Certificate (BFP)',
					'National Police Clearance',
					'Certificate of Registration (DTI/SEC)',
					'CCTV Certification (Starting 2026)',
					'Environmental Certification (Starting 2026, MENRO Tanauan)'
				],
				steps: [
					'Submit Unified Application Form and requirements',
					'Pay fees at the Municipal Treasurer Office (MTO)',
					'Claim the Business Permit'
				],
				processing_time: 'Varies: 10 minutes–5 minutes–1 minute per step',
				fees: 'Refer to Tax Order of Payment',
				in_charge: 'Eboy, Claudette, Jhake, Ben, Rodele'
			},
			{
				id: 'retirement_closure',
				title: 'Application for Retirement / Closure of Business',
				about: `Surrender current business permit, submit sworn statement and gross sales, pay required taxes/fees, and receive retirement certification.`,
				requirements: [
					'Barangay Certification as to Existing/Non-Existing Business',
					'Letter of Intent indicating reason & date of retirement',
					'Original Mayor’s Permit',
					'Sworn Statement of Gross Receipts',
					'Book of Accounts or ITR',
					'Board Resolution (Corporation) / Members Resolution (Cooperative)',
					'Duly Notarized Special Power of Attorney (if representative files)'
				],
				steps: [
					'File application form and submit required documents',
					'Pay fees at MTO and submit OR to BPLS',
					'Claim the Certification'
				],
				processing_time: '3 + 3 + 2 minutes per steps',
				fees: 'Percentage of total paid on business',
				in_charge: 'BPLO Designate'
			},
			{
				id: 'certified_true_copy',
				title: 'Application for Certified True Copy (CTC)',
				about: `Issue certified photocopies of business permits or related documents after payment.`,
				requirements: [
					'Original and Xerox Copy of Document',
					'Duly Notarized SPA if filed by representative'
				],
				steps: [
					'Submit documents to BPLS',
					'Pay fees at MTO (Php80)',
					'Claim the Certified True Copy'
				],
				processing_time: '20 minutes + 1 minute per step',
				fees: 'Php80 per document',
				in_charge: 'BPLS Staff and BPLO Designate'
			},
			{
				id: 'transfer_location',
				title: 'Application for Certification of Transfer of Location',
				about: `Certifies transfer of business location after payment.`,
				requirements: [
					'Letter Request Indicating New Location',
					'Original Business Permit (Reference)',
					'Xerox Copy of Business Permit',
					'Barangay Certification (New Location)',
					'Duly Notarized SPA if filed by representative'
				],
				steps: [
					'Submit Letter Request and requirements',
					'Pay fees at MTO (Php80)',
					'Claim the Certification'
				],
				processing_time: '20 minutes + 1 minute per step',
				fees: 'Php80',
				in_charge: 'BPLS Staff and BPLO Designate'
			},
			{
				id: 'change_ownership',
				title: 'Application for Change of Ownership',
				about: `Process and issue certification of change of ownership after payment.`,
				requirements: [
					'Letter Request indicating reason for change',
					'Original Business Permit',
					'Sworn Statement of Gross Receipts',
					'Board / Members Resolution',
					'Duly Notarized SPA if filed by representative'
				],
				steps: [
					'Submit Letter Request and documents',
					'Pay fees at MTO (Php80)',
					'Claim the Certification'
				],
				processing_time: '20 minutes + 1 minute per step',
				fees: 'Php80',
				in_charge: 'BPLS Staff and BPLO Designate'
			},
			{
				id: 'forms_certification',
				title:
					'Issuance of Forms (Good Moral, Medical Certificate, Dance Permit, Affidavit for Scholarship)',
				about: `Issue various forms and certifications for citizens after payment.`,
				requirements: [
					'Barangay Certification / Clearance / Certificate of Indigency',
					'Punong Barangay Endorsement (Dance Permit)',
					'Cedula (Community Tax Certificate)',
					'Employment Registration (for Employment)',
					'Certification of No Real Property (for Affidavit)',
					'Police Clearance (for Good Moral Character)'
				],
				steps: [
					'File or pay for required documents',
					'Claim issued forms (Good Moral, Medical, Dance, Affidavit)'
				],
				processing_time: '10–20 minutes depending on form',
				fees: 'Good Moral Php80, Cedula Php50, Police Clearance Php130, Medical Php80, Dance Php100, Affidavit None',
				in_charge: 'BPLS Staff and BPLO Designate'
			}
		],
		feedback: `Clients may submit concerns or complaints directly to BPLS. Office commits to address all issues in timely manner.`,
		note_unreadable: `Verify all details directly with BPLS for official processes and requirements.`
	};

	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/LICENSING.webp';

	function openImageModal(src = modalSrc) {
		modalSrc = src;
		modalOpen = true;
		document.body.style.overflow = 'hidden';
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
				on:click={() => openImageModal('/CITIZENS CHARTER/LICENSING.webp')}
				aria-label="Open charter image"
			>
				<img
					src="/CITIZENS CHARTER/LICENSING.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/LICENSING.webp')}
					>View Full Image</button
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
				<img
					src={modalSrc}
					alt="Charter document"
					class="max-h-[80vh] w-full bg-gray-50 object-contain"
				/>
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
		<p>Prepared for: Business Permit and Licensing Section — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Draft integration. Please verify all BPLS processes with the office directly.
		</p>
	</footer>
</div>
