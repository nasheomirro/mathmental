<script lang="ts">
	import Day from '$lib/icons/Day.svelte';
	import Night from '$lib/icons/Night.svelte';
	import { ThemeManager } from './theme.svelte';

	const themeManager = new ThemeManager();
</script>

<button onclick={themeManager.toggleTheme.bind(themeManager)} class="theme-button">
	{#if themeManager.theme === 'light'}
		<Day />
	{:else if themeManager.theme === 'dark'}
		<Night />
	{/if}
</button>

<style lang="scss">
	@use '$styles' as s;

	.theme-button {
		width: s.$icon-width;
		background-color: transparent;
		border: none;
		cursor: pointer;
		transition: transform 200ms ease-in-out;

		&:hover {
			transform: scale(1.1);
		}
	}
</style>
