<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const defaults = getDeptDefaults('Licensing') ?? { department: 'Licensing' };

	// Merge Firestore dynamic data over defaults, ensuring forms are at the last section and personnel is removed
	const baseData = $derived(mergeOfficeData(defaults, data?.officePageData));
	const pageData = $derived({
		...baseData,
		department: 'Licensing',
		showPersonnel: false,
		formsAtEnd: true
	});
</script>

<svelte:head>
	<title>Business Permit &amp; Licensing Office (BPLO) | Municipality of Tanauan, Leyte</title>
</svelte:head>

<OfficeTemplate {...pageData} />
