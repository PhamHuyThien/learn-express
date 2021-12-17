const bcrypt = require("bcrypt");
const User = require("../models/user");
const regex = require("../utils/regex.const");

module.exports.userInfo = async function (req, res) {
    return res.json({ status: true, message: "Thành công.", data: res.locals });
}

module.exports.changePassword = async function (req, res) {
    if (!regex.REGEX_PASSWORD.test(req.body?.oldPassword))
        return res.status(400).json({ status: false, message: "Mật khẩu cũ không hợp lệ." });
    if (!regex.REGEX_PASSWORD.test(req.body?.newPassword))
        return res.status(400).json({ status: false, message: "Mật khẩu mới không hợp lệ." });
    User.findOne({ _id: res.locals.user._id }, { password: 1 }, function (err, user) {
        if (err)
            return res.json({ status: false, message: err.toString() });
        if (!bcrypt.compareSync(req.body.oldPassword, user.password))
            return res.json({ status: false, message: "Mật khẩu cũ không chính xác." });
        User.updateOne({ _id: res.locals.user._id }, { $set: { password: bcrypt.hashSync(req.body.newPassword, 10) } });
        return res.json({ status: true, message: "Đổi mât khẩu thành công." });
    });
}