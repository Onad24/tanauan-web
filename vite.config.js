import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

const IMAGE_EXT = 'jpe?g|jfif|avif|png|webp|gif|svg';
const MANIFEST_URL = new URL('./static-cdn-manifest.json', import.meta.url);

/**
 * Build-time image CDN rewrite (Supabase storage).
 *
 * When PUBLIC_CDN_BASE_URL is set (e.g. https://<project>.supabase.co/storage/v1/object/public/assets),
 * every static image path literal under src/ (`"/images/logo.jpg"`, `url(/images/x.png)`, …)
 * is rewritten to the CDN URL before Svelte/Vite compile it, so SSR and client both render
 * Supabase-hosted images without touching a single page file.
 *
 * A rewrite only happens when the object key is listed in `static-cdn-manifest.json`
 * (generated after scripts/upload-assets.mjs runs), so the plugin never points at an
 * object that was not actually uploaded. Svelte `{…}` template paths cannot be resolved
 * to a key and are rewritten unconditionally (they are always image paths by construction).
 *
 * Non-image files (PDFs, legacy HTML/CSS/JS, fonts) are NOT rewritten here: Supabase
 * serves .html as text/plain with a sandbox CSP, so those files are proxied at app
 * origin by src/hooks.server.js instead (see PUBLIC_CDN_FILES_URL).
 *
 * When the variable is unset the plugin is a no-op and the app keeps serving from local
 * static/ — a safe fallback. Runtime-assembled URLs (paths concatenated from data) are
 * not rewritten and resolve against local static/ (or the hooks.server proxy).
 */
function supabaseCdnAssets(imageBase) {
	if (!imageBase) {
		return {
			name: 'supabase-cdn-assets',
			transform() {
				return null;
			}
		};
	}

	// Re-read the manifest whenever it changes on disk, so regenerating it
	// (scripts/upload-assets.mjs flow) takes effect without restarting Vite.
	let imageKeys = new Set();
	let manifestMtime = 0;
	function loadManifest() {
		try {
			const { mtimeMs } = fs.statSync(MANIFEST_URL);
			if (mtimeMs === manifestMtime) return;
			manifestMtime = mtimeMs;
			imageKeys = new Set(JSON.parse(fs.readFileSync(MANIFEST_URL, 'utf8')).assets || []);
		} catch {
			// no manifest yet — only template paths (below) will be rewritten
		}
	}
	loadManifest();

	/** Pick the CDN base for a root-relative image path, or null to leave it untouched. */
	function pickBase(p) {
		let key;
		try {
			key = decodeURIComponent(p.split(/[?#]/)[0]);
		} catch {
			key = p.split(/[?#]/)[0];
		}
		if (!IMAGE_EXT.split('|').some((e) => new RegExp(`\\.${e}$`, 'i').test(key))) return null;
		if (key.includes('{')) return imageBase;
		return imageKeys.has(key.replace(/^\//, '')) ? imageBase : null;
	}

	// Quoted paths: "/images/x.jpg", '/Tourism/history/h.jpg', including paths with
	// spaces and Svelte `{…}` expressions inside the quotes (expression stays intact).
	const quoted = new RegExp(`(["'])(/[^"'\\n]*?\\.(?:${IMAGE_EXT}))\\1`, 'gi');
	// CSS url(/images/x.png) without quotes.
	const cssUrl = new RegExp(`(url\\(\\s*)(/[^)"'\\n]*?\\.(?:${IMAGE_EXT}))(\\s*\\))`, 'gi');

	return {
		name: 'supabase-cdn-assets',
		enforce: 'pre',
		transform(code, id) {
			const file = id.split('?')[0];
			if (!/\/src\/.*\.(svelte|js|css|html)$/.test(file)) return null;
			loadManifest();
			let changed = false;
			const out = code
				.replace(quoted, (m, q, p) => {
					const base = pickBase(p);
					if (!base) return m;
					changed = true;
					return `${q}${base}${p}${q}`;
				})
				.replace(cssUrl, (m, pre, p, post) => {
					const base = pickBase(p);
					if (!base) return m;
					changed = true;
					return `${pre}${base}${p}${post}`;
				});
			return changed ? { code: out, map: null } : null;
		}
	};
}

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const cdnBase = (env.PUBLIC_CDN_BASE_URL || process.env.PUBLIC_CDN_BASE_URL || '').replace(
		/\/+$/,
		''
	);
	return {
		plugins: [tailwindcss(), sveltekit(), supabaseCdnAssets(cdnBase)],
		server: {
			watch: {
				ignored: ['**/.vercel/**', '**/scratch/**']
			}
		},
		optimizeDeps: {
			exclude: ['firebase-admin']
		}
	};
});
