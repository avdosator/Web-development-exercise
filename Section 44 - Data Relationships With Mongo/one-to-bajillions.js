const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/relationshipDemo")
    .then(() => {
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

const userSchema = new Schema({
    name: String,
    age: Number
});

const User = mongoose.model("User", userSchema);