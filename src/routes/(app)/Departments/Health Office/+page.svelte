<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const defaults = { department: 'Health Office', ...(getDeptDefaults('Health Office') ?? {}) };

	// Merge Firestore dynamic data over defaults
	const pageData = $derived(mergeOfficeData(defaults, data?.officePageData));
</script>

<OfficeTemplate {...pageData} showAccomplishments={true} showPersonnel={false} formsAtEnd={true} />
