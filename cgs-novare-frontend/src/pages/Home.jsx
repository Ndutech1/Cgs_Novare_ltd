import { createElement, useEffect, useState } from "react";
import { Box, Button, Chip, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InsightsIcon from "@mui/icons-material/Insights";
import GroupsIcon from "@mui/icons-material/Groups";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SpeedIcon from "@mui/icons-material/Speed";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { fetchHeroes, fetchProjects, fetchServices } from "../service/api";

const serviceFallbacks = [
  [AutoAwesomeIcon, "Strategy & Growth", "Forward-looking business planning that aligns product, people and performance."],
  [InsightsIcon, "Analytics & Insight", "Clear reporting and data-driven decision support for modern teams."],
  [GroupsIcon, "People & Operations", "Structured delivery systems that strengthen culture, execution and collaboration."],
  [DashboardCustomizeIcon, "Digital Enablement", "Modern platforms and workflows that make operations feel effortless."],
  [HandshakeIcon, "Partnership Advisory", "Trusted guidance for partnerships, governance and scalable growth."],
  [SpeedIcon, "Execution Excellence", "Focused delivery with precision, speed and calm under pressure."]
];

const getHeroMediaItems = (hero) => {
  if (!hero) return [];
  if (Array.isArray(hero.media) && hero.media.length) {
    return hero.media;
  }
  if (hero.imageUrl) {
    return [{ url: hero.imageUrl, type: "image" }];
  }
  return [];
};

export default function Home() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  useEffect(() => {
    fetchServices().then(setServices).catch(() => setServices([]));
    fetchProjects().then(setProjects).catch(() => setProjects([]));
    fetchHeroes().then(setHeroes).catch(() => setHeroes([]));
  }, []);

  useEffect(() => {
    if (!heroes.length) return;
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroes.length);
      setActiveMediaIndex(0);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroes]);

  useEffect(() => {
    const mediaItems = getHeroMediaItems(heroes[activeHeroIndex]);
    if (!mediaItems.length || mediaItems.length < 2) return;
    const interval = setInterval(() => {
      setActiveMediaIndex((prev) => (prev + 1) % mediaItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeHeroIndex, heroes]);

  const featuredHero = heroes[activeHeroIndex] || null;
  const heroMediaItems = getHeroMediaItems(featuredHero);
  const currentMediaItem = heroMediaItems[activeMediaIndex] || heroMediaItems[0] || null;
  const shownServices = services.length
    ? services.slice(0, 6).map((item) => ({
        title: item.title,
        description: item.description,
        image: item.images?.[0] || item.imageUrl || null,
        icon: AutoAwesomeIcon
      }))
    : serviceFallbacks.map(([Icon, title, description]) => ({ title, description, image: null, icon: Icon }));

  return (
    <Box sx={{ overflowX: "hidden", bgcolor: "background.default", color: "text.primary" }}>
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "rgba(255,255,255,0.82)", backdropFilter: "blur(16px)" }}>
        <Container sx={{ py: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1.5,
              border: "1px solid",
              borderColor: "divider",
              px: { xs: 2, md: 3 },
              py: 1.5,
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,0.74)"
            }}
          >
            <Typography variant="caption" color="primary.main">STATUS: ONLINE // MULTIDISCIPLINARY DELIVERY</Typography>
            <Typography variant="caption" color="text.secondary">GLOBAL PARTNERSHIPS // STRATEGIC OPERATIONS</Typography>
            <Typography variant="caption" color="secondary.main">FOCUSED // FLEXIBLE // FUTURE READY</Typography>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
          <Paper sx={{ position: "relative", overflow: "hidden", minHeight: { xs: 520, md: 660 }, borderRadius: { xs: 4, md: 5 }, bgcolor: "#0f172a" }}>
            <motion.div
              animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0 }}
            >
              {currentMediaItem?.type === "video" ? (
                <Box component="video" src={currentMediaItem.url} autoPlay muted loop playsInline sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              ) : currentMediaItem?.url ? (
                <Box component="img" src={currentMediaItem.url} alt={featuredHero?.headline || "Hero media"} sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
              ) : (
                <Box sx={{ width: "100%", height: "100%", background: "linear-gradient(120deg, #0f172a 0%, #1d4ed8 50%, #0f766e 100%)" }} />
              )}
            </motion.div>

            <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(2, 6, 23, 0.92) 0%, rgba(2, 6, 23, 0.68) 42%, rgba(2, 6, 23, 0.2) 100%)" }} />
            <Box sx={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top right, rgba(20, 184, 166, 0.24), transparent 28%)" }} />

            <Box sx={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "flex-end", p: { xs: 3, md: 5 } }}>
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} style={{ width: "100%" }}>
                <Stack spacing={3} sx={{ maxWidth: { xs: "100%", md: 640 } }}>
                  <Typography variant="caption" color="secondary.main" sx={{ display: "block" }}>
                    // MULTIDISCIPLINARY COMPANY
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: "2.3rem", md: "4.2rem" },
                      lineHeight: 1.02,
                      color: "#F8FAFC",
                      textShadow: "0 10px 30px rgba(2, 6, 23, 0.4)"
                    }}
                  >
                    {featuredHero?.headline || "Modern solutions crafted for growth, operations and impact."}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "rgba(248, 250, 252, 0.85)", maxWidth: 620, fontSize: "1.05rem", lineHeight: 1.8 }}>
                    {featuredHero?.subheadline || "We combine strategy, technology, consulting and execution into one seamless experience for ambitious businesses and teams."}
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ flexWrap: "wrap" }}>
                    <Chip label="STRATEGY // OPERATIONS // TECHNOLOGY" color="secondary" sx={{ color: "#FFF", bgcolor: "rgba(20, 184, 166, 0.22)", borderColor: "rgba(255,255,255,0.16)" }} variant="outlined" />
                    <Chip label="MOTION-LED DIGITAL EXPERIENCE" color="primary" sx={{ color: "#FFF", bgcolor: "rgba(37, 99, 235, 0.26)", borderColor: "rgba(255,255,255,0.16)" }} variant="outlined" />
                  </Stack>
                  {heroMediaItems.length > 1 && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {heroMediaItems.map((item, index) => (
                        <Box key={`${item.url}-${index}`} sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: index === activeMediaIndex ? "#fff" : "rgba(255,255,255,0.4)" }} />
                      ))}
                    </Box>
                  )}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <Button component={Link} to="/contact" variant="contained" size="large">
                      Discover capabilities
                    </Button>
                    <Button component={Link} to="/projects" variant="outlined" size="large" sx={{ color: "#FFF", borderColor: "rgba(255,255,255,0.35)", bgcolor: "rgba(255,255,255,0.08)" }}>
                      View our work
                    </Button>
                  </Box>
                </Stack>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </Container>

      <Container sx={{ pb: { xs: 8, md: 11 } }}>
        <Typography variant="caption" color="primary.main" sx={{ display: "block", mb: 2 }}>
          // CORE_CAPABILITIES
        </Typography>
        <Typography variant="h3" sx={{ mb: 4 }}>
          Integrated services for modern growth
        </Typography>
        <Grid container spacing={3}>
          {shownServices.map((service) => {
            const Icon = service.icon || AutoAwesomeIcon;

            return (
              <Grid item xs={12} sm={6} lg={4} key={service.title}>
                <Paper
                  sx={{
                    p: 0,
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                    "&:hover": { transform: "translateY(-3px)", borderColor: "primary.main" }
                  }}
                >
                  {service.image ? (
                    <Box component="img" src={service.image} alt={service.title} sx={{ width: "100%", height: 180, objectFit: "cover" }} />
                  ) : (
                    <Box sx={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "rgba(37, 99, 235, 0.08)" }}>
                      <Box sx={{ width: 56, height: 56, display: "grid", placeItems: "center", border: "1px solid rgba(37,99,235,0.2)", color: "primary.main", borderRadius: 2 }}>
                        {createElement(Icon)}
                      </Box>
                    </Box>
                  )}
                  <Box sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                      <Box sx={{ width: 44, height: 44, display: "grid", placeItems: "center", border: "1px solid rgba(37, 99, 235, 0.2)", color: "primary.main", borderRadius: 2 }}>
                        {createElement(Icon)}
                      </Box>
                      <Typography variant="h6">{service.title}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {service.description}
                    </Typography>
                    <Typography variant="caption" color="secondary.main" sx={{ display: "block", mt: 2 }}>
                      FLEXIBLE / SCALABLE / PREMIUM
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <Container sx={{ pb: { xs: 8, md: 11 } }}>
        <Paper sx={{ p: { xs: 3, md: 4 }, borderColor: "rgba(255, 184, 0, 0.2)" }}>
          <Typography variant="caption" color="secondary.main" sx={{ display: "block", mb: 2 }}>
            // ACTIVE_PROJECTS
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2, mb: 3 }}>
            <Typography variant="h3">Selected delivery highlights</Typography>
            <Button component={Link} to="/projects" endIcon={<ArrowForwardIcon />}>
              View all projects
            </Button>
          </Box>
          {projects.length ? (
            <Grid container spacing={3}>
              {projects.slice(0, 4).map((project) => (
                <Grid item xs={12} sm={6} md={3} key={project._id}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography color="text.secondary">Selected project stories will appear here soon.</Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
