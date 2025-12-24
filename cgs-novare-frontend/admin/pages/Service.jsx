//cgs-novare-frontend/admin/pages/Service.jsx
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

export default function Services() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: ""
  });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  /* ================= FETCH ================= */
  const fetchServices = async () => {
    const res = await API.get("/services");
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (image) formData.append("image", image);

    if (editingId) {
      await API.put(`/services/${editingId}`, formData);
    } else {
      await API.post("/services", formData);
    }

    setForm({ title: "", description: "" });
    setImage(null);
    setEditingId(null);
    fetchServices();
  };

  /* ================= ACTIONS ================= */
  const handleEdit = (service) => {
    setForm({
      title: service.title || "",
      description: service.description || ""
    });
    setEditingId(service._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await API.delete(`/services/${id}`);
    fetchServices();
  };

  /* ================= UI ================= */
  return (
    <Box sx={{ display: "flex", bgcolor: "background.default", minHeight: "100vh" }}>
      <Sidebar />

      <Box sx={{ p: 4, width: "100%" }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Services Management
        </Typography>

        {/* ===== FORM ===== */}
        <Card sx={{ p: 4, maxWidth: 720, mb: 6 }}>
          <Typography variant="h6" fontWeight={600}>
            {editingId ? "Edit Service" : "Add Service"}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <TextField
            fullWidth
            label="Service Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <ImageUpload onChange={(e) => setImage(e.target.files[0])} />

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            {editingId ? "Update Service" : "Add Service"}
          </Button>
        </Card>

        {/* ===== LIST ===== */}
        <Typography variant="h5" mb={2}>
          Existing Services
        </Typography>

        <Grid container spacing={3}>
          {services.map(service => (
            <Grid item xs={12} md={6} lg={4} key={service._id}>
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
                {service.imageUrl && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={service.imageUrl}
                    alt={service.title}
                  />
                )}

                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {service.title}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {service.description}
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(service)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(service._id)}
                    >
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
