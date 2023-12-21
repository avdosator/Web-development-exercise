const allImages = document.getElementsByTagName('img');

// for (let img of allImages) {
//     img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Silky_bantam.jpg/440px-Silky_bantam.jpg'
// }


// const squareImages = document.getElementsByClassName('square');

// for (let img of squareImages) {
//     img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Silky_bantam.jpg/440px-Silky_bantam.jpg';
// }

// const links = document.querySelectorAll('p a');

// for (let link of links) {
//     console.log(link.href)
// }

const header = document.querySelector("h1");
header.style.color = "magenta"; // header.setAttribute("style", "color: magenta");

header.classList.add("greenBorder");
header.classList.toggle("greenBorder");

const parent = document.querySelector("b").parentElement;
// parent.children -> it gives us HTML Collection of all children

// creating element and appending it on certain element with appendChild
let headingChild = document.createElement("span");
headingChild.innerText = " New element";
header.appendChild(headingChild);

// append method
let firstP = document.querySelector("p");
firstP.append(" With append method we can add multiple elements in one call.", " Also we can provide string as an argument.")
firstP.prepend("We can add element on the start of the certain element. ");

