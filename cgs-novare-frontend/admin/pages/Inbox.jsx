import { useEffect, useState } from "react";
import {
  Box, Typography, Card, CardContent, Grid,
  Chip, IconButton, TextField, MenuItem, Divider
} from "@mui/material";
import {
  Delete, Archive, MarkEmailRead
} from "@mui/icons-material";
import Sidebar from "../components/Sidebar";
import API from "../services/adminApi";

export default function Inbox() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const load = async () => {
    const res = await API.get("/contact");
    setMessages(res.data);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await API.patch(`/contact/${id}/read`);
    load();
  };

  const archive = async (id) => {
    await API.patch(`/contact/${id}/archive`);
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete message?")) return;
    await API.delete(`/contact/${id}`);
    load();
  };

  const filtered = messages.filter(m =>
    (filter === "all" || m.status === filter) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) ||
     m.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#0b1e34", minHeight: "100vh" }}>
      <Sidebar open />

      <Box sx={{ p: 4, width: "100%" }}>
        <Typography variant="h4" fontWeight={700} color="white">
          Inbox
        </Typography>

        {/* Filters */}
        <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
          <TextField
            size="small"
            label="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            sx={{ bgcolor: "#102a43", borderRadius: 1 }}
          />

          <TextField
            size="small"
            select
            label="Status"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            sx={{ bgcolor: "#102a43", borderRadius: 1 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="unread">Unread</MenuItem>
            <MenuItem value="read">Read</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </TextField>
        </Box>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {filtered.map(msg => (
            <Grid item xs={12} key={msg._id}>
              <Card
                sx={{
                  bgcolor: "#102a43",
                  color: "white",
                  borderLeft: msg.status === "unread" ? "4px solid #4caf50" : "none"
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                      <Typography fontWeight={700}>
                        {msg.name} — {msg.email}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {msg.message}
                      </Typography>
                    </Box>

                    {msg.type === "password-reset" && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="caption">
                        Reset Token:
                        </Typography>

                        <Typography
                        sx={{
                            fontFamily: "monospace",
                            bgcolor: "#061726",
                            p: 1,
                            borderRadius: 1,
                            mt: 1
                        }}
                        >
                        {msg.meta?.resetToken}
                        </Typography>
                    </Box>
                    )}


                    <Box>
                      <Chip
                        label={msg.status}
                        size="small"
                        color={msg.status === "unread" ? "success" : "default"}
                        sx={{ mb: 1 }}
                      />

                      <Divider />

                      {msg.status === "unread" && (
                        <IconButton onClick={() => markRead(msg._id)}>
                            <MarkEmailRead sx={{ color: "#90caf9" }} />
                        </IconButton>
                      )}


                      <IconButton onClick={() => archive(msg._id)}>
                        <Archive sx={{ color: "#ffb74d" }} />
                      </IconButton>

                      <IconButton onClick={() => remove(msg._id)}>
                        <Delete sx={{ color: "#ef5350" }} />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
