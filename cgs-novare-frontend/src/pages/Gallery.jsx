import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Dialog,
  Container,
  Chip,
  Stack,
  Button
} from "@mui/material";
import { fetchGalleryImages } from "../service/api";
import { motion } from "framer-motion";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // empty array => show all
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGalleryImages()
      .then(setImages)
      .catch(() => setImages([]));
  }, []);

  const normalize = (s) => (s || "gallery").toString().trim().toLowerCase().replace(/\s+/g, "-");

  const filtered = selectedCategories.length === 0
    ? images
    : images.filter(img => selectedCategories.includes(normalize(img.category)));

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          background: "linear-gradient(135deg,#1976d2,#00c853)",
          color: "#fff",
          clipPath: "ellipse(100% 100% at 50% 0%)"
        }}
      >
        <Typography variant="h3" fontWeight={800}>
          Gallery
        </Typography>
        <Typography sx={{ mt: 2 }}>
          A visual overview of our projects, services, and operations.
        </Typography>
      </Box>

      <Container sx={{ py: 6 }}>
        {/* Category filters (multi-select chips) */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden:{opacity:0,y:20}, visible:{opacity:1,y:0} }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3, flexWrap: "wrap" }}>
            <Chip
              label="All"
              clickable
              color={selectedCategories.length === 0 ? "primary" : "default"}
              onClick={() => setSelectedCategories([])}
            />
            {(() => {
              const fallbacks = ["construction", "design", "smart-home"];
              const set = new Set(images.map(i => normalize(i.category)));
              fallbacks.forEach(f => set.add(f));
              ["projects", "services", "marketing", "hero", "gallery"].forEach(f => set.add(f));
              const categories = Array.from(set);
              const label = s => s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
              return categories.map(cat => {
                const active = selectedCategories.includes(cat);
                return (
                  <Chip
                    key={cat}
                    label={label(cat)}
                    color={active ? "primary" : "default"}
                    clickable
                    onClick={() => setSelectedCategories(curr => active ? curr.filter(c => c !== cat) : [...curr, cat])}
                  />
                );
              });
            })()}
            {selectedCategories.length > 0 && <Button size="small" onClick={() => setSelectedCategories([])}>Clear</Button>}
          </Stack>
        </motion.div>

        <Grid container spacing={3}>
          {filtered.map((img, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Box
                  component="img"
                  src={img.imageUrl}
                  alt={img.title || "Gallery"}
                  sx={{
                    width: "100%",
                    height: 260,
                    objectFit: "cover",
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.04)" }
                  }}
                  onClick={() => setSelectedImage(img.imageUrl)}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
        {!filtered.length && <Typography textAlign="center" color="text.secondary" sx={{ py: 7 }}>No images are available in this category yet.</Typography>}
      </Container>

      <Dialog
        open={Boolean(selectedImage)}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
      >
        <Box component="img" src={selectedImage} sx={{ width: "100%" }} />
      </Dialog>
    </Box>
  );
}
