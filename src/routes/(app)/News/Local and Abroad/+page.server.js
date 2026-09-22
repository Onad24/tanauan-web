export async function load({ fetch }) {
	try {
		const [localRes, abroadRes, announcementRes, generalNewsRes] = await Promise.all([
			fetch(`/api/posts?type=${encodeURIComponent('local news')}`),
			fetch(`/api/posts?type=${encodeURIComponent('abroad news')}`),
			fetch(`/api/posts?type=${encodeURIComponent('announcement')}`),
			fetch(`/api/posts?type=${encodeURIComponent('news')}`)
		]);
		if (!localRes.ok || !abroadRes.ok) throw new Error('Failed to fetch news');
		const localData = await localRes.json();
		const abroadData = await abroadRes.json();
		const announcementData = announcementRes.ok ? await announcementRes.json() : { posts: [] };
		const generalNewsData = generalNewsRes.ok ? await generalNewsRes.json() : { posts: [] };
		const posts = [
			...(localData.posts || []),
			...(abroadData.posts || []),
			...(announcementData.posts || []),
			...(generalNewsData.posts || [])
		];
		return { posts };
	} catch (err) {
		let error = err.message;
		console.error('Error loading news:', err);
		return { posts: [] };
	}
}
