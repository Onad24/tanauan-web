<script>
	import Modal from '$lib/Modal.svelte';
	import { uploadUserPortrait, deleteSupabaseFile } from '$lib/firebaseStorage';
	import { positions, barangayData } from '$lib/config';
	import { toast } from '$lib/admin/toast';
	import { confirmAction } from '$lib/admin/confirm';
	import {
		Landmark,
		Users,
		UserPlus,
		UserCheck,
		MapPin,
		Briefcase,
		Search,
		X,
		Check,
		Plus,
		Pencil,
		Trash2,
		Camera,
		ChevronLeft,
		ChevronRight,
		AlertCircle
	} from 'lucide-svelte';

	let { data } = $props();

	let rows = $state([]);
	$effect(() => {
		rows = data.users || [];
	});

	let loading = $state(false);
	let showModal = $state(false);
	let editing = $state(null);
	let error = $state('');
	let uploading = $state(false);
	let portraitPreview = $state(null);
	let barangayOfficial = $state(false);

	let form = $state({
		name: '',
		role: '',
		barangay: '',
		active: true,
		portrait: '',
		achievements: []
	});

	// Search & client-side pagination
	let searchTerm = $state('');
	let currentPage = $state(1);
	const pageSize = 10;

	// Telemetry stats — officials records may miss fields, so every access is guarded
	let totalCount = $derived(rows.length);
	let activeCount = $derived(rows.filter((r) => r?.active !== false).length);
	let barangayCount = $derived(rows.filter((r) => !!r?.barangay?.trim()).length);

	// Null-safe search across the fields that actually exist on an official
	let filteredRows = $derived.by(() => {
		if (!searchTerm.trim()) return rows;
		const lower = searchTerm.toLowerCase();
		return rows.filter(
			(r) =>
				r?.name?.toLowerCase()?.includes(lower) ||
				r?.role?.toLowerCase()?.includes(lower) ||
				r?.barangay?.toLowerCase()?.includes(lower) ||
				(r?.active !== false ? 'active' : 'inactive').includes(lower) ||
				(Array.isArray(r?.achievements) &&
					r.achievements.some((a) =>
						String(a ?? '')
							.toLowerCase()
							.includes(lower)
					))
		);
	});

	let totalPages = $derived(Math.ceil(filteredRows.length / pageSize) || 1);
	let paginatedRows = $derived(
		filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	);
	let startEntry = $derived(filteredRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1);
	let endEntry = $derived(Math.min(currentPage * pageSize, filteredRows.length));

	// Reset to the first page whenever the query changes…
	$effect(() => {
		void searchTerm;
		currentPage = 1;
	});

	// …and clamp the page into range whenever the dataset shrinks
	$effect(() => {
		if (currentPage > totalPages) currentPage = totalPages;
	});

	function goToPage(page) {
		if (page < 1 || page > totalPages) return;
		currentPage = page;
	}

	function openAdd() {
		editing = null;
		form = {
			name: '',
			role: '',
			barangay: '',
			active: true,
			portrait: '',
			achievements: ['']
		};
		portraitPreview = null;
		barangayOfficial = false;
		error = '';
		showModal = true;
	}

	function openEdit(r) {
		editing = r;
		form = {
			name: r.name || '',
			role: r.role || '',
			barangay: r.barangay || '',
			active: r.active !== false,
			portrait: r.portrait || '',
			achievements: r.achievements && r.achievements.length > 0 ? [...r.achievements] : ['']
		};
		portraitPreview = r.portrait || null;
		barangayOfficial = !!r.barangay;
		error = '';
		showModal = true;
	}

	function handlePortraitInput(e) {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				portraitPreview = event.target?.result;
			};
			reader.readAsDataURL(file);
		}
	}

	function addAchievement() {
		form.achievements = [...form.achievements, ''];
	}

	function removeAchievement(index) {
		if (form.achievements.length === 1) return;
		form.achievements = form.achievements.filter((_, i) => i !== index);
	}

	async function removeRow(id) {
		const official = rows.find((r) => r.id === id);
		const ok = await confirmAction({
			title: 'Delete this official?',
			message:
				'The official, their portrait and listed achievements will be removed from the public directory. This cannot be undone.',
			details: official?.name || '',
			confirmText: 'Delete',
			danger: true
		});
		if (!ok) return;

		loading = true;
		try {
			if (official?.portrait) {
				try {
					await deleteSupabaseFile(official.portrait);
				} catch (e) {
					console.error(e);
				}
			}
			const response = await fetch('/admin/officials', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id })
			});
			if (!response.ok) {
				await toast.apiError(response, 'Could not delete this official');
				return;
			}
			rows = rows.filter((r) => r.id !== id);
			toast.success(`${official?.name || 'Official'} removed from the directory`);
		} catch (err) {
			toast.error(err.message || 'Could not delete this official');
		} finally {
			loading = false;
		}
	}

	async function save() {
		if (!form.name.trim()) {
			error = 'Official name is required.';
			toast.error('Official name is required');
			return;
		}

		loading = true;
		uploading = true;
		error = '';
		try {
			let portraitUrl = form.portrait;
			const portraitInput = document.querySelector('input[type="file"][name="portrait"]');
			if (portraitInput?.files?.[0]) {
				if (editing && editing.portrait) await deleteSupabaseFile(editing.portrait);
				portraitUrl = await uploadUserPortrait(portraitInput.files[0]);
			}

			const formData = {
				...form,
				barangay: barangayOfficial ? form.barangay : '',
				portrait: portraitUrl,
				achievements: form.achievements.filter((a) => String(a ?? '').trim() !== '')
			};

			if (editing) {
				const response = await fetch('/admin/officials', {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ id: editing.id, ...formData })
				});
				if (!response.ok) {
					error = 'Could not save this official.';
					await toast.apiError(response, 'Save failed');
					return;
				}
				const idx = rows.findIndex((r) => r.id === editing.id);
				if (idx >= 0) rows[idx] = { id: editing.id, ...formData };
			} else {
				const response = await fetch('/admin/officials', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formData)
				});
				if (!response.ok) {
					error = 'Could not save this official.';
					await toast.apiError(response, 'Save failed');
					return;
				}
				const newUser = await response.json();
				rows = [...rows, newUser];
			}

			const wasEditing = !!editing;
			showModal = false;
			portraitPreview = null;
			toast.success(wasEditing ? 'Official saved' : 'Official added to the directory');
		} catch (err) {
			error = err.message || 'Could not save this official';
			toast.error(err.message || 'Could not save this official');
		} finally {
			loading = false;
			uploading = false;
		}
	}

	// Deterministic aesthetic gradient avatars based on name
	const avatarGradients = [
		'from-indigo-600 to-violet-600',
		'from-blue-600 to-indigo-600',
		'from-emerald-600 to-teal-600',
		'from-violet-600 to-fuchsia-600',
		'from-rose-500 to-pink-600',
		'from-amber-500 to-orange-600',
		'from-sky-600 to-blue-700',
		'from-teal-600 to-cyan-700'
	];

	function getAvatarGradient(name = '') {
		let hash = 0;
		for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
		return avatarGradients[Math.abs(hash) % avatarGradients.length];
	}

	function getInitials(name = '') {
		if (!name) return '?';
		const parts = name.trim().split(/\s+/);
		if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	}
