<script>
	let { official } = $props();
</script>

<div
	class="rounded-lg bg-blue-800 p-4 text-center shadow transition duration-300 hover:-translate-y-1 hover:shadow-lg"
>
	{#if official.portrait}
		<img
			src={official.portrait}
			alt={official.name}
			class="mb-4 h-64 w-full rounded-md object-cover"
			loading="lazy"
		/>
	{:else}
		<div class="mb-4 flex h-64 w-full items-center justify-center rounded-md bg-gray-600">
			<span class="text-gray-300">No Image</span>
		</div>
	{/if}
	<h3 class="text-lg font-bold text-white">{official.name}</h3>
	<p class="text-blue-200">{official.role}</p>

	{#if official.achievements && official.achievements.length > 0}
		<div class="mt-3 border-t border-blue-600 pt-3">
			<p class="text-xs font-semibold text-yellow-300">Achievements:</p>
			<ul class="mt-1 space-y-1">
				{#each official.achievements as achievement}
					{#if achievement && achievement.trim() !== ''}
						<li class="text-xs text-blue-100">• {achievement}</li>
					{/if}
				{/each}
			</ul>
		</div>
	{/if}

	{#if official.barangay}
		<p class="mt-2 text-xs text-gray-300">
			<span class="font-semibold text-yellow-300">Barangay:</span>
			{official.barangay}
		</p>
	{/if}
</div>

<style>
	/* Any additional styles here if needed */
</style>
