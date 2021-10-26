const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const Admin = require("./../models/admin");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const hash = require("hash.js");
const router = Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(cookieParser());

const name = 'Bletchley Technological Solutions Inc.';
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
                    path: req.path,
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

router.get("/logout", (req, res) => {
    res.clearCookie("admin");
    res.redirect("/");
});

module.exports = router;