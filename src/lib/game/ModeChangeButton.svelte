<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { GameState, GetProps, Mode } from './types';

	type Props = {
		mode: Mode;
		gameState: GameState;
	};
	let { mode, gameState, ...rest } = $props<GetProps<HTMLButtonAttributes> & Props>();
</script>

<button
	class="mode-btn"
	class:hidden={gameState === 'idle'}
	disabled={gameState === 'playing'}
	{...rest}
>
	<svelte:component this={mode.icon} />
</button>

<style lang="scss">
	@use '$styles' as s;

	.mode-btn {
		width: 3rem;
		border: none;
		background-color: transparent;
		cursor: pointer;
		transition: filter 100ms ease-in;
		
		&:disabled {
			filter: grayscale(100%);
			cursor: not-allowed;
		}

		&.hidden {
			visibility: hidden;
		}
	}
</style>
