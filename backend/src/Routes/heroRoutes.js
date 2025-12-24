//backend/src/Routes/heroRoutes.js
const router = require("express").Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const controller = require("../controllers/heroController");

router.get("/", controller.getHero);
router.put("/", auth, upload.single("image"), controller.updateHero);
router.delete("/:id", auth, controller.deleteHero);

module.exports = router;


