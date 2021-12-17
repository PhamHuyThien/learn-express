require('dotenv').config();
const mongoose = require("mongoose");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const apiAuthRouter = require("./routers/api.auth");
const apiUserRouter = require("./routers/api.user");
const apiAdminRouter = require("./routers/api.admin");

const homeRouter = require("./routers/home");


const authMid = require("./mids/auth");

app.set("views", "./views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", apiAuthRouter);
app.use("/api/v1/user", authMid.isAuthenticated, apiUserRouter);
app.use("/api/v1/admin", authMid.isAdmin, apiAdminRouter);

app.use("/", homeRouter);

mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err)
        return console.log("connect to db Error => " + err.toString());
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Node ExpressJs Server Listen ${process.env.SERVER_PORT} ...`);
    });
});

