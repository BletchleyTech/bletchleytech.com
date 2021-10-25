const { Router } = require("express");
const Testimonial = require("./../models/testimonial");
const Client = require("./../models/client");
const router = Router();

const name = "Bletchley Technological Solutions Inc.";

router.get("/", (req, res) => {
    Testimonial.find({}, 'quote name company', (err, testimonials) => {
        if (err) {
            console.error(err);
            res.redirect("/error");
        } else {
            testimonials.reverse().slice(0, 5);
            res.render("index", {
                title: name, 
                path: req.path,
                testimonials
            });
        }
    });
});

router.get("/faq", (req, res) => {
    res.render("faq", {
        title: `Frequently Asked Questions - ${name}`,
        path: req.path
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
                path: req.path,
                clients
            });
        }
    });
});

module.exports = router;