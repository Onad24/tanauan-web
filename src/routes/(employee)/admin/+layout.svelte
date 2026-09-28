<script>
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged, signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		LayoutDashboard,
		Users,
		FileText,
		Building2,
		Award,
		UserCheck,
		FolderOpen,
		LogOut,
		ExternalLink,
		Menu,
		X,
		ShieldCheck,
		Palette,
		User,
		ChevronRight,
		Sparkles
	} from 'lucide-svelte';
	import '../../../app.css';

	let { data, children } = $props();
	let firebaseUser = $state(null);
	let isSidebarOpen = $state(false);

	// Role & permissions from SSR
	let role = $derived(data?.user?.role ?? '');
	let portalRole = $derived(data?.user?.portalRole ?? '');
	let isSuperAdmin = $derived(data?.user?.isSuperAdmin ?? false);
	let isDeptHead = $derived(data?.user?.isDeptHead ?? false);
	let userDept = $derived(data?.user?.department ?? '');
	let displayName = $derived(data?.user?.name || data?.user?.email || 'Authorized User');
	let userEmail = $derived(data?.user?.email || '');

	// User initials for avatar
	let userInitials = $derived(
		displayName
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2) || 'AD'
	);

	onMount(() => {
		const unsub = onAuthStateChanged(auth, (u) => {
			firebaseUser = u;
			if (!u) {
				goto('/admin/login');
			}
		});
		return unsub;
	});

	async function logout() {
		try {
			await fetch('/admin/session', { method: 'DELETE' });
		} finally {
			signOut(auth).then(() => goto('/admin/login'));
		}
	}
</script>

