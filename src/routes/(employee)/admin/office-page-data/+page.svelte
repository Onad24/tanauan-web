<script>
	import { invalidateAll } from '$app/navigation';
	import { getDeptDefaults, DIR_TO_KEY, slugify } from '$lib/deptDefaults';

	let { data } = $props();

	const { deptList, existing, isSuperAdmin, authDepartment } = data;

	// Determine which departments this user can edit
	const editableDepts = isSuperAdmin ? deptList : deptList.filter((d) => d === authDepartment);

	let selectedDept = $state(editableDepts[0] ?? '');
	let saving = $state(false);
	let saveError = $state('');
	let saveSuccess = $state(false);
	let deleting = $state(false);

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

		return {
			officeName: ex.officeName ?? def.officeName ?? '',
			officeCode: ex.officeCode ?? def.officeCode ?? '',
			category: ex.category ?? def.category ?? '',
			municipality: ex.municipality ?? def.municipality ?? 'Municipality of Tanauan, Leyte',
			citizensCharterUrl: ex.citizensCharterUrl ?? def.citizensCharterUrl ?? '',
			tagline: ex.tagline ?? def.tagline ?? '',
			typewriterWords: (ex.typewriterWords?.length ? ex.typewriterWords : (def.typewriterWords ?? [''])).join('\n'),
			headName: ex.head?.name ?? def.head?.name ?? '',
			headTitle: ex.head?.title ?? def.head?.title ?? '',
			headTerm: ex.head?.term ?? def.head?.term ?? 'Department Head',
			headQuote: ex.head?.quote ?? def.head?.quote ?? '',
			headCredentials: (ex.head?.credentials?.length ? ex.head.credentials : (def.head?.credentials ?? [''])).join('\n'),
			headRoom: ex.head?.room ?? def.head?.room ?? '',
			headSchedule: ex.head?.schedule ?? def.head?.schedule ?? 'Monday – Friday: 8:00 AM – 5:00 PM',
			stats: JSON.stringify(
				(ex.stats?.length ? ex.stats : def.stats) ?? [
					{ value: '', suffix: '', label: '', description: '' },
					{ value: '', suffix: '', label: '', description: '' },
					{ value: '', suffix: '', label: '', description: '' },
					{ value: '', suffix: '', label: '', description: '' }
				],
				null,
				2
			),
			mandates: JSON.stringify(
				(ex.mandates?.length ? ex.mandates : def.mandates) ?? [
					{
						index: '01',
						code: '',
						title: '',
						description: '',
						tag: '',
						details: ['', '', '']
					}
				],
				null,
				2
			),
			scheduleHours: ex.schedule?.hours ?? def.schedule?.hours ?? 'Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)',
			scheduleLocation: ex.schedule?.location ?? def.schedule?.location ?? 'Tanauan Municipal Hall, Real St., Tanauan, Leyte',
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

	function tryParseJSON(str, fallback) {
		try {
			return JSON.parse(str);
		} catch {
			return fallback;
		}
	}

	async function save() {
		saving = true;
		saveError = '';
		saveSuccess = false;

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
			stats: tryParseJSON(form.stats, []),
			mandates: tryParseJSON(form.mandates, []),
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
			await invalidateAll();
			setTimeout(() => (saveSuccess = false), 3000);
		} catch (e) {
			saveError = e.message;
		} finally {
			saving = false;
		}
	}

	async function deleteData() {
		if (!confirm(`Delete all office page data for "${selectedDept}"? This cannot be undone.`)) return;
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
		} catch (e) {
			saveError = e.message;
		} finally {
			deleting = false;
		}
	}
</script>

