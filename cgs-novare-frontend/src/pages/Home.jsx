import { useEffect, useState } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import { fetchServices, fetchHeroes } from "../service/api";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const [services, setServices] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);

  useEffect(() => {
    fetchServices().then(setServices);
    fetchHeroes().then(setHeroSlides);
  }, []);

  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Hero heroSlides={heroSlides} />

      {/* WHO WE ARE */}
      <Container sx={{ py: 8 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Typography variant="h4" fontWeight={700} textAlign="center" sx={{ fontsize: { xs: "2.2rem", md: "3rem" } }}>
            Who We Are
          </Typography>
          <Typography variant="body1" textAlign="center" sx={{ mt: 3, maxWidth: 900, mx: "auto" }}>
            CGS Novare Ltd is dedicated to providing innovative, value-driven solutions across technology, engineering, business consulting, logistics, and human development.
          </Typography>
        </motion.div>
      </Container>

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
