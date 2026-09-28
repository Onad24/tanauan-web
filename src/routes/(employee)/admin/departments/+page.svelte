<script>
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
		seeding = true; seedError = '';
		try {
			const res = await fetch('/admin/departments', { method: 'PATCH' });
			const json = await res.json();
			if (!res.ok) throw new Error(json.error || 'Failed to seed');
			// Reload
			window.location.reload();
		} catch (e) {
			seedError = e.message;
		} finally {
			seeding = false;
		}
	}

	// ── Group CRUD ────────────────────────────────────────────────────────────
	function openAddGroup() {
		editingGroup = null;
		groupForm = { group: '', order: groups.length + 1 };
		showGroupModal = true;
	}

	function openEditGroup(g, idx) {
		editingGroup = g;
		groupForm = { group: g.group, order: g.order ?? idx + 1 };
		showGroupModal = true;
	}

	async function saveGroup() {
		if (!groupForm.group.trim()) return;
		saving = true; saveError = '';
		try {
			if (editingGroup) {
				const res = await fetch('/admin/departments', {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ id: editingGroup.id, ...groupForm })
				});
				if (!res.ok) throw new Error('Save failed');
				// Update locally
				const idx = groups.findIndex(g => g.id === editingGroup.id);
				if (idx >= 0) groups[idx] = { ...groups[idx], ...groupForm };
			} else {
				const res = await fetch('/admin/departments', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ ...groupForm, offices: [] })
				});
				if (!res.ok) throw new Error('Create failed');
				const created = await res.json();
				groups = [...groups, { ...created, offices: [] }];
			}
			showGroupModal = false;
		} catch (e) {
			saveError = e.message;
		} finally {
			saving = false;
		}
	}

	async function deleteGroup(g) {
		if (!g.id || g.id.startsWith('default-')) {
			alert('Please seed the data first before managing groups.');
			return;
		}
		if (!confirm(`Delete department group "${g.group}"?`)) return;
		try {
			await fetch('/admin/departments', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: g.id })
			});
			groups = groups.filter(x => x.id !== g.id);
			if (selectedGroupIdx >= groups.length) selectedGroupIdx = Math.max(0, groups.length - 1);
		} catch (e) {
			alert('Delete failed: ' + e.message);
		}
	}

	// ── Office CRUD ───────────────────────────────────────────────────────────
	function openAddOffice() {
		editingOfficeIdx = null;
		officeForm = { name: '', href: '/Departments/', visible: true };
		showOfficeModal = true;
	}

	function openEditOffice(office, idx) {
		editingOfficeIdx = idx;
		officeForm = { ...office };
		showOfficeModal = true;
	}

	async function saveOffice() {
		if (!officeForm.name.trim()) return;
		saving = true; saveError = '';
		try {
			const offices = [...(selectedGroup?.offices || [])];
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
			if (!res.ok) throw new Error('Save failed');

			// Update locally
			groups[selectedGroupIdx] = { ...groups[selectedGroupIdx], offices };
			groups = [...groups];
			showOfficeModal = false;
		} catch (e) {
			saveError = e.message;
		} finally {
			saving = false;
		}
	}

	async function deleteOffice(idx) {
		if (!confirm(`Remove this office?`)) return;
		const offices = [...(selectedGroup?.offices || [])];
		offices.splice(idx, 1);
		try {
			await fetch('/admin/departments', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: selectedGroup.id, offices })
			});
			groups[selectedGroupIdx] = { ...groups[selectedGroupIdx], offices };
			groups = [...groups];
		} catch (e) {
			alert('Delete failed: ' + e.message);
		}
	}

	async function toggleOfficeVisibility(idx) {
		const offices = [...(selectedGroup?.offices || [])];
		offices[idx] = { ...offices[idx], visible: !offices[idx].visible };
		await fetch('/admin/departments', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: selectedGroup.id, offices })
		});
		groups[selectedGroupIdx] = { ...groups[selectedGroupIdx], offices };
		groups = [...groups];
	}
</script>

