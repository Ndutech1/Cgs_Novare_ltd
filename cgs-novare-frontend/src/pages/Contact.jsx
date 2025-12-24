import { Box, Typography, Container } from "@mui/material";
import ContactForm from "../components/ContactForm";
import { motion } from "framer-motion";

const fadeUp = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0, transition:{duration:0.6}} };

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
        </motion.div>
      </Container>
    </Box>
  );
}
