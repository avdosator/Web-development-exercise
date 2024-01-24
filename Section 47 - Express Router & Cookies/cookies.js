const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/greet", (req, res) => {
    const {name, surname} = req.cookies;
    res.send(`Your name is ${name} ${surname}`);
});

app.get("/setcookie", (req, res) => {
    res.cookie("name", "avdo");
    res.cookie("surname", "sator");
    res.send("Cookies sent");
});

app.listen(3000, () => {
    console.log("CONNECTED");
});