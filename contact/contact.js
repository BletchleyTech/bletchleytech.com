const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "static")));
router.use(bodyParser.urlencoded({extended: true}));

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "contact.html"));
});

router.post("/", (req, res) => {
    res.send(req.body);
});

router.get("/success", (req, res) => {
    res.send("Subscribed");
});

router.get("/failure", (req, res) => {
    console.log("failure");
    res.render("failure", {
        message: error
    });
});

module.exports = router;