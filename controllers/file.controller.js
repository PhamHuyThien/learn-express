const fs = require("fs");
const path = require("path");
const mime = require("mime");

module.exports.upload = async function (req, res) {
    if (req.file == null)
        return res.status(400).json({ status: false, message: "Phải có file upload." });
    let path = req.baseUrl.replaceAll("upload", "");
    return res.json({
        status: true,
        message: "Thành công.",
        data: {
            ...req.file,
            destination: path,
            path: path + "/" + req.file.filename
        }
    });
}

module.exports.uploads = async function (req, res) {
    if (req.files.length == 0)
        return res.status(400).json({ status: false, message: "Phải có ít nhất một file upload." });
    let path = req.baseUrl.replaceAll("upload", "");
    return res.json({
        status: true,
        message: "Thành công.",
        data: req.files.map(file => ({
            ...file,
            destination: path,
            path: path + "/" + file.filename
        })),
    });
}

module.exports.get = async function (req, res) {
    let filename = process.env.UPLOAD_DIR + "/" + req.params?.id;
    if (!fs.existsSync(filename))
        return res.json({ status: false, message: "File không tồn tại." });
    const bin = fs.readFileSync(filename);
    res.contentType(mime.getType(path.extname(filename))).send(bin);
}