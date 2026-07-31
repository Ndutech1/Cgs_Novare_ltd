//backend/src/controllers/galleryController.js
const GalleryImage = require("../models/GalleryImage");
const Project = require("../models/Project");
const Service = require("../models/Service");
const cloudinary = require("../config/cloudinary");

exports.createImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "An image is required" });
  const upload = await cloudinary.uploader.upload(req.file.path);

  const image = await GalleryImage.create({
    title: req.body.title,
    category: req.body.category,
    imageUrl: upload.secure_url
  });

  res.status(201).json(image);
};


exports.deleteImage = async (req, res) => {
  await GalleryImage.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

exports.getUnifiedGallery = async (req, res) => {
  const [gallery, projects, services] = await Promise.all([
    GalleryImage.find(),
    Project.find(),
    Service.find()
  ]);

  const projectImages = projects.flatMap(p =>
    (p.images || []).map(img => ({
      imageUrl: img,
      category: "projects",
      title: p.title,
      source: "project"
    }))
  );

  const serviceImages = services.flatMap(s =>
    (s.images || []).map(imageUrl => ({ imageUrl, category: "services", title: s.title, source: "service" }))
  );

  const galleryImages = gallery.map(g => ({
      imageUrl: g.imageUrl,
      category: g.category,
      title: g.title,
      _id: g._id,
      source: "gallery"
  }));

  res.json([
    ...projectImages,
    ...serviceImages,
    ...galleryImages
  ]);
};
