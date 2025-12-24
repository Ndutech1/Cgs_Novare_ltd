//Backend/src/model/Hero.js
const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  headline: String,
  subheadline: String,
  imageUrl: String
});

module.exports = mongoose.model("Hero", heroSchema);

