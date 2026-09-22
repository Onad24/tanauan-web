<script>
	import {
		FileText,
		Users,
		Building2,
		AlertCircle,
		CheckCircle2,
		ExternalLink,
		Clock,
		ArrowRight,
		Plus,
		Activity,
		ShieldCheck,
		Search,
		Calendar,
		Layers,
		Sparkles
	} from 'lucide-svelte';

	let { data } = $props();

	let currentUser = $derived(data.currentUser || {});
	let isSuperAdmin = $derived(currentUser?.isSuperAdmin ?? false);
	let isDeptHead = $derived(currentUser?.isDeptHead ?? false);
	let userDept = $derived(currentUser?.department ?? '');
	let displayName = $derived(currentUser?.name || currentUser?.email || 'Administrator');

	let totalPosts = $derived(data.totalPosts || 0);
	let totalUsers = $derived(data.totalUsers || 0);
	let pendingCount = $derived(data.pendingCount || 0);
	let recentPosts = $derived(data.recentPosts || []);

	// Current date formatted
	const currentDate = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	});
</script>

<svelte:head>
	<title>Admin Dashboard Overview | LGU Tanauan, Leyte</title>
</svelte:head>

<div class="p-6 lg:p-10 space-y-6 max-w-7xl mx-auto">
	<!-- Top Welcome Executive Banner -->
	<div class="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
		<!-- Subtle ambient background glow -->
		<div class="pointer-events-none absolute -right-12 -top-12 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl"></div>
		<div class="pointer-events-none absolute -left-12 -bottom-12 h-60 w-60 rounded-full bg-purple-500/10 blur-3xl"></div>

		<div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
			<div class="space-y-2">
				<div class="flex items-center gap-2">
					<span class="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-0.5 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
						<ShieldCheck class="h-3.5 w-3.5 text-indigo-400" />
						{#if isSuperAdmin}
							Super Administrator
						{:else if isDeptHead}
							Head of Office • {userDept}
						{:else}
							Department Administrator
						{/if}
					</span>
					<span class="text-xs text-slate-400 hidden sm:inline">• {currentDate}</span>
				</div>
				<h1 class="text-2xl font-black sm:text-3xl lg:text-4xl text-white tracking-tight">
					Welcome back, {displayName}
				</h1>
				<p class="text-xs sm:text-sm text-slate-300/90 max-w-xl leading-relaxed">
					Manage municipal announcements, review department designer submissions, oversee personnel records, and monitor public portal engagement.
				</p>
			</div>

			<!-- Quick Header Actions -->
			<div class="flex flex-wrap items-center gap-3">
				<a
					href="/admin/posts"
					class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98]"
				>
					<Plus class="h-4 w-4" />
					<span>Create New Post</span>
				</a>
				<a
					href="/"
					target="_blank"
					class="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 backdrop-blur-md hover:bg-slate-700 hover:text-white transition-all"
				>
					<span>View Live Site</span>
					<ExternalLink class="h-3.5 w-3.5 text-slate-400" />
				</a>
			</div>
		</div>
	</div>

	<!-- Metric Telemetry Cards Grid -->
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<!-- Total Published Posts -->
		<div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all">
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Published Content</span>
				<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
					<FileText class="h-5 w-5" />
				</div>
			</div>
			<div class="mt-4">
				<span class="text-3xl font-black text-slate-900">{totalPosts}</span>
				<p class="text-xs text-slate-500 mt-1">Articles, announcements &amp; notices</p>
			</div>
			<div class="mt-4 border-t border-slate-100 pt-3">
				<a href="/admin/posts" class="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800">
					<span>Manage Posts</span>
					<ArrowRight class="h-3 w-3" />
				</a>
			</div>
		</div>

		<!-- Pending Approvals -->
		<div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all">
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Pending Review</span>
				<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
					<AlertCircle class="h-5 w-5" />
				</div>
			</div>
			<div class="mt-4">
				<span class="text-3xl font-black {pendingCount > 0 ? 'text-amber-600' : 'text-slate-900'}">
					{pendingCount}
				</span>
				<p class="text-xs text-slate-500 mt-1">
					{pendingCount > 0 ? 'Submissions awaiting approval' : 'All submissions processed'}
				</p>
			</div>
			<div class="mt-4 border-t border-slate-100 pt-3">
				<a href="/admin/posts" class="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-850">
					<span>Review Submissions</span>
					<ArrowRight class="h-3 w-3" />
				</a>
			</div>
		</div>

		<!-- Registered Employees -->
		<div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all">
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">Personnel Accounts</span>
				<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
					<Users class="h-5 w-5" />
				</div>
			</div>
			<div class="mt-4">
				<span class="text-3xl font-black text-slate-900">{totalUsers}</span>
				<p class="text-xs text-slate-500 mt-1">Registered LGU personnel</p>
			</div>
			<div class="mt-4 border-t border-slate-100 pt-3">
				{#if isSuperAdmin || isDeptHead}
					<a href="/admin/users" class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900">
						<span>Manage Personnel</span>
						<ArrowRight class="h-3 w-3" />
					</a>
				{:else}
					<span class="text-xs text-slate-400">Department Directory</span>
				{/if}
			</div>
		</div>

		<!-- Managed Departments -->
		<div class="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col justify-between hover:border-purple-300 hover:shadow-md transition-all">
			<div class="flex items-center justify-between">
				<span class="text-[11px] font-bold uppercase tracking-wider text-slate-500">LGU Departments</span>
				<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
					<Building2 class="h-5 w-5" />
				</div>
			</div>
			<div class="mt-4">
				<span class="text-3xl font-black text-slate-900">38</span>
				<p class="text-xs text-slate-500 mt-1">Offices, units &amp; divisions</p>
			</div>
			<div class="mt-4 border-t border-slate-100 pt-3">
				{#if isSuperAdmin}
					<a href="/admin/departments" class="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 hover:text-purple-900">
						<span>Configure Departments</span>
						<ArrowRight class="h-3 w-3" />
					</a>
				{:else}
					<span class="text-xs font-medium text-slate-600">{userDept || 'General LGU'}</span>
				{/if}
			</div>
		</div>
	</div>

	<!-- Quick Launchpad & Workflow Shortcuts -->
	<div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5">
		<div class="flex items-center justify-between border-b border-slate-100 pb-4">
			<div>
				<h2 class="text-base sm:text-lg font-bold text-slate-900">Quick Administrative Actions</h2>
				<p class="text-xs text-slate-500 mt-0.5">Commonly executed portal management workflows.</p>
			</div>
			<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
				Fast Actions
			</span>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<a
				href="/admin/posts"
				class="group flex flex-col justify-between rounded-xl border border-slate-200/80 p-5 hover:border-indigo-300 hover:bg-indigo-50/20 hover:shadow-sm transition-all"
			>
				<div class="space-y-2">
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
						<Plus class="h-5 w-5" />
					</div>
					<h3 class="text-sm font-bold text-slate-900">New Public Post</h3>
					<p class="text-xs text-slate-500 leading-relaxed">
						Draft an announcement, local bulletin, or accomplishment report.
					</p>
				</div>
				<span class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
					<span>Open Posts Console</span>
					<ArrowRight class="h-3 w-3" />
				</span>
			</a>

			{#if isSuperAdmin || isDeptHead}
				<a
					href="/admin/users"
					class="group flex flex-col justify-between rounded-xl border border-slate-200/80 p-5 hover:border-emerald-300 hover:bg-emerald-50/20 hover:shadow-sm transition-all"
				>
					<div class="space-y-2">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
							<Users class="h-5 w-5" />
						</div>
						<h3 class="text-sm font-bold text-slate-900">Assign Page Designers</h3>
						<p class="text-xs text-slate-500 leading-relaxed">
							Grant publishing permissions to designated department personnel.
						</p>
					</div>
					<span class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 group-hover:translate-x-1 transition-transform">
						<span>Manage Delegations</span>
						<ArrowRight class="h-3 w-3" />
					</span>
				</a>
			{/if}

			{#if isSuperAdmin}
				<a
					href="/admin/departments"
					class="group flex flex-col justify-between rounded-xl border border-slate-200/80 p-5 hover:border-purple-300 hover:bg-purple-50/20 hover:shadow-sm transition-all"
				>
					<div class="space-y-2">
						<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
							<Building2 class="h-5 w-5" />
						</div>
						<h3 class="text-sm font-bold text-slate-900">Navbar &amp; Departments</h3>
						<p class="text-xs text-slate-500 leading-relaxed">
							Reorder navigation groups and manage office visibility.
						</p>
					</div>
					<span class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-purple-700 group-hover:translate-x-1 transition-transform">
						<span>Organize Structure</span>
						<ArrowRight class="h-3 w-3" />
					</span>
				</a>
			{/if}

			<a
				href="/"
				target="_blank"
				class="group flex flex-col justify-between rounded-xl border border-slate-200/80 p-5 hover:border-slate-400 hover:bg-slate-50 hover:shadow-sm transition-all"
			>
				<div class="space-y-2">
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors">
						<ExternalLink class="h-5 w-5" />
					</div>
					<h3 class="text-sm font-bold text-slate-900">Public Portal Preview</h3>
					<p class="text-xs text-slate-500 leading-relaxed">
						Preview recent publications directly on the live citizen website.
					</p>
				</div>
				<span class="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-slate-700 group-hover:translate-x-1 transition-transform">
					<span>Open Public Site</span>
					<ArrowRight class="h-3 w-3" />
				</span>
			</a>
		</div>
	</div>

	<!-- Recent Content Table -->
	<div class="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
		<div class="flex items-center justify-between border-b border-slate-100 p-5">
			<div>
				<h2 class="text-base font-bold text-slate-900">Recent Portal Publications</h2>
				<p class="text-xs text-slate-500 mt-0.5">Most recent announcements, updates, and news entries.</p>
			</div>
			<a href="/admin/posts" class="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
				<span>View All Posts</span>
				<ArrowRight class="h-3 w-3" />
			</a>
		</div>

		{#if recentPosts.length === 0}
			<div class="p-12 text-center text-slate-400 text-xs">
				No recent publications found in database.
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left text-xs">
					<thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-[11px]">
						<tr>
							<th class="px-6 py-3.5">Headline &amp; Department</th>
							<th class="px-6 py-3.5">Type</th>
							<th class="px-6 py-3.5">Status</th>
							<th class="px-6 py-3.5">Date Added</th>
							<th class="px-6 py-3.5 text-right">Action</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-100 font-medium text-slate-700">
						{#each recentPosts.slice(0, 6) as post}
							<tr class="hover:bg-slate-50/80 transition-colors">
								<td class="px-6 py-4">
									<span class="font-bold text-slate-900 block line-clamp-1">{post.header || 'Untitled Post'}</span>
									<span class="text-[11px] text-slate-500 block">{post.department || 'General Bulletin'}</span>
								</td>
								<td class="px-6 py-4 capitalize font-mono text-[11px]">
									{post.type || 'Announcement'}
								</td>
								<td class="px-6 py-4">
									{#if post.status === 'approved'}
										<span class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
											<CheckCircle2 class="h-3 w-3" />
											Approved
										</span>
									{:else if post.status === 'pending'}
										<span class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
											<AlertCircle class="h-3 w-3" />
											Pending Review
										</span>
									{:else}
										<span class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 border border-slate-200">
											Published Live
										</span>
									{/if}
								</td>
								<td class="px-6 py-4 font-mono text-slate-500 text-[11px]">
									{post.date_added ? new Date(post.date_added).toLocaleDateString() : 'N/A'}
								</td>
								<td class="px-6 py-4 text-right">
									<a
										href="/admin/posts"
										class="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
									>
										Manage
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
