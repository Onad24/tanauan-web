<script>
	import { onMount } from 'svelte';
	import { officesByDepartment } from '$lib/config';

	export let department = '';
	export let cleanLayout = false;

	let awards = [];
	let offices = [];
	let selectedOffice = '';
	let loading = true;
	let error = '';
	let showModal = false;

	$: filtered = selectedOffice ? awards.filter((u) => u.office === selectedOffice) : awards;

	onMount(async () => {
		if (!department) {
			error = 'Department not specified';
			loading = false;
			return;
		}
		console.log(department);
		try {
			const response = await fetch(
				`/api/others?department=${encodeURIComponent(department)}&type=${encodeURIComponent('Organizational Chart')}`
			);
			if (!response.ok) throw new Error('Failed to fetch organizational chart');
			const data = await response.json();
			filtered = data.posts || [];
			offices = officesByDepartment[department] || [];
		} catch (err) {
			error = err.message;
			console.error('Error loading org chart:', err);
		} finally {
			loading = false;
		}
	});

	function openModal() {
		showModal = true;
	}

	function closeModal() {
		showModal = false;
	}
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && closeModal()} />

<div class={cleanLayout ? '' : 'rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm'}>
	{#if !cleanLayout}
		<h2 class="mb-4 text-2xl font-black text-blue-950">Organizational Chart</h2>
	{/if}

	{#if loading}
		<div class="flex flex-col items-center justify-center py-16 text-slate-500">
			<div
				class="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-amber-400 border-t-blue-900"
			></div>
			<p class="text-sm font-bold tracking-wide text-slate-700 uppercase">
				Loading Official Hierarchy...
			</p>
		</div>
	{:else if error}
		<div
			class="rounded-xl border-2 border-red-300 bg-red-50 p-6 text-center font-bold text-red-800"
		>
			Notice: {error}
		</div>
	{:else if filtered.length === 0}
		<div
			class="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-600"
		>
			<div class="mb-1 text-base font-black text-blue-950">No Organizational Chart on Record</div>
			<p class="text-xs text-slate-500">
				Official supervisory matrix for this office is being updated.
			</p>
		</div>
	{:else}
		<div class="flex w-full flex-col items-center">
			<!-- Blueprint Frame Container with Micro-Controls -->
			<div
				class="group relative w-full max-w-5xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50 shadow-sm transition-all duration-300 hover:border-blue-900/40 hover:shadow-xl"
			>
				<!-- Technical Blueprint Header Bar -->
				<div
					class="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-200 bg-slate-100/90 px-5 py-3 backdrop-blur-sm"
				>
					<div class="flex items-center gap-3">
						<span class="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
						<span class="font-mono text-xs font-black tracking-wider text-blue-950 uppercase">
							CSC-RATIFIED DIRECTORY // {department}
						</span>
						<span
							class="hidden rounded border border-amber-500 bg-amber-400 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-blue-950 sm:inline-block"
						>
							ACTIVE
						</span>
					</div>

					<!-- Direct Interactive Action Buttons -->
					<div class="flex items-center gap-2">
						<button
							type="button"
							onclick={openModal}
							class="inline-flex items-center gap-1.5 rounded-lg bg-blue-950 px-3.5 py-1.5 text-xs font-black tracking-wider text-white uppercase shadow-sm transition-all hover:scale-105 hover:bg-blue-900 active:scale-95"
							title="Open high-resolution inspect viewer"
						>
							<span>[⛶ See Full Chart]</span>
						</button>
					</div>
				</div>

				<!-- Visual Blueprint Display Area -->
				<div
					class="relative flex cursor-zoom-in items-center justify-center bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] p-4 sm:p-6"
					onclick={openModal}
					onkeydown={(e) => e.key === 'Enter' && openModal()}
					role="button"
					tabindex="0"
					title="Click to inspect full size"
				>
					<!-- Subtle Municipal Seal Watermark -->
					<img
						src="/tanauan logo.svg"
						alt=""
						class="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 opacity-5 select-none"
					/>

					<img
						src={filtered[0].media[0]}
						alt="Official Organizational Chart of {department}"
						class="h-auto max-h-[560px] w-full rounded-xl object-contain shadow-sm transition-transform duration-500 group-hover:scale-[1.01]"
					/>

					<!-- Click to Zoom Hint Overlay -->
					<div
						class="pointer-events-none absolute bottom-6 left-6 flex items-center gap-2 rounded-lg border border-slate-300 bg-white/95 px-3.5 py-1.5 opacity-85 shadow-sm backdrop-blur-md transition-opacity group-hover:opacity-100"
					>
						<span class="h-2 w-2 rounded-full bg-blue-900"></span>
						<span class="text-[11px] font-bold text-slate-800"
							>Click blueprint to inspect in full zoom</span
						>
					</div>
				</div>

				<!-- Blueprint Footer Metadata -->
				<div
					class="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-100/70 px-5 py-2.5 text-[11px] font-semibold text-slate-600"
				>
					<span
						>Executive Line of Authority: Municipal Mayor → Sangguniang Bayan → Department Head</span
					>
					<span class="font-mono text-slate-500">FORMAT: OFFICIAL PUBLIC RECORD</span>
				</div>
			</div>
		</div>
	{/if}
</div>

<!-- High-Resolution Lightbox Modal -->
{#if showModal && filtered.length > 0}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/85 p-4 backdrop-blur-md transition-all duration-300 sm:p-6"
		onclick={closeModal}
		role="dialog"
		aria-modal="true"
	>
		<div
			class="animate-in fade-in zoom-in-95 relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border-4 border-amber-400 bg-white shadow-2xl duration-200"
			onclick={(e) => e.stopPropagation()}
			role="document"
		>
			<!-- Modal Header -->
			<div
				class="flex items-center justify-between border-b-2 border-amber-400 bg-blue-950 px-6 py-4 text-white"
			>
				<div class="flex items-center gap-3">
					<span class="h-3 w-3 rounded-full bg-amber-400"></span>
					<div>
						<div class="text-sm font-black tracking-wide uppercase">
							{department} Organizational Hierarchy
						</div>
						<div class="text-xs font-medium text-blue-200">
							Municipality of Tanauan, Province of Leyte
						</div>
					</div>
				</div>

				<div class="flex items-center gap-3">
					<a
						href={filtered[0].media[0]}
						target="_blank"
						rel="noopener noreferrer"
						download
						class="rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-black tracking-wider text-blue-950 uppercase transition-all hover:bg-amber-300"
					>
						Download File ↗
					</a>
					<button
						type="button"
						onclick={closeModal}
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900 text-sm font-black text-white transition-colors hover:bg-red-600"
						aria-label="Close modal"
					>
						✕
					</button>
				</div>
			</div>

			<!-- Modal Image Viewport -->
			<div class="flex min-h-[400px] items-center justify-center overflow-auto bg-slate-100 p-6">
				<img
					src={filtered[0].media[0]}
					alt="Full Organizational Structure of {department}"
					class="h-auto max-h-[72vh] w-auto max-w-full rounded-xl border border-slate-300 bg-white object-contain shadow-lg"
				/>
			</div>

			<!-- Modal Footer -->
			<div
				class="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-3 text-xs font-bold text-slate-600"
			>
				<span>Press ESC or click outside to close viewer.</span>
				<span class="text-blue-900">Official Municipal Government Transparency Document</span>
			</div>
		</div>
	</div>
{/if}
