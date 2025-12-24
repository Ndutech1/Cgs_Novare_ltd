const Service = require("../models/Service");
const cloudinary = require("../config/cloudinary");

exports.createService = async (req, res) => {
  let imageUrl;

  if (req.file) {
    const upload = await cloudinary.uploader.upload(req.file.path);
    imageUrl = upload.secure_url;
  }

  const service = await Service.create({
    ...req.body,
    imageUrl
  });

  res.status(201).json(service);
};

exports.getServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
};

exports.updateService = async (req, res) => {
  let updateData = req.body;

  if (req.file) {
    const upload = await cloudinary.uploader.upload(req.file.path);
    updateData.imageUrl = upload.secure_url;
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
