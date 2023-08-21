const golpe_container = document.getElementById('golpe-container');
const golpe_count = 1000;
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

const fetchGolpes = async () => {
    for (let i = 1; i <= golpe_count; i++) {
        await getGolpes(i);
    }
};

const getGolpes = async (id) => {
    const url = `https://pokeapi.co/api/v2/move/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createGolpesCard(data);
};

const capitalizeAfterHyphen = (move) => {
    return move.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('_');
};

const capitalizeAfterThe = (move) => {
    return move.split('Burns-').map((word) => word.charAt(0).tolowerCase());
};


const createGolpesCard = (move) => {
    const moveEl = document.createElement('div');
    moveEl.classList.add('move');

    const capitalizeAfterHyphen = (text) => {
        return text.split('-').map((word) => {
            if (word === 'of' || word === 'as') {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join('_');
    };

    const name = capitalizeAfterHyphen(move.name);
    const id = move.id.toString().padStart(3, '0');

    const type1 = main_types.find((type) => move.type.name === type);

    const color1 = colors[type1];

    moveEl.style.backgroundColor = color1;

    const moveInnerHTML = `
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type" style="background-color:${color1};">${type1}</small>
        <h5 class="name">${move.damage_class.name}</h5>
    </div>
    `;

    moveEl.innerHTML = moveInnerHTML;

    golpe_container.appendChild(moveEl);

    moveEl.addEventListener('click', () => {
        // Abre uma nova aba com detalhes do golpe
        window.open(`https://bulbapedia.bulbagarden.net/wiki/${name}_(move)`, '_blank');
    });
};

const filterGolpes = (searchTerm) => {
    const moveCards = document.querySelectorAll('.move');
    moveCards.forEach((card) => {
        const name = card.querySelector('.name').textContent.toLowerCase();
        if (name.includes(searchTerm.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

fetchGolpes();

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    filterGolpes(searchTerm);
});