const formatPokemons = (pokemons: Pokemon[]) => {
  return pokemons.map(pokemon => {
    const id = pokemon.url.split('/').slice(-2)[0];
    return {
      ...pokemon,
      id,
      url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });
};

export default formatPokemons;
