import { useEffect, useState } from "react";
import { Box, Typography, Grid, Tabs, Tab, Dialog, Container } from "@mui/material";
import { fetchGalleryImages } from "../service/api";
import { motion } from "framer-motion";

const DEFAULT_IMAGES = ["/default/1.jpg","/default/2.jpg","/default/3.jpg"];
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGalleryImages()
      .then(data => setImages(data?.length ? data : DEFAULT_IMAGES.map(img => ({ imageUrl: img, category: "gallery" }))))
      .catch(() => setImages(DEFAULT_IMAGES.map(img => ({ imageUrl: img, category: "gallery" }))));
  }, []);

  const filtered = category === "all" ? images : images.filter(img => img.category === category);

  return (
    <Box>
      {/* HEADER */}
      <Box sx={{ py: 8, textAlign: "center", background: "linear-gradient(135deg,#1976d2,#00c853)", color: "#fff", clipPath: "ellipse(100% 100% at 50% 0%)" }}>
        <motion.div initial="hidden" animate="visible" variants={{ hidden:{opacity:0}, visible:{opacity:1, transition:{duration:1}} }}>
          <Typography variant="h3" fontWeight={800}>Gallery</Typography>
          <Typography sx={{ mt: 2 }}>Visual highlights of our projects, services, and operational excellence.</Typography>
        </motion.div>
      </Box>

      <Container sx={{ py: 6 }}>
        <Tabs value={category} onChange={(e,v)=>setCategory(v)} centered sx={{ mb: 4 }}>
          <Tab label="All" value="all" />
          <Tab label="Projects" value="gallery" />
          <Tab label="Services" value="services" />
          <Tab label="Marketing" value="marketing" />
        </Tabs>

        <Grid container spacing={3}>
          {filtered.map((img, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} transition={{duration:0.5,delay:i*0.15}} viewport={{once:true}}>
                <Box component="img" src={img.imageUrl} sx={{ width:"100%", height:260, objectFit:"cover", borderRadius:3, cursor:"pointer", transition:"0.3s", "&:hover":{transform:"scale(1.04)"} }} onClick={()=>setSelectedImage(img.imageUrl)} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={Boolean(selectedImage)} onClose={()=>setSelectedImage(null)} maxWidth="md">
        <Box component="img" src={selectedImage} sx={{ width:"100%" }} />
      </Dialog>
    </Box>
  );
}
