const mainContainer = document.getElementById('main-body');

let getPokemon = id => {
    let pokemonData = fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let pokemonSpriteUrl = fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`);

    let pokemon = document.createElement('div');
    pokemon.className = 'pokemon';

    pokemonData.then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        } else {
            return response.json();
        }
    })
    .then(dataJson => {
        let {name, id, abilities, height, weight, types} = dataJson;
        let pokemonTypes = [];

        types.forEach(type => pokemonTypes.push(type.type.name));

        let pokemonName = document.createElement('div');
        pokemonName.className = 'pokemon-name';
        let pokemonNameSpan = document.createElement('span');
        pokemonNameSpan.innerText = name;

        let pokemonId = document.createElement('div');
        pokemonId.className = 'pokemon-id';
        let pokemonIdSpan = document.createElement('span');
        pokemonIdSpan.innerText = id;

        let pokemonHeight = document.createElement('div');
        pokemonHeight.className = 'pokemon-height';
        let pokemonHeightSpan = document.createElement('span');
        pokemonHeightSpan.innerText = `Height: ${height / 10}`;

        let pokemonWeight = document.createElement('div');
        pokemonWeight.className = 'pokemon-weight';
        let pokemonWeightSpan = document.createElement('span');
        pokemonWeightSpan.innerText = `Weight: ${weight / 10}`;

        pokemonName.appendChild(pokemonNameSpan);
        pokemonId.appendChild(pokemonIdSpan);
        pokemonHeight.appendChild(pokemonHeightSpan);
        pokemonWeight.appendChild(pokemonWeightSpan);

        pokemon.appendChild(pokemonName);
        pokemon.appendChild(pokemonId);
        pokemon.appendChild(pokemonHeight);
        pokemon.appendChild(pokemonWeight);

        pokemonTypes.forEach(type => {
            let pokemonType = document.createElement('div');
            pokemonType.className = 'pokemon-type';
            let pokemonTypeSpan = document.createElement('span');
            pokemonTypeSpan.innerText = type;

            pokemonType.appendChild(pokemonTypeSpan);
            pokemon.appendChild(pokemonType);
        })

        pokemonSearch(pokemon);
    })
    .catch(error => console.log(error))

    pokemonSpriteUrl.then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        } else {
            let pokemonSprite = document.createElement('img');
            pokemonSprite.src = response.url;
            let pokeImageWrapper = document.createElement('div');
            pokeImageWrapper.className = 'image-wrapper';
            pokeImageWrapper.appendChild(pokemonSprite);
            pokemon.appendChild(pokeImageWrapper);

            mainContainer.appendChild(pokemon);
        }
    })
    .catch(error => console.log(error))

    const pokemonSearch = (pokemon) => {
        search.addEventListener('keyup', () => {
            const searchText = search.value.toString().toLowerCase();
            if (pokemon.innerHTML.indexOf(searchText) > -1) {
                pokemon.style.display = '';
            } else {
                pokemon.style.display = 'none';
            }
        })
    };
}

for (let index = 1; index <= 1118; index++) {
    getPokemon(index);
}