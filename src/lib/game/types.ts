export type Round = {
  question: string;
  answer: number;
}

export type GameState = {
  state: 'idle' | 'playing' | 'lost';
  round: Round | null;
  score: number;
}