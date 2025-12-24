//backend/src/Routes/authRoutes.js
const router = require("express").Router();
const { login, changePassword, forgotPassword, resetPassword } = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/login", login);
router.post("/change-password", auth, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
