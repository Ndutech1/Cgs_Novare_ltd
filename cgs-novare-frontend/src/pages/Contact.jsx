import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContactForm from "../components/ContactForm";

const whatsapp = import.meta.env.VITE_WHATSAPP_URL;
const email = import.meta.env.VITE_CONTACT_EMAIL;
const phone = import.meta.env.VITE_CONTACT_PHONE;

// Store only the URL string as the fallback instead of a JSX element
const mapUrl =
  import.meta.env.VITE_OFFICE_MAP_URL ||
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d340.79689883574457!2d7.4572735267509875!3d9.071169998402972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b59354cd811%3A0x22db389ec991376d!2sCGS%20NOVARE%20LTD!5e1!3m2!1sen!2snl!4v1785851914508!5m2!1sen!2snl";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Contact() {
  return (
    <Box>
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          background: "linear-gradient(135deg, #1976d2, #00c853)",
          color: "#fff",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Typography variant="h3" fontWeight={800}>
            Get in Touch
          </Typography>
          <Typography sx={{ mt: 2, opacity: 0.9 }}>
            Ready to innovate with us? Reach out for consultations, quotes, or
            partnerships.
          </Typography>
        </motion.div>
      </Box>

      <Container sx={{ py: 8 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <ContactForm />

          <Box sx={{ mt: 6, maxWidth: 900, mx: "auto" }}>
            <Typography variant="h5" fontWeight={800} mb={2}>
              Other ways to reach us
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Prefer to speak directly? Use any of the options below.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
            >
              <Button
                variant="contained"
                color="success"
                href={whatsapp || `https://wa.me/${phone || ""}`}
                target="_blank"
                rel="noreferrer"
                startIcon={<WhatsAppIcon />}
              >
                Message us on WhatsApp
              </Button>
              {phone && (
                <Button variant="outlined" href={`tel:${phone}`}>
                  Call {phone}
                </Button>
              )}
              {email && (
                <Button variant="outlined" href={`mailto:${email}`}>
                  Email {email}
                </Button>
              )}
            </Stack>

            <Box sx={{ mt: 4 }}>
              <Typography fontWeight={700} mb={1}>
                Our office
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: { xs: 260, md: 360 },
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 3,
                }}
              >
                <iframe
                  title="CGS Novare office location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src={mapUrl}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}