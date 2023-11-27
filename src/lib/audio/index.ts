import pingUrl from './ping.wav';
import loseUrl from './lose.wav';
import startUrl from './start.mp3';

const audios = {
	ping: new Audio(pingUrl),
	lose: new Audio(loseUrl),
	start: new Audio(startUrl)
};

const volumes: { [T in keyof typeof audios]: number } = {
	lose: 0.1,
	ping: 0.5,
	start: 1
};

export function playAudio(audio: keyof typeof audios) {
	const clonedAudio = audios[audio].cloneNode(true) as HTMLAudioElement;
	clonedAudio.volume = volumes[audio];

	clonedAudio.play();
	clonedAudio.onended = () => {
		clonedAudio.remove();
	};
}
