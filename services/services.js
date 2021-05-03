const express = require("express");
const path = require("path");
const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "static")));

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "services.html"));
});

router.get("/web", (req, res) => {
    res.sendFile(path.join(__dirname, "web.html"));
});

router.get("/app", (req, res) => {
    res.sendFile(path.join(__dirname, "app.html"));
});

router.get("/game", (req, res) => {
    res.send("<h1>Game Development</h1>");
});

router.get("/enterprise", (req, res) => {
    res.send("<h1>Enterprise App Development</h1>");
});

router.get("/vr", (req, res) => {
    res.send("<h1>Virtual Reality Development</h1>");
});

module.exports = router;