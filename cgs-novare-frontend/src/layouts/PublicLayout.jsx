import { Outlet } from "react-router-dom";
import { Box, Fab, Tooltip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default", // ← thick black
        color: "text.primary"
      }}
    >
      <Navbar />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default"
        }}
      >
        <Outlet />
      </Box>

      <Footer />

      <Tooltip title="Chat with us on WhatsApp" placement="left">
        <Fab
          component="a"
          href={import.meta.env.VITE_WHATSAPP_URL || `https://wa.me/${import.meta.env.VITE_CONTACT_PHONE || ""}`}
          target="_blank"
          rel="noreferrer"
          color="success"
          sx={{ position: "fixed", bottom: 24, right: 24, zIndex: 1400, boxShadow: 6 }}
          aria-label="WhatsApp chat"
        >
          <WhatsAppIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}
