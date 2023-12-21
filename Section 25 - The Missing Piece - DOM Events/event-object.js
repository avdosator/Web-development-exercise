document.querySelector('button').addEventListener('click', function (e) {
    console.log(e);
});

const input = document.querySelector('input');

// we can use e parameter to see which key was pressed, for every keyboard button e is different object
input.addEventListener('keydown', function(e) {
    console.log(e.key);
    console.log(e);
})
// input.addEventListener('keyup', function() {
//     console.log('keyup');
// })