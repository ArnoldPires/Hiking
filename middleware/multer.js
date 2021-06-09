const multer = require("multer")
const path = require("path")

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname.toLowerCase())
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".gif" && ext !== ".webp" && ext !== ".avif") {
            cb(new Error("That image type isn't supported. Try uploading a .jpg or .png for example"), false)
            return
        }
        cb(null, true)
    }
})