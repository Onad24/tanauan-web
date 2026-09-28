import { writable } from 'svelte/store';

/**
 * Promise-based confirmation dialog — drop-in replacement for native confirm().
 *
 * Usage:
 *   import { confirmAction } from '$lib/admin/confirm';
 *   const ok = await confirmAction({
 *     title: 'Delete this post?',
 *     message: 'This permanently removes the record and its media.',
 *     confirmText: 'Delete',
 *     danger: true
 *   });
 *   if (!ok) return;
 */
export const confirmState = writable(null);

export function confirmAction({
	title = 'Are you sure?',
	message = '',
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	danger = false,
	details = ''
} = {}) {
	return new Promise((resolve) => {
		confirmState.set({
			key: Date.now(),
			title,
			message,
			details,
			confirmText,
			cancelText,
			danger,
			resolve
		});
	});
}

export function resolveConfirm(value) {
	confirmState.update((state) => {
		state?.resolve?.(value);
		return null;
	});
}
