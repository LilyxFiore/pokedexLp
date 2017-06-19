'use strict';

const description = (content) => {
  $('#load').remove();

  const row = $('<div class="row"></div>');
  const colLeft = $('<div class="col s12 m3 center-align"></div>');
  const contentPokemon = $('<div class="content-pokemon"></div>');
  const contentImg = $('<div class="img-pokemon"></div>');
  const imgPokemon = $('<img src="http://serebii.net/art/th/' + state.selectedPokemon.id + '.png"/>');
  const contentIcon = $('<div class="img-icon"><img src="assets/icon/pokeball_gray.png" alt="" class="icon"><img src="assets/icon/valentines-heart.png" alt="" class="icon">' +
      '<img src="assets/icon/data.png" alt="" class="icon"></div>');
  const colRight = $('<div class="col s12 m9"></div>');
  const namePokemon = $('<h3 class="center-align no-marg-top capitalize">' + state.selectedPokemon.name +'</h3>');
  const descriptions = $('<p>' + state.pokemonInformation.description + '</p>');
  const divCharacteristic = $('<div class="row div-characteristic"></div>');
  const colLeftDescription = $('<div class="col s6">' +
      '<p class="no-marg-bot">Altura</p><p class="no-marg-top">' + state.pokemonInformation.height +' m.</p>' +
      '<p class="no-marg-bot">Peso</p><p class="no-marg-top">' + state.pokemonInformation.weight +' kg.</p>' +
      '<p class="no-marg-bot">Sexo</p><p class="no-marg-top">Sin género</p></div>');
  const colRightDescription = $('<div class="col s6"></div>');
  const characteristics = $('<p class="no-marg-bot">Categoría</p><p class="no-marg-top">' + state.pokemonInformation.category + '</p>' +
      '<p class="no-marg-bot">Habilidad:</p>');
  const type = $('<p>Tipo: </p>');
  const weak = $('<p>Debilidad: </p>');

  row.append(colLeft);
  colLeft.append(contentPokemon);
  contentPokemon.append(contentImg);
  contentImg.append(imgPokemon);
  contentPokemon.append(contentIcon);
  row.append(colRight);
  colRight.append(namePokemon);
  colRight.append(descriptions);
  colRight.append(divCharacteristic);
  divCharacteristic.append(colLeftDescription);
  divCharacteristic.append(colRightDescription);
  colRightDescription.append(characteristics);
  colRight.append(type);
  content.append(row);

  const abilities = $('<span></span>');
  state.pokemonInformation.abilities.forEach( (e) => {  abilities.append($('<span class="capitalize">' + e + ' </span>'))});

  colRightDescription.append(abilities);

  const types = $('<span></span>');
  state.pokemonInformation.types.forEach( (e) => {  types.append($('<span class="capitalize color-type">' + e + ' </span>'))});

  const weaks = $('<span></span>');
  state.pokemonInformation.weakness.forEach(function(e){
    e.forEach(function(p){
      weaks.append($('<span class="capitalize color-weak">' + p.name + ' </span>'))
    })
  });
  colRight.append(types);
  colRight.append(weak);
  colRight.append(weaks);
};

const renderModal = () =>{
  const section = $(".overlay");

  const modalContent = $('<div class="modal-content"></div>');
  const modalClose = $('<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat close"><img src="assets/icon/cross-out.png" alt=""></a>');

  modalContent.append(modalClose);

  modalContent.append('<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" id="load" class="center-block">');

  section.append(modalContent);

  section.css("display","flex");

  modalClose.click(function(){
    section.hide();
    section.empty();
  });

  $.getJSON('http://pokeapi.co/api/v2/pokemon-species/'+state.selectedPokemon.id,(json)=> {
    $.getJSON('http://pokeapi.co/api/v2/pokemon/' + state.selectedPokemon.id, (json2) => {
      state.pokemonInformation = {
        description: json.flavor_text_entries[3].flavor_text,
        category: json.genera[2].genus,
        height: json2.height,
        weight: json2.weight / 10,
        abilities: [],
        urlAbilities: json2.abilities.map((item) => item.ability.url),
        types: [],
        urlTypes: json2.types.map((item) => item.type.url),
        weakness : [],
      };
      state.pokemonInformation.urlAbilities.map(function(e, i){
        $.getJSON(e,(json3) =>{
          state.pokemonInformation.abilities.push(json3.names[2].name);
        })
      });
      state.pokemonInformation.urlTypes.forEach(function(e, i){
        $.getJSON(e,(json4) =>{
          state.pokemonInformation.types.push(json4.names[4].name);
          state.pokemonInformation.weakness.push(json4.damage_relations.double_damage_from);
          if(state.pokemonInformation.types.length == state.pokemonInformation.urlTypes.length ){description(modalContent)};
        })
      });
    });
  })
};
