// form.preventDefault() is gonna prevent default after form submitting (action attribute of form in html)

// here we want to prevent form to go to some other page and to use data from text input and add it to list below
const cats = document.querySelector('#cats');
const form1 = document.querySelector('#form1');
const input = document.querySelector('#catName');
form1.addEventListener('submit', function(e) {
    e.preventDefault();
    const catName = input.value;
    const newLi = document.createElement('li');
    newLi.append(catName);
    cats.append(newLi);
    input.value = "";
})

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

// change event fires up when we move cursor from the object (in this case text input)
const nick = document.querySelector('#nick');
nick.addEventListener('change', function (e) {
    console.log(nick.value);
})

const h3 = document.querySelector('#h3');
// input event fires up every time the value of input changes. We don't need to remove cursor
nick.addEventListener('input', function(e) {
    h3.innerText = nick.value;
})