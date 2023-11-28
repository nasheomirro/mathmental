<script lang="ts">
	import { tweened } from 'svelte/motion';
	import type { GameState, Mode, Round } from './types';
	import { generateRound } from './utils';
	import GameButton from '$lib/game/GameButton.svelte';
	import GameInput from './GameInput.svelte';
	import { tick } from 'svelte';
	import { scale } from 'svelte/transition';
	import { playAudio } from '$lib/audio';
	import { modes } from './config';
	import GameModeChange from './GameModeChange.svelte';
	import ModeChangeButton from './ModeChangeButton.svelte';
	import { HighScore } from './highscore.svelte';

	let highscore = new HighScore();

	let mode = $state<Mode>(modes.rabbit);
	let gameState = $state<GameState>('idle');
	let score = $state<number>(0);
	let round = $state<Round | null>(null);
	let answer = $state<string>('');

	const timeRemaining = tweened(1);
	let lose_timeout: number | undefined;
	let gameInput: GameInput;

	$effect(() => highscore.changeScoreToMode(mode.key));

	async function start() {
		playAudio('start');
		gameState = 'playing';
		score = 0;
		newRound();
		await tick();
		gameInput.focus();
	}

	function submit() {
		if (parseInt(answer) === round?.answer) {
			playAudio('ping');
			score += 1;
			newRound();
		} else {
			lose();
		}
	}

	function lose() {
		playAudio('lose');
		gameState = 'lost';
		timeRemaining.set(0, { duration: 100 });
		highscore.attemptBreak(mode.key, score);
		clearTimeout(lose_timeout);
	}

	function newRound() {
		answer = '';
		clearTimeout(lose_timeout);
		round = generateRound(score);

		timeRemaining.set(1, { duration: 0 });
		timeRemaining.set(0, { duration: mode.duration });

		lose_timeout = setTimeout(lose, mode.duration);
	}
</script>

<div class="container">
	<div class="top-bar">
		<ModeChangeButton
			{mode}
			{gameState}
			onclick={() => {
				gameState = 'idle';
			}}
		/>
		<p class="highscore">
			<span>highscore: </span>
			<span class="score-value">{highscore.current}</span>
		</p>
	</div>

	{#if gameState === 'idle'}
		<div class="start-display">
			<GameModeChange
				{mode}
				onmodechange={(newMode) => {
					mode = newMode;
				}}
			/>
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
			{#if highscore.hasBrokeHighscore}
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
		max-width: 400px;
		padding-top: 7rem;
		min-height: 30rem;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		position: relative;
		gap: 1.6rem;
	}

	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		top: 0.5rem;
		left: 0;
		right: 0;
		padding: 0 1.5rem;

		.highscore {
			display: flex;
			align-items: center;
			gap: 1rem;

			.score-value {
				font-weight: bold;
				font-size: 1.25rem;
			}
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
		gap: 1.2rem;
		width: 100%;

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
