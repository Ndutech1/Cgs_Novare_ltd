const Hero = require("../models/Hero");
const cloudinary = require("../config/cloudinary");

exports.updateHero = async (req, res) => {
  const { headline, subheadline } = req.body;

  let imageUrl;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    imageUrl = result.secure_url;
  }

  const hero = await Hero.findOneAndUpdate(
    {},
    { headline, subheadline, imageUrl },
    { upsert: true, new: true }
  );

  res.json(hero);
};

exports.getHero = async (req, res) => {
  const hero = await Hero.findOne({});
  res.json(hero);
};

exports.deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);
    if (!hero) return res.status(404).json({ success: false, message: "Hero not found" });
    res.json({ success: true, message: "Hero deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
