const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

const uploadImages = async (files = []) => {
  return Promise.all(
    files.map(file =>
      cloudinary.uploader.upload(file.path).then(res => res.secure_url)
    )
  );
};

exports.createProject = async (req, res) => {
  const images = req.files ? await uploadImages(req.files) : [];

  const project = await Project.create({
    ...req.body,
    images
  });

  res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

exports.updateProject = async (req, res) => {
  const updateData = { ...req.body };

  if (req.files?.length) {
    updateData.images = await uploadImages(req.files);
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
