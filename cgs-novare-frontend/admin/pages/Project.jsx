//cgs-novare-frontend/admin/pages/project.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Grid,
  Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import API from "../services/adminApi";
import Sidebar from "../components/Sidebar";
import ImageUpload from "../components/ImageUpload";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    client: "",
    category: "",
    description: "",
    results: ""
  });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (image) formData.append("image", image);

    editingId
      ? await API.put(`/projects/${editingId}`, formData)
      : await API.post("/projects", formData);

    setForm({
      title: "",
      client: "",
      category: "",
      description: "",
      results: ""
    });
    setImage(null);
    setEditingId(null);
    fetchProjects();
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title || "",
      client: project.client || "",
      category: project.category || "",
      description: project.description || "",
      results: project.results || ""
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "background.default", minHeight: "100vh" }}>
      <Sidebar />

      <Box sx={{ p: 4, width: "100%" }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Projects Management
        </Typography>

        {/* FORM */}
        <Card sx={{ p: 4, maxWidth: 720, mb: 6 }}>
          <Typography variant="h6" fontWeight={600}>
            {editingId ? "Edit Project" : "Add Project"}
          </Typography>
          <Divider sx={{ my: 2 }} />

          <TextField fullWidth label="Project Title" name="title" value={form.title} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Client" name="client" value={form.client} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Category" name="category" value={form.category} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Description" name="description" multiline rows={3} value={form.description} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Results / Impact" name="results" multiline rows={2} value={form.results} onChange={handleChange} sx={{ mb: 2 }} />

          <ImageUpload onChange={(e) => setImage(e.target.files[0])} />

          <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
            {editingId ? "Update Project" : "Add Project"}
          </Button>
        </Card>

        {/* PROJECTS LIST */}
        <Typography variant="h5" mb={2}>
          Existing Projects
        </Typography>

        <Grid container spacing={3}>
          {projects.map(project => (
            <Grid item xs={12} md={6} lg={4} key={project._id}>
              <Card
                sx={{
                  height: "100%",
                  transition: ".3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 8
                  }
                }}
              >
                {project.imageUrl && (
                  <CardMedia component="img" height="180" image={project.imageUrl} />
                )}

                <CardContent>
                  <Typography variant="h6">{project.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.category} {project.client && `• ${project.client}`}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {project.description}
                  </Typography>

                  <Typography variant="caption" color="success.main">
                    {project.results}
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    <IconButton color="primary" onClick={() => handleEdit(project)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(project._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

