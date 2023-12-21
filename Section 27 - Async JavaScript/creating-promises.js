// promise is object and we can create it just like other objects

const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const randNum = Math.random();
        setTimeout(() => {
            if (randNum < 0.7) {
                resolve("Here is your fake data");
            } else {
                reject("Error, no data!");
            }
        }, 1000);
    })
}

fakeRequest("fakeUrl")
    .then((data) => {
        console.log("DONE!");
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })

// we can improve our delayedColorChange function from callback-hell file with using promises

const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

/*delayedColorChange("red", 1000)
    .then(() => {
        return delayedColorChange("orange", 1000);
    })
    .then(() => {
        return delayedColorChange("green", 1000);
    })
    .then(() => {
        return delayedColorChange("blue", 1000);
    })
    .then(() => {
        return delayedColorChange("yellow", 1000);
    })
    .then(() => {
        return delayedColorChange("violet", 1000);
    }) */

    // we can make calling this function much better by using JS syntax for callbacks
    // it looks so smaller and more readable

     delayedColorChange("red", 1000)
         .then(() => delayedColorChange("orange", 1000))
         .then(() => delayedColorChange("green", 1000))
         .then(() => delayedColorChange("blue", 1000))
         .then(() => delayedColorChange("yellow", 1000))
         .then(() => delayedColorChange("violet", 1000))
         

