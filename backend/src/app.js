//backend/src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/services", require("./Routes/serviceRoutes"));
app.use("/api/projects", require("./Routes/projectRoutes"));
app.use("/api/gallery", require("./Routes/galleryRoutes"));
app.use("/api/hero", require("./Routes/heroRoutes"));
app.use("/api/contact", require("./Routes/contactRoutes"));


module.exports = app;

