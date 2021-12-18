const User = require("../models/user.model");


module.exports.listUser = async function (req, res) {
    User.find({}, { _id: 1, username: 1, role: 1, status: 1, createAt: 1, updateAt: 1, disableAt: 1 }, function (err, users) {
        if (err)
            return res.status(400).json({ status: false, message: err.toString() });
        return res.json({ status: true, message: "Thành công.", data: users });
    }).skip(req.query.page * req.query.size).limit(req.query.size);
}

module.exports.updateUser = async function (req, res) {
    const _id = req.params?.id;
    User.findOneAndUpdate({ _id: _id }, {
        $set: {
            role: req.body?.role,
            status: req.body?.status,
            updateAt: new Date().getTime()
        }
    }, { new: true }).then(function (user) {
        if (user == null)
            return res.status(400).json({ status: false, message: "Tài khoản không tồn tại." });
        delete user._doc.password;
        return res.json({ status: true, message: "Thành công.", data: user });
    }).catch(function (err) {
        return res.status(400).json({ status: false, message: err.toString() });
    });
}

module.exports.deleteUser = async function (req, res) {
    const _id = req.params?.id;
    User.findOneAndDelete({ _id: _id }, {}).then(function (user) {
        if (user == null)
            return res.status(400).json({ status: false, message: "Tài khoản không tồn tại." });
        delete user._doc.password;
        return res.json({ status: true, message: "Thành công.", data: user });
    }).catch(function (err) {
        return res.status(400).json({ status: false, message: err.toString() });
    });
}