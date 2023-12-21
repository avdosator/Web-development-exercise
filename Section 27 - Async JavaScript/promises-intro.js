// Here we can see standard request
/* makeRequest(() => {
    code if request had success
},
() => {
    code if request failed
}) */

const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor((Math.random() * 3000) + 500);
    setTimeout(() => {
        if (delay > 2700) {
            failure("Connection timeout");
        } else {
            success(`Here is your data from ${url}`);
        }
    }, delay);
}


// This is how it looks when you need some action to execute only if previous one worked well
// We have real life situations like this with requests, if request success only then we can continue with next request and so forth
// This nesting is ugly and later we will se better ways to do tasks like this (promises)
fakeRequestCallback("wikipedia.org/page1", function (data) {
    console.log("It worked for page 1", data);
    fakeRequestCallback("wikipedia.org/page2", function (data) {
        console.log("It worked for page 2", data);
        fakeRequestCallback("wikipedia.org/page3", function (data) {
            console.log("It worked for page 3", data);
        }, function (err) {
            console.log("Failure for page 3 request", err);
        })
    }, function (err) {
        console.log("Failure for page 2 request", err);
    })
}, function (err) {
    console.log("Failure for page 1 request", err);
})

// Now we can make function which returns promise. It will do same job like previous fakeRequestCallback
// if request success (delay < 2700) then resolve will be executed, otherwise reject will be executed (it will throw an error, message will be parameter of reject function)

const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor((Math.random() * 3000) + 500);
    setTimeout(() => {
        if (delay > 2700) {
            reject("Connection timeout");
        } else {
            resolve(`Here is your data from ${url}`);
        }
    }, delay);
    })
}

// now we will use this function to do same thing like nested fakeRequestCallback in previous example
// it seems like there is no improvement, even now there is nesting but in other way

fakeRequestPromise("wikipedia.org/page1") // we can save it to a variable like this (it is the same) -> const request = fakeRequestPromise("wikipedia.org/page1")
    .then(() => {
        console.log("Promise resolved for page 1");
        fakeRequestPromise("wikipedia.org/page2")
            .then(() => {
                console.log("Promise resolved for page 2");
                fakeRequestPromise("wikipedia.org/page3")
                    .then(() => {
                        console.log("Promise resolved for page 3");
                    })
                    .catch(() => {
                        console.log("Promise rejected for page 3");
                    })
            })
            .catch(() => {
                console.log("Promise rejected for page 2");
            })
    })
    .catch(() => {
        console.log("Promise rejected for page 1");
    })

// now we can get rid of nesting. We can achieve that by returning a nested function call, so we don't need to nest .then...
// also we can use just one catch block at the end, and it will work for all calls of fakeRequestPromise function but it needs to be generic error for all calls

fakeRequestPromise("wikipedia.org/page1")
    .then((data) => {
        console.log("Promise resolved for page 1 (no nesting) - ", data);
        return fakeRequestPromise("wikipedia.org/page2");
    })
    .then((data) => {
        console.log("Promise resolved for page 2 (no nesting) - ", data);
        return fakeRequestPromise("wikipedia.org/page3");
    })
    .then((data) => {
        console.log("Promise resolved for page 3 (no nesting) - ", data);
    })
    .catch((err) => {
        console.log("Promise rejeceted!!");
        console.log(err);
    })