import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../services/adminApi";

export default function HeroAdmin() {
  const [heroes, setHeroes] = useState([]);
  const [slides, setSlides] = useState([
    { headline: "", subheadline: "", mediaFiles: [] }
  ]);

  const fetchHeroes = async () => {
    const { data } = await API.get("/hero");
    setHeroes(data);
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleSlideChange = (index, field, value) => {
    const newSlides = [...slides];
    newSlides[index][field] = value;
    setSlides(newSlides);
  };

  const handleFileChange = (index, files) => {
    const newSlides = [...slides];
    newSlides[index].mediaFiles = Array.from(files || []);
    setSlides(newSlides);
  };

  const addSlide = () => {
    setSlides([...slides, { headline: "", subheadline: "", mediaFiles: [] }]);
  };

  const removeSlide = (index) => {
    const newSlides = [...slides];
    newSlides.splice(index, 1);
    setSlides(newSlides);
  };

  const submit = async () => {
    try {
      for (const slide of slides) {
        if (!slide.mediaFiles.length) {
          alert("Each slide must include at least one image or video.");
          return;
        }

        const formData = new FormData();
        formData.append("headline", slide.headline);
        formData.append("subheadline", slide.subheadline);
        slide.mediaFiles.forEach((file) => formData.append("media", file));

        await API.post("/hero", formData);
      }

      setSlides([{ headline: "", subheadline: "", mediaFiles: [] }]);
      fetchHeroes();
    } catch (err) {
      console.error("Failed to upload hero slides:", err);
    }
  };

  const remove = async (id) => {
    try {
      await API.delete(`/hero/${id}`);
      fetchHeroes();
    } catch (err) {
      console.error("Failed to delete hero slide:", err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>Hero Slides</Typography>

      <Card sx={{ p: 3, maxWidth: 800 }}>
        <Stack spacing={3}>
          {slides.map((slide, index) => (
            <Card key={index} sx={{ p: 2 }}>
              <Stack spacing={2}>
                <TextField
                  label="Headline"
                  value={slide.headline}
                  onChange={(e) => handleSlideChange(index, "headline", e.target.value)}
                />
                <TextField
                  label="Subheadline"
                  value={slide.subheadline}
                  onChange={(e) => handleSlideChange(index, "subheadline", e.target.value)}
                  multiline
                />
                <Button component="label" variant="outlined">
                  Upload Images or Motion Clips
                  <input
                    hidden
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => handleFileChange(index, e.target.files)}
                  />
                </Button>
                {slide.mediaFiles.length > 0 && (
                  <Typography variant="body2" color="text.secondary">
                    Selected: {slide.mediaFiles.map((file) => file.name).join(", ")}
                  </Typography>
                )}
                {slides.length > 1 && (
                  <Button color="error" variant="outlined" onClick={() => removeSlide(index)}>
                    Remove Slide
                  </Button>
                )}
              </Stack>
            </Card>
          ))}

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={addSlide}>Add Another Slide</Button>
            <Button variant="contained" color="success" onClick={submit}>Upload All Slides</Button>
          </Stack>
        </Stack>
      </Card>

      <Stack mt={4} spacing={2}>
        {heroes.map((h) => (
          <Card key={h._id} sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
            <Typography>{h.headline}</Typography>
            <IconButton color="error" onClick={() => remove(h._id)}>
              <DeleteIcon />
            </IconButton>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
