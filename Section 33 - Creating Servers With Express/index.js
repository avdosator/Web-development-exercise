const express = require("express");
const app = express();


// I will comment this because of later methods (for 1 request we can only get 1 response).
/*
// this method is calling provided callback anytime it gets some request (any type of request!). That will be response on any request
// anytime we refresh our localhost tab in browser, this will be executed
app.use((req, res) => {
    // res.send() is response to the request. All commented examples are ok
    res.send("Hello, this is response to your request!");

    /* Play with this in hoopscootch
    res.send("<h1>Browser will render this as an html object!<h1/>");
    res.send({name: Avdo, weight: 90});
})
*/

// now we will see three different responses for 3 different requests (routes)
// we will see only get requests because that is the only type of requests that we can send by typing in browser url (try others in hoopscootch)

// this si so called root route (something like home page)
app.get("/", (req, res) => {
    res.send("Welcome to the home page");
});

// these two are different routes
app.get("/dogs", (req, res) => {
    res.send("WOOOOFFFF");
});

app.get("/cats", (req, res) => {
    res.send("MEOWWWWWW");
});

// next is example for some generic path. We use colon for that. We can extract that with params property of req object
app.get("/animals/:specie", (req, res) => {
    const {specie} = req.params;
    res.send(`<h1>Response for ${specie} page`);
});

// next is even more generic pattern
app.get("/animals/:specie/:color", (req, res) => {
    const {specie, color} = req.params;
    res.send(`<h1>Response for ${specie} page with ${color} color`);
});

// here we can see how we can use query string(s)
app.get("/search", (req, res) => {
    const {q} = req.query;
    console.log(req.query);
    res.send(`Results for <b>${q}</b> search:`);
});

// if we want generic response for any get request we do it like this. Move it above other get methods to see it working
app.get("*", (req, res) => {
    res.send("Response is the same for all get requests!!");
});




// every time we run our application, this callback will be executed
// when we do it just like this without anything else, we will get an error Cannot GET / (try it in browser).
// That is automatic 404 error because there is no response
app.listen(3000, () => {
    console.log("Listening on port 3000");
});