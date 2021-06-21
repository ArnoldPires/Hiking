const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const profileController = require("../controllers/profile");
const trailsController = require("../controllers/trails");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", trailsController.getAllTrails);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/profile", ensureAuth, trailsController.getTrails);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
module.exports = router;