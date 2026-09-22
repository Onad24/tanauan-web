export async function load({ fetch }) {
	try {
		const res = await fetch(`/api/posts?type=${encodeURIComponent('activity')}`);
		if (!res.ok) throw new Error('Failed to fetch activities');
		const data = await res.json();
		return { posts: data.posts || [] };
	} catch (err) {
		console.error('Error loading activities:', err);
		return { posts: [] };
	}
}
