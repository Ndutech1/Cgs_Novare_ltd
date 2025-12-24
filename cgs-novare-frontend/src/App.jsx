import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../../cgs-novare-frontend/src/layouts/PublicLayout";

// Public pages
import Home from "../../cgs-novare-frontend/src/pages/Home";
import About from "../../cgs-novare-frontend/src/pages/About";
import Gallery from "../../cgs-novare-frontend/src/pages/Gallery";
import Services from "../../cgs-novare-frontend/src/pages/Services";
import Projects from "../../cgs-novare-frontend/src/pages/Project";
import Contact from "../../cgs-novare-frontend/src/pages/Contact";

// Admin routes
import AdminRoutes from "../../cgs-novare-frontend/admin/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC SITE */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ADMIN CMS */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
