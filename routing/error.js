const express = require("express");
const router = express.Router();

const name = "Bletchley Technological Solutions Inc.";

router.get("/error", (req, res) => {
    res.status(500).render("error", {
        title: `Internal Server Error - ${name}`,
        path: req.originalUrl
    });
});

router.use("*/", (req, res) => {
    res.status(404).render("404", {
        title: `Page Not Found - ${name}`,
        path: req.originalUrl
    });
});

router.use((error, req, res, next) => {
    res.status(500).render("500", {
        title: `Internal Server Error - ${name}`,
        path: req.originalUrl
    });
    console.error(error);
});

module.exports = router;