<script lang="ts">
	import GameContainer from './GameContainer.svelte';
	import CurrentGameDisplay from './CurrentGameDisplay.svelte';
	import { Game } from './game.svelte.js';
	import GameButton from './GameButton.svelte';
	import GameLostDisplay from './GameLostDisplay.svelte';
	import { tick } from 'svelte';

	const game = new Game();
	let displayRef: CurrentGameDisplay;

	function newGame() {
		game.start();
		tick().then(displayRef.reset);
	}
</script>

<GameContainer>
	{#if game.state === 'idle'}
		<GameButton onclick={newGame}>start</GameButton>
	{/if}

	{#if game.state === 'playing' || game.state === 'lost'}
		<CurrentGameDisplay bind:this={displayRef} {game} />
	{/if}

	{#if game.state === 'lost'}
		<GameLostDisplay {game} onplayagain={newGame} />
	{/if}
</GameContainer>
