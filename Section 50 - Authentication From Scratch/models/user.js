const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "You have to provide username"]
    },
    password: {
        type: String,
        required: [true, "You have to provide password"]
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;