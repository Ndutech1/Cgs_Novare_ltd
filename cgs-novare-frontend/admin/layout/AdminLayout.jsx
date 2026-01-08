// admin/layout/AdminLayout.jsx
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6fa" }}>
      <CssBaseline />

      <Sidebar open={open} onToggle={() => setOpen(!open)} />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Topbar onMenuClick={() => setOpen(!open)} />

        <Box sx={{ p: { xs: 2, md: 4 }, flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
