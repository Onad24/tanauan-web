<script>
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged, signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { page, navigating } from '$app/stores';
	import ToastHost from '$lib/admin/ToastHost.svelte';
	import ConfirmHost from '$lib/admin/ConfirmHost.svelte';
	import { toast } from '$lib/admin/toast';
	import { confirmAction } from '$lib/admin/confirm';
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
		Layers
	} from 'lucide-svelte';
	import '../../../app.css';

	let { data, children } = $props();
	let firebaseUser = $state(null);
	let isSidebarOpen = $state(false);
	let loggingOut = $state(false);

	// Collapse the mobile drawer whenever the route changes
	$effect(() => {
		$page.url.pathname;
		isSidebarOpen = false;
	});

	// Escape closes the mobile drawer
	function handleKeydown(e) {
		if (e.key === 'Escape' && isSidebarOpen) isSidebarOpen = false;
	}

	// Role & permissions from SSR
	let role = $derived(data?.user?.role ?? '');
	let portalRole = $derived(data?.user?.portalRole ?? '');
	let isSuperAdmin = $derived(data?.user?.isSuperAdmin ?? false);
	let isDeptHead = $derived(data?.user?.isDeptHead ?? false);
	let userDept = $derived(data?.user?.department ?? '');
	let displayName = $derived(data?.user?.name || data?.user?.email || 'Authorized User');
	let userEmail = $derived(data?.user?.email || '');

	// Sidebar navigation model — each link is filtered by the signed-in role
	let navSections = $derived([
		{
			label: 'Main Navigation',
			spaced: false,
			items: [
				{
					href: '/admin',
					label: 'Dashboard Overview',
					icon: LayoutDashboard,
					exact: true,
					show: true
				},
				{
					href: '/admin/users',
					label: isSuperAdmin ? 'Employees & Roles' : 'Personnel & Roles',
					icon: Users,
					show: isSuperAdmin || isDeptHead
				},
				{ href: '/admin/posts', label: 'Posts & Sections', icon: FileText, show: true }
			]
		},
		{
			label: 'Governance & Assets',
			spaced: true,
			items: [
				{
					href: '/admin/departments',
					label: 'Departments Manager',
					icon: Building2,
					show: isSuperAdmin
				},
				{
					href: '/admin/office-page-data',
					label: 'Office Page Content',
					icon: Layers,
					show: isSuperAdmin || isDeptHead
				},
				{ href: '/admin/awards', label: 'Awards & Honors', icon: Award, show: true },
				{ href: '/admin/officials', label: 'Municipal Officials', icon: UserCheck, show: true },
				{ href: '/admin/others', label: 'Documents & Files', icon: FolderOpen, show: true }
			]
		}
	]);

	function isActive(item) {
		const path = $page.url.pathname;
		return item.exact ? path === item.href : path.startsWith(item.href);
	}

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
		if (loggingOut) return;
		const ok = await confirmAction({
			title: 'Sign out of the admin console?',
			message: 'You will need to sign in again to manage content.',
			confirmText: 'Sign Out'
		});
		if (!ok) return;

		loggingOut = true;
		try {
			const res = await fetch('/admin/session', { method: 'DELETE' });
			if (!res.ok) throw new Error(`session delete failed (${res.status})`);
		} catch (err) {
			console.error('Logout session error:', err);
			toast.warning('Could not clear the session cookie — sign-out may be incomplete.');
		}
		try {
			await signOut(auth);
		} catch (err) {
			console.error('Firebase sign-out error:', err);
		} finally {
			loggingOut = false;
		}
		await goto('/admin/login');
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
	<!-- Route transition progress bar -->
	{#if $navigating}
		<div
			class="fixed inset-x-0 top-0 z-[110] h-0.5 overflow-hidden bg-indigo-100/70"
			aria-hidden="true"
		>
			<div
				class="nav-progress h-full w-1/3 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500"
			></div>
		</div>
	{/if}

	<!-- Mobile Top Bar -->
	<header
		class="sticky top-0 z-30 flex w-full items-center justify-between border-b border-slate-800 bg-[#0B0F19] px-4 py-3 text-white shadow-md md:hidden"
	>
		<div class="flex items-center gap-2.5">
			<div class="h-8 w-8 rounded-lg bg-white/90 p-1">
				<img src="/tanauan logo.svg" alt="Tanauan Seal" class="h-full w-full object-contain" />
			</div>
			<div>
				<span class="block text-xs leading-tight font-bold tracking-wide">TANAUAN LGU</span>
				<span class="block text-[10px] font-medium text-indigo-400">Portal Console</span>
			</div>
		</div>

		<button
			onclick={() => (isSidebarOpen = !isSidebarOpen)}
			class="rounded-xl border border-slate-700 bg-slate-800/80 p-2 text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
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
				<a href="/admin" class="group flex items-center gap-3">
					<div
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700/60 bg-white/95 p-1.5 shadow-sm transition-transform group-hover:scale-105"
					>
						<img src="/tanauan logo.svg" alt="Tanauan Seal" class="h-full w-full object-contain" />
					</div>
					<div>
						<span class="block text-sm font-extrabold tracking-wider text-white">TANAUAN LGU</span>
						<span class="block text-[10px] font-semibold tracking-wider text-indigo-400 uppercase"
							>Portal Console</span
						>
					</div>
				</a>
			</div>

			<!-- Public Site Quick Link -->
			<div class="px-4 pt-4">
				<a
					href="/"
					target="_blank"
					class="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-3.5 py-2.5 text-xs font-medium text-slate-300 transition-all hover:border-slate-700 hover:bg-slate-800/80 hover:text-white"
				>
					<span class="flex items-center gap-2">
						<span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
						<span>View Public Website</span>
					</span>
					<ExternalLink
						class="h-3.5 w-3.5 text-slate-500 transition-colors group-hover:text-indigo-400"
					/>
				</a>
			</div>

			<!-- Nav Menu Links -->
			<nav class="space-y-1 px-3 py-4 text-xs font-medium" aria-label="Admin sections">
				{#each navSections as section}
					{#if section.items.some((i) => i.show)}
						<div
							class="px-3 pb-2 {section.spaced
								? 'pt-4'
								: 'pt-1'} text-[10px] font-bold tracking-wider text-slate-500 uppercase"
						>
							{section.label}
						</div>

						{#each section.items.filter((i) => i.show) as item (item.href)}
							{@const active = isActive(item)}
							<a
								href={item.href}
								aria-current={active ? 'page' : undefined}
								onclick={() => (isSidebarOpen = false)}
								class={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
									active
										? 'bg-indigo-600 font-semibold text-white shadow-md shadow-indigo-600/25'
										: 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
								}`}
							>
								<svelte:component
									this={item.icon}
									class={`h-4 w-4 transition-colors ${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}
								/>
								<span>{item.label}</span>
							</a>
						{/each}
					{/if}
				{/each}
			</nav>
		</div>

		<!-- Bottom User Profile Footer Card -->
		<div class="space-y-3 border-t border-slate-800/70 bg-[#080C14] p-4">
			<div class="flex items-center gap-3">
				<div
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white shadow-sm ring-2 ring-indigo-500/20"
				>
					{userInitials}
				</div>
				<div class="min-w-0 flex-1">
					<div class="truncate text-xs font-bold text-white">{displayName}</div>
					<div class="truncate font-mono text-[11px] text-slate-400">{userEmail}</div>
				</div>
			</div>

			<!-- Role Pill Badge -->
			<div class="flex items-center gap-1.5">
				{#if isSuperAdmin}
					<span
						class="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-purple-300"
					>
						<ShieldCheck class="h-3 w-3 text-purple-400" />
						Super Administrator
					</span>
				{:else if portalRole === 'department head'}
					<span
						class="inline-flex items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300"
					>
						<Building2 class="h-3 w-3 text-indigo-400" />
						Dept Head ({userDept || 'LGU'})
					</span>
				{:else if portalRole === 'page designer'}
					<span
						class="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300"
					>
						<Palette class="h-3 w-3 text-emerald-400" />
						Page Designer ({userDept || 'LGU'})
					</span>
				{:else}
					<span
						class="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-800 px-2.5 py-0.5 text-[10px] font-semibold text-slate-300"
					>
						<User class="h-3 w-3 text-slate-400" />
						Department Staff
					</span>
				{/if}
			</div>

			<!-- Logout Button -->
			<button
				onclick={logout}
				disabled={loggingOut}
				class="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-rose-500/40 hover:bg-rose-950/30 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
			>
				<LogOut class="h-3.5 w-3.5" />
				<span>{loggingOut ? 'Signing out…' : 'Sign Out'}</span>
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
	<main class="min-w-0 flex-1 overflow-y-auto">
		{@render children()}
	</main>
</div>

<!-- Global feedback layers -->
<ToastHost />
<ConfirmHost />

<style>
	@keyframes nav-slide {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(400%);
		}
	}
	.nav-progress {
		animation: nav-slide 1.1s ease-in-out infinite;
	}
</style>
