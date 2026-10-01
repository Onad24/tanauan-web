#!/usr/bin/env node
/**
 * Plan which static/ files the site actually needs after assets move to Supabase.
 *
 * Walks src/ for root-relative references to static/ files (any extension), then
 * expands that set through the referenced files themselves (a referenced legacy
 * HTML page pulls in its own CSS/JS/images, a referenced CSS pulls fonts, a JS
 * pulls its sourceMappingURL, etc.).
 *
 * Outputs two upload lists (project-relative paths, one per line):
 *   /tmp/static-images.txt  -> image files (bucket 'assets')
 *   /tmp/static-other.txt   -> non-image files (bucket 'static-files')
 *
 * Files in static/ NOT in either list are unreferenced: they are still moved to
 * the backup folder, but not uploaded.
 *
 * Usage: node scripts/plan-static-upload.mjs [out-images] [out-other] [rootDir]
 *
 * rootDir defaults to `static`; after the move pass `../tanauan-static-assets`
 * (outputs always use the `static/` prefix, which upload-assets.mjs expects).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.argv[4] || 'static';
const IMAGE_RE = /\.(jpe?g|jfif|png|webp|gif|svg|avif)$/i;
const ANY_EXT =
	/\.(jpe?g|jfif|png|webp|gif|svg|avif|pdf|docx?|xlsx?|html?|css|m?js|json|map|vtt|srt|woff2?|ttf|otf|txt|csv|mp4|webm|mp3|zip)$/i;
// parseable file types whose contents can reference other files
const CRAWLABLE = /\.(html?|css|m?js|json|svg)$/i;

const outImages = process.argv[2] || '/tmp/static-images.txt';
const outOther = process.argv[3] || '/tmp/static-other.txt';

function walk(dir, out = []) {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) walk(p, out);
		else out.push(p.split(path.sep).join('/'));
	}
	return out;
}

function decode(p) {
	try {
		return decodeURIComponent(p);
	} catch {
		return p;
	}
}

/** Find candidate references inside some file content. Returns raw ref strings. */
function findRefs(content, { allowRelative = false } = {}) {
	// normalize SvelteKit template tokens so "%sveltekit.assets%/x.svg" and
	// "%sveltekit.env.PUBLIC_CDN_BASE_URL%/x.svg" both scan as "/x.svg"
	const text = content
		.replace(/%sveltekit\.assets%/g, '/')
		.replace(/%sveltekit\.env\.[A-Za-z0-9_]+%/g, '/');
	const refs = [];
	const quoted = /(["'])((?:\/)[^"'<>|*]*?\.(?:[A-Za-z0-9]+)(?:[?#][^"'<>|*]*?)?)\1/g;
	let m;
	while ((m = quoted.exec(text))) refs.push(m[2]);
	const url =
		/url\(\s*(['"]?)((?![a-z][a-z0-9+.-]*:)(?!\/\/)(?!#)[^)"']*?\.(?:[A-Za-z0-9]+))\1\s*\)/gi;
	while ((m = url.exec(text))) refs.push(m[2]);
	if (allowRelative) {
		const rel =
			/(["'])((?!\/)(?!https?:)(?!data:)(?!#)(?!@)[^"'<>|*\s]*?\.(?:[A-Za-z0-9]+)(?:[?#][^"'<>|*]*)?)\1/g;
		while ((m = rel.exec(text))) refs.push(m[2]);
	}
	const sm = /\/\/#\s*sourceMappingURL=(\S+)/g;
	while ((m = sm.exec(text))) refs.push(m[1]);
	return refs;
}

function resolveRef(raw, fromFile) {
	if (typeof raw === 'object') return null; // handled by caller with base dir
	const cleaned = decode(String(raw).split(/[?#]/)[0]);
	if (!ANY_EXT.test(cleaned)) return null;
	if (cleaned.startsWith('/')) return cleaned.replace(/^\//, '');
	// relative to the referencing file
	const base = path.posix.dirname(fromFile.replace(/^static\//, ''));
	return path.posix.normalize(path.posix.join(base, cleaned));
}

/** A static-file key is valid when it resolves to an existing file under ROOT. */
function existsStatic(key) {
	if (!key || key.startsWith('..')) return false;
	try {
		return fs.statSync(path.join(ROOT, key)).isFile();
	} catch {
		return false;
	}
}

// ---------- pass 1: direct references from src/ ----------
const srcFiles = fs.existsSync('src') ? walk('src') : [];
const queue = [];
const seen = new Set();

function add(rel) {
	if (!existsStatic(rel) || seen.has(rel)) return;
	seen.add(rel);
	queue.push(rel);
}

for (const f of srcFiles) {
	if (!/\.(svelte|js|mjs|ts|css|html)$/.test(f)) continue;
	const content = fs.readFileSync(f, 'utf8');
	for (const ref of findRefs(content)) {
		add(resolveRef(ref, f));
	}
}

const directCount = seen.size;

// ---------- pass 2: closure through referenced static files ----------
while (queue.length) {
	const file = queue.shift();
	if (!CRAWLABLE.test(file)) continue;
	let content;
	try {
		content = fs.readFileSync(path.join(ROOT, file), 'utf8');
	} catch {
		continue;
	}
	const refs = findRefs(content, { allowRelative: true });
	for (const ref of refs) {
		let rel;
		if (ref.startsWith('/')) {
			rel = resolveRef(ref, file);
		} else {
			const base = path.posix.dirname(file);
			rel = path.posix.normalize(path.posix.join(base, decode(ref).split(/[?#]/)[0]));
		}
		if (rel && ANY_EXT.test(rel)) add(rel);
	}
}

// ---------- classify ----------
const allStatic = walk(ROOT);
const keyOf = (f) => path.relative(ROOT, f).split(path.sep).join('/');
const images = [];
const others = [];
const unreferencedImages = [];
const unreferencedOthers = [];

let imgBytes = 0;
let othBytes = 0;
let unImgBytes = 0;
let unOthBytes = 0;

for (const f of allStatic) {
	const key = keyOf(f);
	const size = fs.statSync(f).size;
	const used = seen.has(key);
	if (IMAGE_RE.test(key)) {
		if (used) {
			images.push(key);
			imgBytes += size;
		} else {
			unreferencedImages.push(key);
			unImgBytes += size;
		}
	} else if (used) {
		others.push(key);
		othBytes += size;
	} else {
		unreferencedOthers.push(key);
		unOthBytes += size;
	}
}

// lists keep the `static/` prefix that scripts/upload-assets.mjs expects
fs.writeFileSync(
	outImages,
	images
		.sort()
		.map((k) => `static/${k}`)
		.join('\n') + '\n'
);
fs.writeFileSync(
	outOther,
	others
		.sort()
		.map((k) => `static/${k}`)
		.join('\n') + '\n'
);

const mb = (n) => (n / 1048576).toFixed(1) + ' MB';
console.log(`direct references from src/: ${directCount}`);
console.log(`closure size:                 ${seen.size}`);
console.log('');
console.log(`UPLOAD -> assets      (images): ${images.length} files, ${mb(imgBytes)}`);
console.log(`UPLOAD -> static-files (other): ${others.length} files, ${mb(othBytes)}`);
console.log(
	`  other breakdown: ${[...new Set(others.map((f) => path.extname(f).toLowerCase()))].sort().join(' ')}`
);
console.log(
	`NOT uploaded (unreferenced): images ${unreferencedImages.length} (${mb(unImgBytes)}), other ${unreferencedOthers.length} (${mb(unOthBytes)})`
);
