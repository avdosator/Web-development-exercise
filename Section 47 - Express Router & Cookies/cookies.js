const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser("secret")); // cookieParser needs parameter so it could parse signed cookies

app.get("/greet", (req, res) => {
    const {name, surname} = req.cookies;
    res.send(`Your name is ${name} ${surname}`);
});

app.get("/setcookie", (req, res) => {
    res.cookie("name", "avdo");
    res.cookie("surname", "sator");
    res.send("Cookies sent");
});

app.get("/signedcookie", (req, res) => {
    res.cookie("bankAccount", "1567577", {signed: true});
    res.send("We created signed cookie");
});

app.get("/usesignedcookies", (req, res) => {
    res.send(req.signedCookies); // signed cookies are separated from basic cookies
});

app.listen(3000, () => {
    console.log("CONNECTED");
});