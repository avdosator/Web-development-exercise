const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/relationshipDemo")
    .then(() => {
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: {_id: false}, // this tells mongoose to not give _id field to adress
            street: String,
            city: String,
            country: String
        }
    ]
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
    const user = new User({
        first: "Avdo",
        last: "Sator"
    });
    user.addresses.push({
        street: "Ferhadija 12",
        city: "Sarajevo",
        country: "Bih"
    });

    const res = await user.save();
    console.log(res);
}

// makeUser();

const addAddress = async () => {
    const user = await User.findOne({first: "Avdo"});
    user.addresses.push({
        street: "Orahov Brijeg 200",
        city: "Vogosca",
        country: "Bosnia"
    });

    const res = await user.save();
    console.log(res);
}

addAddress();