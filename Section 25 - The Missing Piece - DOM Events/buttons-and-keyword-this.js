const buttons = document.querySelectorAll('button');
for (let button of buttons) {
    button.addEventListener('click',  colorize) 
}

const makeRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b= Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

const h1s = document.querySelectorAll('h1');
for (let h1 of h1s) {
    h1.addEventListener('click', colorize)        
}
// colorize is generic function, it does not know on what element it will be used. We can call it on whatever element we want by 
// using keyword this
function colorize() {
    this.style.backgroundColor = makeRandomColor();
    this.style.color = makeRandomColor();
}