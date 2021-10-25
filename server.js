const express = require("express");
const path = require("path");
const about = require("./routing/about");
const services = require("./routing/services");
const contact = require("./routing/contact");
const files = require("./routing/files");
const error = require("./routing/error");
const { connect } = require("mongoose");
const app = express();
const port = 3012;

connect('mongodb://localhost:27017/bletchley');

app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "pug");

const name = "Bletchley Technological Solutions Inc.";

app.get("/", (req, res) => {
    res.render("index", {
        title: name, 
        path: "/"
    });
});

app.use("/about", about);

app.use("/services", services);

app.use("/contact", contact);

app.get("/faq", (req, res) => {
    res.render("faq", {
        title: `Frequently Asked Questions - ${name}`,
        path: "/faq"
    });
});

app.use(files);

app.use(error);

app.listen(port);