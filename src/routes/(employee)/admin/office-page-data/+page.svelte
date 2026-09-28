<script>
	import { invalidateAll } from '$app/navigation';
	import { getDeptDefaults, DIR_TO_KEY, slugify } from '$lib/deptDefaults';
	import { toast } from '$lib/admin/toast';
	import { confirmAction } from '$lib/admin/confirm';
	import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-svelte';

	let { data } = $props();

	const { deptList, existing, isSuperAdmin, authDepartment } = data;

	// Determine which departments this user can edit
	const editableDepts = isSuperAdmin ? deptList : deptList.filter((d) => d === authDepartment);

	let selectedDept = $state(editableDepts[0] ?? '');
	let saving = $state(false);
	let saveError = $state('');
	let saveSuccess = $state(false);
	let deleting = $state(false);
	// Set by buildForm() when a stored list field cannot be read — surfaced as a
	// persistent banner so nobody's saved data is replaced without warning.
	let loadWarnings = $state([]);

	// Form state — synced from existing data or pre-filled from department defaults
	let form = $state(buildForm(selectedDept));

	function getPublicUrl(dept) {
		if (!dept) return '/Departments';
		if (DIR_TO_KEY[dept]) return `/Departments/${encodeURIComponent(dept)}`;
		for (const [dir, key] of Object.entries(DIR_TO_KEY)) {
			if (slugify(dir) === slugify(dept) || slugify(key) === slugify(dept)) {
				return `/Departments/${encodeURIComponent(dir)}`;
			}
		}
		return `/Departments/${encodeURIComponent(dept.replace(/\s+/g, '-'))}`;
	}

	function buildForm(dept) {
		const ex = existing[dept] ?? {};
		const def = getDeptDefaults(dept) ?? {};

		// Stats & mandates are edited as structured lists, never as raw JSON.
		const stats = readRows(ex.stats, def.stats?.length ? def.stats : defaultStats(), normalizeStat);
		const mandates = readRows(
			ex.mandates,
			def.mandates?.length ? def.mandates : defaultMandates(),
			normalizeMandate
		);
		const warnings = [];
		if (stats.warning) {
			warnings.push('Saved Stats data could not be read — saving will replace it.');
		}
		if (mandates.warning) {
			warnings.push('Saved Mandates data could not be read — saving will replace it.');
		}
		loadWarnings = warnings;

		return {
			officeName: ex.officeName ?? def.officeName ?? '',
			officeCode: ex.officeCode ?? def.officeCode ?? '',
			category: ex.category ?? def.category ?? '',
			municipality: ex.municipality ?? def.municipality ?? 'Municipality of Tanauan, Leyte',
			citizensCharterUrl: ex.citizensCharterUrl ?? def.citizensCharterUrl ?? '',
			tagline: ex.tagline ?? def.tagline ?? '',
			typewriterWords: (ex.typewriterWords?.length
				? ex.typewriterWords
				: (def.typewriterWords ?? [''])
			).join('\n'),
			headName: ex.head?.name ?? def.head?.name ?? '',
			headTitle: ex.head?.title ?? def.head?.title ?? '',
			headTerm: ex.head?.term ?? def.head?.term ?? 'Department Head',
			headQuote: ex.head?.quote ?? def.head?.quote ?? '',
			headCredentials: (ex.head?.credentials?.length
				? ex.head.credentials
				: (def.head?.credentials ?? [''])
			).join('\n'),
			headRoom: ex.head?.room ?? def.head?.room ?? '',
			headSchedule: ex.head?.schedule ?? def.head?.schedule ?? 'Monday – Friday: 8:00 AM – 5:00 PM',
			stats: stats.rows,
			mandates: mandates.rows,
			scheduleHours:
				ex.schedule?.hours ??
				def.schedule?.hours ??
				'Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)',
			scheduleLocation:
				ex.schedule?.location ??
				def.schedule?.location ??
				'Tanauan Municipal Hall, Real St., Tanauan, Leyte',
			scheduleContact: ex.schedule?.contactNumber ?? def.schedule?.contactNumber ?? '',
			scheduleEmail: ex.schedule?.email ?? def.schedule?.email ?? '',
			scheduleHelpline: ex.schedule?.helpline ?? def.schedule?.helpline ?? ''
		};
	}

	$effect(() => {
		form = buildForm(selectedDept);
		saveError = '';
		saveSuccess = false;
	});

	function hasData(dept) {
		return !!existing[dept];
	}

	function parseLines(str) {
		return str
			.split('\n')
			.map((s) => s.trim())
			.filter(Boolean);
	}

	/* ── Structured list fields (Stats & Mandates) ──────────────────────────── */

	/** Deep-copies plain JSON so editing never mutates the shared DEPT_DEFAULTS objects. */
	function cloneRows(rows) {
		return JSON.parse(JSON.stringify(rows));
	}

	/** Default seed: four empty stat cards (kept from the original editor). */
	function defaultStats() {
		return [
			{ value: '', suffix: '', label: '', description: '' },
			{ value: '', suffix: '', label: '', description: '' },
			{ value: '', suffix: '', label: '', description: '' },
			{ value: '', suffix: '', label: '', description: '' }
		];
	}

	/** Default seed: one empty mandate with three blank detail lines. */
	function defaultMandates() {
		return [{ code: '', title: '', description: '', tag: '', details: ['', '', ''] }];
	}

	function normalizeStat(s) {
		return {
			value: String(s?.value ?? ''),
			suffix: String(s?.suffix ?? ''),
			label: String(s?.label ?? ''),
			description: String(s?.description ?? '')
		};
	}

	/** `index` is never typed by the user — it is derived from row order on save. */
	function normalizeMandate(m) {
		return {
			code: String(m?.code ?? ''),
			title: String(m?.title ?? ''),
			description: String(m?.description ?? ''),
			tag: String(m?.tag ?? ''),
			details: Array.isArray(m?.details) ? m.details.map((d) => String(d ?? '')) : ['', '', '']
		};
	}

	/**
	 * Reads a list field out of the saved document. Values are normally arrays, but a
	 * legacy/broken document may hold a JSON string — try to read it, and if that fails
	 * fall back to the defaults *and* raise a warning so the user is told before saving
	 * replaces the old value (never a silent wipe).
	 */
	function readRows(raw, fallback, normalize) {
		const wrap = (rows) => ({ rows: cloneRows(rows).map(normalize), warning: '' });
		if (raw == null) return wrap(fallback); // nothing saved yet — seed silently
		if (Array.isArray(raw)) return wrap(raw.length ? raw : fallback);
		if (typeof raw === 'string') {
			if (!raw.trim()) return wrap(fallback);
			try {
				const parsed = JSON.parse(raw);
				if (Array.isArray(parsed)) return wrap(parsed.length ? parsed : fallback);
			} catch {
				// unreadable — reported below
			}
		}
		return { rows: cloneRows(fallback).map(normalize), warning: 'unreadable' };
	}

	function addStat() {
		form.stats.push({ value: '', suffix: '', label: '', description: '' });
	}

	function removeStat(index) {
		form.stats.splice(index, 1);
	}

	function moveStat(index, direction) {
		moveRow(form.stats, index, direction);
	}

	function addMandate() {
		form.mandates.push({ code: '', title: '', description: '', tag: '', details: ['', '', ''] });
	}

	function removeMandate(index) {
		form.mandates.splice(index, 1);
	}

	function moveMandate(index, direction) {
		moveRow(form.mandates, index, direction);
	}

	function addDetail(mandateIndex) {
		form.mandates[mandateIndex].details.push('');
	}

	function removeDetail(mandateIndex, detailIndex) {
		form.mandates[mandateIndex].details.splice(detailIndex, 1);
	}

	function moveRow(list, index, direction) {
		const target = index + direction;
		if (target < 0 || target >= list.length) return;
		const [row] = list.splice(index, 1);
		list.splice(target, 0, row);
	}

	/** How many cards the public page will actually render (it skips blank rows). */
	function shownStatCount(rows) {
		return rows.filter(
			(s) => String(s.value ?? '').trim() !== '' && String(s.label ?? '').trim() !== ''
		).length;
	}

	function shownMandateCount(rows) {
		return rows.filter(
			(m) => String(m.title ?? '').trim() !== '' || String(m.description ?? '').trim() !== ''
		).length;
	}

	function cardCount(shown, total) {
		const noun = total === 1 ? 'card' : 'cards';
		return shown === total
			? `${total} ${noun} will be shown`
			: `${shown} of ${total} ${noun} will be shown`;
	}

	async function save() {
		saving = true;
		saveError = '';
		saveSuccess = false;

		// Stats & mandates are edited as lists already — send them as arrays (server contract
		// is unchanged). `index` is derived from card order so users never type it.
		const stats = form.stats.map(normalizeStat);
		const mandates = form.mandates.map((mandate, i) => ({
			index: String(i + 1).padStart(2, '0'),
			...normalizeMandate(mandate)
		}));

		const payload = {
			department: selectedDept,
			officeName: form.officeName,
			officeCode: form.officeCode,
			category: form.category,
			municipality: form.municipality,
			citizensCharterUrl: form.citizensCharterUrl,
			tagline: form.tagline,
			typewriterWords: parseLines(form.typewriterWords),
			head: {
				name: form.headName,
				title: form.headTitle,
				term: form.headTerm,
				quote: form.headQuote,
				credentials: parseLines(form.headCredentials),
				room: form.headRoom,
				schedule: form.headSchedule
			},
			stats,
			mandates,
			schedule: {
				hours: form.scheduleHours,
				location: form.scheduleLocation,
				contactNumber: form.scheduleContact,
				email: form.scheduleEmail,
				helpline: form.scheduleHelpline
			}
		};

		try {
			const res = await fetch('/admin/office-page-data', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});
			const json = await res.json();
			if (!res.ok) throw new Error(json.error || 'Save failed');
			// Update local existing cache
			existing[selectedDept] = { ...payload, id: json.id };
			saveSuccess = true;
			// The overwrite the load warning warned about has now happened — retire it.
			loadWarnings = [];
			toast.success('Office page content saved — changes are now live');
			await invalidateAll();
			setTimeout(() => (saveSuccess = false), 3000);
		} catch (e) {
			saveError = e.message;
			toast.error(e.message || 'Could not save the office page content');
		} finally {
			saving = false;
		}
	}

	async function deleteData() {
		const ok = await confirmAction({
			title: `Delete office page data for "${selectedDept}"?`,
			message:
				'The public page will fall back to the default department content. This cannot be undone.',
			confirmText: 'Delete Data',
			danger: true
		});
		if (!ok) return;

		deleting = true;
		try {
			const res = await fetch('/admin/office-page-data', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ department: selectedDept })
			});
			if (!res.ok) throw new Error('Delete failed');
			delete existing[selectedDept];
			form = buildForm(selectedDept);
			toast.success(`Office page data for "${selectedDept}" deleted`);
		} catch (e) {
			saveError = e.message;
			toast.error(e.message || 'Could not delete the office page data');
		} finally {
			deleting = false;
		}
	}
