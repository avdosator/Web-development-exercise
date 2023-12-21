//forEach
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbers.forEach(function (number) {
    if (number % 2 === 0) {
        console.log(number);
    }
})

const exams = [
    {
        name: "Avdo",
        score: 100
    },
    {
        name: "Vedo",
        score: "dvjesta"
    },
    {
        name: "Profa",
        score: 0
    },
    {
        name: "Klapa",
        score: 69
    }
];
exams.forEach(function(exam) {
    console.log(`Student ${exam.name} scored ${exam.score} points`);
});

//map
let numbersNew = numbers.map(function (number) {
    return number * number;
})

let examsNew = exams.map(function(exam) {
    return exam.name;
})

//arrow functions

//Three ways to achieve same thing
const nums = numbers.map((num) => {
    return num * 2;
});
const nums1 = numbers.map(num => {
    return num * 2;
});
const nums2 = numbers.map(num => (
    num * 2
));
const nums3 = numbers.map(num => num * 2);

//setTimeout
console.log("setTimeout function");
console.log("Cao cao");
setTimeout(() => console.log("Znamol se??"), 3000);

//setInterval
const id = setInterval(() => {
    console.log("xa xa xa");
}, 1000);
setTimeout(() => clearInterval(id) , 5000);

//filter arraymethod
const filterArray = numbers.filter(function(n) {
    return (n === 3 || n === 6 || n === 9);
});

const examsPassed = exams.filter( exam => exam.score > 55);

// filter + map
const studentsWithBadGrades = exams.filter(exam => exam.score < 55).map(exam => exam.name);

// some and every
const containsNameWithStartingA = exams.some(exam => exam.name[0] == "A");
const everyStudentPassedExam = exams.every(exam => exam.score >= 55);

// reduce

const prices = [5.50, 9.99, 152.50, 71, 3.20, 99.99];

const total = prices.reduce((total, current) => {
    return total + current;
});
const minPrice = prices.reduce((min, current) => {
    if(current < min) {
        return current;
    }
    return min;
});

const bestStudent = exams.reduce((max, current) => {
    if (current.score > max.score) {
        return current;
    } 
    return max;
});

// keyword this in functions

const person = {
    name: "Admir",
    surname: "Arnautovic",
    fullName: function () { // if we used arrow function to declare this method, this would refer to the window object, not person
        console.log(`${this.name} ${this.surname}`);
    },
    fullName2: function() {
        setTimeout(() => {
            console.log(this.fullname()); // here this refers to person object
        }, 1000);
    }

}


