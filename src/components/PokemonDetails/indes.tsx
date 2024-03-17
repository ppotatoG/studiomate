import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';

import { loadingState } from '../../state/loadingState';

import PokedexEntry from './PokedexEntry';

interface PokemonDetailsProps {
  pokemonId: number | null;
  onClose: () => void;
}

const PokemonDetails = ({ pokemonId, onClose }: PokemonDetailsProps) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonSpecies | null>(
    null
  );
  const setIsLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!pokemonId) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
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

  if (!pokemonDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes />
        </button>
        <div>
          <PokedexEntry pokemonDetails={pokemonDetails} />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
