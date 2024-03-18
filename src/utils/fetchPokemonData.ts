const fetchPokemonData = async (pokemonName: string) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    const data = await response.json();
    return {
      name: data.name,
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      id: data.id.toString(),
    };
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

export default fetchPokemonData;
