const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auths = require("../auths/auth.mid");

module.exports.login = async function (req, res) {
    User.findOne({ username: req.body?.username }, { _id: 1, username: 1, password: 1, role: 1, status: 1 }).exec(function (err, user) {
        if (err)
            return res.status(400).json({ status: false, "message": err.toString() });
        if (user == null)
            return res.status(400).json({ status: false, "message": "Tài khoản không tồn tại." });
        if (!bcrypt.compareSync(req.body?.password, user.password))
            return res.status(400).json({ status: false, "message": "Mật khẩu không chính xác." });
        if (user.status != "ACTIVE")
            return res.status(400).json({ status: false, "message": "Tài khoản chưa được kích hoạt." });
        delete user._doc.password;
        return res.json({
            status: true, "message": "Thành công.", data: {
                ...user._doc,
                token: jwt.sign(user._doc, auths.SERECT_KEY),
            }
        });
    });
}

module.exports.register = async function (req, res) {
    let schemaUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body?.username,
        password: bcrypt.hashSync(req.body?.password, 10),
        role: "USER",
        status: "ACTIVE",
        createAt: new Date().getTime(),
    });
    schemaUser.save(function (err) {
        if (err)
            return res.status(400).json({ status: false, message: err.toString() });
        return res.json({ status: true, message: "Thành công." });
    });
}