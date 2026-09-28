<script>
	import { sectionLayouts, cardStyles, departments } from '$lib/config';
	import SectionLayout from '$lib/SectionLayout.svelte';

	let {
		open = false,
		section = null,   // existing section data if editing (null if creating)
		department = '',  // default selected department
		onclose = null,
		onsaved = null,
		ondeleted = null
	} = $props();

	let selectedDept = $state('');
	let label = $state('');
	let description = $state('');
	let bgColor = $state('#ffffff');
	let hasBorder = $state(false);
	let borderColor = $state('#e2e8f0');
	let selectedLayout = $state('grid');
	let selectedCard = $state('default');
	let saving = $state(false);
	let error = $state('');

	// Full Modal Preview State
	let showFullPreviewModal = $state(false);
	let previewDevice = $state('desktop'); // 'desktop' | 'tablet' | 'mobile'

	const bgPresets = [
		{ name: 'Pure White', hex: '#ffffff' },
		{ name: 'Slate Light', hex: '#f8fafc' },
		{ name: 'Soft Blue', hex: '#eff6ff' },
		{ name: 'Warm Paper', hex: '#fdfbf7' },
		{ name: 'Soft Lavender', hex: '#faf5ff' },
		{ name: 'Mint Green', hex: '#f0fdf4' },
		{ name: 'Midnight Dark', hex: '#0f172a' }
	];

	const borderPresets = [
		{ name: 'Subtle Slate', hex: '#e2e8f0' },
		{ name: 'Cool Gray', hex: '#cbd5e1' },
		{ name: 'Soft Blue', hex: '#bfdbfe' },
		{ name: 'Vibrant Blue', hex: '#3b82f6' },
		{ name: 'Warm Border', hex: '#d6d3d1' },
		{ name: 'Gold Accent', hex: '#f59e0b' },
		{ name: 'Dark Slate', hex: '#334155' }
	];

	// Realistic client-facing dummy posts for 100% accurate live public simulation
	const samplePosts = [
		{
			id: 'demo-post-1',
			header: 'Emergency Aid & Social Welfare Relief Distribution',
			content: 'Over 5,000 families and marginalized beneficiaries received targeted financial assistance, relief goods, and medical care through the comprehensive LGU community initiative.',
			media: ['https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'],
			sectionLabel: 'Accomplishments',
			department: 'MSWDO',
			date_added: 'May 15, 2025',
			cardStyle: '', // will inherit selected card style
			isFeatured: true
		},
		{
			id: 'demo-post-2',
			header: 'Senior Citizens Pension & Wellness Program',
			content: 'Quarterly social pension stipends and free medical check-ups successfully distributed across 25 barangays in coordination with OSCA and local health units.',
			media: ['https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80'],
			sectionLabel: 'Accomplishments',
			department: 'MSWDO',
			date_added: 'May 10, 2025',
			cardStyle: ''
		},
		{
			id: 'demo-post-3',
			header: 'Livelihood & Skills Training for Solo Parents',
			content: 'Hands-on organic farming, culinary baking, and small business financial literacy workshops organized to empower local breadwinners.',
			media: ['https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80'],
			sectionLabel: 'Accomplishments',
			department: 'MSWDO',
			date_added: 'May 04, 2025',
			cardStyle: ''
		}
	];

	// Derived posts that dynamically adopt the selected card style for real rendering
	let dynamicSimPosts = $derived(
		samplePosts.map((p) => ({
			...p,
			sectionLabel: label || p.sectionLabel,
			department: selectedDept || p.department,
			cardStyle: selectedCard
		}))
	);

	// Sync states when drawer opens or prop changes
	$effect(() => {
		if (open) {
			error = '';
			showFullPreviewModal = false;
			if (section) {
				selectedDept = section.department || department || '';
				label = section.label || '';
				description = section.description || '';
				bgColor = section.bgColor || '#ffffff';
				hasBorder = Boolean(section.hasBorder);
				borderColor = section.borderColor || '#e2e8f0';
				selectedLayout = section.sectionLayout || 'grid';
				selectedCard = section.cardStyle || 'default';
			} else {
				selectedDept = department || '';
				label = '';
				description = '';
				bgColor = '#ffffff';
				hasBorder = false;
				borderColor = '#e2e8f0';
				selectedLayout = 'grid';
				selectedCard = 'default';
			}
		}
	});

	async function save() {
		if (!selectedDept) {
			error = 'Please select a Department.';
			return;
		}
		if (!label.trim()) {
			error = 'Section name is required.';
			return;
		}

		saving = true;
		error = '';

		try {
			if (section?.id) {
				// Update existing
				const res = await fetch('/admin/department-sections', {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						id: section.id,
						label: label.trim(),
						description: description.trim(),
						bgColor: bgColor,
						hasBorder: hasBorder,
						borderColor: borderColor,
						sectionLayout: selectedLayout,
						cardStyle: selectedCard
					})
				});
				if (!res.ok) {
					const errText = await res.text();
					throw new Error(errText || 'Failed to update section');
				}
				const updated = {
					...section,
					department: selectedDept,
					label: label.trim(),
					description: description.trim(),
					bgColor: bgColor,
					hasBorder: hasBorder,
					borderColor: borderColor,
					sectionLayout: selectedLayout,
					cardStyle: selectedCard
				};
				if (onsaved) onsaved(updated);
			} else {
				// Create new
				const res = await fetch('/admin/department-sections', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						department: selectedDept,
						label: label.trim(),
						description: description.trim(),
						bgColor: bgColor,
						hasBorder: hasBorder,
						borderColor: borderColor,
						sectionLayout: selectedLayout,
						cardStyle: selectedCard
					})
				});
				if (!res.ok) {
					const errText = await res.text();
					throw new Error(errText || 'Failed to create section');
				}
				const created = await res.json();
				if (onsaved) onsaved(created);
			}

			if (onclose) onclose();
		} catch (e) {
			console.error('Save section error:', e);
			error = e.message || 'Error saving section';
		} finally {
			saving = false;
		}
	}

	async function deleteSection() {
		if (!section?.id) return;
		if (!confirm(`Delete section "${section.label}"? Posts inside this section will remain but lose their section tag.`)) return;

		saving = true;
		error = '';

		try {
			const res = await fetch('/admin/department-sections', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: section.id })
			});
			if (!res.ok) {
				const errText = await res.text();
				throw new Error(errText || 'Failed to delete section');
			}
			if (ondeleted) ondeleted(section.id);
			if (onclose) onclose();
		} catch (e) {
			console.error('Delete section error:', e);
			error = e.message || 'Error deleting section';
		} finally {
			saving = false;
		}
	}
