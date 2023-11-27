<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { GameState, GetProps, Mode } from './types';

	type Props = {
		mode: Mode;
		gameState: GameState;
	};
	let { mode, gameState, ...rest } = $props<GetProps<HTMLButtonAttributes> & Props>();
</script>

<button class="mode-btn" disabled={gameState === 'playing'} {...rest}>
	<svelte:component this={mode.icon} />
</button>

<style lang="scss">
	@use '$styles' as s;

	.mode-btn {
		width: 3.5rem;
		border: none;
		background-color: transparent;
		cursor: pointer;
		position: absolute;
		top: 0.5rem;
		left: 0.2rem;
    transition: filter 200ms ease-in;

		&:disabled {
			filter: grayscale(100%);
			cursor: not-allowed;
		}
	}
</style>
