const router = require("express").Router();

const authController = require("../controllers/api.auth");

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
