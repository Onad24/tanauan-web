<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import CelebrationThemeManager from '$lib/Components/Celebrations/CelebrationThemeManager.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const defaults = getDeptDefaults('Mayors-Office') ?? { department: 'Mayors-Office' };

	// Merge Firestore dynamic data over defaults
	const pageData = $derived(mergeOfficeData(defaults, data?.officePageData));

	// Celebration Theme state (Defaulting to 'halloween' as Halloween is approaching)
	let currentTheme = $state('halloween');

	// Celebration-adapted dynamic copy for typewriter text and tagline
	const themedPageData = $derived.by(() => {
		const base = { ...pageData };

		if (currentTheme === 'halloween') {
			return {
				...base,
				tagline:
					'🎃 Leading Tanauan with integrity, faith, and compassion — wishing every family a peaceful, safe, and blessed Halloween and Undas season. 🕸️ 👻 💀',
				typewriterWords: [
					'🎃 Happy Halloween & Peaceful Undas 2026',
					'🕸️ Spooky Season Greetings from the Mayor\'s Office',
					'👻 Safe, Blessed & Meaningful Undas for All Families',
					'💀 Honoring Our Heritage, Guiding Progress with Integrity',
					'🍬 Serving 54 Barangays with Servant Leadership'
				]
			};
		} else if (currentTheme === 'christmas') {
			return {
				...base,
				tagline:
					'🎄 Maligayang Pasko at Manigong Bagong Taon! Bringing holiday joy, unity, and continuous progress to every home in Tanauan.',
				typewriterWords: [
					'🎄 Maligayang Pasko at Manigong Bagong Taon!',
					'⭐ Paskuhan sa Tanauan: Unity, Peace & Hope',
					'🎁 Spreading Joy & Compassionate Public Service',
					'✨ Serving 54 Barangays with Love & Devotion'
				]
			};
		} else if (currentTheme === 'fiesta') {
			return {
				...base,
				tagline:
					'🎉 Viva Señor Santo Niño! Celebrating faith, unity, and our vibrant cultural heritage at the Tanauan Pasaka Festival.',
				typewriterWords: [
					'🎉 Viva Señor Santo Niño! Pasaka Festival Celebration',
					'🥁 Celebrating Culture, Heritage & Community Resilience',
					'🌈 A Vibrant, Festive & Thriving Tanauan for Everyone',
					'✨ United in Faith, Tradition & Forward Progress'
				]
			};
		} else if (currentTheme === 'foundation') {
			return {
				...base,
				tagline:
					'🏅 Commemorating the enduring resilience, rich history, and dynamic progress of the Municipality of Tanauan.',
				typewriterWords: [
					'🏅 Happy Araw ng Tanauan! Celebrating Our Heritage',
					'🏛️ Proud Past, Resilient Present, Inspiring Future',
					'🌟 Championing Citizen-First Governance & Innovation',
					'🇵🇭 Honoring 54 Barangays of Tanauan Excellence'
				]
			};
		}

		return base;
	});
</script>

<CelebrationThemeManager
	bind:currentTheme
	officeCode={themedPageData.officeCode || 'OMM'}
	officeName={themedPageData.officeName || 'Office of the Municipal Mayor'}
>
	<OfficeTemplate {...themedPageData} />
</CelebrationThemeManager>

