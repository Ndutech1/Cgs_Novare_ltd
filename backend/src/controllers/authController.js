const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const crypto = require("crypto");
const ContactMessage = require("../models/ContactMessage");


exports.login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.adminId);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  const isMatch = await bcrypt.compare(currentPassword, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Current password incorrect" });
  }

  admin.password = newPassword;
  await admin.save();

  res.json({ success: true, message: "Password changed successfully" });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    // security: do not reveal existence
    return res.json({ message: "If email exists, request received" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  admin.resetToken = token;
  admin.resetTokenExpiry = Date.now() + 60 * 60 * 1000;
  await admin.save();

  // 📨 CREATE INBOX MESSAGE (NO EMAIL)
  await ContactMessage.create({
    name: "SYSTEM",
    email,
    service: "Admin Password Reset",
    type: "password-reset",
    message: `Password reset requested for admin account.`,
    meta: {
      resetToken: token,
      expires: admin.resetTokenExpiry
    }
  });

  res.json({
    success: true,
    message: "Password reset request sent to admin inbox"
  });
};


exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  const admin = await Admin.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!admin) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  admin.password = newPassword;
  admin.resetToken = undefined;
  admin.resetTokenExpiry = undefined;
  await admin.save();

  res.json({ success: true, message: "Password reset successful" });
};
