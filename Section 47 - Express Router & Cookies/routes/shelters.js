const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Viewing all products");
});

router.get("/:id", (req, res) => {
    res.send("Viewing one product");
});

router.post("/", (req, res) => {
    res.send("Adding a product");
});

router.get("/:id/edit", (req, res) => {
    res.send("Editing one product");
});

module.exports = router;