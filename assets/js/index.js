'use strict';

const render = (root) => {
  root.empty();
  const wrapper = $('<div class="gallery"></div>');

  if(state.selectedPokemon === null){
    wrapper.append(Gallery(_ => render(root)));
  }
  root.append(wrapper);
};

const state = {
  pokemons:[],
  selectedPokemon: null,
  pokemonInformation: null
};

$(_ =>{
  $("#root").html('<div class="center-align load"><img src="assets/img/pokemon-rewind.gif"/><p class="text-load">Loading ...</p></div>');
  $.getJSON('https://pokeapi.co/api/v2/pokedex/1/', data =>{
    $.each(data.pokemon_entries, (i,item) =>{
      state.pokemons.push({id: item.entry_number, name: item.pokemon_species.name});
      if ( i === 14 ) {
        const root = $('#root');
        render(root);
        return false;
      }
    });
  }).fail(() =>{alert("Error server");});
});