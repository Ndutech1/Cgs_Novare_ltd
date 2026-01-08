//backend/src/Routes/galleryRoutes.js
const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const controller = require("../controllers/galleryController");


router.post("/", auth, upload.single("image"), controller.createImage);
router.delete("/:id", auth, controller.deleteImage);
router.get("/all", controller.getUnifiedGallery);

module.exports = router;

