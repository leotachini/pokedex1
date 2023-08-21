const hab_container = document.getElementById('hab-container');
const hab_count = 1000;
const colors = ['#1F618D', '#922B21', '#17A589', '#D4AC0D', '#900C3F', '#7D3C98', '#FA4A95', '#BA4A00', '#9FE2BF', 'white'];
let colorIndex = 0;

const fetchhab = async () => {
    for (let i = 1; i <= hab_count; i++) {
        await gethab(i);
    }
};

const gethab = async (id) => {
    const url = `https://pokeapi.co/api/v2/ability/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createhabCard(data);
};

const handleSpecialCases = (name) => {
    return name.replace(/_Of/g, '_of').replace(/_As/g, '_as');
};

const capitalizeAfterHyphen = (text) => {
    return text.split('-').map((word) => {
        if (word === 'of' || word === 'as') {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join('_');
};

const createhabCard = (hab) => {
    const habEl = document.createElement('div');
    habEl.classList.add('hab');

    const name = capitalizeAfterHyphen(hab.name);
    const id = hab.id.toString().padStart(3, '0');

    const color1 = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
    habEl.style.backgroundColor = color1;  // Correção aqui

    const habInnerHTML = `
    <div class="info" style="background-color:${color1}">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
    </div>
    `;

    habEl.innerHTML = habInnerHTML;

    hab_container.appendChild(habEl);

    habEl.addEventListener('click', () => {
      
    window.open(`https://bulbapedia.bulbagarden.net/wiki/${name}_(Ability)`, '_blank');
    });
};

const filterhab = (searchTerm) => {
    const habCards = document.querySelectorAll('.hab');
    habCards.forEach((card) => {
        const name = card.querySelector('.name').textContent.toLowerCase();
        if (name.includes(searchTerm.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
};

fetchhab();

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    filterhab(searchTerm);
});
