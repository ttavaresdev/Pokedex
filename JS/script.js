const pokemonName = document.querySelector('.pokemon_name');
const pokemonID = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const search = document.querySelector('.input_search');
const back = document.querySelector('.btn_back');
const next = document.querySelector('.btn_next');

let incrementPokemon = 1;

const fetchPokemon = async (pokemon)=>{
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200){
  const data = await APIResponse.json();
  return data;
  }
}


const renderPokemon = async (pokemon) =>{
  pokemonName.innerHTML = 'Loading...';
  pokemonID.innerHTML = '';

  const data = await fetchPokemon(pokemon);
  if (data){
    pokemonImg.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonID.innerHTML = data.id;
    pokemonImg.src = data ['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    search.value = '';
    incrementPokemon = data.id;
  }else{
    pokemonImg.style.display = 'none';
    pokemonName.innerHTML = 'not found ¬,¬';
    pokemonID.innerHTML = '';
  }
}
form.addEventListener('submit', (event) =>{
  event.preventDefault();

  renderPokemon(search.value.toLowerCase());
  
});
back.addEventListener('click', () =>{
  if(incrementPokemon > 1){
  incrementPokemon -=1;
  renderPokemon(incrementPokemon);
  }
});
next.addEventListener('click', () =>{
  incrementPokemon +=1;
  renderPokemon(incrementPokemon);
  
});
renderPokemon(incrementPokemon);