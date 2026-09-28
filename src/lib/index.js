// place files you want to import through the `$lib` alias in this folder.
export function extractDriveId(url) {
	const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
	console.log('Extracted ID:', match ? match[1] : null);
	return match ? match[1] : null;
}
