const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(`${__dirname}/services.html`);
});

router.get("/web", (req, res) => {
    res.send("<h1>Web Development</h1>");
});

router.get("/app", (req, res) => {
    res.send("<h1>App Development</h1>");
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