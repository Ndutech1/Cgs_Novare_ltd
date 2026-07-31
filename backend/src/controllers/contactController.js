const ContactMessage = require("../models/ContactMessage");

/**
 * Public: Submit contact form
 */
exports.sendMessage = async (req, res) => {
  const { name, email, phone, service, message } = req.body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: "Name, email and message are required." });
  }
  await ContactMessage.create({ name: name.trim(), email: email.trim().toLowerCase(), phone, service, message: message.trim() });

  res.status(201).json({
    success: true,
    message: "Message received successfully"
  });
};

/**
 * Admin: Get all inbox messages
 */
exports.getMessages = async (req, res) => {
  const messages = await ContactMessage.find()
    .sort({ createdAt: -1 });

  res.json(messages);
};

/**
 * Admin: Mark message as read
 */
exports.markAsRead = async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { status: "read" },
    { new: true }
  );

  res.json(message);
};

/**
 * Admin: Archive message
 */
exports.archiveMessage = async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { status: "archived" },
    { new: true }
  );

  res.json(message);
};

/**
 * Admin: Delete message
 */
exports.deleteMessage = async (req, res) => {
  await ContactMessage.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

exports.replyToMessage = async (req, res) => {
  return res.status(501).json({ message: "Email replies are not configured yet." });
};
exports.unreadCount = async (req, res) => {
  const count = await ContactMessage.countDocuments({ status: "unread" });
  res.json({ count });
};
