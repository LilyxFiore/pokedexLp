'use strict';

const pokemonItem = (pokemon, update) => {
  const num = convertNum(pokemon.id);
  const colPokemon = $('<div class="col s12 m4 center-align"></div>');
  const modal = $('<a href="#"></a>');
  const contentPokemon = $('<div class="content-pokemon"></div>');
  const contentImg = $('<div class="img-pokemon"></div>');
  const imgPokemon = $('<img src="http://serebii.net/art/th/' + pokemon.id + '.png"/>');
  const contentIcon = $('<div class="img-icon"><img src="assets/icon/pokeball_gray.png" alt="" class="icon"><img src="assets/icon/valentines-heart.png" alt="" class="icon">' +
      '<img src="assets/icon/data.png" alt="" class="icon"><p class="no-pad capitalize">' + '#' + num + '    ' +pokemon.name + '</p></div>');


  modal.append(contentPokemon);
  colPokemon.append(modal);
  contentPokemon.append(contentImg);
  contentImg.append(imgPokemon);
  contentPokemon.append(contentIcon);

  modal.click(function(e){
    state.selectedPokemon = pokemon;
    renderModal();
  });

  return colPokemon;
};

const reRender = (rowPokemon, pokelist, update) => {
  rowPokemon.empty();
  if(pokelist.length != 0){
    pokelist.forEach(e => {
      rowPokemon.append(pokemonItem(e,update));
    });
  }
  else{
    rowPokemon.html('<div class="col s12">No se encontraron pokemónes</div>');
  }
};

const Gallery = (update) => {

  const contentPokemon = $('<div class="row"></div>');
  const divInput = $('<div class="input-field col s8 offset-s1">');
  const iconSearch = $('<label><span class="material-icons prefix">search</span></label>');
  const inputName =  $('<input type="text" placeholder="Ingresar nombre de pokemón">');
  const buttonAz = $('<div class="col s2 left-align"><a class="waves-effect waves-light btn">A - Z</a></div>');
  const buttonNum = $('<div class="col s1"><a class="waves-effect waves-light btn">#</a></div>');
  const rowPokemon = $('<div class="row container"></div>');
  const sectionMod = $('<section class="overlay"></section>');
  $("#root").after(sectionMod);

  contentPokemon.append(divInput);
  divInput.append(iconSearch);
  divInput.append(inputName);
  contentPokemon.append(buttonAz);
  contentPokemon.append(buttonNum);
  contentPokemon.append(rowPokemon);

  state.pokemons.forEach((pokemon)=>{
    rowPokemon.append(pokemonItem(pokemon, update));
  });

  inputName.keyup(function( ) {
    const pokeFilter = filterByName(state.pokemons, $(this).val());
    reRender(rowPokemon, pokeFilter, update);
  });

  buttonAz.click(_ =>{
    const pokeOrderName  = orderByName(state.pokemons,update);
    reRender(rowPokemon, pokeOrderName, update);
  });

  buttonNum.click(_ =>{
    const pokeOrderNum  = orderByNum(state.pokemons,update);
    reRender(rowPokemon, pokeOrderNum,update);
  });

  return contentPokemon;
};

