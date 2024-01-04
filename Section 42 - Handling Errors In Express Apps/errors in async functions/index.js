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

app.use(express.urlencoded({ extended: "true" }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"];

// when we hit route, this function will be executed and it will return back a function which executes our callback
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}

app.get("/products", wrapAsync(async (req, res, next) => {
    const { cat } = req.query;
    if (cat) {
        const products = await Product.find({ category: cat });
        res.render("products/index", { products, cat });
    } else {
        const products = await Product.find({});
        res.render("products/index", { products, cat: "All" });
    }
}));

app.get("/products/new", (req, res) => {
    res.render("products/new", { categories });
})

app.get("/products/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
        throw new AppError("Product Not Found!", 404);
    }
    res.render("products/show", { foundProduct }); // instead of putting this in else block we could return that call of next
}));

app.post("/products", wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);

}));

app.get("/products/:id/edit", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product Not Found!", 404);
    }
    res.render("products/edit", { product, categories });
}));

app.put("/products/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.redirect(`/products/${id}`);
}));

app.delete("/products/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect("/products");
}));

// function and middleware to handle Validation errors
const handleValidationError = err => {
    console.log(err.name);
    throw new AppError(`Validation Failed: ${err.message} `, 400);
}

app.use((err, req, res, next) => {
    if(err.name === "ValidationError") {
        handleValidationError(err);
    }
    next(err);
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message);
});

app.listen(3000, () => {
    console.log("Connection open on port 3000");
});

module.exports = categories;