const bcrypt = require("bcrypt");

const hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(12);
    const hashedPw = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(hashedPw);
}

const login = async (pw, hashedPw) => {
    const isValid = await bcrypt.compare(pw, hashedPw);
    if(isValid) {
        console.log("You are logged in!!!!!!");
    } else {
        console.log("Incorrect password!! Try again!");
    }
}

// hashPassword("ihavebigdog");
login("ihavebigdog", "$2b$12$TzQQXB0dpspK1rVkWca9xeTjVwIQp5A9MyCJwj/09sMPkBliEg5Ze");