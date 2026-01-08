const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const controller = require("../controllers/heroController");

// Get all hero slides
router.get("/", controller.getHeroes);

// Create hero slide
router.post("/", auth, upload.single("image"), controller.createHero);

// Update hero slide
router.put("/", auth, upload.single("image"), controller.updateHero);

// Delete hero slide
router.delete("/:id", auth, controller.deleteHero);

module.exports = router;
