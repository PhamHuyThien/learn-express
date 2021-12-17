const router = require("express").Router();

const userController = require("../controllers/api.user");

router.get("/", userController.userInfo);
router.put("/change-password", userController.changePassword);

module.exports = router;
