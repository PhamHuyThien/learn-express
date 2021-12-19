const router = require("express").Router();

const songController = require("../controllers/song.controller");

router.get("/search", songController.searchSong);
router.get("/detail", songController.detailSong);

router.get("/", songController.getSongs);
router.get("/:id", songController.getSong);
router.post("/", songController.postSong);
router.put("/:id", songController.updateSong);
router.delete("/:id", songController.deleteSong);


module.exports = router;