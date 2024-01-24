const express = require("express");
const app = express();

app.get("/greet", (req, res) => {
    res.send("HELLO THERE");
});

app.get("/setcookie", (req, res) => {
    res.cookie("name", "avdo");
    res.cookie("surname", "sator");
    res.send("Cookies sent");
});

app.listen(3000, () => {
    console.log("CONNECTED");
});