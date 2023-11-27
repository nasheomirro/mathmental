import Cheetah from '$lib/icons/Cheetah.svelte';
import Rabbit from '$lib/icons/Rabbit.svelte';
import Wolf from '$lib/icons/Wolf.svelte';
import type { Mode } from './types';

export const modes = {
	rabbit: {
		duration: 6500,
		icon: Rabbit
	},
	wolf: {
		duration: 4500,
		icon: Wolf
	},
	cheetah: {
		duration: 3500,
		icon: Cheetah
	}
} satisfies { [keyof: string]: Mode };
