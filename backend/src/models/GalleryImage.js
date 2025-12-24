const mongoose = require("mongoose");

const galleryImageSchema = new mongoose.Schema(
  {
    title: String,
    category: {
      type: String,
      enum: ["hero", "services", "marketing", "gallery"],
      default: "gallery"
    },
    imageUrl: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("GalleryImage", galleryImageSchema);
