const express = require("express");
const app = express();
const session = require("express-session");

const sessionOptions = {secret: "badsecret", resave: false, saveUninitialized: false}; // second and third option to remove warnings
app.use(session(sessionOptions));

app.get("/viewcount", (req, res) => {
    if(req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`You viewed this page ${req.session.count} times`);
});

app.get("/register", (req, res) => {
    const { username = "Anonymous" } = req.query; // fake registration, we pretend that query string is legit registrated user
    req.session.username = username;
    res.redirect("/greet");
});

app.get("/greet", (req, res) => {
    const username = req.session.username;
    res.send(`Welcome back ${username}. You viewed our page ${req.session.count} times`);
});

app.listen(3000, () => {
    console.log("Connected");
});