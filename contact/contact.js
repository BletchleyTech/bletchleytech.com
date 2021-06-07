const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const nodemailer = require("nodemailer");
const router = express.Router();

client.setConfig({
    apiKey: '57b28f035527ac42e62255b01ecbf650-us1',
    server: 'us1'
});

var error;

router.use(express.static(path.join(__dirname, "..", "static")));
router.use(bodyParser.urlencoded({extended: true}));

router.get("/", (req, res) => {
    res.render("contact");
});

router.post("/", (req, res) => {
    const first = req.body.fname, last = req.body.lname, email = req.body.email, service = req.body.service, message = req.body.message;
    var new_client = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first,
                    LNAME: last,
                    SERVICE: service,
                    MESSAGE: message
                }
            }
        ]
    };
    const run = async () => {
        const response = await client.lists.batchListMembers('a45c3be319', new_client);
        if (response.error_count === 0)
        {
            res.statusCode = 302;
            res.setHeader('Location', '/contact/success');
            return res.end();
        }
        else
        {
            error = response.errors[0].error_code;
            if (error === 'ERROR_CONTACT_EXISTS') {
                new_client.update_existing = true;
                run();
            } else {
                error = response.errors[0].error;
                if (error.includes(",")) {
                    error = error.split(",")[0];
                }
                res.statusCode = 302;
                res.setHeader('Location', '/contact/failure');
                return res.end();
            }
        }
    };
    run();
    const sender = 'gallegojorge908@gmail.com';
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: sender,
            pass: 'ztpjjeltirtfhtdz'
        }
    });
    const mail = {
        from: sender,
        to: email,
        subject: 'Thanks for your interest',
        text: 'At Bletchley Inc. we appreciate your interest in our services.\n\nWe will now got through the information you submitted and get back to you as soon as possible.\n\nWe look forward to working with your in the near future.\n\nRegards,\nThe Bletchley Inc. team'
    };
    transporter.sendMail(mail, (error, info) => {
        if (error) console.log(error);
        else console.log(`Email sent: ${info.response}`);
    });
});

router.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "success.html"));
});

router.get("/failure", (req, res) => {
    res.render("failure", {
        message: error
    });
});

module.exports = router;