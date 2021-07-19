const express = require("express");
const path = require("path");
const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "static")));

const name = "Bletchley Technological Solutions Inc.";

router.get("/", (req, res) => {
    res.render("services", {
        title: `Services - ${name}`
    });
});

router.get("/web", (req, res) => {
    res.render("web", {
        title: `Web Development - ${name}`
    });
});

router.get("/app", (req, res) => {
    res.render("app", {
        title: `App Development - ${name}`
    });
});

// router.get("/game", (req, res) => {
//     res.send("<h1>Game Development</h1>");
// });

// router.get("/enterprise", (req, res) => {
//     res.send("<h1>Enterprise App Development</h1>");
// });

// router.get("/vr", (req, res) => {
//     res.send("<h1>Virtual Reality Development</h1>");
// });

module.exports = router;