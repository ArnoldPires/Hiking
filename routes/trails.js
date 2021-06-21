const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const trailsController = require("../controllers/trails")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.get('/', trailsController.getAllTrails)
router.post("/createTrail", ensureAuth, upload.single('file'), trailsController.createTrail)
router.get("/:id", trailsController.getTrailById)
router.put("/:id", trailsController.getTrailById)
router.get("/updateTrail/:id", ensureAuth, trailsController.getUpdate)
router.put("/updateTrail/:id", ensureAuth, trailsController.putTrail)
router.delete("/deleteTrail/:id", ensureAuth, trailsController.deleteTrail)
module.exports = router