#!/usr/bin/env node
/**
 * Recompress the static images actually used by the site.
 *
 * Usage:
 *   node scripts/compress-images.mjs <list-file>
 *
 * The list file contains one project-relative path per line (e.g. "static/Tourism/x.jpg").
 *
 * Policy:
 *  - Downscale any image whose longest side exceeds 2560px (fit: inside, never enlarge).
 *  - Re-encode per format: JPEG (mozjpeg, q78), PNG (max lossless compression, downscaled),
 *    WebP (q78). Metadata/stripping is implicit (we never call withMetadata).
 *  - A file is only replaced when the result is strictly smaller than the original,
 *    so this can never increase the size of an asset.
 *  - SVG and GIF are skipped (vector art and animations are left untouched).
 *
 * Originals remain recoverable through git — every file here is tracked.
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const MAX_SIDE = 2560;
const WORKERS = 4;
const SKIP_FORMATS = new Set(['svg', 'gif']);

const listFile = process.argv[2];
if (!listFile) {
	console.error('Usage: node scripts/compress-images.mjs <list-file>');
	process.exit(1);
}

const targets = (await fs.readFile(listFile, 'utf8'))
	.split('\n')
	.map((l) => l.trim())
	.filter((l) => l && !l.startsWith('#'));

async function compressOne(relPath) {
	let stat;
	try {
		stat = await fs.stat(relPath);
	} catch {
		return { relPath, status: 'missing' };
	}

	let meta;
	try {
		meta = await sharp(relPath, { failOn: 'error' }).metadata();
	} catch (err) {
		return { relPath, status: 'unreadable', detail: err.message };
	}
	if (!meta.format || SKIP_FORMATS.has(meta.format)) {
		return { relPath, status: 'skipped', detail: meta.format || 'unknown' };
	}

	const before = stat.size;
	try {
		let pipeline = sharp(relPath, { failOn: 'error' });
		const longest = Math.max(meta.width || 0, meta.height || 0);
		if (longest > MAX_SIDE) {
			pipeline = pipeline.resize({
				width: MAX_SIDE,
				height: MAX_SIDE,
				fit: 'inside',
				withoutEnlargement: true
			});
		}

		if (meta.format === 'jpeg') {
			pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true, progressive: true });
		} else if (meta.format === 'png') {
			pipeline = pipeline.png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true });
		} else if (meta.format === 'webp') {
			pipeline = pipeline.webp({ quality: 78, effort: 6 });
		} else {
			return { relPath, status: 'skipped', detail: meta.format };
		}

		const buf = await pipeline.toBuffer();
		if (buf.length >= before) {
			return { relPath, status: 'kept', before, after: before, detail: 'no gain' };
		}
		await fs.writeFile(relPath, buf);
		return {
			relPath,
			status: 'compressed',
			before,
			after: buf.length,
			dims: `${meta.width}x${meta.height}${longest > MAX_SIDE ? ' → ≤' + MAX_SIDE : ''}`
		};
	} catch (err) {
		return { relPath, status: 'error', detail: err.message };
	}
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
const results = await runQueue(targets, compressOne, WORKERS);

let beforeTotal = 0;
let afterTotal = 0;
const summary = { compressed: 0, kept: 0, skipped: 0, missing: 0, unreadable: 0, error: 0 };
const topSavings = [];

for (const r of results) {
	summary[r.status] = (summary[r.status] || 0) + 1;
	if (typeof r.before === 'number' && typeof r.after === 'number') {
		beforeTotal += r.before;
		afterTotal += r.after;
		if (r.status === 'compressed') topSavings.push(r);
	}
	if (r.status === 'error' || r.status === 'unreadable') {
		console.error(`!! ${r.status}: ${r.relPath} — ${r.detail || ''}`);
	}
}

topSavings.sort((a, b) => b.before - b.after - (a.before - a.after));
console.log('\nTop savings:');
for (const r of topSavings.slice(0, 15)) {
	console.log(
		`  ${((r.before - r.after) / 1048576).toFixed(2).padStart(7)} MB  ` +
			`${(r.before / 1048576).toFixed(1)}→${(r.after / 1048576).toFixed(1)} MB  ${r.relPath}`
	);
}

console.log(`\nFiles: ${targets.length} | ${JSON.stringify(summary)}`);
console.log(
	`Total: ${(beforeTotal / 1048576).toFixed(1)} MB → ${(afterTotal / 1048576).toFixed(1)} MB ` +
		`(${beforeTotal ? Math.round((1 - afterTotal / beforeTotal) * 100) : 0}% saved, ` +
		`${((beforeTotal - afterTotal) / 1048576).toFixed(1)} MB) in ${((Date.now() - started) / 1000).toFixed(0)}s`
);
