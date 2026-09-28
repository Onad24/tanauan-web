<script>
	export let climateData;
</script>

<div class="rounded-md border bg-white p-4 text-sm text-gray-800 shadow-md">
	<div class="mb-2 flex flex-wrap items-center justify-between gap-4">
		<p><strong>Temperature:</strong> {climateData.temp_c}°C</p>
		<p><strong>Feels Like:</strong> {climateData.feelslike_c}°C</p>
		<p><strong>Humidity:</strong> {climateData.humidity}%</p>
		<p><strong>Wind:</strong> {climateData.wind_kph} kph {climateData.wind_dir}</p>
		<p><strong>Condition:</strong> {climateData.condition.text}</p>
		<img src={climateData.condition.icon} alt="Weather icon" class="h-10" />
	</div>
	<p class="text-xs text-gray-500">Last updated: {climateData.last_updated}</p>
</div>
