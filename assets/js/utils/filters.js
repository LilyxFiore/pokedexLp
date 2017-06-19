const filterByName = (pokemons, query) => {
  return pokemons.filter((item)=>{
    return !(item.name.toLowerCase().indexOf(query.toLowerCase()) === -1);
  });
};
