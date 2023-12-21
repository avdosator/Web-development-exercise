
// ...spread

// spread in function calls

const numbers = [5, 7, 767, 1, 5456, 63, 68, 100, 12];

const max1 = Math.max(numbers); // this will return NaN because max method doesnt know what to do with array
const max2 = Math.max(...numbers) // this will return the biggest number
console.log(max1, max2);
const helloString = "Hello";
console.log(helloString, ..."hello"); // printing like a normal string and then like an array of chars

// spread with array literals

const newNumbers = [6, 0, 13, 666];
const allNumbers = [...numbers, ...newNumbers, 69]; // we can copy one array to new, copy more arrays into new one, add individual elements
console.log(allNumbers);
let charArray = [..."Hello"];
console.log(charArray);

// spread with objects

let horse = {
    legs: 4,
    tail: true,
    color: "black",
    smart: true
};
let donkey = {
    legs: 4,
    tail: true,
    smart: false,
    weight: 150
};

let horsyDonkey = {...horse, ...donkey, type: "dangerous"}; // if there are same properties, the last one will be chosen
console.log(horsyDonkey);                                   // we can add our new properties 

// rest params

function sum() { // we can use ...arg as argument and then we can send as much as we want arguments which will be stored in array so we can use array methods on it
    console.log(arguments);
    console.log(arguments[0]); // we can access particular argument like this
    // arguments.indexOf() -> we can't use this because arguments is not array (and we can't use them in arrow functions)
}

// destructuring arrays

const bestPlayers = ["Djeko", "Piplica", "Radovac", "Vazda"];
let [best, ...others] = bestPlayers; // best will be "Djeko" and others will be ["Piplica", "Radovac", "Vazda"]

// destructuring objects

const footballer = {
    name: "Edin",
    surName: "Djeko",
    nickName: "Kloc",
    birthYear: 1985,
    active: true,
    goals: 435,
    club: "Fenerbahce",
    spouse: "Amra Djeko"
}

let {surName, goals, spouse: wife, firstClub = "Zeljeznicar"} = footballer;

// destructuring params

/* function fullName(footbaler) {
    return `${footbaler.name} ${footbaler.surName}`;    OLD WAY
}
console.log(fullName(footballer)); */

/* function fullName(footbaler) {
    const {name, surName} = footbaler;
    return `${name} ${surName}`;              LITTLE IMPROVEMENT
}
console.log(fullName(footballer)); */

function fullName({name, surName}) {  // BETTER WAY
    return `${name} ${surName}`;
}
console.log(fullName(footballer));

const fullname = ({name, surName}) => `${name} ${surName}`; // SOMETHING LIKE EXAMPLE ABOVE