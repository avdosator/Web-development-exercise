const mongoose = require("mongoose");
const Product = require("./product");
const {Schema} = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, "Farm must have a name"]
    },    
    city: {
        type: String,
        required: [true, "Please provide a city"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"]
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

farmSchema.post("findOneAndDelete", async function (farm) { // farm is object that is found by Farm.findById() in delete route
    if(farm.products.length) { // we are checking if farm has any products
        const res = await Product.deleteMany({_id: { $in: farm.products }});
        console.log(res);
    }
});

const Farm = mongoose.model("Farm", farmSchema);

module.exports = Farm;