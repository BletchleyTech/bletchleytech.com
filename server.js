const express = require("express");
const path = require("path");
const about = require("./about/about");
const services = require("./services/services");
const contact = require("./contact/contact");
const error = require("./error/error");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "pug");
// app.set("views", "templates");

const name = "Bletchley Technological Solutions Inc.";

app.get("/", (req, res) => {
    res.render("index", {
        title: name
    });
});

app.use("/about", about);

app.use("/services", services);

app.use("/contact", contact);

app.all("/faq", (req, res) => {
    res.render("faq", {
        title: `Frequently Asked Questions - ${name}`
    });
});

app.all("/robots.txt", (req, res) => {
    res.sendFile(path.join(__dirname, "robots.txt"));
});

app.all("/sitemap.xml", (req, res) => {
    res.sendFile(path.join(__dirname, "sitemap.xml"));
});

app.use(["*/robots.txt", "*/robots"], (req, res) => {
    res.redirect("/robots.txt");
});

app.use(["*/sitemap.xml", "*/sitemap"], (req, res) => {
    res.redirect("/sitemap.xml");
});

app.use(error);

app.listen(port);