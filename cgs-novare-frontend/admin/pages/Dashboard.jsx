// cgs-novare-frontend/admin/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BuildIcon from "@mui/icons-material/Build";
import MailIcon from "@mui/icons-material/Mail";
import Sidebar from "../components/Sidebar";
import API from "../services/adminApi";

export default function Dashboard() {
  const [stats, setStats] = useState({
    images: 0,
    projects: 0,
    services: 0,
    unread: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      const [gallery, projects, services, inbox] = await Promise.all([
        API.get("/gallery"),
        API.get("/projects"),
        API.get("/services"),
        API.get("/contact/unread-count")
      ]);

      setStats({
        images: gallery.data.length,
        projects: projects.data.length,
        services: services.data.length,
        unread: inbox.data.count
      });
    };

    loadStats();
  }, []);

  return (
    <Box sx={{ display: "flex", bgcolor: "#0b1e34", minHeight: "100vh" }}>
      <Sidebar open />

      <Box sx={{ p: 4, width: "100%" }}>
        <Typography variant="h4" fontWeight={700} color="white">
          Admin Overview
        </Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Images */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, bgcolor: "#102a43", color: "white" }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <ImageIcon color="primary" />
                <Box>
                  <Typography variant="body2">Images</Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stats.images}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Projects */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, bgcolor: "#102a43", color: "white" }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <WorkIcon color="secondary" />
                <Box>
                  <Typography variant="body2">Projects</Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stats.projects}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Services */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, bgcolor: "#102a43", color: "white" }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <BuildIcon color="warning" />
                <Box>
                  <Typography variant="body2">Services</Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stats.services}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* Inbox */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                p: 3,
                bgcolor: "#102a43",
                color: "white",
                borderLeft: stats.unread > 0 ? "4px solid #4caf50" : "none"
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <MailIcon color="success" />
                <Box>
                  <Typography variant="body2">Unread Messages</Typography>
                  <Typography variant="h3" fontWeight={800} color="success.main">
                    {stats.unread}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
