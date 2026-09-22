export async function load({ fetch }) {
	try {
		const response = await fetch(`/api/awards`);
		if (!response.ok) throw new Error('Failed to fetch personnel');
		const data = await response.json();
		const rows = data.posts || [];
		return { rows };
	} catch (err) {
		let error = err.message;
		console.error('Error loading personnel:', err);
	}
}
