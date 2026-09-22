<script>
	import PageHero from '$lib/Components/PageHero.svelte';

	let office = $state('');
	let clientType = $state('Citizen / Resident');
	let serviceTransacted = $state('');
	let ratings = $state({
		timeliness: 5,
		accuracy: 5,
		courtesy: 5,
		cleanliness: 5,
		overall: 5
	});
	let comments = $state('');
	let citizenName = $state('');
	let contactNumber = $state('');
	let submitted = $state(false);
	let isSubmitting = $state(false);

	const officeList = [
		'Office of the Mayor',
		'Office of the Vice Mayor & Sangguniang Bayan',
		"Municipal Treasurer's Office (MTO)",
		'Business Permits & Licensing (BPLO)',
		'Local Civil Registrar (LCR)',
		'Municipal Social Welfare & Development (MSWDO)',
		'Municipal Health Office (MHO / RHU)',
		'Municipal Engineering Office',
		'Municipal Planning & Development (MPDC)',
		'Municipal Assessor’s Office',
		'Public Employment Service Office (PESO)',
		'Disaster Risk Reduction & Management (MDRRMO)',
		'Environment & Natural Resources (MENRO)',
		'Tanauan Fire Station (BFP)',
		'Tanauan Police Station (PNP)',
		'Other'
	];

	function handleSubmit(e) {
		e.preventDefault();
		isSubmitting = true;
		setTimeout(() => {
			isSubmitting = false;
			submitted = true;
			window.scrollTo({ top: 100, behavior: 'smooth' });
		}, 800);
	}

	function resetForm() {
		submitted = false;
		office = '';
		serviceTransacted = '';
		comments = '';
		citizenName = '';
		contactNumber = '';
		ratings = { timeliness: 5, accuracy: 5, courtesy: 5, cleanliness: 5, overall: 5 };
	}
</script>

<svelte:head>
	<title>Citizen Satisfaction Survey | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Help us serve you better. Share your experience and feedback on municipal services through the official Tanauan Citizen Satisfaction Survey."
	/>
</svelte:head>

<PageHero
	title="Citizen Satisfaction Survey"
	subtitle="Your voice matters. Help us create a Better & Brighter Tanauan by sharing your feedback"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z' /></svg>"
/>

