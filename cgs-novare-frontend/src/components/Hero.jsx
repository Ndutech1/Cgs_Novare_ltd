import { Box, Typography, Button, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";

export default function Hero({ hero, images = [] }) {
  const defaultImages = [
    "/default/1.jpg",
    "/default/2.jpg",
    "/default/3.jpg",
    "/default/4.jpg",
    "/default/5.jpg",
    "/default/6.jpg"
  ];

  const heroImages = hero?.imageUrl ? [hero] : images.length ? images : defaultImages;

  const headline =
    hero?.headline || "Innovating Today, Empowering Tomorrow";

  const subheadline =
    hero?.subheadline ||
    "Delivering cutting-edge solutions in technology, engineering, business consulting, logistics, and human development.";

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      effect="fade"
      loop
    >
      {heroImages.map((img, i) => (
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
                url(${img.imageUrl || img})
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "#fff",
              px: 2
            }}
          >
            <Box maxWidth={900}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <Typography variant="h2" fontWeight={800} sx={{ lineHeight: 1.2 }}>
                  {headline}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Typography variant="h6" sx={{ mt: 3, opacity: 0.95 }}>
                  {subheadline}
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
                    background:
                      "linear-gradient(45deg, #007bff, #00c6ff)",
                    "&:hover": {
                      transform: "scale(1.05)"
                    }
                  }}
                  href="/services"
                >
                  Explore Our Services
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
                    borderWidth: 2
                  }}
                  href="/contact"
                >
                  Contact Us Today
                </Button>
              </Stack>
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

