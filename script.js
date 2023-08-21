const poke_container = document.getElementById('poke-container');
const pokemon_count = 1010;
const colors = {
    fire: '#E74C3C',
    grass: '#186A3B',
    electric: '#F4D03F',
    water: '#5DADE2',
    ground: '#AF601A',
    rock: '#6E2C00',
    fairy: '#FA4A95',
    poison: '#AF7AC5',
    bug: 'lightgreen',
    dragon: 'purple',
    psychic: 'pink',
    flying: 'steelblue',
    fighting: '#641E16 ',
    normal: '#CCD1D1',
    ghost: '#2B006E',
    ice: 'skyblue',
    dark: '#212F3D',
    steel: '#85929E',
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i);
    }
};

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    formatPokemonData(data);
};

const formatPokemonData = (pokemon) => {
    let formattedName = capitalizeAfterHyphen(pokemon.name);
    
    // Trata casos especiais de nomes
    if (formattedName === 'Wo_chien') {
        formattedName = 'Wo-Chien';
    } else if (formattedName === 'Chien_pao') {
        formattedName = 'Chien-Cao';
    } else if (formattedName === 'Ting_lu') {
        formattedName = 'Ting-Lu';
    } else if (formattedName === 'Chi_yu') {
        formattedName = 'Chi-Yu';
    }

    createPokemonCard({
        ...pokemon,
        name: formattedName,
    });
};

const capitalizeAfterHyphen = (text) => {
    return text.split('-').map((word) => {
        if (word === 'of' || word === 'as') {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('_');
};

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name;
    const id = pokemon.id.toString().padStart(3, '0');

    const poke_types = pokemon.types.map((type) => type.type.name);
    const type1 = main_types.find((type) => poke_types.indexOf(type) === 0);
    const type2 = poke_types[1] ? main_types.find((type) => poke_types[1] === type) : null;

    const color1 = colors[type1];
    const color2 = type2 ? colors[type2] : null;

    pokemonEl.style.backgroundColor = color1;

    const typeInnerHTML = type2 ? `<small class="type" style="background-color:${color2};">${type2}</small>` : '';
    
    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type" style="background-color:${color1};">${type1}</small>
        ${typeInnerHTML}
    </div>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML;

    poke_container.appendChild(pokemonEl);

    pokemonEl.addEventListener('click', () => {
        window.open(`https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}_(Pok%C3%A9mon)`, '_blank');
    });
};

const filterPokemons = (searchTerm) => {
    const pokemonCards = document.querySelectorAll('.pokemon');
    pokemonCards.forEach((card) => {
        const name = card.querySelector('.name').textContent.toLowerCase();
        if (name.includes(searchTerm.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

fetchPokemons();

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    filterPokemons(searchTerm);
});
