<script>
	import { confirmState, resolveConfirm } from './confirm.js';
	import { AlertTriangle, HelpCircle } from 'lucide-svelte';

	let confirmButton = $state(null);

	$effect(() => {
		if ($confirmState) {
			// Focus the safe action so Enter never destroys data by accident.
			requestAnimationFrame(() => confirmButton?.focus());
		}
	});

	function handleKeydown(e) {
		if (!$confirmState) return;
		if (e.key === 'Escape') {
			e.preventDefault();
			resolveConfirm(false);
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if $confirmState}
	{@const c = $confirmState}
	<div class="fixed inset-0 z-[2500] flex items-center justify-center p-4">
		<div
			class="dialog-fade absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
			role="presentation"
			onclick={() => resolveConfirm(false)}
		></div>

		<div
			class="dialog-pop relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20"
			role="alertdialog"
			aria-modal="true"
			aria-labelledby="confirm-title"
		>
			<div class="p-5 sm:p-6">
				<div class="flex items-start gap-3.5">
					<div
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl {c.danger
							? 'bg-rose-50 text-rose-600'
							: 'bg-indigo-50 text-indigo-600'}"
					>
						{#if c.danger}
							<AlertTriangle class="h-5 w-5" />
						{:else}
							<HelpCircle class="h-5 w-5" />
						{/if}
					</div>

					<div class="min-w-0">
						<h2 id="confirm-title" class="text-base font-bold text-slate-900">{c.title}</h2>
						{#if c.message}
							<p class="mt-1.5 text-xs leading-relaxed text-slate-600">{c.message}</p>
						{/if}
						{#if c.details}
							<p
								class="mt-2 rounded-lg bg-slate-50 px-2.5 py-1.5 font-mono text-[11px] break-words text-slate-600"
							>
								{c.details}
							</p>
						{/if}
					</div>
				</div>
			</div>

			<div
				class="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end"
			>
				<button
					type="button"
					onclick={() => resolveConfirm(false)}
					class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
				>
					{c.cancelText}
				</button>
				<button
					type="button"
					bind:this={confirmButton}
					onclick={() => resolveConfirm(true)}
					class="rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all {c.danger
						? 'bg-rose-600 shadow-rose-600/25 hover:bg-rose-700'
						: 'bg-indigo-600 shadow-indigo-600/25 hover:bg-indigo-700'}"
				>
					{c.confirmText}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes dialog-fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes dialog-pop {
		from {
			opacity: 0;
			transform: translateY(8px) scale(0.96);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
	.dialog-fade {
		animation: dialog-fade 0.15s ease-out;
	}
	.dialog-pop {
		animation: dialog-pop 0.18s cubic-bezier(0.21, 1.02, 0.73, 1);
	}
</style>
