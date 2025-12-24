//frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme"; // make sure this exists
import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    console.log("New update available ");
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);


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
    <Box>
      <Hero hero={hero} images={heroImages} />

      {/* WHO WE ARE */}
      <Container sx={{ py: 8 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Typography variant="h4" fontWeight={700} textAlign="center">Who We Are</Typography>
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

// cgs-novare-frontend/src/layouts/PublicLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

// cgs-novare-frontend/src/components/Footer.jsx
import { Box, Typography, Divider, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 8,
        pt: 4,
        pb: 3,
        textAlign: "center",
        background: "transparent",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 600,
          fontSize: "1.05rem",
          mb: 1,
        }}
      >
        CGS Novare Ltd
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Innovating Today, Empowering Tomorrow
      </Typography>

      <Divider sx={{ my: 2, maxWidth: 320, mx: "auto" }} />

      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} CGS Novare Ltd. All Rights Reserved.
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        <Link
          href="/privacy"
          underline="hover"
          sx={{ mx: 1, color: "text.secondary" }}
        >
          Privacy Policy
        </Link>
        |
        <Link
          href="/terms"
          underline="hover"
          sx={{ mx: 1, color: "text.secondary" }}
        >
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
}

// cgs-novare-frontend/src/components/Navbar.jsx
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/projects" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "transparent",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
        
        {/* Logo */}
        <Typography
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            letterSpacing: "0.5px",
            fontSize: { xs: "1.2rem", md: "1.4rem" },
            color: "text.primary",
          }}
        >
          CGS Novare Ltd
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: "flex", gap: 1.2 }}>
          {navItems.map(item => {
            const active = location.pathname === item.path;

            return (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  px: 2.5,
                  py: 1,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: active ? "#fff" : "text.primary",
                  background: active
                    ? "linear-gradient(135deg, #1e3c72, #2a5298)"
                    : "rgba(30,60,114,0.08)",
                  boxShadow: active
                    ? "0 8px 20px rgba(30,60,114,0.35)"
                    : "0 4px 12px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px) scale(1.04)",
                    background:
                      "linear-gradient(135deg, #1e3c72, #2a5298)",
                    color: "#fff",
                    boxShadow: "0 12px 28px rgba(30,60,114,0.45)",
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
