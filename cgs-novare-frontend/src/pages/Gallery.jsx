import { useEffect, useMemo, useState } from "react";
import { Box, Typography, Grid, Dialog, Container, Chip, Stack, Button, Paper } from "@mui/material";
import { fetchGalleryImages } from "../service/api";
import { motion } from "framer-motion";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGalleryImages().then(setImages).catch(() => setImages([]));
  }, []);

  const normalize = (s) => (s || "gallery").toString().trim().toLowerCase().replace(/\s+/g, "-");

  const categories = useMemo(() => {
    const fallback = ["construction", "design", "smart-home", "projects", "services", "marketing", "hero", "gallery"];
    const set = new Set(images.map((img) => normalize(img.category)));
    fallback.forEach((item) => set.add(item));
    return Array.from(set);
  }, [images]);

  const filtered = selectedCategories.length === 0 ? images : images.filter((img) => selectedCategories.includes(normalize(img.category)));

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "rgba(255, 255, 255, 0.82)", backdropFilter: "blur(16px)" }}>
        <Container sx={{ py: { xs: 7, md: 10 } }}>
          <Typography variant="caption" color="primary.main" sx={{ display: "block", mb: 2 }}>
            // 004_VISUAL_ARCHIVE
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, maxWidth: 720 }}>
            Project snapshots and visual references.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 760, lineHeight: 1.8 }}>
            Browse operational photos, design references and delivery views from our portfolio.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4, flexWrap: "wrap" }}>
            <Chip label="All" clickable color={selectedCategories.length === 0 ? "primary" : "default"} onClick={() => setSelectedCategories([])} />
            {categories.map((cat) => {
              const active = selectedCategories.includes(cat);
              return (
                <Chip
                  key={cat}
                  label={cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  clickable
                  color={active ? "primary" : "default"}
                  onClick={() => setSelectedCategories((curr) => (active ? curr.filter((item) => item !== cat) : [...curr, cat]))}
                />
              );
            })}
            {selectedCategories.length > 0 && <Button size="small" onClick={() => setSelectedCategories([])}>Clear</Button>}
          </Stack>
        </motion.div>

        <Grid container spacing={3}>
          {filtered.map((img, index) => (
            <Grid item xs={12} sm={6} md={4} key={img.imageUrl || index}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.06 }} viewport={{ once: true }}>
                <Paper sx={{ overflow: "hidden" }}>
                  <Box component="img" src={img.imageUrl} alt={img.title || "Gallery"} sx={{ width: "100%", height: 260, objectFit: "cover", cursor: "pointer" }} onClick={() => setSelectedImage(img.imageUrl)} />
                  <Box sx={{ p: 2.5 }}>
                    <Typography variant="h6">{img.title || "Project reference"}</Typography>
                    <Typography variant="body2" color="text.secondary">{img.category || "Gallery"}</Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {!filtered.length && <Typography textAlign="center" color="text.secondary" sx={{ py: 7 }}>No images are available in this category yet.</Typography>}
      </Container>

      <Dialog open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)} maxWidth="md">
        <Box component="img" src={selectedImage} sx={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }} />
      </Dialog>
    </Box>
  );
}
