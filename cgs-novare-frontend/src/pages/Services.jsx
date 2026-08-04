import { useEffect, useState } from "react";
import { Box, Grid, Typography, CircularProgress, Container, Paper } from "@mui/material";
import { fetchServices } from "../service/api";
import { motion } from "framer-motion";
import ArchitectureOutlinedIcon from "@mui/icons-material/ArchitectureOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices().then(setServices).catch(() => setServices([])).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const fallbackServices = [
    { title: "Structural Delivery", description: "Site-ready coordination for concrete, steel and fit-out packages.", icon: <ConstructionOutlinedIcon /> },
    { title: "Architectural Systems", description: "Model-based design thinking shaped around constructability and performance.", icon: <ArchitectureOutlinedIcon /> },
    { title: "Engineering Intelligence", description: "Technical analysis for resilient and efficient execution.", icon: <EngineeringOutlinedIcon /> },
    { title: "Digital Twin Readiness", description: "Connected asset data and BIM workflows tuned for long-life operations.", icon: <HubOutlinedIcon /> },
    { title: "Project Governance", description: "Clear scope control, reporting and decision support for complex builds.", icon: <BusinessOutlinedIcon /> }
  ];

  const visibleServices = services.length ? services : fallbackServices;

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "rgba(255, 255, 255, 0.82)", backdropFilter: "blur(16px)" }}>
        <Container sx={{ py: { xs: 7, md: 10 } }}>
          <Typography variant="caption" color="primary.main" sx={{ display: "block", mb: 2 }}>
            // 003_CORE_CAPABILITIES
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, maxWidth: 760 }}>
            Technical delivery services built for precision and speed.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 760, lineHeight: 1.8 }}>
            Our portfolio spans construction oversight, BIM coordination, engineering analysis and business systems for clients who require measurable outcomes.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <Grid container spacing={3}>
          {visibleServices.map((service, index) => (
            <Grid item xs={12} md={4} key={service._id || service.title}>
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: index * 0.08 }} viewport={{ once: true }}>
                <Paper sx={{ p: 0, height: "100%", position: "relative", overflow: "hidden" }}>
                  <Box sx={{ position: "absolute", top: 12, left: 12, fontFamily: '"JetBrains Mono", monospace', color: "primary.main", zIndex: 1 }}>[+]</Box>
                  <Box sx={{ position: "absolute", bottom: 12, right: 12, fontFamily: '"JetBrains Mono", monospace', color: "secondary.main", zIndex: 1 }}>[-]</Box>
                  {service.images?.[0] || service.imageUrl ? (
                    <Box component="img" src={service.images?.[0] || service.imageUrl} alt={service.title} sx={{ width: "100%", height: 180, objectFit: "cover" }} />
                  ) : (
                    <Box sx={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(37, 99, 235, 0.08)" }}>
                      <Box sx={{ width: 56, height: 56, display: "grid", placeItems: "center", border: "1px solid rgba(37, 99, 235, 0.2)", color: "primary.main", borderRadius: 2 }}>
                        {service.icon || <EngineeringOutlinedIcon />}
                      </Box>
                    </Box>
                  )}
                  <Box sx={{ p: 3 }}>
                    <Box sx={{ width: 48, height: 48, display: "grid", placeItems: "center", border: "1px solid", borderColor: "divider", color: "primary.main", mb: 2 }}>
                      {service.icon || <EngineeringOutlinedIcon />}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>{service.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {service.description || "Engineering and delivery expertise tailored to your project goals."}
                    </Typography>
                    <Typography variant="caption" color="secondary.main" sx={{ display: "block", mt: 2 }}>
                      FLEXIBLE / SCALABLE / PREMIUM
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ borderTop: "1px solid", borderColor: "divider", py: { xs: 6, md: 8 } }}>
        <Container>
          <Paper sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="caption" color="secondary.main" sx={{ display: "block", mb: 2 }}>
              // INTEGRATED_DELIVERY
            </Typography>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Bundled solutions for complex portfolios
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, maxWidth: 760 }}>
              We can combine design oversight, engineering coordination, technology deployment and business support into one structured engagement for clients managing multi-phase work.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

