interface Pokemon {
  name: string;
  url: string;
  id: string;
}

interface PokemonResponse {
  results: Pokemon[];
  next: string;
}

interface CardProps {
  pokemon: Pokemon;
}

interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}
