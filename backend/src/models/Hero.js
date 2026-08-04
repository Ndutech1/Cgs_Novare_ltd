//backend/src/models/Hero.js
const mongoose = require("mongoose");

const mediaItemSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], default: "image" }
  },
  { _id: false }
);

const heroSchema = new mongoose.Schema(
  {
    headline: {
      type: String,
      required: true
    },
    subheadline: {
      type: String,
      required: true
    },
    media: [mediaItemSchema],
    imageUrl: {
      type: String,
      default: ""
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", heroSchema);




