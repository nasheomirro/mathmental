import { generateRound } from './generator';
import type { Round } from './types';

export class Game {
	state = $state<'idle' | 'playing' | 'lost'>('idle');
	round = $state<Round | null>();
	score = $state<number>(0);

	#lose_timeout: number | undefined;

	#newRound() {
		clearTimeout(this.#lose_timeout);
		this.round = generateRound(this.score);

		this.#lose_timeout = setTimeout(() => {
			this.state = 'lost';
		}, 6500);
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
			clearTimeout(this.#lose_timeout);
			return false;
		}
	}
}
