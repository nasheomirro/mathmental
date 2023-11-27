import pingUrl from './ping.wav';
import loseUrl from './lose.wav';
import startUrl from './start.mp3';

const audios = {
	ping: new Audio(pingUrl),
  lose: new Audio(loseUrl),
  start: new Audio(startUrl)
};


export function playAudio(audio: keyof typeof audios) {
	(audios[audio].cloneNode(true) as HTMLAudioElement).play();
}
