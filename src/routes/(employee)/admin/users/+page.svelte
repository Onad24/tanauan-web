<script>
	import Modal from '$lib/Modal.svelte';
	import { uploadUserPortrait, deleteSupabaseFile } from '$lib/firebaseStorage';
	import { roles, departments, officesByDepartment, portalRoles } from '$lib/config';
	import {
		Search,
		UserPlus,
		Users,
		Palette,
		Building2,
		ShieldCheck,
		Pencil,
		Trash2,
		Check,
		CheckCircle2,
		X,
		ChevronLeft,
		ChevronRight,
		Filter,
		Sparkles,
		Mail,
		Briefcase,
		Camera,
		AlertCircle,
		UserCheck,
		User,
		ArrowUpDown
	} from 'lucide-svelte';

	let { data } = $props();
	let rows = $state([]);
	$effect(() => {
		rows = data.users || [];
	});
	let currentUser = $derived(data.currentUser || {});
	let isSuperAdmin = $derived(currentUser?.isSuperAdmin ?? false);
	let isDeptHead = $derived(currentUser?.isDeptHead ?? false);
	let userDept = $derived(currentUser?.department ?? '');

	let loading = $state(false);
	let showModal = $state(false);
	let editing = $state(null);
	let error = $state('');
	let uploading = $state(false);
	let portraitPreview = $state(null);
	let selectedDepartment = $state('');
	let deptRoles = $state([]);

	let form = $state({
		name: '',
		email: '',
		role: '',           // Employment Position (e.g. Clerk I, Budget Officer)
		portalRole: 'staff', // Portal Permission: 'department head' | 'page designer' | 'staff' | 'super admin'
		department: '',
		office: '',
		sb_member: '',
		active: true,
		portrait: ''
	});

	// Filters & Search
	let searchTerm = $state('');
	let filterDepartment = $state('');
	let filterRole = $state('');
	let currentPage = $state(1);
	const pageSize = 10;

	// Telemetry stats
	let totalCount = $derived(rows.length);
	let designersCount = $derived(rows.filter((r) => r.portalRole === 'page designer').length);
	let deptHeadsCount = $derived(rows.filter((r) => r.portalRole === 'department head').length);
	let activeCount = $derived(rows.filter((r) => r.active !== false).length);

	// Filtered available portal roles based on logged-in user permissions
	let availablePortalRoles = $derived(
		isSuperAdmin
			? portalRoles
			: portalRoles.filter((pr) => pr.id !== 'super admin')
	);

	// Multi-criteria filter
	let filteredRows = $derived.by(() => {
		let result = rows;
		if (filterDepartment) {
			result = result.filter((r) => r.department?.toLowerCase() === filterDepartment.toLowerCase());
		}
		if (filterRole) {
			result = result.filter((r) => r.portalRole === filterRole);
		}
		if (searchTerm.trim()) {
			const lower = searchTerm.toLowerCase();
			result = result.filter(
				(r) =>
					r.name?.toLowerCase().includes(lower) ||
					r.email?.toLowerCase().includes(lower) ||
					r.role?.toLowerCase().includes(lower) ||
					r.portalRole?.toLowerCase().includes(lower) ||
					r.department?.toLowerCase().includes(lower)
			);
		}
		return result;
	});

	let totalPages = $derived(Math.ceil(filteredRows.length / pageSize) || 1);
	let paginatedRows = $derived(filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize));
	let startEntry = $derived(filteredRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1);
	let endEntry = $derived(Math.min(currentPage * pageSize, filteredRows.length));

	function goToPage(p) {
		if (p < 1 || p > totalPages) return;
		currentPage = p;
	}

	function handleDepartmentChange(dept) {
		deptRoles = departments.find((d) => d.name === dept)?.roles || [];
		selectedDepartment = dept;
		form.department = dept;
		form.office = '';
	}

	function openAdd() {
		editing = null;
		const defaultDept = !isSuperAdmin && userDept ? userDept : '';
		form = {
			name: '',
			email: '',
			role: '',
			portalRole: 'staff',
			department: defaultDept,
			office: '',
			sb_member: '',
			active: true,
			portrait: ''
		};
		portraitPreview = null;
		selectedDepartment = defaultDept;
		deptRoles = defaultDept ? (departments.find((d) => d.name === defaultDept)?.roles || []) : [];
		error = '';
		showModal = true;
	}

	function openEdit(r) {
		editing = r;
		form = {
			name: r.name || '',
			email: r.email || '',
			role: r.role || '',
			portalRole: r.portalRole || (r.role?.toLowerCase() === 'super admin' ? 'super admin' : 'staff'),
			department: r.department || '',
			office: r.office || '',
			sb_member: r.sb_member || '',
			active: r.active !== false,
			portrait: r.portrait || ''
		};
		portraitPreview = r.portrait || null;
		selectedDepartment = r.department || '';
		deptRoles = departments.find((d) => d.name === r.department)?.roles || [];
		error = '';
		showModal = true;
	}

	// Quick Toggle Designated Page Designer for an employee
	async function toggleDesignerRole(userRow) {
		const newPortalRole = userRow.portalRole === 'page designer' ? 'staff' : 'page designer';
		try {
			const res = await fetch('/admin/users', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: userRow.id,
					portalRole: newPortalRole
				})
			});
			if (!res.ok) throw new Error('Failed to update designer role');
			rows = rows.map((r) => (r.id === userRow.id ? { ...r, portalRole: newPortalRole } : r));
		} catch (err) {
			alert('Error: ' + err.message);
		}
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
		if (!confirm('Are you sure you want to remove this employee record?')) return;
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
			const response = await fetch('/admin/users', {
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

			if (editing) {
				const response = await fetch('/admin/users', {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ id: editing.id, ...form, portrait: portraitUrl })
				});
				if (!response.ok) {
					const errText = await response.text();
					throw new Error(errText || 'Failed to update user');
				}
				const idx = rows.findIndex((r) => r.id === editing.id);
				if (idx >= 0) rows[idx] = { id: editing.id, ...form, portrait: portraitUrl };
			} else {
				const response = await fetch('/admin/users', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ ...form, portrait: portraitUrl })
				});
				if (!response.ok) {
					const errText = await response.text();
					throw new Error(errText || 'Failed to create user');
				}
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
	<title>Personnel &amp; Roles Management | LGU Tanauan, Leyte</title>
