<script>
	import Modal from '$lib/Modal.svelte';
	import { uploadMultipleFiles, isImageURL, isVideoURL } from '$lib/firebaseStorage';
	import { departments } from '$lib/config';
	import { toast } from '$lib/admin/toast';
	import { confirmAction } from '$lib/admin/confirm';
	import {
		Search,
		X,
		Plus,
		Pencil,
		Trash2,
		ChevronLeft,
		ChevronRight,
		AlertCircle,
		Award,
		Trophy,
		Building2,
		CalendarDays,
		FileText,
		FileImage,
		FileVideo
	} from 'lucide-svelte';

	let { data } = $props();

	let rows = $state([]);
	$effect(() => {
		rows = data.posts || [];
	});

	let loading = $state(false);
	let showModal = $state(false);
	let editing = $state(null);
	let uploading = $state(false);
	let error = $state('');

	// 🔍 Search + Pagination
	let searchTerm = $state('');
	let currentPage = $state(1);
	const pageSize = 10;

	// Form
	let form = $state({
		awards: '',
		awarding_body: '',
		department: '',
		description: '',
		media: [],
		year: ''
	});
	let selectedFiles = $state([]);
	let mediaPreview = $state([]);

	// 📊 Stats derived straight from the loaded records
	let totalCount = $derived(rows.length);
	let departmentCount = $derived(new Set(rows.map((r) => r.department).filter(Boolean)).size);
	let latestYear = $derived(
		rows.reduce((max, r) => {
			const year = Number(r.year);
			return Number.isFinite(year) && year > max ? year : max;
		}, 0)
	);

	let yearOptions = $derived(
		Array.from(
			{ length: new Date().getFullYear() - 1946 + 1 },
			(_, i) => new Date().getFullYear() - i
		)
	);

	// 🔎 Null-safe multi-field filter
	let filteredRows = $derived.by(() => {
		const lower = searchTerm.trim().toLowerCase();
		if (!lower) return rows;
		return rows.filter(
			(r) =>
				r.awards?.toLowerCase()?.includes(lower) ||
				r.department?.toLowerCase()?.includes(lower) ||
				r.awarding_body?.toLowerCase()?.includes(lower) ||
				r.description?.toLowerCase()?.includes(lower) ||
				String(r.year ?? '')
					.toLowerCase()
					.includes(lower)
		);
	});

	let totalPages = $derived(Math.max(1, Math.ceil(filteredRows.length / pageSize)));
	let paginatedRows = $derived(
		filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	);
	let startEntry = $derived(filteredRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1);
	let endEntry = $derived(Math.min(currentPage * pageSize, filteredRows.length));

	// Reset to the first page whenever the search term changes
	$effect(() => {
		if (searchTerm !== undefined) currentPage = 1;
	});

	// Clamp the current page so it can never exceed the last page
	$effect(() => {
		if (currentPage > totalPages) currentPage = totalPages;
	});

	function goToPage(page) {
		if (page < 1 || page > totalPages) return;
		currentPage = page;
	}

	function clearFilters() {
		searchTerm = '';
	}

	function mediaName(item) {
		if (typeof item !== 'string') return item?.name || 'file';
		return item.split('/').pop()?.split('?')[0] || 'file';
	}

	function openAdd() {
		editing = null;
		form = {
			awards: '',
			awarding_body: '',
			department: '',
			description: '',
			media: [],
			year: ''
		};
		selectedFiles = [];
		mediaPreview = [];
		error = '';
		showModal = true;
	}

	function openEdit(r) {
		editing = r;
		form = {
			awards: r.awards || '',
			awarding_body: r.awarding_body || '',
			department: r.department || '',
			description: r.description || '',
			media: r.media || [],
			year: r.year || ''
		};
		selectedFiles = [];
		mediaPreview = r.media || [];
		error = '';
		showModal = true;
	}

	function handleMediaInput(e) {
		selectedFiles = Array.from(e.target.files || []);
		mediaPreview = [
			...form.media,
			...selectedFiles.map((f) => ({ name: f.name, type: f.type, isNew: true }))
		];
	}

	function removeMediaItem(index) {
		if (form.media[index]) {
			form.media = form.media.filter((_, i) => i !== index);
		}
		const newFileIndex = index - form.media.length;
		if (newFileIndex >= 0) {
			selectedFiles = selectedFiles.filter((_, i) => i !== newFileIndex);
		}
		mediaPreview = mediaPreview.filter((_, i) => i !== index);
	}

	async function removeRow(id) {
		const award = rows.find((r) => r.id === id);
		const ok = await confirmAction({
			title: 'Delete this award?',
			message:
				'This permanently removes the award record and its attached media from the public registry. This cannot be undone.',
			details: award?.awards || '',
			confirmText: 'Delete',
			danger: true
		});
		if (!ok) return;

		loading = true;
		try {
			const response = await fetch('/admin/awards', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id, media: award?.media || [] })
			});
			if (!response.ok) {
				await toast.apiError(response, 'Could not delete the award');
				return;
			}
			rows = rows.filter((r) => r.id !== id);
			toast.success('Award deleted');
		} catch (err) {
			toast.error(err?.message || 'Could not delete the award');
		} finally {
			loading = false;
		}
	}

	async function save() {
		error = '';
		uploading = true;
		try {
			let uploadedURLs = [];
			if (selectedFiles.length > 0) {
				try {
					uploadedURLs = await uploadMultipleFiles(selectedFiles);
				} catch (uploadErr) {
					error = `Upload failed: ${uploadErr.message}`;
					toast.error(`Upload failed: ${uploadErr.message}`);
					return;
				}
			}

			const allMedia = [...form.media, ...uploadedURLs];

			if (editing) {
				const response = await fetch('/admin/awards', {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						id: editing.id,
						awards: form.awards,
						awarding_body: form.awarding_body,
						department: form.department,
						description: form.description,
						media: allMedia,
						year: form.year
					})
				});
				if (!response.ok) {
					error = 'Could not save the award. Please try again.';
					await toast.apiError(response, 'Could not save the award');
					return;
				}

				const idx = rows.findIndex((r) => r.id === editing.id);
				if (idx >= 0) {
					rows[idx] = {
						id: editing.id,
						awards: form.awards,
						awarding_body: form.awarding_body,
						department: form.department,
						description: form.description,
						media: allMedia,
						year: form.year
					};
				}
				toast.success('Award saved');
			} else {
				const response = await fetch('/admin/awards', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						awards: form.awards,
						awarding_body: form.awarding_body,
						department: form.department,
						description: form.description,
						media: allMedia,
						year: form.year
					})
				});
				if (!response.ok) {
					error = 'Could not save the award. Please try again.';
					await toast.apiError(response, 'Could not save the award');
					return;
				}
				const newPost = await response.json();
				rows = [...rows, newPost];
				toast.success('Award saved');
			}
			showModal = false;
		} catch (err) {
			error = err?.message || 'Unexpected error while saving the award.';
			toast.error(error);
		} finally {
			uploading = false;
		}
	}
