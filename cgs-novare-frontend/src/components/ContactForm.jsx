import { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography, Alert, Stack } from "@mui/material";
import { motion } from "framer-motion";
import API from "../service/api";

const serviceOptions = ["Technology & Innovation", "Business Consulting", "Engineering & Infrastructure", "Trade & Logistics", "Training & Human Development", "Other"];
const initialForm = { name: "", email: "", phone: "", service: serviceOptions[0], message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState({ loading: false, error: "", success: "" });
  const change = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async event => {
    event.preventDefault();
    try {
      setState({ loading: true, error: "", success: "" });
      await API.post("/contact", form);
      setForm(initialForm);
      setState({ loading: false, error: "", success: "Thanks — your inquiry is on its way. We'll be in touch shortly." });
    } catch (error) {
      setState({ loading: false, success: "", error: error.response?.data?.message || "We couldn't send your message. Please try again." });
    }
  };
  return <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    <Box component="form" onSubmit={submit} noValidate maxWidth={650} mx="auto" p={{ xs: 3, sm: 5 }} sx={{ borderRadius: 4, bgcolor: "background.paper", boxShadow: "0 18px 50px rgba(20,52,88,.12)" }}>
      <Typography variant="h4" fontWeight={800}>Start a conversation</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>Tell us a little about your goals and the right team will respond.</Typography>
      <Stack spacing={2.25}>
        <TextField fullWidth label="Full name" name="name" required value={form.name} onChange={change} />
        <TextField fullWidth label="Work email" type="email" name="email" required value={form.email} onChange={change} />
        <TextField fullWidth label="Phone number (optional)" name="phone" value={form.phone} onChange={change} />
        <TextField fullWidth select label="I'm interested in" name="service" value={form.service} onChange={change}>{serviceOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}</TextField>
        <TextField fullWidth multiline rows={5} label="How can we help?" name="message" required value={form.message} onChange={change} />
        {state.error && <Alert severity="error">{state.error}</Alert>}
        {state.success && <Alert severity="success">{state.success}</Alert>}
        <Button variant="contained" size="large" type="submit" disabled={state.loading}>{state.loading ? "Sending…" : "Send inquiry"}</Button>
      </Stack>
    </Box>
  </motion.div>;
}
