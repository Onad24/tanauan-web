import { writable } from 'svelte/store';

/**
 * Lightweight toast notification system for the admin console.
 *
 * Usage:
 *   import { toast } from '$lib/admin/toast';
 *   toast.success('Employee saved');
 *   toast.error('Could not reach the server');
 *   await toast.apiError(response, 'Save failed');
 */
export const toasts = writable([]);

let idCounter = 0;

function add(type, message, options = {}) {
	const id = ++idCounter;
	const duration = options.duration ?? (type === 'error' ? 7000 : 4500);

	toasts.update((list) => [
		...list.slice(-4), // never stack more than 5 at once
		{ id, type, message: String(message ?? ''), description: options.description || '' }
	]);

	if (duration > 0) {
		setTimeout(() => dismiss(id), duration);
	}
	return id;
}

export function dismiss(id) {
	toasts.update((list) => list.filter((t) => t.id !== id));
}

export const toast = {
	success: (message, options) => add('success', message, options),
	error: (message, options) => add('error', message, options),
	info: (message, options) => add('info', message, options),
	warning: (message, options) => add('warning', message, options),
	dismiss,
	/**
	 * Reads a readable message out of a failed fetch Response and shows it as an error toast.
	 */
	async apiError(response, fallback = 'Something went wrong') {
		let message = fallback;
		try {
			const clone = response.clone();
			const data = await clone.json();
			message = data?.error || data?.message || message;
		} catch {
			try {
				const text = await response.text();
				if (text && text.length < 300) message = text;
			} catch {
				/* keep fallback */
			}
		}
		return add('error', message);
	}
};
