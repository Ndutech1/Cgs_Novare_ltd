const router = require("express").Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const controller = require("../controllers/projectController");

router.get("/", controller.getProjects);
router.post("/", auth, upload.array("images", 6), controller.createProject);
router.put("/:id", auth, upload.array("images", 6), controller.updateProject);
router.delete("/:id", auth, controller.deleteProject);

module.exports = router;
