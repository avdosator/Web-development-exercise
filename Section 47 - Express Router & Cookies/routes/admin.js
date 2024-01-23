const express = require("express");
const router = express.Router();

router.use( (req, res, next) => {
    if(req.query.isAdmin) {
        next();
    }
    res.send("YOU ARE NOT AN ADMIN!");
});

router.get("/secret", (req, res) => {
    res.send("THIS IS MY SECRET");
});

router.get("/ban", (req, res) => {
    res.send("YOU BANNED AN USER");
});

module.exports = router;