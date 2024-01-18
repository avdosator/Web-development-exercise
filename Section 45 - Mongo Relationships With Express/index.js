
// we will not deal with errors in this file

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override"); 

const Product = require("./models/product");
const Farm = require("./models/farm");

mongoose.connect("mongodb://127.0.0.1:27017/farmStand2") 
    .then(() => {                                      
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

app.use(express.urlencoded( { extended: "true"})); // now we can extract params from url (req.body)
app.set("view engine", "ejs"); // we use ejs like this when we install it
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));



// FARM ROUTES

app.get("/farms", async (req, res) => {
    const farms = await Farm.find({});
    res.render("farms/index", { farms });
});

app.post("/farms", async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect("/farms");
});

app.get("/farms/new", (req, res) => {
    res.render("farms/new");
});

app.get("/farms/:id/products/new", (req, res) => {
    const { id } = req.params;
    res.render("products/new", { id, categories });
})

app.get("/farms/:id", async (req, res) => {
    const {id} = req.params;
    const farm = await Farm.findById(id);
    res.render("farms/show", { farm });
});





// PRODUCT ROUTES
const categories = ["fruit", "vegetable", "dairy"]; 

app.get("/products", async (req, res) => {
    const {cat} = req.query; 
    if(cat) { 
        const products = await Product.find({category: cat});
        res.render("products/index", {products, cat});
    } else { 
        const products =  await Product.find({});
        res.render("products/index", {products, cat: "All"});
    }
});

app.get("/products/new", (req, res) => {
    res.render("products/new", { categories });
})

app.get("/products/:id", async (req, res) => {
    const {id} = req.params;
    const foundProduct = await Product.findById(id);
    res.render("products/show", { foundProduct });
});

app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body); 
    await newProduct.save();
    res.redirect(`/products/${ newProduct._id }`);
});

app.get("/products/:id/edit", async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
    res.redirect(`/products/${ id }`);
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