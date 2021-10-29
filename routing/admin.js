const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const Admin = require("./../models/admin");
const Client = require("./../models/client");
const Member = require("./../models/team");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const hash = require("hash.js");
const multer = require("multer");
const lodash = require("lodash");
const path = require("path");
const router = Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(cookieParser());

const name = 'Bletchley Technological Solutions Inc.', storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "static", "images", "members"));
    }, 
    filename: (req, file, cb) => {
        cb(null, `${lodash.camelCase(req.body.name)}.jpg`);
    }
});
const upload = multer({ storage: storage });
var message;

router.get("/", (req, res) => {
    if (req.cookies.admin) {
        Admin.findOne({name: req.cookies.admin}, (err, admin) => {
            if (err) {
                console.error(err);
                res.redirect("/error");
            } else if (!admin) {
                res.clearCookie("admin");
                res.redirect("/admin");
            } else {
                res.redirect("/admin/dashboard");
            }
        });
    } else {
        res.render("admin", {
            title: `Admin Login - ${name}`
        });
    }
});

router.post("/", (req, res) => {
    const name = req.body.username, pass = hash.sha512().update(req.body.password).digest("hex");
    Admin.findOne({name: name}, 'pass', (err, admin) => {
        if (err) {
            console.error(err);
            res.redirect("/error");
        } else if (!admin) {
            res.redirect("/");
        } else {
            res.cookie("admin", name, {
                expires: new Date(Date.now() + 60_480_000),
                httpOnly: true
            });
            res.redirect("/admin/dashboard");
        }
    });
});

router.get("/dashboard", (req, res) => {
    if (req.cookies.admin) {
        Admin.findOne({name: req.cookies.admin}, (err, admin) => {
            if (err) {
                console.error(err);
                res.redirect("/error");
            } else if (!admin) {
                res.clearCookie("admin");
                res.redirect("/admin");
            } else {
                res.render("dashboard", {
                    title: `Admin Dashboard - ${name}`,
                    path: req.originalUrl,
                    admin: admin,
                    message
                });
            }
        });
    } else {
        res.redirect("/admin");
    }
});

router.post("/dashboard/profile", (req, res) => {
    if (req.body.username && req.body.password) {
        Admin.deleteOne({name: req.cookies.admin}, (err, response) => {
            if (err) {
                console.error(err);
                res.redirect("/error");
            } else {
                const admin = new Admin({
                    name: req.body.username,
                    pass: hash.sha512().update(req.body.password).digest("hex")
                });
                admin.save();
                res.clearCookie("admin");
                res.redirect("/admin/dashboard");
            }
        });
    } else if (req.body.password) {
        Admin.deleteOne({name: req.cookies.admin}, (err, response) => {
            if (err) {
                console.error(err);
                res.redirect("/error");
            } else {
                const admin = new Admin({
                    name: req.cookies.admin,
                    pass: hash.sha512().update(req.body.password).digest("hex")
                });
                admin.save();
                res.clearCookie("admin");
                res.redirect("/admin/dashboard");
            }
        });
    }
});

router.post("/dashboard/admin", (req, res) => {
    Admin.findOne({name: req.body.name}, (err, admin) => {
        if (err) {
            console.error(err);
            res.redirect("/error");
        } else if (admin) {
            message = `Admin '${req.body.username}' already exists.`;
            res.redirect("/admin/dashboard");
        } else if (!admin) {
            const admin = new Admin({
                name: req.body.username,
                pass: hash.sha512().update(req.body.password).digest("hex")
            });
            admin.save();
            res.redirect("/admin/dashboard");
        }
    });
});

router.post("/dashboard/clients", (req, res) => {
    Client.findOne({name: req.body.name}, (err, client) => {
        if (err) {
            console.error(err);
            res.redirect("/error");
        } else if (client) {
            Client.updateOne({name: req.body.name}, {
                service: req.body.service,
                rating: req.body.rating,
                website: req.body.website
            }, (err, response) => {
                if (err) {
                    console.error(err);
                    res.redirect("/error");
                }
            });
        } else if (!client) {
            const client = new Client({
                name: req.body.name,
                service: req.body.service,
                rating: req.body.rating,
                website: req.body.website
            });
            client.save();
        }
    });
    res.redirect("/admin/dashboard");
});

router.post("/dashboard/members", upload.single('image'), (req, res) => {
    const member = new Member({
        name: req.body.name,
        title: req.body.title.split(", "),
        image: `/images/members/${req.file.filename}`,
        socials: {
            linkedin: req.body.linkedin,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            twitter: req.body.twitter,
            website: req.body.website
        },
        quote: req.body.quote
    });
    member.save();
    res.redirect("/admin/dashboard");
});

router.get("/logout", (req, res) => {
    res.clearCookie("admin");
    res.redirect("/");
});

module.exports = router;