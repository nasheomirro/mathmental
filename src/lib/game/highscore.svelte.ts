export class HighScore {
	/** current highscore for the given mode */
	current = $state<number>(0);
	/** set to `true` when the most recent attempt to update the score is successful.  */
	hasBrokeHighscore = $state(false);

	changeScoreToMode(mode: string) {
		this.current = getScore(mode);
	}

	attemptBreak(mode: string, score: number) {
		if (getScore(mode) < score) {
			this.current = score;
			setScore(mode, score);
			this.hasBrokeHighscore = true;
		} else {
			this.hasBrokeHighscore = false;
		}
	}
}

const storageKey = 'highscore';

function getScore(mode: string) {
	const rawVal = localStorage.getItem(mode + '-' + storageKey);
	if (rawVal) {
		return parseInt(rawVal);
	}
	// no highscore was saved
	return 0;
}

function setScore(mode: string, val: number) {
	localStorage.setItem(mode + '-' + storageKey, val.toString());
}
