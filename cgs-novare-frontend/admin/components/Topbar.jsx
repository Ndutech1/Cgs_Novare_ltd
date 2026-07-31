import { AppBar, Toolbar, Typography, Box, Chip } from "@mui/material";

export default function Topbar() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#fff", color: "#0a2540" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight={700}>
          CGS Novare Admin Panel
        </Typography>
        <Box><Chip label="CMS" size="small" color="primary" variant="outlined" /></Box>
      </Toolbar>
    </AppBar>
  );
}
