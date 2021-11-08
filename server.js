const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routing/routes");
const about = require("./routing/about");
const services = require("./routing/services");
const contact = require("./routing/contact");
const subscribe = require("./routing/subscribe");
const landing = require("./routing/landing");
const admin = require("./routing/admin");
const files = require("./routing/files");
const error = require("./routing/error");
const { connect } = require("mongoose");
const favicon = require("serve-favicon");
const app = express();
const port = 3012;

connect('mongodb://localhost:27017/bletchley');

app.use(express.static(path.join(__dirname, "static")));
app.use(favicon(path.join(__dirname, "favicon.png")));
app.use(cors());
app.set("view engine", "pug");

app.use(routes);

app.use("/about", about);

app.use("/services", services);

app.use("/contact", contact);

app.use("/subscribe", subscribe);

app.use("/landing", landing);

app.use("/admin", admin);

app.use(files);

app.use(error);

app.listen(port);