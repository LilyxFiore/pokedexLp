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
  const description = $('<p>' + state.pokemonInformation.description + '</p>');
  const divCharacteristic = $('<div class="row div-characteristic"></div>');
  const colLeftDescription = $('<div class="col s6">' +
      '<p class="no-marg-bot">Altura</p><p class="no-marg-top">' + state.pokemonInformation.height +' m.</p>' +
      '<p class="no-marg-bot">Peso</p><p class="no-marg-top">' + state.pokemonInformation.weight +' kg.</p>' +
      '<p class="no-marg-bot">Sexo</p><p class="no-marg-top">Sin género</p></div>');
  const colRightDescription = $('<div class="col s6"></div>');
  const characteristics = $('<p class="no-marg-bot">Categoría</p><p class="no-marg-top">' + state.pokemonInformation.category + '</p>' +
      '<p class="no-marg-bot">Habilidad:</p>');
  const type = $('<p>Tipo: </p><span>Bicho</span><span>Veneno</span>');
  const weak = $('<p>Debilidad: </p><span>Roca</span><span>Fuego</span>');

  row.append(colLeft);
  colLeft.append(contentPokemon);
  contentPokemon.append(contentImg);
  contentImg.append(imgPokemon);
  contentPokemon.append(contentIcon);
  row.append(colRight);
  colRight.append(namePokemon);
  colRight.append(description);
  colRight.append(divCharacteristic);
  divCharacteristic.append(colLeftDescription);
  divCharacteristic.append(colRightDescription);
  colRightDescription.append(characteristics);
  colRight.append(type);
  colRight.append(weak);
  content.append(row);

  const abilities = $('<span></span>');
  state.pokemonInformation.abilities.forEach( (e) => {  abilities.append($('<span class="capitalize">' + e + ' </span>'))});

  colRightDescription.append(abilities);
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

  $.getJSON('http://pokeapi.co/api/v2/pokemon-species/'+state.selectedPokemon.id,(json)=>{
    $.getJSON('http://pokeapi.co/api/v2/pokemon/'+state.selectedPokemon.id,(json2)=>{
      state.pokemonInformation = {
        description: json.flavor_text_entries[3].flavor_text,
        category : json.genera[0].genus,
        height: json2.height,
        weight: json2.weight/10,
        abilities: json2.abilities.map( (item) => item.ability.name),
        json : json2,
      };

    description(modalContent);
    });
  });
};
