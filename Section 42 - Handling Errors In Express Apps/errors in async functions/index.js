// you can find useful comments about this code in Section 38 directory, here we will just deal with errors

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const AppError = require("./AppError");

const Product = require("./models/product");

mongoose.connect("mongodb://127.0.0.1:27017/farmStand2") 
    .then(() => {                                      
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

app.use(express.urlencoded( { extended: "true"})); 
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"]; 

app.get("/products", async (req, res, next) => {
    try {
        const {cat} = req.query; 
        if(cat) { 
            const products = await Product.find({category: cat});
            res.render("products/index", {products, cat});
        } else { 
            const products =  await Product.find({});
            res.render("products/index", {products, cat: "All"});
        }
    } catch (e) {
        next(e);
    }
});

app.get("/products/new", (req, res) => {
    res.render("products/new", {categories});
})

app.get("/products/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const foundProduct = await Product.findById(id);
        if(!foundProduct) {
            throw new AppError("Product Not Found!", 404);
        }
        res.render("products/show", {foundProduct}); // instead of putting this in else block we could return that call of next
    } catch (e) {
        next(e);
    }
});

app.post("/products", async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.redirect(`/products/${newProduct._id}`);
    } catch (e) {
        next(e);
    }
});

app.get("/products/:id/edit", async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.render("products/edit", {product, categories}); 
    } catch (e) {
        next(e);
    }
});

app.put("/products/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
        res.redirect(`/products/${id}`);
    } catch (e) {
        next(e);
    }
});

app.delete("/products/:id", async (req, res) => {
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong"} = err;
    res.status(status).send(message);
});

app.listen(3000, () => {
    console.log("Connection open on port 3000");
});

module.exports = categories;