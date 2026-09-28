<script>
	import Modal from '$lib/Modal.svelte';
	import { uploadUserPortrait, deleteSupabaseFile } from '$lib/firebaseStorage';
	import { positions, departments, barangayData } from '$lib/config';

	let { data } = $props();
	let rows = $state(data.users);
	let loading = $state(false);
	let showModal = $state(false);
	let editing = $state(null);
	let error = $state('');
	let uploading = $state(false);
	let portraitPreview = $state(null);
	let selectedBarangay = $state('');
	let barangayOfficial = $state(false);
	let deptRoles = $state([]);

	let form = $state({
		name: '',
		role: '',
		barangay: '',
		active: true,
		portrait: '',
		achievements: []
	});

	// Pagination & search
	let searchTerm = $state('');
	let currentPage = $state(1);
	const pageSize = 10;

	let filteredRows = $state([]);
	// Computed filtered & paginated rows
	$effect(() => {
		if (searchTerm.trim() === '') {
			filteredRows = rows;
		} else {
			const lowerSearch = searchTerm.toLowerCase();
			filteredRows = rows.filter(
				(r) =>
					r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
					r.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
					r.department.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (searchTerm || searchTerm == '') currentPage = 1;
	});

	let totalPages = $state(0);
	$effect(() => {
		totalPages = filteredRows.length > 0 ? Math.ceil(filteredRows.length / pageSize) : 0;
	});
	let paginatedRows = $state([]);
	$effect(() => {
		paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
	});

	function goToPage(page) {
		if (page < 1 || page > totalPages) return;
		currentPage = page;
	}

	function getOfficesForDepartment(dept) {
		return officesByDepartment[dept] || [];
	}

	function handleDepartmentChange(dept) {
		selectedBarangay = dept;
		form.department = dept;
		form.office = '';
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
		selectedBarangay = '';
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
		selectedBarangay = r.barangay || '';
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

	async function removeRow(id) {
		if (!confirm('Delete this official?')) return;
		loading = true;
		try {
			const user = rows.find((r) => r.id === id);
			if (user && user.portrait) {
				try {
					await deleteSupabaseFile(user.portrait);
				} catch (e) {
					console.error(e);
				}
			}
			const response = await fetch('/admin/officials', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id })
			});
			if (!response.ok) throw new Error('Failed to delete user');
			rows = rows.filter((r) => r.id !== id);
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	async function save() {
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
				portrait: portraitUrl,
				achievements: form.achievements.filter((a) => a.trim() !== '')
			};

			if (editing) {
				const response = await fetch('/admin/officials', {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ id: editing.id, ...formData })
				});
				if (!response.ok) throw new Error('Failed to update user');
				const idx = rows.findIndex((r) => r.id === editing.id);
				if (idx >= 0) rows[idx] = { id: editing.id, ...formData };
			} else {
				const response = await fetch('/admin/officials', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(formData)
				});
				if (!response.ok) throw new Error('Failed to create user');
				const newUser = await response.json();
				rows = [...rows, newUser];
			}
			showModal = false;
			portraitPreview = null;
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
			uploading = false;
		}
	}
</script>

