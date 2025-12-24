//cgs-novare-frontend/src/components/contactForm.jsx
import { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import API from "../service/api";

const servicesOptions = [
  "Technology & Innovation",
  "Business Consulting",
  "Engineering & Infrastructure",
  "Trade & Logistics",
  "Training & Human Development",
  "Other"
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: servicesOptions[0], message: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post("/contact", form);
    alert("Thank you! Your inquiry has been sent.");
    setForm({ name: "", email: "", phone: "", service: servicesOptions[0], message: "" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <Box
        component="form"
        maxWidth={600}
        mx="auto"
        p={4}
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          background: "linear-gradient(135deg, #007bff11, #00c6ff11)"
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" mb={3} fontWeight={700} textAlign="center">
          Send Us a Message
        </Typography>

        <TextField fullWidth label="Name" name="name" required sx={{ mb: 2 }} onChange={handleChange} />
        <TextField fullWidth label="Email" type="email" name="email" required sx={{ mb: 2 }} onChange={handleChange} />
        <TextField fullWidth label="Phone" name="phone" sx={{ mb: 2 }} onChange={handleChange} />

        <TextField fullWidth select label="Service Interested In" name="service" sx={{ mb: 2 }} value={form.service} onChange={handleChange}>
          {servicesOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </TextField>

        <TextField fullWidth multiline rows={4} label="Message" name="message" required sx={{ mb: 3 }} onChange={handleChange} />

        <Button
          variant="contained"
          size="large"
          type="submit"
          sx={{
            borderRadius: "50px",
            px: 5,
            py: 1.5,
            fontWeight: 700,
            background: "linear-gradient(45deg, #007bff, #00c6ff)",
            transition: "0.3s",
            "&:hover": { transform: "scale(1.05)", background: "linear-gradient(45deg, #00c6ff, #007bff)" }
          }}
        >
          Send Inquiry
        </Button>
      </Box>
    </motion.div>
  );
}
