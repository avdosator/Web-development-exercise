const express = require("express");
const app = express();
const shelterRoutes = require("./routes/shelters");

app.use("/shelters", shelterRoutes); // we could do it with just "/" but then we would have to type /shelters in every route in shelters.js

app.listen(3000, () => {
    console.log("Connected to server");
});