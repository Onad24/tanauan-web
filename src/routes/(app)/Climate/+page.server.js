// src/routes/Climate/+page.server.js
import { env } from '$env/dynamic/private';

export async function load({ fetch }) {
	// Read key from environment (set WEATHER_API_KEY in production)
	const key = env.WEATHER_API_KEY || env.WEATHERAPI_KEY;

	if (!key) {
		// In production we should fail loudly or return null data; avoid embedding keys in source
		console.error('WEATHER_API_KEY not set. Skipping weather fetch.');
		return { climateData: null };
	}

	try {
		const url = `https://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(
			key
		)}&q=Tanauan, Leyte&aqi=no`;

		const response = await fetch(url);

		if (!response.ok) {
			console.error('Fetch failed:', response.status, response.statusText);
			return { climateData: null };
		}

		const result = await response.json();

		if (result?.current) {
			return {
				climateData: result.current
			};
		} else {
			console.error('Unexpected result format:', result);
			return { climateData: null };
		}
	} catch (error) {
		console.error('Fetch error:', error);
		return { climateData: null };
	}
}
