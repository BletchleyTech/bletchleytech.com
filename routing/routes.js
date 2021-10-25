const { Router } = require("express");
const Testimonial = require("./../models/testimonial");
const router = Router();

const name = "Bletchley Technological Solutions Inc.";

router.get("/", (req, res) => {
    res.render("index", {
        title: name, 
        path: "/"
    });
});

router.get("/faq", (req, res) => {
    res.render("faq", {
        title: `Frequently Asked Questions - ${name}`,
        path: "/faq"
    });
});

module.exports = router;