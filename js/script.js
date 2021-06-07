const mainContainer = document.getElementById('main-body');

const fetchPokemons = async () => {
    for (let index = 1; index <= 1118; index++) {
        await getPokemon(index);
    }
};

const getPokemon = async (id) => {
    const pokemonDataRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = await pokemonDataRes.json();

    const {sprites, name, id: pokeId, height, weight, types} = pokemonData;

    createPokemon(sprites, name, pokeId, height, weight, types);
}

const createPokemon = (sprites, name, id, height, weight, types) => {
    const elements = `
    <div class="pokemon__sprite">
    <img src=${sprites.front_default} alt="pokemon sprite" />
    </div>
    <div class="pokemon__name">
    <span>${name}</span>
    </div>
    <div class="pokemon__id">
    <span>${id}</span>
    </div>
    <div class="pokemon__height">
    <span>Height: ${height / 10}m</span>
    </div>
    <div class="pokemon__weight">
    <span>Weight: ${weight / 10}kg</span>
    </div>
    <div class="pokemon__types">${types.map(type => `<span>${type.type.name}</span>`).join('')}</div>
    `

    const pokemon = document.createElement('div');
    pokemon.className = 'pokemon';

    pokemon.insertAdjacentHTML('afterbegin', elements);
    mainContainer.appendChild(pokemon);

    pokemonSearch(pokemon);
    showInfo(pokemon);
}

const pokemonSearch = (pokemon) => {
    search.addEventListener('keyup', () => {
        const searchText = search.value.toString().toLowerCase();
        if (pokemon.children[1].innerHTML.indexOf(searchText) > -1) {
            pokemon.style.display = '';
        } else {
            pokemon.style.display = 'none';
        }
    })
};

const showInfo = (pokemon) => {
    pokemon.addEventListener('click', () => {
        pokemon.classList.toggle('active');
    })
}

fetchPokemons();