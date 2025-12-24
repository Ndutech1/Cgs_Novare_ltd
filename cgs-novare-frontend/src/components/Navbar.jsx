import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Container
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
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>

          {/* Logo */}
          <Typography
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: { xs: "1.2rem", md: "1.4rem" },
              color: "text.primary",
            }}
          >
            CGS Novare Ltd
          </Typography>

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
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {navItems.map(item => (
              <MenuItem
                key={item.label}
                component={Link}
                to={item.path}
                onClick={() => setAnchorEl(null)}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>

        </Toolbar>
      </Container>
    </AppBar>
  );
}
