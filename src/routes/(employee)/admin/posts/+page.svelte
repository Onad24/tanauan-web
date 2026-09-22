<script>
	import { uploadMultipleFiles } from '$lib/firebaseStorage';
	import { departments, postTypes, sectionLayouts, cardStyles } from '$lib/config';
	import Modal from '$lib/Modal.svelte';
	import SectionDesignPicker from '$lib/SectionDesignPicker.svelte';
	import {
		Search,
		Plus,
		FolderPlus,
		Folder,
		Layers,
		FileText,
		Palette,
		CheckCircle2,
		AlertCircle,
		Clock,
		XCircle,
		X,
		Pencil,
		Trash2,
		Star,
		Sparkles,
		Settings,
		Sliders,
		Image as ImageIcon,
		Film,
		Link as LinkIcon,
		Calendar,
		Building2,
		ChevronLeft,
		ChevronRight,
		ExternalLink,
		ShieldCheck,
		Check,
		Filter,
		Eye,
		LayoutGrid,
		Inbox
	} from 'lucide-svelte';

	let { data } = $props();
	let rows = $state([]);
	let allSections = $state([]);
	$effect(() => {
		rows = data.posts || [];
		allSections = data.sections || [];
	});
	let loading = $state(false);
	let showModal = $state(false);
	let editing = $state(null);
	let uploading = $state(false);
	let uploadError = $state('');

	// ── User Permissions & Portal Role ───────────────────────────────────────
	let currentUser = $derived(data.currentUser || {});
	let isSuperAdmin = $derived(currentUser?.isSuperAdmin ?? false);
	let isDeptHead = $derived(currentUser?.isDeptHead ?? false);
	let isDesigner = $derived(currentUser?.isDesigner ?? false);
	let userDept = $derived(currentUser?.department ?? '');

	// ── Dept filter & Section tabs ───────────────────────────────────────────
	let deptFilter = $state(data.currentUser?.isSuperAdmin ? '' : (data.currentUser?.department || '')); // '' = all depts, or specific dept name

	// Workflow status filter: 'all' | 'pending' | 'approved' | 'rejected'
	let statusFilter = $state('all');

	// Pending posts count scoped to current filter / department
	let pendingPostsCount = $derived(
		rows.filter(
			(r) =>
				r.status === 'pending' &&
				(!deptFilter || r.department?.toLowerCase() === deptFilter.toLowerCase())
		).length
	);

	// Sections available according to department filter
	let deptSections = $derived(
		deptFilter
			? allSections.filter((s) => s.department?.toLowerCase() === deptFilter.toLowerCase())
			: allSections
	);

	// Tab is either 'All' or a sectionSlug
	let activeTab = $state('All');
	let activeSection = $derived(
		activeTab === 'All'
			? null
			: allSections.find((s) => s.sectionSlug === activeTab && (!deptFilter || s.department?.toLowerCase() === deptFilter.toLowerCase())) ||
			  allSections.find((s) => s.sectionSlug === activeTab) || null
	);

	// Section design picker
	let showDesignPicker = $state(false);
	let pickerSection = $state(null); // null = create new, object = edit existing

	// Form for Add/Edit Post
	let form = $state({
		header: '',
		content: '',
		department: '',
		type: '',
		sectionSlug: '',
		sectionLabel: '',
		cardStyle: 'default',
		isFeatured: false,
		link: '',
		media: []
	});

	// Interactive Card Theme in Visual Builder
	let selectedTheme = $state('default');

	// Pagination & search
	let searchTerm = $state('');
	let currentPage = $state(1);
	const pageSize = 10;
	let selectedFiles = $state([]);
	let mediaPreview = $state([]);
	let fileInputEl;

	const todayFormatted = new Date().toLocaleDateString('en-PH', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

	// ── Filtered Rows ────────────────────────────────────────────────────────
	let filteredRows = $derived.by(() => {
		let base = rows;

		// Filter by department if selected
		if (deptFilter) {
			base = base.filter((r) => r.department?.toLowerCase() === deptFilter.toLowerCase());
		}

		// Filter by active section tab
		if (activeTab !== 'All') {
			base = base.filter((r) => r.sectionSlug === activeTab);
		}

		// Filter by approval workflow status
		if (statusFilter !== 'all') {
			if (statusFilter === 'approved') {
				base = base.filter((r) => r.status === 'approved' || !r.status);
			} else {
				base = base.filter((r) => r.status === statusFilter);
			}
		}

		// Search term
		if (searchTerm.trim()) {
			const lower = searchTerm.toLowerCase();
			base = base.filter(
				(r) =>
					r.header?.toLowerCase().includes(lower) ||
					r.content?.toLowerCase().includes(lower) ||
					r.department?.toLowerCase().includes(lower) ||
					r.sectionLabel?.toLowerCase().includes(lower) ||
					r.type?.toLowerCase().includes(lower) ||
					r.submittedBy?.toLowerCase().includes(lower)
			);
		}
		return base;
	});

	let totalPages = $derived(Math.ceil(filteredRows.length / pageSize) || 0);
	let paginatedRows = $derived(filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize));

	function tabCount(sectionSlug) {
		if (sectionSlug === 'All') {
			return deptFilter ? rows.filter((r) => r.department?.toLowerCase() === deptFilter.toLowerCase()).length : rows.length;
		}
		if (deptFilter) {
			return rows.filter((r) => r.sectionSlug === sectionSlug && r.department?.toLowerCase() === deptFilter.toLowerCase()).length;
		}
		return rows.filter((r) => r.sectionSlug === sectionSlug).length;
	}

	function switchTab(slug) {
		activeTab = slug;
		currentPage = 1;
	}

	// ── Departments list ─────────────────────────────────────────────────────
	let allDeptNames = $derived.by(() => {
		const names = new Set(departments.map((d) => d.name));
		allSections.forEach((s) => {
			if (s.department) names.add(s.department);
		});
		return Array.from(names).sort();
	});

	// ── Open modals ────────────────────────────────────────────────────────
	function openAdd() {
		editing = null;
		const defaultDept = deptFilter || (departments[0]?.name || 'MSWDO');
		const initialSection = activeSection;
		const initialTheme = initialSection?.cardStyle || 'default';

		form = {
			header: '',
			content: '',
			department: defaultDept,
			type: '',
			sectionSlug: activeTab !== 'All' ? activeTab : '',
			sectionLabel: initialSection?.label || '',
			cardStyle: initialTheme,
			isFeatured: false,
			link: '',
			media: []
		};
		selectedTheme = initialTheme;
		selectedFiles = [];
		mediaPreview = [];
		uploadError = '';
		showModal = true;
	}

	function openEdit(r) {
		editing = r;
		const matchedSection = allSections.find(
			(s) => s.sectionSlug === r.sectionSlug && s.department?.toLowerCase() === r.department?.toLowerCase()
		);
		const initialTheme = r.cardStyle || matchedSection?.cardStyle || 'default';

		form = {
			header: r.header || '',
			content: r.content || '',
			department: r.department || '',
			type: r.type || '',
			sectionSlug: r.sectionSlug || '',
			sectionLabel: r.sectionLabel || '',
			cardStyle: initialTheme,
			isFeatured: Boolean(r.isFeatured),
			link: r.link || '',
			media: r.media || []
		};
		selectedTheme = initialTheme;
		selectedFiles = [];
		mediaPreview = (r.media || []).map((url) => ({
			url: typeof url === 'string' ? url : '',
			name: typeof url === 'string' ? url.split('/').pop().split('?')[0] : 'Media',
			isNew: false
		}));
		uploadError = '';
		showModal = true;
	}

	// Sections available for the department currently selected in the post form
	let formDeptSections = $derived(
		form.department
			? allSections.filter((s) => s.department?.toLowerCase() === form.department.toLowerCase())
			: []
	);

	function handleFormDeptChange(e) {
		const newDept = e.target.value;
		form.department = newDept;
		form.sectionSlug = '';
		form.sectionLabel = '';
		selectedTheme = 'default';
	}

	function handleSectionSelect(e) {
		const slug = e.target.value;
		form.sectionSlug = slug;
		if (!slug) {
			form.sectionLabel = '';
			selectedTheme = 'default';
			return;
		}
		const sec = allSections.find(
			(s) =>
				s.sectionSlug === slug &&
				(!form.department || s.department?.toLowerCase() === form.department.toLowerCase())
		) || allSections.find((s) => s.sectionSlug === slug);

		form.sectionLabel = sec?.label || slug;
		if (sec?.cardStyle) {
			selectedTheme = sec.cardStyle;
		}
	}

	function selectThemeDirectly(themeId) {
		selectedTheme = themeId;
		form.cardStyle = themeId;
	}

	// ── Toggle Featured Highlight (Radio button style: switches others off) ───
	async function toggleFeaturedPost(post) {
		const newFeatured = !post.isFeatured;
		const targetSec = post.sectionSlug || '';
		const targetDept = post.department || '';

		// Optimistically update all rows: turn off other featured posts in the same section/dept
		rows = rows.map((r) => {
			if (r.id === post.id) {
				return { ...r, isFeatured: newFeatured };
			} else if (newFeatured) {
				if (targetSec && r.sectionSlug === targetSec) {
					return { ...r, isFeatured: false };
				} else if (!targetSec && r.department === targetDept) {
					return { ...r, isFeatured: false };
				}
			}
			return r;
		});

		try {
			const res = await fetch('/admin/posts', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: post.id,
					sectionSlug: targetSec,
					department: targetDept,
					isFeatured: newFeatured
				})
			});
			if (!res.ok) throw new Error('Failed to update featured post');
		} catch (err) {
			console.error('Toggle featured post error:', err);
		}
	}

	// ── Media Handlers ───────────────────────────────────────────────────────
	function handleMediaInput(e) {
		const files = Array.from(e.target.files);
		if (files.length === 0) return;
		selectedFiles = [...selectedFiles, ...files];
		const newPreviews = files.map((f) => ({
			file: f,
			name: f.name,
			type: f.type,
			url: URL.createObjectURL(f),
			isNew: true
		}));
		mediaPreview = [...mediaPreview, ...newPreviews];
	}

	function removeMediaItem(index) {
		const itemToRemove = mediaPreview[index];
		if (itemToRemove?.isNew) {
			selectedFiles = selectedFiles.filter((f) => f !== itemToRemove.file);
		}
		mediaPreview = mediaPreview.filter((_, i) => i !== index);
	}

	function triggerFileInput() {
		if (fileInputEl) fileInputEl.click();
	}

	// ── Delete Post ──────────────────────────────────────────────────────────
	async function removeRow(id) {
		if (!confirm('Delete this post?')) return;
		loading = true;
		try {
			const post = rows.find((r) => r.id === id);
			const res = await fetch('/admin/posts', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id, media: post?.media || [] })
			});
			if (!res.ok) throw new Error('Failed to delete post');
			rows = rows.filter((r) => r.id !== id);
		} catch (err) {
			uploadError = err.message;
		} finally {
			loading = false;
		}
	}

	// ── Save Post ────────────────────────────────────────────────────────────
	async function save() {
		if (!form.header.trim()) {
			uploadError = 'Please enter a post header/title.';
			return;
		}
		if (!form.department) {
			uploadError = 'Please select a department.';
			return;
		}

		uploadError = '';
		uploading = true;
		try {
			let uploadedURLs = [];
			if (selectedFiles.length > 0) {
				try {
					uploadedURLs = await uploadMultipleFiles(selectedFiles);
				} catch (error) {
					uploadError = `Upload failed: ${error.message}`;
					uploading = false;
					return;
				}
			}
			const existingMediaURLs = mediaPreview
				.filter((m) => !m.isNew && typeof m.url === 'string')
				.map((m) => m.url);
			const allMedia = [...existingMediaURLs, ...uploadedURLs];
			const payload = {
				...form,
				cardStyle: selectedTheme,
				isFeatured: Boolean(form.isFeatured),
				media: allMedia
			};

			if (editing) {
				const res = await fetch('/admin/posts', {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ id: editing.id, ...payload })
				});
				if (!res.ok) throw new Error('Failed to update post');
				const idx = rows.findIndex((r) => r.id === editing.id);
				if (idx >= 0) {
					// If edited post was set as featured, unset others
					if (payload.isFeatured) {
						rows = rows.map((r) => {
							if (r.id === editing.id) return { id: editing.id, ...payload };
							if (r.sectionSlug === payload.sectionSlug) return { ...r, isFeatured: false };
							return r;
						});
					} else {
						rows[idx] = { id: editing.id, ...payload };
						rows = [...rows];
					}
				}
			} else {
				const res = await fetch('/admin/posts', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
				});
				if (!res.ok) throw new Error('Failed to create post');
				const newPost = await res.json();
				if (payload.isFeatured) {
					rows = rows.map((r) => (r.sectionSlug === payload.sectionSlug ? { ...r, isFeatured: false } : r));
				}
				rows = [...rows, newPost];
			}
			showModal = false;
		} catch (error) {
			uploadError = 'Error saving post: ' + error.message;
		} finally {
			uploading = false;
		}
	}

	function goToPage(page) {
		if (page < 1 || page > totalPages) return;
		currentPage = page;
	}

	// ── Section Design & Creation Handlers ────────────────────────────────────
	function openNewSection(presetDept = '') {
		pickerSection = null;
		showDesignPicker = true;
	}

	function openEditSection(sec) {
		pickerSection = sec;
		showDesignPicker = true;
	}

	function onSectionSaved(saved) {
		const existingIndex = allSections.findIndex((s) => s.id === saved.id);
		if (existingIndex >= 0) {
			allSections[existingIndex] = saved;
		} else {
			allSections = [...allSections, saved];
		}
		allSections = [...allSections];

		// Automatically switch view to the created/updated section
		if (saved.department) {
			deptFilter = saved.department;
		}
		activeTab = saved.sectionSlug;
		currentPage = 1;
		showDesignPicker = false;
	}

	// ── Quick Post Approval / Rejection ─────────────────────────────────────
	async function handlePostApproval(post, action) {
		try {
			const res = await fetch('/admin/posts', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: post.id,
					action,
					department: post.department
				})
			});
			if (!res.ok) {
				const err = await res.json();
				throw new Error(err.error || 'Failed to update approval status');
			}
			const result = await res.json();
			rows = rows.map((r) => (r.id === post.id ? { ...r, status: result.status } : r));
		} catch (err) {
			alert('Approval error: ' + err.message);
		}
	}

	function onSectionDeleted(deletedId) {
		allSections = allSections.filter((s) => s.id !== deletedId);
		if (activeTab === pickerSection?.sectionSlug) {
			activeTab = 'All';
		}
		showDesignPicker = false;
	}