<div class="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
	<!-- Mobile Top Bar -->
	<header class="sticky top-0 z-30 flex w-full items-center justify-between border-b border-slate-800 bg-[#0B0F19] px-4 py-3 text-white md:hidden shadow-md">
		<div class="flex items-center gap-2.5">
			<div class="h-8 w-8 rounded-lg bg-white/90 p-1">
				<img src="/tanauan logo.svg" alt="Tanauan Seal" class="h-full w-full object-contain" />
			</div>
			<div>
				<span class="block text-xs font-bold leading-tight tracking-wide">TANAUAN LGU</span>
				<span class="block text-[10px] font-medium text-indigo-400">Portal Console</span>
			</div>
		</div>

		<button
			onclick={() => (isSidebarOpen = !isSidebarOpen)}
			class="rounded-xl border border-slate-700 bg-slate-800/80 p-2 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
			aria-label="Toggle navigation menu"
		>
			{#if isSidebarOpen}
				<X class="h-5 w-5" />
			{:else}
				<Menu class="h-5 w-5" />
			{/if}
		</button>
	</header>

	<!-- Sidebar Navigation Shell -->
	<aside
		class={`
			fixed inset-y-0 left-0 z-40 w-72 flex-col justify-between border-r border-slate-800/70 bg-[#0B0F19] text-slate-200 transition-transform duration-300 md:static md:flex md:translate-x-0
			${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
		`}
	>
		<!-- Top Sidebar Branding -->
		<div>
			<div class="flex items-center justify-between border-b border-slate-800/70 p-5">
				<a href="/admin" class="flex items-center gap-3 group">
					<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/95 p-1.5 shadow-sm border border-slate-700/60 transition-transform group-hover:scale-105">
						<img src="/tanauan logo.svg" alt="Tanauan Seal" class="h-full w-full object-contain" />
					</div>
					<div>
						<span class="block text-sm font-extrabold text-white tracking-wider">TANAUAN LGU</span>
						<span class="block text-[10px] font-semibold text-indigo-400 tracking-wider uppercase">Portal Console</span>
					</div>
				</a>
			</div>

			<!-- Public Site Quick Link -->
			<div class="px-4 pt-4">
				<a
					href="/"
					target="_blank"
					class="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-3.5 py-2.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:bg-slate-800/80 hover:text-white transition-all"
				>
					<span class="flex items-center gap-2">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
						<span>View Public Website</span>
					</span>
					<ExternalLink class="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
				</a>
			</div>

			<!-- Nav Menu Links -->
			<nav class="space-y-1 px-3 py-4 text-xs font-medium">
				<div class="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
					Main Navigation
				</div>

				<!-- Dashboard Overview -->
				<a
					href="/admin"
					onclick={() => (isSidebarOpen = false)}
					class={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all ${
						$page.url.pathname === '/admin'
							? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/25'
							: 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
					}`}
				>
					<LayoutDashboard class={`h-4 w-4 transition-colors ${$page.url.pathname === '/admin' ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
					<span>Dashboard Overview</span>
				</a>

				<!-- Super admin or Dept Head: Users & Roles -->
				{#if isSuperAdmin || isDeptHead}
					<a
						href="/admin/users"
						onclick={() => (isSidebarOpen = false)}
						class={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all ${
							$page.url.pathname.startsWith('/admin/users')
								? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/25'
								: 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
						}`}
					>
						<Users class={`h-4 w-4 transition-colors ${$page.url.pathname.startsWith('/admin/users') ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
						<span>{isSuperAdmin ? 'Employees & Roles' : 'Personnel & Roles'}</span>
					</a>
				{/if}

				<!-- Posts & Content Management -->
				<a
					href="/admin/posts"
					onclick={() => (isSidebarOpen = false)}
					class={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all ${
						$page.url.pathname.startsWith('/admin/posts')
							? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/25'
							: 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
					}`}
				>
					<FileText class={`h-4 w-4 transition-colors ${$page.url.pathname.startsWith('/admin/posts') ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
					<span>Posts &amp; Sections</span>
				</a>

				<div class="px-3 pb-2 pt-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">
					Governance &amp; Assets
				</div>

				<!-- Super admin only: Departments -->
				{#if isSuperAdmin}
					<a
						href="/admin/departments"
						onclick={() => (isSidebarOpen = false)}
						class={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all ${
							$page.url.pathname.startsWith('/admin/departments')
								? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/25'
								: 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
						}`}
					>
						<Building2 class={`h-4 w-4 transition-colors ${$page.url.pathname.startsWith('/admin/departments') ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
						<span>Departments Manager</span>
					</a>
				{/if}

				<!-- Office Page Content (super admin + dept heads) -->
				{#if isSuperAdmin || isDeptHead}
					<a
						href="/admin/office-page-data"
						onclick={() => (isSidebarOpen = false)}
						class={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all ${
							$page.url.pathname.startsWith('/admin/office-page-data')
								? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/25'
								: 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
						}`}
					>
						<FileText class={`h-4 w-4 transition-colors ${$page.url.pathname.startsWith('/admin/office-page-data') ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
						<span>Office Page Content</span>
					</a>
				{/if}

				<!-- Awards -->
				<a
					href="/admin/awards"
					onclick={() => (isSidebarOpen = false)}
					class={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all ${
						$page.url.pathname.startsWith('/admin/awards')
							? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/25'
							: 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
					}`}
				>
					<Award class={`h-4 w-4 transition-colors ${$page.url.pathname.startsWith('/admin/awards') ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
					<span>Awards &amp; Honors</span>
				</a>

				<!-- Officials -->
				<a
					href="/admin/officials"
					onclick={() => (isSidebarOpen = false)}
					class={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all ${
						$page.url.pathname.startsWith('/admin/officials')
							? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/25'
							: 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
					}`}
				>
					<UserCheck class={`h-4 w-4 transition-colors ${$page.url.pathname.startsWith('/admin/officials') ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
					<span>Municipal Officials</span>
				</a>

				<!-- Other Uploads -->
				<a
					href="/admin/others"
					onclick={() => (isSidebarOpen = false)}
					class={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all ${
						$page.url.pathname.startsWith('/admin/others')
							? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/25'
							: 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
					}`}
				>
					<FolderOpen class={`h-4 w-4 transition-colors ${$page.url.pathname.startsWith('/admin/others') ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
					<span>Documents &amp; Files</span>
				</a>
			</nav>
		</div>

		<!-- Bottom User Profile Footer Card -->
		<div class="border-t border-slate-800/70 bg-[#080C14] p-4 space-y-3">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white shadow-sm ring-2 ring-indigo-500/20">
					{userInitials}
				</div>
				<div class="min-w-0 flex-1">
					<div class="truncate text-xs font-bold text-white">{displayName}</div>
					<div class="truncate text-[11px] text-slate-400 font-mono">{userEmail}</div>
				</div>
			</div>

			<!-- Role Pill Badge -->
			<div class="flex items-center gap-1.5">
				{#if isSuperAdmin}
					<span class="inline-flex items-center gap-1 rounded-full bg-purple-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-500/30">
						<ShieldCheck class="h-3 w-3 text-purple-400" />
						Super Administrator
					</span>
				{:else if portalRole === 'department head'}
					<span class="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
						<Building2 class="h-3 w-3 text-indigo-400" />
						Dept Head ({userDept || 'LGU'})
					</span>
				{:else if portalRole === 'page designer'}
					<span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-500/30">
						<Palette class="h-3 w-3 text-emerald-400" />
						Page Designer ({userDept || 'LGU'})
					</span>
				{:else}
					<span class="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300 border border-slate-700">
						<User class="h-3 w-3 text-slate-400" />
						Department Staff
					</span>
				{/if}
			</div>

			<!-- Logout Button -->
			<button
				onclick={logout}
				class="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 py-2 px-3 text-xs font-semibold text-slate-300 hover:border-rose-500/40 hover:bg-rose-950/30 hover:text-rose-300 transition-all"
			>
				<LogOut class="h-3.5 w-3.5" />
				<span>Sign Out</span>
			</button>
		</div>
	</aside>

	<!-- Backdrop for mobile sidebar -->
	{#if isSidebarOpen}
		<div
			class="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
			onclick={() => (isSidebarOpen = false)}
			role="button"
			tabindex="0"
			aria-label="Close sidebar overlay"
		></div>
	{/if}

	<!-- Main Dashboard Content Canvas -->
	<main class="flex-1 min-w-0 overflow-y-auto">
		{@render children()}
	</main>
</div>
