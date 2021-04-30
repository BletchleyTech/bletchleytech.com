const express = require("express");
const bodyParser = require("body-parser");
const about = require("./about/about");
const services = require("./services/services");
const contact = require("./contact/contact");
const error = require("./error/error");
const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/static`));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.use("/about", about);

app.use("/services", services);

app.use("/contact", contact);

app.all("/robots.txt", (req, res) => {
    res.sendFile(`${__dirname}/robots.txt`);
});

app.use(["/", "/about", "/services", "/contact"], error);

app.listen(port);