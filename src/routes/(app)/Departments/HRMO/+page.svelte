<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const defaults = {
		...(getDeptDefaults('HRMO') ?? { department: 'HRMO' }),
		department: 'HRMO'
	};

	// Merge Firestore dynamic data over defaults
	const pageData = $derived({
		...mergeOfficeData(defaults, data?.officePageData),
		department: 'HRMO'
	});
</script>

<svelte:head>
	<title>Human Resource Management Office (HRMO) | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Official Civil Service Commission & LGU Tanauan Organizational Chart, Supervisory Structure, and Human Resource Management Systems (PRIME-HRM) for Tanauan, Leyte."
	/>
</svelte:head>

<OfficeTemplate {...pageData} department="HRMO" />
