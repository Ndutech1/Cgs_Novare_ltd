//backend/controllers/heroController.js
const Hero = require("../models/Hero");
const cloudinary = require("../config/cloudinary");

const uploadMedia = async (files = []) => {
  const uploads = await Promise.all(
    files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: file.mimetype?.startsWith("video") ? "video" : "image"
      });

      return {
        url: result.secure_url,
        type: file.mimetype?.startsWith("video") ? "video" : "image"
      };
    })
  );

  return uploads;
};

// =====================
// CREATE HERO SLIDE
// =====================
exports.createHero = async (req, res) => {
  try {
    const { headline, subheadline } = req.body;
    const files = req.files?.length ? req.files : req.file ? [req.file] : [];

    if (!files.length) {
      return res.status(400).json({ message: "At least one media file is required" });
    }

    const media = await uploadMedia(files);

    const hero = await Hero.create({
      headline,
      subheadline,
      media,
      imageUrl: media[0]?.url || ""
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
    const files = req.files?.length ? req.files : req.file ? [req.file] : [];

    if (files.length) {
      const media = await uploadMedia(files);
      updateData.media = media;
      updateData.imageUrl = media[0]?.url || "";
    }

    const hero = await Hero.findByIdAndUpdate(req.body.id, updateData, {
      new: true
    });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: "Failed to update hero" });
  }
};