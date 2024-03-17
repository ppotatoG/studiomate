interface Pokemon {
  name: string;
  url: string;
  id: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    [key: string]: string | null;
  };
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
  }>;
  forms: Array<{
    name: string;
    url: string;
  }>;
  species: {
    name: string;
    url: string;
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
      url: string;
    };
  }>;
}
