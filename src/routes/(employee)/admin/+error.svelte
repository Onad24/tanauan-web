<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { ArrowLeft, Home, RefreshCw, AlertTriangle, Search, Lock } from 'lucide-svelte';

	const titles = {
		404: 'Page not found',
		403: 'Access restricted',
		401: 'Session expired',
		500: 'Something went wrong'
	};

	let title = $derived(titles[$page.status] || 'Unexpected error');
	let isAuth = $derived($page.status === 401 || $page.status === 403);
</script>

<svelte:head>
	<title>{title} | Admin Console — LGU Tanauan, Leyte</title>
</svelte:head>

<div class="flex min-h-[70vh] items-center justify-center p-6">
	<div class="w-full max-w-lg text-center">
		<div
			class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl {isAuth
				? 'bg-amber-50 text-amber-600'
				: 'bg-rose-50 text-rose-600'}"
		>
			{#if $page.status === 404}
				<Search class="h-7 w-7" />
			{:else if isAuth}
				<Lock class="h-7 w-7" />
			{:else}
				<AlertTriangle class="h-7 w-7" />
			{/if}
		</div>

		<p class="font-mono text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
			Error {$page.status}
		</p>
		<h1 class="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">{title}</h1>

		<p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-500">
			{#if $page.status === 404}
				The admin page you were looking for does not exist or may have been moved.
			{:else if $page.status === 403}
				Your account does not have permission to open this section. Contact a Super Administrator if
				you believe this is a mistake.
			{:else if $page.status === 401}
				Your session has expired. Please sign in again to continue managing the portal.
			{:else}
				{$page.error?.message ||
					'The request could not be completed. Try again, or return to the dashboard.'}
			{/if}
		</p>

		<div class="mt-7 flex flex-wrap items-center justify-center gap-2.5">
			<button
				type="button"
				onclick={() => history.back()}
				class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
			>
				<ArrowLeft class="h-4 w-4" />
				<span>Go Back</span>
			</button>

			<button
				type="button"
				onclick={() => location.reload()}
				class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
			>
				<RefreshCw class="h-4 w-4" />
				<span>Retry</span>
			</button>

			<button
				type="button"
				onclick={() => goto(isAuth ? '/admin/login' : '/admin')}
				class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:bg-indigo-700"
			>
				<Home class="h-4 w-4" />
				<span>{isAuth ? 'Sign In Again' : 'Back to Dashboard'}</span>
			</button>
		</div>
	</div>
</div>
