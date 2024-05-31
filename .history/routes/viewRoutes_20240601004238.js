const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");

router.get("/", viewController.index);
router.get("/login", viewController.loginPage);
router.get("/register", viewController.registerPage);
router.get("/home", viewController.hme);
router.get("/logout", viewController.logout);

module.exports = router;
