import { Box, Typography, Container, Button, Stack } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
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

          {/* DIRECT CONTACT OPTIONS */}
          <Box sx={{ mt: 6, maxWidth: 900, mx: "auto" }}>
            <Typography variant="h5" fontWeight={800} mb={2}>Other ways to reach us</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>Prefer to speak directly? Use any of the options below.</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
              <Button variant="contained" color="success" href={import.meta.env.VITE_WHATSAPP_URL || `https://wa.me/${import.meta.env.VITE_CONTACT_PHONE || ""}` } target="_blank" rel="noreferrer" startIcon={<WhatsAppIcon />}>Message us on WhatsApp</Button>
              {import.meta.env.VITE_CONTACT_PHONE && <Button variant="outlined" href={`tel:${import.meta.env.VITE_CONTACT_PHONE}`}>Call {import.meta.env.VITE_CONTACT_PHONE}</Button>}
              {import.meta.env.VITE_CONTACT_EMAIL && <Button variant="outlined" href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}>Email {import.meta.env.VITE_CONTACT_EMAIL}</Button>}
            </Stack>

            {/* GOOGLE MAP */}
            <Box sx={{ mt: 4 }}>
              <Typography fontWeight={700} mb={1}>Our office</Typography>
              <Box sx={{ width: "100%", height: { xs: 260, md: 360 }, borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
                <iframe title="CGS Novare office location" width="100%" height="100%" frameBorder="0" style={{ border: 0 }} src={`https://www.google.com/maps?q=CGS+Novare+Ltd&output=embed`} allowFullScreen></iframe>
              </Box>
            </Box>

          </Box>
        </motion.div>
      </Container>
    </Box>
  );
  return <Box><Box sx={{ py: { xs: 7, md: 10 }, textAlign: "center", bgcolor: "#102a43", color: "#fff" }}><Container><Typography color="#8ed1ff" fontWeight={800} textTransform="uppercase" letterSpacing={1.5}>Contact CGS Novare</Typography><Typography variant="h2" sx={{ mt: 1 }}>Let’s discuss your project.</Typography><Typography sx={{ mt: 2, color: "#c4d4e4" }}>Request a quote, ask a question or start a partnership conversation.</Typography></Container></Box>
    <Container sx={{ py: { xs: 6, md: 9 } }}><Grid container spacing={3} sx={{ mb: 7 }}><Grid item xs={12} sm={6} md={3}><Card sx={{ height: "100%" }}><CardContent><WhatsAppIcon color="success" /><Typography fontWeight={800} sx={{ mt: 1 }}>WhatsApp</Typography>{whatsapp ? <Button component="a" href={whatsapp} target="_blank" rel="noreferrer" size="small" sx={{ px: 0 }}>Message us</Button> : <Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>Available soon</Typography>}</CardContent></Card></Grid><Grid item xs={12} sm={6} md={3}><Card sx={{ height: "100%" }}><CardContent><PhoneOutlinedIcon color="primary" /><Typography fontWeight={800} sx={{ mt: 1 }}>Phone</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>{phone || "Available soon"}</Typography></CardContent></Card></Grid><Grid item xs={12} sm={6} md={3}><Card sx={{ height: "100%" }}><CardContent><EmailOutlinedIcon color="primary" /><Typography fontWeight={800} sx={{ mt: 1 }}>Email</Typography>{email ? <Typography variant="body2" component="a" href={`mailto:${email}`} color="text.secondary">{email}</Typography> : <Typography variant="body2" color="text.secondary">Available soon</Typography>}</CardContent></Card></Grid><Grid item xs={12} sm={6} md={3}><Card sx={{ height: "100%" }}><CardContent><LocationOnOutlinedIcon color="primary" /><Typography fontWeight={800} sx={{ mt: 1 }}>Visit us</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>See our office on the map below.</Typography></CardContent></Card></Grid></Grid>
      <Grid container spacing={{ xs: 5, md: 8 }} alignItems="start"><Grid item xs={12} md={6}><ContactForm /></Grid><Grid item xs={12} md={6}><Typography variant="h4" fontWeight={800}>Find our office</Typography><Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>Plan your visit or get directions using the map.</Typography><Box component="iframe" title="CGS Novare office location" src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" sx={{ width: "100%", height: 460, border: 0, borderRadius: 3, boxShadow: "0 12px 36px rgba(20,52,88,.12)" }} /></Grid></Grid>
    </Container>
  </Box>;
}
