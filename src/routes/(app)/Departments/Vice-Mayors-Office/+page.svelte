<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const vmDefaults = getDeptDefaults('Vice-Mayors-Office') ?? { department: 'Vice-Mayors-Office' };

	const defaults = {
		...vmDefaults,
		department: 'Vice-Mayors-Office',
		showStructure: true
	};

	// Merge Firestore dynamic data over defaults
	const pageData = $derived({
		...mergeOfficeData(defaults, data?.officePageData),
		department: 'Vice-Mayors-Office',
		showStructure: true
	});
</script>

<svelte:head>
	<title>Office of the Municipal Vice Mayor | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Official Organizational Structure, Legislative Leadership, Sangguniang Bayan Presiding Officer directory, and frontline services for the Office of the Vice Mayor, Tanauan, Leyte."
	/>
</svelte:head>

<OfficeTemplate
	{...pageData}
	department="Vice-Mayors-Office"
	showStructure={true}
/>
