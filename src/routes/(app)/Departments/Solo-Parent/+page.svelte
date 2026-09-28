<script>
	import OfficeTemplate from '$lib/Components/Offices/OfficeTemplate.svelte';
	import { getDeptDefaults, mergeOfficeData } from '$lib/deptDefaults';

	let { data } = $props();

	const defaults = getDeptDefaults('Solo-Parent') ?? { department: 'Solo-Parent' };

	// Merge Firestore dynamic data over defaults
	const pageData = $derived(mergeOfficeData(defaults, data?.officePageData));
</script>

<OfficeTemplate {...pageData} />
