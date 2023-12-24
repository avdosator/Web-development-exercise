const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

// this will be executed on every single request
app.use((req,res,next) => {
    console.log("hello");
    next();
});

// we are faking a scenario where app needs somebody's password (we will pretend that it needs to be in query string)
const verifyPassword = (req, res, next) => {
    const {password} = req.query;
    if(password === "correctpassword") {
        next();
    } else {
        res.send("Your password is not correct! Try again.");
    }
}

// this will be executed only if we hit /dogs route, but it will hit app.get("/dogs") because we call next() in it
app.use("/dogs", (req,res,next) => {
    console.log("I have big dogs");
    next();
});

app.get("/", (req, res) => {
    res.send("HELLOOOOOOO");
});

app.get("/dogs", (req, res) => {
    res.send("Hey dog!");
});

app.get("/secret", verifyPassword, (req, res) => {
    res.send("My secret is that I have one million euros in my basement");
});

app.use((req, res) => {
    res.status(404).send("NOT FOUND!");
});

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
});