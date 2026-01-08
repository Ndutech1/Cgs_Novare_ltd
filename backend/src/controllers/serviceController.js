// backend/src/controllers/serviceController.js
const Service = require("../models/Service");
const cloudinary = require("../config/cloudinary");

const uploadImages = async (files = []) => {
  const uploads = await Promise.all(
    files.map(file =>
      cloudinary.uploader.upload(file.path).then(res => res.secure_url)
    )
  );
  return uploads;
};

exports.createService = async (req, res) => {
  const images = req.files ? await uploadImages(req.files) : [];

  const service = await Service.create({
    ...req.body,
    images
  });

  res.status(201).json(service);
};

exports.getServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
};

exports.updateService = async (req, res) => {
  const updateData = { ...req.body };

  if (req.files?.length) {
    updateData.images = await uploadImages(req.files);
  }

  const service = await Service.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json(service);
};

exports.deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
