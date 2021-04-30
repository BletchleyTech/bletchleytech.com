const express = require("express");
const router = express.Router();

router.use(express.static(`${__dirname}/../static`));

router.use("/", (req, res) => {
    res.statusCode = 404;
    res.statusMessage = 'Not Found';
    res.sendFile(`${__dirname}/error.html`);
});

module.exports = router;