<div class="panel">
	<div class="panel-head">
		<h3>Users</h3>
		<div style="display:flex; gap:8px;">
			<input type="text" placeholder="Search..." bind:value={searchTerm} class="search-input" />
			<button class="btn" onclick={openAdd}>Add Official</button>
		</div>
	</div>

	{#if loading}
		<div>Loading...</div>
	{:else}
		<table class="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Role</th>
					<th>Barangay</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each paginatedRows as r}
					<tr>
						<td>{r.name}</td>
						<td>{r.role}</td>
						<td>{r.barangay}</td>
						<td class="actions">
							<button class="btn-small" onclick={() => openEdit(r)}>Edit</button>
							<button class="btn-danger" onclick={() => removeRow(r.id)}>Delete</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		{#if totalPages > 1}
			<div class="pagination">
				<button
					class="btn-small"
					onclick={() => goToPage(currentPage - 1)}
					disabled={currentPage === 1}>Prev</button
				>
				<span>Page {currentPage} of {totalPages}</span>
				<button
					class="btn-small"
					onclick={() => goToPage(currentPage + 1)}
					disabled={currentPage === totalPages}>Next</button
				>
			</div>
		{/if}
	{/if}
</div>

<Modal bind:open={showModal} title={editing ? 'Edit Official' : 'Add Official'}>
	<div class="form-row">
		{#if error}<div class="error-message">{error}</div>{/if}
		<label>Name <input type="text" bind:value={form.name} required /></label>
		<label
			>Position
			<select bind:value={form.role} required>
				<option value="">-- Select Position --</option>
				{#each positions as role}<option value={role}>{role}</option>{/each}
			</select>
		</label>

		<label
			>Is a Barangay Official?
			<input type="checkbox" class="border" bind:checked={barangayOfficial} />
		</label>

		{#if barangayOfficial}
			<label
				>Barangay
				<select
					value={form.department}
					onchange={(e) => handleDepartmentChange(e.target.value)}
					required
				>
					<option value="">-- Select Barangay --</option>
					{#each Object.keys(barangayData) as dept}<option value={dept}>{dept}</option>{/each}
				</select>
			</label>
		{/if}
		<label>
			Portrait Photo
			<input
				type="file"
				name="portrait"
				accept="image/*"
				onchange={handlePortraitInput}
				disabled={uploading}
			/>
			{#if portraitPreview}
				<div style="margin-top:0.5rem;">
					<img
						src={portraitPreview}
						alt="portrait preview"
						style="width:100px;height:100px;object-fit:cover;border-radius:4px;"
					/>
				</div>
			{/if}
		</label>

		<fieldset
			style="border: 1px solid #e6eef8; padding: 0.6rem; border-radius: 6px; margin: 0.4rem 0;"
		>
			<legend style="padding: 0 0.4rem; font-weight: 600; font-size: 0.95rem;">Achievements</legend>
			<div style="display: flex; flex-direction: column; gap: 0.4rem;">
				{#each form.achievements as achievement, index (index)}
					<div style="display: flex; gap: 0.4rem; align-items: flex-start;">
						<input
							type="text"
							bind:value={form.achievements[index]}
							placeholder="Enter achievement..."
							disabled={uploading}
							style="flex: 1;"
						/>
						<button
							type="button"
							class="btn-danger"
							onclick={() => {
								form.achievements = form.achievements.filter((_, i) => i !== index);
							}}
							disabled={form.achievements.length === 1}
							style="padding: 0.45rem 0.6rem; white-space: nowrap;"
							title="Remove achievement"
						>
							✕
						</button>
					</div>
				{/each}
				<button
					type="button"
					class="btn-add-achievement"
					onclick={() => {
						form.achievements = [...form.achievements, ''];
					}}
					disabled={uploading}
					style="margin-top: 0.4rem;"
				>
					+ Add Achievement
				</button>
			</div>
		</fieldset>
		<label><input type="checkbox" bind:checked={form.active} disabled={uploading} /> Active</label>

		<div style="display:flex;gap:8px;margin-top:0.6rem;">
			<button class="btn" onclick={save}>{editing ? 'Save' : 'Add'}</button>
			<button class="btn-muted" onclick={() => (showModal = false)}>Cancel</button>
		</div>
	</div>
</Modal>

<style>
	/* Keep previous styles */
	.panel {
		background: white;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 8px 24px rgba(2, 6, 23, 0.04);
	}
	.panel-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.8rem;
	}
	.btn {
		background: #0f172a;
		color: white;
		padding: 0.45rem 0.6rem;
		border-radius: 6px;
		border: none;
	}
	.btn-small {
		padding: 0.25rem 0.45rem;
		border-radius: 6px;
	}
	.btn-danger {
		background: #ef4444;
		color: white;
		border: none;
		padding: 0.25rem 0.5rem;
		border-radius: 6px;
	}
	.table {
		width: 100%;
		border-collapse: collapse;
	}
	th,
	td {
		padding: 0.6rem 0.5rem;
		text-align: left;
		border-bottom: 1px solid #eef2f7;
	}
	.actions {
		display: flex;
		gap: 6px;
	}
	.form-row label {
		display: block;
		margin-bottom: 0.4rem;
	}
	input[type='text'],
	input[type='file'],
	select {
		width: 100%;
		padding: 0.45rem;
		border-radius: 6px;
		border: 1px solid #e6eef8;
		font-family: inherit;
	}
	.btn-muted {
		background: #eef2f6;
		border: none;
		padding: 0.45rem;
		border-radius: 6px;
	}
	.search-input {
		padding: 0.45rem;
		border-radius: 6px;
		border: 1px solid #e6eef8;
	}
	.pagination {
		margin-top: 0.8rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}
	.error-message {
		background: #fee2e2;
		color: #b91c1c;
		border: 1px solid #fca5a5;
		padding: 0.5rem;
		border-radius: 6px;
		margin-bottom: 0.5rem;
	}
	.btn-add-achievement {
		background: #10b981;
		color: white;
		border: none;
		padding: 0.45rem 0.6rem;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 500;
	}
	.btn-add-achievement:hover:not(:disabled) {
		background: #059669;
	}
	.btn-add-achievement:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
