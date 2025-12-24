const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

exports.createProject = async (req, res) => {
  let imageUrl;

  if (req.file) {
    const upload = await cloudinary.uploader.upload(req.file.path);
    imageUrl = upload.secure_url;
  }

  const project = await Project.create({
    ...req.body,
    imageUrl
  });

  res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

exports.updateProject = async (req, res) => {
  let updateData = req.body;

  if (req.file) {
    const upload = await cloudinary.uploader.upload(req.file.path);
    updateData.imageUrl = upload.secure_url;
  }

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json(project);
};

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
