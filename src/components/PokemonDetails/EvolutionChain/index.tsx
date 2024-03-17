import React from 'react';
import { useSetRecoilState } from 'recoil';

import { pokemonDetailState } from '../../../state/pokemonDetailState';

const extractIdFromUrl = (url: string): number => {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2], 10);
};

interface EvolutionChainProps {
  evolutionData: EvolutionData;
  onClose: () => void;
}

const EvolutionChain = ({ evolutionData, onClose }: EvolutionChainProps) => {
  const setPokemonDetailId = useSetRecoilState(pokemonDetailState);
  const renderEvolutionChain = () => {
    if (!evolutionData) return null;

    const evolutionChain: { id: number; name: string; spriteUrl: string }[] =
      [];
    let currentStage: EvolutionDetail | undefined = evolutionData.chain;

    while (currentStage) {
      const pokemonId = extractIdFromUrl(currentStage.species.url);
      const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
      evolutionChain.push({
        id: pokemonId,
        name: currentStage.species.name,
        spriteUrl,
      });
      currentStage = currentStage.evolves_to[0];
    }

    const handleChangeDetail = (pokemonId: number) => {
      onClose();
      setPokemonDetailId(pokemonId);
    };

    return (
      <div className="mt-3">
        <h3 className="font-semibold mb-2">진화 연쇄</h3>
        <ul className="flex justify-center items-center bg-gray-100 rounded-lg p-3">
          {evolutionChain.map(({ id, name, spriteUrl }, index) => (
            <li
              onClick={() => handleChangeDetail(id)}
              key={index}
              className="py-1 px-2 hover:bg-gray-200 rounded flex flex-col items-center"
            >
              <img src={spriteUrl} alt={name} className="w-18 h-18" />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return renderEvolutionChain();
};

export default EvolutionChain;