</script>

<svelte:head>
	<title>Office Page Content | LGU Tanauan, Leyte</title>
</svelte:head>

<div class="opd-page">
	<div class="opd-header">
		<div>
			<h1 class="opd-title">Office Page Content</h1>
			<p class="opd-subtitle">
				Manage the dynamic content displayed on each department's public office page.
			</p>
		</div>
		<a href="/admin" class="btn-ghost">← Back to Admin</a>
	</div>

	<div class="opd-layout">
		<!-- Sidebar: Department picker -->
		<aside class="opd-sidebar">
			<div class="opd-sidebar-header">
				<span class="label-sm">SELECT DEPARTMENT</span>
				<span class="count-badge">{editableDepts.length}</span>
			</div>
			<ul class="dept-list">
				{#each editableDepts as dept}
					<li>
						<button
							class="dept-btn"
							class:dept-btn-active={selectedDept === dept}
							onclick={() => (selectedDept = dept)}
						>
							<span class="dept-name">{dept}</span>
							{#if hasData(dept)}
								<span class="status-dot status-dot-saved" title="Has saved data"></span>
							{:else}
								<span class="status-dot status-dot-empty" title="No data yet"></span>
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		</aside>

		<!-- Main form area -->
		<main class="opd-main">
			{#if !selectedDept}
				<div class="opd-empty">Select a department on the left to begin.</div>
			{:else}
				<div class="form-topbar">
					<div>
						<h2 class="form-dept-title">{selectedDept}</h2>
						{#if hasData(selectedDept)}
							<span class="status-saved">✓ Data saved — currently showing on public page</span>
						{:else}
							<span class="status-empty">No data yet — page uses fallback defaults</span>
						{/if}
					</div>
					<div class="form-topbar-actions">
						<a
							href={getPublicUrl(selectedDept)}
							target="_blank"
							rel="noopener noreferrer"
							class="btn-ghost"
							title="View live public department page in a new tab"
						>
							View Public Page ↗
						</a>
						{#if isSuperAdmin && hasData(selectedDept)}
							<button class="btn-danger" onclick={deleteData} disabled={deleting}>
								{deleting ? 'Deleting…' : 'Delete Data'}
							</button>
						{/if}
						<button class="btn-primary" onclick={save} disabled={saving}>
							{saving ? 'Saving…' : 'Save Changes'}
						</button>
					</div>
				</div>

				{#if saveError}
					<div class="alert-error">{saveError}</div>
				{/if}
				{#if saveSuccess}
					<div class="alert-success">✓ Saved successfully! Changes are now live.</div>
				{/if}
				{#if loadWarnings.length}
					<div class="alert-warning" role="alert">
						{#each loadWarnings as warning}
							<p>⚠ {warning}</p>
						{/each}
					</div>
				{/if}

				<!-- OFFICE IDENTITY -->
				<section class="form-section">
					<h3 class="form-section-title">Office Identity</h3>
					<div class="form-grid-2">
						<div class="field">
							<label class="field-label" for="opd-officeName">Office Name</label>
							<input
								id="opd-officeName"
								class="field-input"
								type="text"
								bind:value={form.officeName}
								placeholder="e.g. Municipal Treasurer's Office"
							/>
						</div>
						<div class="field">
							<label class="field-label" for="opd-officeCode">Office Code</label>
							<input
								id="opd-officeCode"
								class="field-input"
								type="text"
								bind:value={form.officeCode}
								placeholder="e.g. MTO"
							/>
						</div>
						<div class="field">
							<label class="field-label" for="opd-category">Category</label>
							<input
								id="opd-category"
								class="field-input"
								type="text"
								bind:value={form.category}
								placeholder="e.g. Fiscal & Financial Administration"
							/>
						</div>
						<div class="field">
							<label class="field-label" for="opd-municipality">Municipality</label>
							<input
								id="opd-municipality"
								class="field-input"
								type="text"
								bind:value={form.municipality}
							/>
						</div>
						<div class="field field-full">
							<label class="field-label" for="opd-citizensCharterUrl">Citizen's Charter URL</label>
							<input
								id="opd-citizensCharterUrl"
								class="field-input"
								type="text"
								bind:value={form.citizensCharterUrl}
								placeholder="/citizens-charter/treasurer"
							/>
						</div>
						<div class="field field-full">
							<label class="field-label" for="opd-tagline">Tagline / Description</label>
							<textarea
								id="opd-tagline"
								class="field-input field-textarea"
								bind:value={form.tagline}
								placeholder="Short description of the office's mission..."
								rows="3"
							></textarea>
						</div>
						<div class="field field-full">
							<label class="field-label" for="opd-typewriterWords"
								>Typewriter Words
								<span class="field-hint"
									>One per line — displayed as animated rotating taglines in the hero</span
								>
							</label>
							<textarea
								id="opd-typewriterWords"
								class="field-input field-textarea"
								bind:value={form.typewriterWords}
								placeholder="Guarding Fiscal Integrity&#10;Maximizing Revenue&#10;Transparent Fund Stewardship"
								rows="4"
							></textarea>
						</div>
					</div>
				</section>

				<!-- DEPARTMENT HEAD -->
				<section class="form-section">
					<h3 class="form-section-title">Department Head / Leadership</h3>
					<div class="form-grid-2">
						<div class="field">
							<label class="field-label" for="opd-headName">Full Name</label>
							<input
								id="opd-headName"
								class="field-input"
								type="text"
								bind:value={form.headName}
								placeholder="e.g. Mrs. Restituta C. Cavite"
							/>
						</div>
						<div class="field">
							<label class="field-label" for="opd-headTitle">Official Title</label>
							<input
								id="opd-headTitle"
								class="field-input"
								type="text"
								bind:value={form.headTitle}
								placeholder="e.g. Municipal Treasurer"
							/>
						</div>
						<div class="field">
							<label class="field-label" for="opd-headTerm">Term / Role Label</label>
							<input
								id="opd-headTerm"
								class="field-input"
								type="text"
								bind:value={form.headTerm}
								placeholder="Department Head"
							/>
						</div>
						<div class="field">
							<label class="field-label" for="opd-headRoom">Office Room / Location</label>
							<input
								id="opd-headRoom"
								class="field-input"
								type="text"
								bind:value={form.headRoom}
								placeholder="Ground Floor, East Wing, Municipal Hall"
							/>
						</div>
						<div class="field field-full">
							<label class="field-label" for="opd-headSchedule">Public Schedule</label>
							<input
								id="opd-headSchedule"
								class="field-input"
								type="text"
								bind:value={form.headSchedule}
								placeholder="Monday – Friday: 8:00 AM – 5:00 PM"
							/>
						</div>
						<div class="field field-full">
							<label class="field-label" for="opd-headQuote">Leadership Quote</label>
							<textarea
								id="opd-headQuote"
								class="field-input field-textarea"
								bind:value={form.headQuote}
								placeholder="A quote from the department head..."
								rows="3"
							></textarea>
						</div>
						<div class="field field-full">
							<label class="field-label" for="opd-headCredentials"
								>Credentials / Certifications
								<span class="field-hint">One per line</span>
							</label>
							<textarea
								id="opd-headCredentials"
								class="field-input field-textarea"
								bind:value={form.headCredentials}
								placeholder="Local Treasury Operations Officer&#10;Licensed Fiscal Manager"
								rows="3"
							></textarea>
						</div>
					</div>
				</section>

				<!-- STATS -->
				<section class="form-section">
					<div class="opd-section-head">
						<h3 class="form-section-title">
							Key Performance Stats
							<span class="field-hint ml-2">(number cards in the office page banner)</span>
						</h3>
						<span class="opd-count">{cardCount(shownStatCount(form.stats), form.stats.length)}</span
						>
					</div>
					<p class="field-hint opd-section-hint">
						Shown as a number card in the office page banner. Leave unused cards empty and delete
						them. Cards missing a <strong>Value</strong> or <strong>Label</strong> are hidden on the
						public page.
					</p>

					<div class="opd-list">
						{#each form.stats as stat, i (i)}
							<div class="opd-card">
								<div class="opd-card-head">
									<span class="opd-card-badge">Stat {String(i + 1).padStart(2, '0')}</span>
									<div class="opd-card-actions">
										<button
											type="button"
											class="opd-icon-btn"
											title="Move up"
											aria-label="Move stat {i + 1} up"
											disabled={i === 0}
											onclick={() => moveStat(i, -1)}
										>
											<ChevronUp size={15} />
										</button>
										<button
											type="button"
											class="opd-icon-btn"
											title="Move down"
											aria-label="Move stat {i + 1} down"
											disabled={i === form.stats.length - 1}
											onclick={() => moveStat(i, 1)}
										>
											<ChevronDown size={15} />
										</button>
										<button
											type="button"
											class="opd-icon-btn opd-icon-btn-danger"
											title="Remove stat"
											aria-label="Remove stat {i + 1}"
											onclick={() => removeStat(i)}
										>
											<Trash2 size={15} />
										</button>
									</div>
								</div>
								<div class="form-grid-2">
									<div class="field">
										<label class="field-label" for="opd-stats-{i}-value">Value</label>
										<input
											id="opd-stats-{i}-value"
											class="field-input"
											type="text"
											bind:value={form.stats[i].value}
											placeholder="e.g. 100"
										/>
									</div>
									<div class="field">
										<label class="field-label" for="opd-stats-{i}-suffix"
											>Suffix <span class="field-hint">optional — after the number</span></label
										>
										<input
											id="opd-stats-{i}-suffix"
											class="field-input"
											type="text"
											bind:value={form.stats[i].suffix}
											placeholder="e.g. +, %, M"
										/>
									</div>
									<div class="field field-full">
										<label class="field-label" for="opd-stats-{i}-label">Label</label>
										<input
											id="opd-stats-{i}-label"
											class="field-input"
											type="text"
											bind:value={form.stats[i].label}
											placeholder="e.g. Barangays Served"
										/>
									</div>
									<div class="field field-full">
										<label class="field-label" for="opd-stats-{i}-description"
											>Description
											<span class="field-hint">optional small text under the label</span></label
										>
										<textarea
											id="opd-stats-{i}-description"
											class="field-input field-textarea"
											bind:value={form.stats[i].description}
											placeholder="Short line explaining what the number means"
											rows="2"
										></textarea>
									</div>
								</div>
							</div>
						{/each}
					</div>

					<button type="button" class="opd-add-btn" onclick={addStat}>
						<Plus size={15} />
						<span>Add Stat</span>
					</button>
				</section>

				<!-- MANDATES -->
				<section class="form-section">
					<div class="opd-section-head">
						<h3 class="form-section-title">
							Mandates / Core Functions
							<span class="field-hint ml-2">(cards in the Mandates section)</span>
						</h3>
						<span class="opd-count"
							>{cardCount(shownMandateCount(form.mandates), form.mandates.length)}</span
						>
					</div>
					<p class="field-hint opd-section-hint">
						Each mandate becomes a card. The number badge (01, 02 …) is filled in automatically from
						the order — use the arrows to reorder. Cards without a <strong>Title</strong> or
						<strong>Description</strong> are hidden on the public page.
					</p>

					<div class="opd-list">
						{#each form.mandates as mandate, i (i)}
							<div class="opd-card">
								<div class="opd-card-head">
									<span class="opd-card-badge">Mandate {String(i + 1).padStart(2, '0')}</span>
									<div class="opd-card-actions">
										<button
											type="button"
											class="opd-icon-btn"
											title="Move up"
											aria-label="Move mandate {i + 1} up"
											disabled={i === 0}
											onclick={() => moveMandate(i, -1)}
										>
											<ChevronUp size={15} />
										</button>
										<button
											type="button"
											class="opd-icon-btn"
											title="Move down"
											aria-label="Move mandate {i + 1} down"
											disabled={i === form.mandates.length - 1}
											onclick={() => moveMandate(i, 1)}
										>
											<ChevronDown size={15} />
										</button>
										<button
											type="button"
											class="opd-icon-btn opd-icon-btn-danger"
											title="Remove mandate"
											aria-label="Remove mandate {i + 1}"
											onclick={() => removeMandate(i)}
										>
											<Trash2 size={15} />
										</button>
									</div>
								</div>

								<div class="form-grid-2">
									<div class="field field-full">
										<label class="field-label" for="opd-mandate-{i}-title">Title</label>
										<input
											id="opd-mandate-{i}-title"
											class="field-input"
											type="text"
											bind:value={form.mandates[i].title}
											placeholder="e.g. Financial Recording"
										/>
									</div>
									<div class="field field-full">
										<label class="field-label" for="opd-mandate-{i}-description">Description</label>
										<textarea
											id="opd-mandate-{i}-description"
											class="field-input field-textarea"
											bind:value={form.mandates[i].description}
											placeholder="What this mandate covers..."
											rows="3"
										></textarea>
									</div>
									<div class="field">
										<label class="field-label" for="opd-mandate-{i}-code"
											>Code <span class="field-hint">optional chip</span></label
										>
										<input
											id="opd-mandate-{i}-code"
											class="field-input"
											type="text"
											bind:value={form.mandates[i].code}
											placeholder="e.g. FIN-REC"
										/>
									</div>
									<div class="field">
										<label class="field-label" for="opd-mandate-{i}-tag"
											>Tag <span class="field-hint">optional short chip</span></label
										>
										<input
											id="opd-mandate-{i}-tag"
											class="field-input"
											type="text"
											bind:value={form.mandates[i].tag}
											placeholder="e.g. Core Function"
										/>
									</div>
								</div>

								<div class="opd-details">
									<div class="opd-details-head">
										<span class="field-label" id="opd-mandate-{i}-details-label">Key details</span>
										<span class="field-hint">Bullet points listed inside the card</span>
									</div>
									<div
										class="opd-detail-list"
										role="group"
										aria-labelledby="opd-mandate-{i}-details-label"
									>
										{#each form.mandates[i].details as detail, j (j)}
											<div class="opd-detail-row">
												<input
													class="field-input"
													type="text"
													bind:value={form.mandates[i].details[j]}
													placeholder="e.g. Journal Entry Preparation"
													aria-label="Key detail {j + 1} of mandate {i + 1}"
												/>
												<button
													type="button"
													class="opd-icon-btn opd-icon-btn-danger"
													title="Remove detail"
													aria-label="Remove key detail {j + 1} of mandate {i + 1}"
													onclick={() => removeDetail(i, j)}
												>
													<Trash2 size={15} />
												</button>
											</div>
										{/each}
										<button
											type="button"
											class="opd-add-btn opd-add-btn-sm"
											onclick={() => addDetail(i)}
										>
											<Plus size={14} />
											<span>Add detail</span>
										</button>
									</div>
								</div>
							</div>
						{/each}
					</div>

					<button type="button" class="opd-add-btn" onclick={addMandate}>
						<Plus size={15} />
						<span>Add Mandate</span>
					</button>
				</section>

				<!-- SCHEDULE / CONTACT -->
				<section class="form-section">
					<h3 class="form-section-title">Service Hours & Contact</h3>
					<div class="form-grid-2">
						<div class="field field-full">
							<label class="field-label" for="opd-scheduleHours">Service Hours</label>
							<input
								id="opd-scheduleHours"
								class="field-input"
								type="text"
								bind:value={form.scheduleHours}
								placeholder="Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)"
							/>
						</div>
						<div class="field field-full">
							<label class="field-label" for="opd-scheduleLocation">Office Location</label>
							<input
								id="opd-scheduleLocation"
								class="field-input"
								type="text"
								bind:value={form.scheduleLocation}
								placeholder="Ground Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte"
							/>
						</div>
						<div class="field">
							<label class="field-label" for="opd-scheduleContact">Contact Number</label>
							<input
								id="opd-scheduleContact"
								class="field-input"
								type="text"
								bind:value={form.scheduleContact}
								placeholder="(053) 321-xxxx / +63 9xx xxx xxxx"
							/>
						</div>
						<div class="field">
							<label class="field-label" for="opd-scheduleEmail">Email Address</label>
							<input
								id="opd-scheduleEmail"
								class="field-input"
								type="email"
								bind:value={form.scheduleEmail}
								placeholder="office@tanauanleyte.gov.ph"
							/>
						</div>
						<div class="field field-full">
							<label class="field-label" for="opd-scheduleHelpline">Helpline / Counter Info</label>
							<input
								id="opd-scheduleHelpline"
								class="field-input"
								type="text"
								bind:value={form.scheduleHelpline}
								placeholder="Citizens Helpdesk: Windows 1 to 4"
							/>
						</div>
					</div>
				</section>

				<div class="form-bottom-actions">
					<button class="btn-primary btn-lg" onclick={save} disabled={saving}>
						{saving ? 'Saving…' : '💾 Save Changes'}
					</button>
				</div>
			{/if}
		</main>
	</div>
</div>

<style>
	/* ── Page Layout ─────────────────────────────────────────────────────────── */
	.opd-page {
		padding: 2rem;
		max-width: 1400px;
		margin: 0 auto;
	}
	.opd-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.opd-title {
		font-size: 1.5rem;
		font-weight: 800;
		color: #0f172a;
		margin: 0;
	}
	.opd-subtitle {
		font-size: 0.875rem;
		color: #64748b;
		margin: 4px 0 0;
	}

	.opd-layout {
		display: grid;
		grid-template-columns: 260px 1fr;
		gap: 1.5rem;
		min-height: 80vh;
	}
	@media (max-width: 768px) {
		.opd-layout {
			grid-template-columns: 1fr;
		}
	}

	/* ── Sidebar ─────────────────────────────────────────────────────────────── */
	.opd-sidebar {
		background: #fff;
		border: 1px solid #e2e8f0;
		border-radius: 16px;
		overflow: hidden;
		height: fit-content;
		position: sticky;
		top: 1rem;
	}
	.opd-sidebar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.85rem 1rem;
		border-bottom: 1px solid #f1f5f9;
	}
	.label-sm {
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #64748b;
	}
	.count-badge {
		background: #f1f5f9;
		color: #475569;
		font-size: 0.7rem;
		font-weight: 700;
		padding: 2px 7px;
		border-radius: 20px;
	}
	.dept-list {
		list-style: none;
		margin: 0;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 2px;
		max-height: 70vh;
		overflow-y: auto;
	}
	.dept-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.55rem 0.75rem;
		border: none;
		background: transparent;
		border-radius: 9px;
		cursor: pointer;
		text-align: left;
		transition: background 0.15s;
		gap: 0.5rem;
	}
	.dept-btn:hover {
		background: #f8fafc;
	}
	.dept-btn-active {
		background: #eff6ff !important;
	}
	.dept-name {
		font-size: 0.82rem;
		font-weight: 600;
		color: #0f172a;
		flex: 1;
	}
	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.status-dot-saved {
		background: #22c55e;
	}
	.status-dot-empty {
		background: #cbd5e1;
	}

	/* ── Main Panel ──────────────────────────────────────────────────────────── */
	.opd-main {
		background: #fff;
		border: 1px solid #e2e8f0;
		border-radius: 16px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0;
	}
	.opd-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 300px;
		color: #94a3b8;
		font-size: 0.95rem;
	}

	/* ── Form Top Bar ────────────────────────────────────────────────────────── */
	.form-topbar {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		padding-bottom: 1.25rem;
		margin-bottom: 1rem;
		border-bottom: 1.5px solid #f1f5f9;
		flex-wrap: wrap;
	}
	.form-dept-title {
		font-size: 1.2rem;
		font-weight: 800;
		color: #0f172a;
		margin: 0;
	}
	.status-saved {
		font-size: 0.78rem;
		font-weight: 600;
		color: #16a34a;
		display: block;
		margin-top: 3px;
	}
	.status-empty {
		font-size: 0.78rem;
		font-weight: 600;
		color: #f59e0b;
		display: block;
		margin-top: 3px;
	}
	.form-topbar-actions {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	/* ── Alerts ──────────────────────────────────────────────────────────────── */
	.alert-error {
		background: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 10px;
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		color: #dc2626;
		margin-bottom: 1rem;
	}
	.alert-success {
		background: #f0fdf4;
		border: 1px solid #bbf7d0;
		border-radius: 10px;
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		color: #16a34a;
		margin-bottom: 1rem;
	}
	.alert-warning {
		background: #fffbeb;
		border: 1px solid #fde68a;
		border-radius: 10px;
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		color: #92400e;
		margin-bottom: 1rem;
	}
	.alert-warning p {
		margin: 0;
		font-weight: 600;
	}
	.alert-warning p + p {
		margin-top: 0.35rem;
	}

	/* ── Form Sections ───────────────────────────────────────────────────────── */
	.form-section {
		border: 1px solid #f1f5f9;
		border-radius: 12px;
		padding: 1.25rem;
		margin-bottom: 1rem;
	}
	.form-section-title {
		font-size: 0.9rem;
		font-weight: 800;
		color: #1e40af;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 1rem;
	}
	.form-grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}
	@media (max-width: 600px) {
		.form-grid-2 {
			grid-template-columns: 1fr;
		}
	}

	/* ── Fields ──────────────────────────────────────────────────────────────── */
	.field {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}
	.field-full {
		grid-column: 1 / -1;
	}
	.field-label {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: #475569;
		text-transform: uppercase;
	}
	.field-hint {
		font-size: 0.7rem;
		font-weight: 400;
		color: #94a3b8;
		letter-spacing: 0;
		text-transform: none;
	}
	.field-input {
		padding: 0.6rem 0.85rem;
		border: 1.5px solid #e2e8f0;
		border-radius: 9px;
		font-size: 0.875rem;
		outline: none;
		color: #0f172a;
		transition: border-color 0.2s;
		width: 100%;
		box-sizing: border-box;
		background: #fafafa;
	}
	.field-input:focus {
		border-color: #3b82f6;
		background: #fff;
	}
	.field-textarea {
		resize: vertical;
		font-family: inherit;
		line-height: 1.6;
	}
	.ml-2 {
		margin-left: 0.5rem;
	}

	/* ── Structured list editors (Stats & Mandates) ─────────────────────────── */
	.opd-section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem 0.75rem;
		margin-bottom: 0.35rem;
	}
	.opd-section-head .form-section-title {
		margin: 0;
	}
	.opd-count {
		font-size: 0.7rem;
		font-weight: 700;
		color: #1d4ed8;
		background: #eff6ff;
		border: 1px solid #dbeafe;
		border-radius: 999px;
		padding: 3px 9px;
		white-space: nowrap;
	}
	.opd-section-hint {
		margin: 0 0 0.9rem;
		line-height: 1.55;
	}
	.opd-section-hint strong {
		font-weight: 700;
		color: #475569;
	}
	.opd-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.opd-card {
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		padding: 0.9rem;
		background: #fafbfc;
	}
	.opd-card-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}
	.opd-card-badge {
		font-size: 0.7rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: #1e40af;
		background: #eff6ff;
		border: 1px solid #dbeafe;
		border-radius: 999px;
		padding: 3px 9px;
	}
	.opd-card-actions {
		display: flex;
		gap: 0.3rem;
	}
	.opd-icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		padding: 0;
		border: 1.5px solid #e2e8f0;
		border-radius: 8px;
		background: #fff;
		color: #64748b;
		cursor: pointer;
		transition:
			background 0.15s,
			border-color 0.15s,
			color 0.15s;
	}
	.opd-icon-btn:hover:not(:disabled) {
		background: #eff6ff;
		border-color: #bfdbfe;
		color: #1d4ed8;
	}
	.opd-icon-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	.opd-icon-btn-danger:hover:not(:disabled) {
		background: #fef2f2;
		border-color: #fecaca;
		color: #dc2626;
	}
	.opd-add-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 0.75rem;
		padding: 0.5rem 0.9rem;
		border: 1.5px dashed #cbd5e1;
		border-radius: 10px;
		background: #fff;
		color: #475569;
		font-size: 0.8rem;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.15s,
			border-color 0.15s,
			color 0.15s;
	}
	.opd-add-btn:hover {
		background: #eff6ff;
		border-color: #93c5fd;
		color: #1d4ed8;
	}
	.opd-add-btn-sm {
		margin-top: 0.5rem;
		padding: 0.35rem 0.7rem;
		font-size: 0.75rem;
		align-self: flex-start;
	}
	.opd-details {
		margin-top: 0.85rem;
		padding-top: 0.75rem;
		border-top: 1px dashed #e2e8f0;
	}
	.opd-details-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.25rem 0.5rem;
		margin-bottom: 0.45rem;
	}
	.opd-detail-list {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.opd-detail-row {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}
	.opd-detail-row .field-input {
		flex: 1;
	}

	/* ── Bottom Actions ──────────────────────────────────────────────────────── */
	.form-bottom-actions {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.75rem;
		padding-top: 1rem;
		border-top: 1.5px solid #f1f5f9;
		margin-top: 0.5rem;
	}
	.btn-lg {
		padding: 0.7rem 1.8rem;
		font-size: 1rem;
	}

	/* ── Buttons ─────────────────────────────────────────────────────────────── */
	.btn-primary {
		padding: 0.55rem 1.1rem;
		background: #1d4ed8;
		color: #fff;
		font-weight: 600;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		font-size: 0.875rem;
		transition: background 0.2s;
		white-space: nowrap;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
	}
	.btn-primary:hover:not(:disabled) {
		background: #1e40af;
	}
	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.btn-danger {
		padding: 0.55rem 1.1rem;
		background: #fef2f2;
		color: #dc2626;
		font-weight: 600;
		border: 1.5px solid #fecaca;
		border-radius: 10px;
		cursor: pointer;
		font-size: 0.875rem;
	}
	.btn-danger:hover:not(:disabled) {
		background: #fee2e2;
	}
	.btn-ghost {
		padding: 0.55rem 1rem;
		background: transparent;
		color: #64748b;
		font-weight: 600;
		border: 1.5px solid #e2e8f0;
		border-radius: 10px;
		cursor: pointer;
		font-size: 0.875rem;
		text-decoration: none;
	}
</style>
