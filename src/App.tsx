import NavbarAndSidebar from "@/components/layouts/NavbarAndSidebar";
import { Route, Routes } from "react-router-dom";
import Home from "@/components/pages/Home";
import Profile from "@/components/pages/Profile";

function App() {
  return (
    <NavbarAndSidebar>
      <Routes>
        {/* Single catch-all route because we only have one page now */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </NavbarAndSidebar>
  );
}

export default App;
