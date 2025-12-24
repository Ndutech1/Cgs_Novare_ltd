const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    client: String,
    category: String,
    description: String,
    results: String,
    imageUrl: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
