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
import AdminLayout from "./layout/AdminLayout";

function SecurePage({ children }) {
  return <ProtectedRoute><AdminLayout>{children}</AdminLayout></ProtectedRoute>;
}

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route index element={<SecurePage><Dashboard /></SecurePage>} />
      <Route path="services" element={<SecurePage><Services /></SecurePage>} />
      <Route path="projects" element={<SecurePage><Projects /></SecurePage>} />
      <Route path="gallery" element={<SecurePage><Gallery /></SecurePage>} />
      <Route path="hero" element={<SecurePage><Hero /></SecurePage>} />
      <Route path="inbox" element={<SecurePage><Inbox /></SecurePage>} />
      <Route path="change-password" element={<SecurePage><ChangePassword /></SecurePage>} />
    </Routes>
  );
}

