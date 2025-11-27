import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Examination from "./pages/Examination";
import Contact from "./pages/Contact";
import Login from "./pages/Login";


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="flex flex-1 pt-20">
          <Sidebar isOpen={isSidebarOpen} />
          <main className="flex-1">


            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/examination" element={<Examination />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />

            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
