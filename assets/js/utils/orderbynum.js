const orderByNum = (pokemons) => {
  return pokemons.sort((a, b) => a.id - b.id);
};