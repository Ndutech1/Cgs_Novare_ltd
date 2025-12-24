// cgs-novare-frontend/src/service/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// ✅ NORMALIZED RESPONSES

export const fetchGalleryImages = async (category) => {
  const res = await API.get("/gallery");
  const images = res.data.data || res.data; // <-- FIX

  if (!Array.isArray(images)) return [];

  if (category) {
    return images.filter(img => img.category === category);
  }

  return images;
};

export const fetchHero = async () => {
  const { data } = await API.get("/hero");
  
  return data;
}

export const fetchServices = async () => {
  const res = await API.get("/services");
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

export const fetchProjects = async () => {
  const res = await API.get("/projects");
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};


export default API;