<svelte:head>
	<title>Office Page Data | Admin Panel</title>
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

				<!-- OFFICE IDENTITY -->
				<section class="form-section">
					<h3 class="form-section-title">Office Identity</h3>
					<div class="form-grid-2">
						<div class="field">
							<label class="field-label">Office Name</label>
							<input class="field-input" type="text" bind:value={form.officeName}
								placeholder="e.g. Municipal Treasurer's Office" />
						</div>
						<div class="field">
							<label class="field-label">Office Code</label>
							<input class="field-input" type="text" bind:value={form.officeCode}
								placeholder="e.g. MTO" />
						</div>
						<div class="field">
							<label class="field-label">Category</label>
							<input class="field-input" type="text" bind:value={form.category}
								placeholder="e.g. Fiscal & Financial Administration" />
						</div>
						<div class="field">
							<label class="field-label">Municipality</label>
							<input class="field-input" type="text" bind:value={form.municipality} />
						</div>
						<div class="field field-full">
							<label class="field-label">Citizen's Charter URL</label>
							<input class="field-input" type="text" bind:value={form.citizensCharterUrl}
								placeholder="/citizens-charter/treasurer" />
						</div>
						<div class="field field-full">
							<label class="field-label">Tagline / Description</label>
							<textarea class="field-input field-textarea" bind:value={form.tagline}
								placeholder="Short description of the office's mission..." rows="3"></textarea>
						</div>
						<div class="field field-full">
							<label class="field-label">Typewriter Words
								<span class="field-hint">One per line — displayed as animated rotating taglines in the hero</span>
							</label>
							<textarea class="field-input field-textarea" bind:value={form.typewriterWords}
								placeholder="Guarding Fiscal Integrity&#10;Maximizing Revenue&#10;Transparent Fund Stewardship" rows="4"></textarea>
						</div>
					</div>
				</section>

				<!-- DEPARTMENT HEAD -->
				<section class="form-section">
					<h3 class="form-section-title">Department Head / Leadership</h3>
					<div class="form-grid-2">
						<div class="field">
							<label class="field-label">Full Name</label>
							<input class="field-input" type="text" bind:value={form.headName}
								placeholder="e.g. Mrs. Restituta C. Cavite" />
						</div>
						<div class="field">
							<label class="field-label">Official Title</label>
							<input class="field-input" type="text" bind:value={form.headTitle}
								placeholder="e.g. Municipal Treasurer" />
						</div>
						<div class="field">
							<label class="field-label">Term / Role Label</label>
							<input class="field-input" type="text" bind:value={form.headTerm}
								placeholder="Department Head" />
						</div>
						<div class="field">
							<label class="field-label">Office Room / Location</label>
							<input class="field-input" type="text" bind:value={form.headRoom}
								placeholder="Ground Floor, East Wing, Municipal Hall" />
						</div>
						<div class="field field-full">
							<label class="field-label">Public Schedule</label>
							<input class="field-input" type="text" bind:value={form.headSchedule}
								placeholder="Monday – Friday: 8:00 AM – 5:00 PM" />
						</div>
						<div class="field field-full">
							<label class="field-label">Leadership Quote</label>
							<textarea class="field-input field-textarea" bind:value={form.headQuote}
								placeholder="A quote from the department head..." rows="3"></textarea>
						</div>
						<div class="field field-full">
							<label class="field-label">Credentials / Certifications
								<span class="field-hint">One per line</span>
							</label>
							<textarea class="field-input field-textarea" bind:value={form.headCredentials}
								placeholder="Local Treasury Operations Officer&#10;Licensed Fiscal Manager" rows="3"></textarea>
						</div>
					</div>
				</section>

				<!-- STATS -->
				<section class="form-section">
					<h3 class="form-section-title">Key Performance Stats
						<span class="field-hint ml-2">(JSON array — 4 stat cards displayed in the hero strip)</span>
					</h3>
					<div class="field">
						<label class="field-label">Stats JSON</label>
						<textarea class="field-input field-textarea field-mono" bind:value={form.stats}
							rows="14"></textarea>
						<p class="field-hint mt-1">
							Format: <code>[{`{"value":"100","suffix":"%","label":"Fund Accountability","description":"..."}`}]</code>
						</p>
					</div>
				</section>

				<!-- MANDATES -->
				<section class="form-section">
					<h3 class="form-section-title">Mandates / Core Functions
						<span class="field-hint ml-2">(JSON array — shown as cards in the Mandates section)</span>
					</h3>
					<div class="field">
						<label class="field-label">Mandates JSON</label>
						<textarea class="field-input field-textarea field-mono" bind:value={form.mandates}
							rows="30"></textarea>
						<p class="field-hint mt-1">
							Format: <code>[{`{"index":"01","code":"REV-COLL","title":"Title","description":"...","tag":"Core Function","details":["Detail 1","Detail 2"]}`}]</code>
						</p>
					</div>
				</section>

				<!-- SCHEDULE / CONTACT -->
				<section class="form-section">
					<h3 class="form-section-title">Service Hours & Contact</h3>
					<div class="form-grid-2">
						<div class="field field-full">
							<label class="field-label">Service Hours</label>
							<input class="field-input" type="text" bind:value={form.scheduleHours}
								placeholder="Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)" />
						</div>
						<div class="field field-full">
							<label class="field-label">Office Location</label>
							<input class="field-input" type="text" bind:value={form.scheduleLocation}
								placeholder="Ground Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte" />
						</div>
						<div class="field">
							<label class="field-label">Contact Number</label>
							<input class="field-input" type="text" bind:value={form.scheduleContact}
								placeholder="(053) 321-xxxx / +63 9xx xxx xxxx" />
						</div>
						<div class="field">
							<label class="field-label">Email Address</label>
							<input class="field-input" type="email" bind:value={form.scheduleEmail}
								placeholder="office@tanauanleyte.gov.ph" />
						</div>
						<div class="field field-full">
							<label class="field-label">Helpline / Counter Info</label>
							<input class="field-input" type="text" bind:value={form.scheduleHelpline}
								placeholder="Citizens Helpdesk: Windows 1 to 4" />
						</div>
					</div>
				</section>

				<div class="form-bottom-actions">
					{#if saveError}<div class="alert-error">{saveError}</div>{/if}
					{#if saveSuccess}<div class="alert-success">✓ Saved successfully!</div>{/if}
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
.opd-page { padding: 2rem; max-width: 1400px; margin: 0 auto; }
.opd-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
.opd-title { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin: 0; }
.opd-subtitle { font-size: .875rem; color: #64748b; margin: 4px 0 0; }

.opd-layout { display: grid; grid-template-columns: 260px 1fr; gap: 1.5rem; min-height: 80vh; }
@media (max-width: 768px) { .opd-layout { grid-template-columns: 1fr; } }

/* ── Sidebar ─────────────────────────────────────────────────────────────── */
.opd-sidebar { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; height: fit-content; position: sticky; top: 1rem; }
.opd-sidebar-header { display: flex; align-items: center; justify-content: space-between; padding: .85rem 1rem; border-bottom: 1px solid #f1f5f9; }
.label-sm { font-size: .7rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #64748b; }
.count-badge { background: #f1f5f9; color: #475569; font-size: .7rem; font-weight: 700; padding: 2px 7px; border-radius: 20px; }
.dept-list { list-style: none; margin: 0; padding: .5rem; display: flex; flex-direction: column; gap: 2px; max-height: 70vh; overflow-y: auto; }
.dept-btn { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: .55rem .75rem; border: none; background: transparent; border-radius: 9px; cursor: pointer; text-align: left; transition: background .15s; gap: .5rem; }
.dept-btn:hover { background: #f8fafc; }
.dept-btn-active { background: #eff6ff !important; }
.dept-name { font-size: .82rem; font-weight: 600; color: #0f172a; flex: 1; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.status-dot-saved { background: #22c55e; }
.status-dot-empty { background: #cbd5e1; }

/* ── Main Panel ──────────────────────────────────────────────────────────── */
.opd-main { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; gap: 0; }
.opd-empty { display: flex; align-items: center; justify-content: center; min-height: 300px; color: #94a3b8; font-size: .95rem; }

/* ── Form Top Bar ────────────────────────────────────────────────────────── */
.form-topbar { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; padding-bottom: 1.25rem; margin-bottom: 1rem; border-bottom: 1.5px solid #f1f5f9; flex-wrap: wrap; }
.form-dept-title { font-size: 1.2rem; font-weight: 800; color: #0f172a; margin: 0; }
.status-saved { font-size: .78rem; font-weight: 600; color: #16a34a; display: block; margin-top: 3px; }
.status-empty { font-size: .78rem; font-weight: 600; color: #f59e0b; display: block; margin-top: 3px; }
.form-topbar-actions { display: flex; gap: .75rem; align-items: center; }

/* ── Alerts ──────────────────────────────────────────────────────────────── */
.alert-error { background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: .75rem 1rem; font-size: .875rem; color: #dc2626; margin-bottom: 1rem; }
.alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: .75rem 1rem; font-size: .875rem; color: #16a34a; margin-bottom: 1rem; }

/* ── Form Sections ───────────────────────────────────────────────────────── */
.form-section { border: 1px solid #f1f5f9; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; }
.form-section-title { font-size: .9rem; font-weight: 800; color: #1e40af; text-transform: uppercase; letter-spacing: .05em; margin: 0 0 1rem; }
.form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; }
@media (max-width: 600px) { .form-grid-2 { grid-template-columns: 1fr; } }

/* ── Fields ──────────────────────────────────────────────────────────────── */
.field { display: flex; flex-direction: column; gap: .3rem; }
.field-full { grid-column: 1 / -1; }
.field-label { font-size: .75rem; font-weight: 700; letter-spacing: .04em; color: #475569; text-transform: uppercase; }
.field-hint { font-size: .7rem; font-weight: 400; color: #94a3b8; letter-spacing: 0; text-transform: none; }
.field-input { padding: .6rem .85rem; border: 1.5px solid #e2e8f0; border-radius: 9px; font-size: .875rem; outline: none; color: #0f172a; transition: border-color .2s; width: 100%; box-sizing: border-box; background: #fafafa; }
.field-input:focus { border-color: #3b82f6; background: #fff; }
.field-textarea { resize: vertical; font-family: inherit; line-height: 1.6; }
.field-mono { font-family: 'Courier New', monospace; font-size: .8rem; background: #f8fafc; }
.mt-1 { margin-top: .4rem; }
.ml-2 { margin-left: .5rem; }

/* ── Bottom Actions ──────────────────────────────────────────────────────── */
.form-bottom-actions { display: flex; flex-direction: column; align-items: flex-end; gap: .75rem; padding-top: 1rem; border-top: 1.5px solid #f1f5f9; margin-top: .5rem; }
.btn-lg { padding: .7rem 1.8rem; font-size: 1rem; }

/* ── Buttons ─────────────────────────────────────────────────────────────── */
.btn-primary { padding: .55rem 1.1rem; background: #1d4ed8; color: #fff; font-weight: 600; border: none; border-radius: 10px; cursor: pointer; font-size: .875rem; transition: background .2s; white-space: nowrap; text-decoration: none; display: inline-flex; align-items: center; }
.btn-primary:hover:not(:disabled) { background: #1e40af; }
.btn-primary:disabled { opacity: .6; cursor: not-allowed; }
.btn-danger { padding: .55rem 1.1rem; background: #fef2f2; color: #dc2626; font-weight: 600; border: 1.5px solid #fecaca; border-radius: 10px; cursor: pointer; font-size: .875rem; }
.btn-danger:hover:not(:disabled) { background: #fee2e2; }
.btn-ghost { padding: .55rem 1rem; background: transparent; color: #64748b; font-weight: 600; border: 1.5px solid #e2e8f0; border-radius: 10px; cursor: pointer; font-size: .875rem; text-decoration: none; }

code { background: #f1f5f9; padding: 2px 5px; border-radius: 4px; font-size: .78rem; color: #0f172a; }
</style>
