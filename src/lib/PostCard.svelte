<script>
	let { post, style = '', onclick = null } = $props();

	let activeStyle = $derived(style || post?.cardStyle || 'default');
	const hasImage = $derived(post?.media?.length > 0);
	const firstImage = $derived(hasImage ? post.media[0] : null);
	const dateStr = $derived(
		post?.date_added
			? new Date(post.date_added).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })
			: ''
	);
</script>

{#if activeStyle === 'glass'}
	<!-- ── Glassmorphism Card ── -->
	<article class="card-default" {onclick} role={onclick ? 'button' : undefined} tabindex={onclick ? 0 : -1}>
		{#if firstImage}
			<div class="card-img-wrap">
				<img src={firstImage} alt={post.header || 'Post image'} class="card-img" />
				<div class="card-img-overlay-glass"></div>
			</div>
		{/if}
		<div class="card-body">
			{#if post.sectionLabel}<span class="card-tag">{post.sectionLabel}</span>{/if}
			<h3 class="card-title">{post.header || 'Untitled Post'}</h3>
			{#if post.content}<p class="card-desc">{post.content.slice(0, 120)}{post.content.length > 120 ? '…' : ''}</p>{/if}
			<span class="card-date">{dateStr}</span>
		</div>
	</article>

{:else if activeStyle === 'newspaper'}
	<!-- ── Newspaper Card (Headline First, Image in Middle, Text Below) ── -->
	<article class="card-newspaper" {onclick} role={onclick ? 'button' : undefined} tabindex={onclick ? 0 : -1}>
		<div class="card-body">
			{#if post.sectionLabel}<span class="card-tag-np">{post.sectionLabel}</span>{/if}
			<h3 class="card-title-np">{post.header || 'Untitled Post'}</h3>
			{#if dateStr}<p class="card-byline">{dateStr} — {post.department || 'Municipal Government'}</p>{/if}
			{#if firstImage}<img src={firstImage} alt={post.header || 'Post image'} class="card-img-np" />{/if}
			{#if post.content}<p class="card-body-np">{post.content.slice(0, 200)}{post.content.length > 200 ? '…' : ''}</p>{/if}
		</div>
	</article>

{:else if activeStyle === 'bold'}
	<!-- ── Bold Magazine Card (Full Bleed Background with Text Overlay) ── -->
	<article
		class="card-bold"
		{onclick}
		role={onclick ? 'button' : undefined}
		tabindex={onclick ? 0 : -1}
		style={firstImage ? `background-image: url('${firstImage}')` : ''}
	>
		<div class="card-bold-overlay">
			{#if post.sectionLabel}<span class="card-tag-bold">{post.sectionLabel}</span>{/if}
			<h3 class="card-title-bold">{post.header || 'Untitled Post'}</h3>
			{#if post.content}<p class="card-desc-bold">{post.content.slice(0, 100)}{post.content.length > 100 ? '…' : ''}</p>{/if}
			<span class="card-date-bold">{dateStr}</span>
		</div>
	</article>

{:else if activeStyle === 'polaroid'}
	<!-- ── Polaroid Card (Photo Mount with Handwritten Caption) ── -->
	<article class="card-polaroid" {onclick} role={onclick ? 'button' : undefined} tabindex={onclick ? 0 : -1}>
		<div class="card-polaroid-photo">
			{#if firstImage}
				<img src={firstImage} alt={post.header || 'Post image'} class="card-polaroid-img" />
			{:else}
				<div class="card-polaroid-no-img">📷</div>
			{/if}
		</div>
		<div class="card-polaroid-caption">
			{#if post.sectionLabel}<span class="card-tag-polaroid">{post.sectionLabel}</span>{/if}
			<p class="card-polaroid-title">{post.header || 'Untitled Post'}</p>
			<span class="card-polaroid-date">{dateStr}</span>
		</div>
	</article>

{:else if activeStyle === 'minimal'}
	<!-- ── Borderless Minimal Card (Left Accent Bar, Typography-First) ── -->
	<article class="card-minimal" {onclick} role={onclick ? 'button' : undefined} tabindex={onclick ? 0 : -1}>
		{#if post.sectionLabel}<span class="card-tag-min">{post.sectionLabel}</span>{/if}
		<h3 class="card-title-min">{post.header || 'Untitled Post'}</h3>
		{#if post.content}<p class="card-desc-min">{post.content.slice(0, 150)}{post.content.length > 150 ? '…' : ''}</p>{/if}
		<div class="card-meta-min">
			<span>{dateStr}</span>
			{#if hasImage}<span class="card-img-count-min">📷 {post.media.length} photo{post.media.length > 1 ? 's' : ''}</span>{/if}
		</div>
	</article>

{:else}
	<!-- ── Default Standard Card (Image-Top) ── -->
	<article class="card-default" {onclick} role={onclick ? 'button' : undefined} tabindex={onclick ? 0 : -1}>
		{#if firstImage}
			<div class="card-img-wrap">
				<img src={firstImage} alt={post.header || 'Post image'} class="card-img" />
				{#if post.media?.length > 1}<span class="card-img-badge">+{post.media.length - 1}</span>{/if}
			</div>
		{/if}
		<div class="card-body">
			{#if post.sectionLabel}<span class="card-tag">{post.sectionLabel}</span>{/if}
			<h3 class="card-title">{post.header || 'Untitled Post'}</h3>
			{#if post.content}<p class="card-desc">{post.content.slice(0, 120)}{post.content.length > 120 ? '…' : ''}</p>{/if}
			<span class="card-date">{dateStr}</span>
		</div>
	</article>
{/if}

<style>
/* ── Shared ────────────────────────────────── */
article {
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	user-select: none;
}
article:hover {
	transform: translateY(-3px);
}

/* ── 1. Default Card ───────────────────────── */
.card-default {
	background: #ffffff;
	border-radius: 12px;
	border: 1px solid #f1f5f9;
	overflow: hidden;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	display: flex;
	flex-direction: column;
}
.card-default:hover {
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.card-img-wrap {
	position: relative;
	width: 100%;
	height: 190px;
	background: #f1f5f9;
	overflow: hidden;
}
.card-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform 0.3s ease;
}
.card-default:hover .card-img {
	transform: scale(1.03);
}
.card-img-badge {
	position: absolute;
	bottom: 8px;
	right: 8px;
	background: rgba(0, 0, 0, 0.65);
	color: #ffffff;
	font-size: 11px;
	font-weight: 700;
	padding: 2px 6px;
	border-radius: 6px;
	backdrop-filter: blur(4px);
}
.card-body {
	padding: 1.1rem;
	display: flex;
	flex-direction: column;
	gap: 6px;
	flex: 1;
}
.card-tag {
	font-size: 11px;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: #2563eb;
}
.card-title {
	font-size: 1rem;
	font-weight: 700;
	color: #0f172a;
	margin: 0;
	line-height: 1.35;
}
.card-desc {
	font-size: 0.85rem;
	color: #64748b;
	margin: 0;
	line-height: 1.5;
	flex: 1;
}
.card-date {
	font-size: 0.78rem;
	color: #94a3b8;
	margin-top: 4px;
}

/* ── 2. Glassmorphism Card ─────────────────── */
.card-glass {
	background: rgba(255, 255, 255, 0.75);
	backdrop-filter: blur(14px);
	-webkit-backdrop-filter: blur(14px);
	border-radius: 16px;
	border: 1px solid rgba(255, 255, 255, 0.85);
	overflow: hidden;
	box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
	display: flex;
	flex-direction: column;
}
.card-glass:hover {
	box-shadow: 0 12px 40px rgba(31, 38, 135, 0.18);
	border-color: rgba(96, 165, 250, 0.5);
}
.card-img-overlay-glass {
	position: absolute;
	inset: 0;
	background: linear-gradient(to bottom, transparent 60%, rgba(255, 255, 255, 0.5));
}

/* ── 3. Newspaper Card ─────────────────────── */
.card-newspaper {
	background: #fefce8;
	border: 1px solid #e7e5e4;
	border-top: 4px solid #1c1917;
	border-radius: 2px;
	box-shadow: 2px 2px 0 #d6d3d1;
	font-family: Georgia, 'Times New Roman', serif;
}
.card-newspaper:hover {
	box-shadow: 4px 4px 0 #a8a29e;
}
.card-tag-np {
	font-size: 10px;
	font-weight: 900;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: #78350f;
	font-family: sans-serif;
	border-bottom: 1px solid #d6d3d1;
	padding-bottom: 2px;
	display: inline-block;
}
.card-title-np {
	font-size: 1.15rem;
	font-weight: 900;
	color: #1c1917;
	margin: 4px 0;
	line-height: 1.25;
	font-family: 'Times New Roman', Georgia, serif;
}
.card-byline {
	font-size: 0.75rem;
	color: #78716c;
	margin: 0 0 8px;
	font-style: italic;
	font-family: sans-serif;
}
.card-img-np {
	width: 100%;
	height: 160px;
	object-fit: cover;
	margin: 6px 0;
	filter: contrast(1.05);
	border: 1px solid #d6d3d1;
}
.card-body-np {
	font-size: 0.85rem;
	color: #292524;
	line-height: 1.55;
	margin: 4px 0 0;
}

/* ── 4. Bold Magazine Card ─────────────────── */
.card-bold {
	border-radius: 12px;
	overflow: hidden;
	height: 280px;
	background-size: cover;
	background-position: center;
	background-color: #0f172a;
	position: relative;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}
.card-bold:hover {
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}
.card-bold-overlay {
	position: absolute;
	inset: 0;
	background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3) 60%, transparent 100%);
	padding: 1.25rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	gap: 4px;
}
.card-tag-bold {
	font-size: 10px;
	font-weight: 900;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: #f59e0b;
	background: rgba(245, 158, 11, 0.2);
	padding: 2px 7px;
	border-radius: 4px;
	width: fit-content;
}
.card-title-bold {
	font-size: 1.05rem;
	font-weight: 800;
	color: #ffffff;
	margin: 2px 0;
	line-height: 1.3;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
.card-desc-bold {
	font-size: 0.8rem;
	color: #cbd5e1;
	margin: 0;
	line-height: 1.4;
	opacity: 0.9;
}
.card-date-bold {
	font-size: 0.72rem;
	color: #94a3b8;
	margin-top: 4px;
}

/* ── 5. Polaroid Card ──────────────────────── */
.card-polaroid {
	background: #ffffff;
	padding: 10px 10px 18px 10px;
	border-radius: 3px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
	border: 1px solid #e5e7eb;
	transform: rotate(-0.5deg);
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.card-polaroid:hover {
	transform: rotate(0deg) translateY(-4px);
	box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
}
.card-polaroid-photo {
	width: 100%;
	height: 170px;
	background: #1e293b;
	overflow: hidden;
}
.card-polaroid-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.card-polaroid-no-img {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 2rem;
	background: #f1f5f9;
	color: #94a3b8;
}
.card-polaroid-caption {
	padding: 0 4px;
	display: flex;
	flex-direction: column;
	gap: 2px;
}
.card-tag-polaroid {
	font-size: 10px;
	font-weight: 700;
	color: #6b7280;
	text-transform: uppercase;
}
.card-polaroid-title {
	font-size: 0.95rem;
	font-weight: 700;
	color: #1f2937;
	margin: 0;
	font-family: 'Caveat', 'Segoe Print', cursive, sans-serif;
}
.card-polaroid-date {
	font-size: 0.72rem;
	color: #9ca3af;
	font-family: 'Caveat', 'Segoe Print', cursive, sans-serif;
}

/* ── 6. Minimal Card ───────────────────────── */
.card-minimal {
	background: transparent;
	border-left: 3px solid #6366f1;
	padding: 0.5rem 0.85rem;
	display: flex;
	flex-direction: column;
	gap: 4px;
}
.card-minimal:hover {
	border-left-color: #4338ca;
	background: rgba(99, 102, 241, 0.04);
	border-radius: 0 8px 8px 0;
}
.card-tag-min {
	font-size: 10px;
	font-weight: 700;
	text-transform: uppercase;
	color: #6366f1;
	letter-spacing: 0.06em;
}
.card-title-min {
	font-size: 0.98rem;
	font-weight: 700;
	color: #0f172a;
	margin: 0;
}
.card-desc-min {
	font-size: 0.83rem;
	color: #475569;
	margin: 0;
	line-height: 1.45;
}
.card-meta-min {
	display: flex;
	align-items: center;
	gap: 12px;
	font-size: 0.75rem;
	color: #94a3b8;
	margin-top: 2px;
}
.card-img-count-min {
	color: #6366f1;
	font-weight: 600;
}
</style>
