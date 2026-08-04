import { useEffect, useMemo, useState } from "react";
import { Box, Button, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import { fetchProjects } from "../service/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProjects().then(setProjects).catch(() => setProjects([]));
  }, []);

  const categories = useMemo(() => ["All", ...new Set(projects.map((project) => project.category).filter(Boolean))], [projects]);
  const visible = category === "All" ? projects : projects.filter((project) => project.category === category);

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "rgba(255, 255, 255, 0.82)", backdropFilter: "blur(16px)" }}>
        <Container sx={{ py: { xs: 7, md: 10 } }}>
          <Typography variant="caption" color="primary.main" sx={{ display: "block", mb: 2 }}>
            // 006_ACTIVE_PROJECTS
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, maxWidth: 760 }}>
            Projects that deliver measurable value.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2, maxWidth: 760, lineHeight: 1.8 }}>
            Review selected construction, design, engineering and technology work delivered by CGS Novare.
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 6, md: 9 } }}>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" justifyContent="center" sx={{ mb: 5 }}>
          {categories.map((item) => (
            <Chip key={item} label={item} clickable color={category === item ? "primary" : "default"} onClick={() => setCategory(item)} sx={{ px: 0.75, py: 2.25, fontWeight: 700 }} />
          ))}
        </Stack>

        <Grid container spacing={3}>
          {visible.map((project) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={project._id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>

        {!visible.length && (
          <Box textAlign="center" py={8}>
            <Typography color="text.secondary">No projects match this category yet.</Typography>
            {category !== "All" && <Button onClick={() => setCategory("All")} sx={{ mt: 1 }}>View all projects</Button>}
          </Box>
        )}
      </Container>
    </Box>
  );
}
