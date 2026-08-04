import { Box, Container, Grid, Stack, Typography, Paper, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";

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

const values = [
  { title: "Integrity", desc: "Trust through transparency and ethics." },
  { title: "Innovation", desc: "Continuous progress through creativity." },
  { title: "Excellence", desc: "Outstanding quality and professionalism." },
  { title: "Sustainability", desc: "Long-term value creation." },
  { title: "Collaboration", desc: "Partnering for shared success." }
];

const teamMembers = [
  { name: "Engr. Godwin Solomon", role: "Chief Engineer & Founder", bio: "Leads strategic delivery, technical governance and long-term client partnerships." },
  { name: "Chidubem Benedict", role: "Technology & Software Lead", bio: "Drives digital systems, data workflows and integrated platform delivery." },
  { name: "Mr. Emmanuel Okoro", role: "Senior Consultant, Trade & Logistics", bio: "Bridges operational execution, planning and cross-border coordination." }
];

export default function About() {

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary", overflowX: "hidden" }}>
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "rgba(255, 255, 255, 0.82)", backdropFilter: "blur(16px)" }}>
        <Container sx={{ py: { xs: 7, md: 10 } }}>
          <Typography variant="caption" color="primary.main" sx={{ display: "block", mb: 2 }}>
            // 002_ORGANIZATIONAL_INTELLIGENCE
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "2.1rem", md: "3rem" }, maxWidth: 780 }}>
            CGS Novare is a multidisciplinary delivery partner for the built environment.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 760, lineHeight: 1.8 }}>
            We fuse engineering, architecture, construction coordination, technology and business advisory into one accountable operating layer for ambitious projects.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 7, md: 10 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <Grid container spacing={4} alignItems="stretch">
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: { xs: 3, md: 4 }, height: "100%" }}>
                <Typography variant="caption" color="secondary.main" sx={{ display: "block", mb: 2 }}>
                  // WHO_WE_ARE
                </Typography>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Our story
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  CGS Novare Ltd is committed to delivering sustainable value through innovative solutions and professional excellence. Our teams combine global best practices with deep local market understanding to support construction, design, engineering and technology-led initiatives.
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>
                  We operate as a trusted partner for clients who need clarity, accountability and the ability to move from concept into delivery without losing control of quality or budget.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper sx={{ p: { xs: 3, md: 4 }, height: "100%" }}>
                <Typography variant="caption" color="primary.main" sx={{ display: "block", mb: 2 }}>
                  // REGISTERED_EXPERTS
                </Typography>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Professional credentials
                </Typography>
                <Stack spacing={1.6} sx={{ mt: 2 }}>
                  {registeredDisciplines.map((item) => (
                    <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                      <CheckCircleRoundedIcon sx={{ color: "secondary.main", fontSize: 20 }} />
                      <Typography variant="body2">{item}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      <Box sx={{ py: { xs: 7, md: 10 }, borderTop: "1px solid", borderColor: "divider" }}>
        <Container>
          <Grid container spacing={3}>
            {[
              { title: "Our Mission", icon: <LightbulbOutlinedIcon />, color: "primary.main", text: "To deliver innovative, value-driven solutions that empower businesses and communities to achieve sustainable growth through technology, strategy and partnership." },
              { title: "Our Vision", icon: <VisibilityOutlinedIcon />, color: "secondary.main", text: "To be a globally recognized brand known for innovation, reliability and transformational excellence across all operational sectors." },
              { title: "Core Values", icon: <EmojiEventsOutlinedIcon />, color: "primary.main", text: "Built around integrity, innovation, excellence, sustainability and collaboration." }
            ].map((card) => (
              <Grid item xs={12} md={4} key={card.title}>
                <Paper sx={{ p: 3, height: "100%" }}>
                  <Box sx={{ width: 48, height: 48, display: "grid", placeItems: "center", border: "1px solid", borderColor: "divider", color: card.color, mb: 2 }}>
                    {card.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>{card.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{card.text}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container sx={{ pb: { xs: 7, md: 10 } }}>
        <Paper sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="caption" color="primary.main" sx={{ display: "block", mb: 2 }}>
            // FOUNDERS_AND_TEAM
          </Typography>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Leadership and delivery team
          </Typography>
          <Grid container spacing={3}>
            {teamMembers.map((member) => (
              <Grid item xs={12} md={4} key={member.name}>
                <Paper sx={{ p: 2.5, height: "100%" }}>
                  <Avatar sx={{ width: 56, height: 56, mb: 2, bgcolor: "primary.main" }}>{member.name.split(" ").slice(-1)[0][0]}</Avatar>
                  <Typography fontWeight={700}>{member.name}</Typography>
                  <Typography variant="body2" color="primary.main" sx={{ mt: 0.5 }}>{member.role}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1.25, lineHeight: 1.7 }}>{member.bio}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      <Container sx={{ pb: { xs: 7, md: 10 } }}>
        <Paper sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="caption" color="secondary.main" sx={{ display: "block", mb: 2 }}>
            // OPERATING_VALUES
          </Typography>
          <Grid container spacing={2}>
            {values.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <Box sx={{ display: "flex", alignItems: "start", gap: 1.2 }}>
                  <VerifiedUserOutlinedIcon sx={{ color: "primary.main", mt: 0.25 }} />
                  <Box>
                    <Typography fontWeight={700}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
