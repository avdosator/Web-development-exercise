// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

const container = document.querySelector('#container');
const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

for (let i = 1; i < 152; i++) {
    let box = document.createElement("div");
    box.classList.add("box");
    let pokemon = document.createElement("img");
    pokemon.setAttribute("src", `${baseURL}${i}.png`);
    let num = document.createElement("span");
    num.innerText = `#${i}`;

    box.appendChild(pokemon);
    box.appendChild(num);
    container.appendChild(box);
}