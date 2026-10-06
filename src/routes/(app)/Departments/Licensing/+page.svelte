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
		formsAtEnd: true,
		showHeroServiceBadges: false,
		plaqueHeader: 'OFFICE DETAILS:',
		plaqueItems: [
			{
				title: 'Office Location',
				subtitle: 'Ground Floor, Tanauan Municipal Hall, Real St., Tanauan, Leyte',
				badge: 'GROUND FLOOR'
			},
			{
				title: 'Service Hours',
				subtitle: 'Monday – Friday | 8:00 AM – 5:00 PM (No Noon Break)',
				badge: 'MON – FRI'
			}
		]
	});
</script>

<svelte:head>
	<title>Business Permit &amp; Licensing Office (BPLO) | Municipality of Tanauan, Leyte</title>
	<meta
		name="description"
		content="Official business permit processing, regulatory compliance, licensing requirements, and public service information of the Business Permit & Licensing Office (BPLO), Municipality of Tanauan, Leyte."
	/>
</svelte:head>

<OfficeTemplate {...pageData} />
