<script lang="ts">
	import GameButton from './GameButton.svelte';
	import type { Game } from './game.svelte';

	type Props = {
		game: Game;
		onplayagain: () => void;
	};

	let { game, onplayagain } = $props<Props>();
</script>

<p class="explanation">the correct answer was {game.round?.answer}</p>
<GameButton onclick={onplayagain}>play again</GameButton>

<style lang="scss">
  @use '$styles' as s;

  .explanation {
    color: s.$default-secondary;
    margin-bottom: 1rem;
  }
</style>