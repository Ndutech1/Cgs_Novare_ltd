//backend/src/models/GalleryImage.js
const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema(
  {
    title: String,
    category: {
      type: String,
      enum: ["hero", "services", "marketing", "gallery", "projects", "construction", "design", "smart-home"],
      default: "gallery"
    },
    // NOTE: categories are free-form labels that should match the frontend filters.
    // Added common categories: projects, construction, design, smart-home.
    imageUrl: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("GalleryImage", galleryImageSchema);
