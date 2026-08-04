// cgs-novare-frontend/src/service/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000
});

// ✅ NORMALIZED RESPONSES

export const fetchGalleryImages = async () => {
  const res = await API.get("/gallery/all");
  return res.data;
};

export const fetchHeroes = async () => {
  const res = await API.get("/hero");
  return Array.isArray(res.data) ? res.data : [];
};

export const fetchServices = async () => {
  const res = await API.get("/services");
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

export const fetchProjects = async () => {
  const res = await API.get("/projects");
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};


export default API;

