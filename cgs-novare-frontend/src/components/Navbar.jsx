// cgs-novare-frontend/src/components/Navbar.jsx
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/projects" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "transparent",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
        
        {/* Logo */}
        <Typography
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            letterSpacing: "0.5px",
            fontSize: { xs: "1.2rem", md: "1.4rem" },
            color: "text.primary",
          }}
        >
          CGS Novare Ltd
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: "flex", gap: 1.2 }}>
          {navItems.map(item => {
            const active = location.pathname === item.path;

            return (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  px: 2.5,
                  py: 1,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: active ? "#fff" : "text.primary",
                  background: active
                    ? "linear-gradient(135deg, #1e3c72, #2a5298)"
                    : "rgba(30,60,114,0.08)",
                  boxShadow: active
                    ? "0 8px 20px rgba(30,60,114,0.35)"
                    : "0 4px 12px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px) scale(1.04)",
                    background:
                      "linear-gradient(135deg, #1e3c72, #2a5298)",
                    color: "#fff",
                    boxShadow: "0 12px 28px rgba(30,60,114,0.45)",
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
