<script>
	import { toasts, dismiss } from './toast.js';
	import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-svelte';

	const meta = {
		success: {
			icon: CheckCircle2,
			frame: 'border-emerald-200 bg-white',
			iconBox: 'bg-emerald-50 text-emerald-600',
			title: 'text-emerald-700'
		},
		error: {
			icon: AlertCircle,
			frame: 'border-rose-200 bg-white',
			iconBox: 'bg-rose-50 text-rose-600',
			title: 'text-rose-700'
		},
		warning: {
			icon: AlertTriangle,
			frame: 'border-amber-200 bg-white',
			iconBox: 'bg-amber-50 text-amber-600',
			title: 'text-amber-700'
		},
		info: {
			icon: Info,
			frame: 'border-sky-200 bg-white',
			iconBox: 'bg-sky-50 text-sky-600',
			title: 'text-sky-700'
		}
	};
</script>

<div
	class="pointer-events-none fixed inset-x-4 bottom-4 z-[3000] flex flex-col items-stretch gap-2.5 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[min(24rem,calc(100vw-2rem))]"
	role="status"
	aria-live="polite"
	aria-atomic="false"
>
	{#each $toasts as t (t.id)}
		{@const m = meta[t.type] ?? meta.info}
		<div
			class="toast-in pointer-events-auto flex items-start gap-3 rounded-2xl border {m.frame} p-3.5 shadow-lg shadow-slate-900/10"
		>
			<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl {m.iconBox}">
				<svelte:component this={m.icon} class="h-4 w-4" />
			</div>

			<div class="min-w-0 flex-1">
				<p class="text-xs font-bold capitalize {m.title}">{t.type}</p>
				<p class="mt-0.5 text-xs leading-relaxed break-words text-slate-700">{t.message}</p>
				{#if t.description}
					<p class="mt-1 text-[11px] leading-relaxed text-slate-500">{t.description}</p>
				{/if}
			</div>

			<button
				type="button"
				onclick={() => dismiss(t.id)}
				class="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
				aria-label="Dismiss notification"
			>
				<X class="h-3.5 w-3.5" />
			</button>
		</div>
	{/each}
</div>

<style>
	@keyframes toast-in {
		from {
			opacity: 0;
			transform: translateY(8px) scale(0.97);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
	.toast-in {
		animation: toast-in 0.22s cubic-bezier(0.21, 1.02, 0.73, 1);
	}
</style>
