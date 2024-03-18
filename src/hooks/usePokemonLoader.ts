import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { loadingState } from '../state/loadingState';
import fetchPokemonData from '../utils/fetchPokemonData';
import formatPokemons from '../utils/formatPokemons';

const usePokemonLoader = (searchTerm: string) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=40'
  );
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const fetchPokemons = async (url: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initLoad = async () => {
      if (!searchTerm && pokemons.length === 0) {
        const data = await fetchPokemons(nextUrl);
        if (data) {
          setPokemons(formatPokemons(data.results));
          setNextUrl(data.next);
        }
      }
    };
    initLoad();
  }, [searchTerm]);

  useEffect(() => {
    const searchPokemon = async () => {
      if (searchTerm) {
        const searchedPokemon = await fetchPokemonData(searchTerm);
        if (searchedPokemon) {
          setPokemons([searchedPokemon]);
        } else {
          setPokemons([]);
        }
      }
    };
    searchPokemon();
  }, [searchTerm]);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isLoading ||
        searchTerm
      )
        return;

      const data = await fetchPokemons(nextUrl);
      if (data) {
        setPokemons(prev => [...prev, ...formatPokemons(data.results)]);
        setNextUrl(data.next);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextUrl, isLoading, searchTerm]);

  return { pokemons, isLoading };
};

export default usePokemonLoader;
