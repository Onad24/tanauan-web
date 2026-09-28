<script>
	import { onMount } from 'svelte';

	let canvas;

	class WaterRipple {
		constructor(x, y, strength = 1, isClick = false, boundWidth = 1000, boundHeight = 800) {
			this.x = x;
			this.y = y;
			this.radius = 2;
			this.maxRadius = isClick ? Math.min(boundWidth, boundHeight) * 0.45 : 130 + strength * 50;
			this.speed = isClick ? 2.8 : 1.5 + strength * 0.5;
			this.opacity = isClick ? 0.85 : 0.40 + strength * 0.20;
			this.decay = isClick ? 0.006 : 0.0075;
			this.waveWidth = isClick ? 3.2 : 2.0;
		}

		update() {
			this.radius += this.speed;
			this.opacity -= this.decay;
			this.speed *= 0.99; // Gentler fluid deceleration
			return this.opacity > 0.01 && this.radius < this.maxRadius;
		}

		draw(ctx) {
			if (this.opacity <= 0) return;

			ctx.save();
			ctx.lineWidth = this.waveWidth;

			// Outer Primary Wave Crest (Oceanic cyan-blue and subtle gold sunlight shimmer)
			const grad = ctx.createRadialGradient(
				this.x, this.y, Math.max(0, this.radius - 12),
				this.x, this.y, this.radius + 6
			);

			// Tanauan coastal palette: cyan-blue + golden reflection
			const alpha = Math.max(0, Math.min(1, this.opacity));
			grad.addColorStop(0, `rgba(96, 165, 250, 0)`);
			grad.addColorStop(0.6, `rgba(147, 197, 253, ${alpha * 0.75})`);
			grad.addColorStop(0.85, `rgba(251, 191, 36, ${alpha * 0.55})`);
			grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

			ctx.strokeStyle = grad;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			ctx.stroke();

			// Inner Harmonic Wave Ring (delayed propagation)
			if (this.radius > 20) {
				const innerRadius = this.radius * 0.65;
				const innerAlpha = alpha * 0.45;
				ctx.lineWidth = Math.max(1, this.waveWidth * 0.6);
				ctx.strokeStyle = `rgba(186, 230, 253, ${innerAlpha})`;
				ctx.beginPath();
				ctx.arc(this.x, this.y, innerRadius, 0, Math.PI * 2);
				ctx.stroke();
			}

			// Tertiary Subtle Ambient Caustic Ring
			if (this.radius > 35) {
				const thirdRadius = this.radius * 0.38;
				const thirdAlpha = alpha * 0.25;
				ctx.lineWidth = 1;
				ctx.strokeStyle = `rgba(253, 230, 138, ${thirdAlpha})`;
				ctx.beginPath();
				ctx.arc(this.x, this.y, thirdRadius, 0, Math.PI * 2);
				ctx.stroke();
			}

			ctx.restore();
		}
	}

	onMount(() => {
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		let animId;
		let width = 0;
		let height = 0;
		let lastMouseX = -1000;
		let lastMouseY = -1000;
		let lastSpawnTime = 0;

		// Water ripples pool
		const ripples = [];
		const MAX_RIPPLES = 45;

		function resize() {
			const parent = canvas.parentElement;
			if (!parent) return;
			const rect = parent.getBoundingClientRect();
			width = rect.width;
			height = rect.height;

			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(dpr, dpr);
		}

		resize();
		window.addEventListener('resize', resize);

		function spawnRipple(x, y, strength = 1, isClick = false) {
			if (ripples.length >= MAX_RIPPLES) {
				ripples.shift();
			}
			ripples.push(new WaterRipple(x, y, strength, isClick, width, height));
		}

		const parent = canvas.parentElement;

		function handleMouseMove(e) {
			if (!parent) return;
			const rect = parent.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const dist = Math.hypot(x - lastMouseX, y - lastMouseY);
			const now = performance.now();

			// Spawn ripples with more delay between pulses (110ms interval, 36px distance)
			if (dist > 36 && now - lastSpawnTime > 110) {
				const speed = Math.min(dist / 28, 2.0);
				spawnRipple(x, y, speed, false);
				lastMouseX = x;
				lastMouseY = y;
				lastSpawnTime = now;
			}
		}

		function handleClick(e) {
			if (!parent) return;
			const rect = parent.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			spawnRipple(x, y, 2.2, true);
			setTimeout(() => spawnRipple(x, y, 1.5, false), 90);
		}

		if (parent) {
			parent.addEventListener('mousemove', handleMouseMove, { passive: true });
			parent.addEventListener('click', handleClick, { passive: true });
		}

		// Animation Loop
		function animate() {
			animId = requestAnimationFrame(animate);

			ctx.clearRect(0, 0, width, height);

			// Render and update active water ripples
			for (let i = ripples.length - 1; i >= 0; i--) {
				const rip = ripples[i];
				const alive = rip.update();
				if (alive) {
					rip.draw(ctx);
				} else {
					ripples.splice(i, 1);
				}
			}
		}

		animate();

		return () => {
			if (animId) cancelAnimationFrame(animId);
			window.removeEventListener('resize', resize);
			if (parent) {
				parent.removeEventListener('mousemove', handleMouseMove);
				parent.removeEventListener('click', handleClick);
			}
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none absolute inset-0 z-[6] h-full w-full select-none mix-blend-screen"
	aria-hidden="true"
></canvas>
