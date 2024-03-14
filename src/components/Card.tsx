import React, { useState, useEffect } from 'react';
const Card: React.FC<CardProps> = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );

  useEffect(() => {
    fetch(pokemon.url)
      .then(response => response.json())
      .then(data => setPokemonDetails(data));
  }, [pokemon]);

  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-center">
        <img
          className="rounded-t-lg"
          src={pokemonDetails?.sprites?.front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {pokemon.name}
        </h5>
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Card;
