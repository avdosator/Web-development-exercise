const header = document.querySelector("h1");
const bttn = document.querySelector("button");

bttn.addEventListener('click', function () {
    const newColor = makeRandomColor();
    document.body.style.backgroundColor = newColor;
    header.innerText = newColor;
})

const makeRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b= Math.floor(Math.random() * 255);
    const newColor = `rgb(${r}, ${g}, ${b})`;
    if(r + g + b < 150) {
        header.style.color = 'white';
    } else {
        header.style.color = 'black';
    }
    return newColor;
}