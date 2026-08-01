import { createElement, useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EngineeringIcon from "@mui/icons-material/Engineering";
import HubIcon from "@mui/icons-material/Hub";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ConstructionIcon from "@mui/icons-material/Construction";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import GroupsIcon from "@mui/icons-material/Groups";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import { fetchHeroes, fetchProjects, fetchServices } from "../service/api";

const serviceFallbacks = [
  [ConstructionIcon, "Construction", "Reliable project delivery from site preparation to finishing."],
  [ArchitectureIcon, "Building Design & Architecture", "Functional, compliant designs shaped around your vision."],
  [ApartmentIcon, "Town Planning", "Practical planning support for sustainable developments."],
  [HubIcon, "Smart Home Automation", "Connected spaces that improve comfort, security and control."],
  [EngineeringIcon, "Engineering Services", "Technical expertise for robust, efficient infrastructure."],
  [BusinessCenterIcon, "Business Consulting", "Clear strategies that help organisations grow with confidence."],
  [DevicesOtherIcon, "IT Support & Laptop Sales", "Dependable technology support and the equipment to keep teams moving."],
];
const reasons = [[VerifiedUserIcon, "Registered professionals", "Qualified multidisciplinary expertise on every engagement."], [HealthAndSafetyIcon, "Quality & safety", "High standards, careful execution and accountable delivery."], [LightbulbIcon, "Innovation-led", "Practical technology and smarter methods where they create value."], [GroupsIcon, "Client-focused", "Clear communication and solutions tailored to your goals."]];

const testimonials = [
  {
    name: "Aisha Musa",
    role: "Property Developer, Lagos",
    quote: "CGS Novare delivered our mixed-use development on time and with exceptional attention to quality. Their communication made a difficult project feel easy."
  },
  {
    name: "Kofi Mensah",
    role: "Operations Director, Accra",
    quote: "The smart home installation and construction coordination were seamless. The team understood our needs and executed with precision."
  },
  {
    name: "Fatou Cissé",
    role: "Business Owner, Dakar",
    quote: "We trust CGS Novare for both design and construction advice. Their dependable service is exactly what builds confidence in the local market."
  }
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  useEffect(() => {
    fetchServices().then(setServices).catch(() => setServices([]));
    fetchProjects().then(setProjects).catch(() => setProjects([]));
    fetchHeroes().then(setHeroSlides).catch(() => setHeroSlides([]));
  }, []);
  const shownServices = services.length ? services.slice(0, 8).map(item => [ConstructionIcon, item.title, item.description]) : serviceFallbacks;

  return <Box sx={{ overflowX: "hidden" }}>
    <Hero heroSlides={heroSlides} />
    <Container sx={{ py: { xs: 8, md: 12 } }}>
      <Grid container spacing={{ xs: 3, md: 8 }} alignItems="center">
        <Grid item xs={12} md={5}><Typography color="primary" fontWeight={800} textTransform="uppercase" letterSpacing={1.5}>Who we are</Typography><Typography variant="h3" sx={{ mt: 1.5 }}>Built for ambitious projects and growing businesses.</Typography></Grid>
        <Grid item xs={12} md={7}><Typography color="text.secondary" fontSize="1.12rem" lineHeight={1.8}>CGS Novare is a multidisciplinary company delivering construction, design, engineering, technology and business solutions. Our registered professionals combine local understanding with rigorous standards to create dependable outcomes for clients and communities.</Typography></Grid>
      </Grid>
    </Container>
    <Box sx={{ bgcolor: "#edf4fa", py: { xs: 8, md: 11 } }}><Container>
      <Typography color="primary" fontWeight={800} textAlign="center" textTransform="uppercase" letterSpacing={1.5}>What we do</Typography><Typography variant="h3" textAlign="center" sx={{ mt: 1 }}>Our core services</Typography><Typography color="text.secondary" textAlign="center" sx={{ mt: 2, mb: 5 }}>One experienced partner across the disciplines that move your project forward.</Typography>
      <Grid container spacing={2.5}>{shownServices.map(([Icon, title, description]) => <Grid item xs={12} sm={6} md={4} lg={3} key={title}><Card sx={{ height: "100%", transition: "transform .2s", "&:hover": { transform: "translateY(-5px)" } }}><CardContent sx={{ p: 3 }}><Box sx={{ display: "grid", placeItems: "center", width: 48, height: 48, borderRadius: 2.5, bgcolor: "#e0efff", color: "primary.main", mb: 2 }}>{createElement(Icon)}</Box><Typography fontWeight={800} variant="h6">{title}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.65 }}>{description}</Typography><Button component={Link} to="/services" size="small" endIcon={<ArrowForwardIcon />} sx={{ mt: 2, px: 0 }}>Learn more</Button></CardContent></Card></Grid>)}</Grid>
      <Box textAlign="center" mt={4}><Button component={Link} to="/services" variant="outlined">Explore all services</Button></Box>
    </Container></Box>
    <Container sx={{ py: { xs: 8, md: 11 } }}><Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "end" }} spacing={2} mb={5}><Box><Typography color="primary" fontWeight={800} textTransform="uppercase" letterSpacing={1.5}>Our work</Typography><Typography variant="h3" sx={{ mt: 1 }}>Featured projects</Typography></Box><Button component={Link} to="/projects" endIcon={<ArrowForwardIcon />}>View all projects</Button></Stack>
      {projects.length ? <Grid container spacing={3}>{projects.slice(0, 4).map(project => <Grid item xs={12} sm={6} md={3} key={project._id}><ProjectCard project={project} /></Grid>)}</Grid> : <Card sx={{ p: 5, textAlign: "center", bgcolor: "#f6f9fc" }}><Typography color="text.secondary">Selected project stories will appear here soon.</Typography></Card>}
    </Container>
    <Box sx={{ bgcolor: "#f5f9fc", py: { xs: 8, md: 11 } }}>
      <Container>
        <Typography color="primary" fontWeight={800} textAlign="center" textTransform="uppercase" letterSpacing={1.5}>Testimonials</Typography>
        <Typography variant="h3" textAlign="center" sx={{ mt: 1, mb: 5 }}>Trusted by clients across Africa</Typography>
        <Grid container spacing={3}>
          {testimonials.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ p: 3, height: "100%", border: "1px solid rgba(16,42,67,0.1)" }}>
                <CardContent>
                  <FormatQuoteIcon sx={{ color: "primary.main", fontSize: 36, mb: 1 }} />
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                    {item.quote}
                  </Typography>
                  <Typography fontWeight={800}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.role}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
    <Box sx={{ bgcolor: "#102a43", color: "#fff", py: { xs: 8, md: 11 } }}><Container><Typography color="#8ed1ff" fontWeight={800} textAlign="center" textTransform="uppercase" letterSpacing={1.5}>The CGS difference</Typography><Typography variant="h3" textAlign="center" sx={{ mt: 1, mb: 5 }}>Why choose CGS Novare</Typography><Grid container spacing={3}>{reasons.map(([Icon, title, text]) => <Grid item xs={12} sm={6} md={3} key={title}><Box sx={{ textAlign: "center", px: 1 }}>{createElement(Icon, { sx: { fontSize: 38, color: "#8ed1ff" } })}<Typography fontWeight={800} sx={{ mt: 1.5 }}>{title}</Typography><Typography variant="body2" sx={{ color: "#c4d4e4", mt: 1 }}>{text}</Typography></Box></Grid>)}</Grid></Container></Box>
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: "primary.main", color: "#fff" }}><Container><Stack direction={{ xs: "column", md: "row" }} alignItems={{ md: "center" }} justifyContent="space-between" spacing={3}><Box><Typography variant="h3">Ready to start your project?</Typography><Typography sx={{ mt: 1, opacity: .9 }}>Talk to our team about your scope, timeline and next steps.</Typography></Box><Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}><Button component={Link} to="/contact" variant="contained" color="inherit" sx={{ color: "primary.main" }}>Get a quote</Button><Button component="a" href={import.meta.env.VITE_WHATSAPP_URL || "/contact"} variant="outlined" color="inherit">WhatsApp us</Button></Stack></Stack></Container></Box>
  </Box>;
}
