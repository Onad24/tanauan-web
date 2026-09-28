<script>
	import SectionLayout from '$lib/SectionLayout.svelte';
	import Modal from '$lib/Modal.svelte';

	let { department = '' } = $props();

	let sections = $state([]);
	let posts = $state([]);
	let loading = $state(true);

	// Card detail dialog — SectionLayout forwards card clicks here via onCardClick
	let showDetail = $state(false);
	let detailPost = $state(null);

	function openDetail(post) {
		detailPost = post;
		showDetail = true;
	}

	function coverImage(post) {
		if (!post || !Array.isArray(post.media)) return null;
		return (
			post.media.find(
				(url) => typeof url === 'string' && !url.toLowerCase().split('?')[0].endsWith('.pdf')
			) || null
		);
	}

	function pdfLinks(post) {
		if (!post || !Array.isArray(post.media)) return [];
		return post.media.filter(
			(url) => typeof url === 'string' && url.toLowerCase().split('?')[0].endsWith('.pdf')
		);
	}

	function formatDate(post) {
		return post?.date_added
			? new Date(post.date_added).toLocaleDateString('en-PH', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})
			: '';
	}

	// Fetch the saved section designs + this department's posts once on mount
	$effect(() => {
		const dept = department;
		if (!dept) {
			sections = [];
			posts = [];
			loading = false;
			return;
		}

		let cancelled = false;
		loading = true;

		(async () => {
			try {
				const [sectionsRes, postsRes] = await Promise.all([
					fetch(`/api/department-sections?department=${encodeURIComponent(dept)}`),
					fetch(`/api/posts?department=${encodeURIComponent(dept)}`)
				]);

				const sectionsData = sectionsRes.ok ? await sectionsRes.json() : { sections: [] };
				const postsData = postsRes.ok ? await postsRes.json() : { posts: [] };

				if (cancelled) return;
				sections = Array.isArray(sectionsData.sections) ? sectionsData.sections : [];
				posts = Array.isArray(postsData.posts) ? postsData.posts : [];
			} catch (err) {
				console.error('Department sections feed error:', err);
				if (!cancelled) {
					sections = [];
					posts = [];
				}
			} finally {
				if (!cancelled) loading = false;
			}
		})();

		return () => {
			cancelled = true;
		};
	});

	// Approved (or legacy status-less) sections that actually have posts,
	// grouped in memory by post.sectionSlug, ordered by `order` then `label`.
	// Sections with zero posts are skipped so the public site never shows an empty state.
	function groupSections(sectionList, postList) {
		const postsBySlug = new Map();
		for (const post of postList) {
			const key = post?.sectionSlug || '';
			if (!key) continue;
			if (!postsBySlug.has(key)) postsBySlug.set(key, []);
			postsBySlug.get(key).push(post);
		}

		return sectionList
			.filter((s) => s && (!s.status || s.status === 'approved'))
			.map((s) => ({ section: s, posts: postsBySlug.get(s.sectionSlug) || [] }))
			.filter((entry) => entry.posts.length > 0)
			.sort(
				(a, b) =>
					(a.section.order ?? 0) - (b.section.order ?? 0) ||
					String(a.section.label || '').localeCompare(String(b.section.label || ''))
			);
	}

	let visibleSections = $derived(groupSections(sections, posts));

	// Relative luminance (WCAG) so heading text flips on ANY dark background,
	// not only the '#0f172a' preset used by the admin picker.
	function relativeLuminance(hex) {
		const raw = String(hex || '')
			.trim()
			.replace('#', '');
		if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(raw)) return 1;
		const full =
			raw.length === 3
				? raw
						.split('')
						.map((c) => c + c)
						.join('')
				: raw;
		const channels = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
		const linear = channels.map((c) =>
			c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
		);
		return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
	}

	function isDarkBg(section) {
		return relativeLuminance(section.bgColor) < 0.2;
	}

	// Saved design → frame styling (mirrors SectionDesignPicker's live preview canvas)
	function frameStyle(section) {
		const dark = isDarkBg(section);
		const bg = section.bgColor || '#ffffff';
		const border = section.hasBorder ? `2px solid ${section.borderColor || '#e2e8f0'}` : 'none';
		return `background-color: ${bg}; border: ${border}; border-radius: 14px; color: ${dark ? '#f8fafc' : '#0f172a'};`;
	}

	function headingColor(section) {
		return isDarkBg(section) ? '#ffffff' : '#0f172a';
	}

	function mutedColor(section) {
		return isDarkBg(section) ? '#94a3b8' : '#64748b';
	}
