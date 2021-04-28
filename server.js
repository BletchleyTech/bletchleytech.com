const express = require("express");
const bodyParser = require("body-parser");
const services = require("./services/services");
const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/static`));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get("/about", (req, res) => {
    res.sendFile(`${__dirname}/about.html`);
});

app.use("/services", services);

app.get("/contact", (req, res) => {
    res.sendFile(`${__dirname}/contact.html`);
});

app.post("/contact", (req, res) => {
    res.send(req.body);
});

app.use("/robots.txt", (req, res) => {
    res.sendFile(`${__dirname}/robots.txt`);
});

app.listen(port);