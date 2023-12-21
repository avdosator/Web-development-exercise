const express = require("express");
const app = express();
const { v4: uuid } = require("uuid"); // we destructure like this if we want just to use v4 method ( i gave it uuid name)
const methodOverride = require("method-override");
const path = require("path");

app.use(express.urlencoded( { extended: "true"})); // without this data that we entered in form for new comment would not be parsed
app.use(express.json());
app.use(methodOverride("_method")); // this is string that will be searched for in query string
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

allComments = [
    {
        id: uuid(),
        username: "Bob",
        comment: "This is my stupid comment"
    },
    {
        id: uuid(),
        username: "Lina",
        comment: "I am the smartest person here"
    },
    {
        id: uuid(),
        username: "Rasema",
        comment: "Can somebody help me with this?"
    },
    {
        id: uuid(),
        username: "Ferid",
        comment: "I am trolling"
    }
];

// get all comments from array (database)
app.get("/comments", (req, res) => {
    res.render("comments/index", { allComments }); // index is common name for base route
});

// route for getting the template for inserting new comment which we will use for our post route to post that comment
app.get("/comments/new", (req, res) => {
    res.render("comments/new");
});

// route for adding new comment to database
app.post("/comments", (req, res) => {
    const { username, comment } = req.body; // req.body contains data entered in form for new comment
    if(username && comment) {
        allComments.push({ username, comment, id: uuid() });
        res.redirect("/comments"); // redirecting to base page immediately
    } else {
        res.redirect("/comments/new"); // do it again if nothing is entered
    }
});

// route for searching particular comment
app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comm = allComments.find(c => c.id === id); // find just gives us first matching result
    res.render("comments/show", { comm });
});

// EDIT

// first we need to render a form for editing comment
app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    const comm = allComments.find(c => c.id === id);
    res.render("comments/edit", { comm });
});

// route for editing existing comment
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;  // extracting id from url
    const comm = allComments.find(c => c.id === id); // finding comment with that id in database
    const newComment = req.body.comment;
    comm.comment = newComment;  // changing previous comment with one that we extracted from form for changing comment
    res.redirect("/comments");
});

// route for deleting particular comment
app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    allComments = allComments.filter(c => c.id !== id); // sometimes we can't mutate existing array so it is better to make a new one with filter method
    res.redirect("/comments");
})

app.listen(3000, () => {
    console.log("ON PORT 3000");
});