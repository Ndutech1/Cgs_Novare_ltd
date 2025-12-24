//cgs-novare-frontend/src/pages/project.js
import { useEffect, useState } from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import ProjectCard from "../components/ProjectCard";
import { fetchProjects } from "../service/api";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => { fetchProjects().then(setProjects).catch(console.error); }, []);

  return (
    <Box>
      {/* HEADER */}
      <Box sx={{ py: { xs: 6, md: 10 }, textAlign: "center", background: "linear-gradient(135deg,#1976d2,#00c853)", color: "#fff", clipPath: "ellipse(100% 100% at 50% 0%)" }}>
        <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }}>
          <Typography variant="h3" fontWeight={800}>Portfolio & Projects</Typography>
          <Typography sx={{ mt: 3, maxWidth: 900, mx: "auto" }}>
            Showcasing our work across technology, engineering, consulting, logistics, and human development — delivering measurable results.
          </Typography>
        </motion.div>
      </Box>

      {/* PROJECTS GRID */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {projects.map((project, i) => (
            <Grid item xs={12} md={4} key={project._id}>
              <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.2 }} viewport={{ once: true }}>
                <ProjectCard project={project} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

