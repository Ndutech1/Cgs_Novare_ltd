import { AppBar, Toolbar, Typography, Box, Chip } from "@mui/material";

export default function Topbar() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "rgba(255,255,255,0.82)", color: "#0F172A", backdropFilter: "blur(16px)", borderBottom: "1px solid", borderColor: "divider" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={700}>
          CGS Novare Admin Panel
        </Typography>
        <Box><Chip label="CMS / LIVE" size="small" color="primary" variant="outlined" /></Box>
      </Toolbar>
    </AppBar>
  );
}
