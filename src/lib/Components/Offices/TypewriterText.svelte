<script>
	import { onMount, onDestroy } from 'svelte';

	let {
		words = ['Excellence in Public Service', 'Integrity & Transparency', 'Progress for Tanauan'],
		typingSpeed = 40,
		deletingSpeed = 20,
		pauseDuration = 2400,
		class: customClass = '',
		textColor = 'text-blue-950',
		cursorColor = 'bg-amber-500'
	} = $props();

	let currentText = $state('');
	let wordIndex = $state(0);
	let isDeleting = $state(false);
	let timeoutId;

	function tick() {
		if (!words || words.length === 0) return;

		const fullWord = words[wordIndex % words.length];

		if (isDeleting) {
			currentText = fullWord.substring(0, currentText.length - 1);
		} else {
			currentText = fullWord.substring(0, currentText.length + 1);
		}

		let nextDelay = isDeleting ? deletingSpeed : typingSpeed;

		if (!isDeleting) {
			nextDelay += (Math.random() - 0.5) * 15;
		}

		if (!isDeleting && currentText === fullWord) {
			nextDelay = pauseDuration;
			isDeleting = true;
		} else if (isDeleting && currentText === '') {
			isDeleting = false;
			wordIndex = (wordIndex + 1) % words.length;
			nextDelay = 400;
		}

		timeoutId = setTimeout(tick, nextDelay);
	}

	onMount(() => {
		tick();
	});

	onDestroy(() => {
		if (timeoutId) clearTimeout(timeoutId);
	});
</script>

<span class="inline-flex items-baseline tracking-tight font-medium {customClass}">
	<span class="{textColor} font-bold">{currentText}</span>
	<span
		class="inline-block w-[3px] h-[1.15em] ml-1.5 {cursorColor} align-middle animate-[blink_1s_infinite]"
	></span>
</span>

<style>
	@keyframes blink {
		0%, 49% {
			opacity: 1;
		}
		50%, 100% {
			opacity: 0;
		}
	}
</style>
