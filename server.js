require('dotenv').config();
const mongoose = require("mongoose");

const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const authRouter = require("./routers/auth.router");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);

mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err) {
        console.log("connect to db Error!");
        return;
    }
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Node ExpressJs Server Listen ${process.env.SERVER_PORT} ...`);
    });
});

