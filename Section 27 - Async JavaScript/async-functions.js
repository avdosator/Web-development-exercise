// async functions return promise
//this promise is automatically resolved
const sing = async () => {
    return "I am singing";
}

sing()
    .then((data) => {
        console.log("This promise is resolved");
        console.log(data);
    })

// if we need rejection, we can simply throw an error, or program itself can throw some error

const cry = async () => {
    throw new Error("I am crying"); //we can just say throw "I am crying";
    console.log("This will not be printed");
}

cry()
    .catch((err) => {
        console.log("This should catch an error");
        console.log(err);
    })

// now we will see trivial example of async function

const login = async (username, password) => {
    if (!username || !password) throw "Please provide valid username and password";
    if (password === "correct") return ("Congratulations!");
    throw "Invalid password";
}

login("john", "hehe")
    .then((data) => {
        console.log(data, " You are logged in.");
    })
    .catch((err) => {
        console.log(`You are not logged in. ${err}`);
    })

// await keyword can make our code look simple. It is always used with async so we don't bother with .then

const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

//this function return a promise so we can chain that if we need
const rainbow = async () => {
    await delayedColorChange("red", 1000);
    await delayedColorChange("orange", 1000);
    await delayedColorChange("green", 1000);
    await delayedColorChange("blue", 1000);
    await delayedColorChange("yellow", 1000);
    await delayedColorChange("violet", 1000);
    return "All done!"
}
//if we expect possible error then we call await function inside of try block and deal with error in catch block

// rainbow().then( data => console.log("End of rainbow", data));

// or we can do it like this (instead of commented call of rainbow)

async function printRainbow() {
    let data = await rainbow(); // like this we can save returning value from promise !!!!!!!!! THIS IS SUPER COMMON
    console.log("end of rainbow");
    console.log(data);
}
printRainbow();
