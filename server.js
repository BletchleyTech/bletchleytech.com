const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(`${__dirname}/static`));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get("/about", (req, res) => {
    res.sendFile(`${__dirname}/about.html`);
});

app.get("/services", (req, res) => {
    res.send("<h1>Services page</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact page</h1>");
});

app.use("/robots.txt", (req, res) => {
    res.sendFile(`${__dirname}/robots.txt`);
});

app.listen(port);