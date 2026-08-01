import { Box, Container, Grid, Link, Stack, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Link as RouterLink } from "react-router-dom";

const whatsapp = import.meta.env.VITE_WHATSAPP_URL || "/contact";
const instagram = import.meta.env.VITE_INSTAGRAM_URL || "/contact";
const email = import.meta.env.VITE_CONTACT_EMAIL || "";
const phone = import.meta.env.VITE_CONTACT_PHONE || "";

export default function Footer() {
  return <Box component="footer" sx={{ py: 7, bgcolor: "#102a43", color: "#fff" }}><Container>
    <Grid container spacing={4}><Grid item xs={12} md={5}><Typography variant="h5" fontWeight={800}>CGS Novare Ltd</Typography><Typography variant="body2" sx={{ color: "#b9c9db", mt: 1.25, maxWidth: 350 }}>Multidisciplinary construction, engineering, technology and business solutions for projects that matter.</Typography></Grid>
      <Grid item xs={6} md={3}><Typography fontWeight={800}>Quick links</Typography><Stack spacing={1} sx={{ mt: 1.5 }}><Link component={RouterLink} to="/about" color="inherit">About us</Link><Link component={RouterLink} to="/services" color="inherit">Services</Link><Link component={RouterLink} to="/projects" color="inherit">Projects</Link><Link component={RouterLink} to="/contact" color="inherit">Get a quote</Link></Stack></Grid>
      <Grid item xs={6} md={4}><Typography fontWeight={800}>Contact</Typography><Stack spacing={1.25} sx={{ mt: 1.5, color: "#d6e1ec" }}>{email && <Link href={`mailto:${email}`} color="inherit" sx={{ display: "flex", gap: 1, alignItems: "center" }}><EmailOutlinedIcon fontSize="small" />{email}</Link>}{phone && <Typography variant="body2">{phone}</Typography>}<Link href={whatsapp} target={whatsapp.startsWith("http") ? "_blank" : undefined} rel="noreferrer" color="inherit" sx={{ display: "flex", gap: 1, alignItems: "center" }}><WhatsAppIcon fontSize="small" />WhatsApp</Link><Link href={instagram} target={instagram.startsWith("http") ? "_blank" : undefined} rel="noreferrer" color="inherit" sx={{ display: "flex", gap: 1, alignItems: "center" }}><InstagramIcon fontSize="small" />Instagram</Link></Stack></Grid></Grid>
    <Typography variant="caption" sx={{ display: "block", mt: 6, pt: 2.5, borderTop: "1px solid rgba(255,255,255,.12)", color: "#8fa5bb" }}>© {new Date().getFullYear()} CGS Novare Ltd. All rights reserved.</Typography>
  </Container></Box>;
}
