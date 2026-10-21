<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Toasts from '$lib/components/Toasts.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Weekend Away Registration Form</title>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
<Toasts />
