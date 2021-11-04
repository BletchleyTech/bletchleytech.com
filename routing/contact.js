const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const existence = require("email-existence");
const nodemailer = require("nodemailer");
const Contact = require("./../models/contact");
const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "static")));
router.use(bodyParser.urlencoded({extended: true}));

const name = "Bletchley Technological Solutions Inc.";

var data = {};

router.get("/", (req, res) => {
    res.render("contact", {
        title: `Contact Us - ${name}`,
        path: req.originalUrl,
        data: data
    });
    data = {};
});

router.post("/", (req, res) => {
    const name = req.body.name, company = req.body.company, email = req.body.email, service = req.body.service, message = req.body.message;
    existence.check(email, (error, response) => {
        if (error || !response) {
            data = {
                name: name,
                company: company,
                email: `${email} does not exist.`,
                message: message
            };
            res.redirect("/contact#contact");
        } else {
            const contact = new Contact({
                name: name,
                company: company,
                email: email,
                service: service,
                message: message
            });
            contact.save(err => {
                if (err) {
                    console.error(err);
                    res.redirect("/error");
                } else {
                    const mailOptions = {
                        service: 'gmail',
                        auth: {
                            user: 'jorge.gallego@bletchleytech.com',
                            pass: process.env.PASS
                        }
                    }
                    const mail = {
                        from: "'Contact at Bletchley Technological Solutions Inc.' jorge.gallego@bletchleytech.com",
                        to: `'${name}' ${email}`,
                        subject: 'Thank you for your interest',
                        text: `
                            At Bletchley Tech, we appreciate your interest in our services.\n
                            We have received your request. We will now go over it and get back to you as soon as possible with a proposal.\n
                            \n
                            Thanks again for your interest in Bletchley.
                            `
                    }
                    nodemailer.createTransport(mailOptions, mail);
                    res.redirect("/contact/success");
                }
            });
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