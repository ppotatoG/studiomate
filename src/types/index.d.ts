interface Pokemon {
  name: string;
  url: string;
  id: string;
}

interface PokemonSpecies {
  id: number;
  names: Array<{
    language: { name: string; url: string };
    name: string;
  }>;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string; url: string };
  }>;
  genera: Array<{
    genus: string;
    language: { name: string; url: string };
  }>;
  color: {
    name: string;
    url: string;
  };
  shape: {
    name: string;
    url: string;
  };
  habitat: {
    name: string;
    url: string;
  };
}
