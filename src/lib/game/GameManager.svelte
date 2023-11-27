<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { GameState, Round } from './types';
	import { generateRound } from './utils';
	import { highscore } from '$lib/highscore/index.svelte';
	import GameButton from '$lib/game/GameButton.svelte';
	import GameInput from './GameInput.svelte';
	import { tick } from 'svelte';
	import { scale } from 'svelte/transition';

	let gameState = $state<GameState>('idle');
	let score = $state<number>(0);
	let round = $state<Round | null>(null);
	let answer = $state<string>('');

	const timeRemaining = tweened(1, { duration: 6500 });
	let lose_timeout: number | undefined;
	let gameInput: GameInput;

	async function start() {
		gameState = 'playing';
		score = 0;
		newRound();
		await tick();
		gameInput.focus();
	}

	function submit() {
		if (parseInt(answer) === round?.answer) {
			score += 1;
			newRound();
		} else {
			lose();
		}
	}

	function lose() {
		gameState = 'lost';
		timeRemaining.set(0, { duration: 100 });
		highscore.attemptBreak(score);
		clearTimeout(lose_timeout);
	}

	function newRound() {
		answer = '';
		clearTimeout(lose_timeout);
		round = generateRound(score);

		timeRemaining.set(1, { duration: 0 });
		timeRemaining.set(0);

		lose_timeout = setTimeout(lose, 6500);
	}
</script>

<div class="container">
	<p class="highscore">
		<span>highscore: </span>
		<span class="score-value">{highscore.current}</span>
	</p>

	{#if gameState === 'idle'}
		<div class="start-display">
			<GameButton onclick={start}>start</GameButton>
		</div>
	{/if}

	{#if gameState === 'playing' || gameState === 'lost'}
		<div class="playing-display">
			<div class="timer" style={`transform: scaleX(${$timeRemaining})`} />
			<span class="score">score: {score}</span>
			<span class="question">{round?.question}</span>
			<GameInput
				bind:this={gameInput}
				bind:value={answer}
				onenter={submit}
				disabled={gameState === 'lost'}
			/>
		</div>
	{/if}

	{#if gameState === 'lost'}
		<div class="lost-display">
			{#if highscore.hasBrokHighscore}
				<p in:scale={{ delay: 100 }} class="highscore-alert">NEW HIGH SCORE!</p>
			{/if}
			<p class="explanation">the correct answer was {round?.answer}</p>
			<GameButton onclick={start}>play again</GameButton>
		</div>
	{/if}
</div>

<style lang="scss">
	@use '$styles' as s;

	.container {
		margin: 1.5rem auto;
		padding: 8rem 0;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		gap: 1.6rem;
	}

	.highscore {
		position: absolute;
		right: 0;
		top: 0;
		padding-top: 0.5rem;
		display: flex;
		gap: 1rem;
		align-items: center;
		padding-right: 2rem;

		.score-value {
			font-weight: bold;
			font-size: 1.25rem;
		}
	}

	.start-display,
	.playing-display,
	.lost-display {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.start-display {
		.highscore {
			font-size: 1rem;
			margin-bottom: 1.2rem;
		}
	}

	.playing-display {
		.score {
			color: s.$default-secondary;
		}

		.question {
			font-size: 3rem;
			margin-bottom: 1.5rem;
		}

		.timer {
			width: 100%;
			height: 2px;
			background-color: s.$default-primary;
			border-radius: s.$radius;
			margin-bottom: 2rem;
		}
	}

	.lost-display {
		.highscore-alert {
			font-weight: bold;
			font-size: 1.2rem;
		}

		.explanation {
			color: s.$default-secondary;
			margin-bottom: 1rem;
		}
	}
</style>
