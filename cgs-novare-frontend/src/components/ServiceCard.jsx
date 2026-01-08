// cgs-novare-frontend/src/components/ServiceCard.jsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Collapse,
  Dialog
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import BuildIcon from "@mui/icons-material/Build";
import { useState } from "react";
import "swiper/css";

export default function ServiceCard({ service }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);

  // TEMP fallback until backend supports multiple images
  const images = service.images?.length
    ? service.images
    : [service.imageUrl || "/default/3.jpg"];

  // Auto bullet generation
  const bullets = service.description
    ?.split("\n")
    .map(l => l.trim())
    .filter(Boolean);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 4 }}>

          {/* IMAGE SLIDER (CROPPED & ALIGNED) */}
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={images.length > 1}
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <Box
                  component="img"
                  src={img}
                  alt={service.title}
                  onClick={() => setPreview(img)}
                  sx={{
                    width: "100%",
                    height: 220,
                    objectFit: "cover",     // ✅ CROPS LARGE IMAGES
                    cursor: "pointer"
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <CardContent>
            <Chip
              icon={<BuildIcon />}
              label={service.category || "Service"}
              color="primary"
              sx={{ mb: 1, fontWeight: 700 }}
            />

            <Typography variant="h6" fontWeight={700}>
              {service.title}
            </Typography>

            {/* COLLAPSIBLE DESCRIPTION */}
            <Collapse in={open} collapsedSize={72}>
              <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                {bullets?.map((line, i) => (
                  <Typography
                    key={i}
                    component="li"
                    variant="body2"
                    sx={{ textAlign: "justify", mb: 0.8 }}
                  >
                    {line}
                  </Typography>
                ))}
              </Box>
            </Collapse>

            <Button
              size="small"
              sx={{ mt: 1, fontWeight: 600 }}
              onClick={() => setOpen(!open)}
            >
              {open ? "Show less" : "Learn more →"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* IMAGE PREVIEW */}
      <Dialog open={Boolean(preview)} onClose={() => setPreview(null)} maxWidth="md">
        <Box
          component="img"
          src={preview}
          sx={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
        />
      </Dialog>
    </>
  );
}