</script>

<div class="p-6 lg:p-10 space-y-6 max-w-7xl mx-auto">
	<!-- Page Header Banner -->
	<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
		<div>
			<div class="flex items-center gap-2 mb-1">
				<span class="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-100">
					<FileText class="h-3.5 w-3.5 text-indigo-600" />
					Content Management
				</span>
				<span class="text-xs text-slate-400 font-mono">• {rows.length} Total Publications</span>
			</div>
			<h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
				Posts &amp; Sections Management
			</h1>
			<p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
				{#if isSuperAdmin}
					Create municipal bulletins, customize departmental card designs, and manage public publications across all offices.
				{:else if isDeptHead}
					Review designer submissions, approve articles, and organize section layouts for the <strong>{userDept}</strong> Department.
				{:else}
					Draft announcements and section updates for the <strong>{userDept}</strong> Department. Submissions will route to your Department Head for approval.
				{/if}
			</p>
		</div>

		<!-- Action Buttons: + Add Section & + Add Post -->
		<div class="flex flex-wrap items-center gap-2.5">
			<button
				type="button"
				onclick={() => openNewSection(deptFilter)}
				class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
				title="Add a new custom post section with tailored card design"
			>
				<Layers class="h-4 w-4 text-slate-500" />
				<span>+ Add Section</span>
			</button>

			<button
				type="button"
				onclick={openAdd}
				class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 hover:bg-indigo-700 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all"
			>
				<Plus class="h-4 w-4" />
				<span>{activeTab !== 'All' ? `+ Add to ${activeSection?.label ?? activeTab}` : '+ Add Post'}</span>
			</button>
		</div>
	</div>

	<!-- Executive KPI Metric Cards -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
		<!-- Total Published Posts -->
		<div class="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm hover:border-indigo-200 transition-all">
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Publications</span>
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
					<FileText class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black text-slate-900">{rows.length}</span>
				<span class="text-[11px] text-slate-400 font-medium">articles &amp; notices</span>
			</div>
		</div>

		<!-- Pending Review -->
		<div class="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm hover:border-amber-200 transition-all">
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pending Approvals</span>
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
					<Clock class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black {pendingPostsCount > 0 ? 'text-amber-600' : 'text-slate-900'}">{pendingPostsCount}</span>
				<span class="text-[11px] {pendingPostsCount > 0 ? 'text-amber-700 font-bold' : 'text-slate-400 font-medium'}">
					{pendingPostsCount > 0 ? 'awaiting review' : 'all clear'}
				</span>
			</div>
		</div>

		<!-- Active Sections -->
		<div class="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm hover:border-purple-200 transition-all">
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Custom Sections</span>
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
					<Layers class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black text-slate-900">{allSections.length}</span>
				<span class="text-[11px] text-slate-400 font-medium">modular feeds</span>
			</div>
		</div>

		<!-- Featured Hero Highlights -->
		<div class="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm hover:border-amber-200 transition-all">
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Hero Highlights</span>
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
					<Star class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black text-slate-900">{rows.filter((r) => r.isFeatured).length}</span>
				<span class="text-[11px] text-amber-600 font-bold">top stories</span>
			</div>
		</div>
	</div>

	<!-- Workflow Status Segmented Tabs Bar & Role Scope -->
	<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-sm">
		<div class="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
			<button
				type="button"
				class={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
					statusFilter === 'all'
						? 'bg-slate-900 text-white shadow-sm'
						: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
				}`}
				onclick={() => { statusFilter = 'all'; currentPage = 1; }}
			>
				<span>All Posts</span>
				<span class={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusFilter === 'all' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'}`}>
					{rows.length}
				</span>
			</button>

			<button
				type="button"
				class={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
					statusFilter === 'pending'
						? 'bg-amber-500 text-white shadow-sm shadow-amber-500/20'
						: 'text-slate-600 hover:bg-amber-50 hover:text-amber-800'
				}`}
				onclick={() => { statusFilter = 'pending'; currentPage = 1; }}
			>
				<span>Pending Approvals</span>
				{#if pendingPostsCount > 0}
					<span class={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusFilter === 'pending' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800'}`}>
						{pendingPostsCount}
					</span>
				{/if}
			</button>

			<button
				type="button"
				class={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
					statusFilter === 'approved'
						? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
						: 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-800'
				}`}
				onclick={() => { statusFilter = 'approved'; currentPage = 1; }}
			>
				<CheckCircle2 class="h-3.5 w-3.5" />
				<span>Live &amp; Approved</span>
			</button>

			<button
				type="button"
				class={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
					statusFilter === 'rejected'
						? 'bg-rose-600 text-white shadow-sm shadow-rose-600/20'
						: 'text-slate-600 hover:bg-rose-50 hover:text-rose-800'
				}`}
				onclick={() => { statusFilter = 'rejected'; currentPage = 1; }}
			>
				<AlertCircle class="h-3.5 w-3.5" />
				<span>Revision Needed</span>
			</button>
		</div>

		<!-- Role Authority Indicator -->
		<div class="px-2">
			{#if isSuperAdmin}
				<span class="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 border border-purple-200">
					<ShieldCheck class="h-3.5 w-3.5 text-purple-600" />
					Super Admin Authority
				</span>
			{:else if isDeptHead}
				<span class="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-200">
					<Building2 class="h-3.5 w-3.5 text-indigo-600" />
					Dept Head ({userDept})
				</span>
			{:else if isDesigner}
				<span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
					<Palette class="h-3.5 w-3.5 text-emerald-600" />
					Designer ({userDept})
				</span>
			{/if}
		</div>
	</div>

	<!-- Search & Department Filter Toolbar -->
	<div class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
		<div class="flex flex-col sm:flex-row items-center gap-3">
			<!-- Search bar with icon -->
			<div class="relative flex-1 w-full">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
					<Search class="h-4 w-4" />
				</div>
				<input
					type="text"
					placeholder="Search posts by headline, content, department, section, or author…"
					bind:value={searchTerm}
					class="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
				/>
				{#if searchTerm}
					<button
						onclick={() => (searchTerm = '')}
						class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
						aria-label="Clear search"
					>
						<X class="h-3.5 w-3.5" />
					</button>
				{/if}
			</div>

			<!-- Department Filter Dropdown -->
			<div class="w-full sm:w-64">
				<select
					bind:value={deptFilter}
					onchange={() => { activeTab = 'All'; currentPage = 1; }}
					class="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3 text-xs sm:text-sm font-medium text-slate-700 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
				>
					<option value="">All Departments</option>
					{#each allDeptNames as d}
						<option value={d}>{d}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<!-- Section Tabs Carousel Strip -->
	<div class="overflow-x-auto pb-1">
		<div class="flex items-center gap-2 min-w-max">
			<button
				type="button"
				class={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
					activeTab === 'All'
						? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25'
						: 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
				}`}
				onclick={() => switchTab('All')}
			>
				<LayoutGrid class="h-3.5 w-3.5" />
				<span>All Posts</span>
				<span class={`rounded-full px-2 py-0.5 text-[10px] font-bold ${activeTab === 'All' ? 'bg-indigo-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
					{tabCount('All')}
				</span>
			</button>

			{#each deptSections as sec}
				<div class={`inline-flex items-center rounded-xl border transition-all ${
					activeTab === sec.sectionSlug
						? 'border-indigo-600 bg-indigo-50/80 shadow-sm'
						: 'border-slate-200 bg-white hover:border-slate-300'
				}`}>
					<button
						type="button"
						class={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition-colors ${
							activeTab === sec.sectionSlug ? 'text-indigo-900' : 'text-slate-700 hover:text-slate-900'
						}`}
						onclick={() => switchTab(sec.sectionSlug)}
					>
						<Folder class={`h-3.5 w-3.5 ${activeTab === sec.sectionSlug ? 'text-indigo-600' : 'text-slate-400'}`} />
						{#if !deptFilter && sec.department}
							<span class="text-[10px] font-semibold text-slate-400">{sec.department}:</span>
						{/if}
						<span>{sec.label}</span>
						<span class={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
							activeTab === sec.sectionSlug ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
						}`}>
							{tabCount(sec.sectionSlug)}
						</span>
					</button>

					<!-- Customize Section Gear -->
					<button
						type="button"
						class="p-2 text-slate-400 hover:text-indigo-600 transition-colors border-l border-slate-100"
						onclick={() => openEditSection(sec)}
						title={`Customize design for "${sec.label}"`}
					>
						<Sliders class="h-3.5 w-3.5" />
					</button>
				</div>
			{/each}

			<button
				type="button"
				onclick={() => openNewSection(deptFilter)}
				class="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 px-3.5 py-2 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors"
			>
				<Plus class="h-3.5 w-3.5 text-indigo-600" />
				<span>New Section</span>
			</button>
		</div>
	</div>

	<!-- Active Section Info Banner (if a section is active) -->
	{#if activeSection}
		<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 text-xs">
			<div class="flex items-center gap-3">
				<div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
					<Palette class="h-4 w-4" />
				</div>
				<div>
					<div class="font-bold text-slate-900 text-sm flex items-center gap-2">
						<span>Section: <strong>{activeSection.label}</strong></span>
						{#if activeSection.department}
							<span class="text-xs font-semibold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md">
								{activeSection.department}
							</span>
						{/if}
					</div>
					<div class="text-slate-500 flex items-center gap-2 mt-0.5">
						<span>Layout: <strong class="text-slate-700">{activeSection.sectionLayout || 'grid'}</strong></span>
						<span>•</span>
						<span>Card: <strong class="text-slate-700">{activeSection.cardStyle || 'default'}</strong></span>
						{#if activeSection.bgColor}
							<span>•</span>
							<span class="inline-flex items-center gap-1">
								<span>Bg:</span>
								<span class="h-2.5 w-2.5 rounded-full border border-slate-300" style={`background: ${activeSection.bgColor}`}></span>
								<strong class="text-slate-700 font-mono">{activeSection.bgColor}</strong>
							</span>
						{/if}
					</div>
				</div>
			</div>

			<button
				type="button"
				onclick={() => openEditSection(activeSection)}
				class="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-3.5 py-2 font-semibold text-indigo-700 hover:bg-indigo-50 shadow-sm transition-all"
			>
				<Sliders class="h-3.5 w-3.5 text-indigo-600" />
				<span>Customize Section Design</span>
			</button>
		</div>
	{/if}

	<!-- Posts Table Card -->
	<div class="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
		{#if loading}
			<div class="flex flex-col items-center justify-center p-16 text-center text-slate-400">
				<svg class="h-8 w-8 animate-spin text-indigo-600 mb-3" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				<span class="text-xs font-medium">Loading posts database…</span>
			</div>
		{:else if paginatedRows.length === 0}
			<div class="flex flex-col items-center justify-center p-16 text-center">
				<div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
					<Inbox class="h-6 w-6" />
				</div>
				<h3 class="text-sm font-bold text-slate-900">No posts found</h3>
				<p class="text-xs text-slate-500 mt-1 max-w-sm">
					{#if activeTab === 'All'}
						No posts match your current filter criteria{deptFilter ? ` for ${deptFilter}` : ''}.
					{:else}
						No posts in section "<strong>{activeSection?.label ?? activeTab}</strong>" yet.
					{/if}
				</p>
				<div class="flex items-center gap-2 mt-4">
					<button
						type="button"
						class="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
						onclick={openAdd}
					>
						<Plus class="h-4 w-4" />
						<span>{activeTab !== 'All' ? `Add Post to this Section` : '+ Create First Post'}</span>
					</button>
				</div>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left text-xs">
					<thead class="bg-slate-50/90 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 select-none">
						<tr>
							<th class="px-6 py-3.5">Headline &amp; Title</th>
							<th class="px-6 py-3.5">Department</th>
							<th class="px-6 py-3.5">Section</th>
							<th class="px-6 py-3.5">Status &amp; Approval</th>
							<th class="px-6 py-3.5">Content Excerpt</th>
							<th class="px-6 py-3.5 text-center">Media</th>
							<th class="px-6 py-3.5 text-center">Featured Highlight</th>
							<th class="px-6 py-3.5 text-right">Actions</th>
						</tr>
					</thead>

					<tbody class="divide-y divide-slate-100 font-medium text-slate-700">
						{#each paginatedRows as r}
							<tr class="hover:bg-slate-50/70 transition-colors group {r.isFeatured ? 'bg-amber-50/30' : ''}">
								<!-- Headline -->
								<td class="px-6 py-4">
									<div class="flex items-start gap-2.5 max-w-md">
										{#if r.isFeatured}
											<span class="inline-flex items-center gap-1 rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 shrink-0 mt-0.5" title="Active Hero Highlight">
												<Star class="h-3 w-3 fill-amber-500 text-amber-600" />
												Hero
											</span>
										{/if}
										<div class="min-w-0">
											<span class="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
												{r.header || 'Untitled Post'}
											</span>
											{#if r.date_added}
												<span class="block text-[10px] text-slate-400 font-mono mt-0.5">
													{new Date(r.date_added).toLocaleDateString()}
												</span>
											{/if}
										</div>
									</div>
								</td>

								<!-- Department -->
								<td class="px-6 py-4">
									<span class="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100/60">
										{r.department || 'General'}
									</span>
								</td>

								<!-- Section -->
								<td class="px-6 py-4">
									{#if r.sectionLabel}
										<span class="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 border border-purple-100/60">
											<Folder class="h-3 w-3 text-purple-500" />
											{r.sectionLabel}
										</span>
									{:else if r.type}
										<span class="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
											{r.type}
										</span>
									{:else}
										<span class="text-slate-400">—</span>
									{/if}
								</td>

								<!-- Status & Approval Workflow -->
								<td class="px-6 py-4">
									{#if r.status === 'pending'}
										<div class="space-y-1.5">
											<span class="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 border border-amber-200">
												<Clock class="h-3 w-3 text-amber-600" />
												Pending Review
											</span>
											{#if r.submittedBy}
												<span class="block text-[10px] text-slate-400 font-mono">by {r.submittedBy}</span>
											{/if}

											{#if isSuperAdmin || (isDeptHead && (!userDept || userDept.toLowerCase() === r.department?.toLowerCase()))}
												<div class="flex items-center gap-1 pt-1">
													<button
														type="button"
														onclick={() => handlePostApproval(r, 'approve')}
														class="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
														title="Approve post and publish live"
													>
														<Check class="h-3 w-3" />
														Approve
													</button>
													<button
														type="button"
														onclick={() => handlePostApproval(r, 'reject')}
														class="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2 py-1 text-[10px] font-bold text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
														title="Reject post for revisions"
													>
														<X class="h-3 w-3" />
														Reject
													</button>
												</div>
											{/if}
										</div>
									{:else if r.status === 'rejected'}
										<div>
											<span class="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-bold text-rose-700 border border-rose-200">
												<AlertCircle class="h-3 w-3 text-rose-600" />
												Revision Needed
											</span>
											{#if r.rejectedBy}
												<span class="block text-[10px] text-slate-400 font-mono mt-0.5">by {r.rejectedBy}</span>
											{/if}
										</div>
									{:else}
										<div>
											<span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
												<CheckCircle2 class="h-3 w-3 text-emerald-600" />
												Live &amp; Approved
											</span>
											{#if r.approvedBy}
												<span class="block text-[10px] text-slate-400 font-mono mt-0.5">by {r.approvedBy}</span>
											{/if}
										</div>
									{/if}
								</td>

								<!-- Content Excerpt -->
								<td class="px-6 py-4 max-w-xs text-slate-500 line-clamp-2">
									{r.content || '—'}
								</td>

								<!-- Media Count -->
								<td class="px-6 py-4 text-center">
									{#if r.media && r.media.length > 0}
										<span class="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
											<ImageIcon class="h-3 w-3 text-slate-500" />
											<span>{r.media.length}</span>
										</span>
									{:else}
										<span class="text-slate-400">—</span>
									{/if}
								</td>

								<!-- Featured Highlight Toggle -->
								<td class="px-6 py-4 text-center">
									<button
										type="button"
										onclick={() => toggleFeaturedPost(r)}
										class={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
											r.isFeatured
												? 'bg-amber-50 text-amber-800 border border-amber-300 shadow-sm hover:bg-amber-100'
												: 'border border-slate-200 bg-white text-slate-500 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50/40'
										}`}
										title={r.isFeatured ? 'Active Hero Highlight (Click to toggle off)' : 'Click to set as Hero Highlight for this section'}
									>
										<Star class={`h-3.5 w-3.5 ${r.isFeatured ? 'fill-amber-500 text-amber-600' : 'text-slate-400'}`} />
										<span>{r.isFeatured ? 'Hero Post' : 'Set as Hero'}</span>
									</button>
								</td>

								<!-- Actions -->
								<td class="px-6 py-4 text-right">
									<div class="inline-flex items-center justify-end gap-1.5">
										<button
											type="button"
											onclick={() => openEdit(r)}
											class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/70 hover:text-indigo-700 transition-colors"
											title="Edit post"
										>
											<Pencil class="h-3.5 w-3.5" />
											<span>Edit</span>
										</button>
										<button
											type="button"
											onclick={() => removeRow(r.id)}
											class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition-colors"
											title="Delete post"
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

			<!-- Pagination Footer -->
			<div class="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 bg-slate-50/60 px-6 py-4 text-xs text-slate-500">
				<div>
					Showing <span class="font-bold text-slate-900">{filteredRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</span> to <span class="font-bold text-slate-900">{Math.min(currentPage * pageSize, filteredRows.length)}</span> of <span class="font-bold text-slate-900">{filteredRows.length}</span> posts
				</div>

				{#if totalPages > 1}
					<div class="flex items-center gap-1">
						<button
							type="button"
							onclick={() => goToPage(currentPage - 1)}
							disabled={currentPage === 1}
							class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
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
							class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
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

<!-- ========================================================================= -->
<!-- 🎨 WYSIWYG STRUCTURAL CARD BUILDER MODAL                                  -->
<!-- ========================================================================= -->
{#if showModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="vcb-backdrop" onclick={() => (showModal = false)} role="presentation">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="vcb-panel" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
			<!-- Header / Controls Bar -->
			<div class="vcb-header">
				<div>
					<h3 class="vcb-title">{editing ? 'Edit Post & Card Structure' : 'WYSIWYG Visual Card Builder'}</h3>
					<p class="vcb-subtitle">Card elements physically re-arrange based on your chosen layout structure</p>
				</div>
				<button type="button" class="vcb-close" onclick={() => (showModal = false)} aria-label="Close">
					&times;
				</button>
			</div>

			<!-- Department & Section Selector Row -->
			<div class="vcb-config-bar">
				<div class="vcb-config-field">
					<label for="post-dept-sel">Department:</label>
					<select id="post-dept-sel" value={form.department} onchange={handleFormDeptChange} disabled={uploading}>
						{#each allDeptNames as dept}
							<option value={dept}>{dept}</option>
						{/each}
					</select>
				</div>

				<div class="vcb-config-field">
					<label for="post-sec-sel">Section:</label>
					<select id="post-sec-sel" value={form.sectionSlug} onchange={handleSectionSelect} disabled={uploading}>
						<option value="">-- General Post (Default Grid) --</option>
						{#each formDeptSections as sec}
							<option value={sec.sectionSlug}>
								📁 {sec.label} (Layout: {sec.sectionLayout || 'grid'} • Card: {sec.cardStyle || 'default'})
							</option>
						{/each}
					</select>
				</div>

				<button
					type="button"
					class="vcb-quick-sec-btn"
					onclick={() => openNewSection(form.department)}
					title="Create new section"
				>
					+ New Section
				</button>
			</div>

			<!-- Active Section Architecture Details & Featured Highlight Checkbox -->
			<div class="vcb-sec-info-banner">
				{#if form.sectionSlug}
					{@const currentSec = formDeptSections.find((s) => s.sectionSlug === form.sectionSlug)}
					{#if currentSec}
						<div class="vcb-sec-info-left">
							<span>📁 <strong>{currentSec.label}</strong></span>
							<span class="vcb-info-tag">Layout: <strong>{currentSec.sectionLayout || 'grid'}</strong></span>
							<span class="vcb-info-tag">Card: <strong>{currentSec.cardStyle || 'default'}</strong></span>
							<button type="button" class="vcb-info-edit-btn" onclick={() => openEditSection(currentSec)}>
								⚙️ Customize Section
							</button>
						</div>
					{/if}
				{/if}

				<!-- Modal Featured Toggle -->
				<label class="vcb-modal-featured-toggle">
					<input type="checkbox" bind:checked={form.isFeatured} disabled={uploading} />
					<span class="vcb-modal-featured-text">⭐ Set as Featured Hero Highlight for this Section</span>
				</label>
			</div>

			<!-- Live Card Style Themes Bar -->
			<div class="vcb-themes-bar">
				<span class="vcb-themes-label">Card Structure Theme:</span>
				<div class="vcb-themes-pills">
					{#each cardStyles as cs}
						<button
							type="button"
							class="vcb-theme-btn"
							class:active={selectedTheme === cs.id}
							onclick={() => selectThemeDirectly(cs.id)}
							title={cs.desc}
						>
							<span class="vcb-theme-dot" style={`background: ${cs.preview.accent}`}></span>
							{cs.label}
						</button>
					{/each}
				</div>
			</div>

			{#if uploadError}
				<div class="vcb-error-banner">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
					</svg>
					<span>{uploadError}</span>
				</div>
			{/if}

			<!-- Hidden File Input for Image Selection -->
			<input
				type="file"
				multiple
				accept="image/*,video/*"
				bind:this={fileInputEl}
				onchange={handleMediaInput}
				style="display: none;"
				disabled={uploading}
			/>

			<!-- Scrollable Visual Canvas -->
			<div class="vcb-canvas">

				<!-- ═══════════════════════════════════════════════════════════════ -->
				<!-- 1. NEWSPAPER EDITORIAL STRUCTURE (Headline Top, Image Middle, Text Below) -->
				<!-- ═══════════════════════════════════════════════════════════════ -->
				{#if selectedTheme === 'newspaper'}
					<div class="vcb-card-wrapper theme-newspaper">
						<div class="vcb-np-header-bar">
							<span class="vcb-card-tag-np">{form.sectionLabel || form.department || 'OFFICIAL GAZETTE'}</span>
							<span class="vcb-card-date-np">📅 {todayFormatted} • Tanauan Journal</span>
						</div>

						<!-- 1. Headline at the Top -->
						<div class="vcb-np-title-area">
							<input
								type="text"
								class="vcb-input-title-np"
								bind:value={form.header}
								placeholder="Headline at the Top (e.g., MSWDO Accomplishment Report: 5,000 Beneficiaries Aided)…"
								disabled={uploading}
								required
							/>
						</div>

						<p class="vcb-byline-np">Special Report by the Municipal Government of Tanauan — {form.department || 'LGU'}</p>

						<!-- 2. Image in the Middle -->
						<div class="vcb-np-media-zone">
							{#if mediaPreview.length === 0}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<div class="vcb-dropzone np-dropzone" onclick={triggerFileInput} role="button" tabindex="0">
									<div class="vcb-dropzone-icon">📰</div>
									<div class="vcb-dropzone-text">Click to Select Center Feature Photo</div>
									<div class="vcb-dropzone-sub">Image is positioned right here in the middle of the article</div>
								</div>
							{:else}
								<div class="vcb-card-img-container np-img-frame">
									{#if mediaPreview[0].url.includes('mp4') || (mediaPreview[0].file && mediaPreview[0].file.type?.includes('video'))}
										<video src={mediaPreview[0].url} class="vcb-card-img" controls></video>
									{:else}
										<img src={mediaPreview[0].url} alt="Center feature photo" class="vcb-card-img" />
									{/if}
									<div class="vcb-img-overlay">
										<button type="button" class="vcb-img-btn" onclick={triggerFileInput} disabled={uploading}>+ Add Photos</button>
										<button type="button" class="vcb-img-btn-danger" onclick={() => removeMediaItem(0)} disabled={uploading}>Remove Photo</button>
									</div>
								</div>
								{#if mediaPreview.length > 1}
									<div class="vcb-thumb-strip">
										{#each mediaPreview as item, idx}
											<div class="vcb-thumb-box" class:is-cover={idx === 0}>
												<img src={item.url} alt="Thumb" class="vcb-thumb-img" />
												<button type="button" class="vcb-thumb-del" onclick={() => removeMediaItem(idx)} disabled={uploading}>✕</button>
											</div>
										{/each}
										<button type="button" class="vcb-thumb-add" onclick={triggerFileInput} disabled={uploading}>+</button>
									</div>
								{/if}
							{/if}
						</div>

						<!-- 3. Article Text Below Image -->
						<div class="vcb-np-body-area">
							<textarea
								class="vcb-textarea-body-np"
								bind:value={form.content}
								rows="5"
								placeholder="Enter full news article text below the photograph…"
								disabled={uploading}
							></textarea>
						</div>

						<!-- Link Field -->
						<div class="vcb-link-row np-link-row">
							<span class="vcb-link-icon">🔗</span>
							<input type="url" class="vcb-input-link" bind:value={form.link} placeholder="Source / Gazette Link (optional)…" disabled={uploading} />
						</div>
					</div>

				<!-- ═══════════════════════════════════════════════════════════════ -->
				<!-- 2. BOLD MAGAZINE COVER (Full-Bleed Image with Text Overlay)    -->
				<!-- ═══════════════════════════════════════════════════════════════ -->
				{:else if selectedTheme === 'bold'}
					<div class="vcb-card-wrapper theme-bold">
						<div
							class="vcb-bold-canvas"
							style={mediaPreview.length > 0 ? `background-image: url('${mediaPreview[0].url}')` : ''}
						>
							{#if mediaPreview.length === 0}
								<!-- Empty Full-Bleed Dropzone -->
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<div class="vcb-bold-empty-dropzone" onclick={triggerFileInput} role="button" tabindex="0">
									<div class="vcb-dropzone-icon">🌌</div>
									<div class="vcb-dropzone-text">Click to Select Full-Bleed Background Photo</div>
									<div class="vcb-dropzone-sub">Photo will fill the entire card with gradient text overlay</div>
								</div>
							{:else}
								<div class="vcb-bold-top-actions">
									<button type="button" class="vcb-img-btn" onclick={triggerFileInput} disabled={uploading}>🔄 Change Cover</button>
									<button type="button" class="vcb-img-btn-danger" onclick={() => removeMediaItem(0)} disabled={uploading}>✕ Remove</button>
								</div>
							{/if}

							<!-- Floating Gradient Text Overlay inside Image -->
							<div class="vcb-bold-overlay-box">
								<div class="vcb-card-tag-bold">{form.sectionLabel || form.department || 'MAGAZINE FEATURE'}</div>
								<input
									type="text"
									class="vcb-input-title-bold"
									bind:value={form.header}
									placeholder="Big Bold Headline Overlay on Photo…"
									disabled={uploading}
									required
								/>
								<textarea
									class="vcb-textarea-body-bold"
									bind:value={form.content}
									rows="3"
									placeholder="Summary text overlaid on background photo…"
									disabled={uploading}
								></textarea>
								<div class="vcb-bold-footer">
									<span>📅 {todayFormatted} • {form.department || 'Tanauan'}</span>
								</div>
							</div>
						</div>
					</div>

				<!-- ═══════════════════════════════════════════════════════════════ -->
				<!-- 3. POLAROID STRUCTURE (Photo Mount with Handwritten Caption)   -->
				<!-- ═══════════════════════════════════════════════════════════════ -->
				{:else if selectedTheme === 'polaroid'}
					<div class="vcb-card-wrapper theme-polaroid">
						<!-- Square Photo Mount Frame -->
						<div class="vcb-polaroid-mount">
							{#if mediaPreview.length === 0}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<div class="vcb-dropzone polaroid-dropzone" onclick={triggerFileInput} role="button" tabindex="0">
									<div class="vcb-dropzone-icon">📸</div>
									<div class="vcb-dropzone-text">Click to Mount Photo into Polaroid Frame</div>
									<div class="vcb-dropzone-sub">Fits into the classic Polaroid square mount</div>
								</div>
							{:else}
								<div class="vcb-polaroid-photo-frame">
									<img src={mediaPreview[0].url} alt="Polaroid shot" class="vcb-polaroid-img" />
									<div class="vcb-img-overlay">
										<button type="button" class="vcb-img-btn" onclick={triggerFileInput} disabled={uploading}>Change</button>
										<button type="button" class="vcb-img-btn-danger" onclick={() => removeMediaItem(0)} disabled={uploading}>✕</button>
									</div>
								</div>
							{/if}
						</div>

						<!-- Handwritten Caption on bottom margin -->
						<div class="vcb-polaroid-caption-area">
							<span class="vcb-polaroid-tag">📍 {form.sectionLabel || form.department || 'MOMENT'}</span>
							<input
								type="text"
								class="vcb-input-polaroid"
								bind:value={form.header}
								placeholder="Write handwritten title on photo margin (e.g. MSWDO Medical Mission 2025)…"
								disabled={uploading}
								required
							/>
							<textarea
								class="vcb-textarea-polaroid"
								bind:value={form.content}
								rows="2"
								placeholder="Add a handwritten memory description / note…"
								disabled={uploading}
							></textarea>
							<div class="vcb-polaroid-footer">
								<span>~ {todayFormatted} ~</span>
							</div>
						</div>
					</div>

				<!-- ═══════════════════════════════════════════════════════════════ -->
				<!-- 4. FROSTED GLASSMORPHISM STRUCTURE                            -->
				<!-- ═══════════════════════════════════════════════════════════════ -->
				{:else if selectedTheme === 'glass'}
					<div class="vcb-card-wrapper theme-glass">
						<div class="vcb-card-media-zone">
							{#if mediaPreview.length === 0}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<div class="vcb-dropzone glass-dropzone" onclick={triggerFileInput} role="button" tabindex="0">
									<div class="vcb-dropzone-icon">💎</div>
									<div class="vcb-dropzone-text">Select Glassmorphism Photo Banner</div>
								</div>
							{:else}
								<div class="vcb-card-img-container">
									<img src={mediaPreview[0].url} alt="Cover" class="vcb-card-img" />
									<div class="vcb-img-overlay">
										<button type="button" class="vcb-img-btn" onclick={triggerFileInput} disabled={uploading}>+ Add Photos</button>
										<button type="button" class="vcb-img-btn-danger" onclick={() => removeMediaItem(0)} disabled={uploading}>Remove</button>
									</div>
								</div>
							{/if}
						</div>
						<div class="vcb-card-body glass-body">
							<div class="vcb-card-tag-row">
								<span class="vcb-card-tag glass-tag">💎 {form.sectionLabel || form.department || 'GLASS ANNOUNCEMENT'}</span>
							</div>
							<input type="text" class="vcb-input-title" bind:value={form.header} placeholder="Frosted Glass Title…" disabled={uploading} required />
							<textarea class="vcb-textarea-body" bind:value={form.content} rows="4" placeholder="Post content with translucent frosted aesthetics…" disabled={uploading}></textarea>
							<div class="vcb-card-footer">
								<span>📅 {todayFormatted}</span>
								<span>Translucent Glass Edition</span>
							</div>
						</div>
					</div>

				<!-- ═══════════════════════════════════════════════════════════════ -->
				<!-- 5. BORDERLESS MINIMAL STRUCTURE (Typography-First)            -->
				<!-- ═══════════════════════════════════════════════════════════════ -->
				{:else if selectedTheme === 'minimal'}
					<div class="vcb-card-wrapper theme-minimal">
						<div class="vcb-minimal-body">
							<div class="vcb-minimal-top">
								<span class="vcb-minimal-tag">⚡ {form.sectionLabel || form.department || 'OFFICIAL BULLETIN'}</span>
								<span class="vcb-minimal-date">{todayFormatted}</span>
							</div>
							<input type="text" class="vcb-input-minimal-title" bind:value={form.header} placeholder="Advisory Headline…" disabled={uploading} required />
							<textarea class="vcb-textarea-minimal" bind:value={form.content} rows="3" placeholder="Description / key advisory points…" disabled={uploading}></textarea>
							
							<!-- Photo upload attachments strip below text -->
							<div class="vcb-minimal-media">
								{#if mediaPreview.length === 0}
									<button type="button" class="vcb-minimal-upload-btn" onclick={triggerFileInput} disabled={uploading}>
										📷 + Attach Photos (Optional)
									</button>
								{:else}
									<div class="vcb-thumb-strip minimal-strip">
										{#each mediaPreview as item, idx}
											<div class="vcb-thumb-box">
												<img src={item.url} alt="Attached" class="vcb-thumb-img" />
												<button type="button" class="vcb-thumb-del" onclick={() => removeMediaItem(idx)} disabled={uploading}>✕</button>
											</div>
										{/each}
										<button type="button" class="vcb-thumb-add" onclick={triggerFileInput} disabled={uploading}>+</button>
									</div>
								{/if}
							</div>
						</div>
					</div>

				<!-- ═══════════════════════════════════════════════════════════════ -->
				<!-- 6. DEFAULT STANDARD STRUCTURE (Image-Top Modern Card)         -->
				<!-- ═══════════════════════════════════════════════════════════════ -->
				{:else}
					<div class="vcb-card-wrapper theme-default">
						<!-- Photo on top -->
						<div class="vcb-card-media-zone">
							{#if mediaPreview.length === 0}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<div class="vcb-dropzone" onclick={triggerFileInput} role="button" tabindex="0">
									<div class="vcb-dropzone-icon">📷</div>
									<div class="vcb-dropzone-text">Click to Select Cover Photo or Drop Here</div>
									<div class="vcb-dropzone-sub">Photos will be displayed prominently at the top of the card</div>
								</div>
							{:else}
								<div class="vcb-card-img-container">
									{#if mediaPreview[0].url.includes('mp4') || (mediaPreview[0].file && mediaPreview[0].file.type?.includes('video'))}
										<video src={mediaPreview[0].url} class="vcb-card-img" controls></video>
									{:else}
										<img src={mediaPreview[0].url} alt="Cover" class="vcb-card-img" />
									{/if}
									<div class="vcb-img-overlay">
										<button type="button" class="vcb-img-btn" onclick={triggerFileInput} disabled={uploading}>+ Add Photos</button>
										<button type="button" class="vcb-img-btn-danger" onclick={() => removeMediaItem(0)} disabled={uploading}>Remove Cover</button>
									</div>
								</div>
								{#if mediaPreview.length > 1}
									<div class="vcb-thumb-strip">
										{#each mediaPreview as item, idx}
											<div class="vcb-thumb-box" class:is-cover={idx === 0}>
												<img src={item.url} alt="Thumbnail" class="vcb-thumb-img" />
												{#if idx === 0}<span class="vcb-cover-badge">Cover</span>{/if}
												<button type="button" class="vcb-thumb-del" onclick={() => removeMediaItem(idx)} disabled={uploading}>✕</button>
											</div>
										{/each}
										<button type="button" class="vcb-thumb-add" onclick={triggerFileInput} disabled={uploading}>+</button>
									</div>
								{/if}
							{/if}
						</div>

						<div class="vcb-card-body">
							<div class="vcb-card-tag-row">
								<span class="vcb-card-tag">{form.sectionLabel || form.type || form.department || 'GENERAL'}</span>
								{#if form.department}<span class="vcb-card-dept-tag">🏛️ {form.department}</span>{/if}
							</div>
							<input type="text" class="vcb-input-title" bind:value={form.header} placeholder="Post Headline / Title…" disabled={uploading} required />
							<textarea class="vcb-textarea-body" bind:value={form.content} rows="4" placeholder="Write post details, announcement text, or guidelines…" disabled={uploading}></textarea>
							<div class="vcb-link-row">
								<span class="vcb-link-icon">🔗</span>
								<input type="url" class="vcb-input-link" bind:value={form.link} placeholder="Optional external link…" disabled={uploading} />
							</div>
							<div class="vcb-card-footer">
								<span class="vcb-date-preview">📅 {todayFormatted}</span>
								<span class="vcb-lgu-signature">LGU Tanauan Official Publication</span>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Modal Footer Actions -->
			<div class="vcb-footer">
				<div class="vcb-footer-notice">
					{#if isSuperAdmin}
						<span class="notice-badge super">Super Admin: Post will be automatically approved and published live.</span>
					{:else if isDeptHead}
						<span class="notice-badge head">Dept Head: Post will be automatically approved and published live for {userDept}.</span>
					{:else}
						<span class="notice-badge designer">Designated Page Designer: Post will be submitted to Department Head for review.</span>
					{/if}
				</div>
				<div style="display: flex; gap: 8px;">
					<button type="button" class="vcb-btn-cancel" onclick={() => (showModal = false)} disabled={uploading}>
						Cancel
					</button>
					<button type="button" class="vcb-btn-submit" onclick={save} disabled={uploading}>
						{#if uploading}
							<span class="vcb-spinner"></span> Saving…
						{:else if editing}
							Save Changes
						{:else if isSuperAdmin || isDeptHead}
							Publish Post Live
						{:else}
							Submit for Head Approval
						{/if}
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Section Design Picker Drawer -->
<SectionDesignPicker
	open={showDesignPicker}
	section={pickerSection}
	department={deptFilter || form.department || ''}
	onclose={() => (showDesignPicker = false)}
	onsaved={onSectionSaved}
	ondeleted={onSectionDeleted}
/>

<style>
.panel {
	background: #ffffff;
	padding: 1.25rem;
	border-radius: 12px;
	box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
	border: 1px solid #f1f5f9;
}
.panel-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 1.25rem;
	flex-wrap: wrap;
	gap: 1rem;
}
.panel-title-row {
	display: flex;
	align-items: center;
	gap: 1rem;
	flex-wrap: wrap;
}
.panel-heading {
	font-size: 1.25rem;
	font-weight: 800;
	color: #0f172a;
	margin: 0;
	letter-spacing: -0.02em;
}
.dept-filter-wrap {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	background: #f8fafc;
	border: 1.5px solid #e2e8f0;
	border-radius: 10px;
	padding: 0.25rem 0.6rem;
}
.dept-filter-label {
	font-size: 0.78rem;
	font-weight: 700;
	color: #64748b;
	text-transform: uppercase;
	letter-spacing: 0.04em;
}
.dept-select {
	border: none;
	background: transparent;
	font-size: 0.85rem;
	font-weight: 700;
	color: #1e293b;
	cursor: pointer;
	outline: none;
}
.panel-actions {
	display: flex;
	gap: 10px;
	align-items: center;
	flex-wrap: wrap;
}
.search-input {
	padding: 0.5rem 0.85rem;
	border-radius: 8px;
	border: 1.5px solid #e2e8f0;
	font-size: 0.88rem;
	outline: none;
	background: #f8fafc;
	transition: border-color .15s;
}
.search-input:focus {
	border-color: #2563eb;
	background: #fff;
}

/* Tab bar */
.tab-bar-container {
	border-bottom: 2px solid #f1f5f9;
	margin-bottom: 1rem;
	overflow-x: auto;
}
.tab-bar {
	display: flex;
	gap: 6px;
	align-items: center;
	padding-bottom: 0;
	min-width: max-content;
}
.tab-item-group {
	display: flex;
	align-items: center;
	background: #f8fafc;
	border-radius: 8px 8px 0 0;
	border: 1px solid #e2e8f0;
	border-bottom: none;
}
.tab-btn {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 0.55rem 0.9rem;
	border: none;
	background: transparent;
	font-size: 0.85rem;
	font-weight: 700;
	color: #64748b;
	cursor: pointer;
	transition: all .15s;
	white-space: nowrap;
}
.tab-btn:hover {
	color: #0f172a;
}
.tab-btn.active {
	color: #2563eb;
	background: #ffffff;
}
.tab-dept-tag {
	font-size: 0.72rem;
	font-weight: 600;
	color: #94a3b8;
}
.tab-count {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 20px;
	height: 18px;
	padding: 0 5px;
	border-radius: 10px;
	font-size: 0.7rem;
	font-weight: 800;
	background: #e2e8f0;
	color: #64748b;
}
.tab-count.active {
	background: #2563eb;
	color: #ffffff;
}
.tab-gear-mini {
	border: none;
	background: transparent;
	font-size: 0.85rem;
	padding: 0.4rem 0.5rem;
	cursor: pointer;
	opacity: 0.5;
	transition: opacity .15s;
}
.tab-gear-mini:hover {
	opacity: 1;
}
.tab-add {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 0.45rem 0.85rem;
	border: 1.5px dashed #93c5fd;
	background: #eff6ff;
	border-radius: 8px;
	font-size: 0.82rem;
	font-weight: 700;
	color: #1d4ed8;
	cursor: pointer;
	margin-left: 6px;
	transition: all .15s;
}
.tab-add:hover {
	background: #dbeafe;
	border-color: #2563eb;
}

/* Active Section Banner */
.active-section-banner {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: linear-gradient(135deg, #eff6ff, #f8fafc);
	border: 1.5px solid #bfdbfe;
	border-radius: 10px;
	padding: 0.75rem 1rem;
	margin-bottom: 1rem;
	gap: 1rem;
	flex-wrap: wrap;
}
.asb-left {
	display: flex;
	align-items: center;
	gap: 0.75rem;
}
.asb-icon {
	font-size: 1.5rem;
}
.asb-title {
	font-size: 0.92rem;
	color: #1e293b;
}
.asb-dept {
	font-size: 0.8rem;
	color: #64748b;
	font-weight: 500;
}
.asb-meta {
	font-size: 0.78rem;
	color: #64748b;
	margin-top: 2px;
}
.asb-badge {
	font-weight: 700;
	color: #1d4ed8;
	background: #dbeafe;
	padding: 1px 6px;
	border-radius: 4px;
	text-transform: capitalize;
}
.asb-edit-btn {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	background: #2563eb;
	color: #fff;
	padding: 0.45rem 0.85rem;
	border-radius: 8px;
	border: none;
	font-size: 0.82rem;
	font-weight: 700;
	cursor: pointer;
	transition: background .15s;
}
.asb-edit-btn:hover {
	background: #1d4ed8;
}

/* Empty state */
.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	padding: 3.5rem 1rem;
	text-align: center;
}
.empty-icon {
	font-size: 3rem;
	opacity: 0.7;
}
.empty-text {
	font-size: 0.95rem;
	color: #64748b;
	margin: 0;
}
.loading-row {
	padding: 2.5rem;
	text-align: center;
	color: #94a3b8;
	font-size: 0.95rem;
}

/* Buttons */
.btn {
	background: #0f172a;
	color: #ffffff;
	padding: 0.5rem 0.9rem;
	border-radius: 8px;
	border: none;
	cursor: pointer;
	font-size: 0.88rem;
	font-weight: 700;
	display: inline-flex;
	align-items: center;
	gap: 6px;
	transition: background .15s;
	white-space: nowrap;
}
.btn:hover { background: #1e293b; }
.btn-secondary {
	background: #eff6ff;
	color: #1d4ed8;
	border: 1.5px solid #bfdbfe;
	padding: 0.48rem 0.85rem;
	border-radius: 8px;
	cursor: pointer;
	font-size: 0.88rem;
	font-weight: 700;
	display: inline-flex;
	align-items: center;
	gap: 6px;
	transition: all .15s;
	white-space: nowrap;
}
.btn-secondary:hover {
	background: #dbeafe;
	border-color: #2563eb;
}
.btn-small {
	padding: 0.3rem 0.6rem;
	border-radius: 6px;
	cursor: pointer;
	border: 1px solid #e2e8f0;
	background: #f8fafc;
	font-size: 0.8rem;
	font-weight: 600;
	color: #334155;
	transition: all .12s;
}
.btn-small:hover { background: #e2e8f0; }
.btn-danger {
	background: #fef2f2;
	color: #dc2626;
	border: 1px solid #fecaca;
	padding: 0.3rem 0.6rem;
	border-radius: 6px;
	cursor: pointer;
	font-size: 0.8rem;
	font-weight: 600;
	transition: background .15s;
}
.btn-danger:hover { background: #fee2e2; }

/* Table */
.table {
	width: 100%;
	border-collapse: collapse;
}
th, td {
	padding: 0.75rem 0.9rem;
	text-align: left;
	border-bottom: 1px solid #f1f5f9;
	font-size: 0.88rem;
}
th {
	font-weight: 800;
	color: #475569;
	font-size: 0.75rem;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	background: #f8fafc;
}
.row-is-featured {
	background: #fffbeb;
}
.td-header {
	font-weight: 700;
	color: #0f172a;
	max-width: 220px;
}
.row-star-badge {
	margin-right: 4px;
	font-size: 1rem;
}
.td-excerpt {
	color: #64748b;
	max-width: 260px;
}
.actions {
	display: flex;
	gap: 6px;
	white-space: nowrap;
}

/* Featured Radio Toggle */
.td-featured {
	text-align: center;
	white-space: nowrap;
}
.featured-radio-wrap {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	background: #f8fafc;
	border: 1.5px solid #e2e8f0;
	padding: 0.3rem 0.65rem;
	border-radius: 20px;
	cursor: pointer;
	transition: all .15s ease;
	user-select: none;
}
.featured-radio-wrap:hover {
	border-color: #f59e0b;
	background: #fefce8;
}
.featured-radio-wrap.is-active {
	background: #fef3c7;
	border-color: #f59e0b;
	box-shadow: 0 2px 8px rgba(245, 158, 11, 0.25);
}
.featured-radio-disc {
	width: 14px;
	height: 14px;
	border-radius: 50%;
	border: 2px solid #94a3b8;
	background: #ffffff;
	position: relative;
	transition: all .15s ease;
}
.featured-radio-disc.is-checked {
	border-color: #d97706;
	background: #f59e0b;
	box-shadow: inset 0 0 0 2px #ffffff;
}
.featured-radio-text {
	font-size: 0.76rem;
	font-weight: 800;
	color: #475569;
}
.featured-radio-wrap.is-active .featured-radio-text {
	color: #92400e;
}

/* Badges */
.dept-badge {
	display: inline-block;
	font-size: 0.75rem;
	font-weight: 700;
	padding: 0.2rem 0.55rem;
	border-radius: 6px;
	background: #eff6ff;
	color: #1d4ed8;
}
.type-badge {
	display: inline-block;
	font-size: 0.75rem;
	font-weight: 700;
	padding: 0.2rem 0.55rem;
	border-radius: 6px;
	background: #f0fdf4;
	color: #166534;
	text-transform: capitalize;
}
.section-badge {
	display: inline-block;
	font-size: 0.75rem;
	font-weight: 700;
	padding: 0.2rem 0.55rem;
	border-radius: 6px;
	background: #faf5ff;
	color: #7e22ce;
	border: 1px solid #f3e8ff;
}
.media-count-badge {
	font-size: 0.75rem;
	font-weight: 700;
	padding: 0.2rem 0.5rem;
	border-radius: 6px;
	background: #f8fafc;
	border: 1px solid #e2e8f0;
	color: #475569;
}
.muted-badge {
	font-size: 0.75rem;
	color: #94a3b8;
}

/* Pagination */
.pagination {
	margin-top: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	font-size: 0.88rem;
	color: #64748b;
}

/* ========================================================================= */
/* 🎨 WYSIWYG STRUCTURAL CARD BUILDER MODAL STYLES                           */
/* ========================================================================= */
.vcb-backdrop {
	position: fixed;
	inset: 0;
	background: rgba(15, 23, 42, 0.75);
	backdrop-filter: blur(8px);
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	animation: vcbFade .2s ease-out;
}
@keyframes vcbFade { from { opacity: 0; } to { opacity: 1; } }

.vcb-panel {
	background: #ffffff;
	border-radius: 18px;
	width: 100%;
	max-width: 820px;
	max-height: 94vh;
	display: flex;
	flex-direction: column;
	box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
	overflow: hidden;
	border: 1px solid #e2e8f0;
	animation: vcbPop .25s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes vcbPop {
	from { transform: scale(0.96) translateY(12px); opacity: 0; }
	to { transform: scale(1) translateY(0); opacity: 1; }
}

.vcb-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding: 1.2rem 1.75rem 0.9rem;
	border-bottom: 1px solid #f1f5f9;
	background: #f8fafc;
}
.vcb-title {
	font-size: 1.25rem;
	font-weight: 800;
	color: #0f172a;
	margin: 0;
	letter-spacing: -0.01em;
}
.vcb-subtitle {
	font-size: 0.82rem;
	color: #64748b;
	margin: 0.2rem 0 0;
}
.vcb-close {
	background: #ffffff;
	border: 1px solid #e2e8f0;
	width: 34px;
	height: 34px;
	border-radius: 10px;
	font-size: 1.5rem;
	line-height: 1;
	color: #64748b;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all .15s;
}
.vcb-close:hover {
	background: #fee2e2;
	color: #ef4444;
	border-color: #fca5a5;
}

/* Config bar */
.vcb-config-bar {
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 0.65rem 1.75rem;
	background: #ffffff;
	border-bottom: 1px solid #f1f5f9;
	flex-wrap: wrap;
}
.vcb-config-field {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
.vcb-config-field label {
	font-size: 0.8rem;
	font-weight: 700;
	color: #475569;
}
.vcb-config-field select {
	padding: 0.35rem 0.65rem;
	border-radius: 8px;
	border: 1.5px solid #cbd5e1;
	font-size: 0.85rem;
	font-weight: 600;
	color: #1e293b;
	background: #f8fafc;
	outline: none;
}
.vcb-config-field select:focus {
	border-color: #2563eb;
	background: #fff;
}
.vcb-quick-sec-btn {
	background: none;
	border: 1px dashed #3b82f6;
	color: #2563eb;
	font-size: 0.78rem;
	font-weight: 700;
	padding: 0.3rem 0.65rem;
	border-radius: 6px;
	cursor: pointer;
	margin-left: auto;
	transition: background .15s;
}
.vcb-quick-sec-btn:hover {
	background: #eff6ff;
}

/* Active Section Info Banner */
.vcb-sec-info-banner {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: linear-gradient(135deg, #eff6ff, #f0fdf4);
	border-bottom: 1.5px solid #bfdbfe;
	padding: 0.55rem 1.75rem;
	gap: 1rem;
	flex-wrap: wrap;
	font-size: 0.82rem;
	color: #1e293b;
}
.vcb-sec-info-left {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	flex-wrap: wrap;
}
.vcb-info-tag {
	background: #ffffff;
	border: 1px solid #cbd5e1;
	padding: 2px 7px;
	border-radius: 6px;
	font-size: 0.76rem;
	color: #475569;
}
.vcb-info-tag strong {
	color: #1d4ed8;
	text-transform: capitalize;
}
.vcb-info-edit-btn {
	background: #2563eb;
	color: #ffffff;
	border: none;
	padding: 0.3rem 0.65rem;
	border-radius: 6px;
	font-size: 0.76rem;
	font-weight: 700;
	cursor: pointer;
	transition: background .15s;
}
.vcb-info-edit-btn:hover { background: #1d4ed8; }

.vcb-modal-featured-toggle {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	cursor: pointer;
	font-size: 0.8rem;
	font-weight: 700;
	color: #92400e;
	background: #fef3c7;
	padding: 0.3rem 0.7rem;
	border-radius: 8px;
	border: 1px solid #fde68a;
	margin-left: auto;
}

/* Themes Bar */
.vcb-themes-bar {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: 0.65rem 1.75rem;
	background: #f8fafc;
	border-bottom: 1.5px solid #e2e8f0;
	overflow-x: auto;
}
.vcb-themes-label {
	font-size: 0.75rem;
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: #64748b;
	white-space: nowrap;
}
.vcb-themes-pills {
	display: flex;
	gap: 6px;
	flex-wrap: nowrap;
}
.vcb-theme-btn {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 0.35rem 0.75rem;
	border-radius: 20px;
	border: 1.5px solid #cbd5e1;
	background: #ffffff;
	font-size: 0.78rem;
	font-weight: 700;
	color: #475569;
	cursor: pointer;
	transition: all .15s;
	white-space: nowrap;
}
.vcb-theme-btn:hover {
	border-color: #2563eb;
	color: #1e293b;
}
.vcb-theme-btn.active {
	background: #1e293b;
	color: #ffffff;
	border-color: #1e293b;
	box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.vcb-theme-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	display: inline-block;
}

.vcb-error-banner {
	display: flex;
	align-items: center;
	gap: 0.6rem;
	background: #fef2f2;
	border-bottom: 1px solid #fecaca;
	color: #dc2626;
	padding: 0.65rem 1.75rem;
	font-size: 0.88rem;
	font-weight: 600;
}

/* Canvas Area */
.vcb-canvas {
	flex: 1;
	overflow-y: auto;
	padding: 1.5rem 1.75rem;
	background: #f1f5f9;
}

/* Base Card Wrapper */
.vcb-card-wrapper {
	background: #ffffff;
	border-radius: 14px;
	border: 1.5px solid #e2e8f0;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
	overflow: hidden;
	transition: all .25s ease;
	max-width: 620px;
	margin: 0 auto;
}

/* ═════════════════════════════════════════════════════════════════════════ */
/* 📰 1. NEWSPAPER EDITORIAL STYLES                                          */
/* ═════════════════════════════════════════════════════════════════════════ */
.theme-newspaper {
	background: #fdfbf7;
	border: 1.5px solid #d6d3d1;
	border-top: 5px solid #1c1917;
	border-radius: 2px;
	padding: 1.25rem;
	box-shadow: 4px 4px 0 #d6d3d1;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}
.vcb-np-header-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #d6d3d1;
	padding-bottom: 4px;
}
.vcb-card-tag-np {
	font-size: 11px;
	font-weight: 900;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: #78350f;
	font-family: sans-serif;
}
.vcb-card-date-np {
	font-size: 11px;
	color: #78716c;
	font-style: italic;
}
.vcb-input-title-np {
	width: 100%;
	font-family: 'Times New Roman', Georgia, serif;
	font-size: 1.45rem;
	font-weight: 900;
	color: #1c1917;
	line-height: 1.25;
	border: 1px dashed transparent;
	padding: 4px;
	outline: none;
	background: transparent;
	box-sizing: border-box;
}
.vcb-input-title-np:hover { border-color: #a8a29e; background: #fefce8; }
.vcb-input-title-np:focus { border-color: #1c1917; background: #fff; }
.vcb-byline-np {
	font-size: 0.78rem;
	font-style: italic;
	color: #78716c;
	margin: 0;
}
.np-media {
	width: 100%;
}
.np-dropzone {
	background: #f5f1e8;
	border: 2px dashed #a8a29e;
	border-radius: 0;
	padding: 2rem 1rem;
}
.np-img-frame {
	height: 220px;
	border: 1px solid #a8a29e;
}
.vcb-textarea-body-np {
	width: 100%;
	font-family: Georgia, 'Times New Roman', serif;
	font-size: 0.95rem;
	line-height: 1.65;
	color: #292524;
	border: 1px dashed transparent;
	padding: 6px;
	outline: none;
	background: transparent;
	resize: vertical;
	box-sizing: border-box;
}
.vcb-textarea-body-np:hover { border-color: #a8a29e; background: #fefce8; }
.vcb-textarea-body-np:focus { border-color: #1c1917; background: #fff; }
.np-link-row {
	border-top: 1px dashed #d6d3d1;
	padding-top: 6px;
}

/* ═════════════════════════════════════════════════════════════════════════ */
/* 🌌 2. BOLD MAGAZINE COVER STYLES                                          */
/* ═════════════════════════════════════════════════════════════════════════ */
.theme-bold {
	background: #0f172a;
	border: 2px solid #334155;
	border-radius: 14px;
	box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
	overflow: hidden;
}
.vcb-bold-canvas {
	min-height: 380px;
	background-color: #0f172a;
	background-size: cover;
	background-position: center;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.vcb-bold-empty-dropzone {
	border: 2.5px dashed #475569;
	border-radius: 12px;
	margin: 1.5rem;
	padding: 3rem 1.5rem;
	text-align: center;
	background: rgba(15, 23, 42, 0.8);
	color: #f8fafc;
	cursor: pointer;
	transition: all .2s;
}
.vcb-bold-empty-dropzone:hover {
	border-color: #f59e0b;
	background: rgba(30, 41, 59, 0.9);
}
.vcb-bold-empty-dropzone .vcb-dropzone-text {
	color: #f8fafc;
	font-size: 1.1rem;
	font-weight: 800;
}
.vcb-bold-empty-dropzone .vcb-dropzone-sub {
	color: #94a3b8;
	font-size: 0.85rem;
}
.vcb-bold-top-actions {
	padding: 10px;
	display: flex;
	justify-content: flex-end;
	gap: 6px;
}
.vcb-bold-overlay-box {
	background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 70%, transparent 100%);
	padding: 1.5rem 1.5rem 1.25rem;
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
}
.vcb-card-tag-bold {
	font-size: 11px;
	font-weight: 900;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: #f59e0b;
	background: rgba(245, 158, 11, 0.2);
	padding: 3px 8px;
	border-radius: 4px;
	width: fit-content;
}
.vcb-input-title-bold {
	width: 100%;
	font-size: 1.35rem;
	font-weight: 900;
	color: #ffffff;
	border: 1px dashed transparent;
	padding: 4px 6px;
	outline: none;
	background: transparent;
	box-sizing: border-box;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
}
.vcb-input-title-bold:hover { border-color: #f59e0b; background: rgba(0, 0, 0, 0.4); }
.vcb-input-title-bold:focus { border-color: #f59e0b; background: rgba(15, 23, 42, 0.8); }
.vcb-textarea-body-bold {
	width: 100%;
	font-size: 0.9rem;
	color: #cbd5e1;
	line-height: 1.45;
	border: 1px dashed transparent;
	padding: 4px 6px;
	outline: none;
	background: transparent;
	resize: vertical;
	box-sizing: border-box;
}
.vcb-textarea-body-bold:hover { border-color: #f59e0b; background: rgba(0, 0, 0, 0.4); }
.vcb-textarea-body-bold:focus { border-color: #f59e0b; background: rgba(15, 23, 42, 0.8); }
.vcb-bold-footer {
	font-size: 0.75rem;
	color: #94a3b8;
	padding-top: 4px;
}

/* ═════════════════════════════════════════════════════════════════════════ */
/* 📸 3. POLAROID STYLES                                                     */
/* ═════════════════════════════════════════════════════════════════════════ */
.theme-polaroid {
	background: #ffffff;
	border: 1px solid #e5e7eb;
	border-radius: 4px;
	padding: 14px 14px 22px 14px;
	box-shadow: 0 16px 36px rgba(0, 0, 0, 0.15);
	transform: rotate(-0.5deg);
	display: flex;
	flex-direction: column;
	gap: 12px;
}
.vcb-polaroid-mount {
	width: 100%;
	background: #1e293b;
	border: 1px solid #e5e7eb;
}
.polaroid-dropzone {
	height: 240px;
	background: #f8fafc;
	margin: 0;
	border: 2px dashed #cbd5e1;
	border-radius: 0;
}
.vcb-polaroid-photo-frame {
	position: relative;
	width: 100%;
	height: 240px;
}
.vcb-polaroid-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.vcb-polaroid-caption-area {
	display: flex;
	flex-direction: column;
	gap: 6px;
	padding: 0 4px;
}
.vcb-polaroid-tag {
	font-size: 10px;
	font-weight: 700;
	text-transform: uppercase;
	color: #6b7280;
}
.vcb-input-polaroid {
	width: 100%;
	font-family: 'Caveat', 'Segoe Print', cursive, sans-serif;
	font-size: 1.45rem;
	font-weight: 700;
	color: #1f2937;
	border: 1px dashed transparent;
	padding: 4px;
	outline: none;
	background: transparent;
	box-sizing: border-box;
}
.vcb-input-polaroid:hover { border-color: #94a3b8; background: #f9fafb; }
.vcb-input-polaroid:focus { border-color: #3b82f6; background: #fff; }
.vcb-textarea-polaroid {
	width: 100%;
	font-family: 'Caveat', 'Segoe Print', cursive, sans-serif;
	font-size: 1.15rem;
	color: #4b5563;
	border: 1px dashed transparent;
	padding: 4px;
	outline: none;
	background: transparent;
	resize: vertical;
	box-sizing: border-box;
}
.vcb-textarea-polaroid:hover { border-color: #94a3b8; background: #f9fafb; }
.vcb-textarea-polaroid:focus { border-color: #3b82f6; background: #fff; }
.vcb-polaroid-footer {
	text-align: right;
	font-size: 0.85rem;
	color: #9ca3af;
	font-family: 'Caveat', 'Segoe Print', cursive, sans-serif;
}

/* ═════════════════════════════════════════════════════════════════════════ */
/* ⚡ 4. MINIMAL BORDERLESS STYLES                                            */
/* ═════════════════════════════════════════════════════════════════════════ */
.theme-minimal {
	background: #ffffff;
	border: 1px solid #e2e8f0;
	border-left: 6px solid #6366f1;
	border-radius: 4px;
	box-shadow: 0 4px 16px rgba(0,0,0,0.04);
}
.vcb-minimal-body {
	padding: 1.25rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}
.vcb-minimal-top {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.vcb-minimal-tag {
	font-size: 10px;
	font-weight: 800;
	color: #6366f1;
	text-transform: uppercase;
	letter-spacing: 0.05em;
}
.vcb-minimal-date {
	font-size: 0.75rem;
	color: #94a3b8;
}
.vcb-input-minimal-title {
	width: 100%;
	font-size: 1.25rem;
	font-weight: 800;
	color: #0f172a;
	border: 1.5px solid transparent;
	padding: 4px 6px;
	outline: none;
	background: transparent;
	box-sizing: border-box;
}
.vcb-input-minimal-title:hover { border-color: #e2e8f0; background: #f8fafc; }
.vcb-input-minimal-title:focus { border-color: #6366f1; background: #fff; }
.vcb-textarea-minimal {
	width: 100%;
	font-size: 0.92rem;
	color: #475569;
	line-height: 1.5;
	border: 1.5px solid transparent;
	padding: 4px 6px;
	outline: none;
	background: transparent;
	resize: vertical;
	box-sizing: border-box;
}
.vcb-textarea-minimal:hover { border-color: #e2e8f0; background: #f8fafc; }
.vcb-textarea-minimal:focus { border-color: #6366f1; background: #fff; }
.vcb-minimal-upload-btn {
	background: #f8fafc;
	border: 1.5px dashed #cbd5e1;
	color: #6366f1;
	font-weight: 700;
	padding: 0.5rem 1rem;
	border-radius: 8px;
	cursor: pointer;
	font-size: 0.85rem;
	transition: all .15s;
}
.vcb-minimal-upload-btn:hover { background: #eff6ff; border-color: #6366f1; }

/* ═════════════════════════════════════════════════════════════════════════ */
/* 💎 5. GLASSMORPHISM STYLES                                                */
/* ═════════════════════════════════════════════════════════════════════════ */
.theme-glass {
	background: rgba(255, 255, 255, 0.75);
	backdrop-filter: blur(20px);
	-webkit-backdrop-filter: blur(20px);
	border: 2px solid rgba(255, 255, 255, 0.9);
	box-shadow: 0 16px 40px rgba(37, 99, 235, 0.18);
	border-radius: 18px;
}
.glass-body {
	padding: 1.25rem 1.5rem;
}
.glass-tag {
	background: rgba(59, 130, 246, 0.2);
	color: #1d4ed8;
}

/* ═════════════════════════════════════════════════════════════════════════ */
/* 📷 6. STANDARD CARD STYLES                                                */
/* ═════════════════════════════════════════════════════════════════════════ */
.vcb-card-media-zone {
	width: 100%;
	position: relative;
	overflow: hidden;
}
.vcb-dropzone {
	border: 2.5px dashed #94a3b8;
	border-radius: 12px;
	margin: 12px;
	padding: 2.5rem 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	background: rgba(248, 250, 252, 0.8);
	cursor: pointer;
	transition: all .2s ease;
}
.vcb-dropzone:hover {
	border-color: #2563eb;
	background: #eff6ff;
	transform: scale(0.995);
}
.vcb-dropzone-icon {
	font-size: 2.75rem;
	margin-bottom: 0.5rem;
}
.vcb-dropzone-text {
	font-size: 0.98rem;
	font-weight: 800;
	color: #1e293b;
}
.vcb-dropzone-sub {
	font-size: 0.78rem;
	color: #64748b;
	margin-top: 0.2rem;
}

/* Attached Image Container */
.vcb-card-img-container {
	position: relative;
	width: 100%;
	height: 240px;
	background: #0f172a;
	overflow: hidden;
}
.vcb-card-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.vcb-img-overlay {
	position: absolute;
	bottom: 10px;
	right: 10px;
	display: flex;
	gap: 6px;
}
.vcb-img-btn {
	background: rgba(15, 23, 42, 0.85);
	color: #ffffff;
	border: 1px solid rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(4px);
	padding: 0.4rem 0.75rem;
	border-radius: 8px;
	font-size: 0.78rem;
	font-weight: 700;
	cursor: pointer;
	transition: background .15s;
}
.vcb-img-btn:hover { background: #2563eb; }
.vcb-img-btn-danger {
	background: rgba(220, 38, 38, 0.85);
	color: #ffffff;
	border: none;
	backdrop-filter: blur(4px);
	padding: 0.4rem 0.75rem;
	border-radius: 8px;
	font-size: 0.78rem;
	font-weight: 700;
	cursor: pointer;
	transition: background .15s;
}
.vcb-img-btn-danger:hover { background: #b91c1c; }

/* Thumbnail Strip */
.vcb-thumb-strip {
	display: flex;
	gap: 8px;
	padding: 8px 12px;
	background: #f1f5f9;
	overflow-x: auto;
	border-bottom: 1px solid #e2e8f0;
}
.vcb-thumb-box {
	position: relative;
	width: 64px;
	height: 52px;
	border-radius: 6px;
	overflow: hidden;
	border: 2px solid #cbd5e1;
	flex-shrink: 0;
}
.vcb-thumb-box.is-cover {
	border-color: #2563eb;
}
.vcb-thumb-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.vcb-cover-badge {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background: #2563eb;
	color: #fff;
	font-size: 8px;
	font-weight: 800;
	text-align: center;
	text-transform: uppercase;
}
.vcb-thumb-del {
	position: absolute;
	top: 2px;
	right: 2px;
	background: rgba(0,0,0,.7);
	color: #fff;
	border: none;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	font-size: 9px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}
.vcb-thumb-add {
	width: 44px;
	height: 52px;
	border: 1.5px dashed #94a3b8;
	border-radius: 6px;
	background: #fff;
	color: #64748b;
	font-size: 1.25rem;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	flex-shrink: 0;
}
.vcb-thumb-add:hover {
	border-color: #2563eb;
	color: #2563eb;
}

/* Card Body Inputs */
.vcb-card-body {
	padding: 1.25rem 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.9rem;
}
.vcb-card-tag-row {
	display: flex;
	align-items: center;
	gap: 8px;
}
.vcb-card-tag {
	font-size: 11px;
	font-weight: 800;
	letter-spacing: 0.07em;
	text-transform: uppercase;
	color: #2563eb;
	background: #eff6ff;
	padding: 2px 8px;
	border-radius: 6px;
}
.vcb-card-dept-tag {
	font-size: 11px;
	font-weight: 700;
	color: #64748b;
}

/* Inputs on the card */
.vcb-input-title {
	width: 100%;
	font-size: 1.25rem;
	font-weight: 800;
	color: #0f172a;
	border: 1.5px solid transparent;
	border-radius: 8px;
	padding: 0.4rem 0.5rem;
	outline: none;
	background: transparent;
	box-sizing: border-box;
	transition: all .15s;
}
.vcb-input-title:hover {
	border-color: #e2e8f0;
	background: rgba(248, 250, 252, 0.8);
}
.vcb-input-title:focus {
	border-color: #2563eb;
	background: #ffffff;
	box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.vcb-textarea-body {
	width: 100%;
	font-size: 0.92rem;
	line-height: 1.55;
	color: #334155;
	border: 1.5px solid transparent;
	border-radius: 8px;
	padding: 0.5rem 0.5rem;
	outline: none;
	background: transparent;
	resize: vertical;
	box-sizing: border-box;
	transition: all .15s;
	font-family: inherit;
}
.vcb-textarea-body:hover {
	border-color: #e2e8f0;
	background: rgba(248, 250, 252, 0.8);
}
.vcb-textarea-body:focus {
	border-color: #2563eb;
	background: #ffffff;
	box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

/* Link Row */
.vcb-link-row {
	display: flex;
	align-items: center;
	gap: 6px;
	background: #f8fafc;
	border: 1px solid #e2e8f0;
	border-radius: 8px;
	padding: 0.35rem 0.65rem;
}
.vcb-link-icon {
	font-size: 0.9rem;
}
.vcb-input-link {
	border: none;
	background: transparent;
	font-size: 0.85rem;
	color: #2563eb;
	outline: none;
	width: 100%;
}

/* Card Meta Footer */
.vcb-card-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 0.78rem;
	color: #94a3b8;
	padding-top: 0.5rem;
	border-top: 1px dashed #e2e8f0;
}
.vcb-date-preview {
	font-weight: 600;
}
.vcb-lgu-signature {
	font-size: 0.72rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	color: #cbd5e1;
}

/* Modal Bottom Actions */
.vcb-footer {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 0.75rem;
	padding: 1.1rem 1.75rem;
	border-top: 1px solid #f1f5f9;
	background: #f8fafc;
}
.vcb-btn-cancel {
	padding: 0.6rem 1.1rem;
	background: #ffffff;
	color: #475569;
	font-weight: 700;
	border: 1.5px solid #cbd5e1;
	border-radius: 10px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: background .15s;
}
.vcb-btn-cancel:hover:not(:disabled) { background: #f1f5f9; }
.vcb-btn-submit {
	padding: 0.65rem 1.5rem;
	background: #2563eb;
	color: #ffffff;
	font-weight: 800;
	border: none;
	border-radius: 10px;
	cursor: pointer;
	font-size: 0.95rem;
	display: inline-flex;
	align-items: center;
	gap: 6px;
	transition: background .15s;
	box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}
.vcb-btn-submit:hover:not(:disabled) { background: #1d4ed8; }
.vcb-btn-submit:disabled, .vcb-btn-cancel:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}
.vcb-spinner {
	width: 14px;
	height: 14px;
	border: 2px solid #ffffff;
	border-top-color: transparent;
	border-radius: 50%;
	display: inline-block;
	animation: vcbSpin 0.6s linear infinite;
}
@keyframes vcbSpin { to { transform: rotate(360deg); } }

/* Workflow & Approval Bar */
.approval-filter-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: #ffffff;
	border: 1.5px solid #e2e8f0;
	border-radius: 10px;
	padding: 0.5rem 0.85rem;
	margin-bottom: 1rem;
	flex-wrap: wrap;
	gap: 0.75rem;
}
.status-tabs-group {
	display: flex;
	align-items: center;
	gap: 6px;
	flex-wrap: wrap;
}
.status-tab-btn {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 0.4rem 0.75rem;
	border-radius: 8px;
	font-size: 0.82rem;
	font-weight: 700;
	background: #f8fafc;
	border: 1px solid #e2e8f0;
	color: #475569;
	cursor: pointer;
	transition: all .15s;
}
.status-tab-btn:hover {
	background: #f1f5f9;
	color: #0f172a;
}
.status-tab-btn.active {
	background: #0f172a;
	color: #ffffff;
	border-color: #0f172a;
}
.status-tab-btn.pending.active {
	background: #d97706;
	color: #ffffff;
	border-color: #d97706;
}
.status-tab-badge {
	font-size: 0.72rem;
	font-weight: 800;
	background: rgba(0,0,0,0.08);
	padding: 1px 6px;
	border-radius: 10px;
}
.status-tab-btn.active .status-tab-badge {
	background: rgba(255,255,255,0.25);
	color: #ffffff;
}
.pending-badge {
	background: #fef08a;
	color: #854d0e;
}

.role-scope-indicator {
	display: flex;
	align-items: center;
	gap: 8px;
}
.role-scope-desc {
	font-size: 0.78rem;
	color: #64748b;
	font-weight: 600;
}

/* Status Column & Pills */
.status-cell-wrap {
	display: flex;
	flex-direction: column;
	gap: 4px;
}
.status-pill {
	display: inline-flex;
	align-items: center;
	padding: 2px 8px;
	border-radius: 6px;
	font-size: 0.74rem;
	font-weight: 800;
	width: fit-content;
}
.status-pill.approved { background: #dcfce7; color: #15803d; }
.status-pill.pending { background: #fef3c7; color: #b45309; }
.status-pill.rejected { background: #fee2e2; color: #b91c1c; }

.submitted-by-tag {
	font-size: 0.7rem;
	color: #64748b;
	font-weight: 600;
}

.approval-actions-row {
	display: flex;
	gap: 4px;
	margin-top: 4px;
}
.btn-quick-approve {
	background: #15803d;
	color: #ffffff;
	border: none;
	padding: 2px 6px;
	border-radius: 4px;
	font-size: 0.72rem;
	font-weight: 700;
	cursor: pointer;
	transition: background .12s;
}
.btn-quick-approve:hover { background: #166534; }
.btn-quick-reject {
	background: #dc2626;
	color: #ffffff;
	border: none;
	padding: 2px 6px;
	border-radius: 4px;
	font-size: 0.72rem;
	font-weight: 700;
	cursor: pointer;
	transition: background .12s;
}
.btn-quick-reject:hover { background: #b91c1c; }

.notice-badge {
	font-size: 0.78rem;
	font-weight: 700;
	padding: 4px 10px;
	border-radius: 6px;
}
.notice-badge.super { background: #fef9c3; color: #854d0e; }
.notice-badge.head { background: #eff6ff; color: #1e40af; }
.notice-badge.designer { background: #ecfdf5; color: #065f46; }

.portal-badge {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	font-size: 0.76rem;
	font-weight: 800;
	padding: 3px 8px;
	border-radius: 6px;
}
.portal-badge.super { background: #fef08a; color: #854d0e; }
.portal-badge.head { background: #dbeafe; color: #1e40af; }
.portal-badge.designer { background: #d1fae5; color: #065f46; }
.portal-badge.staff { background: #f1f5f9; color: #475569; }

.vcb-footer-notice {
	margin-right: auto;
}
</style>
