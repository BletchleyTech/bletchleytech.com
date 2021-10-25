const { Router } = require("express");
const Testimonial = require("./../models/testimonial");
const router = Router();

const name = "Bletchley Technological Solutions Inc.";

router.get("/", (req, res) => {
    Testimonial.find({}, 'quote name company', {limit: 5}, (err, testimonials) => {
        if (err) {
            console.error(err);
            res.redirect("/error");
        } else {
            res.render("index", {
                title: name, 
                path: "/",
                testimonials
            });
        }
    });
});

router.get("/faq", (req, res) => {
    res.render("faq", {
        title: `Frequently Asked Questions - ${name}`,
        path: "/faq"
    });
});

router.get("/clients", (req, res) => {

})

module.exports = router;