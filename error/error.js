const express = require("express");
const router = express.Router();

router.use(express.static(`${__dirname}/../static`));

router.use((req, res) => {
    res.status(404).sendFile(`${__dirname}/404.html`);
});

router.use((req, res) => {
    res.status(500).send("Internal Server Error");
    // res.status(500).sendFile(`${__dirname}/500.html`);
});

module.exports = router;