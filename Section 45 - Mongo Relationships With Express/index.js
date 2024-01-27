
// we will not deal with errors in this file

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override"); 
const session = require("express-session");
const flash = require("connect-flash");

const Product = require("./models/product");
const Farm = require("./models/farm");

mongoose.connect("mongodb://127.0.0.1:27017/farmStand2") 
    .then(() => {                                      
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

// we need this for using flash
const sessionOptions = {secret: "badsecret", resave: false, saveUninitialized: false};
app.use(session(sessionOptions));
app.use(flash());

app.use(express.urlencoded( { extended: "true"})); // now we can extract params from url (req.body)
app.set("view engine", "ejs"); // we use ejs like this when we install it
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"]; 


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

app.get("/farms/:id", async (req, res) => {
    const {id} = req.params;
    const farm = await Farm.findById(id).populate("products"); // populate it so we can use product name and other stuff when rendering farms show page
    res.render("farms/show", { farm });
});

app.get("/farms/:id/products/new", async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render("products/new", { farm, categories });
});

app.post("/farms/:id/products", async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category} = req.body;
    const product = new Product({ name, price, category});
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${farm._id}`);
});

app.delete("/farms/:id", async (req, res) => {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect("/farms");
});



// PRODUCT ROUTES

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
    const foundProduct = await Product.findById(id).populate("farm", "name");
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