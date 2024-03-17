import { atom } from 'recoil';

export const pokemonDetailState = atom({
  key: 'pokemonDetailState',
  default: null as number | null,
});
