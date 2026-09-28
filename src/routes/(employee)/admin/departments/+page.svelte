<script>
	import { invalidateAll } from '$app/navigation';
	import Modal from '$lib/Modal.svelte';
	import { toast } from '$lib/admin/toast';
	import { confirmAction } from '$lib/admin/confirm';
	import {
		Sprout,
		Plus,
		Pencil,
		Trash2,
		Building2,
		Layers,
		ListTree,
		AlertCircle
	} from 'lucide-svelte';

	let { data } = $props();

	let groups = $state(data.groups || []);
	let isSeeded = $state(data.isSeeded ?? true);
	let seeding = $state(false);
	let seedError = $state('');

	let selectedGroupIdx = $state(0);
	let selectedGroup = $derived(groups[selectedGroupIdx] ?? null);

	// Group edit modal state
	let showGroupModal = $state(false);
	let editingGroup = $state(null); // null = adding new
	let groupForm = $state({ group: '', order: 999 });

	// Office edit modal state
	let showOfficeModal = $state(false);
	let editingOfficeIdx = $state(null); // null = adding new
	let officeForm = $state({ name: '', href: '', visible: true });

	let saving = $state(false);
	let saveError = $state('');

	// ── Seed ──────────────────────────────────────────────────────────────────
	async function seedDefaults() {
		seeding = true;
		seedError = '';
		try {
			const res = await fetch('/admin/departments', { method: 'PATCH' });
			if (!res.ok) {
				let message = 'Failed to import the default structure';
				try {
					const json = await res.json();
					message = json.error || message;
				} catch {
					/* keep the fallback message */
				}
				seedError = message;
				toast.error(message);
				return;
			}
			toast.success('Default structure imported');
			window.location.reload();
		} catch (e) {
			seedError = e.message || 'Failed to import the default structure';
			toast.error(seedError);
		} finally {
			seeding = false;
		}
	}

	// ── Group CRUD ────────────────────────────────────────────────────────────
	function openAddGroup() {
		editingGroup = null;
		groupForm = { group: '', order: groups.length + 1 };
		saveError = '';
		showGroupModal = true;
	}

	function openEditGroup(g, idx) {
		editingGroup = g;
		groupForm = { group: g.group, order: g.order ?? idx + 1 };
		saveError = '';
		showGroupModal = true;
	}

	async function saveGroup() {
		if (!groupForm.group.trim()) {
			saveError = 'Group name is required.';
			toast.error('Group name is required');
			return;
		}
		saving = true;
		saveError = '';
		const wasEditing = !!editingGroup;
		try {
			if (editingGroup) {
				const res = await fetch('/admin/departments', {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ id: editingGroup.id, ...groupForm })
				});
				if (!res.ok) {
					saveError = 'Could not save this department group.';
					await toast.apiError(res, 'Save failed');
					return;
				}
				// Update locally
				const idx = groups.findIndex((g) => g.id === editingGroup.id);
				if (idx >= 0) groups[idx] = { ...groups[idx], ...groupForm };
			} else {
				const res = await fetch('/admin/departments', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ ...groupForm, offices: [] })
				});
				if (!res.ok) {
					saveError = 'Could not create this department group.';
					await toast.apiError(res, 'Create failed');
					return;
				}
				const created = await res.json();
				groups = [...groups, { ...created, offices: [] }];
			}
			showGroupModal = false;
			toast.success(wasEditing ? 'Department group updated' : 'Department group created');
		} catch (e) {
			saveError = e.message || 'Could not save the department group';
			toast.error(saveError);
		} finally {
			saving = false;
		}
	}

	async function deleteGroup(g) {
		if (!g.id || g.id.startsWith('default-')) {
			toast.error('Please seed the data first before managing groups.');
			return;
		}
		const ok = await confirmAction({
			title: 'Delete this department group?',
			message:
				'The group and every office inside it will be removed from the public navbar. This cannot be undone.',
			details: g.group || '',
			confirmText: 'Delete',
			danger: true
		});
		if (!ok) return;
		try {
			const res = await fetch('/admin/departments', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: g.id })
			});
			if (!res.ok) {
				await toast.apiError(res, 'Could not delete the group');
				return;
			}
			groups = groups.filter((x) => x.id !== g.id);
			if (selectedGroupIdx >= groups.length) selectedGroupIdx = Math.max(0, groups.length - 1);
			toast.success(`"${g.group}" deleted`);
		} catch (e) {
			toast.error(e.message || 'Could not delete the group');
		}
	}

	// ── Office CRUD ───────────────────────────────────────────────────────────
	function openAddOffice() {
		editingOfficeIdx = null;
		officeForm = { name: '', href: '/Departments/', visible: true };
		saveError = '';
		showOfficeModal = true;
	}

	function openEditOffice(office, idx) {
		editingOfficeIdx = idx;
		officeForm = { ...office };
		saveError = '';
		showOfficeModal = true;
	}

	async function saveOffice() {
		if (!selectedGroup) return;
		if (!officeForm.name.trim()) {
			saveError = 'Office name is required.';
			toast.error('Office name is required');
			return;
		}
		saving = true;
		saveError = '';
		const wasEditing = editingOfficeIdx !== null;
		try {
			const offices = [...(selectedGroup.offices || [])];
			if (editingOfficeIdx !== null) {
				offices[editingOfficeIdx] = { ...officeForm };
			} else {
				offices.push({ ...officeForm });
			}

			const res = await fetch('/admin/departments', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: selectedGroup.id, offices })
			});
			if (!res.ok) {
				saveError = 'Could not save this office.';
				await toast.apiError(res, 'Save failed');
				return;
			}

			// Update locally
			groups[selectedGroupIdx] = { ...groups[selectedGroupIdx], offices };
			groups = [...groups];
			showOfficeModal = false;
			toast.success(wasEditing ? 'Office updated' : 'Office added to the navbar');
		} catch (e) {
			saveError = e.message || 'Could not save the office';
			toast.error(saveError);
		} finally {
			saving = false;
		}
	}

	async function deleteOffice(idx) {
		if (!selectedGroup) return;
		const offices = [...(selectedGroup.offices || [])];
		const removed = offices[idx];
		offices.splice(idx, 1);
		const ok = await confirmAction({
			title: 'Remove this office?',
			message: "The office will be removed from this group's public navbar submenu.",
			details: removed?.name || '',
			confirmText: 'Remove',
			danger: true
		});
		if (!ok) return;
		try {
			const res = await fetch('/admin/departments', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: selectedGroup.id, offices })
			});
			if (!res.ok) {
				await toast.apiError(res, 'Could not delete the office');
				return;
			}
			groups[selectedGroupIdx] = { ...groups[selectedGroupIdx], offices };
			groups = [...groups];
			toast.success(`"${removed?.name || 'Office'}" removed`);
		} catch (e) {
			toast.error(e.message || 'Could not delete the office');
		}
	}

	async function toggleOfficeVisibility(idx) {
		if (!selectedGroup) return;
		const offices = [...(selectedGroup.offices || [])];
		if (!offices[idx]) return;
		offices[idx] = { ...offices[idx], visible: !offices[idx].visible };
		try {
			const res = await fetch('/admin/departments', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: selectedGroup.id, offices })
			});
			if (!res.ok) {
				await toast.apiError(res, 'Could not update office visibility');
				return;
			}
			groups[selectedGroupIdx] = { ...groups[selectedGroupIdx], offices };
			groups = [...groups];
			toast.success(
				offices[idx].visible
					? `"${offices[idx].name}" shows in the navbar`
					: `"${offices[idx].name}" hidden from the navbar`
			);
		} catch (e) {
			toast.error(e.message || 'Could not update office visibility');
		}
	}

	function selectGroup(idx) {
		selectedGroupIdx = idx;
	}

	function handleGroupRowKeydown(event, idx) {
		// Only the row itself reacts — nested edit/delete buttons keep their native keys
		if (event.target !== event.currentTarget) return;
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			selectedGroupIdx = idx;
		}
	}
