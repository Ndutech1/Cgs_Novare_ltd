import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import API from "../services/adminApi";
import Sidebar from "../components/Sidebar";

export default function HeroAdmin() {
  const [heroId, setHeroId] = useState(null);
  const [headline, setHeadline] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchHero();
  }, []);

  // =====================
  // FETCH HERO
  // =====================
  const fetchHero = async () => {
    try {
      const { data } = await API.get("/hero");
      if (!data) return;

      setHeroId(data._id);
      setHeadline(data.headline || "");
      setSubheadline(data.subheadline || "");
      setPreview(data.imageUrl || "");
    } catch (err) {
      console.error("Failed to fetch hero:", err);
    }
  };

  // =====================
  // UPDATE HERO
  // =====================
  const submit = async () => {
    try {
      const formData = new FormData();
      formData.append("headline", headline);
      formData.append("subheadline", subheadline);
      if (image) formData.append("image", image);

      await API.put("/hero", formData);
      alert("Hero section updated successfully");
      fetchHero();
    } catch (err) {
      console.error("Hero update failed:", err);
      alert("Failed to update hero");
    }
  };

  // =====================
  // DELETE HERO
  // =====================
  const deleteHero = async () => {
    if (!heroId) return;
    if (!window.confirm("Delete hero section?")) return;

    try {
      await API.delete(`/hero/${heroId}`);
      setHeroId(null);
      setHeadline("");
      setSubheadline("");
      setImage(null);
      setPreview("");
      alert("Hero section deleted");
    } catch (err) {
      console.error("Hero delete failed:", err);
      alert("Failed to delete hero");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Hero Management
        </Typography>

        <Card sx={{ maxWidth: 720, p: 4 }}>
          <Stack spacing={3}>
            <TextField
              label="Headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              fullWidth
            />

            <TextField
              label="Subheadline"
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />

            <Button variant="outlined" component="label">
              Upload Hero Image
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </Button>

            {preview && (
              <Box>
                <Typography variant="caption">Image Preview</Typography>
                <Box
                  component="img"
                  src={preview}
                  sx={{
                    width: "100%",
                    mt: 1,
                    borderRadius: 2,
                    boxShadow: 3
                  }}
                />
              </Box>
            )}

            <Divider />

            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button
                variant="contained"
                size="large"
                onClick={submit}
              >
                Save Hero Section
              </Button>

              {heroId && (
                <IconButton
                  color="error"
                  onClick={deleteHero}
                  title="Delete Hero"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}
