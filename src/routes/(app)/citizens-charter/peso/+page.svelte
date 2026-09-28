<script>
	import { onMount } from 'svelte';

	let charter = {
		title: `CITIZEN'S CHARTER — Public Employment Service Office`,
		office:
			'Public Employment Service Office (PESO), Ground Floor, Tanauan Town Hall, 888 Real Street, Tanauan, Leyte',
		head: 'JOSELITA L. RETAGA — Labor & Employment Officer III / PESO Manager',
		vision: `PESO is a non-free charging multi-employment service facility established in LGUs in coordination with the Department of Labor and Employment (DOLE) pursuant to R.A. No. 8759 (PESO Act of 1999) as amended by R.A. No. 10691.`,
		mission: `To provide labor market information, referral and placement, employment coaching and counseling, and facilitate programs of partner agencies (especially DOLE) to clients including jobseekers, employers, employees, students, out-of-school youth, migrant workers, PWDs, displaced workers, and senior citizens in Tanauan, Leyte.`,
		pledge: `We commit to deliver PESO services with efficiency, integrity, and professionalism, supporting employment opportunities and skill development within our community.`,
		services: [
			{
				id: 'employment_facilitation',
				title: 'Employment Facilitation',
				about: `Provides labor market information, job matching, labor market data, job posting, and placement services.`,
				requirements: ['None'],
				steps: [
					'Submit Letter of Intent to LGU',
					'Conduct SRA/LRA and receive Certificate of No Objection'
				],
				processing_time: '1 day per step',
				fees: '500–1000 PHP for Certificate of No Objection',
				in_charge: 'PESO Manager / Municipal Treasurer’s Office'
			},
			{
				id: 'career_development_training',
				title: 'Career Development and Training',
				about: `Career counseling to help clients identify skills, interests, and career goals.`,
				requirements: [
					'Letter of Intent (provided by student)',
					'Resume (student, applicant, or employee)',
					'Personal Assessment Form (SPES 02)',
					'Photocopy PSA Birth Certificate',
					'Form 138 for High School / Senior High School',
					'Recent Grades / School Registration (preferably 2nd Semester)'
				],
				steps: [
					'Visit PESO Office for guidance on SPES program',
					'Fill out required forms and submit requirements',
					'Sign contract under supervision',
					'Monitoring and program follow-up (approx. 20 working days)',
					'Payout of benefits (approx. 30 minutes)'
				],
				processing_time: '20 working days for technical applications',
				fees: 'None',
				in_charge: 'PESO Manager'
			},
			{
				id: 'livelihood_self_employment',
				title: 'Livelihood and Self-Employment Promotion',
				about: `Facilitates access to livelihood and self-employment programs including training, mentoring, and resources for aspiring entrepreneurs.`,
				requirements: ['Photocopy of valid ID'],
				steps: [
					'Submit livelihood proposal to PESO for evaluation and recommendation to DOLE',
					'Supervise signing of proposal',
					'Monitor beneficiaries (approx. 20 working days)',
					'Release of support/resources (approx. 3 working days)'
				],
				processing_time: '3–20 working days depending on step',
				fees: 'None',
				in_charge: 'PESO Manager'
			},
			{
				id: 'reintegration_helpdesk',
				title: 'Reintegration and Assistance PFW Help Desk',
				about: `Support for returning Filipino migrant workers to reintegrate into the local labor market.`,
				requirements: ['Any documents related to the issue (referrals, pictures, police reports)'],
				steps: [
					'Report to PESO Office with required documents',
					'Interview and evaluation by PESO',
					'Referral and assistance provided to repatriated OFW/Migrant Worker'
				],
				processing_time: '7 working days per step',
				fees: 'None',
				in_charge: 'PESO Manager'
			},
			{
				id: 'tesda_training_referrals',
				title: 'TESDA Training Referrals / Scholarships',
				about: `Provide scholarships and financial assistance to encourage technical and vocational training.`,
				requirements: ['Letter of Intent / Referral provided by PESO'],
				steps: [
					'Apply for TESDA courses or scholarships',
					'Conduct interview',
					'Write formal referral letters to TESDA accredited training centers'
				],
				processing_time: '7 working days for complex transactions',
				fees: 'None',
				in_charge: 'PESO Manager'
			},
			{
				id: 'spes_certificate',
				title: 'Issuance of Certificate of SPES Employment',
				about: `Certify SPES participants for completing required working hours.`,
				requirements: ['Proof of attendance / Daily Time Record (DTR)'],
				steps: [
					'Request certificate for employment credentials',
					'Interview and issuance of certificate by PESO'
				],
				processing_time: '3 working days or less',
				fees: 'None',
				in_charge: 'PESO Manager'
			},
			{
				id: 'municipal_scholarship',
				title: 'Municipal Scholarship Program',
				about: `Provide financial assistance for deserving students to pursue tertiary education.`,
				requirements: [
					'Application Letter',
					'Certificate of Registration',
					'Certificate of Grades',
					'Photocopies: Form 138 / School Card, Diploma, Good Moral Character',
					'Barangay Clearance'
				],
				steps: ['Apply for Municipal Scholarship and undergo examination', 'Monitor beneficiaries'],
				processing_time: '1 hour per exam / follow-up as needed',
				fees: 'None',
				in_charge: 'PESO Manager'
			}
		],
		feedback: `Concerns, complaints, and suggestions may be submitted to PESO. The office commits to acknowledge and respond within prescribed timeframes.`,
		note_unreadable: `Verify all details directly with PESO, especially for official documents and transactions.`
	};

	function scrollTo(id) {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	let modalOpen = false;
	let modalSrc = '/CITIZENS CHARTER/PESO.webp';

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
				on:click={() => openImageModal('/CITIZENS CHARTER/PESO.webp')}
				aria-label="Open charter image"
			>
				<img
					src="/CITIZENS CHARTER/PESO.webp"
					alt="Charter preview"
					class="h-32 w-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</button>
			<div class="mt-3 flex flex-col items-center">
				<p class="text-center text-sm font-medium text-gray-700">Citizen’s Charter Document</p>
				<button
					class="mt-2 rounded-lg bg-blue-600 px-4 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
					on:click={() => openImageModal('/CITIZENS CHARTER/PESO.webp')}>View Full Image</button
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
		<p>Prepared for: Public Employment Service Office — Tanauan, Leyte</p>
		<p class="mt-2">
			Last checked: Draft integration. Please verify all PESO processes with the office directly.
		</p>
	</footer>
</div>
