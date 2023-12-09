<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { GetProps } from './types';
	import type { Snippet } from 'svelte';

	type Props = GetProps<HTMLButtonAttributes> & { children: Snippet };
	const { children, ...rest } = $props<Props>();
</script>

<button class="btn" {...rest}>
	{@render children()}
</button>

<style lang="scss">
	@use '$styles' as s;

	.btn {
		padding: 0.4rem 2.5rem;
		font-size: 1.1rem;
		border-radius: s.$radius;
		background-color: s.$default-primary;
		border: none;
		color: #000;
		box-shadow: s.$shadow;
		cursor: pointer;
		transition: filter 200ms ease-in-out;

		&:hover {
			filter: brightness(1.1);
		}
	}
</style>
