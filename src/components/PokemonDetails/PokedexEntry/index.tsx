import React from 'react';

const PokedexEntry = ({
  pokemonDetails,
}: {
  pokemonDetails: PokemonSpecies;
}) => {
  const { id, names, flavor_text_entries, genera, color, shape, habitat } =
    pokemonDetails;

  const koreanName = names.find(n => n.language.name === 'ko')?.name;
  const koreanFlavorText = flavor_text_entries.find(
    f => f.language.name === 'ko'
  )?.flavor_text;
  const koreanGenera = genera.find(g => g.language.name === 'ko')?.genus;

  return (
    <div className="flex flex-col items-center">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={koreanName}
        className="w-32 h-32"
      />
      <h1 className="text-2xl font-bold text-gray-800">{koreanName}</h1>
      <p className="text-gray-600 mt-2">{koreanFlavorText}</p>
      <p className="text-gray-600 mt-2">분류: {koreanGenera}</p>
      <p className="text-gray-600">색깔: {color.name}</p>
      <p className="text-gray-600">형태: {shape.name}</p>
      <p className="text-gray-600">서식지: {habitat.name}</p>
    </div>
  );
};

export default PokedexEntry;
