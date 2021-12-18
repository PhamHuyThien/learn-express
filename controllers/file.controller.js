const fs = require("fs");
const path = require("path");
const mime = require("mime");

module.exports.upload = async function (req, res) {
    if (req.file == null)
        return res.status(400).json({ status: false, message: "Phải có file upload." });
    res.json(req.file);
}

module.exports.uploads = async function (req, res) {

}

module.exports.get = async function (req, res) {
    let filename = process.env.UPLOAD_DIR + "/" + req.params?.id;
    if (!fs.existsSync(filename))
        return res.json({ status: false, message: "File không tồn tại." });
    const bin = fs.readFileSync(filename);
    res.contentType(mime.getType(path.extname(filename))).send(bin);
}