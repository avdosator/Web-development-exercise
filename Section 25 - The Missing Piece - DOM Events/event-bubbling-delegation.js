const button = document.querySelector('#bttn');
const div = document.querySelector('#div');
const section = document.querySelector('#section');

button.addEventListener('click', function(e) {
    alert("You clicked a button");
})

div.addEventListener('click', function(e) {
    alert("You clicked a div");
})

section.addEventListener('click', function(e) {
    alert("You clicked a section");
})

const changeBttn = document.querySelector('#change');
const containerDiv = document.querySelector('#container');
changeBttn.addEventListener('click', function(e) {
    containerDiv.style.backgroundColor = makeRandomColor();
    e.stopPropagation();
})
containerDiv.addEventListener('click', function (e) {
    containerDiv.classList.toggle('hide');
})


const makeRandomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b= Math.floor(Math.random() * 255);
    const newColor = `rgb(${r}, ${g}, ${b})`;
    return newColor;
}

// event delegation
const form2 = document.querySelector('#form2');
const username = document.querySelector('#username');
const comment = document.querySelector('#comment');
const tweets = document.querySelector('#tweets');
form2.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = username.value;
    const comm = comment.value;
    postTweet(name, comm);
    username.value = "";
    comment.value = "";
})

function postTweet (username, comment) {
    const bTagName = document.createElement('b');
    bTagName.append(username);
    const newTweet = document.createElement('li');
    newTweet.append(bTagName);
    newTweet.append(` - ${comment}`);
    tweets.append(newTweet);
}

// if we chosen all li-s and add event to every of them, to remove it on click, it would work just for starting items, not for
// one which were added through js
// e.target will point to place where user clicked
tweets.addEventListener('click', function(e) {
    e.target.nodeName === 'LI' && e.target.remove(); // this will work because if first is false then the other one won't execute
})