<section class="bg-slate-50 py-12 md:py-16">
	<div class="container mx-auto max-w-4xl px-6 md:px-8">
		<!-- ARTA Compliance Banner -->
		<div class="mb-8 flex items-center gap-3 rounded-xl border border-blue-200/80 bg-blue-50/60 p-4 text-xs text-blue-900">
			<svg class="h-5 w-5 shrink-0 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
			</svg>
			<span>
				<strong>ARTA Republic Act No. 11032 Compliance:</strong> This Citizen Satisfaction Survey (CSat) is conducted to ensure transparent, accountable, and prompt frontline service delivery across all municipal offices.
			</span>
		</div>

		{#if submitted}
			<div class="rounded-3xl border border-emerald-200 bg-white p-10 text-center shadow-lg">
				<div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
					<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h2 class="text-2xl font-black text-slate-900">Damo nga Salamat! (Thank You!)</h2>
				<p class="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
					Your feedback has been successfully submitted and forwarded to the Local Chief Executive and Department Performance Monitoring Unit.
				</p>
				<div class="mt-8 flex justify-center gap-4">
					<a href="/" class="rounded-xl bg-blue-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-800">
						Return Home
					</a>
					<button onclick={resetForm} class="rounded-xl border border-slate-200 bg-slate-100 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-200">
						Submit Another Response
					</button>
				</div>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="space-y-8 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-10">
				<!-- Section 1: Transaction Information -->
				<div>
					<h3 class="mb-4 text-base font-bold text-slate-900 flex items-center gap-2">
						<span class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-900 text-[11px] font-bold text-white">1</span>
						Transaction Information
					</h3>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
						<div>
							<label for="office-select" class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
								Office Transacted With *
							</label>
							<select
								id="office-select"
								bind:value={office}
								required
								class="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
							>
								<option value="" disabled>-- Select Municipal Office --</option>
								{#each officeList as off}
									<option value={off}>{off}</option>
								{/each}
							</select>
						</div>

						<div>
							<label for="client-type" class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
								Client Type
							</label>
							<select
								id="client-type"
								bind:value={clientType}
								class="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
							>
								<option value="Citizen / Resident">Citizen / Resident</option>
								<option value="Business Owner / Representative">Business Owner / Representative</option>
								<option value="Government Employee">Government Employee</option>
								<option value="Visitor / Tourist">Visitor / Tourist</option>
							</select>
						</div>

						<div class="md:col-span-2">
							<label for="service-transacted" class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
								Service / Document Requested
							</label>
							<input
								id="service-transacted"
								type="text"
								bind:value={serviceTransacted}
								placeholder="e.g. Birth Certificate, Mayor's Permit, Real Property Tax, Medical Assistance, Cedula"
								class="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
							/>
						</div>
					</div>
				</div>

				<hr class="border-slate-150" />

				<!-- Section 2: Service Quality Dimension (SQD) Ratings -->
				<div>
					<h3 class="mb-2 text-base font-bold text-slate-900 flex items-center gap-2">
						<span class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-900 text-[11px] font-bold text-white">2</span>
						Service Quality Ratings
					</h3>
					<p class="text-xs text-slate-500 mb-6">Rate each dimension from 1 (Needs Improvement) to 5 (Outstanding).</p>

					<div class="space-y-4">
						{#each [
							{ key: 'timeliness', label: 'Promptness & Timeliness', desc: 'Reasonable waiting and transaction completion time' },
							{ key: 'accuracy', label: 'Information & Accuracy', desc: 'Clear guidelines, correct documentation, and helpful staff' },
							{ key: 'courtesy', label: 'Staff Courtesy & Professionalism', desc: 'Approachable, respectful, and attentive public servants' },
							{ key: 'cleanliness', label: 'Facilities & Safety', desc: 'Comfortable waiting area, cleanliness, and orderliness' },
							{ key: 'overall', label: 'Overall Satisfaction', desc: 'Your overall rating of your municipal transaction experience' }
						] as item}
							<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
								<div>
									<div class="text-sm font-bold text-slate-800">{item.label}</div>
									<div class="text-xs text-slate-500">{item.desc}</div>
								</div>

								<div class="flex items-center gap-2 shrink-0">
									{#each [1, 2, 3, 4, 5] as score}
										<button
											type="button"
											onclick={() => (ratings[item.key] = score)}
											class="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-all {ratings[item.key] === score
												? 'bg-blue-900 text-white shadow-md scale-105'
												: 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'}"
										>
											{score}
										</button>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>

				<hr class="border-slate-150" />

				<!-- Section 3: Comments & Suggestions -->
				<div>
					<h3 class="mb-4 text-base font-bold text-slate-900 flex items-center gap-2">
						<span class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-900 text-[11px] font-bold text-white">3</span>
						Comments & Suggestions (Optional)
					</h3>

					<textarea
						bind:value={comments}
						rows="4"
						placeholder="Please share any specific suggestions, commendations for personnel, or areas for improvement..."
						class="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
					></textarea>

					<div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="citizen-name" class="block text-xs font-medium text-slate-500 mb-1">Your Name (Optional)</label>
							<input
								id="citizen-name"
								type="text"
								bind:value={citizenName}
								placeholder="e.g. Juan Dela Cruz"
								class="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-800 focus:bg-white focus:outline-none"
							/>
						</div>
						<div>
							<label for="citizen-contact" class="block text-xs font-medium text-slate-500 mb-1">Mobile / Email (Optional)</label>
							<input
								id="citizen-contact"
								type="text"
								bind:value={contactNumber}
								placeholder="e.g. 0917-xxx-xxxx"
								class="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-800 focus:bg-white focus:outline-none"
							/>
						</div>
					</div>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					class="w-full rounded-2xl bg-blue-900 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-blue-800 disabled:opacity-50"
				>
					{isSubmitting ? 'Submitting Survey...' : 'Submit Citizen Feedback'}
				</button>
			</form>
		{/if}
	</div>
</section>
