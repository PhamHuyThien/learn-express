require('dotenv').config();
const mongoose = require("mongoose");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const authRouter = require("./routers/auth.router");
const userRouter = require("./routers/user.router");

const auths = require("./auths/auth.mid");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", auths.isAuthenticated, userRouter);

mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err)
        return console.log("connect to db Error!");
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Node ExpressJs Server Listen ${process.env.SERVER_PORT} ...`);
    });
});

