import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "./images/Utthan logo.png";

const menu = [
  { label: "Home", to: "/" },
  { label: "Examination", to: "/examination" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Sidebar({ isOpen }) {
  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: isOpen ? 0 : -300, opacity: isOpen ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`bg-white dark:bg-slate-900 border-r dark:border-slate-700 w-64 min-h-screen p-6 fixed md:relative z-40 transition-colors duration-300 ${isOpen ? "block" : "hidden md:hidden"}`}
      style={{ top: "80px", height: "calc(100vh - 80px)" }}
    >
      <div className="mb-8 flex justify-center">
        <img src={logo} alt="Utthan" className="h-12 w-auto" />
      </div>
      <nav className="space-y-2">
        {menu.map((m) => (
          <NavLink
            key={m.to}
            to={m.to}
            className={({ isActive }) => `block p-3 rounded-md transition-colors duration-200 ${isActive ? "bg-blue-50 dark:bg-slate-800 font-semibold text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"}`}
          >
            {m.label}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
}
