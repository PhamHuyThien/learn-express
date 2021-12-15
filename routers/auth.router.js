const router = require("express").Router();

const loginController = require("../controllers/login.controller");

router.get("/login", loginController.login);

module.exports = router;