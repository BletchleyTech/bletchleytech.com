const { Router } = require("express");
const Client = require("./../models/client");
const router = Router();

const name = "Bletchley Technological Solutions Inc.";

router.get("/", (req, res) => {
    res.render("index", {
        title: name, 
        path: req.originalUrl
    });
});

router.get("/faq", (req, res) => {
    res.render("faq", {
        title: `Frequently Asked Questions - ${name}`,
        path: req.originalUrl
    });
});

router.get("/clients", (req, res) => {
    Client.find({}, 'name service rating logo', (err, clients) => {
        if (err) {
            console.error(err);
            res.redirect("/error");
        } else {
            clients.reverse();
            res.render("clients", {
                title: `Our Clients - ${name}`,
                path: req.originalUrl,
                clients
            });
        }
    });
});

module.exports = router;