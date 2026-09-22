<script lang="ts">
	// Placeholder for Forms & Templates

	import { departments } from '$lib/config';

	let data = $props();

	let showModal = $state(false);

	// form state
	let fullName = $state('');
	let contact = $state('');
	let purpose = $state('');
	let preferredDate = $state('');

	// new fields
	let licensingType = $state('Business Establishment');
	let department = $state('');
	let applicationType = $state('New Application');
	let scheduleCount = $state(0);
	let checkingSchedules = $state(false);

	async function fetchScheduleCount(date: string) {
		if (!date) {
			scheduleCount = 0;
			return;
		}

		checkingSchedules = true;
		// try {
		// 	const res = await fetch(`/api/licensing/schedules?date=${encodeURIComponent(date)}`);
		// 	if (res.ok) {
		// 		const data = await res.json();
		// 		scheduleCount = data.count ?? 0;
		// 	} else {
		// 		scheduleCount = 0;
		// 	}
		// } catch (e) {
		// 	console.error('schedule count error', e);
		// 	scheduleCount = 0;
		// } finally {
		// 	checkingSchedules = false;
		// }
	}

	let isSubmitting = $state(false);
	let successMessage = $state('');
	let errorMessage = $state('');

	function toggleModal() {
		showModal = !showModal;
		// reset messages when opening
		if (showModal) {
			successMessage = '';
			errorMessage = '';
		}
	}

	async function submitRequest(event: Event) {
		event.preventDefault();
		successMessage = '';
		errorMessage = '';

		// basic validation
		if (
			!fullName.trim() ||
			!purpose.trim() ||
			!licensingType ||
			!applicationType ||
			!preferredDate
		) {
			errorMessage = 'Please provide your full name and purpose.';
			return;
		}

		// contact validation: must be 10 digits (local number without leading 0)
		if (!contact || contact.replace(/\D/g, '').length !== 10) {
			errorMessage =
				'Please provide a valid 10-digit phone number (no leading 0). Example: 9123456789';
			return;
		}

		isSubmitting = true;

		try {
			const res = await fetch('/api/licensing/requests', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: fullName,
					// prepend +63 country code to the local digits
					contact: '+63' + contact,
					purpose,
					preferredDate,
					licensingType,
					applicationType
				})
			});

			if (res.ok) {
				const body = await res.json();
				successMessage = 'Request submitted — we will contact you soon.';
				// clear form
				fullName = '';
				contact = '';
				purpose = '';
				preferredDate = '';
				licensingType = 'Business Establishment';
				applicationType = 'New Application';
				scheduleCount = 0;

				// close after short delay
				setTimeout(() => {
					isSubmitting = false;
					showModal = false;
				}, 1200);
			} else {
				const err = await res.json().catch(() => ({}));
				errorMessage = err?.error || 'Failed to submit request.';
				isSubmitting = false;
			}
		} catch (e) {
			console.error(e);
			errorMessage = 'Network error. Please try again later.';
			isSubmitting = false;
		}
	}

	// small focus trap improvement: focus the first input when modal opens
	let firstInput: HTMLInputElement | null = $state(null);

	$effect(() => {
		if (showModal && firstInput) {
			// wait a tick
			setTimeout(() => firstInput?.focus(), 50);
		}
	});
</script>

<svelte:head>
	<title>Citizen's Charter — Services & Processes</title>
</svelte:head>

