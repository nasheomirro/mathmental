<script lang="ts">
	import GameInput from './GameInput.svelte';
	import type { Game } from './game.svelte';

	type Props = {
		game: Game;
	};

	let { game } = $props<Props>();

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

	export function reset() {
		guess = '';
	}
</script>

<div class="container">
	<p class="score">score: {game.score}</p>
	<p class="question">{game.round?.question}</p>
	<GameInput
		disabled={game.state !== 'playing'}
		value={guess}
		oninput={updateGuess}
		onenter={submitAnswer}
	/>
</div>

<style lang="scss">
	@use '$styles' as s;

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 1.6rem;
	}

	.score {
		color: s.$default-secondary;
	}

	.question {
		font-size: 3rem;
		margin-bottom: 1.5rem;
	}
</style>
