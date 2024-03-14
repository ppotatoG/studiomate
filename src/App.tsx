import React, { useState, useEffect } from 'react';

import './App.css';
import Card from './components/Card';
import SearchBar from './components/SearchBar';

interface Pokemon {
  name: string;
  url: string;
  id: string;
}

interface PokemonResponse {
  results: Pokemon[];
  next: string | null;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=40'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const fetchPokemonData = async (pokemonName: string) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      const data = await response.json();
      return {
        name: data.name,
        url: data.sprites.front_default,
        id: data.id.toString(),
      };
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };

  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm) {
        setIsLoading(true);
        const searchedPokemon = await fetchPokemonData(searchTerm);
        setFilteredPokemons(searchedPokemon ? [searchedPokemon] : []);
        setIsLoading(false);
      } else {
        const formattedPokemons = formatPokemons(pokemons);
        setFilteredPokemons(formattedPokemons);
      }
    };
    performSearch();
  }, [searchTerm, pokemons]);

  const formatPokemons = (pokemons: Pokemon[]): Pokemon[] => {
    return pokemons.map(pokemon => ({
      ...pokemon,
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
    }));
  };

  const loadPokemons = () => {
    if (!nextUrl || isLoading) return;

    setIsLoading(true);
    fetch(nextUrl)
      .then(response => response.json())
      .then((data: PokemonResponse) => {
        const newPokemons = data.results.map(pokemon => ({
          ...pokemon,
          id: pokemon.url.split('/')[pokemon.url.split('/').length - 2],
        }));

        setPokemons(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const filteredNewPokemons = newPokemons.filter(
            p => !existingIds.has(p.id)
          );
          return [...prev, ...filteredNewPokemons];
        });

        setNextUrl(data.next);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isLoading
      )
        return;
      loadPokemons();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, nextUrl]);

  return (
    <div className="App">
      <SearchBar searchTerm={searchTerm} onSearch={handleSearchChange} />
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2">
        {filteredPokemons.map((pokemon: Pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
