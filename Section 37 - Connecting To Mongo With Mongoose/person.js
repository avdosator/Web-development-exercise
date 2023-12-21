const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/shopApp")
    .then(() => {
        console.log("Connected to shopApp db");
    }).catch(err => console.log(err));

const personSchema = new mongoose.Schema({
    first: String,
    last: String
});

// now we will create virtual property which we can access but it is not saved in the database
personSchema.virtual("fullName").get(function() {
    return `${this.first} ${this.last}`;
});

// creating middleware, pre and post methods
personSchema.pre("save", async function() {
    console.log("This is executed before saving to database!");
});
personSchema.post("save", async function() {
    console.log("This is executed after saving to database!");
})

const Person = mongoose.model("Person", personSchema);

const vedo = new Person({first: "Vedo", last: "Mulic"});
vedo.save();
console.log(vedo.fullName); // we don't need to call fullName as a method with parenthesis, it is just like a property