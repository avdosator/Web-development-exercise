const express = require("express");
const app = express();

app.get("/greet", (req, res) => {
    res.send("HELLO THERE");
});

app.listen(3000, () => {
    console.log("CONNECTED");
});