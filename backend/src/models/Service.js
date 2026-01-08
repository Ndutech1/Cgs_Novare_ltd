// backend/src/models/Service.js
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: String,
    images: [String] // ✅ MULTIPLE IMAGES
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);

