const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(express.static(`${__dirname}/../static`));
router.use(bodyParser.urlencoded({extended: true}));

router.get("/", (req, res) => {
    res.sendFile(`${__dirname}/contact.html`);
});

router.post("/success", (req, res) => {
    res.send(req.body);
});

module.exports = router;