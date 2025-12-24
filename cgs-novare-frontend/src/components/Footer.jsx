// cgs-novare-frontend/src/components/Footer.jsx
import { Box, Typography, Divider, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 8,
        pt: 4,
        pb: 3,
        textAlign: "center",
        background: "transparent",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 600,
          fontSize: "1.05rem",
          mb: 1,
        }}
      >
        CGS Novare Ltd
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Innovating Today, Empowering Tomorrow
      </Typography>

      <Divider sx={{ my: 2, maxWidth: 320, mx: "auto" }} />

      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} CGS Novare Ltd. All Rights Reserved.
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        <Link
          href="/privacy"
          underline="hover"
          sx={{ mx: 1, color: "text.secondary" }}
        >
          Privacy Policy
        </Link>
        |
        <Link
          href="/terms"
          underline="hover"
          sx={{ mx: 1, color: "text.secondary" }}
        >
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
}

