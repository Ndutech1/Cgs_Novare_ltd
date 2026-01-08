// admin/components/Sidebar.jsx
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Divider,
  Box,
  Typography
} from "@mui/material";
import {
  Dashboard,
  Build,
  Work,
  Image,
  Lock,
  Launch,
  Logout,
  Menu,
  Mail,
  Campaign
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import PwaInstallButton from "./PwaInstallation.jsx";

const drawerWidth = 260;
const collapsedWidth = 72;

export default function Sidebar({ open, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/admin" },
    { text: "Services", icon: <Build />, path: "/admin/services" },
    { text: "Projects", icon: <Work />, path: "/admin/projects" },
    { text: "Gallery", icon: <Image />, path: "/admin/gallery" },
    { text: "Hero Section", icon: <Campaign />, path: "/admin/hero" },
    { text: "Inbox", icon: <Mail />, path: "/admin/inbox" },
    { text: "Change Password", icon: <Lock />, path: "/admin/change-password" }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          bgcolor: "#0a2540",
          color: "#fff",
          borderRight: "none"
        }
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          px: open ? 2 : 0,
          py: 2
        }}
      >
        {open && (
          <Typography fontWeight={700} fontSize="1rem">
            CGS Admin
          </Typography>
        )}

        <IconButton onClick={onToggle} sx={{ color: "#fff" }}>
          <Menu />
        </IconButton>
      </Box>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.12)" }} />

      {/* MENU */}
      <List sx={{ mt: 1 }}>
        {menuItems.map(item => {
          const active = location.pathname === item.path;

          return (
            <Tooltip
              key={item.text}
              title={!open ? item.text : ""}
              placement="right"
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 2,
                  justifyContent: open ? "flex-start" : "center",
                  bgcolor: active ? "rgba(255,255,255,0.12)" : "transparent",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.18)"
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#90caf9",
                    minWidth: 0,
                    mr: open ? 2 : 0,
                    justifyContent: "center"
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {open && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      fontWeight: active ? 600 : 400
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.12)" }} />

      {/* FOOTER ACTIONS */}
      <Box sx={{ mt: "auto", pb: 2 }}>
        <PwaInstallButton open={open} />

        <Tooltip title={!open ? "Live Preview" : ""} placement="right">
          <ListItemButton
            onClick={() =>
              window.open(import.meta.env.VITE_FRONTEND_URL, "_blank")
            }
            sx={{
              mx: 1,
              borderRadius: 2,
              justifyContent: open ? "flex-start" : "center"
            }}
          >
            <ListItemIcon
              sx={{
                color: "#4caf50",
                minWidth: 0,
                mr: open ? 2 : 0
              }}
            >
              <Launch />
            </ListItemIcon>
            {open && <ListItemText primary="Live Preview" />}
          </ListItemButton>
        </Tooltip>

        <Tooltip title={!open ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.replace("/admin/login");
            }}
            sx={{
              mx: 1,
              borderRadius: 2,
              justifyContent: open ? "flex-start" : "center"
            }}
          >
            <ListItemIcon
              sx={{
                color: "#f44336",
                minWidth: 0,
                mr: open ? 2 : 0
              }}
            >
              <Logout />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
}
