export type GameState = 'idle' | 'playing' | 'lost';

export type Round = {
	question: string;
	answer: number;
};

export type GetProps<
	P,
	ExcludeKeys extends keyof P = never,
	OP extends Record<string, unknown> = {}
> = Omit<P, `on:${string}` | `bind:${string}` | ExcludeKeys | 'class' | keyof OP> & OP;
