import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';

import { loadingState } from '../../state/loadingState';

interface PokemonDetailsProps {
  pokemonId: number | null;
  onClose: () => void;
}

const PokemonDetails = ({ pokemonId, onClose }: PokemonDetailsProps) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const setIsLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!pokemonId) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
        );
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        console.error('Error fetching pokemon details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      {pokemonDetails ? (
        <div className="bg-white p-5 rounded-lg shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            <FaTimes />
          </button>
          <div>
            <img
              src={pokemonDetails.sprites.front_default}
              alt={pokemonDetails.name}
              className="mx-auto"
            />
            <h3 className="text-lg font-bold text-center mt-2">
              {pokemonDetails.name}
            </h3>
            <p className="text-center">
              Base Experience: {pokemonDetails.base_experience}
            </p>
            <p className="text-center">
              Height: {pokemonDetails.height} | Weight: {pokemonDetails.weight}
            </p>

            <div className="mt-2">
              <h4 className="font-bold">Abilities:</h4>
              <ul>
                {pokemonDetails.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>

            <div className="mt-2">
              <h4 className="font-bold">Types:</h4>
              <ul>
                {pokemonDetails.types.map((type, index) => (
                  <li key={index}>{type.type.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PokemonDetails;
