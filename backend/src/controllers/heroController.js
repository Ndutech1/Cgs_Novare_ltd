//backend/controllers/heroController.js
const Hero = require("../models/Hero");
const cloudinary = require("../config/cloudinary");

// =====================
// CREATE HERO SLIDE
// =====================
exports.createHero = async (req, res) => {
  try {
    const { headline, subheadline } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const hero = await Hero.create({
      headline,
      subheadline,
      imageUrl: result.secure_url
    });

    res.status(201).json(hero);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create hero" });
  }
};

// =====================
// GET ALL HERO SLIDES
// =====================
exports.getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ createdAt: -1 });
    res.json(heroes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch heroes" });
  }
};

// =====================
// DELETE HERO SLIDE
// =====================
exports.deleteHero = async (req, res) => {
  try {
    await Hero.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete hero" });
  }
};

// =====================
// UPDATE HERO SLIDE
// =====================
exports.updateHero = async (req, res) => {
  try {
    const { headline, subheadline } = req.body;
    const updateData = { headline, subheadline };
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.imageUrl = result.secure_url;
    }
    const hero = await Hero.findByIdAndUpdate(req.body.id, updateData, {
      new: true
    });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: "Failed to update hero" });
  } 
};