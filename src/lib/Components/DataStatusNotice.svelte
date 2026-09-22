<script>
	export let officeName = 'This Office';
	export let email = 'info@tanauan-leyte.gov.ph';
	export let phone = '+63 53 123 4567';
	export let location = 'Tanauan Municipal Hall, Real St., Tanauan, Leyte';
	export let officeHours = 'Monday – Friday, 8:00 AM – 5:00 PM';
</script>

<div class="my-8 overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/70 via-white to-blue-50/50 p-6 shadow-sm sm:p-8">
	<div class="flex flex-col md:flex-row md:items-start gap-5">
		<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 shadow-sm ring-1 ring-amber-300/60">
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		</div>

		<div class="flex-grow">
			<div class="flex flex-wrap items-center gap-2 mb-2">
				<span class="rounded-full bg-amber-100 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
					Official Record Status
				</span>
				<span class="text-xs text-slate-500 font-medium">• Records Update in Progress</span>
			</div>

			<h3 class="text-lg font-bold text-slate-900 mb-2">
				{officeName} Public Information
			</h3>

			<p class="text-sm leading-relaxed text-slate-600 mb-4 max-w-3xl">
				The Municipal Government of Tanauan is actively digitizing and verifying complete personnel rosters, charter services, and official documentation for this office. For immediate assistance or official transactions, citizens may coordinate directly with the desk below:
			</p>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 border-t border-slate-200/70 pt-4 text-xs text-slate-700">
				<div class="flex items-center gap-2">
					<svg class="h-4 w-4 text-blue-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
					<span><strong>Location:</strong> {location}</span>
				</div>
				<div class="flex items-center gap-2">
					<svg class="h-4 w-4 text-blue-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
					<span><strong>Contact:</strong> <a href={`tel:${phone}`} class="text-blue-700 font-semibold hover:underline">{phone}</a></span>
				</div>
				<div class="flex items-center gap-2">
					<svg class="h-4 w-4 text-blue-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
					<span><strong>Hours:</strong> {officeHours}</span>
				</div>
			</div>
		</div>
	</div>
</div>
