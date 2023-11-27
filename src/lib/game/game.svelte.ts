import { tweened } from 'svelte/motion';
import { generateRound } from './generator';
import type { Round } from './types';

const DURATION = 6500;

export class Game {
	state = $state<'idle' | 'playing' | 'lost'>('idle');
	round = $state<Round | null>();
	score = $state<number>(0);
	timeRemaining = tweened(1, { duration: DURATION });

	#lose_timeout: number | undefined;

	#newRound() {
		clearTimeout(this.#lose_timeout);
		this.round = generateRound(this.score);

		this.timeRemaining.set(1, { duration: 0 });
		this.timeRemaining.set(0);

		this.#lose_timeout = setTimeout(() => {
			this.state = 'lost';
		}, DURATION);
	}

	start() {
		this.state = 'playing';
		this.score = 0;
		this.#newRound();
	}

	answer(guess: number) {
		if (guess === this.round?.answer) {
			this.score++;
			this.#newRound();
			return true;
		} else {
			this.state = 'lost';
			this.timeRemaining.set(0, { duration: 100 });
			clearTimeout(this.#lose_timeout);
			return false;
		}
	}
}
