const express = require("express");
const path = require("path");
const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "static")));

router.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "404.html"));
});

router.use((req, res) => {
    res.status(500).sendFile(`${__dirname}/500.html`);
});

module.exports = router;