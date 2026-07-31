import { Box, Typography, Container, Stack, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return <Box component="footer" sx={{ mt: 8, py: 6, bgcolor: "#102a43", color: "#fff" }}><Container>
    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={3} alignItems={{ sm: "center" }}>
      <Box><Typography variant="h6" fontWeight={800}>CGS Novare Ltd</Typography><Typography variant="body2" sx={{ color: "#b9c9db", mt: .5 }}>Innovating today. Empowering tomorrow.</Typography></Box>
      <Stack direction="row" spacing={2}><Link component={RouterLink} to="/about" color="inherit">About</Link><Link component={RouterLink} to="/services" color="inherit">Services</Link><Link component={RouterLink} to="/contact" color="inherit">Contact</Link></Stack>
    </Stack><Typography variant="caption" sx={{ display: "block", mt: 5, color: "#8fa5bb" }}>© {new Date().getFullYear()} CGS Novare Ltd. All rights reserved.</Typography>
  </Container></Box>;
}
