import React, { useState, useEffect } from 'react';

import './App.css';
import Card from './components/Card';

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
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
  );
  const [isLoading, setIsLoading] = useState(false);

  const loadPokemons = () => {
    if (!nextUrl || isLoading) return;

    setIsLoading(true);
    fetch(nextUrl)
      .then(response => response.json())
      .then((data: PokemonResponse) => {
        const updatedPokemons = data.results.map(pokemon => ({
          ...pokemon,
          id: pokemon.url.split('/')[pokemon.url.split('/').length - 2],
        }));
        setPokemons(prev => [...prev, ...updatedPokemons]);
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
  }, [isLoading, nextUrl]); // 여기에 isLoading 추가

  return (
    <div className="App">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-2">
        {pokemons.map((pokemon: Pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;
