import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Container,
  ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

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
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(5,5,5,0.75)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 72 }}>

          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/default/cgs.png"
                alt="CGS Novare Ltd Logo"
                style={{
                  height: 110,
                  position: "absolute",
                  top: '50%',
                  transform: 'translateY(-50%)',
                  filter: "brightness(7.5)",
                  opacity: 0.9,
                }}
              />
            </Link>
          </Box>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
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
                      : "transparent",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #1e3c72, #2a5298)",
                      color: "#fff",
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* Mobile menu button */}
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" },
              color: "#fff"
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MenuIcon fontSize="large" />
          </IconButton>

          {/* Mobile menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            disableScrollLock   // ✅ FIX SCROLL FREEZE
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 220,
                background: "#0b0b0b",
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              }
            }}
          >
            {navItems.map(item => {
              const active = location.pathname === item.path;

              return (
                <MenuItem
                  key={item.label}
                  component={Link}
                  to={item.path}
                  onClick={() => setAnchorEl(null)}
                  sx={{
                    py: 1.6,
                    px: 3,
                    justifyContent: "center", // ✅ ALIGN TEXT
                    textAlign: "center",
                    background: active
                      ? "linear-gradient(135deg, #1e3c72, #2a5298)"
                      : "transparent",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #1e3c72, #2a5298)",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "#fff",
                      letterSpacing: "0.04em"
                    }}
                  />
                </MenuItem>
              );
            })}
          </Menu>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
