import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import Card from '../../components/Card';
import PokemonDetails from '../../components/PokemonDetails/indes';
import SearchBar from '../../components/SearchBar';
import usePokemonLoader from '../../hooks/usePokemonLoader';
import { pokemonDetailState } from '../../state/pokemonDetailState';

const Main: React.FC = () => {
  const [pokemonDetailId, setPokemonDetailId] =
    useRecoilState(pokemonDetailState);
  const [searchTerm, setSearchTerm] = useState('');
  const { pokemons } = usePokemonLoader(searchTerm);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearchChange} />
      {pokemons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2">
          {pokemons.map((pokemon: Pokemon) => (
            <Card
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => setPokemonDetailId(Number(pokemon.id))}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-4 text-gray-600 text-lg">
          일치하는 데이터가 없습니다
        </div>
      )}
      {pokemonDetailId && (
        <PokemonDetails
          pokemonId={pokemonDetailId}
          onClose={() => setPokemonDetailId(null)}
        />
      )}
    </div>
  );
};

export default Main;
