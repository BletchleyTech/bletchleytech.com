const express = require("express");
const path = require("path");
const Member = require("./../models/team");
const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "static")));

const name = "Bletchley Technological Solutions Inc.";

router.get("/", (req, res) => {
    res.render("about", {
        title: `About Us - ${name}`,
        path: req.baseUrl
    });
});

router.get("/team", (req, res) => {
    Member.find((err, members) => {
        if (err) {
            console.error(err);
            res.redirect("/error");
        } else {
            res.render("team", {
                title: `Our Team - ${name}`,
                path: req.baseUrl,
                members
            });
        }
    });
});

module.exports = router;