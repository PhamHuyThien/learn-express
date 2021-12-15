const mongoose = require("mongoose");
const User = require("../models/user.model");

module.exports.login = function (req, res, next) {
    User.findOne({
        $and: [
            { username: req.body?.username },
            { password: req.body?.password }
        ]
    }, { _id: 1, username: 1, password: 1, role: 1, status: 1 }).exec(function (err, user) {
        if (err)
            return res.status(400).json({ status: false, "message": err.toString() });
        if (user == null)
            return res.status(400).json({ status: false, "message": "Tài khoản hoặc mật khẩu không chính xác." });
        if (user.status != "ACTIVE")
            return res.status(400).json({ status: false, "message": "Tài khoản chưa được kích hoạt." });
        return res.json({
            status: true, "message": "Thành công", data: {
                ...user._doc,
                token: "EAAAAAAAAAAAAAAAAA...............",
            }
        });
    });
}

module.exports.register = function (req, res, next) {
    let schemaUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body?.username,
        password: req.body?.password,
        role: "USER",
        status: "ACTIVE",
        createAt: new Date().getTime(),
    });
    schemaUser.save(function (err) {
        if (err)
            return res.status(400).json({ status: false, message: err.toString() });
        return res.json({ status: true, message: "Thành công" });
    });
}