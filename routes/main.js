const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const profileController = require("../controllers/profile");
const trailController = require("../controllers/hiking-trails");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", trailController.getAllPersons);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/profile", ensureAuth, trailController.getTrails);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
module.exports = router;