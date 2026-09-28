// src/routes/Climate/+page.js
export async function load({ fetch }) {
	try {
		const res = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=9d841868086d479c8f875841252507&q=Tanauan, Leyte`
		);

		if (!res.ok) {
			return { climateData: null };
		}

		const result = await res.json();
		return {
			climateData: result.current
		};
	} catch (e) {
		return {
			climateData: null
		};
	}
}
