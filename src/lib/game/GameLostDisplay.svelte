<script lang="ts">
	import GameButton from './GameButton.svelte';
	import type { Game } from './game.svelte';
	import { highscore } from '$lib/highscore/index.svelte';
	import { scale } from 'svelte/transition';

	type Props = {
		game: Game;
		onplayagain: () => void;
	};

	let { game, onplayagain } = $props<Props>();

	$effect.pre(() => {
		highscore.attemptBreak(game.score);
	});
</script>

{#if highscore.hasBrokHighscore}
	<p in:scale class="highscore">NEW HIGH SCORE!</p>
{/if}
<p class="explanation">the correct answer was {game.round?.answer}</p>
<GameButton onclick={onplayagain}>play again</GameButton>

<style lang="scss">
	@use '$styles' as s;

	.highscore {
		font-weight: bold;
		font-size: 1.2rem;
	}

	.explanation {
		color: s.$default-secondary;
		margin-bottom: 1rem;
	}
</style>
