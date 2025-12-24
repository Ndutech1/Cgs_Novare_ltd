const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    service: String,
    message: {
      type: String,
      required: true
    },

    // system / admin
    type: {
      type: String,
      enum: ["contact", "password-reset"],
      default: "contact"
    },

    // CMS inbox features
    status: {
      type: String,
      enum: ["unread", "read", "archived"],
      default: "unread"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
