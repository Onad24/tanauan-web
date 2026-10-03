import { env } from '$env/dynamic/public';
import manifest from '../static-cdn-manifest.json';

/**
 * Serve uploaded static files from Supabase storage at app origin.
 *
 * Every key in static-cdn-manifest.json exists as an object in one of two public
 * buckets (images → PUBLIC_CDN_BASE_URL / `assets`, non-images → PUBLIC_CDN_FILES_URL /
 * `static-files`). Images are normally referenced through the build-time rewrite in
 * vite.config.js and load directly from the CDN, but any request that reaches the app
 * origin (relative refs inside legacy pages, runtime-assembled URLs, links we chose not
 * to rewrite) is fetched from the bucket here instead of from local static/.
 *
 * Proxying non-image files is required, not just nice: Supabase serves .html objects as
 * text/plain with a sandbox CSP, so legacy/form pages only render when they are served
 * from our own origin with a proper content type.
 *
 * When the env vars are unset (local fallback mode) the hook is a passthrough and files
 * resolve from local static/ as before.
 */
let entries = null;

function getEntries() {
	if (entries) return entries;
	entries = new Map();
	const imageBase = (
		env.PUBLIC_CDN_BASE_URL ||
		'https://dqooabpikiranbzbxeoj.supabase.co/storage/v1/object/public/assets'
	).replace(/\/+$/, '');
	const filesBase = (
		env.PUBLIC_CDN_FILES_URL ||
		'https://dqooabpikiranbzbxeoj.supabase.co/storage/v1/object/public/static-files'
	).replace(/\/+$/, '');
	if (imageBase) {
		for (const key of manifest.assets || []) entries.set(key, imageBase);
	}
	if (filesBase) {
		for (const key of manifest.staticFiles || []) entries.set(key, filesBase);
	}
	return entries;
}

function encodeKey(key) {
	return key
		.split('/')
		.map((seg) => encodeURIComponent(seg))
		.join('/');
}

// Content type derived from the object key. Supabase force-labels .html objects as
// text/plain with a sandbox CSP when serving them publicly (anti-XSS hardening); we
// serve our own trusted content from our origin, so the real type must win or legacy
// and form pages would display as source text instead of rendering.
const CONTENT_TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.htm': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.json': 'application/json',
	'.map': 'application/json',
	'.pdf': 'application/pdf',
	'.vtt': 'text/vtt',
	'.txt': 'text/plain; charset=utf-8',
	'.csv': 'text/csv',
	'.woff2': 'font/woff2',
	'.woff': 'font/woff',
	'.ttf': 'font/ttf',
	'.otf': 'font/otf',
	'.svg': 'image/svg+xml',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.jfif': 'image/jpeg',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.gif': 'image/gif',
	'.avif': 'image/avif',
	'.mp4': 'video/mp4',
	'.webm': 'video/webm',
	'.mp3': 'audio/mpeg'
};

function contentTypeFor(key, upstream) {
	const dot = key.lastIndexOf('.');
	if (dot !== -1) {
		const type = CONTENT_TYPES[key.slice(dot).toLowerCase()];
		if (type) return type;
	}
	return upstream || 'application/octet-stream';
}

export async function handle({ event, resolve }) {
	const method = event.request.method;
	if (method === 'GET' || method === 'HEAD') {
		const map = getEntries();
		if (map.size > 0) {
			let key;
			try {
				key = decodeURIComponent(event.url.pathname).replace(/^\//, '');
			} catch {
				key = null;
			}
			const base = key ? map.get(key) : null;
			if (base) {
				try {
					const upstream = await fetch(`${base}/${encodeKey(key)}`, { method });
					if (upstream.ok) {
						const headers = new Headers();
						headers.set('content-type', contentTypeFor(key, upstream.headers.get('content-type')));
						headers.set('cache-control', 'public, max-age=3600');
						return new Response(method === 'HEAD' ? null : upstream.body, {
							status: 200,
							headers
						});
					}
				} catch {
					// bucket unreachable — fall through to normal resolution (local static/ or 404)
				}
			}
		}
	}
	return resolve(event);
}
