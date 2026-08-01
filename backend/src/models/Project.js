const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    client: String,
    category: String,
    location: String,
    servicesUsed: [String],
    description: String,
    results: String,
    images: [String] // ✅ MULTIPLE IMAGES
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
