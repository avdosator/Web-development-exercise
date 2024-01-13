const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/relationshipDemo")
    .then(() => {
        console.log("Connected to database");
    }).catch(err => {
        console.log(err);
    });

const userSchema = new Schema({
    username: String,
    age: Number
});

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: "User"}
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);

const makeTweets = async () => {
    const user = new User({username: "Tviteras", age: 20});
    const tweet1 = new Tweet({text: "This is my first tweet", likes: 0});
    tweet1.user = user; // mongoose will automatically take ID and embed it
    user.save();
    tweet1.save();
}

//makeTweets();

const findTweet = async () => {
    const tweet = await Tweet.findOne({}).populate("user", "username"); // a way to use populate() to just show us username field
    console.log(tweet)
}

findTweet();