import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Paper,
  Divider,
  Chip,
  Avatar,
  useTheme,
  alpha
} from "@mui/material";
import { motion } from "framer-motion";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ArchitectureOutlinedIcon from "@mui/icons-material/ArchitectureOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const registeredDisciplines = [
  "Registered Town Planners",
  "Registered Architects",
  "Registered Builders",
  "Registered Engineers (MEP)",
  "Registered Surveyors"
];

const teamMembers = [
  {
    name: "Engr. Godwin Solomon",
    title: "Chief Engineer (CEO & Founder)",
    creds: "Registered Engineer (COREN) — R-12345",
    initials: "GS"
  },
  {
    name: "Chidubem Benedict",
    title: "IT & Software Solutions Lead",
    creds: "Project Management Professional (PMP) — PMP-67890",
    initials: "CB"
  },
  {
    name: "Mr. Emmanuel Okoro",
    title: "Senior Consultant — Trade & Logistics",
    creds: "Registered Logistics Professional — L-11223",
    initials: "EO"
  }
];

const locations = [
  { flag: "🇳🇬", country: "Nigeria", role: "Head Office", detail: "FCT Abuja" },
  { flag: "🇱🇷", country: "Liberia", role: "Regional Office", detail: "Monrovia Hub" },
  { flag: "🇨🇦", country: "Canada", role: "Representative Office", detail: "Toronto Liaison" },
  { flag: "🇸🇳", country: "Senegal", role: "Regional Office", detail: "Dakar Presence" }
];

