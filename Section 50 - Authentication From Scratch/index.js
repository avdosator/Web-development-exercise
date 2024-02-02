const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

const User = require("./models/user");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: "true"}));

mongoose.connect("mongodb://127.0.0.1:27017/authDemo") 
    .then(() => {                                      
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

app.listen(3000, () => {
    console.log("Connected on port 3000");
});
