const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.statics.findAndValidate = async function (username, password) { // we can declare static method like this
    const user = await this.findOne({username}); // this refers to model (User)
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : false; 
}

const User = mongoose.model("User", userSchema);
module.exports = User;