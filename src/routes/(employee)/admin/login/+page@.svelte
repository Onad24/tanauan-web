<script>
	import '../../../../app.css';
	import { auth } from '$lib/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-svelte';

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let error = $state('');
	let loading = $state(false);

	async function submit(e) {
		e.preventDefault();
		error = '';
		loading = true;
		try {
			const cred = await signInWithEmailAndPassword(auth, email, password);
			const idToken = await cred.user.getIdToken();
			const res = await fetch('/admin/session', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ idToken })
			});
			if (!res.ok) {
				const errorMsg = await res.text();
				throw new Error(errorMsg || 'Failed to create session on server');
			}
			goto('/admin');
		} catch (err) {
			console.error('Login error:', err);
			if (
				err.code === 'auth/invalid-credential' ||
				err.code === 'auth/wrong-password' ||
				err.code === 'auth/user-not-found'
			) {
				error = 'Invalid email address or password. Please verify your credentials.';
			} else if (err.code === 'auth/too-many-requests') {
				error = 'Access temporarily restricted due to multiple failed login attempts. Please try again in a few minutes.';
			} else if (err.code === 'auth/invalid-email') {
				error = 'The email address format is invalid.';
			} else {
				error = err.message || 'An unexpected error occurred during sign in.';
			}
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Admin &amp; Employee Portal Sign In | Municipality of Tanauan, Leyte</title>
	<meta name="description" content="Authorized employee and administrative portal access for Tanauan Local Government Unit." />
</svelte:head>

<!-- Full-page Executive Login Canvas -->
<div class="relative min-h-screen w-full flex items-center justify-center bg-[#090D16] px-4 py-12 font-sans text-slate-800 selection:bg-indigo-500 selection:text-white">
	<!-- Ambient Background Geometric Lighting -->
	<div class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
		<div class="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-600/15 blur-[120px]"></div>
		<div class="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px]"></div>
		<div
			class="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]"
		></div>
	</div>

	<!-- Main Card Container -->
	<div class="relative z-10 w-full max-w-md">
		<!-- Back to Public Site Link -->
		<div class="mb-5 flex items-center justify-between">
			<a
				href="/"
				class="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
			>
				<ArrowLeft class="h-3.5 w-3.5" />
				<span>Back to Public Website</span>
			</a>
			<span class="inline-flex items-center gap-1.5 text-[11px] font-medium text-indigo-400">
				<ShieldCheck class="h-3.5 w-3.5" />
				<span>Official Portal</span>
			</span>
		</div>

		<!-- Login Card -->
		<div class="overflow-hidden rounded-3xl border border-slate-800 bg-white shadow-2xl">
			<!-- Header Banner with Seal -->
			<div class="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-8 pt-8 pb-6 text-center text-white relative">
				<div class="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-2 shadow-lg ring-4 ring-white/10">
					<img src="/tanauan logo.svg" alt="Tanauan Official Seal" class="h-full w-full object-contain" />
				</div>

				<h1 class="mt-4 text-xl font-extrabold tracking-tight sm:text-2xl text-white">
					Administrative Portal
				</h1>
				<p class="mt-1 text-xs text-indigo-300/80">
					Municipality of Tanauan, Leyte • Bungto han Kamag-araman
				</p>
			</div>

			<!-- Form Body -->
			<form onsubmit={submit} class="p-8 space-y-5">
				<!-- Error Alert -->
				{#if error}
					<div class="flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-700 animate-in fade-in duration-200">
						<AlertCircle class="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
						<span class="leading-relaxed font-medium">{error}</span>
					</div>
				{/if}

				<!-- Email Input -->
				<div class="space-y-1.5">
					<label for="admin-email" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
						Official Email Address
					</label>
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
							<Mail class="h-4 w-4" />
						</div>
						<input
							id="admin-email"
							type="email"
							bind:value={email}
							placeholder="employee@tanauan-leyte.gov.ph"
							required
							disabled={loading}
							class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 disabled:cursor-not-allowed disabled:opacity-60"
						/>
					</div>
				</div>

				<!-- Password Input with Toggle -->
				<div class="space-y-1.5">
					<div class="flex items-center justify-between">
						<label for="admin-password" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
							Password
						</label>
					</div>
					<div class="relative">
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
							<Lock class="h-4 w-4" />
						</div>
						<input
							id="admin-password"
							type={showPassword ? 'text' : 'password'}
							bind:value={password}
							placeholder="••••••••••••"
							required
							disabled={loading}
							class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-11 text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 disabled:cursor-not-allowed disabled:opacity-60"
						/>
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
							aria-label={showPassword ? 'Hide password' : 'Show password'}
						>
							{#if showPassword}
								<EyeOff class="h-4 w-4" />
							{:else}
								<Eye class="h-4 w-4" />
							{/if}
						</button>
					</div>
				</div>

				<!-- Sign In Button -->
				<button
					type="submit"
					disabled={loading}
					class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
				>
					{#if loading}
						<svg class="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						<span>Authenticating Session...</span>
					{:else}
						<span>Sign In to Dashboard</span>
						<ArrowRight class="h-4 w-4" />
					{/if}
				</button>

				<!-- Help Information Notice -->
				<div class="rounded-xl bg-slate-50 p-3 text-center text-[11px] text-slate-500 border border-slate-100">
					Need access or credentials? Please coordinate with the <strong class="text-slate-800">HRMO / IT Division</strong> at the Municipal Hall.
				</div>
			</form>

			<!-- Card Footer -->
			<div class="border-t border-slate-100 bg-slate-50/80 px-8 py-3 text-center text-[11px] text-slate-500">
				Authorized Personnel Only • 256-Bit SSL Encrypted
			</div>
		</div>

		<!-- Copyright -->
		<p class="mt-6 text-center text-[11px] text-slate-500 font-mono">
			&copy; 2025 Local Government Unit of Tanauan, Leyte. All Rights Reserved.
		</p>
	</div>
</div>
