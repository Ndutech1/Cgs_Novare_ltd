import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ContactForm from "../components/ContactForm";

const whatsapp = import.meta.env.VITE_WHATSAPP_URL;
const email = import.meta.env.VITE_CONTACT_EMAIL;
const phone = import.meta.env.VITE_CONTACT_PHONE;
const mapUrl = import.meta.env.VITE_OFFICE_MAP_URL || "https://www.google.com/maps?q=CGS%20Novare%20Ltd&output=embed";

export default function Contact() {
  return (
    <Box>
      <Box sx={{ py:8, textAlign:"center", background:"linear-gradient(135deg,#1976d2,#00c853)", color:"#fff" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
          <Typography variant="h3" fontWeight={800}>Get in Touch</Typography>
          <Typography sx={{ mt: 2, opacity:0.9 }}>Ready to innovate with us? Reach out for consultations, quotes, or partnerships.</Typography>
        </motion.div>
      </Box>

      <Container sx={{ py:8 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={fadeUp}>
          <ContactForm />

          <Box sx={{ mt: 6, maxWidth: 900, mx: "auto" }}>
            <Typography variant="h5" fontWeight={800} mb={2}>Other ways to reach us</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>Prefer to speak directly? Use any of the options below.</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
              <Button variant="contained" color="success" href={whatsapp || `https://wa.me/${import.meta.env.VITE_CONTACT_PHONE || ""}`} target="_blank" rel="noreferrer" startIcon={<WhatsAppIcon />}>Message us on WhatsApp</Button>
              {import.meta.env.VITE_CONTACT_PHONE && <Button variant="outlined" href={`tel:${import.meta.env.VITE_CONTACT_PHONE}`}>Call {import.meta.env.VITE_CONTACT_PHONE}</Button>}
              {import.meta.env.VITE_CONTACT_EMAIL && <Button variant="outlined" href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}>Email {import.meta.env.VITE_CONTACT_EMAIL}</Button>}
            </Stack>

            <Box sx={{ mt: 4 }}>
              <Typography fontWeight={700} mb={1}>Our office</Typography>
              <Box sx={{ width: "100%", height: { xs: 260, md: 360 }, borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
                <iframe title="CGS Novare office location" width="100%" height="100%" frameBorder="0" style={{ border: 0 }} src={mapUrl} allowFullScreen></iframe>
              </Box>
            </Box>

          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
