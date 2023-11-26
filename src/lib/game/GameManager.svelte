<script lang="ts">
	import GameInput from './GameInput.svelte';
	import { Game } from './game.svelte.js';

	const game = new Game();
	let guess = $state('');

	function updateGuess(value: string) {
		guess = value;
	}

	function submitAnswer(value: string) {
		const outcome = game.answer(parseFloat(value));
		// reset our guess if we enter the next round
		if (outcome) {
			guess = '';
		}
	}
</script>

{#if game.state === 'idle'}
	<button onclick={() => game.start()}>start</button>
{/if}

{#if game.state === 'playing' || game.state === 'lost'}
	<p>score: {game.score}</p>
	<p>{game.round?.question}</p>
	<GameInput
		disabled={game.state !== 'playing'}
		value={guess}
		oninput={updateGuess}
		onenter={submitAnswer}
	/>
{/if}

{#if game.state === 'lost'}
	<p>the correct answer was {game.round?.answer}</p>
	<button onclick={() => game.start()}>play again</button>
{/if}
