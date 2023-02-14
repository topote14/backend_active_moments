const { Router } = require("express");
const router = Router();

const loginController = require("../controllers/login");
const registerController = require("../controllers/register");

router.post("/register", registerController);
router.post("/login", loginController)

module.exports = router;