export default function About() {
  const theme = useTheme();

  return (
    <Box sx={{ overflow: "hidden", backgroundColor: "#f8fafc" }}>
      
      {/* HEADER / HERO SECTION */}
      <Box
        sx={{
          py: { xs: 8, md: 14 },
          textAlign: "center",
          background: "linear-gradient(135deg, #0B192C 0%, #1E3E62 60%, #00C853 100%)",
          color: "#fff",
          position: "relative",
          clipPath: { xs: "none", md: "ellipse(120% 100% at 50% 0%)" },
          px: 2
        }}
      >
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Chip
              icon={<PublicOutlinedIcon sx={{ color: "#fff !important", fontSize: 18 }} />}
              label="Multidisciplinary Excellence"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.15)",
                color: "#fff",
                backdropFilter: "blur(8px)",
                fontWeight: 600,
                mb: 3,
                px: 1
              }}
            />
            <Typography variant="h2" component="h1" fontWeight={800} sx={{ fontSize: { xs: "2.25rem", md: "3.5rem" }, tracking: "-0.02em" }}>
              About CGS Novare Ltd
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2.5,
                maxWidth: 800,
                mx: "auto",
                fontWeight: 400,
                color: alpha("#fff", 0.88),
                lineHeight: 1.6
              }}
            >
              Building sustainable value through innovation, multidisciplinary expertise, and strategic global partnerships.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* OUR STORY & ACCREDITATION FRAMEWORK */}
      <Container sx={{ py: { xs: 8, md: 10 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={7}>
              <Stack spacing={2.5}>
                <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1.5}>
                  Who We Are
                </Typography>
                <Typography variant="h4" fontWeight={800} color="#0f172a">
                  Our Story
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
                  CGS Novare Ltd is a multidisciplinary company committed to delivering sustainable value through 
                  innovative solutions and professional excellence. We combine global best practices with deep local 
                  market knowledge to provide high-quality services across technology, engineering, business consulting, 
                  logistics, and human development.
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
                  At CGS Novare Ltd, we are dedicated to providing reliable, innovative, and sustainable solutions that 
                  consistently meet the highest international professional standards.
                </Typography>
              </Stack>
            </Grid>

            {/* Professional Accreditation Card */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.04)"
                }}
              >
                <Stack spacing={2.5}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: "primary.main" }}>
                      <EngineeringOutlinedIcon />
                    </Avatar>
                    <div>
                      <Typography variant="h6" fontWeight={700}>
                        Registered Experts
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Certified Professional Network
                      </Typography>
                    </div>
                  </Stack>
                  <Divider />
                  <Stack spacing={1.5}>
                    {registeredDisciplines.map((item, index) => (
                      <Stack key={index} direction="row" spacing={1.5} alignItems="center">
                        <CheckCircleRoundedIcon sx={{ color: "#00c853", fontSize: 20 }} />
                        <Typography variant="body2" fontWeight={600} color="#334155">
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* MISSION / VISION / VALUES */}
      <Box sx={{ py: { xs: 8, md: 10 }, background: "linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%)" }}>
        <Container>
          <Grid container spacing={4}>
            {[
              { 
                title: "Our Mission", 
                icon: <LightbulbOutlinedIcon sx={{ fontSize: 32, color: "#1976d2" }} />, 
                badgeColor: "#1976d2",
                text: "To deliver innovative, value-driven solutions that empower businesses and communities to achieve sustainable growth through technology, strategy, and partnership." 
              },
              { 
                title: "Our Vision", 
                icon: <VisibilityOutlinedIcon sx={{ fontSize: 32, color: "#00c853" }} />, 
                badgeColor: "#00c853",
                text: "To be a globally recognized brand known for innovation, reliability, and transformational excellence across all operational sectors." 
              },
              { 
                title: "Core Values", 
                icon: <EmojiEventsOutlinedIcon sx={{ fontSize: 32, color: "#ff9800" }} />, 
                badgeColor: "#ff9800",
                isValues: true,
                values: [
                  { title: "Integrity", desc: "Trust through transparency and ethics." },
                  { title: "Innovation", desc: "Continuous progress through creativity." },
                  { title: "Excellence", desc: "Outstanding quality & professionalism." },
                  { title: "Sustainability", desc: "Long-term value creation." },
                  { title: "Collaboration", desc: "Partnering for shared success." }
                ]
              },
            ].map((card, i) => (
              <Grid item xs={12} md={4} key={i} sx={{ display: "flex" }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  style={{ width: "100%", display: "flex" }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": { 
                        transform: "translateY(-6px)", 
                        boxShadow: "0 16px 32px rgba(0,0,0,0.08)",
                        borderColor: card.badgeColor
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 3,
                        bgcolor: alpha(card.badgeColor, 0.1),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3
                      }}
                    >
                      {card.icon}
                    </Box>

                    <Typography variant="h5" fontWeight={700} mb={2} color="#0f172a">
                      {card.title}
                    </Typography>

                    {card.isValues ? (
                      <Stack spacing={1.5} sx={{ mt: 1 }}>
                        {card.values.map((v, index) => (
                          <Box key={index}>
                            <Typography variant="body2" fontWeight={700} color="#1e293b">
                              • {v.title}: <Box component="span" fontWeight={400} color="text.secondary">{v.desc}</Box>
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    ) : (
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {card.text}
                      </Typography>
                    )}
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* COMPETITIVE ADVANTAGE */}
      <Container sx={{ py: { xs: 8, md: 10 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Box textAlign="center" mb={6}>
            <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1.5}>
              Why We Stand Out
            </Typography>
            <Typography variant="h4" fontWeight={800} color="#0f172a">
              Our Competitive Advantage
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              "Highly skilled professionals with cross-sector experience",
              "Strong partnership network and supplier relationships",
              "Commitment to international quality and safety standards",
              "Proven track record of on-time and within-budget delivery",
              "Technology-driven solutions with measurable impact"
            ].map((item, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "#fff",
                    transition: "all 0.2s ease",
                    "&:hover": { bgcolor: "#f8fafc", borderColor: "primary.main" }
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <CheckCircleRoundedIcon sx={{ color: "#00c853", fontSize: 24 }} />
                    <Typography variant="body1" fontWeight={600} color="#1e293b">
                      {item}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* WHY CHOOSE US (DARK SECTION) */}
      <Box sx={{ py: { xs: 8, md: 10 }, background: "#0B192C", color: "#fff" }}>
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Box mb={6} textAlign="center">
              <Typography variant="overline" sx={{ color: "#00c853", fontWeight: 700, letterSpacing: 1.5 }}>
                Value Proposition
              </Typography>
              <Typography variant="h4" fontWeight={800} mt={0.5}>
                Why Choose CGS Novare?
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {[
                "Multidisciplinary expertise for integrated solutions",
                "Cost-effective and scalable service delivery",
                "Strong emphasis on efficiency and quality control",
                "Long-term, trust-based client relationships",
                "Headquartered in Nigeria with a global outlook"
              ].map((item, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.08)",
                        transform: "translateX(4px)"
                      }
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <VerifiedUserOutlinedIcon sx={{ color: "#00c853" }} />
                      <Typography variant="body1" fontWeight={500} color="#e2e8f0">
                        {item}
                      </Typography>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* LEADERSHIP & TEAM */}
      <Container sx={{ py: { xs: 8, md: 10 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Box mb={6}>
            <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
              <GroupsOutlinedIcon color="primary" />
              <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1.5}>
                Leadership
              </Typography>
            </Stack>
            <Typography variant="h4" fontWeight={800} color="#0f172a" mb={1.5}>
              Our Executive Team
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 700 }}>
              A multidisciplinary team of registered professionals and experienced specialists across engineering, 
              technology, project management, and business advisory.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {teamMembers.map((member, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.45, delay: i * 0.12 }} 
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "#fff",
                      transition: "all 0.3s ease",
                      "&:hover": { boxShadow: "0 12px 28px rgba(0,0,0,0.06)" }
                    }}
                  >
                    <Stack spacing={2}>
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          bgcolor: "primary.main",
                          fontWeight: 700,
                          fontSize: "1.2rem"
                        }}
                      >
                        {member.initials}
                      </Avatar>
                      <div>
                        <Typography variant="h6" fontWeight={800} color="#0f172a">
                          {member.name}
                        </Typography>
                        <Typography variant="body2" color="primary.main" fontWeight={600}>
                          {member.title}
                        </Typography>
                      </div>
                      <Divider />
                      <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5, display: "block" }}>
                        {member.creds}
                      </Typography>
                    </Stack>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* LOCATIONS / GLOBAL PRESENCE */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: "#f1f5f9" }}>
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Box mb={5}>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <LocationOnOutlinedIcon color="primary" />
                <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={1.5}>
                  Global Footprint
                </Typography>
              </Stack>
              <Typography variant="h4" fontWeight={800} color="#0f172a">
                Locations & Presence
              </Typography>
              <Typography color="text.secondary" mt={1}>
                We operate across multiple jurisdictions to seamlessly serve our international clients and partners.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {locations.map((loc, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: "#fff",
                      border: "1px solid",
                      borderColor: "divider"
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography fontSize={32}>{loc.flag}</Typography>
                      <div>
                        <Typography fontWeight={800} color="#0f172a">
                          {loc.country}
                        </Typography>
                        <Typography variant="body2" color="primary" fontWeight={600}>
                          {loc.role}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {loc.detail}
                        </Typography>
                      </div>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* BOTTOM SPACER */}
      <Box sx={{ height: 40 }} />
    </Box>
  );
}