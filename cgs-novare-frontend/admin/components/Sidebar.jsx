import {
  Drawer, List, ListItemButton, ListItemText,
  ListItemIcon, IconButton, Tooltip, Divider
} from "@mui/material";
import {
  Dashboard, Build, Work, Image, Lock,
  Launch, Logout, Menu, Mail, Campaign
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PwaInstallButton from "./PwaInstallation.jsx";

const drawerWidth = 260;

export default function Sidebar({ open = true, onToggle }) {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : 72,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 72,
          transition: "width .3s",
          overflowX: "hidden",
          bgcolor: "#0a2540",
          color: "#fff"
        }
      }}
    >
      <IconButton onClick={onToggle} sx={{ color: "#fff", m: 1 }}>
        <Menu />
      </IconButton>

      <List>
        {[
          { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
          { text: "Services", icon: <Build />, path: "/admin/services" },
          { text: "Projects", icon: <Work />, path: "/admin/projects" },
          { text: "Gallery", icon: <Image />, path: "/admin/gallery" },
          { text: "Hero Section", icon: <Campaign />, path: "/admin/hero" },
          { text: "Inbox", icon: <Mail />, path: "/admin/inbox" },
          { text: "Change Password", icon: <Lock />, path: "/admin/change-password" }
        ].map(item => (
          <Tooltip title={!open ? item.text : ""} placement="right" key={item.text}>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon sx={{ color: "#90caf9" }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          </Tooltip>
        ))}

        <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.15)" }} />

        {/* ✅ PWA INSTALL BUTTON */}
        <PwaInstallButton open={open} />

        <ListItemButton
          onClick={() =>
            window.open(import.meta.env.VITE_API_URL, "_blank")
          }
        >
          <ListItemIcon sx={{ color: "#4caf50" }}>
            <Launch />
          </ListItemIcon>
          {open && <ListItemText primary="Live Preview" />}
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            localStorage.removeItem("adminToken");
            window.location.replace("/admin/login");
          }}
        >
          <ListItemIcon sx={{ color: "#f44336" }}>
            <Logout />
          </ListItemIcon>
          {open && <ListItemText primary="Logout" />}
        </ListItemButton>
      </List>
    </Drawer>
  );
}
