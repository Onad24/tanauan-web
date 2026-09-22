let adapter;

try {
	const vercel = (await import('@sveltejs/adapter-cloudflare')).default;
	adapter = vercel({
		runtime: 'nodejs22.x'
	});
} catch {
	const auto = (await import('@sveltejs/adapter-auto')).default;
	adapter = auto();
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter
	}
};

export default config;