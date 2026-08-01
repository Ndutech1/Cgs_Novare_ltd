import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";

export default function Hero({ heroSlides = [] }) {
  // Default fallback slides
  const defaultImages = [
    "/default/1.jpg",
    "/default/2.jpg",
    "/default/3.jpg",
    "/default/4.jpg",
    "/default/5.jpg",
    "/default/6.jpg",
  ];

  // Prepare slides: either from backend or default
  const slides =
    heroSlides.length > 0
      ? heroSlides
      : defaultImages.map((img) => ({
          imageUrl: img,
          headline: "Innovating Today, Empowering Tomorrow",
          subheadline:
            "Delivering cutting-edge solutions in technology, engineering, business consulting, logistics, and human development.",
        }));

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      effect="fade"
      loop
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>
          <Box
            sx={{
              height: { xs: "70vh", md: "85vh" },
              backgroundImage: `
                linear-gradient(
                  135deg,
                  rgba(10, 37, 64, 0.6),
                  rgba(0, 110, 255, 0.4)
                ),
                url(${slide.imageUrl})
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "#fff",
              px: 2,
            }}
          >
            <Box maxWidth={900}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <Typography variant="h2" fontWeight={800} sx={{ lineHeight: 1.2 }}>
                  {slide.headline || "Innovating Today, Empowering Tomorrow"}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Typography variant="h6" sx={{ mt: 3, opacity: 0.95 }}>
                  {slide.subheadline ||
                    "Delivering cutting-edge solutions in technology, engineering, business consulting, logistics, and human development."}
                </Typography>
              </motion.div>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
                sx={{ mt: 5 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: "50px",
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    background: "linear-gradient(45deg, #007bff, #00c6ff)",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                  component={Link}
                  to="/contact"
                >
                  Get a Quote
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  color="inherit"
                  sx={{
                    borderRadius: "50px",
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    borderWidth: 2,
                  }}
                  component={Link}
                  to="/projects"
                >
                  View Our Projects
                </Button>
              </Stack>
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
