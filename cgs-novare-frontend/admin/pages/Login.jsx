import { useState } from "react";
import {
  Container, TextField, Button, Typography,
  IconButton, InputAdornment, Paper, CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import API from "../services/adminApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      window.location.href = "/admin";
    } catch {
      alert("Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 12 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight={700}>
          <Lock /> Admin Login
        </Typography>

        <TextField fullWidth label="Email" sx={{ mt: 2 }} onChange={e => setEmail(e.target.value)} />

        <TextField
          fullWidth
          label="Password"
          type={show ? "text" : "password"}
          sx={{ mt: 2 }}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShow(!show)}>
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={22} /> : "Login"}
        </Button>
      </Paper>
    </Container>
  );
}