<div class="page container">
	<div class="flex items-center justify-end">
		<button
			onclick={toggleModal}
			class="rounded-lg bg-teal-600 px-5 py-2 text-white shadow transition hover:bg-teal-700"
		>
		Request Schedule
		</button>
	</div>
	<div class="card">
		<h1>Services & Processes</h1>
		<p class="lead">
			A short formal overview of the services offered by the Municipal Treasurer's Office and the
			process to avail them.
		</p>

		<ol>
			<li><strong>Business Permit Processing</strong> — Requirements, steps, and timelines.</li>
			<li>
				<strong>Tax Assessment</strong> — How assessments are computed and how to contest them.
			</li>
			<li><strong>Payment Procedures</strong> — Accepted payment channels and receipt issuance.</li>
		</ol>

		<p>Return to the <a href="/citizens-charter">main Citizens' Charter</a>.</p>
	</div>

	<!-- Modal -->
	{#if showModal}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity duration-300 sm:p-6"
			onclick={toggleModal}
			role="dialog"
			aria-modal="true"
			aria-label="Request Schedule"
		>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				class="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 transition-all duration-300 sm:p-8"
				onclick={(e) => e.stopPropagation()}
				role="document"
			>
				<!-- Close Button -->
				<button
					onclick={toggleModal}
					class="absolute top-4 right-4 rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200 hover:text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
					aria-label="Close modal"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>

				<!-- Modal Header -->
				<h3 class="mb-6 text-center text-2xl font-bold text-teal-700 sm:text-left">
					Request Schedule
				</h3>

				<!-- Form -->
				<form class="space-y-5" onsubmit={submitRequest}>
					{#if errorMessage}
						<div class="rounded-lg bg-red-50 p-3 text-red-700">{errorMessage}</div>
					{/if}
					{#if successMessage}
						<div class="rounded-lg bg-green-50 p-3 text-green-700">{successMessage}</div>
					{/if}

					<!-- Full Name -->
					<div>
						<label for="fullName" class="mb-1 block text-sm font-medium text-gray-700"
							>Full Name</label
						>
						<input
							id="fullName"
							bind:this={firstInput}
							bind:value={fullName}
							type="text"
							required
							class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
							placeholder="Juan dela Cruz"
						/>
					</div>

					<!-- Contact -->
					<div>
						<label for="contact" class="mb-1 block text-sm font-medium text-gray-700"
							>Contact (phone)</label
						>
						<div class="flex w-full">
							<span
								class="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700"
							>
								+63
							</span>
							<input
								id="contact"
								bind:value={contact}
								type="tel"
								inputmode="numeric"
								pattern="[0-9]*"
								maxlength="10"
								placeholder="9123456789"
								oninput={(e) => {
									const v = (e.target as HTMLInputElement).value || '';
									contact = v.replace(/\D/g, '').slice(0, 10);
								}}
								class="w-full rounded-r-lg border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
							/>
						</div>
						<p class="mt-1 text-sm text-gray-500">
							Enter your number without leading 0. Example: <code>9123456789</code>
						</p>
					</div>

					<div>
						<div>
							<label for="department" class="mb-1 block text-sm font-medium text-gray-700"
								>Department</label
							>
							<select
								id="department"
								bind:value={department}
								class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
							>
								<option value="" disabled selected>Select Department</option>
								{#each departments as dept}
									<option value={dept.name}>{dept.name}</option>
								{/each}
							</select>
						</div>
						<!-- Licensing Type & Application Type -->
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<label for="licensingType" class="mb-1 block text-sm font-medium text-gray-700"
									>Licensing Type</label
								>
								<select
									id="licensingType"
									bind:value={licensingType}
									class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
								>
									<option>Business Establishment</option>
									<option>Transport Service</option>
								</select>
							</div>
							<div>
								<label for="applicationType" class="mb-1 block text-sm font-medium text-gray-700"
									>Application Type</label
								>
								<select
									id="applicationType"
									bind:value={applicationType}
									class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
								>
									<option>New Application</option>
									<option>Renewal</option>
								</select>
							</div>
						</div>

						<!-- Desired Date -->
						<div>
							<label for="preferredDate" class="mb-1 block text-sm font-medium text-gray-700"
								>Desired Date</label
							>
							<input
								id="preferredDate"
								bind:value={preferredDate}
								type="date"
								onchange={(e) => fetchScheduleCount((e.target as HTMLInputElement).value)}
								class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
							/>
							<p class="mt-2 text-sm text-gray-600">
								{#if checkingSchedules}Checking schedules...
								{:else if scheduleCount === 0}No schedules set for this date.
								{:else}{scheduleCount} schedule{scheduleCount > 1 ? 's' : ''} already set for this date.
								{/if}
							</p>
						</div>

						<!-- Submit Button -->
						<div class="text-center sm:text-right">
							<button
								type="submit"
								disabled={isSubmitting}
								class="w-full rounded-lg bg-teal-600 px-5 py-2 text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:w-auto"
							>
								{#if isSubmitting}Sending...{:else}Submit Request{/if}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 900px;
		margin: 32px auto;
		padding: 16px;
	}
	.card {
		background: #fff;
		padding: 18px;
		border-radius: 10px;
		box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
	}
	h1 {
		margin-top: 0;
	}
	.lead {
		color: #374151;
	}
</style>
