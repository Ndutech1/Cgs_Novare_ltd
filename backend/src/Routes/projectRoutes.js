//backend/src/Routes/ProjectRoutes.js
const router = require("express").Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const controller = require("../controllers/projectController");

router.get("/", controller.getProjects);
router.post("/", auth, upload.single("image"), controller.createProject);
router.put("/:id", auth, upload.single("image"), controller.updateProject);
router.delete("/:id", auth, controller.deleteProject);

module.exports = router;

