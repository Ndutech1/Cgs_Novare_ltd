const ContactMessage = require("../models/ContactMessage");

/**
 * Public: Submit contact form
 */
exports.sendMessage = async (req, res) => {
  const message = await ContactMessage.create(req.body);

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
  const { messageId, reply } = req.body;
  const msg = await ContactMessage.findById(messageId);

  await transporter.sendMail({
    to: msg.email,
    subject: "Reply from CGS Novare",
    html: `<p>${reply}</p>`
  });

  res.json({ success: true });
};
exports.unreadCount = async (req, res) => {
  const count = await ContactMessage.countDocuments({ status: "unread" });
  res.json({ count });
};
