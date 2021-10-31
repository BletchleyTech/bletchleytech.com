const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const existence = require("email-existence");
const Contact = require("./../models/contact");
require("dotenv").config();
const router = express.Router();

client.setConfig({
    apiKey: process.env.MAILCHIMP,
    server: 'us1'
});

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
            var new_client = {
                members: [
                    {
                        email_address: email,
                        status: "subscribed",
                        merge_fields: {
                            NAME: name,
                            COMPANY: company,
                            SERVICE: service,
                            MESSAGE: message
                        }
                    }
                ]
            };
            const run = async () => {
                const response = await client.lists.batchListMembers('0c7be17030', new_client);
                if (response.error_count === 0)
                {
                    const contact = new Contact({
                        name: name,
                        company: company,
                        email: email,
                        service: service,
                        message: message
                    });
                    contact.save();
                    res.redirect("/contact/success");
                }
                else
                {
                    if (response.errors[0].error_code === 'ERROR_CONTACT_EXISTS') {
                        new_client.update_existing = true;
                        run();
                    } else {
                        console.error(response.errors[0].error);
                        res.redirect("/contact/failure");
                    }
                }
            };
            run();
        }
    });
});

router.get("/success", (req, res) => {
    res.render("success", {
        title: `Success - ${name}`, 
        path: req.originalUrl
    });
});

router.get("/failure", (req, res) => {
    res.render("failure", {
        title: `Failure - ${name}`,
        path: req.originalUrl
    });
});

module.exports = router;