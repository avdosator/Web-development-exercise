const fs = require('fs');
const folderName = process.argv[2] || 'Project';
console.log(folderName);

// async function for creating a folder
fs.mkdir('newDir', { recursive: true }, (err) => {
    if (err) throw err;
});

// sync version - second argument for writeFileSync is content for that file
try {
    fs.mkdirSync(`${folderName}`);
    fs.writeFileSync(`${folderName}/hehe.js`, "");
    fs.writeFileSync(`${folderName}/hehe.html`, "");
    fs.writeFileSync(`${folderName}/hehe.css`, "");
} catch (err) {
    console.log("something went wrong");
    console.log(err);
}

// delete these files and folders after running this if you want