</script>

<svelte:head>
	<title>Municipal Officials | LGU Tanauan, Leyte</title>
</svelte:head>

<div class="mx-auto max-w-7xl space-y-6 p-6 lg:p-10">
	<!-- Page Header Banner -->
	<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
		<div>
			<div class="mb-1 flex items-center gap-2">
				<span
					class="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700"
				>
					<Landmark class="h-3.5 w-3.5 text-indigo-600" />
					Municipal Officials
				</span>
				<span class="font-mono text-xs text-slate-400">• {totalCount} Registered Records</span>
			</div>
			<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
				Elected &amp; Appointed Officials
			</h1>
			<p class="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500 sm:text-sm">
				Maintain the public officials directory — names, positions, barangay assignments, portraits
				and achievements rendered across the municipal website.
			</p>
		</div>

		<!-- Action: Add Official -->
		<div class="flex items-center gap-3">
			<button
				type="button"
				onclick={openAdd}
				class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:scale-[1.01] hover:bg-indigo-700 active:scale-[0.99] sm:text-sm"
			>
				<UserPlus class="h-4 w-4" />
				<span>+ Add Official</span>
			</button>
		</div>
	</div>

	<!-- Executive KPI Metric Cards -->
	<div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
		<!-- Total Officials -->
		<div
			class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-indigo-200 sm:p-5"
		>
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold tracking-wider text-slate-500 uppercase"
					>Total Officials</span
				>
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600"
				>
					<Users class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black text-slate-900">{totalCount}</span>
				<span class="text-[11px] font-medium text-slate-400">in directory</span>
			</div>
		</div>

		<!-- Active Officials -->
		<div
			class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-emerald-200 sm:p-5"
		>
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold tracking-wider text-slate-500 uppercase"
					>Active Officials</span
				>
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"
				>
					<UserCheck class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black text-emerald-600">{activeCount}</span>
				<span class="text-[11px] font-medium text-emerald-700">serving</span>
			</div>
		</div>

		<!-- Barangay Officials -->
		<div
			class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:border-violet-200 sm:p-5"
		>
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold tracking-wider text-slate-500 uppercase"
					>Barangay Officials</span
				>
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600"
				>
					<MapPin class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black text-slate-900">{barangayCount}</span>
				<span class="text-[11px] font-medium text-slate-400">per barangay</span>
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
					placeholder="Search by official name, position, or barangay…"
					bind:value={searchTerm}
					class="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-9 pl-10 text-xs text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none sm:text-sm"
				/>
				{#if searchTerm}
					<button
						type="button"
						onclick={() => (searchTerm = '')}
						class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
						aria-label="Clear search"
					>
						<X class="h-3.5 w-3.5" />
					</button>
				{/if}
			</div>
		</div>
	</div>

	<!-- Main Officials Table Container -->
	<div class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
		{#if loading}
			<div class="flex flex-col items-center justify-center p-16 text-center text-slate-400">
				<svg class="mb-3 h-8 w-8 animate-spin text-indigo-600" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				<span class="text-xs font-medium">Updating the officials directory…</span>
			</div>
		{:else if filteredRows.length === 0}
			<div class="flex flex-col items-center justify-center p-16 text-center">
				<div
					class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"
				>
					<Users class="h-6 w-6" />
				</div>
				<h3 class="text-sm font-bold text-slate-900">No officials found</h3>
				<p class="mt-1 max-w-sm text-xs text-slate-500">
					{#if searchTerm}
						Try adjusting your search query to find the official you are looking for.
					{:else}
						No official records are available. Click "+ Add Official" to create your first record.
					{/if}
				</p>
				{#if searchTerm}
					<button
						type="button"
						onclick={() => (searchTerm = '')}
						class="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
					>
						Clear Filters
					</button>
				{/if}
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left text-xs">
					<!-- Table Header -->
					<thead
						class="border-b border-slate-200/80 bg-slate-50/90 text-[11px] font-bold tracking-wider text-slate-500 uppercase select-none"
					>
						<tr>
							<th class="px-6 py-3.5">Official</th>
							<th class="px-6 py-3.5">Position / Role</th>
							<th class="px-6 py-3.5">Barangay</th>
							<th class="px-6 py-3.5">Status</th>
							<th class="px-6 py-3.5 text-right">Actions</th>
						</tr>
					</thead>

					<!-- Table Body -->
					<tbody class="divide-y divide-slate-100 font-medium text-slate-700">
						{#each paginatedRows as r}
							<tr class="group transition-colors hover:bg-slate-50/70">
								<!-- Column 1: Avatar + Name + Role -->
								<td class="px-6 py-4">
									<div class="flex items-center gap-3.5">
										{#if r.portrait}
											<img
												src={r.portrait}
												alt={r.name || 'Official'}
												class="h-10 w-10 shrink-0 rounded-xl object-cover shadow-sm ring-2 ring-slate-100"
											/>
										{:else}
											<div
												class={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${getAvatarGradient(r.name || r.id)} text-xs font-bold text-white shadow-sm ring-2 ring-white`}
											>
												{getInitials(r.name)}
											</div>
										{/if}

										<div class="min-w-0">
											<span
												class="block truncate font-bold text-slate-900 transition-colors group-hover:text-indigo-600"
											>
												{r.name || 'Unnamed Official'}
											</span>
											<span class="mt-0.5 block truncate text-[11px] font-medium text-slate-400">
												{r.role || 'Appointed Official'}
											</span>
										</div>
									</div>
								</td>

								<!-- Column 2: Position / Role -->
								<td class="px-6 py-4">
									<span
										class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200/70 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
									>
										<Briefcase class="h-3 w-3 text-slate-400" />
										{r.role || 'Unassigned'}
									</span>
								</td>

								<!-- Column 3: Barangay -->
								<td class="px-6 py-4">
									{#if r.barangay}
										<span
											class="inline-flex items-center gap-1 rounded-lg border border-indigo-100/60 bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700"
										>
											<MapPin class="h-3 w-3 text-indigo-500" />
											{r.barangay}
										</span>
									{:else}
										<span
											class="inline-flex items-center gap-1 rounded-lg border border-slate-200/70 bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700"
										>
											Municipal / LGU-wide
										</span>
									{/if}
								</td>

								<!-- Column 4: Status -->
								<td class="px-6 py-4">
									{#if r.active !== false}
										<span
											class="inline-flex items-center gap-1 rounded-lg border border-emerald-200/70 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"
										>
											<Check class="h-3 w-3" />
											Active
										</span>
									{:else}
										<span
											class="inline-flex items-center gap-1 rounded-lg border border-rose-200/70 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700"
										>
											<X class="h-3 w-3" />
											Inactive
										</span>
									{/if}
								</td>

								<!-- Column 5: Actions -->
								<td class="px-6 py-4 text-right">
									<div class="inline-flex items-center justify-end gap-1.5">
										<button
											type="button"
											onclick={() => openEdit(r)}
											class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50/70 hover:text-indigo-700"
											title="Edit official"
										>
											<Pencil class="h-3.5 w-3.5" />
											<span>Edit</span>
										</button>
										<button
											type="button"
											onclick={() => removeRow(r.id)}
											class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
											title="Delete official"
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
			{#if totalPages > 1}
				<div
					class="flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 bg-slate-50/60 px-6 py-4 text-xs text-slate-500 sm:flex-row"
				>
					<div>
						Showing <span class="font-bold text-slate-900">{startEntry}</span> to
						<span class="font-bold text-slate-900">{endEntry}</span>
						of <span class="font-bold text-slate-900">{filteredRows.length}</span> officials
					</div>

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
				</div>
			{/if}
		{/if}
	</div>
</div>

<!-- Add / Edit Official Modal -->
<Modal bind:open={showModal} title={editing ? 'Edit Official' : 'Add Official'} size="max-w-2xl">
	<div class="space-y-4 p-1">
		{#if error}
			<div
				class="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700"
			>
				<AlertCircle class="mt-0.5 h-4 w-4 shrink-0" />
				<span>{error}</span>
			</div>
		{/if}

		<!-- Full Name -->
		<div class="space-y-1">
			<label
				for="official-name"
				class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
			>
				Official Name <span class="text-rose-500">*</span>
			</label>
			<input
				id="official-name"
				type="text"
				bind:value={form.name}
				placeholder="e.g. Juan Dela Cruz"
				required
				disabled={uploading}
				class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
			/>
		</div>

		<!-- Position -->
		<div class="space-y-1">
			<label
				for="official-position"
				class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
			>
				Position <span class="text-rose-500">*</span>
			</label>
			<select
				id="official-position"
				bind:value={form.role}
				required
				disabled={uploading}
				class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
			>
				<option value="">-- Select Position --</option>
				{#each positions as role}
					<option value={role}>{role}</option>
				{/each}
			</select>
		</div>

		<!-- Barangay Official Toggle -->
		<div class="flex items-center gap-2">
			<input
				type="checkbox"
				id="barangay-official-checkbox"
				bind:checked={barangayOfficial}
				disabled={uploading}
				class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
			/>
			<label
				for="barangay-official-checkbox"
				class="cursor-pointer text-xs font-medium text-slate-700"
			>
				Is a Barangay Official?
			</label>
		</div>

		{#if barangayOfficial}
			<div class="space-y-1">
				<label
					for="official-barangay"
					class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
				>
					Barangay <span class="text-rose-500">*</span>
				</label>
				<select
					id="official-barangay"
					bind:value={form.barangay}
					required
					disabled={uploading}
					class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
				>
					<option value="">-- Select Barangay --</option>
					{#each Object.keys(barangayData) as brgy}
						<option value={brgy}>{brgy}</option>
					{/each}
				</select>
			</div>
		{/if}

		<!-- Portrait Photo -->
		<div class="space-y-1.5">
			<label
				for="official-portrait-upload"
				class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
			>
				Portrait Photo
			</label>
			<div class="flex items-center gap-4">
				{#if portraitPreview}
					<img
						src={portraitPreview}
						alt="Preview"
						class="h-16 w-16 rounded-xl object-cover shadow-sm ring-2 ring-indigo-500/20"
					/>
				{:else}
					<div
						class="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100 text-slate-400"
					>
						<Camera class="h-6 w-6" />
					</div>
				{/if}
				<div class="flex-1">
					<input
						id="official-portrait-upload"
						type="file"
						name="portrait"
						accept="image/*"
						onchange={handlePortraitInput}
						disabled={uploading}
						class="block w-full cursor-pointer text-xs text-slate-500 file:mr-3 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
					/>
					<p class="mt-1 text-[11px] text-slate-400">PNG, JPG, or WebP up to 5MB.</p>
				</div>
			</div>
		</div>

		<!-- Achievements Repeater -->
		<div class="space-y-1">
			<span class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
				>Achievements</span
			>
			<div class="space-y-2 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
				{#each form.achievements as achievement, index (index)}
					<div class="flex items-start gap-2">
						<input
							type="text"
							bind:value={form.achievements[index]}
							placeholder="Enter achievement…"
							disabled={uploading}
							class="w-full flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
						/>
						<button
							type="button"
							onclick={() => removeAchievement(index)}
							disabled={form.achievements.length === 1 || uploading}
							title="Remove achievement"
							class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
						>
							<Trash2 class="h-3.5 w-3.5" />
						</button>
					</div>
				{/each}

				<button
					type="button"
					onclick={addAchievement}
					disabled={uploading}
					class="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:border-indigo-400 hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
				>
					<Plus class="h-3.5 w-3.5" />
					<span>Add Achievement</span>
				</button>
			</div>
		</div>

		<!-- Active Status -->
		<div class="flex items-center gap-2 pt-1">
			<input
				type="checkbox"
				id="official-active-checkbox"
				bind:checked={form.active}
				disabled={uploading}
				class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
			/>
			<label
				for="official-active-checkbox"
				class="cursor-pointer text-xs font-medium text-slate-700"
			>
				Active — shown in the public officials directory
			</label>
		</div>

		<!-- Modal Action Buttons -->
		<div class="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4">
			<button
				type="button"
				onclick={() => (showModal = false)}
				class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:text-sm"
			>
				Cancel
			</button>
			<button
				type="button"
				onclick={save}
				disabled={loading || uploading}
				class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:bg-indigo-700 disabled:opacity-60 sm:text-sm"
			>
				{#if loading || uploading}
					<svg class="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<span>Saving...</span>
				{:else}
					<span>{editing ? 'Save Changes' : '+ Add Official'}</span>
				{/if}
			</button>
		</div>
	</div>
</Modal>