</script>

{#if loading}
	<section id="updates" class="relative border-b-2 border-slate-200 bg-slate-50 py-20">
		<div class="container mx-auto max-w-7xl px-6">
			<div class="h-6 w-52 animate-pulse rounded-md bg-slate-200"></div>
			<div class="mt-4 h-9 w-80 max-w-full animate-pulse rounded-lg bg-slate-200"></div>
			<div class="mt-3 h-4 w-full max-w-2xl animate-pulse rounded bg-slate-200"></div>
			<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each [0, 1, 2] as i (i)}
					<div class="h-52 animate-pulse rounded-2xl bg-slate-200"></div>
				{/each}
			</div>
		</div>
	</section>
{:else if visibleSections.length > 0}
	<section id="updates" class="relative border-b-2 border-slate-200 bg-slate-50 py-20">
		<div class="container mx-auto max-w-7xl px-6">
			{#each visibleSections as entry (entry.section.id ?? entry.section.sectionSlug)}
				{@const section = entry.section}
				<!-- Frame mirrors SectionDesignPicker's live preview canvas: same padding,
				     same background/border, same title + description typography. -->
				<div class="p-5" style={frameStyle(section)}>
					<div class="mb-5">
						<h3
							class="text-[1.35rem] leading-[1.25] font-extrabold"
							style={`color: ${headingColor(section)};`}
						>
							{section.label}
						</h3>
						{#if section.description}
							<p
								class="mt-1 text-[0.85rem] leading-[1.45]"
								style={`color: ${mutedColor(section)};`}
							>
								{section.description}
							</p>
						{/if}
					</div>

					<!-- Real client-facing section layout with the saved layout + card design -->
					<SectionLayout
						posts={entry.posts}
						sectionLayout={section.sectionLayout || 'grid'}
						cardStyle={section.cardStyle || 'default'}
						onCardClick={openDetail}
					/>
				</div>
			{/each}
		</div>
	</section>
{/if}

<!-- Post detail dialog — opens when a section card is clicked -->
<Modal
	bind:open={showDetail}
	title={detailPost?.header || 'Update'}
	size="max-w-2xl"
	onclose={() => (detailPost = null)}
>
	{#if detailPost}
		{@const image = coverImage(detailPost)}
		{@const docs = pdfLinks(detailPost)}
		<div class="space-y-4">
			{#if image}
				<img
					src={image}
					alt={detailPost.header || 'Update'}
					class="max-h-80 w-full rounded-xl object-cover"
				/>
			{/if}

			<div class="flex flex-wrap items-center gap-2">
				{#if detailPost.sectionLabel}
					<span
						class="rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-indigo-700 uppercase"
					>
						{detailPost.sectionLabel}
					</span>
				{/if}
				{#if formatDate(detailPost)}
					<span class="text-xs font-semibold text-slate-500">{formatDate(detailPost)}</span>
				{/if}
			</div>

			{#if detailPost.content}
				<p class="text-sm leading-relaxed whitespace-pre-line text-slate-700">
					{detailPost.content}
				</p>
			{/if}

			{#if docs.length > 0}
				<div class="space-y-2">
					{#each docs as doc (doc)}
						<a
							href={doc}
							target="_blank"
							rel="noopener"
							class="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
						>
							<svg
								viewBox="0 0 24 24"
								width="15"
								height="15"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
								/>
								<path stroke-linecap="round" stroke-linejoin="round" d="M14 2v6h6" />
							</svg>
							Open attachment
						</a>
					{/each}
				</div>
			{/if}

			{#if detailPost.link}
				<a
					href={detailPost.link}
					target="_blank"
					rel="noopener"
					class="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/25 transition-all hover:bg-indigo-700 sm:text-sm"
				>
					Read Full Story
					<svg
						viewBox="0 0 24 24"
						width="15"
						height="15"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
					</svg>
				</a>
			{/if}
		</div>
	{/if}
</Modal>
