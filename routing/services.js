const express = require("express");
const path = require("path");
const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "static")));

const name = "Bletchley Technological Solutions Inc.";

router.get("/", (req, res) => {
    res.render("services", {
        title: `Services - ${name}`, 
        path: req.path
    });
});

router.get("/web", (req, res) => {
    res.render("web", {
        title: `Web Development - ${name}`, 
        path: req.path
    });
});

router.get("/app", (req, res) => {
    res.render("app", {
        title: `App Development - ${name}`, 
        path: req.path
    });
});

// router.get("/game", (req, res) => {
//     res.render("game", {
//         title: `Game Development - ${name}`, 
//         path: req.path
//     });
// });

// router.get("/enterprise", (req, res) => {
//     res.render("enterprise", {
//         title: `Enterprise Apps - ${name}`, 
//         path: req.path
//     });
// });

// router.get("/vr", (req, res) => {
//     res.render("vr", {
//         title: `Virtual Reality - ${name}`,
//         path: req.path
//     });
// });

module.exports = router;