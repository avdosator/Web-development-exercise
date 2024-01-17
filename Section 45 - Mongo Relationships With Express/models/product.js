const mongoose = require("mongoose"); // we need this because we will use mongoose for making schema and model (we will connect to database just in index.js)
//const categories = require("./index"); how can I get categories from index.js and use it here in enum?
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0
    },
    category: {
        type: String,
        lowercase: true, // if we misstype "fruit" it will lowercase it automatically
        enum: ["fruit", "vegetable", "dairy"] //later try with exporting array from index.js and put it here
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;