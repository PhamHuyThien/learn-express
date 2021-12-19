require('dotenv').config();
const mongoose = require("mongoose");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const authRouter = require("./routers/auth.router");
const userRouter = require("./routers/user.router");
const adminRouter = require("./routers/admin.router");
const fileRouter = require("./routers/file.router");
const songRouter = require("./routers/song.router");

const homeRouter = require("./routers/home.router");

const authMid = require("./mids/auth.mid");

app.set("views", "./views");
// app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/user", authMid.isAuthenticated, userRouter);
app.use("/api/v1/file", fileRouter);
app.use("/api/v1/song", authMid.isAuthenticated, songRouter);

app.use("/api/v1/admin", authMid.isAdmin, adminRouter);

app.use("/", homeRouter);

let host = process.env.MDB_HOST;
let port = process.env.MDB_PORT;
let db = process.env.MDB_DB;
let user = process.env.MDB_USER;
let pass = process.env.MDB_PASS;
let auth = user != "" && pass != "" ? user + ":" + pass + "@" : "";
let url = `mongodb://${auth}${host}:${port}/${db}`;
mongoose.connect(url, function (err) {
    if (err)
        return console.log("connect to db Error => " + err.toString());
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Node ExpressJs Server Listen ${process.env.SERVER_PORT} ...`);
    });
});

