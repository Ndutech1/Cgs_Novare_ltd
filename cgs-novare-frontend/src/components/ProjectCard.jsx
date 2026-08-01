import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Collapse
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";

export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);

  const images = project.images?.length
    ? project.images
    : ["/default/project_placeholder.jpg"];

  const bullets = project.description?.split("\n").filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 4 }}>

        {/* IMAGE PREVIEW / CROPPED SLIDER */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={images.length > 1}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <Box
                sx={{
                  height: 160,
                  width: "100%",
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",          // ✅ CROPS
                  backgroundPosition: "center",     // ✅ ALIGNS
                  backgroundRepeat: "no-repeat",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <CardContent sx={{ p:2 }}>
          <Chip
            icon={<WorkIcon />}
            label={project.client || "Project"}
            color="secondary"
            sx={{ mb: 1, fontWeight: 700 }}
          />

          <Typography variant="h6" fontWeight={700}>
            {project.title}
          </Typography>

          {project.category && (
            <Typography variant="caption" color="text.secondary">
              {project.category}
            </Typography>
          )}

          {project.location && (
            <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: .5, mt: 1 }}>
              <LocationOnOutlinedIcon fontSize="small" /> {project.location}
            </Typography>
          )}

          {/* DESCRIPTION */}
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

          {project.servicesUsed?.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: .75, mt: 2 }}>
              {project.servicesUsed.map(service => <Chip key={service} size="small" variant="outlined" label={service} />)}
            </Box>
          )}

          {project.results && (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="caption"
                fontWeight={600}
                color="success.main"
              >
                Key Outcome
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "justify" }}>
                {project.results}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
