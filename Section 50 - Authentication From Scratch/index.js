const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/authDemo") 
    .then(() => {                                      
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

app.listen(3000, () => {
    console.log("Connected on port 3000");
});
