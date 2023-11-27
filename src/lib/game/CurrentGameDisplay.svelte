<script lang="ts">
	import GameInput from './GameInput.svelte';
	import type { Game } from './game.svelte';

	type Props = {
		game: Game;
	};

	let { game } = $props<Props>();

	let timeRemaining = $derived(game.timeRemaining);

	let guess = $state('');

	let gameInput: GameInput;

	function updateGuess(value: string) {
		guess = value;
	}

	function submitAnswer(value: string) {
		const outcome = game.answer(parseFloat(value));
		// reset our guess if we enter the next round
		if (outcome) {
			reset();
		}
	}

	export function reset() {
		guess = '';
		gameInput.focus();
	}
</script>

<div class="container">
	<div class="timer" style={`transform: scaleX(${$timeRemaining})`} />
	<p class="score">score: {game.score}</p>
	<p class="question">{game.round?.question}</p>
	<GameInput
		bind:this={gameInput}
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

	.timer {
		align-self: flex-start;
		width: 100%;
		height: 2px;
		background-color: s.$default-primary;
		border-radius: s.$radius;
		margin-bottom: 2rem;
	}

	.score {
		color: s.$default-secondary;
	}

	.question {
		font-size: 3rem;
		margin-bottom: 1.5rem;
	}
</style>
