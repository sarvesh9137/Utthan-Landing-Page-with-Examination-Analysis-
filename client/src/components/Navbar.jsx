import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import logo from "./images/Utthan logo.png";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md fixed w-full top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded transition-all duration-300 ${isSidebarOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
              <span className={`w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded transition-all duration-300 ${isSidebarOpen ? "opacity-0" : ""}`}></span>
              <span className={`w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded transition-all duration-300 ${isSidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </div>
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Utthan Logo"
              className="h-16 w-auto transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
            />
          </Link>
        </div>

        <div className="flex gap-8 text-lg font-medium">
          {["Home", "About", "Examination", "Contact"].map((name) => (
            <NavLink
              key={name}
              to={name === "Home" ? "/" : `/${name.toLowerCase()}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-all duration-300 font-medium ${isActive
                  ? "bg-gradient-to-r from-[#82298B] via-[#2B3E8E] to-[#82298B] text-white shadow-md bg-[length:200%_auto] animate-gradient"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>

        <div className="ml-4">
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
