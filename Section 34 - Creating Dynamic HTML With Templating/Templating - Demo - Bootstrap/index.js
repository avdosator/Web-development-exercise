// same like in EJS folder but public folder will be containing bootstrap things

// requiring what we need
const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");  // we are doing this instead getting data from database (same idea)

// serving static files
// app.use(express.static("public"));  on this way we can't run app from different folder beause of path so we need next approach
app.use(express.static(path.join(__dirname, "/public")));

// set the needed parameters
app.set("view engine", "ejs");  // This will, under the hood, call require("ejs") so we don't need to do that
app.set("views", path.join(__dirname, "/views")); //like this we will say to express to search views folder in folder where this index.js is

// requests and responses
app.get("/", (req, res) => {
    res.render("home"); //we don't need to type views/home.ejs because it search file in views folder by default and dont need .ejs ext
});

app.get("/r/:subreddit", (req, res) => { // this is common pattern, we get some data from database and send it to ejs template
    const {subreddit} = req.params;      // then in template we use it to make html file which will be rendered
    const data = redditData[subreddit];
    if(data) {
        res.render("subreddit", { ...data });
    } else {
        res.render("notFound", { subreddit });
    }
});

app.get("/random", (req, res) => {
    const randNum = Math.floor(Math.random() * 10) + 1;
    res.render("random", { randNum });
});

app.get("/cats", (req, res) => {
    const cats = ["macy", "ferida", "hanka", "mukelefa", "nezira"]; // we can pretend that we got cats data from some database
    res.render("cats", { cats });
});

// connecting with (fake) server
app.listen(8080, () => {
    console.log("Listening on port 8080");
});