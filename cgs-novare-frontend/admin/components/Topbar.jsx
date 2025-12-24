import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Topbar() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#fff", color: "#0a2540" }}>
      <Toolbar>
        <Typography variant="h6" fontWeight={700}>
          CGS Novare Admin Panel
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
