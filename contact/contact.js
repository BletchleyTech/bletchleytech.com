const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const client = require("@mailchimp/mailchimp_marketing");
const router = express.Router();

client.setConfig({
    apiKey: '57b28f035527ac42e62255b01ecbf650-us1',
    server: 'us1'
});

var error;

router.use(express.static(path.join(__dirname, "..", "static")));
router.use(bodyParser.urlencoded({extended: true}));

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "contact.html"));
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