</script>

{#if open}
	<!-- Backdrop -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="sdp-backdrop" onclick={onclose} role="presentation"></div>

	<!-- Drawer -->
	<aside class="sdp-drawer" role="dialog" aria-modal="true" aria-label="Section Design Picker">
		<!-- Header -->
		<div class="sdp-header">
			<div>
				<h2 class="sdp-title">{section ? 'Edit Section & Design' : 'Add New Section'}</h2>
				<p class="sdp-subtitle">Customize section title, layout pattern, card design, and colors</p>
			</div>
			<div class="sdp-header-actions">
				<button type="button" class="sdp-top-preview-btn" onclick={() => (showFullPreviewModal = true)}>
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
					</svg>
					<span>See Preview</span>
				</button>
				<button class="sdp-close" onclick={onclose} aria-label="Close" type="button">
					<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
						<path stroke-linecap="round" stroke-linejoin="round" d="M18 6L6 18M6 6l12 12"/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Body -->
		<div class="sdp-body">
			{#if error}
				<div class="sdp-error">
					<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
					</svg>
					<span>{error}</span>
				</div>
			{/if}

			<!-- Top Row: Department & Title -->
			<div class="sdp-row-2col">
				<div class="sdp-field">
					<label class="sdp-label" for="sdp-dept">
						Department <span class="text-rose-500">*</span>
					</label>
					{#if section}
						<div class="sdp-readonly-box">
							<span class="font-semibold text-slate-800">{selectedDept}</span>
						</div>
					{:else}
						<select id="sdp-dept" class="sdp-input" bind:value={selectedDept} required>
							<option value="">-- Choose Department --</option>
							{#each departments as dept}
								<option value={dept.name}>{dept.name}</option>
							{/each}
						</select>
					{/if}
				</div>

				<div class="sdp-field">
					<label class="sdp-label" for="sdp-title">
						Section Name / Title <span class="text-rose-500">*</span>
					</label>
					<input
						id="sdp-title"
						class="sdp-input"
						type="text"
						bind:value={label}
						placeholder="e.g. Accomplishments, Announcements…"
						required
					/>
				</div>
			</div>

			<!-- Section Description -->
			<div class="sdp-field">
				<label class="sdp-label" for="sdp-desc">
					Section Description / Subtitle
					<span class="text-xs font-normal text-slate-400 ml-1">(Optional summary shown below section title)</span>
				</label>
				<textarea
					id="sdp-desc"
					class="sdp-textarea"
					rows="2"
					bind:value={description}
					placeholder="e.g. Highlights of key programs, milestone accomplishments, and community aid delivered by MSWDO…"
				></textarea>
			</div>

			<!-- ═══════════════════════════════════════════════════════════════ -->
			<!-- 👁️ LIVE SIMULATOR: Inline Preview with "See Full Preview" Button -->
			<!-- ═══════════════════════════════════════════════════════════════ -->
			<div class="sdp-live-preview-container">
				<div class="sdp-preview-top-bar">
					<div class="sdp-preview-tag-box">
						<span class="sdp-preview-dot"></span>
						<span class="sdp-preview-tag">LIVE CLIENT-FACING SIMULATION</span>
					</div>
					<div class="sdp-preview-right-controls">
						<button
							type="button"
							class="sdp-open-modal-preview-btn"
							onclick={() => (showFullPreviewModal = true)}
							title="Open large full-screen preview"
						>
							🔍 Expand Full Preview
						</button>
					</div>
				</div>

				<!-- Live Preview Canvas renders the ACTUAL SectionLayout component with real sample cards -->
				<div
					class="sdp-preview-canvas"
					style={`background-color: ${bgColor}; color: ${bgColor === '#0f172a' ? '#f8fafc' : '#0f172a'}; ${hasBorder ? `border: 2px solid ${borderColor}; border-radius: 14px;` : 'border: 1px dashed #cbd5e1;'}`}
				>
					<div class="sdp-sim-header">
						<h3 class="sdp-sim-title" style={bgColor === '#0f172a' ? 'color: #ffffff;' : 'color: #0f172a;'}>
							{label || 'Sample Section Name'}
						</h3>
						{#if description}
							<p class="sdp-sim-desc" style={bgColor === '#0f172a' ? 'color: #94a3b8;' : 'color: #64748b;'}>
								{description}
							</p>
						{/if}
					</div>

					<!-- REAL LIVE CLIENT-FACING SECTION LAYOUT -->
					<div class="sdp-sim-layout-scaler">
						<SectionLayout
							posts={dynamicSimPosts}
							sectionLayout={selectedLayout}
							cardStyle={selectedCard}
						/>
					</div>
				</div>
			</div>

			<!-- ═══════════════════════════════════════════════════════════════ -->
			<!-- STEP 1: Section Layout Pattern                                  -->
			<!-- ═══════════════════════════════════════════════════════════════ -->
			<div class="sdp-field">
				<div class="sdp-step-header">
					<span class="sdp-step-badge">1</span>
					<label class="sdp-label">
						Section Layout Architecture
						<span class="text-xs font-normal text-slate-400 ml-1">(How posts are arranged on the department page)</span>
					</label>
				</div>
				<div class="sdp-swatches sdp-layout-grid">
					{#each sectionLayouts as layout}
						<button
							type="button"
							class="sdp-swatch"
							class:sdp-swatch-active={selectedLayout === layout.id}
							onclick={() => (selectedLayout = layout.id)}
						>
							<div class="sdp-swatch-icon">{@html layout.icon}</div>
							<span class="sdp-swatch-label">{layout.label}</span>
							<span class="sdp-swatch-desc">{layout.desc}</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- ═══════════════════════════════════════════════════════════════ -->
			<!-- STEP 2: Card Design & Visual Structure (With Visual Mockups)   -->
			<!-- ═══════════════════════════════════════════════════════════════ -->
			<div class="sdp-field">
				<div class="sdp-step-header">
					<span class="sdp-step-badge">2</span>
					<label class="sdp-label">
						Card Design Structure
						<span class="text-xs font-normal text-slate-400 ml-1">(Click to choose the physical card template)</span>
					</label>
				</div>
				<div class="sdp-card-designs-grid">

					<!-- 1. Newspaper Editorial -->
					<button
						type="button"
						class="sdp-card-design-btn"
						class:active={selectedCard === 'newspaper'}
						onclick={() => (selectedCard = 'newspaper')}
					>
						<div class="mini-card-mockup mock-newspaper">
							<div class="mock-np-head">Headline on Top</div>
							<div class="mock-np-img">📷 Photo in Middle</div>
							<div class="mock-line-p"></div>
						</div>
						<div class="sdp-card-design-info">
							<span class="sdp-card-title">Newspaper Editorial</span>
							<span class="sdp-card-caption">Headline on top, center photo, article text below</span>
						</div>
					</button>

					<!-- 2. Bold Magazine Cover -->
					<button
						type="button"
						class="sdp-card-design-btn"
						class:active={selectedCard === 'bold'}
						onclick={() => (selectedCard = 'bold')}
					>
						<div class="mini-card-mockup mock-bold">
							<div class="mock-bold-bg">
								<span class="mock-bold-badge">MAGAZINE</span>
								<div class="mock-bold-title">Text Overlaid on Full Photo</div>
							</div>
						</div>
						<div class="sdp-card-design-info">
							<span class="sdp-card-title">Bold Magazine Cover</span>
							<span class="sdp-card-caption">Full-bleed photo cover with gradient text overlay</span>
						</div>
					</button>

					<!-- 3. Polaroid Frame -->
					<button
						type="button"
						class="sdp-card-design-btn"
						class:active={selectedCard === 'polaroid'}
						onclick={() => (selectedCard = 'polaroid')}
					>
						<div class="mini-card-mockup mock-polaroid">
							<div class="mock-pol-mount">📸 Photo Frame</div>
							<div class="mock-pol-note">Handwritten Note</div>
						</div>
						<div class="sdp-card-design-info">
							<span class="sdp-card-title">Polaroid Memory Frame</span>
							<span class="sdp-card-caption">Classic photo mount with handwritten caption note</span>
						</div>
					</button>

					<!-- 4. Frosted Glass -->
					<button
						type="button"
						class="sdp-card-design-btn"
						class:active={selectedCard === 'glass'}
						onclick={() => (selectedCard = 'glass')}
					>
						<div class="mini-card-mockup mock-glass">
							<div class="mock-glass-top">💎 Glass Banner</div>
							<div class="mock-line-title"></div>
							<div class="mock-line-p"></div>
						</div>
						<div class="sdp-card-design-info">
							<span class="sdp-card-title">Frosted Glassmorphism</span>
							<span class="sdp-card-caption">Translucent frosted glass with luminous border glow</span>
						</div>
					</button>

					<!-- 5. Minimal Borderless -->
					<button
						type="button"
						class="sdp-card-design-btn"
						class:active={selectedCard === 'minimal'}
						onclick={() => (selectedCard = 'minimal')}
					>
						<div class="mini-card-mockup mock-minimal">
							<div class="mock-min-accent"></div>
							<div class="mock-min-content">
								<div class="mock-line-title"></div>
								<div class="mock-line-p"></div>
							</div>
						</div>
						<div class="sdp-card-design-info">
							<span class="sdp-card-title">Minimal Borderless</span>
							<span class="sdp-card-caption">Clean typography with prominent indigo accent bar</span>
						</div>
					</button>

					<!-- 6. Standard Image-Top -->
					<button
						type="button"
						class="sdp-card-design-btn"
						class:active={selectedCard === 'default'}
						onclick={() => (selectedCard = 'default')}
					>
						<div class="mini-card-mockup mock-standard">
							<div class="mock-std-img">📷 Cover Image</div>
							<div class="mock-std-body">
								<div class="mock-line-title"></div>
								<div class="mock-line-p"></div>
							</div>
						</div>
						<div class="sdp-card-design-info">
							<span class="sdp-card-title">Standard Card</span>
							<span class="sdp-card-caption">Modern card with photo on top and clean body</span>
						</div>
					</button>

				</div>
			</div>

			<!-- ═══════════════════════════════════════════════════════════════ -->
			<!-- STEP 3: Background Color & Border Styling                       -->
			<!-- ═══════════════════════════════════════════════════════════════ -->
			<div class="sdp-field">
				<div class="sdp-step-header">
					<span class="sdp-step-badge">3</span>
					<label class="sdp-label">
						Section Background &amp; Border Styling
					</label>
				</div>

				<div class="sdp-styling-box">
					<!-- Background Color -->
					<div class="sdp-style-subgroup">
						<span class="sdp-sub-label">Background Color:</span>
						<div class="sdp-color-picker-row">
							<div class="sdp-swatches-strip">
								{#each bgPresets as p}
									<button
										type="button"
										class="sdp-swatch-circle"
										class:active={bgColor.toLowerCase() === p.hex.toLowerCase()}
										style={`background-color: ${p.hex};`}
										onclick={() => (bgColor = p.hex)}
										title={p.name}
									>
										{#if bgColor.toLowerCase() === p.hex.toLowerCase()}
											<span class="sdp-check" style={p.hex === '#0f172a' ? 'color: #fff;' : 'color: #1e293b;'}>✓</span>
										{/if}
									</button>
								{/each}
							</div>

							<div class="sdp-custom-color-pill">
								<input
									type="color"
									class="sdp-color-input"
									bind:value={bgColor}
									id="sdp-bg-color"
								/>
								<label for="sdp-bg-color" class="sdp-color-hex">{bgColor.toUpperCase()}</label>
							</div>
						</div>
					</div>

					<!-- Border Toggle & Color -->
					<div class="sdp-style-subgroup border-subgroup">
						<div class="sdp-border-toggle-row">
							<label class="sdp-checkbox-label">
								<input type="checkbox" bind:checked={hasBorder} />
								<span class="sdp-label-text">Enable Section Border / Container Box</span>
							</label>
						</div>

						{#if hasBorder}
							<div class="sdp-border-color-options">
								<span class="sdp-sub-label">Border Outline Color:</span>
								<div class="sdp-color-picker-row">
									<div class="sdp-swatches-strip">
										{#each borderPresets as bp}
											<button
												type="button"
												class="sdp-swatch-circle"
												class:active={borderColor.toLowerCase() === bp.hex.toLowerCase()}
												style={`background-color: ${bp.hex};`}
												onclick={() => (borderColor = bp.hex)}
												title={bp.name}
											>
												{#if borderColor.toLowerCase() === bp.hex.toLowerCase()}
													<span class="sdp-check" style={bp.hex === '#334155' || bp.hex === '#3b82f6' ? 'color: #fff;' : 'color: #1e293b;'}>✓</span>
												{/if}
											</button>
										{/each}
									</div>

									<div class="sdp-custom-color-pill">
										<input
											type="color"
											class="sdp-color-input"
											bind:value={borderColor}
											id="sdp-border-color"
										/>
										<label for="sdp-border-color" class="sdp-color-hex">{borderColor.toUpperCase()}</label>
									</div>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>

		</div>

		<!-- Footer -->
		<div class="sdp-footer">
			{#if section}
				<button class="sdp-btn-danger" onclick={deleteSection} type="button" disabled={saving}>
					Delete Section
				</button>
			{/if}
			<div class="sdp-footer-right">
				<!-- See Preview Button -->
				<button
					type="button"
					class="sdp-btn-preview-bottom"
					onclick={() => (showFullPreviewModal = true)}
					disabled={saving}
				>
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
					</svg>
					See Preview
				</button>

				<button class="sdp-btn-cancel" onclick={onclose} type="button" disabled={saving}>
					Cancel
				</button>
				<button class="sdp-btn-save" onclick={save} type="button" disabled={saving}>
					{#if saving}
						<span class="sdp-spinner"></span> Saving…
					{:else}
						{section ? 'Save Changes' : 'Create Section'}
					{/if}
				</button>
			</div>
		</div>
	</aside>
{/if}

<!-- ═══════════════════════════════════════════════════════════════════════════ -->
<!-- 🌟 FULL SCREEN CLIENT-FACING PREVIEW MODAL                                -->
<!-- ═══════════════════════════════════════════════════════════════════════════ -->
{#if showFullPreviewModal}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div class="sdp-modal-preview-backdrop" onclick={() => (showFullPreviewModal = false)} role="presentation">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="sdp-modal-preview-panel" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
			<!-- Preview Modal Header -->
			<div class="sdp-modal-preview-header">
				<div class="sdp-modal-preview-title-box">
					<span class="sdp-modal-live-tag">LIVE PREVIEW</span>
					<h3 class="sdp-modal-h3">{label || 'Section Preview'}</h3>
					<span class="sdp-modal-meta-tag">Layout: {selectedLayout} • Card: {selectedCard}</span>
				</div>

				<!-- Device Switcher -->
				<div class="sdp-device-switcher">
					<button
						type="button"
						class="sdp-device-btn"
						class:active={previewDevice === 'desktop'}
						onclick={() => (previewDevice = 'desktop')}
						title="Desktop View"
					>
						🖥️ Desktop
					</button>
					<button
						type="button"
						class="sdp-device-btn"
						class:active={previewDevice === 'tablet'}
						onclick={() => (previewDevice = 'tablet')}
						title="Tablet View"
					>
						📱 Tablet
					</button>
					<button
						type="button"
						class="sdp-device-btn"
						class:active={previewDevice === 'mobile'}
						onclick={() => (previewDevice = 'mobile')}
						title="Mobile View"
					>
						📱 Mobile
					</button>
				</div>

				<button
					type="button"
					class="sdp-modal-close"
					onclick={() => (showFullPreviewModal = false)}
					aria-label="Close Preview"
				>
					&times;
				</button>
			</div>

			<!-- Preview Viewport Frame -->
			<div class="sdp-modal-viewport-canvas device-{previewDevice}">
				<div
					class="sdp-public-section-mockup"
					style={`background-color: ${bgColor}; color: ${bgColor === '#0f172a' ? '#f8fafc' : '#0f172a'}; ${hasBorder ? `border: 2px solid ${borderColor}; border-radius: 18px;` : ''}`}
				>
					<div class="sdp-public-section-head">
						<h2 class="sdp-public-title" style={bgColor === '#0f172a' ? 'color: #ffffff;' : 'color: #0f172a;'}>
							{label || 'Sample Section Title'}
						</h2>
						{#if description}
							<p class="sdp-public-desc" style={bgColor === '#0f172a' ? 'color: #94a3b8;' : 'color: #64748b;'}>
								{description}
							</p>
						{/if}
					</div>

					<div class="sdp-public-layout-area">
						<SectionLayout
							posts={dynamicSimPosts}
							sectionLayout={selectedLayout}
							cardStyle={selectedCard}
						/>
					</div>
				</div>
			</div>

			<!-- Preview Modal Footer Actions -->
			<div class="sdp-modal-preview-footer">
				<button type="button" class="sdp-btn-cancel" onclick={() => (showFullPreviewModal = false)}>
					← Back to Customizer
				</button>
				<button type="button" class="sdp-btn-save" onclick={() => { showFullPreviewModal = false; save(); }}>
					💾 Save &amp; Apply Section Design
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
/* Backdrop */
.sdp-backdrop {
	position: fixed;
	inset: 0;
	background: rgba(15, 23, 42, 0.65);
	backdrop-filter: blur(5px);
	z-index: 1050;
	animation: sdpFadeIn .2s ease-out;
}
@keyframes sdpFadeIn { from { opacity: 0; } to { opacity: 1; } }

/* Drawer */
.sdp-drawer {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	max-width: 680px;
	background: #ffffff;
	z-index: 1060;
	display: flex;
	flex-direction: column;
	box-shadow: -12px 0 50px rgba(0, 0, 0, 0.3);
	animation: sdpSlideIn .25s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes sdpSlideIn {
	from { transform: translateX(100%); }
	to { transform: translateX(0); }
}

/* Header */
.sdp-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding: 1.25rem 1.75rem;
	border-bottom: 1px solid #f1f5f9;
	background: #f8fafc;
}
.sdp-header-actions {
	display: flex;
	align-items: center;
	gap: 10px;
}
.sdp-top-preview-btn {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	background: #eff6ff;
	color: #1d4ed8;
	border: 1.5px solid #bfdbfe;
	padding: 0.4rem 0.8rem;
	border-radius: 8px;
	font-size: 0.82rem;
	font-weight: 700;
	cursor: pointer;
	transition: all .15s;
}
.sdp-top-preview-btn:hover {
	background: #dbeafe;
	border-color: #2563eb;
}
.sdp-title {
	font-size: 1.25rem;
	font-weight: 800;
	color: #0f172a;
	margin: 0;
}
.sdp-subtitle {
	font-size: 0.84rem;
	color: #64748b;
	margin: 2px 0 0;
}
.sdp-close {
	background: #fff;
	border: 1px solid #e2e8f0;
	width: 34px;
	height: 34px;
	border-radius: 8px;
	color: #64748b;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all .15s;
}
.sdp-close:hover { background: #fee2e2; color: #ef4444; }

/* Body */
.sdp-body {
	flex: 1;
	overflow-y: auto;
	padding: 1.25rem 1.75rem;
	display: flex;
	flex-direction: column;
	gap: 1.35rem;
}
.sdp-error {
	background: #fef2f2;
	color: #dc2626;
	padding: 0.65rem 0.9rem;
	border-radius: 8px;
	font-size: 0.85rem;
	display: flex;
	align-items: center;
	gap: 6px;
}
.sdp-row-2col {
	display: grid;
	grid-template-columns: 1fr 1.3fr;
	gap: 14px;
}
.sdp-field {
	display: flex;
	flex-direction: column;
	gap: 0.45rem;
}
.sdp-label {
	font-size: 0.86rem;
	font-weight: 800;
	color: #1e293b;
}
.sdp-sub-label {
	font-size: 0.78rem;
	font-weight: 700;
	color: #475569;
}
.sdp-input {
	padding: 0.55rem 0.85rem;
	border-radius: 8px;
	border: 1.5px solid #cbd5e1;
	font-size: 0.88rem;
	background: #f8fafc;
	outline: none;
	width: 100%;
	box-sizing: border-box;
}
.sdp-input:focus { border-color: #2563eb; background: #fff; }
.sdp-textarea {
	padding: 0.55rem 0.85rem;
	border-radius: 8px;
	border: 1.5px solid #cbd5e1;
	font-size: 0.85rem;
	background: #f8fafc;
	outline: none;
	resize: vertical;
	font-family: inherit;
	width: 100%;
	box-sizing: border-box;
}
.sdp-textarea:focus { border-color: #2563eb; background: #fff; }

.sdp-readonly-box {
	background: #f1f5f9;
	padding: 0.55rem 0.85rem;
	border-radius: 8px;
	font-size: 0.88rem;
	border: 1px solid #e2e8f0;
}

.sdp-step-header {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 2px;
}
.sdp-step-badge {
	background: #2563eb;
	color: #fff;
	width: 22px;
	height: 22px;
	border-radius: 50%;
	font-size: 11px;
	font-weight: 800;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* 🎨 LIVE CLIENT-FACING SIMULATOR STYLES                                      */
/* ═══════════════════════════════════════════════════════════════════════════ */
.sdp-live-preview-container {
	background: #f8fafc;
	border: 1.5px solid #cbd5e1;
	border-radius: 14px;
	overflow: hidden;
	box-shadow: 0 6px 20px rgba(0,0,0,0.06);
}
.sdp-preview-top-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.65rem 1.1rem;
	background: #0f172a;
	color: #ffffff;
}
.sdp-preview-tag-box {
	display: flex;
	align-items: center;
	gap: 6px;
}
.sdp-preview-dot {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: #10b981;
	box-shadow: 0 0 8px #10b981;
}
.sdp-preview-tag {
	font-size: 11px;
	font-weight: 900;
	letter-spacing: 0.08em;
	color: #38bdf8;
}
.sdp-preview-right-controls {
	display: flex;
	align-items: center;
	gap: 8px;
}
.sdp-open-modal-preview-btn {
	background: #1e293b;
	border: 1px solid #475569;
	color: #ffffff;
	font-size: 0.75rem;
	font-weight: 700;
	padding: 0.25rem 0.65rem;
	border-radius: 6px;
	cursor: pointer;
	transition: background .15s;
}
.sdp-open-modal-preview-btn:hover {
	background: #2563eb;
	border-color: #2563eb;
}
.sdp-preview-canvas {
	padding: 1.25rem;
	min-height: 220px;
	transition: all .25s ease;
}
.sdp-sim-header {
	margin-bottom: 1.25rem;
}
.sdp-sim-title {
	font-size: 1.35rem;
	font-weight: 800;
	margin: 0;
	line-height: 1.25;
}
.sdp-sim-desc {
	font-size: 0.85rem;
	margin: 4px 0 0;
	line-height: 1.45;
}
.sdp-sim-layout-scaler {
	width: 100%;
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* 🖼️ CARD DESIGN SELECTOR BUTTONS (WITH RICH VISUAL MOCKUPS)                  */
/* ═══════════════════════════════════════════════════════════════════════════ */
.sdp-card-designs-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
}
.sdp-card-design-btn {
	display: flex;
	gap: 10px;
	align-items: center;
	padding: 0.65rem 0.75rem;
	background: #ffffff;
	border: 1.5px solid #e2e8f0;
	border-radius: 12px;
	cursor: pointer;
	text-align: left;
	transition: all .2s ease;
}
.sdp-card-design-btn:hover {
	border-color: #93c5fd;
	background: #f8fafc;
	transform: translateY(-1px);
}
.sdp-card-design-btn.active {
	border-color: #2563eb;
	background: #eff6ff;
	box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
}

.mini-card-mockup {
	width: 80px;
	height: 65px;
	border-radius: 6px;
	border: 1px solid #cbd5e1;
	overflow: hidden;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
.sdp-card-design-info {
	display: flex;
	flex-direction: column;
	gap: 2px;
}
.sdp-card-title {
	font-size: 0.84rem;
	font-weight: 800;
	color: #0f172a;
}
.sdp-card-caption {
	font-size: 0.72rem;
	color: #64748b;
	line-height: 1.35;
}

/* 1. Mockup: Newspaper */
.mock-newspaper {
	background: #fdfbf7;
	border-top: 3px solid #1c1917;
	padding: 3px;
	gap: 2px;
}
.mock-np-head {
	font-family: serif;
	font-size: 7px;
	font-weight: 900;
	color: #1c1917;
	line-height: 1.1;
}
.mock-np-img {
	height: 24px;
	background: #78716c;
	color: #fff;
	font-size: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 2px;
}

/* 2. Mockup: Bold */
.mock-bold {
	background: #0f172a;
	position: relative;
}
.mock-bold-bg {
	background: linear-gradient(135deg, #1e293b, #0f172a);
	height: 100%;
	padding: 4px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
}
.mock-bold-badge {
	font-size: 6px;
	color: #f59e0b;
	font-weight: 900;
}
.mock-bold-title {
	font-size: 6px;
	color: #ffffff;
	font-weight: 700;
	line-height: 1.1;
}

/* 3. Mockup: Polaroid */
.mock-polaroid {
	background: #ffffff;
	padding: 3px 3px 6px 3px;
	border: 1px solid #cbd5e1;
	transform: rotate(-1deg);
}
.mock-pol-mount {
	height: 38px;
	background: #475569;
	color: #fff;
	font-size: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.mock-pol-note {
	font-size: 6px;
	font-family: cursive;
	color: #1e293b;
	text-align: center;
	margin-top: 2px;
}

/* 4. Mockup: Glass */
.mock-glass {
	background: linear-gradient(135deg, rgba(239, 246, 255, 0.9), rgba(219, 234, 254, 0.7));
	border: 1px solid #60a5fa;
	padding: 4px;
	gap: 3px;
}
.mock-glass-top {
	font-size: 6px;
	font-weight: 800;
	color: #1d4ed8;
}

/* 5. Mockup: Minimal */
.mock-minimal {
	background: #ffffff;
	display: flex;
	flex-direction: row;
	gap: 4px;
	padding: 4px;
}
.mock-min-accent {
	width: 3px;
	background: #6366f1;
	border-radius: 2px;
	height: 100%;
}
.mock-min-content {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 4px;
	justify-content: center;
}

/* 6. Mockup: Standard */
.mock-standard {
	background: #ffffff;
}
.mock-std-img {
	height: 30px;
	background: #94a3b8;
	color: #fff;
	font-size: 6px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.mock-std-body {
	padding: 3px;
	display: flex;
	flex-direction: column;
	gap: 3px;
}

/* Line Placeholders */
.mock-line-title {
	height: 4px;
	background: #64748b;
	border-radius: 2px;
	width: 80%;
}
.mock-line-p {
	height: 3px;
	background: #cbd5e1;
	border-radius: 2px;
	width: 60%;
}

/* Layout Grid */
.sdp-layout-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 8px;
}
.sdp-swatch {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0.65rem 0.75rem;
	border-radius: 10px;
	border: 1.5px solid #e2e8f0;
	background: #ffffff;
	cursor: pointer;
	text-align: left;
	transition: all .15s;
}
.sdp-swatch:hover {
	border-color: #93c5fd;
	background: #f8fafc;
}
.sdp-swatch-active {
	border-color: #2563eb !important;
	background: #eff6ff !important;
	box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}
.sdp-swatch-icon {
	width: 22px;
	height: 22px;
	margin-bottom: 4px;
	color: #2563eb;
}
.sdp-swatch-label {
	font-size: 0.82rem;
	font-weight: 800;
	color: #0f172a;
}
.sdp-swatch-desc {
	font-size: 0.7rem;
	color: #64748b;
	margin-top: 2px;
}

/* Step 3 Styling Box */
.sdp-styling-box {
	background: #f8fafc;
	border: 1.5px solid #e2e8f0;
	border-radius: 12px;
	padding: 0.85rem 1.1rem;
	display: flex;
	flex-direction: column;
	gap: 0.85rem;
}
.sdp-style-subgroup {
	display: flex;
	flex-direction: column;
	gap: 6px;
}
.border-subgroup {
	border-top: 1px dashed #e2e8f0;
	padding-top: 0.75rem;
}

/* Color Picker & Swatches Row */
.sdp-color-picker-row {
	display: flex;
	align-items: center;
	gap: 10px;
	flex-wrap: wrap;
}
.sdp-swatches-strip {
	display: flex;
	gap: 8px;
	align-items: center;
	flex-wrap: wrap;
}
.sdp-swatch-circle {
	width: 26px;
	height: 26px;
	border-radius: 50%;
	border: 1.5px solid #cbd5e1;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all .15s;
}
.sdp-swatch-circle:hover { transform: scale(1.15); }
.sdp-swatch-circle.active {
	box-shadow: 0 0 0 2px #2563eb;
	transform: scale(1.1);
}
.sdp-check {
	font-size: 11px;
	font-weight: 900;
}
.sdp-custom-color-pill {
	display: flex;
	align-items: center;
	gap: 6px;
	background: #ffffff;
	border: 1.5px solid #cbd5e1;
	padding: 2px 7px;
	border-radius: 8px;
}
.sdp-color-input {
	-webkit-appearance: none;
	appearance: none;
	border: none;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	cursor: pointer;
	background: transparent;
	padding: 0;
}
.sdp-color-input::-webkit-color-swatch-wrapper { padding: 0; }
.sdp-color-input::-webkit-color-swatch { border: 1px solid #cbd5e1; border-radius: 50%; }
.sdp-color-hex {
	font-size: 0.75rem;
	font-weight: 800;
	color: #475569;
	font-family: monospace;
	cursor: pointer;
}

/* Border Control Field Box */
.sdp-border-toggle-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.sdp-checkbox-label {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	cursor: pointer;
	user-select: none;
}
.sdp-checkbox-label input {
	width: 16px;
	height: 16px;
	accent-color: #2563eb;
	cursor: pointer;
}
.sdp-label-text {
	font-size: 0.84rem;
	font-weight: 800;
	color: #1e293b;
}
.sdp-border-color-options {
	display: flex;
	flex-direction: column;
	gap: 6px;
	padding-top: 0.5rem;
}

/* Footer */
.sdp-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.1rem 1.75rem;
	border-top: 1px solid #f1f5f9;
	background: #f8fafc;
}
.sdp-footer-right {
	display: flex;
	gap: 8px;
	margin-left: auto;
}
.sdp-btn-preview-bottom {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	background: #eff6ff;
	color: #1d4ed8;
	border: 1.5px solid #bfdbfe;
	padding: 0.55rem 1rem;
	border-radius: 8px;
	font-size: 0.88rem;
	font-weight: 700;
	cursor: pointer;
	transition: all .15s;
}
.sdp-btn-preview-bottom:hover {
	background: #dbeafe;
	border-color: #2563eb;
}
.sdp-btn-cancel {
	padding: 0.55rem 1rem;
	background: #fff;
	border: 1.5px solid #cbd5e1;
	border-radius: 8px;
	font-size: 0.88rem;
	font-weight: 700;
	color: #475569;
	cursor: pointer;
}
.sdp-btn-save {
	padding: 0.55rem 1.4rem;
	background: #2563eb;
	color: #fff;
	border: none;
	border-radius: 8px;
	font-size: 0.88rem;
	font-weight: 800;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	gap: 6px;
}
.sdp-btn-save:hover { background: #1d4ed8; }
.sdp-btn-danger {
	background: #fee2e2;
	color: #dc2626;
	border: none;
	padding: 0.55rem 0.95rem;
	border-radius: 8px;
	font-size: 0.84rem;
	font-weight: 700;
	cursor: pointer;
}
.sdp-spinner {
	width: 12px;
	height: 12px;
	border: 2px solid #fff;
	border-top-color: transparent;
	border-radius: 50%;
	display: inline-block;
	animation: sdpSpin .6s linear infinite;
}
@keyframes sdpSpin { to { transform: rotate(360deg); } }

/* ═══════════════════════════════════════════════════════════════════════════ */
/* 🌟 FULL SCREEN PREVIEW MODAL STYLES                                         */
/* ═══════════════════════════════════════════════════════════════════════════ */
.sdp-modal-preview-backdrop {
	position: fixed;
	inset: 0;
	background: rgba(15, 23, 42, 0.85);
	backdrop-filter: blur(8px);
	z-index: 2000;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
	animation: sdpFadeIn .2s ease-out;
}
.sdp-modal-preview-panel {
	background: #f1f5f9;
	border-radius: 18px;
	width: 100%;
	max-width: 1200px;
	max-height: 94vh;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	box-shadow: 0 25px 60px rgba(0,0,0,0.4);
	border: 1px solid #334155;
	animation: sdpSlideUp .25s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes sdpSlideUp {
	from { transform: scale(0.96) translateY(16px); opacity: 0; }
	to { transform: scale(1) translateY(0); opacity: 1; }
}
.sdp-modal-preview-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 1.5rem;
	background: #0f172a;
	color: #ffffff;
	border-bottom: 1px solid #1e293b;
	flex-wrap: wrap;
	gap: 1rem;
}
.sdp-modal-preview-title-box {
	display: flex;
	align-items: center;
	gap: 10px;
}
.sdp-modal-live-tag {
	background: #10b981;
	color: #000000;
	font-size: 10px;
	font-weight: 900;
	padding: 2px 7px;
	border-radius: 4px;
	letter-spacing: 0.05em;
}
.sdp-modal-h3 {
	font-size: 1.15rem;
	font-weight: 800;
	margin: 0;
	color: #f8fafc;
}
.sdp-modal-meta-tag {
	font-size: 0.8rem;
	color: #94a3b8;
	background: #1e293b;
	padding: 2px 8px;
	border-radius: 6px;
}
.sdp-device-switcher {
	display: flex;
	background: #1e293b;
	border-radius: 8px;
	padding: 3px;
	gap: 4px;
}
.sdp-device-btn {
	background: transparent;
	border: none;
	color: #94a3b8;
	padding: 0.35rem 0.75rem;
	border-radius: 6px;
	font-size: 0.78rem;
	font-weight: 700;
	cursor: pointer;
	transition: all .15s;
}
.sdp-device-btn.active {
	background: #2563eb;
	color: #ffffff;
}
.sdp-modal-close {
	background: #1e293b;
	border: 1px solid #334155;
	color: #94a3b8;
	width: 32px;
	height: 32px;
	border-radius: 8px;
	font-size: 1.5rem;
	line-height: 1;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
}
.sdp-modal-close:hover {
	background: #fee2e2;
	color: #ef4444;
}
.sdp-modal-viewport-canvas {
	flex: 1;
	overflow-y: auto;
	padding: 2rem 0;
	display: flex;
	justify-content: center;
	background: #cbd5e1;
}
.sdp-modal-viewport-canvas.device-desktop {
	padding: 0;
	display: block;
}
.sdp-modal-viewport-canvas.device-desktop .sdp-public-section-mockup {
	width: 100%;
	max-width: 100%;
	border-radius: 0;
	box-shadow: none;
	padding: 3.5rem 1.5rem;
}
.sdp-modal-viewport-canvas.device-tablet .sdp-public-section-mockup {
	width: 768px;
	border-radius: 20px;
	box-shadow: 0 16px 40px rgba(0,0,0,0.2);
	padding: 2.5rem 1.5rem;
	margin: 0 auto;
}
.sdp-modal-viewport-canvas.device-mobile .sdp-public-section-mockup {
	width: 400px;
	border-radius: 24px;
	box-shadow: 0 16px 40px rgba(0,0,0,0.25);
	padding: 2rem 1rem;
	margin: 0 auto;
}
.sdp-public-section-mockup {
	background: #ffffff;
	box-sizing: border-box;
	transition: all .25s ease;
}
.sdp-public-section-head {
	max-width: 1100px;
	margin: 0 auto 2.5rem;
}
.sdp-public-layout-area {
	max-width: 1100px;
	margin: 0 auto;
}
.sdp-public-title {
	font-size: 2rem;
	font-weight: 900;
	letter-spacing: -0.02em;
	margin: 0;
	line-height: 1.2;
}
.sdp-public-desc {
	font-size: 1rem;
	margin: 0.5rem 0 0;
	line-height: 1.5;
}
.sdp-modal-preview-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 1.5rem;
	background: #ffffff;
	border-top: 1px solid #cbd5e1;
}
</style>
