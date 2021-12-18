const router = require("express").Router();

const userController = require("../controllers/user.controller");

router.get("/", userController.userInfo);
router.put("/change-password", userController.changePassword);

module.exports = router;
