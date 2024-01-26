const express = require("express");
const app = express();
const session = require("express-session");

app.use(session({ secret: "badsecret" }));

app.listen(3000, () => {
    console.log("Connected");
});