<script>
	import { onMount } from 'svelte';
	import PageHero from '$lib/Components/PageHero.svelte';

	let visible = $state(false);

	// Calculator State
	let selectedTaxType = $state('rpt');
	let assessedValue = $state(150000);
	let paymentMonth = $state('January');
	let annualGrossSales = $state(500000);

	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 100);
	});

	// RPT calculations
	let rptBase = $derived(assessedValue * 0.01);
	let rptDiscount = $derived(
		['January', 'February', 'March'].includes(paymentMonth) ? rptBase * 0.1 : 0
	);
	let rptSurcharge = $derived(
		[
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		].includes(paymentMonth)
			? rptBase *
					0.02 *
					([
						'April',
						'May',
						'June',
						'July',
						'August',
						'September',
						'October',
						'November',
						'December'
					].indexOf(paymentMonth) +
						1)
			: 0
	);
	let rptTotal = $derived(rptBase - rptDiscount + rptSurcharge);

	// Business Tax calculations
	let businessTaxBase = $derived(annualGrossSales * 0.015);
	let businessPermitFee = 2500; // flat regulatory fee estimate
	let businessTotal = $derived(businessTaxBase + businessPermitFee);

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
</script>

<svelte:head>
	<title>Tax and Fees Guidelines | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Local tax rates, regulatory fee guides, assessment procedures, and interactive tax estimators for Tanauan, Leyte."
	/>
</svelte:head>

<PageHero
	title="Tax & Fees"
	subtitle="Understand tax obligations, check deadlines, and estimate your dues"
	icon="<svg class='h-6 w-6 sm:h-7 sm:w-7' fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h16.5M5.25 7.5h13.5m-12 9a3 3 0 013-3h1.5a3 3 0 013 3m0 0a3 3 0 01-3 3h-1.5a3 3 0 01-3-3zm9.22-3.72l3 3m0 0l3-3m-3 3V10.5' /></svg>"
/>

