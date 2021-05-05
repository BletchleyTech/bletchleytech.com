const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const about = require("./about/about");
const services = require("./services/services");
const contact = require("./contact/contact");
const error = require("./error/error");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/about", about);

app.use("/services", services);

app.use("/contact", contact);

app.all("/robots.txt", (req, res) => {
    res.sendFile(path.join(__dirname, "robots.txt"));
});

app.use(error);

app.listen(port);