const express = require("express");
const router = express.Router();

router.use(express.static(`${__dirname}/../static`));

router.get("/", (req, res) => {
    res.sendFile(`${__dirname}/about.html`);
});

module.exports = router;