const express = require("express");
const path = require("path");
const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "static")));

const name = "Bletchley Technological Solutions Inc.";

router.get("/", (req, res) => {
    res.render("services", {
        title: `Services - ${name}`, 
        path: "/services"
    });
});

router.get("/web", (req, res) => {
    res.render("web", {
        title: `Web Development - ${name}`, 
        path: "/services/web"
    });
});

router.get("/app", (req, res) => {
    res.render("app", {
        title: `App Development - ${name}`, 
        path: "/services/app"
    });
});

router.get("/game", (req, res) => {
    res.render("game", {
        title: `Game Development - ${name}`, 
        path: "/services/game"
    });
});

router.get("/enterprise", (req, res) => {
    res.render("enterprise", {
        title: `Enterprise Apps - ${name}`, 
        path: "/services/enterprise"
    });
});

router.get("/vr", (req, res) => {
    res.render("vr", {
        title: `Virtual Reality - ${name}`,
        path: "/services/vr"
    });
});

module.exports = router;