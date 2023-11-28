import type { ComponentType, SvelteComponent } from "svelte";

export type GameState = 'idle' | 'playing' | 'lost';

export type Round = {
	question: string;
	answer: number;
};

export type Mode = {
  duration: number;
	icon: ComponentType<SvelteComponent>,
	key: string
}


export type GetProps<
	P,
	ExcludeKeys extends keyof P = never,
	OP extends Record<string, unknown> = {}
> = Omit<P, `on:${string}` | `bind:${string}` | ExcludeKeys | 'class' | keyof OP> & OP;
