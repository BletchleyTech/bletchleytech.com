const { Router } = require("express");
const existence = require("email-existence");
const Contact = require("./../models/contact");
const router = Router();

const name = "Bletchley Technological Solutions Inc.", services = ['web', 'app'];

router.get("/", (req, res) => {
    if (services.indexOf(req.query.service) >= 0) {
        res.render("landing", {
            title: `${req.query.service[0].toUpperCase()+req.query.service.slice(1)} Development Special Offer - ${name}`,
            service: req.query.service
        });
    } else res.redirect("/");
});

router.post("/", (req, res) => {
    const name = req.body.name, company = req.body.company, email = req.body.email, service = req.body.service, message = req.body.message;
    existence.check(email, (err, response) => {
        if (err || !response) {
            res.redirect(`/landing?service${req.query.service}#contact`);
        } else {
            const contact = new Contact({
                name: name,
                company: company,
                email: email,
                service: service,
                message: message
            });
            contact.save((err) => {
                if (err) {
                    console.error(err);
                    res.redirect("/error");
                }
            });
            res.redirect("/landing/success");
        }
    });
});

router.get("/success", (req, res) => {
    res.render("success", {
        title: `Success - ${name}`, 
        path: req.originalUrl
    });
});

module.exports = router;