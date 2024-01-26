const express = require("express");
const app = express();
const session = require("express-session");

app.use(session({ secret: "badsecret" }));

app.get("/viewcount", (req, res) => {
    if(req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`You viewed this page ${req.session.count} times`);
});

app.listen(3000, () => {
    console.log("Connected");
});