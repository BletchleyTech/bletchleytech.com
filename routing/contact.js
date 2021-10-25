const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const nodemailer = require("nodemailer");
const existence = require("email-existence");
const { connect, Schema, model } = require("mongoose");
const router = express.Router();

client.setConfig({
    apiKey: 'c7ba6d7a16df78da5d4400c5b4318b8a-us1',
    server: 'us1'
});

connect('mongodb://localhost:27017/bletchley');

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    company: String,
    email: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const Contact = new model('Contact', contactSchema);

router.use(express.static(path.join(__dirname, "..", "static")));
router.use(bodyParser.urlencoded({extended: true}));

const name = "Bletchley Technological Solutions Inc.";

var data = {};

router.get("/", (req, res) => {
    res.render("contact", {
        title: `Contact Us - ${name}`,
        path: "/contact",
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
                    const sender = 'gallegojorge908@gmail.com';
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: sender,
                            pass: 'ztpjjeltirtfhtdz'
                        }
                    });
                    const mail = {
                        from: `'Contact at Bletchley Technological Solutions' ${sender}`,
                        to: `'${name}' ${email}`,
                        subject: "We've recieved your request",
                        html: 
                            `
                                <h1 style="margin:0;text-align:center;font-family:sans-serif;padding:2% 0;border-bottom:1px solid;">
                                    Thanks for your interest
                                </h1>
                                <section style="padding:2% 1%;text-align:justify;font-size:1rem;">
                                    <p style="margin:0;">At Bletchley, we appreciate your interest in our services and your confidence in our abilities.</p>
                                    <p style="margin:0;">As such, we will now go over the information you provided, review it, and get back at you with a response as soon as possible.</p>
                                    <p style="margin:0;">We are looking forward to working with you and helping your business grow</p>
                                </section>
                                <section style="font-weight:bold;font-family:sans-serif;padding:1%;border-top:1px solid;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;align-items:center;">
                                    <div>
                                        <p style="margin:0;font-size:0.9rem;">
                                            Bletchley Technological Solutions Inc.
                                            <br>
                                            Cra 102B # 148 - 31, 3-6-101
                                            <br>
                                            Bogotá D.C., Colombia
                                        </p>
                                    </div>
                                    <div style="text-align:right;margin-left:auto;">
                                        <h2 style="margin-bottom:0;">Follow Us</h2>
                                        <p style="margin-top:0;">
                                            <a style="color:#444444;" href="https://linkedin.com/company/bletchley-tech">LinkedIn</a>
                                            <a style="color:#444444;" href="https://facebook.com/bletchley-tech">Facebook</a>
                                            <a style="color:#444444;" href="https://instagram.com/bletchley_tech">Instagram</a>
                                            <a style="color:#444444;" href="https://twitter.com/bletchleytech">Twitter</a>
                                        </p>
                                    </div>
                                </section>
                            `
                        // text: 'At Bletchley Tech we appreciate your interest in our services.\n\nWe will now got through the information you submitted and get back to you as soon as possible.\n\nWe look forward to working with your in the near future.\n\nRegards,\nThe Bletchley Inc. team'
                    };
                    transporter.sendMail(mail, (error, info) => {
                        if (error) console.log(error);
                        else console.log(`Email sent: ${info.response}`);
                    });
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
        path: "/contact/success"
    });
});

router.get("/failure", (req, res) => {
    res.render("failure", {
        title: `Failure - ${name}`,
        path: "/contact/failure"
    });
});

module.exports = router;