</script>

<svelte:head>
	<title>Departments &amp; Offices | LGU Tanauan, Leyte</title>
</svelte:head>

<div class="mx-auto max-w-7xl space-y-6 p-6 lg:p-10">
	<!-- Page Header Banner -->
	<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
		<div>
			<div class="mb-1 flex items-center gap-2">
				<span
					class="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700"
				>
					<Layers class="h-3.5 w-3.5 text-indigo-600" />
					Navigation Structure
				</span>
				<span class="font-mono text-xs text-slate-400">• {groups.length} Groups</span>
			</div>
			<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
				Departments &amp; Offices
			</h1>
			<p class="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500 sm:text-sm">
				These department groups drive the public navbar: each group becomes a top-level menu item
				and its offices fill the submenu shown to citizens.
			</p>
		</div>

		<!-- Actions: Seed + New Group -->
		<div class="flex flex-wrap items-center gap-3">
			{#if !isSeeded && groups.some((g) => g._isDefault)}
				<button
					type="button"
					onclick={seedDefaults}
					disabled={seeding}
					class="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
				>
					<Sprout class="h-4 w-4" />
					<span>{seeding ? 'Importing…' : 'Import Default Structure'}</span>
				</button>
			{/if}

			<button
				type="button"
				onclick={openAddGroup}
				class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:scale-[1.01] hover:bg-indigo-700 active:scale-[0.99] sm:text-sm"
			>
				<Plus class="h-4 w-4" />
				<span>+ New Group</span>
			</button>
		</div>
	</div>

	{#if data.error}
		<div
			role="alert"
			class="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5"
		>
			<div
				class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600"
			>
				<AlertCircle class="h-5 w-5" />
			</div>
			<div class="min-w-0 flex-1">
				<p class="text-sm font-bold text-rose-800">Couldn't refresh this page's data</p>
				<p class="mt-0.5 text-xs leading-relaxed text-rose-700/80">
					{data.error} — what you see may be incomplete or out of date. Retry to reload it.
				</p>
			</div>
			<button
				type="button"
				onclick={() => invalidateAll()}
				class="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 focus:ring-2 focus:ring-rose-500/40 focus:outline-none"
			>
				Retry
			</button>
		</div>
	{/if}

	<!-- Seed error banner -->
	{#if seedError}
		<div
			class="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700"
		>
			<AlertCircle class="mt-0.5 h-4 w-4 shrink-0" />
			<span>{seedError}</span>
		</div>
	{/if}

	<!-- Unseeded default-structure notice -->
	{#if !isSeeded && groups.some((g) => g._isDefault)}
		<div
			class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900"
		>
			⚠️ You are viewing the <strong>default</strong> department structure. Click
			<strong>Import Default Structure</strong> to save it to the database so you can edit it.
		</div>
	{/if}

	<!-- Split layout: groups on the left, offices on the right -->
	<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_1fr]">
		<!-- Left: Group list -->
		<aside class="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
			<div class="flex items-center justify-between border-b border-slate-100 px-4 py-3">
				<span class="text-[11px] font-bold tracking-wider text-slate-500 uppercase"
					>Department Groups</span
				>
				<span class="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600"
					>{groups.length}</span
				>
			</div>

			<ul class="space-y-1 p-3">
				{#each groups as g, i}
					<li>
						<div
							role="button"
							tabindex="0"
							aria-pressed={selectedGroupIdx === i}
							onclick={() => selectGroup(i)}
							onkeydown={(event) => handleGroupRowKeydown(event, i)}
							class={`group flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-left transition-colors ${
								selectedGroupIdx === i
									? 'bg-indigo-50 text-indigo-700'
									: 'text-slate-700 hover:bg-slate-50'
							}`}
						>
							<div class="min-w-0 flex-1">
								<span class="block truncate text-sm font-semibold">{g.group}</span>
								<span class="block text-[11px] text-slate-400"
									>{g.offices?.length ?? 0} offices</span
								>
							</div>

							<div
								class="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100 focus:opacity-100"
							>
								<button
									type="button"
									onclick={(event) => {
										event.stopPropagation();
										openEditGroup(g, i);
									}}
									title="Edit group name"
									class="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
								>
									<Pencil class="h-3.5 w-3.5" />
								</button>
								<button
									type="button"
									onclick={(event) => {
										event.stopPropagation();
										deleteGroup(g);
									}}
									title="Delete group"
									class="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
								>
									<Trash2 class="h-3.5 w-3.5" />
								</button>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</aside>

		<!-- Right: Office list for selected group -->
		<main class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
			{#if selectedGroup}
				<div
					class="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between"
				>
					<div class="min-w-0">
						<h2 class="truncate text-base font-bold text-slate-900 sm:text-lg">
							{selectedGroup.group}
						</h2>
						<p class="mt-0.5 text-xs text-slate-500">
							Offices visible in the public navbar submenu
						</p>
					</div>
					<button
						type="button"
						onclick={openAddOffice}
						class="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:scale-[1.01] hover:bg-indigo-700 active:scale-[0.99] sm:text-sm"
					>
						<Plus class="h-4 w-4" />
						<span>+ Add Office</span>
					</button>
				</div>

				{#if !selectedGroup.offices || selectedGroup.offices.length === 0}
					<div class="flex flex-col items-center justify-center p-16 text-center text-slate-400">
						<div
							class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"
						>
							<Building2 class="h-6 w-6" />
						</div>
						<h3 class="text-sm font-bold text-slate-900">No offices yet. Add your first one.</h3>
						<p class="mt-1 max-w-sm text-xs text-slate-500">
							Offices added here appear inside this group's dropdown on the public navbar.
						</p>
					</div>
				{:else}
					<div class="mt-4 overflow-x-auto">
						<div class="min-w-[640px]">
							<!-- Office table header -->
							<div
								class="grid grid-cols-[1fr_1.5fr_100px_90px] gap-4 rounded-lg bg-slate-50 px-4 py-2.5 text-[11px] font-bold tracking-wider text-slate-500 uppercase"
							>
								<span>Office Name</span>
								<span>URL Path</span>
								<span>Visible</span>
								<span class="text-right">Actions</span>
							</div>

							<!-- Office rows -->
							{#each selectedGroup.offices as office, idx}
								<div
									class="grid grid-cols-[1fr_1.5fr_100px_90px] items-center gap-4 border-b border-slate-100 px-4 py-3 transition-colors hover:bg-slate-50/70"
								>
									<span class="truncate text-sm font-semibold text-slate-900">{office.name}</span>

									<code
										class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] break-all text-slate-600"
										>{office.href}</code
									>

									<!-- Visibility toggle switch -->
									<button
										type="button"
										role="switch"
										aria-checked={office.visible}
										aria-label={office.visible ? 'Hide from navigation' : 'Show in navigation'}
										title={office.visible ? 'Hide from nav' : 'Show in nav'}
										onclick={() => toggleOfficeVisibility(idx)}
										class="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors"
										class:bg-emerald-500={office.visible}
										class:bg-slate-300={!office.visible}
									>
										<span
											class="ml-1 inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition-transform"
											class:translate-x-6={office.visible}
										></span>
									</button>

									<div class="flex items-center justify-end gap-1.5">
										<button
											type="button"
											onclick={() => openEditOffice(office, idx)}
											title="Edit office"
											class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
										>
											<Pencil class="h-3.5 w-3.5" />
										</button>
										<button
											type="button"
											onclick={() => deleteOffice(idx)}
											title="Remove office"
											class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
										>
											<Trash2 class="h-3.5 w-3.5" />
										</button>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			{:else}
				<div class="flex flex-col items-center justify-center p-16 text-center text-slate-400">
					<div
						class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"
					>
						<ListTree class="h-6 w-6" />
					</div>
					<h3 class="text-sm font-bold text-slate-900">Select a department group on the left.</h3>
					<p class="mt-1 max-w-sm text-xs text-slate-500">
						Choose a group to manage the offices shown in its public navbar submenu.
					</p>
				</div>
			{/if}
		</main>
	</div>
</div>

<!-- Group Modal -->
<Modal
	bind:open={showGroupModal}
	title={editingGroup ? 'Edit Department Group' : 'New Department Group'}
>
	<div class="space-y-4 p-1">
		{#if saveError}
			<div
				class="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700"
			>
				<AlertCircle class="mt-0.5 h-4 w-4 shrink-0" />
				<span>{saveError}</span>
			</div>
		{/if}

		<div class="space-y-1">
			<label
				for="group-name"
				class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
			>
				Group Name <span class="text-rose-500">*</span>
			</label>
			<input
				id="group-name"
				type="text"
				bind:value={groupForm.group}
				placeholder="e.g. Office of the Mayor"
				disabled={saving}
				class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
			/>
		</div>

		<div class="space-y-1">
			<label
				for="group-order"
				class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
			>
				Display Order
			</label>
			<input
				id="group-order"
				type="number"
				min="1"
				bind:value={groupForm.order}
				disabled={saving}
				class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
			/>
			<p class="text-[11px] text-slate-400">Lower numbers appear first in the public navbar.</p>
		</div>

		<div class="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4">
			<button
				type="button"
				onclick={() => (showGroupModal = false)}
				class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:text-sm"
			>
				Cancel
			</button>
			<button
				type="button"
				onclick={saveGroup}
				disabled={saving}
				class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:bg-indigo-700 disabled:opacity-60 sm:text-sm"
			>
				{#if saving}
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
					<span>Save</span>
				{/if}
			</button>
		</div>
	</div>
</Modal>

<!-- Office Modal -->
<Modal bind:open={showOfficeModal} title={editingOfficeIdx !== null ? 'Edit Office' : 'Add Office'}>
	<div class="space-y-4 p-1">
		{#if saveError}
			<div
				class="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700"
			>
				<AlertCircle class="mt-0.5 h-4 w-4 shrink-0" />
				<span>{saveError}</span>
			</div>
		{/if}

		<div class="space-y-1">
			<label
				for="office-name"
				class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
			>
				Office Name <span class="text-rose-500">*</span>
			</label>
			<input
				id="office-name"
				type="text"
				bind:value={officeForm.name}
				placeholder="e.g. Mayors-Office"
				disabled={saving}
				class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
			/>
		</div>

		<div class="space-y-1">
			<label
				for="office-href"
				class="block text-xs font-bold tracking-wider text-slate-700 uppercase"
			>
				URL Path <span class="text-rose-500">*</span>
			</label>
			<input
				id="office-href"
				type="text"
				bind:value={officeForm.href}
				placeholder="/Departments/Mayors-Office"
				disabled={saving}
				class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
			/>
		</div>

		<div class="flex items-center gap-2">
			<input
				type="checkbox"
				id="office-visible-checkbox"
				bind:checked={officeForm.visible}
				disabled={saving}
				class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
			/>
			<label
				for="office-visible-checkbox"
				class="cursor-pointer text-xs font-medium text-slate-700"
			>
				Show in navigation
			</label>
		</div>

		<div class="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4">
			<button
				type="button"
				onclick={() => (showOfficeModal = false)}
				class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:text-sm"
			>
				Cancel
			</button>
			<button
				type="button"
				onclick={saveOffice}
				disabled={saving}
				class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:bg-indigo-700 disabled:opacity-60 sm:text-sm"
			>
				{#if saving}
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
					<span>Save</span>
				{/if}
			</button>
		</div>
	</div>
</Modal>
