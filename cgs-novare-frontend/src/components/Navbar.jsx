import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem, Container, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [["Home", "/"], ["About", "/about"], ["Services", "/services"], ["Projects", "/projects"], ["Architecture Studio", "/ai-architecture-studio"], ["Gallery", "/gallery"]];

export default function Navbar() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "rgba(255, 255, 255, 0.78)", color: "text.primary", backdropFilter: "blur(16px)", borderBottom: "1px solid", borderColor: "divider" }}>
      <Container>
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 76 } }}>
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", mr: "auto" }} aria-label="CGS Novare home">
            <Box component="img" src="/default/cgs.png" alt="CGS Novare Ltd" sx={{ height: { xs: 42, md: 52 }, width: "auto", objectFit: "contain" }} />
          </Box>
          <Stack direction="row" spacing={0.5} sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            {navItems.map(([label, path]) => (
              <Button key={path} component={Link} to={path} color="inherit" sx={{ color: location.pathname === path ? "primary.main" : "text.secondary", px: 1.35, fontSize: "0.8rem" }}>{label}</Button>
            ))}
            <Button component={Link} to="/contact" variant="contained" endIcon={<ArrowForwardIcon />} sx={{ ml: 1.5, px: 2 }}>Let’s talk</Button>
          </Stack>
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} sx={{ display: { md: "none" }, color: "primary.main" }} aria-label="Open navigation">
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { mt: 1, minWidth: 220, borderRadius: 2, bgcolor: "background.paper" } }}>
            {[...navItems, ["Contact", "/contact"]].map(([label, path]) => (
              <MenuItem key={path} component={Link} to={path} selected={location.pathname === path} onClick={() => setAnchorEl(null)} sx={{ py: 1.25 }}>{label}</MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
