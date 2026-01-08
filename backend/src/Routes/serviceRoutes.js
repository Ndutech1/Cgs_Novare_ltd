//backend/src/Routes/serviceRoutes.js
const router = require("express").Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const controller = require("../controllers/serviceController");

router.get("/", controller.getServices);
router.post("/", auth, upload.array("images", 6), controller.createService);
router.put("/:id", auth, upload.array("images", 6), controller.updateService);
router.delete("/:id", auth, controller.deleteService);

module.exports = router;

