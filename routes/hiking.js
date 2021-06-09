const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const trailController = require("../controllers/hiking-trails")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.get('/', trailController.getAllTrails)
router.post("/createTrail", ensureAuth, upload.single('file'), trailController.createTrail)
router.get("/:id", trailController.getTrailById)
router.put("/:id", trailController.getTrailById)
router.get("/updateTrail/:id", ensureAuth, trailController.getUpdate)
router.put("/updateTrail/:id", ensureAuth, trailController.putTrail)
router.delete("/deleteTrail/:id", ensureAuth, trailController.deleteTrail)
module.exports = router