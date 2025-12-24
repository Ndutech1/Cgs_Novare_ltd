const GalleryImage = require("../models/GalleryImage");
const cloudinary = require("../config/cloudinary");

exports.createImage = async (req, res) => {
  const upload = await cloudinary.uploader.upload(req.file.path);

  const image = await GalleryImage.create({
    title: req.body.title,
    category: req.body.category,
    imageUrl: upload.secure_url
  });

  res.status(201).json(image);
};

exports.getImages = async (req, res) => {
  const images = await GalleryImage.find().sort({ createdAt: -1 });
  res.json(images);
};

exports.deleteImage = async (req, res) => {
  await GalleryImage.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
