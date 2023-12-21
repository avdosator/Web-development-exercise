const franc = require ("franc");
const langs = require ("langs");
const colors = require ("colors");

let langCode = franc(process.argv[2]);
console.log(langCode)

if (langCode === "undefined") { // something is wrong here
    console.log("Try with more words".red);
} else {
    const language = langs.where("3", langCode);
    console.log(language.name.green);
}