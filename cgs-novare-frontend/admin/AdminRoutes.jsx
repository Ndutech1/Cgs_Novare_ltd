//frontend/admin/AdminRoutes.jsx

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Service";
import Projects from "./pages/Project";
import Gallery from "./pages/Gallery";
import Hero from "./pages/Hero";
import Inbox from "./pages/Inbox";
import ChangePassword from "./pages/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoutes";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
      <Route path="projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
      <Route path="gallery" element={<ProtectedRoute><Gallery/></ProtectedRoute>} />
      <Route path="hero" element={<ProtectedRoute><Hero/></ProtectedRoute>} />
      <Route path="inbox" element={<ProtectedRoute><Inbox/></ProtectedRoute>} />
      <Route path="change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
    </Routes>
  );
}

