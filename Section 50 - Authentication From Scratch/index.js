const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");

const User = require("./models/user");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/authDemo") 
    .then(() => {                                      
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
const sessionOptions = {secret: "badsecret", resave: false, saveUninitialized: true};
app.use(session(sessionOptions));

const requireLogin = function (req, res, next) {
    if(!req.session.user_id) {
        return res.render("/login");
    }
    next();
}

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async(req, res) => {
    const {username, password} = req.body;
    const user = new User({
        username,
        password: await bcrypt.hash(password, 12)
    });
    await user.save();
    req.session.user_id = user._id;
    res.send("YOU HAVE SIGNED UP!");
});

app.get("/login", async(req, res) => {
    res.render("login");
})

app.post("/login", async(req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({ username });
    const isValid = await bcrypt.compare(password, user.password);
    if(isValid) {       // we don't want to somebody to know if problem is in password or username, just say that problem is in one or other (we don't wanna give hackers a clue)
        req.session.user_id = user._id;
        res.redirect("/secret");
    } else {
        res.redirect("/login");
    }
});

app.get("/secret", requireLogin, (req, res) => {
        res.render("secret");
});

app.post("/logout", (req, res) => {
    //req.session.user_id = null;  we use this if we need just to get rid of user_id property
    req.session.destroy(); // we use this if we want to remove entire session
    res.redirect("/login");
});

app.listen(3000, () => {
    console.log("Connected on port 3000");
});
