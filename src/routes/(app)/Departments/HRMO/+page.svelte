<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const hrmoDefaults = getDeptDefaults('HRMO') ?? { department: 'HRMO' };
	const hrmoForms = hrmoDefaults.downloadableForms || [];

	const defaults = {
		...hrmoDefaults,
		department: 'HRMO',
		showStructure: true,
		formsAtEnd: true,
		downloadableForms: hrmoForms
	};

	// Merge Firestore dynamic data over defaults
	const pageData = $derived({
		...mergeOfficeData(defaults, data?.officePageData),
		department: 'HRMO',
		showStructure: true,
		formsAtEnd: true,
		downloadableForms: hrmoForms
	});
</script>

<svelte:head>
	<title>Human Resource Management Office (HRMO) | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Official Civil Service Commission & LGU Tanauan Organizational Structure, Human Resource Management Systems (PRIME-HRM), official CS Form 7 Clearance and CS Form 6 Leave Application forms, and leadership directory for Tanauan, Leyte."
	/>
</svelte:head>

<OfficeTemplate
	{...pageData}
	department="HRMO"
	showStructure={true}
	formsAtEnd={true}
	downloadableForms={hrmoForms}
/>



