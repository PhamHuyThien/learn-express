const router = require("express").Router();

const paginationMid = require("../mids/pagination");
const adminController = require("../controllers/api.admin");

router.get("/user", paginationMid, adminController.listUser);
router.put("/user/:id", adminController.updateUser);
router.delete("/user/:id", adminController.deleteUser);

module.exports = router;