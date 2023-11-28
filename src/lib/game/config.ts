import Cheetah from '$lib/icons/Cheetah.svelte';
import Rabbit from '$lib/icons/Rabbit.svelte';
import Wolf from '$lib/icons/Wolf.svelte';
import type { Mode } from './types';

export type ModeKeys = keyof typeof modes;

export const modes = {
	rabbit: {
		duration: 6500,
		icon: Rabbit,
		key: 'rabbit'
	},
	wolf: {
		duration: 4500,
		icon: Wolf,
		key: 'wolf'
	},
	cheetah: {
		duration: 3500,
		icon: Cheetah,
		key: 'cheetah'
	}
} satisfies { [keyof: string]: Mode };
