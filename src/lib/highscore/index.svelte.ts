import type { ModeKeys } from "$lib/game/config";

const storageKey = 'highscore';

class HighScore {
	current = $state<number>(0);
	/** set to `true` when the most recent attempt to update the score is successful.  */
	hasBrokeHighscore = $state(false);

	attemptBreak(score: number) {
		if (score > this.current) {
			setScore(score);
			this.current = score;
			this.hasBrokeHighscore = true;
		} else {
			this.hasBrokeHighscore = false;
		}
	}

	changeMode(mode: ModeKeys) {
		this.current = getScore(mode);
	}
}

export const highscore = new HighScore();

function getScore(mode: string) {
	const rawVal = localStorage.getItem(mode + "-" + storageKey);
	if (rawVal) {
		return parseInt(rawVal);
	}
	// no highscore was saved
	return 0;
}

function setScore(val: number) {
	localStorage.setItem(storageKey, val.toString());
}
