// using fetch function to make request
// we get back readableStream object as response so we need to call .json() on that response (it returns a promise)
// here second request depends on success of first one (it would be better that they are independent requests but we are showing chaining)

fetch("https://swapi.dev/api/people/1")
    .then(res => {
        console.log("1st request resolved");
        return res.json()
    })
    .then(data => {
        console.log(data);
        // imagine that we need to make another request immediately after first succeeds
        return fetch("https://swapi.dev/api/people/2")
    })
    .then(res => {
        console.log("2nd request resolved");
        return res.json()
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log("ERROR");
        console.log(err);
    })

// we can do the same with async function

const loadStarWarsPeople = async () => {
    try {
        const result1 = await fetch("https://swapi.dev/api/people/1");
        const first = await result1.json();
        console.log(first);
        console.log(`Name of first charachter is ${first.name}`);
        const result2 = await fetch("https://swapi.dev/api/people/2");
        const second = await result2.json();
        console.log(second);
    } catch(err) {
        console.log(err);
    }
}

loadStarWarsPeople();