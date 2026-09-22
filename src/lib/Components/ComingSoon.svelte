<!-- ComingSoon.svelte -->
<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	onMount(() => {
		gsap.from('.fade-in', {
			opacity: 0,
			y: 20,
			duration: 1.2,
			ease: 'power2.out',
			stagger: 0.3
		});
	});

	const goBack = () => window.history.back();
	const goHome = () => (window.location.href = '/');
</script>

<section
	class="flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6 py-20 text-center"
>
	<div class="fade-in">
		<img
			src="/coming soon/building website.svg"
			alt="Under construction illustration"
			class="animate-bounce-slow mx-auto mb-6 h-56 w-56"
		/>
	</div>

	<h1 class="fade-in mb-3 text-2xl font-bold text-blue-800 md:text-3xl">
		Stay Tuned for More Updates!
	</h1>
	<p class="fade-in max-w-md text-gray-600">
		This department’s page is currently being built. Our team is working hard to bring you detailed
		information and services soon.
	</p>

	<div class="fade-in mt-6 flex gap-4">
		<button
			class="rounded-full bg-blue-600 px-6 py-2 text-white shadow-md transition duration-300 hover:bg-blue-700"
			on:click={goBack}
		>
			Go Back
		</button>

		<button
			class="rounded-full bg-green-600 px-6 py-2 text-white shadow-md transition duration-300 hover:bg-green-700"
			on:click={goHome}
		>
			Return Home
		</button>
	</div>
</section>

<style>
	.animate-bounce-slow {
		animation: bounce 3s infinite;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-8px);
		}
	}
</style>