<div class="dpt-page">
	<div class="dpt-header">
		<div>
			<h1 class="dpt-title">Departments &amp; Offices</h1>
			<p class="dpt-subtitle">Manage the department groups and their offices shown in the navigation.</p>
		</div>
		<div class="dpt-header-actions">
			{#if !isSeeded && groups.some(g => g._isDefault)}
				<button class="btn-seed" on:click={seedDefaults} disabled={seeding}>
					{seeding ? 'Seeding…' : '🌱 Import Default Structure'}
				</button>
			{/if}
			<button class="btn-primary" on:click={openAddGroup}>+ New Group</button>
		</div>
	</div>

	{#if seedError}<div class="alert-error">{seedError}</div>{/if}
	{#if !isSeeded && groups.some(g => g._isDefault)}
		<div class="dpt-seed-notice">
			⚠️ You are viewing the <strong>default</strong> department structure. Click <strong>Import Default Structure</strong> to save it to the database so you can edit it.
		</div>
	{/if}

	<div class="dpt-split">
		<!-- Left: Group list -->
		<aside class="dpt-groups">
			<div class="dpt-groups-header">
				<span class="dpt-section-label">Department Groups</span>
				<span class="dpt-count">{groups.length}</span>
			</div>
			<ul class="dpt-group-list">
				{#each groups as g, i}
					<li
						class="dpt-group-item"
						class:dpt-group-active={selectedGroupIdx === i}
						on:click={() => selectedGroupIdx = i}
						role="button"
						tabindex="0"
					>
						<div class="dpt-group-item-content">
							<span class="dpt-group-name">{g.group}</span>
							<span class="dpt-group-count">{g.offices?.length ?? 0} offices</span>
						</div>
						<div class="dpt-group-actions">
							<button class="dpt-icon-btn" on:click|stopPropagation={() => openEditGroup(g, i)} title="Edit group name">
								<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
							</button>
							<button class="dpt-icon-btn dpt-icon-danger" on:click|stopPropagation={() => deleteGroup(g)} title="Delete group">
								<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
							</button>
						</div>
					</li>
				{/each}
			</ul>
		</aside>

		<!-- Right: Office list for selected group -->
		<main class="dpt-offices">
			{#if selectedGroup}
				<div class="dpt-offices-header">
					<div>
						<h2 class="dpt-offices-title">{selectedGroup.group}</h2>
						<p class="dpt-offices-sub">Offices visible in the navbar submenu</p>
					</div>
					<button class="btn-primary" on:click={openAddOffice}>+ Add Office</button>
				</div>

				{#if selectedGroup.offices?.length === 0}
					<div class="dpt-offices-empty">
						<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
						<p>No offices yet. Add your first one.</p>
					</div>
				{:else}
					<div class="dpt-office-table">
						<div class="dpt-table-head">
							<span>Office Name</span>
							<span>URL Path</span>
							<span>Visible</span>
							<span></span>
						</div>
						{#each selectedGroup.offices as office, idx}
							<div class="dpt-table-row">
								<span class="dpt-office-name">{office.name}</span>
								<span class="dpt-office-href">
									<code>{office.href}</code>
								</span>
								<button
									class="dpt-toggle"
									class:dpt-toggle-on={office.visible}
									on:click={() => toggleOfficeVisibility(idx)}
									title={office.visible ? 'Hide from nav' : 'Show in nav'}
								>
									<span class="dpt-toggle-knob"></span>
								</button>
								<div class="dpt-office-actions">
									<button class="dpt-icon-btn" on:click={() => openEditOffice(office, idx)} title="Edit">
										<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
									</button>
									<button class="dpt-icon-btn dpt-icon-danger" on:click={() => deleteOffice(idx)} title="Remove">
										<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>
									</button>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			{:else}
				<div class="dpt-offices-empty">Select a group on the left.</div>
			{/if}
		</main>
	</div>
</div>

<!-- Group Modal -->
{#if showGroupModal}
	<div class="modal-backdrop" on:click={() => showGroupModal = false} role="presentation"></div>
	<div class="modal-box" role="dialog" aria-label="Group Editor">
		<div class="modal-header">
			<h3>{editingGroup ? 'Edit Department Group' : 'New Department Group'}</h3>
			<button class="modal-close" on:click={() => showGroupModal = false}>✕</button>
		</div>
		<div class="modal-body">
			<label class="form-label">Group Name</label>
			<input class="form-input" type="text" bind:value={groupForm.group} placeholder="e.g. Office of the Mayor" />
			<label class="form-label mt-3">Display Order</label>
			<input class="form-input" type="number" bind:value={groupForm.order} min="1" />
			{#if saveError}<p class="form-error">{saveError}</p>{/if}
		</div>
		<div class="modal-footer">
			<button class="btn-ghost" on:click={() => showGroupModal = false}>Cancel</button>
			<button class="btn-primary" on:click={saveGroup} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
		</div>
	</div>
{/if}

<!-- Office Modal -->
{#if showOfficeModal}
	<div class="modal-backdrop" on:click={() => showOfficeModal = false} role="presentation"></div>
	<div class="modal-box" role="dialog" aria-label="Office Editor">
		<div class="modal-header">
			<h3>{editingOfficeIdx !== null ? 'Edit Office' : 'Add Office'}</h3>
			<button class="modal-close" on:click={() => showOfficeModal = false}>✕</button>
		</div>
		<div class="modal-body">
			<label class="form-label">Office Name</label>
			<input class="form-input" type="text" bind:value={officeForm.name} placeholder="e.g. Mayors-Office" />
			<label class="form-label mt-3">URL Path</label>
			<input class="form-input" type="text" bind:value={officeForm.href} placeholder="/Departments/Mayors-Office" />
			<label class="form-label mt-3 flex items-center gap-2">
				<input type="checkbox" bind:checked={officeForm.visible} />
				Show in navigation
			</label>
			{#if saveError}<p class="form-error">{saveError}</p>{/if}
		</div>
		<div class="modal-footer">
			<button class="btn-ghost" on:click={() => showOfficeModal = false}>Cancel</button>
			<button class="btn-primary" on:click={saveOffice} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
		</div>
	</div>
{/if}

<style>
.dpt-page { padding: 2rem; max-width: 1200px; margin: 0 auto; }
.dpt-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
.dpt-title { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin: 0; }
.dpt-subtitle { font-size: .875rem; color: #64748b; margin: 4px 0 0; }
.dpt-header-actions { display: flex; gap: .75rem; align-items: center; }
.dpt-seed-notice { background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: .75rem 1rem; font-size: .875rem; color: #92400e; margin-bottom: 1rem; }
.alert-error { background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: .75rem 1rem; font-size: .875rem; color: #dc2626; margin-bottom: 1rem; }

/* ── Split layout ── */
.dpt-split { display: grid; grid-template-columns: 300px 1fr; gap: 1.5rem; min-height: 600px; }
@media (max-width: 700px) { .dpt-split { grid-template-columns: 1fr; } }

/* ── Group list ── */
.dpt-groups { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; }
.dpt-groups-header { display: flex; align-items: center; justify-content: space-between; padding: .85rem 1rem; border-bottom: 1px solid #f1f5f9; }
.dpt-section-label { font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #64748b; }
.dpt-count { background: #f1f5f9; color: #475569; font-size: .75rem; font-weight: 700; padding: 2px 8px; border-radius: 20px; }
.dpt-group-list { margin: 0; padding: .5rem; list-style: none; }
.dpt-group-item { display: flex; align-items: center; justify-content: space-between; padding: .7rem .75rem; border-radius: 10px; cursor: pointer; transition: background .18s; gap: .5rem; }
.dpt-group-item:hover { background: #f8fafc; }
.dpt-group-active { background: #eff6ff; }
.dpt-group-item-content { flex: 1; min-width: 0; }
.dpt-group-name { font-size: .875rem; font-weight: 600; color: #0f172a; display: block; }
.dpt-group-count { font-size: .75rem; color: #94a3b8; }
.dpt-group-actions { display: flex; gap: 4px; opacity: 0; transition: opacity .18s; }
.dpt-group-item:hover .dpt-group-actions { opacity: 1; }
.dpt-icon-btn { width: 26px; height: 26px; border: none; background: #f1f5f9; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #475569; transition: background .15s, color .15s; }
.dpt-icon-btn:hover { background: #e2e8f0; }
.dpt-icon-danger:hover { background: #fee2e2; color: #dc2626; }

/* ── Office table ── */
.dpt-offices { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; }
.dpt-offices-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
.dpt-offices-title { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 0; }
.dpt-offices-sub { font-size: .8rem; color: #94a3b8; margin: 3px 0 0; }
.dpt-offices-empty { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 3rem 1rem; color: #94a3b8; text-align: center; flex: 1; }
.dpt-table-head { display: grid; grid-template-columns: 1fr 1.5fr 80px 70px; gap: 1rem; padding: .5rem 1rem; background: #f8fafc; border-radius: 8px; font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #64748b; }
.dpt-table-row { display: grid; grid-template-columns: 1fr 1.5fr 80px 70px; gap: 1rem; padding: .75rem 1rem; border-bottom: 1px solid #f1f5f9; align-items: center; transition: background .15s; }
.dpt-table-row:hover { background: #fafafa; }
.dpt-office-name { font-size: .9rem; font-weight: 600; color: #0f172a; }
.dpt-office-href code { font-size: .78rem; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #475569; word-break: break-all; }
.dpt-office-actions { display: flex; gap: 4px; }

/* Toggle */
.dpt-toggle { width: 38px; height: 22px; border-radius: 11px; background: #e2e8f0; border: none; padding: 2px; cursor: pointer; position: relative; transition: background .2s; }
.dpt-toggle-on { background: #22c55e; }
.dpt-toggle-knob { display: block; width: 18px; height: 18px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.2); position: absolute; top: 2px; left: 2px; transition: left .2s; }
.dpt-toggle-on .dpt-toggle-knob { left: 18px; }

/* Buttons */
.btn-primary { padding: .55rem 1.1rem; background: #1d4ed8; color: #fff; font-weight: 600; border: none; border-radius: 10px; cursor: pointer; font-size: .875rem; transition: background .2s; white-space: nowrap; }
.btn-primary:hover:not(:disabled) { background: #1e40af; }
.btn-seed { padding: .55rem 1.1rem; background: #f0fdf4; color: #15803d; font-weight: 600; border: 1.5px solid #bbf7d0; border-radius: 10px; cursor: pointer; font-size: .875rem; transition: background .2s; }
.btn-seed:hover:not(:disabled) { background: #dcfce7; }

/* Modals */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 800; backdrop-filter: blur(2px); }
.modal-box { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 801; background: #fff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,.2); width: min(460px, 90vw); display: flex; flex-direction: column; }
.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.4rem; border-bottom: 1px solid #f1f5f9; }
.modal-header h3 { font-size: 1rem; font-weight: 700; margin: 0; color: #0f172a; }
.modal-close { background: none; border: none; font-size: 1.1rem; cursor: pointer; color: #94a3b8; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 6px; }
.modal-close:hover { background: #f1f5f9; }
.modal-body { padding: 1.25rem 1.4rem; display: flex; flex-direction: column; gap: .5rem; }
.modal-footer { padding: 1rem 1.4rem; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end; gap: .75rem; }
.form-label { font-size: .8rem; font-weight: 700; letter-spacing: .04em; color: #475569; text-transform: uppercase; }
.form-input { padding: .6rem .85rem; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: .9rem; outline: none; color: #0f172a; transition: border-color .2s; width: 100%; }
.form-input:focus { border-color: #3b82f6; }
.form-error { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; border-radius: 8px; padding: .5rem .75rem; font-size: .85rem; }
.btn-ghost { padding: .55rem 1rem; background: transparent; color: #64748b; font-weight: 600; border: 1.5px solid #e2e8f0; border-radius: 10px; cursor: pointer; font-size: .875rem; }
.mt-3 { margin-top: .75rem; }
</style>
