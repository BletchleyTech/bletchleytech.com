const { Router } = require("express");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const existence = require("email-existence");
const Subscriber = require("./../models/subscriber");
require("dotenv").config();
const router = Router();

router.use(bodyParser.urlencoded({extended: true}));

client.setConfig({
    apiKey: process.env.MAILCHIMP,
    server: 'us5'
});

const name = "Bletchley Technological Solutions Inc.";

router.get("/", (req, res) => {
    res.render("subscribe", {
        title: `Subscribe to our Newsletter - ${name}`,
        path: req.originalUrl
    });
});

router.post("/", (req, res) => {
    const fname = req.body.fname, lname = req.body.lname, email = req.body.email;
    existence.check(email, (error, response) => {
        if (error || !response) {
            res.redirect("/subscribe");
        } else {
            var new_client = {
                members: [
                    {
                        email_address: email,
                        status: "subscribed",
                        merge_fields: {
                            FNAME: fname,
                            LNAME: lname
                        }
                    }
                ]
            };
            const run = async () => {
                const response = await client.lists.batchListMembers('4f6a53a121', new_client);
                if (response.error_count === 0)
                {
                    const sub = new Subscriber({
                        fname: fname,
                        lname: lname,
                        email: email
                    });
                    sub.save((err) => {
                        if (err) {
                            console.error(err);
                            return res.redirect("/error");
                        }
                    });
                    res.redirect("/subscribe/success");
                }
                else
                {
                    if (response.errors[0].error_code === 'ERROR_CONTACT_EXISTS') {
                        new_client.update_existing = true;
                        run();
                    } else {
                        console.error(response.errors[0].error);
                        res.redirect("/subscribe/failure");
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