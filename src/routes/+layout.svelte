<script lang="ts">
	import faviconUrl from '$lib/icons/favicon.svg';
</script>

<svelte:head>
	<link rel="icon" href={faviconUrl} />
	<title>DoTheMath</title>
</svelte:head>

<slot />