<section class="relative bg-slate-50 pt-8 pb-20">
	<div class="mx-auto max-w-6xl px-6 sm:px-10">
		<!-- Intro Grid -->
		<div
			class="mb-10 grid gap-8 lg:grid-cols-12"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease;"
		>
			<!-- Tax Categories cards -->
			<div class="space-y-6 lg:col-span-7">
				<!-- Card 1: RPT -->
				<div
					class="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
				>
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900"
					>
						<svg
							class="h-6 w-6"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18v3H3V3z"
							/></svg
						>
					</div>
					<div>
						<h3 class="text-lg font-bold text-slate-900">Real Property Tax (RPT)</h3>
						<p class="mt-1 text-sm text-slate-600">
							Imposed on owners of land, buildings, and machinery within Tanauan. Calculated at a
							standard rate of 1% of the property's assessed value.
						</p>
						<ul class="mt-3 list-inside list-disc space-y-1 text-xs text-slate-500">
							<li>Standard rate: <strong class="text-slate-700">1.0%</strong> annually</li>
							<li>
								Basic deadline: <strong class="text-slate-700">March 31</strong> for full annual payment
							</li>
							<li>
								Early payments qualify for up to <strong class="font-semibold text-emerald-600"
									>10% discount</strong
								>
							</li>
						</ul>
					</div>
				</div>

				<!-- Card 2: Business Taxes -->
				<div
					class="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
				>
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600"
					>
						<svg
							class="h-6 w-6"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.015a2.993 2.993 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z"
							/></svg
						>
					</div>
					<div>
						<h3 class="text-lg font-bold text-slate-900">Business Taxes & Licenses</h3>
						<p class="mt-1 text-sm text-slate-600">
							Levied on registered businesses operating in the municipality. Computed based on gross
							sales or receipts from the preceding calendar year.
						</p>
						<ul class="mt-3 list-inside list-disc space-y-1 text-xs text-slate-500">
							<li>
								Filing period: <strong class="text-slate-700">January 1 – 20</strong> annually
							</li>
							<li>Requires updated community tax certificate (Cedula)</li>
							<li>Regulatory permits (Fire, Sanitary, Zoning) are bundled during assessment</li>
						</ul>
					</div>
				</div>

				<!-- Card 3: Other local fees -->
				<div
					class="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
				>
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
					>
						<svg
							class="h-6 w-6"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/></svg
						>
					</div>
					<div>
						<h3 class="text-lg font-bold text-slate-900">Regulatory & Administrative Fees</h3>
						<p class="mt-1 text-sm text-slate-600">
							Miscellaneous public charges for clearances, health certs, civil registries, and
							public services.
						</p>
						<ul class="mt-3 list-inside list-disc space-y-1 text-xs text-slate-500">
							<li>Zoning clearances & building inspection permits</li>
							<li>Municipal health card certificates</li>
							<li>Civil registry (birth, marriage, death certificate processing)</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Interactive Calculator Panel -->
			<div
				class="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-5"
			>
				<div>
					<div class="mb-6 flex items-center gap-2">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-900"
						>
							<svg
								class="h-4.5 w-4.5"
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 15.75V18m-3-9h.008v.008H12.75V9zm0 3h.008v.008H12.75v-.008zm0 3h.008v.008H12.75V15zm0-6h.008v.008H12.75V9zm0 3h.008v.008H12.75v-.008zm0 3h.008v.008H12.75V15zm0-6h.008v.008H12.75V9zm0 3h.008v.008H12.75v-.008zm0 3h.008v.008H12.75V15zm0-6h.008v.008H12.75V9zm0 3h.008v.008H12.75v-.008zm0 3h.008v.008H12.75V15zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/></svg
							>
						</div>
						<h3 class="text-base font-extrabold text-slate-900">Tax Dues Estimator</h3>
					</div>

					<!-- Calculator Type Toggle -->
					<div class="mb-6 flex rounded-lg bg-slate-100 p-0.5">
						<button
							onclick={() => (selectedTaxType = 'rpt')}
							class="flex-1 rounded-md py-1.5 text-xs font-bold transition-all duration-200 {selectedTaxType ===
							'rpt'
								? 'bg-white text-slate-900 shadow-sm'
								: 'text-slate-500 hover:text-slate-800'}"
						>
							Real Property
						</button>
						<button
							onclick={() => (selectedTaxType = 'biz')}
							class="flex-1 rounded-md py-1.5 text-xs font-bold transition-all duration-200 {selectedTaxType ===
							'biz'
								? 'bg-white text-slate-900 shadow-sm'
								: 'text-slate-500 hover:text-slate-800'}"
						>
							Business Tax
						</button>
					</div>

					{#if selectedTaxType === 'rpt'}
						<!-- RPT Calculator Inputs -->
						<div class="space-y-4">
							<div>
								<label
									for="assessed-val"
									class="mb-1.5 block text-xs font-semibold tracking-wide text-slate-500 uppercase"
									>Assessed Property Value (PHP)</label
								>
								<input
									id="assessed-val"
									type="number"
									bind:value={assessedValue}
									class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
									placeholder="e.g. 150000"
								/>
							</div>

							<div>
								<label
									for="pay-month"
									class="mb-1.5 block text-xs font-semibold tracking-wide text-slate-500 uppercase"
									>Expected Payment Month</label
								>
								<select
									id="pay-month"
									bind:value={paymentMonth}
									class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
								>
									{#each months as month}
										<option value={month}>{month}</option>
									{/each}
								</select>
							</div>

							<!-- Calculation Outputs -->
							<div
								class="mt-6 space-y-2.5 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm"
							>
								<div class="flex justify-between">
									<span class="text-slate-500">Base Tax (1%)</span>
									<span class="font-semibold text-slate-800"
										>₱{rptBase.toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										})}</span
									>
								</div>
								{#if rptDiscount > 0}
									<div class="flex justify-between text-emerald-600">
										<span>Early Discount (10%)</span>
										<span
											>- ₱{rptDiscount.toLocaleString('en-US', {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2
											})}</span
										>
									</div>
								{/if}
								{#if rptSurcharge > 0}
									<div class="flex justify-between text-rose-600">
										<span>Late Penalty</span>
										<span
											>+ ₱{rptSurcharge.toLocaleString('en-US', {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2
											})}</span
										>
									</div>
								{/if}
								<div
									class="flex justify-between border-t border-slate-200/80 pt-2.5 text-base font-bold"
								>
									<span class="text-slate-800">Estimated Total</span>
									<span class="text-blue-900"
										>₱{rptTotal.toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										})}</span
									>
								</div>
							</div>
						</div>
					{:else}
						<!-- Business Tax Calculator Inputs -->
						<div class="space-y-4">
							<div>
								<label
									for="gross-sales"
									class="mb-1.5 block text-xs font-semibold tracking-wide text-slate-500 uppercase"
									>Annual Gross Receipts (PHP)</label
								>
								<input
									id="gross-sales"
									type="number"
									bind:value={annualGrossSales}
									class="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
									placeholder="e.g. 500000"
								/>
							</div>

							<!-- Calculation Outputs -->
							<div
								class="mt-6 space-y-2.5 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm"
							>
								<div class="flex justify-between">
									<span class="text-slate-500">Gross Tax (1.5%)</span>
									<span class="font-semibold text-slate-800"
										>₱{businessTaxBase.toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										})}</span
									>
								</div>
								<div class="flex justify-between">
									<span class="text-slate-500">Regulatory Permit Fee</span>
									<span class="font-semibold text-slate-800"
										>₱{businessPermitFee.toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										})}</span
									>
								</div>
								<div
									class="flex justify-between border-t border-slate-200/80 pt-2.5 text-base font-bold"
								>
									<span class="text-slate-800">Estimated Total</span>
									<span class="text-blue-900"
										>₱{businessTotal.toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										})}</span
									>
								</div>
							</div>
						</div>
					{/if}
				</div>

				<div class="mt-6 border-t border-slate-100 pt-3 text-[10px] text-slate-400">
					* Estimates derived using basic percentages under the Local Revenue Code of Tanauan,
					Leyte. Excludes administrative clearances and specific fire department evaluation charges.
				</div>
			</div>
		</div>

		<!-- Payment Procedures Section -->
		<div
			class="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
			class:opacity-0={!visible}
			class:translate-y-6={!visible}
			class:opacity-100={visible}
			class:translate-y-0={visible}
			style="transition: all 500ms ease; transition-delay: 100ms;"
		>
			<div class="mb-6 flex items-center gap-3">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"
				>
					<svg
						class="h-5 w-5"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
				</div>
				<div>
					<h2 class="text-xl font-bold text-slate-900">Payment Steps & Procedures</h2>
					<p class="text-xs font-medium text-slate-500">Standard process at the Municipal Hall</p>
				</div>
			</div>

			<!-- Process Flow -->
			<div class="relative grid gap-6 md:grid-cols-3">
				<!-- Step 1 -->
				<div
					class="rounded-xl border border-slate-100 bg-slate-50/50 p-5 transition-colors hover:bg-slate-50"
				>
					<div
						class="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-xs font-extrabold text-white"
					>
						1
					</div>
					<h4 class="font-bold text-slate-900">Assessment</h4>
					<p class="mt-1.5 text-xs leading-relaxed text-slate-600">
						Present tax declarations (RPT) or Gross Revenue receipts (Business) at the Assessor's
						Office desk for computation of liabilities.
					</p>
				</div>

				<!-- Step 2 -->
				<div
					class="rounded-xl border border-slate-100 bg-slate-50/50 p-5 transition-colors hover:bg-slate-50"
				>
					<div
						class="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-xs font-extrabold text-white"
					>
						2
					</div>
					<h4 class="font-bold text-slate-900">Verification</h4>
					<p class="mt-1.5 text-xs leading-relaxed text-slate-600">
						The Municipal Treasurer evaluates the generated computation sheet, verifying outstanding
						historical penalties or applied discounts.
					</p>
				</div>

				<!-- Step 3 -->
				<div
					class="rounded-xl border border-slate-100 bg-slate-50/50 p-5 transition-colors hover:bg-slate-50"
				>
					<div
						class="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-xs font-extrabold text-white"
					>
						3
					</div>
					<h4 class="font-bold text-slate-900">Payment & O.R.</h4>
					<p class="mt-1.5 text-xs leading-relaxed text-slate-600">
						Settle payment via Cashier or accredited banking systems. Receive your Official Receipt
						(O.R.) immediately to complete compliance.
					</p>
				</div>
			</div>
		</div>

		<!-- Direct Inquiry Card -->
		<div
			class="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:flex-row md:items-center"
			class:opacity-0={!visible}
			class:opacity-100={visible}
			style="transition: all 500ms ease; transition-delay: 200ms;"
		>
			<div class="flex items-center gap-4">
				<div
					class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-900"
				>
					<svg
						class="h-6 w-6"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.194-4.174-7-7l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
						/></svg
					>
				</div>
				<div>
					<h3 class="font-bold text-slate-900">Need help with your assessment?</h3>
					<p class="text-sm text-slate-600">
						Get in touch directly with the Municipal Treasurer's Office or schedule an assessment
						check.
					</p>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<a
					href="tel:+639171234567"
					class="rounded-lg bg-blue-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-950"
				>
					Call +63 917 123 4567
				</a>
			</div>
		</div>
	</div>
</section>
