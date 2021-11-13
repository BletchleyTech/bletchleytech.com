const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const existence = require("email-existence");
const nodemailer = require("nodemailer");
const Contact = require("./../models/contact");
require("dotenv").config();
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
                    res.redirect("/contact/success");
                    const transporter = nodemailer.createTransport({
                        port: 465,
                        service: 'gmail',
                        auth: {
                            user: process.env.MAIL_SENDER,
                            pass: process.env.MAIL_PASS
                        }
                    });
                    const mailOptions = {
                        from: process.env.MAIL_SENDER,
                        to: 'jorge.gallego@bletchleytech.com',
                        subject: 'New request',
                        text: 
                            `
                                There has been a submission from the Bletchley Technological Solutions Inc. Contact page.
                                The following information was submitted:
                                - Name: ${name}
                                - Company: ${company}
                                - Email: ${email}
                                - Service: ${service}
                                - Message: ${message}
                            `
                    };
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) console.error(err);
                        else console.log(info.response);
                    });
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