</svelte:head>

<div class="p-6 lg:p-10 space-y-6 max-w-7xl mx-auto">
	<!-- Page Header Banner -->
	<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
		<div>
			<div class="flex items-center gap-2 mb-1">
				<span class="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-100">
					<Users class="h-3.5 w-3.5 text-indigo-600" />
					Personnel Directory
				</span>
				<span class="text-xs text-slate-400 font-mono">• {totalCount} Registered Records</span>
			</div>
			<h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
				{#if isSuperAdmin}
					Employees, Roles &amp; Page Designer Assignments
				{:else}
					{userDept} Department Personnel &amp; Page Designers
				{/if}
			</h1>
			<p class="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
				{#if isSuperAdmin}
					Manage municipal personnel profiles, employment positions, and delegate department page designer publishing privileges.
				{:else}
					Assign your department's <strong>Designated Page Designer</strong>. Submissions made by designers will be routed to your desk for approval before going live.
				{/if}
			</p>
		</div>

		<!-- Action: Add Employee -->
		<div class="flex items-center gap-3">
			<button
				onclick={openAdd}
				class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:bg-indigo-700 hover:shadow-md hover:scale-[1.01] active:scale-[0.99]"
			>
				<UserPlus class="h-4 w-4" />
				<span>+ Add Employee</span>
			</button>
		</div>
	</div>

	<!-- Executive KPI Metric Cards -->
	<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
		<!-- Total Personnel -->
		<div class="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm hover:border-indigo-200 transition-all">
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Personnel</span>
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
					<Users class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black text-slate-900">{totalCount}</span>
				<span class="text-[11px] text-slate-400 font-medium">registered</span>
			</div>
		</div>

		<!-- Page Designers -->
		<div class="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm hover:border-emerald-200 transition-all">
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Designated Designers</span>
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
					<Palette class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black text-emerald-600">{designersCount}</span>
				<span class="text-[11px] text-emerald-700 font-medium">active publishers</span>
			</div>
		</div>

		<!-- Department Heads -->
		<div class="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm hover:border-purple-200 transition-all">
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Department Heads</span>
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
					<Building2 class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black text-slate-900">{deptHeadsCount}</span>
				<span class="text-[11px] text-slate-400 font-medium">offices</span>
			</div>
		</div>

		<!-- Active Accounts -->
		<div class="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm hover:border-blue-200 transition-all">
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active Status</span>
				<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
					<UserCheck class="h-4 w-4" />
				</div>
			</div>
			<div class="mt-2 flex items-baseline gap-2">
				<span class="text-2xl font-black text-slate-900">{activeCount}</span>
				<span class="text-[11px] text-emerald-600 font-bold">in good standing</span>
			</div>
		</div>
	</div>

	<!-- Delegation Notice Banner for Department Heads -->
	{#if isDeptHead && !isSuperAdmin}
		<div class="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 text-xs text-indigo-950">
			<div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white mt-0.5">
				<Sparkles class="h-3.5 w-3.5" />
			</div>
			<div class="leading-relaxed">
				<strong class="font-bold text-indigo-900">Head of Office Notice ({userDept}):</strong>
				Click <strong>"+ Assign Designer"</strong> on any staff member below to grant them publishing rights for your department. Content submitted by designated designers will route to your desk for approval before public release.
			</div>
		</div>
	{/if}

	<!-- Search & Filter Controls Card -->
	<div class="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
		<div class="flex flex-col sm:flex-row items-center gap-3">
			<!-- Search bar with icon -->
			<div class="relative flex-1 w-full">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
					<Search class="h-4 w-4" />
				</div>
				<input
					type="text"
					placeholder="Search by employee name, email, position, or department…"
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
			{#if isSuperAdmin}
				<div class="w-full sm:w-56">
					<select
						bind:value={filterDepartment}
						class="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3 text-xs sm:text-sm font-medium text-slate-700 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
					>
						<option value="">All Departments</option>
						{#each departments as d}
							<option value={d.name}>{d.name}</option>
						{/each}
					</select>
				</div>
			{/if}

			<!-- Portal Role Filter Dropdown -->
			<div class="w-full sm:w-48">
				<select
					bind:value={filterRole}
					class="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3 text-xs sm:text-sm font-medium text-slate-700 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
				>
					<option value="">All Portal Roles</option>
					<option value="super admin">Super Admin</option>
					<option value="department head">Department Head</option>
					<option value="page designer">Page Designer</option>
					<option value="staff">Staff</option>
				</select>
			</div>
		</div>
	</div>

	<!-- Main Personnel Table Container -->
	<div class="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
		{#if loading}
			<div class="flex flex-col items-center justify-center p-16 text-center text-slate-400">
				<svg class="h-8 w-8 animate-spin text-indigo-600 mb-3" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				<span class="text-xs font-medium">Synchronizing personnel records…</span>
			</div>
		{:else if filteredRows.length === 0}
			<div class="flex flex-col items-center justify-center p-16 text-center">
				<div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
					<Users class="h-6 w-6" />
				</div>
				<h3 class="text-sm font-bold text-slate-900">No personnel records found</h3>
				<p class="text-xs text-slate-500 mt-1 max-w-sm">
					{#if searchTerm || filterDepartment || filterRole}
						Try adjusting your search query or removing the filters to find what you're looking for.
					{:else}
						No employee records are available. Click "+ Add Employee" to create your first record.
					{/if}
				</p>
				{#if searchTerm || filterDepartment || filterRole}
					<button
						onclick={() => { searchTerm = ''; filterDepartment = ''; filterRole = ''; }}
						class="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
					>
						Clear Filters
					</button>
				{/if}
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left text-xs">
					<!-- Table Header -->
					<thead class="bg-slate-50/90 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 select-none">
						<tr>
							<th class="px-6 py-3.5">Employee Name &amp; Work Email</th>
							<th class="px-6 py-3.5">Employment Position</th>
							<th class="px-6 py-3.5">Department</th>
							<th class="px-6 py-3.5">Portal Permission</th>
							<th class="px-6 py-3.5">Page Designer Delegation</th>
							<th class="px-6 py-3.5 text-right">Actions</th>
						</tr>
					</thead>

					<!-- Table Body -->
					<tbody class="divide-y divide-slate-100 font-medium text-slate-700">
						{#each paginatedRows as r}
							<tr class="hover:bg-slate-50/70 transition-colors group">
								<!-- Column 1: Avatar + Name + Email -->
								<td class="px-6 py-4">
									<div class="flex items-center gap-3.5">
										{#if r.portrait}
											<img
												src={r.portrait}
												alt={r.name || 'Portrait'}
												class="h-10 w-10 shrink-0 rounded-xl object-cover ring-2 ring-slate-100 shadow-sm"
											/>
										{:else}
											<div class={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${getAvatarGradient(r.name || r.id)} text-xs font-bold text-white shadow-sm ring-2 ring-white`}>
												{getInitials(r.name)}
											</div>
										{/if}

										<div class="min-w-0">
											<div class="flex items-center gap-1.5">
												<span class="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
													{r.name || 'Unnamed Employee'}
												</span>
												{#if r.active === false}
													<span class="inline-flex rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-500 uppercase">
														Inactive
													</span>
												{/if}
											</div>
											<div class="flex items-center gap-1 text-[11px] text-slate-400 font-mono mt-0.5 truncate">
												<Mail class="h-3 w-3 shrink-0 text-slate-400" />
												<span>{r.email || 'No email registered'}</span>
											</div>
										</div>
									</div>
								</td>

								<!-- Column 2: Employment Position -->
								<td class="px-6 py-4">
									<span class="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800">
										<Briefcase class="h-3 w-3 text-slate-400" />
										{r.role || 'General Staff'}
									</span>
								</td>

								<!-- Column 3: Department -->
								<td class="px-6 py-4">
									<span class="inline-flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100/60">
										{r.department || 'General LGU'}
									</span>
								</td>

								<!-- Column 4: Portal Permission Badge -->
								<td class="px-6 py-4">
									{#if r.portalRole === 'super admin'}
										<span class="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-700 border border-purple-200/80">
											<ShieldCheck class="h-3.5 w-3.5 text-purple-600" />
											Super Admin
										</span>
									{:else if r.portalRole === 'department head'}
										<span class="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700 border border-indigo-200/80">
											<Building2 class="h-3.5 w-3.5 text-indigo-600" />
											Dept Head
										</span>
									{:else if r.portalRole === 'page designer'}
										<span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200/80">
											<Palette class="h-3.5 w-3.5 text-emerald-600" />
											Page Designer
										</span>
									{:else}
										<span class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 border border-slate-200/60">
											<User class="h-3.5 w-3.5 text-slate-400" />
											Staff
										</span>
									{/if}
								</td>

								<!-- Column 5: Design Delegation Interactive Toggle -->
								<td class="px-6 py-4">
									{#if r.portalRole === 'super admin' || r.portalRole === 'department head'}
										<span class="text-[11px] font-medium text-slate-400 italic">
											Ex-Officio Authority
										</span>
									{:else}
										<button
											type="button"
											onclick={() => toggleDesignerRole(r)}
											class={`group/btn inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
												r.portalRole === 'page designer'
													? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-sm hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300'
													: 'border border-dashed border-slate-300 bg-white text-slate-600 hover:border-indigo-500 hover:text-indigo-700 hover:bg-indigo-50/50'
											}`}
											title={r.portalRole === 'page designer' ? 'Click to revoke page designer permission' : 'Click to delegate page designer permission'}
										>
											{#if r.portalRole === 'page designer'}
												<Check class="h-3.5 w-3.5 text-emerald-600 group-hover/btn:hidden" />
												<X class="h-3.5 w-3.5 text-rose-600 hidden group-hover/btn:inline" />
												<span class="group-hover/btn:hidden">Designated Designer</span>
												<span class="hidden group-hover/btn:inline">Revoke Role</span>
											{:else}
												<Sparkles class="h-3 w-3 text-slate-400 group-hover/btn:text-indigo-600" />
												<span>+ Assign Designer</span>
											{/if}
										</button>
									{/if}
								</td>

								<!-- Column 6: Actions -->
								<td class="px-6 py-4 text-right">
									<div class="inline-flex items-center justify-end gap-1.5">
										<button
											type="button"
											onclick={() => openEdit(r)}
											class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/70 hover:text-indigo-700 transition-colors"
											title="Edit profile &amp; roles"
										>
											<Pencil class="h-3.5 w-3.5" />
											<span>Edit</span>
										</button>
										<button
											type="button"
											onclick={() => removeRow(r.id)}
											class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition-colors"
											title="Delete employee record"
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
			<div class="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 bg-slate-50/60 px-6 py-4 text-xs text-slate-500">
				<div>
					Showing <span class="font-bold text-slate-900">{startEntry}</span> to <span class="font-bold text-slate-900">{endEntry}</span> of <span class="font-bold text-slate-900">{filteredRows.length}</span> employees
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

<!-- Add / Edit Employee Modal -->
<Modal bind:open={showModal} title={editing ? 'Edit Employee & System Permissions' : 'Register New Employee'}>
	<div class="space-y-4 p-1">
		{#if error}
			<div class="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
				<AlertCircle class="h-4 w-4 shrink-0 mt-0.5" />
				<span>{error}</span>
			</div>
		{/if}

		<!-- Full Name Input -->
		<div class="space-y-1">
			<label for="emp-name" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
				Full Name <span class="text-rose-500">*</span>
			</label>
			<input
				id="emp-name"
				bind:value={form.name}
				placeholder="e.g. Maria Santos Cruz"
				required
				class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
			/>
		</div>

		<!-- Work Email Input -->
		<div class="space-y-1">
			<label for="emp-email" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
				Official Work Email
			</label>
			<input
				id="emp-email"
				type="email"
				bind:value={form.email}
				placeholder="maria.cruz@tanauan.gov.ph"
				class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
			/>
		</div>

		<!-- Department & Official Position Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
			<div class="space-y-1">
				<label for="emp-dept" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
					Department <span class="text-rose-500">*</span>
				</label>
				{#if !isSuperAdmin && userDept}
					<input
						id="emp-dept"
						value={userDept}
						disabled
						class="w-full rounded-xl border border-slate-200 bg-slate-100 py-2.5 px-3 text-xs sm:text-sm font-semibold text-slate-600"
					/>
				{:else}
					<select
						id="emp-dept"
						value={form.department}
						onchange={(e) => handleDepartmentChange(e.target.value)}
						required
						class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs sm:text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
					>
						<option value="">-- Select Department --</option>
						{#each departments as dept}
							<option value={dept.name}>{dept.name}</option>
						{/each}
					</select>
				{/if}
			</div>

			<div class="space-y-1">
				<label for="emp-role" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
					Official Position / Role
				</label>
				<select
					id="emp-role"
					bind:value={form.role}
					required
					class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs sm:text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
				>
					<option value="">-- Select Position --</option>
					{#each deptRoles as r}
						<option value={r}>{r}</option>
					{/each}
					<option value="Staff">General Staff</option>
					<option value="Administrative Aide">Administrative Aide</option>
					<option value="Clerk I">Clerk I</option>
				</select>
			</div>
		</div>

		<!-- Portal System Role Selector -->
		<div class="space-y-1">
			<label for="emp-portal-role" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
				Portal System Permission Level
			</label>
			<select
				id="emp-portal-role"
				bind:value={form.portalRole}
				required
				class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs sm:text-sm text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
			>
				{#each availablePortalRoles as pr}
					<option value={pr.id}>{pr.label} — {pr.desc}</option>
				{/each}
			</select>
		</div>

		<!-- Portrait Photo Upload -->
		<div class="space-y-1.5">
			<label for="emp-portrait-upload" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
				Portrait Photo
			</label>
			<div class="flex items-center gap-4">
				{#if portraitPreview}
					<img
						src={portraitPreview}
						alt="Preview"
						class="h-16 w-16 rounded-xl object-cover ring-2 ring-indigo-500/20 shadow-sm"
					/>
				{:else}
					<div class="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100 text-slate-400 border border-dashed border-slate-300">
						<Camera class="h-6 w-6" />
					</div>
				{/if}
				<div class="flex-1">
					<input
						id="emp-portrait-upload"
						type="file"
						name="portrait"
						accept="image/*"
						onchange={handlePortraitInput}
						disabled={uploading}
						class="block w-full text-xs text-slate-500 file:mr-3 file:rounded-xl file:border-0 file:bg-indigo-50 file:py-2 file:px-3 file:text-xs file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
					/>
					<p class="text-[11px] text-slate-400 mt-1">PNG, JPG, or WebP up to 5MB.</p>
				</div>
			</div>
		</div>

		<!-- Active Status Toggle -->
		<div class="flex items-center gap-2 pt-1">
			<input
				type="checkbox"
				id="form-active-checkbox"
				bind:checked={form.active}
				disabled={uploading}
				class="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
			/>
			<label for="form-active-checkbox" class="text-xs font-medium text-slate-700 cursor-pointer">
				Active Employee Status (Authorized to sign in)
			</label>
		</div>

		<!-- Modal Action Buttons -->
		<div class="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
			<button
				type="button"
				onclick={() => (showModal = false)}
				class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
			>
				Cancel
			</button>
			<button
				type="button"
				onclick={save}
				disabled={loading || uploading}
				class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 hover:bg-indigo-700 transition-all disabled:opacity-60"
			>
				{#if loading}
					<svg class="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					<span>Saving...</span>
				{:else}
					<span>{editing ? 'Save Changes' : '+ Add Employee'}</span>
				{/if}
			</button>
		</div>
	</div>
</Modal>
