import { Box, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import PublicIcon from "@mui/icons-material/Public";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const values = ["Integrity — transparent, accountable work.", "Innovation — practical ideas that improve outcomes.", "Excellence — professional standards at every stage.", "Collaboration — partnerships built for shared success."];
const presence = [["🇳🇬", "Nigeria"], ["🇱🇷", "Liberia"], ["🇨🇦", "Canada"], ["🇸🇳", "Senegal"]];

export default function About() {
  return (
    <Box sx={{ overflow: "hidden" }}>

      {/* HEADER SECTION */}
      <Box
        sx={{
          py: { xs: 6, md: 12 },
          textAlign: "center",
          background: "linear-gradient(135deg, #1976d2, #00c853)",
          color: "#fff",
          position: "relative",
          clipPath: "ellipse(100% 100% at 50% 0%)",
        }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h3" fontWeight={800}>
            About CGS Novare Ltd
          </Typography>
          <Typography
            variant="h6"
            sx={{ mt: 3, maxWidth: 900, mx: "auto" }}
          >
            Building sustainable value through innovation, expertise, and strategic partnerships.
          </Typography>
        </motion.div>
      </Box>

      {/* OUR STORY */}
      <Container sx={{ py: 8 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Typography variant="h4" fontWeight={700} mb={3}>
            Our Story
          </Typography>
          <Typography sx={{ maxWidth: 900 }}>
            CGS Novare Ltd was founded to deliver sustainable value through a multidisciplinary approach,
            integrating global best practices with deep local market intelligence. We focus on technology,
            engineering, business consulting, logistics, and human development to empower businesses and communities.
          </Typography>
        </motion.div>
      </Container>

      {/* MISSION / VISION / VALUES */}
      <Box sx={{ py: 8, background: "linear-gradient(120deg, #e3f2fd 0%, #fff 100%)" }}>
        <Container>
          <Grid container spacing={4}>
            {[
              { title: "Our Mission", icon: <LightbulbIcon sx={{ fontSize: 40, color: "#1976d2" }} />, text: "To deliver innovative, value-driven solutions that empower businesses and communities to achieve sustainable growth through technology, strategy, and partnership." },
              { title: "Our Vision", icon: <VisibilityIcon sx={{ fontSize: 40, color: "#00c853" }} />, text: "To be a globally recognized brand known for innovation, reliability, and transformational excellence." },
              { title: "Core Values", icon: <EmojiEventsIcon sx={{ fontSize: 40, color: "#ff9800" }} />, text: <>
                <Typography>Integrity – Trust through transparency and ethics.</Typography>
                <Typography>Innovation – Progress through creativity.</Typography>
                <Typography>Excellence – Outstanding quality and professionalism.</Typography>
                <Typography>Sustainability – Long-term value creation.</Typography>
                <Typography>Collaboration – Partnering for shared success.</Typography>
              </> },
            ].map((card, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      p: 5,
                      borderRadius: 3,
                      "&:hover": { transform: "scale(1.03)", boxShadow: "0 12px 25px rgba(0,0,0,0.12)" },
                      transition: "all 0.3s ease",
                      height: "100%"
                    }}
                  >
                    <Stack spacing={2} alignItems="center" textAlign="center">
                      {card.icon}
                      <Typography variant="h5" fontWeight={700}>{card.title}</Typography>
                      <Typography variant="body2">{card.text}</Typography>
                    </Stack>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* COMPETITIVE ADVANTAGE */}
      <Container sx={{ py: 8 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Typography variant="h4" fontWeight={700} mb={3}>
            Competitive Advantage
          </Typography>
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
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    "&:hover": { transform: "scale(1.02)", boxShadow: "0 8px 20px rgba(0,0,0,0.08)" },
                    transition: "all 0.3s ease"
                  }}
                >
                  <Typography>✔ {item}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* WHY CHOOSE US */}
      <Box sx={{ py: 8, background: "linear-gradient(120deg, #0a2540 0%, #0a1f33 100%)", color: "#fff" }}>
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Typography variant="h4" fontWeight={700} mb={3}>
              Why Choose Us?
            </Typography>
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
                    elevation={2}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: "rgba(255,255,255,0.05)",
                      "&:hover": { transform: "scale(1.02)", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
                      transition: "all 0.3s ease"
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <VerifiedUserIcon sx={{ color: "#00c853" }} />
                      <Typography>{item}</Typography>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* TEAM / CREDENTIALS */}
      <Container sx={{ py: 8 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Typography variant="h4" fontWeight={700} mb={3}>Our Team</Typography>
          <Typography sx={{ mb: 3 }}>A multidisciplinary team of registered professionals and experienced specialists across engineering, technology, project management and business advisory.</Typography>
          <Grid container spacing={3}>
            {[{
              name: "Engr. (Dr.) A. B. Adeoye",
              title: "Chief Engineer",
              creds: "Registered Engineer (Council of Nigeria) — R-12345"
            }, {
              name: "Mrs. S. K. Johnson",
              title: "Head of Projects",
              creds: "Project Management Professional (PMP) — PMP-67890"
            }, {
              name: "Mr. T. O. Mensah",
              title: "Senior Consultant — Trade & Logistics",
              creds: "Registered Logistics Professional — L-11223"
            }].map((member, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.12 }} viewport={{ once: true }}>
                  <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                    <Stack spacing={1}>
                      <Typography fontWeight={800}>{member.name}</Typography>
                      <Typography color="text.secondary">{member.title}</Typography>
                      <Divider />
                      <Typography variant="body2">{member.creds}</Typography>
                    </Stack>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* LOCATIONS / PRESENCE */}
      <Box sx={{ py: 6, background: "linear-gradient(90deg,#f8fbff,#fff)" }}>
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Typography variant="h5" fontWeight={700} mb={2}>Locations & Presence</Typography>
            <Typography sx={{ mb: 2 }}>We operate across multiple jurisdictions to better serve clients and partners.</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography fontSize={28}>🇳🇬</Typography>
                    <div>
                      <Typography fontWeight={800}>Nigeria</Typography>
                      <Typography variant="body2" color="text.secondary">Head office — Lagos</Typography>
                    </div>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography fontSize={28}>🇱🇷</Typography>
                    <div>
                      <Typography fontWeight={800}>Liberia</Typography>
                      <Typography variant="body2" color="text.secondary">Local presence — Monrovia</Typography>
                    </div>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography fontSize={28}>🇨🇦</Typography>
                    <div>
                      <Typography fontWeight={800}>Canada</Typography>
                      <Typography variant="body2" color="text.secondary">Representative office — Toronto</Typography>
                    </div>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography fontSize={28}>🇸🇳</Typography>
                    <div>
                      <Typography fontWeight={800}>Senegal</Typography>
                      <Typography variant="body2" color="text.secondary">Regional presence — Dakar</Typography>
                    </div>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* FOOTER SPACER */}
      <Box sx={{ height: 60 }} />
    </Box>
  );
}
