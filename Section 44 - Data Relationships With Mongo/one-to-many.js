const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/relationshipDemo")
    .then(() => {
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ["spring", "summer", "fall", "winter"]
    }
});

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [ {type: Schema.Types.ObjectId, ref: "Product"} ] // this is array of ObjectId-s and it is type of ObjectId (comes from mongoose)
});                                                             // ref tells us which model to use to populate this schema

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

Product.insertMany([
    {name: "Watermellon", price: 1.99, season: "summer"},
    {name: "Tomato", price: 2.50, season: "summer"},
    {name: "Plum", price: 1.50, season: "fall"}
]);