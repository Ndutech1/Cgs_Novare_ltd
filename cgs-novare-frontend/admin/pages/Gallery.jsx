import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../services/adminApi";
import Sidebar from "../components/Sidebar";
import ImageUpload from "../components/ImageUpload";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("gallery");
  const [file, setFile] = useState(null);

  const loadImages = async () => {
    const res = await API.get("/gallery");
    setImages(res.data);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("image", file);
    await API.post("/gallery", formData);
    setFile(null);
    loadImages();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete image?")) return;
    await API.delete(`/gallery/${id}`);
    loadImages();
  };

  return (
    <Box sx={{ display: "flex", bgcolor: "background.default", minHeight: "100vh" }}>
      <Sidebar />

      <Box sx={{ p: 4, width: "100%" }}>
        <Card sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" fontWeight={600}>
            Gallery Manager
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
            <Select value={category} onChange={e => setCategory(e.target.value)}>
              <MenuItem value="hero">Hero</MenuItem>
              <MenuItem value="services">Services</MenuItem>
              <MenuItem value="marketing">Marketing</MenuItem>
              <MenuItem value="gallery">Gallery</MenuItem>
            </Select>

            <ImageUpload onChange={e => setFile(e.target.files[0])} />

            <Button variant="contained" onClick={uploadImage}>
              Upload
            </Button>
          </Box>
        </Card>

        <Grid container spacing={3}>
          {images.map(img => (
            <Grid item xs={12} md={4} key={img._id}>
              <Card
                sx={{
                  overflow: "hidden",
                  transition: ".3s",
                  "&:hover": {
                    transform: "scale(1.04)",
                    boxShadow: 8
                  }
                }}
              >
                <CardMedia component="img" height="200" image={img.imageUrl} />
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="body2">{img.category}</Typography>
                  <IconButton color="error" onClick={() => remove(img._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
