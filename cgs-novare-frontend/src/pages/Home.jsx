//cgs-novare-frontend/src/pages/Home.jsx
import { useEffect, useState } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import { fetchServices, fetchGalleryImages, fetchHero } from "../service/api";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const [services, setServices] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetchServices().then(setServices);
    fetchGalleryImages("hero").then(setHeroImages);
    fetchHero().then(setHero);
  }, []);

  return (
    <Box sx={{ overflowX: "hidden" }} >
      <Hero hero={hero} images={heroImages} />

      {/* WHO WE ARE */}
      <Container sx={{ py: 8 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Typography variant="h4" fontWeight={700} textAlign="center" sx={{ fontsize: { xs: "2.2rem", md:"3rem" } }}>Who We Are</Typography>
          <Typography variant="body1" textAlign="center" sx={{ mt: 3, maxWidth: 900, mx: "auto" }}>
            CGS Novare Ltd is dedicated to providing innovative, value-driven solutions across technology, engineering, business consulting, logistics, and human development.
          </Typography>
        </motion.div>
      </Container>

      {/* KEY STATS */}
      <Box sx={{ py: 6, background: "linear-gradient(120deg,#e3f2fd 0%,#fff 100%)" }}>
        <Container>
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={12} md={4}><Typography variant="h3" fontWeight={700}>10+</Typography><Typography>Multidisciplinary Expertise</Typography></Grid>
            <Grid item xs={12} md={4}><Typography variant="h3" fontWeight={700}>100%</Typography><Typography>Quality & Safety Commitment</Typography></Grid>
            <Grid item xs={12} md={4}><Typography variant="h3" fontWeight={700}>On-Time</Typography><Typography>Project Delivery Record</Typography></Grid>
          </Grid>
        </Container>
      </Box>

      {/* SERVICES TEASER */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={4}>Our Core Services</Typography>
        <Grid container spacing={4}>
          {services.slice(0, 6).map((service, i) => (
            <Grid item xs={12} md={4} key={service._id}>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.2 }} viewport={{ once: true }}>
                <ServiceCard service={service} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

