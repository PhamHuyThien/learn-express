module.exports.userInfo = async function (req, res) {
    return res.json({ status: true, message: "Thành công", data: res.locals });
}