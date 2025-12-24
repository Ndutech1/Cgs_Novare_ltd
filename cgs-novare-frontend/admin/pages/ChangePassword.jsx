// cgs-novare-frontend/admin/pages/ChangePassword.jsx
import { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button
} from "@mui/material";

import API from "../services/adminApi";
import Sidebar from "../components/Sidebar";

export default function ChangePassword() {
  const [currentPassword, setCurrent] = useState("");
  const [newPassword, setNew] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!currentPassword || !newPassword) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/change-password", {
        currentPassword,
        newPassword
      });
      alert("Password updated successfully");
      setCurrent("");
      setNew("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Card
          sx={{
            maxWidth: 480,
            p: 4,
            mx: "auto",
            mt: 6,
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={3}>
            Change Password
          </Typography>

          <TextField
            fullWidth
            type="password"
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrent(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNew(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            onClick={submit}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </Card>
      </Box>
    </Box>
  );
}
