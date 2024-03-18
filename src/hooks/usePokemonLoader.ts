import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { loadingState } from '../state/loadingState';
import fetchPokemonData from '../utils/fetchPokemonData'; // fetchPokemonData 가져오기
import formatPokemons from '../utils/formatPokemons';

const usePokemonLoader = (searchTerm: string) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=40'
  );
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const loadPokemons = async () => {
    if (!nextUrl || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(nextUrl);
      const data = await response.json();
      const formattedPokemons = formatPokemons(data.results);

      setPokemons(prev => {
        const newPokemons = formattedPokemons.filter(
          newPokemon =>
            !prev.some(prevPokemon => prevPokemon.id === newPokemon.id)
        );
        return [...prev, ...newPokemons];
      });
      setNextUrl(data.next);
    } catch (error) {
      console.error('Error loading pokemons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchPokemons = async () => {
    if (searchTerm) {
      setIsLoading(true);
      const searchedPokemon = await fetchPokemonData(searchTerm);
      if (searchedPokemon) {
        setPokemons([searchedPokemon]);
      } else {
        setPokemons([]);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      searchPokemons();
    } else {
      if (pokemons.length === 0 && nextUrl) {
        loadPokemons();
      }
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isLoading
      )
        return;
      if (!searchTerm) {
        loadPokemons();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextUrl, isLoading, searchTerm]);

  return { pokemons, isLoading };
};

export default usePokemonLoader;
