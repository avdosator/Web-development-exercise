const mongoose = require("mongoose");

// instead of then and catch we could define an async method and use await for mongoose.connect()
mongoose.connect("mongodb://127.0.0.1:27017/movieApp") // if there is not movieApp database, mongoose will create it
    .then(() => {                                      // but we can't see it yet because there is no collections in it
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

    // creating a schema which we will use to construct model(class)
    const movieSchema = new mongoose.Schema({
        title: String,
        year: Number,
        rating: Number
    });

    // creating a js class
    const Movie = mongoose.model("Movie", movieSchema);

    // creating instance of Movie class
    // const rambo = new Movie({title: "Rambo", year: 1990, rating: 7.2});

    // saving an Movie instance named rambo to database
    // rambo.save();

    // when we run app first time we inserted movies like this so we can have data to work with
    /* Movie.insertMany([
        {title: "Tokyo Drift", year: 2005, rating: 8.2},
        {title: "Captain", year: 2009, rating: 9.0},
        {title: "Wrack", year: 1986, rating: 5.5},
        {title: "Amadeus", year: 1984, rating: 8.0},
        {title: "Friends", year: 2000, rating: 4.5}
    ])
    .then(res => {
        console.log(res);
    }); */

    // update one document, this method does not return that document (updateMany works the same)
    // Movie.updateOne({title: "Friends"}, {rating: 5.0}).then(m => console.log(m));

    // on this way we can get updated document (updated version)
    // Movie.findOneAndUpdate({title:"Friends"}, {rating: 4.5}, {new: true}).then(m => console.log(m));

    // deleting and getting object back
    // Movie.findOneAndDelete({title:"Friends"}).then(m => console.log(m));
