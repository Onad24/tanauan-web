<script>
	let {
		title,
		subtitle = '',
		breadcrumbParent = 'Our Municipality',
		icon = '',
		waveFill = '#f8fafc'
	} = $props();
</script>

<!-- Page Hero / Breadcrumb Banner -->
<section
	class="page-hero relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800"
>
	<!-- Subtle pattern overlay -->
	<div
		class="absolute inset-0 opacity-[0.04]"
		style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;1&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"
	></div>

	<div class="relative z-10 mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-16">
		<!-- Breadcrumb -->
		<nav class="mb-5 flex items-center gap-2 text-sm text-blue-200/70" aria-label="Breadcrumb">
			<a href="/" class="transition-colors hover:text-yellow-400">
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
			</a>
			<svg class="h-3 w-3 text-blue-400/50" fill="currentColor" viewBox="0 0 20 20"
				><path
					fill-rule="evenodd"
					d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
					clip-rule="evenodd"
				/></svg
			>
			<span class="text-blue-200/50">{breadcrumbParent}</span>
			<svg class="h-3 w-3 text-blue-400/50" fill="currentColor" viewBox="0 0 20 20"
				><path
					fill-rule="evenodd"
					d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
					clip-rule="evenodd"
				/></svg
			>
			<span class="font-medium text-yellow-400">{title}</span>
		</nav>

		<div class="flex items-center gap-4">
			<div
				class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-400/10 text-yellow-400 backdrop-blur-sm sm:h-14 sm:w-14"
			>
				{#if icon}
					{@html icon}
				{:else}
					<svg class="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
						/>
					</svg>
				{/if}
			</div>
			<div>
				<h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
					{title}
				</h1>
				{#if subtitle}
					<p class="mt-1 text-sm text-blue-200/60 sm:text-base">{subtitle}</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- Bottom wave divider -->
	<div class="absolute right-0 bottom-0 left-0">
		<svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
			<path
				d="M0 48h1440V24C1380 8 1260 0 1140 8c-120 8-240 24-360 24S540 16 420 8C300 0 180 8 120 16L0 24v24z"
				fill={waveFill}
			/>
		</svg>
	</div>
</section>
