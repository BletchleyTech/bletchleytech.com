const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "static")));
router.use(bodyParser.urlencoded({extended: true}));

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "contact.html"));
});

router.post("/success", (req, res) => {
    res.send(req.body);
});

module.exports = router;