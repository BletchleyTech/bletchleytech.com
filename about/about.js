const express = require("express");
const path = require("path");
const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "static")));

const name = "Bletchley Technological Solutions Inc.";

router.get("/", (req, res) => {
    res.render("about", {
        title: `About Us - ${name}`
    });
});

module.exports = router;