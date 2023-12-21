const math = require("./math");
// we can destructure it to get just what we need so we can now type add(5, 10) instead math.add(5,10)
// const {add, PI} = require("./math");
console.log(math.square(5));
console.log(math);

// now we will require an entire folder (index.js represents its exports)

const cats = require ("./CatsShelter");
console.log(cats);