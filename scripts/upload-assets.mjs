#!/usr/bin/env node
/**
 * Upload project static files to a public Supabase storage bucket.
 *
 * Usage:
 *   node scripts/upload-assets.mjs <list-file> [bucket] [rootDir]
 *
 * bucket defaults to 'assets' (images). Non-image files go to 'static-files':
 *   node scripts/upload-assets.mjs /tmp/static-other.txt static-files
 *
 * rootDir is where the listed files are read from (default 'static'); after the
 * move pass '../tanauan-static-assets'. List entries always use the 'static/' prefix.
 *
 * The list file contains project-relative paths (e.g. "static/Tourism/x.jpg");
 * object keys mirror the static/ layout ("Tourism/x.jpg") so a bucket can be used
 * as a drop-in PUBLIC_CDN_BASE_URL / PUBLIC_CDN_FILES_URL target.
 *
 * Requires VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY in .env and temporary write
 * policies on storage.objects for the target bucket. Upsert needs all three commands
 * (Supabase docs: "To allow overwriting files using the upsert functionality you
 * will need to additionally grant SELECT and UPDATE permissions"). Create them via
 * the Supabase SQL editor / MCP before running, then drop them again afterwards so
 * the bucket stays read-only. For bucket 'assets' (repeat with 'static-files'):
 *
 *   create policy "assets insert" on storage.objects for insert to public
 *     with check (bucket_id = 'assets');
 *   create policy "assets select" on storage.objects for select to public
 *     using (bucket_id = 'assets');
 *   create policy "assets update" on storage.objects for update to public
 *     using (bucket_id = 'assets') with check (bucket_id = 'assets');
 *   -- (delete policy only needed to remove objects)
 *   create policy "assets delete" on storage.objects for delete to public
 *     using (bucket_id = 'assets');
 *
 * Public reads of a public bucket do NOT need any policy.
 * Uploads are upserts, so re-running is safe and idempotent.
 */
import fs from 'node:fs';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

const CONCURRENCY = 6;
const RETRIES = 2;

function loadEnv() {
	const out = {};
	try {
		const text = fs.readFileSync('.env', 'utf8');
		for (const line of text.split('\n')) {
			const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
			if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
		}
	} catch {
		/* fall back to process.env */
	}
	return {
		url: out.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
		key: out.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY
	};
}

const listFile = process.argv[2];
const bucket = process.argv[3] || 'assets';
const root = process.argv[4] || 'static';
if (!listFile) {
	console.error('Usage: node scripts/upload-assets.mjs <list-file> [bucket] [rootDir]');
	process.exit(1);
}

const { url, key } = loadEnv();
if (!url || !key) {
	console.error('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY');
	process.exit(1);
}
const base = `${url}/storage/v1`;

const targets = fs
	.readFileSync(listFile, 'utf8')
	.split('\n')
	.map((l) => l.trim())
	.filter((l) => l && !l.startsWith('#'))
	.map((l) => l.replace(/^static\//, '')); // object keys; local file = <root>/<key>

const mimeTypes = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.jfif': 'image/jpeg',
	'.png': 'image/png',
	'.webp': 'image/webp',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.avif': 'image/avif',
	'.pdf': 'application/pdf',
	'.html': 'text/html; charset=utf-8',
	'.htm': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.json': 'application/json',
	'.map': 'application/json',
	'.vtt': 'text/vtt',
	'.woff2': 'font/woff2',
	'.woff': 'font/woff',
	'.ttf': 'font/ttf',
	'.otf': 'font/otf',
	'.txt': 'text/plain; charset=utf-8',
	'.csv': 'text/csv',
	'.doc': 'application/msword',
	'.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'.xls': 'application/vnd.ms-excel',
	'.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'.mp4': 'video/mp4',
	'.webm': 'video/webm',
	'.mp3': 'audio/mpeg',
	'.zip': 'application/zip'
};

function encodeKey(rel) {
	return rel
		.split('/')
		.map((seg) => encodeURIComponent(seg))
		.join('/');
}

async function uploadOne(rel) {
	const body = await readFile(path.join(root, rel));
	const mime = mimeTypes[path.extname(rel).toLowerCase()] || 'application/octet-stream';
	const endpoint = `${base}/object/${bucket}/${encodeKey(rel)}`;

	let lastErr = '';
	for (let attempt = 0; attempt <= RETRIES; attempt++) {
		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: {
					apikey: key,
					Authorization: `Bearer ${key}`,
					'Content-Type': mime,
					'x-upsert': 'true'
				},
				body
			});
			if (res.ok) return { rel, status: 'uploaded', bytes: body.length };
			lastErr = `HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`;
		} catch (err) {
			lastErr = err.message;
		}
		await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
	}
	return { rel, status: 'failed', detail: lastErr };
}

async function runQueue(items, worker, concurrency) {
	const results = [];
	let index = 0;
	await Promise.all(
		Array.from({ length: concurrency }, async () => {
			while (index < items.length) {
				const i = index++;
				results[i] = await worker(items[i]);
			}
		})
	);
	return results;
}

const started = Date.now();
const results = await runQueue(targets, uploadOne, CONCURRENCY);
const failed = results.filter((r) => r.status === 'failed');
const uploaded = results.filter((r) => r.status === 'uploaded');
const totalBytes = uploaded.reduce((s, r) => s + r.bytes, 0);

for (const f of failed) console.error(`!! FAILED ${f.rel} — ${f.detail}`);
console.log(
	`[${bucket}] Uploaded ${uploaded.length}/${targets.length} files (${(totalBytes / 1048576).toFixed(1)} MB) in ${((Date.now() - started) / 1000).toFixed(0)}s` +
		(failed.length ? `, ${failed.length} FAILED` : '')
);
process.exit(failed.length ? 1 : 0);
