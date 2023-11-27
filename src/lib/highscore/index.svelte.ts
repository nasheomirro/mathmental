const storageKey = 'highscore';

class HighScore {
	current = $state<number>(getScore());
	/** set to `true` when the most recent attempt to update the score is successful.  */
	hasBrokHighscore = $state(false);

	attemptBreak(score: number) {
		if (score > this.current) {
			setScore(score);
			this.current = score;
			this.hasBrokHighscore = true;
		} else {
			this.hasBrokHighscore = false;
		}
	}
}

export const highscore = new HighScore();

function getScore() {
	const rawVal = localStorage.getItem(storageKey);
	if (rawVal) {
		parseInt(rawVal);
	}
	// no highscore was saved
	return 0;
}

function setScore(val: number) {
	localStorage.setItem(storageKey, val.toString());
}
