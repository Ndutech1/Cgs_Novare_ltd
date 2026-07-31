//backend/src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// Middleware
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map(origin => origin.trim())
  : true;

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// Routes
app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/services", require("./Routes/serviceRoutes"));
app.use("/api/projects", require("./Routes/projectRoutes"));
app.use("/api/gallery", require("./Routes/galleryRoutes"));
app.use("/api/hero", require("./Routes/heroRoutes"));
app.use("/api/contact", require("./Routes/contactRoutes"));

app.use((req, res) => res.status(404).json({ message: "Route not found" }));

app.use((err, _req, res, _next) => {
  if (err.name === "MulterError") return res.status(400).json({ message: err.message });
  console.error(err);
  res.status(err.status || 500).json({ message: "Something went wrong. Please try again." });
});

module.exports = app;

