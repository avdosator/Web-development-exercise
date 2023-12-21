const jokes = require ("give-me-a-joke");
const colors = require ("colors");
const cow = require ("cowsay");

jokes.getRandomCNJoke (function(joke) {
     console.log(joke);
});

jokes.getRandomDadJoke (function(joke) {
     console.log(joke.rainbow);
});

