import { env } from '$env/dynamic/public';

/**
 * Build a CDN URL for a given public asset path.
 * - If PUBLIC_CDN_BASE_URL is not set, returns the original path (local static fallback).
 * - Ensures there are no duplicate slashes and encodes the path portion.
 */
export function cdn(path) {
	if (!path) return path;
	const base = env.PUBLIC_CDN_BASE_URL || '';
	if (!base) return path;
	const trimmedBase = String(base).replace(/\/+$/g, '');
	const trimmedPath = String(path).replace(/^\/+/, '');
	return `${trimmedBase}/${encodeURI(trimmedPath)}`;
}

export default cdn;
