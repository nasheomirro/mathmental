export type Round = {
	question: string;
	answer: number;
};

export type GameState = {
	state: 'idle' | 'playing' | 'lost';
	round: Round | null;
	score: number;
};

export type GetProps<
	P,
	ExcludeKeys extends keyof P = never,
	OP extends Record<string, unknown> = {}
> = Omit<P, `on:${string}` | `bind:${string}` | ExcludeKeys | 'class' | keyof OP> & OP;
