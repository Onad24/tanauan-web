// Smoke-check: find component references in .svelte files that are never imported or declared.
// Catches runtime-only bugs like the `Layers is not defined` SSR crash (invisible to the compiler).
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = process.env.CHECK_ROOT || path.join(__dirname, '..', 'src');
const files = execSync(`find "${root}" -name "*.svelte"`, { encoding: 'utf8' }).trim().split('\n');

const issues = [];
for (const file of files) {
	const src = fs.readFileSync(file, 'utf8');
	const scriptMatch = src.match(/<script[^>]*>([\s\S]*?)<\/script>/);
	const script = scriptMatch ? scriptMatch[1] : '';
	const markup = src.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');

	const imported = new Set();
	for (const m of script.matchAll(/import\s+([^;]+?)\s+from\s+['"][^'"]+['"]/g)) {
		const clause = m[1].trim();
		const brace = clause.match(/\{([^}]+)\}/);
		if (brace)
			brace[1].split(',').forEach((s) => {
				s = s.trim();
				if (!s) return;
				const alias = s.split(/\s+as\s+/);
				imported.add((alias[1] || alias[0]).trim());
			});
		const before = clause.split('{')[0].replace(/,$/, '').trim();
		if (before && !before.startsWith('*'))
			before.split(',').forEach((s) => {
				const t = s.trim();
				if (t) imported.add(t);
			});
	}

	const locals = new Set();
	for (const m of script.matchAll(/(?:let|const|var|function|class)\s+([A-Za-z_$][\w$]*)/g))
		locals.add(m[1]);
	for (const m of script.matchAll(/\b(?:let|const)\s*\{([^}]+)\}/g))
		m[1].split(',').forEach((s) => {
			const t = s.trim().split(/[:=]/)[0].trim();
			if (t) locals.add(t);
		});

	const used = new Set();
	for (const m of markup.matchAll(/<\/?([A-Z][A-Za-z0-9]*)[\s/>]/g)) used.add(m[1]);
	// Component references inside the script too (e.g. nav models: `icon: Layers`)
	for (const m of src.matchAll(/\b(?:icon|component|this):\s*([A-Z][A-Za-z0-9]*)/g)) used.add(m[1]);
	used.delete('SvelteComponent');

	for (const name of used) {
		if (!imported.has(name) && !locals.has(name)) {
			issues.push(`${path.relative(root, file)}: <${name}> used but never imported/declared`);
		}
	}
}
console.log(
	issues.length
		? issues.join('\n')
		: 'ALL CLEAN — no unresolved component references in any .svelte file'
);
