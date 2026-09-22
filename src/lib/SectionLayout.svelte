<script>
	import PostCard from '$lib/PostCard.svelte';

	let {
		posts = [],
		sectionLayout = 'grid',
		cardStyle = 'default',
		onCardClick = null
	} = $props();

	function handleCardClick(post) {
		if (onCardClick) onCardClick(post);
	}
</script>

{#if posts.length === 0}
	<div class="sl-empty">
		<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5">
			<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
		</svg>
		<p>No posts published in this section yet.</p>
	</div>

<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- 1. 🌟 MAGAZINE SECTION LAYOUT (Large Hero Feature + Side Stories)          -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
{:else if sectionLayout === 'magazine'}
	<div class="sl-mag-container">
		<!-- HERO FEATURE ARTICLE (First Post) -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="sl-mag-hero-card"
			onclick={() => handleCardClick(posts[0])}
			role="button"
			tabindex="0"
		>
			<div class="sl-mag-hero-media">
				{#if posts[0].media?.[0]}
					<img src={posts[0].media[0]} alt={posts[0].header || 'Hero story'} class="sl-mag-hero-img" />
					{#if posts[0].media.length > 1}
						<span class="sl-mag-media-badge">📷 +{posts[0].media.length - 1} photos</span>
					{/if}
				{:else}
					<div class="sl-mag-hero-placeholder">
						<span class="sl-mag-ph-icon">🌟</span>
					</div>
				{/if}
				<div class="sl-mag-hero-badge">⭐ FEATURED HIGHLIGHT</div>
			</div>

			<div class="sl-mag-hero-content">
				{#if posts[0].sectionLabel}
					<span class="sl-mag-tag">{posts[0].sectionLabel}</span>
				{/if}
				<h3 class="sl-mag-hero-title">{posts[0].header || 'Featured Publication'}</h3>
				{#if posts[0].content}
					<p class="sl-mag-hero-desc">{posts[0].content.slice(0, 220)}{posts[0].content.length > 220 ? '…' : ''}</p>
				{/if}
				<div class="sl-mag-hero-footer">
					<span class="sl-mag-date">
						📅 {posts[0].date_added ? new Date(posts[0].date_added).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Official Report'}
					</span>
					<span class="sl-mag-read-more">Read Full Story →</span>
				</div>
			</div>
		</div>

		<!-- SECONDARY STORIES SIDEBAR (Remaining Posts) -->
		{#if posts.length > 1}
			<div class="sl-mag-side-feed">
				<div class="sl-mag-side-title">More Stories ({posts.length - 1})</div>
				<div class="sl-mag-side-list">
					{#each posts.slice(1) as post}
						<div class="sl-mag-side-card-item">
							<PostCard {post} style={cardStyle} onclick={() => handleCardClick(post)} />
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>

<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- 2. ⏳ TIMELINE SECTION LAYOUT (Chronological Milestone Journey)            -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
{:else if sectionLayout === 'timeline'}
	<div class="sl-timeline-wrapper">
		<div class="sl-tl-central-spine"></div>
		<div class="sl-tl-entries">
			{#each posts as post, i}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div class="sl-tl-item" class:sl-tl-right={i % 2 === 1}>
					<!-- Date Milestone Marker -->
					<div class="sl-tl-milestone-marker">
						<span class="sl-tl-dot"></span>
						<span class="sl-tl-date-badge">
							{post.date_added ? new Date(post.date_added).toLocaleDateString('en-PH', { month: 'short', year: 'numeric' }) : 'Milestone'}
						</span>
					</div>

					<!-- Story Card on Timeline -->
					<div class="sl-tl-card-box" onclick={() => handleCardClick(post)} role="button" tabindex="0">
						<PostCard {post} style={cardStyle} />
					</div>
				</div>
			{/each}
		</div>
	</div>

<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- 3. 📰 EDITORIAL SECTION LAYOUT (Newsroom Broadsheet Columns)               -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
{:else if sectionLayout === 'editorial'}
	<div class="sl-editorial-wrapper">
		<div class="sl-ed-lead">
			<PostCard post={posts[0]} style={cardStyle} onclick={() => handleCardClick(posts[0])} />
		</div>
		{#if posts.length > 1}
			<div class="sl-ed-columns">
				{#each posts.slice(1) as post}
					<div class="sl-ed-col-item">
						<PostCard {post} style={cardStyle} onclick={() => handleCardClick(post)} />
					</div>
				{/each}
			</div>
		{/if}
	</div>

<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- 4. 🧱 MASONRY SECTION LAYOUT (Dynamic Pinterest-Style Gallery)            -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
{:else if sectionLayout === 'masonry'}
	<div class="sl-masonry-container">
		{#each posts as post}
			<div class="sl-masonry-brick">
				<PostCard {post} style={cardStyle} onclick={() => handleCardClick(post)} />
			</div>
		{/each}
	</div>

<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- 5. 📋 COMPACT LIST SECTION LAYOUT (Official Press Release Digest)          -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
{:else if sectionLayout === 'list'}
	<div class="sl-bulletin-list">
		{#each posts as post}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div class="sl-list-item" onclick={() => handleCardClick(post)} role="button" tabindex="0">
				<div class="sl-list-date-calendar">
					<span class="sl-list-cal-month">
						{post.date_added ? new Date(post.date_added).toLocaleDateString('en-PH', { month: 'short' }) : 'DOC'}
					</span>
					<span class="sl-list-cal-day">
						{post.date_added ? new Date(post.date_added).getDate() : '—'}
					</span>
				</div>

				{#if post.media?.[0]}
					<img src={post.media[0]} alt={post.header} class="sl-list-thumb" />
				{/if}

				<div class="sl-list-body">
					{#if post.sectionLabel}<span class="sl-list-tag">{post.sectionLabel}</span>{/if}
					<h4 class="sl-list-title">{post.header || 'Untitled Post'}</h4>
					{#if post.content}<p class="sl-list-excerpt">{post.content.slice(0, 140)}…</p>{/if}
				</div>

				<div class="sl-list-arrow-box">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
					</svg>
				</div>
			</div>
		{/each}
	</div>

<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- 6. 🔲 CLASSIC GRID SECTION LAYOUT                                         -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
{:else}
	<div
		class="sl-grid"
		class:sl-grid-1={posts.length === 1}
		class:sl-grid-2={posts.length === 2}
		class:sl-grid-3={posts.length >= 3}
	>
		{#each posts as post}
			<PostCard {post} style={cardStyle} onclick={() => handleCardClick(post)} />
		{/each}
	</div>
{/if}

<style>
/* ── Empty ─────────────────────────────────── */
.sl-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	padding: 3rem 1rem;
	color: #94a3b8;
	text-align: center;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* 🌟 1. MAGAZINE LAYOUT STYLES                                               */
/* ═══════════════════════════════════════════════════════════════════════════ */
.sl-mag-container {
	display: grid;
	gap: 2rem;
	grid-template-columns: 1fr;
}
@media (min-width: 960px) {
	.sl-mag-container {
		grid-template-columns: 1.6fr 1fr;
	}
}

/* Hero Feature Card */
.sl-mag-hero-card {
	background: #ffffff;
	border-radius: 18px;
	overflow: hidden;
	box-shadow: 0 10px 32px rgba(15, 23, 42, 0.08);
	border: 1px solid #e2e8f0;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	transition: transform .25s ease, box-shadow .25s ease;
}
.sl-mag-hero-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);
}
.sl-mag-hero-media {
	position: relative;
	width: 100%;
	height: 320px;
	background: #0f172a;
	overflow: hidden;
}
.sl-mag-hero-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: transform .4s ease;
}
.sl-mag-hero-card:hover .sl-mag-hero-img {
	transform: scale(1.03);
}
.sl-mag-hero-placeholder {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, #1e293b, #0f172a);
}
.sl-mag-ph-icon { font-size: 3.5rem; }
.sl-mag-hero-badge {
	position: absolute;
	top: 14px;
	left: 14px;
	background: #f59e0b;
	color: #000;
	font-size: 11px;
	font-weight: 900;
	letter-spacing: 0.08em;
	padding: 4px 10px;
	border-radius: 6px;
	box-shadow: 0 4px 12px rgba(0,0,0,0.25);
}
.sl-mag-media-badge {
	position: absolute;
	bottom: 12px;
	right: 12px;
	background: rgba(0,0,0,0.7);
	backdrop-filter: blur(4px);
	color: #ffffff;
	font-size: 11px;
	font-weight: 700;
	padding: 3px 8px;
	border-radius: 6px;
}
.sl-mag-hero-content {
	padding: 1.75rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}
.sl-mag-tag {
	font-size: 12px;
	font-weight: 800;
	color: #2563eb;
	text-transform: uppercase;
	letter-spacing: 0.06em;
}
.sl-mag-hero-title {
	font-size: 1.45rem;
	font-weight: 800;
	color: #0f172a;
	line-height: 1.3;
	margin: 0;
}
.sl-mag-hero-desc {
	font-size: 0.95rem;
	color: #475569;
	line-height: 1.6;
	margin: 0;
}
.sl-mag-hero-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 1rem;
	border-top: 1px solid #f1f5f9;
	margin-top: 0.5rem;
}
.sl-mag-date { font-size: 0.85rem; color: #64748b; font-weight: 600; }
.sl-mag-read-more { font-size: 0.88rem; color: #2563eb; font-weight: 700; }

/* Side Feed */
.sl-mag-side-feed {
	background: #ffffff;
	border-radius: 18px;
	border: 1px solid #e2e8f0;
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
.sl-mag-side-title {
	font-size: 0.85rem;
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 0.06em;
	color: #94a3b8;
	border-bottom: 2px solid #f1f5f9;
	padding-bottom: 0.6rem;
}
.sl-mag-side-list {
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
}
.sl-mag-side-card-item {
	width: 100%;
}
.sl-mag-side-info {
	flex: 1;
	min-width: 0;
}
.sl-mag-side-header {
	font-size: 0.92rem;
	font-weight: 700;
	color: #0f172a;
	margin: 0 0 2px;
	line-height: 1.35;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.sl-mag-side-desc {
	font-size: 0.78rem;
	color: #64748b;
	margin: 0 0 3px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.sl-mag-side-date {
	font-size: 0.72rem;
	color: #94a3b8;
	font-weight: 600;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* ⏳ 2. TIMELINE LAYOUT STYLES                                               */
/* ═══════════════════════════════════════════════════════════════════════════ */
.sl-timeline-wrapper {
	position: relative;
	padding: 2rem 0;
}
.sl-tl-central-spine {
	position: absolute;
	left: 50%;
	top: 0;
	bottom: 0;
	width: 3px;
	background: linear-gradient(to bottom, transparent, #3b82f6 15%, #3b82f6 85%, transparent);
	transform: translateX(-50%);
}
.sl-tl-entries {
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
}
.sl-tl-item {
	position: relative;
	display: flex;
	justify-content: flex-end;
	padding-right: calc(50% + 2.5rem);
}
.sl-tl-item.sl-tl-right {
	justify-content: flex-start;
	padding-right: 0;
	padding-left: calc(50% + 2.5rem);
}
.sl-tl-milestone-marker {
	position: absolute;
	left: 50%;
	top: 1rem;
	transform: translateX(-50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	z-index: 2;
}
.sl-tl-dot {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: #2563eb;
	border: 3px solid #ffffff;
	box-shadow: 0 0 0 4px #93c5fd;
}
.sl-tl-date-badge {
	font-size: 10px;
	font-weight: 800;
	color: #1d4ed8;
	background: #eff6ff;
	padding: 2px 8px;
	border-radius: 10px;
	border: 1px solid #bfdbfe;
	white-space: nowrap;
}
.sl-tl-card-box {
	width: 100%;
	max-width: 440px;
	cursor: pointer;
}
@media (max-width: 768px) {
	.sl-tl-central-spine { left: 20px; }
	.sl-tl-item, .sl-tl-item.sl-tl-right {
		padding: 0 0 0 4rem;
		justify-content: flex-start;
	}
	.sl-tl-milestone-marker { left: 20px; }
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* 📰 3. EDITORIAL NEWSROOM STYLES                                            */
/* ═══════════════════════════════════════════════════════════════════════════ */
.sl-editorial-wrapper {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}
.sl-ed-columns {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1.5rem;
	border-top: 2px solid #e2e8f0;
	padding-top: 1.5rem;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* 🧱 4. MASONRY GALLERY STYLES                                               */
/* ═══════════════════════════════════════════════════════════════════════════ */
.sl-masonry-container {
	columns: 3 300px;
	column-gap: 1.5rem;
}
.sl-masonry-brick {
	break-inside: avoid;
	margin-bottom: 1.5rem;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* 📋 5. BULLETIN LIST STYLES                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
.sl-bulletin-list {
	background: #ffffff;
	border-radius: 14px;
	border: 1px solid #e2e8f0;
	overflow: hidden;
	box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}
.sl-list-item {
	display: flex;
	align-items: center;
	gap: 1.25rem;
	padding: 1.1rem 1.5rem;
	border-bottom: 1px solid #f1f5f9;
	cursor: pointer;
	transition: all .15s;
}
.sl-list-item:last-child {
	border-bottom: none;
}
.sl-list-item:hover {
	background: #f8fafc;
	transform: translateX(4px);
}
.sl-list-date-calendar {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	background: #eff6ff;
	border-radius: 10px;
	border: 1px solid #bfdbfe;
	flex-shrink: 0;
}
.sl-list-cal-month {
	font-size: 9px;
	font-weight: 800;
	color: #1d4ed8;
	text-transform: uppercase;
}
.sl-list-cal-day {
	font-size: 1.15rem;
	font-weight: 900;
	color: #1e293b;
	line-height: 1;
}
.sl-list-thumb {
	width: 72px;
	height: 56px;
	object-fit: cover;
	border-radius: 8px;
	flex-shrink: 0;
}
.sl-list-body {
	flex: 1;
	min-width: 0;
}
.sl-list-tag {
	font-size: 10px;
	font-weight: 800;
	text-transform: uppercase;
	color: #2563eb;
	margin-bottom: 2px;
	display: block;
}
.sl-list-title {
	font-size: 1.05rem;
	font-weight: 700;
	color: #0f172a;
	margin: 0 0 3px;
	line-height: 1.35;
}
.sl-list-excerpt {
	font-size: 0.85rem;
	color: #64748b;
	margin: 0;
	line-height: 1.45;
}
.sl-list-arrow-box {
	color: #94a3b8;
	transition: transform .15s;
}
.sl-list-item:hover .sl-list-arrow-box {
	transform: translateX(3px);
	color: #2563eb;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* 🔲 6. CLASSIC GRID STYLES                                                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
.sl-grid {
	display: grid;
	gap: 1.5rem;
}
.sl-grid-1 { grid-template-columns: 1fr; max-width: 720px; margin: 0 auto; }
.sl-grid-2 { grid-template-columns: repeat(2, 1fr); }
.sl-grid-3 { grid-template-columns: repeat(3, 1fr); }
@media (max-width: 900px) { .sl-grid-3 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .sl-grid-2, .sl-grid-3 { grid-template-columns: 1fr; } }
</style>
