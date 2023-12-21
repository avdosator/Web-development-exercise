// it is simplest when you compare it to fetch() because you dont need .json() method and .then block after it
// field "data" of res is actually parsed JSON object that we need
axios
    .get("https://swapi.dev/api/people/1")
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    })

// now we can make async function which accepts id number and then return us person with that id

const getStarWarsPerson = async id => {
    try {
        const result = await axios.get(`https://swapi.dev/api/people/${id}`)
        console.log(result.data);
    } catch(err) {
        console.log(err);
    }
}

getStarWarsPerson(2);
getStarWarsPerson(1);
getStarWarsPerson(6);

// using axios and sending header as an argument (some API's need specific header object so they can send JSON object back)

const getJokeButton = document.querySelector("#getJoke");
const jokes = document.querySelector("#jokes");

const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: "application/json"}};
        const res = await axios.get("https://icanhazdadjoke.com/", config);
        return res.data.joke;
    } catch (err) {
        return "No jokes avaliable";
    }
}

const addJokeToList = async () => {
    const joke = await getDadJoke();
    const newJoke = document.createElement("li");
    newJoke.append(joke);
    jokes.append(newJoke);
}

getJokeButton.addEventListener('click', () => {
    addJokeToList();
})





