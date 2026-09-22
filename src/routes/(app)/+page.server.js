export async function load({ fetch }) {
	try {
		const [localRes, abroadRes, announcementsRes, generalNewsRes] = await Promise.all([
			fetch(`/api/posts?type=${encodeURIComponent('local news')}`),
			fetch(`/api/posts?type=${encodeURIComponent('abroad news')}`),
			fetch(`/api/posts?type=${encodeURIComponent('announcement')}`),
			fetch(`/api/posts?type=${encodeURIComponent('news')}`)
		]);

		let posts = [];
		if (localRes.ok) {
			const localData = await localRes.json();
			posts = [...posts, ...(localData.posts || [])];
		}
		if (abroadRes.ok) {
			const abroadData = await abroadRes.json();
			posts = [...posts, ...(abroadData.posts || [])];
		}
		if (generalNewsRes.ok) {
			const generalNewsData = await generalNewsRes.json();
			posts = [...posts, ...(generalNewsData.posts || [])];
		}
		// Sort by date, newest first
		posts.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));

		let announcements = [];
		if (announcementsRes.ok) {
			const announcementsData = await announcementsRes.json();
			announcements = (announcementsData.posts || []).sort(
				(a, b) => new Date(b.date_added) - new Date(a.date_added)
			);
		}

		return { posts, announcements };
	} catch (err) {
		let error = err.message;
		console.error('Error loading posts:', err);
		return { posts: [], announcements: [] };
	}
}
