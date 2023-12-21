
// Nested functions
function greetBestFriends() {
    let bestFriends = ["Vedo", "Kasmo", "Kola", "Fikro", "Smrk"];
    function sayHello() {
        for (let friend of bestFriends) {
            console.log(`Hello ${friend}`);
        }
    }
    sayHello();
}
greetBestFriends();

//Function expressions 
const add = function(num1, num2) {
    return num1 + num2;
}
console.log(add(5,5));

//"Normal" function
function add2(num1, num2) {
    return num1 + num2;
}
console.log(add2(5,5));

//Higher order functions
function callTurnOnTwice(fun) {
    fun();
    fun();
}

function turnOn() {
    console.log("Turned on!");
}

callTurnOnTwice(turnOn);

/*Function that returns function (annonymus) -> try just to call this function, then try to save its return value in 
                                                variable and then call that variable as a function*/
function blackOrWhite() {
    const randomNum = Math.random();
    if (randomNum < 0.5) {
        return function() {
            alert("BLACK");
        }
    } else {
        return function() {
            alert("WHITE");
        }
    }
}

//Second example of returning functions -> isBetween is factory function
function isBetween(min, max) {
    return function(number) {
        return number >= min && number <= max;
    }
}

//Keyword THIS
let gayPerson = {
    name: "Fuad",
    surname: "Backovic",
    middlename: "Den",
    kickSomebody: function () {
        alert(`Torbicom ga ${this.name}e!!!!`);
        console.log(this);
    }
}

//In this case, "this" keyword refers to parent object and that is not gayPerson from example above, it is window object
const anotherGayObject = gayPerson.kickSomebody;



