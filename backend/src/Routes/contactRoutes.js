//backend/src/ROutes/contactRoutes.js
const express = require("express");
const router = require("express").Router();
const contactController = require("../controllers/contactController");
const auth = require("../middleware/auth");

router.post("/", contactController.sendMessage);

// Admin Inbox
router.get("/", auth, contactController.getMessages);
router.patch("/:id/read", auth, contactController.markAsRead);
router.patch("/:id/archive", auth, contactController.archiveMessage);
router.delete("/:id", auth, contactController.deleteMessage);
router.post("/:reply", auth, contactController.replyToMessage);
router.get("/:unread-count", auth, contactController.unreadCount);
module.exports = router;

