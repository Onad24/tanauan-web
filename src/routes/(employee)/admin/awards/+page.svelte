<script>
	import { uploadMultipleFiles } from '$lib/firebaseStorage';
	import { departments, postTypes } from '$lib/config';
	import Modal from '$lib/Modal.svelte';
	import { State } from 'framer/events/recognizer/GestureRecognizer.js';

	let { data } = $props();
	let rows = $state(data.posts);
	let loading = $state(false);
	let showModal = $state(false);
	let editing = $state(null);
	let uploading = $state(false);
	let uploadError = $state('');

	// 🔍 Search + Pagination
	let search = $state('');
	let currentPage = $state(1);
	let pageSize = 10;

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
	let filteredRows = $state([]);

	// 🔄 Filtered rows
	$effect(() => {
		if (search.trim() === '') {
			filteredRows = rows;
		} else {
			const lowerSearch = search.toLowerCase();
			filteredRows = rows.filter(
				(r) =>
					r.awards.toLowerCase().includes(lowerSearch) ||
					r.department.toLowerCase().includes(lowerSearch) ||
					r.awarding_body.toLowerCase().includes(lowerSearch) ||
					(r.description && r.description.toLowerCase().includes(lowerSearch)) ||
					(r.year && r.year.toString().includes(lowerSearch))
			);
		}

		if (search || search == '') currentPage = 1;
	});

	let totalPages = $state(0);
	$effect(() => {
		totalPages = filteredRows.length > 0 ? Math.ceil(filteredRows.length / pageSize) : 0;
	});
	let paginatedRows = $state([]);
	$effect(() => {
		paginatedRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
	});

	function openAdd() {
		editing = null;
		form = { awards: '', awarding_body: '', department: '', description: '', media: [], year: '' };
		selectedFiles = [];
		mediaPreview = [];
		uploadError = '';
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
		uploadError = '';
		showModal = true;
	}

	function handleMediaInput(e) {
		selectedFiles = Array.from(e.target.files);
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
		if (!confirm('Delete this post?')) return;
		loading = true;
		try {
			const post = rows.find((r) => r.id === id);
			const response = await fetch('/admin/awards', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id, media: post?.media || [] })
			});
			if (!response.ok) throw new Error('Failed to delete post');
			rows = rows.filter((r) => r.id !== id);
		} catch (err) {
			uploadError = err.message;
		} finally {
			loading = false;
		}
	}

	async function save() {
		uploadError = '';
		uploading = true;
		try {
			let uploadedURLs = [];
			if (selectedFiles.length > 0) {
				try {
					uploadedURLs = await uploadMultipleFiles(selectedFiles);
				} catch (error) {
					uploadError = `Upload failed: ${error.message}. Check Storage rules in Firebase Console.`;
					uploading = false;
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
				if (!response.ok) throw new Error('Failed to update post');

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
				if (!response.ok) throw new Error('Failed to create post');
				const newPost = await response.json();
				rows = [...rows, newPost];
			}
			showModal = false;
		} catch (error) {
			console.error('Error saving post:', error);
			uploadError = 'Error saving post: ' + error.message;
		} finally {
			uploading = false;
		}
	}
</script>

<div class="panel">
	<div class="panel-head">
		<h3>Awards</h3>

		<div class="flex items-center gap-2">
			<input type="text" class="search-box" placeholder="Search awards..." bind:value={search} />

			<button class="btn" onclick={openAdd}>Add Award</button>
		</div>
	</div>

	{#if loading}
		<div>Loading...</div>
	{:else}
		<table class="table">
			<thead>
				<tr>
					<th>Award</th>
					<th>Department</th>
					<th>Awarding Body</th>
					<th>Year</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each paginatedRows as r}
					<tr>
						<td>{r.awards}</td>
						<td>{r.department}</td>
						<td>{r.awarding_body}</td>
						<td>{r.year}</td>
						<td class="actions">
							<button class="btn-small" onclick={() => openEdit(r)}>Edit</button>
							<button class="btn-danger" onclick={() => removeRow(r.id)}>Delete</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<!-- PAGINATION -->
		<div class="pagination">
			<button
				class="pg-btn"
				onclick={() => (currentPage = Math.max(1, currentPage - 1))}
				disabled={currentPage === 1}
			>
				Prev
			</button>

			<span>Page {currentPage} of {totalPages}</span>

			<button
				class="pg-btn"
				onclick={() => (currentPage = Math.min(totalPages, currentPage + 1))}
				disabled={currentPage === totalPages}
			>
				Next
			</button>
		</div>
	{/if}
</div>

<!-- MODAL (UNCHANGED) -->
<Modal bind:open={showModal} title={editing ? 'Edit Post' : 'Add Post'}>
	<div class="form-row">
		{#if uploadError}
			<div class="error-message">{uploadError}</div>
		{/if}
		<label
			>Award
			<input bind:value={form.awards} placeholder="Award" required disabled={uploading} />
		</label>

		<label
			>Department
			<select bind:value={form.department} required disabled={uploading}>
				<option value="">-- Select Department --</option>
				{#each departments as dept}
					<option value={dept.name}>{dept.name}</option>
				{/each}
			</select>
		</label>

		<label
			>Awarding Body
			<input
				bind:value={form.awarding_body}
				placeholder="Awarding Body"
				required
				disabled={uploading}
			/>
		</label>

		<label
			>Description
			<textarea
				rows="6"
				bind:value={form.description}
				placeholder="Post content"
				disabled={uploading}
			></textarea>
		</label>

		<label
			>Year
			<select bind:value={form.year} required disabled={uploading}>
				<option value="">Select Year</option>
				{#each Array.from({ length: new Date().getFullYear() - 1946 + 1 }, (_, i) => new Date().getFullYear() - i) as year}
					<option value={year}>{year}</option>
				{/each}
			</select>
		</label>

		<label>
			Media (Images/Videos)
			<input
				type="file"
				multiple
				accept="image/*,video/*"
				onchange={handleMediaInput}
				disabled={uploading}
			/>

			{#if mediaPreview.length > 0}
				<div class="media-list">
					<p>Media files ({mediaPreview.length}):</p>
					<div class="media-grid">
						{#each mediaPreview as media, idx}
							<div class="media-item">
								{#if typeof media === 'string'}
									{#if media.includes('firebasestorage')}
										{#if /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(media)}
											<img src={media} alt="preview" class="media-thumb" />
										{:else if /\.(mp4|webm|ogg)$/i.test(media)}
											<video class="media-thumb" controls>
												<track kind="captions" />
												<source src={media} />
											</video>
										{:else}
											<div class="media-placeholder">📎</div>
										{/if}
									{/if}
									<div class="media-name">{media.split('/').pop().split('?')[0]}</div>
								{:else}
									<div class="media-placeholder">📁</div>
									<div class="media-name">{media.name}</div>
								{/if}

								<button
									type="button"
									class="media-remove"
									onclick={() => removeMediaItem(idx)}
									disabled={uploading}>✕</button
								>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</label>

		<div style="display:flex;gap:8px;margin-top:0.6rem;">
			<button class="btn" onclick={save} disabled={uploading}>
				{uploading ? 'Uploading...' : editing ? 'Save' : 'Add'}
			</button>
			<button class="btn-muted" onclick={() => (showModal = false)} disabled={uploading}
				>Cancel</button
			>
		</div>
	</div>
</Modal>

<style>
	/* Existing styles kept */
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
		cursor: pointer;
	}
	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.btn-small {
		padding: 0.25rem 0.45rem;
		border-radius: 6px;
		cursor: pointer;
	}
	.btn-danger {
		background: #ef4444;
		color: white;
		border: none;
		padding: 0.25rem 0.5rem;
		border-radius: 6px;
		cursor: pointer;
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
		margin-bottom: 0.6rem;
		font-weight: 500;
	}
	.error-message {
		background: #fee2e2;
		color: #b91c1c;
		border: 1px solid #fca5a5;
		padding: 0.75rem;
		border-radius: 6px;
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}
	input,
	textarea,
	select {
		width: 100%;
		padding: 0.45rem;
		border-radius: 6px;
		border: 1px solid #e6eef8;
		font-family: inherit;
	}
	input:disabled,
	textarea:disabled,
	select:disabled {
		background: #f6f8fb;
		cursor: not-allowed;
		opacity: 0.7;
	}
	textarea {
		resize: vertical;
	}
	.btn-muted {
		background: #eef2f6;
		border: none;
		padding: 0.45rem;
		border-radius: 6px;
		cursor: pointer;
	}
	.btn-muted:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.media-list {
		margin-top: 0.6rem;
		padding: 0.75rem;
		background: #f6f8fb;
		border-radius: 6px;
	}
	.media-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
		gap: 0.5rem;
		margin-top: 0.5rem;
	}
	.media-item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5rem;
		background: white;
		border-radius: 4px;
		border: 1px solid #e6eef8;
		cursor: pointer;
	}
	.media-thumb {
		width: 60px;
		height: 60px;
		object-fit: cover;
		border-radius: 4px;
	}
	.media-placeholder {
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #eef2f6;
		border-radius: 4px;
		font-size: 1.5rem;
	}
	.media-name {
		font-size: 0.75rem;
		text-align: center;
		margin-top: 0.3rem;
		word-break: break-word;
		max-width: 80px;
		color: #64748b;
	}
	.media-remove {
		position: absolute;
		top: -8px;
		right: -8px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: #ef4444;
		color: white;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		padding: 0;
	}
	.media-remove:disabled {
		opacity: 0.5;
		cursor: not-allowed;
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
</style>
