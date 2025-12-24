//cgs-novare-frontend/src/pages/service.js
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Container,
  Paper
} from "@mui/material";
import ServiceCard from "../components/ServiceCard";
import { fetchServices } from "../service/api";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const DEFAULT_IMAGE = "/default/3.jpg";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices().then(setServices).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box>

      {/* HEADER */}
      <Box sx={{ py: { xs: 6, md: 10 }, textAlign: "center", background: "linear-gradient(135deg,#1976d2,#00c853)", color: "#fff", clipPath: "ellipse(100% 100% at 50% 0%)" }}>
        <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }}>
          <Typography variant="h3" fontWeight={800}>Our Services</Typography>
          <Typography variant="h6" sx={{ mt: 3, maxWidth: 900, mx: "auto" }}>
            Our service portfolio covers key areas to provide tailored, result-oriented solutions for businesses and organizations.
          </Typography>
        </motion.div>
      </Box>

      {/* SERVICES GRID */}
      <Container sx={{ py: 8 }}>
        {!services.length ? (
          <Typography textAlign="center" color="text.secondary">
            Services will be updated soon.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {services.map((service, i) => (
              <Grid item xs={12} md={4} key={service._id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <ServiceCard service={{ ...service, imageUrl: service.imageUrl || DEFAULT_IMAGE }} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* BUNDLED SERVICES */}
      <Box sx={{ py: 6, background: "linear-gradient(120deg,#0a2540 0%,#0a1f33 100%)", color: "#fff", textAlign: "center" }}>
        <Container>
          <Typography variant="h5" fontWeight={700}>Integrated & Bundled Solutions</Typography>
          <Typography sx={{ mt: 2, maxWidth: 900, mx: "auto", opacity: 0.9 }}>
            We offer bundled services for clients requiring cross-sector solutions — IT-integrated logistics, smart infrastructure, or workforce training for engineering teams.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

