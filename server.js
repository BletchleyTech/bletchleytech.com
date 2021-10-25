const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routing/routes");
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
app.use(cors());
app.set("view engine", "pug");

app.use(routes);

app.use("/about", about);

app.use("/services", services);

app.use("/contact", contact);

app.use(files);

app.use(error);

app.listen(port);