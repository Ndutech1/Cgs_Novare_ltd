// cgs-novare-frontend/src/components/ServiceCard.jsx
import { Card, CardContent, Typography, CardMedia, Box, Chip } from "@mui/material";
import { motion } from "framer-motion";
import BuildIcon from "@mui/icons-material/Build";

export default function ServiceCard({ service }) {
  const defaultImg = "/default/3.jpg";

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
            image={service.imageUrl || defaultImg}
            alt={service.title}
          />
          <Chip
            icon={<BuildIcon />}
            label={service.category || "Service"}
            color="primary"
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
          <Typography variant="h6" fontWeight={700} gutterBottom>
            {service.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            {service.description}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="primary" fontWeight={600}>
              Learn More →
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

