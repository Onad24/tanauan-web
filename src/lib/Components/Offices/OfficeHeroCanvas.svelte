<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let container;

	onMount(() => {
		if (!container) return;

		let animId;
		const getWidth = () => container.clientWidth || window.innerWidth;
		const getHeight = () => container.clientHeight || 600;

		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(55, getWidth() / getHeight(), 0.1, 1000);
		camera.position.set(0, 8, 14);
		camera.lookAt(0, 0, 0);

		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance'
		});
		renderer.setSize(getWidth(), getHeight());
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);

		// Government Topographical Wave Grid (Symbolizing Coastal Tanauan Waters & Civic Progress)
		const gridWidth = 36;
		const gridDepth = 24;
		const segmentsX = 48;
		const segmentsZ = 36;

		const planeGeo = new THREE.PlaneGeometry(gridWidth, gridDepth, segmentsX, segmentsZ);
		planeGeo.rotateX(-Math.PI / 2);

		const posAttr = planeGeo.attributes.position;
		const originalY = new Float32Array(posAttr.count);
		for (let i = 0; i < posAttr.count; i++) {
			originalY[i] = posAttr.getY(i);
		}

		// Subtle civic lines material: soft royal blue and golden warmth
		const wireframeMat = new THREE.MeshBasicMaterial({
			color: 0x2563eb,
			wireframe: true,
			transparent: true,
			opacity: 0.16
		});

		const waveMesh = new THREE.Mesh(planeGeo, wireframeMat);
		waveMesh.position.y = -2.5;
		scene.add(waveMesh);

		// Subtle golden secondary flow ribbon
		const ribbonGeo = new THREE.PlaneGeometry(gridWidth * 0.9, gridDepth * 0.8, segmentsX, segmentsZ);
		ribbonGeo.rotateX(-Math.PI / 2);
		const ribbonMat = new THREE.MeshBasicMaterial({
			color: 0xd97706,
			wireframe: true,
			transparent: true,
			opacity: 0.1
		});
		const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
		ribbonMesh.position.y = -3.2;
		scene.add(ribbonMesh);

		// Mouse interaction parallax
		let mouseX = 0;
		let mouseY = 0;
		let targetX = 0;
		let targetY = 0;

		const handleMouseMove = (e) => {
			const x = (e.clientX / window.innerWidth) * 2 - 1;
			const y = -(e.clientY / window.innerHeight) * 2 + 1;
			targetX = x * 0.8;
			targetY = y * 0.4;
		};

		const handleResize = () => {
			if (!container || !renderer || !camera) return;
			const w = getWidth();
			const h = getHeight();
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouseMove);

		const clock = new THREE.Clock();
		const animate = () => {
			animId = requestAnimationFrame(animate);

			const t = clock.getElapsedTime() * 0.8;

			// Smooth damping mouse follow
			mouseX += (targetX - mouseX) * 0.03;
			mouseY += (targetY - mouseY) * 0.03;

			// Subtle wave animation (representing Tanauan's San Pedro Bay waves and fiscal liquidity)
			for (let i = 0; i < posAttr.count; i++) {
				const x = posAttr.getX(i);
				const z = posAttr.getZ(i);
				const wave1 = Math.sin(x * 0.35 + t) * 0.55;
				const wave2 = Math.cos(z * 0.4 + t * 0.7) * 0.45;
				const wave3 = Math.sin((x + z) * 0.2 + t * 0.5) * 0.3;
				posAttr.setY(i, originalY[i] + wave1 + wave2 + wave3);
			}
			posAttr.needsUpdate = true;

			// Gentle rotation and camera pitch
			waveMesh.rotation.y = mouseX * 0.15;
			waveMesh.rotation.x = -mouseY * 0.1;
			ribbonMesh.rotation.y = -mouseX * 0.12;

			renderer.render(scene, camera);
		};

		animate();

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
			if (animId) cancelAnimationFrame(animId);
			if (renderer && renderer.domElement) {
				renderer.dispose();
				if (container.contains(renderer.domElement)) {
					container.removeChild(renderer.domElement);
				}
			}
			planeGeo.dispose();
			ribbonGeo.dispose();
			wireframeMat.dispose();
			ribbonMat.dispose();
		};
	});
</script>

<div
	bind:this={container}
	class="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none -z-10"
	aria-hidden="true"
></div>
