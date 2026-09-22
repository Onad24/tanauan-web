<script>
	let imagePath = '/CITIZENS CHARTER/CC BILLBOARD - 8 x 14.25 feet.webp';

	let sections = $state([
		{
			id: 'vision',
			title: 'Our Vision',
			icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z',
			text: `A most delightful living community in Eastern Visayas of humane, vigilant, dynamic, empowered men and women in a healthy and well-protected environment, with a diversified and competitive economy having first-rate and safe infrastructures under a responsive, supportive, participative, and pro-active leadership.`
		},
		{
			id: 'mission',
			title: 'Our Mission',
			icon: 'M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5',
			text: `The Municipal Government of Tanauan shall take the lead in the integration and implementation of programs, projects, and activities, promote strong multi-sectoral partnerships, and mobilize resources through a strong political will and unity of purpose.`
		},
		{
			id: 'pledge',
			title: 'Performance Pledge',
			icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
			text: `We, the officials and employees of the Local Government Unit of Tanauan, Leyte, commit to:

S - Serve with trained personnel from Mondays to Fridays, 8:00 AM to 5:00 PM, with proper identification and decorum.  
E - Ensure promptness, courtesy, and efficiency in the delivery of our services.  
R - Respond to complaints with utmost confidentiality and proper action.  
V - Value every citizen’s comments, suggestions, and special needs, including differently-abled, pregnant women, and senior citizens.  
E - Empower the public through 24/7 access to information on policies, programs, activities, and services via our social media and other channels.  

ALL THESE WE PLEDGE, BECAUSE YOU DESERVE NO LESS.`
		},
		{
			id: 'redress',
			title: 'Redress Mechanism',
			icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
			text: `We are committed to providing quality service to all our constituents and clients. While we strive to succeed at all times, there may be occasions when things go wrong. Clients have the right to report issues, and we admit our mistakes, offer full apologies, and take corrective actions.`
		},
		{
			id: 'feedback',
			title: 'Feedback Mechanism',
			icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
			text: `Information, suggestions, and comments may be forwarded via email or through our feedback form, which can also be placed in the Suggestion Box at the entrance of the Municipal Town Hall.`
		},
		{
			id: 'contact',
			title: 'Contact Information',
			icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
			text: `For inquiries:  
- Hon. Ma. Gina E. Merilo — Municipal Mayor  
- Email: mayor@tanauan.gov.ph  
- Phone: +63-915-XXX-XXXX`
		}
	]);

	function printPage() {
		window.print();
	}

	function downloadImage() {
		const link = document.createElement('a');
		link.href = imagePath;
		link.download = 'Citizens-Charter.jpg';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	// collapsed state helper
	let collapsed = $state({});
	sections.forEach((s) => (collapsed[s.id] = false));

	function toggle(id) {
		collapsed[id] = !collapsed[id];
	}
</script>

<svelte:head>
	<title>Citizen’s Charter Overview</title>
</svelte:head>

<div class="space-y-8">
	<!-- Page Subtitle & Action Bar -->
	<div
		class="flex flex-col gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-center sm:justify-between"
	>
		<div>
			<h2 class="font-serif text-2xl font-bold tracking-tight text-slate-800">
				LGU Tanauan Citizens' Charter
			</h2>
			<p class="mt-1 text-sm text-slate-500">
				Our commitment to transparency, quality public service, and citizen satisfaction.
			</p>
		</div>
		<div class="flex items-center gap-2.5">
			<button
				onclick={printPage}
				class="flex items-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none active:translate-y-0"
			>
				<svg
					class="h-4.5 w-4.5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					stroke-width="2"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
					/></svg
				>
				Print Page
			</button>
			<button
				onclick={downloadImage}
				class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none active:translate-y-0"
			>
				<svg
					class="h-4.5 w-4.5 text-slate-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					stroke-width="2"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
					/></svg
				>
				Download Billboard
			</button>
		</div>
	</div>

	<!-- Billboard Card -->
	<div
		class="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
	>
		<div
			class="absolute top-0 right-6 left-6 h-1 rounded-b-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500"
		></div>

		<div class="mb-5 flex items-center gap-3">
			<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
				<svg
					class="h-5.5 w-5.5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					stroke-width="2"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/></svg
				>
			</div>
			<div>
				<h3 class="text-lg font-bold text-slate-800">Official Citizens' Charter Billboard</h3>
				<p class="text-xs text-slate-500">
					View and download the high-resolution billboard document.
				</p>
			</div>
		</div>

		<div
			class="relative flex max-h-[360px] items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50"
		>
			<img
				class="h-full w-full cursor-pointer object-cover transition-transform duration-500 hover:scale-102"
				src={imagePath}
				alt="Citizen's Charter poster"
				onclick={downloadImage}
			/>
			<div
				class="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			>
				<span
					class="flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2 text-sm font-bold text-slate-900 shadow-lg backdrop-blur-sm"
				>
					<svg
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
						/></svg
					>
					Click to Download
				</span>
			</div>
		</div>
	</div>

	<!-- Interactive Section List -->
	<div class="grid grid-cols-1 gap-6">
		{#each sections as s}
			<section
				id={s.id}
				class="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-200/80 hover:shadow-md"
			>
				<div
					class="absolute top-0 right-6 left-6 h-1 rounded-b-full bg-gradient-to-r from-blue-700 to-blue-500"
				></div>

				<!-- Section Header -->
				<div class="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
					<div class="flex items-center gap-3">
						<div
							class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-900 group-hover:text-white"
						>
							<svg
								class="h-5.5 w-5.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d={s.icon} />
							</svg>
						</div>
						<h2 class="text-xl font-bold tracking-tight text-slate-800">{s.title}</h2>
					</div>

					<button
						class="flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
						onclick={() => toggle(s.id)}
						aria-expanded={!collapsed[s.id]}
					>
						<span>{collapsed[s.id] ? 'Expand' : 'Collapse'}</span>
						<svg
							class="h-3.5 w-3.5 transition-transform duration-200 {collapsed[s.id]
								? 'rotate-180'
								: ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							stroke-width="2.5"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</button>
				</div>

				<!-- Section Content -->
				{#if !collapsed[s.id]}
					<div class="space-y-4">
						<div
							class="rounded-xl border border-transparent bg-slate-50/50 p-4 leading-relaxed whitespace-pre-wrap text-slate-600 transition-all duration-200 outline-none hover:bg-slate-50 focus:border-blue-200 focus:bg-white"
							contenteditable="true"
							bind:innerText={s.text}
							aria-label={s.title + ' editable content'}
						></div>

						<!-- Section actions (Copy & Download Text File) -->
						<div class="flex items-center gap-2 pt-2">
							<button
								onclick={() => navigator.clipboard?.writeText(s.text)}
								class="flex items-center gap-1.5 rounded-xl bg-slate-100/80 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200/80 hover:text-slate-900 focus:outline-none"
								title="Copy to clipboard"
							>
								<svg
									class="h-4 w-4 text-slate-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									stroke-width="2"
									><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path
										d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
									/></svg
								>
								Copy Text
							</button>
							<button
								onclick={() => {
									const blob = new Blob([s.text], { type: 'text/plain' });
									const a = document.createElement('a');
									a.href = URL.createObjectURL(blob);
									a.download = s.id + '.txt';
									document.body.appendChild(a);
									a.click();
									document.body.removeChild(a);
								}}
								class="flex items-center gap-1.5 rounded-xl bg-slate-100/80 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200/80 hover:text-slate-900 focus:outline-none"
								title="Export as text file"
							>
								<svg
									class="h-4 w-4 text-slate-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									stroke-width="2"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/></svg
								>
								Export Text
							</button>
						</div>
					</div>
				{/if}
			</section>
		{/each}
	</div>

	<!-- Export & Toggle All Panel -->
	<div
		class="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
	>
		<div
			class="absolute top-0 right-6 left-6 h-1 rounded-b-full bg-gradient-to-r from-blue-900 to-blue-700"
		></div>

		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h4 class="text-sm font-bold text-slate-800">Global Administration</h4>
				<p class="mt-0.5 text-xs text-slate-500">
					Control visibility and export all content data as structured JSON.
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-2.5">
				<button
					onclick={() => sections.forEach((s) => (collapsed[s.id] = false))}
					class="rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
				>
					Expand All
				</button>
				<button
					onclick={() => sections.forEach((s) => (collapsed[s.id] = true))}
					class="rounded-xl bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
				>
					Collapse All
				</button>
				<button
					class="flex items-center gap-1.5 rounded-xl bg-blue-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
					onclick={() => {
						const data = JSON.stringify(sections, null, 2);
						const blob = new Blob([data], { type: 'application/json' });
						const a = document.createElement('a');
						a.href = URL.createObjectURL(blob);
						a.download = 'citizens-charter.json';
						document.body.appendChild(a);
						a.click();
						document.body.removeChild(a);
					}}
				>
					<svg
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						stroke-width="2"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
						/></svg
					>
					Export All JSON
				</button>
			</div>
		</div>
	</div>
</div>
