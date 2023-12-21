
const container = document.querySelector("#container");
const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

for (let i = 1; i <= 151; i++) {

    let pokemon = document.createElement("div");
    pokemon.classList.add("pokemon");
    const label = document.createElement("span");
    label.innerText = `#${i}`;
    const image = document.createElement("img");
    image.setAttribute("src", `${baseURL}${i}.png`);
    // image.src = `${baseURL}${i}.png`

    pokemon.appendChild(image);
    pokemon.appendChild(label);
    container.appendChild(pokemon);
}