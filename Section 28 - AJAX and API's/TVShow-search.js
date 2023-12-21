
const searchForm = document.querySelector("#searchShow");
const searchField = document.querySelector("#searchField");
const submitButton = document.querySelector("#submitButton");

// https://api.tvmaze.com/search/shows?q=girls

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputValue = searchForm.elements.q.value;
    // instead of using string literal for input value, we can use base url and then add config object (params) as a parameter
    // this is useful when we have more different things to add to url
    const config = { params: {q : inputValue} };
    const res = await axios.get("https://api.tvmaze.com/search/shows", config);
    addImages(res.data);
    searchForm.elements.q.value = "";
})

const addImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const newImg = document.createElement("img");
            newImg.src = result.show.image.medium;
            document.body.append(newImg);
        }
    }
}