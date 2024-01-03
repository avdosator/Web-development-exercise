// this is file that we will run just once to fill up our database with some data so we can use it later
const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose.connect("mongodb://127.0.0.1:27017/farmStand2")
    .then(() => {
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

const products = [
    { name: "tomato", price: 1, category: "vegetable" },
    { name: "apple", price: 2, category: "fruit" },
    { name: "milk", price: 2, category: "dairy" },
    { name: "avocado", price: 5, category: "Fruit" },
    { name: "cucumber", price: 1, category: "vegetable" },
    { name: "cheese", price: 7, category: "dairy" },
    { name: "blueberry", price: 8, category: "fruit" }
];

Product.insertMany(products).then(res => console.log(res)); // every member of array must past validations, otherwise method will not insert anything