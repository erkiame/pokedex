const mainContainer = document.getElementById('main-body');

let getPokemon = id => {
    let pokemonData = fetch();
    let pokemonSpriteUrl = fetch();

    let pokemon = document.createElement('div').className('pokemon');

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
        let pokemonAbilities = [];

        types.forEach(type => pokemonTypes.push(type.type.name));
        abilities.forEach(ab => pokemonAbilities.push(ab.ability.name));
    })
    .catch(error => console.log(error))

    pokemonSpriteUrl.then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        } else {
            let pokemonSprite = document.createElement('img').src(response.url);
            let pokeImageWrapper = document.createElement('div').appendChild(pokemonSprite);
            pokemon.appendChild(pokeImageWrapper);
        }
    })
    .catch(error => console.log(error))
}