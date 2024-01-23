const express = require("express");
const router = express.Router();

router.get("/shelters", (req, res) => {
    console.log("Viewing all shelters");
});

router.get("/shelters/:id", (req, res) => {
    console.log("Viewing one shelter");
});

router.post("/shelters", (req, res) => {
    console.log("Adding shelter");
});

router.get("/shelters/:id/edit", (req, res) => {
    console.log("Editing one shelter");
});

module.exports = router;