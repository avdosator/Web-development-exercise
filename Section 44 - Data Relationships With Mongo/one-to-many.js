const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/relationshipDemo")
    .then(() => {
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ["spring", "summer", "fall", "winter"]
    }
});

const Product = mongoose.model("Product", productSchema);