import pingUrl from './ping.wav';
import loseUrl from './lose.wav';
import startUrl from './start.mp3';
import { getContext, setContext } from 'svelte';

const audios = {
	ping: new Audio(pingUrl),
	lose: new Audio(loseUrl),
	start: new Audio(startUrl)
};

const volumes: { [T in keyof typeof audios]: number } = {
	lose: 0.15,
	ping: 0.6,
	start: 0.7
};

// due to this bug right now, we can't make a store global just yet, therefore
// we need to do this with context for now.
// https://github.com/sveltejs/svelte/issues/9301
const contextKey = 'audio-manager';
export const getAudioManager = () => getContext<AudioManager>(contextKey);
export const setAudioManager = (manager: AudioManager) => setContext(contextKey, manager);

export class AudioManager {
	isMute = $state(false);

	toggleAudio() {
		this.isMute = this.isMute ? false : true;
	}

	playAudio(audioKey: keyof typeof audios) {
		if (this.isMute) return;

		const clonedAudio = audios[audioKey].cloneNode(true) as HTMLAudioElement;
		clonedAudio.volume = volumes[audioKey];

		clonedAudio.play();
		clonedAudio.onended = () => {
			clonedAudio.remove();
		};
	}
}
