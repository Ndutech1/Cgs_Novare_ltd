import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Tabs,
  Tab,
  Dialog,
  Container
} from "@mui/material";
import { fetchGalleryImages } from "../service/api";
import { motion } from "framer-motion";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGalleryImages()
      .then(setImages)
      .catch(() => setImages([]));
  }, []);

  const filtered =
    category === "all"
      ? images
      : images.filter(img => img.category === category);

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
        {/* Dynamic category tabs (includes requested filters like Construction, Design, Smart Home) */}
        <Tabs
          value={category}
          onChange={(e, v) => setCategory(v)}
          centered
          sx={{ mb: 4, overflowX: "auto" }}
        >
          {/* Build a set of categories from images and include common fallbacks */}
          {(() => {
            const fallbacks = ["construction", "design", "smart-home"];
            const set = new Set(images.map(i => (i.category || "gallery").toLowerCase()));
            fallbacks.forEach(f => set.add(f));
            // ensure projects/services/marketing/hero/gallery are present as well
            ["projects", "services", "marketing", "hero", "gallery"].forEach(f => set.add(f));
            const categories = ["all", ...Array.from(set)];
            const label = s => (s === "all" ? "All" : s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()));
            return categories.map(cat => <Tab key={cat} label={label(cat)} value={cat} />);
          })()}
        </Tabs>

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