</script>

<svelte:head>
	<title>Awards &amp; Honors | LGU Tanauan, Leyte</title>
</svelte:head>

<div class="mx-auto max-w-7xl space-y-6 p-6 lg:p-10">
	<!-- Page Header Banner -->
	<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
		<div>
			<div class="mb-1 flex items-center gap-2">
				<span
					class="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700"
				>
					<Award class="h-3.5 w-3.5 text-indigo-600" />
					Awards &amp; Honors
				</span>
				<span class="font-mono text-xs text-slate-400">• {totalCount} Registered Records</span>
			</div>
			<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
				Awards, Honors &amp; Citations
			</h1>
			<p class="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500 sm:text-sm">
				Recognize municipal achievements by maintaining a public registry of the awards, honors, and
				citations bestowed upon the Municipality of Tanauan, Leyte and its departments.
			</p>
		</div>

		<!-- Action: Add Award -->
		<div class="flex items-center gap-3">
			<button
				type="button"
				onclick={openAdd}
				class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:scale-[1.01] hover:bg-indigo-700 active:scale-[0.99] sm:text-sm"
			>
				<Plus class="h-4 w-4" />
				<span>Add Award</span>
			</button>
		</div>
	</div>

	<!-- KPI Metric Chips -->
	<div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
		<div
			class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-indigo-200 sm:p-5"
		>
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold tracking-wider text-slate-500 uppercase"
					>Total Awards</span
				>
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600"
				>
					<Trophy class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black text-slate-900">{totalCount}</span>
				<span class="text-[11px] font-medium text-slate-400">on record</span>
			</div>
		</div>

		<div
			class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-emerald-200 sm:p-5"
		>
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold tracking-wider text-slate-500 uppercase"
					>Departments Involved</span
				>
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"
				>
					<Building2 class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black text-emerald-600">{departmentCount}</span>
				<span class="text-[11px] font-medium text-emerald-700">offices cited</span>
			</div>
		</div>

		<div
			class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-purple-200 sm:p-5"
		>
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold tracking-wider text-slate-500 uppercase"
					>Most Recent Year</span
				>
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600"
				>
					<CalendarDays class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black text-slate-900">{latestYear || '—'}</span>
				<span class="text-[11px] font-medium text-slate-400">latest entry</span>
			</div>
		</div>
	</div>

	<!-- Search Controls Card -->
	<div class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
		<div class="flex flex-col items-center gap-3 sm:flex-row">
			<div class="relative w-full flex-1">
				<div
					class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"
				>
					<Search class="h-4 w-4" />
				</div>
				<input
					type="text"
					placeholder="Search by award title, department, awarding body, or year…"
					bind:value={searchTerm}
					class="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-9 pl-10 text-xs text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
				/>
				{#if searchTerm}
					<button
						type="button"
						onclick={clearFilters}
						class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
						aria-label="Clear search"
					>
						<X class="h-3.5 w-3.5" />
					</button>
				{/if}
			</div>
		</div>
	</div>

	<!-- Main Awards Table Container -->
	<div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
		{#if loading}
			<div class="flex flex-col items-center justify-center p-16 text-center">
				<svg class="mb-3 h-8 w-8 animate-spin text-indigo-600" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<span class="text-xs font-medium text-slate-400">Loading award records…</span>
			</div>
		{:else if filteredRows.length === 0}
			<div class="flex flex-col items-center justify-center p-16 text-center">
				<div
					class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"
				>
					<Award class="h-6 w-6" />
				</div>
				<h3 class="text-sm font-bold text-slate-900">No awards found</h3>
				<p class="mt-1 max-w-sm text-xs text-slate-500">
					{#if searchTerm}
						Try adjusting your search query or clearing the filter to find what you're looking for.
					{:else}
						No award records yet. Click "+ Add Award" to register the first citation.
					{/if}
				</p>
				{#if searchTerm}
					<button
						type="button"
						onclick={clearFilters}
						class="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
					>
						Clear Filters
					</button>
				{/if}
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left text-xs">
					<thead
						class="border-b border-slate-200/80 bg-slate-50/90 text-[11px] font-bold tracking-wider text-slate-500 uppercase select-none"
					>
						<tr>
							<th class="px-6 py-3.5">Award</th>
							<th class="px-6 py-3.5">Department</th>
							<th class="px-6 py-3.5">Awarding Body</th>
							<th class="px-6 py-3.5">Year</th>
							<th class="px-6 py-3.5">Description</th>
							<th class="px-6 py-3.5 text-right">Actions</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-100 font-medium text-slate-700">
						{#each paginatedRows as r (r.id)}
							<tr class="group transition-colors hover:bg-slate-50/70">
								<!-- Award title + year chip -->
								<td class="px-6 py-4">
									<div class="flex flex-wrap items-center gap-2">
										<span
											class="font-bold text-slate-900 transition-colors group-hover:text-indigo-600"
										>
											{r.awards || 'Untitled Award'}
										</span>
										{#if r.year}
											<span
												class="inline-flex items-center gap-1 rounded-lg border border-indigo-100/60 bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700"
											>
												{r.year}
											</span>
										{/if}
									</div>
								</td>

								<!-- Department -->
								<td class="px-6 py-4">
									<span
										class="inline-flex items-center gap-1 rounded-lg border border-indigo-100/60 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700"
									>
										{r.department || 'General LGU'}
									</span>
								</td>

								<!-- Awarding Body -->
								<td class="px-6 py-4">
									<span
										class="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800"
									>
										<Trophy class="h-3 w-3 text-slate-400" />
										{r.awarding_body || '—'}
									</span>
								</td>

								<!-- Year -->
								<td class="px-6 py-4">
									<span
										class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700"
									>
										<CalendarDays class="h-3.5 w-3.5 text-slate-400" />
										{r.year || '—'}
									</span>
								</td>

								<!-- Description (line-clamped) -->
								<td class="px-6 py-4">
									{#if r.description}
										<p class="line-clamp-2 max-w-xs text-xs leading-relaxed text-slate-500">
											{r.description}
										</p>
									{:else}
										<span class="text-xs text-slate-400 italic">No description provided</span>
									{/if}
								</td>

								<!-- Actions -->
								<td class="px-6 py-4 text-right">
									<div class="inline-flex items-center justify-end gap-1.5">
										<button
											type="button"
											onclick={() => openEdit(r)}
											class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50/70 hover:text-indigo-700"
											title="Edit award"
										>
											<Pencil class="h-3.5 w-3.5" />
											<span>Edit</span>
										</button>
										<button
											type="button"
											onclick={() => removeRow(r.id)}
											class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
											title="Delete award"
										>
											<Trash2 class="h-3.5 w-3.5" />
											<span>Delete</span>
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- Table Pagination Footer -->
			<div
				class="flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 bg-slate-50/60 px-6 py-4 text-xs text-slate-500 sm:flex-row"
			>
				<div>
					Showing <span class="font-bold text-slate-900">{startEntry}</span> to
					<span class="font-bold text-slate-900">{endEntry}</span> of
					<span class="font-bold text-slate-900">{filteredRows.length}</span> awards
				</div>

				{#if totalPages > 1}
					<div class="flex items-center gap-1">
						<button
							type="button"
							onclick={() => goToPage(currentPage - 1)}
							disabled={currentPage === 1}
							class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
						>
							<ChevronLeft class="h-3.5 w-3.5" />
							<span>Prev</span>
						</button>

						<div class="px-2 font-mono font-medium text-slate-700">
							{currentPage} / {totalPages}
						</div>

						<button
							type="button"
							onclick={() => goToPage(currentPage + 1)}
							disabled={currentPage === totalPages}
							class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-700 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
						>
							<span>Next</span>
							<ChevronRight class="h-3.5 w-3.5" />
						</button>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<!-- Add / Edit Award Modal -->
<Modal bind:open={showModal} title={editing ? 'Edit Award' : 'New Award'} size="max-w-2xl">
	<div class="space-y-4 p-1">
		{#if error}
			<div
				class="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700"
			>
				<AlertCircle class="mt-0.5 h-4 w-4 shrink-0" />
				<span>{error}</span>
			</div>
		{/if}

		<!-- Award Title -->
		<div class="space-y-1">
			<label
				for="award-title"
				class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
			>
				Award Title <span class="text-rose-500">*</span>
			</label>
			<input
				id="award-title"
				bind:value={form.awards}
				placeholder="e.g. Most Outstanding Municipal LGU"
				required
				disabled={uploading}
				class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
			/>
		</div>

		<!-- Department & Awarding Body -->
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
			<div class="space-y-1">
				<label
					for="award-department"
					class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
				>
					Department <span class="text-rose-500">*</span>
				</label>
				<select
					id="award-department"
					bind:value={form.department}
					required
					disabled={uploading}
					class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
				>
					<option value="">-- Select Department --</option>
					{#each departments as dept}
						<option value={dept.name}>{dept.name}</option>
					{/each}
				</select>
			</div>

			<div class="space-y-1">
				<label
					for="award-body"
					class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
				>
					Awarding Body <span class="text-rose-500">*</span>
				</label>
				<input
					id="award-body"
					bind:value={form.awarding_body}
					placeholder="e.g. DILG, Province of Leyte, COA"
					required
					disabled={uploading}
					class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
				/>
			</div>
		</div>

		<!-- Year -->
		<div class="space-y-1">
			<label
				for="award-year"
				class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
			>
				Year <span class="text-rose-500">*</span>
			</label>
			<select
				id="award-year"
				bind:value={form.year}
				required
				disabled={uploading}
				class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
			>
				<option value="">Select Year</option>
				{#each yearOptions as year}
					<option value={year}>{year}</option>
				{/each}
			</select>
		</div>

		<!-- Description -->
		<div class="space-y-1">
			<label
				for="award-description"
				class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
			>
				Description
			</label>
			<textarea
				id="award-description"
				rows="4"
				bind:value={form.description}
				placeholder="Describe the citation, criteria, and significance of the award…"
				disabled={uploading}
				class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
			></textarea>
		</div>

		<!-- Media Upload -->
		<div class="space-y-1.5">
			<label
				for="award-media"
				class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
			>
				Media (Images / Videos)
			</label>
			<input
				id="award-media"
				type="file"
				multiple
				accept="image/*,video/*"
				onchange={handleMediaInput}
				disabled={uploading}
				class="block w-full cursor-pointer text-xs text-slate-500 file:mr-3 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 disabled:cursor-not-allowed"
			/>
			<p class="text-[11px] text-slate-400">
				Attach photos or video clips of the awarding ceremony. Multiple files are allowed.
			</p>

			{#if mediaPreview.length > 0}
				<div class="rounded-xl border border-slate-200 bg-slate-50 p-3">
					<p class="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
						Media files ({mediaPreview.length})
					</p>
					<div class="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
						{#each mediaPreview as media, idx}
							<div class="relative">
								{#if typeof media === 'string'}
									{#if isImageURL(media)}
										<img
											src={media}
											alt={mediaName(media)}
											class="h-20 w-20 rounded-lg object-cover ring-1 ring-slate-200"
										/>
									{:else if isVideoURL(media)}
										<video class="h-20 w-20 rounded-lg object-cover ring-1 ring-slate-200" controls>
											<track kind="captions" />
											<source src={media} />
										</video>
									{:else}
										<div
											class="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-200 text-slate-400"
										>
											<FileText class="h-6 w-6" />
										</div>
									{/if}
									<div
										class="mt-1 w-20 truncate text-center text-[10px] text-slate-500"
										title={mediaName(media)}
									>
										{mediaName(media)}
									</div>
								{:else}
									{#if media.type?.startsWith('video/')}
										<div
											class="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-200 text-slate-400"
										>
											<FileVideo class="h-6 w-6" />
										</div>
									{:else}
										<div
											class="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-200 text-slate-400"
										>
											<FileImage class="h-6 w-6" />
										</div>
									{/if}
									<div
										class="mt-1 w-20 truncate text-center text-[10px] text-slate-500"
										title={media.name}
									>
										{media.name}
									</div>
								{/if}

								<button
									type="button"
									class="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-white shadow hover:bg-rose-700 disabled:opacity-50"
									onclick={() => removeMediaItem(idx)}
									disabled={uploading}
									aria-label="Remove media file"
								>
									<X class="h-3 w-3" />
								</button>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<!-- Modal Action Buttons -->
		<div class="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4">
			<button
				type="button"
				onclick={() => (showModal = false)}
				disabled={uploading}
				class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
			>
				Cancel
			</button>
			<button
				type="button"
				onclick={save}
				disabled={uploading}
				class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:scale-[1.01] hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
			>
				{#if uploading}
					<svg class="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<span>Uploading...</span>
				{:else}
					<span>{editing ? 'Save Changes' : 'Add Award'}</span>
				{/if}
			</button>
		</div>
	</div>
</Modal>
