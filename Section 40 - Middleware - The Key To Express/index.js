const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("HELLOOOOOOO");
});

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
});