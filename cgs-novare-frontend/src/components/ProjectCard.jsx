import { Typography, Box, Chip, Button, Collapse, Paper } from "@mui/material";
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

  const images = project.images?.length ? project.images : ["/default/project_placeholder.jpg"];
  const bullets = project.description?.split("\n").filter(Boolean);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.01 }} transition={{ duration: 0.4 }} viewport={{ once: true }}>
      <Paper sx={{ height: "100%", overflow: "hidden" }}>
        <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4000, disableOnInteraction: false }} pagination={{ clickable: true }} loop={images.length > 1}>
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <Box sx={{ height: 170, width: "100%", backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Box sx={{ p: 2.25 }}>
          <Chip icon={<WorkIcon />} label={project.client || "Project"} color="secondary" sx={{ mb: 1, fontWeight: 700 }} />
          <Typography variant="h6" fontWeight={700}>{project.title}</Typography>
          {project.category && <Typography variant="caption" color="text.secondary">{project.category}</Typography>}
          {project.location && (
            <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
              <LocationOnOutlinedIcon fontSize="small" /> {project.location}
            </Typography>
          )}

          <Collapse in={open} collapsedSize={72}>
            <Box component="ul" sx={{ pl: 2, mt: 1 }}>
              {bullets?.map((line, i) => (
                <Typography key={i} component="li" variant="body2" sx={{ textAlign: "justify", mb: 0.8 }}>
                  {line}
                </Typography>
              ))}
            </Box>
          </Collapse>

          <Button size="small" sx={{ mt: 1, fontWeight: 600 }} onClick={() => setOpen(!open)}>
            {open ? "Show less" : "Learn more →"}
          </Button>

          {project.servicesUsed?.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 1.5 }}>
              {project.servicesUsed.map((service) => <Chip key={service} size="small" variant="outlined" label={service} />)}
            </Box>
          )}

          {project.results && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" fontWeight={600} color="secondary.main">Key outcome</Typography>
              <Typography variant="body2" sx={{ textAlign: "justify" }}>{project.results}</Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
}
