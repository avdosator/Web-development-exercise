const PI = 3.14;

const add = (x, y) => x + y;

// we could type it like this -> module.exports.add = (x, y) => x + y;

const square = x => x * x;

const multiply = (x, y) => x * y;

// there are few ways to add what we want in module.exports object
/*
module.exports.add = add;
module.exports.PI = PI;
module.exports.square = square;
module.exports.multiply = multiply;
*/
// we can omit module word

exports.add = add;
exports.PI = PI;
exports.square = square;
exports.multiply = multiply;


// we can add what we want to object and export it
/*
const math = {
    add: add,
    PI: PI,
    square: square,
    multiply: multiply
}
module.exports = math;
*/