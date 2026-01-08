//backend/src/models/Hero.js
const mongoose = require("mongoose");

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
    imageUrl: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", heroSchema);




