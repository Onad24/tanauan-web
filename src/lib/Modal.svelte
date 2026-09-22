<script>
	export let open = false;
	export let title = '';
	export let size = 'max-w-lg';
	const close = () => {
		open = false;
		const ev = new CustomEvent('close');
		dispatchEvent(ev);
	};
</script>

{#if open}
	<div class="modal-backdrop">
		<div class="modal-panel {size}">
			<div class="modal-header">
				<h3>{title}</h3>
			</div>
			<div class="modal-body">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.45);
		z-index: 60;
	}
	.modal-panel {
		background: white;
		border-radius: 8px;
		padding: 1rem;
		box-shadow: 0 10px 30px rgba(2, 6, 23, 0.2);
		width: 90%;
		max-width: 640px;
	}
	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}
	.modal-body {
		max-height: 65vh;
		overflow: auto;
	}
	.btn-close {
		background: transparent;
		border: none;
		font-size: 1.1rem;
		cursor: pointer;
	}
</style>
