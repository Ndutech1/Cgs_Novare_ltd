// admin/layout/AdminLayout.jsx
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f8fc" }}>
      <CssBaseline />

      <Sidebar open={open} onToggle={() => setOpen(!open)} />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Topbar onMenuClick={() => setOpen(!open)} />

        <Box component="main" sx={{ p: { xs: 2, md: 4 }, flexGrow: 1, maxWidth: 1600 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
