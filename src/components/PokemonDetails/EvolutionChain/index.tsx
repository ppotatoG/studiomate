import React from 'react';

function extractIdFromUrl(url: string): number {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2], 10);
}

const EvolutionChain = ({
  evolutionData,
}: {
  evolutionData: EvolutionData;
}) => {
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

    return (
      <ul className="flex justify-center items-center bg-gray-100 rounded-lg p-3">
        {evolutionChain.map(({ id, name, spriteUrl }, index) => (
          <li
            key={index}
            className="py-1 px-2 hover:bg-gray-200 rounded flex flex-col items-center"
          >
            <img src={spriteUrl} alt={name} className="w-18 h-18" />
          </li>
        ))}
      </ul>
    );
  };

  return renderEvolutionChain();
};

export default EvolutionChain;
