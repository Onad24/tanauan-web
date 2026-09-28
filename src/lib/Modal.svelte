<script>
	/**
	 * Shared dialog used across the public site and the admin console.
	 *
	 * Props:
	 *   open    — bindable visibility flag (`bind:open={showModal}`)
	 *   title   — heading rendered in the panel header
	 *   size    — Tailwind max-width utility (max-w-lg | max-w-2xl | max-w-3xl | …)
	 *   onclose — optional callback fired whenever the dialog requests to close
	 */
	let { open = $bindable(false), title = '', size = 'max-w-lg', children, onclose } = $props();

	let panel = $state(null);

	function close() {
		open = false;
		onclose?.();
	}

	function handleKeydown(e) {
		if (open && e.key === 'Escape') {
			e.preventDefault();
			close();
		}
	}

	// Prevent background scrolling while a dialog is open
	$effect(() => {
		if (!open) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previous;
		};
	});

	// Move focus into the dialog so keyboard users land in the right place
	$effect(() => {
		if (open) requestAnimationFrame(() => panel?.focus());
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div
		class="fixed inset-0 z-[1100] flex items-start justify-center overflow-y-auto p-4 py-8 sm:items-center sm:py-8"
	>
		<!-- Backdrop -->
		<div
			class="modal-fade fixed inset-0 bg-slate-950/50 backdrop-blur-sm"
			role="presentation"
			onclick={close}
		></div>

		<!-- Panel -->
		<div
			bind:this={panel}
			role="dialog"
			aria-modal="true"
			aria-label={title || 'Dialog'}
			tabindex="-1"
			class="modal-pop relative w-[calc(100%-2rem)] {size} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/20 outline-none"
		>
			{#if title}
				<div
					class="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6"
				>
					<h3 class="text-sm leading-snug font-bold text-slate-900 sm:text-base">{title}</h3>
					<button
						type="button"
						onclick={close}
						class="-mr-1.5 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
						aria-label="Close dialog"
					>
						<svg
							viewBox="0 0 24 24"
							class="h-4 w-4"
							fill="none"
							stroke="currentColor"
							stroke-width="2.2"
							stroke-linecap="round"
						>
							<path d="M18 6 6 18M6 6l12 12" />
						</svg>
					</button>
				</div>
			{/if}

			<div class="max-h-[70vh] overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
				{@render children?.()}
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes modal-fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes modal-pop {
		from {
			opacity: 0;
			transform: translateY(10px) scale(0.97);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
	.modal-fade {
		animation: modal-fade 0.15s ease-out;
	}
	.modal-pop {
		animation: modal-pop 0.2s cubic-bezier(0.21, 1.02, 0.73, 1);
	}
</style>
