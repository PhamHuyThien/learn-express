const multer = require('multer');
const path = require('path');
const md5 = require("md5");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
        let currentTime = new Date().getTime();
        let name = file.originalname + "BOTHIENDEPTRAI";
        cb(null, md5(currentTime + name) + path.extname(file.originalname));
    }
});

module.exports = multer({ storage: storage });