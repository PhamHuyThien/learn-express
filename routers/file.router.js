const router = require("express").Router();
const upload = require("../utils/upload.multer");

const fileController = require("../controllers/file.controller");

router.post("/upload", upload.single('file'), fileController.upload);
router.post("/uploads", upload.array('file', 12), fileController.uploads);
router.get("/:id", fileController.get);

module.exports = router;