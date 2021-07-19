const express = require("express");
const router = express.Router();

const name = "Bletchley Technological Solutions Inc.";

router.use("*/", (req, res) => {
    res.status(404).render("404", {
        title: `Page Not Found - ${name}`
    });
});

router.use((error, req, res, next) => {
    res.status(500).render("500", {
        title: `Internal Server Error - ${name}`
    });
    console.error(error);
});

module.exports = router;