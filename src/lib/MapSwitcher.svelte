<script>
	let selected = 'tsunami';

	const maps = {
		tsunami: {
			name: 'Tsunami Hazard Map',
			url: '/Tsunami/index.html'
		},
		evac: {
			name: 'Evacuation Centers Map',
			url: '/Evac Center/index.html'
		},
		population: {
			name: 'Population Map',
			url: '/Population/index.html'
		}
	};
</script>

<div class="pt-[90px]">
	<!-- Dropdown -->
	<div class="mb-2 flex items-center gap-4">
		<label class="font-medium">Select Map:</label>
		<select bind:value={selected} class="rounded border bg-white px-3 py-2">
			{#each Object.keys(maps) as key}
				<option value={key}>{maps[key].name}</option>
			{/each}
		</select>
	</div>

	<!-- Disclaimer -->
	<p class="mb-2 text-sm text-gray-600">
		Disclaimer: All data shown on these maps is maintained by the Planning Office.
	</p>

	<!-- Iframe Viewer -->
	<div class="h-[calc(100vh-90px)] w-full overflow-hidden rounded border">
		<iframe src={maps[selected].url} class="h-full w-full border-none" allow="fullscreen"></iframe>
	</div>
</div>
