// cgs-novare-frontend/src/components/ProjectCard.jsx
import { Card, CardMedia, CardContent, Typography, Box, Chip } from "@mui/material";
import { motion } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";

export default function ProjectCard({ project }) {
  const defaultImg = "/default/project_placeholder.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <Card
        sx={{
          height: "100%",
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          "&:hover": { boxShadow: 8 },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="200"
            image={project.imageUrl || defaultImg}
            alt={project.title}
          />
          <Chip
            icon={<WorkIcon />}
            label={project.client || "Project"}
            color="secondary"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              borderRadius: "12px",
              fontWeight: 700,
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h6" fontWeight={700}>
            {project.title}
          </Typography>

          {project.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {project.description}
            </Typography>
          )}

          {project.results && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" fontWeight={600} color="success.main">
                Key Achievement:
              </Typography>
              <Typography variant="caption" display="block">
                {project.results}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

