const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/shopApp")
    .then(() => {
        console.log("Connected to shopApp db");
    }).catch(err => console.log(err));

const productSchema = new mongoose.Schema({ // we can define constraints in schema like this
    name: {
        type: String,  // we can set minLength, maxLength, lowercase, pattern, uppercase...
        required: true
    },
    price: {
        type: Number,  // we can set constraints like default
        required: true,
        min: [0, "Price can't be negative!"] // this second argument is potential error message if price was negative
    },
    // categories: [String] -> when creating an instance we can provide as much as we want categories (we can make this an object with other properties just like price and name)
    qty: {
        inStore: {
            type: Number,
            min: 0
        },
        onLine: {
            type: Number,
            min: 0
        }
    },
    size: {
        type: String,
        enum: ["M", "L", "XL"] // now size only can be "M", "L" or "XL"
    },
    onSale: {
        type: Boolean,
        default: false
    }

});    

// adding instance methods on Product class, all methods need to be defined before calling mongoose.model()
productSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale; // we can toggle it in many other ways
    return this.save(); // we must save every changes if we want to change it in database. It also takes time(async operation) so we can return that thenable object
}

// adding static method which in most cases reffers to all documents of model
productSchema.statics.fireSale = function() {
    return this.updateMany({}, {onSale: true}); // it is same like Product.updateMany(), this refers to the model
}

const Product = mongoose.model("Product", productSchema);

const findProduct = async() => {
    const product = await Product.findOne({price: 500}); // this could take time so we use await
    await product.toggleOnSale(); // we will await this method because it could take time
}

Product.fireSale().then(res => console.log(res)); 

/*const bike = new Product({ name: "BMX", price: "600", color: "red" }); // mongoose will convert string 600 to number, and will ignore 
bike.save()                                                          // properties that are not in the schema
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err.errors.name.properties.message);
    });
const helmet = new Product({ name: "Bike Helmet", price: 50 });
helmet.save()
    .then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err.errors.name.properties.message);
    });*/

// if we want to update something from db but we want constraints to be applied we need to set runValidators: true    
/*Product.findOneAndUpdate({ _id: '6572e54c5d069376c0dd8c6c' },
                         { name: "Bike", categories: ["Mountain", "City"], price: -100 },
                         { runValidators: true, new: true })
    .then(p => console.log(p));*/