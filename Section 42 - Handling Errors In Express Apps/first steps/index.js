const express = require("express");
const app = express();
const morgan = require("morgan");
const AppError = require("./AppError.js");

app.use(morgan("dev"));

// this will be executed on every single request
app.use((req, res, next) => {
    console.log("Every request hits this middleware!");
    next();
});

// we are faking a scenario where app needs somebody's password (we will pretend that it needs to be in query string)
const verifyPassword = (req, res, next) => {
    const {password} = req.query;
    if(password === "correctpassword") {
        next();
    }  
    //res.send("Your password is not correct! Try again.");
    throw new AppError("Password required!", 401);
}

// this will be executed only if we hit /dogs route, but it will hit app.get("/dogs") because we call next() in it
app.use("/dogs", (req, res, next) => {
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

app.get("/error", (req, res) => {
    avdo.eat();
});

app.use((req, res) => {
    res.status(404).send("NOT FOUND!");
});

app.use((err, req, res, next) => {
    const {message = "Something went wrong", status = 500} = err;
    res.status(status).send(message);
    // next(err); if we want to hit express built in (default) error handler we call next like this (it doesnt make sense to do this)
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
});