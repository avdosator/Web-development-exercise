const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");

const User = require("./models/user");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb://127.0.0.1:27017/authDemo") 
    .then(() => {                                      
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async(req, res) => {
    const {username, password} = req.body;
    const user = new User({
        username,
        password: await bcrypt.hash(password, 12)
    });
    await user.save();
    res.send("YOU HAVE SIGNED UP!");
});

app.get("/login", async(req, res) => {
    res.render("login");
})

app.post("/login", async(req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({ username });
    const isValid = await bcrypt.compare(password, user.password);
    if(isValid) {
        res.send("WELCOME");
    } else {
        res.send("TRY AGAIN");
    }
});

app.listen(3000, () => {
    console.log("Connected on port 3000");
});
