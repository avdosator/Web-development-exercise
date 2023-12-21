// Adding event with needed property of html element
const button2 = document.querySelector("#bttn2");
button2.onclick = () => {
    alert("This too is not so used");
    alert("It is better to use third type of events which you will see later");
}

function warning() {
    alert("YOU TOUCHED THE BUTTON");
}

button2.onmouseenter = warning; // you can do it like this also

//addEventListener method

function hey() {
    console.log("HEY");
}
function ho() {
    console.log("ho");
}

button3 = document.querySelector("#bttn3");

button3.addEventListener('click', function (e) {
    alert("This is the best way to deal with events");
})
// like this we can add as much as we want functions to the same event of same element
button3.addEventListener('click', hey, {once: true});
button3.addEventListener('click', ho);
button3.removeEventListener()