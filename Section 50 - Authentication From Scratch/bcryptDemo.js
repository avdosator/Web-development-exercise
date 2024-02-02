const bcrypt = require("bcrypt");

const hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(12);
    const hashedPw = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(hashedPw);
}

hashPassword("ihavebigdog");