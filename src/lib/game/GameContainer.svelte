<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	const { children } = $props<Props>();
</script>

<div class="container">
	{@render children()}
</div>

<style lang="scss">
	@use '$styles' as s;

	.container {
		margin: 1.5rem auto;
		padding: 8rem 0;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
