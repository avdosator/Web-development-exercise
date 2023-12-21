
// we will not deal with errors in this file

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override"); // use this because of sending patch, put and delete requests trough forms

const Product = require("./models/product"); // now we can use Product here, this means search for exports in product file in models folder which is in same folder like this file

mongoose.connect("mongodb://127.0.0.1:27017/farmStand") 
    .then(() => {                                      
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

app.use(express.urlencoded( { extended: "true"})); // now we can extract params from url (req.body)
app.set("view engine", "ejs"); // we use ejs like this when we install it
app.set("views", path.join(__dirname, "views")); // now we can run this file from every place with correct path and we will get our ejs files correctly
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"]; //we will use this to generate categories in selects in ejs files

app.get("/products", async (req, res) => {
    const {cat} = req.query; // we are searching for something in query string (we hit this route in show.ejs)
    if(cat) { // if there is query string (category) then give us just documents with that category
        const products = await Product.find({category: cat});
        res.render("products/index", {products, cat});
    } else { // if there is no query string then find all products
        const products =  await Product.find({}); // this could take time so we await till it find products so we can send it to index.ejs
        res.render("products/index", {products, cat: "All"});
    }
});

// this route needs to be placed before /products/:id because if it's not browser would take our word "new" and search database as that was id
app.get("/products/new", (req, res) => {
    res.render("products/new", {categories});
})

app.get("/products/:id", async (req, res) => {
    const {id} = req.params;
    const foundProduct = await Product.findById(id);
    res.render("products/show", {foundProduct});
});

app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body); // for now this is ok but we should always check because we could have more or less data in req.body
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id/edit", async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", {product, categories});
});

app.put("/products/:id", async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
    res.redirect(`/products/${id}`);
});

app.delete("/products/:id", async (req, res) => {
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
});

module.exports = categories;

app.listen(3000, () => {
    console.log("Connection open on port 3000");
});