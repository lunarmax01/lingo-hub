// NAV.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const links = ["Home", "Courses", "About", "Contact"];
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh80 = window.innerHeight * 0.8;
      setHideNavbar(scrollY > vh80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll yoki navigate funksiyasi
  const handleClick = (item) => {
    setMobileOpen(false);

    if (item === "About") {
      navigate("/about");
    } else if (item === "Contact") {
      setShowContactModal(true);
    } else if (item === "Home") {
      if (location.pathname === "/") {
        const el = document.getElementById("home");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else navigate("/");
    } else if (item === "Courses") {
      if (location.pathname === "/") {
        const el = document.getElementById("courses");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else navigate("/");
    } else {
      if (location.pathname === "/") {
        const el = document.getElementById(item.toLowerCase());
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else navigate("/");
    }
  };

  const handleMobileClick = (item) => handleClick(item);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full h-[9vh] bg-white shadow-md px-3 sm:px-4 md:px-10 flex items-center justify-between z-50 transition-transform duration-500 ease-in-out ${
          hideNavbar ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <h1 className="font-extrabold text-[18px] sm:text-[20px] md:text-[28px] text-[#7F1D8A] cursor-pointer" onClick={() => navigate("/")}>
          LINGO HUB
        </h1>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-5 lg:gap-8 text-black/60 font-semibold text-[16px] lg:text-[20px]">
          {links.map((item) => (
            <li
              key={item}
              onClick={() => handleClick(item)}
              className="cursor-pointer hover:text-[#7F1D8A] transition-all duration-300 border-b-2 border-transparent hover:border-[#7F1D8A]"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex gap-3 lg:gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 lg:px-7 py-1.5 lg:py-2 rounded-full border-[2px] lg:border-[3px] border-[#7F1D8A] text-[#7F1D8A] text-[14px] lg:text-lg font-mono transition-all duration-300 hover:bg-[#7F1D8A] hover:text-white"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 lg:px-7 py-1.5 lg:py-2 rounded-full bg-[#7F1D8A] text-white text-[14px] lg:text-lg font-mono transition-all duration-300 hover:bg-white hover:text-[#7F1D8A] border-[2px] lg:border-[3px] border-[#7F1D8A]"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden relative w-8 h-8" onClick={() => setMobileOpen(!mobileOpen)}>
          <span className={`absolute inset-0 transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-45 scale-50" : "opacity-100 text-[23px]"}`}>
            ☰
          </span>
          <span className={`absolute inset-0 text-xl text-[#7F1D8A] transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 scale-50"}`}>
            ✕
          </span>
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile menu */}
      <div
        className={`fixed top-[9vh] left-0 w-full h-[calc(100vh-9vh)] bg-gradient-to-b from-white to-purple-50 z-50 md:hidden flex flex-col items-center justify-between px-6 py-10 transition-all duration-500 ease-out ${
          mobileOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-95 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg divide-y">
          {links.map((item, i) => (
            <button
              key={item}
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => handleMobileClick(item)}
              className={`w-full flex items-center justify-between px-5 py-4 text-lg font-semibold text-black/70 transition-all duration-300 ${
                mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              } hover:text-[#7F1D8A] hover:bg-purple-50`}
            >
              <span>{item}</span>
              <span className="text-[#7F1D8A]">›</span>
            </button>
          ))}
        </div>

        {/* Mobile auth buttons */}
        <div className="w-full max-w-sm flex flex-col gap-4 pt-6">
          <button
            onClick={() => {
              setMobileOpen(false);
              navigate("/login");
            }}
            className="w-full py-3 rounded-full border-2 border-[#7F1D8A] text-[#7F1D8A] font-semibold transition-all duration-300 hover:bg-[#7F1D8A] hover:text-white"
          >
            Login
          </button>
          <button
            onClick={() => {
              setMobileOpen(false);
              navigate("/signup");
            }}
            className="w-full py-3 rounded-full bg-[#7F1D8A] text-white font-semibold transition-all duration-300 hover:bg-purple-800"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300 ${
          showContactModal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-white p-6 rounded-2xl shadow-lg w-80 flex flex-col items-center transform transition-all duration-500 ${
            showContactModal ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          <h2 className="text-xl font-bold text-[#7F1D8A] mb-4">Contact Admin</h2>
          <p className="text-gray-700 mb-6 text-center">📞 +998 90 123 45 67</p>
          <button
            className="px-6 py-2 bg-[#7F1D8A] text-white rounded-full font-semibold hover:bg-purple-800 transition-all duration-300"
            onClick={() => setShowContactModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
